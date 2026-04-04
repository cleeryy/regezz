"use client"

import { createContext, useContext, useMemo, useCallback, type ReactNode } from "react"
import { useSessionStorage } from "@/hooks/useSessionStorage"
import { STORAGE_KEYS } from "@/lib/constants"
import type { Lesson } from "@/types/lesson"
import { checkAchievementsFromProgress } from "@/hooks/achievement-checker"

interface ProgressState {
  completedLessons: string[]
  currentLesson: string
}

interface ProgressContextType {
  /** IDs of completed lessons */
  completedLessons: string[]
  /** Current lesson ID being studied */
  currentLesson: string
  /** Set current lesson */
  setCurrentLesson: (lessonId: string) => void
  /** Mark a lesson as complete */
  completeLesson: (lessonId: string) => void
  /** Check if a lesson is unlocked (prerequisites met) */
  isLessonUnlocked: (lessonId: string, lessons: Lesson[]) => boolean
  /** Get lesson progress percentage */
  getProgress: (lessons: Lesson[]) => number
  /** Reset all progress */
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export interface ProgressProviderProps {
  children: ReactNode
  /** All lessons data for prerequisite checking */
  lessons: Lesson[]
}

/**
 * Progress tracking context provider
 * Manages lesson completion and unlocking
 */
export function ProgressProvider({ children, lessons }: ProgressProviderProps) {
  const [state, setState] = useSessionStorage<ProgressState>(
    STORAGE_KEYS.USER_PROGRESS_PROGRESS,
    {
      completedLessons: [],
      currentLesson: "",
    }
  )

  const setCurrentLesson = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      currentLesson: lessonId,
    }))
  }, [setState])

  const completeLesson = useCallback((lessonId: string) => {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev
      }
      const newCompleted = [...prev.completedLessons, lessonId]
      // Bridge: check potential achievements that could be unlocked by completing this lesson
      try {
        const possible = checkAchievementsFromProgress({ completedLessons: newCompleted })
        if (possible.length > 0) {
          // Debug log for visibility
          // Note: Actual unlocking is handled by the gamification hook/state; this is a non-breaking
          // bridge to surface what would be unlocked given current state.
          console.debug("ProgressContext: possible achievements after completeLesson", possible)
        }
      } catch {
        // no-op if checker isn't available in env
      }
      return {
        ...prev,
        completedLessons: newCompleted,
      }
    })
  }, [setState])

  const isLessonUnlocked = useCallback((lessonId: string, allLessons: Lesson[]): boolean => {
    const lesson = allLessons.find((l) => l.id === lessonId)
    if (!lesson) {
      return false
    }

    // If no prerequisites, always unlocked
    if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
      return true
    }

    // Check if all prerequisites are completed
    return lesson.prerequisites.every((prereqId) =>
      state.completedLessons.includes(prereqId)
    )
  }, [state.completedLessons])

  const getProgress = useCallback((allLessons: Lesson[]): number => {
    if (allLessons.length === 0) return 0
    return Math.round((state.completedLessons.length / allLessons.length) * 100)
  }, [state.completedLessons])

  const resetProgress = useCallback(() => {
    setState({
      completedLessons: [],
      currentLesson: "",
    })
  }, [setState])

  const value = useMemo<ProgressContextType>(() => ({
    completedLessons: state.completedLessons,
    currentLesson: state.currentLesson,
    setCurrentLesson,
    completeLesson,
    isLessonUnlocked,
    getProgress,
    resetProgress,
  }), [
    state.completedLessons,
    state.currentLesson,
    setCurrentLesson,
    completeLesson,
    isLessonUnlocked,
    getProgress,
    resetProgress,
  ])

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

/**
 * Hook to access progress context
 * Must be used within a ProgressProvider
 */
export function useProgressContext(): ProgressContextType {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgressContext must be used within a ProgressProvider")
  }
  return context
}
