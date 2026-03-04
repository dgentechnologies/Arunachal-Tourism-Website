"use client"

import Link from "next/link"
import {
  FileText, MapPin, Phone, Globe, ArrowRight, ExternalLink,
  ChevronDown, ChevronUp, Shield, AlertCircle, DollarSign,
  Building2, Users, CheckCircle2, Zap, Star, Info, Landmark, Flag
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { cn } from "@/lib/utils"

const FRRO_URL = "https://indianfrro.gov.in/eservices/home.jsp"
const MHA_URL = "https://www.mha.gov.in"

const OFFICES = [
  {
    id: 1,
    name: "Ministry of Home Affairs",
    subtitle: "Govt. of India",
    address: "North Block, Central Secretariat, New Delhi – 110001",
    phones: [],
    icon: Landmark,
    color: "border-blue-200 bg-blue-50/60",
    iconBg: "bg-blue-100 text-blue-700",
    badge: "Central Govt.",
    badgeColor: "bg-blue-100 text-blue-700",
    note: "Primary authority for PAP approvals. Applications accepted in person or through the official e-FRRO portal.",
    applyLink: MHA_URL,
  },
  {
    id: 2,
    name: "Resident Commissioner",
    subtitle: "Govt. of Arunachal Pradesh",
    address: "Kautilya Marg, Chanakyapuri, New Delhi",
    phones: ["011-23011391", "011-23013956", "011-26880901"],
    icon: Flag,
    color: "border-primary/20 bg-primary/5",
    iconBg: "bg-primary/10 text-primary",
    badge: "New Delhi",
    badgeColor: "bg-primary/10 text-primary",
    note: "The state government representative in New Delhi. Can process and forward PAP applications to the state authority.",
    applyLink: null,
  },
  {
    id: 3,
    name: "Secretary (Tourism)",
    subtitle: "Govt. of Arunachal Pradesh",
    address: "Tourism Department, Itanagar – 791111, Arunachal Pradesh",
    phones: ["0360-2212457"],
    icon: Globe,
    color: "border-green-200 bg-green-50/60",
    iconBg: "bg-green-100 text-green-700",
    badge: "Itanagar",
    badgeColor: "bg-green-100 text-green-700",
    note: "State Tourism Department in Itanagar. Best contact for tour operator–assisted PAP applications and tourism-related queries.",
    applyLink: null,
  },
  {
    id: 4,
    name: "Commissioner (Home)",
    subtitle: "Govt. of Arunachal Pradesh",
    address: "Home Department, Itanagar – 791111, Arunachal Pradesh",
    phones: ["0360-2212632"],
    icon: Shield,
    color: "border-amber-200 bg-amber-50/60",
    iconBg: "bg-amber-100 text-amber-700",
    badge: "Itanagar",
    badgeColor: "bg-amber-100 text-amber-700",
    note: "The state Home Department has final authority on PAP approvals within Arunachal Pradesh. For escalations and extended visits.",
    applyLink: null,
  },
]

const FAQS = [
  {
    question: "Can I apply for a PAP on arrival at the Arunachal Pradesh border?",
    answer: "No. PAP must be obtained before travel — it cannot be acquired on arrival at any border checkpoint. Apply via the FRRO online portal or in person at one of the four official offices listed above.",
  },
  {
    question: "Do I need a registered tour operator to apply?",
    answer: "Yes. Foreign tourists visiting Arunachal Pradesh must apply for the PAP through an approved local tour operator. The operator will submit the application on your behalf and coordinate with the relevant authorities.",
  },
  {
    question: "How much is the royalty fee and who pays it?",
    answer: "Foreign tourists pay USD 30 per head as royalty to the Government of Arunachal Pradesh. This is typically collected by your tour operator as part of the permit process.",
  },
  {
    question: "How long does PAP processing take?",
    answer: "Processing time is typically 7–30 business days. Applications submitted through approved tour operators or in person at the offices are usually processed faster. Apply at least 4–6 weeks before your travel date.",
  },
  {
    question: "Which nationalities are not eligible for a PAP?",
    answer: "Nationals of Pakistan, China, and Myanmar (via land border) require separate high-level government clearance and cannot apply through the standard PAP channel. All other nationalities can apply.",
  },
  {
    question: "Do I need to register with police on arrival?",
    answer: "Yes. Foreign nationals must report to the local police station within 24 hours of arriving in each district. Your tour operator or accommodation will assist with this process.",
  },
]

export default function ForeignPermitPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 max-w-6xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-5">
              <Badge className="bg-white/20 text-white border-none text-sm px-3 py-1">
                <Globe className="h-3.5 w-3.5 mr-1.5" />Foreign Nationals
              </Badge>
              <Badge className="bg-accent/80 text-accent-foreground border-none text-sm px-3 py-1">
                <Shield className="h-3.5 w-3.5 mr-1.5" />Official Information
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-5 leading-tight">
              Protected Area Permit
              <span className="block text-accent mt-1">for Foreign Nationals</span>
            </h1>
            <p className="text-white/85 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
              Arunachal Pradesh is a Protected Area under Indian law. All foreign nationals
              must obtain a <strong>Protected Area Permit (PAP)</strong> through an approved local
              tour operator before entering the state.
            </p>
            <a href={FRRO_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg">
                Apply via FRRO Online Portal <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/20 bg-black/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-5 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
              {[
                { icon: DollarSign, label: "Royalty Fee", value: "USD 30 / person" },
                { icon: Users,      label: "Application",  value: "Via tour operator" },
                { icon: Building2,  label: "Apply At",     value: "4 official offices" },
                { icon: FileText,   label: "Permit Type",  value: "PAP (Protected Area)" },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="bg-white/15 p-2 rounded-lg shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{s.value}</p>
                      <p className="text-white/70 text-xs">{s.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 max-w-6xl space-y-16">

        {/* Important notice */}
        <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
          <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Apply in Advance Through an Approved Tour Operator</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Foreign tourists visiting Arunachal Pradesh <strong>must apply through an approved local tour operator</strong>.
              The tour operator will submit your PAP application to the relevant authority on your behalf.
              A royalty fee of <strong>USD 30 per person</strong> is payable to the Government of Arunachal Pradesh.
              Nationals of <strong>Pakistan, China, and Myanmar (land border)</strong> require separate clearance.
            </p>
          </div>
        </div>

        {/* Key Requirements */}
        <section>
          <h2 className="text-3xl font-bold font-headline text-primary mb-3">Key Requirements</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">Everything you need to know before applying for your Protected Area Permit.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Approved Tour Operator",
                desc: "All PAP applications by foreign nationals must be submitted through a government-approved Indian tour operator. Individual applications are not accepted.",
                color: "bg-blue-50 border-blue-200",
                iconColor: "bg-blue-100 text-blue-700",
              },
              {
                icon: DollarSign,
                title: "USD 30 Royalty Fee",
                desc: "Foreign tourists pay USD 30 per head as royalty to the Government of Arunachal Pradesh. This is typically handled by your tour operator during the application process.",
                color: "bg-green-50 border-green-200",
                iconColor: "bg-green-100 text-green-700",
              },
              {
                icon: Shield,
                title: "Register on Arrival",
                desc: "Present your PAP and passport at the entry checkpoint. Register with the local police station within 24 hours of arriving in each district you visit.",
                color: "bg-primary/5 border-primary/20",
                iconColor: "bg-primary/10 text-primary",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className={cn("rounded-2xl border p-6", item.color)}>
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", item.iconColor)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Where to Apply — 4 offices */}
        <section>
          <h2 className="text-3xl font-bold font-headline text-primary mb-3">Where to Apply for PAP</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            PAP can be obtained physically from any of these four official government offices, or online via the FRRO portal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OFFICES.map((office) => {
              const Icon = office.icon
              return (
                <Card key={office.id} className={cn("border-2 shadow-md hover:shadow-lg transition-shadow overflow-hidden", office.color)}>
                  <CardContent className="p-6">
                    {/* Office header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={cn("shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm", office.iconBg)}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-bold text-base">{office.name}</span>
                          <Badge className={cn("text-xs border-none shrink-0", office.badgeColor)}>
                            {office.badge}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{office.subtitle}</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{office.address}</p>
                    </div>

                    {/* Phone numbers */}
                    {office.phones.length > 0 && (
                      <div className="flex items-start gap-2 mb-3">
                        <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {office.phones.map((ph) => (
                            <a
                              key={ph}
                              href={`tel:${ph.replace(/-/g, '')}`}
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              {ph}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator className="my-3" />

                    {/* Note */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{office.note}</p>

                    {/* Apply button only for MHA */}
                    {office.applyLink && (
                      <a href={office.applyLink} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="w-full font-semibold">
                          Apply Online <ExternalLink className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* FRRO online option */}
          <div className="mt-5 flex items-start gap-4 p-5 bg-secondary/30 border border-border/60 rounded-2xl">
            <div className="bg-primary/10 p-2.5 rounded-xl shrink-0">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-1">Apply Online via e-FRRO Portal</p>
              <p className="text-sm text-muted-foreground mb-3">
                The Foreigners Regional Registration Office (FRRO) online portal allows tour operators to submit
                PAP applications digitally — the fastest and most convenient channel.
              </p>
              <a href={FRRO_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="font-semibold border-primary text-primary hover:bg-primary/5">
                  Open FRRO Portal <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Photography & Compliance */}
        <section>
          <h2 className="text-3xl font-bold font-headline text-primary mb-3">Rules to Follow</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">Important rules all foreign visitors must observe while in Arunachal Pradesh.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Carry Permit at All Times", desc: "Your original PAP and passport must be carried at all times. Checkpoints are frequent, especially in border districts." },
              { title: "Photography Restrictions",   desc: "Photography near army camps, bridges, and military installations is strictly prohibited. Always check local signage." },
              { title: "Stay Within Permitted Areas", desc: "Only visit districts specified in your PAP. Border-area districts require an additional Restricted Area Permit (RAP)." },
              { title: "Respect Local Culture",       desc: "Always seek permission before entering tribal villages or photographing community members. Remove shoes at monasteries." },
              { title: "Police Registration",         desc: "Register with the local police station within 24 hours of arriving in each district. Your tour operator will assist." },
              { title: "No Individual Travel in RAP Zones", desc: "For restricted border areas (Tawang, Bumla, Mechuka), travel must be in a group with your registered tour operator." },
            ].map((rule) => (
              <div key={rule.title} className="flex gap-3 p-4 rounded-xl border border-border/60 bg-background hover:bg-secondary/10 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm mb-0.5">{rule.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold font-headline text-primary mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">Common questions from foreign nationals planning to visit Arunachal Pradesh.</p>
          <div className="space-y-3 max-w-3xl">
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

        {/* CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <div className="absolute top-4 right-4 opacity-10">
            <Star className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <Zap className="h-10 w-10 text-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-3">Ready to Explore Arunachal Pradesh?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Once your permit is secured, let us help you plan the perfect itinerary through India's most beautiful and unexplored state.
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
