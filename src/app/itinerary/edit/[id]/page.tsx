"use client"

export const maxDuration = 60;

import { useState, useRef, useEffect, use } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Calendar, MapPin, Utensils, BedDouble, CheckCircle2,
  Clock, Zap, Bot, Send, Loader2, User, Sparkles, Pencil,
  Mountain, ArrowLeft, BookmarkCheck, BookmarkPlus, ChevronRight,
  Share2, Copy, Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { chatAboutItinerary } from "@/ai/flows/itinerary-chat-flow"
import type { ItineraryPatch } from "@/ai/flows/itinerary-chat-flow"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import {
  doc, getDoc, setDoc, serverTimestamp,
} from "firebase/firestore"
import { getFirebaseDbUsers, getFirebaseDbCms } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import type { PremadeItinerary } from "@/lib/itinerary-data"

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, '')
}

type ChatMessage = { role: 'user' | 'assistant'; content: string; hasPatch?: boolean }

const difficultyColor = {
  Easy: 'bg-emerald-500/90 text-white',
  Moderate: 'bg-amber-500/90 text-white',
  Challenging: 'bg-red-500/90 text-white',
}

const difficultyDot = {
  Easy: 'bg-emerald-400',
  Moderate: 'bg-amber-400',
  Challenging: 'bg-red-400',
}

export default function ItineraryEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [plan, setPlan] = useState<PremadeItinerary | null>(null)
  const [loading, setLoading] = useState(true)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [sharedToken, setSharedToken] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)

  // Load plan from Firestore
  useEffect(() => {
    if (!user) {
      router.replace(`/login?redirect=/itinerary/edit/${id}`)
      return
    }
    const tripRef = doc(getFirebaseDbUsers(), "users", user.uid, "trips", id)
    getDoc(tripRef)
      .then((snap) => {
        if (!snap.exists()) {
          toast({ variant: "destructive", title: "Not found", description: "This itinerary does not exist." })
          router.replace("/account/trips")
          return
        }
        const data = snap.data() as PremadeItinerary & { savedAt?: unknown; updatedAt?: unknown; sharedToken?: string }
        setPlan(data)
        if (data.sharedToken) setSharedToken(data.sharedToken)
        setChatMessages([
          {
            role: 'assistant',
            content: `Hello! ✏️ I'm your editor for **${data.title}** (${data.duration}).\n\nTell me what you'd like to change — I'll update the plan on the left in real time. When you're happy, click **Save Changes**.`,
          },
        ])
      })
      .catch(() => {
        toast({ variant: "destructive", title: "Error", description: "Could not load itinerary." })
        router.replace("/account/trips")
      })
      .finally(() => setLoading(false))
  }, [user, id, router, toast])

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const applyPatch = (base: PremadeItinerary, patch: ItineraryPatch): PremadeItinerary => ({
    ...base,
    ...(patch.title        !== undefined && { title:        patch.title }),
    ...(patch.subtitle     !== undefined && { subtitle:     patch.subtitle }),
    ...(patch.summary      !== undefined && { summary:      patch.summary }),
    ...(patch.duration     !== undefined && { duration:     patch.duration }),
    ...(patch.durationDays !== undefined && { durationDays: patch.durationDays }),
    ...(patch.bestTime     !== undefined && { bestTime:     patch.bestTime }),
    ...(patch.difficulty   !== undefined && { difficulty:   patch.difficulty }),
    ...(patch.highlights   !== undefined && { highlights:   patch.highlights }),
    ...(patch.tags         !== undefined && { tags:         patch.tags }),
    ...(patch.days         !== undefined && { days:         patch.days }),
  })

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !plan || chatLoading) return
    const userMessage = chatInput.trim()
    setChatInput("")
    const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', content: userMessage }]
    setChatMessages(newMessages)
    setChatLoading(true)
    try {
      const res = await chatAboutItinerary({
        planTitle: plan.title,
        planSummary: plan.summary,
        planJson: JSON.stringify(plan),
        userMessage,
        chatHistory: chatMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
      })

      const hasPatch = !!res.itineraryPatch && Object.keys(res.itineraryPatch).length > 0

      if (hasPatch && res.itineraryPatch) {
        setPlan((prev) => prev ? applyPatch(prev, res.itineraryPatch!) : prev)
        setHasUnsavedChanges(true)
      }

      setChatMessages([
        ...newMessages,
        { role: 'assistant', content: res.reply, hasPatch },
      ])
    } catch (error: unknown) {
      const isQuota =
        (error as { status?: number })?.status === 429 ||
        ((error as { message?: string })?.message || '').includes('quota')
      toast({
        variant: "destructive",
        title: isQuota ? "API Quota Exceeded" : "Chat Error",
        description: isQuota
          ? "You've reached the API quota limit. Please wait and try again."
          : "Failed to get a response. Please try again.",
      })
    } finally {
      setChatLoading(false)
    }
  }

  const handleSaveChanges = async () => {
    if (!user || !plan || isSaving) return
    setIsSaving(true)
    try {
      const tripDocRef = doc(getFirebaseDbUsers(), "users", user.uid, "trips", id)
      await setDoc(tripDocRef, {
        ...plan,
        planId: plan.id ?? id,
        generatedByAI: true,
        updatedAt: serverTimestamp(),
        ...(sharedToken ? { sharedToken } : {}),
      }, { merge: true })
      // If plan is shared, refresh the shared snapshot in DB3
      if (sharedToken) {
        const sharedRef = doc(getFirebaseDbCms(), "sharedItineraries", sharedToken)
        await setDoc(sharedRef, {
          token: sharedToken,
          ownerId: user.uid,
          ownerName: user.displayName ?? null,
          plan,
          updatedAt: serverTimestamp(),
        }, { merge: true })
      }
      setHasUnsavedChanges(false)
      toast({ title: "Changes Saved!", description: "Your customised itinerary has been updated." })
    } catch {
      toast({ variant: "destructive", title: "Save Failed", description: "Could not save changes. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  const handleShare = async () => {
    if (!user || !plan || isSharing) return
    // Require saving before sharing
    if (hasUnsavedChanges) {
      toast({ title: "Save first", description: "Please save your changes before sharing." })
      return
    }
    setIsSharing(true)
    try {
      const token = sharedToken ?? crypto.randomUUID()
      const sharedRef = doc(getFirebaseDbCms(), "sharedItineraries", token)
      await setDoc(sharedRef, {
        token,
        ownerId: user.uid,
        ownerName: user.displayName ?? null,
        plan,
        createdAt: sharedToken ? undefined : serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true })
      if (!sharedToken) {
        const tripDocRef = doc(getFirebaseDbUsers(), "users", user.uid, "trips", id)
        await setDoc(tripDocRef, { sharedToken: token }, { merge: true })
        setSharedToken(token)
      }
      const shareUrl = `${window.location.origin}/itinerary/share/${token}`
      if (typeof navigator.share === "function") {
        await navigator.share({ title: plan.title, text: `Check out my Arunachal trip plan: ${plan.title}`, url: shareUrl })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2500)
        toast({ title: "Link Copied!", description: "Share link copied to clipboard." })
      }
    } catch (err: unknown) {
      const name = (err as { name?: string })?.name
      if (name !== "AbortError") {
        toast({ variant: "destructive", title: "Share Failed", description: "Could not generate share link. Please try again." })
      }
    } finally {
      setIsSharing(false)
    }
  }

  if (loading || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-border/40 bg-background/95 backdrop-blur-sm shrink-0 gap-3">
        <button
          onClick={() => router.push("/account/trips")}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group shrink-0"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">My Trips</span>
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          <Pencil className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-xs font-semibold text-foreground truncate max-w-[180px] md:max-w-xs">
            {plan.title}
          </span>
          {hasUnsavedChanges && (
            <span className="shrink-0 inline-flex items-center gap-1 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              Unsaved
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {hasUnsavedChanges && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs h-8"
              onClick={() => router.push("/account/trips")}
            >
              Discard
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs h-8 border-primary/30 hover:bg-primary/5 hover:border-primary/60"
            onClick={handleShare}
            disabled={isSharing || hasUnsavedChanges}
            title={hasUnsavedChanges ? "Save changes first to enable sharing" : "Share this itinerary"}
          >
            {isSharing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : shareCopied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Share2 className="h-3.5 w-3.5 text-primary" />
            )}
            <span className="hidden sm:inline">{shareCopied ? "Copied!" : sharedToken ? "Share" : "Share"}</span>
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-primary hover:bg-primary/90 h-8"
            onClick={handleSaveChanges}
            disabled={isSaving || !hasUnsavedChanges}
          >
            {isSaving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <BookmarkCheck className="h-3.5 w-3.5" />
            )}
            {isSaving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">

        {/* LEFT: Live Plan Detail */}
        <div className="lg:col-span-2 h-full overflow-y-auto overscroll-contain px-4 md:px-8 py-6 space-y-6">

          {/* Plan header card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={plan.title + plan.duration}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="organic-card overflow-hidden ghost-border shadow-float"
            >
              <div className="relative h-56 md:h-72">
                <Image
                  src={plan.coverImage}
                  alt={plan.title}
                  fill
                  className="object-cover"
                  data-ai-hint="scenic landscape arunachal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                <div className="absolute top-5 left-6 flex flex-wrap gap-2">
                  {plan.tags.map((tag) => (
                    <Badge key={tag} className="bg-white/15 text-white text-xs border-none backdrop-blur-sm">{tag}</Badge>
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3", difficultyColor[plan.difficulty])}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", difficultyDot[plan.difficulty])} />
                    {plan.difficulty}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-headline leading-tight mb-1">{plan.title}</h2>
                  <p className="text-white/75 text-sm">{plan.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border/40 bg-card px-2">
                {[
                  { label: "Duration", value: plan.duration },
                  { label: "Difficulty", value: plan.difficulty, accent: plan.difficulty === 'Easy' ? 'text-emerald-600' : plan.difficulty === 'Moderate' ? 'text-amber-600' : 'text-red-600' },
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
                    <span key={h} className="flex items-center gap-1.5 text-xs bg-primary/8 text-foreground px-3 py-1.5 rounded-full font-medium">
                      <Zap className="h-3 w-3 text-[#40e0d0]" />{h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Day-by-Day Timeline */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-headline mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Day-by-Day Itinerary
              {hasUnsavedChanges && (
                <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI Updated
                </span>
              )}
            </h3>

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
                        <span><span className="block text-[8px] font-normal opacity-80">DAY</span>{day.day}</span>
                      </div>

                      <div className="bg-card ghost-border rounded-[1.5rem] overflow-hidden shadow-soft hover:shadow-float transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-primary to-primary/85 px-5 py-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <Badge className="mb-1.5 bg-[#40e0d0]/25 text-white border-none text-[10px] md:hidden">Day {day.day}</Badge>
                              <h4 className="font-bold text-white font-headline text-sm leading-tight">{day.title}</h4>
                              <div className="flex items-center gap-1.5 text-white/70 text-xs mt-0.5">
                                <MapPin className="h-3 w-3" />{day.location}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">{day.description}</p>
                          <Separator className="opacity-50" />
                          <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Activities</p>
                            <ul className="space-y-1.5">
                              {day.activities.map((a, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-[#40e0d0] shrink-0 mt-0.5" />{a}
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
        </div>

        {/* RIGHT: AI Editor Chat */}
        <div className="lg:col-span-1 hidden lg:flex flex-col border-l border-border/40 bg-card">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col h-full overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 px-5 py-4 relative overflow-hidden">
              <div className="absolute inset-0 tribal-pattern opacity-20" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                    <Pencil className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm font-headline">AI Itinerary Editor</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#40e0d0] rounded-full animate-pulse" />
                      <p className="text-white/70 text-[10px]">Live editing · Gemini powered</p>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-2 leading-relaxed">
                  Tell me what to change — days, activities, accommodation, duration, anything.
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 bg-card px-4 py-3">
              <div className="space-y-3">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={cn("flex gap-2.5", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    {msg.role === 'assistant' && (
                      <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[82%]">
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed",
                          msg.role === 'user'
                            ? "bg-primary text-white rounded-tr-sm"
                            : "bg-muted text-foreground rounded-tl-sm"
                        )}
                      >
                        {msg.content.split('\n').map((line, j) => (
                          <span key={j}>
                            {stripMarkdown(line)}
                            {j < msg.content.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      {msg.hasPatch && (
                        <span className="text-[10px] text-emerald-600 flex items-center gap-1 pl-1">
                          <Sparkles className="h-3 w-3" /> Plan updated on the left
                        </span>
                      )}
                    </div>
                    {msg.role === 'user' && (
                      <div className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center mt-0.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: d }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-3 border-t border-border/50 bg-card">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Change day 3 to Ziro Valley…"
                  className="text-xs h-9 bg-muted border-none focus-visible:ring-primary/40"
                  disabled={chatLoading}
                />
                <Button
                  size="sm"
                  className="h-9 w-9 p-0 shrink-0 bg-primary hover:bg-primary/90"
                  onClick={handleSendMessage}
                  disabled={chatLoading || !chatInput.trim()}
                >
                  {chatLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {[
                  'Add 2 more days',
                  'Make it budget-friendly',
                  'Swap hotels to Luxury',
                  'Change difficulty to Easy',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setChatInput(q)}
                    className="text-[10px] bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-1 rounded-full transition-colors font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
