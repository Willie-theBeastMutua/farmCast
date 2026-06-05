import { Thermometer, Droplets, Wind, Eye, Sun } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { StatCardSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorMessage } from "@/components/shared/error-message";
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
      <div className="space-y-3">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Current Conditions</h2>
          <p className="text-sm text-muted-foreground">
            {data.location} &middot; Updated {updatedTime}
          </p>
        </div>
        <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
          {current.condition}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label="Temperature"
          value={current.temperature}
          unit="°C"
          icon={<Thermometer className="size-4" />}
          trend="neutral"
          trendValue={`Feels like ${current.feelsLike}°C`}
        />
        <StatCard
          label="Rain Probability"
          value={current.rainProbability}
          unit="%"
          icon={<Droplets className="size-4" />}
          trend={
            current.rainProbability > 60
              ? "up"
              : current.rainProbability < 20
              ? "down"
              : "neutral"
          }
          trendValue={
            current.rainProbability > 60
              ? "High risk"
              : current.rainProbability < 20
              ? "Unlikely"
              : "Moderate"
          }
        />
        <StatCard
          label="Wind Speed"
          value={current.windSpeed}
          unit="km/h"
          icon={<Wind className="size-4" />}
          trend={current.windSpeed > 30 ? "up" : "neutral"}
          trendValue={current.windSpeed > 30 ? "Strong winds" : "Calm"}
        />
        <StatCard
          label="Humidity"
          value={current.humidity}
          unit="%"
          icon={<Eye className="size-4" />}
          trend={current.humidity > 80 ? "up" : "neutral"}
          trendValue={current.humidity > 80 ? "Very humid" : "Normal"}
        />
        <StatCard
          label="UV Index"
          value={current.uvIndex}
          icon={<Sun className="size-4" />}
          trend={current.uvIndex >= 8 ? "up" : "neutral"}
          trendValue={uvLabel(current.uvIndex)}
        />
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
