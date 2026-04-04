"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Heart, Code } from "lucide-react"

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom className for the footer
   */
  className?: string
  /**
   * Show the "Made with love" attribution
   * @default true
   */
  showAttribution?: boolean
}

/**
 * Footer - Site footer with navigation links and attribution
 * 
 * Features:
 * - Clean, minimal design
 * - Links to key sections
 * - Responsive layout
 * - Optional attribution
 */
export function Footer({
  className,
  showAttribution = true,
  ...props
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: "Learn", href: "/learn" },
    { label: "Practice", href: "/practice" },
    { label: "Dashboard", href: "/dashboard" },
  ]

  return (
    <footer
      className={cn(
        "border-t bg-background",
        className
      )}
      {...props}
    >
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo and description */}
          <div className="flex items-center gap-2">
            <Code className="size-5 text-primary" />
            <span className="font-semibold">regezz</span>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Attribution */}
          {showAttribution && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="size-4 fill-red-500 text-red-500" />
              <span>for regex learners</span>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} regezz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
