"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"
import type { RegexToken, TokenType } from "@/types/visualization"

interface RegexTokenVisualizerProps {
	pattern: string
	tokens?: RegexToken[]
	onTokenClick?: (token: RegexToken) => void
}

const TOKEN_COLORS: Record<TokenType, string> = {
	literal: "bg-gray-500/20 text-gray-700 dark:text-gray-300",
	"character-class": "bg-blue-500/20 text-blue-700 dark:text-blue-300",
	quantifier: "bg-green-500/20 text-green-700 dark:text-green-300",
	anchor: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
	group: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
	alternation: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
	lookahead: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
	lookbehind: "bg-teal-500/20 text-teal-700 dark:text-teal-300",
	backreference: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
	escape: "bg-red-500/20 text-red-700 dark:text-red-300",
}

const TOKEN_LABELS: Record<TokenType, string> = {
	literal: "Literal",
	"character-class": "Character Class",
	quantifier: "Quantifier",
	anchor: "Anchor",
	group: "Group",
	alternation: "Alternation",
	lookahead: "Lookahead",
	lookbehind: "Lookbehind",
	backreference: "Backreference",
	escape: "Escape",
}

export function RegexTokenVisualizer({
	pattern,
	tokens = [],
	onTokenClick,
}: RegexTokenVisualizerProps) {
	if (!pattern) {
		return (
			<Card className="p-4 bg-muted/50">
				<div className="text-sm text-muted-foreground">
					Enter a pattern to see the token breakdown
				</div>
			</Card>
		)
	}

	if (tokens.length === 0) {
		return (
			<Card className="p-4">
				<div className="font-mono text-lg mb-3">/{pattern}/</div>
				<div className="text-sm text-muted-foreground">
					Token breakdown will appear here
				</div>
			</Card>
		)
	}

	return (
		<Card className="p-4">
			<div className="font-mono text-lg mb-4">/{pattern}/</div>
			<div className="flex flex-wrap gap-2">
				{tokens.map((token, index) => (
					<motion.div
						key={`${token.type}-${token.start}-${token.end}`}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ ...ANIMATION.SPRING, delay: index * 0.03 }}
						onClick={() => onTokenClick?.(token)}
						className={cn(
							"px-2 py-1 rounded text-sm font-mono cursor-pointer hover:opacity-80 transition-opacity",
							TOKEN_COLORS[token.type]
						)}
					>
						<span>{token.value}</span>
						<Badge variant="outline" className="ml-1 text-xs">
							{TOKEN_LABELS[token.type]}
						</Badge>
					</motion.div>
				))}
			</div>
		</Card>
	)
}
