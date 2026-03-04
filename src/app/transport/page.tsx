
"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Fuel, Gauge, ShieldCheck, Map } from "lucide-react"
import { vehiclesData } from "@/lib/transport-data"
import { useLanguage } from "@/lib/language-context"

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
        {vehiclesData.map((v) => (
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
