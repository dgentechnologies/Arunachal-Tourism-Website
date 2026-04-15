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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Calendar, MapPin, Utensils, BedDouble, CheckCircle2,
  Zap, Bot, Send, Loader2, User, Sparkles,
  ArrowLeft, BookmarkPlus, BookmarkCheck, LogIn, X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { premadeItineraries, type PremadeItinerary } from "@/lib/itinerary-data"
import { chatAboutItinerary } from "@/ai/flows/itinerary-chat-flow"
import type { ItineraryPatch } from "@/ai/flows/itinerary-chat-flow"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { collection, doc, setDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { getFirebaseDbUsers } from "@/lib/firebase"
import { cn } from "@/lib/utils"

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

export default function ItineraryPlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const basePlan = premadeItineraries.find((p) => p.id === id) ?? null

  const [activePlan, setActivePlan] = useState<PremadeItinerary | null>(basePlan)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      role: 'assistant',
      content: basePlan
        ? `Hello! 👋 I'm your AI travel assistant for **${basePlan.title}** (${basePlan.duration}).\n\nAsk me anything — I can customize days, swap activities, adjust the budget or difficulty, and the plan on the left will update live!`
        : '',
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const chatBottomRef = useRef<HTMLDivElement>(null)
  const mobileChatBottomRef = useRef<HTMLDivElement>(null)

  // Redirect on unknown plan ID
  useEffect(() => {
    if (!basePlan) {
      toast({ variant: "destructive", title: "Not found", description: "That itinerary plan doesn't exist." })
      router.replace("/itinerary")
    }
  }, [basePlan, router, toast])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Scroll desktop chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
    if (isMobileChatOpen && mobileChatBottomRef.current) {
      mobileChatBottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages, isMobileChatOpen])

  // Check if already saved
  useEffect(() => {
    if (!user) { setIsSaved(false); return }
    const tripsRef = collection(getFirebaseDbUsers(), "users", user.uid, "trips")
    getDocs(tripsRef).then((snap) => {
      const saved = snap.docs.some((d) => d.data().planId === id)
      setIsSaved(saved)
    }).catch(() => { /* non-critical */ })
  }, [user, id])

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
    if (!chatInput.trim() || !activePlan || chatLoading) return
    const userMessage = chatInput.trim()
    setChatInput("")
    const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', content: userMessage }]
    setChatMessages(newMessages)
    setChatLoading(true)
    try {
      const res = await chatAboutItinerary({
        planTitle: activePlan.title,
        planSummary: activePlan.summary,
        planJson: JSON.stringify(activePlan),
        userMessage,
        chatHistory: chatMessages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      })

      const hasPatch = !!res.itineraryPatch && Object.keys(res.itineraryPatch).length > 0
      if (hasPatch && res.itineraryPatch) {
        setActivePlan((prev) => prev ? applyPatch(prev, res.itineraryPatch!) : prev)
        setHasUnsavedChanges(true)
        setIsSaved(false)
      }

      setChatMessages([...newMessages, { role: 'assistant', content: res.reply, hasPatch }])
      if (!isMobileChatOpen) setUnreadCount((prev) => prev + 1)
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

  const handleSave = async () => {
    if (!activePlan) return
    if (!user) { setShowLoginPrompt(true); return }
    if (isSaving) return
    setIsSaving(true)
    try {
      const tripDocRef = doc(getFirebaseDbUsers(), "users", user.uid, "trips", activePlan.id)
      await setDoc(tripDocRef, {
        ...activePlan,
        planId: activePlan.id,
        generatedByAI: hasUnsavedChanges,
        savedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true })
      setIsSaved(true)
      setHasUnsavedChanges(false)
      toast({ title: "Itinerary Saved!", description: `"${activePlan.title}" has been saved to your account.` })
    } catch {
      toast({ variant: "destructive", title: "Save Failed", description: "Could not save itinerary. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  if (!activePlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // ── Chat panel JSX (shared between desktop sidebar & mobile drawer) ──
  const ChatMessages = ({ bottomRef }: { bottomRef: React.RefObject<HTMLDivElement | null> }) => (
    <div className="space-y-3">
      {chatMessages.map((msg, i) => (
        <div key={i} className={cn("flex gap-2.5", msg.role === 'user' ? "justify-end" : "justify-start")}>
          {msg.role === 'assistant' && (
            <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
          )}
          <div className="flex flex-col gap-1 max-w-[82%]">
            <div className={cn(
              "rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed",
              msg.role === 'user'
                ? "bg-primary text-white rounded-tr-sm"
                : "bg-muted text-foreground rounded-tl-sm"
            )}>
              {msg.content.split('\n').map((line, j) => (
                <span key={j}>
                  {stripMarkdown(line)}
                  {j < msg.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
            {msg.hasPatch && (
              <span className="text-[10px] text-emerald-600 flex items-center gap-1 pl-1">
                <Sparkles className="h-3 w-3" /> Plan updated
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
      <div ref={bottomRef} />
    </div>
  )

  const ChatInput = () => (
    <div className="p-3 border-t border-border/50 bg-card shrink-0">
      <div className="flex gap-2">
        <Input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
          placeholder="Ask about this plan…"
          className="text-xs h-9 bg-muted border-none focus-visible:ring-primary/40"
          disabled={chatLoading}
        />
        <Button
          size="sm"
          className="h-9 w-9 p-0 shrink-0 bg-primary hover:bg-primary/90"
          onClick={handleSendMessage}
          disabled={chatLoading || !chatInput.trim()}
          aria-label="Send message"
        >
          {chatLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {['Best upgrades?', 'Budget tips', 'What to pack?', 'Extend by 2 days', 'Make it Easy'].map((q) => (
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
  )

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">

      {/* Login prompt */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookmarkPlus className="h-5 w-5 text-primary" />
              Sign in to Save Itinerary
            </DialogTitle>
            <DialogDescription>
              Create a free account or sign in to save itineraries and access them from your dashboard.
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
                router.push(`/login?redirect=/itinerary/${id}`)
              }}
            >
              <LogIn className="h-4 w-4" />
              Sign In / Sign Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-border/40 bg-background/95 backdrop-blur-sm shrink-0 gap-3">
        <button
          onClick={() => router.push("/itinerary")}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group shrink-0"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">All Itineraries</span>
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs font-semibold text-foreground truncate max-w-[160px] sm:max-w-xs">
            {activePlan.title}
          </span>
          {hasUnsavedChanges && (
            <span className="shrink-0 hidden sm:inline-flex items-center gap-1 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
              <Sparkles className="h-3 w-3" /> AI Modified
            </span>
          )}
        </div>

        <Button
          size="sm"
          variant={isSaved && !hasUnsavedChanges ? "secondary" : "default"}
          className="gap-2 h-8 shrink-0"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : isSaved && !hasUnsavedChanges ? (
            <BookmarkCheck className="h-3.5 w-3.5" />
          ) : (
            <BookmarkPlus className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">
            {isSaving ? "Saving…" : isSaved && !hasUnsavedChanges ? "Saved" : "Save Plan"}
          </span>
        </Button>
      </div>

      {/* ── Two-panel grid ── */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">

        {/* LEFT: Plan Detail */}
        <div className="lg:col-span-2 h-full overflow-y-auto overscroll-contain px-4 md:px-8 py-6 pb-24 lg:pb-6 space-y-6">

          {/* Header card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan.title + activePlan.duration}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="organic-card overflow-hidden ghost-border shadow-float"
            >
              <div className="relative h-56 md:h-72">
                <Image
                  src={activePlan.coverImage}
                  alt={`${activePlan.title} — scenic landscape`}
                  fill
                  className="object-cover"
                  data-ai-hint="scenic landscape arunachal"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {activePlan.tags.map((tag) => (
                      <Badge key={tag} className="bg-white/15 text-white text-[10px] border-none backdrop-blur-sm px-2 py-0.5 font-medium">{tag}</Badge>
                    ))}
                  </div>
                  <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3", difficultyColor[activePlan.difficulty])}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", difficultyDot[activePlan.difficulty])} />
                    {activePlan.difficulty}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-white font-headline leading-tight mb-1">{activePlan.title}</h1>
                  <p className="text-white/75 text-sm">{activePlan.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border/40 bg-card px-2">
                {[
                  { label: "Duration", value: activePlan.duration },
                  { label: "Difficulty", value: activePlan.difficulty, accent: activePlan.difficulty === 'Easy' ? 'text-emerald-600' : activePlan.difficulty === 'Moderate' ? 'text-amber-600' : 'text-red-600' },
                  { label: "Best Time", value: activePlan.bestTime },
                ].map((s) => (
                  <div key={s.label} className="text-center py-4">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{s.label}</p>
                    <p className={cn("font-bold text-sm", s.accent ?? "text-primary")}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6 pt-4 bg-card">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{activePlan.summary}</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Top Highlights</p>
                <div className="flex flex-wrap gap-2">
                  {activePlan.highlights.map((h) => (
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
            <h2 className="text-xl md:text-2xl font-bold text-foreground font-headline mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Day-by-Day Itinerary
              {hasUnsavedChanges && (
                <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI Updated
                </span>
              )}
            </h2>

            <div className="relative">
              <div className="absolute left-[1.35rem] top-5 bottom-5 w-px bg-gradient-to-b from-primary via-[#40e0d0] to-primary/20 hidden md:block" />
              <div className="space-y-4">
                <AnimatePresence>
                  {activePlan.days.map((day, idx) => (
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
                          <Badge className="mb-1.5 bg-[#40e0d0]/25 text-white border-none text-[10px] md:hidden">Day {day.day}</Badge>
                          <h3 className="font-bold text-white font-headline text-sm leading-tight">{day.title}</h3>
                          <div className="flex items-center gap-1.5 text-white/70 text-xs mt-0.5">
                            <MapPin className="h-3 w-3" />{day.location}
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

        {/* RIGHT: AI Chat — desktop only */}
        <div className="lg:col-span-1 hidden lg:flex flex-col border-l border-border/40 bg-card">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col h-full overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 px-5 py-4 relative overflow-hidden shrink-0">
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

            <ScrollArea className="flex-1 bg-card px-4 py-3">
              <ChatMessages bottomRef={chatBottomRef} />
            </ScrollArea>

            <ChatInput />
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: backdrop ── */}
      <AnimatePresence>
        {isMobileChatOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileChatOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile: bottom-sheet drawer ── */}
      <AnimatePresence>
        {isMobileChatOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[61] lg:hidden bg-card flex flex-col overflow-hidden"
            style={{ height: "82vh", borderRadius: "2rem 2rem 0 0" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="mx-3 mb-2 rounded-2xl overflow-hidden shrink-0">
              <div className="bg-gradient-to-br from-primary via-primary to-primary/90 px-4 py-3 relative overflow-hidden">
                <div className="absolute inset-0 tribal-pattern opacity-20" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
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
                  <button
                    onClick={() => setIsMobileChatOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                    aria-label="Close AI chat"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 min-h-0 px-4 py-2">
              <ChatMessages bottomRef={mobileChatBottomRef} />
            </ScrollArea>

            <ChatInput />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile: Floating AI Chat Button (only shown when drawer is closed) ── */}
      <AnimatePresence>
        {!isMobileChatOpen && (
          <motion.button
            className="fixed bottom-6 right-6 z-[62] lg:hidden w-14 h-14 rounded-full bg-primary shadow-float flex items-center justify-center"
            onClick={() => { setIsMobileChatOpen(true); setUnreadCount(0) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            aria-label="Open AI travel assistant"
          >
            <Bot className="h-6 w-6 text-white" />

            {/* Unread badge */}
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 bg-secondary text-[10px] font-bold rounded-full flex items-center justify-center text-foreground px-1 shadow"
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Pulse dot when AI has patched the plan */}
            {hasUnsavedChanges && unreadCount === 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#40e0d0] rounded-full animate-pulse shadow" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}
