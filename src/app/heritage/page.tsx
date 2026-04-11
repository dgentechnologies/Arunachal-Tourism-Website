"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Star, MapPin, Clock, BookOpen, Sparkles, Users, Mountain, Building2, Heart, Award, Camera } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"

// Heritage Site data structure
interface HeritageSite {
  id: string
  name: string
  location: string
  category: "Monastery" | "Fort" | "Archaeological" | "Temple" | "Palace"
  era: string
  image: string
  description: string
  highlights: string[]
  isFeatured?: boolean
}

const heritageSites: HeritageSite[] = [
  {
    id: "tawang-monastery",
    name: "Tawang Monastery",
    location: "Tawang",
    category: "Monastery",
    era: "17th Century",
    image: "https://picsum.photos/seed/arunachal-festival-culture/800/600",
    description: "The largest monastery in India and second-largest in the world, perched at 10,000 feet. A magnificent three-story complex housing over 500 monks and priceless Buddhist manuscripts.",
    highlights: ["400+ monks", "Ancient manuscripts", "Mahayana Buddhism", "Founded 1680-81"],
    isFeatured: true,
  },
  {
    id: "ita-fort",
    name: "Ita Fort",
    location: "Itanagar",
    category: "Fort",
    era: "14th-15th Century",
    image: "https://picsum.photos/seed/arunachal-festival-culture/800/600",
    description: "An irregular-shaped hilltop fort built with over 8 million bricks. The 'Fort of Bricks' stands as a testament to medieval architectural ingenuity in the Eastern Himalayas.",
    highlights: ["8 million bricks", "Irregular pentagonal shape", "Medieval architecture", "Strategic hilltop"],
    isFeatured: true,
  },
  {
    id: "malinithan",
    name: "Malinithan Temple",
    location: "West Siang",
    category: "Archaeological",
    era: "13th Century",
    image: "https://picsum.photos/seed/arunachal-festival-culture/800/600",
    description: "Ancient Hindu temple ruins dedicated to Goddess Durga, featuring exquisite stone carvings and sculptures that reveal the region's rich Hindu-Buddhist cultural synthesis.",
    highlights: ["Stone sculptures", "Archaeological wonder", "Hindu temple complex", "Protected monument"],
    isFeatured: false,
  },
  {
    id: "bomdila-monastery",
    name: "Bomdila Monastery",
    location: "Bomdila",
    category: "Monastery",
    era: "1965",
    image: "https://picsum.photos/seed/tawang-monastery-panorama/800/600",
    description: "Replica of Tsona Gontse Monastery in Tibet, housing magnificent Buddha statues and offering panoramic views of the Himalayan landscape.",
    highlights: ["Buddha statues", "Tibetan architecture", "Himalayan views", "Prayer wheels"],
    isFeatured: false,
  },
  {
    id: "parasuram-kund",
    name: "Parasuram Kund",
    location: "Lohit District",
    category: "Temple",
    era: "Ancient",
    image: "https://picsum.photos/seed/arunachal-mountain-river/800/600",
    description: "Sacred pilgrimage site where Lord Parasuram is believed to have washed away his sins. Attracts hundreds of thousands during Makar Sankranti.",
    highlights: ["Pilgrimage site", "Holy river confluence", "Makar Sankranti fair", "Spiritual significance"],
    isFeatured: false,
  },
  {
    id: "urgelling-monastery",
    name: "Urgelling Monastery",
    location: "Tawang",
    category: "Monastery",
    era: "15th Century",
    image: "https://picsum.photos/seed/tawang-monastery-panorama/800/600",
    description: "Birthplace of the 6th Dalai Lama, Tsangyang Gyatso. This monastery holds immense spiritual significance and features beautiful traditional Tibetan architecture.",
    highlights: ["Dalai Lama birthplace", "15th century", "Spiritual center", "Traditional architecture"],
    isFeatured: false,
  },
]

export default function HeritagePage() {
  const featuredSites = heritageSites.filter(s => s.isFeatured)
  const monasteries = heritageSites.filter(s => s.category === "Monastery")
  const otherSites = heritageSites.filter(s => !s.isFeatured)

  return (
    <main>
      {/* Hero Section - bleeds up behind the transparent fixed nav */}
      <div className="-mt-16">
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Ancient monastery in the Himalayas"
              className="w-full h-full object-cover"
              src="https://picsum.photos/seed/arunachal-festival-culture/1600/900"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-8 lg:px-12 w-full">
            <ScrollReveal variant="up" className="max-w-3xl space-y-4 md:space-y-6">
              <span className="inline-block px-3 md:px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-medium text-xs md:text-sm tracking-widest uppercase animate-pulse">
                Echoes of Ancient Wisdom
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold leading-[1.1] tracking-tight">
                Sacred <br />
                <span className="text-primary-container animate-pulse">Heritage Sites</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-stone-200 max-w-xl font-light leading-relaxed">
                Journey through millennia of spiritual devotion and architectural mastery. From towering monasteries perched on mountain cliffs to ancient forts that whisper tales of forgotten kingdoms.
              </p>
              <div className="pt-6 md:pt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
                <button className="bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition-all duration-300 active:scale-95">
                  Explore Heritage Trail
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 active:scale-95">
                  Virtual Tours
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* Featured Heritage Sites: Bento Grid */}
      <section className="py-16 md:py-20 lg:py-24 px-6 md:px-8 lg:px-12 max-w-screen-2xl mx-auto">
        <ScrollReveal variant="up">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-on-surface">
                Timeless Monuments
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                Discover architectural wonders that have stood the test of time, each stone carrying stories of devotion, conquest, and enlightenment across centuries.
              </p>
            </div>
            <div className="flex gap-4 self-start md:self-auto">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary-container/20 transition-all">
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary-container/20 transition-all">
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[800px]">
          {/* Tawang Monastery - Large Card */}
          {featuredSites[0] && (
            <ScrollReveal variant="left" className="md:col-span-8 group relative overflow-hidden rounded-2xl md:rounded-[3rem] bg-surface-container-low shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[400px] md:min-h-0">
              <Image
                alt={featuredSites[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                src={featuredSites[0].image}
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 md:p-10 lg:p-12 flex flex-col justify-end transition-all duration-500 group-hover:from-black/95">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <Badge className="bg-primary text-on-primary animate-pulse text-xs">UNESCO Aspirant</Badge>
                  <Badge className="bg-secondary-container text-on-secondary-container text-xs">{featuredSites[0].category}</Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs">{featuredSites[0].era}</Badge>
                </div>
                <h3 className="text-white font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {featuredSites[0].name}
                </h3>
                <div className="flex flex-wrap gap-4 md:gap-6 mb-3 md:mb-4 text-stone-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-xs md:text-sm font-medium">{featuredSites[0].location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-xs md:text-sm font-medium">{featuredSites[0].era}</span>
                  </div>
                </div>
                <p className="text-stone-300 max-w-2xl mb-4 md:mb-6 text-sm md:text-base transform transition-all duration-300 group-hover:text-white line-clamp-2 md:line-clamp-none">
                  {featuredSites[0].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredSites[0].highlights.map((highlight, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20">
                      {highlight}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-primary-container font-bold hover:gap-4 transition-all group/btn w-fit text-sm md:text-base">
                  Explore This Site
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </ScrollReveal>
          )}

          {/* Right Column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            {/* Ita Fort */}
            {featuredSites[1] && (
              <ScrollReveal variant="right" delay={100} className="group relative overflow-hidden rounded-xl md:rounded-[2rem] bg-surface-container-low hover:shadow-xl transition-all duration-500">
                <Image
                  alt={featuredSites[1].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  src={featuredSites[1].image}
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex flex-col justify-end transition-all duration-500 group-hover:from-black/95">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <Badge className="bg-secondary-container text-on-secondary-container text-xs">{featuredSites[1].category}</Badge>
                    <Badge className="bg-primary/80 text-white text-xs">Protected</Badge>
                  </div>
                  <h3 className="text-white font-headline text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {featuredSites[1].name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2 text-stone-300">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs font-medium">{featuredSites[1].location}</span>
                  </div>
                  <p className="text-stone-300 text-sm transform transition-all duration-300 group-hover:text-white line-clamp-2">
                    {featuredSites[1].description}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {/* Heritage Stats Card */}
            <ScrollReveal variant="right" delay={200} className="bg-gradient-to-br from-primary to-primary-container rounded-xl md:rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <Sparkles className="h-10 w-10 text-white mb-4 animate-pulse" />
                <h3 className="font-headline text-4xl md:text-5xl font-bold text-white mb-2">50+</h3>
                <p className="text-white/90 text-lg font-medium mb-4">Heritage Sites</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  From ancient monasteries to medieval forts, each monument tells a unique story of Arunachal's rich cultural tapestry.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Monasteries & Spiritual Centers */}
      <section className="bg-surface-container-low py-24 px-8 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal variant="up">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-6">
                Centers of Enlightenment
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                Arunachal Pradesh is home to some of the most revered Buddhist monasteries in the Himalayas, where ancient wisdom continues to illuminate modern lives.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {monasteries.slice(0, 3).map((site, idx) => (
              <ScrollReveal key={site.id} variant="up" delay={idx * 70}>
                <div className="bg-surface-container-lowest p-6 rounded-xl md:rounded-tl-[3rem] md:rounded-br-[3rem] shadow-sm flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                  <div className="h-64 rounded-xl overflow-hidden mb-6 relative">
                    <Image
                      alt={site.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={site.image}
                      width={400}
                      height={256}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 backdrop-blur-sm text-primary border border-primary/20">
                        {site.category}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-primary/80">
                    {site.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-secondary-container/30 text-on-secondary-container rounded">
                      {site.era}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-surface-container-high text-on-surface-variant rounded">
                      {site.location}
                    </span>
                  </div>
                  <p className="text-on-surface-variant mb-6 flex-grow leading-relaxed">
                    {site.description}
                  </p>
                  <div className="space-y-3 mb-8">
                    {site.highlights.slice(0, 2).map((highlight, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-on-surface-variant transition-colors duration-300 group-hover:text-primary">
                        <Star className="h-4 w-4 text-primary" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-full font-bold hover:scale-105 active:scale-95">
                    Learn More
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Architecture & Living Heritage */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Images Grid */}
          <ScrollReveal variant="left" className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full h-80 mt-12 rounded-2xl overflow-hidden group">
                <Image
                  alt="Traditional bamboo house"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format&q=80"
                  fill
                />
              </div>
              <div className="relative w-full h-80 rounded-2xl overflow-hidden group">
                <Image
                  alt="Traditional crafts"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80"
                  fill
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white shadow-2xl rounded-2xl rotate-3 hover:rotate-6 hover:scale-110 transition-all duration-500 animate-float">
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <p className="font-headline text-4xl font-bold text-primary">26+</p>
                <p className="text-on-surface-variant font-medium">Unique Tribes</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal variant="right" className="order-1 lg:order-2 space-y-8">
            <h2 className="font-headline text-4xl md:text-6xl font-bold leading-tight">
              Living <span className="text-primary">Architecture</span>
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Beyond monuments of stone and brick, Arunachal's heritage lives in the sustainable bamboo homes, intricate tribal textiles, and age-old craftsmanship passed down through generations. Each tribe's unique architectural style reflects harmony with nature and centuries of environmental wisdom.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Building2 className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Bamboo Masterworks</h4>
                  <p className="text-sm text-on-surface-variant">
                    Stilt houses built entirely from bamboo, showcasing earthquake-resistant indigenous engineering.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Camera className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Handwoven Textiles</h4>
                  <p className="text-sm text-on-surface-variant">
                    Intricate traditional fabrics with motifs that tell stories of tribal identity and mythology.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mountain className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Sacred Landscapes</h4>
                  <p className="text-sm text-on-surface-variant">
                    Mountains, rivers, and groves revered as living deities by indigenous communities.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BookOpen className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Oral Traditions</h4>
                  <p className="text-sm text-on-surface-variant">
                    Epic poems, folklore, and histories preserved through generations of storytelling.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
                Discover Tribal Heritage
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* All Heritage Sites Grid */}
      <section className="py-24 px-8 md:px-12 max-w-screen-2xl mx-auto bg-surface-container-low">
        <ScrollReveal variant="up">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-6">
              More Hidden Treasures
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
              Journey deeper into Arunachal's archaeological wonders, from ancient temple ruins to sacred pilgrimage sites that have drawn seekers for millennia.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherSites.map((site, idx) => (
            <ScrollReveal key={site.id} variant="up" delay={idx * 50}>
              <div className="bg-surface-container-lowest rounded-xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={site.image}
                    fill
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 backdrop-blur-sm text-primary border border-primary/20 text-xs">
                      {site.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-headline text-lg font-bold mb-1">{site.name}</h3>
                    <div className="flex items-center gap-1 text-stone-300 text-xs">
                      <MapPin className="h-3 w-3" />
                      <span>{site.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3 text-xs text-on-surface-variant">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="font-medium">{site.era}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {site.description}
                  </p>
                  <button className="flex items-center gap-2 text-primary font-semibold text-sm group/btn w-fit">
                    Discover
                    <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Cultural Preservation CTA */}
      <section className="mb-24 px-8 md:px-12 max-w-screen-2xl mx-auto">
        <ScrollReveal variant="up">
          <div className="bg-primary-container/20 rounded-xl md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-10">
              <div className="text-[300px] leading-none">🏛️</div>
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-primary-container mb-8">
                Guardians of Heritage
              </h2>
              <p className="text-on-primary-container text-lg mb-12 opacity-90 leading-relaxed">
                These sacred sites are not just tourist attractions—they are living repositories of spiritual wisdom, architectural genius, and cultural identity. When you visit, you become part of their ongoing story. Respect sacred spaces, support local communities, and help preserve these treasures for future generations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl">
                  <Heart className="h-6 w-6 text-primary mb-3" />
                  <h4 className="font-bold mb-1">Respect Traditions</h4>
                  <p className="text-xs text-on-surface-variant">
                    Follow monastery protocols, dress modestly, and seek permission before photographing.
                  </p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl">
                  <Users className="h-6 w-6 text-primary mb-3" />
                  <h4 className="font-bold mb-1">Support Local</h4>
                  <p className="text-xs text-on-surface-variant">
                    Hire local guides, buy authentic crafts, and stay in community-run homestays.
                  </p>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl">
                  <Award className="h-6 w-6 text-primary mb-3" />
                  <h4 className="font-bold mb-1">Contribute to Conservation</h4>
                  <p className="text-xs text-on-surface-variant">
                    Support restoration efforts and heritage preservation initiatives.
                  </p>
                </div>
              </div>
              <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Plan Your Heritage Journey
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
