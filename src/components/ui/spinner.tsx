import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    size: {
      sm: "size-3",
      default: "size-4",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function Spinner({
  className,
  size,
  ...props
}: React.ComponentProps<"svg"> & VariantProps<typeof spinnerVariants>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

function LoadingState({
  className,
  label = "Loading…",
  size,
}: {
  className?: string
  label?: string
  size?: VariantProps<typeof spinnerVariants>["size"]
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground",
        className
      )}
    >
      <Spinner size={size ?? "lg"} className="text-primary/60" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export { Spinner, LoadingState, spinnerVariants }
