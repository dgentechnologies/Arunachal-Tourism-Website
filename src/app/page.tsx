"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Hotel, Car, ShieldCheck, FileText, Compass, MapPin, ArrowRight, Users, Lightbulb, MoveRight, ArrowUpRight } from "lucide-react"
import { HeroCarousel } from "@/components/hero-carousel"
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

  const destinations = [
    {
      name: "Tawang",
      label: "THE SACRED RIDGE",
      tagline: "Buddhism's Crown Jewel",
      desc: "Spirituality meets the sky at 10,000 feet. Home to the world's second-largest monastery.",
      imageId: "dest-tawang",
      href: "/guides",
      colSpan: "md:col-span-8",
      labelColor: "text-[#ffdf90]",
    },
    {
      name: "Ziro Valley",
      label: "RHYTHM OF THE LAND",
      tagline: "UNESCO Heritage Landscape",
      desc: "A UNESCO heritage site where music echoes through terraced rice fields.",
      imageId: "dest-ziro",
      href: "/guides",
      colSpan: "md:col-span-4",
      labelColor: "text-[#40e0d0]",
    },
    {
      name: "Mechuka",
      label: "FORGOTTEN FRONTIER",
      tagline: "Hidden Himalayan Paradise",
      desc: "The forbidden valley. A landscape reminiscent of the Swiss Alps, untouched and ethereal.",
      imageId: "dest-mechuka",
      href: "/guides",
      colSpan: "md:col-span-5",
      labelColor: "text-[#ffdf90]",
    },
    {
      name: "Namdapha",
      label: "WILD & UNTAMED",
      tagline: "Biodiversity Hotspot",
      desc: "One of the last true wilderness frontiers on Earth, home to snow leopards and 1,000+ species.",
      imageId: "dest-namdapha",
      href: "/guides",
      colSpan: "md:col-span-7",
      labelColor: "text-[#40e0d0]",
    },
  ]

  return (
    <div className="flex flex-col gap-0 pb-0">
      {/* Hero Carousel - bleeds up behind the transparent fixed nav */}
      <div className="-mt-16">
        <HeroCarousel />
      </div>

      {/* Quick Services Bar */}
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

      {/* ── Narrative Anchors: Bento Grid ──────────────────────────── */}
      <section className="px-4 md:px-8 py-24 md:py-32 max-w-[1440px] mx-auto w-full tribal-pattern">
        <ScrollReveal variant="up">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-primary leading-none">
                Narrative<br />Anchors
              </h2>
              <p className="mt-6 text-lg text-muted-foreground font-body">
                Journey through landscapes where time holds its breath. From the silent monasteries of Tawang to the musical valleys of Ziro.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/guides">
                <button className="w-14 h-14 rounded-full border border-[#bacac6] flex items-center justify-center text-primary hover:bg-[#40e0d0]/20 hover:border-transparent transition-all duration-200">
                  <ArrowRight className="h-5 w-5 rotate-[-45deg]" />
                </button>
              </Link>
              <Link href="/guides">
                <button className="w-14 h-14 rounded-full border border-[#bacac6] flex items-center justify-center text-primary hover:bg-[#40e0d0]/20 hover:border-transparent transition-all duration-200">
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:h-[800px]">
          {destinations.map((dest, idx) => {
            const img = PlaceHolderImages.find(i => i.id === dest.imageId)
            return (
              <ScrollReveal key={dest.name} variant={idx % 2 === 0 ? "left" : "right"} className={`${dest.colSpan} min-h-[300px]`}>
                <Link href={dest.href} className="group relative rounded-2xl overflow-hidden cursor-pointer block h-full min-h-[300px]">
                  {img && (
                    <Image
                      src={img.imageUrl}
                      alt={img.description}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint={img.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className={`${dest.labelColor} font-headline font-bold text-xs tracking-[0.2em] uppercase`}>
                      {dest.label}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-headline font-bold text-white mt-2">{dest.name}</h3>
                    <p className="text-white/65 mt-3 text-sm leading-relaxed hidden md:block">{dest.desc}</p>
                    <span className="inline-flex items-center gap-2 mt-4 text-white/80 text-xs font-headline font-bold tracking-widest uppercase group-hover:text-white transition-colors">
                      Explore <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}

          {/* Culture card — no image, surface-container-low bg */}
          <ScrollReveal variant="up" className="md:col-span-12">
            <div className="bg-[#f6f3f2] rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
              <div className="absolute top-0 right-6 opacity-5 pointer-events-none select-none">
                <span className="font-headline font-bold text-[12rem] text-primary leading-none">26</span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-5 leading-tight">
                  Sustainable<br />Tribal Wisdom
                </h3>
                <p className="text-muted-foreground text-base mb-8 max-w-xl leading-relaxed font-body">
                  Experience the &apos;no-nails&apos; architecture of the Adi tribe and the delicate weaving of the Monpas. We don&apos;t just visit; we respect the ancient pact between man and forest.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold font-headline">26 Major Tribes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold font-headline">Traditional Laws</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Compass className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold font-headline">Heritage Trails</span>
                  </div>
                </div>
              </div>
              <Link href="/tribes">
                <button className="flex-shrink-0 px-8 py-4 rounded-full bg-primary text-white font-headline font-bold text-sm hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap">
                  {t.exploreTribes} <ArrowRight className="inline ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Deep Cultural Resonance — Primary-colored section ─────── */}
      <section className="bg-primary py-24 md:py-32 px-4 md:px-8 overflow-hidden relative">
        {/* Decorative oversized word */}
        <div className="absolute top-8 right-[-2%] text-white/5 font-headline font-bold text-[8rem] md:text-[15rem] select-none pointer-events-none leading-none">
          MISHMI
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Portrait image */}
          <ScrollReveal variant="left" className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={PlaceHolderImages.find(i => i.id === "culture-monastery")?.imageUrl || ""}
                alt="Tawang Monastery landscape"
                fill
                className="object-cover"
                data-ai-hint="monastery landscape"
              />
            </div>
            {/* Overlay card */}
            <div className="absolute -bottom-6 -right-4 md:-right-10 w-56 bg-[#fccc38] rounded-2xl p-6 flex flex-col justify-end shadow-xl hidden md:flex">
              <h4 className="text-[#6f5600] font-headline font-bold text-xl">Living Heritage</h4>
              <p className="text-[#6f5600]/80 text-xs mt-2">Every pattern tells a story of the migration across the peaks.</p>
            </div>
          </ScrollReveal>

          {/* Text content */}
          <ScrollReveal variant="right" className="text-white">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter mb-10 leading-tight">
              Deep<br />Cultural<br />Resonance
            </h2>
            <div className="space-y-8">
              <div className="flex gap-5 items-start">
                <span className="w-11 h-11 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-[#40e0d0]" />
                </span>
                <div>
                  <h4 className="text-lg font-headline font-bold mb-2">Myths of Origin</h4>
                  <p className="text-white/60 font-body text-sm leading-relaxed">Oral traditions that predate modern scripts, passed down through the rhythm of evening fires.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <span className="w-11 h-11 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
                  <Compass className="h-5 w-5 text-[#40e0d0]" />
                </span>
                <div>
                  <h4 className="text-lg font-headline font-bold mb-2">Sustainable Harmony</h4>
                  <p className="text-white/60 font-body text-sm leading-relaxed">Arunachal is India&apos;s carbon sink, where every journey contributes to forest conservation.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <span className="w-11 h-11 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#40e0d0]" />
                </span>
                <div>
                  <h4 className="text-lg font-headline font-bold mb-2">26 Living Tribes</h4>
                  <p className="text-white/60 font-body text-sm leading-relaxed">Each with unique festivals, crafts, and traditions that have endured for centuries.</p>
                </div>
              </div>
            </div>
            <Link href="/tribes">
              <button className="mt-12 group flex items-center gap-4 text-[#40e0d0] font-headline font-bold text-lg hover:gap-6 transition-all duration-200">
                Explore the Tribal Map
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Scrollytelling Section ─────────────────────────────────── */}
      <ScrollytellingSection />

      {/* ── Traveller Testimonials ─────────────────────────────────── */}
      <section className="container mx-auto px-4 py-20 md:py-24">
        <ScrollReveal variant="up" className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-bold text-primary font-headline mb-4 tracking-tight">Through the Lens of Our Travellers</h2>
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

      {/* ── Newsletter CTA ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-[#f6f3f2] rounded-2xl p-10 md:p-20 text-center relative overflow-hidden">
          {/* Top accent bar: primary→secondary gradient */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-[#fccc38] to-[#40e0d0]" />
          <ScrollReveal variant="up">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-5 tracking-tighter">Stay Connected to the Peaks</h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto mb-10 font-body leading-relaxed">
              Get curated travelogues, permit updates, and festival calendars delivered to your inbox once a month.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-6 py-4 rounded-full bg-white border-none focus:ring-2 focus:ring-primary text-foreground font-body outline-none text-sm"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-white rounded-full font-headline font-bold text-sm hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                Join the Journey
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Premium CTA Banner ─────────────────────────────────────── */}
      <section className="px-4 md:px-8 pb-24">
        <div className="relative overflow-hidden cta-gradient py-16 md:py-24 rounded-2xl">
          <div className="absolute inset-0 opacity-10">
            <Image
              src={PlaceHolderImages.find(img => img.id === "culture-monastery")?.imageUrl || ""}
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
          </div>
          <div className="relative mx-auto px-4 text-center max-w-4xl">
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

