"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Container } from "@/components/shared/Container"
import { PageTransition } from "@/components/motion/PageTransition"
import { AnimatedCard } from "@/components/motion/AnimatedCard"
import { StaggerContainer } from "@/components/motion/StaggerContainer"
import { getAllProblems, getProblemsByDifficulty } from "@/data/problems"
import { Difficulty } from "@/types/practice"
import { Code, Filter, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PracticeProblem } from "@/types/practice"

function ProblemsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">(
    (searchParams.get("difficulty") as Difficulty) || "all"
  )
  const [topicFilter, setTopicFilter] = useState<string>("all")

  const allProblems = getAllProblems()

  const allTopics = useMemo(() => {
    const topics = new Set<string>()
    allProblems.forEach((p) => p.topics.forEach((t) => topics.add(t)))
    return Array.from(topics).sort()
  }, [allProblems])

  const filteredProblems = useMemo(() => {
    return allProblems.filter((problem) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = problem.title.toLowerCase().includes(query)
        const matchesDescription = problem.description.toLowerCase().includes(query)
        const matchesTopics = problem.topics.some((t) => t.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDescription && !matchesTopics) {
          return false
        }
      }

      // Difficulty filter
      if (difficultyFilter !== "all" && problem.difficulty !== difficultyFilter) {
        return false
      }

      // Topic filter
      if (topicFilter !== "all" && !problem.topics.includes(topicFilter)) {
        return false
      }

      return true
    })
  }, [allProblems, searchQuery, difficultyFilter, topicFilter])

  const handleDifficultyChange = (difficulty: Difficulty | "all") => {
    setDifficultyFilter(difficulty)
    const params = new URLSearchParams(searchParams.toString())
    if (difficulty === "all") {
      params.delete("difficulty")
    } else {
      params.set("difficulty", difficulty)
    }
    router.push(`?${params.toString()}`)
  }

  const handleTopicChange = (topic: string) => {
    setTopicFilter(topic)
    // No URL param for topic to keep URL clean
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDifficultyFilter("all")
    setTopicFilter("all")
    router.push("/practice/problems")
  }

  return (
    <PageTransition show={true} key="problems">
      <Container className="py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Practice Problems</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Test your regex skills with {allProblems.length} real-world challenges
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Filter className="size-5 text-muted-foreground" />
            <span className="font-semibold">Filters</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => handleDifficultyChange(e.target.value as Difficulty | "all")}
              className="rounded-lg border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Topic Filter */}
            <select
              value={topicFilter}
              onChange={(e) => handleTopicChange(e.target.value)}
              className="rounded-lg border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Topics</option>
              {allTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || difficultyFilter !== "all" || topicFilter !== "all") && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Showing {filteredProblems.length} of {allProblems.length} problems
              </span>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Problems Grid */}
        {filteredProblems.length > 0 ? (
          <StaggerContainer visible={true} staggerDelay={0.05}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No problems match your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </PageTransition>
  )
}

export default function ProblemsPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
      <ProblemsContent />
    </Suspense>
  )
}

function ProblemCard({ problem }: { problem: PracticeProblem }) {
  const difficultyColors = {
    beginner: "bg-green-100 text-green-700 border-green-200",
    intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
    advanced: "bg-red-100 text-red-700 border-red-200",
  }

  return (
    <AnimatedCard className="h-full overflow-hidden">
      <a href={`/practice/problems/${problem.id}`} className="block p-6">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Code className="size-5 text-primary" />
            </div>
            <span
              className={cn(
                "rounded-full border px-2 py-1 text-xs font-medium",
                difficultyColors[problem.difficulty]
              )}
            >
              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold">{problem.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {problem.description}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            {problem.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-muted px-2 py-1 text-xs font-medium"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{problem.testCases.length} test cases</span>
            <span>#{problem.id}</span>
          </div>
        </div>
      </a>
    </AnimatedCard>
  )
}
