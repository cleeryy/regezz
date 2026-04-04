"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { cn } from "@/lib/utils"
import { ANIMATION } from "@/lib/constants"
import type { Lesson, LessonContentBlock } from "@/types/lesson"

interface LessonContentProps {
	lesson: Lesson
	isCompleted: boolean
	onComplete: () => void
}

export function LessonContent({ lesson, isCompleted, onComplete }: LessonContentProps) {
	const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
	const totalBlocks = lesson.content.length
	const progress = ((currentBlockIndex + 1) / totalBlocks) * 100

	const handleNext = () => {
		if (currentBlockIndex < totalBlocks - 1) {
			setCurrentBlockIndex((prev) => prev + 1)
		}
	}

	const handlePrev = () => {
		if (currentBlockIndex > 0) {
			setCurrentBlockIndex((prev) => prev - 1)
		}
	}

  const renderBlock = (block: LessonContentBlock) => {
    switch (block.type) {
      case "text":
        return (
          <div className="prose prose-sm max-w-none">
            <MarkdownRenderer content={block.content} />
          </div>
        )
      case "example":
        return (
          <Card className="p-4 bg-muted/50">
            <div className="text-sm font-medium mb-2">Example</div>
            {block.code && (
              <pre className="bg-background p-3 rounded-md font-mono text-sm overflow-x-auto">
                <code>{block.code}</code>
              </pre>
            )}
            {block.explanation && (
              <div className="text-sm text-muted-foreground mt-2">
                <MarkdownRenderer content={block.explanation} />
              </div>
            )}
          </Card>
        )
      case "interactive":
        return (
          <Card className="p-4 border-primary/50 bg-primary/5">
            <div className="text-sm font-medium mb-2">Try it yourself</div>
            <MarkdownRenderer content={block.content} />
            {block.code && (
              <pre className="bg-background p-3 rounded-md font-mono text-sm mt-2 overflow-x-auto">
                <code>{block.code}</code>
              </pre>
            )}
          </Card>
        )
      default:
        return null
    }
  }

	const currentBlock = lesson.content[currentBlockIndex]

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">
						Block {currentBlockIndex + 1} of {totalBlocks}
					</span>
					<span className="font-medium">{Math.round(progress)}%</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={currentBlockIndex}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					transition={ANIMATION.EASE_OUT}
					className="min-h-[300px]"
				>
					{currentBlock && renderBlock(currentBlock)}
				</motion.div>
			</AnimatePresence>

			<div className="flex items-center justify-between pt-4">
				<Button
					variant="outline"
					onClick={handlePrev}
					disabled={currentBlockIndex === 0}
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Previous
				</Button>

				{currentBlockIndex === totalBlocks - 1 ? (
					<Button onClick={onComplete} disabled={isCompleted}>
						{isCompleted ? (
							<>
								<CheckCircle className="h-4 w-4 mr-2" />
								Completed
							</>
						) : (
							"Mark as Complete"
						)}
					</Button>
				) : (
					<Button onClick={handleNext}>
						Next
						<ArrowRight className="h-4 w-4 ml-2" />
					</Button>
				)}
			</div>
		</div>
	)
}
