"use client"

import { motion } from "motion/react"
import { Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/shared/Container"
import { AchievementBadge } from "@/components/gamification/AchievementBadge"
import { useGamificationContext } from "@/stores/GamificationContext"
import { achievements } from "@/data/achievements"
import { ANIMATION } from "@/lib/constants"

export default function AchievementsPage() {
	const { unlockedAchievements } = useGamificationContext()

	return (
		<Container className="py-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={ANIMATION.SPRING}
				className="space-y-8"
			>
				<div>
					<h1 className="text-3xl font-bold">Achievements</h1>
					<p className="text-muted-foreground mt-1">
						Collect badges by mastering regex
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Trophy className="h-5 w-5" />
							{unlockedAchievements.length} / {achievements.length} Unlocked
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
							{achievements.map((achievement, index) => {
								const isUnlocked = unlockedAchievements.includes(achievement.id)
								return (
									<motion.div
										key={achievement.id}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ ...ANIMATION.SPRING, delay: index * 0.05 }}
									>
										<AchievementBadge
											title={achievement.name}
											description={achievement.description}
											unlocked={isUnlocked}
										/>
									</motion.div>
								)
							})}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</Container>
	)
}
