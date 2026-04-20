"use client"

import { BookOpen, LayoutGrid, Database, Github, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProjectId } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Tab = "dictionary" | "planner"

interface AppShellProps {
  activeTab: Tab
  onTabChange: (t: Tab) => void
  project: ProjectId
  onProjectChange: (p: ProjectId) => void
  rightSlot?: React.ReactNode
}

const PROJECTS: ProjectId[] = ["PDM", "UMC", "PPM"]

export function AppShell({ activeTab, onTabChange, project, onProjectChange, rightSlot }: AppShellProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-14 items-center gap-6 px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
            <Database className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight text-foreground">Event Refactor Studio</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              Dictionary · Planner
            </span>
          </div>
        </div>

        {/* Project switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
              aria-label="切换项目"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-foreground text-[10px] font-bold text-background">
                {project[0]}
              </span>
              <span className="font-mono">{project}</span>
              <svg className="h-3 w-3 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel className="text-xs">项目空间</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PROJECTS.map((p) => (
              <DropdownMenuItem
                key={p}
                onClick={() => onProjectChange(p)}
                className={cn("font-mono text-xs", p === project && "bg-accent")}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded bg-foreground text-[10px] font-bold text-background">
                  {p[0]}
                </span>
                {p}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tabs */}
        <nav className="flex items-center gap-1" aria-label="主导航">
          <TabButton
            active={activeTab === "dictionary"}
            onClick={() => onTabChange("dictionary")}
            icon={<BookOpen className="h-3.5 w-3.5" />}
            label="事件字典"
          />
          <TabButton
            active={activeTab === "planner"}
            onClick={() => onTabChange("planner")}
            icon={<LayoutGrid className="h-3.5 w-3.5" />}
            label="拆分规划"
          />
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2">
          {rightSlot}
          <div className="mx-1 h-5 w-px bg-border" aria-hidden />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="设置">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  )
}
