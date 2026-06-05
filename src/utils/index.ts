import { RiskSeverity } from "@/types";

export function formatTemperature(value: number, unit: "C" | "F" = "C"): string {
  return `${Math.round(value)}°${unit}`;
}

export function formatWindSpeed(value: number): string {
  return `${Math.round(value)} km/h`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function getRiskColor(severity: RiskSeverity): string {
  const map: Record<RiskSeverity, string> = {
    low: "text-green-600",
    moderate: "text-yellow-600",
    high: "text-orange-600",
    critical: "text-red-600",
  };
  return map[severity];
}

export function getRiskBgColor(severity: RiskSeverity): string {
  const map: Record<RiskSeverity, string> = {
    low: "bg-green-50 border-green-200",
    moderate: "bg-yellow-50 border-yellow-200",
    high: "bg-orange-50 border-orange-200",
    critical: "bg-red-50 border-red-200",
  };
  return map[severity];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
