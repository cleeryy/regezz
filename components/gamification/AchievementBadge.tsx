"use client"

import * as React from "react"
import { motion, type MotionProps } from "motion/react"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Sparkles } from "lucide-react"

export interface AchievementBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  /**
   * Achievement name/title
   */
  title: string
  /**
   * Achievement description
   */
  description?: string
  /**
   * Whether the achievement is unlocked
   * @default false
   */
  unlocked?: boolean
  /**
   * Icon to display (from lucide-react)
   * @default Trophy
   */
  icon?: React.ComponentType<{ className?: string }>
  /**
   * Tier or rarity of the achievement
   * @default "bronze"
   */
  tier?: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  /**
   * Custom motion props for the container
   */
  motionProps?: MotionProps
  /**
   * Additional CSS classes
   */
  className?: string
}

const tierColors = {
  bronze: "bg-amber-700 text-amber-100 border-amber-600",
  silver: "bg-slate-400 text-slate-100 border-slate-300",
  gold: "bg-yellow-500 text-yellow-100 border-yellow-400",
  platinum: "bg-cyan-300 text-cyan-900 border-cyan-200",
  diamond: "bg-blue-500 text-blue-100 border-blue-400",
}

const tierIconColors = {
  bronze: "text-amber-400",
  silver: "text-slate-300",
  gold: "text-yellow-400",
  platinum: "text-cyan-400",
  diamond: "text-blue-300",
}

const defaultIcons = {
  bronze: Trophy,
  silver: Medal,
  gold: Award,
  platinum: Sparkles,
  diamond: Trophy,
}

/**
 * AchievementBadge - Badge with unlock animation (scale + rotate)
 * 
 * Features:
 * - Scale and rotate animation on unlock
 * - Tier-based color coding
 * - Optional description
 * - Consistent with gamification theme
 */
export function AchievementBadge({
  title,
  description,
  unlocked = false,
  icon,
  tier = "bronze",
  motionProps,
  className,
  ...props
}: AchievementBadgeProps) {
  const IconComponent = icon || defaultIcons[tier]
  const isLocked = !unlocked

  return (
    <motion.div
      initial={false}
      animate={
        unlocked
          ? { scale: 1, rotate: 0, opacity: 1 }
          : { scale: 0.8, rotate: -5, opacity: 0.6 }
      }
      whileHover={unlocked ? { scale: 1.05 } : { scale: 0.82 }}
      transition={ANIMATION.SPRING_BOUNCE}
      {...motionProps}
    >
      <Badge
        variant="outline"
        className={cn(
          "flex flex-col items-center gap-1 p-3 text-center transition-all",
          tierColors[tier],
          isLocked && "grayscale",
          className
        )}
        {...props}
      >
<motion.div
								key={unlocked ? "unlocked" : "locked"}
								initial={{ scale: 0, rotate: unlocked ? -180 : 0 }}
								animate={{ scale: 1, rotate: unlocked ? 0 : 0 }}
								transition={ANIMATION.SPRING_BOUNCE}
							>
          <IconComponent className={cn("size-6", tierIconColors[tier])} />
        </motion.div>
        <span className="font-semibold text-xs leading-tight">{title}</span>
        {description && (
          <span className="text-[10px] opacity-80 leading-tight">{description}</span>
        )}
      </Badge>
    </motion.div>
  )
}
