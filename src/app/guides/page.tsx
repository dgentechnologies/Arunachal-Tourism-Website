
"use client"

import { useLanguage } from "@/lib/language-context"
import ArunachalMap from "./ArunachalMap"
import { Mountain, Users, MapPin, Compass } from "lucide-react"

const STATS = [
  { icon: Mountain,  value: "26+",  label: "Districts" },
  { icon: Users,     value: "26+",  label: "Major Tribes" },
  { icon: MapPin,    value: "9",    label: "Destinations" },
  { icon: Compass,   value: "3",    label: "UNESCO Sites" },
]

export default function GuidesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">

      {/* ── Premium hero header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-emerald-800">
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-6 pt-10 pb-8 relative z-10">
          {/* Breadcrumb pill */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white/80 text-xs font-medium mb-5 backdrop-blur-sm">
            <Compass className="h-3 w-3" />
            Arunachal Pradesh · Travel Guides
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-headline leading-tight mb-3">
                {t.guidesPageTitle}
              </h1>
              <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-xl">
                {t.guidesPageSubtitle}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 md:gap-6 shrink-0">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <div className="bg-white/10 border border-white/20 rounded-xl p-2 mb-1.5">
                    <Icon className="h-4 w-4 text-white/90" />
                  </div>
                  <span className="text-white font-bold text-lg leading-none">{value}</span>
                  <span className="text-white/60 text-[10px] mt-0.5 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Full-viewport map ── */}
      <div className="container mx-auto px-4 py-6">
        <ArunachalMap />
      </div>

    </div>
  )
}
