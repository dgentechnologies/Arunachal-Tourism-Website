
"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Fuel, Gauge, ShieldCheck, Map } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/lib/language-context"

const vehicles = [
  {
    id: 1,
    name: "Toyota Fortuner (4x4)",
    type: "Car",
    capacity: "6-7 Persons",
    fuel: "Diesel",
    price: "₹6,500/day",
    image: PlaceHolderImages.find(i => i.id === 'transport-suv')?.imageUrl || '',
    features: ["A/C", "Off-road capable", "Driver included"]
  },
  {
    id: 2,
    name: "Royal Enfield Himalayan",
    type: "Bike",
    capacity: "2 Persons",
    fuel: "Petrol",
    price: "₹2,200/day",
    image: PlaceHolderImages.find(i => i.id === 'transport-bike')?.imageUrl || '',
    features: ["Helmet included", "Side panniers", "GPS Support"]
  },
  {
    id: 3,
    name: "Mahindra Bolero",
    type: "Car",
    capacity: "7-9 Persons",
    fuel: "Diesel",
    price: "₹4,200/day",
    image: "https://picsum.photos/seed/v3/800/600",
    features: ["Rugged built", "Reliable", "Local driver"]
  },
  {
    id: 4,
    name: "Royal Enfield Classic 350",
    type: "Bike",
    capacity: "2 Persons",
    fuel: "Petrol",
    price: "₹1,800/day",
    image: "https://picsum.photos/seed/v4/800/600",
    features: ["Vintage style", "Stable", "Touring kit"]
  }
]

export default function TransportPage() {
  const { t } = useLanguage()
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary font-headline mb-4">{t.transportPageTitle}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t.transportPageSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vehicles.map((v) => (
          <Card key={v.id} className="overflow-hidden border-none shadow-lg flex flex-col md:flex-row h-full">
            <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
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
            </div>
            <div className="flex-1 flex flex-col p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl font-bold font-headline mb-2">{v.name}</CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center"><Users className="h-4 w-4 mr-1 text-primary" /> {v.capacity}</div>
                  <div className="flex items-center"><Fuel className="h-4 w-4 mr-1 text-primary" /> {v.fuel}</div>
                </div>
              </CardHeader>
              <CardContent className="p-0 mb-6 flex-grow">
                <div className="grid grid-cols-2 gap-2">
                  {v.features.map((f, i) => (
                    <div key={i} className="flex items-center text-xs text-muted-foreground bg-secondary/30 p-2 rounded">
                      <ShieldCheck className="h-3 w-3 mr-1 text-green-600" /> {f}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-0 flex items-center justify-between border-t pt-4">
                <div>
                  <span className="text-2xl font-bold text-primary">{v.price}</span>
                </div>
                <Button className="font-bold">{t.reserveNow}</Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 p-8 bg-primary/5 rounded-3xl border border-primary/10">
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
