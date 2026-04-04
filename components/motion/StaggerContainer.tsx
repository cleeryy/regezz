"use client"

import * as React from "react"
import { motion, type MotionProps, type Variants } from "motion/react"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"

export interface StaggerContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  /**
   * Whether the container is currently visible
   * @default true
   */
  visible?: boolean
  /**
   * Stagger delay between children in seconds
   * @default 0.05 (from ANIMATION.STAGGER)
   */
  staggerDelay?: number
  /**
   * Custom variants for the container animation
   * If not provided, uses default hidden/visible variants
   */
  variants?: Variants
  /**
   * Children to stagger
   */
  children: React.ReactNode
  /**
   * Custom motion props for additional control
   */
  motionProps?: MotionProps
  /**
   * Additional CSS classes
   */
  className?: string
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION.STAGGER.staggerChildren,
    },
  },
}

/**
 * StaggerContainer - Wrapper for staggering child animations
 * 
 * Automatically applies staggered delays to direct children.
 * Perfect for lists, grids, and sequential reveals.
 */
export function StaggerContainer({
  visible = true,
  staggerDelay = ANIMATION.STAGGER.staggerChildren,
  variants,
  children,
  motionProps,
  className,
  ...props
}: StaggerContainerProps) {
  const containerVariants = variants || {
    ...defaultContainerVariants,
    visible: {
      ...defaultContainerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
