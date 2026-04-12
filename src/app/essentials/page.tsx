"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ScanSearch, Flag, Plane, ShieldAlert, CheckCircle2, Clock, FileCheck, AlertCircle, ExternalLink } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion } from "framer-motion"

const PERMIT_URL_INDIAN = "https://www.eilp.arunachal.gov.in/preTuristEIlpKYC"

const editorialCards = [
  {
    category: "01",
    badge: "AI-Powered",
    badgeColor: "bg-violet-500",
    name: "Smart ILP Check",
    headline: "AI Permit\nReadiness Check",
    tagline: "Know before you go. Our AI reviews your travel plan for permit compliance â€” before you reach the checkpoint.",
    desc: "Fill in your travel details, dates, and destinations. Our AI scans your plan against current ILP regulations, flags compliance gaps, and gives you a checklist to fix â€” all in seconds.",
    image: "https://picsum.photos/seed/arunachal-permit-document-check/1200/800",
    imageHint: "documents passport permit checklist review",
    href: "/essentials/check",
    external: false,
    stat1: { label: "Response", value: "Instant" },
    stat2: { label: "Accuracy", value: "AI-Verified" },
    flip: false,
    cornerClass: "rounded-tr-[5rem]",
  },
  {
    category: "02",
    badge: "Indian Citizens",
    badgeColor: "bg-orange-500",
    name: "e-ILP Portal",
    headline: "Inner Line\nPermit (ILP)",
    tagline: "All non-resident Indian citizens must carry a valid ILP to enter Arunachal Pradesh â€” no exceptions.",
    desc: "Apply through the official Arunachal Pradesh e-ILP portal. Receive your permit digitally. Carry a printed copy or the PDF on your device â€” both are accepted at every checkpoint across the state.",
    image: "https://picsum.photos/seed/arunachal-border-checkpoint-gate/1200/800",
    imageHint: "india border checkpoint gate permit entry",
    href: PERMIT_URL_INDIAN,
    external: true,
    stat1: { label: "Processing", value: "24â€“48 hrs" },
    stat2: { label: "Validity", value: "Up to 30 days" },
    flip: true,
    cornerClass: "rounded-bl-[5rem]",
  },
]

const bentoCards = [
  {
    category: "03",
    badge: "Foreign Nationals",
    name: "Protected Area Permit",
    headline: "PAP for\nForeign Visitors",
    desc: "Foreign nationals require a Protected Area Permit (PAP) from the Ministry of Home Affairs. Learn about required documents, issuing offices, and what to expect at the border.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&h=1100&fit=crop&auto=format&q=80",
    imageHint: "foreign passport travel india visa permit documents",
    href: "/essentials/foreign",
    external: false,
  },
  {
    category: "04",
    badge: "Emergency",
    name: "Safety & SOS",
    headline: "Safety\nGuidelines",
    desc: "Emergency contacts, mountain rescue protocols, satellite communication zones, and offline-ready safety resources for remote Arunachal.",
    image: "https://images.unsplash.com/photo-1604537372136-89b3dae196e3?w=900&h=1100&fit=crop&auto=format&q=80",
    imageHint: "mountain safety rescue emergency himalayas",
    href: "/safety",
    external: false,
  },
]

const infoPoints = [
  {
    icon: CheckCircle2,
    title: "Who Needs an ILP?",
    desc: "All non-resident Indian citizens visiting Arunachal Pradesh â€” including those from other Indian states â€” must carry a valid ILP.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Clock,
    title: "Apply in Advance",
    desc: "ILP processing takes 24â€“48 hours. Apply at least 3 days before travel, especially during peak season (Octâ€“Mar).",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileCheck,
    title: "Carry a Physical Copy",
    desc: "Digital permits are accepted at most checkpoints, but carry a printed backup â€” some remote posts have no connectivity.",
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
  return (
    <main id="main-content" className="bg-background">

      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 tribal-pattern opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                <ShieldAlert className="h-4 w-4" />
                Arrival Formalities Â· 4 Essentials
              </div>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-foreground mb-6">
                Your Gateway<br />
                <span className="text-primary">to Arunachal</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Permits aren&apos;t paperwork â€” they are the state&apos;s way of protecting its borders, ecosystems, and communities. Understand what you need before you arrive.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* â”€â”€ Editorial sections â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-8">
        <div className="container mx-auto px-4 space-y-6">
          {editorialCards.map((card, i) => (
            <ScrollReveal key={card.category} variant={card.flip ? "right" : "left"}>
              <motion.div
                className={`organic-card ghost-border overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[460px] ${card.cornerClass}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Image side */}
                <div className={`relative min-h-[280px] lg:min-h-0 ${card.flip ? "lg:order-2" : ""}`}>
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover"
                    data-ai-hint={card.imageHint}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 font-headline text-6xl font-bold text-white/20 select-none">
                    {card.category}
                  </div>
                </div>

                {/* Content side */}
                <div className={`flex flex-col justify-center p-8 lg:p-12 bg-surface ${card.flip ? "lg:order-1" : ""}`}>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{card.name}</p>
                  <h2 className="font-headline text-4xl lg:text-5xl font-bold leading-[0.95] text-foreground mb-4 whitespace-pre-line">
                    {card.headline}
                  </h2>
                  <p className="text-base font-medium text-primary mb-4 italic leading-relaxed">&ldquo;{card.tagline}&rdquo;</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">{card.desc}</p>

                  <div className="flex items-center gap-6 mb-8">
                    <div>
                      <p className="text-2xl font-bold font-headline text-foreground">{card.stat1.value}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{card.stat1.label}</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <p className="text-2xl font-bold font-headline text-foreground">{card.stat2.value}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{card.stat2.label}</p>
                    </div>
                  </div>

                  {card.external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-primary/90 hover:shadow-float transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Apply on e-ILP Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-primary/90 hover:shadow-float transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Run AI Check <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* â”€â”€ Bento grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-8 bg-surface-low">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">More Essentials</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-8">
              Foreign Visitors &amp; Safety
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bentoCards.map((card, i) => (
              <ScrollReveal key={card.category} variant={i % 2 === 0 ? "left" : "right"}>
                <motion.div
                  className="organic-card ghost-border overflow-hidden group cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={card.imageHint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-secondary/90 px-3 py-1 text-xs font-bold text-primary">
                        {card.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 font-headline text-5xl font-bold text-white/20 select-none">
                      {card.category}
                    </div>
                  </div>
                  <div className="p-6 bg-surface">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-1">{card.name}</p>
                    <h3 className="font-headline text-2xl font-bold leading-tight text-foreground mb-3 whitespace-pre-line">
                      {card.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{card.desc}</p>
                    {card.external ? (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                      >
                        Learn more <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Info points â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20">
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

      {/* â”€â”€ CTA banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-16 cta-gradient">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure What You Need?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Run the AI permit readiness check â€” it takes 2 minutes and tells you exactly what to prepare.
            </p>
            <Link
              href="/essentials/check"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-primary shadow-float hover:shadow-glow hover:scale-105 transition-all duration-200 active:scale-95"
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
