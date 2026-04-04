"use client"

import Link from "next/link"
import { getAllProblems } from "@/data/problems"
import { useGamificationContext } from "@/stores/GamificationContext"
import { Trophy, Flame, Target } from "lucide-react"

export default function PracticePage() {
	const problems = getAllProblems()
	const { totalXP, streak } = useGamificationContext()

	const beginnerProblems = problems.filter(p => p.difficulty === 'beginner')
	const intermediateProblems = problems.filter(p => p.difficulty === 'intermediate')
	const advancedProblems = problems.filter(p => p.difficulty === 'advanced')

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
					<h1 className="text-5xl font-black uppercase tracking-tight mb-4">Practice</h1>
					<p className="text-xl text-zinc-400">Solve problems to reinforce your regex skills.</p>
				</div>

				<section className="mb-12">
					<h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
						<span className="bg-green-400 text-black px-3 py-1">BEGINNER</span>
						<span className="text-zinc-500 text-lg font-mono">{beginnerProblems.length} problems</span>
					</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{beginnerProblems.map(problem => (
							<Link
								key={problem.id}
								href={`/practice/problems/${problem.id}`}
								className="border-4 border-white bg-zinc-900 p-6 hover:bg-zinc-800 transition-all"
							>
								<h3 className="font-black text-lg mb-2">{problem.title}</h3>
								<p className="text-zinc-400 text-sm line-clamp-2">{problem.description}</p>
							</Link>
						))}
					</div>
				</section>

				<section className="mb-12">
					<h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
						<span className="bg-yellow-400 text-black px-3 py-1">INTERMEDIATE</span>
						<span className="text-zinc-500 text-lg font-mono">{intermediateProblems.length} problems</span>
					</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{intermediateProblems.map(problem => (
							<Link
								key={problem.id}
								href={`/practice/problems/${problem.id}`}
								className="border-4 border-white bg-zinc-900 p-6 hover:bg-zinc-800 transition-all"
							>
								<h3 className="font-black text-lg mb-2">{problem.title}</h3>
								<p className="text-zinc-400 text-sm line-clamp-2">{problem.description}</p>
							</Link>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
						<span className="bg-red-400 text-black px-3 py-1">ADVANCED</span>
						<span className="text-zinc-500 text-lg font-mono">{advancedProblems.length} problems</span>
					</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{advancedProblems.map(problem => (
							<Link
								key={problem.id}
								href={`/practice/problems/${problem.id}`}
								className="border-4 border-white bg-zinc-900 p-6 hover:bg-zinc-800 transition-all"
							>
								<h3 className="font-black text-lg mb-2">{problem.title}</h3>
								<p className="text-zinc-400 text-sm line-clamp-2">{problem.description}</p>
							</Link>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
