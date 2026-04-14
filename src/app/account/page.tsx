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
  UserCog,
  LogOut,
  MapPin,
  Sparkles,
  ChevronRight,
  Route,
  ShieldCheck,
  Compass,
  CalendarDays,
  Mountain,
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

function getMemberSince(user: { metadata?: { creationTime?: string } }) {
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
      <div className="min-h-screen bg-[var(--background)]">
        <div className="h-64 bg-gradient-to-br from-primary/30 via-primary/20 to-accent/10" />
        <div className="container mx-auto max-w-2xl px-4 -mt-20 pb-16 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-28 w-28 rounded-full ring-4 ring-background" />
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[1,2,3,4].map((i) => <Skeleton key={i} className="h-28 rounded-3xl" />)}
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  const memberSince = getMemberSince(user as { metadata?: { creationTime?: string } })

  async function handleSignOut() {
    try {
      await signOut()
      router.push("/")
    } catch {
      toast({ title: t.accountSignOutFailed, description: t.accountSignOutFailedDesc, variant: "destructive" })
    }
  }

  const actionCards = [
    {
      href: "/account/trips",
      icon: BookmarkCheck,
      label: t.accountSavedTripsLabel,
      desc: t.accountSavedTripsDesc,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      accent: "hover:ring-primary/20",
    },
    {
      href: "/itinerary",
      icon: Route,
      label: t.accountPlanTripLabel,
      desc: t.accountPlanTripDesc,
      iconBg: "bg-accent/20",
      iconColor: "text-teal-700",
      accent: "hover:ring-accent/30",
    },
    {
      href: "/account/profile",
      icon: UserCog,
      label: t.navProfilePrefsLabel,
      desc: t.navProfilePrefsDesc,
      iconBg: "bg-muted",
      iconColor: "text-muted-foreground",
      accent: "hover:ring-border",
    },
    {
      href: "/adventures",
      icon: Mountain,
      label: t.accountQuickAdventures,
      desc: "Trekking, rafting & more",
      iconBg: "bg-secondary/30",
      iconColor: "text-amber-700",
      accent: "hover:ring-secondary/40",
    },
  ]

  const quickLinks = [
    { href: "/essentials/check", icon: ShieldCheck, label: t.accountQuickIlpCheck },
    { href: "/safety", icon: MapPin, label: t.accountQuickSafety },
    { href: "/events", icon: CalendarDays, label: t.accountQuickEvents },
    { href: "/guides", icon: Compass, label: "Guides" },
  ]

  return (
    <div className="min-h-screen bg-[var(--surface-low)]">

      {/* ── Deep hero ── */}
      <div className="relative overflow-hidden bg-primary pb-28 pt-14">
        {/* layered glows */}
        <div className="absolute inset-0 tribal-pattern opacity-[0.07]" />
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-12 right-0 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />

        {/* sign-out top-right */}
        <div className="absolute right-4 top-4 sm:right-8 sm:top-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="gap-1.5 text-white/70 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">{t.signOut}</span>
          </Button>
        </div>

        {/* centered profile */}
        <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
          <div className="relative">
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 ring-4 ring-white/20 shadow-float">
              <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
              <AvatarFallback className="bg-white/20 text-white font-headline text-3xl backdrop-blur-sm">
                {initials(user.displayName)}
              </AvatarFallback>
            </Avatar>
            <span
              className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full bg-green-400 ring-2 ring-primary"
              aria-label="Online"
            />
          </div>

          <div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white">
                {user.displayName || t.accountDefaultName}
              </h1>
              <Badge className="bg-secondary/90 text-foreground gap-1 font-semibold text-xs">
                <Sparkles className="h-3 w-3" />
                {t.accountExplorerBadge}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-white/60">{user.email}</p>
            {memberSince && (
              <p className="mt-0.5 text-xs text-white/40">{t.accountMemberSince} {memberSince}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto max-w-2xl px-4 -mt-10 pb-16">

        {/* ── Action cards 2×2 grid ── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {actionCards.map(({ href, icon: Icon, label, desc, iconBg, iconColor, accent }) => (
            <Link
              key={href}
              href={href}
              className={`group flex flex-col gap-3 rounded-3xl bg-[var(--surface-lowest)] p-5 ring-1 ring-border/50 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary ${accent}`}
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-sm text-foreground leading-snug">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">{desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-auto self-end" />
            </Link>
          ))}
        </div>

        {/* ── Quick links strip ── */}
        <div className="rounded-3xl bg-[var(--surface-lowest)] ring-1 ring-border/50 overflow-hidden">
          <p className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {t.accountSectionQuickAccess}
          </p>
          {quickLinks.map(({ href, icon: Icon, label }, idx) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-3.5 hover:bg-muted/60 transition-colors group ${idx < quickLinks.length - 1 ? "border-b border-border/40" : ""}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
