import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SkeletonRowsProps {
  rows?: number
  className?: string
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-5",
        className
      )}
    >
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-7 w-14" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  )
}

export function ListSkeleton({ rows = 3, className }: SkeletonRowsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex gap-3 rounded-xl border border-border bg-card p-4"
        >
          <Skeleton className="size-8 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2 pt-0.5">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ForecastSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3"
        >
          <Skeleton className="h-3 w-12 shrink-0" />
          <Skeleton className="size-5 shrink-0 rounded-full" />
          <div className="flex flex-1 items-center justify-between gap-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function FormSkeleton({ fields = 4, className }: { fields?: number; className?: string }) {
  return (
    <div className={cn("space-y-5 rounded-xl border border-border bg-card p-6", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-9 w-28 rounded-lg" />
    </div>
  )
}

export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
      <ListSkeleton rows={3} />
    </div>
  )
}
