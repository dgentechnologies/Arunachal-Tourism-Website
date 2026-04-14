"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import {
  BookmarkCheck,
  FileCheck2,
  UserCog,
  LogOut,
  MapPin,
  Sparkles,
  ChevronRight,
  Route,
  ShieldCheck,
  Compass,
  CalendarDays,
} from "lucide-react"

function initials(name: string | null) {
  if (!name) return "?"
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function MemberSince(user: { metadata?: { creationTime?: string } }) {
  if (!user.metadata?.creationTime) return null
  const date = new Date(user.metadata.creationTime)
  return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-low)]">
        {/* Hero skeleton */}
        <div className="h-52 bg-gradient-to-br from-primary/20 to-accent/10" />
        <div className="container mx-auto max-w-3xl px-4 -mt-16 space-y-6 pb-16">
          <div className="flex items-end gap-5">
            <Skeleton className="h-24 w-24 rounded-full ring-4 ring-background shrink-0" />
            <div className="mb-2 space-y-2 flex-1">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  const memberSince = MemberSince(user as { metadata?: { creationTime?: string } })

  async function handleSignOut() {
    try {
      await signOut()
      router.push("/")
    } catch {
      toast({ title: t("accountSignOutFailed"), description: t("accountSignOutFailedDesc"), variant: "destructive" })
    }
  }

  const navCards = [
    {
      href: "/account/trips",
      icon: BookmarkCheck,
      label: t("accountSavedTripsLabel"),
      desc: t("accountSavedTripsDesc"),
      color: "bg-primary/10 text-primary",
      accent: "from-primary/5 to-transparent",
    },
    {
      href: "/account/permits",
      icon: FileCheck2,
      label: t("accountPermitTrackerLabel"),
      desc: t("accountPermitTrackerDesc"),
      color: "bg-secondary/30 text-amber-700",
      accent: "from-secondary/10 to-transparent",
    },
    {
      href: "/itinerary",
      icon: Route,
      label: t("accountPlanTripLabel"),
      desc: t("accountPlanTripDesc"),
      color: "bg-accent/20 text-teal-700",
      accent: "from-accent/10 to-transparent",
    },
  ]

  const quickLinks = [
    { href: "/essentials/check", icon: ShieldCheck, label: t("accountQuickIlpCheck") },
    { href: "/safety", icon: MapPin, label: t("accountQuickSafety") },
    { href: "/adventures", icon: Compass, label: t("accountQuickAdventures") },
    { href: "/events", icon: CalendarDays, label: t("accountQuickEvents") },
  ]

  return (
    <div className="min-h-screen bg-[var(--surface-low)]">
      {/* ── Hero Banner ── */}
      <div className="relative h-44 sm:h-52 overflow-hidden cta-gradient">
        {/* Tribal pattern overlay */}
        <div className="absolute inset-0 tribal-pattern opacity-10" />
        {/* Soft light orb */}
        <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-8 left-1/3 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
      </div>

      <div className="container mx-auto max-w-3xl px-4 pb-20">
        {/* ── Profile strip ── */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 mb-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-24 w-24 text-2xl ring-4 ring-background shadow-float">
              <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
              <AvatarFallback className="bg-primary text-primary-foreground font-headline text-2xl">
                {initials(user.displayName)}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-background" aria-label="Online" />
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-headline text-2xl sm:text-3xl font-bold text-foreground truncate">
                {user.displayName || t("accountDefaultName")}
              </h1>
              <Badge className="bg-secondary text-foreground gap-1 shrink-0 font-medium">
                <Sparkles className="h-3 w-3" />
                {t("accountExplorerBadge")}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate mt-0.5">{user.email}</p>
            {memberSince && (
              <p className="text-xs text-muted-foreground mt-1">
                {t("accountMemberSince")} {memberSince}
              </p>
            )}
          </div>

          {/* Sign out — top-right on desktop */}
          <div className="sm:pb-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive focus-visible:ring-2 focus-visible:ring-destructive/50"
            >
              <LogOut className="h-4 w-4" />
              {t("signOut")}
            </Button>
          </div>
        </div>

        {/* ── Main nav cards ── */}
        <section className="space-y-3 mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1">
            {t("accountSectionManage")}
          </h2>
          <div className="space-y-3">
            {navCards.map(({ href, icon: Icon, label, desc, color, accent }) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-r ${accent} bg-background border border-border/60 p-5 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary ghost-border`}
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">{desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
            <Link
              href="/account/profile"
              className="group flex items-center gap-4 rounded-2xl bg-background border border-border/60 p-5 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary ghost-border"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <UserCog className="h-6 w-6" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{t("navProfilePrefsLabel")}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{t("navProfilePrefsDesc")}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          </div>
        </section>

        {/* ── Quick access ── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-3">
            {t("accountSectionQuickAccess")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-2 rounded-2xl bg-background border border-border/60 py-4 px-3 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 text-center focus-visible:ring-2 focus-visible:ring-primary ghost-border"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium text-foreground leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
