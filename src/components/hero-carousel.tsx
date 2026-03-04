"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/lib/language-context"

const AUTO_ADVANCE_INTERVAL = 5500

export function HeroCarousel() {
  const { t } = useLanguage()

  const heroSlides = [
    {
      imageId: "hero-mountains",
      headline: t.heroSlide1Headline,
      subline: t.heroSlide1Subline,
      tagline: t.heroSlide1Tagline,
    },
    {
      imageId: "hero-himalaya",
      headline: t.heroSlide2Headline,
      subline: t.heroSlide2Subline,
      tagline: t.heroSlide2Tagline,
    },
    {
      imageId: "hero-valley",
      headline: t.heroSlide3Headline,
      subline: t.heroSlide3Subline,
      tagline: t.heroSlide3Tagline,
    },
    {
      imageId: "hero-monastery",
      headline: t.heroSlide4Headline,
      subline: t.heroSlide4Subline,
      tagline: t.heroSlide4Tagline,
    },
  ]

  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setIsTransitioning(false)
    }, 300)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  const slide = heroSlides[current]
  const img = PlaceHolderImages.find(i => i.id === slide.imageId)

  return (
    <section className="relative h-[90vh] md:h-screen min-h-[560px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((s, idx) => {
        const bg = PlaceHolderImages.find(i => i.id === s.imageId)
        return bg ? (
          <Image
            key={s.imageId}
            src={bg.imageUrl}
            alt={bg.description}
            fill
            className={cn(
              "object-cover transition-opacity duration-700",
              idx === current ? "opacity-100" : "opacity-0"
            )}
            priority={idx === 0}
            data-ai-hint={bg.imageHint}
          />
        ) : null
      })}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-[1]" />

      {/* Content */}
      <div
        className={cn(
          "container relative z-10 px-4 text-center text-white flex flex-col items-center transition-all duration-500",
          isTransitioning ? "opacity-0 translate-y-4 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"
        )}
      >
        <div className="mb-3 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium hover:bg-white/25 transition-colors duration-300 cursor-default">
          <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
          {slide.tagline}
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline mb-2 drop-shadow-lg max-w-4xl leading-tight">
          {slide.headline}
        </h1>
        <p className="text-lg sm:text-xl md:text-3xl font-medium mb-4 drop-shadow-md text-white/80">
          {slide.subline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
          <Link href="/permit" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full h-12 md:h-14 px-8 text-base md:text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              {t.getYourPermit} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/itinerary" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="w-full h-12 md:h-14 px-8 text-base md:text-lg font-semibold shadow-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/35 border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              {t.planMyTrip}
            </Button>
          </Link>
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/55 hover:scale-110 transition-all duration-200 active:scale-95"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/55 hover:scale-110 transition-all duration-200 active:scale-95"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "transition-all duration-300 rounded-full",
              idx === current
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </section>
  )
}
