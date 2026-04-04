"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/lib/language-context"

const SCROLL_AMOUNT_RATIO = 0.7

export function DestinationsCarousel() {
  const { t } = useLanguage()

  const destinations = [
    { name: "Tawang", tagline: t.destTawangTagline, imageId: "dest-tawang", href: "/guides" },
    { name: "Ziro Valley", tagline: t.destZiroTagline, imageId: "dest-ziro", href: "/guides" },
    { name: "Namdapha", tagline: t.destNamdaphaTagline, imageId: "dest-namdapha", href: "/guides" },
    { name: "Mechuka", tagline: t.destMechukaTagline, imageId: "dest-mechuka", href: "/guides" },
    { name: "Sangti Valley", tagline: t.destSangtiTagline, imageId: "dest-sangti", href: "/guides" },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.offsetWidth * SCROLL_AMOUNT_RATIO
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  return (
    <section className="py-12 md:py-20 bg-[#f6f3f2]">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline tracking-tight">
              {t.popularDestinations}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base font-body">
              {t.popularDestinationsSubtitle}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={cn(
                "p-2 rounded-full transition-colors",
                canScrollLeft
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-muted text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={cn(
                "p-2 rounded-full transition-colors",
                canScrollRight
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-muted text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {destinations.map((dest, idx) => {
            const img = PlaceHolderImages.find(i => i.id === dest.imageId)
            return (
              <Link
                key={dest.name}
                href={dest.href}
                className={cn(
                  "group relative flex-shrink-0 w-[260px] md:w-[300px] h-[380px] md:h-[420px] snap-start overflow-hidden transition-all duration-500 hover:-translate-y-2",
                  idx % 2 === 0 ? "organic-card" : "organic-card-alt"
                )}
              >
                {img && (
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    data-ai-hint={img.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent group-hover:from-black/90 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1 font-body">
                    <MapPin className="h-3.5 w-3.5" />
                    Arunachal Pradesh
                  </div>
                  <h3 className="text-xl font-bold font-headline text-white tracking-tight">{dest.name}</h3>
                  <p className="text-sm text-white/80 mt-0.5 font-body">{dest.tagline}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-white/50 group-hover:text-white/90 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {t.exploreText} <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
