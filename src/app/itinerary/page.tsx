"use client"

export const maxDuration = 60;

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Calendar, MapPin, Utensils, BedDouble, CheckCircle2,
  Clock, Zap, Bot, Send, Loader2, User, Sparkles,
  Mountain, TreePine, Users, Waves, Globe, ArrowLeft,
  BookmarkPlus, BookmarkCheck, LogIn, ChevronRight, Star
} from "lucide-react"
import { motion } from "framer-motion"
import { premadeItineraries, type PremadeItinerary } from "@/lib/itinerary-data"
import { chatAboutItinerary } from "@/ai/flows/itinerary-chat-flow"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { collection, doc, setDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { getFirebaseDbUsers } from "@/lib/firebase"
import { cn } from "@/lib/utils"

/** Strip common Markdown formatting for plain-text chat display */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, '')
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const planIcons: Record<string, React.ElementType> = {
  'buddhist-circuit': Mountain,
  'wildlife-explorer': TreePine,
  'tribal-heritage': Users,
  'adventure-trek': Waves,
  'grand-explorer': Globe,
}

const planNumbers: Record<string, string> = {
  'buddhist-circuit': '01',
  'wildlife-explorer': '02',
  'tribal-heritage': '03',
  'adventure-trek': '04',
  'grand-explorer': '05',
}

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

export default function ItineraryPage() {
  const [selectedPlan, setSelectedPlan] = useState<PremadeItinerary | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedPlanIds, setSavedPlanIds] = useState<Set<string>>(new Set())
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  // Load already-saved plan IDs for the current user
  useEffect(() => {
    if (!user) { setSavedPlanIds(new Set()); return }
    const tripsRef = collection(getFirebaseDbUsers(), "users", user.uid, "trips")
    getDocs(tripsRef).then((snap) => {
      const ids = new Set(snap.docs.map((d) => d.data().planId as string).filter(Boolean))
      setSavedPlanIds(ids)
    }).catch(() => { /* silently ignore — not critical */ })
  }, [user])

  const handleSelectPlan = (plan: PremadeItinerary) => {
    setSelectedPlan(plan)
    setChatMessages([
      {
        role: 'assistant',
        content: `Hello! 👋 I'm your AI travel assistant for the **${plan.title}** (${plan.duration}).\n\nAsk me anything about this plan — I can help you customize it, suggest upgrades, explain what's included, or adjust it to fit your budget and interests!`,
      },
    ])
  }

  const handleSaveItinerary = async (plan: PremadeItinerary) => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }
    if (isSaving) return
    setIsSaving(true)
    try {
      const tripDocRef = doc(getFirebaseDbUsers(), "users", user.uid, "trips", plan.id)
      await setDoc(tripDocRef, {
        planId: plan.id,
        title: plan.title,
        circuit: plan.subtitle,
        durationDays: plan.durationDays,
        difficulty: plan.difficulty,
        summary: plan.summary,
        coverImage: plan.coverImage,
        tags: plan.tags,
        bestTime: plan.bestTime,
        highlights: plan.highlights,
        days: plan.days,
        generatedByAI: false,
        savedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      setSavedPlanIds((prev) => new Set([...prev, plan.id]))
      toast({
        title: "Itinerary Saved!",
        description: `"${plan.title}" has been saved to your account.`,
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save itinerary. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !selectedPlan || chatLoading) return
    const userMessage = chatInput.trim()
    setChatInput("")
    const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', content: userMessage }]
    setChatMessages(newMessages)
    setChatLoading(true)
    try {
      const res = await chatAboutItinerary({
        planTitle: selectedPlan.title,
        planSummary: selectedPlan.summary,
        userMessage,
        chatHistory: chatMessages.slice(-8),
      })
      setChatMessages([...newMessages, { role: 'assistant', content: res.reply }])
    } catch (error: unknown) {
      const isQuota = (error as { status?: number; code?: number; message?: string })?.status === 429 || (error as { status?: number; code?: number; message?: string })?.code === 429 || ((error as { message?: string })?.message || '').includes('quota')
      toast({
        variant: "destructive",
        title: isQuota ? "API Quota Exceeded" : "Chat Error",
        description: isQuota
          ? "You've reached the API quota limit. Please wait a moment and try again."
          : "Failed to get a response. Please try again.",
      })
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* Ambient background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, rgba(64,224,208,0.6) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, rgba(0,106,98,0.5) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], y: [0, 40, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookmarkPlus className="h-5 w-5 text-primary" />
              Sign in to Save Itinerary
            </DialogTitle>
            <DialogDescription>
              Create a free account or sign in to save itineraries, track your trips, and access them anytime from your dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowLoginPrompt(false)}>
              Maybe Later
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={() => {
                setShowLoginPrompt(false)
                router.push(`/login?redirect=/itinerary`)
              }}
            >
              <LogIn className="h-4 w-4" />
              Sign In / Sign Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!selectedPlan ? (
        <>
          {/* ── HERO ────────────────────────────────────────────────── */}
          <section className="px-3 md:px-8 pt-4 pb-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="relative w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden"
              style={{ height: "clamp(340px, 50vw, 620px)" }}
            >
              <motion.div className="absolute inset-0" whileHover={{ scale: 1.03 }} transition={{ duration: 0.8 }}>
                <Image
                  src="https://picsum.photos/seed/arunachal-mountain-valley-sunrise/1600/900"
                  alt="Panoramic view of Arunachal Pradesh's misty mountain valleys at sunrise"
                  fill
                  className="object-cover"
                  data-ai-hint="misty mountain valley sunrise arunachal himalaya"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[
                  { left: "7%", top: "30%", dur: 5, delay: 0 },
                  { left: "20%", top: "65%", dur: 4, delay: 0.8 },
                  { left: "65%", top: "18%", dur: 5.5, delay: 0.4 },
                  { left: "80%", top: "70%", dur: 3.8, delay: 1.2 },
                  { left: "92%", top: "40%", dur: 5.2, delay: 0.6 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                    style={{ left: p.left, top: p.top }}
                    animate={{ y: [0, -22, 0], opacity: [0.25, 0.6, 0.25] }}
                    transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
                  />
                ))}
              </div>

              <div className="absolute bottom-6 md:bottom-12 left-5 md:left-14 max-w-3xl pr-5 md:pr-0">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                  <span className="inline-flex items-center gap-2 bg-[hsl(46,97%,60%)]/90 backdrop-blur-sm text-[hsl(0,5%,11%)] font-black text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 px-4 py-2 rounded-full">
                    <Sparkles className="h-3 w-3" />
                    AI-Powered Trip Planning
                  </span>
                </motion.div>
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline text-white leading-[0.95] tracking-tighter mb-3 md:mb-5"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  Plan Your<br />
                  <span className="text-[#40e0d0]">Arunachal</span><br />
                  Journey
                </motion.h1>
                <motion.p
                  className="text-white/75 text-sm md:text-base max-w-md leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  5 expertly curated routes. Each one opens with an AI travel assistant that refines every detail to match your pace and interests.
                </motion.p>
              </div>

              {/* Stats overlay — bottom-right */}
              <motion.div
                className="absolute bottom-6 md:bottom-10 right-5 md:right-12 hidden sm:flex gap-5 md:gap-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {[
                  { val: "5", label: "Curated Plans" },
                  { val: "14+", label: "Day Options" },
                  { val: "AI", label: "Customization" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl md:text-3xl font-bold font-headline text-white">{s.val}</p>
                    <p className="text-white/60 text-xs uppercase tracking-widest mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* ── PLAN CARDS ─────────────────────────────────────────── */}
          <section className="px-3 md:px-8 py-10 md:py-16 max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end gap-4 justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/70 mb-2">Choose Your Route</p>
                <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground leading-tight tracking-tight">
                  5 Signature<br className="hidden md:block" /> Itineraries
                </h2>
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
                From sacred Himalayan monasteries to the last tiger reserves in the east — select a plan, then let AI shape it around your vision.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {premadeItineraries.map((plan, idx) => {
                const Icon = planIcons[plan.id] ?? Mountain
                const num = planNumbers[plan.id] ?? `0${idx + 1}`
                const isSaved = savedPlanIds.has(plan.id)
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.55 }}
                    className="group cursor-pointer organic-card ghost-border shimmer-hover bg-card shadow-soft hover:shadow-float transition-shadow duration-500"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {/* Image */}
                    <div className="relative h-56 md:h-64 overflow-hidden rounded-t-[3rem] rounded-br-[1.5rem]">
                      <Image
                        src={plan.coverImage}
                        alt={plan.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        data-ai-hint="scenic landscape arunachal"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Plan number */}
                      <div className="absolute top-4 left-5 text-white/25 font-headline font-black text-5xl leading-none select-none">
                        {num}
                      </div>

                      {/* Difficulty badge */}
                      <div className="absolute top-4 right-4">
                        <span className={cn("text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5", difficultyColor[plan.difficulty])}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", difficultyDot[plan.difficulty])} />
                          {plan.difficulty}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                        {plan.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} className="bg-white/15 text-white text-[10px] border-none backdrop-blur-sm px-2 py-0.5 font-medium">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-base leading-tight font-headline text-foreground group-hover:text-primary transition-colors">{plan.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{plan.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary/70" />{plan.duration}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-primary/70" />{plan.bestTime}</span>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{plan.summary}</p>

                      <div className="space-y-1 mb-5">
                        {plan.highlights.slice(0, 3).map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Zap className="h-3 w-3 text-[#40e0d0] shrink-0" />{h}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full font-semibold gap-1 bg-primary hover:bg-primary/90 group-hover:gap-2 transition-all text-sm h-9"
                          size="sm"
                        >
                          View Plan & Customize <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full gap-1.5 text-xs text-muted-foreground hover:text-primary h-8"
                          onClick={(e) => { e.stopPropagation(); handleSaveItinerary(plan) }}
                          disabled={isSaving && !isSaved}
                        >
                          {isSaved ? (
                            <><BookmarkCheck className="h-3.5 w-3.5 text-primary" /> Saved to Account</>
                          ) : (
                            <><BookmarkPlus className="h-3.5 w-3.5" /> Save Itinerary</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 md:mt-16 rounded-[1.5rem] md:rounded-[2rem] bg-primary overflow-hidden relative tribal-pattern"
            >
              <div className="px-6 md:px-14 py-10 md:py-12 flex flex-col md:flex-row items-center gap-6 justify-between relative z-10">
                <div>
                  <p className="text-[#40e0d0] text-xs font-bold uppercase tracking-widest mb-2">Powered by Gemini AI</p>
                  <h3 className="text-2xl md:text-3xl font-bold font-headline text-white leading-tight mb-2">
                    Want a fully custom plan?
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-md">
                    Select any plan above and our AI assistant will instantly customize it for your dates, budget, group size, and interests.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                        <Star className="h-3.5 w-3.5 text-[#fccc38]" />
                      </div>
                    ))}
                  </div>
                  <div className="text-white/80 text-xs">
                    <p className="font-bold text-white">4.9/5 Rating</p>
                    <p>1,200+ trips planned</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </>
      ) : (
        /* ── PLAN DETAIL + AI CHAT ─────────────────────────────────── */
        <div className="px-3 md:px-8 py-6 md:py-10 max-w-[1440px] mx-auto">

          {/* Back + Save row */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedPlan(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              All Itineraries
            </button>
            <Button
              variant={savedPlanIds.has(selectedPlan.id) ? "secondary" : "default"}
              size="sm"
              className="gap-2"
              onClick={() => handleSaveItinerary(selectedPlan)}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : savedPlanIds.has(selectedPlan.id) ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <BookmarkPlus className="h-4 w-4" />
              )}
              {savedPlanIds.has(selectedPlan.id) ? "Saved" : "Save Itinerary"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* LEFT: Plan Details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Cinematic plan header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="organic-card overflow-hidden ghost-border shadow-float"
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={selectedPlan.coverImage}
                    alt={selectedPlan.title}
                    fill
                    className="object-cover"
                    data-ai-hint="scenic landscape arunachal"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                  {/* Tags */}
                  <div className="absolute top-5 left-6 flex flex-wrap gap-2">
                    {selectedPlan.tags.map((tag) => (
                      <Badge key={tag} className="bg-white/15 text-white text-xs border-none backdrop-blur-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title block */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3", difficultyColor[selectedPlan.difficulty])}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", difficultyDot[selectedPlan.difficulty])} />
                      {selectedPlan.difficulty}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white font-headline leading-tight mb-1">{selectedPlan.title}</h2>
                    <p className="text-white/75 text-sm">{selectedPlan.subtitle}</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 divide-x divide-border/40 bg-card px-2">
                  {[
                    { label: "Duration", value: selectedPlan.duration },
                    { label: "Difficulty", value: selectedPlan.difficulty, accent: selectedPlan.difficulty === 'Easy' ? 'text-emerald-600' : selectedPlan.difficulty === 'Moderate' ? 'text-amber-600' : 'text-red-600' },
                    { label: "Best Time", value: selectedPlan.bestTime },
                  ].map((s) => (
                    <div key={s.label} className="text-center py-4">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{s.label}</p>
                      <p className={cn("font-bold text-sm", s.accent ?? "text-primary")}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Summary + highlights */}
                <div className="px-6 pb-6 pt-4 bg-card">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{selectedPlan.summary}</p>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Top Highlights</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlan.highlights.map((h) => (
                      <span key={h} className="flex items-center gap-1.5 text-xs bg-primary/8 text-foreground px-3 py-1.5 rounded-full font-medium">
                        <Zap className="h-3 w-3 text-[#40e0d0]" />{h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Day-by-Day Timeline */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground font-headline mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Day-by-Day Itinerary
                </h3>

                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-[1.35rem] top-5 bottom-5 w-px bg-gradient-to-b from-primary via-[#40e0d0] to-primary/20 hidden md:block" />

                  <div className="space-y-4">
                    {selectedPlan.days.map((day, idx) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * idx, duration: 0.45 }}
                        className="relative md:pl-14"
                      >
                        {/* Day bubble */}
                        <div className="absolute left-0 top-4 hidden md:flex items-center justify-center w-[2.7rem] h-[2.7rem] rounded-full bg-primary text-white text-xs font-bold font-headline shadow-md z-10 leading-none text-center">
                          <span><span className="block text-[8px] font-normal opacity-80">DAY</span>{day.day}</span>
                        </div>

                        <div className="bg-card ghost-border rounded-[1.5rem] overflow-hidden shadow-soft hover:shadow-float transition-shadow duration-300">
                          {/* Card header */}
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

                          {/* Card body */}
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
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: AI Chat */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="organic-card-alt overflow-hidden shadow-float ghost-border"
                >
                  {/* Chat header */}
                  <div className="bg-gradient-to-br from-primary via-primary to-primary/90 px-5 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 tribal-pattern opacity-20" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm font-headline">AI Travel Assistant</p>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#40e0d0] rounded-full animate-pulse" />
                            <p className="text-white/70 text-[10px]">Online · Gemini powered</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/60 text-xs mt-2 leading-relaxed">
                        Ask me to customize this plan — dates, budget, group size, or upgrades.
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="h-[360px] md:h-[440px] bg-card px-4 py-3">
                    <div className="space-y-3">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={cn("flex gap-2.5", msg.role === 'user' ? "justify-end" : "justify-start")}
                        >
                          {msg.role === 'assistant' && (
                            <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                              <Bot className="h-3.5 w-3.5 text-primary" />
                            </div>
                          )}
                          <div
                            className={cn(
                              "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed",
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
                        placeholder="Ask about this plan..."
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
                      {['Best upgrades?', 'Budget tips', 'What to pack?', 'Extend by 2 days'].map((q) => (
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
        </div>
      )}
    </div>
  )
}
