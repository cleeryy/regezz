/**
 * Achievement definitions for gamification
 */

import type { Achievement } from '@/types/gamification'

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    slug: 'first-step',
    name: 'First Step',
    description: 'Complete your first lesson',
    icon: '🎯',
    requirement: {
      type: 'lessons_complete',
      count: 1
    },
    xpReward: 50
  },
  {
    id: 'lesson-streak-3',
    slug: 'lesson-streak-3',
    name: 'Three Day Streak',
    description: 'Complete lessons on 3 consecutive days',
    icon: '🔥',
    requirement: {
      type: 'streak',
      count: 3
    },
    xpReward: 100
  },
  {
    id: 'foundation-master',
    slug: 'foundation-master',
    name: 'Foundation Master',
    description: 'Complete all 5 Foundation tier lessons',
    icon: '📚',
    requirement: {
      type: 'tier_complete',
      tier: 'foundation',
      count: 5
    },
    xpReward: 200
  },
  {
    id: 'perfect-score',
    slug: 'perfect-score',
    name: 'Perfect Score',
    description: 'Solve a practice problem on first attempt with all test cases passing',
    icon: '⭐',
    requirement: {
      type: 'perfect_score',
      count: 1
    },
    xpReward: 75
  },
  {
    id: 'problem-solver-10',
    slug: 'problem-solver-10',
    name: 'Problem Solver',
    description: 'Complete 10 practice problems',
    icon: '🧩',
    requirement: {
      type: 'practice_complete',
      count: 10
    },
    xpReward: 150
  },
  {
    id: 'quantification-expert',
    slug: 'quantification-expert',
    name: 'Quantification Expert',
    description: 'Complete all Quantification tier lessons',
    icon: '🔢',
    requirement: {
      type: 'tier_complete',
      tier: 'quantification',
      count: 5
    },
    xpReward: 250
  },
  {
    id: 'structure-architect',
    slug: 'structure-architect',
    name: 'Structure Architect',
    description: 'Complete all Structure tier lessons',
    icon: '🏗️',
    requirement: {
      type: 'tier_complete',
      tier: 'structure',
      count: 5
    },
    xpReward: 250
  },
  {
    id: 'regex-guru',
    slug: 'regex-guru',
    name: 'Regex Guru',
    description: 'Complete all 15 lessons',
    icon: '👑',
    requirement: {
      type: 'all_complete',
      count: 15
    },
    xpReward: 500
  },
  {
    id: 'group-master',
    slug: 'group-master',
    name: 'Group Master',
    description: 'Use capturing groups in 5 different problems',
    icon: '🔗',
    requirement: {
      type: 'groups_used',
      count: 5
    },
    xpReward: 125
  },
  {
    id: 'week-warrior',
    slug: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '📅',
    requirement: {
      type: 'streak',
      count: 7
    },
    xpReward: 200
  }
]
