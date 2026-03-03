import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Hotel, Car, ShieldCheck, FileText, Compass, MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { HeroCarousel } from "@/components/hero-carousel"
import { DestinationsCarousel } from "@/components/destinations-carousel"
import { ScrollReveal } from "@/components/scroll-reveal"

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
        <ScrollReveal variant="up" className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline mb-4">Start Your Exploration</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">Everything you need for a seamless and memorable experience in Arunachal Pradesh, all in one place.</p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <ScrollReveal key={idx} variant="up" delay={idx * 70} className="h-full">
              <Link href={feature.href} className="block h-full">
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-none shadow-sm hover:-translate-y-2 bg-white shimmer-hover cursor-pointer">
                  <CardContent className="p-6 md:p-8 flex flex-col gap-4">
                    <div className={cn(
                      "p-4 w-fit rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
                      feature.color
                    )}>
                      <feature.icon className="h-6 md:h-8 w-6 md:w-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold font-headline group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{feature.desc}</p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Destinations Carousel */}
      <ScrollReveal variant="up">
        <DestinationsCarousel />
      </ScrollReveal>

      {/* Destination Preview */}
      <section className="bg-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <ScrollReveal variant="left" className="lg:w-1/2 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl group">
              <Image 
                src={PlaceHolderImages.find(img => img.id === 'culture-monastery')?.imageUrl || ''}
                alt="Tawang Monastery"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                data-ai-hint="buddhist monastery"
              />
            </ScrollReveal>
            <ScrollReveal variant="right" className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline">Experience Ancient Culture</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                From the majestic Tawang Monastery to the vibrant festivals of the Apatani tribes in Ziro, Arunachal Pradesh offers a spiritual and cultural odyssey unlike any other.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <ScrollReveal variant="scale" delay={100} className="p-4 bg-white rounded-xl shadow-sm border border-primary/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="block text-xl md:text-2xl font-bold text-primary">26+</span>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Major Tribes</span>
                </ScrollReveal>
                <ScrollReveal variant="scale" delay={180} className="p-4 bg-white rounded-xl shadow-sm border border-primary/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="block text-xl md:text-2xl font-bold text-primary">500+</span>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Rare Species</span>
                </ScrollReveal>
              </div>
              <Link href="/guides" className="inline-block">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                  View Travel Guides
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
