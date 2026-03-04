"use client"

import { notFound, useRouter } from "next/navigation"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { vehiclesData } from "@/lib/transport-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users, Fuel, ArrowLeft, Shield, CheckCircle,
  ChevronRight, Map, Gauge, Info,
} from "lucide-react"

export default function TransportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const vehicle = vehiclesData.find((v) => v.id === Number(id))

  if (!vehicle) return notFound()

  return (
    <div className="min-h-screen bg-background">
      {/* ── Back navigation ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Transport
        </button>
      </div>

      {/* ── Hero image grid ── */}
      <div className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-3 gap-2 h-[360px] md:h-[440px] rounded-2xl overflow-hidden">
          <div className="col-span-3 md:col-span-2 relative">
            <Image src={vehicle.images[0]} alt={vehicle.name} fill className="object-cover" priority />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2">
            {vehicle.images.slice(1, 3).map((img, i) => (
              <div key={i} className="relative">
                <Image src={img} alt={`${vehicle.name} ${i + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">{vehicle.type}</Badge>
                <Badge variant="outline">{vehicle.category}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-2">{vehicle.name}</h1>
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mt-3">
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />{vehicle.capacity}</span>
                <span className="flex items-center gap-1.5"><Fuel className="h-4 w-4 text-primary" />{vehicle.fuel}</span>
                <span className="flex items-center gap-1.5"><Map className="h-4 w-4 text-primary" />{vehicle.route}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold font-headline mb-3">About This Vehicle</h2>
              <p className="text-muted-foreground leading-relaxed">{vehicle.longDescription}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-bold font-headline mb-4">Features & Equipment</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vehicle.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-border/50">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-bold font-headline mb-4">Technical Specifications</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                {vehicle.specs.map((spec, i) => (
                  <div key={i} className={`flex items-center justify-between px-6 py-4 text-sm ${i < vehicle.specs.length - 1 ? "border-b border-border/50" : ""}`}>
                    <span className="text-muted-foreground font-medium">{spec.label}</span>
                    <span className="font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div>
              <h2 className="text-xl font-bold font-headline mb-4">What&apos;s Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.includes.map((inc, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-10">
              {[
                { icon: Map, title: "GPS Enabled", desc: "Pre-loaded offline maps for remote connectivity" },
                { icon: Shield, title: "Fully Insured", desc: "Comprehensive coverage including roadside assistance" },
                { icon: Gauge, title: "Verified Vehicles", desc: "All vehicles are serviced and safety-checked monthly" },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-border/50">
                  <div className="bg-primary/10 rounded-lg p-2 shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right sticky panel ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-border/60 p-6 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Daily Rate</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-primary">₹{vehicle.price.toLocaleString()}</span>
                  <span className="text-muted-foreground mb-1">/day</span>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" /> {vehicle.capacity}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Fuel className="h-4 w-4 text-primary" /> {vehicle.fuel}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Map className="h-4 w-4 text-primary" /> {vehicle.route}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Info className="h-4 w-4 text-primary" /> {vehicle.category}
                </div>
              </div>

              <Link href={`/transport/${vehicle.id}/book`} className="block">
                <Button className="w-full h-12 text-base font-bold rounded-xl">
                  Reserve Now <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>

              <p className="text-xs text-center text-muted-foreground">
                No payment charged until confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
