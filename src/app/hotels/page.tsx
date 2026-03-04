"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Coffee, Wifi, Car } from "lucide-react"
import { hotelsData } from "@/lib/hotels-data"
import { useLanguage } from "@/lib/language-context"

export default function HotelsPage() {
  const { t } = useLanguage()
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline">{t.hotelsPageTitle}</h1>
          <p className="text-muted-foreground text-base md:text-lg">{t.hotelsPageSubtitle}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white px-4 py-1.5 whitespace-nowrap">Tawang</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white px-4 py-1.5 whitespace-nowrap">Ziro</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white px-4 py-1.5 whitespace-nowrap">Itanagar</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white px-4 py-1.5 whitespace-nowrap">Pasighat</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotelsData.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden border-none shadow-md group bg-white flex flex-col h-full">
            <Link href={`/hotels/${hotel.id}`} className="relative h-48 md:h-52 w-full overflow-hidden block">
              <Image 
                src={hotel.image} 
                alt={hotel.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                data-ai-hint="hotel view"
              />
              <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1">
                {hotel.tags.map(tag => (
                  <Badge key={tag} className="bg-white/90 text-primary hover:bg-white text-[10px] py-0">{tag}</Badge>
                ))}
              </div>
            </Link>
            <CardHeader className="p-4 space-y-1">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg font-bold font-headline leading-tight">
                  <Link href={`/hotels/${hotel.id}`} className="hover:text-primary transition-colors">{hotel.name}</Link>
                </CardTitle>
                <div className="flex items-center text-xs font-bold text-orange-500 shrink-0">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  {hotel.rating}
                </div>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                {hotel.location}
              </div>
            </CardHeader>
            <CardContent className="px-4 py-0 flex gap-4 text-muted-foreground flex-grow">
              <Coffee className="h-4 w-4" title="Breakfast Included" />
              <Wifi className="h-4 w-4" title="Free WiFi" />
              <Car className="h-4 w-4" title="Parking available" />
            </CardContent>
            <CardFooter className="p-4 flex flex-col sm:flex-row items-center justify-between border-t mt-4 gap-4">
              <div className="w-full sm:w-auto text-left">
                <span className="text-xl font-bold text-primary">₹{hotel.price.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground ml-1">{t.perNight}</span>
              </div>
              <Link href={`/hotels/${hotel.id}/book?room=${encodeURIComponent(hotel.rooms[0].type)}&price=${hotel.rooms[0].price}`}>
                <Button size="sm" className="w-full sm:w-auto">{t.bookNow}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
