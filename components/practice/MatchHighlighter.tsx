"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"

interface MatchHighlighterProps {
	text: string
	pattern: string
	flags?: string
	highlightClass?: string
}

export function MatchHighlighter({
	text,
	pattern,
	flags = "",
	highlightClass = "bg-primary/30 text-primary",
}: MatchHighlighterProps) {
	const matches = useMemo(() => {
		if (!pattern) return []

		try {
			const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g")
			const result: Array<{ start: number; end: number; text: string }> = []

			let match
			while ((match = regex.exec(text)) !== null) {
				result.push({
					start: match.index,
					end: match.index + match[0].length,
					text: match[0],
				})
				if (!flags.includes("g")) break
			}

			return result
		} catch {
			return []
		}
	}, [text, pattern, flags])

	if (!pattern || matches.length === 0) {
		return <span className="font-mono text-sm whitespace-pre-wrap">{text}</span>
	}

	const parts: Array<{ text: string; isMatch: boolean; key: string }> = []
	let lastIndex = 0

	matches.forEach((match, i) => {
		if (match.start > lastIndex) {
			parts.push({
				text: text.slice(lastIndex, match.start),
				isMatch: false,
				key: `text-${i}`,
			})
		}
		parts.push({
			text: match.text,
			isMatch: true,
			key: `match-${i}`,
		})
		lastIndex = match.end
	})

	if (lastIndex < text.length) {
		parts.push({
			text: text.slice(lastIndex),
			isMatch: false,
			key: "text-end",
		})
	}

	return (
		<div className="font-mono text-sm whitespace-pre-wrap">
			<AnimatePresence>
				{parts.map((part, index) => (
					<motion.span
						key={part.key}
						initial={part.isMatch ? { backgroundColor: "rgba(59, 130, 246, 0)" } : false}
						animate={
							part.isMatch
								? { backgroundColor: "rgba(59, 130, 246, 0.3)" }
								: undefined
						}
						transition={{ ...ANIMATION.SPRING, delay: index * 0.05 }}
						className={cn(part.isMatch && highlightClass, "px-0.5 rounded")}
					>
						{part.text}
					</motion.span>
				))}
			</AnimatePresence>
		</div>
	)
}
