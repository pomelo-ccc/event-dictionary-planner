"use client"

import { useMemo, useState } from "react"
import { Plus, Search, Download, Upload, FileCode2, LayoutList, LayoutGrid, X, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { groupColorMap } from "@/lib/mock-data"
import type { EventDictionaryItem, EventGroup } from "@/lib/types"
import { cn } from "@/lib/utils"
import { EventCard } from "./event-card"
import { EventEditorSheet } from "./event-editor-sheet"
import { YamlExportDialog } from "./yaml-export-dialog"
import { YamlImportDialog } from "./yaml-import-dialog"
import { StatBadge } from "@/components/stat-badge"


interface Props {
  items: EventDictionaryItem[]
  setItems: (items: EventDictionaryItem[]) => void
  groups: string[]
  setGroups: (groups: string[]) => void
}

export function DictionaryView({ items, setItems, groups: GROUPS, setGroups }: Props) {
  const [search, setSearch] = useState("")
  const [activeGroup, setActiveGroup] = useState<string | "all">("all")
  const [view, setView] = useState<"grid" | "table">("grid")
  const [editing, setEditing] = useState<EventDictionaryItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [yamlOpen, setYamlOpen] = useState(false)
  const [yamlImportOpen, setYamlImportOpen] = useState(false)
  const [newGroupInput, setNewGroupInput] = useState("")
  const [isAddingGroup, setIsAddingGroup] = useState(false)

  function addGroup() {
    if (newGroupInput.trim() && !GROUPS.includes(newGroupInput.trim())) {
      setGroups([...GROUPS, newGroupInput.trim()]);
    }
    setNewGroupInput("");
    setIsAddingGroup(false);
  }

  function removeGroup(g: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (items.some(it => it.group === g)) {
      alert('该分组下有事件，无法移除');
      return;
    }
    setGroups(GROUPS.filter(x => x !== g));
    if (activeGroup === g) setActiveGroup("all");
  }

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchGroup = activeGroup === "all" || it.group === activeGroup
      const q = search.trim().toLowerCase()
      const matchSearch =
        !q ||
        it.type_name.toLowerCase().includes(q) ||
        it.import_source.toLowerCase().includes(q) ||
        it.trigger_scene?.toLowerCase().includes(q)
      return matchGroup && matchSearch
    })
  }, [items, activeGroup, search])

  const grouped = useMemo(() => {
    const map: Record<string, EventDictionaryItem[]> = {}
    for (const g of GROUPS) map[g] = []
    for (const it of filtered) map[it.group].push(it)
    return map
  }, [filtered])

  const groupCounts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const g of GROUPS) map[g] = 0
    for (const it of items) map[it.group] = (map[it.group] || 0) + 1
    return map
  }, [items])

  function openNew() {
    setEditing(null)
    setSheetOpen(true)
  }

  function openEdit(item: EventDictionaryItem) {
    setEditing(item)
    setSheetOpen(true)
  }

  function handleSave(data: EventDictionaryItem) {
    if (editing) {
      // Edit mode: check if the new name conflicts with OTHER existing items
      if (items.some((i) => i.id !== data.id && i.type_name === data.type_name)) {
        alert(`已存在名为 "${data.type_name}" 的事件类型`)
        return
      }
      setItems(items.map((i) => (i.id === data.id ? data : i)))
    } else {
      // Create new: Prevent duplicate type_name
      if (items.some((i) => i.type_name === data.type_name)) {
        alert(`已存在名为 "${data.type_name}" 的事件类型`)
        return
      }
      setItems([...items, { ...data, id: `d${Date.now()}` }])
    }
    setSheetOpen(false)
  }

  function handleDeduplicate() {
    const map = new Map<string, EventDictionaryItem>()
    let removedCount = 0
    
    // We keep the first one we encounter (you can also reverse iterate to keep the newest)
    for (const item of items) {
      if (!map.has(item.type_name)) {
        map.set(item.type_name, item)
      } else {
        removedCount++
      }
    }

    if (removedCount > 0) {
      setItems(Array.from(map.values()))
      alert(`去重完成！清理了 ${removedCount} 条重复数据。`)
    } else {
      alert("当前字典中没有重复的事件类型。")
    }
  }

  function handleImport(newItems: EventDictionaryItem[]) {
    // Collect new groups
    const newGroups = newItems
      .map(item => item.group)
      .filter(group => group && !GROUPS.includes(group))

    // Add new groups if any
    if (newGroups.length > 0) {
      setGroups([...GROUPS, ...newGroups])
    }

    // Deduplicate logic: use existing items map for fast lookup
    const existingTypeNames = new Set(items.map((it) => it.type_name))
    const itemsToAdd: EventDictionaryItem[] = []

    for (const newItem of newItems) {
      // Only add if type_name does not exist
      if (!existingTypeNames.has(newItem.type_name)) {
        itemsToAdd.push({
          ...newItem,
          id: `d${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        })
        existingTypeNames.add(newItem.type_name) // prevent duplicates within newItems itself
      }
    }

    if (itemsToAdd.length > 0) {
      setItems([...items, ...itemsToAdd])
    }
  }

  function handleDelete(id: string) {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Left: group filter */}
      <aside className="flex w-60 flex-col border-r border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">分类</span>
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground tabular-nums">
            {items.length}
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-2">
          <button
            onClick={() => setActiveGroup("all")}
            className={cn(
              "mb-1 flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
              activeGroup === "all"
                ? "bg-foreground text-background"
                : "text-foreground hover:bg-accent",
            )}
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              全部分组
            </span>
            <span className="font-mono tabular-nums opacity-80">{items.length}</span>
          </button>
          {GROUPS.map((g) => {
            const c = groupColorMap[g] || groupColorMap["other"]
            const active = activeGroup === g
            const count = groupCounts[g] || 0
            return (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={cn(
                  "group relative mb-0.5 flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                  active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-2 truncate pr-6">
                  <span className={cn("h-2 w-2 shrink-0 rounded-sm", c.dot)} />
                  <span className="truncate">{g}</span>
                </span>
                <span className="font-mono tabular-nums">{count}</span>
                {count === 0 && (
                  <span 
                    onClick={(e) => removeGroup(g, e)}
                    className="absolute right-8 hidden h-4 w-4 items-center justify-center rounded-sm hover:bg-rose-100 hover:text-rose-600 group-hover:flex text-muted-foreground/50"
                  >
                    <X className="h-3 w-3" />
                  </span>
                )}
              </button>
            )
          })}
          {isAddingGroup ? (
            <div className="mt-1 px-1">
              <Input 
                autoFocus
                size={1}
                className="h-7 text-xs" 
                placeholder="分组名称..." 
                value={newGroupInput}
                onChange={(e) => setNewGroupInput(e.target.value)}
                onBlur={addGroup}
                onKeyDown={(e) => e.key === 'Enter' && addGroup()}
              />
            </div>
          ) : (
            <button
              onClick={() => setIsAddingGroup(true)}
              className="mt-1 flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              添加分组
            </button>
          )}
        </nav>

        <div className="border-t border-border p-3">
          <div className="rounded-md bg-muted/60 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <FileCode2 className="h-3.5 w-3.5" />
              字典统计
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <Stat label="事件类型" value={items.length} />
              <Stat
                label="替换规则"
                value={items.reduce((acc, i) => acc + i.legacy_helper_mapping.length, 0)}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-border bg-background px-6 py-3">
          <div>
            <h1 className="text-base font-semibold tracking-tight text-foreground">事件字典</h1>
            <p className="text-xs text-muted-foreground">
              定义重构所需的事件类型元数据 · 共 {filtered.length} 条
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索类型名 / 来源 / 场景"
                className="h-8 w-64 pl-8 text-xs"
              />
            </div>
            <div className="flex items-center rounded-md border border-border bg-card p-0.5">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded text-muted-foreground",
                  view === "grid" && "bg-accent text-foreground",
                )}
                aria-label="卡片视图"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setView("table")}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded text-muted-foreground",
                  view === "table" && "bg-accent text-foreground",
                )}
                aria-label="列表视图"
              >
                <LayoutList className="h-3.5 w-3.5" />
              </button>
            </div>
            <Button variant="outline" size="sm" className="h-8" onClick={handleDeduplicate}>
              <Layers className="h-3.5 w-3.5" />
              一键去重
            </Button>
            <Button variant="outline" size="sm" className="h-8" onClick={() => setYamlOpen(true)}>
              <Download className="h-3.5 w-3.5" />
              导出 YAML
            </Button>
            <Button variant="outline" size="sm" className="h-8" onClick={() => setYamlImportOpen(true)}>
              <Upload className="h-3.5 w-3.5" />
              导入 YAML
            </Button>
            <Button size="sm" className="h-8" onClick={openNew}>
              <Plus className="h-3.5 w-3.5" />
              新增事件类型
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-muted/30 px-6 py-5">
          {view === "grid" ? (
            <div className="space-y-6">
              {GROUPS.filter((g) => grouped[g].length > 0).map((g) => {
                const c = groupColorMap[g] || groupColorMap["other"]
                return (
                  <section key={g}>
                    <div className="mb-3 flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-sm", c.dot)} />
                      <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">{g}</h2>
                      <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                        {grouped[g].length} 项
                      </span>
                      <div className="ml-3 h-px flex-1 bg-border" />
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {grouped[g].map((item) => (
                        <EventCard key={item.id} item={item} onEdit={() => openEdit(item)} onDelete={() => handleDelete(item.id)} />
                      ))}
                    </div>
                  </section>
                )
              })}
              {filtered.length === 0 && <EmptyState />}
            </div>
          ) : (
            <DictionaryTable items={filtered} onEdit={openEdit} />
          )}
        </div>
      </div>

      <EventEditorSheet open={sheetOpen} onOpenChange={setSheetOpen} item={editing} onSave={handleSave} groups={GROUPS} />
      <YamlExportDialog open={yamlOpen} onOpenChange={setYamlOpen} items={items} />
      <YamlImportDialog open={yamlImportOpen} onOpenChange={setYamlImportOpen} onImport={handleImport} existingGroups={GROUPS} />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded bg-background px-2 py-1.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-mono text-sm font-semibold text-foreground tabular-nums">{value}</div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-20 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">暂无匹配的事件类型</p>
      <p className="mt-1 text-xs text-muted-foreground">尝试调整搜索条件或新增一个类型</p>
    </div>
  )
}

function DictionaryTable({
  items,
  onEdit,
}: {
  items: EventDictionaryItem[]
  onEdit: (i: EventDictionaryItem) => void
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full text-xs">
        <thead className="bg-muted/60 text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 text-left font-medium uppercase tracking-wider">类型名</th>
            <th className="px-4 py-2.5 text-left font-medium uppercase tracking-wider">分组</th>
            <th className="px-4 py-2.5 text-left font-medium uppercase tracking-wider">导入来源</th>
            <th className="px-4 py-2.5 text-left font-medium uppercase tracking-wider">字段数</th>
            <th className="px-4 py-2.5 text-left font-medium uppercase tracking-wider">替换规则</th>
            <th className="px-4 py-2.5 text-left font-medium uppercase tracking-wider">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((it) => {
            const c = groupColorMap[it.group] || groupColorMap["other"] || groupColorMap["other"] || groupColorMap["other"] || groupColorMap["other"] || groupColorMap["other"] || groupColorMap["other"]
            return (
              <tr key={it.id} className="hover:bg-muted/40">
                <td className="px-4 py-2.5 font-mono font-medium text-foreground">{it.type_name}</td>
                <td className="px-4 py-2.5">
                  <span className={cn("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset", c.bg, c.text, c.ring)}>
                    <span className={cn("h-1 w-1 rounded-full", c.dot)} />
                    {it.group}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{it.import_source}</td>
                <td className="px-4 py-2.5 font-mono tabular-nums">{it.typical_fields.length}</td>
                <td className="px-4 py-2.5 font-mono tabular-nums">{it.legacy_helper_mapping.length}</td>
                <td className="px-4 py-2.5">
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={() => onEdit(it)}>
                    编辑
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
