import { PageShell } from "@/components/layout";
import {
  StatCardSkeleton,
  ForecastSkeleton,
  SectionSkeleton,
} from "@/components/shared/loading-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <PageShell>
      <div className="mb-8 space-y-1">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[340px_1fr]">
        <Skeleton className="h-96 rounded-xl" />

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
          <ForecastSkeleton />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <SectionSkeleton />
            <SectionSkeleton />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
