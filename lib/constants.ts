/**
 * Application constants
 */

// XP thresholds for levels
export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: "Regex Novice" },
  { level: 2, xp: 50, title: "Pattern Apprentice" },
  { level: 3, xp: 100, title: "Match Maker" },
  { level: 4, xp: 200, title: "Regex Warrior" },
  { level: 5, xp: 350, title: "Pattern Master" },
  { level: 6, xp: 550, title: "Regex Expert" },
  { level: 7, xp: 800, title: "Quantifier King" },
  { level: 8, xp: 1000, title: "Lookahead Legend" },
  { level: 9, xp: 1500, title: "Regex Champion" },
  { level: 10, xp: 2500, title: "Master of Patterns" },
  { level: 11, xp: 4000, title: "Regex Sage" },
  { level: 12, xp: 6000, title: "Pattern Virtuoso" },
  { level: 13, xp: 8500, title: "Regex Grandmaster" },
  { level: 14, xp: 12000, title: "Pattern Deity" },
  { level: 15, xp: 20000, title: "Regex Ascendant" },
] as const

// XP awards
export const XP_AWARDS = {
  LESSON_COMPLETE: 10,
  PRACTICE_SOLVED: 5,
  PERFECT_FIRST_ATTEMPT: 5,
  TIER_COMPLETE: 10,
  ALL_PRACTICE_TIER: 20,
  STREAK_BONUS_MULTIPLIER: 1.5,
} as const

// Streak settings
export const STREAK_SETTINGS = {
  FREEZES_PER_WEEK: 1,
  STREAK_MULTIPLIER_THRESHOLD: 3,
  STREAK_MULTIPLIER: 1.5,
} as const

// Regex validation settings
export const REGEX_SETTINGS = {
  DEBOUNCE_MS: 300,
  TIMEOUT_WARNING_MS: 100,
} as const

// Tier definitions
export const TIERS = [
  { id: "foundation", name: "Foundation", lessons: 5, order: 1 },
  { id: "quantification", name: "Quantification", lessons: 3, order: 2 },
  { id: "structure", name: "Structure", lessons: 4, order: 3 },
  { id: "advanced", name: "Advanced", lessons: 3, order: 4 },
] as const

// Animation settings
export const ANIMATION = {
  SPRING: { type: "spring", stiffness: 300, damping: 30 } as const,
  SPRING_BOUNCE: { type: "spring", stiffness: 400, damping: 25 } as const,
  EASE_OUT: { duration: 0.3, ease: "easeOut" } as const,
  EASE_IN_OUT: { duration: 0.2, ease: "easeInOut" } as const,
  STAGGER: { staggerChildren: 0.05 } as const,
  STAGGER_SLOW: { staggerChildren: 0.1 } as const,
} as const

// Routes
export const ROUTES = {
  HOME: "/",
  LEARN: "/learn",
  LESSONS: "/learn/lessons",
  LESSON: (id: string) => `/learn/lessons/${id}`,
  PRACTICE: "/practice",
  PROBLEMS: "/practice/problems",
  PROBLEM: (id: string) => `/practice/problems/${id}`,
  DASHBOARD: "/dashboard",
  PROGRESS: "/dashboard/progress",
  ACHIEVEMENTS: "/dashboard/achievements",
} as const

// Storage keys
export const STORAGE_KEYS = {
  USER_PROGRESS: "regezz_user_progress",
  USER_PROGRESS_PROGRESS: "regezz_user_progress_progress",
  USER_PREFERENCES: "regezz_user_preferences",
} as const
