"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Wifi, Leaf, ArrowRight, Search, CalendarDays, ChevronDown } from "lucide-react"
import { hotelsData } from "@/lib/hotels-data"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/scroll-reveal"

const locationOptions = ["All Locations", "Tawang", "Ziro Valley", "Itanagar", "Changlang"]
const typeOptions = ["All Types", "Resort", "Eco-friendly", "Lodge", "Luxury", "Heritage"]
const ecoLabels: Record<number, { label: string; badge: string }> = {
  1: { label: "Mountain Retreat", badge: "High Altitude" },
  2: { label: "Zero Waste", badge: "Eco Certified" },
  3: { label: "Carbon Neutral", badge: "Riverside" },
  4: { label: "Heritage Stay", badge: "5-Star Luxury" },
}

export default function HotelsPage() {
  const { t } = useLanguage()
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedType, setSelectedType] = useState("All Types")
  const [email, setEmail] = useState("")

  const featuredHotels = hotelsData.slice(0, 2)
  const ecoHotels = hotelsData.slice(1, 4)
  const filteredHotels = hotelsData.filter((h) => {
    const locMatch =
      selectedLocation === "All Locations" ||
      h.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const typeMatch =
      selectedType === "All Types" ||
      h.tags.some((tag) => tag.toLowerCase().includes(selectedType.toLowerCase()))
    return locMatch && typeMatch
  })

  return (
    <main className="bg-surface">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="px-4 md:px-10 pt-6 pb-0">
        <div className="relative w-full h-[580px] md:h-[720px] rounded-xl md:rounded-[2rem] overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format&q=85"
            alt="Panoramic view of snow-capped Himalayan peaks at golden hour near Tawang, Arunachal Pradesh"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            data-ai-hint="himalayan mountain landscape arunachal"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          {/* tribal pattern overlay */}
          <div className="absolute inset-0 tribal-pattern opacity-30 pointer-events-none" />

          {/* Hero text */}
          <div className="absolute bottom-20 md:bottom-24 left-6 md:left-16 max-w-2xl">
            <ScrollReveal variant="up">
              <span className="inline-block text-primary-container font-headline font-bold uppercase tracking-widest text-xs md:text-sm mb-4">
                Handpicked Accommodations
              </span>
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-4 leading-[1.05]">
                Sanctuaries of the Sacred
              </h1>
              <p className="text-white/85 text-base md:text-xl font-light max-w-md leading-relaxed">
                {t.hotelsPageSubtitle}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats bar — negative margin to overlap hero */}
        <div className="relative -mt-8 md:-mt-12 mx-auto max-w-4xl z-10">
          <div className="bg-surface-lowest/90 glass-nav shadow-soft rounded-full py-5 md:py-7 px-8 md:px-14 grid grid-cols-3 items-center text-center">
            <div className="border-r border-outline-variant/30 pr-4">
              <span className="block font-headline text-2xl md:text-3xl font-bold text-primary">200+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-medium">Unique Stays</span>
            </div>
            <div className="border-r border-outline-variant/30 px-4">
              <span className="block font-headline text-2xl md:text-3xl font-bold text-secondary">26</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-medium">Tribal Regions</span>
            </div>
            <div className="pl-4">
              <span className="block font-headline text-2xl md:text-3xl font-bold text-primary">Eco</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-medium">Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search / Filter Bar ───────────────────────────────────── */}
      <section className="px-4 md:px-10 pt-16 pb-20">
        <ScrollReveal variant="up">
          <div className="max-w-5xl mx-auto bg-muted rounded-xl md:rounded-[1.5rem] p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Location */}
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full appearance-none bg-surface-lowest border-none rounded-lg pl-10 pr-10 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {locationOptions.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Stay Type */}
            <div className="relative flex-1">
              <Leaf className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none bg-surface-lowest border-none rounded-lg pl-10 pr-10 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {typeOptions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="relative flex-1">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Check-in / Check-out"
                className="w-full bg-surface-lowest border-none rounded-lg pl-10 pr-4 py-3.5 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <Button className="shrink-0 rounded-full px-8 py-6 font-headline font-bold flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Search className="h-4 w-4" />
              Search Stays
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Featured: High Altitude Luxury ───────────────────────── */}
      <section className="px-4 md:px-10 pb-28">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal variant="up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <span className="text-primary font-headline font-bold uppercase tracking-widest text-xs md:text-sm block mb-2">
                  Exclusive Tiers
                </span>
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
                  High Altitude Luxury
                </h2>
              </div>
              <Link
                href="/hotels"
                className="text-primary font-bold flex items-center gap-2 text-sm md:text-base group hover:gap-3 transition-all"
              >
                Explore all retreats <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
            {featuredHotels.map((hotel, i) => (
              <ScrollReveal key={hotel.id} variant={i === 0 ? "left" : "right"} delay={i * 80}>
                <Link href={`/hotels/${hotel.id}`} className="group block">
                  {/* Asymmetric image container */}
                  <div className="relative overflow-hidden organic-card shimmer-hover mb-5 md:mb-7">
                    <Image
                      src={hotel.image}
                      alt={`${hotel.name} — ${hotel.description}`}
                      width={800}
                      height={600}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint="luxury hotel mountain retreat arunachal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Price badge */}
                    <div className="absolute top-5 right-5 bg-surface-lowest/90 glass-nav px-4 py-2 rounded-full font-headline font-bold text-primary text-sm shadow-soft">
                      ₹{hotel.price.toLocaleString()} / night
                    </div>
                    {/* Tags */}
                    <div className="absolute bottom-5 left-5 flex gap-2">
                      {hotel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary/85 text-primary-foreground text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0 ml-4">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="font-bold text-sm">{hotel.rating}</span>
                        <span className="text-muted-foreground text-xs">({hotel.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{hotel.location}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
                      {hotel.description}
                    </p>
                    {/* Amenity pills */}
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 3).map((a) => (
                        <span
                          key={a.label}
                          className="flex items-center gap-1.5 bg-muted text-on-surface text-xs font-medium px-3 py-1.5 rounded-full"
                        >
                          <Wifi className="h-3 w-3 text-primary" />
                          {a.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tribal Homestays: Deep Immersion ─────────────────────── */}
      <section className="bg-muted py-24 md:py-32">
        <div className="px-4 md:px-10 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Text column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal variant="left">
                <span className="text-secondary font-headline font-bold uppercase tracking-widest text-xs md:text-sm block mb-4">
                  Live Like a Local
                </span>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                  Tribal Homestays: Deep Immersion
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
                  Step into the rhythm of tribal life. From the Apatani valley to the Monpa highlands,
                  our certified homestays offer more than a bed — they offer a seat at the family hearth.
                </p>
              </ScrollReveal>

              <div className="space-y-7">
                {[
                  {
                    icon: <MapPin className="h-6 w-6 text-primary" />,
                    title: "Family Hosted",
                    desc: "Authentic hospitality led by local community leaders and storytellers.",
                  },
                  {
                    icon: <Leaf className="h-6 w-6 text-primary" />,
                    title: "Ancestral Cuisine",
                    desc: "Traditional recipes using forest-foraged ingredients passed through generations.",
                  },
                  {
                    icon: <Star className="h-6 w-6 text-primary" />,
                    title: "Cultural Experiences",
                    desc: "Weaving lessons, rice-wine ceremonies, and guided village walks included.",
                  },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} variant="left" delay={i * 100}>
                    <div className="flex gap-5 items-start">
                      <div className="bg-surface-lowest p-3.5 rounded-xl shrink-0 shadow-ambient">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal variant="up" delay={300}>
                <Button className="mt-10 rounded-full px-10 py-6 font-headline font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Explore Homestays
                </Button>
              </ScrollReveal>
            </div>

            {/* Image grid column */}
            <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-3 md:gap-4">
              <ScrollReveal variant="up" delay={100}>
                <div className="pt-10 space-y-3 md:space-y-4">
                  <div className="relative overflow-hidden rounded-xl md:rounded-[1.5rem]">
                    <Image
                      src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=800&fit=crop&auto=format&q=80"
                      alt="Apatani tribal elder in traditional attire welcoming guests at a bamboo homestay in Ziro Valley"
                      width={600}
                      height={800}
                      className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                      data-ai-hint="tribal elder arunachal welcome homestay"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl md:rounded-[1.5rem]">
                    <Image
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop&auto=format&q=80"
                      alt="Cozy interior of a traditional bamboo-and-wood tribal homestay with warm hearth lighting"
                      width={600}
                      height={600}
                      className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                      data-ai-hint="traditional tribal homestay interior arunachal"
                    />
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="up" delay={200}>
                <div className="space-y-3 md:space-y-4">
                  <div className="relative overflow-hidden rounded-xl md:rounded-[1.5rem]">
                    <Image
                      src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=600&fit=crop&auto=format&q=80"
                      alt="Aerial view of mist-covered traditional Apatani village with terraced rice fields in Ziro"
                      width={600}
                      height={600}
                      className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                      data-ai-hint="ziro valley village aerial terraced fields arunachal"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl md:rounded-[1.5rem]">
                    <Image
                      src="https://picsum.photos/seed/arunachal-festival-culture/600/800"
                      alt="Local woman weaving traditional Arunachali textiles on a backstrap loom in a sunny courtyard"
                      width={600}
                      height={800}
                      className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                      data-ai-hint="tribal woman weaving textile arunachal culture"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Eco-Conscious Lodges ──────────────────────────────────── */}
      <section className="px-4 md:px-10 py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal variant="up">
            <div className="max-w-3xl mb-14">
              <span className="text-primary font-headline font-bold uppercase tracking-widest text-xs md:text-sm block mb-4">
                Sustainability Charter
              </span>
              <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter mb-5">
                Riverside Eco-Lodges
              </h2>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                Minimal footprints, maximum connection. Built using local stone and timber,
                our eco-lodges are designed to disappear into the landscape.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {ecoHotels.map((hotel, i) => {
              const eco = ecoLabels[hotel.id]
              return (
                <ScrollReveal key={hotel.id} variant="up" delay={i * 120}>
                  <div className="bg-surface-lowest rounded-xl md:rounded-[1.5rem] overflow-hidden ghost-border hover:shadow-float transition-shadow duration-500 group">
                    <div className="relative overflow-hidden">
                      <Image
                        src={hotel.image}
                        alt={`${hotel.name} — ${hotel.description}`}
                        width={600}
                        height={400}
                        className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700"
                        data-ai-hint="eco lodge sustainable stay arunachal"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-7">
                      <div className="flex items-center gap-2 text-primary text-[11px] font-bold tracking-widest uppercase mb-4">
                        <Leaf className="h-3.5 w-3.5 fill-primary" />
                        {eco?.badge ?? "Eco Stay"}
                      </div>
                      <h4 className="font-headline text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {hotel.name}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {hotel.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-headline font-bold text-primary text-base">
                          ₹{hotel.price.toLocaleString()} {t.perNight}
                        </span>
                        <Link
                          href={`/hotels/${hotel.id}`}
                          className="font-bold text-primary flex items-center gap-1.5 text-sm group/link hover:gap-2.5 transition-all"
                        >
                          View Detail
                          <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── All Properties Grid ───────────────────────────────────── */}
      <section className="bg-muted px-4 md:px-10 py-24 md:py-28">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal variant="up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <span className="text-primary font-headline font-bold uppercase tracking-widest text-xs md:text-sm block mb-2">
                  Browse All
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">
                  All Stays
                  <span className="ml-3 text-muted-foreground text-2xl font-normal">
                    ({filteredHotels.length})
                  </span>
                </h2>
              </div>
              {/* Active filters */}
              {(selectedLocation !== "All Locations" || selectedType !== "All Types") && (
                <button
                  onClick={() => { setSelectedLocation("All Locations"); setSelectedType("All Types") }}
                  className="text-sm text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {filteredHotels.map((hotel, i) => (
              <ScrollReveal key={hotel.id} variant="up" delay={i * 70}>
                <Link href={`/hotels/${hotel.id}`} className="group block bg-surface-lowest rounded-xl md:rounded-[1.5rem] overflow-hidden ghost-border hover:shadow-float transition-all duration-500 h-full">
                  <div className="relative overflow-hidden h-48">
                    <Image
                      src={hotel.image}
                      alt={`${hotel.name} — ${hotel.location}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      data-ai-hint="hotel accommodation arunachal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {hotel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary/80 backdrop-blur-sm text-primary-foreground text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h3 className="font-headline text-base font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="h-3 w-3 fill-secondary text-secondary" />
                        <span className="text-xs font-bold">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-4">
                      <MapPin className="h-3 w-3" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <span className="font-headline font-bold text-primary text-base">
                          ₹{hotel.price.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground text-xs ml-1">{t.perNight}</span>
                      </div>
                      <Link
                        href={`/hotels/${hotel.id}/book?room=${encodeURIComponent(hotel.rooms[0].type)}&price=${hotel.rooms[0].price}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="sm" className="rounded-full text-xs px-4 h-8 font-headline">
                          {t.bookNow}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
            {filteredHotels.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                <Leaf className="h-12 w-12 mx-auto mb-4 text-primary/30" />
                <p className="font-headline text-xl mb-2">No stays found</p>
                <p className="text-sm">Try adjusting your filters above.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA: Find Your Himalayan Home ────────────────────────── */}
      <section className="px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal variant="scale">
            <div className="relative bg-primary rounded-xl md:rounded-[2rem] p-10 md:p-20 overflow-hidden text-center">
              {/* radial glow background */}
              <div className="absolute inset-0 tribal-pattern opacity-20 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(64,224,208,0.15)_0%,_transparent_70%)] pointer-events-none" />

              <div className="relative z-10 max-w-xl mx-auto">
                <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-6 leading-tight">
                  Find Your Himalayan Home
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-10 leading-relaxed">
                  Subscribe to receive curated stay guides and seasonal availability updates
                  for our most exclusive retreats.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/55 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                  <Button
                    type="submit"
                    className="rounded-full px-8 py-6 font-headline font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 shrink-0"
                  >
                    Join Concierge
                  </Button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

