"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCircle, Clock } from "lucide-react"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <UserCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phase 2 — Coming Later</span>
        </div>
        <h1 className="text-3xl font-bold font-headline mb-3">My Account</h1>
        <p className="text-muted-foreground mb-6">
          Personalised account features — saved trips, permit tracker and travel
          profile — are planned for a future release.
        </p>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <UserCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phase 2 — Coming Later</span>
        </div>
        <h1 className="text-3xl font-bold font-headline mb-3">My Account</h1>
        <p className="text-muted-foreground mb-6">
          Personalised account features — saved trips, permit tracker and travel
          profile — are planned for a future release.
        </p>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
