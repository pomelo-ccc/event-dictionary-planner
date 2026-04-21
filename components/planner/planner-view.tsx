"use client"

import { useMemo, useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { Plus, FileCode2, Search, Layers, ChevronRight, Hash, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { EventDictionaryItem, EventFile, FunctionCard as FunctionCardType, ProjectId, SplitGroup } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  vscDarkPlus,
  oneDark,
  oneLight,
  dracula,
  nord,
  nightOwl,
  materialDark,
  materialLight,
  synthwave84,
  atomDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check } from "lucide-react"
import { KanbanColumn } from "./kanban-column"

const CODE_THEMES: Record<string, { name: string; style: any }> = {
  oneDark: { name: "Zed One Theme", style: oneDark },
  vscDarkPlus: { name: "VS Code Dark+", style: vscDarkPlus },
  dracula: { name: "Dracula", style: dracula },
  nord: { name: "Nord", style: nord },
  nightOwl: { name: "Night Owl", style: nightOwl },
  materialDark: { name: "Material Dark", style: materialDark },
  materialLight: { name: "Material Light", style: materialLight },
  synthwave84: { name: "Synthwave '84", style: synthwave84 },
  atomDark: { name: "Atom Dark", style: atomDark },
  oneLight: { name: "One Light", style: oneLight },
}
import { FunctionCard } from "./function-card"

interface Props {
  project: ProjectId
  files: EventFile[]
  setFiles: (f: EventFile[]) => void
  dictionary: EventDictionaryItem[]
  setDictionary: (d: EventDictionaryItem[]) => void
}

export function PlannerView({ project, files, setFiles, dictionary, setDictionary }: Props) {
  const projectFiles = useMemo(() => files.filter((f) => f.project === project), [files, project])
  const [activeFileId, setActiveFileId] = useState<string | null>(projectFiles[0]?.id || null)
  const [search, setSearch] = useState("")
  const [activeCard, setActiveCard] = useState<FunctionCardType | null>(null)
  const [addFileDialogOpen, setAddFileDialogOpen] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const [deleteFileId, setDeleteFileId] = useState<string | null>(null)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [theme, setTheme] = useState("oneDark")
  const [isCopied, setIsCopied] = useState(false)

  // when project switches, ensure activeFile belongs to it
  const activeFile = projectFiles.find((f) => f.id === activeFileId) || projectFiles[0] || null

  const filteredFiles = projectFiles.filter((f) =>
    !search.trim() || f.filename.toLowerCase().includes(search.toLowerCase()),
  )

  function updateFile(updated: EventFile) {
    setFiles(files.map((f) => (f.id === updated.id ? updated : f)))
  }

  function addFile() {
    if (!newFileName.trim()) return
    const name = newFileName.trim()
    const finalName = name.endsWith(".event.ts") ? name : `${name}.event.ts`
    const newFile: EventFile = { id: `f${Date.now()}`, project, filename: finalName, groups: [] }
    setFiles([...files, newFile])
    setActiveFileId(newFile.id)
    setNewFileName("")
    setAddFileDialogOpen(false)
  }

  function deleteFile(id: string) {
    setFiles(files.filter((f) => f.id !== id))
    if (activeFileId === id) {
      const remaining = projectFiles.filter((f) => f.id !== id)
      setActiveFileId(remaining[0]?.id || null)
    }
    setDeleteFileId(null)
  }

  function canDeleteFile(f: EventFile): boolean {
    // 只有空文件（没有分组或分组内没有卡片）才能删除
    const totalCards = f.groups.reduce((acc, g) => acc + g.cards.length, 0)
    return totalCards === 0
  }

  function addGroup() {
    if (!activeFile) return
    const newGroup: SplitGroup = {
      id: `g${Date.now()}`,
      name: `新分组 ${activeFile.groups.length + 1}`,
      cards: [],
    }
    updateFile({ ...activeFile, groups: [...activeFile.groups, newGroup] })
  }

  function updateGroup(g: SplitGroup) {
    if (!activeFile) return
    updateFile({ ...activeFile, groups: activeFile.groups.map((x) => (x.id === g.id ? g : x)) })
  }

  const [deleteGroupId, setDeleteGroupId] = useState<string | null>(null)

  function confirmDeleteGroup(id: string) {
    setDeleteGroupId(id)
  }

  function doDeleteGroup() {
    if (!activeFile || !deleteGroupId) return
    updateFile({ ...activeFile, groups: activeFile.groups.filter((g) => g.id !== deleteGroupId) })
    setDeleteGroupId(null)
  }

  // ====== DnD ======
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  function findContainer(id: string): SplitGroup | null {
    if (!activeFile) return null
    if (id.startsWith("column-")) {
      const gid = id.slice("column-".length)
      return activeFile.groups.find((g) => g.id === gid) || null
    }
    return activeFile.groups.find((g) => g.cards.some((c) => c.id === id)) || null
  }

  function findCard(id: string): FunctionCardType | null {
    if (!activeFile) return null
    for (const g of activeFile.groups) {
      const c = g.cards.find((c) => c.id === id)
      if (c) return c
    }
    return null
  }

  function onDragStart(e: DragStartEvent) {
    const id = String(e.active.id)
    setActiveCard(findCard(id))
  }

  function onDragOver(e: DragOverEvent) {
    if (!activeFile) return
    const activeId = String(e.active.id)
    const overId = e.over ? String(e.over.id) : null
    if (!overId) return

    const fromGroup = findContainer(activeId)
    const toGroup = findContainer(overId)
    if (!fromGroup || !toGroup || fromGroup.id === toGroup.id) return

    const card = fromGroup.cards.find((c) => c.id === activeId)
    if (!card) return

    const newGroups = activeFile.groups.map((g) => {
      if (g.id === fromGroup.id) return { ...g, cards: g.cards.filter((c) => c.id !== activeId) }
      if (g.id === toGroup.id) {
        const overIdx = g.cards.findIndex((c) => c.id === overId)
        const insertAt = overIdx >= 0 ? overIdx : g.cards.length
        const next = [...g.cards]
        next.splice(insertAt, 0, card)
        return { ...g, cards: next }
      }
      return g
    })
    updateFile({ ...activeFile, groups: newGroups })
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveCard(null)
    if (!activeFile) return
    const activeId = String(e.active.id)
    const overId = e.over ? String(e.over.id) : null
    if (!overId || activeId === overId) return

    const fromGroup = findContainer(activeId)
    const toGroup = findContainer(overId)
    if (!fromGroup || !toGroup || fromGroup.id !== toGroup.id) return

    const oldIdx = fromGroup.cards.findIndex((c) => c.id === activeId)
    const newIdx = fromGroup.cards.findIndex((c) => c.id === overId)
    if (oldIdx < 0 || newIdx < 0) return
    const reordered = arrayMove(fromGroup.cards, oldIdx, newIdx)
    updateFile({
      ...activeFile,
      groups: activeFile.groups.map((g) => (g.id === fromGroup.id ? { ...g, cards: reordered } : g)),
    })
  }

  // ====== Stats ======
  const fileTotalLines = activeFile?.groups.reduce((acc, g) => acc + g.cards.reduce((a, c) => a + c.lines, 0), 0) ?? 0
  const fileTotalFns = activeFile?.groups.reduce((acc, g) => acc + g.cards.length, 0) ?? 0

  const selectedCard = selectedCardId ? findCard(selectedCardId) : null;

  const handleCopy = async () => {
    if (!selectedCard?.code) return
    try {
      await navigator.clipboard.writeText(selectedCard.code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (e) {
      console.error("Failed to copy", e)
    }
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      {/* Left: file list */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <aside className="flex h-full flex-col bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <FileCode2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">事件文件</span>
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground tabular-nums">
              {projectFiles.length}
            </span>
          </div>
          <button
            onClick={() => setAddFileDialogOpen(true)}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="新建文件"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="px-3 pt-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="筛选文件..."
              className="h-7 pl-7 text-xs"
            />
          </div>
        </div>

        <nav className="mt-2 flex-1 overflow-y-auto px-2 pb-2">
          {filteredFiles.map((f) => {
            const total = f.groups.reduce((acc, g) => acc + g.cards.length, 0)
            const lines = f.groups.reduce((acc, g) => acc + g.cards.reduce((a, c) => a + c.lines, 0), 0)
            const active = activeFile?.id === f.id
            const deletable = canDeleteFile(f)
            return (
              <div
                key={f.id}
                className={cn(
                  "mb-1 flex w-full items-start gap-1 rounded-md px-2.5 py-2 transition-colors group",
                  active ? "bg-foreground text-background" : "hover:bg-accent",
                )}
              >
                <button
                  onClick={() => setActiveFileId(f.id)}
                  className="flex flex-1 items-start gap-2 min-w-0 text-left"
                >
                  <FileCode2
                    className={cn(
                      "mt-0.5 h-3.5 w-3.5 shrink-0",
                      active ? "text-background/80" : "text-muted-foreground",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className={cn("truncate font-mono text-[12px] font-medium", active ? "text-background" : "text-foreground")}>
                      {f.filename}
                    </div>
                    <div
                      className={cn(
                        "mt-0.5 flex items-center gap-2 text-[10px]",
                        active ? "text-background/70" : "text-muted-foreground",
                      )}
                    >
                      <span className="flex items-center gap-0.5">
                        <Layers className="h-2.5 w-2.5" />
                        <span className="font-mono tabular-nums">{f.groups.length}</span>
                      </span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{total} fn</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{lines}L</span>
                    </div>
                  </div>
                  {active && <ChevronRight className="mt-0.5 h-3 w-3 text-background/70" />}
                </button>
                {deletable && !active && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteFileId(f.id) }}
                    className="mt-0.5 h-5 w-5 shrink-0 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 transition-opacity"
                    aria-label="删除文件"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            )
          })}
          {filteredFiles.length === 0 && (
            <div className="rounded-md border border-dashed border-border px-3 py-4 text-center text-[11px] text-muted-foreground">
              暂无文件
            </div>
          )}
        </nav>

        {/* Project stats */}
        <div className="border-t border-border p-3">
          <div className="rounded-md bg-muted/60 p-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {project} 项目统计
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              <SmallStat label="文件" value={projectFiles.length} />
              <SmallStat
                label="函数"
                value={projectFiles.reduce(
                  (acc, f) => acc + f.groups.reduce((a, g) => a + g.cards.length, 0),
                  0,
                )}
              />
              <SmallStat
                label="行数"
                value={projectFiles.reduce(
                  (acc, f) => acc + f.groups.reduce((a, g) => a + g.cards.reduce((x, c) => x + c.lines, 0), 0),
                  0,
                )}
              />
            </div>
          </div>
        </div>
      </aside>
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-border" />

      {/* Main: kanban */}
      <ResizablePanel defaultSize={selectedCard ? 50 : 80}>
      <div className="flex h-full flex-col overflow-hidden bg-muted/30">
        {/* File header */}
        <div className="flex items-center gap-3 border-b border-border bg-background px-6 py-3">
          {activeFile ? (
            <>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground">
                    {project}
                  </span>
                  <h1 className="truncate font-mono text-sm font-semibold text-foreground">{activeFile.filename}</h1>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  把文件中的函数手动梳理到下面的拆分目标分组中
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <HeaderStat icon={<Layers className="h-3 w-3" />} label="分组" value={activeFile.groups.length} />
                <HeaderStat icon={<Hash className="h-3 w-3" />} label="函数" value={fileTotalFns} />
                <HeaderStat
                  icon={<Hash className="h-3 w-3" />}
                  label="总行数"
                  value={fileTotalLines}
                  emphasis
                />
                <Button size="sm" className="h-8" onClick={addGroup}>
                  <Plus className="h-3.5 w-3.5" />
                  新增分组
                </Button>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">该项目下还没有文件,请新建一个</div>
          )}
        </div>

        {/* Kanban */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          {activeFile && activeFile.groups.length > 0 ? (
            <DndContext id="split-planner-dnd-context"
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
            >
              <div className="flex h-full gap-3 px-6 py-5">
                <SortableContext
                  items={activeFile.groups.flatMap((g) => g.cards.map((c) => c.id))}
                >
                  {activeFile.groups.map((g) => (
                    <KanbanColumn
                      key={g.id}
                      group={g}
                      dictionary={dictionary}
                      onUpdate={updateGroup}
                      onDelete={() => confirmDeleteGroup(g.id)}
                      onDictionaryUpdate={setDictionary}
                      selectedCardId={selectedCardId}
                      onSelectCard={setSelectedCardId}
                      project={project}
                    />
                  ))}
                </SortableContext>

                {/* Add column placeholder */}
                <button
                  onClick={addGroup}
                  className="flex h-full w-[46rem] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-card/40 text-xs text-muted-foreground hover:border-foreground/40 hover:bg-card hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                  新增拆分分组
                </button>
              </div>

              <DragOverlay>
                {activeCard && <FunctionCard card={activeCard} dictionary={dictionary} onChange={() => {}} onDelete={() => {}} isDragging />}
              </DragOverlay>
            </DndContext>
          ) : activeFile ? (
            <EmptyBoard onAdd={addGroup} />
          ) : null}
        </div>
        {/* Dialogs */}
        <Dialog open={addFileDialogOpen} onOpenChange={setAddFileDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>新建事件文件</DialogTitle>
              <DialogDescription>输入新文件的名称（自动添加 .event.ts 后缀）</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addFile() }}
                placeholder="例如: my-module 或 my-module.event.ts"
                className="h-9 font-mono text-sm"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" size="sm" onClick={() => { setAddFileDialogOpen(false); setNewFileName("") }}>
                取消
              </Button>
              <Button size="sm" disabled={!newFileName.trim()} onClick={addFile}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                创建
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!deleteFileId} onOpenChange={(open) => !open && setDeleteFileId(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>确认删除文件</DialogTitle>
              <DialogDescription>
                确定要删除「<span className="font-mono font-medium">{projectFiles.find(f => f.id === deleteFileId)?.filename}</span>」吗？此操作不可撤销。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" size="sm" onClick={() => setDeleteFileId(null)}>取消</Button>
              <Button variant="destructive" size="sm" onClick={() => deleteFile(deleteFileId!)}>
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                删除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!deleteGroupId} onOpenChange={(open) => !open && setDeleteGroupId(null)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>确认删除分组</DialogTitle>
              <DialogDescription>
                确定要删除该分组及其下所有函数卡片吗？此操作不可撤销。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" size="sm" onClick={() => setDeleteGroupId(null)}>取消</Button>
              <Button variant="destructive" size="sm" onClick={doDeleteGroup}>
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                删除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      </ResizablePanel>

      {/* Right: Code Viewer */}
      {selectedCard && (
        <>
          <ResizableHandle withHandle className="bg-border" />
          <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
            <div className="flex h-full flex-col bg-background border-l border-border">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground truncate max-w-[200px]" title={selectedCard.name}>
                    {selectedCard.name}
                  </span>
                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shrink-0">
                    {selectedCard.lines}L
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="h-6 w-[140px] text-[10px] border-border bg-background focus:ring-0 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CODE_THEMES).map(([key, t]) => (
                        <SelectItem key={key} value={key} className="text-[10px]">
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    onClick={handleCopy}
                    className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
                    title="复制代码"
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => setSelectedCardId(null)}
                    className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
                    aria-label="关闭代码面板"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-[#1E1E1E]">
                <SyntaxHighlighter
                  language="typescript"
                  style={CODE_THEMES[theme].style}
                  customStyle={{ margin: 0, padding: '1rem', minHeight: '100%', fontSize: '13px' }}
                  showLineNumbers
                >
                  {selectedCard.code || `// 占位代码：没有真实代码内容\n// 函数名称：${selectedCard.name}\n// 行数估算：${selectedCard.lines} 行\n\nfunction ${selectedCard.name}() {\n  // TODO: Implement ${selectedCard.name}\n}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}

function SmallStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded bg-background px-2 py-1">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-mono text-sm font-semibold text-foreground tabular-nums">{value}</div>
    </div>
  )
}

function HeaderStat({
  icon,
  label,
  value,
  emphasis,
}: {
  icon: React.ReactNode
  label: string
  value: number
  emphasis?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px]",
        emphasis ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-border bg-card text-foreground",
      )}
    >
      <span className={cn(emphasis ? "text-emerald-600" : "text-muted-foreground")}>{icon}</span>
      <span className={cn("uppercase tracking-wider text-[10px]", emphasis ? "text-emerald-600/80" : "text-muted-foreground")}>
        {label}
      </span>
      <span className="font-mono font-semibold tabular-nums">{value}</span>
    </div>
  )
}

function EmptyBoard({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex h-full items-center justify-center px-6 py-10">
      <div className="flex max-w-sm flex-col items-center rounded-xl border border-dashed border-border bg-card p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foreground text-background">
          <Layers className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-foreground">开始规划拆分</h3>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
          为这个文件创建多个分组(代表拆分后的新文件模块),然后把文件中的函数梳理到对应分组中。
        </p>
        <Button size="sm" className="mt-5 h-8" onClick={onAdd}>
          <Plus className="h-3.5 w-3.5" />
          新增第一个分组
        </Button>
      </div>
    </div>
  )
}
