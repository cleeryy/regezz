"use client"

import * as React from "react"
import { motion, type MotionProps } from "motion/react"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to enable hover animations
   * @default true
   */
  hoverable?: boolean
  /**
   * Whether to enable tap animations
   * @default true
   */
  tappable?: boolean
  /**
   * Custom motion props for additional control
   */
  motionProps?: MotionProps
  /**
   * Children content
   */
  children?: React.ReactNode
}

/**
 * AnimatedCard - A motion-enhanced Card component with hover and tap animations
 * 
 * Uses motion.div for smooth animations while maintaining shadcn Card structure.
 * Hover: subtle scale up and lift
 * Tap: slight scale down for tactile feedback
 */
export function AnimatedCard({
  hoverable = true,
  tappable = true,
  motionProps,
  className,
  children,
  ...props
}: AnimatedCardProps) {
  const hoverAnimation = hoverable ? {
    scale: 1.02,
    y: -2,
  } : undefined

  const tapAnimation = tappable ? {
    scale: 0.98,
  } : undefined

  return (
    <motion.div
      initial="rest"
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...motionProps}
    >
      <Card className={className} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}

// Re-export Card subcomponents for composition
export { CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CardAction }
