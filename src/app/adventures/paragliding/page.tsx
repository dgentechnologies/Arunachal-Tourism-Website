"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wind, Construction } from "lucide-react"

export default function ParaglidingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Wind className="h-8 w-8 text-primary" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Construction className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Coming Soon</span>
        </div>
        <h1 className="text-3xl font-bold font-headline mb-3">Paragliding</h1>
        <p className="text-muted-foreground mb-6">
          Soar above the Eastern Himalayas. Arunachal Pradesh offers spectacular
          paragliding sites with views of snow-capped peaks and deep river gorges.
        </p>
        <Link href="/adventures">
          <Button>All Adventures</Button>
        </Link>
      </div>
    </div>
  )
}
