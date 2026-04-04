"use client"

import Link from "next/link"
import { getAllLessons } from "@/data/lessons"
import { useProgressContext } from "@/stores/ProgressContext"
import { useGamificationContext } from "@/stores/GamificationContext"
import { BookOpen, Trophy, Flame, CheckCircle, Lock } from "lucide-react"

export default function LearnPage() {
	const lessons = getAllLessons()
	const { completedLessons } = useProgressContext()
	const { totalXP, streak } = useGamificationContext()

	return (
		<div className="min-h-screen bg-black text-white">
			<header className="border-b-4 border-zinc-800 bg-zinc-950 px-6 py-4">
				<div className="mx-auto max-w-7xl flex items-center justify-between">
					<Link href="/" className="text-2xl font-black tracking-tighter">
						REGEX<span className="text-yellow-400">.</span>MASTER
					</Link>
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<Trophy className="h-5 w-5 text-yellow-400" />
							<span className="font-black">{totalXP} XP</span>
						</div>
						<div className="flex items-center gap-2">
							<Flame className="h-5 w-5 text-orange-500" />
							<span className="font-black">{streak.current}</span>
						</div>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-7xl px-6 py-12">
				<div className="mb-12">
					<h1 className="text-5xl font-black uppercase tracking-tight mb-4">Lessons</h1>
					<p className="text-xl text-zinc-400">Master regex step by step. Complete lessons to unlock new content.</p>
				</div>

				<div className="grid gap-4">
					{lessons.map((lesson, index) => {
						const isCompleted = completedLessons.includes(lesson.id)
						const isLocked = index > 0 && !completedLessons.includes(lessons[index - 1].id)
						
						return (
							<Link
								key={lesson.id}
								href={isLocked ? "#" : `/learn/lessons/${lesson.id}`}
								className={`border-4 p-6 transition-all ${
									isLocked 
										? 'border-zinc-800 bg-zinc-900/50 cursor-not-allowed opacity-50' 
										: isCompleted 
											? 'border-green-400 bg-zinc-900 hover:bg-zinc-800' 
											: 'border-white bg-zinc-900 hover:bg-zinc-800'
								}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="text-4xl font-black text-zinc-600">{lesson.order}</div>
										<div>
											<div className="flex items-center gap-2 mb-1">
												<span className={`px-2 py-0.5 text-xs font-black uppercase ${
													lesson.tier === 'foundation' ? 'bg-blue-400 text-black' :
													lesson.tier === 'quantification' ? 'bg-green-400 text-black' :
													lesson.tier === 'structure' ? 'bg-purple-400 text-black' :
													'bg-orange-400 text-black'
												}`}>
													{lesson.tier}
												</span>
												{isCompleted && <CheckCircle className="h-4 w-4 text-green-400" />}
												{isLocked && <Lock className="h-4 w-4 text-zinc-600" />}
											</div>
											<h2 className="text-xl font-black">{lesson.title}</h2>
											<p className="text-zinc-400 text-sm">{lesson.description}</p>
										</div>
									</div>
									<div className="text-sm text-zinc-500 font-mono">{lesson.estimatedMinutes} min</div>
								</div>
							</Link>
						)
					})}
				</div>
			</main>
		</div>
	)
}
