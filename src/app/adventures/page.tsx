"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutGrid, TreePine, Waves, Fish, Wind } from "lucide-react"

const ACTIVITIES = [
  { label: "Trekking", href: "/adventures/trekking", icon: TreePine, desc: "High-altitude trails and remote valleys" },
  { label: "River Rafting", href: "/adventures/rafting", icon: Waves, desc: "Grade IV rapids on the mighty Siang" },
  { label: "Angling", href: "/adventures/angling", icon: Fish, desc: "World-class mahseer fishing in pristine rivers" },
  { label: "Paragliding", href: "/adventures/paragliding", icon: Wind, desc: "Soar above the Eastern Himalayas" },
]

export default function AdventuresPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <LayoutGrid className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-headline mb-2">Adventures</h1>
          <p className="text-muted-foreground">
            Arunachal Pradesh&apos;s wilderness is the stage for some of India&apos;s most
            thrilling outdoor experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACTIVITIES.map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-4 rounded-xl border p-4 hover:bg-secondary/40 transition-colors"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
