/**
 * Problems data aggregation and utility functions
 */

import type { PracticeProblem } from '@/types/practice'
import { beginnerProblems } from './beginner/1-10'
import { intermediateProblems } from './intermediate/11-20'
import { advancedProblems } from './advanced/21-30'

// Combine all problems in order
const allProblems: PracticeProblem[] = [
  ...beginnerProblems,
  ...intermediateProblems,
  ...advancedProblems
]

/**
 * Get a problem by its ID
 */
export function getProblemById(id: string): PracticeProblem | undefined {
  return allProblems.find(problem => problem.id === id)
}

/**
 * Get all problems in order
 */
export function getAllProblems(): PracticeProblem[] {
  return allProblems
}

/**
 * Get problems by difficulty
 */
export function getProblemsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): PracticeProblem[] {
  return allProblems.filter(problem => problem.difficulty === difficulty)
}
