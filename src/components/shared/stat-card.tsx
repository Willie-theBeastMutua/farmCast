import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function StatCard({
  label,
  value,
  unit,
  icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-5 ring-1 ring-foreground/5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">
          {label}
        </p>
        {icon && (
          <div className="shrink-0 rounded-lg bg-primary/8 p-2 text-primary">
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold tabular-nums text-foreground">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>

        {trend && trendValue && (
          <div
            className={cn(
              "mt-1.5 inline-flex items-center gap-1 text-xs font-medium",
              trend === "up" && "text-green-700",
              trend === "down" && "text-red-600",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {trend === "up" && <TrendingUp className="size-3" />}
            {trend === "down" && <TrendingDown className="size-3" />}
            {trend === "neutral" && <Minus className="size-3" />}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  )
}
