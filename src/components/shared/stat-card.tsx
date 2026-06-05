import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({ label, value, unit, icon, className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-lg border border-border p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
        </div>
        {icon && (
          <div className="p-2 rounded-md bg-muted text-muted-foreground">{icon}</div>
        )}
      </div>
    </div>
  );
}
