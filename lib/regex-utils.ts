"use client"

import { RegExpParser } from "@eslint-community/regexpp"
import safeRegex from "safe-regex2"

interface TestCaseLike {
	input: string
	shouldMatch: boolean
	explanation?: string
}

export interface RegexParseResult {
	isValid: boolean
	error?: string
	ast?: unknown
	flags?: string
	groups?: string[]
	hasCapturingGroups: boolean
	pattern: string
}

export interface RegexTestResult {
	matches: boolean
	matchedGroups?: string[]
	matchedText?: string
	error?: string
}

export interface ValidationResult {
	isValid: boolean
	errors: string[]
	warnings: string[]
	isSafe: boolean
}

export function parseRegex(pattern: string, flags: string = ""): RegexParseResult {
	try {
		const parser = new RegExpParser()
		const ast = parser.parsePattern(pattern, 0, pattern.length, flags.includes("u"))
		const groups: string[] = []

		const extractGroups = (node: unknown) => {
			if (!node || typeof node !== "object") return
			const n = node as Record<string, unknown>
			if (n.type === "CapturingGroup" && n.name) {
				groups.push(n.name as string)
			}
			if (Array.isArray(n.elements)) {
				n.elements.forEach(extractGroups)
			}
			if (n.alternatives) {
				(n.alternatives as unknown[]).forEach(extractGroups)
			}
			if (n.parent) {
				extractGroups(n.parent)
			}
		}

		extractGroups(ast)

		return {
			isValid: true,
			ast,
			flags,
			groups,
			hasCapturingGroups: groups.length > 0,
			pattern,
		}
	} catch (error) {
		return {
			isValid: false,
			error: error instanceof Error ? error.message : "Invalid regex pattern",
			pattern,
			hasCapturingGroups: false,
		}
	}
}

export function validateRegex(pattern: string, flags: string = ""): ValidationResult {
	const errors: string[] = []
	const warnings: string[] = []

	if (!pattern) {
		errors.push("Pattern cannot be empty")
		return { isValid: false, errors, warnings, isSafe: false }
	}

	if (pattern.startsWith("/") && pattern.endsWith("/")) {
		warnings.push("Pattern appears to include delimiters; remove them")
	}

	const parseResult = parseRegex(pattern, flags)
	if (!parseResult.isValid) {
		errors.push(parseResult.error || "Invalid regex syntax")
		return { isValid: false, errors, warnings, isSafe: false }
	}

	const isSafe = safeRegex(pattern)
	if (!isSafe) {
		warnings.push("Pattern may cause catastrophic backtracking")
	}

	if (pattern.includes(".*.*") || pattern.includes(".+.+")) {
		warnings.push("Nested quantifiers may cause performance issues")
	}

	if (/\(\?[:=!]/.test(pattern) && pattern.includes(".*")) {
		warnings.push("Combining lookarounds with greedy quantifiers may impact performance")
	}

	return { isValid: true, errors, warnings, isSafe }
}

export function testRegex(
  pattern: string,
  testCase: TestCaseLike,
  flags: string = ""
): RegexTestResult {
  try {
    // Use non-global regex for consistent behavior
    // Global flag causes stateful lastIndex that breaks subsequent match() calls
    const flagsWithoutGlobal = flags.replace("g", "")
    const regex = new RegExp(pattern, flagsWithoutGlobal)
    const match = regex.test(testCase.input)

    if (match !== testCase.shouldMatch) {
      return {
        matches: false,
        error: `Expected ${testCase.shouldMatch ? "match" : "no match"}, got ${match ? "match" : "no match"}`,
      }
    }

    if (match && testCase.shouldMatch) {
      // Create a fresh regex for match() to avoid lastIndex issues
      const matchRegex = new RegExp(pattern, flagsWithoutGlobal)
      const fullMatch = testCase.input.match(matchRegex)
      if (fullMatch && fullMatch.length > 1) {
        return {
          matches: true,
          matchedGroups: fullMatch.slice(1),
          matchedText: fullMatch[0],
        }
      }
      return { matches: true, matchedText: fullMatch?.[0] }
    }

    return { matches: true }
  } catch (error) {
    return {
      matches: false,
      error: error instanceof Error ? error.message : "Regex execution error",
    }
  }
}

export function testRegexAgainstCases(
  pattern: string,
  testCases: TestCaseLike[],
  flags: string = ""
): {
  passed: number
  total: number
  results: (RegexTestResult & { testCase: TestCaseLike })[]
} {
	const results = testCases.map((testCase) => ({
		testCase,
		...testRegex(pattern, testCase, flags),
	}))

	const passed = results.filter((r) => r.matches).length

	return { passed, total: testCases.length, results }
}

export function extractRegexParts(regexString: string): { pattern: string; flags: string } {
	const match = regexString.match(/^\/(.+)\/([a-z]*)$/i)

	if (match) {
		return { pattern: match[1], flags: match[2] }
	}

	return { pattern: regexString, flags: "" }
}

export function normalizeRegexPattern(regexString: string): string {
	const { pattern } = extractRegexParts(regexString)
	return pattern
}

export function getRegexFlags(regexString: string, defaultFlags: string = ""): string {
	const { flags } = extractRegexParts(regexString)
	return flags || defaultFlags
}

export function isCompleteRegex(pattern: string): boolean {
	if (!pattern || pattern.length === 0) return false
	const result = parseRegex(pattern)
	return result.isValid
}

export function calculateScore(passed: number, total: number, attempts: number = 1): number {
	const accuracy = passed / total
	const efficiency = 1 / Math.max(attempts, 1)
	return Math.round((accuracy * 0.7 + efficiency * 0.3) * 100)
}
