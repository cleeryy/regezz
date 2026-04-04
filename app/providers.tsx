"use client"

import { type ReactNode } from "react"
import { GamificationProvider } from "@/stores/GamificationContext"
import { ProgressProvider } from "@/stores/ProgressContext"
import type { Lesson } from "@/types/lesson"

export interface ProvidersProps {
  children: ReactNode
  lessons: Lesson[]
}

/**
 * Client-side providers wrapper
 * Combines all context providers for the application
 */
export function Providers({ children, lessons }: ProvidersProps) {
  return (
    <GamificationProvider>
      <ProgressProvider lessons={lessons}>
        {children}
      </ProgressProvider>
    </GamificationProvider>
  )
}
