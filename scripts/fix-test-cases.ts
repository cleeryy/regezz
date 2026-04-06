#!/usr/bin/env tsx
import { beginnerLessons } from '../data/lessons/beginner/1-5'
import { intermediateLessons } from '../data/lessons/intermediate/6-10'
import { advancedLessons } from '../data/lessons/advanced/11-15'
import { advancedLessons2 } from '../data/lessons/advanced/16-20'
import { creativeLessons } from '../data/lessons/bonus/creative'
import { beginnerProblems } from '../data/problems/beginner/1-10'
import { intermediateProblems } from '../data/problems/intermediate/11-20'
import { advancedProblems } from '../data/problems/advanced/21-30'

const dryRun = process.argv.includes('--dry-run')

console.log('=== Auto-Fix Test Cases ===\n')
console.log(`Mode: ${dryRun ? 'DRY RUN' : 'FIX'}\n`)

const allLessons = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons,
  ...advancedLessons2,
  ...creativeLessons
]

const allProblems = [
  ...beginnerProblems,
  ...intermediateProblems,
  ...advancedProblems
]

interface Error {
  id: string
  type: 'lesson' | 'problem'
  pattern: string
  input: string
  expected: boolean
  actual: boolean
  explanation?: string
}

const errors: Error[] = []

for (const lesson of allLessons) {
  if (lesson.exercise) {
    try {
      const regex = new RegExp(lesson.exercise.pattern)
      for (const tc of lesson.exercise.testCases) {
        const actual = regex.test(tc.input)
        if (actual !== tc.shouldMatch) {
          errors.push({
            id: lesson.id,
            type: 'lesson',
            pattern: lesson.exercise.pattern,
            input: tc.input,
            expected: tc.shouldMatch,
            actual,
            explanation: tc.explanation
          })
        }
      }
    } catch (e) {
      console.error(`Invalid regex in lesson ${lesson.id}:`, e)
    }
  }
}

for (const problem of allProblems) {
  try {
    const regex = new RegExp(problem.solution)
    for (const tc of problem.testCases) {
      const actual = regex.test(tc.input)
      if (actual !== tc.shouldMatch) {
        errors.push({
          id: problem.id,
          type: 'problem',
          pattern: problem.solution,
          input: tc.input,
          expected: tc.shouldMatch,
          actual,
          explanation: tc.explanation
        })
      }
    }
  } catch (e) {
    console.error(`Invalid regex in problem ${problem.id}:`, e)
  }
}

if (errors.length === 0) {
  console.log('✅ All test cases pass!\n')
  process.exit(0)
}

console.log(`Found ${errors.length} test case errors:\n`)

const groupedByPattern = new Map<string, Error[]>()
for (const err of errors) {
  const key = `${err.type}-${err.id}-${err.pattern}`
  if (!groupedByPattern.has(key)) {
    groupedByPattern.set(key, [])
  }
  groupedByPattern.get(key)!.push(err)
}

for (const [key, errs] of groupedByPattern) {
  const [type, id, pattern] = key.split('-')
  console.log(`${type === 'lesson' ? 'Lesson' : 'Problem'} ${id}: /${pattern}/`)
  for (const err of errs) {
    console.log(`  "${err.input}" | Expected: ${err.expected} | Actual: ${err.actual}`)
    if (err.explanation) {
      console.log(`    (${err.explanation})`)
    }
  }
  console.log()
}

if (dryRun) {
  console.log('Run without --dry-run to see suggested fixes.\n')
} else {
  console.log('Suggested fixes:\n')
  console.log('```')
  for (const err of errors) {
    console.log(`// ${err.type === 'lesson' ? 'Lesson' : 'Problem'} ${err.id}`)
    console.log(`// Pattern: /${err.pattern}/`)
    console.log(`// Input: "${err.input}"`)
    console.log(`// Change: shouldMatch: ${err.expected} → ${err.actual}`)
    console.log('')
  }
  console.log('```\n')
}

console.log(`Total errors: ${errors.length}`)
process.exit(1)
