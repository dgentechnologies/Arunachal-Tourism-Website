"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mountain, Waves, Fish, Wind, MapPin, Calendar, Users, Shield, CheckCircle2 } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion } from "framer-motion"
import { useState } from "react"

const editorialActivities = [
  {
    category: "01",
    name: "Trekking",
    headline: "Trekking &\nAdventure",
    tagline: "Walk where the spirits of the mountains reside. Every ridge is a story, every summit a silent prayer.",
    desc: "Our trekking expeditions span the full breadth of Arunachal's terrain — from the icy cols of Gorichen to the subtropical valleys of the Lower Brahmaputra. Fifty-plus documented routes guarantee a circuit for every fitness level.",
    image: "https://picsum.photos/seed/himalayan-trekking-trail/1200/800",
    imageHint: "mountain trekking trail himalayas",
    href: "/adventures/trekking",
    badge: "50+ Routes",
    badgeColor: "bg-emerald-500",
    cornerClass: "rounded-tr-[5rem]",
    stat1: { label: "Max Altitude", value: "5,150 m" },
    stat2: { label: "Best Season", value: "Apr–Oct" },
    flip: false,
  },
  {
    category: "02",
    name: "River Rafting",
    headline: "River\nRafting",
    tagline: "Conquer the white water of the Siang and Subansiri — where the river's pulse becomes your own.",
    desc: "Navigate Grade IV rapids through deep tropical gorges where the river carved its path millions of years before maps existed. A symphony of raw power, emerald waters, and canyon walls taller than cathedrals.",
    image: "https://picsum.photos/seed/arunachal-mountain-river/1200/800",
    imageHint: "river rafting white water rapids gorge",
    href: "/adventures/rafting",
    badge: "Grade II–V",
    badgeColor: "bg-blue-500",
    cornerClass: "rounded-bl-[5rem]",
    stat1: { label: "Rivers", value: "6 Major" },
    stat2: { label: "Season", value: "Oct–Mar" },
    flip: true,
  },
]

const bentoActivities = [
  {
    category: "03",
    name: "Angling",
    headline: "The Golden Hunt",
    desc: "Patience rewarded in the shallows of the Kameng. Cast your line for the legendary Golden Mahseer in catch-and-release zones that keep these pristine waters alive for generations.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=1100&fit=crop&auto=format&q=80",
    imageHint: "fishing river crystal clear forest",
    href: "/adventures/angling",
    badge: "Year-round",
  },
  {
    category: "04",
    name: "Paragliding",
    headline: "Dance with the Clouds",
    desc: "Soar above the alpine meadows of Mechuka and Tawang. Ride thermal currents high above emerald canopy — the Eastern Himalayas from a bird's perspective.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1100&fit=crop&auto=format&q=80",
    imageHint: "paragliding himalayan valley clouds sky",
    href: "/adventures/paragliding",
    badge: "Oct–Apr",
  },
]

const whyCards = [
  {
    icon: MapPin,
    title: "Last Frontier",
    desc: "Much of Arunachal remains unmapped. Adventure here is genuine — there are no tourist crowds at the trailhead.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Mountain,
    title: "Himalayan Scale",
    desc: "Gorichen at 5,488 m, Kangto, Nyegi Kangsang — peaks that inspire reverence in even the most seasoned climbers.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Waves,
    title: "Wild Rivers",
    desc: "The Siang plunges 2,400 m in just 160 km — one of the steepest river descents on the planet.",
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "Guided Safety",
    desc: "Certified local guides with Himalayan rescue training. Every expedition follows ABSI and ITRA safety standards.",
    color: "from-primary to-accent",
  },
  {
    icon: Users,
    title: "Tribal Culture",
    desc: "26 major tribes whose wisdom and hospitality transform every adventure into a cultural immersion.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Calendar,
    title: "Year-round Adventure",
    desc: "While the Himalayas sleep under snow, the rivers and jungles of lower Arunachal are always alive.",
    color: "from-violet-500 to-purple-500",
  },
]

const seasonData = [
  { month: "Jan", trek: true, raft: true, angle: true, para: true },
  { month: "Feb", trek: true, raft: true, angle: true, para: true },
  { month: "Mar", trek: true, raft: true, angle: true, para: true },
  { month: "Apr", trek: true, raft: false, angle: true, para: true },
  { month: "May", trek: true, raft: false, angle: true, para: false },
  { month: "Jun", trek: false, raft: false, angle: true, para: false },
  { month: "Jul", trek: false, raft: false, angle: true, para: false },
  { month: "Aug", trek: false, raft: false, angle: true, para: false },
  { month: "Sep", trek: false, raft: false, angle: true, para: false },
  { month: "Oct", trek: true, raft: true, angle: true, para: true },
  { month: "Nov", trek: true, raft: true, angle: true, para: true },
  { month: "Dec", trek: true, raft: true, angle: true, para: true },
]

export default function AdventuresPage() {
  const [hoveredBento, setHoveredBento] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden">

      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/3 -right-1/4 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(64,224,208,0.5) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(0,106,98,0.4) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── HERO ── */}
      <section className="px-4 md:px-8 pt-6 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative w-full h-[580px] md:h-[700px] rounded-[2.5rem] overflow-hidden group"
        >
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.04 }} transition={{ duration: 0.8 }}>
            <Image
              src="https://picsum.photos/seed/himalayan-trekking-trail/1600/900"
              alt="Panoramic view of the Himalayan peaks of Arunachal Pradesh at sunrise"
              fill
              className="object-cover"
              data-ai-hint="himalayan peaks sunrise panoramic arunachal"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          {/* Drifting dots */}
          <div className="absolute inset-0 overflow-hidden">
            {[
              { left: "8%", top: "25%", dur: 4.5, delay: 0 },
              { left: "22%", top: "60%", dur: 3.8, delay: 0.7 },
              { left: "60%", top: "20%", dur: 5.2, delay: 0.3 },
              { left: "78%", top: "65%", dur: 3.5, delay: 1.4 },
              { left: "90%", top: "35%", dur: 4.9, delay: 0.9 },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                style={{ left: p.left, top: p.top }}
                animate={{ y: [0, -25, 0], opacity: [0.25, 0.65, 0.25] }}
                transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
              />
            ))}
          </div>

          <div className="absolute bottom-12 left-8 md:left-14 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="inline-block bg-[hsl(46,97%,60%)]/90 backdrop-blur-sm text-[hsl(0,5%,11%)] font-black text-xs uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full">
                The Grand Expedition
              </span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline text-white leading-[0.95] tracking-tighter mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Discover<br />
              <span className="text-[hsl(176,68%,56%)]">Arunachal</span>
            </motion.h1>
            <motion.p
              className="text-white/80 max-w-xl text-lg md:text-xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.6 }}
            >
              From the roaring Siang to the silent peaks of the Mishmi Hills — adventure here is not a choice, it&apos;s the way of life.
            </motion.p>
          </div>
        </motion.div>

        {/* Stats Bar — floating over hero bottom */}
        <ScrollReveal variant="up" className="-mt-10 relative z-10 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-[0_16px_60px_0_rgba(0,106,98,0.14)] px-6 py-5 flex flex-wrap justify-around items-center gap-4">
            {[
              { icon: Mountain, value: "12+", label: "Adventure Types" },
              { icon: Waves, value: "5", label: "Major River Basins" },
              { icon: MapPin, value: "100+", label: "Mountain Trails" },
              { icon: Users, value: "26", label: "Tribal Cultures" },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Icon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-lg font-bold font-headline text-foreground leading-none">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-0.5">{stat.label}</p>
                  </div>
                  {i < 3 && <div className="hidden md:block w-px h-8 bg-border ml-3" />}
                </motion.div>
              )
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* ── EDITORIAL SECTIONS: TREKKING + RAFTING ── */}
      <section className="container mx-auto px-4 md:px-8 mt-24 space-y-28 md:space-y-36">
        {editorialActivities.map((act, idx) => (
          <ScrollReveal key={act.name} variant="up">
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center`}>
              {/* Image col */}
              <motion.div
                className={`md:col-span-7 relative ${act.flip ? "order-1 md:order-2" : ""}`}
                initial={{ opacity: 0, x: act.flip ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className={`relative h-[420px] md:h-[540px] rounded-[2rem] ${act.cornerClass} overflow-hidden shadow-[0_16px_60px_0_rgba(0,106,98,0.14)] group`}>
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Image
                      src={act.image}
                      alt={act.name}
                      fill
                      className="object-cover"
                      data-ai-hint={act.imageHint}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Floating badge chip */}
                  <div className="absolute top-5 left-5">
                    <span className={`${act.badgeColor} text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                      {act.badge}
                    </span>
                  </div>
                </div>
                {/* Decorative corner accent */}
                <div className={`absolute ${act.flip ? "-bottom-6 -left-6" : "-bottom-6 -right-6"} w-20 h-20 bg-[hsl(46,97%,60%)]/30 rounded-2xl -z-10`} />
              </motion.div>

              {/* Text col */}
              <motion.div
                className={`md:col-span-5 space-y-6 ${act.flip ? "order-2 md:order-1" : ""}`}
                initial={{ opacity: 0, x: act.flip ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[hsl(46,97%,35%)]">
                  Category {act.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight text-foreground whitespace-pre-line">
                  {act.headline}
                </h2>
                <div className="w-14 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4">
                  &ldquo;{act.tagline}&rdquo;
                </p>
                <p className="text-muted-foreground leading-relaxed">{act.desc}</p>

                {/* Mini stats */}
                <div className="flex gap-6 pt-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary font-headline">{act.stat1.value}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mt-0.5">{act.stat1.label}</p>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary font-headline">{act.stat2.value}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mt-0.5">{act.stat2.label}</p>
                  </div>
                </div>

                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={act.href}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg ${
                      act.flip
                        ? "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                        : "bg-primary text-white hover:shadow-[0_8px_40px_0_rgba(0,106,98,0.35)]"
                    }`}
                  >
                    Explore {act.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* ── BENTO GRID: ANGLING + PARAGLIDING ── */}
      <section className="container mx-auto px-4 md:px-8 mt-28">
        <ScrollReveal variant="up" className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">And there&apos;s more</span>
          <motion.h2
            className="text-3xl md:text-5xl font-bold font-headline mt-2 mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            More Ways to Explore
          </motion.h2>
          <p className="text-muted-foreground">Every corner of Arunachal holds a different kind of thrill</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bentoActivities.map((act, idx) => (
            <motion.div
              key={act.name}
              className="group relative rounded-[2.5rem] overflow-hidden h-[500px] md:h-[620px] cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              onHoverStart={() => setHoveredBento(idx)}
              onHoverEnd={() => setHoveredBento(null)}
            >
              <Image
                src={act.image}
                alt={act.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint={act.imageHint}
              />
              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5 transition-opacity duration-500 group-hover:from-black/80" />
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                initial={{ x: "-100%" }}
                animate={hoveredBento === idx ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.9 }}
              />

              {/* Category tag top */}
              <div className="absolute top-6 left-6">
                <span className="bg-[hsl(46,97%,60%)]/90 backdrop-blur-sm text-[hsl(0,5%,11%)] text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                  Category {act.category}
                </span>
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <h3 className="text-3xl md:text-4xl font-bold font-headline text-white mb-3 leading-tight">
                  {act.name}:<br />{act.headline}
                </h3>
                <p className="text-white/75 mb-6 max-w-sm text-sm leading-relaxed">{act.desc}</p>
                <div className="flex items-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={act.href}
                      className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-full font-bold hover:bg-white hover:text-primary transition-all duration-300"
                    >
                      Explore Activity <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                  <span className="bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                    {act.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY ARUNACHAL ── */}
      <section className="container mx-auto px-4 md:px-8 mt-28">
        <ScrollReveal variant="up" className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Why come here</span>
          <motion.h2
            className="text-3xl md:text-5xl font-bold font-headline mt-2 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Arunachal Difference
          </motion.h2>
          <p className="text-muted-foreground">Six reasons this frontier is unlike any adventure destination on Earth</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-full bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r ${card.color}`} />
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${card.color} mb-5`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-headline mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── SEASON CALENDAR ── */}
      <section className="container mx-auto px-4 md:px-8 mt-28">
        <ScrollReveal variant="up">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-[1px]">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14">
              <div className="text-center mb-12">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Plan smarter</span>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold font-headline text-primary mt-2 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Activity Season Calendar
                </motion.h2>
                <p className="text-muted-foreground">Know the best window for each adventure before you book</p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {[
                  { label: "Trekking", color: "bg-emerald-500" },
                  { label: "River Rafting", color: "bg-blue-500" },
                  { label: "Angling", color: "bg-cyan-500" },
                  { label: "Paragliding", color: "bg-violet-500" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${l.color}`} />
                    <span className="text-sm font-medium text-muted-foreground">{l.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted border border-border" />
                  <span className="text-sm font-medium text-muted-foreground">Off-season</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-black uppercase tracking-widest text-muted-foreground pb-4 pr-6 w-28">Activity</th>
                      {seasonData.map((m) => (
                        <th key={m.month} className="text-center text-xs font-bold text-muted-foreground pb-4 px-1">
                          {m.month}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {[
                      { label: "Trekking", key: "trek" as const, color: "bg-emerald-500" },
                      { label: "Rafting", key: "raft" as const, color: "bg-blue-500" },
                      { label: "Angling", key: "angle" as const, color: "bg-cyan-500" },
                      { label: "Paragliding", key: "para" as const, color: "bg-violet-500" },
                    ].map((row) => (
                      <tr key={row.key}>
                        <td className="text-sm font-semibold text-foreground pr-6 py-2">{row.label}</td>
                        {seasonData.map((m) => (
                          <td key={m.month} className="px-1 py-2">
                            <motion.div
                              className={`h-7 rounded-full mx-0.5 ${m[row.key] ? row.color : "bg-muted"} transition-colors duration-300`}
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.05 }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── PERMIT NOTICE ── */}
      <section className="container mx-auto px-4 md:px-8 mt-10">
        <ScrollReveal variant="up">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-grow">
              <p className="font-bold text-amber-900 text-sm">Permit Required for All Adventures</p>
              <p className="text-amber-700 text-sm">Indian nationals need an Inner Line Permit (ILP); foreign nationals need a Protected Area Permit (PAP). Apply before booking any expedition.</p>
            </div>
            <Link
              href="/essentials"
              className="flex-shrink-0 bg-amber-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-amber-600 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Apply for Permit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── CTA ── */}
      <section className="container mx-auto px-4 md:px-8 mt-10 pb-20">
        <ScrollReveal variant="up">
          <div className="relative rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-primary" />
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                <path d="M0,150 Q200,80 400,150 T800,150" fill="none" stroke="white" strokeWidth="1.5" />
                <path d="M0,180 Q200,110 400,180 T800,180" fill="none" stroke="white" strokeWidth="1.5" />
                <path d="M0,120 Q200,50 400,120 T800,120" fill="none" stroke="white" strokeWidth="1.5" />
                <path d="M0,210 Q200,140 400,210 T800,210" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
            <div className="relative z-10 py-16 md:py-24 px-8 md:px-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.span
                    className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[hsl(176,68%,56%)] mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    AI-Powered Planning
                  </motion.span>
                  <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-white leading-tight tracking-tighter mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Plan Your Adventure Today
                  </motion.h2>
                  <motion.p
                    className="text-white/75 text-lg leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Our AI planner builds a complete multi-activity itinerary around your chosen adventures, budget, and fitness level — including permits.
                  </motion.p>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/itinerary"
                      className="bg-[hsl(46,97%,60%)] text-[hsl(0,5%,11%)] px-8 py-4 rounded-full font-black hover:scale-105 transition-transform shadow-xl text-center"
                    >
                      Build My Itinerary
                    </Link>
                    <Link
                      href="/guides"
                      className="bg-white/10 backdrop-blur-md text-white border border-white/25 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-center"
                    >
                      Read the Guide
                    </Link>
                  </motion.div>
                </div>

                {/* Checklist panel */}
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/15"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <p className="text-white font-bold font-headline text-lg mb-5">What&apos;s included in your plan:</p>
                  <ul className="space-y-3">
                    {[
                      "Day-by-day activity scheduling",
                      "ILP / PAP permit guidance",
                      "Certified guide recommendations",
                      "Accommodation near activity sites",
                      "Transport & logistics planning",
                      "Weather & seasonal advice",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white/85 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[hsl(176,68%,56%)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  )
}

