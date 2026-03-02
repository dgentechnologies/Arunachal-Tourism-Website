
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react"

const guides = [
  {
    title: "Tawang: The Hidden Paradise",
    category: "Mountain Destination",
    desc: "Discover the 400-year-old Tawang Monastery, frozen lakes, and the spirit of peace.",
    image: "https://picsum.photos/seed/guide1/800/600",
    bestTime: "Mar - June",
    location: "Tawang District"
  },
  {
    title: "Ziro: Echoes of Music and Culture",
    category: "Valley / Cultural",
    desc: "Experience the unique sustainable farming of Apatani tribe and the famous Ziro Music Festival.",
    image: "https://picsum.photos/seed/guide2/800/600",
    bestTime: "Year-round",
    location: "Lower Subansiri"
  },
  {
    title: "Namdapha: The Wild Frontier",
    category: "Wildlife / Nature",
    desc: "One of the richest biodiversity hotspots in the Himalayas. Home to the rare clouded leopard.",
    image: "https://picsum.photos/seed/guide3/800/600",
    bestTime: "Oct - Apr",
    location: "Changlang District"
  },
  {
    title: "Pasighat: The Gateway City",
    category: "Riverside / Adventure",
    desc: "Located on the banks of Siang river, perfect for white water rafting and river camping.",
    image: "https://picsum.photos/seed/guide4/800/600",
    bestTime: "Nov - Mar",
    location: "East Siang"
  }
]

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-primary font-headline mb-4">Curated Travel Guides</h1>
        <p className="text-muted-foreground text-lg">
          Expert insights into the most captivating destinations, festivals, and cultural experiences of Arunachal Pradesh.
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
                  <span>Best: {guide.bestTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>{guide.location}</span>
                </div>
              </div>

              <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                Read Full Guide <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-20 py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">Ready to embark on your Himalayan journey?</h2>
        <p className="text-lg text-white/80 max-w-xl">
          Apply for your Inner Line Permit now and start planning your unique itinerary with our AI assistant.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">Apply for Permit</button>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold transition-all">Plan Itinerary</button>
        </div>
      </div>
    </div>
  )
}
