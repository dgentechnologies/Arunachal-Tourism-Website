
"use client"

import { useLanguage } from "@/lib/language-context"
import ArunachalMap from "./ArunachalMap"

export default function GuidesPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-10">
        <h1 className="text-4xl font-bold text-primary font-headline mb-4">{t.guidesPageTitle}</h1>
        <p className="text-muted-foreground text-lg">
          {t.guidesPageSubtitle}
        </p>
      </div>

      {/* Interactive map — replaces the old card grid */}
      <ArunachalMap />

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
