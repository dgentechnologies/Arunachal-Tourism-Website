"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { collection, getDocs } from "firebase/firestore"
import { getFirebaseDbUsers } from "@/lib/firebase"
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
  ShieldCheck,
  Compass,
  CalendarDays,
  Mountain,
  Hotel,
  Bus,
  FileText,
  Zap,
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
  const [tripsCount, setTripsCount] = useState<number | null>(null)
  const [permitsCount, setPermitsCount] = useState<number | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const db = getFirebaseDbUsers()
    Promise.all([
      getDocs(collection(db, "users", user.uid, "trips")),
      getDocs(collection(db, "users", user.uid, "permits")),
    ]).then(([tripsSnap, permitsSnap]) => {
      setTripsCount(tripsSnap.size)
      setPermitsCount(permitsSnap.size)
    }).catch(() => {
      setTripsCount(0)
      setPermitsCount(0)
    })
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-low)]">
        {/* Hero skeleton */}
        <div className="relative h-72 bg-gradient-to-br from-[#003330] via-primary to-[#004d47] overflow-hidden">
          <div className="absolute inset-0 tribal-pattern opacity-[0.06]" />
        </div>
        <div className="container mx-auto max-w-2xl px-4 -mt-14 pb-16 space-y-5">
          <div className="flex flex-col items-center gap-4 mb-8">
            <Skeleton className="h-28 w-28 rounded-full" />
            <Skeleton className="h-7 w-44 rounded-full" />
            <Skeleton className="h-4 w-56 rounded-full" />
            <div className="flex gap-6 mt-2">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-16 rounded-2xl" />)}
            </div>
          </div>
          <Skeleton className="h-36 rounded-3xl" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => <Skeleton key={i} className="h-32 rounded-3xl" />)}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
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

  return (
    <div className="min-h-screen bg-[var(--surface-low)]">

      {/* ─────────────────────────────────────────────── */}
      {/* HERO                                           */}
      {/* ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#002a27] via-primary to-[#004d47] pb-32 pt-16">
        {/* Background texture */}
        <div className="absolute inset-0 tribal-pattern opacity-[0.08]" />

        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-accent/15 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-secondary/15 blur-[60px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/30 blur-[100px]" />

        {/* Sign-out */}
        <div className="absolute right-4 top-4 sm:right-6 sm:top-5 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            aria-label={t.signOut}
            className="gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-white/60 backdrop-blur-sm hover:bg-white/12 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 transition-all"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs font-medium">{t.signOut}</span>
          </Button>
        </div>

        {/* Profile */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center">
          {/* Avatar with multi-ring glow */}
          <div className="relative">
            {/* outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl scale-125" />
            <div className="relative rounded-full p-[3px] bg-gradient-to-br from-accent/60 via-white/20 to-secondary/40">
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 ring-2 ring-white/10">
                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-[#003330] text-white font-headline text-2xl sm:text-3xl">
                  {initials(user.displayName)}
                </AvatarFallback>
              </Avatar>
            </div>
            {/* online dot */}
            <span
              className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-[#002a27] shadow-[0_0_8px_rgba(52,211,153,0.6)]"
              aria-label="Online"
            />
          </div>

          {/* Name + badge */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {user.displayName || t.accountDefaultName}
              </h1>
              <Badge className="bg-gradient-to-r from-secondary to-[#f5b800] text-[#1a1200] gap-1 font-bold text-[11px] px-2.5 py-0.5 shadow-[0_2px_8px_rgba(252,204,56,0.4)]">
                <Sparkles className="h-3 w-3" />
                {t.accountExplorerBadge}
              </Badge>
            </div>
            <p className="text-sm text-white/55 font-medium">{user.email}</p>
            {memberSince && (
              <p className="text-xs text-white/35">
                {t.accountMemberSince} {memberSince}
              </p>
            )}
          </div>

          {/* Stats row */}
          <div className="mt-2 flex items-center gap-2 sm:gap-3">
            {[
              { val: tripsCount, label: t.accountStatTripsLabel },
              { val: permitsCount, label: t.accountStatPermitsLabel },
              { val: null, label: t.accountStatGuidesLabel },
            ].map(({ val, label }, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-0.5 rounded-2xl border border-white/10 bg-white/8 px-5 py-2.5 backdrop-blur-sm"
              >
                <span className="font-headline text-xl font-bold text-white leading-none">
                  {val === null ? "—" : tripsCount === null ? "…" : val}
                </span>
                <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────── */}
      {/* MAIN CONTENT                                   */}
      {/* ─────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-2xl px-4 -mt-14 pb-20 space-y-5">

        {/* ── Section: My Journeys ── */}
        <div>
          <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t.accountSectionJourneys}
          </p>

          {/* Featured: Saved Trips — full-width organic card */}
          <Link
            href="/account/trips"
            className="shimmer-hover group relative flex items-center gap-5 overflow-hidden rounded-[2rem_1.5rem_1.5rem_1.5rem] bg-gradient-to-br from-primary/8 via-[var(--surface-lowest)] to-accent/5 p-6 ring-1 ring-border/40 hover:shadow-float hover:-translate-y-0.5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary mb-3"
          >
            {/* decorative blob */}
            <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-primary/8 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-4 left-8 h-16 w-16 rounded-full bg-accent/12 blur-xl" />

            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-primary to-[#009688] shadow-[0_4px_16px_rgba(0,106,98,0.35)]">
              <BookmarkCheck className="h-6 w-6 text-white" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-headline text-base font-bold text-foreground leading-snug">
                {t.accountSavedTripsLabel}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground leading-snug">
                {t.accountSavedTripsDesc}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>

          {/* Half: Plan with AI + My Permits */}
          <div className="grid grid-cols-2 gap-3">
            {/* Plan with AI */}
            <Link
              href="/itinerary"
              className="shimmer-hover group relative flex flex-col gap-3 overflow-hidden rounded-[1.5rem_3rem_1.5rem_1.5rem] bg-gradient-to-br from-[#003330] to-primary p-5 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-accent/20 blur-2xl" />
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <p className="font-headline text-sm font-bold text-white leading-snug">
                  {t.accountPlanTripLabel}
                </p>
                <p className="mt-0.5 text-[11px] text-white/60 leading-snug line-clamp-2">
                  {t.accountPlanTripDesc}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all mt-auto self-end" />
            </Link>

            {/* My Permits */}
            <Link
              href="/essentials/check"
              className="shimmer-hover group relative flex flex-col gap-3 overflow-hidden rounded-[3rem_1.5rem_1.5rem_1.5rem] bg-gradient-to-br from-[#3d2a00] to-[#7a5200] p-5 hover:shadow-[0_8px_32px_rgba(252,204,56,0.2)] hover:-translate-y-0.5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <div className="pointer-events-none absolute -top-4 -left-4 h-20 w-20 rounded-full bg-secondary/20 blur-2xl" />
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-secondary">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="font-headline text-sm font-bold text-white leading-snug">
                  {t.accountPermitsLabel}
                </p>
                <p className="mt-0.5 text-[11px] text-white/60 leading-snug line-clamp-2">
                  {t.accountPermitsDesc}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-secondary group-hover:translate-x-0.5 transition-all mt-auto self-end" />
            </Link>
          </div>
        </div>

        {/* ── Section: Discover ── */}
        <div>
          <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t.accountSectionDiscover}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                href: "/adventures",
                icon: Mountain,
                label: t.accountQuickAdventures,
                desc: "Trekking, rafting & more",
                from: "from-emerald-50",
                to: "to-teal-50/80",
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-700",
                ring: "ring-emerald-100",
                hoverRing: "hover:ring-emerald-200",
              },
              {
                href: "/guides",
                icon: Compass,
                label: t.accountStatGuidesLabel,
                desc: "Culture & destination guides",
                from: "from-violet-50",
                to: "to-purple-50/80",
                iconBg: "bg-violet-100",
                iconColor: "text-violet-700",
                ring: "ring-violet-100",
                hoverRing: "hover:ring-violet-200",
              },
              {
                href: "/hotels",
                icon: Hotel,
                label: t.accountHotelsLabel,
                desc: t.accountHotelsDesc,
                from: "from-sky-50",
                to: "to-blue-50/80",
                iconBg: "bg-sky-100",
                iconColor: "text-sky-700",
                ring: "ring-sky-100",
                hoverRing: "hover:ring-sky-200",
              },
              {
                href: "/transport",
                icon: Bus,
                label: t.accountTransportLabel,
                desc: t.accountTransportDesc,
                from: "from-orange-50",
                to: "to-amber-50/80",
                iconBg: "bg-orange-100",
                iconColor: "text-orange-700",
                ring: "ring-orange-100",
                hoverRing: "hover:ring-orange-200",
              },
            ].map(({ href, icon: Icon, label, desc, from, to, iconBg, iconColor, ring, hoverRing }) => (
              <Link
                key={href}
                href={href}
                className={`shimmer-hover group flex flex-col gap-2.5 rounded-2xl bg-gradient-to-br ${from} ${to} p-4 ring-1 ${ring} ${hoverRing} hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-semibold text-sm text-foreground leading-snug">{label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">{desc}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-auto self-end" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Section: Quick Access ── */}
        <div>
          <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t.accountSectionQuickAccess}
          </p>
          <div className="overflow-hidden rounded-3xl bg-[var(--surface-lowest)] ring-1 ring-border/50">
            {[
              { href: "/essentials/check", icon: ShieldCheck, label: t.accountQuickIlpCheck, iconBg: "bg-primary/8", iconColor: "text-primary" },
              { href: "/safety", icon: MapPin, label: t.accountQuickSafety, iconBg: "bg-rose-50", iconColor: "text-rose-600" },
              { href: "/events", icon: CalendarDays, label: t.accountQuickEvents, iconBg: "bg-secondary/20", iconColor: "text-amber-700" },
              { href: "/account/profile", icon: UserCog, label: t.navProfilePrefsLabel, iconBg: "bg-muted", iconColor: "text-muted-foreground" },
            ].map(({ href, icon: Icon, label, iconBg, iconColor }, idx, arr) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3.5 px-5 py-4 hover:bg-muted/50 transition-colors ${idx < arr.length - 1 ? "border-b border-border/30" : ""}`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/35 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
