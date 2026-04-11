"use client"

import { notFound, useRouter } from "next/navigation"
import { use, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { vehiclesData } from "@/lib/transport-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Users, Fuel, ArrowLeft, Shield, CheckCircle,
  ChevronRight, Calendar, Map, Clock,
} from "lucide-react"

export default function TransportBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const vehicle = vehiclesData.find((v) => v.id === Number(id))

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    dropLocation: "",
    licenseNumber: "",
    requests: "",
  })
  const [submitted, setSubmitted] = useState(false)

  if (!vehicle) return notFound()

  const days = (() => {
    if (!form.pickupDate || !form.returnDate) return 1
    const diff = new Date(form.returnDate).getTime() - new Date(form.pickupDate).getTime()
    const d = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return d > 0 ? d : 1
  })()

  const subtotal = vehicle.price * days
  const taxes = Math.round(subtotal * 0.05)
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
          <h1 className="text-3xl font-bold font-headline text-primary">Reservation Confirmed!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Your reservation for the <span className="font-semibold text-foreground">{vehicle.name}</span> has been received.
            A confirmation will be sent to <span className="font-semibold text-foreground">{form.email}</span>.
          </p>
          <div className="bg-white rounded-2xl shadow border border-border/60 p-6 text-left space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Vehicle</span><span className="font-medium">{vehicle.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Pick-up</span><span className="font-medium">{form.pickupDate || "–"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Return</span><span className="font-medium">{form.returnDate || "–"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{days} {days === 1 ? "day" : "days"}</span></div>
            <hr className="border-border/60" />
            <div className="flex justify-between font-bold text-base"><span>Total Paid</span><span className="text-primary">₹{total.toLocaleString()}</span></div>
          </div>
          <Link href="/transport">
            <Button variant="outline" className="w-full h-12 font-bold rounded-xl border-primary text-primary hover:bg-primary hover:text-white transition-all">
              Explore More Vehicles
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
          Back to Vehicle Details
        </button>
      </div>

      {/* ── Page header ── */}
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Complete Your Reservation</h1>
        <p className="text-muted-foreground mt-1">You&apos;re just a few steps away from your Himalayan road trip.</p>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">

            {/* Driver Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-border/60 p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold font-headline flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Driver / Contact Details
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
                {vehicle.type === "Bike" && (
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="licenseNumber">Driving Licence Number *</Label>
                    <Input id="licenseNumber" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="DL-XXXXXXXXXXXXXXXX" required className="h-11" />
                  </div>
                )}
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-border/60 p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold font-headline flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Trip Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pick-up Date *</Label>
                  <Input id="pickupDate" name="pickupDate" type="date" value={form.pickupDate} onChange={handleChange} required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnDate">Return Date *</Label>
                  <Input id="returnDate" name="returnDate" type="date" value={form.returnDate} onChange={handleChange} required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pick-up Location *</Label>
                  <Input id="pickupLocation" name="pickupLocation" value={form.pickupLocation} onChange={handleChange} placeholder="e.g. Itanagar Airport" required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropLocation">Drop-off Location</Label>
                  <Input id="dropLocation" name="dropLocation" value={form.dropLocation} onChange={handleChange} placeholder="e.g. Tawang (same as pick-up if returning)" className="h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requests">Route / Special Requests (optional)</Label>
                <textarea
                  id="requests"
                  name="requests"
                  value={form.requests}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. Tawang → Se La Pass → Bomdila loop; early morning start preferred..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
              </div>
            </div>

            {/* Policies */}
            <div className="bg-primary/5 rounded-2xl border border-primary/15 p-6 space-y-3">
              <h2 className="text-base font-bold flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Rental Policies</h2>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Valid driving license (LMV / motorcycle) required at pick-up.</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Inner Line Permit (ILP) mandatory for restricted area routes.</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Fuel cost is not included in the daily rate.</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />Free cancellation up to 48 hours before pick-up date.</li>
              </ul>
            </div>

            <Button type="submit" className="w-full h-14 text-base font-bold rounded-xl">
              Confirm Reservation — ₹{total.toLocaleString()} <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </form>

          {/* ── Summary panel ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-border/60 overflow-hidden">
              <div className="relative h-48">
                <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg font-headline leading-tight">{vehicle.name}</h3>
                  <p className="text-white/80 text-sm">{vehicle.category}</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />{vehicle.capacity}</span>
                  <span className="flex items-center gap-1.5"><Fuel className="h-4 w-4 text-primary" />{vehicle.fuel}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{days} {days === 1 ? "day" : "days"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily rate</span>
                    <span className="font-medium">₹{vehicle.price.toLocaleString()} /day</span>
                  </div>
                </div>

                <hr className="border-border/60" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({days} {days === 1 ? "day" : "days"})</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes & fees (5%)</span>
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
