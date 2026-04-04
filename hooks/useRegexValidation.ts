"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { validateRegex, type ValidationResult } from "@/lib/regex-utils"
import { REGEX_SETTINGS } from "@/lib/constants"
import { debounce } from "@/lib/utils"

export interface UseRegexValidationReturn {
  /** Current validation result */
  validation: ValidationResult | null
  /** Whether the regex is currently being validated */
  isValidating: boolean
  /** The current pattern */
  pattern: string
  /** The current flags */
  flags: string
  /** Update pattern */
  setPattern: (pattern: string) => void
  /** Update flags */
  setFlags: (flags: string) => void
  /** Validate immediately (bypasses debounce) */
  validateNow: () => void
  /** Reset validation state */
  reset: () => void
}

/**
 * Debounced regex validation hook
 * Validates regex patterns with a 300ms debounce
 */
export function useRegexValidation(
  initialPattern: string = "",
  initialFlags: string = ""
): UseRegexValidationReturn {
  const [pattern, setPatternState] = useState(initialPattern)
  const [flags, setFlagsState] = useState(initialFlags)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const validationRef = useRef<{ pattern: string; flags: string }>({
    pattern: initialPattern,
    flags: initialFlags,
  })

  // Update ref when state changes
  useEffect(() => {
    validationRef.current = { pattern, flags }
  }, [pattern, flags])

  // Perform validation
  const performValidation = useCallback(() => {
    const { pattern: currentPattern, flags: currentFlags } = validationRef.current
    setIsValidating(true)

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const result = validateRegex(currentPattern, currentFlags)
      setValidation(result)
      setIsValidating(false)
    }, 0)
  }, [])

  // Debounced validation function
  const debouncedValidation = useRef(
    debounce(() => {
      performValidation()
    }, REGEX_SETTINGS.DEBOUNCE_MS)
  ).current

  // Trigger validation when pattern or flags change
  useEffect(() => {
    if (pattern || flags) {
      debouncedValidation()
    }
  }, [pattern, flags, debouncedValidation])

  const setPattern = useCallback((newPattern: string) => {
    setPatternState(newPattern)
  }, [])

  const setFlags = useCallback((newFlags: string) => {
    setFlagsState(newFlags)
  }, [])

  const validateNow = useCallback(() => {
    performValidation()
  }, [performValidation])

  const reset = useCallback(() => {
    setPatternState("")
    setFlagsState("")
    setValidation(null)
    setIsValidating(false)
  }, [])

  return {
    validation,
    isValidating,
    pattern,
    flags,
    setPattern,
    setFlags,
    validateNow,
    reset,
  }
}
