
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Mountain, Hotel, Car, ShieldAlert, FileText, Compass, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Guides", href: "/guides", icon: Compass },
  { name: "Hotels", href: "/hotels", icon: Hotel },
  { name: "Transport", href: "/transport", icon: Car },
  { name: "Permit", href: "/permit", icon: FileText },
  { name: "Itinerary", href: "/itinerary", icon: Mountain },
  { name: "Safety", href: "/safety", icon: ShieldAlert },
]

export function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Mountain className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary font-headline">Arunachal Explore</span>
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
                  "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                  pathname === item.href ? "text-primary bg-secondary/50" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
          <div className="ml-4 pl-4 border-l">
            <Button size="sm" className="font-semibold">Sign In</Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary/50"
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
