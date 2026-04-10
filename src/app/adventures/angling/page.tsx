import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Clock, Fish, Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"

const anglingSpots = [
  {
    name: "Siang River — Pasighat Stretch",
    location: "East Siang",
    season: "Oct–Mar",
    target: "Golden Mahseer",
    targetColor: "bg-amber-100 text-amber-700",
    permit: "Required",
    desc: "The Siang's wide, boulder-strewn runs below Pasighat are legendary for massive Golden Mahseer. The catch-and-release ethos keeps the fish population thriving.",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "river fishing mountain",
    rating: 4.9,
  },
  {
    name: "Kameng River — Bhalukpong",
    location: "West Kameng",
    season: "Nov–Feb",
    target: "Chocolate Mahseer",
    targetColor: "bg-orange-100 text-orange-700",
    permit: "Required",
    desc: "Bhalukpong's crystal-clear stretches running through Pakhui Tiger Reserve offer a chance at the elusive Chocolate Mahseer in a truly wild setting.",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "clear river fishing",
    rating: 4.8,
  },
  {
    name: "Subansiri River",
    location: "Lower Subansiri",
    season: "Oct–Apr",
    target: "Tor Putitora",
    targetColor: "bg-green-100 text-green-700",
    permit: "Required",
    desc: "The 'Gold River' is one of the finest sport-fishing destinations in Asia. Remote camps, pristine water, and trophy-sized Tor Putitora make this a bucket-list experience.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "pristine river camp fishing",
    rating: 4.7,
  },
  {
    name: "Lohit River",
    location: "Lohit District",
    season: "Year-round",
    target: "Mahseer & Barbs",
    targetColor: "bg-blue-100 text-blue-700",
    permit: "Required",
    desc: "The swift, gin-clear waters of the Lohit hold healthy populations of Mahseer and large barbs. Its accessibility makes it ideal for first-time anglers visiting Arunachal.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "swift river angling",
    rating: 4.5,
  },
  {
    name: "Dibang River — Roing",
    location: "Lower Dibang Valley",
    season: "Nov–Mar",
    target: "Snow Trout",
    targetColor: "bg-cyan-100 text-cyan-700",
    permit: "Required",
    desc: "Roing sits at the confluence of the Dibang system. Fly-fishers come for the challenging Snow Trout in fast-flowing, oxygen-rich mountain water.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "mountain river fly fishing",
    rating: 4.6,
  },
  {
    name: "Tawang Chu River",
    location: "Tawang",
    season: "May–Sep",
    target: "Snow Trout",
    targetColor: "bg-indigo-100 text-indigo-700",
    permit: "Required",
    desc: "High-altitude fly-fishing in the shadow of Tawang Monastery. The Tawang Chu's cold, fast currents harbour Snow Trout and the scenery is utterly unforgettable.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "high altitude river fishing monastery",
    rating: 4.4,
  },
]

export default function AnglingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Banner */}
      <ScrollReveal variant="up" className="relative rounded-3xl overflow-hidden mb-14 h-72 md:h-96">
        <Image
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&h=900&fit=crop&auto=format&q=80"
          alt="Angling in Arunachal Pradesh"
          fill
          className="object-cover"
          data-ai-hint="river fishing nature pristine"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <span className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">
            Adventures · Angling
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-white mb-3">
            Angling in Arunachal
          </h1>
          <p className="text-white/80 max-w-xl text-sm md:text-base">
            World-class sport fishing in biodiverse rivers where the Golden Mahseer reigns supreme — all within a strict catch-and-release ethos.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal variant="up" className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary/5 rounded-2xl p-6 md:p-8">
          {[
            { value: "10+", label: "Fishing Zones" },
            { value: "5+", label: "Species of Mahseer" },
            { value: "Oct–Apr", label: "Prime Season" },
            { value: "C&R", label: "Catch & Release" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-2xl md:text-3xl font-bold text-primary">{stat.value}</span>
              <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Spots Grid */}
      <ScrollReveal variant="up" className="mb-4">
        <h2 className="text-2xl font-bold font-headline text-primary mb-1">Prime Fishing Locations</h2>
        <p className="text-muted-foreground">Each river has its own character and its own prize species</p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {anglingSpots.map((spot, idx) => (
          <ScrollReveal key={idx} variant="up" delay={idx * 70}>
            <div className="overflow-hidden border-none shadow-lg rounded-2xl group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={spot.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white text-lg font-bold font-headline leading-tight">{spot.name}</h3>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" /> {spot.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 text-primary" /> {spot.season}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Fish className="h-3 w-3 text-primary" /> Permit: {spot.permit}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={spot.targetColor}>{spot.target}</Badge>
                  <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-current" /> {spot.rating}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{spot.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA Banner */}
      <ScrollReveal variant="up">
        <div className="py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">
            Cast Your Line in Paradise
          </h2>
          <p className="text-lg text-white/80 max-w-xl">
            All fishing in Arunachal Pradesh requires a permit. Our team handles the paperwork so you can focus on the fishing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/permit" className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
              Get a Fishing Permit
            </Link>
            <Link href="/adventures" className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2">
              All Adventures <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

