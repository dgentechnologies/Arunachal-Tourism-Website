"use client"

import Link from "next/link"
import {
  FileText, CheckCircle2, AlertCircle, Clock, DollarSign, MapPin,
  Users, Globe, ArrowRight, ExternalLink, ChevronDown, ChevronUp,
  Shield, Camera, Plane, Building2, Info, Phone, Mail, Landmark,
  BookOpen, List, Zap, Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { cn } from "@/lib/utils"

const FRRO_URL = "https://indianfrro.gov.in/eservices/home.jsp"
const MHA_URL = "https://www.mha.gov.in"
const ITBP_URL = "https://www.itbpolice.nic.in"

const PROCESS_STEPS = [
  {
    step: 1,
    icon: Globe,
    title: "Check Eligibility",
    description: "Confirm you are not a national of Pakistan, China, or Myanmar (land borders). Citizens of all other countries are eligible. Check if your destination requires an additional Restricted Area Permit (RAP).",
    duration: "Before travel",
    color: "bg-blue-500",
  },
  {
    step: 2,
    icon: FileText,
    title: "Prepare Documents",
    description: "Gather your passport (valid for 6+ months beyond travel date), visa, passport-sized photographs, travel insurance certificate, travel itinerary, and proof of accommodation bookings.",
    duration: "1–2 weeks before",
    color: "bg-violet-500",
  },
  {
    step: 3,
    icon: Building2,
    title: "Apply via FRRO / MHA",
    description: "Apply online through the e-FRRO portal (indianfrro.gov.in) or submit a physical application at the Foreigners Regional Registration Office (FRRO) in major Indian cities: Delhi, Mumbai, Kolkata, Chennai.",
    duration: "4–6 weeks before travel",
    color: "bg-amber-500",
  },
  {
    step: 4,
    icon: Clock,
    title: "Processing Time",
    description: "PAP/RAP processing typically takes 7–30 business days. Apply well in advance. Applications submitted at the FRRO in person are often processed faster. Expedite fees may apply.",
    duration: "Allow 30 days",
    color: "bg-orange-500",
  },
  {
    step: 5,
    icon: CheckCircle2,
    title: "Permit Issued",
    description: "Once approved, your Protected Area Permit is emailed or collected in person. Print multiple copies. The permit specifies the districts and duration of your visit.",
    duration: "Upon approval",
    color: "bg-green-500",
  },
  {
    step: 6,
    icon: Shield,
    title: "Register on Arrival",
    description: "Present your permit and passport at the Inner Line border checkpoint upon entering Arunachal Pradesh. Register with the local police station within 24 hours of arriving in each district.",
    duration: "At border checkpoint",
    color: "bg-primary",
  },
]

const DOCUMENTS = [
  { name: "Valid Passport", detail: "Valid for minimum 6 months beyond your travel dates", required: true },
  { name: "Indian Visa", detail: "Tourist visa (or e-Visa). Ensure it allows travel to restricted areas", required: true },
  { name: "2 Passport Photos", detail: "Recent, white background, 35mm × 45mm size", required: true },
  { name: "Travel Insurance", detail: "Comprehensive policy covering medical evacuation from remote areas", required: true },
  { name: "Travel Itinerary", detail: "Day-by-day itinerary with accommodation names and contact details", required: true },
  { name: "Hotel Confirmations", detail: "Booking confirmations for each night of stay", required: true },
  { name: "Return Ticket / Onward Travel", detail: "Proof of onward or return travel from India", required: true },
  { name: "Bank Statement / Sufficient Funds Proof", detail: "Evidence of adequate funds for the duration of stay", required: false },
  { name: "Travel Agency Sponsorship Letter", detail: "If travelling with a registered Indian tour operator — speeds processing", required: false },
  { name: "Accommodation NOC from Owner", detail: "Required for some home-stay / private lodging arrangements", required: false },
]

const FEES = [
  { type: "PAP (Protected Area Permit)", fee: "No fee for most nationalities", validity: "Up to 30 days", note: "Renewable" },
  { type: "RAP (Restricted Area Permit)", fee: "₹5,000 – ₹10,000", validity: "Duration of visit", note: "Tawang, Bumla, Mechuka" },
  { type: "Group RAP (5+ people)", fee: "Reduced rate per person", validity: "Duration of visit", note: "Tour operators can expedite" },
]

const DISTRICTS = [
  { name: "Itanagar (Capital)", status: "PAP Required", color: "bg-blue-100 text-blue-700" },
  { name: "Pasighat", status: "PAP Required", color: "bg-blue-100 text-blue-700" },
  { name: "Ziro Valley", status: "PAP Required", color: "bg-blue-100 text-blue-700" },
  { name: "Bomdila", status: "PAP Required", color: "bg-blue-100 text-blue-700" },
  { name: "Along (Aalo)", status: "PAP Required", color: "bg-blue-100 text-blue-700" },
  { name: "Tawang District", status: "RAP Required", color: "bg-amber-100 text-amber-700" },
  { name: "Bumla Pass (China Border)", status: "Special RAP", color: "bg-red-100 text-red-700" },
  { name: "Mechuka Valley", status: "RAP Required", color: "bg-amber-100 text-amber-700" },
  { name: "Tuting / Yingkiong", status: "RAP Required", color: "bg-amber-100 text-amber-700" },
  { name: "Anini (Dibang Valley)", status: "RAP Required", color: "bg-amber-100 text-amber-700" },
  { name: "Hawai / Walong", status: "Special RAP", color: "bg-red-100 text-red-700" },
  { name: "Namdapha (Changlang)", status: "PAP Required", color: "bg-blue-100 text-blue-700" },
]

const FAQS = [
  {
    question: "Can I get a PAP on arrival at the Arunachal Pradesh border?",
    answer: "No. PAP and RAP must be obtained in advance through the FRRO or Ministry of Home Affairs. There is no on-arrival permit for foreign nationals. Always apply at least 4–6 weeks before travel.",
  },
  {
    question: "Can I travel independently or do I need a tour operator?",
    answer: "Most foreign nationals can travel independently with a PAP. However, for Restricted Areas (Tawang, Bumla, Mechuka), you are typically required to travel in a group of at least 2 people with a government-approved Indian tour operator.",
  },
  {
    question: "How long is a PAP valid for?",
    answer: "A PAP is typically issued for the duration of your intended visit, up to 30 days. Extensions can be applied for at the DC (Deputy Commissioner) office in the relevant district.",
  },
  {
    question: "Are there any nationalities that cannot visit Arunachal Pradesh?",
    answer: "Yes. Nationals of Pakistan, China, and Myanmar (via land border) require special government clearance and cannot obtain permits through standard channels. All other nationalities can apply for a PAP.",
  },
  {
    question: "Do I need to register with the police?",
    answer: "Yes. Foreign nationals must report to the local police station within 24 hours of arriving in each district. Your accommodation provider will usually assist with this. Carry multiple copies of your passport and permit.",
  },
  {
    question: "Can I photograph anywhere in Arunachal Pradesh?",
    answer: "Photography near military installations, border areas, and bridges is strictly prohibited. Always check local signage. Ask your guide before photographing tribal communities out of cultural respect.",
  },
]

export default function ForeignPermitPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-white/20 text-white border-none text-sm px-3 py-1">
                <Globe className="h-3.5 w-3.5 mr-1.5" />Foreign Nationals
              </Badge>
              <Badge className="bg-accent/80 text-accent-foreground border-none text-sm px-3 py-1">
                <Shield className="h-3.5 w-3.5 mr-1.5" />Official Guide
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-5 leading-tight">
              Protected Area Permit
              <span className="block text-accent mt-1">for Foreign Nationals</span>
            </h1>
            <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
              Arunachal Pradesh is a restricted area under Indian law. All foreign nationals must obtain a
              Protected Area Permit (PAP) — and a Restricted Area Permit (RAP) for border districts — before entering the state.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={FRRO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg">
                  Apply via FRRO Portal <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#process">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold">
                  View Step-by-Step Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/20 bg-black/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
              {[
                { icon: Clock, label: "Processing Time", value: "7–30 Days" },
                { icon: DollarSign, label: "PAP Fee", value: "No Charge" },
                { icon: MapPin, label: "Area Covered", value: "26 Districts" },
                { icon: Users, label: "Group for RAP", value: "Min. 2 Persons" },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="bg-white/15 p-2 rounded-lg shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg leading-tight">{stat.value}</p>
                      <p className="text-white/70 text-xs">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 max-w-6xl space-y-16">

        {/* Important Alert */}
        <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
          <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Apply Well in Advance</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              PAP/RAP applications must be submitted through official Indian government channels — they cannot be obtained on arrival.
              Processing can take up to 30 days. Apply at least 4–6 weeks before your planned travel date.
              Citizens of <strong>Pakistan, China, and Myanmar (land border)</strong> require separate high-level clearance.
            </p>
          </div>
        </div>

        {/* Types of Permits */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-3">Types of Permits</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Understanding which permit you need for your specific destinations in Arunachal Pradesh.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PAP Card */}
            <Card className="overflow-hidden border-2 border-blue-200 shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">PAP</h3>
                    <p className="text-blue-100 text-sm">Protected Area Permit</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Required for all foreign nationals entering Arunachal Pradesh. Covers the general tourist areas
                  of the state including Itanagar, Pasighat, Ziro Valley, Bomdila, Dirang, and most other districts.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Covers standard tourist destinations",
                    "No fee for most nationalities",
                    "Valid up to 30 days (extendable)",
                    "Apply via FRRO online portal",
                    "Individual or group applications accepted",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a href={FRRO_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                    Apply for PAP <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* RAP Card */}
            <Card className="overflow-hidden border-2 border-amber-200 shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-5 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">RAP</h3>
                    <p className="text-amber-100 text-sm">Restricted Area Permit</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Required in addition to PAP for travel to sensitive border districts: Tawang (including Bumla Pass),
                  Mechuka, Tuting, Yingkiong, Anini, and Walong. Must travel in a group with a registered Indian tour operator.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Required for all border districts",
                    "Fee: ₹5,000–₹10,000 per group",
                    "Minimum 2 persons per group",
                    "Registered Indian tour operator mandatory",
                    "Apply via MHA or state government",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a href={MHA_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mt-2 bg-amber-600 hover:bg-amber-700">
                    Apply via MHA <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section id="process">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-3">Step-by-Step Application Process</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Follow these 6 steps to successfully obtain your permit and enter Arunachal Pradesh.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="relative group">
                  <Card className="h-full border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                    <div className={cn("h-1.5 w-full", step.color)} />
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4 mb-3">
                        <div className={cn("flex items-center justify-center w-11 h-11 rounded-xl text-white shrink-0 shadow-md", step.color)}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step {step.step}</span>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">{step.duration}</Badge>
                          </div>
                          <h3 className="font-bold text-base mt-0.5">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </section>

        {/* Required Documents */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-3">Required Documents</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Prepare these documents before submitting your PAP/RAP application.</p>
          </div>
          <Card className="border border-border/60 shadow-md overflow-hidden">
            <div className="grid grid-cols-1 divide-y">
              {DOCUMENTS.map((doc, idx) => (
                <div key={idx} className={cn("flex items-start gap-4 px-6 py-4 transition-colors hover:bg-secondary/20", !doc.required && "opacity-80")}>
                  <div className={cn("shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
                    doc.required ? "bg-green-100" : "bg-secondary/50")}>
                    <CheckCircle2 className={cn("h-4 w-4", doc.required ? "text-green-600" : "text-muted-foreground")} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{doc.name}</span>
                      <Badge className={cn("text-xs border-none px-2",
                        doc.required ? "bg-green-100 text-green-700" : "bg-secondary text-muted-foreground")}>
                        {doc.required ? "Mandatory" : "Recommended"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{doc.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Fees & Validity */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-3">Fees & Validity</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Current permit fees and validity periods for foreign nationals.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border/60 shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-6 py-4 font-semibold">Permit Type</th>
                  <th className="text-left px-6 py-4 font-semibold">Fee</th>
                  <th className="text-left px-6 py-4 font-semibold">Validity</th>
                  <th className="text-left px-6 py-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((fee, idx) => (
                  <tr key={idx} className={cn("border-t hover:bg-secondary/20 transition-colors", idx % 2 === 1 && "bg-secondary/10")}>
                    <td className="px-6 py-4 font-medium">{fee.type}</td>
                    <td className="px-6 py-4">
                      <span className={cn("font-bold", fee.fee.includes("No fee") ? "text-green-600" : "text-primary")}>
                        {fee.fee}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{fee.validity}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{fee.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <Info className="h-3.5 w-3.5" /> Fees are subject to change. Verify current rates on the official FRRO portal before applying.
          </p>
        </section>

        {/* District Permit Status */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-3">Permit Requirements by District</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Check which type of permit you need for your specific destinations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
            {DISTRICTS.map((district) => (
              <div key={district.name} className="flex items-center justify-between gap-3 p-4 bg-background rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-medium text-sm">{district.name}</span>
                </div>
                <Badge className={cn("text-xs shrink-0 border-none", district.color)}>
                  {district.status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />PAP Required – standard tourist areas</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />RAP Required – border zone districts</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" />Special RAP – sensitive border points</div>
          </div>
        </section>

        {/* Rules & Regulations */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-3">Rules & Regulations</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Important rules all foreign visitors must follow while in Arunachal Pradesh.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: Shield,
                title: "Carry Permit at All Times",
                desc: "Your original PAP/RAP and passport must be carried at all times. Checkpoints are frequent, especially in border districts.",
                color: "text-blue-600 bg-blue-50",
              },
              {
                icon: Camera,
                title: "Photography Restrictions",
                desc: "Photography near army camps, bridges, roads, and military installations is strictly prohibited. Respect tribal privacy.",
                color: "text-red-600 bg-red-50",
              },
              {
                icon: Users,
                title: "Police Registration",
                desc: "Register with the local police station within 24 hours of arriving in each district. Your hotel will usually assist.",
                color: "text-violet-600 bg-violet-50",
              },
              {
                icon: Globe,
                title: "Respect Local Culture",
                desc: "Always ask permission before entering tribal villages or photographing people. Remove shoes before entering monasteries.",
                color: "text-green-600 bg-green-50",
              },
              {
                icon: Plane,
                title: "Stay Within Permitted Areas",
                desc: "Only visit districts listed in your permit. Entering a restricted area without RAP is a criminal offence under Indian law.",
                color: "text-amber-600 bg-amber-50",
              },
              {
                icon: BookOpen,
                title: "Comply with Local Laws",
                desc: "Forest entry, wildlife photography, and some religious sites require additional permissions from the Forest Department or local administration.",
                color: "text-primary bg-primary/5",
              },
            ].map((rule) => {
              const Icon = rule.icon
              return (
                <div key={rule.title} className="flex gap-4 p-5 rounded-2xl border border-border/60 bg-background shadow-sm hover:shadow-md transition-shadow">
                  <div className={cn("shrink-0 w-11 h-11 rounded-xl flex items-center justify-center", rule.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{rule.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Common questions from foreign nationals planning to visit Arunachal Pradesh.</p>
          </div>
          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-border/60 rounded-xl overflow-hidden shadow-sm">
                <button
                  className="w-full text-left flex items-center justify-between gap-4 px-6 py-4 font-semibold hover:bg-secondary/30 transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="text-sm md:text-base">{faq.question}</span>
                  {openFaq === idx
                    ? <ChevronUp className="h-4 w-4 text-primary shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t bg-secondary/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Official Links & Contacts */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-headline text-primary mb-3">Official Contacts & Resources</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Apply via official government channels only. Beware of unofficial agents.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Globe,
                title: "e-FRRO Portal",
                desc: "Online application portal for foreigners' registration and permit applications. The primary channel for most nationalities.",
                link: FRRO_URL,
                linkText: "Apply Online",
                color: "border-blue-200 bg-blue-50/50",
                btnColor: "bg-blue-600 hover:bg-blue-700",
              },
              {
                icon: Landmark,
                title: "Ministry of Home Affairs",
                desc: "For RAP applications for restricted border areas. Download the official RAP application form from the MHA portal.",
                link: MHA_URL,
                linkText: "MHA Portal",
                color: "border-primary/20 bg-primary/5",
                btnColor: "bg-primary hover:bg-primary/90",
              },
              {
                icon: Shield,
                title: "ITBP (Border Police)",
                desc: "Indo-Tibetan Border Police manages border area checkpoints. Contact for queries on Bumla and other high-altitude border points.",
                link: ITBP_URL,
                linkText: "ITBP Website",
                color: "border-amber-200 bg-amber-50/50",
                btnColor: "bg-amber-600 hover:bg-amber-700",
              },
            ].map((resource) => {
              const Icon = resource.icon
              return (
                <Card key={resource.title} className={cn("border-2 shadow-md hover:shadow-lg transition-shadow", resource.color)}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white p-2 rounded-xl shadow-sm">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-bold">{resource.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{resource.desc}</p>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      <Button className={cn("w-full font-semibold text-white", resource.btnColor)}>
                        {resource.linkText} <ExternalLink className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <div className="absolute top-4 right-4 opacity-10">
            <Star className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <Zap className="h-10 w-10 text-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-3">Ready to Explore Arunachal Pradesh?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Once you have your permit secured, let us help you plan the perfect itinerary through India's most beautiful and unexplored state.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/itinerary">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg">
                  Explore Itinerary Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold">
                  Read Travel Guides
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
