"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "motion/react"
import { AlertCircle, Check, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRegexValidation } from "@/hooks/useRegexValidation"
import { REGEX_SETTINGS } from "@/lib/constants"

interface RegexEditorProps {
	initialPattern?: string
	onPatternChange?: (pattern: string) => void
	onSubmit?: (pattern: string) => void
	placeholder?: string
	disabled?: boolean
}

export function RegexEditor({
	initialPattern = "",
	onPatternChange,
	onSubmit,
	placeholder = "Enter your regex pattern...",
	disabled = false,
}: RegexEditorProps) {
	const [pattern, setPattern] = useState(initialPattern)
	const { validation, isValidating, setPattern: validatePattern } = useRegexValidation()

	useEffect(() => {
		validatePattern(pattern)
		onPatternChange?.(pattern)
	}, [pattern, validatePattern, onPatternChange])

	const handleSubmit = () => {
		if (!validation?.isValid) return
		onSubmit?.(pattern)
	}

	const getStatusIcon = () => {
		if (isValidating) {
			return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
		}
		if (!pattern) {
			return null
		}
		if (validation?.isValid) {
			return <Check className="h-4 w-4 text-green-500" />
		}
		return <AlertCircle className="h-4 w-4 text-destructive" />
	}

	return (
		<div className="space-y-3">
			<div className="relative">
				<Textarea
					value={pattern}
					onChange={(e) => setPattern(e.target.value)}
					placeholder={placeholder}
					disabled={disabled}
					className={cn(
						"font-mono text-base min-h-[100px] pr-10",
						validation?.isValid && pattern && "border-green-500/50",
						validation && !validation.isValid && pattern && "border-destructive/50"
					)}
				/>
				<div className="absolute top-3 right-3">{getStatusIcon()}</div>
			</div>

			{validation?.warnings && validation.warnings.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-sm text-yellow-600 dark:text-yellow-500"
				>
					{validation.warnings.map((warning, i) => (
						<div key={i}>⚠️ {warning}</div>
					))}
				</motion.div>
			)}

			{validation && !validation.isValid && pattern && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-sm text-destructive"
				>
					{validation.errors.map((error, i) => (
						<div key={i}>❌ {error}</div>
					))}
				</motion.div>
			)}

			{onSubmit && (
				<Button
					onClick={handleSubmit}
					disabled={!validation?.isValid || disabled || isValidating}
					className="w-full"
				>
					Test Pattern
				</Button>
			)}
		</div>
	)
}
