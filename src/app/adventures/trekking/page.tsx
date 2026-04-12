"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight, Mountain, MapPin, Clock, Star, Users, Calendar, TrendingUp,
  Backpack, Heart, Shield, Droplets, Sun, Wind, CheckCircle2, AlertCircle,
  FileText, Phone, MapPinned, Thermometer
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"

const treks = [
  {
    name: "Gorichen Base Camp",
    location: "West Kameng",
    duration: "7–9 Days",
    difficulty: "Challenging",
    difficultyColor: "bg-red-100 text-red-700",
    altitude: "5,150 m",
    desc: "Summit Gorichen — the highest peak in Arunachal Pradesh — through ancient rhododendron forests and alpine meadows.",
    image: "https://picsum.photos/seed/himalayan-trekking-trail/800/600",
    imageHint: "high altitude mountain base camp",
    rating: 4.9,
    groupSize: "8-12",
    bestSeason: "Apr-Jun",
  },
  {
    name: "Mechuka Valley Trek",
    location: "Shi-Yomi District",
    duration: "5–6 Days",
    difficulty: "Moderate",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    altitude: "2,600 m",
    desc: "Traverse the breathtaking Mechuka valley — a hidden Himalayan paradise surrounded by snowy peaks and traditional Memba villages.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "green valley mountain trek",
    rating: 4.8,
    groupSize: "6-10",
    bestSeason: "Mar-Oct",
  },
  {
    name: "Kangto Base Camp",
    location: "Tawang District",
    duration: "6–8 Days",
    difficulty: "Challenging",
    difficultyColor: "bg-red-100 text-red-700",
    altitude: "4,800 m",
    desc: "A classic high-altitude circuit through Monpa villages, glacial lakes, and raw Himalayan landscapes near the Bhutan border.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "snowy mountain himalaya camp",
    rating: 4.7,
    groupSize: "8-12",
    bestSeason: "May-Sep",
  },
  {
    name: "Talle Valley Circuit",
    location: "Lower Subansiri",
    duration: "3–4 Days",
    difficulty: "Easy–Moderate",
    difficultyColor: "bg-green-100 text-green-700",
    altitude: "2,200 m",
    desc: "Explore the Talle Wildlife Sanctuary on well-marked forest paths, spotting hornbills, orchids, and rare primates along the way.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "dense jungle forest trail",
    rating: 4.6,
    groupSize: "4-8",
    bestSeason: "Oct-Apr",
  },
  {
    name: "Ziro to Along Trans-Arunachal",
    location: "Ziro – East Siang",
    duration: "10–12 Days",
    difficulty: "Moderate",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    altitude: "1,600 m",
    desc: "A cross-district expedition through tribal heartlands, passing Apatani paddy fields, dense sal forests, and river crossings.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "rice terraces valley trail",
    rating: 4.5,
    groupSize: "6-10",
    bestSeason: "Oct-Mar",
  },
  {
    name: "Dirang to Sela Pass",
    location: "West Kameng",
    duration: "2–3 Days",
    difficulty: "Easy",
    difficultyColor: "bg-green-100 text-green-700",
    altitude: "4,170 m",
    desc: "A gentle high-altitude walk across the Sela plateau, visiting glacial lakes and a World War II memorial along the way.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "green mountains plateau path",
    rating: 4.4,
    groupSize: "4-8",
    bestSeason: "May-Oct",
  },
]

export default function TrekkingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(64,224,208,0.3) 0%, transparent 70%)",
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
            background: "radial-gradient(circle, rgba(0,106,98,0.3) 0%, transparent 70%)",
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

      <div className="container mx-auto px-4 pt-6 pb-12">
        {/* Enhanced Hero Banner with Parallax */}
        <motion.div
          className="min-h-screen flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ScrollReveal variant="up" className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-8 md:mb-14 h-[55vw] min-h-[280px] max-h-[500px] md:h-[500px] md:max-h-none group">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://picsum.photos/seed/himalayan-trekking-trail/1600/900"
                alt="Trekking in Arunachal Pradesh"
                fill
                className="object-cover"
                data-ai-hint="mountain trekking trail himalayas"
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

            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="inline-block bg-primary-container/90 backdrop-blur-sm text-primary-foreground font-bold text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full">
                  Adventures · Trekking
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Trekking in Arunachal
              </motion.h1>

              <motion.p
                className="text-white/90 max-w-2xl text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                High-altitude trails through remote valleys, glacial passes, and tribal heartlands — all waiting to be explored on foot.
              </motion.p>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Enhanced Stats Section */}
        <ScrollReveal as="section" variant="up" className="mb-16 min-h-screen flex flex-col justify-center">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "50+", label: "Trekking Routes", icon: Mountain },
                  { value: "5,150 m", label: "Max Altitude", icon: TrendingUp },
                  { value: "Oct–May", label: "Best Season", icon: Calendar },
                  { value: "2–12 Days", label: "Trek Duration", icon: Clock },
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

        {/* Routes Section */}
        <section className="min-h-screen flex flex-col justify-center">
        <ScrollReveal variant="up" className="mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Popular Trekking Routes
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              From beginner-friendly paths to serious mountaineering expeditions
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Enhanced Treks Grid with Premium Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {treks.map((trek, idx) => (
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
                        src={trek.image}
                        alt={trek.name}
                        fill
                        className="object-cover"
                        data-ai-hint={trek.imageHint}
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
                        <span className="text-sm font-bold text-gray-900">{trek.rating}</span>
                      </div>
                    </motion.div>

                    {/* Trek name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl md:text-2xl font-bold font-headline drop-shadow-lg">
                        {trek.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col gap-4">
                    {/* Location and Quick Info */}
                    <div className="flex items-center flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{trek.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">{trek.duration}</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Mountain className="h-4 w-4 text-primary" />
                        <span className="font-medium">{trek.altitude}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">{trek.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{trek.bestSeason}</span>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div>
                      <Badge className={`${trek.difficultyColor} font-semibold px-3 py-1`}>
                        {trek.difficulty}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                      {trek.desc}
                    </p>

                    {/* CTA Button */}
                    <motion.div
                      className="mt-2"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/itinerary?trek=${encodeURIComponent(trek.name)}`}
                        className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link"
                      >
                        <span>Explore Trek</span>
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
              Everything you need to know before embarking on your trekking adventure
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Backpack,
                title: "Gear & Equipment",
                items: [
                  "Good quality trekking boots (broken in)",
                  "Layered clothing (thermal, fleece, waterproof)",
                  "Sleeping bag (-10°C rated for high altitude)",
                  "Trekking poles and headlamp",
                  "Personal first-aid kit",
                  "Water bottles and purification tablets"
                ],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Heart,
                title: "Physical Fitness",
                items: [
                  "Start cardio training 4-6 weeks before",
                  "Build endurance with regular hiking",
                  "Practice carrying a loaded backpack",
                  "Strengthen leg muscles and core",
                  "Medical check-up recommended",
                  "Acclimatization days are mandatory"
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
                  "Medical certificate for high-altitude treks",
                  "Travel insurance (highly recommended)",
                  "Emergency contact details"
                ],
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: Sun,
                title: "Weather Preparation",
                items: [
                  "Check forecast before departure",
                  "Carry sunscreen (SPF 50+) and sunglasses",
                  "Pack rain gear year-round",
                  "Temperature drops 6°C per 1000m gain",
                  "Best visibility: October-November",
                  "Avoid monsoon season (Jun-Sep)"
                ],
                color: "from-yellow-500 to-amber-500"
              },
              {
                icon: Shield,
                title: "Safety Guidelines",
                items: [
                  "Never trek solo in remote areas",
                  "Hire certified local guides",
                  "Inform family/friends of your itinerary",
                  "Carry emergency communication device",
                  "Follow Leave No Trace principles",
                  "Know altitude sickness symptoms"
                ],
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Droplets,
                title: "Health & Nutrition",
                items: [
                  "Stay hydrated (3-4 liters daily)",
                  "Pack high-energy snacks and meals",
                  "Avoid alcohol before/during trek",
                  "Carry ORS and electrolyte supplements",
                  "Vaccination: Tetanus, Hepatitis A/B",
                  "Altitude sickness medication if needed"
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
        <ScrollReveal as="section" variant="up" className="mb-20 min-h-screen flex flex-col justify-center">
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
                  Critical information for a safe and enjoyable trek
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: AlertCircle,
                    title: "Altitude Sickness Awareness",
                    content: "Recognize symptoms like headache, nausea, dizziness, and fatigue. Descend immediately if symptoms worsen. Acclimatize properly—gain no more than 500m elevation per day above 3,000m.",
                    color: "text-red-600"
                  },
                  {
                    icon: Phone,
                    title: "Emergency Contacts",
                    content: "Save local emergency numbers before departure. Mobile connectivity is limited in remote areas. Carry a satellite phone or emergency beacon for high-altitude treks.",
                    color: "text-blue-600"
                  },
                  {
                    icon: MapPinned,
                    title: "Route Planning",
                    content: "Study your route thoroughly. Share detailed itinerary with emergency contacts. Always have contingency plans and alternative routes. Check trail conditions with local authorities.",
                    color: "text-green-600"
                  },
                  {
                    icon: Thermometer,
                    title: "Temperature Variations",
                    content: "Temperatures can range from 25°C during day to -10°C at night in higher camps. Layer clothing appropriately. Pack thermal wear even for summer treks at altitude.",
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
                  Pro Tips from Local Guides
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Start trekking early morning (5-6 AM) to avoid afternoon weather changes",
                    "Carry cash—no ATMs or card payment in remote areas",
                    "Respect local customs and tribal traditions",
                    "Pack out all waste—leave nothing but footprints",
                    "Book permits at least 2 weeks in advance",
                    "Learn basic medical first-aid before your trek"
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
        <ScrollReveal as="section" variant="up" className="min-h-screen flex flex-col justify-center">
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
                  Ready to Hit the Trail?
                </h2>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Our expert guides know every pass and every shortcut. Book a guided trek and experience Arunachal the way it was meant to be explored.
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
                    <span>Plan My Trek</span>
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
