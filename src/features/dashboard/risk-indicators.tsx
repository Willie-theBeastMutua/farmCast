import {
  CloudRain,
  Flame,
  Wind,
  Droplets,
  Sun,
  Snowflake,
  ShieldCheck,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RISK_SEVERITY_COLORS } from "@/constants";
import type { RiskIndicator, RiskSeverity, LoadingState } from "@/types";

interface RiskIndicatorsProps {
  data: RiskIndicator[] | null;
  state: LoadingState;
}

const riskIcon: Record<RiskIndicator["type"], React.ComponentType<{ className?: string }>> = {
  rainfall: CloudRain,
  heat: Flame,
  wind: Wind,
  humidity: Droplets,
  uv: Sun,
  frost: Snowflake,
};

const severityBadgeVariant: Record<RiskSeverity, "success" | "warning" | "destructive" | "muted"> = {
  low: "success",
  moderate: "warning",
  high: "destructive",
  critical: "destructive",
};

export function RiskIndicators({ data, state }: RiskIndicatorsProps) {
  if (state === "loading") {
    return (
      <div>
        <SectionHeader title="Risk Indicators" description="Active weather-based risks" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl border border-border bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  const hasHighRisk = data?.some(
    (r) => r.severity === "critical" || r.severity === "high"
  );

  return (
    <div>
      <SectionHeader
        title="Risk Indicators"
        description="Active weather-based risks"
      >
        {data && data.length > 0 && (
          <Badge variant={hasHighRisk ? "destructive" : "warning"}>
            {data.length} active
          </Badge>
        )}
      </SectionHeader>

      {!data || data.length === 0 ? (
        <EmptyState
          title="No active risks"
          description="Submit your farm profile to view weather-based risk flags."
          icon={<ShieldCheck />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {data.map((risk) => {
            const Icon = riskIcon[risk.type];
            return (
              <div
                key={risk.id}
                className={cn(
                  "flex gap-3 rounded-xl border p-4",
                  RISK_SEVERITY_COLORS[risk.severity]
                )}
              >
                <Icon className="mt-0.5 size-4 shrink-0" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug">
                      {risk.label}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {risk.value !== undefined && (
                        <span className="text-xs font-semibold tabular-nums">
                          {risk.value}{risk.unit}
                        </span>
                      )}
                      <Badge
                        variant={severityBadgeVariant[risk.severity]}
                        className="capitalize"
                      >
                        {risk.severity}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    {risk.description}
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
