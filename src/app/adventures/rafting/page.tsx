import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Clock, Waves, Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"

const rivers = [
  {
    name: "Siang River",
    location: "East Siang",
    duration: "3–5 Days",
    grade: "Grade IV–V",
    gradeColor: "bg-red-100 text-red-700",
    season: "Oct–Mar",
    desc: "The crown jewel of Arunachal rafting. The Siang thunders through deep gorges carved by the Tibetan plateau, delivering relentless rapids and jaw-dropping canyon scenery.",
    image: "https://picsum.photos/seed/raft-siang/800/600",
    imageHint: "river rafting white water rapids",
    rating: 4.9,
  },
  {
    name: "Kameng River",
    location: "West Kameng",
    duration: "2–3 Days",
    grade: "Grade III–IV",
    gradeColor: "bg-orange-100 text-orange-700",
    season: "Nov–Feb",
    desc: "Perfect for intermediate paddlers. The Kameng flows past elephant grasslands and dense subtropical forests before widening into serene flat-water stretches.",
    image: "https://picsum.photos/seed/raft-kameng/800/600",
    imageHint: "river kayak nature scenic",
    rating: 4.7,
  },
  {
    name: "Subansiri River",
    location: "Lower Subansiri",
    duration: "4–6 Days",
    grade: "Grade IV",
    gradeColor: "bg-orange-100 text-orange-700",
    season: "Oct–Mar",
    desc: "Multi-day expeditions on the 'Gold River' combine heart-pumping rapids with riverside camping in near-pristine wilderness frequented by elephants.",
    image: "https://picsum.photos/seed/raft-subansiri/800/600",
    imageHint: "serene mountain river camping",
    rating: 4.6,
  },
  {
    name: "Lohit River",
    location: "Lohit District",
    duration: "3–4 Days",
    grade: "Grade II–III",
    gradeColor: "bg-yellow-100 text-yellow-700",
    season: "Nov–Apr",
    desc: "A gentler river with spectacular scenery — ideal for families or beginners wanting their first Himalayan rafting experience without sacrificing the grandeur.",
    image: "https://picsum.photos/seed/raft-lohit/800/600",
    imageHint: "green valley river gentle",
    rating: 4.4,
  },
  {
    name: "Dibang River",
    location: "Dibang Valley",
    duration: "5–7 Days",
    grade: "Grade IV–V",
    gradeColor: "bg-red-100 text-red-700",
    season: "Oct–Feb",
    desc: "One of the most remote rafting runs in India, the Dibang requires experienced paddlers and rewards them with untouched wilderness and rare wildlife sightings.",
    image: "https://picsum.photos/seed/raft-dibang/800/600",
    imageHint: "remote wilderness mountain river",
    rating: 4.8,
  },
  {
    name: "Tirap River",
    location: "Tirap District",
    duration: "2 Days",
    grade: "Grade II",
    gradeColor: "bg-green-100 text-green-700",
    season: "Year-round",
    desc: "Calm and welcoming, the Tirap offers scenic float trips through dense jungle dotted with Wancho tribal villages — a cultural and natural treat.",
    image: "https://picsum.photos/seed/raft-tirap/800/600",
    imageHint: "jungle river calm float",
    rating: 4.3,
  },
]

export default function RaftingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Banner */}
      <ScrollReveal variant="up" className="relative rounded-3xl overflow-hidden mb-14 h-72 md:h-96">
        <Image
          src="https://picsum.photos/seed/raft-hero/1600/900"
          alt="River Rafting in Arunachal Pradesh"
          fill
          className="object-cover"
          data-ai-hint="white water river rafting himalayas"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <span className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">
            Adventures · River Rafting
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-white mb-3">
            River Rafting in Arunachal
          </h1>
          <p className="text-white/80 max-w-xl text-sm md:text-base">
            Conquer Grade II to Grade V rapids on ancient Himalayan rivers that have carved the landscape for millennia.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal variant="up" className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary/5 rounded-2xl p-6 md:p-8">
          {[
            { value: "6+", label: "Raftable Rivers" },
            { value: "Grade V", label: "Max Difficulty" },
            { value: "Oct–Apr", label: "Best Season" },
            { value: "2–7 Days", label: "Trip Duration" },
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

      {/* Rivers Grid */}
      <ScrollReveal variant="up" className="mb-4">
        <h2 className="text-2xl font-bold font-headline text-primary mb-1">Rivers to Explore</h2>
        <p className="text-muted-foreground">From beginner floats to expert expeditions</p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {rivers.map((river, idx) => (
          <ScrollReveal key={idx} variant="up" delay={idx * 70}>
            <div className="overflow-hidden border-none shadow-lg rounded-2xl group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={river.image}
                  alt={river.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={river.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white text-lg font-bold font-headline">{river.name}</h3>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" /> {river.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 text-primary" /> {river.duration}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Waves className="h-3 w-3 text-primary" /> {river.season}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={river.gradeColor}>{river.grade}</Badge>
                  <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-current" /> {river.rating}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{river.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA Banner */}
      <ScrollReveal variant="up">
        <div className="py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">
            Ride the Himalayan Rivers
          </h2>
          <p className="text-lg text-white/80 max-w-xl">
            Our certified rafting guides prioritise your safety without compromising the thrill. All equipment provided.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/itinerary" className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
              Book a Rafting Trip
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

