"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ScanSearch, CheckCircle2, Clock, FileCheck, AlertCircle,
  ExternalLink, FileText, Globe, Calendar, UserCheck, Leaf,
  Heart, Home, MapPin, ChevronRight, Sparkles, Shield, Info, Check,
  ShieldAlert, ArrowRight,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion } from "framer-motion"

const PERMIT_URL_INDIAN = "https://www.eilp.arunachal.gov.in/preTuristEIlpKYC"

const quickFacts = [
  { icon: FileText,  label: "Permit Type",   value: "ILP / PAP",      color: "text-primary",             bg: "bg-primary/10" },
  { icon: Globe,     label: "Availability",  value: "E-Portal Ready", color: "text-secondary-foreground", bg: "bg-secondary/40" },
  { icon: Clock,     label: "Processing",    value: "24-48 Hours",    color: "text-rose-600",              bg: "bg-rose-50" },
  { icon: Calendar,  label: "Stay Validity", value: "Up to 30 Days",  color: "text-teal-600",              bg: "bg-teal-50" },
]

const ilpSteps = [
  {
    num: "01",
    title: "Instant E-Portal Application",
    desc: "Apply online with a digital copy of your Aadhaar and a current photograph. Approved permits are delivered to your email within 24-48 hours.",
  },
  {
    num: "02",
    title: "Offline Facilitation Centers",
    desc: "Visit Resident Commissioner offices in Delhi, Kolkata, or Guwahati. On-the-spot approvals available at select border check-posts.",
  },
  {
    num: "03",
    title: "Carry Both Formats",
    desc: "Digital and printed permits are both accepted. For remote treks and high-altitude routes, always carry a printed backup as connectivity is limited.",
  },
]

const papFeatures = [
  { icon: UserCheck, label: "Groups of 2+" },
  { icon: Globe,     label: "Fee: USD 50" },
  { icon: Calendar,  label: "30 Day Stay" },
  { icon: Shield,    label: "Verified Agents" },
]

const gates = [
  {
    circuit: "Western Circuit",
    name: "Bhalukpong",
    desc: "The main gateway to the Tawang-Bomdila circuit. Witness the dramatic ascent from the Assam plains to misty alpine heights of the Himalaya.",
    base: "Base: Tezpur",
    distance: "52 KM",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "mountain valley river lush green northeast india",
  },
  {
    circuit: "Siang Circuit",
    name: "Pasighat",
    desc: "Enter the ancestral lands of the Adi tribe. This gateway follows the mighty Siang river into the heart of the central hills.",
    base: "Base: Dibrugarh",
    distance: "155 KM",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "river valley mountains sunrise northeast india",
  },
  {
    circuit: "Capital Circuit",
    name: "Naharlagun",
    desc: "The primary rail link entry. Your transition into the modern capital of Itanagar and the diverse Nyishi tribal territories.",
    base: "Mode: Railway",
    distance: "Express",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "train station himalayas northeast india",
  },
]

const pledgeItems = [
  { icon: Leaf,  title: "Ecological Stewardship",    desc: "Help maintain pristine high-altitude ecosystems. Say no to single-use plastics." },
  { icon: Heart, title: "Cultural Humility",          desc: "Respect sacred groves, monasteries, and tribal traditions as living heritage." },
  { icon: Home,  title: "Support Local Communities", desc: "Choose tribal homestays, local guides, and community-run experiences." },
]

const pledgeChecklist = [
  "I will protect alpine habitats",
  "I will honor tribal protocols",
  "I will support local homestays",
  "I will carry valid permits at all times",
]

const infoPoints = [
  {
    icon: CheckCircle2,
    title: "Who Needs an ILP?",
    desc: "All non-resident Indian citizens visiting Arunachal Pradesh -- including those from other Indian states -- must carry a valid ILP.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Clock,
    title: "Apply in Advance",
    desc: "ILP processing takes 24-48 hours. Apply at least 3 days before travel, especially during peak season (Oct-Mar).",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileCheck,
    title: "Carry a Physical Copy",
    desc: "Digital permits are accepted at most checkpoints, but carry a printed backup -- some remote posts have no connectivity.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: AlertCircle,
    title: "Checkpoint Etiquette",
    desc: "Present your permit at every ILP checkpoint. Penalties for entry without a valid permit are significant.",
    color: "from-rose-500 to-pink-500",
  },
]

export default function PermitHubPage() {
  const [checked, setChecked] = useState<boolean[]>(pledgeChecklist.map(() => false))
  const allChecked = checked.every(Boolean)
  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  return (
    <main id="main-content" className="bg-background overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-screen pt-28 pb-52 flex items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-6 translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 tribal-pattern opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left content */}
            <div className="lg:col-span-6 space-y-8">
              <ScrollReveal variant="left">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Crossing the Threshold
                </div>
              </ScrollReveal>

              <ScrollReveal variant="left" delay={100}>
                <h1 className="font-headline text-7xl md:text-8xl xl:text-[7rem] font-bold text-foreground tracking-tighter leading-[0.85]">
                  Arrival<br />
                  <span className="text-primary">Formalities</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="left" delay={200}>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed">
                  Your journey to the Land of the Rising Sun begins with a deep respect for its sacred landscapes and ancient traditions.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="left" delay={300}>
                <div className="flex items-center gap-6 pt-1">
                  <div className="w-12 h-px bg-border" />
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground/70">Essential Entry Protocols</p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="left" delay={400}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={PERMIT_URL_INDIAN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white shadow-[0_8px_32px_rgba(0,106,98,0.3)] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,106,98,0.4)] transition-all duration-300"
                  >
                    Apply for ILP <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    href="/essentials/check"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-border px-8 py-4 font-bold text-foreground hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    AI Permit Check <Sparkles className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right image */}
            <div className="lg:col-span-6 relative">
              <ScrollReveal variant="right">
                <div className="relative">
                  <div className="rounded-[4rem] rounded-tr-none overflow-hidden shadow-[0_64px_128px_-16px_rgba(0,0,0,0.2)] aspect-[4/5] relative z-10 ring-8 ring-white">
                    <Image
                      src="https://images.unsplash.com/photo-1539604594840-6700965a80b4?w=900&h=1100&fit=crop&auto=format&q=85"
                      alt="Traditional Buddhist gateway at a mountain pass in Arunachal Pradesh at sunrise"
                      fill
                      className="object-cover"
                      data-ai-hint="buddhist monastery gate mountain pass arunachal mist sunrise"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-44 h-44 bg-white/60 backdrop-blur-2xl rounded-3xl border border-white/70 shadow-[0_16px_48px_rgba(0,0,0,0.12)] items-center justify-center rotate-12 z-20 hidden md:flex flex-col gap-2"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ShieldAlert className="h-10 w-10 text-primary" />
                    <span className="text-[10px] font-black tracking-tighter uppercase text-muted-foreground text-center leading-tight px-2">Gateway to<br />Peak Country</span>
                  </motion.div>

                  <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-1/2 -right-16 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Facts Strip */}
      <div className="container mx-auto px-4 -mt-24 relative z-20">
        <ScrollReveal>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50">
            <div className="flex flex-wrap justify-between items-center gap-10">
              {quickFacts.map((fact, i) => {
                const Icon = fact.icon
                return (
                  <div key={fact.label} className="flex items-center gap-5 flex-1 min-w-[160px]">
                    <div className={`w-14 h-14 rounded-2xl ${fact.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-7 w-7 ${fact.color}`} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{fact.label}</p>
                      <p className="font-bold text-xl text-foreground">{fact.value}</p>
                    </div>
                    {i < quickFacts.length - 1 && (
                      <div className="hidden xl:block w-px h-12 bg-border/40 ml-auto" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ILP Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left content */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal variant="left">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Domestic Entry</span>
                <h2 className="font-headline text-5xl font-bold mb-10 leading-tight text-foreground tracking-tight">
                  Inner Line<br />Permit (ILP)
                </h2>
              </ScrollReveal>

              <div className="space-y-8">
                {ilpSteps.map((step, i) => (
                  <ScrollReveal key={step.num} variant="left" delay={i * 100}>
                    <motion.div
                      className="group flex gap-6 items-start"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center shrink-0 font-bold text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 text-sm">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 text-foreground">{step.title}</h4>
                        <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal variant="left" delay={300}>
                <div className="mt-12 flex flex-wrap gap-4">
                  <a
                    href={PERMIT_URL_INDIAN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white shadow-[0_8px_32px_rgba(0,106,98,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-sm"
                  >
                    Start ILP Application <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    href="/essentials/check"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-border px-8 py-4 font-bold text-foreground hover:border-primary hover:text-primary transition-all text-sm"
                  >
                    AI Readiness Check <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right image */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
              <ScrollReveal variant="right">
                <div className="relative">
                  <div className="absolute -top-8 -right-8 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_48px_80px_-16px_rgba(0,0,0,0.15)] aspect-square">
                    <Image
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=900&fit=crop&auto=format&q=85"
                      alt="Person using smartphone to display digital travel permit for Arunachal Pradesh"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      data-ai-hint="smartphone digital permit travel india mobile documents"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Floating verification card */}
                  <motion.div
                    className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-white max-w-xs hidden md:block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <p className="font-bold text-sm text-foreground">Instant Verification</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Integrated with national identity systems for rapid 24-hour processing times.
                    </p>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* PAP Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-stone-900 z-0" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&h=900&fit=crop&auto=format&q=70"
            alt="Misty canyon and suspension bridge in the Eastern Himalayas representing a protected area"
            fill
            className="object-cover opacity-25 grayscale"
            data-ai-hint="suspension bridge misty canyon himalayas protected area"
            sizes="100vw"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Glassmorphism content card */}
            <ScrollReveal variant="left">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 lg:p-14 rounded-[2.5rem] shadow-2xl">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/20 border border-secondary/30 rounded-full text-secondary text-[10px] font-black tracking-widest uppercase mb-8">
                  <Globe className="h-3 w-3" />
                  Global Access
                </span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  Protected Area<br />Permit (PAP)
                </h2>
                <p className="text-stone-300 text-lg leading-relaxed mb-10">
                  Arunachal Pradesh welcomes international travelers through curated tribal circuits. We preserve cultural sanctity while sharing our beauty with the world.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {papFeatures.map((feat) => {
                    const Icon = feat.icon
                    return (
                      <div key={feat.label} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <Icon className="h-5 w-5 text-secondary" />
                        <span className="text-sm font-medium text-white/90">{feat.label}</span>
                      </div>
                    )
                  })}
                </div>

                <Link
                  href="/essentials/foreign"
                  className="group inline-flex items-center gap-3 text-secondary font-bold text-lg hover:gap-5 transition-all duration-300"
                >
                  Find Certified Tour Operators
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Image mosaic */}
            <div className="hidden lg:block">
              <ScrollReveal variant="right">
                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-3xl overflow-hidden h-64 mt-14 relative shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?w=600&h=500&fit=crop&auto=format&q=80"
                      alt="Traditional Arunachali tribal elder in warm lighting"
                      fill
                      className="object-cover"
                      data-ai-hint="tribal elder traditional arunachal culture portrait warm"
                      sizes="25vw"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden h-64 relative shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=500&fit=crop&auto=format&q=80"
                      alt="Prayer flags against a clear blue sky at high altitude in Arunachal Pradesh"
                      fill
                      className="object-cover"
                      data-ai-hint="prayer flags blue sky himalayas monastery high altitude"
                      sizes="25vw"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Entry Gates */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <ScrollReveal variant="left">
              <div className="max-w-xl">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Regional Portals</span>
                <h2 className="font-headline text-5xl font-bold leading-tight text-foreground">Primary Entry Gates</h2>
                <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                  Choose your gateway based on the tribal heartlands and valleys you intend to explore.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right">
              <Link
                href="/essentials/check"
                className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap text-sm"
              >
                View All Checkpoints
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gates.map((gate, i) => (
              <ScrollReveal key={gate.name} variant="up" delay={i * 100}>
                <motion.div
                  className="group bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transition-all duration-500 border border-border/20 ghost-border overflow-hidden"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-64 rounded-[1.5rem] overflow-hidden mb-6">
                    <Image
                      src={gate.image}
                      alt={`${gate.name} entry gate, Arunachal Pradesh`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={gate.imageHint}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                        {gate.circuit}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <MapPin className="h-5 w-5 text-white/70" />
                    </div>
                  </div>
                  <div className="px-2 pb-2">
                    <h4 className="font-headline text-2xl font-bold mb-2 text-foreground">{gate.name}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{gate.desc}</p>
                    <div className="flex justify-between items-center py-4 border-t border-border/30">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{gate.base}</span>
                      <span className="font-black text-primary text-lg">{gate.distance}</span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before You Travel */}
      <section className="py-20 bg-surface-low">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
                Before You Travel
              </h2>
              <p className="text-muted-foreground text-lg">
                Four things every visitor to Arunachal Pradesh must know about permits.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoPoints.map((point, i) => {
              const Icon = point.icon
              return (
                <ScrollReveal key={point.title} variant="up" delay={i * 100}>
                  <div className="organic-card ghost-border p-6 bg-surface h-full">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${point.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-foreground mb-2">{point.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* The Pledge */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="bg-primary rounded-[3rem] overflow-hidden relative flex items-center shadow-[0_64px_128px_-32px_rgba(0,106,98,0.3)]">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=1400&h=800&fit=crop&auto=format&q=70"
                  alt="Traditional hand-woven Arunachal tribal textiles with intricate geometric patterns"
                  fill
                  className="object-cover opacity-20"
                  data-ai-hint="tribal textiles weaving arunachal geometric patterns handmade"
                  sizes="100vw"
                />
              </div>

              <div className="relative z-10 w-full p-10 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Pledge content */}
                <div>
                  <span className="inline-block px-4 py-1.5 bg-white/20 border border-white/30 rounded-full text-white text-[10px] font-bold tracking-widest uppercase mb-6">
                    Sustainable Tourism
                  </span>
                  <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    The Arunachal<br />Pledge
                  </h2>
                  <p className="text-white/80 text-xl italic mb-12 font-light leading-relaxed max-w-md">
                    &ldquo;I arrive as a guest, I wander as a friend, leaving only my respect and taking only the songs of the hills.&rdquo;
                  </p>
                  <ul className="space-y-8">
                    {pledgeItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <li key={item.title} className="flex items-start gap-5">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h5 className="font-bold text-white mb-1">{item.title}</h5>
                            <p className="text-sm text-white/60">{item.desc}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Interactive pledge card */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="h-9 w-9 text-foreground" />
                  </div>
                  <h4 className="font-headline text-2xl font-bold mb-2 text-foreground">Digital Commitment</h4>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    Acknowledge our code of conduct for responsible travel before proceeding with your arrival formalities.
                  </p>

                  <div className="space-y-4">
                    {pledgeChecklist.map((item, i) => (
                      <motion.button
                        key={item}
                        type="button"
                        onClick={() => toggle(i)}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/40 hover:bg-muted text-left transition-colors group"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                            checked[i]
                              ? "bg-primary border-primary"
                              : "border-border group-hover:border-primary"
                          }`}
                        >
                          {checked[i] && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                        </div>
                        <span
                          className={`text-sm font-semibold transition-colors ${
                            checked[i] ? "text-primary" : "text-foreground group-hover:text-primary"
                          }`}
                        >
                          {item}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    animate={{ opacity: allChecked ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href={allChecked ? PERMIT_URL_INDIAN : undefined}
                      target={allChecked ? "_blank" : undefined}
                      rel={allChecked ? "noopener noreferrer" : undefined}
                      onClick={!allChecked ? (e) => e.preventDefault() : undefined}
                      className={`w-full mt-8 flex items-center justify-center gap-2 py-5 rounded-2xl font-bold transition-all shadow-xl ${
                        allChecked
                          ? "bg-foreground text-white hover:bg-primary cursor-pointer"
                          : "bg-foreground/40 text-white/60 cursor-not-allowed"
                      }`}
                    >
                      {allChecked ? (
                        <>Confirm &amp; Proceed to Permit <ExternalLink className="h-4 w-4" /></>
                      ) : (
                        <>Accept all items to proceed <Info className="h-4 w-4" /></>
                      )}
                    </a>
                  </motion.div>

                  {allChecked && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-xs text-emerald-600 font-semibold mt-4 flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      All pledges confirmed &mdash; you&apos;re ready to apply!
                    </motion.p>
                  )}
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AI Check CTA */}
      <section className="py-24 cta-gradient">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/30 rounded-full text-white text-xs font-bold tracking-widest uppercase mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6">
              Not Sure What You Need?
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Run the AI permit readiness check &mdash; it takes 2 minutes and tells you exactly what to prepare.
            </p>
            <Link
              href="/essentials/check"
              className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-bold text-primary shadow-[0_16px_48px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(64,224,208,0.4)] hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <ScanSearch className="h-5 w-5" />
              Start AI Permit Check
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </main>
  )
}
