"use client"

import { motion } from "motion/react"
import { BookOpen, Code2, Trophy, Flame } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/Container"
import { XPDisplay } from "@/components/gamification/XPDisplay"
import { StreakCounter } from "@/components/gamification/StreakCounter"
import { LevelProgress } from "@/components/gamification/LevelProgress"
import { useGamificationContext } from "@/stores/GamificationContext"
import { useProgressContext } from "@/stores/ProgressContext"
import { ROUTES, ANIMATION } from "@/lib/constants"

export default function DashboardPage() {
	const { totalXP, level, streak } = useGamificationContext()
	const { completedLessons } = useProgressContext()

	return (
		<Container className="py-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={ANIMATION.SPRING}
				className="space-y-8"
			>
				<div>
					<h1 className="text-3xl font-bold">Dashboard</h1>
					<p className="text-muted-foreground mt-1">
						Track your progress and achievements
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total XP</CardTitle>
							<Trophy className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<XPDisplay xp={totalXP} />
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Level</CardTitle>
							<Flame className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<LevelProgress currentXp={totalXP} levelXp={0} nextLevelXp={100} level={level} />
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Streak</CardTitle>
							<Flame className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<StreakCounter streak={streak.current} />
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Lessons</CardTitle>
							<BookOpen className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{completedLessons.length}</div>
							<p className="text-xs text-muted-foreground">lessons completed</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
							<CardDescription>
								Continue your learning journey
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<Button asChild className="w-full">
								<Link href={ROUTES.LESSONS}>
									<BookOpen className="h-4 w-4 mr-2" />
									Continue Learning
								</Link>
							</Button>
							<Button asChild variant="outline" className="w-full">
								<Link href={ROUTES.PROBLEMS}>
									<Code2 className="h-4 w-4 mr-2" />
									Practice Problems
								</Link>
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>View Details</CardTitle>
							<CardDescription>
								Detailed progress and achievements
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<Button asChild variant="outline" className="w-full">
								<Link href={ROUTES.PROGRESS}>
									View Progress
								</Link>
							</Button>
							<Button asChild variant="outline" className="w-full">
								<Link href={ROUTES.ACHIEVEMENTS}>
									View Achievements
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</motion.div>
		</Container>
	)
}
