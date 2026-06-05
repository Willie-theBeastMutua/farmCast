import { Calendar, Clock, CalendarDays, ListTodo } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ActivitySuggestion, LoadingState } from "@/types";

interface ActivitySuggestionsProps {
  data: ActivitySuggestion[] | null;
  state: LoadingState;
}

const timeframeConfig = {
  today: { badge: "info" as const, Icon: Clock, label: "Today" },
  tomorrow: { badge: "warning" as const, Icon: Calendar, label: "Tomorrow" },
  "this-week": { badge: "muted" as const, Icon: CalendarDays, label: "This Week" },
};

export function ActivitySuggestions({ data, state }: ActivitySuggestionsProps) {
  if (state === "loading") {
    return (
      <div>
        <SectionHeader
          title="Activity Suggestions"
          description="Short-term and mid-term farm guidance"
        />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl border border-border bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  const grouped = data
    ? (["today", "tomorrow", "this-week"] as const).reduce<
        Record<ActivitySuggestion["timeframe"], ActivitySuggestion[]>
      >(
        (acc, tf) => {
          acc[tf] = data.filter((a) => a.timeframe === tf);
          return acc;
        },
        { today: [], tomorrow: [], "this-week": [] }
      )
    : null;

  return (
    <div>
      <SectionHeader
        title="Activity Suggestions"
        description="Short-term and mid-term farm guidance"
      />

      {!data || data.length === 0 ? (
        <EmptyState
          title="No activity suggestions"
          description="Submit your farm profile to receive activity guidance."
          icon={<ListTodo />}
        />
      ) : (
        <div className="space-y-4">
          {(["today", "tomorrow", "this-week"] as const).map((tf) => {
            const items = grouped![tf];
            if (!items.length) return null;
            const { badge, Icon, label } = timeframeConfig[tf];
            return (
              <div key={tf}>
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="size-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </span>
                  <Badge variant={badge} className="ml-auto">
                    {items.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {items.map((a) => (
                    <div
                      key={a.id}
                      className="flex gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {a.activity}
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {a.rationale}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Condition:{" "}
                          </span>
                          {a.weatherCondition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
