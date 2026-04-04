"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"
import { TIERS } from "@/lib/constants"
import { CheckCircle2, Circle } from "lucide-react"

export interface TierProgressProps {
	currentTierId: string
	completedLessons: number
	totalLessons: number
	showLabels?: boolean
	className?: string
}

export function TierProgress({
	currentTierId,
	completedLessons,
	totalLessons,
	showLabels = true,
	className,
}: TierProgressProps) {
	const currentTierIndex = TIERS.findIndex((t) => t.id === currentTierId)

	const getTierProgress = (tierIndex: number) => {
		if (tierIndex < currentTierIndex) return 100
		if (tierIndex === currentTierIndex) {
			return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
		}
		return 0
	}

	return (
		<div className={cn("flex items-end gap-3", className)}>
			{TIERS.map((tier, index) => {
				const progress = getTierProgress(index)
				const completed = index < currentTierIndex
				const current = index === currentTierIndex

				return (
					<div key={tier.id} className="flex flex-1 flex-col items-center gap-2">
						<div className="relative flex h-24 w-full flex-col-reverse overflow-hidden rounded-lg bg-zinc-800">
							<motion.div
								className={cn(
									"absolute bottom-0 left-0 right-0 transition-colors",
									completed ? "bg-green-500" : current ? "bg-yellow-400" : "bg-zinc-700"
								)}
								initial={{ height: 0 }}
								animate={{ height: `${progress}%` }}
								transition={ANIMATION.SPRING}
							/>
							<div className="relative z-10 flex h-6 w-full items-center justify-center">
								{completed ? (
									<CheckCircle2 className="size-5 text-green-500" />
								) : current ? (
									<Circle className="size-5 text-yellow-400 fill-yellow-400/20" />
								) : (
									<Circle className="size-5 text-zinc-600" />
								)}
							</div>
						</div>
						{showLabels && (
							<div className="text-center">
								<p className={cn(
									"text-xs font-bold",
									completed ? "text-green-400" : current ? "text-white" : "text-zinc-500"
								)}>
									{tier.name}
								</p>
								{current && (
									<p className="text-xs text-zinc-500 font-mono">
										{completedLessons}/{totalLessons}
									</p>
								)}
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
