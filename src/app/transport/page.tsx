"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Fuel, Gauge, ShieldCheck, Map, MapPin, ArrowRight, Car, Bike, Bus, Truck, Search, Phone, Star } from "lucide-react"
import { vehiclesData } from "@/lib/transport-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

// Major places in Arunachal Pradesh for suggestions
const PLACES = [
  "Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Dirang", "Along (Aalo)",
  "Namdapha", "Mechuka", "Tezu", "Roing", "Daporijo", "Changlang", "Namsai",
  "Khonsa", "Yingkiong", "Anini", "Hawai", "Seijosa", "Bhalukpong",
  "Guwahati (Assam)", "Dibrugarh (Assam)", "Tezpur (Assam)", "Jorhat (Assam)"
]

const VEHICLE_TYPES = [
  { label: "All", value: "all", icon: Search },
  { label: "Car / SUV", value: "Car", icon: Car },
  { label: "Bike", value: "Bike", icon: Bike },
  { label: "Taxi", value: "Taxi", icon: Car },
  { label: "Bus", value: "Bus", icon: Bus },
  { label: "Truck", value: "Truck", icon: Truck },
]

const TRANSPORT_COMPANIES = [
  {
    name: "Himalayan Safari Tours",
    type: "Car",
    vehicles: ["Toyota Fortuner", "Mahindra Bolero", "Innova Crysta"],
    phone: "+91-94010-XXXXX",
    rating: 4.8,
    verified: true,
    description: "Premium 4x4 tours across all districts of Arunachal Pradesh.",
  },
  {
    name: "Arunachal Taxi Service",
    type: "Taxi",
    vehicles: ["Toyota Innova", "Maruti Ertiga", "Hyundai Creta"],
    phone: "+91-98620-XXXXX",
    rating: 4.6,
    verified: true,
    description: "Reliable inter-city taxi service with experienced local drivers.",
  },
  {
    name: "Northeast Bike Rentals",
    type: "Bike",
    vehicles: ["Royal Enfield Himalayan", "RE Classic 350", "RE Bullet 500"],
    phone: "+91-70024-XXXXX",
    rating: 4.7,
    verified: true,
    description: "Best adventure motorcycle rentals for solo and group riders.",
  },
  {
    name: "Arunachal Road Transport Corp.",
    type: "Bus",
    vehicles: ["Deluxe Bus", "Ordinary Bus", "Mini Bus"],
    phone: "+91-0360-XXXXXX",
    rating: 4.1,
    verified: true,
    description: "Government-operated bus service connecting major towns.",
  },
  {
    name: "Siang Valley Expeditions",
    type: "Car",
    vehicles: ["Mahindra Thar", "Force Gurkha", "Toyota Land Cruiser"],
    phone: "+91-86380-XXXXX",
    rating: 4.9,
    verified: true,
    description: "Specialised in extreme off-road and remote valley expeditions.",
  },
  {
    name: "Donyi Polo Travel Agency",
    type: "Taxi",
    vehicles: ["Suzuki Dzire", "Honda City", "Toyota Etios"],
    phone: "+91-94360-XXXXX",
    rating: 4.4,
    verified: false,
    description: "Budget-friendly taxi and travel services across the state.",
  },
  {
    name: "Wild East Motorcycle Tours",
    type: "Bike",
    vehicles: ["Royal Enfield Scram 411", "KTM Duke 390", "Hero Xpulse 200"],
    phone: "+91-88120-XXXXX",
    rating: 4.6,
    verified: true,
    description: "Guided motorcycle tours with expert local rider-guides.",
  },
  {
    name: "Lohit Valley Transport",
    type: "Bus",
    vehicles: ["AC Sleeper Bus", "Seat-push Bus", "Ordinary Bus"],
    phone: "+91-80110-XXXXX",
    rating: 4.0,
    verified: false,
    description: "Covering eastern Arunachal — Tezu, Roing, Namsai and beyond.",
  },
]

export default function TransportPage() {
  const { t } = useLanguage()
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
  const [sourceSuggestions, setSourceSuggestions] = useState<string[]>([])
  const [destSuggestions, setDestSuggestions] = useState<string[]>([])
  const [showSourceSugg, setShowSourceSugg] = useState(false)
  const [showDestSugg, setShowDestSugg] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const sourceRef = useRef<HTMLDivElement>(null)
  const destRef = useRef<HTMLDivElement>(null)

  const getSuggestions = (value: string) =>
    value.length >= 1
      ? PLACES.filter((p) => p.toLowerCase().includes(value.toLowerCase())).slice(0, 6)
      : []

  useEffect(() => {
    setSourceSuggestions(getSuggestions(source))
  }, [source])

  useEffect(() => {
    setDestSuggestions(getSuggestions(destination))
  }, [destination])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sourceRef.current && !sourceRef.current.contains(e.target as Node)) setShowSourceSugg(false)
      if (destRef.current && !destRef.current.contains(e.target as Node)) setShowDestSugg(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const filteredVehicles = vehiclesData.filter((v) =>
    activeFilter === "all" ? true : v.type === activeFilter
  )

  const filteredCompanies = TRANSPORT_COMPANIES.filter((c) =>
    activeFilter === "all" ? true : c.type === activeFilter
  )

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-primary font-headline mb-4">{t.transportPageTitle}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{t.transportPageSubtitle}</p>
      </div>

      {/* Source & Destination Search */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/20 rounded-2xl p-6 mb-8 border border-primary/10 shadow-sm">
        <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" /> Plan Your Route
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source Input */}
          <div ref={sourceRef} className="relative">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">From (Source)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                value={source}
                onChange={(e) => { setSource(e.target.value); setShowSourceSugg(true) }}
                onFocus={() => setShowSourceSugg(true)}
                placeholder="e.g. Guwahati"
                className="pl-9 h-11"
              />
            </div>
            {showSourceSugg && sourceSuggestions.length > 0 && (
              <div className="absolute z-30 top-full mt-1 w-full bg-background border rounded-lg shadow-lg overflow-hidden">
                {sourceSuggestions.map((place) => (
                  <button
                    key={place}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary/50 flex items-center gap-2"
                    onClick={() => { setSource(place); setShowSourceSugg(false) }}
                  >
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />{place}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination Input */}
          <div ref={destRef} className="relative">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">To (Destination)</label>
            <div className="relative">
              <ArrowRight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setShowDestSugg(true) }}
                onFocus={() => setShowDestSugg(true)}
                placeholder="e.g. Tawang"
                className="pl-9 h-11"
              />
            </div>
            {showDestSugg && destSuggestions.length > 0 && (
              <div className="absolute z-30 top-full mt-1 w-full bg-background border rounded-lg shadow-lg overflow-hidden">
                {destSuggestions.map((place) => (
                  <button
                    key={place}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary/50 flex items-center gap-2"
                    onClick={() => { setDestination(place); setShowDestSugg(false) }}
                  >
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />{place}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {source && destination && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground bg-background rounded-lg px-4 py-2.5 border">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">{source}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">{destination}</span>
            <span className="ml-auto text-xs text-primary">Showing available vehicles for this route</span>
          </div>
        )}
      </div>

      {/* Vehicle Type Filters */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Filter by Vehicle Type</h2>
        <div className="flex flex-wrap gap-2">
          {VEHICLE_TYPES.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.value}
                onClick={() => setActiveFilter(type.value)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  activeFilter === type.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {type.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Vehicle Cards */}
      {filteredVehicles.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary font-headline mb-6">Available Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVehicles.map((v) => (
              <Card key={v.id} className="overflow-hidden border-none shadow-lg flex flex-col md:flex-row h-full">
                <Link href={`/transport/${v.id}`} className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden block">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-cover"
                    data-ai-hint="vehicle display"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 hover:bg-primary">{v.type}</Badge>
                  </div>
                </Link>
                <div className="flex-1 flex flex-col p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-bold font-headline mb-2">
                      <Link href={`/transport/${v.id}`} className="hover:text-primary transition-colors">{v.name}</Link>
                    </CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center"><Users className="h-4 w-4 mr-1 text-primary" /> {v.capacity}</div>
                      <div className="flex items-center"><Fuel className="h-4 w-4 mr-1 text-primary" /> {v.fuel}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 mb-6 flex-grow">
                    <div className="grid grid-cols-2 gap-2">
                      {v.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-center text-xs text-muted-foreground bg-secondary/30 p-2 rounded">
                          <ShieldCheck className="h-3 w-3 mr-1 text-green-600" /> {f}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">₹{v.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-1">{v.priceUnit}</span>
                    </div>
                    <Link href={`/transport/${v.id}/book`}>
                      <Button className="font-bold">{t.reserveNow}</Button>
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {filteredVehicles.length === 0 && (
        <div className="text-center py-16 text-muted-foreground mb-12">
          <Bus className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">No vehicles found for this filter.</p>
          <p className="text-sm mt-1">Try a different vehicle type.</p>
        </div>
      )}

      {/* Transport Companies */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-primary font-headline mb-2">Vehicle Providers & Companies</h2>
        <p className="text-muted-foreground text-sm mb-6">Contact these verified transport operators directly to book your vehicle.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompanies.map((company) => (
            <Card key={company.name} className="border border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-base">{company.name}</h3>
                      {company.verified && (
                        <Badge className="bg-green-100 text-green-700 text-xs border-none px-1.5 py-0.5">
                          <ShieldCheck className="h-3 w-3 mr-1" />Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{company.rating}</span>
                      <span>· {company.type}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs">{company.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{company.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {company.vehicles.map((v) => (
                    <span key={v} className="text-xs bg-secondary/40 px-2 py-1 rounded-full text-muted-foreground">
                      {v}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:underline">
                    {company.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Row */}
      <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm"><Map className="h-8 w-8 text-primary" /></div>
            <h3 className="font-bold text-lg">{t.gpsEnabled}</h3>
            <p className="text-sm text-muted-foreground">{t.gpsDesc}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm"><ShieldCheck className="h-8 w-8 text-primary" /></div>
            <h3 className="font-bold text-lg">{t.fullyInsured}</h3>
            <p className="text-sm text-muted-foreground">{t.fullyInsuredDesc}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm"><Gauge className="h-8 w-8 text-primary" /></div>
            <h3 className="font-bold text-lg">{t.verifiedDrivers}</h3>
            <p className="text-sm text-muted-foreground">{t.verifiedDriversDesc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
