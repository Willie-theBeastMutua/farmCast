import * as React from "react"

import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center",
        className
      )}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-5">
          {icon}
        </div>
      )}
      <div className="space-y-1 max-w-xs">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
