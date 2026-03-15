"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bookmark, Clock } from "lucide-react"

export default function SavedTripsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Bookmark className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phase 2 — Coming Later</span>
        </div>
        <h1 className="text-3xl font-bold font-headline mb-3">Saved Trips</h1>
        <p className="text-muted-foreground mb-6">
          Save your favourite itineraries and destinations for quick access.
          This feature is coming in a future release.
        </p>
        <Link href="/itinerary">
          <Button variant="outline">Browse Itineraries</Button>
        </Link>
      </div>
    </div>
  )
}
