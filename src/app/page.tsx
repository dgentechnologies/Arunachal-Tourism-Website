import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Hotel, Car, ShieldCheck, FileText, Compass, MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-mountains')

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {heroImg && (
          <Image
            src={heroImg.imageUrl}
            alt={heroImg.description}
            fill
            className="object-cover brightness-75"
            priority
            data-ai-hint={heroImg.imageHint}
          />
        )}
        <div className="container relative z-10 px-4 text-center text-white flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline mb-6 drop-shadow-lg max-w-4xl">
            Arunachal Pradesh: The Land of the Rising Sun
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 drop-shadow-md font-medium text-white/90">
            Embark on a journey through untouched landscapes, vibrant tribal cultures, and serene monasteries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/permit">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-xl">
                Get Your Permit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/itinerary">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold shadow-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none">
                Plan My Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline mb-4">Start Your Exploration</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need for a seamless and memorable experience in Arunachal Pradesh, all in one place.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link key={idx} href={feature.href}>
              <Card className="h-full group hover:shadow-xl transition-all border-none shadow-sm hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col gap-4">
                  <div className={cn("p-4 w-fit rounded-2xl", feature.color)}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Destination Preview */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={PlaceHolderImages.find(img => img.id === 'culture-monastery')?.imageUrl || ''}
                alt="Tawang Monastery"
                fill
                className="object-cover"
                data-ai-hint="buddhist monastery"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">Experience Ancient Culture</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From the majestic Tawang Monastery to the vibrant festivals of the Apatani tribes in Ziro, Arunachal Pradesh offers a spiritual and cultural odyssey unlike any other.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl shadow-sm">
                  <span className="block text-2xl font-bold text-primary">26+</span>
                  <span className="text-sm text-muted-foreground font-medium">Major Tribes</span>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm">
                  <span className="block text-2xl font-bold text-primary">500+</span>
                  <span className="text-sm text-muted-foreground font-medium">Rare Species</span>
                </div>
              </div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                View Travel Guides
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
