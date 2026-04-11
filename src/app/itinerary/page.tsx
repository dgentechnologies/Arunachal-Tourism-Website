"use client"

export const maxDuration = 60;

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Calendar, MapPin, Utensils, BedDouble, CheckCircle2,
  ChevronRight, Clock, Zap, Bot, Send, Loader2, User,
  Mountain, TreePine, Users, Waves, Globe, ArrowLeft
} from "lucide-react"
import { premadeItineraries, type PremadeItinerary } from "@/lib/itinerary-data"
import { chatAboutItinerary } from "@/ai/flows/itinerary-chat-flow"
import { useToast } from "@/hooks/use-toast"

/** Strip common Markdown formatting for plain-text chat display */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')   // bold **text**
    .replace(/\*(.*?)\*/g, '$1')        // italic *text*
    .replace(/`(.*?)`/g, '$1')          // inline code `text`
    .replace(/^#{1,6}\s+/gm, '')        // headings # text
    .replace(/^\s*[-*+]\s+/gm, '• ')   // unordered lists
    .replace(/^\s*\d+\.\s+/gm, '')      // ordered lists
}
import { cn } from "@/lib/utils"

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const planIcons: Record<string, React.ElementType> = {
  'buddhist-circuit': Mountain,
  'wildlife-explorer': TreePine,
  'tribal-heritage': Users,
  'adventure-trek': Waves,
  'grand-explorer': Globe,
}

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-yellow-100 text-yellow-700',
  Challenging: 'bg-red-100 text-red-700',
}

export default function ItineraryPage() {
  const [selectedPlan, setSelectedPlan] = useState<PremadeItinerary | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  const handleSelectPlan = (plan: PremadeItinerary) => {
    setSelectedPlan(plan)
    setChatMessages([
      {
        role: 'assistant',
        content: `Hello! 👋 I'm your AI travel assistant for the **${plan.title}** (${plan.duration}).\n\nAsk me anything about this plan — I can help you customize it, suggest upgrades, explain what's included, or adjust it to fit your budget and interests!`,
      },
    ])
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline flex items-center justify-center gap-3">
            <Calendar className="text-accent h-9 w-9" />
            Arunachal Itineraries
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from 5 expertly crafted trip plans and customize them with our AI travel assistant.
          </p>
        </div>

        {!selectedPlan ? (
          /* Plan Selection Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premadeItineraries.map((plan) => {
              const Icon = planIcons[plan.id] ?? Mountain
              return (
                <Card
                  key={plan.id}
                  className="group cursor-pointer overflow-hidden border border-border/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleSelectPlan(plan)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={plan.coverImage}
                      alt={plan.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint="scenic landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {plan.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} className="bg-white/20 text-white text-xs border-none backdrop-blur-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", difficultyColor[plan.difficulty])}>
                        {plan.difficulty}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight font-headline">{plan.title}</h3>
                        <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" />{plan.duration}</div>
                      <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-primary" />{plan.durationDays} days</div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{plan.summary}</p>
                    <div className="space-y-1">
                      {plan.highlights.slice(0, 3).map((h) => (
                        <div key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Zap className="h-3 w-3 text-accent shrink-0" />{h}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 font-semibold group-hover:bg-primary/90" size="sm">
                      View Plan & Customize <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          /* Plan Detail + AI Chat View */
          <div>
            <Button
              variant="ghost"
              className="mb-6 -ml-2 text-muted-foreground hover:text-primary"
              onClick={() => setSelectedPlan(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to all plans
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Plan Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Plan Header */}
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className="relative h-56">
                    <Image
                      src={selectedPlan.coverImage}
                      alt={selectedPlan.title}
                      fill
                      className="object-cover"
                      data-ai-hint="scenic landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                    <div className="absolute bottom-5 left-6 right-6">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedPlan.tags.map((tag) => (
                          <Badge key={tag} className="bg-white/20 text-white text-xs border-none">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white font-headline">{selectedPlan.title}</h2>
                      <p className="text-white/80 text-sm mt-1">{selectedPlan.subtitle}</p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Duration</p>
                        <p className="font-bold text-primary mt-1">{selectedPlan.duration}</p>
                      </div>
                      <div className="text-center border-x">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Difficulty</p>
                        <p className={cn("font-bold mt-1 text-sm", {
                          'text-green-600': selectedPlan.difficulty === 'Easy',
                          'text-yellow-600': selectedPlan.difficulty === 'Moderate',
                          'text-red-600': selectedPlan.difficulty === 'Challenging',
                        })}>{selectedPlan.difficulty}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Best Time</p>
                        <p className="font-bold text-primary mt-1 text-xs">{selectedPlan.bestTime}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedPlan.summary}</p>
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Top Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlan.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-1 text-xs bg-secondary/40 px-2 py-1 rounded-full">
                            <Zap className="h-3 w-3 text-accent" />{h}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Day-by-Day Itinerary */}
                <div>
                  <h3 className="text-xl font-bold text-primary font-headline mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Day-by-Day Itinerary
                  </h3>
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />
                    <div className="space-y-4">
                      {selectedPlan.days.map((day) => (
                        <div key={day.day} className="relative md:pl-16">
                          <div className="absolute left-0 top-4 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xs shadow-md z-10">
                            Day<br />{day.day}
                          </div>
                          <Card className="border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-gradient-to-r from-primary/85 to-primary px-5 py-3">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <Badge className="mb-1 bg-accent text-accent-foreground md:hidden text-xs">Day {day.day}</Badge>
                                  <h4 className="font-bold text-primary-foreground text-sm leading-tight">{day.title}</h4>
                                  <div className="flex items-center gap-1 text-primary-foreground/80 text-xs mt-0.5">
                                    <MapPin className="h-3 w-3" />{day.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4 space-y-3">
                              <p className="text-sm text-muted-foreground">{day.description}</p>
                              <Separator />
                              <div>
                                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">Activities</p>
                                <ul className="space-y-1">
                                  {day.activities.map((a, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                      <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />{a}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-secondary/30 rounded-lg p-2.5">
                                  <div className="flex items-center gap-1 text-xs font-semibold text-primary mb-1">
                                    <Utensils className="h-3 w-3" />Meals
                                  </div>
                                  <p className="text-xs text-muted-foreground">{day.meals}</p>
                                </div>
                                <div className="bg-secondary/30 rounded-lg p-2.5">
                                  <div className="flex items-center gap-1 text-xs font-semibold text-primary mb-1">
                                    <BedDouble className="h-3 w-3" />Stay
                                  </div>
                                  <p className="text-xs text-muted-foreground">{day.accommodation}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: AI Chatbot */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="border border-primary/20 shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3">
                      <CardTitle className="text-primary-foreground flex items-center gap-2 text-base">
                        <Bot className="h-5 w-5" />
                        AI Travel Assistant
                      </CardTitle>
                      <p className="text-primary-foreground/80 text-xs mt-0.5">
                        Ask me to customize or upgrade this plan!
                      </p>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col h-[420px] md:h-[520px]">
                      {/* Chat messages */}
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-3">
                          {chatMessages.map((msg, i) => (
                            <div
                              key={i}
                              className={cn("flex gap-2", msg.role === 'user' ? "justify-end" : "justify-start")}
                            >
                              {msg.role === 'assistant' && (
                                <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                  <Bot className="h-4 w-4 text-primary" />
                                </div>
                              )}
                              <div
                                className={cn(
                                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                                  msg.role === 'user'
                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                    : "bg-secondary/50 text-foreground rounded-tl-sm"
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
                                <div className="shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center mt-0.5">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          ))}
                          {chatLoading && (
                            <div className="flex gap-2 justify-start">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="h-4 w-4 text-primary" />
                              </div>
                              <div className="bg-secondary/50 rounded-2xl rounded-tl-sm px-4 py-2.5">
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                              </div>
                            </div>
                          )}
                          <div ref={chatBottomRef} />
                        </div>
                      </ScrollArea>

                      {/* Chat input */}
                      <div className="p-3 border-t bg-background">
                        <div className="flex gap-2">
                          <Input
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                            placeholder="Ask about this plan..."
                            className="text-sm h-9"
                            disabled={chatLoading}
                          />
                          <Button
                            size="sm"
                            className="h-9 w-9 p-0 shrink-0"
                            onClick={handleSendMessage}
                            disabled={chatLoading || !chatInput.trim()}
                          >
                            {chatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {['Best upgrades?', 'Budget tips', 'What to pack?', 'Extend by 2 days'].map((q) => (
                            <button
                              key={q}
                              onClick={() => { setChatInput(q); }}
                              className="text-xs bg-secondary/50 hover:bg-secondary text-muted-foreground px-2 py-1 rounded-full transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
