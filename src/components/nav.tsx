
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Hotel, Car, ShieldAlert, Compass, Menu, X,
  Globe, Mountain, Users, Lightbulb, ChevronDown,
  Flag, Plane, ChevronRight, Leaf, Calendar, Landmark,
  TreePine, Waves, Fish, Wind, Sparkles,
  Map, ScanSearch, BookOpen, Info, Video,
  Mail, Bookmark, Clock, UserCircle,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, LANGUAGES } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"

const SCROLL_THRESHOLD = 60

// Indian citizens: Official e-ILP (Electronic Inner Line Permit) portal
const PERMIT_URL_INDIAN = "https://www.eilp.arunachal.gov.in/preTuristEIlpKYC"

function badgeColorClass(badge: string, disabled?: boolean): string {
  if (disabled) return "bg-muted text-muted-foreground/60"
  if (badge === "External") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
  if (badge === "Sign In") return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
  return "bg-primary/10 text-primary"
}

interface NavSubItem {
  name: string
  href: string
  icon: React.ElementType
  description: string
  external?: boolean
  badge?: string
  disabled?: boolean
}

interface NavGroup {
  label: string
  href?: string
  columns?: 1 | 2 | 3
  items: NavSubItem[]
}

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null)
  const { user, signOut } = useAuth()
  const isSignedIn = !!user
  const navRef = useRef<HTMLDivElement>(null)
  const isHome = pathname === "/"
  const { language, setLanguage, t } = useLanguage()

  async function handleSignOut() {
    await signOut()
    router.push("/")
    setIsOpen(false)
  }

  const navGroups: NavGroup[] = [
    {
      label: t.navExplore,
      columns: 3,
      items: [
        { name: t.guides, href: "/guides", icon: Compass, description: t.navGuidesDesc },
        { name: t.tribes, href: "/tribes", icon: Users, description: t.navTribesDesc },
        { name: t.entrepreneurs, href: "/entrepreneurs", icon: Lightbulb, description: t.navEntrepreneursDesc },
        { name: t.navWildlifeLabel, href: "/wildlife", icon: Leaf, description: t.navWildlifeDesc, badge: "New" },
        { name: t.navEventsLabel, href: "/events", icon: Calendar, description: t.navEventsDesc, badge: "New" },
        { name: t.navHeritageLabel, href: "/heritage", icon: Landmark, description: t.navHeritageDesc, badge: "New" },
      ],
    },
    {
      label: t.navAdventures,
      href: "/adventures",
      items: [
        { name: t.navTrekkingLabel, href: "/adventures/trekking", icon: TreePine, description: t.navTrekkingDesc },
        { name: t.navRaftingLabel, href: "/adventures/rafting", icon: Waves, description: t.navRaftingDesc },
        { name: t.navAnglingLabel, href: "/adventures/angling", icon: Fish, description: t.navAnglingDesc },
        { name: t.navParaglidingLabel, href: "/adventures/paragliding", icon: Wind, description: t.navParaglidingDesc },
      ],
    },
    {
      label: t.navPlan,
      items: [
        { name: t.itinerary, href: "/itinerary", icon: Mountain, description: t.navItineraryDesc },
        { name: t.hotels, href: "/hotels", icon: Hotel, description: t.navHotelsDesc },
        { name: t.transport, href: "/transport", icon: Car, description: t.navTransportDesc },
        { name: t.navDistrictMapLabel, href: "/map", icon: Map, description: t.navDistrictMapDesc, badge: "New" },
      ],
    },
    {
      label: t.navEssentials,
      href: "/essentials",
      items: [
        { name: t.navSmartIlpCheckLabel, href: "/essentials/check", icon: ScanSearch, description: t.navSmartIlpCheckDesc, badge: "AI" },
        { name: t.navPermitIndianLabel, href: PERMIT_URL_INDIAN, icon: Flag, description: t.navPermitIndianDesc, external: true, badge: "External" },
        { name: t.navPermitForeignLabel, href: "/essentials/foreign", icon: Plane, description: t.navPermitForeignDesc },
        { name: t.safety, href: "/safety", icon: ShieldAlert, description: t.navSafetyDesc },
      ],
    },
    {
      label: t.navResources,
      items: [
        { name: t.navEguidesLabel, href: "/guides/ebooks", icon: BookOpen, description: t.navEguidesDesc },
        { name: t.navFactsLabel, href: "/about", icon: Info, description: t.navFactsDesc },
        { name: t.navVideoGalleryLabel, href: "/media", icon: Video, description: t.navVideoGalleryDesc, badge: "New" },
        { name: t.navNewsletterLabel, href: "/newsletter", icon: Mail, description: t.navNewsletterDesc },
      ],
    },
    {
      label: t.navAccount,
      items: [
        { name: t.navSavedTripsLabel, href: "/account/trips", icon: Bookmark, description: t.navSavedTripsDesc, disabled: !isSignedIn, badge: isSignedIn ? undefined : "Sign In" },
        { name: t.navPermitTrackerLabel, href: "/account/permits", icon: Clock, description: t.navPermitTrackerDesc, disabled: !isSignedIn, badge: isSignedIn ? undefined : "Sign In" },
        { name: t.navProfilePrefsLabel, href: "/account", icon: UserCircle, description: t.navProfilePrefsDesc, disabled: !isSignedIn, badge: isSignedIn ? undefined : "Sign In" },
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
    group.items.some((item) => !item.external && !item.disabled && pathname === item.href)

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        transparent
          ? "border-transparent bg-transparent"
          : "border-transparent bg-[#fcf9f8]/70 backdrop-blur-[24px] shadow-ambient"
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
                  onClick={() => {
                    if (group.href) {
                      router.push(group.href)
                      setOpenGroup(null)
                    } else {
                      setOpenGroup(isGroupOpen ? null : group.label)
                    }
                  }}
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
                  <div className={cn(
                    "absolute top-full left-0 mt-1 rounded-2xl bg-[#fcf9f8]/95 backdrop-blur-[24px] shadow-float border border-border/40 p-3 z-50",
                    group.columns === 3 ? "min-w-[540px]" : "min-w-[320px]"
                  )}>
                    <div className={cn(
                      "grid gap-1",
                      group.columns === 3 ? "grid-cols-3" :
                      group.columns === 1 || group.items.length <= 2 ? "grid-cols-1" : "grid-cols-2"
                    )}>
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const isItemActive = !item.external && !item.disabled && pathname === item.href
                      const is3Col = group.columns === 3

                      const inner = is3Col ? (
                        /* 3-column compact: icon top, name + badge, description */
                        <div className="flex flex-col items-center text-center gap-2 w-full">
                          <span
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl",
                              item.disabled
                                ? "bg-muted text-muted-foreground/50"
                                : isItemActive
                                  ? "bg-primary/15 text-primary"
                                  : "bg-secondary/70 text-muted-foreground"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 w-full">
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                              <p className={cn(
                                "text-xs font-bold leading-tight",
                                item.disabled ? "text-muted-foreground/60" : isItemActive ? "text-primary" : "text-foreground"
                              )}>
                                {item.name}
                              </p>
                              {item.badge && (
                                <span className={cn(
                                  "inline-flex items-center rounded px-1 py-0 text-[10px] font-semibold leading-4",
                                  badgeColorClass(item.badge, item.disabled)
                                )}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className={cn(
                              "text-[11px] mt-0.5 leading-tight",
                              item.disabled ? "text-muted-foreground/40" : "text-muted-foreground"
                            )}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* Default: icon left, text right */
                        <>
                          <span
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                              item.disabled
                                ? "bg-muted text-muted-foreground/50"
                                : isItemActive
                                  ? "bg-primary/15 text-primary"
                                  : "bg-secondary/60 text-muted-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className={cn(
                                "text-sm font-semibold leading-tight",
                                item.disabled ? "text-muted-foreground/60" : isItemActive ? "text-primary" : "text-foreground"
                              )}>
                                {item.name}
                              </p>
                              {item.badge && (
                                <span className={cn(
                                  "inline-flex items-center rounded px-1 py-0 text-[10px] font-semibold leading-4",
                                  badgeColorClass(item.badge, item.disabled)
                                )}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className={cn(
                              "text-xs mt-0.5 leading-tight",
                              item.disabled ? "text-muted-foreground/40" : "text-muted-foreground"
                            )}>
                              {item.description}
                            </p>
                          </div>
                        </>
                      )

                      const itemClass = is3Col
                        ? "flex flex-col items-center p-3 rounded-xl hover:bg-secondary/50 transition-colors text-center"
                        : "flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors"
                      const disabledClass = is3Col
                        ? "flex flex-col items-center p-3 rounded-xl cursor-not-allowed opacity-60 text-center"
                        : "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-not-allowed opacity-60"

                      return (
                        <div key={item.href}>
                          {item.disabled ? (
                            <div className={disabledClass}>
                              {inner}
                            </div>
                          ) : item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpenGroup(null)}
                              className={itemClass}
                            >
                              {inner}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setOpenGroup(null)}
                              className={itemClass}
                            >
                              {inner}
                            </Link>
                          )}
                        </div>
                      )
                    })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Journey AI — standalone premium button */}
          <Link
            href="/plan/ai"
            className="mx-1 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200 active:scale-95 shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.navAiTripBuilderLabel}</span>
          </Link>

          <div className="ml-2 pl-3 border-l border-current/20 flex items-center gap-2">
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

            {isSignedIn ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className={cn(
                  "flex items-center gap-1.5 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95",
                  transparent && "text-white hover:bg-white/20 border border-white/30"
                )}
              >
                <UserCircle className="h-4 w-4" />
                {t.myAccount}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => router.push("/login")}
                className={cn(
                  "font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95",
                  transparent && "bg-white/20 text-white hover:bg-white/35 border border-white/30"
                )}
              >
                {t.signIn}
              </Button>
            )}
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
                  onClick={() => {
                    if (group.href) {
                      router.push(group.href)
                      setIsOpen(false)
                      setMobileOpenGroup(null)
                    } else {
                      setMobileOpenGroup(isMobileGroupOpen ? null : group.label)
                    }
                  }}
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
                      const isItemActive = !item.external && !item.disabled && pathname === item.href
                      const inner = (
                        <>
                          <span
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                              item.disabled
                                ? "bg-muted text-muted-foreground/50"
                                : isItemActive
                                  ? "bg-primary/15 text-primary"
                                  : "bg-secondary/50 text-muted-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className={cn(
                                "text-sm font-semibold",
                                item.disabled ? "text-muted-foreground/60" : isItemActive ? "text-primary" : "text-foreground"
                              )}>
                                {item.name}
                              </p>
                              {item.badge && (
                                <span className={cn(
                                  "inline-flex items-center rounded px-1 py-0 text-[10px] font-semibold leading-4",
                                  badgeColorClass(item.badge, item.disabled)
                                )}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className={cn(
                              "text-xs",
                              item.disabled ? "text-muted-foreground/40" : "text-muted-foreground"
                            )}>
                              {item.description}
                            </p>
                          </div>
                        </>
                      )
                      if (item.disabled) {
                        return (
                          <div
                            key={item.href}
                            className="flex items-center gap-3 px-4 py-3 cursor-not-allowed opacity-60"
                          >
                            {inner}
                          </div>
                        )
                      }
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

          {/* Mobile Journey AI button */}
          <Link
            href="/plan/ai"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 transition-all duration-200 active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            {t.navAiTripBuilderLabel}
          </Link>

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
            {isSignedIn ? (
              <Button variant="outline" className="w-full font-semibold flex items-center gap-2" onClick={handleSignOut}>
                <UserCircle className="h-4 w-4" />
                {t.signOut}
              </Button>
            ) : (
              <Button className="w-full font-semibold" onClick={() => { router.push("/login"); setIsOpen(false) }}>{t.signIn}</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
