import { AlertCircle, CheckCircle, Info, MessageSquare } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { ListSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorMessage } from "@/components/shared/error-message";
import { cn } from "@/lib/utils";
import type { Recommendation, LoadingState } from "@/types";

interface RecommendationPanelProps {
  data: Recommendation[] | null;
  state: LoadingState;
  error: string | null;
  onRetry?: () => void;
}

const priorityIcon = {
  high: AlertCircle,
  medium: Info,
  low: CheckCircle,
} as const;

const priorityColor = {
  high: "text-red-500",
  medium: "text-amber-500",
  low: "text-green-600",
} as const;

const priorityBadge = {
  high: "destructive",
  medium: "warning",
  low: "success",
} as const;

const categoryLabel: Record<Recommendation["category"], string> = {
  irrigation: "Irrigation",
  spraying: "Spraying",
  fertilization: "Fertilization",
  harvesting: "Harvesting",
  general: "General",
};

export function RecommendationPanel({
  data,
  state,
  error,
  onRetry,
}: RecommendationPanelProps) {
  if (state === "loading") {
    return (
      <div>
        <SectionHeader
          title="Recommendations"
          description="Action items based on current conditions"
        />
        <ListSkeleton rows={4} />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div>
        <SectionHeader title="Recommendations" />
        <ErrorMessage message={error!} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Recommendations"
        description="Action items based on current conditions"
      >
        {data && data.length > 0 && (
          <Badge variant="muted">{data.length}</Badge>
        )}
      </SectionHeader>

      {!data || data.length === 0 ? (
        <EmptyState
          title="No recommendations yet"
          description="Submit your farm profile to receive tailored recommendations."
          icon={<MessageSquare />}
        />
      ) : (
        <div className="space-y-2">
          {data.map((rec) => {
            const Icon = priorityIcon[rec.priority];
            return (
              <div
                key={rec.id}
                className={cn(
                  "flex gap-3 rounded-xl border bg-card p-4",
                  rec.actionRequired
                    ? "border-l-2 border-l-amber-400"
                    : "border-border"
                )}
              >
                <Icon
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    priorityColor[rec.priority]
                  )}
                />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-start gap-2">
                    <p className="text-sm font-medium leading-snug text-foreground">
                      {rec.title}
                    </p>
                    <div className="flex gap-1.5">
                      <Badge
                        variant={priorityBadge[rec.priority]}
                        className="capitalize"
                      >
                        {rec.priority}
                      </Badge>
                      <Badge variant="outline">
                        {categoryLabel[rec.category]}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {rec.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
