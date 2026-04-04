"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"
import { Flame } from "lucide-react"

export interface StreakCounterProps {
	streak: number
	size?: "sm" | "md" | "lg"
	showIcon?: boolean
	className?: string
}

export function StreakCounter({
	streak,
	size = "md",
	showIcon = true,
	className,
}: StreakCounterProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center font-bold text-orange-500",
				size === "sm" && "text-sm gap-1.5",
				size === "md" && "text-base gap-2",
				size === "lg" && "text-xl gap-2.5",
				className
			)}
		>
			{showIcon && (
				<motion.div
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
				>
					<Flame className={cn(size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6", "fill-orange-500")} />
				</motion.div>
			)}
			<motion.span
				key={streak}
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={ANIMATION.SPRING_BOUNCE}
				className="inline-block"
			>
				{streak} day{streak !== 1 ? "s" : ""}
			</motion.span>
		</div>
	)
}
