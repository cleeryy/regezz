"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import { useGamification, type UseGamificationReturn } from "@/hooks/useGamification"

const GamificationContext = createContext<UseGamificationReturn | null>(null)

export interface GamificationProviderProps {
  children: ReactNode
}

export function GamificationProvider({ children }: GamificationProviderProps) {
  const gamification = useGamification()

  useEffect(() => {
    gamification.updateStreak()
  }, [])

  return (
    <GamificationContext.Provider value={gamification}>
      {children}
    </GamificationContext.Provider>
  )
}

/**
 * Hook to access gamification context
 * Must be used within a GamificationProvider
 */
export function useGamificationContext(): UseGamificationReturn {
  const context = useContext(GamificationContext)
  if (!context) {
    throw new Error("useGamificationContext must be used within a GamificationProvider")
  }
  return context
}
