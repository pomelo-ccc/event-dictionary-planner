"use client"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Download, Check } from "lucide-react"
import type { EventDictionaryItem } from "@/lib/types"
import { exportDictionaryToYaml } from "@/lib/yaml-export"

interface Props {
  open: boolean
  onOpenChange: (o: boolean) => void
  items: EventDictionaryItem[]
}

export function YamlExportDialog({ open, onOpenChange, items }: Props) {
  const yaml = useMemo(() => exportDictionaryToYaml(items), [items])
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(yaml)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function download() {
    const blob = new Blob([yaml], { type: "text/yaml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "event-dictionary.yml"
    a.click()
    URL.revokeObjectURL(url)
  }

  const lineCount = yaml.split("\n").length
  const sizeKB = (new Blob([yaml]).size / 1024).toFixed(1)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="text-base">导出 YAML 字典</DialogTitle>
          <DialogDescription className="text-xs">
            预览生成的 YAML 配置,可复制或下载为 .yml 文件供转换脚本使用。
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-2">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="font-mono text-foreground tabular-nums">{items.length}</span> 个事件类型
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1">
              <span className="font-mono text-foreground tabular-nums">{lineCount}</span> 行
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1">
              <span className="font-mono text-foreground tabular-nums">{sizeKB}</span> KB
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7" onClick={copy}>
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              {copied ? "已复制" : "复制"}
            </Button>
            <Button size="sm" className="h-7" onClick={download}>
              <Download className="h-3 w-3" />
              下载 .yml
            </Button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-auto bg-[#0f172a]">
          <pre className="flex min-h-full text-[12px] leading-5">
            <div className="select-none border-r border-white/10 bg-black/20 px-3 py-3 text-right font-mono text-white/30">
              {yaml.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <code className="flex-1 whitespace-pre px-4 py-3 font-mono text-slate-100">
              {highlightYaml(yaml)}
            </code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function highlightYaml(yaml: string): React.ReactNode {
  return yaml.split("\n").map((line, i) => {
    // comment
    if (line.startsWith("#")) {
      return (
        <div key={i}>
          <span className="text-emerald-400/70">{line}</span>
        </div>
      )
    }
    // list dash
    const dashMatch = line.match(/^(\s*)-\s(.*)$/)
    if (dashMatch) {
      return (
        <div key={i}>
          <span>{dashMatch[1]}</span>
          <span className="text-rose-300">- </span>
          <span>{renderKeyValue(dashMatch[2])}</span>
        </div>
      )
    }
    return <div key={i}>{renderKeyValue(line)}</div>
  })
}

function renderKeyValue(line: string): React.ReactNode {
  const m = line.match(/^(\s*)([^:\s][^:]*):(\s*)(.*)$/)
  if (!m) return <span>{line || "\u00A0"}</span>
  const [, indent, key, sp, value] = m
  return (
    <>
      <span>{indent}</span>
      <span className="text-sky-300">{key}</span>
      <span className="text-slate-400">:</span>
      <span>{sp}</span>
      {value && <span className="text-amber-200">{value}</span>}
    </>
  )
}
