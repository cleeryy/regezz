/**
 * Gamification types
 */

export interface Achievement {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  requirement: AchievementRequirement
  xpReward: number
  unlockedAt?: string
}

export interface AchievementRequirement {
  type: "lessons_complete" | "practice_complete" | "streak" | "perfect_score" | "groups_used" | "tier_complete" | "all_complete"
  count: number
  tier?: string
}

export interface UserProgress {
  completedLessons: string[]
  currentLesson: string
  exerciseAttempts: Record<string, ExerciseAttempt>
  totalXP: number
  level: number
  streak: StreakInfo
  unlockedAchievements: string[]
  tierProgress: Record<string, number>
}

export interface ExerciseAttempt {
  attempts: number
  bestScore: number
  firstAttemptScore?: number
  completedAt?: string
}

export interface StreakInfo {
  current: number
  lastActiveDate: string
  longestStreak: number
  freezesUsed: number
}

export interface LevelInfo {
  level: number
  title: string
  currentXP: number
  xpForNextLevel: number
  progress: number
}
