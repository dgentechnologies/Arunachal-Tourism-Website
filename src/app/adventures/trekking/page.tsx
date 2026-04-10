import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mountain, MapPin, Clock, Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"

const treks = [
  {
    name: "Gorichen Base Camp",
    location: "West Kameng",
    duration: "7–9 Days",
    difficulty: "Challenging",
    difficultyColor: "bg-red-100 text-red-700",
    altitude: "5,150 m",
    desc: "Summit Gorichen — the highest peak in Arunachal Pradesh — through ancient rhododendron forests and alpine meadows.",
    image: "https://picsum.photos/seed/trek-gorichen/800/600",
    imageHint: "high altitude mountain base camp",
    rating: 4.9,
  },
  {
    name: "Mechuka Valley Trek",
    location: "Shi-Yomi District",
    duration: "5–6 Days",
    difficulty: "Moderate",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    altitude: "2,600 m",
    desc: "Traverse the breathtaking Mechuka valley — a hidden Himalayan paradise surrounded by snowy peaks and traditional Memba villages.",
    image: "https://picsum.photos/seed/trek-mechuka/800/600",
    imageHint: "green valley mountain trek",
    rating: 4.8,
  },
  {
    name: "Kangto Base Camp",
    location: "Tawang District",
    duration: "6–8 Days",
    difficulty: "Challenging",
    difficultyColor: "bg-red-100 text-red-700",
    altitude: "4,800 m",
    desc: "A classic high-altitude circuit through Monpa villages, glacial lakes, and raw Himalayan landscapes near the Bhutan border.",
    image: "https://picsum.photos/seed/trek-kangto/800/600",
    imageHint: "snowy mountain himalaya camp",
    rating: 4.7,
  },
  {
    name: "Talle Valley Circuit",
    location: "Lower Subansiri",
    duration: "3–4 Days",
    difficulty: "Easy–Moderate",
    difficultyColor: "bg-green-100 text-green-700",
    altitude: "2,200 m",
    desc: "Explore the Talle Wildlife Sanctuary on well-marked forest paths, spotting hornbills, orchids, and rare primates along the way.",
    image: "https://picsum.photos/seed/trek-talle/800/600",
    imageHint: "dense jungle forest trail",
    rating: 4.6,
  },
  {
    name: "Ziro to Along Trans-Arunachal",
    location: "Ziro – East Siang",
    duration: "10–12 Days",
    difficulty: "Moderate",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    altitude: "1,600 m",
    desc: "A cross-district expedition through tribal heartlands, passing Apatani paddy fields, dense sal forests, and river crossings.",
    image: "https://picsum.photos/seed/trek-ziro-along/800/600",
    imageHint: "rice terraces valley trail",
    rating: 4.5,
  },
  {
    name: "Dirang to Sela Pass",
    location: "West Kameng",
    duration: "2–3 Days",
    difficulty: "Easy",
    difficultyColor: "bg-green-100 text-green-700",
    altitude: "4,170 m",
    desc: "A gentle high-altitude walk across the Sela plateau, visiting glacial lakes and a World War II memorial along the way.",
    image: "https://picsum.photos/seed/trek-sela/800/600",
    imageHint: "green mountains plateau path",
    rating: 4.4,
  },
]

export default function TrekkingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Banner */}
      <ScrollReveal variant="up" className="relative rounded-3xl overflow-hidden mb-14 h-72 md:h-96">
        <Image
          src="https://picsum.photos/seed/trek-hero/1600/900"
          alt="Trekking in Arunachal Pradesh"
          fill
          className="object-cover"
          data-ai-hint="mountain trekking trail himalayas"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <span className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">
            Adventures · Trekking
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-white mb-3">
            Trekking in Arunachal
          </h1>
          <p className="text-white/80 max-w-xl text-sm md:text-base">
            High-altitude trails through remote valleys, glacial passes, and tribal heartlands — all waiting to be explored on foot.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal variant="up" className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary/5 rounded-2xl p-6 md:p-8">
          {[
            { value: "50+", label: "Trekking Routes" },
            { value: "5,150 m", label: "Max Altitude" },
            { value: "Oct–May", label: "Best Season" },
            { value: "2–12 Days", label: "Trek Duration" },
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

      {/* Treks Grid */}
      <ScrollReveal variant="up" className="mb-4">
        <h2 className="text-2xl font-bold font-headline text-primary mb-1">Popular Trekking Routes</h2>
        <p className="text-muted-foreground">From beginner-friendly paths to serious mountaineering expeditions</p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {treks.map((trek, idx) => (
          <ScrollReveal key={idx} variant="up" delay={idx * 70}>
            <div className="overflow-hidden border-none shadow-lg rounded-2xl group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={trek.image}
                  alt={trek.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={trek.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white text-lg font-bold font-headline">{trek.name}</h3>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" /> {trek.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 text-primary" /> {trek.duration}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Mountain className="h-3 w-3 text-primary" /> {trek.altitude}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={trek.difficultyColor}>{trek.difficulty}</Badge>
                  <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-current" /> {trek.rating}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{trek.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA Banner */}
      <ScrollReveal variant="up">
        <div className="py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">
            Ready to Hit the Trail?
          </h2>
          <p className="text-lg text-white/80 max-w-xl">
            Our expert guides know every pass and every shortcut. Book a guided trek and experience Arunachal the way it was meant to be explored.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/itinerary" className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
              Plan My Trek
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

