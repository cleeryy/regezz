"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/constants"
import { BookOpen, Code, LayoutDashboard, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom className for the header
   */
  className?: string
  /**
   * Whether to show the mobile menu button
   * @default true
   */
  showMobileMenu?: boolean
}

/**
 * Header - Site navigation header with responsive mobile menu
 * 
 * Features:
 * - Responsive navigation with mobile hamburger menu
 * - Active link highlighting with motion underline
 * - Links to Learn, Practice, and Dashboard pages
 * - Clean, minimal design consistent with shadcn UI
 */
export function Header({
  className,
  showMobileMenu = true,
  ...props
}: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navLinks = [
    { href: ROUTES.LEARN, label: "Learn", icon: BookOpen },
    { href: ROUTES.PRACTICE, label: "Practice", icon: Code },
    { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  ]

  const isActive = (href: string) => {
    if (href === ROUTES.LEARN) return pathname === href || pathname.startsWith(ROUTES.LESSONS)
    if (href === ROUTES.PRACTICE) return pathname === href || pathname.startsWith(ROUTES.PROBLEMS)
    if (href === ROUTES.DASHBOARD) return pathname === href || pathname.startsWith(ROUTES.PROGRESS) || pathname.startsWith(ROUTES.ACHIEVEMENTS)
    return pathname === href
  }

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }) => (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-2 text-sm font-medium transition-colors",
        isActive(href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
      onClick={() => setMobileMenuOpen(false)}
    >
      <Icon className="size-4" />
      <span>{label}</span>
      {isActive(href) && (
        <motion.div
          layoutId="active-nav-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-lg">
          <Code className="size-6 text-primary" />
          <span>regezz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        {showMobileMenu && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        )}
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden border-t bg-background"
        >
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  )
}
