"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function EntrepreneursPage() {
  const { t } = useLanguage()

  const entrepreneurs = [
    {
      name: t.entrepreneur1Name,
      venture: t.entrepreneur1Venture,
      sector: t.entrepreneur1Sector,
      desc: t.entrepreneur1Desc,
      image: "https://picsum.photos/seed/entre1/400/400",
      color: "bg-green-100 text-green-700",
    },
    {
      name: t.entrepreneur2Name,
      venture: t.entrepreneur2Venture,
      sector: t.entrepreneur2Sector,
      desc: t.entrepreneur2Desc,
      image: "https://picsum.photos/seed/entre2/400/400",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: t.entrepreneur3Name,
      venture: t.entrepreneur3Venture,
      sector: t.entrepreneur3Sector,
      desc: t.entrepreneur3Desc,
      image: "https://picsum.photos/seed/entre3/400/400",
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: t.entrepreneur4Name,
      venture: t.entrepreneur4Venture,
      sector: t.entrepreneur4Sector,
      desc: t.entrepreneur4Desc,
      image: "https://picsum.photos/seed/entre4/400/400",
      color: "bg-yellow-100 text-yellow-700",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <ScrollReveal variant="up" className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline mb-4">{t.entrepreneursPageTitle}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">{t.entrepreneursPageSubtitle}</p>
      </ScrollReveal>

      {/* Highlight Banner */}
      <ScrollReveal variant="up" className="mb-12">
        <div className="bg-primary/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-headline">
              Rising Stars of the Himalayas
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              From ecotourism to tech, handloom to organic farming — the entrepreneurs of Arunachal Pradesh are redefining what it means to do business while honouring their roots.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 shrink-0">
            {[
              { value: "200+", label: "Active Startups" },
              { value: "5000+", label: "Jobs Created" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <span className="block text-2xl font-bold text-primary">{stat.value}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Entrepreneurs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {entrepreneurs.map((e, idx) => (
          <ScrollReveal key={idx} variant="up" delay={idx * 80}>
            <Card className="overflow-hidden border-none shadow-lg group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white h-full">
              <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                {/* Portrait */}
                <div className="relative w-full sm:w-44 h-52 sm:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={e.image}
                    alt={e.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="entrepreneur portrait"
                  />
                </div>
                {/* Details */}
                <div className="flex-1 p-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">{e.name}</h3>
                      <p className="text-sm font-semibold text-primary mt-0.5">{e.venture}</p>
                    </div>
                    <Badge className={e.color}>
                      <Briefcase className="h-3 w-3 mr-1" />{e.sector}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{e.desc}</p>
                  <button className="flex items-center gap-2 text-primary font-semibold text-sm group/btn mt-auto w-fit">
                    {t.meetEntrepreneurs} <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA Banner */}
      <ScrollReveal variant="up" className="mt-20">
        <div className="py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">
            Support Local Businesses
          </h2>
          <p className="text-lg text-white/80 max-w-xl">
            Every time you book a local homestay, hire a tribal guide, or buy handcrafted products, you directly support the economy of Arunachal Pradesh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="/hotels" className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
              {t.bookNow}
            </a>
            <a href="/guides" className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold transition-all">
              {t.viewTravelGuides}
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
