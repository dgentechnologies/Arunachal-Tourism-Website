"use client"

import { notFound, useRouter } from "next/navigation"
import { use, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { hotelsData } from "@/lib/hotels-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Star, MapPin, ArrowLeft, Users, Calendar, Shield,
  CheckCircle, ChevronRight, Clock,
} from "lucide-react"

export default function HotelBookingPage({ params, searchParams }: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ room?: string; price?: string }>
}) {
  const { id } = use(params)
  const sp = use(searchParams)
  const router = useRouter()
  const hotel = hotelsData.find((h) => h.id === Number(id))

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    requests: "",
  })
  const [submitted, setSubmitted] = useState(false)

  if (!hotel) return notFound()

  const selectedRoom = sp.room ? decodeURIComponent(sp.room) : hotel.rooms[0].type
  const basePrice = Number(sp.price) || hotel.rooms[0].price

  const nights = (() => {
    if (!form.checkIn || !form.checkOut) return 1
    const diff = new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()
    const n = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return n > 0 ? n : 1
  })()

  const subtotal = basePrice * nights
  const taxes = Math.round(subtotal * 0.12)
  const total = subtotal + taxes

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 py-20">
          <div className="flex justify-center">
            <div className="bg-primary/10 rounded-full p-6">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-headline text-primary">Booking Confirmed!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Your reservation at <span className="font-semibold text-foreground">{hotel.name}</span> has been received.
            A confirmation will be sent to <span className="font-semibold text-foreground">{form.email}</span>.
          </p>
          <div className="bg-white rounded-2xl shadow border border-border/60 p-6 text-left space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Room</span><span className="font-medium">{selectedRoom}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span className="font-medium">{form.checkIn || "–"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span className="font-medium">{form.checkOut || "–"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Guests</span><span className="font-medium">{form.guests}</span></div>
            <hr className="border-border/60" />
            <div className="flex justify-between font-bold text-base"><span>Total Paid</span><span className="text-primary">₹{total.toLocaleString()}</span></div>
          </div>
          <Link href="/hotels">
            <Button variant="outline" className="w-full h-12 font-bold rounded-xl border-primary text-primary hover:bg-primary hover:text-white transition-all">
              Explore More Hotels
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Back navigation ── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Hotel Details
        </button>
      </div>

      {/* ── Page header ── */}
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Complete Your Booking</h1>
        <p className="text-muted-foreground mt-1">You&apos;re just a few steps away from your mountain retreat.</p>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">

            {/* Guest Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-border/60 p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold font-headline flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Guest Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Rahul" required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Sharma" required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@example.com" required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required className="h-11" />
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-border/60 p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold font-headline flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Stay Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in Date *</Label>
                  <Input id="checkIn" name="checkIn" type="date" value={form.checkIn} onChange={handleChange} required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out Date *</Label>
                  <Input id="checkOut" name="checkOut" type="date" value={form.checkOut} onChange={handleChange} required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests *</Label>
                  <select
                    id="guests"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Selected Room</Label>
                  <div className="h-11 flex items-center px-3 rounded-md border border-input bg-muted/30 text-sm font-medium">
                    {selectedRoom}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requests">Special Requests (optional)</Label>
                <textarea
                  id="requests"
                  name="requests"
                  value={form.requests}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. early check-in, ground floor room, dietary requirements..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
              </div>
            </div>

            {/* Policies */}
            <div className="bg-primary/5 rounded-2xl border border-primary/15 p-6 space-y-3">
              <h2 className="text-base font-bold flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Booking Policies</h2>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />{hotel.cancellation}</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Check-in: {hotel.checkIn} · Check-out: {hotel.checkOut}</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Valid government-issued ID required at check-in.</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Inner Line Permit (ILP) required for non-resident Indian visitors.</li>
              </ul>
            </div>

            <Button type="submit" className="w-full h-14 text-base font-bold rounded-xl">
              Confirm Booking — ₹{total.toLocaleString()} <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </form>

          {/* ── Summary panel ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-border/60 overflow-hidden">
              <div className="relative h-48">
                <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg font-headline leading-tight">{hotel.name}</h3>
                  <p className="text-white/80 text-sm flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" /> {hotel.location}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <span className="font-bold">{hotel.rating}</span>
                  <span className="text-muted-foreground">· {hotel.reviews} reviews</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room type</span>
                    <span className="font-medium text-right max-w-[60%]">{selectedRoom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{nights} {nights === 1 ? "night" : "nights"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">₹{basePrice.toLocaleString()} / night</span>
                  </div>
                </div>

                <hr className="border-border/60" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({nights} {nights === 1 ? "night" : "nights"})</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes & fees (12%)</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                </div>

                <hr className="border-border/60" />

                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-primary text-xl">₹{total.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  No payment charged until final confirmation
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
