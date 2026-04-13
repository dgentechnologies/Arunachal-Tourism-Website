"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/lib/language-context"

const AUTO_ADVANCE_INTERVAL = 5500

export function HeroCarousel() {
  const { t } = useLanguage()

  const heroSlides = [
    {
      imageId: "hero-mountains",
      headline: "Arunachal",
      subline: "Beyond Myths and Mountains.",
      badge: "TAKE A NEW TURN",
      cta1: t.getYourPermit,
      cta1Href: "/essentials",
      cta2: t.planMyTrip,
      cta2Href: "/itinerary",
    },
    {
      imageId: "hero-himalaya",
      headline: "Ancient",
      subline: "Where the Himalayas touch the sky.",
      badge: "THE SACRED PEAKS",
      cta1: t.getYourPermit,
      cta1Href: "/essentials",
      cta2: t.planMyTrip,
      cta2Href: "/itinerary",
    },
    {
      imageId: "hero-valley",
      headline: "Untamed",
      subline: "Rivers older than memory.",
      badge: "WILDERNESS AWAITS",
      cta1: t.getYourPermit,
      cta1Href: "/essentials",
      cta2: t.planMyTrip,
      cta2Href: "/itinerary",
    },
    {
      imageId: "hero-monastery",
      headline: "Sacred",
      subline: "Centuries of faith and festivity.",
      badge: "LIVING HERITAGE",
      cta1: t.getYourPermit,
      cta1Href: "/essentials",
      cta2: t.planMyTrip,
      cta2Href: "/itinerary",
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
  }, [current, goTo, heroSlides.length])

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  const slide = heroSlides[current]

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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

      {/* Cinematic gradient overlay: top dark → transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-[1]" />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 text-center px-6 flex flex-col items-center transition-all duration-300",
          isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
        )}
      >
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 md:px-5 rounded-full bg-[#fccc38] text-[#6f5600] font-headline text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.25em] mb-6 md:mb-8 uppercase">
          {slide.badge}
        </span>

        {/* Massive headline */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-headline font-bold text-white tracking-tighter leading-none mb-4 drop-shadow-2xl">
          {slide.headline}
        </h1>

        {/* Italic subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/85 font-light max-w-2xl mx-auto font-body italic mb-8 md:mb-12 drop-shadow-lg px-4">
          {slide.subline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-5 items-center px-4 w-full sm:w-auto">
          <Link href={slide.cta1Href} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 md:py-4 bg-[#40e0d0] text-[#00201d] rounded-full font-headline font-bold text-sm md:text-base hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
              {slide.cta1}
            </button>
          </Link>
          <Link href={slide.cta2Href} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 md:py-4 border-2 border-white/30 text-white backdrop-blur-md rounded-full font-headline font-bold text-sm md:text-base hover:bg-white/15 hover:scale-105 active:scale-95 transition-all duration-200">
              {slide.cta2}
            </button>
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "transition-all duration-300 rounded-full",
              idx === current
                ? "w-6 md:w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Scroll indicator removed */}
    </section>
  )
}

