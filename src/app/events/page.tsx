"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Clock, Users, Sparkles, Heart, ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Music, Palette, Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"

// Event data structure
interface Event {
  id: string
  title: string
  date: string
  dateRange?: string
  location: string
  category: "Festival" | "Cultural" | "Adventure" | "Wildlife" | "Art & Music"
  status: "upcoming" | "ongoing" | "recent"
  image: string
  description: string
  highlights: string[]
  isFeatured?: boolean
}

const events: Event[] = [
  {
    id: "losar-festival",
    title: "Losar Festival",
    date: "February 2026",
    dateRange: "Feb 10-12, 2026",
    location: "Tawang",
    category: "Festival",
    status: "upcoming",
    image: "https://picsum.photos/seed/arunachal-festival-culture/800/600",
    description: "Experience the vibrant Tibetan New Year celebration in the heart of the Eastern Himalayas. A spectacular display of Buddhist culture, masked dances, and ancient traditions.",
    highlights: ["Cham Dance performances", "Butter lamp offerings", "Traditional Tibetan cuisine", "Monastery rituals"],
    isFeatured: true,
  },
  {
    id: "ziro-music-festival",
    title: "Ziro Festival of Music",
    date: "September 2026",
    dateRange: "Sep 26-29, 2026",
    location: "Ziro Valley",
    category: "Art & Music",
    status: "ongoing",
    image: "https://picsum.photos/seed/arunachal-festival-culture/800/600",
    description: "India's most scenic outdoor music festival set amidst pine-covered mountains and rice fields. An unforgettable fusion of indie music and natural beauty.",
    highlights: ["40+ indie bands", "Camping under stars", "Apatani cultural performances", "Eco-friendly festival"],
    isFeatured: true,
  },
  {
    id: "solung-festival",
    title: "Solung Festival",
    date: "September 2026",
    dateRange: "Sep 1-7, 2026",
    location: "Pasighat",
    category: "Festival",
    status: "recent",
    image: "https://picsum.photos/seed/arunachal-festival-culture/800/600",
    description: "The most important festival of the Adi tribe, celebrating harvest season with traditional rituals, folk songs, and community feasts.",
    highlights: ["Ponung dance performances", "Traditional Apong (rice beer)", "Agricultural rituals", "Community bonding"],
    isFeatured: false,
  },
  {
    id: "torgya-festival",
    title: "Torgya Festival",
    date: "January 2026",
    dateRange: "Jan 11-13, 2026",
    location: "Tawang Monastery",
    category: "Cultural",
    status: "recent",
    image: "https://picsum.photos/seed/tawang-monastery-panorama/800/600",
    description: "Ancient monastic festival featuring masked dances that drive away evil spirits and bring prosperity to the community for the coming year.",
    highlights: ["Sacred mask dances", "Ritualistic ceremonies", "Monastery blessings", "Cultural heritage"],
  },
  {
    id: "nyokum-yullo",
    title: "Nyokum Yullo",
    date: "February 2026",
    dateRange: "Feb 26-28, 2026",
    location: "Itanagar",
    category: "Festival",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    description: "The grand festival of the Nyishi tribe celebrating prosperity, well-being, and harmony with nature through traditional rituals and community gatherings.",
    highlights: ["Traditional Nyishi attire", "Folk music & dance", "Ritualistic prayers", "Community feast"],
  },
  {
    id: "mopin-festival",
    title: "Mopin Festival",
    date: "April 2026",
    dateRange: "Apr 5-7, 2026",
    location: "Along, West Siang",
    category: "Festival",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    description: "A vibrant harvest festival of the Galo tribe, invoking the goddess Mopin Ane for prosperity, well-being, and protection from natural calamities.",
    highlights: ["Popir dance", "Traditional brewing", "Folk performances", "Unity celebrations"],
  },
  {
    id: "dree-festival",
    title: "Dree Festival",
    date: "July 2026",
    dateRange: "Jul 4-5, 2026",
    location: "Ziro Valley",
    category: "Festival",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    description: "The agricultural festival of the Apatani tribe, celebrated for abundant harvest, peace, and prosperity with traditional dances and community bonding.",
    highlights: ["Daminda dance", "Agricultural prayers", "Unity celebrations", "Cultural showcase"],
  },
  {
    id: "siang-river-festival",
    title: "Siang River Festival",
    date: "December 2025",
    dateRange: "Dec 5-7, 2025",
    location: "Pasighat",
    category: "Adventure",
    status: "recent",
    image: "https://picsum.photos/seed/arunachal-mountain-river/800/600",
    description: "An adrenaline-packed adventure festival celebrating the mighty Siang River with rafting competitions, kayaking, and water sports.",
    highlights: ["River rafting competition", "Kayaking events", "Rock climbing", "Adventure sports"],
  },
]

export default function EventsPage() {
  const featuredEvents = events.filter(e => e.isFeatured)
  const upcomingEvents = events.filter(e => e.status === "upcoming").slice(0, 6)
  const recentEvents = events.filter(e => e.status === "recent" || e.status === "ongoing")

  return (
    <main>
      {/* Hero Section - bleeds up behind the transparent fixed nav */}
      <div className="-mt-16">
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Vibrant festival celebration in Arunachal Pradesh"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&h=900&fit=crop&auto=format&q=80"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-8 lg:px-12 w-full">
            <ScrollReveal variant="up" className="max-w-3xl space-y-4 md:space-y-6">
              <span className="inline-block px-3 md:px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-medium text-xs md:text-sm tracking-widest uppercase animate-pulse">
                Where Traditions Come Alive
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold leading-[1.1] tracking-tight">
                Festivals & <br />
                <span className="text-primary-container animate-pulse">Cultural Events</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-stone-200 max-w-xl font-light leading-relaxed">
                Immerse yourself in the vibrant tapestry of Arunachal&apos;s living heritage. From sacred Buddhist ceremonies to electrifying music festivals, experience celebrations that have echoed through the valleys for generations.
              </p>
              <div className="pt-6 md:pt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
                <button className="bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition-all duration-300 active:scale-95">
                  Explore All Events
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 active:scale-95">
                  Festival Calendar
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* Featured Events: Bento Grid */}
      <section className="py-16 md:py-20 lg:py-24 px-6 md:px-8 lg:px-12 max-w-screen-2xl mx-auto min-h-screen flex flex-col justify-center">
        <ScrollReveal variant="up">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-on-surface">
                Don&apos;t Miss These
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                Experience the most spectacular celebrations of Arunachal Pradesh, where ancient traditions meet contemporary artistry in breathtaking settings.
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
          {/* Losar Festival - Large Card */}
          {featuredEvents[0] && (
            <ScrollReveal variant="left" className="md:col-span-8 group relative overflow-hidden rounded-2xl md:rounded-[3rem] bg-surface-container-low shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[400px] md:min-h-0">
              <Image
                alt={featuredEvents[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                src={featuredEvents[0].image}
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 md:p-10 lg:p-12 flex flex-col justify-end transition-all duration-500 group-hover:from-black/95">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <Badge className="bg-primary text-on-primary animate-pulse text-xs">Featured</Badge>
                  <Badge className="bg-secondary-container text-on-secondary-container text-xs">{featuredEvents[0].category}</Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs">{featuredEvents[0].status}</Badge>
                </div>
                <h3 className="text-white font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {featuredEvents[0].title}
                </h3>
                <div className="flex flex-wrap gap-4 md:gap-6 mb-3 md:mb-4 text-stone-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-xs md:text-sm font-medium">{featuredEvents[0].dateRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-xs md:text-sm font-medium">{featuredEvents[0].location}</span>
                  </div>
                </div>
                <p className="text-stone-300 max-w-2xl mb-4 md:mb-6 text-sm md:text-base transform transition-all duration-300 group-hover:text-white line-clamp-2 md:line-clamp-none">
                  {featuredEvents[0].description}
                </p>
                <button className="flex items-center gap-2 text-primary-container font-bold hover:gap-4 transition-all group/btn w-fit text-sm md:text-base">
                  Learn More
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </ScrollReveal>
          )}

          {/* Right Column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            {/* Ziro Music Festival */}
            {featuredEvents[1] && (
              <ScrollReveal variant="right" delay={100} className="group relative overflow-hidden rounded-xl md:rounded-[2rem] bg-surface-container-low hover:shadow-xl transition-all duration-500">
                <Image
                  alt={featuredEvents[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  src={featuredEvents[1].image}
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex flex-col justify-end transition-all duration-500 group-hover:from-black/95">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <Badge className="bg-secondary-container text-on-secondary-container text-xs">{featuredEvents[1].category}</Badge>
                    <Badge className="bg-primary/80 text-white text-xs animate-pulse">Live Now</Badge>
                  </div>
                  <h3 className="text-white font-headline text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {featuredEvents[1].title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2 text-stone-300">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs font-medium">{featuredEvents[1].location}</span>
                  </div>
                  <p className="text-stone-300 text-sm transform transition-all duration-300 group-hover:text-white line-clamp-2">
                    {featuredEvents[1].description}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {/* Quick Stats Card */}
            <ScrollReveal variant="right" delay={200} className="bg-gradient-to-br from-primary to-primary-container rounded-xl md:rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <Sparkles className="h-10 w-10 text-white mb-4 animate-pulse" />
                <h3 className="font-headline text-4xl md:text-5xl font-bold text-white mb-2">30+</h3>
                <p className="text-white/90 text-lg font-medium mb-4">Annual Festivals</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  From sacred monastic ceremonies to vibrant tribal celebrations, experience the living heritage of 26+ indigenous communities.
                </p>
                <button className="flex items-center gap-2 text-white font-bold hover:gap-4 transition-all group/btn mt-4">
                  View Calendar
                  <TrendingUp className="h-4 w-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Recent & Ongoing Events */}
      <section className="bg-surface-container-low py-24 px-8 md:px-12 min-h-screen flex flex-col justify-center">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal variant="up">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm tracking-widest uppercase mb-4">
                Happening Now
              </span>
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-6">
                Recent & Ongoing Events
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                Catch these incredible celebrations before they end or relive the magic of recently concluded festivals.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentEvents.map((event, idx) => (
              <ScrollReveal key={event.id} variant="up" delay={idx * 70}>
                <div className="bg-surface-container-lowest rounded-xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={event.image}
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-4 right-4">
                      {event.status === "ongoing" && (
                        <Badge className="bg-primary text-on-primary animate-pulse">Live Now</Badge>
                      )}
                      {event.status === "recent" && (
                        <Badge className="bg-secondary-container text-on-secondary-container">Recently Ended</Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-headline text-xl font-bold mb-1">{event.title}</h3>
                      <div className="flex items-center gap-1 text-stone-300 text-xs">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3 text-sm text-on-surface-variant">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.dateRange || event.date}</span>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {event.description}
                    </p>
                    <button className="flex items-center gap-2 text-primary font-semibold text-sm group/btn w-fit">
                      View Details
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Timeline */}
      <section className="py-24 px-8 md:px-12 max-w-screen-2xl mx-auto min-h-screen flex flex-col justify-center">
        <ScrollReveal variant="up">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-6">
              What&apos;s Coming Up
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
              Plan your journey around these upcoming celebrations and be part of Arunachal&apos;s living cultural heritage.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, idx) => (
            <ScrollReveal key={event.id} variant="up" delay={idx * 70}>
              <div className="bg-surface-container-lowest p-6 rounded-xl md:rounded-tl-[3rem] md:rounded-br-[3rem] shadow-sm flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border-l-4 border-primary">
                <div className="h-56 rounded-xl overflow-hidden mb-6 relative">
                  <Image
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={event.image}
                    width={400}
                    height={224}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 backdrop-blur-sm text-primary border border-primary/20">
                      {event.category}
                    </Badge>
                  </div>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-primary/80">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">{event.dateRange || event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-on-surface-variant mb-6 flex-grow leading-relaxed">
                  {event.description}
                </p>
                {event.highlights && event.highlights.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.slice(0, 3).map((highlight, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-primary-container/20 text-primary rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <button className="w-full py-3 bg-surface-container-high hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-full font-bold hover:scale-105 active:scale-95">
                  Add to Calendar
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Cultural Experience Section */}
      <section className="py-24 overflow-hidden bg-surface-container-low min-h-screen flex flex-col justify-center">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <ScrollReveal variant="left" className="order-2 lg:order-1 space-y-8">
            <h2 className="font-headline text-4xl md:text-6xl font-bold leading-tight">
              Experience <span className="text-primary">Living Traditions</span>
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Arunachal Pradesh is home to 26 major tribes and over 100 sub-tribes, each with their own unique festivals, rituals, and celebrations. These events are not mere spectacles—they are living expressions of communities that have preserved their heritage for centuries.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Music className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Traditional Performances</h4>
                  <p className="text-sm text-on-surface-variant">
                    Witness centuries-old folk dances, music, and theatrical performances that tell stories of ancestry and nature.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Palette className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Artisan Crafts</h4>
                  <p className="text-sm text-on-surface-variant">
                    Discover intricate handwoven textiles, bamboo crafts, and traditional jewelry created by master artisans.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Community Feasts</h4>
                  <p className="text-sm text-on-surface-variant">
                    Share meals with local communities and taste authentic tribal cuisine prepared using age-old recipes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="text-secondary text-3xl flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary mb-1">Spiritual Ceremonies</h4>
                  <p className="text-sm text-on-surface-variant">
                    Observe sacred rituals that connect communities with nature, ancestors, and the divine.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
                Learn About Our Tribes
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </ScrollReveal>

          {/* Images Grid */}
          <ScrollReveal variant="right" className="relative order-1 lg:order-2">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full h-80 mt-12 rounded-2xl overflow-hidden group/img">
                <Image
                  alt="Traditional tribal dance"
                  className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                  src="https://picsum.photos/seed/arunachal-festival-culture/800/600"
                  fill
                />
              </div>
              <div className="relative w-full h-80 rounded-2xl overflow-hidden group/img">
                <Image
                  alt="Festival celebration"
                  className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                  src="https://picsum.photos/seed/arunachal-festival-culture/800/600"
                  fill
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white shadow-2xl rounded-2xl rotate-3 hover:rotate-6 hover:scale-110 transition-all duration-500 animate-float">
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <p className="font-headline text-4xl font-bold text-primary">26+</p>
                <p className="text-on-surface-variant font-medium">Major Tribes</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-24 px-8 md:px-12 max-w-screen-2xl mx-auto min-h-screen flex flex-col justify-center">
        <ScrollReveal variant="up">
          <div className="bg-gradient-to-br from-primary via-primary to-primary-container rounded-xl md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-10">
              <div className="text-[300px] leading-none">🎉</div>
            </div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-8">
                Join the Celebration
              </h2>
              <p className="text-white/90 text-lg mb-12 leading-relaxed">
                Be part of these extraordinary celebrations and create memories that will last a lifetime. Our local guides ensure you experience these festivals authentically and respectfully, connecting you with the heart and soul of Arunachal Pradesh.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-primary px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2">
                  Plan Your Visit
                  <Star className="h-5 w-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                  Download Festival Guide
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
