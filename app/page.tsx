"use client"

import { useCallback, useEffect, useState } from "react"
import { Download, Upload } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { DictionaryView } from "@/components/dictionary/dictionary-view"
import { PlannerView } from "@/components/planner/planner-view"
import { initialDictionary, initialFiles } from "@/lib/mock-data"
import { parsePDMReport, parsePPMReport, parseUMCReport } from "@/lib/json-import"
import type { EventDictionaryItem, EventFile, ProjectId } from "@/lib/types"
import { get, set } from "@/lib/idb"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Tab = "dictionary" | "planner"

// A simple IndexedDB wrapper for persistence
function usePersistedState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(defaultValue)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let mounted = true;
    get<T>(key)
      .then((stored) => {
        if (mounted && stored !== undefined) {
          setState(stored)
        }
      })
      .catch((e) => console.error(`Failed to load ${key} from IndexedDB`, e))
      .finally(() => {
        if (mounted) setIsLoaded(true)
      })
    return () => { mounted = false }
  }, [key])

  useEffect(() => {
    if (isLoaded) {
      set(key, state).catch((e) =>
        console.error(`Failed to save ${key} to IndexedDB`, e)
      )
    }
  }, [key, state, isLoaded])

  return [state, setState, isLoaded] as const
}

function DataSyncButtons({
  files,
  setFiles,
  dictionary,
  setDictionary,
  dictGroups,
  setDictGroups,
}: {
  files: EventFile[]
  setFiles: (f: EventFile[]) => void
  dictionary: EventDictionaryItem[]
  setDictionary: (d: EventDictionaryItem[]) => void
  dictGroups: string[]
  setDictGroups: (g: string[]) => void
}) {
  // --- Export dialog state ---
  const [exportOpen, setExportOpen] = useState(false)
  const [exportFileIds, setExportFileIds] = useState<Set<string>>(new Set())
  const [exportDict, setExportDict] = useState(true)
  const [exportGroups, setExportGroups] = useState(true)

  const openExportDialog = useCallback(() => {
    setExportFileIds(new Set(files.map((f) => f.id)))
    setExportDict(true)
    setExportGroups(true)
    setExportOpen(true)
  }, [files])

  const toggleExportFile = (id: string) => {
    setExportFileIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAllFiles = () => {
    setExportFileIds((prev) =>
      prev.size === files.length ? new Set() : new Set(files.map((f) => f.id))
    )
  }

  const confirmExport = () => {
    const selectedFiles = files.filter((f) => exportFileIds.has(f.id))
    const data: Record<string, unknown> = {}
    if (selectedFiles.length > 0) data.files = selectedFiles
    if (exportDict) data.dictionary = dictionary
    if (exportGroups) data.dictGroups = dictGroups

    if (Object.keys(data).length === 0) {
      alert("请至少选择一项数据导出")
      return
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `event-refactor-data-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setExportOpen(false)
  }

  // --- Import dialog state ---
  const [importOpen, setImportOpen] = useState(false)
  const [importData, setImportData] = useState<{ files?: EventFile[]; dictionary?: EventDictionaryItem[]; dictGroups?: string[] } | null>(null)
  const [importFileIds, setImportFileIds] = useState<Set<string>>(new Set())
  const [importDict, setImportDict] = useState(false)
  const [importGroups, setImportGroups] = useState(false)

  const openImportDialog = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const content = ev.target?.result as string
          const data = JSON.parse(content)
          if (!data.files && !data.dictionary && !data.dictGroups) {
            alert("文件格式不正确，缺少必要的数据字段")
            return
          }
          setImportData(data)
          setImportFileIds(new Set(data.files?.map((f: EventFile) => f.id) ?? []))
          setImportDict(!!data.dictionary)
          setImportGroups(!!data.dictGroups)
          setImportOpen(true)
        } catch {
          alert("解析文件失败")
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const toggleImportFile = (id: string) => {
    setImportFileIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAllImportFiles = () => {
    if (!importData?.files) return
    setImportFileIds((prev) =>
      prev.size === importData.files!.length ? new Set() : new Set(importData.files!.map((f) => f.id))
    )
  }

  const confirmImport = () => {
    if (!importData) return

    if (importData.files && importFileIds.size > 0) {
      const selectedFiles = importData.files.filter((f) => importFileIds.has(f.id))
      // Merge: keep existing files not in import, add selected imported files (overwrite by id)
      const merged = [
        ...files.filter((f) => !selectedFiles.some((sf) => sf.id === f.id)),
        ...selectedFiles,
      ]
      setFiles(merged)
    }
    if (importData.dictionary && importDict) {
      setDictionary(importData.dictionary)
    }
    if (importData.dictGroups && importGroups) {
      setDictGroups(importData.dictGroups)
    }

    alert("导入成功！")
    setImportOpen(false)
    setImportData(null)
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={openExportDialog} title="导出数据">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={openImportDialog} title="导入数据">
        <Upload className="h-4 w-4" />
      </Button>

      {/* Export Dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>选择导出内容</DialogTitle>
            <DialogDescription>勾选需要导出的数据，未勾选的项目不会包含在导出文件中</DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-3 py-2">
            {/* Dictionary & Groups */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={exportDict} onCheckedChange={(v) => setExportDict(!!v)} />
                <span>事件字典 ({dictionary.length} 条)</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={exportGroups} onCheckedChange={(v) => setExportGroups(!!v)} />
                <span>字典分组 ({dictGroups.length} 个)</span>
              </label>
            </div>

            {/* Files section */}
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">文件列表 ({files.length})</span>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={toggleAllFiles}>
                  {exportFileIds.size === files.length ? "取消全选" : "全选"}
                </Button>
              </div>
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {files.map((f) => (
                  <label key={f.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5">
                    <Checkbox checked={exportFileIds.has(f.id)} onCheckedChange={() => toggleExportFile(f.id)} />
                    <span className="text-xs text-muted-foreground">[{f.project}]</span>
                    <span className="truncate">{f.filename}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportOpen(false)}>取消</Button>
            <Button onClick={confirmExport}>确认导出</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importOpen} onOpenChange={(open) => { setImportOpen(open); if (!open) setImportData(null) }}>
        <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>选择导入内容</DialogTitle>
            <DialogDescription>勾选需要导入的数据，导入的文件会覆盖同 ID 的已有数据</DialogDescription>
          </DialogHeader>
          {importData && (
            <div className="flex-1 overflow-y-auto space-y-3 py-2">
              {/* Dictionary & Groups */}
              <div className="space-y-2">
                {importData.dictionary && (
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={importDict} onCheckedChange={(v) => setImportDict(!!v)} />
                    <span>事件字典 ({importData.dictionary.length} 条)</span>
                  </label>
                )}
                {importData.dictGroups && (
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={importGroups} onCheckedChange={(v) => setImportGroups(!!v)} />
                    <span>字典分组 ({importData.dictGroups.length} 个)</span>
                  </label>
                )}
              </div>

              {/* Files section */}
              {importData.files && importData.files.length > 0 && (
                <div className="border-t pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">文件列表 ({importData.files.length})</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={toggleAllImportFiles}>
                      {importFileIds.size === importData.files.length ? "取消全选" : "全选"}
                    </Button>
                  </div>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {importData.files.map((f) => (
                      <label key={f.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5">
                        <Checkbox checked={importFileIds.has(f.id)} onCheckedChange={() => toggleImportFile(f.id)} />
                        <span className="text-xs text-muted-foreground">[{f.project}]</span>
                        <span className="truncate">{f.filename}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setImportOpen(false); setImportData(null) }}>取消</Button>
            <Button onClick={confirmImport}>确认导入</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function Page() {
  const [tab, setTab] = useState<Tab>("planner")
  const [project, setProject] = useState<ProjectId>("PDM")
  
  const [dictionary, setDictionary, dictLoaded] = usePersistedState<EventDictionaryItem[]>(
    "event-dictionary-data", 
    initialDictionary
  )
  const [dictGroups, setDictGroups, groupsLoaded] = usePersistedState<string[]>(
    "event-dictionary-groups",
    ["table", "form", "card", "menu", "page", "modal", "action", "wizard", "other"]
  )
  const [files, setFiles, filesLoaded] = usePersistedState<EventFile[]>(
    "event-planner-data", 
    initialFiles
  )

  const isReady = dictLoaded && filesLoaded && groupsLoaded

  useEffect(() => {
    if (!isReady) return

    const pdmFiles = files.filter((f) => f.project === "PDM")
    const hasPDMCode = pdmFiles.some((f) => f.groups.some((g) => g.cards.some((c) => Boolean(c.code))))
    if (!hasPDMCode) {
      fetch("/data/pdm-report.json")
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((json) => {
          const parsed = parsePDMReport(json)
          setFiles((prev) => {
            const withoutPDM = prev.filter((f) => f.project !== "PDM")
            return [...withoutPDM, ...parsed]
          })
        })
        .catch(() => {})
    }

    const umcFiles = files.filter((f) => f.project === "UMC")
    const hasUMCCode = umcFiles.some((f) => f.groups.some((g) => g.cards.some((c) => Boolean(c.code))))
    if (!hasUMCCode) {
      fetch("/data/umc-report.json")
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((json) => {
          const parsed = parseUMCReport(json)
          setFiles((prev) => {
            const withoutUMC = prev.filter((f) => f.project !== "UMC")
            return [...withoutUMC, ...parsed]
          })
        })
        .catch(() => {})
    }

    const ppmFiles = files.filter((f) => f.project === "PPM")
    const hasPPMCode = ppmFiles.some((f) => f.groups.some((g) => g.cards.some((c) => Boolean(c.code))))
    if (!hasPPMCode) {
      fetch("/data/ppm-report.json")
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((json) => {
          const parsed = parsePPMReport(json)
          setFiles((prev) => {
            const withoutPPM = prev.filter((f) => f.project !== "PPM")
            return [...withoutPPM, ...parsed]
          })
        })
        .catch(() => {})
    }
  }, [isReady, files, setFiles])

  if (!isReady) {
    return <div className="flex h-screen items-center justify-center bg-background text-sm text-muted-foreground">加载中...</div>
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <AppShell
        activeTab={tab}
        onTabChange={setTab}
        project={project}
        onProjectChange={setProject}
        rightSlot={
          <div className="flex items-center gap-2">
            <DataSyncButtons
              files={files}
              setFiles={setFiles}
              dictionary={dictionary}
              setDictionary={setDictionary}
              dictGroups={dictGroups}
              setDictGroups={setDictGroups}
            />
            <div className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[10px] text-muted-foreground md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              数据已自动保存到 IndexedDB
            </div>
          </div>
        }
      />
      <main className="flex-1 overflow-hidden">
        {tab === "dictionary" ? (
          <DictionaryView items={dictionary} setItems={setDictionary} groups={dictGroups} setGroups={setDictGroups} />
        ) : (
          <PlannerView
            project={project}
            files={files}
            setFiles={setFiles}
            dictionary={dictionary}
            setDictionary={setDictionary}
          />
        )}
      </main>
    </div>
  )
}
