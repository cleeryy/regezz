"use client"

import { useMemo } from "react"
import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { ANIMATION } from "@/lib/constants"

interface CaptureGroupDisplayProps {
	text: string
	pattern: string
	flags?: string
}

const GROUP_COLORS = [
	"bg-blue-500/30 border-blue-500",
	"bg-green-500/30 border-green-500",
	"bg-purple-500/30 border-purple-500",
	"bg-orange-500/30 border-orange-500",
	"bg-pink-500/30 border-pink-500",
	"bg-cyan-500/30 border-cyan-500",
]

export function CaptureGroupDisplay({ text, pattern, flags = "" }: CaptureGroupDisplayProps) {
	const groups = useMemo(() => {
		if (!pattern) return []

		try {
			const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g")
			const match = regex.exec(text)

			if (!match) return []

			return Array.from({ length: match.length - 1 }, (_, i) => ({
				index: i + 1,
				value: match[i + 1] || "",
			})).filter((g) => g.value)
		} catch {
			return []
		}
	}, [text, pattern, flags])

	if (!pattern || groups.length === 0) {
		return null
	}

	return (
		<Card className="p-4">
			<div className="text-sm font-medium mb-3">Captured Groups</div>
			<div className="flex flex-wrap gap-2">
				{groups.map((group, index) => (
					<motion.div
						key={group.index}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ ...ANIMATION.SPRING, delay: index * 0.1 }}
						className={`px-3 py-2 rounded border font-mono text-sm ${
							GROUP_COLORS[index % GROUP_COLORS.length]
						}`}
					>
						<span className="text-xs text-muted-foreground mr-2">
							${group.index}:
						</span>
						<span className="font-medium">{group.value}</span>
					</motion.div>
				))}
			</div>
		</Card>
	)
}
