import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  className,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className={cn("rounded-lg border border-red-200 bg-red-50 p-4", className)}>
      <p className="text-sm font-medium text-red-800">{title}</p>
      <p className="mt-1 text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 text-sm font-medium text-red-800 underline hover:no-underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
