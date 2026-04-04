"use client"

import { motion, AnimatePresence } from "motion/react"
import { CheckCircle, XCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"
import type { TestCase } from "@/types/practice"

interface TestCaseDisplayProps {
	testCases: TestCase[]
	results?: Array<{
		testCaseId: string
		passed: boolean
		actualMatch: boolean
		expectedMatch: boolean
		matchedText?: string
	}>
}

export function TestCaseDisplay({ testCases, results = [] }: TestCaseDisplayProps) {
	const getTestCaseResult = (testCaseId: string) => {
		return results.find((r) => r.testCaseId === testCaseId)
	}

	return (
		<div className="space-y-2">
			<div className="text-sm font-medium mb-3">Test Cases</div>
			<AnimatePresence mode="popLayout">
				{testCases.map((testCase, index) => {
					const result = getTestCaseResult(testCase.id)
					const hasResult = !!result

					return (
						<motion.div
							key={testCase.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ ...ANIMATION.SPRING, delay: index * 0.05 }}
						>
							<Card
								className={cn(
									"p-3 transition-colors",
									hasResult && result.passed && "bg-green-500/10 border-green-500/30",
									hasResult && !result.passed && "bg-red-500/10 border-red-500/30",
									!hasResult && "bg-muted/50"
								)}
							>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0 mt-0.5">
										{hasResult ? (
											result.passed ? (
												<CheckCircle className="h-5 w-5 text-green-500" />
											) : (
												<XCircle className="h-5 w-5 text-red-500" />
											)
										) : (
											<div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="font-mono text-sm break-all bg-background/50 px-2 py-1 rounded">
											{testCase.input}
										</div>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>
            Expected: {testCase.shouldMatch ? "Match" : "No match"}
          </span>
          {hasResult && (
            <>
              <span>•</span>
              <span className={cn(result.passed ? "text-green-600" : "text-red-600")}>
                Got: {testCase.shouldMatch
                  ? (result.actualMatch ? "Match" : "No match")
                  : (result.passed ? "No match" : "Match")}
              </span>
            </>
          )}
        </div>
                {testCase.explanation && (
                  <div className="text-xs text-muted-foreground mt-1">
                    <MarkdownRenderer content={testCase.explanation} />
                  </div>
                )}
									</div>
								</div>
							</Card>
						</motion.div>
					)
				})}
			</AnimatePresence>
		</div>
	)
}
