"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { MoreHorizontal, Plus, Pencil, Trash2, Check, X, Star, ChevronDown, ChevronRight, Layers } from "lucide-react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { SplitGroup, EventDictionaryItem, FunctionCard as FunctionCardType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { FunctionCard } from "./function-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { groupColorMap } from "@/lib/mock-data"

interface Props {
  group: SplitGroup
  dictionary: EventDictionaryItem[]
  onUpdate: (g: SplitGroup) => void
  onDelete: () => void
  onDictionaryUpdate?: (updated: EventDictionaryItem[]) => void
}

type ViewMode = "all" | "grouped"

interface GroupedCards {
  eventType: string
  groupKey: string
  groupColor: { bg: string; text: string; ring: string; dot: string }
  cards: FunctionCardType[]
}

export function KanbanColumn({ group, dictionary, onUpdate, onDelete, onDictionaryUpdate }: Props) {
  const totalLines = group.cards.reduce((acc, c) => acc + (c.lines || 0), 0)
  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(group.name)
  const [adding, setAdding] = useState(false)
  const [draftCard, setDraftCard] = useState({ name: "", lines: 0 })
  const [viewMode, setViewMode] = useState<ViewMode>("all")
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [showStarredOnly, setShowStarredOnly] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { setNodeRef, isOver } = useDroppable({ id: `column-${group.id}` })

  // 按事件类型分组
  const groupedCards = useMemo((): GroupedCards[] => {
    const groups: Record<string, FunctionCardType[]> = {}
    for (const card of group.cards) {
      const eventType = card.event_type || "未分类"
      if (!groups[eventType]) groups[eventType] = []
      groups[eventType].push(card)
    }
    
    return Object.entries(groups).map(([eventType, cards]) => {
      const dictItem = dictionary.find(d => d.type_name === eventType)
      const groupKey = dictItem?.group || "other"
      const groupColor = groupColorMap[groupKey] || groupColorMap["other"]
      return { eventType, groupKey, groupColor, cards }
    }).sort((a, b) => b.cards.length - a.cards.length)
  }, [group.cards, dictionary])

  // 收藏的卡片
  const starredCards = useMemo(() => {
    return group.cards.filter(c => c.starred)
  }, [group.cards])

  useEffect(() => {
    if (adding) inputRef.current?.focus()
  }, [adding])

  // Lines tone for header
  const linesTone =
    totalLines >= 300
      ? "bg-rose-50 text-rose-700 ring-rose-200"
      : totalLines >= 150
      ? "bg-amber-50 text-amber-700 ring-amber-200"
      : "bg-emerald-50 text-emerald-700 ring-emerald-200"

  function commitName() {
    if (draftName.trim()) onUpdate({ ...group, name: draftName.trim() })
    setEditingName(false)
  }

  function commitCard(continueAdding: boolean) {
    if (!draftCard.name.trim()) {
      setAdding(false)
      return
    }
    const newCard: FunctionCardType = {
      id: `c${Date.now()}`,
      name: draftCard.name.trim(),
      lines: draftCard.lines || 0,
      event_type: undefined,
      note: "",
    }
    onUpdate({ ...group, cards: [...group.cards, newCard] })
    setDraftCard({ name: "", lines: 0 })
    if (continueAdding) {
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setAdding(false)
    }
  }

  function updateCard(c: FunctionCardType) {
    onUpdate({ ...group, cards: group.cards.map((x) => (x.id === c.id ? c : x)) })
  }

  function deleteCard(id: string) {
    onUpdate({ ...group, cards: group.cards.filter((x) => x.id !== id) })
  }

  function toggleDictionaryStar(typeName: string) {
    const updated = dictionary.map((d) =>
      d.type_name === typeName ? { ...d, starred: !d.starred } : d
    )
    onDictionaryUpdate?.(updated)
  }

  return (
    <div
      className={cn(
        "flex h-full w-72 shrink-0 flex-col rounded-lg border bg-muted/40 transition-colors",
        isOver ? "border-foreground/30 bg-foreground/[0.03]" : "border-border",
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
        {editingName ? (
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitName()
              if (e.key === "Escape") {
                setDraftName(group.name)
                setEditingName(false)
              }
            }}
            autoFocus
            className="min-w-0 flex-1 rounded bg-background px-1.5 py-0.5 text-sm font-semibold outline-none ring-1 ring-foreground/20"
          />
        ) : (
          <button
            onClick={() => {
              setDraftName(group.name)
              setEditingName(true)
            }}
            className="min-w-0 flex-1 truncate text-left text-sm font-semibold text-foreground hover:text-foreground"
          >
            {group.name}
          </button>
        )}

        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-0.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ring-1 ring-inset tabular-nums",
            linesTone,
          )}
          title="该分组总行数"
        >
          {totalLines}
          <span className="opacity-60">L</span>
        </span>

        <span className="shrink-0 rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground tabular-nums">
          {group.cards.length}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="更多"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-xs" onClick={() => setEditingName(true)}>
              <Pencil className="h-3 w-3" />
              重命名
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-xs" 
              onClick={() => setViewMode(viewMode === "all" ? "grouped" : "all")}
            >
              <Layers className="h-3 w-3" />
              {viewMode === "all" ? "按事件类型分组" : "显示全部"}
            </DropdownMenuItem>
            {starredCards.length > 0 && (
              <DropdownMenuItem 
                className="text-xs" 
                onClick={() => setShowStarredOnly(!showStarredOnly)}
              >
                <Star className={cn("h-3 w-3", showStarredOnly && "fill-current text-amber-500")} />
                {showStarredOnly ? "显示全部" : `只看收藏 (${starredCards.length})`}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              className={cn("text-xs", group.cards.length > 0 ? "text-muted-foreground/50 focus:bg-transparent" : "text-rose-600 focus:text-rose-600")} 
              onClick={(e) => {
                if (group.cards.length > 0) {
                  e.preventDefault();
                  return;
                }
                onDelete();
              }}
              disabled={group.cards.length > 0}
            >
              <Trash2 className="h-3 w-3" />
              {group.cards.length > 0 ? '清空函数后删除' : '删除分组'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cards */}
      <div ref={setNodeRef} className="flex-1 space-y-2 overflow-y-auto p-2">
        {/* 收藏区域 */}
        {starredCards.length > 0 && (
          <div className="rounded-md border border-amber-200 bg-amber-50/50 p-2">
            <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-amber-700">
              <Star className="h-3 w-3 fill-current" />
              已收藏 ({starredCards.length})
            </div>
            <SortableContext items={starredCards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1.5">
                {starredCards.map((card) => (
                  <FunctionCard
                    key={card.id}
                    card={card}
                    dictionary={dictionary}
                    onChange={updateCard}
                    onDelete={() => deleteCard(card.id)}
                    onToggleDictionaryStar={toggleDictionaryStar}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        )}

        {/* 按事件类型分组视图 */}
        {viewMode === "grouped" && !showStarredOnly && groupedCards.map((g) => {
          const isExpanded = expandedGroups.has(g.eventType)
          return (
            <div key={g.eventType} className="rounded-md border bg-card">
              <button
                onClick={() => {
                  const next = new Set(expandedGroups)
                  if (isExpanded) next.delete(g.eventType)
                  else next.add(g.eventType)
                  setExpandedGroups(next)
                }}
                className="flex w-full items-center gap-2 px-3 py-2 hover:bg-accent/50"
              >
                {isExpanded ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                <span className={cn("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset", g.groupColor.bg, g.groupColor.text, g.groupColor.ring)}>
                  <span className={cn("h-1 w-1 rounded-full", g.groupColor.dot)} />
                  {g.groupKey}
                </span>
                <span className="font-mono text-xs font-medium text-foreground">{g.eventType}</span>
                <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground tabular-nums">
                  {g.cards.length}
                </span>
              </button>
              {isExpanded && (
                <div className="border-t border-border p-2">
                  <SortableContext items={g.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1.5">
                      {g.cards.map((card) => (
                        <FunctionCard
                          key={card.id}
                          card={card}
                          dictionary={dictionary}
                          onChange={updateCard}
                          onDelete={() => deleteCard(card.id)}
                          onToggleDictionaryStar={toggleDictionaryStar}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </div>
              )}
            </div>
          )
        })}

        {/* 全部视图 */}
        {viewMode === "all" && !showStarredOnly && (
          <SortableContext items={group.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            {group.cards.map((card) => (
              <FunctionCard
                key={card.id}
                card={card}
                dictionary={dictionary}
                onChange={updateCard}
                onDelete={() => deleteCard(card.id)}
                onToggleDictionaryStar={toggleDictionaryStar}
              />
            ))}
          </SortableContext>
        )}

        {group.cards.length === 0 && !adding && (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border py-6 text-center">
            <p className="text-[11px] text-muted-foreground">拖拽卡片到此 或</p>
            <button
              onClick={() => setAdding(true)}
              className="mt-1 text-xs font-medium text-foreground hover:underline"
            >
              + 录入函数
            </button>
          </div>
        )}

        {/* Quick entry */}
        {adding && (
          <div className="rounded-md border border-foreground/30 bg-card p-2 shadow-sm ring-1 ring-foreground/10">
            <input
              ref={inputRef}
              value={draftCard.name}
              onChange={(e) => setDraftCard((d) => ({ ...d, name: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  commitCard(true)
                }
                if (e.key === "Escape") {
                  setAdding(false)
                  setDraftCard({ name: "", lines: 0 })
                }
              }}
              placeholder="函数名称,回车连录"
              className="w-full bg-transparent font-mono text-[13px] font-semibold outline-none placeholder:text-muted-foreground/60"
            />
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                value={draftCard.lines || ""}
                onChange={(e) => setDraftCard((d) => ({ ...d, lines: Number(e.target.value) || 0 }))}
                placeholder="行数"
                className="h-6 w-16 rounded bg-muted/60 px-1.5 text-center font-mono text-[11px] tabular-nums outline-none ring-1 ring-transparent focus:ring-foreground/20"
              />
              <span className="text-[10px] text-muted-foreground">
                <kbd className="rounded border border-border bg-background px-1 font-mono">Enter</kbd> 连录{" "}
                <kbd className="ml-1 rounded border border-border bg-background px-1 font-mono">Esc</kbd> 取消
              </span>
              <div className="ml-auto flex items-center gap-0.5">
                <button
                  onClick={() => {
                    setAdding(false)
                    setDraftCard({ name: "", lines: 0 })
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent"
                  aria-label="取消"
                >
                  <X className="h-3 w-3" />
                </button>
                <button
                  onClick={() => commitCard(false)}
                  className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-background hover:bg-foreground/90"
                  aria-label="确认"
                >
                  <Check className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer add button */}
      {!adding && (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center justify-center gap-1 border-t border-border py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Plus className="h-3 w-3" />
          录入函数
        </button>
      )}
    </div>
  )
}
