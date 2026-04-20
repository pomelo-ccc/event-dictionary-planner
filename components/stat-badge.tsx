import { cn } from "@/lib/utils"

interface StatBadgeProps {
  label: string
  value: string | number
  tone?: "default" | "emerald" | "amber" | "rose" | "sky"
  className?: string
}

const toneClass: Record<string, string> = {
  default: "bg-muted text-foreground ring-border",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-200",
  sky: "bg-sky-50 text-sky-700 ring-sky-200",
}

export function StatBadge({ label, value, tone = "default", className }: StatBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        toneClass[tone],
        className,
      )}
    >
      <span className="text-[10px] uppercase tracking-wider opacity-70">{label}</span>
      <span className="font-mono font-semibold tabular-nums">{value}</span>
    </div>
  )
}
