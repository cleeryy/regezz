"use client"

import { cn } from "@/lib/utils"
import { AnimatedCard } from "@/components/motion/AnimatedCard"
import { BookOpen, Clock, CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"
import type { Lesson } from "@/types/lesson"

export interface LessonCardProps {
  lesson: Lesson
  isUnlocked: boolean
}

export function LessonCard({ lesson, isUnlocked }: LessonCardProps) {
  return (
    <AnimatedCard
      className={cn(
        "h-full overflow-hidden transition-all",
        !isUnlocked && "opacity-60 grayscale"
      )}
    >
      <Link href={isUnlocked ? `/learn/lessons/${lesson.id}` : "#"} className="block p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>{lesson.estimatedMinutes} min</span>
            </div>
          </div>

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
      </Link>
    </AnimatedCard>
  )
}
