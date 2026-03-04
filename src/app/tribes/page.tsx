"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function TribesPage() {
  const { t } = useLanguage()

  const tribes = [
    {
      name: t.tribe1Name,
      region: t.tribe1Region,
      desc: t.tribe1Desc,
      image: "https://picsum.photos/seed/tribe-adi/800/600",
      color: "bg-orange-100 text-orange-700",
      festival: "Solung & Ponung",
    },
    {
      name: t.tribe2Name,
      region: t.tribe2Region,
      desc: t.tribe2Desc,
      image: "https://picsum.photos/seed/tribe-apatani/800/600",
      color: "bg-green-100 text-green-700",
      festival: "Myoko & Dree",
    },
    {
      name: t.tribe3Name,
      region: t.tribe3Region,
      desc: t.tribe3Desc,
      image: "https://picsum.photos/seed/tribe-nyishi/800/600",
      color: "bg-blue-100 text-blue-700",
      festival: "Nyokum Yullo",
    },
    {
      name: t.tribe4Name,
      region: t.tribe4Region,
      desc: t.tribe4Desc,
      image: "https://picsum.photos/seed/tribe-monpa/800/600",
      color: "bg-purple-100 text-purple-700",
      festival: "Torgya & Losar",
    },
    {
      name: t.tribe5Name,
      region: t.tribe5Region,
      desc: t.tribe5Desc,
      image: "https://picsum.photos/seed/tribe-wancho/800/600",
      color: "bg-red-100 text-red-700",
      festival: "Oriah",
    },
    {
      name: t.tribe6Name,
      region: t.tribe6Region,
      desc: t.tribe6Desc,
      image: "https://picsum.photos/seed/tribe-galo/800/600",
      color: "bg-yellow-100 text-yellow-700",
      festival: "Mopin",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <ScrollReveal variant="up" className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-primary font-headline mb-4">{t.tribesPageTitle}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">{t.tribesPageSubtitle}</p>
      </ScrollReveal>

      {/* Stats Banner */}
      <ScrollReveal variant="up" className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary/5 rounded-2xl p-6 md:p-8">
          {[
            { value: "26+", label: "Recognised Tribes" },
            { value: "100+", label: "Dialects & Languages" },
            { value: "500+", label: "Years of Heritage" },
            { value: "30+", label: "Distinct Festivals" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-2xl md:text-3xl font-bold text-primary">{stat.value}</span>
              <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Tribes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tribes.map((tribe, idx) => (
          <ScrollReveal key={idx} variant="up" delay={idx * 70}>
            <Card className="overflow-hidden border-none shadow-lg group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={tribe.image}
                  alt={tribe.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint="indigenous tribe culture"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-2xl font-bold font-headline">{tribe.name}</h3>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{t.tribesRegionLabel}: {tribe.region}</span>
                  </div>
                  <Badge className={tribe.color}>{tribe.festival}</Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{tribe.desc}</p>
                <button className="flex items-center gap-2 text-primary font-semibold text-sm group/btn mt-2 w-fit">
                  {t.discoverTribes} <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA Banner */}
      <ScrollReveal variant="up" className="mt-20">
        <div className="py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">
            Experience Living Cultures Firsthand
          </h2>
          <p className="text-lg text-white/80 max-w-xl">
            Plan a cultural immersion tour with local tribal guides and witness ancient festivals, crafts, and traditions that have endured for centuries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="/itinerary" className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
              {t.planItinerary}
            </a>
            <a href="/guides" className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold transition-all">
              {t.readFullGuide}
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
