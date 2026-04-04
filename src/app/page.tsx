"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Hotel, Car, ShieldCheck, FileText, Compass, MapPin, ArrowRight, Users, Lightbulb, MoveRight } from "lucide-react"
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

  const quickLinks = [
    { title: t.featGuidesTitle, icon: Compass, href: "/guides" },
    { title: t.featHotelsTitle, icon: Hotel, href: "/hotels" },
    { title: t.featTransportTitle, icon: Car, href: "/transport" },
    { title: t.featPermitTitle, icon: FileText, href: "/permit" },
    { title: t.featSafetyTitle, icon: ShieldCheck, href: "/safety" },
    { title: t.featItineraryTitle, icon: MapPin, href: "/itinerary" },
  ]

  return (
    <div className="flex flex-col gap-0 pb-20">
      {/* Hero Carousel - bleeds up behind the transparent fixed nav */}
      <div className="-mt-16">
        <HeroCarousel />
      </div>

      {/* Quick Services Bar — surface-container-low background, no border */}
      <section className="bg-[#f6f3f2]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between divide-y md:divide-y-0 md:divide-x divide-[#cac4c0]/15">
            {quickLinks.map((link, idx) => {
              const Icon = link.icon
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className="group flex flex-col items-center gap-2 py-5 px-6 flex-1 min-w-[calc(50%-1px)] md:min-w-0 hover:bg-primary/5 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70 group-hover:text-primary transition-colors duration-200 text-center">{link.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Destinations Carousel */}
      <div className="mt-16 md:mt-20">
        <ScrollReveal variant="up">
          <DestinationsCarousel />
        </ScrollReveal>
      </div>

      {/* Tribes & Entrepreneurs Section */}
      <section className="container mx-auto px-4 mt-16 md:mt-20">
        <ScrollReveal variant="up" className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline mb-4">{t.homeCultureSectionTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">{t.homeCultureSectionSubtitle}</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tribes Card — organic topography shape */}
          <ScrollReveal variant="left">
            <Link href="/tribes" className="block group">
              <div className="organic-card hover:-translate-y-2 transition-all duration-500 hover:shadow-ambient">
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
                  <h3 className="text-2xl font-bold font-headline mb-2 text-white tracking-tight">{t.featTribesTitle}</h3>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed font-body">{t.featTribesDesc}</p>
                  <span className="inline-flex items-center gap-2 font-semibold text-sm bg-primary hover:bg-primary/90 px-5 py-2 rounded-full transition-colors">
                    {t.exploreTribes} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Entrepreneurs Card — organic topography alt shape */}
          <ScrollReveal variant="right">
            <Link href="/entrepreneurs" className="block group">
              <div className="organic-card-alt hover:-translate-y-2 transition-all duration-500 hover:shadow-ambient">
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
                  <h3 className="text-2xl font-bold font-headline mb-2 text-white tracking-tight">{t.featEntrepreneursTitle}</h3>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed font-body">{t.featEntrepreneursDesc}</p>
                  <span className="inline-flex items-center gap-2 font-semibold text-sm bg-secondary hover:bg-secondary/90 text-secondary-foreground px-5 py-2 rounded-full transition-colors">
                    {t.exploreEntrepreneurs} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Scrollytelling Section */}
      <div className="mt-16 md:mt-20">
        <ScrollytellingSection />
      </div>

      {/* Traveller Photo Testimonials */}
      <section className="container mx-auto px-4 mt-16 md:mt-20">
        <ScrollReveal variant="up" className="text-center mb-4">
          <h2 className="text-2xl md:text-4xl font-bold text-primary font-headline mb-4 tracking-tight">Through the Lens of Our Travellers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-body">Real photos and stories shared by visitors who have experienced the magic of Arunachal Pradesh.</p>
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

      {/* Premium CTA Banner — primary → primary-container gradient */}
      <section className="mt-16 md:mt-20">
        <div className="relative overflow-hidden cta-gradient py-16 md:py-24 rounded-none">
          <div className="absolute inset-0 opacity-10">
            <Image
              src={PlaceHolderImages.find(img => img.id === 'culture-monastery')?.imageUrl || ''}
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
          </div>
          <div className="container relative mx-auto px-4 text-center">
            <ScrollReveal variant="up">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3 font-headline">Start Your Journey</p>
              <h2 className="text-3xl md:text-5xl font-bold font-headline text-white mb-4 leading-tight tracking-tight">{t.cultureTitle}</h2>
              <p className="text-white/70 max-w-xl mx-auto mb-8 text-base md:text-lg leading-relaxed font-body">
                {t.cultureDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/guides">
                  <Button size="lg" variant="secondary" className="h-12 px-8 font-semibold rounded-full bg-white text-primary shadow-none hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95">
                    {t.viewTravelGuides} <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/permit">
                  <Button size="lg" className="h-12 px-8 font-semibold rounded-full bg-transparent text-white shadow-none border-2 border-white/40 hover:bg-white/15 transition-all duration-300 hover:scale-105 active:scale-95">
                    {t.getYourPermit}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
