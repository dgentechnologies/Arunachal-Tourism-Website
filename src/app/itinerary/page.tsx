"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar, Clock, Zap, Sparkles,
  Mountain, TreePine, Users, Waves, Globe,
  BookmarkPlus, BookmarkCheck, ChevronRight, Star,
} from "lucide-react"
import { motion } from "framer-motion"
import { premadeItineraries } from "@/lib/itinerary-data"
import { useAuth } from "@/lib/auth-context"
import { collection, getDocs } from "firebase/firestore"
import { getFirebaseDbUsers } from "@/lib/firebase"
import { cn } from "@/lib/utils"

const planIcons: Record<string, React.ElementType> = {
  'buddhist-circuit':  Mountain,
  'wildlife-explorer': TreePine,
  'tribal-heritage':   Users,
  'adventure-trek':    Waves,
  'grand-explorer':    Globe,
}

const planNumbers: Record<string, string> = {
  'buddhist-circuit':  '01',
  'wildlife-explorer': '02',
  'tribal-heritage':   '03',
  'adventure-trek':    '04',
  'grand-explorer':    '05',
}

const difficultyColor = {
  Easy:        'bg-emerald-500/90 text-white',
  Moderate:    'bg-amber-500/90 text-white',
  Challenging: 'bg-red-500/90 text-white',
}

const difficultyDot = {
  Easy:        'bg-emerald-400',
  Moderate:    'bg-amber-400',
  Challenging: 'bg-red-400',
}

export default function ItineraryPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [savedPlanIds, setSavedPlanIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!user) { setSavedPlanIds(new Set()); return }
    const tripsRef = collection(getFirebaseDbUsers(), "users", user.uid, "trips")
    getDocs(tripsRef).then((snap) => {
      const ids = new Set(snap.docs.map((d) => d.data().planId as string).filter(Boolean))
      setSavedPlanIds(ids)
    }).catch(() => { /* non-critical */ })
  }, [user])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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
              alt="Panoramic view of Arunachal Pradesh misty mountain valleys at sunrise"
              fill
              className="object-cover"
              data-ai-hint="misty mountain valley sunrise arunachal himalaya"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[{left:"7%",top:"30%",dur:5,delay:0},{left:"20%",top:"65%",dur:4,delay:0.8},{left:"65%",top:"18%",dur:5.5,delay:0.4},{left:"80%",top:"70%",dur:3.8,delay:1.2},{left:"92%",top:"40%",dur:5.2,delay:0.6}].map((p,i) => (
              <motion.div key={i} className="absolute w-1.5 h-1.5 bg-white/30 rounded-full" style={{left:p.left,top:p.top}} animate={{y:[0,-22,0],opacity:[0.25,0.6,0.25]}} transition={{duration:p.dur,repeat:Infinity,delay:p.delay}} />
            ))}
          </div>
          <div className="absolute bottom-6 md:bottom-12 left-5 md:left-14 max-w-3xl pr-5 md:pr-0">
            <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.3,duration:0.6}}>
              <span className="inline-flex items-center gap-2 bg-[hsl(46,97%,60%)]/90 backdrop-blur-sm text-[hsl(0,5%,11%)] font-black text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 px-4 py-2 rounded-full">
                <Sparkles className="h-3 w-3" /> AI-Powered Trip Planning
              </span>
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline text-white leading-[0.95] tracking-tighter mb-3 md:mb-5" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.5,duration:0.7}}>
              Plan Your<br /><span className="text-[#40e0d0]">Arunachal</span><br />Journey
            </motion.h1>
            <motion.p className="text-white/75 text-sm md:text-base max-w-md leading-relaxed" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8,duration:0.6}}>
              5 expertly curated routes. Each one opens with an AI travel assistant that refines every detail to match your pace and interests.
            </motion.p>
          </div>
          <motion.div className="absolute bottom-6 md:bottom-10 right-5 md:right-12 hidden sm:flex gap-5 md:gap-8" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.9,duration:0.6}}>
            {[{val:"5",label:"Curated Plans"},{val:"14+",label:"Day Options"},{val:"AI",label:"Customization"}].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold font-headline text-white">{s.val}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="px-3 md:px-8 py-10 md:py-16 max-w-[1440px] mx-auto">
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}} className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/70 mb-2">Choose Your Route</p>
            <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground leading-tight tracking-tight">5 Signature<br className="hidden md:block" /> Itineraries</h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">From sacred Himalayan monasteries to the last tiger reserves in the east — select a plan, then let AI shape it around your vision.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {premadeItineraries.map((plan, idx) => {
            const Icon = planIcons[plan.id] ?? Mountain
            const num  = planNumbers[plan.id] ?? `0${idx + 1}`
            const isSaved = savedPlanIds.has(plan.id)
            return (
              <motion.div key={plan.id} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.1*idx,duration:0.55}} className="group cursor-pointer organic-card ghost-border shimmer-hover bg-card shadow-soft hover:shadow-float transition-shadow duration-500" onClick={() => router.push(`/itinerary/${plan.id}`)}>
                <div className="relative h-56 md:h-64 overflow-hidden rounded-t-[3rem] rounded-br-[1.5rem]">
                  <Image src={plan.coverImage} alt={plan.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" data-ai-hint="scenic landscape arunachal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-5 text-white/25 font-headline font-black text-5xl leading-none select-none">{num}</div>
                  <div className="absolute top-4 right-4">
                    <span className={cn("text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5", difficultyColor[plan.difficulty])}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", difficultyDot[plan.difficulty])} />{plan.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                    {plan.tags.slice(0,3).map((tag) => <Badge key={tag} className="bg-white/15 text-white text-[10px] border-none backdrop-blur-sm px-2 py-0.5 font-medium">{tag}</Badge>)}
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"><Icon className="h-4 w-4 text-primary" /></div>
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
                    {plan.highlights.slice(0,3).map((h) => <div key={h} className="flex items-center gap-2 text-xs text-muted-foreground"><Zap className="h-3 w-3 text-[#40e0d0] shrink-0" />{h}</div>)}
                  </div>
                  <Button className="w-full font-semibold gap-1 bg-primary hover:bg-primary/90 group-hover:gap-2 transition-all text-sm h-9" size="sm" onClick={(e) => { e.stopPropagation(); router.push(`/itinerary/${plan.id}`) }}>
                    {isSaved ? <><BookmarkCheck className="h-3.5 w-3.5" /> View &amp; Edit Plan</> : <>View Plan &amp; Customize <ChevronRight className="h-3.5 w-3.5" /></>}
                  </Button>
                  {isSaved && <p className="text-center text-[10px] text-primary mt-2 flex items-center justify-center gap-1"><BookmarkPlus className="h-3 w-3" /> Saved to your account</p>}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.7,duration:0.6}} className="mt-12 md:mt-16 rounded-[1.5rem] md:rounded-[2rem] bg-primary overflow-hidden relative tribal-pattern">
          <div className="px-6 md:px-14 py-10 md:py-12 flex flex-col md:flex-row items-center gap-6 justify-between relative z-10">
            <div>
              <p className="text-[#40e0d0] text-xs font-bold uppercase tracking-widest mb-2">Powered by Gemini AI</p>
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-white leading-tight mb-2">Want a fully custom plan?</h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">Select any plan above and our AI assistant will instantly customize it for your dates, budget, group size, and interests.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center"><Star className="h-3.5 w-3.5 text-[#fccc38]" /></div>)}
              </div>
              <div className="text-white/80 text-xs"><p className="font-bold text-white">4.9/5 Rating</p><p>1,200+ trips planned</p></div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
