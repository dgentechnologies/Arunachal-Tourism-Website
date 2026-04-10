import Image from "next/image"
import Link from "next/link"
import { ArrowRight, TreePine, Waves, Fish, Wind } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const activities = [
  {
    name: "Trekking",
    tagline: "High-altitude trails across remote valleys",
    desc: "Conquer ancient trails through misty rhododendron forests, cross glacial streams, and camp under a sky ablaze with stars. Arunachal offers routes from moderate day-hikes to multi-week expeditions.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "mountain trekking trail",
    href: "/adventures/trekking",
    icon: TreePine,
    color: "text-emerald-600",
    badge: "50+ Routes",
  },
  {
    name: "River Rafting",
    tagline: "Grade IV+ rapids on the Siang & Kameng",
    desc: "Plunge into the roaring white-water of the Siang, Kameng, and Subansiri rivers. Whether you're a first-timer or a seasoned paddler, the rivers of Arunachal deliver an unforgettable rush.",
    image: "https://images.unsplash.com/photo-1530655638484-b7d99a5f3a3e?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "river rafting white water",
    href: "/adventures/rafting",
    icon: Waves,
    color: "text-blue-600",
    badge: "Grade II–V",
  },
  {
    name: "Angling",
    tagline: "World-class mahseer fishing in pristine rivers",
    desc: "Cast your line in crystal-clear, biodiverse rivers teeming with the legendary Golden Mahseer. Arunachal's catch-and-release zones are a paradise for sport-fishers seeking solitude and spectacle.",
    image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "fishing river nature",
    href: "/adventures/angling",
    icon: Fish,
    color: "text-cyan-600",
    badge: "Year-round",
  },
  {
    name: "Paragliding",
    tagline: "Soar above the Eastern Himalayas",
    desc: "Launch from ridge-top sites and ride thermal currents over a carpet of old-growth forest, terraced fields, and snow-capped peaks. Experience the world from a bird's perspective.",
    image: "https://images.unsplash.com/photo-1601024445121-e294d11ac7f7?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "paragliding mountain sky",
    href: "/adventures/paragliding",
    icon: Wind,
    color: "text-violet-600",
    badge: "Oct–Apr Season",
  },
]

export default function AdventuresPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <ScrollReveal variant="up" className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline mb-4">
          Adventures in Arunachal Pradesh
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Push your limits in one of the last great frontiers on Earth. From raging Himalayan rivers to
          sky-high paragliding launches, every adventure here comes with an unbeatable backdrop.
        </p>
      </ScrollReveal>

      {/* Stats Banner */}
      <ScrollReveal variant="up" className="mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary/5 rounded-2xl p-6 md:p-8">
          {[
            { value: "50+", label: "Trekking Routes" },
            { value: "6", label: "Raftable Rivers" },
            { value: "10+", label: "Angling Zones" },
            { value: "3", label: "Paragliding Sites" },
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

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activities.map((activity, idx) => {
          const Icon = activity.icon
          return (
            <ScrollReveal key={activity.name} variant="up" delay={idx * 80}>
              <Link href={activity.href} className="group block h-full">
                <div className="overflow-hidden border-none shadow-lg rounded-2xl h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
                  <div className="relative w-full h-60 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={activity.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-bold uppercase tracking-wider">
                        {activity.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${activity.color}`} />
                      <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">
                        {activity.name}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{activity.tagline}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{activity.desc}</p>
                    <span className="flex items-center gap-2 text-primary font-semibold text-sm mt-2 w-fit">
                      Explore {activity.name} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>

      {/* CTA Banner */}
      <ScrollReveal variant="up" className="mt-20">
        <div className="py-16 bg-primary text-white rounded-[3rem] px-8 md:px-16 flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">
            Plan Your Adventure Today
          </h2>
          <p className="text-lg text-white/80 max-w-xl">
            Let our AI-powered planner build the perfect itinerary around your chosen activities,
            budget, and fitness level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/itinerary"
              className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Build My Itinerary
            </Link>
            <Link
              href="/guides"
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold transition-all"
            >
              Read the Guide
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

