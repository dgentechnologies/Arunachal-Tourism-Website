"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  Plane,
  Train,
  Car,
  Globe,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Info,
  Navigation,
  Bus,
  AlertTriangle,
  ExternalLink,
  Flag,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

// ─── Data ────────────────────────────────────────────────────────────────────

const airports = [
  {
    code: "HGI",
    name: "Donyi Polo Airport",
    city: "Itanagar (Hollongi)",
    type: "Direct — Inside Arunachal",
    distance: "—",
    airlines: ["IndiGo", "Air India"],
    routes: ["Delhi (DEL)", "Kolkata (CCU)", "Guwahati (GAU)"],
    note: "Newest airport in Arunachal Pradesh, opened 2022. Best option for reaching Itanagar directly.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&auto=format&q=80",
    imageHint: "airport runway mountains northeast india",
    highlight: true,
  },
  {
    code: "GAU",
    name: "Lokpriya Gopinath Bordoloi Airport",
    city: "Guwahati, Assam",
    type: "Hub — 430 km from Itanagar",
    distance: "~7–8 hrs by road",
    airlines: ["IndiGo", "Air India", "SpiceJet", "Vistara"],
    routes: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad"],
    note: "Largest hub for Northeast India. Most international and domestic travelers connect here before entering Arunachal Pradesh.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop&auto=format&q=80",
    imageHint: "guwahati airport assam northeast india",
    highlight: false,
  },
  {
    code: "DIB",
    name: "Mohanbari Airport",
    city: "Dibrugarh, Assam",
    type: "Nearest to Eastern AP — 155 km",
    distance: "~3–4 hrs to Pasighat",
    airlines: ["IndiGo", "Air India"],
    routes: ["Delhi (DEL)", "Kolkata (CCU)"],
    note: "Ideal for travelers heading to Pasighat, Roing, or the Dibang Valley circuit.",
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&h=500&fit=crop&auto=format&q=80",
    imageHint: "small airport runway assam tea gardens",
    highlight: false,
  },
  {
    code: "LDA",
    name: "Lilabari Airport",
    city: "North Lakhimpur, Assam",
    type: "Gateway to Arunachal — 59 km",
    distance: "~1.5 hrs to Naharlagun",
    airlines: ["IndiGo"],
    routes: ["Kolkata (CCU)", "Guwahati (GAU)"],
    note: "Closest airport to Itanagar/Naharlagun for those not flying into Hollongi directly.",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&h=500&fit=crop&auto=format&q=80",
    imageHint: "small regional airport northeast india hills",
    highlight: false,
  },
  {
    code: "TEZ",
    name: "Salonibari Airport",
    city: "Tezpur, Assam",
    type: "Western Circuit Gateway — 52 km",
    distance: "~1.5 hrs to Bhalukpong",
    airlines: ["IndiGo"],
    routes: ["Kolkata (CCU)", "Delhi (DEL)"],
    note: "Best starting point for the Tawang–Bomdila western circuit via the Bhalukpong ILP checkpoint.",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=500&fit=crop&auto=format&q=80",
    imageHint: "tezpur assam green hills small airport",
    highlight: false,
  },
]

const trainRoutes = [
  {
    station: "Naharlagun Railway Station",
    code: "NHL",
    location: "5 km from Itanagar",
    type: "Direct Entry",
    trains: [
      { name: "Arunachal Express", from: "New Delhi (NDLS)", duration: "~37 hrs", days: "Tue, Fri" },
      { name: "Rajdhani Express (connection via Guwahati)", from: "New Delhi (NDLS)", duration: "~17 hrs to Guwahati", days: "Daily" },
      { name: "Intercity from Guwahati", from: "Guwahati (GHY)", duration: "~6 hrs", days: "Daily" },
    ],
    note: "The only railway station inside Arunachal Pradesh. Directly connected to New Delhi via Arunachal Express.",
  },
  {
    station: "Dekargaon / Tezpur",
    code: "DKGN",
    location: "Assam — Gateway to Tawang",
    type: "Via Bhalukpong Checkpoint",
    trains: [
      { name: "Multiple Express trains", from: "Guwahati (GHY)", duration: "~3.5 hrs", days: "Daily" },
      { name: "Kamrup Express", from: "New Delhi (NDLS)", duration: "~36 hrs", days: "Mon, Thu" },
    ],
    note: "Depart from here for the Bhalukpong–Bomdila–Tawang road journey into western Arunachal.",
  },
  {
    station: "Dibrugarh Railway Station",
    code: "DBRG",
    location: "Assam — Eastern AP Gateway",
    type: "Via Pasighat / Roing",
    trains: [
      { name: "Rajdhani Express", from: "New Delhi (NDLS)", duration: "~33 hrs", days: "Tue, Fri, Sun" },
      { name: "Avadh Assam Express", from: "New Delhi (NDLS)", duration: "~46 hrs", days: "Wed" },
    ],
    note: "Hub for eastern Arunachal. Continue onward by road to Pasighat (155 km) or Roing.",
  },
]

const roadRoutes = [
  {
    from: "Guwahati",
    to: "Itanagar",
    via: "NH-415",
    distance: "430 km",
    duration: "7–8 hours",
    modes: ["Private Car", "APST Bus", "Shared Sumo"],
    checkpoints: ["Bhalukpong (western) or Naharlagun"],
    tips: "Depart early morning to avoid afternoon mountain fog. Road conditions on NH-415 are generally good.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&auto=format&q=80",
    imageHint: "mountain highway northeast india winding road",
  },
  {
    from: "Tezpur (Assam)",
    to: "Tawang",
    via: "NH-13 via Bhalukpong, Bomdila, Sela Pass",
    distance: "315 km",
    duration: "10–12 hours",
    modes: ["Private 4×4", "Shared Sumo"],
    checkpoints: ["Bhalukpong ILP Checkpoint"],
    tips: "Sela Pass (4,170 m) may be snowbound Nov–Mar. Check road status before departure. A 4×4 is strongly recommended.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop&auto=format&q=80",
    imageHint: "sela pass snow mountain road tawang arunachal",
  },
  {
    from: "Dibrugarh (Assam)",
    to: "Pasighat",
    via: "NH-37 / State Highway",
    distance: "155 km",
    duration: "3.5–4.5 hours",
    modes: ["Private Car", "Shared Taxi"],
    checkpoints: ["Pasighat Entry Gate"],
    tips: "Smooth road via Saikhowa Ghat/Bogibeel Bridge. Best route for eastern Arunachal and Siang circuit.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=450&fit=crop&auto=format&q=80",
    imageHint: "river valley road northeast india jungle highway",
  },
  {
    from: "Kolkata",
    to: "Itanagar",
    via: "NH-27 via Siliguri, Guwahati",
    distance: "~1,250 km",
    duration: "24–28 hours (2 days recommended)",
    modes: ["Private Car"],
    checkpoints: ["Naharlagun / Lakhimpur entry"],
    tips: "A multi-day road trip. Break the journey at Siliguri or Guwahati. Ideal for overland adventurers.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&auto=format&q=80",
    imageHint: "highway road trip northeast india hills",
  },
]

const internationalRoutes = [
  {
    continent: "Europe & Americas",
    gateway: "Delhi (IGI) — Indira Gandhi International",
    airlines: ["Air India", "British Airways", "Lufthansa", "Emirates (via Dubai)", "Air France"],
    nextStep: "Fly Delhi → Guwahati or Delhi → Hollongi (Itanagar) direct",
    duration: "Guwahati in ~3 hrs from Delhi",
    tip: "Delhi has the most international connections and the only direct flight to Hollongi Airport.",
    icon: Globe,
  },
  {
    continent: "Southeast Asia & East Asia",
    gateway: "Kolkata (NSCBI) — Netaji Subhas Chandra Bose",
    airlines: ["IndiGo", "Thai Airways", "Singapore Airlines (connections)", "Biman Bangladesh"],
    nextStep: "Fly Kolkata → Guwahati or Kolkata → Hollongi direct",
    duration: "Guwahati in ~1 hr from Kolkata",
    tip: "Closest major international airport to Arunachal Pradesh. Many Southeast Asian carriers connect here.",
    icon: Plane,
  },
  {
    continent: "Middle East & Central Asia",
    gateway: "Guwahati (GAU) via connection",
    airlines: ["Air India (via Delhi)", "IndiGo (via Kolkata or Delhi)", "Emirates + IndiGo combo"],
    nextStep: "Connect to Guwahati, then drive or fly to Arunachal",
    duration: "~3–5 hrs total connection time",
    tip: "No direct international services to Guwahati from the Middle East currently. Connect via Delhi or Kolkata.",
    icon: Navigation,
  },
  {
    continent: "Bhutan, Nepal & Bangladesh",
    gateway: "Guwahati or Bagdogra (IXB)",
    airlines: ["Druk Air (via Paro, Bhutan)", "Buddha Air (via Kathmandu)", "Biman Bangladesh"],
    nextStep: "Train or road to Guwahati → Onward to Arunachal by road",
    duration: "Road/rail 4–8 hrs from Guwahati",
    tip: "Nearest international gateways from neighboring countries. Overland entry into Arunachal only via designated checkpoints.",
    icon: Flag,
  },
]

const checkpoints = [
  {
    name: "Bhalukpong",
    circuit: "Western — Tawang, Bomdila, Dirang",
    base: "Near Tezpur, Assam",
    km: "52 km from Tezpur",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop&auto=format&q=80",
    imageHint: "mountain valley gate checkpoint northeast india",
  },
  {
    name: "Naharlagun / Banderdewa",
    circuit: "Capital — Itanagar, Ziro, Papum Pare",
    base: "Rail & Road hub",
    km: "Rail terminus",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&auto=format&q=80",
    imageHint: "railway station hills northeast india",
  },
  {
    name: "Pasighat",
    circuit: "Siang — Pasighat, Mechuka, Tuting",
    base: "Near Dibrugarh, Assam",
    km: "155 km from Dibrugarh",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format&q=80",
    imageHint: "river valley pasighat arunachal siang",
  },
  {
    name: "Roing (Rukmini Nagar)",
    circuit: "Dibang — Roing, Anini, Mayudia",
    base: "Via Sadiya, Assam",
    km: "~80 km from Sadiya",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&auto=format&q=80",
    imageHint: "dibang valley hills river roing arunachal",
  },
]

const travelTabs = ["By Air", "By Train", "By Road", "International"] as const
type TravelTab = (typeof travelTabs)[number]

// ─── Component ───────────────────────────────────────────────────────────────

export default function GettingHerePage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<TravelTab>("By Air")

  const tabIcons: Record<TravelTab, React.ElementType> = {
    "By Air": Plane,
    "By Train": Train,
    "By Road": Car,
    International: Globe,
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop&auto=format&q=80"
          alt="Winding mountain road through the Eastern Himalayas leading to Arunachal Pradesh"
          fill
          className="object-cover"
          priority
          data-ai-hint="winding mountain road eastern himalayas northeast india"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative container mx-auto px-4 pb-14 pt-28">
          <ScrollReveal>
            <Badge className="mb-4 bg-secondary text-secondary-foreground font-semibold tracking-wide">
              Plan Your Journey
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
              {t.gettingHerePageTitle}
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl">
              {t.gettingHerePageSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { label: "Nearest Airport", value: "Hollongi (HGI)", sub: "Inside Arunachal" },
              { label: "Nearest Rail", value: "Naharlagun", sub: "Direct from Delhi" },
              { label: "Road from Guwahati", value: "430 km", sub: "~7–8 hours" },
              { label: "Entry Checkpoints", value: "15+", sub: "Across all circuits" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-headline font-bold text-secondary">{stat.value}</div>
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-white/60">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ILP Notice ── */}
      <section className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="container mx-auto px-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Permit Required:</span> All non-resident Indians and foreign nationals must carry a valid{" "}
            <strong>Inner Line Permit (ILP)</strong> or <strong>Protected Area Permit (PAP)</strong> before entering Arunachal Pradesh through any checkpoint.{" "}
            <Link href="/essentials" className="underline underline-offset-2 font-medium hover:text-amber-900">
              Apply here →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Mode Tabs ── */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-[20px] border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
            {travelTabs.map((tab) => {
              const Icon = tabIcons[tab]
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-label={`Show ${tab} travel options`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-soft"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── By Air ── */}
      {activeTab === "By Air" && (
        <section className="py-16 container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Reaching by Air ✈️</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Arunachal Pradesh now has its own airport — Donyi Polo (Hollongi). For other circuits, fly into one of the
                nearby Assam airports and continue by road.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {airports.map((airport, i) => (
              <ScrollReveal key={airport.code} variant={i % 2 === 0 ? "up" : "scale"}>
                <div className={`organic-card ghost-border overflow-hidden flex flex-col h-full ${airport.highlight ? "ring-2 ring-primary" : ""}`}>
                  {airport.highlight && (
                    <div className="bg-primary text-white text-xs font-semibold text-center py-1.5 tracking-wider uppercase">
                      ★ Recommended — Direct Entry
                    </div>
                  )}
                  <div className="relative h-40 shrink-0">
                    <Image
                      src={airport.image}
                      alt={`${airport.name} — ${airport.city}`}
                      fill
                      className="object-cover"
                      data-ai-hint={airport.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="font-headline text-2xl font-bold text-white">{airport.code}</span>
                      <Badge className="ml-2 bg-secondary text-secondary-foreground text-xs">{airport.type}</Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div>
                      <h3 className="font-headline font-bold text-foreground text-lg">{airport.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {airport.city}
                      </p>
                    </div>
                    {airport.distance !== "—" && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {airport.distance} to Arunachal
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">Airlines</p>
                      <div className="flex flex-wrap gap-1">
                        {airport.airlines.map((a) => (
                          <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">Routes from</p>
                      <div className="flex flex-wrap gap-1">
                        {airport.routes.map((r) => (
                          <span key={r} className="text-xs bg-muted px-2 py-0.5 rounded-full text-foreground/70">{r}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-auto pt-2 border-t border-border">{airport.note}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Air tips */}
          <ScrollReveal>
            <div className="mt-12 bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="font-headline text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Air Travel Tips
              </h3>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-foreground/80">
                {[
                  "Book flights to Hollongi (HGI) 4–6 weeks in advance — seats fill fast in peak season (Oct–Apr).",
                  "Guwahati (GAU) has the most daily connections and is the safest backup if Hollongi flights are unavailable.",
                  "Helicopter services HNLS to remote areas (Mechuka, Tuting) are operated by Pawan Hans — book directly.",
                  "Pre-arrange ground transport from the airport before landing as taxis may be limited at smaller airports.",
                  "Download offline maps (Google Maps / Maps.me) before flying — connectivity is limited in many areas.",
                  "Airport to permit checkpoint: Carry your ILP printout — checks begin right at the state border, not in airports.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ── By Train ── */}
      {activeTab === "By Train" && (
        <section className="py-16 container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Reaching by Train 🚂</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Arunachal Pradesh has one railway station — Naharlagun — with a direct train from New Delhi. For other
                circuits, arrive at an Assam railway hub and continue by road.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {trainRoutes.map((route, i) => (
              <ScrollReveal key={route.station} variant={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                <div className="organic-card ghost-border p-6 flex flex-col gap-5 h-full">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                      <Train className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-foreground leading-tight">{route.station}</h3>
                      <p className="text-xs text-primary font-medium mt-0.5">{route.code}</p>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {route.location}
                      </p>
                    </div>
                  </div>

                  <Badge variant="secondary" className="w-fit">{route.type}</Badge>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">Key Trains</p>
                    {route.trains.map((train) => (
                      <div key={train.name} className="bg-muted rounded-lg p-3 space-y-1">
                        <p className="text-sm font-semibold text-foreground">{train.name}</p>
                        <p className="text-xs text-muted-foreground">From: {train.from}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {train.duration}
                          </span>
                          <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">{train.days}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground pt-2 border-t border-border mt-auto">{route.note}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Train map visual */}
          <ScrollReveal>
            <div className="mt-12 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=400&fit=crop&auto=format&q=80"
                alt="Mountain railway through the Eastern Himalayas connecting Assam to Arunachal Pradesh"
                width={1400}
                height={400}
                className="object-cover w-full"
                data-ai-hint="railway train northeast india mountains scenery"
              />
            </div>
          </ScrollReveal>

          {/* Train tips */}
          <ScrollReveal>
            <div className="mt-10 bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="font-headline text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Train Travel Tips
              </h3>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-foreground/80">
                {[
                  "Book Naharlagun-bound trains 45-60 days in advance on IRCTC — quota fills early especially in winter.",
                  "Arunachal Express (12423/12424) is the only direct Delhi–Naharlagun service. Check latest schedule on IRCTC.",
                  "Rajdhani Express to Guwahati + onward Shatabdi or Intercity to Naharlagun is a faster alternative.",
                  "Book a car pickup in advance at Naharlagun station — auto-rickshaws are limited for long-distance travel.",
                  "From Guwahati station, APST buses run to Itanagar (Naharlagun). Journey ~7 hrs, departs early morning.",
                  "Timetables and platforms can change — verify train number and platform at the station on travel day.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ── By Road ── */}
      {activeTab === "By Road" && (
        <section className="py-16 container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Reaching by Road 🚗🚌</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Road travel is the most scenic way to experience Arunachal Pradesh. All routes pass through magnificent
                mountain landscapes. Hire a 4×4 or book APST buses for the full experience.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {roadRoutes.map((route, i) => (
              <ScrollReveal key={route.from + route.to} variant={i % 2 === 0 ? "left" : "right"}>
                <div className="organic-card ghost-border overflow-hidden flex flex-col h-full">
                  <div className="relative h-48">
                    <Image
                      src={route.image}
                      alt={`Road from ${route.from} to ${route.to} via ${route.via}`}
                      fill
                      className="object-cover"
                      data-ai-hint={route.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{route.from}</p>
                        <p className="font-headline font-bold text-white text-lg flex items-center gap-1">
                          <ArrowRight className="w-4 h-4 text-secondary" />
                          {route.to}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-secondary font-bold text-xl">{route.distance}</p>
                        <p className="text-white/70 text-xs">{route.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                      <Navigation className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Via {route.via}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {route.modes.map((m) => (
                        <Badge key={m} variant="secondary" className="text-xs gap-1">
                          {m.includes("Bus") ? <Bus className="w-3 h-3" /> : <Car className="w-3 h-3" />}
                          {m}
                        </Badge>
                      ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                      <p className="text-xs font-semibold text-amber-800 mb-0.5">Checkpoint</p>
                      <p className="text-xs text-amber-700">{route.checkpoints.join(", ")}</p>
                    </div>

                    <p className="text-sm text-muted-foreground mt-auto pt-3 border-t border-border">
                      💡 {route.tips}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* APST buses callout */}
          <ScrollReveal>
            <div className="mt-12 organic-card ghost-border p-6 bg-secondary/10">
              <div className="flex items-start gap-4">
                <div className="bg-secondary rounded-xl p-3 shrink-0">
                  <Bus className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-foreground mb-2">APST — State Bus Service</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Arunachal Pradesh State Transport (APST) operates affordable bus services connecting Guwahati,
                    Naharlagun, Itanagar, Ziro, Along, Pasighat, and more. Buses depart from Inter-State Bus Terminal (ISBT)
                    Guwahati and Naharlagun Bus Stand.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    {[
                      { route: "Guwahati → Itanagar", time: "Dep: 6:00 AM", dur: "~7–8 hrs" },
                      { route: "Itanagar → Ziro", time: "Dep: 7:00 AM", dur: "~5–6 hrs" },
                      { route: "Guwahati → Pasighat", time: "Dep: 5:30 AM", dur: "~8–9 hrs" },
                    ].map((bus) => (
                      <div key={bus.route} className="bg-background rounded-lg p-3 ghost-border">
                        <p className="font-semibold text-foreground text-xs">{bus.route}</p>
                        <p className="text-muted-foreground text-xs">{bus.time} · {bus.dur}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    * Times are indicative. Verify current schedules at Guwahati ISBT or Naharlagun Bus Stand directly.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Road tips */}
          <ScrollReveal>
            <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="font-headline text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Road Travel Tips
              </h3>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-foreground/80">
                {[
                  "Always hire a 4×4 (Bolero, Thar, or Sumo) for Tawang, Mechuka, and high-altitude circuits.",
                  "Mountain roads may close due to landslides during monsoon (Jun–Sep). Check BRO or NHIDCL alerts.",
                  "Fuel stations are sparse — carry a spare fuel can on remote circuits like Mechuka or Anini.",
                  "Night driving is strongly discouraged on mountain roads. Plan for daylight travel only.",
                  "Carry printed ILP at Bhalukpong, Pasighat, and other ILP chheckposts — digital copy may not be accepted.",
                  "Book transport in advance via verified local operators. See our Transport page for curated options.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ── International ── */}
      {activeTab === "International" && (
        <section className="py-16 container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
                Reaching from Abroad 🌍
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Arunachal Pradesh does not have direct international flights. All international travelers connect through
                major Indian hubs — primarily Delhi or Kolkata — before flying or driving to Arunachal.
              </p>
            </div>
          </ScrollReveal>

          {/* Route cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {internationalRoutes.map((route, i) => {
              const Icon = route.icon
              return (
                <ScrollReveal key={route.continent} variant={i % 2 === 0 ? "left" : "right"}>
                  <div className="organic-card ghost-border p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{route.continent}</p>
                        <h3 className="font-headline font-bold text-foreground leading-tight">{route.gateway}</h3>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">Carriers</p>
                      <div className="flex flex-wrap gap-1.5">
                        {route.airlines.map((a) => (
                          <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted rounded-xl p-3 space-y-1">
                      <p className="text-xs font-semibold text-foreground">Onward to Arunachal</p>
                      <p className="text-sm text-muted-foreground">{route.nextStep}</p>
                      <p className="text-xs text-primary font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {route.duration}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground pt-3 border-t border-border">
                      💡 {route.tip}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* PAP for foreigners */}
          <ScrollReveal>
            <div className="mt-12 organic-card ghost-border overflow-hidden">
              <div className="cta-gradient p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-white/20 text-white border-white/30">Foreign Nationals</Badge>
                    <h3 className="font-headline text-2xl font-bold text-white mb-2">
                      Protected Area Permit (PAP) Required
                    </h3>
                    <p className="text-white/80 text-sm">
                      All foreign nationals visiting Arunachal Pradesh require a Protected Area Permit (PAP).
                      This permit is separate from the Indian visa and must be obtained before entry.
                      Groups of 2+ can apply through registered travel agents. Individual applications available
                      for select countries.
                    </p>
                    <ul className="mt-4 space-y-1.5 text-white/80 text-sm">
                      {[
                        "Apply via a recognized travel agency registered with Ministry of Tourism",
                        "Processing time: 5–10 working days",
                        "Fee: USD 50 per person",
                        "Validity: 30 days (extendable for specific research/study purposes)",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-secondary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/essentials/foreign"
                    className="shrink-0 inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-full hover:bg-secondary/90 transition-colors"
                  >
                    PAP Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* International tips */}
          <ScrollReveal>
            <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="font-headline text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Tips for International Travelers
              </h3>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-foreground/80">
                {[
                  "Obtain your PAP before flying to India — processing takes 5–10 days from a registered agent.",
                  "Most international visitors fly via Delhi (IGI) which has the most onward connections to Hollongi or Guwahati.",
                  "Best months to visit: October–April (dry season, clear mountain views, festival season).",
                  "Consider a package tour through a registered Arunachal tour operator — they handle PAP and all logistics.",
                  "Nepal, Bhutan, and Bangladesh nationals follow separate bilateral permit protocols — check with Indian consulate.",
                  "Carry travel insurance covering remote/high-altitude trekking; helicopter evacuation cover strongly recommended.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ── Entry Checkpoints (always visible) ── */}
      <section className="py-16 bg-surface-low">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <Badge className="mb-3 bg-primary/10 text-primary">ILP Checkpoints</Badge>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Entry Gates of Arunachal</h2>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                Your Inner Line Permit is verified at these checkpoints. Have your ILP printed and ready before reaching them.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {checkpoints.map((cp, i) => (
              <ScrollReveal key={cp.name} variant={i % 2 === 0 ? "up" : "scale"}>
                <div className="organic-card ghost-border overflow-hidden">
                  <div className="relative h-36">
                    <Image
                      src={cp.image}
                      alt={`${cp.name} — entry checkpoint to Arunachal Pradesh`}
                      fill
                      className="object-cover"
                      data-ai-hint={cp.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <div className="absolute bottom-2 left-3">
                      <p className="font-headline font-bold text-white text-base">{cp.name}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <Badge variant="secondary" className="text-xs">{cp.circuit}</Badge>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {cp.base}
                    </p>
                    <p className="text-sm font-medium text-foreground">{cp.km}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 container mx-auto px-4">
        <ScrollReveal>
          <div className="cta-gradient organic-card p-8 md:p-12 text-center text-white">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">Ready to Begin Your Journey?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Now that you know how to get here, take the next steps — apply for your permit, book your stay, and plan
              your itinerary.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/essentials"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-full hover:bg-secondary/90 transition-colors"
              >
                Apply for Permit <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href="/itinerary"
                className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition-colors"
              >
                Plan Itinerary <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/transport"
                className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition-colors"
              >
                Book Transport <Car className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
