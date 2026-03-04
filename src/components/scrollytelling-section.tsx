"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/lib/language-context"

interface Chapter {
  id: string
  imageId: string
  accentColor: string
  badge: string
  title: string
  subtitle: string
  body: string
  stat1Value: string
  stat1Label: string
  stat2Value: string
  stat2Label: string
}

function useCountUp(target: number, isActive: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isActive || hasRun.current) return
    hasRun.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isActive, target, duration])

  return count
}

function StatCounter({
  value,
  label,
  isActive,
}: {
  value: string
  label: string
  isActive: boolean
}) {
  const numeric = parseInt(value.replace(/[\D,]/g, ""), 10) || 0
  const suffix = value.replace(/[\d,]/g, "")
  const count = useCountUp(numeric, isActive)

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl md:text-5xl font-bold font-headline text-white tabular-nums drop-shadow-lg">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-white/70">
        {label}
      </span>
    </div>
  )
}

export function ScrollytellingSection() {
  const { t } = useLanguage()

  const chapters: Chapter[] = [
    {
      id: "landscape",
      imageId: "hero-mountains",
      accentColor: "#6EE7B7",
      badge: t.stChapter1Badge,
      title: t.stChapter1Title,
      subtitle: t.stChapter1Subtitle,
      body: t.stChapter1Body,
      stat1Value: "7,000+",
      stat1Label: t.stStat1Label,
      stat2Value: "83%",
      stat2Label: t.stStat2Label,
    },
    {
      id: "culture",
      imageId: "culture-monastery",
      accentColor: "#FCD34D",
      badge: t.stChapter2Badge,
      title: t.stChapter2Title,
      subtitle: t.stChapter2Subtitle,
      body: t.stChapter2Body,
      stat1Value: "26+",
      stat1Label: t.stStat3Label,
      stat2Value: "400+",
      stat2Label: t.stStat4Label,
    },
    {
      id: "nature",
      imageId: "dest-namdapha",
      accentColor: "#86EFAC",
      badge: t.stChapter3Badge,
      title: t.stChapter3Title,
      subtitle: t.stChapter3Subtitle,
      body: t.stChapter3Body,
      stat1Value: "500+",
      stat1Label: t.stStat5Label,
      stat2Value: "650+",
      stat2Label: t.stStat6Label,
    },
    {
      id: "adventure",
      imageId: "dest-mechuka",
      accentColor: "#A5B4FC",
      badge: t.stChapter4Badge,
      title: t.stChapter4Title,
      subtitle: t.stChapter4Subtitle,
      body: t.stChapter4Body,
      stat1Value: "2,000+",
      stat1Label: t.stStat7Label,
      stat2Value: "100+",
      stat2Label: t.stStat8Label,
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  // Track which chapters have ever been activated so stat counters fire once
  const [activatedChapters, setActivatedChapters] = useState<Set<number>>(new Set())
  const [progress, setProgress] = useState(0)
  const outerRef = useRef<HTMLDivElement>(null)
  const prevIndex = useRef(0)

  // Activate the first chapter shortly after mount so its counters animate in
  useEffect(() => {
    const timer = setTimeout(() => {
      setActivatedChapters(new Set([0]))
    }, 350)
    return () => clearTimeout(timer)
  }, [])

  const updateScroll = useCallback(() => {
    const el = outerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const totalHeight = el.offsetHeight - window.innerHeight
    const scrolled = -rect.top
    const pct = Math.max(0, Math.min(1, scrolled / totalHeight))
    setProgress(pct)

    const idx = Math.min(
      chapters.length - 1,
      Math.floor(pct * chapters.length)
    )
    if (idx !== prevIndex.current) {
      prevIndex.current = idx
      // Update active chapter immediately — CSS handles the crossfade
      setActiveIndex(idx)
      setActivatedChapters(prev => {
        const s = new Set(prev)
        s.add(idx)
        return s
      })
    }
  }, [chapters.length])

  useEffect(() => {
    const onScroll = () => updateScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [updateScroll])

  const activeChapter = chapters[activeIndex]

  return (
    <section ref={outerRef} style={{ height: `${chapters.length * 65}vh` }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Background images — all rendered, crossfade via opacity */}
        {chapters.map((ch, idx) => {
          const bg = PlaceHolderImages.find((i) => i.id === ch.imageId)
          return bg ? (
            <Image
              key={ch.id}
              src={bg.imageUrl}
              alt={bg.description}
              fill
              className={cn(
                "object-cover select-none pointer-events-none",
                idx === activeIndex ? "opacity-100" : "opacity-0"
              )}
              style={{ transition: "opacity 1s cubic-bezier(0.4,0,0.2,1)" }}
              priority={idx === 0}
              data-ai-hint={bg.imageHint}
            />
          ) : null
        })}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10" />

        {/* Accent progress bar — width follows scroll, color crossfades with accent */}
        <div
          className="absolute top-0 left-0 h-1 z-30 rounded-r-full"
          style={{
            width: `${progress * 100}%`,
            background: activeChapter.accentColor,
            boxShadow: `0 0 14px ${activeChapter.accentColor}`,
            transition: "width 0.12s linear, background-color 0.9s ease, box-shadow 0.9s ease",
          }}
        />

        {/* Chapter dot navigation — right side */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              aria-label={`Go to chapter ${idx + 1}`}
              onClick={() => {
                const el = outerRef.current
                if (!el) return
                const totalHeight = el.offsetHeight - window.innerHeight
                const target = (idx / chapters.length) * totalHeight + el.offsetTop
                window.scrollTo({ top: target, behavior: "smooth" })
              }}
              className="rounded-full border"
              style={{
                width: "10px",
                height: idx === activeIndex ? "32px" : "10px",
                background: idx === activeIndex ? ch.accentColor : "transparent",
                borderColor: idx === activeIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
                boxShadow: idx === activeIndex ? `0 0 8px ${ch.accentColor}` : "none",
                transition: "height 0.55s cubic-bezier(0.4,0,0.2,1), background-color 0.55s ease, box-shadow 0.55s ease, border-color 0.55s ease",
              }}
            />
          ))}
        </div>

        {/* Per-chapter content panels — all in the DOM, crossfade via opacity + translateY */}
        {chapters.map((ch, idx) => (
          <div
            key={ch.id}
            className="absolute inset-0 z-20 flex items-end pb-16 md:pb-20 px-5 md:px-16"
            aria-hidden={idx !== activeIndex}
            style={{
              opacity: idx === activeIndex ? 1 : 0,
              transform: idx === activeIndex ? "translateY(0px)" : "translateY(22px)",
              transition: "opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1)",
              pointerEvents: idx === activeIndex ? "auto" : "none",
            }}
          >
            <div className="w-full max-w-6xl mx-auto">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 border"
                style={{
                  background: `${ch.accentColor}22`,
                  borderColor: `${ch.accentColor}55`,
                  color: ch.accentColor,
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: ch.accentColor }}
                />
                {ch.badge}
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline text-white leading-tight mb-3 drop-shadow-xl max-w-4xl">
                {ch.title}
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-2xl font-medium text-white/70 mb-3 max-w-2xl">
                {ch.subtitle}
              </p>

              {/* Body */}
              <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl mb-8 hidden md:block">
                {ch.body}
              </p>

              {/* Stats + CTA row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <div className="flex items-center gap-8 sm:gap-12">
                  <StatCounter
                    value={ch.stat1Value}
                    label={ch.stat1Label}
                    isActive={activatedChapters.has(idx)}
                  />
                  <div className="w-px h-12 bg-white/20 hidden sm:block" />
                  <StatCounter
                    value={ch.stat2Value}
                    label={ch.stat2Label}
                    isActive={activatedChapters.has(idx)}
                  />
                </div>

                {idx === 1 && (
                  <Link href="/tribes" className="mt-2 sm:mt-0 sm:ml-auto">
                    <Button
                      size="lg"
                      className="h-12 px-8 text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{ background: ch.accentColor, color: "#1a1a2e" }}
                    >
                      {t.exploreTribes} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}

                {idx === chapters.length - 1 && (
                  <Link href="/itinerary" className="mt-2 sm:mt-0 sm:ml-auto">
                    <Button
                      size="lg"
                      className="h-12 px-8 text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-accent/30 active:scale-95"
                      style={{ background: ch.accentColor, color: "#1a1a2e" }}
                    >
                      {t.stCTAButton} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>

              {/* Chapter counter */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-white/40 text-xs font-mono tabular-nums tracking-widest">
                  {String(idx + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                </span>
                <div className="flex-1 max-w-[120px] h-px bg-white/15 relative">
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${((idx + 1) / chapters.length) * 100}%`,
                      background: ch.accentColor,
                    }}
                  />
                </div>
                <span className="text-white/40 text-xs font-medium hidden md:inline">
                  {t.stScrollHint}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-white/30 animate-bounce hidden md:block" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
