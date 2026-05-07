"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useLanguage } from "@/lib/language-context"
import { Building2, Phone, Mail, MapPin, Star, ShieldCheck, Clock3, Globe2 } from "lucide-react"

type TravelAgent = {
  agency: string
  location: string
  specialization: string
  contact: string
  email: string
  rating: number
}

const travelAgents: TravelAgent[] = [
  {
    agency: "Donyi Polo Travel Collective",
    location: "Itanagar",
    specialization: "Permit-ready capital and cultural circuits",
    contact: "+91 94360 11220",
    email: "hello@donyipolotravel.in",
    rating: 4.9,
  },
  {
    agency: "Monpa Highland Expeditions",
    location: "Tawang",
    specialization: "High-altitude monastery and Sela Pass routes",
    contact: "+91 94852 44109",
    email: "ops@monpahighland.com",
    rating: 4.8,
  },
  {
    agency: "Ziro Valley Journeys",
    location: "Ziro",
    specialization: "Homestay-led Apatani culture experiences",
    contact: "+91 87943 22481",
    email: "plan@zirovalleyjourneys.com",
    rating: 4.7,
  },
  {
    agency: "Siang River & Trails",
    location: "Pasighat",
    specialization: "Adventure logistics and river expedition support",
    contact: "+91 87310 88420",
    email: "team@siangtrails.in",
    rating: 4.8,
  },
  {
    agency: "Mishmi Frontier Routes",
    location: "Roing",
    specialization: "Dibang and Mishmi hills wilderness access",
    contact: "+91 94027 65571",
    email: "contact@mishmifrontier.in",
    rating: 4.6,
  },
  {
    agency: "Kameng Circuit Operators Guild",
    location: "Bomdila",
    specialization: "Road transfers across Western Arunachal",
    contact: "+91 87947 33862",
    email: "desk@kamengcircuit.org",
    rating: 4.7,
  },
  {
    agency: "Mechuka Sky Valley Travels",
    location: "Mechuka",
    specialization: "Remote valley access and curated local stays",
    contact: "+91 98621 77445",
    email: "booking@skyvalleymechuka.com",
    rating: 4.8,
  },
  {
    agency: "Namdapha Eco Routes",
    location: "Miao",
    specialization: "Wildlife-focused routes and eco permits guidance",
    contact: "+91 98567 90314",
    email: "info@namdaphaecoroutes.org",
    rating: 4.7,
  },
]

export default function TravelAgentsPage() {
  const { t } = useLanguage()

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <section className="relative min-h-[48vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=900&fit=crop&auto=format&q=80"
          alt="Travel planner desk with maps and route notes for mountain journeys"
          fill
          className="object-cover"
          priority
          data-ai-hint="travel desk maps planning mountain trip"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/35 to-transparent" />
        <div className="relative container mx-auto px-4 pb-12 pt-28">
          <ScrollReveal>
            <Badge className="mb-4 bg-secondary text-secondary-foreground font-semibold tracking-wide">
              {t.navPlan}
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
              {t.travelAgentsPageTitle}
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-3xl">{t.travelAgentsPageSubtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-primary py-5">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-white">
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs text-white/75">{t.travelAgentsStat1Label}</p>
            <p className="font-headline text-2xl font-bold text-secondary">32+</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs text-white/75">{t.travelAgentsStat2Label}</p>
            <p className="font-headline text-2xl font-bold text-secondary">15</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs text-white/75">{t.travelAgentsStat3Label}</p>
            <p className="font-headline text-2xl font-bold text-secondary">2 hrs</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3">
            <p className="text-xs text-white/75">{t.travelAgentsStat4Label}</p>
            <p className="font-headline text-2xl font-bold text-secondary">24/7</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-16">
        <ScrollReveal>
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">{t.travelAgentsSectionTitle}</h2>
            <p className="text-muted-foreground max-w-3xl">{t.travelAgentsSectionSubtitle}</p>
          </div>
        </ScrollReveal>

        <div className="hidden lg:block organic-card ghost-border overflow-hidden bg-surface-lowest">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-low border-b border-border">
                <tr className="text-left">
                  <th className="px-5 py-4 font-semibold text-foreground">{t.travelAgentsTableAgency}</th>
                  <th className="px-5 py-4 font-semibold text-foreground">{t.travelAgentsTableLocation}</th>
                  <th className="px-5 py-4 font-semibold text-foreground">{t.travelAgentsTableSpeciality}</th>
                  <th className="px-5 py-4 font-semibold text-foreground">{t.travelAgentsTableContact}</th>
                  <th className="px-5 py-4 font-semibold text-foreground">{t.travelAgentsTableRating}</th>
                </tr>
              </thead>
              <tbody>
                {travelAgents.map((agent) => (
                  <tr key={agent.agency} className="border-b border-border/80 hover:bg-surface-low transition-colors">
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <span className="rounded-lg bg-primary/10 p-2 text-primary">
                          <Building2 className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">{agent.agency}</p>
                          <p className="text-xs text-muted-foreground mt-1">{t.travelAgentsVerifiedLabel}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {agent.location}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top text-muted-foreground">{agent.specialization}</td>
                    <td className="px-5 py-4 align-top">
                      <div className="space-y-1.5">
                        <p className="inline-flex items-center gap-1.5 text-foreground/90">
                          <Phone className="h-3.5 w-3.5 text-primary" />
                          {agent.contact}
                        </p>
                        <p className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Mail className="h-3.5 w-3.5 text-primary" />
                          {agent.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2.5 py-1 text-xs font-semibold text-foreground">
                        <Star className="h-3.5 w-3.5 text-secondary-foreground fill-secondary-foreground" />
                        {agent.rating.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid lg:hidden gap-4">
          {travelAgents.map((agent, index) => (
            <ScrollReveal key={agent.agency} variant={index % 2 === 0 ? "left" : "right"}>
              <article className="organic-card ghost-border bg-surface-lowest p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-headline text-lg font-bold text-foreground">{agent.agency}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2.5 py-1 text-xs font-semibold text-foreground">
                    <Star className="h-3.5 w-3.5 text-secondary-foreground fill-secondary-foreground" />
                    {agent.rating.toFixed(1)}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  <p className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> {agent.location}</p>
                  <p className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-primary" /> {agent.contact}</p>
                  <p className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-primary" /> {agent.email}</p>
                </div>
                <p className="mt-4 text-sm text-foreground/80">{agent.specialization}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-surface-low py-12">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="organic-card ghost-border bg-background p-6 md:p-8">
              <h3 className="font-headline text-2xl font-bold text-foreground mb-4">{t.travelAgentsSupportTitle}</h3>
              <p className="text-muted-foreground mb-6 max-w-3xl">{t.travelAgentsSupportSubtitle}</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-surface-low p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    {t.travelAgentsInfo1Title}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.travelAgentsInfo1Desc}</p>
                </div>
                <div className="rounded-lg bg-surface-low p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
                    <Clock3 className="h-4 w-4 text-primary" />
                    {t.travelAgentsInfo2Title}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.travelAgentsInfo2Desc}</p>
                </div>
                <div className="rounded-lg bg-surface-low p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
                    <Globe2 className="h-4 w-4 text-primary" />
                    {t.travelAgentsInfo3Title}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.travelAgentsInfo3Desc}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
