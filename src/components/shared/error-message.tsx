import { AlertTriangle } from "lucide-react"

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  title?: string
  message: string
  className?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  className,
  onRetry,
}: ErrorMessageProps) {
  return (
    <Alert variant="error" className={cn(className)}>
      <AlertIcon>
        <AlertTriangle />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        {onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="mt-2 -ml-1 h-7 px-2 text-red-700 hover:bg-red-100 hover:text-red-800"
          >
            Try again
          </Button>
        )}
      </AlertContent>
    </Alert>
  )
}
