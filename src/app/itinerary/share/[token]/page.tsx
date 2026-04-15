"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Calendar, MapPin, Utensils, BedDouble, CheckCircle2,
  Zap, Loader2, Share2, Copy, Check, ArrowLeft,
  BookmarkPlus, BookmarkCheck, Clock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { getFirebaseDbCms, getFirebaseDbUsers } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import type { PremadeItinerary } from "@/lib/itinerary-data"

type SharedItinerary = {
  token: string
  ownerId: string
  ownerName: string | null
  plan: PremadeItinerary
  createdAt?: unknown
  updatedAt?: unknown
}

const difficultyColor = {
  Easy: "bg-emerald-500/90 text-white",
  Moderate: "bg-amber-500/90 text-white",
  Challenging: "bg-red-500/90 text-white",
}

const difficultyDot = {
  Easy: "bg-emerald-400",
  Moderate: "bg-amber-400",
  Challenging: "bg-red-400",
}

export default function SharedItineraryPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = use(params)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [data, setData] = useState<SharedItinerary | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const sharedRef = doc(getFirebaseDbCms(), "sharedItineraries", token)
    getDoc(sharedRef)
      .then((snap) => {
        if (!snap.exists()) {
          setNotFound(true)
        } else {
          setData(snap.data() as SharedItinerary)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [token])

  const handleSaveToMyTrips = async () => {
    if (!user) {
      router.push(`/login?redirect=/itinerary/share/${token}`)
      return
    }
    if (!data?.plan || isSaving || isSaved) return
    setIsSaving(true)
    try {
      const plan = data.plan
      // Use a unique trip ID derived from the original plan id + token suffix to avoid overwriting
      const tripId = `${plan.id ?? "shared"}-${token.slice(0, 8)}`
      const tripRef = doc(getFirebaseDbUsers(), "users", user.uid, "trips", tripId)
      await setDoc(tripRef, {
        ...plan,
        planId: plan.id ?? tripId,
        generatedByAI: true,
        sharedFrom: token,
        savedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      setIsSaved(true)
      toast({
        title: "Saved to My Trips!",
        description: `"${plan.title}" has been added to your account.`,
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save the itinerary. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
      toast({ title: "Link Copied!", description: "Share link copied to clipboard." })
    } catch {
      toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy the link." })
    }
  }

  const handleNativeShare = async () => {
    if (!data?.plan) return
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: data.plan.title,
          text: `Check out this Arunachal trip plan: ${data.plan.title}`,
          url: window.location.href,
        })
      } catch (err: unknown) {
        const name = (err as { name?: string })?.name
        if (name !== "AbortError") handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-2">
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold font-headline text-foreground">Plan Not Found</h1>
        <p className="text-muted-foreground max-w-sm">
          This shared itinerary link is invalid or has been removed by its owner.
        </p>
        <Button asChild className="mt-2 bg-primary hover:bg-primary/90">
          <Link href="/itinerary">Explore Plans</Link>
        </Button>
      </div>
    )
  }

  const plan = data.plan

  return (
    <div className="min-h-screen bg-background">

      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, rgba(64,224,208,0.6) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, rgba(0,106,98,0.5) 0%, transparent 70%)" }}
        />
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 h-14 border-b border-border/40 bg-background/95 backdrop-blur-sm gap-3">
        <Link
          href="/itinerary"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group shrink-0"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">All Plans</span>
        </Link>

        <div className="flex items-center gap-1.5 min-w-0">
          <Share2 className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-xs font-semibold text-foreground truncate max-w-[180px] md:max-w-xs">
            {plan.title}
          </span>
          <Badge className="hidden sm:inline-flex bg-primary/10 text-primary border-none text-[10px] ml-1">
            Shared Plan
          </Badge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs h-8 border-primary/30 hover:bg-primary/5"
            onClick={handleNativeShare}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-primary" />
            )}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-primary hover:bg-primary/90 h-8"
            onClick={handleSaveToMyTrips}
            disabled={isSaving || isSaved}
          >
            {isSaving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isSaved ? (
              <BookmarkCheck className="h-3.5 w-3.5" />
            ) : (
              <BookmarkPlus className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {isSaving ? "Saving…" : isSaved ? "Saved!" : "Save to My Trips"}
            </span>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-6">

        {/* Shared-by banner */}
        {data.ownerName && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-primary/5 border border-primary/15 rounded-2xl px-4 py-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              {data.ownerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Shared by</p>
              <p className="text-sm font-semibold text-foreground">{data.ownerName}</p>
            </div>
            <Badge className="ml-auto bg-[#40e0d0]/15 text-primary border-none text-[10px]">
              AI Customised
            </Badge>
          </motion.div>
        )}

        {/* Plan Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="organic-card overflow-hidden ghost-border shadow-float"
        >
          <div className="relative h-64 md:h-80">
            <Image
              src={plan.coverImage}
              alt={plan.title}
              fill
              className="object-cover"
              data-ai-hint="scenic landscape arunachal"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

            <div className="absolute top-5 left-6 flex flex-wrap gap-2">
              {plan.tags.map((tag) => (
                <Badge key={tag} className="bg-white/15 text-white text-xs border-none backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3",
                  difficultyColor[plan.difficulty]
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", difficultyDot[plan.difficulty])} />
                {plan.difficulty}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-headline leading-tight mb-1">
                {plan.title}
              </h1>
              <p className="text-white/75 text-sm">{plan.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-border/40 bg-card px-2">
            {[
              { label: "Duration", value: plan.duration },
              {
                label: "Difficulty",
                value: plan.difficulty,
                accent:
                  plan.difficulty === "Easy"
                    ? "text-emerald-600"
                    : plan.difficulty === "Moderate"
                    ? "text-amber-600"
                    : "text-red-600",
              },
              { label: "Best Time", value: plan.bestTime },
            ].map((s) => (
              <div key={s.label} className="text-center py-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{s.label}</p>
                <p className={cn("font-bold text-sm", s.accent ?? "text-primary")}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="px-6 pb-6 pt-4 bg-card">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{plan.summary}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Top Highlights</p>
            <div className="flex flex-wrap gap-2">
              {plan.highlights.map((h) => (
                <span
                  key={h}
                  className="flex items-center gap-1.5 text-xs bg-primary/8 text-foreground px-3 py-1.5 rounded-full font-medium"
                >
                  <Zap className="h-3 w-3 text-[#40e0d0]" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Day-by-Day Timeline */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-headline mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Day-by-Day Itinerary
          </h2>

          <div className="relative">
            <div className="absolute left-[1.35rem] top-5 bottom-5 w-px bg-gradient-to-b from-primary via-[#40e0d0] to-primary/20 hidden md:block" />
            <div className="space-y-4">
              <AnimatePresence>
                {plan.days.map((day, idx) => (
                  <motion.div
                    key={`${day.day}-${day.title}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.4 }}
                    className="relative md:pl-14"
                  >
                    <div className="absolute left-0 top-4 hidden md:flex items-center justify-center w-[2.7rem] h-[2.7rem] rounded-full bg-primary text-white text-xs font-bold font-headline shadow-md z-10 leading-none text-center">
                      <span>
                        <span className="block text-[8px] font-normal opacity-80">DAY</span>
                        {day.day}
                      </span>
                    </div>

                    <div className="bg-card ghost-border rounded-[1.5rem] overflow-hidden shadow-soft hover:shadow-float transition-shadow duration-300">
                      <div className="bg-gradient-to-r from-primary to-primary/85 px-5 py-3.5">
                        <Badge className="mb-1.5 bg-[#40e0d0]/25 text-white border-none text-[10px] md:hidden">
                          Day {day.day}
                        </Badge>
                        <h3 className="font-bold text-white font-headline text-sm leading-tight">{day.title}</h3>
                        <div className="flex items-center gap-1.5 text-white/70 text-xs mt-0.5">
                          <MapPin className="h-3 w-3" />
                          {day.location}
                        </div>
                      </div>

                      <div className="p-4 md:p-5 space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{day.description}</p>
                        <Separator className="opacity-50" />
                        <div>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                            Activities
                          </p>
                          <ul className="space-y-1.5">
                            {day.activities.map((a, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#40e0d0] shrink-0 mt-0.5" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-muted rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1.5">
                              <Utensils className="h-3 w-3" /> Meals
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{day.meals}</p>
                          </div>
                          <div className="bg-muted rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1.5">
                              <BedDouble className="h-3 w-3" /> Stay
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{day.accommodation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTA footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="organic-card ghost-border shadow-soft p-6 text-center space-y-4"
        >
          <p className="text-sm font-semibold text-foreground font-headline">
            Love this itinerary?
          </p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Save it to your account to customise it with AI, track your trip, and access it offline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              className="bg-primary hover:bg-primary/90 gap-2 w-full sm:w-auto"
              onClick={handleSaveToMyTrips}
              disabled={isSaving || isSaved}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSaved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <BookmarkPlus className="h-4 w-4" />
              )}
              {isSaving ? "Saving…" : isSaved ? "Saved to My Trips" : "Save to My Trips"}
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-primary/30 hover:bg-primary/5 w-full sm:w-auto"
              onClick={handleNativeShare}
            >
              <Share2 className="h-4 w-4 text-primary" />
              Share with Friends
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
