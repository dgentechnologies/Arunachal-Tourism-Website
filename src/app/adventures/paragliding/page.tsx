"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight, MapPin, Clock, Wind, Star, Shield, Users, Calendar,
  CheckCircle2, AlertCircle, FileText, Phone, Backpack, Heart,
  TrendingUp, Navigation
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"

const launchSites = [
  {
    name: "Tawang Ridge",
    location: "Tawang",
    altitude: "3,000 m",
    season: "Oct–Apr",
    level: "All Levels",
    levelColor: "bg-green-100 text-green-700",
    desc: "Launch from the ridge above Asia's largest monastery and soar over a valley dotted with prayer flags and ancient villages. The panoramic views of Gorichen and Kangto peaks are unparalleled.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "himalayan valley monastery paragliding",
    rating: 4.9,
    featured: true,
    tag: "Most Popular",
  },
  {
    name: "Mechuka Hill Site",
    location: "Shi-Yomi District",
    altitude: "2,200 m",
    season: "Oct–May",
    level: "Intermediate–Advanced",
    levelColor: "bg-orange-100 text-orange-700",
    desc: "One of the most remote paragliding sites in India. The Mechuka valley funnels powerful thermals off its surrounding peaks, rewarding experienced pilots with epic cross-country flights.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding remote himalaya valley",
    rating: 4.8,
    featured: true,
    tag: "Pro Site",
  },
  {
    name: "Ziro Valley Launch",
    location: "Lower Subansiri",
    altitude: "1,600 m",
    season: "Nov–Mar",
    level: "Beginner–Intermediate",
    levelColor: "bg-blue-100 text-blue-700",
    desc: "Float above the UNESCO heritage landscape of Ziro's pine-covered ridges and emerald rice terraces. Long, gentle thermals make this ideal for tandem flights and first-timers.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding rice fields valley",
    rating: 4.7,
    featured: false,
    tag: "Beginner Friendly",
  },
  {
    name: "Bomdila Escarpment",
    location: "West Kameng",
    altitude: "2,400 m",
    season: "Nov–Apr",
    level: "All Levels",
    levelColor: "bg-green-100 text-green-700",
    desc: "Bomdila's south-facing escarpment catches reliable afternoon thermals year-round. Tandem instructors here are certified and cater to curious first-timers and seasoned cross-country pilots alike.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding escarpment mountain town",
    rating: 4.5,
    featured: false,
    tag: "Year-round",
  },
  {
    name: "Dirang Valley Thermals",
    location: "West Kameng",
    altitude: "1,500 m",
    season: "Oct–Mar",
    level: "Intermediate",
    levelColor: "bg-yellow-100 text-yellow-700",
    desc: "A narrow river valley that creates powerful morning thermals, allowing altitude gains of over 1,500 m. Pilots regularly reach Sela Pass and back on a single flight.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding mountain valley thermal",
    rating: 4.6,
    featured: false,
    tag: "Thermal Expert",
  },
  {
    name: "Itanagar Heights",
    location: "Papum Pare",
    altitude: "400 m",
    season: "Year-round",
    level: "Beginner",
    levelColor: "bg-green-100 text-green-700",
    desc: "The most accessible launch site in Arunachal, just 20 minutes from the capital. Short training flights over forested hills make it the perfect introduction to paragliding.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding forested hills beginner",
    rating: 4.3,
    featured: false,
    tag: "Easy Access",
  },
]

const experiences = [
  {
    title: "Tandem Discovery",
    duration: "30–45 min",
    price: "From ₹3,500",
    level: "No experience needed",
    levelColor: "bg-green-100 text-green-700",
    desc: "Fly with a certified pilot strapped side-by-side. Ideal for first-timers wanting the full aerial experience without any training.",
    features: ["Full safety briefing", "Certified tandem pilot", "GoPro footage available", "Insurance included"],
    color: "from-emerald-500 to-teal-500",
    icon: "🪂",
  },
  {
    title: "Training Course",
    duration: "3–5 Days",
    price: "From ₹18,000",
    level: "Beginner",
    levelColor: "bg-blue-100 text-blue-700",
    desc: "A structured ground school and flight training program for those who want to earn their solo wings and fly independently.",
    features: ["APPI Level 1 certification", "Ground handling practice", "Theory & weather modules", "All gear provided"],
    color: "from-blue-500 to-cyan-500",
    icon: "🎓",
  },
  {
    title: "Cross-Country Expedition",
    duration: "Full Day",
    price: "From ₹8,000",
    level: "Intermediate–Advanced",
    levelColor: "bg-orange-100 text-orange-700",
    desc: "Multi-thermal routes covering 40–80 km over the Eastern Himalayan ridges. For licensed pilots chasing top-to-back adventures.",
    features: ["Route planning support", "Vehicle retrieve included", "Radio communication", "Emergency kit"],
    color: "from-orange-500 to-red-500",
    icon: "🏔️",
  },
]

export default function ParaglidingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden">
      {/* Animated sky-themed background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/3 -right-1/4 w-[900px] h-[900px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(64,224,208,0.4) 0%, rgba(0,106,98,0.2) 50%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.25, 1], x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-1/4 w-[700px] h-[700px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(0,106,98,0.35) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Floating cloud-like orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              width: `${120 + i * 60}px`,
              height: `${60 + i * 30}px`,
              background: "rgba(64,224,208,0.8)",
              left: `${15 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
            transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-6 pb-12">

        {/* ── HERO ── */}
        <motion.div
          className="min-h-screen flex flex-col justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 h-[55vw] min-h-[280px] max-h-[520px] md:h-[520px] md:max-h-[640px] lg:h-[640px] group">
            <motion.div className="absolute inset-0" whileHover={{ scale: 1.04 }} transition={{ duration: 0.7 }}>
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop&auto=format&q=80"
                alt="Paraglider soaring above the Eastern Himalayas in Arunachal Pradesh"
                fill
                className="object-cover"
                data-ai-hint="paragliding himalayan valley morning sky"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Drifting particle dots */}
            <div className="absolute inset-0 overflow-hidden">
              {[
                { left: "12%", top: "20%", dur: 4.2, delay: 0 },
                { left: "30%", top: "55%", dur: 3.6, delay: 0.8 },
                { left: "55%", top: "30%", dur: 5.1, delay: 0.3 },
                { left: "75%", top: "70%", dur: 3.9, delay: 1.2 },
                { left: "88%", top: "15%", dur: 4.7, delay: 0.6 },
                { left: "65%", top: "50%", dur: 3.3, delay: 1.8 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
                  style={{ left: p.left, top: p.top }}
                  animate={{ y: [0, -28, 0], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <span className="inline-block bg-[hsl(46,97%,60%)]/90 backdrop-blur-sm text-[hsl(0,5%,11%)] font-black text-xs uppercase tracking-widest mb-5 px-4 py-2 rounded-full">
                  Adventures · Paragliding
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline text-white leading-[1.05] mb-5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                Dance with the Clouds
              </motion.h1>
              <motion.p
                className="text-white/85 max-w-2xl text-base md:text-xl leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.6 }}
              >
                Soar on thermal currents above ancient monasteries, terraced valleys, and snow-draped Himalayan ridges — Arunachal from a bird&apos;s-eye view.
              </motion.p>
              <motion.div
                className="flex gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Link
                  href="/itinerary"
                  className="bg-[hsl(46,97%,60%)] text-[hsl(0,5%,11%)] px-7 py-3.5 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-lg"
                >
                  Book a Flight
                </Link>
                <Link
                  href="/essentials"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/25 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  Apply for ILP <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── STATS BAR ── */}
        <ScrollReveal as="section" variant="up" className="mb-20 min-h-screen flex flex-col justify-center">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-[1px]">
            <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "6+", label: "Launch Sites", icon: Navigation },
                  { value: "3,000 m", label: "Max Altitude", icon: TrendingUp },
                  { value: "Oct–Apr", label: "Best Season", icon: Calendar },
                  { value: "Tandem", label: "Always Available", icon: Users },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={i}
                      className="text-center group cursor-default"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <span className="block text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider mt-2 block">
                        {stat.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── EDITORIAL SPLIT ── */}
        <ScrollReveal as="section" variant="up" className="mb-24 min-h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-7">
              <motion.span
                className="inline-block text-xs font-black uppercase tracking-[0.2em] text-primary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                The Himalayan difference
              </motion.span>
              <motion.h2
                className="text-4xl md:text-5xl font-bold font-headline leading-tight text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                The Flight of the Eagles
              </motion.h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full" />
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Arunachal&apos;s topography is a tapestry of deep valleys and soaring ridges. In{" "}
                <span className="font-bold text-primary">Mechuka</span> and{" "}
                <span className="font-bold text-primary">Tawang</span>, the thermal conditions rival
                the world&apos;s finest gliding destinations, offering pilots a rhythmic dance with the
                Himalayan updrafts.
              </motion.p>
              <motion.p
                className="text-base text-muted-foreground leading-relaxed font-light"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Whether you are a seasoned solo pilot or a first-time adventurer seeking a tandem
                thrill, our circuits are designed to immerse you in the raw, untouched beauty of
                India&apos;s northeasternmost frontier.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3 pt-2"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {["Tandem Flights", "Solo Training", "Cross-Country", "Sunrise Slots"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-bold border border-primary/15"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                className="relative rounded-[2.5rem] rounded-tl-[0.5rem] overflow-hidden aspect-[4/5] shadow-[0_16px_60px_0_rgba(0,106,98,0.18)]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=1000&fit=crop&auto=format&q=80"
                  alt="Paraglider descending over a lush green valley in Arunachal Pradesh"
                  fill
                  className="object-cover"
                  data-ai-hint="paraglider valley green hills aerial"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Floating info card */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Wind className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Average Flight Window</p>
                      <p className="font-bold text-foreground">9 AM – 2 PM daily</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-52 h-52 bg-[hsl(46,97%,60%)]/20 rounded-full -z-10 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-accent/20 rounded-full -z-10 blur-xl" />
            </div>
          </div>
        </ScrollReveal>

        {/* ── LAUNCH SITES BENTO GRID ── */}
        <ScrollReveal as="section" variant="up" className="mb-24 min-h-screen flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Where you&apos;ll fly</span>
              <motion.h2
                className="text-3xl md:text-5xl font-bold font-headline mt-2 mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Legendary Launch Sites
              </motion.h2>
              <p className="text-muted-foreground max-w-lg">
                From high-altitude plateaus in Mechuka to the spiritual horizons of Tawang — discover where the earth meets the sky.
              </p>
            </div>
          </div>

          {/* Featured two + grid four */}
          <div className="space-y-5">
            {/* Top two (featured) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {launchSites.filter((s) => s.featured).map((site, idx) => (
                <motion.div
                  key={site.name}
                  className="group relative rounded-[2rem] overflow-hidden h-80 md:h-96 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Image
                    src={site.image}
                    alt={site.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={site.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="bg-[hsl(46,97%,60%)] text-[hsl(0,5%,11%)] text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {site.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-3xl font-bold font-headline mb-1">{site.name}</h3>
                    <p className="text-white/75 text-sm mb-4 line-clamp-2">{site.desc}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase">{site.altitude}</span>
                      <span className="bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase">{site.season}</span>
                      <span className="flex items-center gap-1 text-amber-300 text-xs font-bold">
                        <Star className="h-3.5 w-3.5 fill-current" /> {site.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom four (smaller) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {launchSites.filter((s) => !s.featured).map((site, idx) => (
                <motion.div
                  key={site.name}
                  className="group relative rounded-2xl overflow-hidden h-56 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredCard(idx + 10)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Image
                    src={site.image}
                    alt={site.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={site.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={hoveredCard === idx + 10 ? { x: "100%" } : { x: "-100%" }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${site.levelColor} text-[10px] font-bold`}>{site.level}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-headline mb-1">{site.name}</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-white/60 flex-shrink-0" />
                      <span className="text-xs text-white/70">{site.location}</span>
                      <Star className="h-3 w-3 fill-amber-300 text-amber-300 ml-auto flex-shrink-0" />
                      <span className="text-xs font-bold text-amber-300">{site.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── EXPERIENCE PACKAGES ── */}
        <ScrollReveal as="section" variant="up" className="mb-24 min-h-screen flex flex-col justify-center">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Choose your flight</span>
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline mt-2 mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Flight Experiences
            </motion.h2>
            <p className="text-muted-foreground">From a 30-minute tandem intro to a multi-day cross-country expedition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                onHoverStart={() => setHoveredExp(idx)}
                onHoverEnd={() => setHoveredExp(null)}
                whileHover={{ y: -6 }}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${exp.color} rounded-[2rem] opacity-0 group-hover:opacity-40 blur transition-opacity duration-500`} />

                <div className="relative bg-white rounded-[2rem] p-7 shadow-lg group-hover:shadow-2xl transition-shadow duration-500 h-full flex flex-col">
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-[2rem] bg-gradient-to-r ${exp.color}`} />

                  <div className="text-4xl mb-5">{exp.icon}</div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold font-headline">{exp.title}</h3>
                    <Badge className={`${exp.levelColor} text-xs font-semibold flex-shrink-0`}>{exp.level}</Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="text-primary font-bold text-sm">{exp.price}</div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">{exp.desc}</p>

                  <ul className="space-y-2 mb-6">
                    {exp.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={`/itinerary?activity=${encodeURIComponent(exp.title)}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
                    >
                      Book This Experience <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── SAFETY & GEAR ── */}
        <ScrollReveal as="section" variant="up" className="mb-24 min-h-screen flex flex-col justify-center">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Your safety first</span>
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline mt-2 mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Safety &amp; Gear
            </motion.h2>
            <p className="text-muted-foreground">We adhere to international paragliding standards — every flight is as secure as it is exhilarating.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Certified Pilots",
                items: [
                  "Minimum 500 hours Himalayan flight time",
                  "APPI / BHPA tandem instructor rating",
                  "Annual medical fitness clearance",
                  "Fluent in Hindi & English safety briefings",
                  "Emergency first-aid trained",
                ],
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Backpack,
                title: "Standard Equipment",
                items: [
                  "DHV/EN certified paragliders",
                  "Reserve parachute — mandatory on all flights",
                  "Impact-resistant helmets",
                  "Variometers & GPS units",
                  "Emergency radio communication",
                ],
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Heart,
                title: "Flyer Requirements",
                items: [
                  "Weight: 40 kg – 110 kg for tandem",
                  "Sturdy ankle-support footwear",
                  "Windproof layered clothing",
                  "No active heart or respiratory conditions",
                  "Pregnant women not permitted to fly",
                ],
                color: "from-red-500 to-pink-500",
              },
              {
                icon: Wind,
                title: "Weather Protocols",
                items: [
                  "Real-time wind & visibility monitoring",
                  "No flights above 35 km/h surface wind",
                  "Flights cancelled in rain or cloud base below 500 m",
                  "Dedicated weather-hold waiting area at sites",
                  "Full refund on weather cancellations",
                ],
                color: "from-sky-500 to-blue-500",
              },
              {
                icon: FileText,
                title: "Permit Requirements",
                items: [
                  "Inner Line Permit (ILP) for Indian nationals",
                  "Protected Area Permit (PAP) for foreigners",
                  "Valid government-issued photo ID on person",
                  "Travel insurance strongly recommended",
                  "Minor consent form if under 18",
                ],
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: Phone,
                title: "Emergency Procedures",
                items: [
                  "District emergency: 112 (all Arunachal)",
                  "HADR rescue coordination via Army HQ Tezpur",
                  "Satellite phone on all remote site flights",
                  "GPS track shared with base camp in real time",
                  "On-site first-aid kit at every launch site",
                ],
                color: "from-purple-500 to-violet-500",
              },
            ].map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative h-full bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r ${card.color}`} />
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.color} flex-shrink-0`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold font-headline">{card.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {card.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollReveal>

        {/* ── YOUR FLIGHT, STEP BY STEP ── */}
        <ScrollReveal as="section" variant="up" className="mb-24 min-h-screen flex flex-col justify-center">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-[1px]">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14">
              <div className="text-center mb-12">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">What happens on the day</span>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold font-headline text-primary mt-2 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Your Flight, Step by Step
                </motion.h2>
                <p className="text-muted-foreground">A seamless experience from arrival to landing</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    step: "01",
                    title: "Safety Briefing",
                    time: "30 min before flight",
                    desc: "Your pilot walks you through the harness, launch run, landing posture, and emergency signals. No experience required for tandem.",
                    icon: AlertCircle,
                    color: "text-red-500",
                  },
                  {
                    step: "02",
                    title: "Gear Check & Harnessing",
                    time: "15 min before flight",
                    desc: "Full equipment inspection by a second certified staff member. Helmet and harness are fitted and tested for your body weight.",
                    icon: Shield,
                    color: "text-blue-500",
                  },
                  {
                    step: "03",
                    title: "Launch Window Assessment",
                    time: "5 min before flight",
                    desc: "Pilot reads thermals and surface winds at the launch site. If conditions are not ideal, you wait — safety is never rushed.",
                    icon: Wind,
                    color: "text-cyan-500",
                  },
                  {
                    step: "04",
                    title: "Take Off & Flight",
                    time: "30–90 min in the air",
                    desc: "Run forward, the wing inflates — and you&apos;re airborne. Your pilot handles all controls while you absorb the Himalayan panorama.",
                    icon: TrendingUp,
                    color: "text-emerald-500",
                  },
                  {
                    step: "05",
                    title: "Controlled Landing",
                    time: "Touchdown at LZ",
                    desc: "The pilot guides you to the designated landing zone. Legs forward, a gentle flare — and you land on your feet.",
                    icon: Navigation,
                    color: "text-primary",
                  },
                  {
                    step: "06",
                    title: "Debrief & Certificate",
                    time: "After landing",
                    desc: "Receive your digital flight certificate and GoPro footage (if booked). Share your altitude stats — impressed your friends.",
                    icon: Star,
                    color: "text-amber-500",
                  },
                ].map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={idx}
                      className="flex gap-5 p-5 rounded-2xl bg-white/60 hover:bg-white transition-colors duration-300"
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.5 }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center">
                          <Icon className={`h-5 w-5 ${step.color}`} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-black text-primary/40 tracking-widest">{step.step}</span>
                          <span className="text-xs text-muted-foreground">{step.time}</span>
                        </div>
                        <h4 className="font-bold font-headline mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── CTA ── */}
        <ScrollReveal as="section" variant="up" className="min-h-screen flex flex-col justify-center">
          <div className="relative rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-primary" />
            {/* Decorative wave lines */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M0,100 Q100,50 200,100 T400,100" fill="none" stroke="white" strokeWidth="1" />
                <path d="M0,120 Q100,70 200,120 T400,120" fill="none" stroke="white" strokeWidth="1" />
                <path d="M0,80 Q100,30 200,80 T400,80" fill="none" stroke="white" strokeWidth="1" />
                <path d="M0,140 Q100,90 200,140 T400,140" fill="none" stroke="white" strokeWidth="1" />
              </svg>
            </div>
            <div className="relative z-10 py-20 px-8 md:px-20 text-center">
              <motion.span
                className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[hsl(176,68%,56%)] mb-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Adventure Peak Season: Oct – Apr
              </motion.span>
              <motion.h2
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline text-white leading-tight tracking-tighter mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Ready to Soar?
              </motion.h2>
              <motion.p
                className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Secure your Inner Line Permit and book a certified pilot for your next Himalayan adventure.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/itinerary"
                  className="bg-[hsl(46,97%,60%)] text-[hsl(0,5%,11%)] px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  Book a Guide Now
                </Link>
                <Link
                  href="/essentials"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/25 px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  Apply for ILP <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/adventures"
                  className="text-white/70 hover:text-white font-semibold flex items-center gap-2 transition-colors text-sm"
                >
                  All Adventures <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}

