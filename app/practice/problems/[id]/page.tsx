"use client"

import { use, useState } from "react"
import Link from "next/link"
import { getProblemById } from "@/data/problems"
import { useGamificationContext } from "@/stores/GamificationContext"
import { testRegexAgainstCases } from "@/lib/regex-utils"
import { XP_AWARDS } from "@/lib/constants"
import { ArrowLeft, CheckCircle, XCircle, Trophy, Flame, Lightbulb } from "lucide-react"
import { TestCaseDisplay } from "@/components/practice/TestCaseDisplay"
import { PatternHint } from "@/components/practice/PatternHint"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { cn } from "@/lib/utils"

interface ProblemPageProps {
  params: Promise<{ id: string }>
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const { id } = use(params)
  const { addXP, totalXP, streak } = useGamificationContext()

  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("")
  const [results, setResults] = useState<{
    passed: number
    total: number
    testResults?: Array<{
      testCaseId: string
      passed: boolean
      actualMatch: boolean
      expectedMatch: boolean
      matchedText?: string
    }>
  } | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [solved, setSolved] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  const problem = getProblemById(id)

  if (!problem) {
    return <div className="min-h-screen bg-black text-white p-8">Problem not found</div>
  }

  const handleSubmit = () => {
    const result = testRegexAgainstCases(pattern, problem.testCases, flags)
    setAttempts(prev => prev + 1)

    const testResults = result.results.map((r, index) => ({
      testCaseId: problem.testCases[index].id,
      passed: r.matches,
      actualMatch: r.matches,
      expectedMatch: r.testCase.shouldMatch,
      matchedText: r.matchedText
    }))

    setResults({
      passed: result.passed,
      total: result.total,
      testResults
    })

    if (result.passed === result.total && !solved) {
      setSolved(true)
      addXP(XP_AWARDS.PRACTICE_SOLVED)
    }
  }

  const diffColor = problem.difficulty === 'beginner' ? 'bg-green-400 text-black' :
    problem.difficulty === 'intermediate' ? 'bg-yellow-400 text-black' :
    'bg-red-400 text-black'

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b-4 border-zinc-800 bg-zinc-950 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/practice" className="flex items-center gap-2 text-zinc-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back
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

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={diffColor + " px-3 py-1 text-sm font-black uppercase"}>
              {problem.difficulty}
            </span>
            {solved && <span className="text-green-400"><CheckCircle className="h-4 w-4 inline mr-1" />Solved</span>}
          </div>
        <h1 className="text-5xl font-black uppercase tracking-tight mb-4">{problem.title}</h1>
        <div className="text-xl text-zinc-400">
          <MarkdownRenderer content={problem.description} />
        </div>
        </div>

        {/* Test Cases Section */}
        <section className="border-4 border-yellow-400 bg-zinc-900 p-8 mb-8">
          <h2 className="text-2xl font-black uppercase mb-6">Test Cases</h2>
          <TestCaseDisplay
            testCases={problem.testCases}
            results={results?.testResults}
          />
        </section>

        {/* Solution Input Section */}
        <section className="border-4 border-white bg-zinc-900 p-8 mb-8">
          <h2 className="text-2xl font-black uppercase mb-6">Your Solution</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-black uppercase mb-2">Pattern</label>
              <input
                type="text"
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                placeholder="Enter regex..."
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
              Submit
            </button>
          </div>

          {/* Results Summary */}
          {results && (
            <div className="mt-8 border-t-2 border-zinc-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-black">Results</span>
                <span className={cn(
                  "text-2xl font-black",
                  results.passed === results.total ? 'text-green-400' : 'text-red-400'
                )}>
                  {results.passed}/{results.total}
                </span>
              </div>
              {results.passed === results.total && (
                <div className="bg-green-400/10 border-2 border-green-400 p-4">
                  <p className="font-black text-green-400">+{XP_AWARDS.PRACTICE_SOLVED} XP EARNED!</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Progressive Hints Section */}
        {problem.hints.length > 0 && (
          <section className="mb-8">
            <PatternHint
              hints={problem.hints}
              currentAttempt={attempts}
            />
          </section>
        )}

        {/* Solution & Explanation - Only shown after solving */}
        {solved && (
          <section className="border-4 border-green-400 bg-zinc-900 p-8 mb-8">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 w-full"
            >
              <Lightbulb className="h-5 w-5" />
              <span className="font-black uppercase">
                {showSolution ? 'Hide' : 'Show'} Solution & Explanation
              </span>
            </button>

            {showSolution && (
              <div className="mt-6 space-y-6">
                {/* Solution Pattern */}
                <div className="bg-black border-2 border-green-400 p-4">
                  <h3 className="text-sm font-black uppercase text-green-400 mb-2">Solution Pattern</h3>
                  <code className="font-mono text-2xl text-yellow-400">{problem.solution}</code>
                </div>

            {/* Explanation */}
            {problem.explanation && (
              <div className="bg-black border-2 border-zinc-700 p-4">
                <h3 className="text-sm font-black uppercase text-zinc-400 mb-2">Explanation</h3>
                <div className="text-zinc-300">
                  <MarkdownRenderer content={problem.explanation} />
                </div>
              </div>
            )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
