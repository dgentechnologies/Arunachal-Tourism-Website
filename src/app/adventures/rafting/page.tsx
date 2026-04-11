"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight, MapPin, Clock, Waves, Star, Users, Calendar, TrendingUp,
  Backpack, Heart, Shield, Droplets, Sun, Wind, CheckCircle2, AlertCircle,
  FileText, Phone, MapPinned, Thermometer, Anchor, LifeBuoy
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
      {/* Animated background gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Hero Banner with Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ScrollReveal variant="up" className="relative rounded-[3rem] overflow-hidden mb-14 h-[500px] group">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
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
                <span className="inline-block bg-primary-container/90 backdrop-blur-sm text-primary-foreground font-bold text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full">
                  Adventures · River Rafting
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                River Rafting in Arunachal
              </motion.h1>

              <motion.p
                className="text-white/90 max-w-2xl text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Conquer Grade II to Grade V rapids on ancient Himalayan rivers that have carved the landscape for millennia.
              </motion.p>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Enhanced Stats Section */}
        <ScrollReveal variant="up" className="mb-16">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "6+", label: "Raftable Rivers", icon: Waves },
                  { value: "Grade V", label: "Max Difficulty", icon: TrendingUp },
                  { value: "Oct–Apr", label: "Best Season", icon: Calendar },
                  { value: "2–7 Days", label: "Trip Duration", icon: Clock },
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

        {/* Section Header */}
        <ScrollReveal variant="up" className="mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Rivers to Explore
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              From beginner floats to expert expeditions
            </motion.p>
          </div>
        </ScrollReveal>
        {/* Enhanced Rivers Grid with Premium Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {rivers.map((river, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className="relative overflow-hidden rounded-3xl group h-full bg-white"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

                <div className="relative bg-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500 h-full">
                  {/* Image Section with Overlay */}
                  <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={river.image}
                        alt={river.name}
                        fill
                        className="object-cover"
                        data-ai-hint={river.imageHint}
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={hoveredCard === idx ? { x: "100%" } : { x: "-100%" }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Floating badge */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-gray-900">{river.rating}</span>
                      </div>
                    </motion.div>

                    {/* River name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl md:text-2xl font-bold font-headline drop-shadow-lg">
                        {river.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col gap-4">
                    {/* Location and Quick Info */}
                    <div className="flex items-center flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{river.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">{river.duration}</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Waves className="h-4 w-4 text-primary" />
                        <span className="font-medium">{river.season}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">{river.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{river.bestSeason}</span>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div>
                      <Badge className={`${river.gradeColor} font-semibold px-3 py-1`}>
                        {river.grade}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                      {river.desc}
                    </p>

                    {/* CTA Button */}
                    <motion.div
                      className="mt-2"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/itinerary?river=${encodeURIComponent(river.name)}`}
                        className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link"
                      >
                        <span>Book River Trip</span>
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Essential Preparations Section */}
        <ScrollReveal variant="up" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Essential Preparations
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything you need to know before embarking on your rafting adventure
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: LifeBuoy,
                title: "Safety Equipment",
                items: [
                  "ISI-approved life jackets provided",
                  "Safety helmets for all participants",
                  "First-aid kit with every group",
                  "Safety kayaker for Grade IV+ rapids",
                  "Throw bags and rescue equipment",
                  "VHF radios for communication"
                ],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Heart,
                title: "Physical Fitness",
                items: [
                  "Basic swimming skills recommended",
                  "Moderate fitness level required",
                  "No prior rafting experience needed",
                  "Age limit: 12-60 years (varies by grade)",
                  "Medical fitness certificate for Grade IV+",
                  "Pregnant women should avoid rafting"
                ],
                color: "from-red-500 to-pink-500"
              },
              {
                icon: FileText,
                title: "Documents Required",
                items: [
                  "Valid government-issued ID proof",
                  "Inner Line Permit (ILP) for Indians",
                  "Protected Area Permit (PAP) for foreigners",
                  "Medical certificate for high-grade rapids",
                  "Travel insurance (highly recommended)",
                  "Emergency contact details"
                ],
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: Sun,
                title: "Weather & Season",
                items: [
                  "Best season: October to April",
                  "Water levels ideal during these months",
                  "Avoid monsoon season (Jun-Sep)",
                  "Carry sunscreen (SPF 50+) and sunglasses",
                  "Pack waterproof bags for belongings",
                  "Temperature ranges: 10°C - 25°C"
                ],
                color: "from-yellow-500 to-amber-500"
              },
              {
                icon: Shield,
                title: "Safety Guidelines",
                items: [
                  "Follow guide instructions at all times",
                  "Never raft solo or without certified guides",
                  "Inform family/friends of your itinerary",
                  "Avoid alcohol 24 hours before rafting",
                  "Listen to safety briefing carefully",
                  "Know hand signals and rescue procedures"
                ],
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Backpack,
                title: "What to Bring",
                items: [
                  "Quick-dry clothes and swimwear",
                  "Secure footwear (no flip-flops)",
                  "Waterproof bag for valuables",
                  "Extra set of dry clothes",
                  "Towel and personal toiletries",
                  "Water bottle and energy snacks"
                ],
                color: "from-purple-500 to-violet-500"
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
                  whileHover={{ y: -4 }}
                >
                  <div className="relative h-full bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r ${prep.color}`} />

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${prep.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold font-headline text-gray-900">
                        {prep.title}
                      </h3>
                    </div>

                    <ul className="space-y-2.5">
                      {prep.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
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

        {/* Important Information Section */}
        <ScrollReveal variant="up" className="mb-20">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold font-headline text-primary mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Before You Go
                </motion.h2>
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Critical information for a safe and enjoyable rafting experience
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: AlertCircle,
                    title: "Rapid Grade Classification",
                    content: "Grade I-II: Easy, suitable for beginners. Grade III-IV: Intermediate to advanced, requires good fitness. Grade V: Expert only, serious commitment required. Always listen to your guide's assessment.",
                    color: "text-red-600"
                  },
                  {
                    icon: Phone,
                    title: "Emergency Contacts",
                    content: "Save local emergency numbers before departure. Limited mobile connectivity on river sections. Satellite phones available with guides. Emergency evacuation protocols in place for all trips.",
                    color: "text-blue-600"
                  },
                  {
                    icon: MapPinned,
                    title: "Route Planning",
                    content: "Study your route thoroughly before departure. Share detailed itinerary with emergency contacts. Check river conditions with local authorities. Weather can affect water levels and rapid intensity.",
                    color: "text-green-600"
                  },
                  {
                    icon: Thermometer,
                    title: "Water Temperature",
                    content: "Water temperature ranges from 10-18°C. Wetsuits recommended for Oct-Mar. Hypothermia risk in cold water—stay in boat. Dry quickly after rafting to avoid temperature shock.",
                    color: "text-purple-600"
                  }
                ].map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.5 }}
                      className="flex gap-4 p-6 rounded-2xl bg-white/80 hover:bg-white transition-colors duration-300"
                    >
                      <div className={`${info.color} mt-1`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-headline text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {info.content}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Quick Tips */}
              <motion.div
                className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-bold font-headline text-primary mb-4 flex items-center gap-2">
                  <Wind className="h-5 w-5" />
                  Pro Tips from River Guides
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Book trips at least 1 week in advance during peak season",
                    "Carry minimal valuables—leave them at camp/hotel",
                    "Wear contacts instead of glasses if possible",
                    "Apply waterproof sunscreen generously",
                    "Stay hydrated but don't overeat before rafting",
                    "Trust your guide—they know the river intimately"
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* Enhanced CTA Banner */}
        <ScrollReveal variant="up">
          <motion.div
            className="relative overflow-hidden rounded-[3rem] group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />

            {/* Content */}
            <div className="relative py-20 px-8 md:px-16 flex flex-col items-center text-center space-y-6">
              {/* Decorative elements */}
              <motion.div
                className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-headline text-white max-w-3xl">
                  Ride the Himalayan Rivers
                </h2>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Our certified rafting guides prioritise your safety without compromising the thrill. All equipment provided.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/itinerary"
                    className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all inline-flex items-center gap-2 group"
                  >
                    <span>Book a Rafting Trip</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/adventures"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 px-8 py-4 rounded-2xl font-bold text-white transition-all inline-flex items-center gap-2"
                  >
                    All Adventures
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

