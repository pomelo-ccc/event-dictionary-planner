"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronRight, FileText, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { TraceChain } from "@/lib/csv-trace"
import { loadAllCsvs, traceUpstream, flattenTraceTree } from "@/lib/csv-trace"
import type { ProjectId } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  functionName: string
  project?: ProjectId
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TracePanel({ functionName, project, open, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false)
  const [chains, setChains] = useState<TraceChain[]>([])
  const [error, setError] = useState<string | null>(null)

  /** 高亮文本中匹配的子串 */
  function highlightMatch(text: string, keyword: string) {
    if (!keyword) return text
    const idx = text.indexOf(keyword)
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-amber-200/80 text-foreground rounded-sm px-0.5">{keyword}</mark>
        {text.slice(idx + keyword.length)}
      </>
    )
  }

  useEffect(() => {
    if (!open || !functionName) return

    let cancelled = false
    setLoading(true)
    setError(null)
    setChains([])

    ;(async () => {
      try {
        const csvFiles = await loadAllCsvs(project)
        if (cancelled) return
        const tree = traceUpstream(functionName, csvFiles)
        const flat = flattenTraceTree(tree)
        if (cancelled) return
        setChains(flat)
      } catch (e) {
        if (!cancelled) setError("追踪失败: " + (e instanceof Error ? e.message : String(e)))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [open, functionName])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4" />
            上游追踪
          </DialogTitle>
          <DialogDescription>
            追踪函数 <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground">{functionName}</code> 的完整上游调用链
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3 -mx-2 px-2">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              正在追踪上游...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {!loading && !error && chains.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              未找到任何上游引用
            </div>
          )}

          {!loading &&
            !error &&
            chains.map((chain, ci) => (
              <div
                key={ci}
                className="rounded-lg border border-border bg-muted/30 overflow-hidden"
              >
                <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-3 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    链路 {ci + 1}
                  </span>
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    {chain.steps.length} 层
                  </span>
                </div>

                <div className="p-2 space-y-0">
                  {chain.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-2">
                      {/* 连接线 */}
                      <div className="flex flex-col items-center pt-2">
                        <div className={cn(
                          "h-2 w-2 rounded-full shrink-0",
                          si === 0 ? "bg-foreground" : "bg-muted-foreground/40"
                        )} />
                        {si < chain.steps.length - 1 && (
                          <div className="w-px flex-1 bg-border min-h-4" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 pb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* 当前名称 */}
                          <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-foreground">
                            {step.name}
                          </code>

                          <ChevronRight className="h-3 w-3 text-muted-foreground/50 shrink-0" />

                          {/* 匹配信息 */}
                          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px]">
                            <FileText className="h-2.5 w-2.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{step.sourceFile.replace(".csv", "")}</span>
                            <span className="text-muted-foreground/60">·</span>
                            <span className="font-medium text-foreground/80">{step.matchedColumn}</span>
                          </span>

                          {/* 上游名称 */}
                          <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
                            {step.firstColumnValue}
                          </code>
                        </div>

                        {/* 关键上下文行（如果有 Children 或 Action） */}
                        {step.rowData.Children && (
                          <div className="mt-1 text-[10px] text-muted-foreground break-all" title={step.rowData.Children}>
                            <span className="opacity-60">Children: </span>{highlightMatch(step.rowData.Children, step.name)}
                          </div>
                        )}
                        {step.rowData.Action && (
                          <div className="mt-1 text-[10px] text-muted-foreground break-all" title={step.rowData.Action}>
                            <span className="opacity-60">Action: </span>{highlightMatch(step.rowData.Action, step.name)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
