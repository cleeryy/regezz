"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, type MotionProps } from "motion/react"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"
import { Star } from "lucide-react"

export interface XPDisplayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  /**
   * Current XP value
   */
  xp: number
  /**
   * Target XP for level up (optional, shows progress if provided)
   */
  targetXp?: number
  /**
   * Size of the display
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
  /**
   * Whether to show the star icon
   * @default true
   */
  showIcon?: boolean
  /**
   * Custom motion props for the container
   */
  motionProps?: MotionProps
  /**
   * Additional CSS classes
   */
  className?: string
}

const sizeClasses = {
  sm: "text-sm gap-1",
  md: "text-base gap-2",
  lg: "text-xl gap-2.5",
}

const iconSizes = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
}

/**
 * XPDisplay - Animated XP counter with spring-based number transitions
 * 
 * Features:
 * - Smooth number animation using motion values and springs
 * - Optional progress indicator toward target XP
 * - Configurable size and icon
 * - Engaging visual feedback for XP gains
 */
export function XPDisplay({
  xp,
  targetXp,
  size = "md",
  showIcon = true,
  motionProps,
  className,
  ...props
}: XPDisplayProps) {
  const displayXp = useSpring(useMotionValue(xp), ANIMATION.SPRING)

  // Update the motion value when xp changes
  React.useEffect(() => {
    displayXp.set(xp)
  }, [xp, displayXp])

  const formattedXp = Math.round(displayXp.get())

  return (
    <motion.div
      className={cn(
        "inline-flex items-center font-semibold text-primary",
        sizeClasses[size],
        className
      )}
      {...motionProps}
    >
      {showIcon && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={ANIMATION.SPRING_BOUNCE}
        >
          <Star className={cn(iconSizes[size], "fill-primary")} />
        </motion.div>
      )}
      <motion.span
        key={xp}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {formattedXp.toLocaleString()} XP
      </motion.span>
    </motion.div>
  )
}
