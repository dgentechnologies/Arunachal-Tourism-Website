"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight, MapPin, Clock, Waves, Star, Users, Calendar, TrendingUp,
  Backpack, Heart, Shield, Droplets, Sun, CheckCircle2, AlertCircle,
  FileText, Phone, MapPinned, Thermometer, LifeBuoy
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"

const rivers = [
  {
    name: "Siang River",
    location: "East Siang",
    duration: "3–5 Days",
    grade: "Grade IV–V",
    gradeColor: "bg-red-100 text-red-700",
    season: "Oct–Mar",
    desc: "The crown jewel of Arunachal rafting. The Siang thunders through deep gorges carved by the Tibetan plateau, delivering relentless rapids and jaw-dropping canyon scenery.",
    image: "https://picsum.photos/seed/arunachal-mountain-river/800/600",
    imageHint: "river rafting white water rapids",
    rating: 4.9,
    groupSize: "8-12",
    bestSeason: "Oct-Mar",
  },
  {
    name: "Kameng River",
    location: "West Kameng",
    duration: "2–3 Days",
    grade: "Grade III–IV",
    gradeColor: "bg-orange-100 text-orange-700",
    season: "Nov–Feb",
    desc: "Perfect for intermediate paddlers. The Kameng flows past elephant grasslands and dense subtropical forests before widening into serene flat-water stretches.",
    image: "https://picsum.photos/seed/arunachal-mountain-river/800/600",
    imageHint: "river kayak nature scenic",
    rating: 4.7,
    groupSize: "6-10",
    bestSeason: "Nov-Feb",
  },
  {
    name: "Subansiri River",
    location: "Lower Subansiri",
    duration: "4–6 Days",
    grade: "Grade IV",
    gradeColor: "bg-orange-100 text-orange-700",
    season: "Oct–Mar",
    desc: "Multi-day expeditions on the 'Gold River' combine heart-pumping rapids with riverside camping in near-pristine wilderness frequented by elephants.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "serene mountain river camping",
    rating: 4.6,
    groupSize: "8-12",
    bestSeason: "Oct-Mar",
  },
  {
    name: "Lohit River",
    location: "Lohit District",
    duration: "3–4 Days",
    grade: "Grade II–III",
    gradeColor: "bg-yellow-100 text-yellow-700",
    season: "Nov–Apr",
    desc: "A gentler river with spectacular scenery — ideal for families or beginners wanting their first Himalayan rafting experience without sacrificing the grandeur.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "green valley river gentle",
    rating: 4.4,
    groupSize: "4-8",
    bestSeason: "Nov-Apr",
  },
  {
    name: "Dibang River",
    location: "Dibang Valley",
    duration: "5–7 Days",
    grade: "Grade IV–V",
    gradeColor: "bg-red-100 text-red-700",
    season: "Oct–Feb",
    desc: "One of the most remote rafting runs in India, the Dibang requires experienced paddlers and rewards them with untouched wilderness and rare wildlife sightings.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "remote wilderness mountain river",
    rating: 4.8,
    groupSize: "8-12",
    bestSeason: "Oct-Feb",
  },
  {
    name: "Tirap River",
    location: "Tirap District",
    duration: "2 Days",
    grade: "Grade II",
    gradeColor: "bg-green-100 text-green-700",
    season: "Year-round",
    desc: "Calm and welcoming, the Tirap offers scenic float trips through dense jungle dotted with Wancho tribal villages — a cultural and natural treat.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "jungle river calm float",
    rating: 4.3,
    groupSize: "4-8",
    bestSeason: "Year-round",
  },
]

export default function RaftingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden">
      {/* Animated water-themed background with flowing waves */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Flowing water layers */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[400px] opacity-10"
          style={{
            background: "linear-gradient(180deg, rgba(6,182,212,0.4) 0%, rgba(14,165,233,0.2) 50%, transparent 100%)",
          }}
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[300px] opacity-15"
          style={{
            background: "linear-gradient(0deg, rgba(59,130,246,0.3) 0%, rgba(96,165,250,0.2) 50%, transparent 100%)",
          }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Bubble effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(147,197,253,0.6) 0%, rgba(59,130,246,0.3) 70%, transparent 100%)",
              left: `${10 + i * 12}%`,
              bottom: `-${Math.random() * 20}%`,
            }}
            animate={{
              y: [0, -1000],
              x: [0, Math.sin(i) * 50, 0],
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-6 pb-12">
        {/* Enhanced Hero Banner with Wave Effects */}
        <motion.div
          className="min-h-screen flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ScrollReveal variant="up" className="relative rounded-[2.5rem] overflow-hidden mb-14 h-[450px] group">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="https://picsum.photos/seed/arunachal-mountain-river/1600/900"
                alt="River Rafting in Arunachal Pradesh"
                fill
                className="object-cover"
                data-ai-hint="white water river rafting himalayas"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-cyan-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />

            {/* Animated wave overlays */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-32 bottom-0"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(59,130,246,${0.1 - i * 0.03}), transparent)`,
                    transform: `translateY(${i * 40}px)`,
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 8 + i * 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 2,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="inline-block bg-cyan-600/90 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full border border-cyan-400/30">
                  <Waves className="inline h-3 w-3 mr-2 -mt-0.5" />
                  Adventures · River Rafting
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline text-white mb-4 drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Ride the Wild Rivers
              </motion.h1>

              <motion.p
                className="text-cyan-50/95 max-w-2xl text-base md:text-lg leading-relaxed drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Navigate powerful Himalayan rapids where crystal-clear waters carve through ancient gorges, creating the ultimate white-water adventure.
              </motion.p>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Unique Water-Flow Stats Section */}
        <ScrollReveal as="section" variant="up" className="mb-16 min-h-screen flex flex-col justify-center">
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10 p-1">
            <div className="bg-gradient-to-br from-blue-50/90 via-cyan-50/80 to-white/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "6+", label: "Epic Rivers", icon: Waves, color: "from-cyan-500 to-blue-600" },
                  { value: "Grade V", label: "Top Challenge", icon: TrendingUp, color: "from-blue-600 to-indigo-600" },
                  { value: "Oct–Apr", label: "Prime Season", icon: Calendar, color: "from-indigo-600 to-purple-600" },
                  { value: "2–7 Days", label: "Trip Length", icon: Clock, color: "from-purple-600 to-pink-600" },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={i}
                      className="text-center group cursor-default relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.6, type: "spring" }}
                    >
                      {/* Ripple effect on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-3 shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <div className="relative z-10">
                        <span className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
                          {stat.value}
                        </span>
                        <span className="text-xs md:text-sm text-gray-600 font-bold uppercase tracking-widest mt-2 block">
                          {stat.label}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Rivers Section */}
        <section className="min-h-screen flex flex-col justify-center">
        <ScrollReveal variant="up" className="mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Rivers Waiting to Be Conquered
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              From gentle flows to raging rapids — find your perfect water adventure
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Unique Horizontal River Cards with Flow Design */}
        <div className="space-y-8 mb-20">
          {rivers.map((river, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className={`relative overflow-hidden rounded-[2rem] group bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500 ${
                  idx % 2 === 0 ? "md:pr-4" : "md:pl-4"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Flowing water effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)",
                  }}
                  animate={hoveredCard === idx ? { x: ["-100%", "100%"] } : {}}
                  transition={{ duration: 1.5, ease: "linear" }}
                />

                <div className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 p-6`}>
                  {/* Image Section */}
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-[280px] overflow-hidden rounded-2xl flex-shrink-0">
                    <Image
                      src={river.image}
                      alt={river.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      data-ai-hint={river.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />

                    {/* Grade Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${river.gradeColor} font-bold px-4 py-2 text-sm shadow-lg backdrop-blur-sm`}>
                        {river.grade}
                      </Badge>
                    </div>

                    {/* Rating Badge */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3, type: "spring" }}
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-900">{river.rating}</span>
                      </div>
                    </motion.div>

                    {/* River Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-2xl md:text-3xl font-bold font-headline drop-shadow-2xl">
                        {river.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-between py-2">
                    {/* Location & Duration */}
                    <div>
                      <div className="flex items-center flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-cyan-700">
                          <MapPin className="h-5 w-5" />
                          <span className="font-semibold text-base">{river.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-700">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold text-base">{river.duration}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-base leading-relaxed mb-4">
                        {river.desc}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-cyan-50 rounded-lg px-3 py-2">
                          <Waves className="h-4 w-4 text-cyan-600" />
                          <span className="font-medium">{river.season}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{river.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-indigo-50 rounded-lg px-3 py-2">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                          <span className="font-medium">{river.bestSeason}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/itinerary?river=${encodeURIComponent(river.name)}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg group/btn"
                      >
                        <span>Book This River</span>
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        </section>

        {/* Water-Themed Preparations Section */}
        <ScrollReveal as="section" variant="up" className="mb-20 min-h-screen flex flex-col justify-center">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Gear Up for the Rapids
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything you need to know before you ride the wild waters
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: LifeBuoy,
                title: "Safety First",
                items: [
                  "Coast Guard approved life jackets",
                  "Impact-resistant helmets included",
                  "First-aid equipped support kayak",
                  "Safety kayaker for Grade IV+ rapids",
                  "Rescue throw bags on every raft",
                  "Two-way radios for emergencies"
                ],
                color: "from-cyan-500 to-blue-600"
              },
              {
                icon: Heart,
                title: "Fitness Check",
                items: [
                  "Comfortable swimming ability required",
                  "Moderate physical fitness sufficient",
                  "First-timers welcome (Grade I-III)",
                  "Age range: 12-60 years typically",
                  "Medical clearance for Grade IV+",
                  "No rafting for pregnant women"
                ],
                color: "from-rose-500 to-pink-600"
              },
              {
                icon: FileText,
                title: "Documentation",
                items: [
                  "Photo ID (Passport/Aadhar/License)",
                  "Inner Line Permit for Indian citizens",
                  "PAP required for foreign nationals",
                  "Medical fitness cert for advanced trips",
                  "Travel insurance strongly advised",
                  "Emergency contact information"
                ],
                color: "from-orange-500 to-amber-600"
              },
              {
                icon: Sun,
                title: "Best Times",
                items: [
                  "October to April: Peak season",
                  "Water levels perfect for rafting",
                  "Skip monsoon months (Jun-Sep)",
                  "High SPF sunscreen mandatory",
                  "Waterproof bags for electronics",
                  "Temperature: 10°C to 25°C"
                ],
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Safety Rules",
                items: [
                  "Listen to your river guide always",
                  "Professional guides mandatory",
                  "Share itinerary with loved ones",
                  "Zero alcohol 24hrs before trip",
                  "Attend mandatory safety briefing",
                  "Learn emergency hand signals"
                ],
                color: "from-emerald-500 to-teal-600"
              },
              {
                icon: Backpack,
                title: "Pack List",
                items: [
                  "Quick-dry shorts and shirt",
                  "Water shoes with ankle support",
                  "Sealed waterproof dry bag",
                  "Change of warm, dry clothes",
                  "Towel and toiletries",
                  "Reusable water bottle & snacks"
                ],
                color: "from-violet-500 to-purple-600"
              }
            ].map((prep, idx) => {
              const Icon = prep.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <div className="relative h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className={`absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r ${prep.color}`} />

                    <div className="flex items-center gap-3 mb-4 mt-2">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${prep.color} shadow-md`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold font-headline text-gray-900">
                        {prep.title}
                      </h3>
                    </div>

                    <ul className="space-y-2.5">
                      {prep.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Rapids Safety Guide */}
        <ScrollReveal as="section" variant="up" className="mb-20 min-h-screen flex flex-col justify-center">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-1">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 md:p-12">
              <div className="text-center mb-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold font-headline bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Know Before You Flow
                </motion.h2>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Critical safety information for your white-water adventure
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: AlertCircle,
                    title: "Rapid Grades Explained",
                    content: "Grade I-II: Easy flows, perfect for families. Grade III-IV: Technical rapids, strong paddlers needed. Grade V: Extreme challenges for experts only. Your guide will brief you on each rapid ahead.",
                    color: "text-rose-600",
                    bg: "bg-rose-50"
                  },
                  {
                    icon: Phone,
                    title: "Emergency Protocol",
                    content: "Emergency numbers saved in every guide's satellite phone. Limited cell coverage on rivers. Rescue kayaks positioned at difficult sections. Medical evacuation plan ready for all expeditions.",
                    color: "text-blue-600",
                    bg: "bg-blue-50"
                  },
                  {
                    icon: MapPinned,
                    title: "River Conditions",
                    content: "Check weather forecast 48hrs before trip. Water levels vary with season and rainfall. Some rapids change character daily. Local authorities monitor all river routes. Trips may be rescheduled for safety.",
                    color: "text-teal-600",
                    bg: "bg-teal-50"
                  },
                  {
                    icon: Thermometer,
                    title: "Cold Water Safety",
                    content: "Himalayan rivers stay cold year-round (10-18°C). Wetsuits provided October through March. Hypothermia is a real risk—stay in raft. Change into dry, warm clothes immediately after. Hot beverages served post-trip.",
                    color: "text-violet-600",
                    bg: "bg-violet-50"
                  }
                ].map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className={`flex gap-4 p-6 rounded-xl ${info.bg} border border-white shadow-sm hover:shadow-md transition-all duration-300`}
                    >
                      <div className={`${info.color} mt-1 flex-shrink-0`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-headline text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {info.content}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* River Guide Tips */}
              <motion.div
                className="mt-8 p-6 rounded-xl bg-gradient-to-br from-cyan-100/70 via-blue-100/60 to-indigo-100/70 border border-cyan-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-bold font-headline text-cyan-800 mb-4 flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Expert River Guide Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Reserve early—peak months book out fast",
                    "Minimize jewelry and valuables on river",
                    "Secure eyewear with strap (contacts better)",
                    "Reef-safe waterproof sunscreen only",
                    "Light meal 2hrs before—not right before",
                    "Your guide knows every rock—trust them"
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-cyan-700 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* Unique Water-Themed CTA Banner */}
        <ScrollReveal as="section" variant="up" className="min-h-screen flex flex-col justify-center">
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated flowing water background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700" />

            {/* Animated water ripples */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    background: `radial-gradient(ellipse at ${30 + i * 20}% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.8,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative py-20 px-8 md:px-16 flex flex-col items-center text-center space-y-6">
              {/* Floating water drops */}
              <motion.div
                className="absolute top-8 left-12 w-16 h-16 opacity-20"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Droplets className="w-full h-full text-white" />
              </motion.div>
              <motion.div
                className="absolute bottom-8 right-12 w-20 h-20 opacity-20"
                animate={{
                  y: [0, 15, 0],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Waves className="w-full h-full text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-headline text-white max-w-3xl drop-shadow-lg">
                  Ready to Ride the Rapids?
                </h2>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-cyan-50 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Join our certified river guides for an adrenaline-pumping journey through pristine Himalayan waters. All safety gear included.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/itinerary"
                    className="bg-white text-cyan-700 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all inline-flex items-center gap-2 group shadow-xl"
                  >
                    <span>Book Your Adventure</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/adventures"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/40 px-8 py-4 rounded-2xl font-bold text-white transition-all inline-flex items-center gap-2 shadow-lg"
                  >
                    Explore More Adventures
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  )
}

