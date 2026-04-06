/**
 * Lesson types
 */

export type LessonTier = "foundation" | "quantification" | "structure" | "advanced"

export interface LessonContentBlock {
  type: "text" | "example" | "interactive" | "quiz"
  content: string
  code?: string
  explanation?: string
}

export interface LessonExercise {
  id: string
  instruction: string
  pattern: string
  flags?: string
  testCases: LessonTestCase[]
  hints: string[]
}

export interface LessonTestCase {
input: string
shouldMatch: boolean
explanation?: string
}

export interface Lesson {
id: string
slug: string
title: string
description: string
tier: LessonTier
order: number
prerequisites: string[]
content: LessonContentBlock[]
exercise: LessonExercise
estimatedMinutes: number
topics: string[]
}

export interface LessonProgress {
lessonId: string
completed: boolean
completedAt?: string
exerciseAttempts: number
bestScore: number
firstAttemptScore?: number
}
