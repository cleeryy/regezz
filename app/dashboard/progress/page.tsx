"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/shared/Container"
import { TierProgress } from "@/components/gamification/TierProgress"
import { LevelProgress } from "@/components/gamification/LevelProgress"
import { useGamificationContext } from "@/stores/GamificationContext"
import { useProgressContext } from "@/stores/ProgressContext"
import { getAllLessons } from "@/data/lessons"
import { ANIMATION, LEVEL_THRESHOLDS } from "@/lib/constants"

export default function ProgressPage() {
	const { totalXP, level, tierProgress } = useGamificationContext()
	const { completedLessons, getProgress } = useProgressContext()
	const lessons = getAllLessons()

	const currentLevelThreshold = LEVEL_THRESHOLDS.find((t) => t.level === level)
	const nextLevelThreshold = LEVEL_THRESHOLDS.find((t) => t.level === level + 1)

	return (
		<Container className="py-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={ANIMATION.SPRING}
				className="space-y-8"
			>
				<div>
					<h1 className="text-3xl font-bold">Progress</h1>
					<p className="text-muted-foreground mt-1">
						Your learning journey at a glance
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Level Progress</CardTitle>
						</CardHeader>
						<CardContent>
							<LevelProgress currentXp={totalXP} levelXp={currentLevelThreshold?.xp || 0} nextLevelXp={nextLevelThreshold?.xp || 1000} level={level} />
							<div className="mt-4 text-sm text-muted-foreground">
								{currentLevelThreshold?.title} → {nextLevelThreshold?.title || "Max Level"}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Lessons Completed</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">
								{completedLessons.length} / {lessons.length}
							</div>
							<div className="text-sm text-muted-foreground mt-1">
								{Math.round((completedLessons.length / lessons.length) * 100)}% complete
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Tier Progress</CardTitle>
					</CardHeader>
					<CardContent>
						<TierProgress currentTierId="foundation" completedLessons={completedLessons.length} totalLessons={lessons.length} />
					</CardContent>
				</Card>
			</motion.div>
		</Container>
	)
}
