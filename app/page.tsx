"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Code2, BookOpen, Trophy, Zap, Target, Flame } from "lucide-react"
import { useGamificationContext } from "@/stores/GamificationContext"
import { useProgressContext } from "@/stores/ProgressContext"
import { getAllLessons } from "@/data/lessons"

export default function HomePage() {
	const { totalXP, level, streak } = useGamificationContext()
	const { completedLessons } = useProgressContext()
	const lessons = getAllLessons()

	return (
		<div className="min-h-screen bg-black text-white">
			{/* Hero Section - Brutalist */}
			<section className="relative overflow-hidden border-b-8 border-white bg-gradient-to-br from-black via-zinc-900 to-black">
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-10 left-10 text-[200px] font-black text-white/5">/</div>
					<div className="absolute bottom-10 right-10 text-[200px] font-black text-white/5">\</div>
				</div>
				
				<div className="relative mx-auto max-w-7xl px-6 py-24">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="space-y-8"
					>
						<div className="inline-block bg-yellow-400 px-4 py-2 text-black font-black text-sm uppercase tracking-wider">
							LEARN REGEX THE BRUTAL WAY
						</div>
						
						<h1 className="text-7xl md:text-9xl font-black uppercase leading-none tracking-tighter">
							<span className="block">MASTER</span>
							<span className="block text-yellow-400">PATTERNS</span>
						</h1>
						
						<p className="max-w-xl text-xl text-zinc-400 font-mono">
							No fluff. No nonsense. Pure regex mastery through hands-on lessons and brutal challenges.
						</p>
						
						<div className="flex flex-wrap gap-4">
							<Link
								href="/learn"
								className="group flex items-center gap-3 bg-yellow-400 px-8 py-4 text-black font-black uppercase tracking-wide transition-transform hover:scale-105 hover:bg-yellow-300"
							>
								<BookOpen className="h-5 w-5" />
								START LEARNING
								<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
							</Link>
							
							<Link
								href="/practice"
								className="group flex items-center gap-3 border-4 border-white bg-transparent px-8 py-4 text-white font-black uppercase tracking-wide transition-all hover:bg-white hover:text-black"
							>
								<Code2 className="h-5 w-5" />
								PRACTICE NOW
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Stats Bar - Brutalist */}
			<section className="border-b-4 border-zinc-800 bg-zinc-950 py-6">
				<div className="mx-auto max-w-7xl px-6">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						<div className="border-l-4 border-yellow-400 pl-4">
							<div className="text-sm font-mono text-zinc-500 uppercase">YOUR XP</div>
							<div className="text-3xl font-black text-white">{totalXP.toLocaleString()}</div>
						</div>
						<div className="border-l-4 border-yellow-400 pl-4">
							<div className="text-sm font-mono text-zinc-500 uppercase">LEVEL</div>
							<div className="text-3xl font-black text-white">{level}</div>
						</div>
						<div className="border-l-4 border-yellow-400 pl-4">
							<div className="text-sm font-mono text-zinc-500 uppercase">STREAK</div>
							<div className="flex items-center gap-2">
								<Flame className="h-6 w-6 text-orange-500" />
								<span className="text-3xl font-black text-white">{streak.current}</span>
							</div>
						</div>
						<div className="border-l-4 border-yellow-400 pl-4">
							<div className="text-sm font-mono text-zinc-500 uppercase">COMPLETED</div>
							<div className="text-3xl font-black text-white">
								{completedLessons.length}/{lessons.length}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Grid - Brutalist */}
			<section className="mx-auto max-w-7xl px-6 py-24">
				<div className="mb-12">
					<div className="inline-block bg-white px-4 py-2 text-black font-black text-sm uppercase tracking-wider mb-4">
						WHAT YOU GET
					</div>
					<h2 className="text-5xl font-black uppercase tracking-tight">
						NO EXCUSES.<br />JUST RESULTS.
					</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="group border-4 border-white bg-zinc-900 p-8 transition-all hover:bg-zinc-800"
					>
						<BookOpen className="h-12 w-12 text-yellow-400 mb-6" />
						<h3 className="text-2xl font-black uppercase mb-3">15 LESSONS</h3>
						<p className="text-zinc-400 font-mono">
							From basics to advanced. Character classes, quantifiers, lookarounds. 
							Each lesson builds on the last.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="group border-4 border-white bg-zinc-900 p-8 transition-all hover:bg-zinc-800"
					>
						<Target className="h-12 w-12 text-yellow-400 mb-6" />
						<h3 className="text-2xl font-black uppercase mb-3">30 CHALLENGES</h3>
						<p className="text-zinc-400 font-mono">
							Real problems. Email validation, URL parsing, log analysis. 
							Test your skills against actual use cases.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="group border-4 border-white bg-zinc-900 p-8 transition-all hover:bg-zinc-800"
					>
						<Trophy className="h-12 w-12 text-yellow-400 mb-6" />
						<h3 className="text-2xl font-black uppercase mb-3">10 ACHIEVEMENTS</h3>
						<p className="text-zinc-400 font-mono">
							Unlock badges. Build streaks. Climb the leaderboard. 
							Gamification that actually motivates.
						</p>
					</motion.div>
				</div>
			</section>

			{/* CTA Section - Brutalist */}
			<section className="bg-yellow-400 py-24">
				<div className="mx-auto max-w-4xl px-6 text-center">
					<h2 className="text-5xl md:text-7xl font-black uppercase text-black mb-6">
						STOP PROCRASTINATING
					</h2>
					<p className="text-xl text-black/70 font-mono mb-8">
						Every minute you wait is a pattern you could have mastered.
					</p>
					<Link
						href="/learn"
						className="inline-flex items-center gap-3 bg-black px-12 py-6 text-xl text-yellow-400 font-black uppercase tracking-wide transition-transform hover:scale-105"
					>
						<Zap className="h-6 w-6" />
						START NOW
						<ArrowRight className="h-6 w-6" />
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t-4 border-zinc-800 bg-black py-12">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
						<div className="text-2xl font-black tracking-tighter">
							REGEX<span className="text-yellow-400">.</span>MASTER
						</div>
						<div className="flex gap-8 font-mono text-sm text-zinc-500">
							<Link href="/learn" className="hover:text-white">LEARN</Link>
							<Link href="/practice" className="hover:text-white">PRACTICE</Link>
							<Link href="/dashboard" className="hover:text-white">DASHBOARD</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
