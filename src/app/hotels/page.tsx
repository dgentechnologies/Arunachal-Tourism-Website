import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Coffee, Wifi, Car } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const hotels = [
  {
    id: 1,
    name: "Tawang Mountain Resort",
    location: "Tawang, Arunachal Pradesh",
    price: "₹4,500",
    rating: 4.8,
    reviews: 124,
    tags: ["Resort", "Mountain View"],
    image: PlaceHolderImages.find(i => i.id === 'hotel-tawang')?.imageUrl || ''
  },
  {
    id: 2,
    name: "Ziro Valley Eco-Stay",
    location: "Ziro, Arunachal Pradesh",
    price: "₹2,800",
    rating: 4.6,
    reviews: 89,
    tags: ["Eco-friendly", "Valley View"],
    image: PlaceHolderImages.find(i => i.id === 'hotel-ziro')?.imageUrl || ''
  },
  {
    id: 3,
    name: "Namdapha River Lodge",
    location: "Miao, near Namdapha NP",
    price: "₹3,500",
    rating: 4.5,
    reviews: 56,
    tags: ["Lodge", "Riverside"],
    image: "https://picsum.photos/seed/h3/800/600"
  },
  {
    id: 4,
    name: "Itanagar Heritage Hotel",
    location: "Itanagar, Arunachal Pradesh",
    price: "₹5,200",
    rating: 4.7,
    reviews: 210,
    tags: ["Luxury", "Heritage"],
    image: "https://picsum.photos/seed/h4/800/600"
  }
]

export default function HotelsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline">Stay in the Serene</h1>
          <p className="text-muted-foreground text-base md:text-lg">Handpicked accommodations across the Land of the Rising Sun.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white px-4 py-1.5 whitespace-nowrap">Tawang</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white px-4 py-1.5 whitespace-nowrap">Ziro</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white px-4 py-1.5 whitespace-nowrap">Itanagar</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white px-4 py-1.5 whitespace-nowrap">Pasighat</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden border-none shadow-md group bg-white flex flex-col h-full">
            <div className="relative h-48 md:h-52 w-full overflow-hidden">
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
            </div>
            <CardHeader className="p-4 space-y-1">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg font-bold font-headline leading-tight">{hotel.name}</CardTitle>
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
                <span className="text-xl font-bold text-primary">{hotel.price}</span>
                <span className="text-xs text-muted-foreground ml-1">/night</span>
              </div>
              <Button size="sm" className="w-full sm:w-auto">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
