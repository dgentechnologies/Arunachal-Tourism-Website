import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Clock, Wind, Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"

const launchSites = [
  {
    name: "Tawang Ridge",
    location: "Tawang",
    altitude: "3,000 m",
    season: "Oct–Apr",
    level: "All Levels",
    levelColor: "bg-green-100 text-green-700",
    desc: "Launch from the ridge above Asia's largest monastery and soar over a valley dotted with prayer flags and ancient villages. The panoramic views of Gorichen and Kangto peaks are unparalleled.",
    image: "https://images.unsplash.com/photo-1601024445121-e294d11ac7f7?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding mountain monastery valley",
    rating: 4.9,
  },
  {
    name: "Ziro Valley Launch",
    location: "Lower Subansiri",
    altitude: "1,600 m",
    season: "Nov–Mar",
    level: "Beginner–Intermediate",
    levelColor: "bg-blue-100 text-blue-700",
    desc: "Float above the UNESCO heritage landscape of Ziro's pine-covered ridges and emerald rice terraces. Long, gentle thermals make this ideal for tandem flights and first-timers.",
    image: "https://images.unsplash.com/photo-1602507458095-a2c5de3a7ff5?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding rice fields valley",
    rating: 4.7,
  },
  {
    name: "Mechuka Hill Site",
    location: "Shi-Yomi District",
    altitude: "2,200 m",
    season: "Oct–May",
    level: "Intermediate–Advanced",
    levelColor: "bg-orange-100 text-orange-700",
    desc: "One of the most remote paragliding sites in India. The Mechuka valley funnels powerful thermals off its surrounding peaks, rewarding experienced pilots with epic cross-country flights.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding remote himalaya valley",
    rating: 4.8,
  },
  {
    name: "Bomdila Escarpment",
    location: "West Kameng",
    altitude: "2,400 m",
    season: "Nov–Apr",
    level: "All Levels",
    levelColor: "bg-green-100 text-green-700",
    desc: "Bomdila's south-facing escarpment catches reliable afternoon thermals year-round. Tandem instructors here are certified and cater to curious first-timers and seasoned cross-country pilots alike.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding escarpment mountain town",
    rating: 4.5,
  },
  {
    name: "Dirang Valley Thermals",
    location: "West Kameng",
    altitude: "1,500 m",
    season: "Oct–Mar",
    level: "Intermediate",
    levelColor: "bg-yellow-100 text-yellow-700",
    desc: "A narrow river valley that creates powerful morning thermals, allowing altitude gains of over 1,500 m. Pilots regularly reach Sela Pass and back on a single flight.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding mountain valley thermal",
    rating: 4.6,
  },
  {
    name: "Itanagar Heights",
    location: "Papum Pare",
    altitude: "400 m",
    season: "Year-round",
    level: "Beginner",
    levelColor: "bg-green-100 text-green-700",
    desc: "The most accessible launch site in Arunachal, just 20 minutes from the capital. Short training flights over forested hills make it the perfect introduction to paragliding.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding forested hills beginner",
    rating: 4.3,
  },
]

export default function ParaglidingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Banner */}
      <ScrollReveal variant="up" className="relative rounded-3xl overflow-hidden mb-14 h-72 md:h-96">
        <Image
          src="https://images.unsplash.com/photo-1601024445121-e294d11ac7f7?w=1600&h=900&fit=crop&auto=format&q=80"
          alt="Paragliding in Arunachal Pradesh"
          fill
          className="object-cover"
          data-ai-hint="paragliding mountain sky himalayas"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <span className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">
            Adventures · Paragliding
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-white mb-3">
            Paragliding in Arunachal
          </h1>
          <p className="text-white/80 max-w-xl text-sm md:text-base">
            Soar on thermal currents above ancient monasteries, terraced valleys, and snow-draped Himalayan ridges — the Eastern Himalayas from a bird's eye view.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal variant="up" className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary/5 rounded-2xl p-6 md:p-8">
          {[
            { value: "6+", label: "Launch Sites" },
            { value: "3,000 m", label: "Max Altitude" },
            { value: "Oct–Apr", label: "Best Season" },
            { value: "Tandem", label: "Available" },
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

      {/* Launch Sites Grid */}
      <ScrollReveal variant="up" className="mb-4">
        <h2 className="text-2xl font-bold font-headline text-primary mb-1">Launch Sites</h2>
        <p className="text-muted-foreground">From beginner tandem flights to expert cross-country soaring</p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {launchSites.map((site, idx) => (
          <ScrollReveal key={idx} variant="up" delay={idx * 70}>
            <div className="overflow-hidden border-none shadow-lg rounded-2xl group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={site.image}
                  alt={site.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={site.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white text-lg font-bold font-headline">{site.name}</h3>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" /> {site.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 text-primary" /> {site.season}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Wind className="h-3 w-3 text-primary" /> {site.altitude}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={site.levelColor}>{site.level}</Badge>
                  <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-current" /> {site.rating}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{site.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA Banner */}
      <ScrollReveal variant="up">
        <div className="py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">
            Ready to Take Flight?
          </h2>
          <p className="text-lg text-white/80 max-w-xl">
            Whether you want a tandem intro flight or a solo cross-country adventure, our certified pilots and BHPA-standard equipment keep you safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/itinerary" className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
              Book a Flight
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

