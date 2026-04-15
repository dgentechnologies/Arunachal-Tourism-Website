"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { getFirebaseDbUsers } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { BookmarkCheck, Loader2, Trash2, MapPin, Clock, Calendar, ArrowLeft, Pencil } from "lucide-react"

interface SavedTrip {
  id: string
  planId: string
  title: string
  circuit: string
  durationDays: number
  difficulty: string
  summary: string
  coverImage: string
  tags: string[]
  bestTime: string
  generatedByAI?: boolean
  savedAt: { seconds: number } | null
}

export default function SavedTripsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [trips, setTrips] = useState<SavedTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/account/trips")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return
    const tripsRef = collection(getFirebaseDbUsers(), "users", user.uid, "trips")
    const q = query(tripsRef, orderBy("savedAt", "desc"))
    getDocs(q)
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as SavedTrip))
        setTrips(data)
      })
      .catch(() => {
        toast({ variant: "destructive", title: "Error", description: "Could not load saved trips." })
      })
      .finally(() => setLoading(false))
  }, [user, toast])

  const handleDelete = async (tripId: string) => {
    if (!user) return
    setDeletingId(tripId)
    try {
      await deleteDoc(doc(getFirebaseDbUsers(), "users", user.uid, "trips", tripId))
      setTrips((prev) => prev.filter((t) => t.id !== tripId))
      toast({ title: "Removed", description: "Itinerary removed from your saved trips." })
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Could not remove itinerary." })
    } finally {
      setDeletingId(null)
      setConfirmDeleteId(null)
    }
  }

  const difficultyColor: Record<string, string> = {
    Easy: "bg-green-100 text-green-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    Challenging: "bg-red-100 text-red-700",
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="sm" asChild className="-ml-2">
            <Link href="/account"><ArrowLeft className="h-4 w-4 mr-1" /> My Account</Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <BookmarkCheck className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary font-headline">Saved Itineraries</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {trips.length === 0 ? "No saved trips yet" : `${trips.length} itinerary${trips.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <BookmarkCheck className="h-14 w-14 text-muted-foreground/40 mx-auto" />
            <p className="text-lg text-muted-foreground">You haven&apos;t saved any itineraries yet.</p>
            <Button asChild>
              <Link href="/itinerary">Browse Itineraries</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden border border-border/60 shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={trip.coverImage || "https://picsum.photos/seed/arunachal/800/500"}
                    alt={trip.title}
                    fill
                    className="object-cover"
                    data-ai-hint="scenic landscape"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Pencil edit icon — top-right */}
                  <Link
                    href={`/itinerary/edit/${trip.id}`}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
                    title="Edit with AI"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Pencil className="h-3.5 w-3.5 text-primary" />
                  </Link>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColor[trip.difficulty] ?? "bg-white/20 text-white"}`}>
                      {trip.difficulty}
                    </span>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-7 w-7 opacity-80 hover:opacity-100"
                      onClick={() => setConfirmDeleteId(trip.id)}
                      disabled={deletingId === trip.id}
                    >
                      {deletingId === trip.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <Trash2 className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base font-headline leading-tight">{trip.title}</h3>
                    {trip.generatedByAI && (
                      <span className="shrink-0 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">AI Edited</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />{trip.circuit}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary" />{trip.durationDays} days</span>
                    {trip.bestTime && (
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-primary" />{trip.bestTime}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{trip.summary}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {trip.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button className="flex-1" size="sm" variant="outline" asChild>
                      <Link href="/itinerary">View Plans</Link>
                    </Button>
                    <Button className="flex-1 gap-1.5" size="sm" asChild>
                      <Link href={`/itinerary/edit/${trip.id}`}>
                        <Pencil className="h-3.5 w-3.5" /> Edit with AI
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove saved itinerary?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the itinerary from your saved trips. You can always save it again later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

