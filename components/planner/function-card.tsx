"use client"

import { useEffect, useRef, useState } from "react"
import { GripVertical, Trash2, MessageSquare, Star, Ban, Wrench, ArrowUpRight } from "lucide-react"
import { TracePanel } from "./trace-panel"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { FunctionCard as FunctionCardType, EventDictionaryItem, ProjectId } from "@/lib/types"
import { cn } from "@/lib/utils"
import { EventTypePicker } from "./event-type-picker"

interface Props {
  card: FunctionCardType
  dictionary: EventDictionaryItem[]
  onChange: (c: FunctionCardType) => void
  onDelete: () => void
  isDragging?: boolean
  /** 切换事件类型收藏状态 */
  onToggleDictionaryStar?: (typeName: string) => void
  isSelected?: boolean
  onClick?: () => void
  project?: ProjectId
}

export function FunctionCard({ card, dictionary, onChange, onDelete, isDragging: isOverlay, onToggleDictionaryStar, isSelected, onClick, project }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id })
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [traceOpen, setTraceOpen] = useState(false)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [card.name])

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  // Lines tone
  const linesTone =
    card.lines >= 80
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : card.lines >= 40
      ? "bg-amber-50 text-amber-700 ring-amber-200"
      : "bg-emerald-50 text-emerald-700 ring-emerald-200"

  const selectedEvent = dictionary.find((d) => d.type_name === card.event_type)

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "BUTTON" || target.closest("button")) return
        onClick?.()
      }}
      className={cn(
        "group relative rounded-xl border transition-all",
        isDragging ? "border-dashed border-foreground/40 bg-card opacity-40" : "hover:-translate-y-0.5 hover:shadow-md hover:border-foreground/30",
        isSelected ? "border-primary/50 bg-primary/[0.04] ring-1 ring-primary/20 shadow-sm" : "border-border bg-card",
        isOverlay && "shadow-lg ring-1 ring-foreground/10 rotate-1",
        onClick && "cursor-pointer"
      )}
    >
      <div className="flex items-start gap-2 p-4">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-1.5 flex h-7 w-6 cursor-grab items-center justify-center rounded-md text-muted-foreground/40 hover:bg-accent hover:text-foreground active:cursor-grabbing"
          aria-label="拖拽"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="w-full">
            <textarea
              ref={textareaRef}
              value={card.name}
              onChange={(e) => onChange({ ...card, name: e.target.value })}
              placeholder="handleClick"
              rows={1}
              className="block w-full resize-none overflow-hidden bg-transparent font-mono text-[15px] font-semibold leading-6 text-foreground outline-none placeholder:text-muted-foreground/60 focus:bg-muted/50 focus:px-1.5 focus:-mx-1.5 focus:py-1 focus:rounded-md"
              style={{ minHeight: "30px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = `${target.scrollHeight}px`
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-0.5 rounded-md px-2 py-1 font-mono text-xs font-semibold ring-1 ring-inset tabular-nums",
                  linesTone,
                )}
                title="代码行数"
              >
                {card.lines}
                <span className="opacity-60">L</span>
              </span>

              {/* 需要移除状态 */}
              <button
                onClick={() => onChange({ ...card, toRemove: !card.toRemove })}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                  card.toRemove
                    ? "bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200"
                    : "text-muted-foreground/60 hover:bg-muted/50 hover:text-muted-foreground ring-1 ring-inset ring-dashed ring-border"
                )}
                title={card.toRemove ? "取消移除标记" : "标记为需要移除"}
              >
                <Ban className="h-3 w-3" />
                <span className="hidden sm:inline">移除</span>
              </button>

              {/* 工具函数状态 */}
              <button
                onClick={() => onChange({ ...card, isUtility: !card.isUtility })}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                  card.isUtility
                    ? "bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-200"
                    : "text-muted-foreground/60 hover:bg-muted/50 hover:text-muted-foreground ring-1 ring-inset ring-dashed ring-border"
                )}
                title={card.isUtility ? "取消工具函数标记" : "标记为工具函数"}
              >
                <Wrench className="h-3 w-3" />
                <span className="hidden sm:inline">工具</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTraceOpen(true)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground/50 opacity-0 hover:bg-sky-50 hover:text-sky-600 group-hover:opacity-100"
                aria-label="追踪上游"
                title="追踪上游"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onChange({ ...card, starred: !card.starred })}
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-colors group-hover:opacity-100",
                  card.starred 
                    ? "text-amber-500 hover:text-amber-600 opacity-100" 
                    : "text-muted-foreground/50 hover:text-amber-500 hover:bg-amber-50"
                )}
                aria-label={card.starred ? "取消收藏" : "收藏"}
              >
                <Star className={cn("h-3.5 w-3.5", card.starred && "fill-current")} />
              </button>
              <button
                onClick={onDelete}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground/50 opacity-0 hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100"
                aria-label="删除"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative min-w-0">
              <EventTypePicker
                value={card.event_type}
                dictionary={dictionary}
                onSelect={(eventType) => onChange({ ...card, event_type: eventType })}
                onToggleStar={onToggleDictionaryStar}
                disabled={Boolean(isOverlay)}
              />
            </div>

            {selectedEvent && selectedEvent.typical_fields.length > 0 && (
              <div className="flex flex-wrap items-start gap-1.5 pl-1">
                <span className="mr-1 pt-1 text-[10px] text-muted-foreground">入参:</span>
                {selectedEvent.typical_fields.map((f) => (
                    <span key={f} className="inline-flex items-center rounded-md bg-muted px-1.5 py-1 font-mono text-[10px] font-medium text-muted-foreground">
                      {f}
                    </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-3 w-3 shrink-0 text-muted-foreground/60" />
            <input
              value={card.note || ""}
              onChange={(e) => onChange({ ...card, note: e.target.value })}
              placeholder="迁移备注..."
              className="min-w-0 flex-1 bg-transparent text-[12px] text-muted-foreground outline-none placeholder:text-muted-foreground/40 focus:text-foreground"
            />
          </div>
        </div>
      </div>
      <TracePanel functionName={card.name} project={project} open={traceOpen} onOpenChange={setTraceOpen} />
    </div>
  )
}
