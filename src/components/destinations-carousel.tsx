"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const destinations = [
  {
    name: "Tawang",
    tagline: "Buddhism's Crown Jewel",
    imageId: "dest-tawang",
    href: "/guides",
  },
  {
    name: "Ziro Valley",
    tagline: "UNESCO Heritage Landscape",
    imageId: "dest-ziro",
    href: "/guides",
  },
  {
    name: "Namdapha",
    tagline: "Biodiversity Hotspot",
    imageId: "dest-namdapha",
    href: "/guides",
  },
  {
    name: "Mechuka",
    tagline: "Hidden Himalayan Paradise",
    imageId: "dest-mechuka",
    href: "/guides",
  },
  {
    name: "Sangti Valley",
    tagline: "Valley of the Cranes",
    imageId: "dest-sangti",
    href: "/guides",
  },
]

const SCROLL_AMOUNT_RATIO = 0.7

export function DestinationsCarousel() {
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
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Explore Arunachal's most beloved places
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={cn(
                "p-2 rounded-full border transition-colors",
                canScrollLeft
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-muted-foreground/20 text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={cn(
                "p-2 rounded-full border transition-colors",
                canScrollRight
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-muted-foreground/20 text-muted-foreground/30 cursor-not-allowed"
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
          {destinations.map((dest) => {
            const img = PlaceHolderImages.find(i => i.id === dest.imageId)
            return (
              <Link
                key={dest.name}
                href={dest.href}
                className="group relative flex-shrink-0 w-[260px] md:w-[300px] h-[380px] md:h-[420px] rounded-2xl overflow-hidden shadow-md snap-start"
              >
                {img && (
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={img.imageHint}
                  />
                )}
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Arunachal Pradesh
                  </div>
                  <h3 className="text-xl font-bold font-headline">{dest.name}</h3>
                  <p className="text-sm text-white/80 mt-0.5">{dest.tagline}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
