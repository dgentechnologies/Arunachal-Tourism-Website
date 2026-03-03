import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Hotel, Car, ShieldCheck, FileText, Compass, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { HeroCarousel } from "@/components/hero-carousel"
import { DestinationsCarousel } from "@/components/destinations-carousel"

const features = [
  {
    title: "Curated Travel Guides",
    desc: "Explore the hidden gems of the Himalayas through our detailed cultural and destination guides.",
    icon: Compass,
    href: "/guides",
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "Hotel Booking",
    desc: "Find and book unique stays, from mountain resorts to valley eco-stays.",
    icon: Hotel,
    href: "/hotels",
    color: "bg-orange-100 text-orange-700"
  },
  {
    title: "Transport Services",
    desc: "Reliable car and bike rentals for safe navigation through mountain terrains.",
    icon: Car,
    href: "/transport",
    color: "bg-purple-100 text-purple-700"
  },
  {
    title: "Inner Line Permits",
    desc: "Seamless digital application for required tour permits with AI assistance.",
    icon: FileText,
    href: "/permit",
    color: "bg-green-100 text-green-700"
  },
  {
    title: "Safety & Emergency",
    desc: "Locate nearest medical help and police stations instantly across the state.",
    icon: ShieldCheck,
    href: "/safety",
    color: "bg-red-100 text-red-700"
  },
  {
    title: "AI Itinerary",
    desc: "Let our AI plan your perfect trip based on your interests and travel duration.",
    icon: MapPin,
    href: "/itinerary",
    color: "bg-yellow-100 text-yellow-700"
  }
]

export default function Home() {
  return (
    <div className="flex flex-col gap-12 md:gap-20 pb-20">
      {/* Hero Carousel - bleeds up behind the transparent fixed nav */}
      <div className="-mt-16">
        <HeroCarousel />
      </div>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline mb-4">Start Your Exploration</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">Everything you need for a seamless and memorable experience in Arunachal Pradesh, all in one place.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link key={idx} href={feature.href}>
              <Card className="h-full group hover:shadow-xl transition-all border-none shadow-sm hover:-translate-y-1 bg-white">
                <CardContent className="p-6 md:p-8 flex flex-col gap-4">
                  <div className={cn("p-4 w-fit rounded-2xl", feature.color)}>
                    <feature.icon className="h-6 md:h-8 w-6 md:w-8" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold font-headline group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Destinations Carousel */}
      <DestinationsCarousel />

      {/* Destination Preview */}
      <section className="bg-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="lg:w-1/2 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={PlaceHolderImages.find(img => img.id === 'culture-monastery')?.imageUrl || ''}
                alt="Tawang Monastery"
                fill
                className="object-cover"
                data-ai-hint="buddhist monastery"
              />
            </div>
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline">Experience Ancient Culture</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                From the majestic Tawang Monastery to the vibrant festivals of the Apatani tribes in Ziro, Arunachal Pradesh offers a spiritual and cultural odyssey unlike any other.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-primary/10">
                  <span className="block text-xl md:text-2xl font-bold text-primary">26+</span>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Major Tribes</span>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-primary/10">
                  <span className="block text-xl md:text-2xl font-bold text-primary">500+</span>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Rare Species</span>
                </div>
              </div>
              <Link href="/guides" className="inline-block">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white h-12 px-8">
                  View Travel Guides
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
