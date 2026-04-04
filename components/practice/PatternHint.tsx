"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"

interface PatternHintProps {
	hints: string[]
	currentAttempt?: number
}

export function PatternHint({ hints, currentAttempt = 0 }: PatternHintProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [revealedHints, setRevealedHints] = useState(0)

	const showNextHint = () => {
		if (revealedHints < hints.length) {
			setRevealedHints((prev) => prev + 1)
		}
	}

	const hintLevel = Math.min(currentAttempt, hints.length - 1)
	const showHintButton = revealedHints < hints.length

	return (
		<Card className="p-4 bg-yellow-500/5 border-yellow-500/20">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => setIsExpanded(!isExpanded)}
				className="w-full flex items-center justify-between p-0 h-auto"
			>
				<div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
					<Lightbulb className="h-4 w-4" />
					<span className="font-medium">Need a hint?</span>
				</div>
				{isExpanded ? (
					<ChevronUp className="h-4 w-4 text-muted-foreground" />
				) : (
					<ChevronDown className="h-4 w-4 text-muted-foreground" />
				)}
			</Button>

			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={ANIMATION.EASE_OUT}
						className="overflow-hidden"
					>
						<div className="pt-3 space-y-2">
              {hints.slice(0, revealedHints).map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "text-sm text-muted-foreground pl-4 border-l-2",
                    index === 0 && "border-yellow-500",
                    index === 1 && "border-orange-500",
                    index === 2 && "border-red-500"
                  )}
                >
                  <span className="font-medium text-foreground">
                    Hint {index + 1}:
                  </span>{" "}
                  <MarkdownRenderer content={hint} className="inline" />
                </motion.div>
              ))}

							{showHintButton && (
								<Button
									variant="outline"
									size="sm"
									onClick={showNextHint}
									className="mt-2"
								>
									Show Hint {revealedHints + 1} of {hints.length}
								</Button>
							)}

							{revealedHints === hints.length && (
								<div className="text-xs text-muted-foreground mt-2">
									No more hints available. Try your best!
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</Card>
	)
}
