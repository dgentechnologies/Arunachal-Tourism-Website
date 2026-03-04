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
  const [progress, setProgress] = useState(0)
  const [contentVisible, setContentVisible] = useState(false)
  const outerRef = useRef<HTMLDivElement>(null)
  const prevIndex = useRef(0)

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
      setContentVisible(false)
      setTimeout(() => {
        setActiveIndex(idx)
        setContentVisible(true)
      }, 180)
    }
  }, [chapters.length])

  useEffect(() => {
    const onScroll = () => updateScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    updateScroll()
    // Show initial content
    const t = setTimeout(() => setContentVisible(true), 400)
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(t)
    }
  }, [updateScroll])

  const chapter = chapters[activeIndex]
  const scrollProgress = ((activeIndex + 1) / chapters.length) * 100
  const intraChapterProgress = (progress * chapters.length - activeIndex) * 100
  const displayProgress = ((activeIndex / chapters.length) + (intraChapterProgress / 100) / chapters.length) * 100

  return (
    <section ref={outerRef} style={{ height: `${chapters.length * 100}vh` }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Background images — all pre-rendered, opacity toggled */}
        {chapters.map((ch, idx) => {
          const bg = PlaceHolderImages.find((i) => i.id === ch.imageId)
          return bg ? (
            <Image
              key={ch.id}
              src={bg.imageUrl}
              alt={bg.description}
              fill
              className={cn(
                "object-cover transition-opacity duration-700 select-none pointer-events-none",
                idx === activeIndex ? "opacity-100" : "opacity-0"
              )}
              priority={idx === 0}
              data-ai-hint={bg.imageHint}
            />
          ) : null
        })}

        {/* Gradient overlay — darkens more at the bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10" />

        {/* Coloured accent streak at the very top */}
        <div
          className="absolute top-0 left-0 h-1 z-30 transition-all duration-700 rounded-r-full"
          style={{
            width: `${displayProgress}%`,
            background: chapter.accentColor,
            boxShadow: `0 0 12px ${chapter.accentColor}`,
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
              className={cn(
                "rounded-full transition-all duration-500 border",
                idx === activeIndex
                  ? "w-2.5 h-8 border-white/80"
                  : "w-2.5 h-2.5 border-white/40 hover:border-white/70"
              )}
              style={{
                background: idx === activeIndex ? chapter.accentColor : "transparent",
                boxShadow: idx === activeIndex ? `0 0 8px ${chapter.accentColor}` : "none",
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="absolute inset-0 z-20 flex items-end pb-16 md:pb-20 px-5 md:px-16">
          <div className="w-full max-w-6xl mx-auto">
            <div
              className={cn(
                "transition-all duration-500",
                contentVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 border"
                style={{
                  background: `${chapter.accentColor}22`,
                  borderColor: `${chapter.accentColor}55`,
                  color: chapter.accentColor,
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: chapter.accentColor }}
                />
                {chapter.badge}
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline text-white leading-tight mb-3 drop-shadow-xl max-w-4xl">
                {chapter.title}
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-2xl font-medium text-white/70 mb-3 max-w-2xl">
                {chapter.subtitle}
              </p>

              {/* Body */}
              <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl mb-8 hidden md:block">
                {chapter.body}
              </p>

              {/* Stats + CTA row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <div className="flex items-center gap-8 sm:gap-12">
                  <StatCounter
                    key={`${chapter.id}-stat1`}
                    value={chapter.stat1Value}
                    label={chapter.stat1Label}
                    isActive={contentVisible}
                  />
                  <div className="w-px h-12 bg-white/20 hidden sm:block" />
                  <StatCounter
                    key={`${chapter.id}-stat2`}
                    value={chapter.stat2Value}
                    label={chapter.stat2Label}
                    isActive={contentVisible}
                  />
                </div>

                {activeIndex === chapters.length - 1 && (
                  <Link href="/itinerary" className="mt-2 sm:mt-0 sm:ml-auto">
                    <Button
                      size="lg"
                      className="h-12 px-8 text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-accent/30 active:scale-95"
                      style={{ background: chapter.accentColor, color: "#1a1a2e" }}
                    >
                      {t.stCTAButton} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>

              {/* Chapter counter */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-white/40 text-xs font-mono tabular-nums tracking-widest">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                </span>
                <div className="flex-1 max-w-[120px] h-px bg-white/15 relative">
                  <div
                    className="absolute inset-y-0 left-0 transition-all duration-700"
                    style={{
                      width: `${scrollProgress}%`,
                      background: chapter.accentColor,
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
        </div>
      </div>
    </section>
  )
}
