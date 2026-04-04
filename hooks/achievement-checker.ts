"use client";

import { achievements } from "@/data/achievements";
import type { UserProgress } from "@/types/gamification";

// Lightweight, side-effect-free checker used by ProgressContext as a bridge
// to surface potential achievements based on a snapshot of progress.
export function checkAchievementsFromProgress(input: {
  completedLessons: string[]
  streak?: { current: number }
  level?: number
  unlocked?: string[]
}): string[] {
  const unchecked = new Set<string>(input.unlocked ?? [])
  const result: string[] = []

  // Only implement checks that can be inferred from the current data model
  // 1) first-step: completedLessons >= 1
  if (input.completedLessons.length >= 1 && !unchecked.has("first-step")) {
    result.push("first-step")
  }
  // 2) lesson-streak-3: streak >= 3
  if (input.streak?.current ?? 0) {
    // If streak is 3 or more and not already unlocked
    if ((input.streak?.current ?? 0) >= 3 && !unchecked.has("lesson-streak-3")) {
      result.push("lesson-streak-3")
    }
  }
  // 3) week-warrior: streak >= 7
  if ((input.streak?.current ?? 0) >= 7 && !unchecked.has("week-warrior")) {
    result.push("week-warrior")
  }

  // Debug output for tracing
  if (result.length > 0) {
    console.debug("achievement-checker: would unlock", result)
  } else {
    console.debug("achievement-checker: no relevant unlocks")
  }

  return result
}
