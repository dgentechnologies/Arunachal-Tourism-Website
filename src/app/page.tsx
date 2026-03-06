"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Hotel, Car, ShieldCheck, FileText, Compass, MapPin, ArrowRight, Users, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { HeroCarousel } from "@/components/hero-carousel"
import { DestinationsCarousel } from "@/components/destinations-carousel"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ScrollytellingSection } from "@/components/scrollytelling-section"
import { useLanguage } from "@/lib/language-context"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { ReviewForm } from "@/components/review-form"

export default function Home() {
  const { t } = useLanguage()

  const features = [
    { title: t.featGuidesTitle, desc: t.featGuidesDesc, icon: Compass, href: "/guides", color: "bg-blue-100 text-blue-700" },
    { title: t.featHotelsTitle, desc: t.featHotelsDesc, icon: Hotel, href: "/hotels", color: "bg-orange-100 text-orange-700" },
    { title: t.featTransportTitle, desc: t.featTransportDesc, icon: Car, href: "/transport", color: "bg-purple-100 text-purple-700" },
    { title: t.featPermitTitle, desc: t.featPermitDesc, icon: FileText, href: "/permit", color: "bg-green-100 text-green-700" },
    { title: t.featSafetyTitle, desc: t.featSafetyDesc, icon: ShieldCheck, href: "/safety", color: "bg-red-100 text-red-700" },
    { title: t.featItineraryTitle, desc: t.featItineraryDesc, icon: MapPin, href: "/itinerary", color: "bg-yellow-100 text-yellow-700" },
  ]

  return (
    <div className="flex flex-col gap-12 md:gap-20 pb-20">
      {/* Hero Carousel - bleeds up behind the transparent fixed nav */}
      <div className="-mt-16">
        <HeroCarousel />
      </div>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <ScrollReveal variant="up" className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline mb-4">{t.homeExploreTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">{t.homeExploreSubtitle}</p>
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
                      {t.learnMore} <ArrowRight className="h-3.5 w-3.5" />
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

      {/* Tribes & Entrepreneurs Section */}
      <section className="container mx-auto px-4">
        <ScrollReveal variant="up" className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline mb-4">{t.homeCultureSectionTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">{t.homeCultureSectionSubtitle}</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tribes Card */}
          <ScrollReveal variant="left">
            <Link href="/tribes" className="block group">
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64 md:h-80 w-full">
                  <Image
                    src="https://picsum.photos/seed/tribes-landing/800/600"
                    alt="Local Tribes of Arunachal Pradesh"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint="indigenous tribal culture festival"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/80">Culture</span>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-2">{t.featTribesTitle}</h3>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{t.featTribesDesc}</p>
                  <span className="inline-flex items-center gap-2 font-semibold text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors group-hover:bg-primary">
                    {t.exploreTribes} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Entrepreneurs Card */}
          <ScrollReveal variant="right">
            <Link href="/entrepreneurs" className="block group">
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64 md:h-80 w-full">
                  <Image
                    src="https://picsum.photos/seed/entrepreneurs-landing/800/600"
                    alt="Entrepreneurs of Arunachal Pradesh"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint="entrepreneur business innovation"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <Lightbulb className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/80">Innovation</span>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-2">{t.featEntrepreneursTitle}</h3>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{t.featEntrepreneursDesc}</p>
                  <span className="inline-flex items-center gap-2 font-semibold text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors group-hover:bg-primary">
                    {t.exploreEntrepreneurs} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Scrollytelling Section */}
      <ScrollytellingSection />

      {/* Traveller Photo Testimonials */}
      <section className="container mx-auto px-4">
        <ScrollReveal variant="up" className="text-center mb-4">
          <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline mb-4">Through the Lens of Our Travellers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">Real photos and stories shared by visitors who have experienced the magic of Arunachal Pradesh.</p>
          <div className="mt-6">
            <ReviewForm />
          </div>
        </ScrollReveal>
        <AnimatedTestimonials
          autoplay
          testimonials={[
            {
              quote: "Tawang took my breath away — the monastery at sunrise, draped in mist with monks chanting, felt like stepping into another world entirely.",
              name: "Priya Sharma",
              designation: "Travel Blogger, Delhi",
              src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2670&auto=format&fit=crop",
            },
            {
              quote: "The Ziro Valley during the festival is unlike anything I've experienced. The Apatani tribe's hospitality and culture left a permanent mark on my heart.",
              name: "Rahul Menon",
              designation: "Photographer, Bengaluru",
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop",
            },
            {
              quote: "Mechuka feels like the last untouched frontier. Crystal clear rivers, snow-capped peaks, and the warmest people I've ever met on my travels.",
              name: "Anjali Bose",
              designation: "Adventure Traveller, Kolkata",
              src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop",
            },
            {
              quote: "The biodiversity here is staggering. I spotted hornbills and clouded leopards on the same trek — Arunachal is a nature lover's paradise.",
              name: "Dev Krishnamurthy",
              designation: "Wildlife Enthusiast, Chennai",
              src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2671&auto=format&fit=crop",
            },
            {
              quote: "Bomdila's apple orchards and Buddhist monasteries create a perfect blend of serenity and culture. This is my third visit and it never disappoints.",
              name: "Meera Nair",
              designation: "Solo Traveller, Mumbai",
              src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop",
            },
          ]}
        />
      </section>

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
              <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline">{t.cultureTitle}</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t.cultureDesc}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <ScrollReveal variant="scale" delay={100} className="p-4 bg-white rounded-xl shadow-sm border border-primary/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="block text-xl md:text-2xl font-bold text-primary">26+</span>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">{t.majorTribes}</span>
                </ScrollReveal>
                <ScrollReveal variant="scale" delay={180} className="p-4 bg-white rounded-xl shadow-sm border border-primary/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="block text-xl md:text-2xl font-bold text-primary">500+</span>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">{t.rareSpecies}</span>
                </ScrollReveal>
              </div>
              <Link href="/guides" className="inline-block">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                  {t.viewTravelGuides}
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
