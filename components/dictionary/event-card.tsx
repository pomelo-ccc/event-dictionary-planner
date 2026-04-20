"use client"

import { Pencil, Trash2, ArrowRight } from "lucide-react"
import { groupColorMap } from "@/lib/mock-data"
import type { EventDictionaryItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  item: EventDictionaryItem
  onEdit: () => void
  onDelete: () => void
}

export function EventCard({ item, onEdit, onDelete }: Props) {
  const c = groupColorMap[item.group]
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start gap-2 border-b border-border px-4 pb-3 pt-3.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ring-inset",
                c.bg,
                c.text,
                c.ring,
              )}
            >
              <span className={cn("h-1 w-1 rounded-full", c.dot)} />
              {item.group}
            </span>
          </div>
          <h3 className="mt-1.5 truncate font-mono text-sm font-semibold text-foreground" title={item.type_name}>
            {item.type_name}
          </h3>
          <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground" title={item.import_source}>
            {item.import_source}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={onEdit}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="编辑"
          >
            <Pencil className="h-3 w-3" />
          </button>
          <button
            onClick={onDelete}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
            aria-label="删除"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 px-4 py-3">
        {item.trigger_scene && (
          <p className="line-clamp-2 text-xs text-foreground/80 leading-relaxed">{item.trigger_scene}</p>
        )}

        {item.typical_fields.length > 0 && (
          <div>
            <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              典型字段
            </div>
            <div className="flex flex-wrap gap-1">
              {item.typical_fields.map((f) => (
                <span
                  key={f}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.legacy_helper_mapping.length > 0 && (
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                替换规则
              </span>
              <span className="font-mono text-[10px] text-emerald-600 tabular-nums">
                {item.legacy_helper_mapping.length}
              </span>
            </div>
            <div className="space-y-1 rounded-md bg-muted/50 p-2">
              {item.legacy_helper_mapping.slice(0, 2).map((m, i) => (
                <div key={i} className="flex items-center gap-1.5 font-mono text-[11px]">
                  <code className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-700 line-through decoration-rose-400/60">
                    {m.from}
                  </code>
                  <ArrowRight className="h-2.5 w-2.5 shrink-0 text-muted-foreground" />
                  <code className="truncate rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-700">{m.to}</code>
                </div>
              ))}
              {item.legacy_helper_mapping.length > 2 && (
                <div className="pt-0.5 text-[10px] text-muted-foreground">
                  + {item.legacy_helper_mapping.length - 2} 条更多规则
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span>
            匹配:{" "}
            <span className="font-mono text-foreground tabular-nums">{item.detect_all.length}</span>
          </span>
          <span>
            排除:{" "}
            <span className="font-mono text-foreground tabular-nums">{item.negative.length}</span>
          </span>
          {item.fallback && (
            <span>
              兜底: <span className="font-mono text-foreground">{item.fallback}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
