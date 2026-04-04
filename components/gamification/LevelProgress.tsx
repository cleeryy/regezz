"use client"

import { motion } from "motion/react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"
import { Target } from "lucide-react"

export interface LevelProgressProps {
	currentXp: number
	levelXp: number
	nextLevelXp: number
	level: number
	showLabels?: boolean
	className?: string
}

export function LevelProgress({
	currentXp,
	levelXp,
	nextLevelXp,
	level,
	showLabels = true,
	className,
}: LevelProgressProps) {
	const levelProgress = nextLevelXp > levelXp
		? ((currentXp - levelXp) / (nextLevelXp - levelXp)) * 100
		: 100

	const xpIntoLevel = Math.max(0, currentXp - levelXp)
	const xpNeeded = Math.max(1, nextLevelXp - levelXp)

	return (
		<div className={cn("space-y-2", className)}>
			{showLabels && (
				<div className="flex items-center justify-between text-sm">
					<div className="flex items-center gap-2">
						<Target className="size-4 text-yellow-400" />
						<span className="font-black">Level {level}</span>
					</div>
					<span className="text-zinc-400 font-mono">
						{xpIntoLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP
					</span>
				</div>
			)}
			<motion.div
				initial={{ width: 0 }}
				animate={{ width: `${Math.min(Math.max(levelProgress, 0), 100)}%` }}
				transition={ANIMATION.SPRING}
			>
				<Progress value={levelProgress} className="h-2" />
			</motion.div>
		</div>
	)
}
