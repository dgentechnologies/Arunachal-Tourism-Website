
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Hotel, Car, ShieldAlert, Compass, Menu, X,
  Globe, Mountain, Users, Lightbulb, ChevronDown,
  Flag, Plane, ChevronRight,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, LANGUAGES } from "@/lib/language-context"

const SCROLL_THRESHOLD = 60

// Indian citizens: Official e-ILP (Electronic Inner Line Permit) portal
const PERMIT_URL_INDIAN = "https://www.eilp.arunachal.gov.in/preTuristEIlpKYC"
// Foreign citizens: Dedicated internal page with PAP (Protected Area Permit) details
const PERMIT_URL_FOREIGN = "/permit/foreign"

interface NavSubItem {
  name: string
  href: string
  icon: React.ElementType
  description: string
  external?: boolean
}

interface NavGroup {
  label: string
  items: NavSubItem[]
}

export function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const isHome = pathname === "/"
  const { language, setLanguage, t } = useLanguage()

  const navGroups: NavGroup[] = [
    {
      label: t.navExplore,
      items: [
        { name: t.guides, href: "/guides", icon: Compass, description: t.navGuidesDesc },
        { name: t.tribes, href: "/tribes", icon: Users, description: t.navTribesDesc },
        { name: t.entrepreneurs, href: "/entrepreneurs", icon: Lightbulb, description: t.navEntrepreneursDesc },
      ],
    },
    {
      label: t.navPlan,
      items: [
        { name: t.itinerary, href: "/itinerary", icon: Mountain, description: t.navItineraryDesc },
        { name: t.hotels, href: "/hotels", icon: Hotel, description: t.navHotelsDesc },
        { name: t.transport, href: "/transport", icon: Car, description: t.navTransportDesc },
      ],
    },
    {
      label: t.navEssentials,
      items: [
        { name: t.navPermitIndianLabel, href: PERMIT_URL_INDIAN, icon: Flag, description: t.navPermitIndianDesc, external: true },
        { name: t.navPermitForeignLabel, href: PERMIT_URL_FOREIGN, icon: Plane, description: t.navPermitForeignDesc },
        { name: t.safety, href: "/safety", icon: ShieldAlert, description: t.navSafetyDesc },
      ],
    },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Close group dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const transparent = isHome && !scrolled && !isOpen

  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => !item.external && pathname === item.href)

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        transparent
          ? "border-transparent bg-transparent"
          : "border-b bg-background/90 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4" ref={navRef}>
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          {transparent ? (
            <Image src="/logos/logo-white.svg" alt="Arunachal Explore" width={160} height={42} priority />
          ) : (
            <Image src="/logos/logo.svg" alt="Arunachal Explore" width={160} height={42} priority />
          )}
        </Link>

        {/* Desktop Nav — grouped dropdowns */}
        <div className="hidden md:flex md:items-center md:gap-0.5">
          {navGroups.map((group) => {
            const isActive = isGroupActive(group)
            const isGroupOpen = openGroup === group.label
            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  onClick={() => setOpenGroup(isGroupOpen ? null : group.label)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105",
                    transparent
                      ? isActive
                        ? "text-white bg-white/20"
                        : "text-white/80 hover:text-white hover:bg-white/15"
                      : isActive
                        ? "text-primary bg-secondary/50"
                        : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
                  )}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isGroupOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown panel */}
                {isGroupOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 rounded-xl border bg-background shadow-xl py-2 z-50">
                    {group.items.map((item, idx) => {
                      const Icon = item.icon
                      const isItemActive = !item.external && pathname === item.href
                      const inner = (
                        <>
                          <span
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                              isItemActive ? "bg-primary/15 text-primary" : "bg-secondary/60 text-muted-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className={cn("text-sm font-semibold leading-tight", isItemActive ? "text-primary" : "text-foreground")}>
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{item.description}</p>
                          </div>
                        </>
                      )
                      return (
                        <div key={item.href}>
                          {idx > 0 && <div className="mx-3 border-t my-1" />}
                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpenGroup(null)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mx-1 hover:bg-secondary/50 transition-colors"
                            >
                              {inner}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setOpenGroup(null)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mx-1 hover:bg-secondary/50 transition-colors"
                            >
                              {inner}
                            </Link>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          <div className="ml-3 pl-3 border-l border-current/20 flex items-center gap-2">
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
        <div className="md:hidden border-b bg-background px-4 py-3 space-y-1">
          {navGroups.map((group) => {
            const isMobileGroupOpen = mobileOpenGroup === group.label
            return (
              <div key={group.label} className="rounded-xl border border-border/60 overflow-hidden">
                <button
                  onClick={() => setMobileOpenGroup(isMobileGroupOpen ? null : group.label)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-secondary/20 hover:bg-secondary/30 transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground">{group.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-200",
                      isMobileGroupOpen && "rotate-90"
                    )}
                  />
                </button>
                {isMobileGroupOpen && (
                  <div className="divide-y divide-border/40">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const isItemActive = !item.external && pathname === item.href
                      const inner = (
                        <>
                          <span
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                              isItemActive ? "bg-primary/15 text-primary" : "bg-secondary/50 text-muted-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className={cn("text-sm font-semibold", isItemActive ? "text-primary" : "text-foreground")}>
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </>
                      )
                      return item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                        >
                          {inner}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          {/* Mobile Language Selector */}
          <div className="pt-1 border-t">
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
          <div className="pt-1 border-t">
            <Button className="w-full font-semibold">{t.signIn}</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
