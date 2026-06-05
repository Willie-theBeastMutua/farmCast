import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative flex gap-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground border-border [&_[data-slot=alert-icon]]:text-muted-foreground",
        info:
          "bg-blue-50 text-blue-900 border-blue-200 [&_[data-slot=alert-icon]]:text-blue-600",
        success:
          "bg-green-50 text-green-900 border-green-200 [&_[data-slot=alert-icon]]:text-green-600",
        warning:
          "bg-amber-50 text-amber-900 border-amber-200 [&_[data-slot=alert-icon]]:text-amber-600",
        error:
          "bg-red-50 text-red-900 border-red-200 [&_[data-slot=alert-icon]]:text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-icon"
      className={cn("mt-0.5 shrink-0 [&>svg]:size-4", className)}
      {...props}
    />
  )
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("flex-1 space-y-0.5 min-w-0", className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn("font-medium leading-snug", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-description"
      className={cn("opacity-80 leading-relaxed", className)}
      {...props}
    />
  )
}

export {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  alertVariants,
}
