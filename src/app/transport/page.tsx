"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Star, MapPin, ArrowRight, Car, Bike, Bus, Search,
  Phone, ShieldCheck, Gauge, Map, ChevronDown, Check,
  IndianRupee, ArrowUpDown, Users, Leaf, Wifi, Clock,
  XCircle, SlidersHorizontal, Navigation2, Headphones,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/scroll-reveal"

// ─────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────
const PLACES = [
  "Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Dirang",
  "Along (Aalo)", "Namdapha", "Mechuka", "Tezu", "Roing", "Daporijo",
  "Changlang", "Namsai", "Khonsa", "Yingkiong", "Anini", "Hawai",
  "Seijosa", "Bhalukpong", "Guwahati (Assam)", "Dibrugarh (Assam)",
  "Tezpur (Assam)", "Jorhat (Assam)",
]

type TransportProvider = {
  id: number
  name: string
  type: "Car / SUV" | "Bike" | "Taxi" | "Bus" | "Truck"
  vehicles: string[]
  phone: string
  rating: number
  reviews: number
  verified: boolean
  description: string
  image: string
  startingPrice: number
  pricePerKm: number
  routes: string[]
  features: string[]
  availability: string
  languages: string[]
}

const PROVIDERS: TransportProvider[] = [
  {
    id: 1,
    name: "Himalayan Safari Tours",
    type: "Car / SUV",
    vehicles: ["Toyota Fortuner", "Mahindra Bolero", "Innova Crysta"],
    phone: "+91 94010 XXXXX",
    rating: 4.8,
    reviews: 214,
    verified: true,
    description: "Premium 4x4 tours across all districts of Arunachal Pradesh. Specialise in high-altitude mountain drives and multi-day expedition packages with experienced local guides.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format&q=80",
    startingPrice: 3500,
    pricePerKm: 18,
    routes: ["Itanagar \u2192 Tawang", "Guwahati \u2192 Bomdila", "Itanagar \u2192 Ziro", "All Districts"],
    features: ["AC Vehicle", "GPS Tracked", "Local Driver", "Fuel Included"],
    availability: "24/7",
    languages: ["English", "Hindi", "Nyishi"],
  },
  {
    id: 2,
    name: "Arunachal Taxi Service",
    type: "Taxi",
    vehicles: ["Toyota Innova", "Maruti Ertiga", "Hyundai Creta"],
    phone: "+91 98620 XXXXX",
    rating: 4.6,
    reviews: 189,
    verified: true,
    description: "Reliable inter-city taxi service with experienced local drivers. Best rates for city transfers, airport pickups, and flexible multi-day rentals.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop&auto=format&q=80",
    startingPrice: 1200,
    pricePerKm: 12,
    routes: ["Itanagar City", "Guwahati \u2192 Itanagar", "Pasighat Routes", "Naharlagun"],
    features: ["AC Vehicle", "GPS Tracked", "24/7 Booking", "Metered Fare"],
    availability: "24/7",
    languages: ["Hindi", "Bengali", "English"],
  },
  {
    id: 3,
    name: "Northeast Bike Rentals",
    type: "Bike",
    vehicles: ["Royal Enfield Himalayan", "RE Classic 350", "RE Bullet 500"],
    phone: "+91 70024 XXXXX",
    rating: 4.7,
    reviews: 97,
    verified: true,
    description: "Best adventure motorcycle rentals for solo and group riders. All bikes fully serviced, with helmets, riding gear, and emergency support included.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format&q=80",
    startingPrice: 800,
    pricePerKm: 0,
    routes: ["Self-ride: Bomdila Loop", "Ziro Circuit", "Tawang Highway", "Namdapha Trail"],
    features: ["Helmet Included", "Riding Gear", "Emergency Support", "No-Deposit Option"],
    availability: "Day Only",
    languages: ["English", "Hindi"],
  },
  {
    id: 4,
    name: "Arunachal Road Transport Corp.",
    type: "Bus",
    vehicles: ["Deluxe Bus", "Ordinary Bus", "Mini Bus"],
    phone: "+91 0360 XXXXXX",
    rating: 4.1,
    reviews: 312,
    verified: true,
    description: "Government-operated bus service connecting all major towns at the most affordable fares. Fixed schedules, reserved seating on deluxe routes.",
    image: "https://picsum.photos/seed/arunachal-mountain-river/800/500",
    startingPrice: 120,
    pricePerKm: 1,
    routes: ["Itanagar \u2192 Tawang", "Itanagar \u2192 Pasighat", "Itanagar \u2192 Ziro", "All State Routes"],
    features: ["Fixed Schedule", "Reserved Seats", "Luggage Rack", "Government Run"],
    availability: "Day Only",
    languages: ["Hindi", "English", "Assamese"],
  },
  {
    id: 5,
    name: "Siang Valley Expeditions",
    type: "Car / SUV",
    vehicles: ["Mahindra Thar", "Force Gurkha", "Toyota Land Cruiser"],
    phone: "+91 86380 XXXXX",
    rating: 4.9,
    reviews: 78,
    verified: true,
    description: "Specialised in extreme off-road and remote valley expeditions. The go-to operator for Mechuka, Anini, and restricted-area tour permits.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop&auto=format&q=80",
    startingPrice: 5000,
    pricePerKm: 22,
    routes: ["Mechuka Expedition", "Anini Valley", "Kibithoo Border", "Upper Siang"],
    features: ["Off-Road Capable", "Permit Assistance", "Satellite Phone", "First Aid Kit"],
    availability: "By Appointment",
    languages: ["English", "Hindi", "Adi"],
  },
  {
    id: 6,
    name: "Donyi Polo Travel Agency",
    type: "Taxi",
    vehicles: ["Suzuki Dzire", "Honda City", "Toyota Etios"],
    phone: "+91 94360 XXXXX",
    rating: 4.4,
    reviews: 143,
    verified: false,
    description: "Budget-friendly taxi and travel services across the state. Ideal for short hops, local sightseeing, and airport transfers in the capital region.",
    image: "https://picsum.photos/seed/valley-eco-lodge-stay/800/500",
    startingPrice: 800,
    pricePerKm: 10,
    routes: ["Itanagar City", "Naharlagun", "Papum Pare", "Nirjuli"],
    features: ["AC Vehicle", "Fixed Rates", "Local Driver", "Hourly Option"],
    availability: "24/7",
    languages: ["Hindi", "Nyishi", "English"],
  },
  {
    id: 7,
    name: "Wild East Motorcycle Tours",
    type: "Bike",
    vehicles: ["Royal Enfield Scram 411", "KTM Duke 390", "Hero Xpulse 200"],
    phone: "+91 88120 XXXXX",
    rating: 4.6,
    reviews: 61,
    verified: true,
    description: "Guided motorcycle tours with expert local rider-guides. From two-day hill loops to week-long frontier expeditions, fully supported.",
    image: "https://picsum.photos/seed/arunachal-festival-culture/800/500",
    startingPrice: 2200,
    pricePerKm: 0,
    routes: ["Tawang Highway", "Ziro Circuit", "Lower Dibang Valley", "East Arunachal"],
    features: ["Guide Included", "Support Vehicle", "Camping Gear", "Mechanic On-Call"],
    availability: "By Appointment",
    languages: ["English", "Hindi"],
  },
  {
    id: 8,
    name: "Lohit Valley Transport",
    type: "Bus",
    vehicles: ["AC Sleeper Bus", "Seat-push Bus", "Ordinary Bus"],
    phone: "+91 80110 XXXXX",
    rating: 4.0,
    reviews: 95,
    verified: false,
    description: "Covering eastern Arunachal \u2014 Tezu, Roing, Namsai and beyond. Daily services with AC sleeper option on select routes.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop&auto=format&q=80",
    startingPrice: 180,
    pricePerKm: 1.5,
    routes: ["Itanagar \u2192 Tezu", "Itanagar \u2192 Namsai", "Roing Routes", "Dibang Valley"],
    availability: "Day Only",
    features: ["AC Sleeper Option", "Daily Departures", "Luggage Carried", "Online Info"],
    languages: ["Hindi", "Assamese", "English"],
  },
]

const VEHICLE_FILTERS = [
  { label: "All Vehicles", value: "all", icon: Search },
  { label: "Car / SUV", value: "Car / SUV", icon: Car },
  { label: "Taxi", value: "Taxi", icon: Car },
  { label: "Bike", value: "Bike", icon: Bike },
  { label: "Bus", value: "Bus", icon: Bus },
]

const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating", "Most Reviewed"]
const PRICE_RANGES = ["Any Budget", "Under \u20b91,000", "\u20b91,000\u2013\u20b93,000", "\u20b93,001\u2013\u20b96,000", "Above \u20b96,000"]

const featureIconMap: Record<string, React.ElementType> = {
  "AC Vehicle": Wifi,
  "GPS Tracked": Navigation2,
  "Local Driver": Users,
  "Fuel Included": Gauge,
  "Helmet Included": ShieldCheck,
  "Riding Gear": ShieldCheck,
  "Emergency Support": Headphones,
  "Fixed Schedule": Clock,
  "Reserved Seats": Check,
  "Off-Road Capable": Car,
  "Permit Assistance": Map,
  "Guide Included": Users,
  "Support Vehicle": Car,
  "Eco-Friendly": Leaf,
}

const typeColors: Record<string, string> = {
  "Car / SUV": "bg-primary/90 text-white",
  "Taxi": "bg-secondary/90 text-secondary-foreground",
  "Bike": "bg-emerald-600/90 text-white",
  "Bus": "bg-indigo-600/90 text-white",
  "Truck": "bg-orange-600/90 text-white",
}

const availabilityColor: Record<string, string> = {
  "24/7": "text-emerald-600 bg-emerald-50 border-emerald-200",
  "Day Only": "text-amber-600 bg-amber-50 border-amber-200",
  "By Appointment": "text-indigo-600 bg-indigo-50 border-indigo-200",
}

// ─────────────────────────────────────────────────────────────────
// Premium Filter Dropdown (same pattern as hotels page)
// ─────────────────────────────────────────────────────────────────
function FilterDropdown({
  label, icon: Icon, options, value, onChange,
}: {
  label: string
  icon: React.ElementType
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])
  const isDefault = value === options[0]
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 pl-3.5 pr-3 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 whitespace-nowrap select-none",
          isDefault
            ? "bg-white border-border text-foreground hover:border-primary/50 hover:bg-surface-low shadow-sm"
            : "bg-primary border-primary text-white shadow-glow"
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="max-w-[130px] truncate">{value}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 bg-white rounded-2xl shadow-float border border-border/40 py-1.5 z-50 min-w-[200px] overflow-hidden">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 pt-2 pb-1.5">{label}</p>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left",
                value === opt ? "text-primary font-bold bg-primary/5" : "text-foreground font-medium hover:bg-muted"
              )}
            >
              <span>{opt}</span>
              {value === opt && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Autocomplete Input
// ─────────────────────────────────────────────────────────────────
function PlaceInput({
  label, placeholder, icon: Icon, value, onChange,
}: {
  label: string; placeholder: string; icon: React.ElementType
  value: string; onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const suggestions = value.length >= 1
    ? PLACES.filter((p) => p.toLowerCase().includes(value.toLowerCase())).slice(0, 6)
    : []
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 bg-background"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
      {open && suggestions.length > 0 && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-white rounded-2xl shadow-float border border-border/40 py-1.5 overflow-hidden">
          {suggestions.map((p) => (
            <button
              key={p}
              onClick={() => { onChange(p); setOpen(false) }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted text-left transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────
export default function TransportPage() {
  const { t } = useLanguage()
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortBy, setSortBy] = useState("Recommended")
  const [priceRange, setPriceRange] = useState("Any Budget")

  const results = PROVIDERS.filter((p) => {
    const typeMatch = activeFilter === "all" || p.type === activeFilter
    let priceMatch = true
    if (priceRange === "Under \u20b91,000") priceMatch = p.startingPrice < 1000
    else if (priceRange === "\u20b91,000\u2013\u20b93,000") priceMatch = p.startingPrice >= 1000 && p.startingPrice <= 3000
    else if (priceRange === "\u20b93,001\u2013\u20b96,000") priceMatch = p.startingPrice > 3000 && p.startingPrice <= 6000
    else if (priceRange === "Above \u20b96,000") priceMatch = p.startingPrice > 6000
    return typeMatch && priceMatch
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.startingPrice - b.startingPrice
    if (sortBy === "Price: High to Low") return b.startingPrice - a.startingPrice
    if (sortBy === "Rating") return b.rating - a.rating
    if (sortBy === "Most Reviewed") return b.reviews - a.reviews
    return 0
  })

  const hasActiveFilters = priceRange !== "Any Budget"

  return (
    <main className="bg-background">

      {/* ── Hero + Route Search ─────────────────────────────────── */}
      <section className="relative">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop&auto=format&q=85"
            alt="Winding mountain road through misty Himalayan passes in Arunachal Pradesh"
            fill
            priority
            className="object-cover"
            data-ai-hint="mountain road himalayan pass arunachal"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/50 to-primary/80" />
          <div className="absolute inset-0 tribal-pattern opacity-20 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-8">
            <span className="inline-block text-primary-container text-[11px] font-bold uppercase tracking-widest mb-3">
              Arunachal Pradesh &middot; 8 Verified Operators
            </span>
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 leading-tight">
              Transport &amp; Travel
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-md">
              Browse verified operators, compare prices &amp; vehicles &mdash; then call to book.
            </p>
          </div>
        </div>

        {/* Floating route search */}
        <div className="relative -mt-10 md:-mt-14 z-10 px-4 md:px-10 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-float p-4 md:p-5 border border-border/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div className="relative">
                <PlaceInput
                  label="From"
                  placeholder="e.g. Guwahati, Itanagar..."
                  icon={Navigation2}
                  value={source}
                  onChange={setSource}
                />
              </div>
              <div className="relative">
                <PlaceInput
                  label="To"
                  placeholder="e.g. Tawang, Ziro..."
                  icon={MapPin}
                  value={destination}
                  onChange={setDestination}
                />
              </div>
              <Button className="rounded-xl py-3 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-headline font-bold flex items-center gap-2">
                <Search className="h-4 w-4" />
                Find Transport
              </Button>
            </div>
            {source && destination && (
              <div className="mt-3 flex items-center gap-2 text-sm bg-primary/5 rounded-xl px-4 py-2.5 border border-primary/15">
                <Navigation2 className="h-4 w-4 text-primary shrink-0" />
                <span className="font-semibold text-foreground">{source}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">{destination}</span>
                <span className="ml-auto text-xs text-primary font-medium">Showing all operators &mdash; call for route availability</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Filters + Results ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-10 pb-20">

        {/* Vehicle type pills */}
        <div className="flex flex-wrap gap-2 pt-6 mb-5">
          {VEHICLE_FILTERS.map((vt) => {
            const Icon = vt.icon
            const count = vt.value === "all"
              ? PROVIDERS.length
              : PROVIDERS.filter((p) => p.type === vt.value).length
            return (
              <button
                key={vt.value}
                onClick={() => setActiveFilter(vt.value)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-2xl font-headline font-bold text-sm transition-all duration-200 border",
                  activeFilter === vt.value
                    ? "bg-primary text-white border-primary shadow-glow"
                    : "bg-white border-border text-foreground hover:border-primary/40 hover:bg-surface-low shadow-sm"
                )}
              >
                <Icon className="h-4 w-4" />
                {vt.label}
                <span className={cn(
                  "text-[11px] font-bold px-1.5 py-0.5 rounded-full",
                  activeFilter === vt.value ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                )}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Sort/Filter row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 bg-white border border-border/50 rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="font-headline font-bold text-foreground text-sm">
              {results.length} {results.length === 1 ? "operator" : "operators"} available
            </span>
          </div>
          <div className="sm:ml-auto flex flex-wrap gap-2 items-center">
            <FilterDropdown label="Sort By" icon={ArrowUpDown} options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
            <FilterDropdown label="Budget" icon={IndianRupee} options={PRICE_RANGES} value={priceRange} onChange={setPriceRange} />
            {hasActiveFilters && (
              <button
                onClick={() => setPriceRange("Any Budget")}
                className="flex items-center gap-1.5 text-xs font-bold text-red-500 border border-red-200 rounded-xl px-3.5 py-2.5 hover:bg-red-50 transition-colors"
              >
                <XCircle className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* How it works strip */}
        <div className="grid grid-cols-3 gap-3 mb-8 bg-primary/5 border border-primary/10 rounded-2xl px-4 py-4">
          {[
            { step: "1", title: "Browse & Compare", desc: "View vehicles, prices, routes and reviews" },
            { step: "2", title: "Call to Book", desc: "Directly call the operator to confirm your ride" },
            { step: "3", title: "Travel Safely", desc: "All providers are GPS tracked & insured" },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3">
              <span className="bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {s.step}
              </span>
              <div>
                <p className="font-headline font-bold text-sm text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground hidden md:block mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Listing cards */}
        <div className="space-y-5">
          {results.map((provider, i) => {
            const FeatureIcon0 = featureIconMap[provider.features[0]] ?? ShieldCheck
            const FeatureIcon1 = featureIconMap[provider.features[1]] ?? ShieldCheck
            const FeatureIcon2 = featureIconMap[provider.features[2]] ?? ShieldCheck
            const FeatureIcon3 = featureIconMap[provider.features[3]] ?? ShieldCheck
            return (
              <ScrollReveal key={provider.id} variant="up" delay={i * 60}>
                <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-float transition-all duration-300 group">

                  {/* Image */}
                  <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0 overflow-hidden">
                    <Image
                      src={provider.image}
                      alt={`${provider.name} \u2014 ${provider.type} service in Arunachal Pradesh`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint="mountain road travel arunachal transport"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {/* Type badge */}
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className={cn("text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full backdrop-blur-sm", typeColors[provider.type] ?? "bg-primary/85 text-white")}>
                        {provider.type}
                      </span>
                      {provider.verified && (
                        <span className="bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1">
                          <ShieldCheck className="h-2.5 w-2.5" /> Verified
                        </span>
                      )}
                    </div>
                    {/* Rating on image (mobile) */}
                    <div className="absolute bottom-3 right-3 md:hidden bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1 shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                      <span className="text-sm font-bold">{provider.rating}</span>
                    </div>
                  </div>

                  {/* Details + CTA */}
                  <div className="flex-1 flex flex-col md:flex-row p-5 md:p-6 gap-5">

                    {/* Left: details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-1">
                        <h2 className="font-headline text-xl font-bold tracking-tight leading-tight">
                          {provider.name}
                        </h2>
                      </div>

                      {/* Rating row */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className={cn("h-3.5 w-3.5", idx < Math.round(provider.rating) ? "fill-secondary text-secondary" : "fill-muted text-muted-foreground/40")} />
                          ))}
                        </div>
                        <span className="text-sm font-bold hidden md:inline">{provider.rating}</span>
                        <span className="text-xs text-muted-foreground hidden md:inline">({provider.reviews} reviews)</span>
                        <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-lg border", availabilityColor[provider.availability] ?? "")}>
                          {provider.availability}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {provider.description}
                      </p>

                      {/* Vehicles chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {provider.vehicles.map((v) => (
                          <span key={v} className="text-xs bg-muted font-medium px-3 py-1.5 rounded-full text-muted-foreground">
                            {v}
                          </span>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[
                          { icon: FeatureIcon0, label: provider.features[0] },
                          { icon: FeatureIcon1, label: provider.features[1] },
                          { icon: FeatureIcon2, label: provider.features[2] },
                          { icon: FeatureIcon3, label: provider.features[3] },
                        ].map((f) => f.label ? (
                          <span key={f.label} className="flex items-center gap-1.5 bg-primary/5 border border-primary/15 text-xs font-medium px-3 py-1.5 rounded-full text-primary">
                            <f.icon className="h-3 w-3 shrink-0" />
                            {f.label}
                          </span>
                        ) : null)}
                      </div>

                      {/* Routes */}
                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{provider.routes.join(" \u00b7 ")}</span>
                      </div>
                    </div>

                    {/* Right: price + CTA */}
                    <div className="flex flex-row md:flex-col items-end justify-between shrink-0 md:min-w-[175px] border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 md:pl-5 gap-4 md:gap-0">
                      <div className="text-right">
                        <p className="text-[11px] text-muted-foreground mb-1">Starting from</p>
                        <div className="flex items-baseline gap-1 justify-end mb-0.5">
                          <span className="font-headline text-2xl font-bold text-primary">
                            &#x20B9;{provider.startingPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                        {provider.pricePerKm > 0 ? (
                          <p className="text-xs text-muted-foreground">
                            &#x20B9;{provider.pricePerKm} / km thereafter
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">per day (self-guided)</p>
                        )}
                        <div className="flex items-center gap-1 justify-end mt-2.5">
                          <span className="text-xs text-muted-foreground">Languages:</span>
                          <span className="text-xs font-medium text-foreground">
                            {provider.languages.slice(0, 2).join(", ")}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-auto md:w-full md:mt-4">
                        <a href={`tel:${provider.phone.replace(/\s/g, "")}`}>
                          <Button className="rounded-xl font-headline font-bold bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap text-sm px-5 md:w-full flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Call to Book
                          </Button>
                        </a>
                        <div className="text-center">
                          <p className="text-[11px] text-muted-foreground font-mono tracking-wide">{provider.phone}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            )
          })}

          {results.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <Bus className="h-14 w-14 mx-auto mb-4 text-primary/30" />
              <p className="font-headline text-2xl font-bold mb-2">No operators found</p>
              <p className="text-sm mb-6">Try adjusting your filters.</p>
              <Button variant="outline" className="rounded-full" onClick={() => { setActiveFilter("all"); setPriceRange("Any Budget") }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Why Travel With Us ─────────────────────────────────── */}
      <section className="bg-muted py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal variant="up">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
              Safe &amp; Reliable Travel in Arunachal
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Map, title: "GPS Tracked", desc: t.gpsDesc },
              { icon: ShieldCheck, title: "Fully Insured", desc: t.fullyInsuredDesc },
              { icon: Users, title: "Verified Drivers", desc: t.verifiedDriversDesc },
              { icon: Headphones, title: "24/7 Support", desc: "Emergency helpline active on all routes." },
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