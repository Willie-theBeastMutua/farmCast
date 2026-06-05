"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="size-6 text-red-500" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">Dashboard error</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Something went wrong loading the dashboard. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
