"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width of the container
   * @default "max-w-7xl"
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"
  /**
   * Whether to center the container horizontally
   * @default true
   */
  centered?: boolean
  /**
   * Padding size
   * @default "px-4 sm:px-6 lg:px-8"
   */
  padding?: string
  /**
   * Children content
   */
  children: React.ReactNode
}

/**
 * Container - Responsive container with configurable max width and padding
 * 
 * Provides consistent horizontal spacing and max-width constraints.
 * Uses Tailwind's responsive padding utilities.
 */
export function Container({
  maxWidth = "7xl",
  centered = true,
  padding = "px-4 sm:px-6 lg:px-8",
  className,
  children,
  ...props
}: ContainerProps) {
  const maxWidthClass = maxWidth === "full" ? "max-w-full" : `max-w-${maxWidth}`

  return (
    <div
      className={cn(
        "w-full",
        centered && "mx-auto",
        maxWidthClass,
        padding,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
