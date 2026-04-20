"use client"

import { GripVertical, Trash2, MessageSquare, Star } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { FunctionCard as FunctionCardType, EventDictionaryItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { EventTypePicker } from "./event-type-picker"

interface Props {
  card: FunctionCardType
  dictionary: EventDictionaryItem[]
  onChange: (c: FunctionCardType) => void
  onDelete: () => void
  isDragging?: boolean
  /** 切换事件类型收藏状态 */
  onToggleDictionaryStar?: (typeName: string) => void
}

export function FunctionCard({ card, dictionary, onChange, onDelete, isDragging: isOverlay, onToggleDictionaryStar }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id })
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-md border bg-card transition-shadow",
        isDragging ? "border-dashed border-foreground/40 opacity-40" : "border-border hover:shadow-sm hover:border-foreground/20",
        isOverlay && "shadow-lg ring-1 ring-foreground/10 rotate-1",
      )}
    >
      <div className="flex items-start gap-1.5 p-2.5">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 flex h-5 w-4 cursor-grab items-center justify-center rounded text-muted-foreground/40 hover:bg-accent hover:text-foreground active:cursor-grabbing"
          aria-label="拖拽"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>

        <div className="min-w-0 flex-1 space-y-1.5">
          {/* Row 1: name + delete */}
          <div className="flex items-center gap-1.5">
            <input
              value={card.name}
              onChange={(e) => onChange({ ...card, name: e.target.value })}
              placeholder="handleClick"
              className="min-w-0 flex-1 bg-transparent font-mono text-[13px] font-semibold text-foreground outline-none placeholder:text-muted-foreground/60 focus:bg-muted/50 focus:px-1 focus:py-0.5 focus:rounded"
            />
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-0.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ring-1 ring-inset tabular-nums",
                linesTone,
              )}
              title="代码行数"
            >
              {card.lines}
              <span className="opacity-60">L</span>
            </span>
            <button
              onClick={() => onChange({ ...card, starred: !card.starred })}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-colors group-hover:opacity-100",
                card.starred 
                  ? "text-amber-500 hover:text-amber-600" 
                  : "text-muted-foreground/50 hover:text-amber-500 hover:bg-amber-50"
              )}
              aria-label={card.starred ? "取消收藏" : "收藏"}
            >
              <Star className={cn("h-3 w-3", card.starred && "fill-current")} />
            </button>
            <button
              onClick={onDelete}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground/50 opacity-0 hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100"
              aria-label="删除"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>

          {/* Row 2: event type + lines input */}
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1 min-w-0">
              <EventTypePicker
                value={card.event_type}
                dictionary={dictionary}
                onSelect={(eventType) => onChange({ ...card, event_type: eventType })}
                onToggleStar={onToggleDictionaryStar}
                disabled={Boolean(isOverlay)}
              />
            </div>

            <div className="flex h-7 w-16 shrink-0 items-center rounded-md bg-muted/60 px-1.5">
              <Input
                type="number"
                value={card.lines}
                onChange={(e) => onChange({ ...card, lines: Number(e.target.value) || 0 })}
                className="h-5 border-0 bg-transparent p-0 text-center font-mono text-[11px] tabular-nums shadow-none focus-visible:ring-0"
              />
              <span className="text-[10px] text-muted-foreground">lines</span>
            </div>
          </div>

          {/* Note */}
          <div className="flex items-center gap-1">
            <MessageSquare className="h-2.5 w-2.5 shrink-0 text-muted-foreground/60" />
            <input
              value={card.note || ""}
              onChange={(e) => onChange({ ...card, note: e.target.value })}
              placeholder="迁移备注..."
              className="min-w-0 flex-1 bg-transparent text-[11px] text-muted-foreground outline-none placeholder:text-muted-foreground/40 focus:text-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
