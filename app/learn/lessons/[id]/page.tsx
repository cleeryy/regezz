"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getLessonById, getAllLessons } from "@/data/lessons"
import { useProgressContext } from "@/stores/ProgressContext"
import { useGamificationContext } from "@/stores/GamificationContext"
import { testRegexAgainstCases } from "@/lib/regex-utils"
import { XP_AWARDS } from "@/lib/constants"
import { ArrowLeft, ArrowRight, CheckCircle, Trophy, Flame } from "lucide-react"
import { TestCaseDisplay } from "@/components/practice/TestCaseDisplay"
import { PatternHint } from "@/components/practice/PatternHint"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"

interface LessonPageProps {
	params: Promise<{ id: string }>
}

export default function LessonPage({ params }: LessonPageProps) {
	const { id } = use(params)
	const router = useRouter()
  const { completedLessons, completeLesson } = useProgressContext()
  const { addXP, totalXP, level, streak, markLessonCompleted } = useGamificationContext()
	
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("")
  const [results, setResults] = useState<{ passed: number; total: number; detailedResults: Array<{ testCaseId: string; passed: boolean; actualMatch: boolean; expectedMatch: boolean; matchedText?: string }> } | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

	const lesson = getLessonById(id)
	const allLessons = getAllLessons()

	if (!lesson) {
		return <div className="min-h-screen bg-black text-white p-8">Lesson not found</div>
	}

	const currentIndex = allLessons.findIndex(l => l.id === lesson.id)
	const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
	const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
	const isCompleted = completedLessons.includes(lesson.id)

	const handleSubmit = () => {
		const result = testRegexAgainstCases(pattern, lesson.exercise.testCases, flags)
		
		// Transform LessonTestCase[] to TestCase[] with generated IDs for TestCaseDisplay
		const testCasesWithIds = lesson.exercise.testCases.map((tc, index) => ({
			id: `test-${index}`,
			input: tc.input,
			shouldMatch: tc.shouldMatch,
			explanation: tc.explanation
		}))
		
		// Format detailed results for TestCaseDisplay
		const detailedResults = result.results.map((r, index) => ({
			testCaseId: `test-${index}`,
			passed: r.matches,
			actualMatch: r.matches,
			expectedMatch: lesson.exercise.testCases[index].shouldMatch,
			matchedText: r.matchedText
		}))
		
		setResults({ 
			passed: result.passed, 
			total: result.total, 
			detailedResults 
		})
		
		setAttempts(prev => prev + 1)
		
  if (result.passed === result.total && !isCompleted) {
    completeLesson(lesson.id)
    markLessonCompleted(lesson.id)
    addXP(XP_AWARDS.LESSON_COMPLETE)
  }
	}

	return (
		<div className="min-h-screen bg-black text-white">
			<header className="border-b-4 border-zinc-800 bg-zinc-950 px-6 py-4">
				<div className="mx-auto max-w-7xl flex items-center justify-between">
					<Link href="/learn" className="flex items-center gap-2 text-zinc-400 hover:text-white">
						<ArrowLeft className="h-4 w-4" />
						Back to Lessons
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
				<div className="grid gap-8 lg:grid-cols-[1fr_320px]">
					<div className="space-y-8">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<span className="bg-yellow-400 px-3 py-1 text-black text-sm font-black uppercase">
									{lesson.tier}
								</span>
								<span className="text-zinc-500 font-mono">
									Lesson {lesson.order} of {allLessons.length}
								</span>
								{isCompleted && (
									<span className="flex items-center gap-1 text-green-400">
										<CheckCircle className="h-4 w-4" />
										Completed
									</span>
								)}
							</div>
          <h1 className="text-5xl font-black uppercase tracking-tight mb-4">
            {lesson.title}
          </h1>
          <div className="text-xl text-zinc-400">
            <MarkdownRenderer content={lesson.description} />
          </div>
						</div>

						<div className="border-4 border-white bg-zinc-900 p-8">
							<h2 className="text-2xl font-black uppercase mb-6">Content</h2>
            <div className="prose prose-invert max-w-none">
              {lesson.content.map((block, i) => (
                <div key={i} className="mb-6">
                  {block.type === "text" && (
                    <div className="text-lg text-zinc-300">
                      <MarkdownRenderer content={block.content} />
                    </div>
                  )}
                  {block.type === "example" && block.code && (
                    <pre className="bg-black border-2 border-zinc-700 p-4 overflow-x-auto">
                      <code className="font-mono text-yellow-400">{block.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
						</div>

						<div className="border-4 border-yellow-400 bg-zinc-900 p-8">
          <h2 className="text-2xl font-black uppercase mb-6">Exercise</h2>
          <div className="text-lg text-zinc-300 mb-6">
            <MarkdownRenderer content={lesson.exercise.instruction} />
          </div>
							
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-black uppercase mb-2">Pattern</label>
									<input
										type="text"
										value={pattern}
										onChange={e => setPattern(e.target.value)}
										placeholder="Enter your regex..."
										className="w-full bg-black border-2 border-white px-4 py-3 font-mono text-lg focus:border-yellow-400 focus:outline-none"
									/>
								</div>
								<div>
									<label className="block text-sm font-black uppercase mb-2">Flags</label>
									<input
										type="text"
										value={flags}
										onChange={e => setFlags(e.target.value.toUpperCase())}
										placeholder="gim"
										maxLength={5}
										className="w-24 bg-black border-2 border-white px-4 py-3 font-mono text-lg uppercase focus:border-yellow-400 focus:outline-none"
									/>
								</div>
								<button
									onClick={handleSubmit}
									className="bg-yellow-400 px-8 py-4 text-black font-black uppercase hover:bg-yellow-300 transition-colors"
								>
									Test Pattern
								</button>
							</div>

							{results && (
								<div className="mt-8 border-t-2 border-zinc-700 pt-6">
									<div className="flex items-center justify-between mb-4">
										<span className="text-lg font-black">Results</span>
										<span className={`text-2xl font-black ${results.passed === results.total ? 'text-green-400' : 'text-red-400'}`}>
											{results.passed}/{results.total}
										</span>
									</div>
									<TestCaseDisplay 
										testCases={lesson.exercise.testCases.map((tc, i) => ({
											id: `test-${i}`,
											input: tc.input,
											shouldMatch: tc.shouldMatch,
											explanation: tc.explanation
										}))}
										results={results.detailedResults}
									/>
								</div>
							)}

{lesson.exercise.hints.length > 0 && (
  <div className="mt-8 border-t-2 border-zinc-700 pt-6">
    <PatternHint
      hints={lesson.exercise.hints}
      currentAttempt={attempts}
    />
  </div>
  )}

{isCompleted && results && results.passed === results.total && (
  <div className="mt-8 border-t-2 border-zinc-700 pt-6">
    <button
      onClick={() => setShowSolution(!showSolution)}
      className="flex items-center gap-2 text-green-400 hover:text-green-300"
    >
      <CheckCircle className="h-5 w-5" />
      <span className="font-black uppercase">
        {showSolution ? 'Hide' : 'Show'} Solution
      </span>
    </button>

    {showSolution && (
      <div className="mt-6 bg-black border-2 border-green-400 p-4">
        <h3 className="text-sm font-black uppercase text-green-400 mb-2">Correct Pattern</h3>
        <code className="font-mono text-2xl text-yellow-400">{lesson.exercise.pattern}</code>
      </div>
    )}
  </div>
  )}
</div>
</div>

					<aside className="space-y-6">
						<div className="border-4 border-white bg-zinc-900 p-6">
							<h3 className="text-xl font-black uppercase mb-4">Navigation</h3>
							<div className="space-y-3">
								{prevLesson && (
									<Link
										href={`/learn/lessons/${prevLesson.id}`}
										className="flex items-center gap-3 p-3 border-2 border-zinc-700 hover:border-white transition-colors"
									>
										<ArrowLeft className="h-4 w-4" />
										<div>
											<div className="text-xs text-zinc-500 uppercase">Previous</div>
											<div className="font-bold">{prevLesson.title}</div>
										</div>
									</Link>
								)}
								{nextLesson && (
									<Link
										href={`/learn/lessons/${nextLesson.id}`}
										className="flex items-center gap-3 p-3 border-2 border-zinc-700 hover:border-white transition-colors"
									>
										<ArrowRight className="h-4 w-4" />
										<div>
											<div className="text-xs text-zinc-500 uppercase">Next</div>
											<div className="font-bold">{nextLesson.title}</div>
										</div>
									</Link>
								)}
							</div>
						</div>

						<div className="border-4 border-white bg-zinc-900 p-6">
							<h3 className="text-xl font-black uppercase mb-4">Lesson Info</h3>
							<div className="space-y-3 text-sm">
								<div className="flex justify-between">
									<span className="text-zinc-500">Tier</span>
									<span className="font-bold uppercase">{lesson.tier}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-zinc-500">Time</span>
									<span className="font-bold">{lesson.estimatedMinutes} min</span>
								</div>
								<div className="flex justify-between">
									<span className="text-zinc-500">Topics</span>
									<span className="font-bold">{lesson.topics.length}</span>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</main>
		</div>
	)
}
