"use client"

import { useEffect, useState } from "react"
import { AppShell } from "@/components/app-shell"
import { DictionaryView } from "@/components/dictionary/dictionary-view"
import { PlannerView } from "@/components/planner/planner-view"
import { initialDictionary, initialFiles } from "@/lib/mock-data"
import type { EventDictionaryItem, EventFile, ProjectId } from "@/lib/types"
import { get, set } from "@/lib/idb"

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
          <div className="hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[10px] text-muted-foreground md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            数据已自动保存到 IndexedDB
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
