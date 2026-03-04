
"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function GuidesPage() {
  const { t } = useLanguage()

  const guides = [
    { title: t.guide1Title, category: t.guide1Category, desc: t.guide1Desc, image: "https://picsum.photos/seed/guide1/800/600", bestTime: "Mar - June", location: "Tawang District" },
    { title: t.guide2Title, category: t.guide2Category, desc: t.guide2Desc, image: "https://picsum.photos/seed/guide2/800/600", bestTime: "Year-round", location: "Lower Subansiri" },
    { title: t.guide3Title, category: t.guide3Category, desc: t.guide3Desc, image: "https://picsum.photos/seed/guide3/800/600", bestTime: "Oct - Apr", location: "Changlang District" },
    { title: t.guide4Title, category: t.guide4Category, desc: t.guide4Desc, image: "https://picsum.photos/seed/guide4/800/600", bestTime: "Nov - Mar", location: "East Siang" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-primary font-headline mb-4">{t.guidesPageTitle}</h1>
        <p className="text-muted-foreground text-lg">
          {t.guidesPageSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((guide, idx) => (
          <Card key={idx} className="overflow-hidden border-none shadow-lg group flex flex-col md:flex-row bg-white">
            <div className="relative w-full md:w-2/5 h-64 md:h-auto">
              <Image 
                src={guide.image} 
                alt={guide.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="destination view"
              />
            </div>
            <div className="flex-1 p-6 flex flex-col">
              <Badge variant="secondary" className="w-fit mb-3">{guide.category}</Badge>
              <h3 className="text-2xl font-bold font-headline mb-3 group-hover:text-primary transition-colors">{guide.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 flex-grow">{guide.desc}</p>
              
              <div className="flex items-center gap-6 text-xs text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-primary" />
                  <span>{t.bestTimeLabel}: {guide.bestTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>{guide.location}</span>
                </div>
              </div>

              <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                {t.readFullGuide} <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-20 py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">{t.guideCTATitle}</h2>
        <p className="text-lg text-white/80 max-w-xl">
          {t.guideCTADesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">{t.applyForPermit}</button>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold transition-all">{t.planItinerary}</button>
        </div>
      </div>
    </div>
  )
}
