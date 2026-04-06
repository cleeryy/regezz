import { beginnerLessons } from '../data/lessons/beginner/1-5'
import { intermediateLessons } from '../data/lessons/intermediate/6-10'
import { advancedLessons } from '../data/lessons/advanced/11-15'
import { advancedLessons2 } from '../data/lessons/advanced/16-20'
import { creativeLessons } from '../data/lessons/bonus/creative'
import { beginnerProblems } from '../data/problems/beginner/1-10'
import { intermediateProblems } from '../data/problems/intermediate/11-20'
import { advancedProblems } from '../data/problems/advanced/21-30'

interface TestResult {
  type: 'lesson' | 'problem'
  id: string
  pattern: string
  passed: number
  failed: number
  errors: { input: string; expected: boolean; actual: boolean; explanation: string }[]
}

function testRegexPattern(pattern: string, testCases: Array<{ input: string; shouldMatch: boolean; explanation?: string }>, flags?: string): { passed: number; failed: number; errors: Array<{ input: string; expected: boolean; actual: boolean; explanation: string }> } {
  let passed = 0
  let failed = 0
  const errors: Array<{ input: string; expected: boolean; actual: boolean; explanation: string }> = []

  try {
    const regex = new RegExp(pattern, flags || '')

    for (const tc of testCases) {
      const actual = regex.test(tc.input)
      if (actual === tc.shouldMatch) {
        passed++
      } else {
        failed++
        errors.push({
          input: tc.input,
          expected: tc.shouldMatch,
          actual,
          explanation: tc.explanation || ''
        })
      }
    }
  } catch (e) {
    failed = testCases.length
    for (const tc of testCases) {
      errors.push({
        input: tc.input,
        expected: tc.shouldMatch,
        actual: false,
        explanation: `Invalid regex: ${e}`
      })
    }
  }

  return { passed, failed, errors }
}

function validateLessons(): TestResult[] {
  const results: TestResult[] = []
  
  const allLessons = [
    ...beginnerLessons,
    ...intermediateLessons,
    ...advancedLessons,
    ...advancedLessons2,
    ...creativeLessons
  ]
  
  for (const lesson of allLessons) {
    if (lesson.exercise) {
      const result = testRegexPattern(lesson.exercise.pattern, lesson.exercise.testCases, lesson.exercise.flags)
      results.push({
        type: 'lesson',
        id: lesson.id,
        pattern: lesson.exercise.pattern,
        passed: result.passed,
        failed: result.failed,
        errors: result.errors
      })
    }
  }
  
  return results
}

function validateProblems(): TestResult[] {
  const results: TestResult[] = []
  
  const allProblems = [
    ...beginnerProblems,
    ...intermediateProblems,
    ...advancedProblems
  ]
  
  for (const problem of allProblems) {
    const result = testRegexPattern(problem.solution, problem.testCases)
    results.push({
      type: 'problem',
      id: problem.id,
      pattern: problem.solution,
      passed: result.passed,
      failed: result.failed,
      errors: result.errors
    })
  }
  
  return results
}

function main() {
  console.log('=== Validating All Regex Learning Exercises ===\n')
  
  const lessonResults = validateLessons()
  const problemResults = validateProblems()
  
  let totalPassed = 0
  let totalFailed = 0
  
  console.log('--- Lessons ---')
  for (const result of lessonResults) {
    totalPassed += result.passed
    totalFailed += result.failed
    if (result.failed > 0) {
      console.log(`❌ ${result.id}: ${result.passed} passed, ${result.failed} failed`)
      console.log(`   Pattern: ${result.pattern}`)
      for (const err of result.errors) {
        console.log(`   - Input: "${err.input}" | Expected: ${err.expected} | Got: ${err.actual}`)
        if (err.explanation) console.log(`     (${err.explanation})`)
      }
    } else {
      console.log(`✓ ${result.id}: All ${result.passed} tests passed`)
    }
  }
  
  console.log('\n--- Practice Problems ---')
  for (const result of problemResults) {
    totalPassed += result.passed
    totalFailed += result.failed
    if (result.failed > 0) {
      console.log(`❌ Problem ${result.id}: ${result.passed} passed, ${result.failed} failed`)
      console.log(`   Pattern: ${result.pattern}`)
      for (const err of result.errors) {
        console.log(`   - Input: "${err.input}" | Expected: ${err.expected} | Got: ${err.actual}`)
        if (err.explanation) console.log(`     (${err.explanation})`)
      }
    } else {
      console.log(`✓ Problem ${result.id}: All ${result.passed} tests passed`)
    }
  }
  
  console.log('\n=== Summary ===')
  console.log(`Total tests: ${totalPassed + totalFailed}`)
  console.log(`Passed: ${totalPassed}`)
  console.log(`Failed: ${totalFailed}`)
  
  if (totalFailed === 0) {
    console.log('\n✅ All exercises validated successfully!')
    process.exit(0)
  } else {
    console.log('\n❌ Some exercises have failing test cases. Please fix before deploying.')
    process.exit(1)
  }
}

main()
