"use client"

import { notFound, useRouter } from "next/navigation"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { hotelsData } from "@/lib/hotels-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"
import {
  Star, MapPin, ArrowLeft, Wifi, Coffee, Car, Thermometer,
  Utensils, ConciergeBell, Clock, CheckCircle, ChevronRight,
  Users, Shield,
} from "lucide-react"

const amenityIcons: Record<string, ReactNode> = {
  wifi: <Wifi className="h-5 w-5" />,
  coffee: <Coffee className="h-5 w-5" />,
  car: <Car className="h-5 w-5" />,
  thermometer: <Thermometer className="h-5 w-5" />,
  utensils: <Utensils className="h-5 w-5" />,
  "concierge-bell": <ConciergeBell className="h-5 w-5" />,
  leaf: <CheckCircle className="h-5 w-5" />,
  map: <MapPin className="h-5 w-5" />,
  binoculars: <CheckCircle className="h-5 w-5" />,
  campfire: <CheckCircle className="h-5 w-5" />,
  dumbbell: <CheckCircle className="h-5 w-5" />,
  "swimming-pool": <CheckCircle className="h-5 w-5" />,
  spa: <CheckCircle className="h-5 w-5" />,
}

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const hotel = hotelsData.find((h) => h.id === Number(id))

  if (!hotel) return notFound()

  return (
    <div className="min-h-screen bg-background">
      {/* ── Back navigation ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Hotels
        </button>
      </div>

      {/* ── Hero image grid ── */}
      <div className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[480px] rounded-2xl overflow-hidden">
          <div className="col-span-4 md:col-span-2 row-span-2 relative">
            <Image src={hotel.images[0]} alt={hotel.name} fill className="object-cover" priority />
          </div>
          {hotel.images.slice(1).map((img, i) => (
            <div key={i} className="relative hidden md:block">
              <Image src={img} alt={`${hotel.name} ${i + 2}`} fill className="object-cover" />
            </div>
          ))}
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
                {hotel.tags.map((tag) => (
                  <Badge key={tag} className="bg-primary/10 text-primary hover:bg-primary/20 border-0">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-2">{hotel.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" />{hotel.location}</span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <span className="font-bold text-foreground">{hotel.rating}</span>
                  <span>({hotel.reviews} reviews)</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold font-headline mb-3">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed">{hotel.longDescription}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold font-headline mb-4">Property Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hotel.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold font-headline mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {hotel.amenities.map((a) => (
                  <div key={a.label} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-border/50">
                    <span className="text-primary">{amenityIcons[a.icon] ?? <CheckCircle className="h-5 w-5" />}</span>
                    <span className="text-sm font-medium">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <h2 className="text-xl font-bold font-headline mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                    <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden shrink-0">
                      <Image src={room.image} alt={room.type} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-base mb-1">{room.type}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {room.capacity}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="text-2xl font-bold text-primary">₹{room.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground ml-1">/night</span>
                        </div>
                        <Link href={`/hotels/${hotel.id}/book?room=${encodeURIComponent(room.type)}&price=${room.price}`}>
                          <Button size="sm">Select Room</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-10">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-border/50">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Check-in</p>
                  <p className="font-medium text-sm">{hotel.checkIn}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-border/50">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Check-out</p>
                  <p className="font-medium text-sm">{hotel.checkOut}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-border/50">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Cancellation</p>
                  <p className="font-medium text-sm">{hotel.cancellation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right sticky panel ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-border/60 p-6 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Starting from</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-primary">₹{hotel.price.toLocaleString()}</span>
                  <span className="text-muted-foreground mb-1">/night</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <span className="font-bold text-sm">{hotel.rating}</span>
                  <span className="text-xs text-muted-foreground">· {hotel.reviews} reviews</span>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {hotel.district}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  Check-in {hotel.checkIn} · Check-out {hotel.checkOut}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  {hotel.cancellation}
                </div>
              </div>

              <Link href={`/hotels/${hotel.id}/book?room=${encodeURIComponent(hotel.rooms[0].type)}&price=${hotel.rooms[0].price}`} className="block">
                <Button className="w-full h-12 text-base font-bold rounded-xl">
                  Book Now <ChevronRight className="h-4 w-4 ml-1" />
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
