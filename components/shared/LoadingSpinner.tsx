"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the spinner
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl"
  /**
   * Color of the spinner
   * @default "primary"
   */
  color?: "primary" | "secondary" | "muted"
  /**
   * Custom className
   */
  className?: string
  /**
   * Label for accessibility
   * @default "Loading..."
   */
  label?: string
}

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
}

const colorClasses = {
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  muted: "text-muted-foreground",
}

/**
 * LoadingSpinner - Animated loading spinner with configurable size and color
 * 
 * Uses motion for smooth rotation animation.
 * Accessible with proper ARIA label.
 */
export function LoadingSpinner({
  size = "md",
  color = "primary",
  className,
  label = "Loading...",
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={cn(sizeClasses[size], colorClasses[color])}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
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
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </motion.svg>
      <span className="sr-only">{label}</span>
    </div>
  )
}
