"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight, MapPin, Clock, Fish, Star, Users, Calendar,
  Backpack, Heart, Shield, Droplets, Sun, Wind, CheckCircle2, AlertCircle,
  FileText, Phone, MapPinned, Thermometer, Waves, Target
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"

const anglingSpots = [
  {
    name: "Siang River — Pasighat Stretch",
    location: "East Siang",
    season: "Oct–Mar",
    target: "Golden Mahseer",
    targetColor: "bg-amber-100 text-amber-700",
    permit: "Required",
    desc: "The Siang's wide, boulder-strewn runs below Pasighat are legendary for massive Golden Mahseer. The catch-and-release ethos keeps the fish population thriving.",
    image: "https://picsum.photos/seed/arunachal-mountain-river/800/600",
    imageHint: "river fishing mountain",
    rating: 4.9,
    groupSize: "2-4",
    difficulty: "Moderate",
  },
  {
    name: "Kameng River — Bhalukpong",
    location: "West Kameng",
    season: "Nov–Feb",
    target: "Chocolate Mahseer",
    targetColor: "bg-orange-100 text-orange-700",
    permit: "Required",
    desc: "Bhalukpong's crystal-clear stretches running through Pakhui Tiger Reserve offer a chance at the elusive Chocolate Mahseer in a truly wild setting.",
    image: "https://picsum.photos/seed/arunachal-mountain-river/800/600",
    imageHint: "clear river fishing",
    rating: 4.8,
    groupSize: "2-4",
    difficulty: "Moderate",
  },
  {
    name: "Subansiri River",
    location: "Lower Subansiri",
    season: "Oct–Apr",
    target: "Tor Putitora",
    targetColor: "bg-green-100 text-green-700",
    permit: "Required",
    desc: "The 'Gold River' is one of the finest sport-fishing destinations in Asia. Remote camps, pristine water, and trophy-sized Tor Putitora make this a bucket-list experience.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "pristine river camp fishing",
    rating: 4.7,
    groupSize: "2-6",
    difficulty: "Challenging",
  },
  {
    name: "Lohit River",
    location: "Lohit District",
    season: "Year-round",
    target: "Mahseer & Barbs",
    targetColor: "bg-blue-100 text-blue-700",
    permit: "Required",
    desc: "The swift, gin-clear waters of the Lohit hold healthy populations of Mahseer and large barbs. Its accessibility makes it ideal for first-time anglers visiting Arunachal.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "swift river angling",
    rating: 4.5,
    groupSize: "2-4",
    difficulty: "Easy",
  },
  {
    name: "Dibang River — Roing",
    location: "Lower Dibang Valley",
    season: "Nov–Mar",
    target: "Snow Trout",
    targetColor: "bg-cyan-100 text-cyan-700",
    permit: "Required",
    desc: "Roing sits at the confluence of the Dibang system. Fly-fishers come for the challenging Snow Trout in fast-flowing, oxygen-rich mountain water.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "mountain river fly fishing",
    rating: 4.6,
    groupSize: "2-4",
    difficulty: "Moderate",
  },
  {
    name: "Tawang Chu River",
    location: "Tawang",
    season: "May–Sep",
    target: "Snow Trout",
    targetColor: "bg-indigo-100 text-indigo-700",
    permit: "Required",
    desc: "High-altitude fly-fishing in the shadow of Tawang Monastery. The Tawang Chu's cold, fast currents harbour Snow Trout and the scenery is utterly unforgettable.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "high altitude river fishing monastery",
    rating: 4.4,
    groupSize: "2-4",
    difficulty: "Challenging",
  },
]

export default function AnglingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden">
      {/* Animated water-themed background with ripples */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Water ripples */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[500px] opacity-10"
          style={{
            background: "linear-gradient(180deg, rgba(34,139,34,0.3) 0%, rgba(16,185,129,0.2) 50%, transparent 100%)",
          }}
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[400px] opacity-12"
          style={{
            background: "linear-gradient(0deg, rgba(16,185,129,0.25) 0%, rgba(5,150,105,0.15) 50%, transparent 100%)",
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Floating fish silhouettes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              x: [0, Math.sin(i) * 100, 0],
              y: [0, Math.cos(i) * 50, 0],
              rotate: [0, 15, 0, -15, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Fish className="w-12 h-12 text-emerald-600" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 pt-6 pb-12">
        {/* Enhanced Hero Banner */}
        <motion.div
          className="min-h-screen flex flex-col justify-center"
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
                alt="Angling in Arunachal Pradesh"
                fill
                className="object-cover"
                data-ai-hint="river fishing nature pristine"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-green-900/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-transparent to-transparent" />

            {/* Floating water droplets */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-emerald-400/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
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
                <span className="inline-block bg-emerald-600/90 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full border border-emerald-400/30">
                  <Fish className="inline h-3 w-3 mr-2 -mt-0.5" />
                  Adventures · Angling
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline text-white mb-4 drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Angling in Arunachal
              </motion.h1>

              <motion.p
                className="text-emerald-50/95 max-w-2xl text-base md:text-lg leading-relaxed drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                World-class sport fishing in biodiverse rivers where the Golden Mahseer reigns supreme — all within a strict catch-and-release ethos.
              </motion.p>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Enhanced Stats Section */}
        <ScrollReveal as="section" variant="up" className="mb-16 min-h-screen flex flex-col justify-center">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 p-1">
            <div className="bg-gradient-to-br from-green-50/90 via-emerald-50/80 to-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "10+", label: "Fishing Zones", icon: MapPin, color: "from-emerald-500 to-green-600" },
                  { value: "5+", label: "Species of Mahseer", icon: Fish, color: "from-green-600 to-teal-600" },
                  { value: "Oct–Apr", label: "Prime Season", icon: Calendar, color: "from-teal-600 to-cyan-600" },
                  { value: "C&R", label: "Catch & Release", icon: Heart, color: "from-cyan-600 to-blue-600" },
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
                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)`,
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
                        <span className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
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

        {/* Fishing Spots Section */}
        <section className="min-h-screen flex flex-col justify-center">
        <ScrollReveal variant="up" className="mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Prime Fishing Locations
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Each river has its own character and its own prize species
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Enhanced Fishing Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {anglingSpots.map((spot, idx) => (
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

                <div className="relative bg-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500 h-full">
                  {/* Image Section */}
                  <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={spot.image}
                        alt={spot.name}
                        fill
                        className="object-cover"
                        data-ai-hint={spot.imageHint}
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

                    {/* Rating badge */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-gray-900">{spot.rating}</span>
                      </div>
                    </motion.div>

                    {/* Spot name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl md:text-2xl font-bold font-headline drop-shadow-lg">
                        {spot.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col gap-4">
                    {/* Location & Season */}
                    <div className="flex items-center flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{spot.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{spot.season}</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{spot.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Target className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{spot.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{spot.permit}</span>
                      </div>
                    </div>

                    {/* Target Species Badge */}
                    <div>
                      <Badge className={`${spot.targetColor} font-semibold px-3 py-1`}>
                        Target: {spot.target}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                      {spot.desc}
                    </p>

                    {/* CTA Button */}
                    <motion.div
                      className="mt-2"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/itinerary?spot=${encodeURIComponent(spot.name)}`}
                        className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm group/link"
                      >
                        <span>Plan Your Trip</span>
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        </section>

        {/* Essential Preparations Section */}
        <ScrollReveal as="section" variant="up" className="mb-20 min-h-screen flex flex-col justify-center">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Essential Angling Guide
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything you need to know before casting your line
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Backpack,
                title: "Fishing Gear",
                items: [
                  "Fly rod (6-8 weight for mountain streams)",
                  "Spinning rod for Mahseer (medium-heavy)",
                  "Assorted flies and lures suitable for area",
                  "Landing net (catch & release friendly)",
                  "Waders and wading boots (felt sole)",
                  "Polarized sunglasses to spot fish"
                ],
                color: "from-emerald-500 to-green-600"
              },
              {
                icon: Heart,
                title: "Conservation Ethics",
                items: [
                  "Strict catch-and-release policy mandatory",
                  "Barbless hooks only — reduces fish injury",
                  "Handle fish gently with wet hands",
                  "Quick photo then release immediately",
                  "Respect breeding seasons and closures",
                  "Leave no trace — pack out all waste"
                ],
                color: "from-green-600 to-teal-600"
              },
              {
                icon: FileText,
                title: "Permits & Licenses",
                items: [
                  "Valid fishing permit required for all rivers",
                  "Inner Line Permit (ILP) for Indian citizens",
                  "Protected Area Permit (PAP) for foreigners",
                  "Apply 2-3 weeks before your trip",
                  "Local guide mandatory in most zones",
                  "Carry ID proof and permit copies"
                ],
                color: "from-amber-500 to-orange-600"
              },
              {
                icon: Sun,
                title: "Best Seasons",
                items: [
                  "October to March: Peak Mahseer season",
                  "May to September: Snow Trout at altitude",
                  "Post-monsoon brings best water clarity",
                  "Early morning and late evening prime times",
                  "Avoid high water levels during monsoon",
                  "Temperature range: 5°C to 25°C"
                ],
                color: "from-yellow-500 to-amber-500"
              },
              {
                icon: Shield,
                title: "Safety on Rivers",
                items: [
                  "Always fish with a local guide",
                  "Wear life jacket near deep/fast water",
                  "Watch for wildlife (elephants, bears)",
                  "Check weather forecast before departure",
                  "Carry first-aid and emergency contacts",
                  "Tell someone your fishing location"
                ],
                color: "from-teal-500 to-cyan-600"
              },
              {
                icon: Droplets,
                title: "What to Bring",
                items: [
                  "Waterproof backpack for gear",
                  "Quick-dry clothing and rain jacket",
                  "High SPF sunscreen and lip balm",
                  "Insect repellent (mosquitoes & leeches)",
                  "Energy snacks and hydration",
                  "Camera in waterproof case"
                ],
                color: "from-blue-500 to-indigo-600"
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
                  whileHover={{ y: -4, scale: 1.02 }}
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
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
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
        <ScrollReveal as="section" variant="up" className="mb-20 min-h-screen flex flex-col justify-center">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-1">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold font-headline bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Before You Cast
                </motion.h2>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Important guidelines for responsible angling in Arunachal Pradesh
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: AlertCircle,
                    title: "Catch & Release Protocol",
                    content: "All fish must be released unharmed. Use barbless hooks, keep fish in water during unhooking, minimize handling time. Trophy photos are allowed but be quick. This ensures fish populations thrive for future generations.",
                    color: "text-red-600",
                    bg: "bg-red-50"
                  },
                  {
                    icon: Phone,
                    title: "Local Guides & Support",
                    content: "Hiring a local guide isn't just recommended—it's often mandatory. Guides know secret spots, fish behavior, and river safety. They also help with permits and communicate with local communities.",
                    color: "text-blue-600",
                    bg: "bg-blue-50"
                  },
                  {
                    icon: MapPinned,
                    title: "Respect Restricted Zones",
                    content: "Some rivers or stretches are off-limits during breeding seasons or for tribal conservation. Always check with authorities and respect closures. Certain areas near the border require special permits.",
                    color: "text-teal-600",
                    bg: "bg-teal-50"
                  },
                  {
                    icon: Thermometer,
                    title: "Weather & Water Conditions",
                    content: "Himalayan rivers are glacier-fed and temperatures vary drastically. Water clarity changes with rainfall. Best fishing is during stable weather with clear water. Always check local conditions before heading out.",
                    color: "text-purple-600",
                    bg: "bg-purple-50"
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

              {/* Pro Tips */}
              <motion.div
                className="mt-8 p-6 rounded-xl bg-gradient-to-br from-emerald-100/70 via-green-100/60 to-teal-100/70 border border-emerald-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-bold font-headline text-emerald-800 mb-4 flex items-center gap-2">
                  <Fish className="h-5 w-5" />
                  Pro Angler Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Early morning (5-8 AM) offers best fishing",
                    "Match your fly/lure to local insect hatches",
                    "Golden Mahseer love deep pools and eddies",
                    "Snow Trout prefer fast, oxygen-rich water",
                    "Book remote camps well in advance",
                    "Respect local customs and tribal traditions"
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* Enhanced CTA Banner */}
        <ScrollReveal as="section" variant="up" className="min-h-screen flex flex-col justify-center">
          <motion.div
            className="relative overflow-hidden rounded-[3rem] group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700" />

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
                    duration: 5 + i,
                    repeat: Infinity,
                    delay: i * 0.8,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative py-20 px-8 md:px-16 flex flex-col items-center text-center space-y-6">
              {/* Floating fish icons */}
              <motion.div
                className="absolute top-10 left-12 w-16 h-16 opacity-20"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Fish className="w-full h-full text-white" />
              </motion.div>
              <motion.div
                className="absolute bottom-10 right-12 w-20 h-20 opacity-20"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -15, 0],
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
                  Cast Your Line in Paradise
                </h2>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-emerald-50 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                All fishing in Arunachal Pradesh requires a permit. Our team handles the paperwork so you can focus on the fishing.
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
                    href="/essentials"
                    className="bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all inline-flex items-center gap-2 group shadow-xl"
                  >
                    <span>Get a Fishing Permit</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/adventures"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/40 px-8 py-4 rounded-2xl font-bold text-white transition-all inline-flex items-center gap-2 shadow-lg"
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
