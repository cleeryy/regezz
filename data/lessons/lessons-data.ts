/**
 * Lessons data aggregation and utility functions
 */

import type { Lesson } from '@/types/lesson'
import { beginnerLessons } from './beginner/1-5'
import { intermediateLessons } from './intermediate/6-10'
import { advancedLessons } from './advanced/11-15'
import { advancedLessons2 } from './advanced/16-20'
import { creativeLessons } from './bonus/creative'

const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons,
  ...advancedLessons2,
  ...creativeLessons
]

/**
 * Get a lesson by its ID
 */
export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find(lesson => lesson.id === id)
}

/**
 * Get all lessons in order
 */
export function getAllLessons(): Lesson[] {
  return allLessons
}

/**
 * Get lessons by tier
 */
export function getLessonsByTier(tier: 'foundation' | 'quantification' | 'structure' | 'advanced'): Lesson[] {
  return allLessons.filter(lesson => lesson.tier === tier)
}
