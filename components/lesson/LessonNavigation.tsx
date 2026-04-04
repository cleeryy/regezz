"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LessonNavigationProps {
	prevLessonId: string | null
	nextLessonId: string | null
	currentLessonTitle: string
	onNavigate: (lessonId: string) => void
}

export function LessonNavigation({
	prevLessonId,
	nextLessonId,
	currentLessonTitle,
	onNavigate,
}: LessonNavigationProps) {
	return (
		<div className="flex items-center justify-between py-4 border-t">
			<Button
				variant="ghost"
				disabled={!prevLessonId}
				onClick={() => prevLessonId && onNavigate(prevLessonId)}
				className={cn(
					"flex items-center gap-2",
					!prevLessonId && "opacity-50 cursor-not-allowed"
				)}
			>
				<ChevronLeft className="h-4 w-4" />
				<span className="hidden sm:inline">Previous Lesson</span>
				<span className="sm:hidden">Previous</span>
			</Button>

			<div className="text-center">
				<div className="text-sm text-muted-foreground">Current</div>
				<div className="font-medium text-sm truncate max-w-[200px]">
					{currentLessonTitle}
				</div>
			</div>

			<Button
				variant="ghost"
				disabled={!nextLessonId}
				onClick={() => nextLessonId && onNavigate(nextLessonId)}
				className={cn(
					"flex items-center gap-2",
					!nextLessonId && "opacity-50 cursor-not-allowed"
				)}
			>
				<span className="hidden sm:inline">Next Lesson</span>
				<span className="sm:hidden">Next</span>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	)
}
