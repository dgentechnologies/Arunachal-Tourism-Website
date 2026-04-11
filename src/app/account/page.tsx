"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Bookmark, Clock, LogOut, UserCircle } from "lucide-react"

function initials(name: string | null) {
  if (!name) return "?"
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 space-y-6">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
    )
  }

  if (!user) return null

  async function handleSignOut() {
    try {
      await signOut()
      router.push("/")
    } catch {
      toast({ title: "Sign-out failed", description: "Please try again.", variant: "destructive" })
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-xl border bg-card shadow-sm p-8 space-y-8">
        {/* Profile header */}
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 text-lg">
            <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
            <AvatarFallback>{initials(user.displayName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h1 className="text-xl font-bold truncate">{user.displayName || "Explorer"}</h1>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>

        <Separator />

        {/* Account links */}
        <nav className="space-y-2">
          <Link
            href="/account/trips"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-secondary/50 transition-colors"
          >
            <Bookmark className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="font-medium text-sm">Saved trips</p>
              <p className="text-xs text-muted-foreground">Your saved itineraries and destinations</p>
            </div>
          </Link>
          <Link
            href="/account/permits"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-secondary/50 transition-colors"
          >
            <Clock className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="font-medium text-sm">Permit tracker</p>
              <p className="text-xs text-muted-foreground">Track your Inner Line Permit applications</p>
            </div>
          </Link>
          <Link
            href="/account/profile"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-secondary/50 transition-colors"
          >
            <UserCircle className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="font-medium text-sm">Profile &amp; preferences</p>
              <p className="text-xs text-muted-foreground">Manage your personal information</p>
            </div>
          </Link>
        </nav>

        <Separator />

        <Button variant="outline" className="gap-2 text-destructive hover:text-destructive" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
