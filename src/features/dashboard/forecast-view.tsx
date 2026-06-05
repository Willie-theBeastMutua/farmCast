import { Cloud, CloudRain, Sun, CloudSnow, Wind, CloudLightning } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { ForecastSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorMessage } from "@/components/shared/error-message";
import { cn } from "@/lib/utils";
import type { DailyForecast, LoadingState } from "@/types";

interface ForecastViewProps {
  data: DailyForecast[] | null;
  state: LoadingState;
  error: string | null;
  onRetry?: () => void;
}

function WeatherIcon({
  condition,
  className,
}: {
  condition: string;
  className?: string;
}) {
  const c = condition.toLowerCase();
  if (c.includes("thunder") || c.includes("storm"))
    return <CloudLightning className={cn("text-yellow-500", className)} />;
  if (c.includes("rain") || c.includes("shower"))
    return <CloudRain className={cn("text-blue-500", className)} />;
  if (c.includes("snow"))
    return <CloudSnow className={cn("text-blue-300", className)} />;
  if (c.includes("wind"))
    return <Wind className={cn("text-slate-400", className)} />;
  if (c.includes("cloud") || c.includes("overcast"))
    return <Cloud className={cn("text-slate-400", className)} />;
  return <Sun className={cn("text-amber-400", className)} />;
}

export function ForecastView({ data, state, error, onRetry }: ForecastViewProps) {
  if (state === "loading") {
    return (
      <div>
        <SectionHeader
          title="7-Day Forecast"
          description="Daily temperature range and rain probability"
        />
        <ForecastSkeleton />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div>
        <SectionHeader title="7-Day Forecast" />
        <ErrorMessage message={error!} onRetry={onRetry} />
      </div>
    );
  }

  if (!data?.length) return null;

  return (
    <div>
      <SectionHeader
        title="7-Day Forecast"
        description="Daily temperature range and rain probability"
      />
      <div className="space-y-1.5">
        {data.map((day, i) => (
          <ForecastRow key={day.date} day={day} isToday={i === 0} />
        ))}
      </div>
    </div>
  );
}

function ForecastRow({
  day,
  isToday,
}: {
  day: DailyForecast;
  isToday: boolean;
}) {
  const label = isToday
    ? "Today"
    : new Date(day.date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border px-4 py-3",
        isToday
          ? "border-primary/20 bg-primary/[0.04]"
          : "border-border bg-card"
      )}
    >
      <span
        className={cn(
          "w-24 shrink-0 text-sm font-medium",
          isToday ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </span>

      <WeatherIcon condition={day.condition} className="size-5 shrink-0" />

      <span className="hidden min-w-0 flex-1 truncate text-xs text-muted-foreground sm:block">
        {day.condition}
      </span>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-baseline gap-1 text-sm">
          <span className="font-semibold tabular-nums text-foreground">
            {day.tempMax}°
          </span>
          <span className="tabular-nums text-muted-foreground">{day.tempMin}°</span>
        </div>

        <div className="flex w-20 shrink-0 items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-blue-400/80 transition-all"
              style={{ width: `${day.rainProbability}%` }}
            />
          </div>
          <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
            {day.rainProbability}%
          </span>
        </div>
      </div>
    </div>
  );
}
