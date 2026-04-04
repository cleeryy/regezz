/**
 * Practice problem types
 */

export type Difficulty = "beginner" | "intermediate" | "advanced"

export interface PracticeProblem {
  id: string
  slug: string
  title: string
  description: string
  difficulty: Difficulty
  relatedLessons: string[]
  testCases: TestCase[]
  hints: string[]
  solution: string
  explanation: string
  topics: string[]
}

export interface TestCase {
  id: string
  input: string
  shouldMatch: boolean
  expectedGroups?: string[]
  explanation?: string
}

export interface ProblemProgress {
  problemId: string
  attempts: number
  bestScore: number
  firstAttemptScore?: number
  completedAt?: string
}

export interface ProblemResult {
  testCaseId: string
  passed: boolean
  actualMatch: boolean
  expectedMatch: boolean
  matchedText?: string
  capturedGroups?: string[]
}
