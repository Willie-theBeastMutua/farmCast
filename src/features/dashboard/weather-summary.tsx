import { Droplets, Wind, Eye, Sun } from "lucide-react";
import { ErrorMessage } from "@/components/shared/error-message";
import { cn } from "@/lib/utils";
import type { LoadingState, WeatherData } from "@/types";

interface WeatherSummaryProps {
  data: WeatherData | null;
  state: LoadingState;
  error: string | null;
  onRetry?: () => void;
}

export function WeatherSummary({ data, state, error, onRetry }: WeatherSummaryProps) {
  if (state === "loading") {
    return (
      <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50">
          <div className="space-y-1.5">
            <div className="h-3.5 w-32 rounded bg-muted" />
            <div className="h-3 w-24 rounded bg-muted" />
          </div>
          <div className="h-6 w-20 rounded-md bg-muted" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr]">
          <div className="px-6 py-6 sm:border-r border-b sm:border-b-0 border-border/50">
            <div className="h-16 w-32 rounded-xl bg-muted mb-2" />
            <div className="h-3 w-24 rounded bg-muted" />
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-border/50">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4">
                <div className="size-8 rounded-lg bg-muted shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-2.5 w-14 rounded bg-muted" />
                  <div className="h-3.5 w-10 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return <ErrorMessage message={error!} onRetry={onRetry} />;
  }

  if (!data) return null;

  const { current } = data;
  const updatedTime = new Date(current.updatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const stats = [
    {
      label: "Rain chance",
      value: current.rainProbability,
      unit: "%",
      icon: Droplets,
      highlight: current.rainProbability > 60,
      note: current.rainProbability > 60 ? "High" : current.rainProbability < 20 ? "Unlikely" : "Moderate",
    },
    {
      label: "Wind speed",
      value: current.windSpeed,
      unit: " km/h",
      icon: Wind,
      highlight: current.windSpeed > 30,
      note: current.windSpeed > 30 ? "Strong" : "Calm",
    },
    {
      label: "Humidity",
      value: current.humidity,
      unit: "%",
      icon: Eye,
      highlight: current.humidity > 80,
      note: current.humidity > 80 ? "Very humid" : "Normal",
    },
    {
      label: "UV Index",
      value: current.uvIndex,
      unit: "",
      icon: Sun,
      highlight: current.uvIndex >= 8,
      note: uvLabel(current.uvIndex),
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50">
        <div>
          <p className="text-sm font-semibold text-foreground">{data.location}</p>
          <p className="text-xs text-muted-foreground">Updated {updatedTime}</p>
        </div>
        <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
          {current.condition}
        </span>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr]">
        {/* Temperature hero */}
        <div className="flex flex-col justify-center px-6 py-6 border-b sm:border-b-0 sm:border-r border-border/50">
          <p className="text-7xl font-bold text-foreground tabular-nums tracking-tight leading-none">
            {current.temperature}°
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Feels like {current.feelsLike}°C
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 divide-x divide-y divide-border/50">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-3 px-5 py-4">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    s.highlight
                      ? "bg-amber-50 text-amber-600"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-sm font-semibold tabular-nums text-foreground">
                    {s.value}{s.unit}
                  </p>
                  <p className={cn(
                    "text-xs",
                    s.highlight ? "text-amber-600" : "text-muted-foreground"
                  )}>
                    {s.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function uvLabel(uv: number): string {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}
