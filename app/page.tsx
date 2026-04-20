"use client"

import { useEffect, useState } from "react"
import { Download, Upload } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { DictionaryView } from "@/components/dictionary/dictionary-view"
import { PlannerView } from "@/components/planner/planner-view"
import { initialDictionary, initialFiles } from "@/lib/mock-data"
import { parsePDMReport, parsePPMReport, parseUMCReport } from "@/lib/json-import"
import type { EventDictionaryItem, EventFile, ProjectId } from "@/lib/types"
import { get, set } from "@/lib/idb"
import { Button } from "@/components/ui/button"

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
  const handleExport = () => {
    const data = { files, dictionary, dictGroups }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `event-refactor-data-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
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
          if (data.files && data.dictionary && data.dictGroups) {
            setFiles(data.files)
            setDictionary(data.dictionary)
            setDictGroups(data.dictGroups)
            alert("导入成功！")
          } else {
            alert("文件格式不正确，缺少必要的数据字段")
          }
        } catch (err) {
          alert("解析文件失败")
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleExport} title="导出数据">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleImport} title="导入数据">
        <Upload className="h-4 w-4" />
      </Button>
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
