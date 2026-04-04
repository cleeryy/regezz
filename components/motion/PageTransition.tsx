"use client"

import { type ReactNode } from "react"
import { motion, AnimatePresence } from "motion/react"

export interface PageTransitionProps {
	children: ReactNode
	show?: boolean
	key?: string
	enterDuration?: number
	exitDuration?: number
}

export function PageTransition({
	children,
	show = true,
	key,
	enterDuration = 0.3,
	exitDuration = 0.2,
}: PageTransitionProps) {
	return (
		<AnimatePresence mode="wait">
			{show && (
				<motion.div
					key={key}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{
						duration: enterDuration,
						ease: "easeOut"
					}}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
