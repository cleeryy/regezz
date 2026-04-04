/**
 * Visualization types
 */

export type TokenType = 
  | "literal"
  | "character-class"
  | "quantifier"
  | "anchor"
  | "group"
  | "alternation"
  | "lookahead"
  | "lookbehind"
  | "backreference"
  | "escape"

export interface RegexToken {
  type: TokenType
  value: string
  start: number
  end: number
  children?: RegexToken[]
  quantifier?: string
  description?: string
}

export interface MatchInfo {
  fullMatch: string
  start: number
  end: number
  groups: CaptureGroup[]
}

export interface CaptureGroup {
  index: number
  name?: string
  value: string
  start: number
  end: number
}

export interface ParsedRegex {
  pattern: string
  flags: string
  tokens: RegexToken[]
  isValid: boolean
  error?: string
}
