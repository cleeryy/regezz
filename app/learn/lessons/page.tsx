import { notFound } from "next/navigation"
import { Container } from "@/components/shared/Container"
import { PageTransition } from "@/components/motion/PageTransition"
import { AnimatedCard } from "@/components/motion/AnimatedCard"
import { StaggerContainer } from "@/components/motion/StaggerContainer"
import { getAllLessons, getLessonsByTier } from "@/data/lessons"
import { TIERS } from "@/lib/constants"
import { useProgressContext } from "@/stores/ProgressContext"
import { BookOpen, Clock, CheckCircle2, Circle, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lesson } from "@/types"

interface LessonsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata() {
  return {
    title: "All Lessons - Regezz",
    description: "Browse all regex lessons and track your progress",
  }
}

export default async function LessonsPage({ searchParams }: LessonsPageProps) {
  const lessons = getAllLessons()
  const params = await searchParams
  const tierFilter = params.tier as string | undefined
  const statusFilter = params.status as string | undefined

  const { isLessonUnlocked } = useProgressContext()

  // Filter lessons
  let filteredLessons = lessons
  if (tierFilter) {
    filteredLessons = filteredLessons.filter((l) => l.tier === tierFilter)
  }
  if (statusFilter) {
    if (statusFilter === "completed") {
      filteredLessons = filteredLessons.filter((l) => isLessonUnlocked(l.id, lessons))
    } else if (statusFilter === "locked") {
      filteredLessons = filteredLessons.filter((l) => !isLessonUnlocked(l.id, lessons))
    }
  }

  const tiers = TIERS

  return (
    <PageTransition show={true} key="lessons">
      <Container className="py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">All Lessons</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Complete lessons in order to unlock new content and build your regex skills
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            {/* Tier Filter */}
            <div className="flex flex-wrap gap-2">
              <a
                href="/learn/lessons"
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  !tierFilter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                All Tiers
              </a>
              {tiers.map((tier) => (
                <a
                  key={tier.id}
                  href={`/learn/lessons?tier=${tier.id}`}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    tierFilter === tier.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {tier.name}
                </a>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              <a
                href="/learn/lessons"
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  !statusFilter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                All
              </a>
              <a
                href="/learn/lessons?status=unlocked"
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  statusFilter === "unlocked"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                )}
              >
                Available
              </a>
              <a
                href="/learn/lessons?status=completed"
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  statusFilter === "completed"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                )}
              >
                Completed
              </a>
            </div>
          </div>

          {(tierFilter || statusFilter) && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredLessons.length} of {lessons.length} lessons
              </span>
              <a
                href="/learn/lessons"
                className="text-sm font-medium text-primary hover:underline"
              >
                Clear filters
              </a>
            </div>
          )}
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <StaggerContainer visible={true} staggerDelay={0.05}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isUnlocked={isLessonUnlocked(lesson.id, lessons)}
                />
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No lessons match your filters</p>
          </div>
        )}
      </Container>
    </PageTransition>
  )
}

function LessonCard({
  lesson,
  isUnlocked,
}: {
  lesson: Lesson
  isUnlocked: boolean
}) {
  return (
    <AnimatedCard
      className={cn(
        "h-full overflow-hidden transition-all",
        !isUnlocked && "opacity-60 grayscale"
      )}
    >
      <a href={isUnlocked ? `/learn/lessons/${lesson.id}` : "#"} className="block p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>{lesson.estimatedMinutes} min</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                {lesson.tier.charAt(0).toUpperCase() + lesson.tier.slice(1)}
              </span>
              <span className="text-xs text-muted-foreground">#{lesson.order}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold">{lesson.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {lesson.description}
            </p>
          </div>

          {/* Topics */}
          <div className="mt-auto flex flex-wrap gap-2">
            {lesson.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-muted px-2 py-1 text-xs font-medium"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm">
            {isUnlocked ? (
              <>
                <CheckCircle2 className="size-4 text-green-600" />
                <span className="font-medium text-green-600">Completed</span>
              </>
            ) : (
              <>
                <Circle className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">Locked</span>
              </>
            )}
          </div>
        </div>
      </a>
    </AnimatedCard>
  )
}
