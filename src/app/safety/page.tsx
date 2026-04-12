"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Phone, MapPin, ShieldAlert, HeartPulse, Building2, Search,
  AlertTriangle, Wifi, WifiOff, Thermometer, Wind, Zap,
  Mountain, Users, Info, ChevronDown, ChevronRight,
  Clock, Radio, Bookmark, ExternalLink, Check, Shield,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"

/* ── Data ──────────────────────────────────────────────── */
const emergencyHotlines = [
  { label: "Medical Emergency", number: "108", color: "bg-rose-500",     icon: HeartPulse },
  { label: "Police",            number: "100", color: "bg-blue-600",     icon: ShieldAlert },
  { label: "Disaster Mgmt",     number: "1070", color: "bg-amber-500",   icon: AlertTriangle },
  { label: "Women Helpline",    number: "1091", color: "bg-violet-500",  icon: Shield },
  { label: "Child Helpline",    number: "1098", color: "bg-teal-500",    icon: Users },
]

const hospitals = [
  { name: "TRIHMS Itanagar",          district: "Capital Region",    location: "Naharlagun",       contact: "0360-2350331", type: "Medical College", tier: "Tertiary" },
  { name: "Tawang District Hospital", district: "Tawang",            location: "Tawang Main Town", contact: "03794-222239", type: "Government",      tier: "District" },
  { name: "Heema Hospital",           district: "Capital Region",    location: "Itanagar",         contact: "0360-2211444", type: "Private",         tier: "Private" },
  { name: "District Hospital Ziro",   district: "Lower Subansiri",   location: "Hapoli, Ziro",     contact: "03788-224440", type: "Government",      tier: "District" },
  { name: "Pasighat Civil Hospital",  district: "East Siang",        location: "Pasighat Town",    contact: "0368-2222101", type: "Government",      tier: "District" },
  { name: "Bomdila District Hospital",district: "West Kameng",       location: "Bomdila",          contact: "03782-222356", type: "Government",      tier: "District" },
]

const policeStations = [
  { name: "Tawang Police Station",  location: "Near Monastery",       district: "Tawang",          contact: "100 / 03794-222236" },
  { name: "Itanagar Police Station",location: "Main City Center",     district: "Capital Region",  contact: "0360-2212351" },
  { name: "Ziro Police Station",    location: "Hapoli Town",          district: "Lower Subansiri", contact: "03788-224422" },
  { name: "Pasighat Police Station",location: "East Siang",          district: "East Siang",      contact: "0368-2222234" },
  { name: "Bomdila Police Station", location: "West Kameng District", district: "West Kameng",     contact: "03782-222200" },
]

const hazards = [
  {
    icon:  Mountain,
    title: "Altitude Sickness",
    desc:  "Areas above 3,000m (Tawang, Sela Pass) carry AMS risk. Ascend slowly, stay hydrated, descend immediately at symptoms.",
    color: "from-blue-500 to-cyan-500",
    bg:    "bg-blue-50",
    tip:   "Descend 500m at first sign of confusion or severe headache.",
  },
  {
    icon:  Wind,
    title: "Flash Floods",
    desc:  "Monsoon season (Jun–Sep) brings sudden river surges, especially along Siang, Kameng, and Lohit corridors.",
    color: "from-teal-500 to-emerald-500",
    bg:    "bg-teal-50",
    tip:   "Never camp on riverbeds. Check weather before river crossings.",
  },
  {
    icon:  Thermometer,
    title: "Hypothermia",
    desc:  "Night temperatures drop below 0°C in high-altitude zones. Pack thermal layers and waterproof shells at all times.",
    color: "from-violet-500 to-purple-500",
    bg:    "bg-violet-50",
    tip:   "Wet + wind at altitude kills faster than cold alone. Stay dry.",
  },
  {
    icon:  WifiOff,
    title: "No Connectivity",
    desc:  "Mobile signal is absent in most areas beyond district HQs. BSNL postpaid has widest coverage; satellite devices recommended.",
    color: "from-amber-500 to-orange-500",
    bg:    "bg-amber-50",
    tip:   "Download offline maps (Maps.me / OsmAnd) before entering remote zones.",
  },
  {
    icon:  Zap,
    title: "Landslides",
    desc:  "NH-13 and NH-415 experience frequent blockages after heavy rain. Build buffer days into itineraries.",
    color: "from-rose-500 to-red-500",
    bg:    "bg-rose-50",
    tip:   "Follow NDRF Arunachal Pradesh alerts and local police advisories.",
  },
  {
    icon:  Radio,
    title: "Remote Rescue",
    desc:  "Helicopter rescue from SDRF takes 4–12 hrs depending on weather. Basic first aid capability is essential.",
    color: "from-primary to-accent",
    bg:    "bg-primary/5",
    tip:   "Register your trek plan with the nearest police station before departure.",
  },
]

const safetyTips = [
  { icon: Bookmark, title: "Register Your Itinerary", desc: "Leave a full itinerary with your hotel, a local contact, and the nearest police station before heading to remote areas." },
  { icon: Shield,   title: "Carry Valid Permits",      desc: "ILP and any district-specific permits must be on you at all times. Keep digital and printed copies." },
  { icon: HeartPulse, title: "First Aid Kit Essentials", desc: "Diamox (altitude), ORS sachets, antiseptic, bandages, thermal blanket, and a whistle are non-negotiables." },
  { icon: Users,    title: "Travel in Groups",         desc: "Solo trekking is inadvisable in remote zones. Registered local guides with ATGBF certification are recommended." },
  { icon: Clock,    title: "Start Early",              desc: "Mountain weather deteriorates after midday. Complete significant ascents before 1 PM." },
  { icon: Info,     title: "Respect Local Advisories", desc: "Village elders and local guides often have real-time trail conditions that official sources lack. Always listen." },
]

const tierColors: Record<string, string> = {
  Tertiary: "bg-primary/10 text-primary",
  District: "bg-secondary/50 text-foreground",
  Private:  "bg-violet-100 text-violet-700",
}

/* ── Component ─────────────────────────────────────────── */
export default function SafetyPage() {
  const [search, setSearch]       = useState("")
  const [activeTab, setActiveTab] = useState<"hospitals" | "police">("hospitals")
  const [openFaq, setOpenFaq]     = useState<number | null>(null)

  const filteredHospitals = useMemo(() =>
    hospitals.filter(h =>
      `${h.name} ${h.district} ${h.location}`.toLowerCase().includes(search.toLowerCase())
    ), [search])

  const filteredPolice = useMemo(() =>
    policeStations.filter(p =>
      `${p.name} ${p.district} ${p.location}`.toLowerCase().includes(search.toLowerCase())
    ), [search])

  return (
    <main id="main-content" className="bg-background overflow-hidden">

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] pt-28 pb-40 flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&auto=format&q=80"
            alt="Mountain rescue helicopter over Himalayan terrain in Arunachal Pradesh"
            fill
            className="object-cover"
            data-ai-hint="helicopter mountain rescue himalayas aerial mist safety"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
          <div className="absolute inset-0 tribal-pattern opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-8">
            <ScrollReveal variant="left">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/20 border border-rose-400/40 rounded-full text-rose-300 text-[10px] font-bold tracking-[0.3em] uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                Emergency Ready · Offline Available
              </div>
            </ScrollReveal>

            <ScrollReveal variant="left" delay={100}>
              <h1 className="font-headline text-7xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85]">
                Safety &amp;<br />
                <span className="text-rose-400">Emergency</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="left" delay={200}>
              <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                Arunachal&apos;s remote terrain demands preparation. Find emergency contacts, mountain hazard guides, hospitals, and police stations — all offline-ready.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="left" delay={300}>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="tel:108"
                  className="inline-flex items-center gap-3 rounded-full bg-rose-500 px-8 py-4 font-bold text-white shadow-[0_8px_32px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(239,68,68,0.5)] transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  Call 108 — Medical
                </a>
                <a
                  href="tel:100"
                  className="inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 font-bold text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ShieldAlert className="h-4 w-4" />
                  Call 100 — Police
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Floating offline badge */}
        <motion.div
          className="absolute bottom-12 right-8 hidden lg:flex items-center gap-3 px-5 py-3 bg-amber-400/20 backdrop-blur-xl border border-amber-400/30 rounded-2xl shadow-xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <WifiOff className="h-5 w-5 text-amber-300" />
          <div>
            <p className="text-amber-200 text-xs font-bold uppercase tracking-wider">Save for Offline</p>
            <p className="text-amber-300/70 text-[10px]">Works without internet</p>
          </div>
        </motion.div>
      </section>

      {/* ── SOS Emergency Numbers ───────────────────────── */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <ScrollReveal>
          <div className="bg-stone-950 rounded-3xl p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <p className="text-rose-400 text-xs font-bold uppercase tracking-widest">SOS Hotlines · Active 24×7</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {emergencyHotlines.map((h) => {
                const Icon = h.icon
                return (
                  <a
                    key={h.number}
                    href={`tel:${h.number}`}
                    className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-full ${h.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-headline text-2xl font-bold text-white">{h.number}</p>
                      <p className="text-stone-400 text-[10px] font-medium mt-0.5">{h.label}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-stone-500 group-hover:text-primary transition-colors">
                      <Phone className="h-3 w-3" />
                      <span>Tap to call</span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Mountain Hazards ─────────────────────────────── */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Know Before You Go</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Mountain Hazards
                </h2>
                <p className="text-muted-foreground mt-4 text-lg max-w-xl">
                  Arunachal&apos;s terrain is breathtaking and unforgiving. Understand these six hazards before entering the hills.
                </p>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-sm font-semibold shrink-0">
                <AlertTriangle className="h-4 w-4" />
                Prepare accordingly
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hazards.map((hazard, i) => {
              const Icon = hazard.icon
              return (
                <ScrollReveal key={hazard.title} variant="up" delay={i * 80}>
                  <motion.div
                    className="organic-card ghost-border bg-surface overflow-hidden h-full group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={`h-1.5 w-full bg-gradient-to-r ${hazard.color}`} />
                    <div className="p-7">
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${hazard.color} mb-5 shadow-soft`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="font-headline text-xl font-bold text-foreground mb-2">{hazard.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{hazard.desc}</p>
                      <div className={`flex items-start gap-3 p-3 rounded-xl ${hazard.bg} border border-current/5`}>
                        <Check className="h-4 w-4 text-foreground/60 shrink-0 mt-0.5" />
                        <p className="text-xs font-semibold text-foreground/70 leading-relaxed">{hazard.tip}</p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Directory ─────────────────────────────────────── */}
      <section className="py-20 bg-surface-low">
        <div className="container mx-auto px-4">

          {/* Header + Search */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">District Directory</span>
                <h2 className="font-headline text-4xl font-bold text-foreground">Hospitals &amp; Police</h2>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search by name, district, location…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal>
            <div className="flex gap-2 mb-8">
              {(["hospitals", "police"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-soft"
                      : "bg-white border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {tab === "hospitals" ? <HeartPulse className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                  {tab === "hospitals" ? "Hospitals" : "Police Stations"}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Lists */}
          <AnimatePresence mode="wait">
            {activeTab === "hospitals" && (
              <motion.div
                key="hospitals"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {filteredHospitals.length === 0 && (
                  <p className="text-muted-foreground col-span-2 py-12 text-center">No hospitals matching &quot;{search}&quot;</p>
                )}
                {filteredHospitals.map((h, i) => (
                  <motion.div
                    key={h.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="organic-card ghost-border bg-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:shadow-float transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                        <HeartPulse className="h-6 w-6 text-rose-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-base text-foreground">{h.name}</h3>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${tierColors[h.tier]}`}>{h.tier}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {h.location} · {h.district}
                        </div>
                      </div>
                    </div>
                    <a
                      href={`tel:${h.contact.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose-200 text-rose-600 font-semibold text-sm hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-200 whitespace-nowrap shrink-0"
                    >
                      <Phone className="h-4 w-4" />
                      {h.contact}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "police" && (
              <motion.div
                key="police"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {filteredPolice.length === 0 && (
                  <p className="text-muted-foreground col-span-2 py-12 text-center">No stations matching &quot;{search}&quot;</p>
                )}
                {filteredPolice.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="organic-card ghost-border bg-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:shadow-float transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                        <ShieldAlert className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-base text-foreground">{p.name}</h3>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            24×7
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {p.location} · {p.district}
                        </div>
                      </div>
                    </div>
                    <a
                      href={`tel:${p.contact.split(" / ")[0]}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-200 text-blue-600 font-semibold text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 whitespace-nowrap shrink-0"
                    >
                      <Phone className="h-4 w-4" />
                      {p.contact}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Safety Tips Grid ──────────────────────────────── */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Mountain Wisdom</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
                Safe Travel Tips
              </h2>
              <p className="text-muted-foreground text-lg">
                Six practices that separate prepared travelers from those who need rescue.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyTips.map((tip, i) => {
              const Icon = tip.icon
              return (
                <ScrollReveal key={tip.title} variant="up" delay={i * 80}>
                  <motion.div
                    className="organic-card ghost-border bg-surface p-7 h-full group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-foreground mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Offline + External Resources Banner ──────────── */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="bg-primary rounded-[3rem] overflow-hidden relative shadow-[0_64px_128px_-32px_rgba(0,106,98,0.3)]">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&h=600&fit=crop&auto=format&q=70"
                  alt="Himalayan mountain trail at dusk in Arunachal Pradesh"
                  fill
                  className="object-cover opacity-15"
                  data-ai-hint="mountain trail dusk himalayas path trekker safety route"
                  sizes="100vw"
                />
              </div>

              <div className="relative z-10 p-10 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <WifiOff className="h-6 w-6 text-white/70" />
                    <span className="text-white/70 text-sm font-bold uppercase tracking-widest">Offline Ready</span>
                  </div>
                  <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Save This Page<br />Before You Trek
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                    Cell signal disappears minutes outside any district HQ. Bookmark this page and save it to your phone before entering remote zones.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => typeof window !== "undefined" && window.print()}
                      className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-8 py-4 font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm"
                    >
                      <Bookmark className="h-4 w-4" />
                      Save / Print Page
                    </button>
                    <a
                      href="https://www.arunachal.gov.in/tourism-and-safety"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 text-white px-8 py-4 font-bold hover:bg-white/10 transition-all duration-300 text-sm"
                    >
                      Govt. Safety Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Quick Reference Card */}
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-rose-500" />
                    </div>
                    <h4 className="font-headline text-xl font-bold text-foreground">Quick Reference</h4>
                  </div>
                  <div className="space-y-3">
                    {emergencyHotlines.map((h) => {
                      const Icon = h.icon
                      return (
                        <a
                          key={h.number}
                          href={`tel:${h.number}`}
                          className="flex items-center justify-between p-4 rounded-2xl border border-border/40 hover:bg-muted hover:border-primary/30 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${h.color} flex items-center justify-center`}>
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{h.label}</span>
                          </div>
                          <span className="font-headline text-xl font-bold text-foreground group-hover:text-primary transition-colors">{h.number}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 cta-gradient">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/30 rounded-full text-white text-xs font-bold tracking-widest uppercase mb-8">
              <Shield className="h-3.5 w-3.5" />
              Permit &amp; Safety Together
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Plan Your Journey?
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Before you head into the hills, make sure your permits are sorted and your safety plan is in place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/essentials"
                className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-bold text-primary shadow-[0_16px_48px_rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-glow transition-all duration-300 active:scale-95"
              >
                <ShieldAlert className="h-5 w-5" />
                Check Permit Requirements
              </Link>
              <Link
                href="/itinerary"
                className="inline-flex items-center gap-3 rounded-full border-2 border-white/30 px-10 py-5 text-base font-bold text-white hover:bg-white/10 transition-all duration-300"
              >
                Plan My Trip <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  )
}
