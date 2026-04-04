"use client"

import { useCallback, useMemo } from "react"
import { useSessionStorage } from "./useSessionStorage"
import { LEVEL_THRESHOLDS, STORAGE_KEYS } from "@/lib/constants"
import { achievements } from "@/data/achievements"

interface StreakInfo {
	current: number
	lastActiveDate: string
	longestStreak: number
	freezesUsed: number
}

interface UserProgress {
	completedLessons: string[]
	currentLesson: string
	exerciseAttempts: Record<string, { attempts: number; bestScore: number; firstAttemptScore?: number; completedAt?: string }>
	totalXP: number
	level: number
	streak: StreakInfo
	unlockedAchievements: string[]
	tierProgress: Record<string, number>
}

export interface UseGamificationReturn {
  totalXP: number
  level: number
  levelTitle: string
  xpForNextLevel: number
  streak: StreakInfo
  unlockedAchievements: string[]
  tierProgress: Record<string, number>
  completedLessons: string[]
  addXP: (amount: number) => void
  unlockAchievement: (achievementId: string) => void
  checkAchievements: (currentProgress?: Partial<UserProgress>) => void
  updateStreak: () => void
  resetProgress: () => void
  markLessonCompleted: (lessonId: string) => void
}

const DEFAULT_PROGRESS: UserProgress = {
	completedLessons: [],
	currentLesson: "",
	exerciseAttempts: {},
	totalXP: 0,
	level: 1,
	streak: { current: 0, lastActiveDate: "", longestStreak: 0, freezesUsed: 0 },
	unlockedAchievements: [],
	tierProgress: {},
}

export function useGamification(): UseGamificationReturn {
    const [progress, setProgress] = useSessionStorage<UserProgress>(STORAGE_KEYS.USER_PROGRESS, DEFAULT_PROGRESS)

	const level = useMemo(() => {
		let currentLevel = 1
		for (const threshold of LEVEL_THRESHOLDS) {
			if (progress.totalXP >= threshold.xp) currentLevel = threshold.level
		}
		return currentLevel
	}, [progress.totalXP])

	const levelInfo = useMemo(() => {
		const current = LEVEL_THRESHOLDS.find((t) => t.level === level) || LEVEL_THRESHOLDS[0]
		const next = LEVEL_THRESHOLDS.find((t) => t.level === level + 1)
		return { levelTitle: current.title, xpForNextLevel: next ? next.xp - progress.totalXP : 0 }
	}, [level, progress.totalXP])

    // Internal function that evaluates which achievements become available
    const runAchievementCheck = useCallback(
        (currentProgressOverride?: Partial<UserProgress>) => {
            const p = currentProgressOverride ? { ...progress, ...currentProgressOverride } : progress
            // Determine which achievements can be unlocked with the current state
            const toUnlock: string[] = []
            achievements.forEach((a) => {
                const req = a.requirement
                let eligible = false
                if (req?.type === "lessons_complete") {
                    eligible = (p.completedLessons?.length ?? 0) >= (req.count ?? 0)
                } else if (req?.type === "streak") {
                    eligible = (p.streak?.current ?? 0) >= (req.count ?? 0)
                }
                // Only unlock if not already unlocked
                if (eligible && !(p.unlockedAchievements?.includes(a.id) ?? false)) {
                    toUnlock.push(a.id)
                }
            })
            if (toUnlock.length > 0) {
                // Unlock each new achievement directly (avoid external function reference in this scope)
                toUnlock.forEach((id) => {
                    setProgress((prev: UserProgress) => {
                        if (prev.unlockedAchievements.includes(id)) return prev
                        return { ...prev, unlockedAchievements: [...prev.unlockedAchievements, id] }
                    })
                })
                console.debug("Gamification: checked and unlocked", toUnlock)
            } else {
                console.debug("Gamification: checked, no new achievements", progress.unlockedAchievements)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [progress]
    )

    const addXP = useCallback((amount: number) => {
        setProgress((prev: UserProgress) => {
            const next = { ...prev, totalXP: prev.totalXP + amount }
            // After updating XP, evaluate potential achievements based on the new snapshot
            runAchievementCheck(next)
            return next
        })
    }, [setProgress, runAchievementCheck])

    // Unlock function moved here to ensure it's defined before the checker uses it
    const unlockAchievement = useCallback((achievementId: string) => {
        setProgress((prev: UserProgress) => {
            if (prev.unlockedAchievements.includes(achievementId)) return prev
            return { ...prev, unlockedAchievements: [...prev.unlockedAchievements, achievementId] }
        })
    }, [setProgress])

    // Public wrapper to trigger achievements check from outside (e.g., ProgressContext)
    const checkAchievements = useCallback(
        (currentProgressOverride?: Partial<UserProgress>) => {
            runAchievementCheck(currentProgressOverride)
        },
        [runAchievementCheck]
    )

	const updateStreak = useCallback(() => {
		const today = new Date().toISOString().split("T")[0]
		const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
		setProgress((prev: UserProgress) => {
			if (prev.streak.lastActiveDate === today) return prev
			const newCurrent = prev.streak.lastActiveDate === yesterday ? prev.streak.current + 1 : 1
			return {
				...prev,
				streak: {
					...prev.streak,
					current: newCurrent,
					lastActiveDate: today,
					longestStreak: Math.max(prev.streak.longestStreak, newCurrent),
				},
			}
		})
	}, [setProgress])

  const resetProgress = useCallback(() => setProgress(DEFAULT_PROGRESS), [setProgress])

  const markLessonCompleted = useCallback((lessonId: string) => {
    setProgress((prev: UserProgress) => {
      if (prev.completedLessons.includes(lessonId)) return prev
      const next = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      }
      runAchievementCheck(next)
      return next
    })
  }, [setProgress, runAchievementCheck])

  return {
    totalXP: progress.totalXP,
    level,
    levelTitle: levelInfo.levelTitle,
    xpForNextLevel: levelInfo.xpForNextLevel,
    streak: progress.streak,
    unlockedAchievements: progress.unlockedAchievements,
    tierProgress: progress.tierProgress,
    completedLessons: progress.completedLessons,
    addXP,
    unlockAchievement,
    checkAchievements,
    updateStreak,
    resetProgress,
    markLessonCompleted,
  }
}
