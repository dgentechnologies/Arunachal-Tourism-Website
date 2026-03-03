
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Mountain, Hotel, Car, ShieldAlert, FileText, Compass, Menu, X, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, LANGUAGES } from "@/lib/language-context"

const SCROLL_THRESHOLD = 60

export function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === "/"
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { name: t.guides, href: "/guides", icon: Compass },
    { name: t.hotels, href: "/hotels", icon: Hotel },
    { name: t.transport, href: "/transport", icon: Car },
    { name: t.permit, href: "/permit", icon: FileText },
    { name: t.itinerary, href: "/itinerary", icon: Mountain },
    { name: t.safety, href: "/safety", icon: ShieldAlert },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const transparent = isHome && !scrolled && !isOpen

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        transparent
          ? "border-transparent bg-transparent"
          : "border-b bg-background/90 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Mountain className={cn("h-8 w-8", transparent ? "text-white" : "text-primary")} />
          <span className={cn("text-xl font-bold tracking-tight font-headline", transparent ? "text-white" : "text-primary")}>Arunachal Explore</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:scale-105",
                  transparent
                    ? pathname === item.href
                      ? "text-white bg-white/20"
                      : "text-white/80 hover:text-white hover:bg-white/15"
                    : pathname === item.href
                      ? "text-primary bg-secondary/50"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
                )}
              >
                <Icon className="h-4 w-4 transition-transform duration-200" />
                <span>{item.name}</span>
              </Link>
            )
          })}
          <div className="ml-4 pl-4 border-l border-current/20 flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1 font-medium transition-all duration-200 hover:scale-105",
                    transparent
                      ? "text-white/80 hover:text-white hover:bg-white/15"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
                  )}
                >
                  <Globe className="h-4 w-4" />
                  <span>{LANGUAGES.find(l => l.code === language)?.nativeLabel}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "flex items-center justify-between gap-4 cursor-pointer",
                      language === lang.code && "font-semibold text-primary"
                    )}
                  >
                    <span>{lang.nativeLabel}</span>
                    <span className="text-xs text-muted-foreground">{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              className={cn(
                "font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95",
                transparent && "bg-white/20 text-white hover:bg-white/35 border border-white/30"
              )}
            >
              {t.signIn}
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className={cn(
            "md:hidden p-2 rounded-md transition-colors",
            transparent ? "text-white hover:bg-white/10" : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b bg-background px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-3 p-3 text-base font-medium rounded-lg transition-colors",
                  pathname === item.href ? "text-primary bg-secondary/50" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
          {/* Mobile Language Selector */}
          <div className="pt-2 border-t">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" /> Language
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    "flex flex-col items-start p-3 rounded-lg text-sm font-medium transition-colors",
                    language === lang.code
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span>{lang.nativeLabel}</span>
                  <span className="text-xs text-muted-foreground">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t">
            <Button className="w-full font-semibold">{t.signIn}</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
