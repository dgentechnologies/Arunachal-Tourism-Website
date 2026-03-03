
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Mountain, Hotel, Car, ShieldAlert, FileText, Compass, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Guides", href: "/guides", icon: Compass },
  { name: "Hotels", href: "/hotels", icon: Hotel },
  { name: "Transport", href: "/transport", icon: Car },
  { name: "Permit", href: "/permit", icon: FileText },
  { name: "Itinerary", href: "/itinerary", icon: Mountain },
  { name: "Safety", href: "/safety", icon: ShieldAlert },
]

const SCROLL_THRESHOLD = 60

export function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === "/"

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
          <div className="ml-4 pl-4 border-l border-current/20">
            <Button
              size="sm"
              className={cn(
                "font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95",
                transparent && "bg-white/20 text-white hover:bg-white/35 border border-white/30"
              )}
            >
              Sign In
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
          <div className="pt-4 border-t">
            <Button className="w-full font-semibold">Sign In</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
