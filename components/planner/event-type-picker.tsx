"use client"

import { useDeferredValue, useEffect, useMemo, useState } from "react"
import { Check, ChevronDown, Search, Star, X, Zap } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { groupColorMap } from "@/lib/mock-data"
import { buildEventTypePickerState } from "@/lib/event-type-picker"
import type { EventDictionaryItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  value?: string
  dictionary: EventDictionaryItem[]
  onSelect: (value?: string) => void
  onToggleStar?: (typeName: string) => void
  disabled?: boolean
}

export function EventTypePicker({
  value,
  dictionary,
  onSelect,
  onToggleStar,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const deferredSearch = useDeferredValue(search)

  const selectedItem = dictionary.find((item) => item.type_name === value)
  const selectedTone = selectedItem ? groupColorMap[selectedItem.group] || groupColorMap.other : null

  const pickerState = useMemo(
    () =>
      buildEventTypePickerState({
        dictionary,
        search: deferredSearch,
      }),
    [deferredSearch, dictionary],
  )

  useEffect(() => {
    if (!open) {
      setSearch("")
    }
  }, [open])

  return (
    <Popover open={disabled ? false : open} onOpenChange={(nextOpen) => !disabled && setOpen(nextOpen)}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-9 w-full items-center gap-2 rounded-xl border px-3 text-left shadow-sm transition-all outline-none",
            selectedTone ? cn(selectedTone.bg, selectedTone.text, selectedTone.ring, "ring-1 ring-inset") : "border-border/70 bg-background text-foreground hover:bg-muted/50",
            open && "border-foreground/20 ring-2 ring-ring/20",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          <Zap className="h-3.5 w-3.5 shrink-0 opacity-70" />
          <span className="min-w-0 flex-1 truncate font-mono text-xs font-medium">
            {value || <span className="text-muted-foreground">选择事件类型</span>}
          </span>
          <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="w-[360px] rounded-[22px] border border-border/70 bg-popover/95 p-0 shadow-2xl backdrop-blur-sm"
      >
        <div className="border-b border-border/60 px-3.5 py-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Star className="h-3 w-3" />
              Event Types
            </div>
            <span className="rounded-full bg-muted/70 px-2 py-1 font-mono text-[10px] text-muted-foreground tabular-nums">
              {dictionary.length}
            </span>
            {value && (
              <button
                type="button"
                onClick={() => onSelect(undefined)}
                className="ml-auto inline-flex items-center gap-1 rounded-full border border-border/70 px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-foreground/15 hover:bg-accent hover:text-foreground"
              >
                <X className="h-3 w-3" />
                清除当前
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background px-3 shadow-xs transition-colors focus-within:border-foreground/15 focus-within:ring-2 focus-within:ring-ring/15">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索事件类型、分组或来源..."
              className="h-10 w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground/50"
              autoFocus
            />
          </label>
        </div>

        <ScrollArea className="max-h-[28rem]">
          <div className="space-y-3 p-2.5">
            {dictionary.length === 0 ? (
              <EmptyState message="字典为空，先去字典页录入事件类型" />
            ) : !pickerState.hasResults ? (
              <EmptyState message="没有匹配的事件类型" />
            ) : (
              <>
                {pickerState.starred.count > 0 && (
                  <EventTypeSection
                    title={pickerState.starred.label}
                    count={pickerState.starred.count}
                    tone="starred"
                  >
                    {pickerState.starred.items.map((item) => (
                      <EventTypeOption
                        key={item.id}
                        item={item}
                        selected={value === item.type_name}
                        onSelect={(typeName) => {
                          onSelect(typeName)
                          setOpen(false)
                        }}
                        onToggleStar={onToggleStar}
                      />
                    ))}
                  </EventTypeSection>
                )}

                {pickerState.groups.map((group) => (
                  <EventTypeSection key={group.key} title={group.label} count={group.count} groupKey={group.key}>
                    {group.items.map((item) => (
                      <EventTypeOption
                        key={item.id}
                        item={item}
                        selected={value === item.type_name}
                        onSelect={(typeName) => {
                          onSelect(typeName)
                          setOpen(false)
                        }}
                        onToggleStar={onToggleStar}
                      />
                    ))}
                  </EventTypeSection>
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

function EventTypeSection({
  title,
  count,
  children,
  tone = "default",
  groupKey,
}: {
  title: string
  count: number
  children: React.ReactNode
  tone?: "default" | "starred"
  groupKey?: string
}) {
  const groupTone = groupKey ? groupColorMap[groupKey] || groupColorMap.other : null

  return (
    <section className="space-y-1.5">
      <div
        className={cn(
          "flex items-center gap-2 px-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
          tone === "starred" ? "text-amber-600" : "text-muted-foreground/80",
        )}
      >
        {tone === "starred" ? (
          <Star className="h-3.5 w-3.5 fill-current" />
        ) : (
          <span className={cn("h-2.5 w-2.5 rounded-full", groupTone?.dot || "bg-muted-foreground/30")} />
        )}
        <span>{title}</span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-mono text-[10px] tabular-nums",
            tone === "starred" ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      </div>
      <div className="space-y-1">{children}</div>
    </section>
  )
}

function EventTypeOption({
  item,
  selected,
  onSelect,
  onToggleStar,
}: {
  item: EventDictionaryItem
  selected: boolean
  onSelect: (typeName: string) => void
  onToggleStar?: (typeName: string) => void
}) {
  const tone = groupColorMap[item.group] || groupColorMap.other

  return (
    <div
      className={cn(
        "group/item flex items-center gap-2 rounded-2xl border px-2.5 py-2 transition-all",
        selected ? "border-foreground/10 bg-accent shadow-sm" : "border-transparent hover:border-border/70 hover:bg-accent/45",
      )}
    >
      <button type="button" onClick={() => onSelect(item.type_name)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", tone.dot)} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[12px] font-semibold text-foreground">{item.type_name}</span>
          <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">{item.import_source}</span>
        </span>
        {selected ? (
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : (
          <span className={cn("hidden rounded-full px-2 py-1 text-[10px] font-medium ring-1 ring-inset sm:inline-flex", tone.bg, tone.text, tone.ring)}>
            {item.group}
          </span>
        )}
      </button>

      {onToggleStar && (
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.stopPropagation()
            onToggleStar(item.type_name)
          }}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
            item.starred
              ? "text-amber-500 hover:bg-amber-100 hover:text-amber-600"
              : "text-muted-foreground/35 opacity-0 hover:bg-amber-50 hover:text-amber-500 group-hover/item:opacity-100",
          )}
          aria-label={item.starred ? "取消收藏" : "收藏"}
          aria-pressed={item.starred}
        >
          <Star className={cn("h-4 w-4", item.starred && "fill-current")} />
        </button>
      )}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-3 py-10 text-center text-xs text-muted-foreground">
      {message}
    </div>
  )
}
