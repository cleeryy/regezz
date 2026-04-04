/**
 * User types
 */

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  showHints: boolean
  animationsEnabled: boolean
}

export interface UserProfile {
  id: string
  createdAt: string
  lastActiveAt: string
  preferences: UserPreferences
}
