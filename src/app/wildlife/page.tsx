"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, Leaf, Shield, Camera, TreePine } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"

export default function WildlifePage() {
  const { t } = useLanguage()

  const wildlife = [
    {
      name: "Red Panda",
      scientificName: "Ailurus fulgens",
      status: "Endangered",
      habitat: "Eastern Himalayan forests, 2,200-4,800m",
      desc: "The adorable red panda thrives in the bamboo forests of Arunachal. These arboreal mammals are most active at dawn and dusk, spending their days sleeping in tree branches.",
      image: "https://images.unsplash.com/photo-1612540393026-8f0e2e5d05c8?w=800&q=80",
      color: "bg-red-100 text-red-700",
      population: "Protected population",
      bestSpot: "Eaglenest Wildlife Sanctuary"
    },
    {
      name: "Snow Leopard",
      scientificName: "Panthera uncia",
      status: "Vulnerable",
      habitat: "Alpine regions above 3,000m",
      desc: "The elusive 'ghost of the mountains' roams the high-altitude regions. With thick fur and powerful build, these solitary predators are perfectly adapted to harsh mountain conditions.",
      image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&q=80",
      color: "bg-blue-100 text-blue-700",
      population: "10-15 individuals estimated",
      bestSpot: "Tawang District"
    },
    {
      name: "Clouded Leopard",
      scientificName: "Neofelis nebulosa",
      status: "Vulnerable",
      habitat: "Dense tropical and subtropical forests",
      desc: "Named for their distinctive cloud-like spots, these medium-sized cats are excellent climbers. They possess the longest canine teeth relative to body size of any living feline.",
      image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&q=80",
      color: "bg-gray-100 text-gray-700",
      population: "Stable population",
      bestSpot: "Namdapha National Park"
    },
    {
      name: "Hoolock Gibbon",
      scientificName: "Hoolock hoolock",
      status: "Endangered",
      habitat: "Evergreen and semi-evergreen forests",
      desc: "India's only ape species, these acrobatic primates swing through the forest canopy with incredible agility. Their haunting morning calls echo through the forests at dawn.",
      image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&q=80",
      color: "bg-green-100 text-green-700",
      population: "100+ individuals",
      bestSpot: "Mehao Wildlife Sanctuary"
    },
    {
      name: "Great Hornbill",
      scientificName: "Buceros bicornis",
      status: "Vulnerable",
      habitat: "Tropical and subtropical forests",
      desc: "With their impressive casque and loud calls, these magnificent birds are vital seed dispersers. Tribal communities consider them sacred, calling them the 'farmer's friend'.",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80",
      color: "bg-yellow-100 text-yellow-700",
      population: "Breeding population present",
      bestSpot: "Pakke Tiger Reserve"
    },
    {
      name: "Mishmi Takin",
      scientificName: "Budorcas taxicolor",
      status: "Vulnerable",
      habitat: "Temperate forests, 2,500-4,500m",
      desc: "This rare goat-antelope found in the Mishmi Hills is Arunachal's state animal. With a distinctive golden coat and robust build, they navigate steep mountain terrain with ease.",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      color: "bg-orange-100 text-orange-700",
      population: "Endemic to region",
      bestSpot: "Mishmi Hills"
    },
  ]

  const sanctuaries = [
    {
      name: "Namdapha National Park",
      area: "1,985 km²",
      species: "1,000+",
      highlight: "Four big cat species",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    },
    {
      name: "Eaglenest Wildlife Sanctuary",
      area: "218 km²",
      species: "600+ birds",
      highlight: "Birding paradise",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    },
    {
      name: "Pakke Tiger Reserve",
      area: "862 km²",
      species: "300+ birds",
      highlight: "Hornbill haven",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <ScrollReveal variant="up" className="max-w-4xl mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-primary font-headline mb-6 tracking-tight">
          Wildlife & Nature
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          Arunachal Pradesh is one of the world's 25 biodiversity hotspots, home to rare species found nowhere else on Earth. From snow leopards in alpine peaks to clouded leopards in tropical forests, this pristine wilderness harbors nature's most magnificent creatures.
        </p>
      </ScrollReveal>

      {/* Conservation Stats */}
      <ScrollReveal variant="up" className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-br from-primary/10 via-[#40e0d0]/10 to-[#fccc38]/10 rounded-3xl p-8 md:p-12">
          {[
            { icon: TreePine, value: "80%", label: "Forest Cover" },
            { icon: Shield, value: "11", label: "Protected Areas" },
            { icon: Camera, value: "500+", label: "Bird Species" },
            { icon: Leaf, value: "5,000+", label: "Plant Species" },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="text-center">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <span className="block text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</span>
                <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            )
          })}
        </div>
      </ScrollReveal>

      {/* Protected Sanctuaries */}
      <ScrollReveal variant="up" className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline mb-8">Protected Sanctuaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sanctuaries.map((sanctuary, idx) => (
            <Card key={idx} className="overflow-hidden border-none shadow-lg group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={sanctuary.image}
                  alt={sanctuary.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold font-headline">{sanctuary.name}</h3>
                  <p className="text-white/80 text-sm mt-1">{sanctuary.highlight}</p>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Area</span>
                    <p className="font-bold text-primary">{sanctuary.area}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Species</span>
                    <p className="font-bold text-primary">{sanctuary.species}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      {/* Wildlife Species Grid */}
      <ScrollReveal variant="up" className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline mb-8">Iconic Species</h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {wildlife.map((animal, idx) => (
          <ScrollReveal key={idx} variant="up" delay={idx * 70}>
            <Card className="overflow-hidden border-none shadow-lg group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className={animal.color}>{animal.status}</Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-2xl font-bold font-headline">{animal.name}</h3>
                  <p className="text-white/70 text-sm italic mt-1">{animal.scientificName}</p>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground block mb-1">Habitat:</span>
                    <span className="font-medium">{animal.habitat}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{animal.desc}</p>
                <div className="border-t pt-3 mt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Population:</span>
                    <span className="font-semibold">{animal.population}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Best viewing:</span>
                    <span className="font-semibold text-primary">{animal.bestSpot}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {/* Conservation Message */}
      <ScrollReveal variant="up" className="mb-16">
        <div className="bg-primary text-white rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6">
              Conservation Through Community
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Arunachal's tribal communities have been the guardians of these forests for centuries. Their traditional ecological knowledge and sustainable practices have preserved this biodiversity hotspot. Every wildlife tour directly supports local conservation efforts and community livelihoods.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-[#40e0d0] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">26 Major Tribes</h4>
                  <p className="text-white/70 text-sm">Traditional forest guardians</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TreePine className="h-6 w-6 text-[#40e0d0] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Sacred Groves</h4>
                  <p className="text-white/70 text-sm">Protected by tribal laws</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Leaf className="h-6 w-6 text-[#40e0d0] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Carbon Sink</h4>
                  <p className="text-white/70 text-sm">India's green lung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal variant="up">
        <div className="py-16 bg-gradient-to-br from-[#f6f3f2] to-[#e8e4e1] text-foreground rounded-3xl px-8 md:px-16 flex flex-col items-center text-center space-y-6">
          <Camera className="h-16 w-16 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold font-headline max-w-2xl">
            Experience Wildlife Responsibly
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Join expert-led wildlife tours that prioritize conservation and community benefit. Track rare species with trained naturalists while supporting habitat protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/itinerary">
              <Button size="lg" className="h-12 px-8 font-semibold rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95">
                Plan Wildlife Safari <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/guides">
              <Button size="lg" variant="outline" className="h-12 px-8 font-semibold rounded-full border-2 border-primary/20 hover:bg-primary/5 transition-all duration-300 hover:scale-105 active:scale-95">
                View Travel Guides
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground/70 max-w-md pt-4">
            All tours follow responsible wildlife viewing guidelines and support local conservation initiatives
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}
