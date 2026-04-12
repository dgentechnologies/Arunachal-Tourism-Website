"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Star, MapPin, Wifi, Leaf, Search, CalendarDays, Users,
  ChevronDown, Coffee, Car, Utensils, ShieldCheck, CheckCircle2,
  XCircle, BedDouble, ArrowRight, SlidersHorizontal, Flame,
} from "lucide-react"
import { hotelsData } from "@/lib/hotels-data"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

const locationOptions = ["All Locations", "Tawang", "Ziro Valley", "Itanagar", "Changlang"]
const typeOptions = ["All Types", "Resort", "Eco-friendly", "Lodge", "Luxury", "Heritage"]
const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating", "Most Reviewed"]
const priceRanges = ["Any Price", "Under â‚¹2,000", "â‚¹2,000â€“â‚¹5,000", "â‚¹5,000â€“â‚¹10,000", "Above â‚¹10,000"]

const amenityIconMap: Record<string, React.ElementType> = {
  wifi: Wifi,
  coffee: Coffee,
  car: Car,
  thermometer: Flame,
  utensils: Utensils,
  "concierge-bell": ShieldCheck,
}

const getRatingLabel = (r: number) =>
  r >= 4.7 ? "Exceptional" : r >= 4.4 ? "Excellent" : r >= 4.0 ? "Very Good" : "Good"

export default function HotelsPage() {
  const { t } = useLanguage()

  // Search form
  const [searchLocation, setSearchLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)

  // Filters
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedType, setSelectedType] = useState("All Types")
  const [sortBy, setSortBy] = useState("Recommended")
  const [priceRange, setPriceRange] = useState("Any Price")

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
    return Math.max(1, Math.round(diff))
  }, [checkIn, checkOut])

  const results = useMemo(() => {
    let list = hotelsData.filter((h) => {
      const locationQuery = searchLocation.trim().toLowerCase()
      const locMatch =
        selectedLocation === "All Locations" ||
        h.location.toLowerCase().includes(selectedLocation.toLowerCase())
      const searchMatch =
        !locationQuery ||
        h.location.toLowerCase().includes(locationQuery) ||
        h.name.toLowerCase().includes(locationQuery)
      const typeMatch =
        selectedType === "All Types" ||
        h.tags.some((tag) => tag.toLowerCase().includes(selectedType.toLowerCase()))
      let priceMatch = true
      if (priceRange === "Under â‚¹2,000") priceMatch = h.price < 2000
      else if (priceRange === "â‚¹2,000â€“â‚¹5,000") priceMatch = h.price >= 2000 && h.price <= 5000
      else if (priceRange === "â‚¹5,000â€“â‚¹10,000") priceMatch = h.price > 5000 && h.price <= 10000
      else if (priceRange === "Above â‚¹10,000") priceMatch = h.price > 10000
      return locMatch && searchMatch && typeMatch && priceMatch
    })
    if (sortBy === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price)
    else if (sortBy === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price)
    else if (sortBy === "Rating") list = [...list].sort((a, b) => b.rating - a.rating)
    else if (sortBy === "Most Reviewed") list = [...list].sort((a, b) => b.reviews - a.reviews)
    return list
  }, [searchLocation, selectedLocation, selectedType, sortBy, priceRange])

  const hasActiveFilters =
    selectedLocation !== "All Locations" ||
    selectedType !== "All Types" ||
    priceRange !== "Any Price"

  const clearFilters = () => {
    setSelectedLocation("All Locations")
    setSelectedType("All Types")
    setPriceRange("Any Price")
  }

  return (
    <main className="bg-background">

      {/* â”€â”€ Hero + Search Widget â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative">
        {/* Background */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop&auto=format&q=85"
            alt="Snow-capped Himalayan peaks near Tawang at golden hour, Arunachal Pradesh"
            fill
            priority
            className="object-cover"
            data-ai-hint="himalayan mountain sunrise arunachal"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/50 to-primary/80" />
          <div className="absolute inset-0 tribal-pattern opacity-20 pointer-events-none" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-8">
            <span className="inline-block text-primary-container text-[11px] font-bold uppercase tracking-widest mb-3">
              Arunachal Pradesh Â· 200+ Properties
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 leading-tight">
              Book Your Perfect Stay
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-sm">
              Himalayan retreats, tribal homestays &amp; eco-lodges â€” curated just for you.
            </p>
          </div>
        </div>

        {/* Floating search card */}
        <div className="relative -mt-10 md:-mt-14 z-10 px-4 md:px-10 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-float p-4 md:p-5 border border-border/40">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

              {/* Destination */}
              <div className="col-span-2 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Tawang, Ziro, Itanagarâ€¦"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 bg-background"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Check-in</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-9 pr-2 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 bg-background"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Check-out</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-9 pr-2 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 bg-background"
                  />
                </div>
              </div>

              {/* Guests + CTA */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Guests</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-9 pr-2 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 bg-background appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <Button className="rounded-xl px-4 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 h-auto">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Filter Bar + Results â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-10 pb-20">

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 pt-6">
          {/* Result count */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="font-headline font-bold text-foreground">
              {results.length} {results.length === 1 ? "property" : "properties"}
            </span>
            {checkIn && checkOut && (
              <span className="text-muted-foreground text-sm hidden md:inline">
                Â· {new Date(checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                {" â†’ "}
                {new Date(checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                {" "}({nights} night{nights > 1 ? "s" : ""})
              </span>
            )}
          </div>

          <div className="sm:ml-auto flex flex-wrap gap-2 items-center">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-xs font-semibold rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {sortOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>

            {/* Location */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-xs font-semibold rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {locationOptions.map((l) => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>

            {/* Type */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-xs font-semibold rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {typeOptions.map((tp) => <option key={tp}>{tp}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>

            {/* Price */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-xs font-semibold rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {priceRanges.map((p) => <option key={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs font-semibold text-destructive border border-destructive/30 rounded-full px-3 py-2 hover:bg-destructive/5 transition-colors"
              >
                <XCircle className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Hotel listing cards */}
        <div className="space-y-5">
          {results.map((hotel, i) => {
            const totalPrice = hotel.price * nights
            const bookUrl = `/hotels/${hotel.id}/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&room=${encodeURIComponent(hotel.rooms[0].type)}&price=${hotel.rooms[0].price}`

            return (
              <ScrollReveal key={hotel.id} variant="up" delay={i * 60}>
                <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-float transition-all duration-300 group">

                  {/* Image */}
                  <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={`${hotel.name} â€” ${hotel.location}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint="hotel accommodation stay arunachal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-transparent" />
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {hotel.tags.map((tag) => (
                        <span key={tag} className="bg-primary/85 backdrop-blur-sm text-primary-foreground text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Rating badge on image (mobile) */}
                    <div className="absolute bottom-3 right-3 md:hidden bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1 shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                      <span className="text-sm font-bold">{hotel.rating}</span>
                    </div>
                  </div>

                  {/* Details + Price */}
                  <div className="flex-1 flex flex-col md:flex-row p-5 md:p-6 gap-5">

                    {/* Left: hotel details */}
                    <div className="flex-1 min-w-0">
                      {/* Name & location */}
                      <Link href={`/hotels/${hotel.id}`} className="group/name">
                        <h2 className="font-headline text-xl font-bold tracking-tight group-hover/name:text-primary transition-colors leading-tight mb-1">
                          {hotel.name}
                        </h2>
                      </Link>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{hotel.location}</span>
                      </div>

                      {/* Star rating row */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={cn(
                                "h-3.5 w-3.5",
                                idx < Math.round(hotel.rating)
                                  ? "fill-secondary text-secondary"
                                  : "fill-muted text-muted-foreground/40"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold hidden md:inline">{hotel.rating}</span>
                        <span className="text-xs text-muted-foreground hidden md:inline">({hotel.reviews} reviews)</span>
                        <span className="bg-primary text-primary-foreground text-[11px] font-bold px-2 py-0.5 rounded-lg">
                          {getRatingLabel(hotel.rating)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {hotel.longDescription}
                      </p>

                      {/* Amenity chips */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {hotel.amenities.slice(0, 4).map((a) => {
                          const IconComp = amenityIconMap[a.icon] ?? CheckCircle2
                          return (
                            <span key={a.label} className="flex items-center gap-1.5 bg-muted text-xs font-medium px-3 py-1.5 rounded-full text-muted-foreground">
                              <IconComp className="h-3 w-3 text-primary shrink-0" />
                              {a.label}
                            </span>
                          )
                        })}
                      </div>

                      {/* Room types available */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BedDouble className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{hotel.rooms.length} room type{hotel.rooms.length > 1 ? "s" : ""} available</span>
                        <span className="mx-1">Â·</span>
                        <span>Check-in {hotel.checkIn}</span>
                        <span className="mx-1">Â·</span>
                        <span>Check-out {hotel.checkOut}</span>
                      </div>
                    </div>

                    {/* Right: price + CTA */}
                    <div className="flex flex-row md:flex-col items-end justify-between shrink-0 md:min-w-[160px] border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 md:pl-5 gap-4 md:gap-0">
                      <div className="text-right">
                        <p className="text-[11px] text-muted-foreground mb-1">Starting from</p>
                        <div className="flex items-baseline gap-1 justify-end mb-0.5">
                          <span className="font-headline text-2xl font-bold text-primary">
                            â‚¹{hotel.price.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground text-xs">{t.perNight}</span>
                        </div>
                        {nights > 1 && (
                          <p className="text-xs text-muted-foreground">
                            â‚¹{totalPrice.toLocaleString()} Â· {nights} nights
                          </p>
                        )}
                        <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1 justify-end">
                          <CheckCircle2 className="h-3 w-3 shrink-0" />
                          {hotel.cancellation.startsWith("Free") ? "Free cancellation" : "Flexible"}
                        </p>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 w-auto md:w-full md:mt-4">
                        <Link href={bookUrl}>
                          <Button className="rounded-xl font-headline font-bold bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap text-sm px-5 md:w-full">
                            Book Now
                          </Button>
                        </Link>
                        <Link href={`/hotels/${hotel.id}`}>
                          <Button variant="outline" className="rounded-xl font-headline text-sm whitespace-nowrap px-4 md:w-full">
                            Details
                            <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            )
          })}

          {results.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <Leaf className="h-14 w-14 mx-auto mb-4 text-primary/30" />
              <p className="font-headline text-2xl font-bold mb-2">No stays found</p>
              <p className="text-sm mb-6">Try adjusting your search or filters.</p>
              <Button variant="outline" className="rounded-full" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* â”€â”€ Why Book With Us â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-muted py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal variant="up">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
              Why Book with Arunachal Explore
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Verified Properties", desc: "Every stay is ground-verified by our team." },
              { icon: Leaf, title: "Eco-Certified", desc: "80% of partners carry sustainability ratings." },
              { icon: Users, title: "Local Hosts", desc: "Direct relationships with tribal innkeepers." },
              { icon: Star, title: "Best Rate Guarantee", desc: "We match any lower price found elsewhere." },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} variant="up" delay={i * 80}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="bg-primary/10 p-4 rounded-2xl">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-headline font-bold text-sm md:text-base">{item.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

    </main>
  )
}
