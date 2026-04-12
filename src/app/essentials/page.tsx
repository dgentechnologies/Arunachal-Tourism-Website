"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ScanSearch, Flag, Plane, ShieldAlert, CheckCircle2, Clock, FileCheck, AlertCircle, ExternalLink } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion } from "framer-motion"

const PERMIT_URL_INDIAN = "https://www.eilp.arunachal.gov.in/preTuristEIlpKYC"

const editorialCards = [
  {
    category: "01",
    badge: "AI-Powered",
    badgeColor: "bg-violet-500",
    name: "Smart ILP Check",
    headline: "AI Permit\nReadiness Check",
    tagline: "Know before you go. Our AI reviews your travel plan for permit compliance — before you reach the checkpoint.",
    desc: "Fill in your travel details, dates, and destinations. Our AI scans your plan against current ILP regulations, flags compliance gaps, and gives you a checklist to fix — all in seconds.",
    image: "https://picsum.photos/seed/arunachal-permit-document-check/1200/800",
    imageHint: "documents passport permit checklist review",
    href: "/essentials/check",
    external: false,
    stat1: { label: "Response", value: "Instant" },
    stat2: { label: "Accuracy", value: "AI-Verified" },
    flip: false,
    cornerClass: "rounded-tr-[5rem]",
  },
  {
    category: "02",
    badge: "Indian Citizens",
    badgeColor: "bg-orange-500",
    name: "e-ILP Portal",
    headline: "Inner Line\nPermit (ILP)",
    tagline: "All non-resident Indian citizens must carry a valid ILP to enter Arunachal Pradesh — no exceptions.",
    desc: "Apply through the official Arunachal Pradesh e-ILP portal. Receive your permit digitally. Carry a printed copy or the PDF on your device — both are accepted at every checkpoint across the state.",
    image: "https://picsum.photos/seed/arunachal-border-checkpoint-gate/1200/800",
    imageHint: "india border checkpoint gate permit entry",
    href: PERMIT_URL_INDIAN,
    external: true,
    stat1: { label: "Processing", value: "24–48 hrs" },
    stat2: { label: "Validity", value: "Up to 30 days" },
    flip: true,
    cornerClass: "rounded-bl-[5rem]",
  },
]

const bentoCards = [
  {
    category: "03",
    badge: "Foreign Nationals",
    name: "Protected Area Permit",
    headline: "PAP for\nForeign Visitors",
    desc: "Foreign nationals require a Protected Area Permit (PAP) from the Ministry of Home Affairs. Learn about required documents, issuing offices, and what to expect at the border.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&h=1100&fit=crop&auto=format&q=80",
    imageHint: "foreign passport travel india visa permit documents",
    href: "/essentials/foreign",
    external: false,
  },
  {
    category: "04",
    badge: "Emergency",
    name: "Safety & SOS",
    headline: "Safety\nGuidelines",
    desc: "Emergency contacts, mountain rescue protocols, satellite communication zones, and offline-ready safety resources for remote Arunachal.",
    image: "https://images.unsplash.com/photo-1604537372136-89b3dae196e3?w=900&h=1100&fit=crop&auto=format&q=80",
    imageHint: "mountain safety rescue emergency himalayas",
    href: "/safety",
    external: false,
  },
]

const infoPoints = [
  {
    icon: CheckCircle2,
    title: "Who Needs an ILP?",
    desc: "All non-resident Indian citizens visiting Arunachal Pradesh — including those from other Indian states — must carry a valid ILP.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Clock,
    title: "Apply in Advance",
    desc: "ILP processing takes 24–48 hours. Apply at least 3 days before travel, especially during peak season (Oct–Mar).",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileCheck,
    title: "Carry a Physical Copy",
    desc: "Digital permits are accepted at most checkpoints, but carry a printed backup — some remote posts have no connectivity.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: AlertCircle,
    title: "Checkpoint Etiquette",
    desc: "Present your permit at every ILP checkpoint. Penalties for entry without a valid permit are significant.",
    color: "from-rose-500 to-pink-500",
  },
]

export default function PermitHubPage() {
  return (
    <main id="main-content" className="bg-background">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 tribal-pattern opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                <ShieldAlert className="h-4 w-4" />
                Arrival Formalities · 4 Essentials
              </div>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-foreground mb-6">
                Your Gateway<br />
                <span className="text-primary">to Arunachal</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Permits aren&apos;t paperwork — they are the state&apos;s way of protecting its borders, ecosystems, and communities. Understand what you need before you arrive.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Editorial sections ──────────────────────────────── */}
      <section className="py-8">
        <div className="container mx-auto px-4 space-y-6">
          {editorialCards.map((card, i) => (
            <ScrollReveal key={card.category} variant={card.flip ? "right" : "left"}>
              <motion.div
                className={`organic-card ghost-border overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[460px] ${card.cornerClass}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Image side */}
                <div className={`relative min-h-[280px] lg:min-h-0 ${card.flip ? "lg:order-2" : ""}`}>
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover"
                    data-ai-hint={card.imageHint}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 font-headline text-6xl font-bold text-white/20 select-none">
                    {card.category}
                  </div>
                </div>

                {/* Content side */}
                <div className={`flex flex-col justify-center p-8 lg:p-12 bg-surface ${card.flip ? "lg:order-1" : ""}`}>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">{card.name}</p>
                  <h2 className="font-headline text-4xl lg:text-5xl font-bold leading-[0.95] text-foreground mb-4 whitespace-pre-line">
                    {card.headline}
                  </h2>
                  <p className="text-base font-medium text-primary mb-4 italic leading-relaxed">&ldquo;{card.tagline}&rdquo;</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">{card.desc}</p>

                  <div className="flex items-center gap-6 mb-8">
                    <div>
                      <p className="text-2xl font-bold font-headline text-foreground">{card.stat1.value}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{card.stat1.label}</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <p className="text-2xl font-bold font-headline text-foreground">{card.stat2.value}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{card.stat2.label}</p>
                    </div>
                  </div>

                  {card.external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-primary/90 hover:shadow-float transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Apply on e-ILP Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-primary/90 hover:shadow-float transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Run AI Check <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Bento grid ──────────────────────────────────────── */}
      <section className="py-8 bg-surface-low">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">More Essentials</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-8">
              Foreign Visitors &amp; Safety
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bentoCards.map((card, i) => (
              <ScrollReveal key={card.category} variant={i % 2 === 0 ? "left" : "right"}>
                <motion.div
                  className="organic-card ghost-border overflow-hidden group cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={card.imageHint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-secondary/90 px-3 py-1 text-xs font-bold text-primary">
                        {card.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 font-headline text-5xl font-bold text-white/20 select-none">
                      {card.category}
                    </div>
                  </div>
                  <div className="p-6 bg-surface">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-1">{card.name}</p>
                    <h3 className="font-headline text-2xl font-bold leading-tight text-foreground mb-3 whitespace-pre-line">
                      {card.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{card.desc}</p>
                    {card.external ? (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                      >
                        Learn more <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Info points ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
                Before You Travel
              </h2>
              <p className="text-muted-foreground text-lg">
                Four things every visitor to Arunachal Pradesh must know about permits.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoPoints.map((point, i) => {
              const Icon = point.icon
              return (
                <ScrollReveal key={point.title} variant="up" delay={i * 100}>
                  <div className="organic-card ghost-border p-6 bg-surface h-full">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${point.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-foreground mb-2">{point.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA banner ──────────────────────────────────────── */}
      <section className="py-16 cta-gradient">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure What You Need?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Run the AI permit readiness check — it takes 2 minutes and tells you exactly what to prepare.
            </p>
            <Link
              href="/essentials/check"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-primary shadow-float hover:shadow-glow hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <ScanSearch className="h-5 w-5" />
              Start AI Permit Check
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </main>
  )
}


const permitFormSchema = z.object({
  applicantName: z.string().min(2, "Name is required"),
  contactEmail: z.string().email("Invalid email"),
  contactPhone: z.string().min(10, "Invalid phone number"),
  travelStartDate: z.string().min(1, "Start date is required"),
  travelEndDate: z.string().min(1, "End date is required"),
  destinations: z.string().min(1, "At least one destination is required"),
  emergencyContactName: z.string().min(1, "Emergency contact name required"),
  emergencyContactPhone: z.string().min(1, "Emergency contact phone required"),
  idProofType: z.enum(['Passport', 'Aadhar Card', 'Voter ID', 'Driving License', 'Other']),
  idProofNumber: z.string().min(1, "ID number required"),
  acknowledgesRegulations: z.boolean().refine(val => val === true, "You must acknowledge regulations"),
  groupSize: z.coerce.number().int().min(1),
  tourPurpose: z.string().optional(),
})

export default function PermitPage() {
  const { t } = useLanguage()
  const [reviewResult, setReviewResult] = useState<PermitPlanOutput | null>(null)
  const [isReviewing, setIsReviewing] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof permitFormSchema>>({
    resolver: zodResolver(permitFormSchema),
    defaultValues: {
      applicantName: "",
      contactEmail: "",
      contactPhone: "",
      travelStartDate: "",
      travelEndDate: "",
      destinations: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      idProofType: "Aadhar Card",
      idProofNumber: "",
      acknowledgesRegulations: false,
      groupSize: 1,
      tourPurpose: "",
    }
  })

  const runReview = async () => {
    const isValid = await form.trigger()
    if (!isValid) return

    const values = form.getValues()
    setIsReviewing(true)
    setReviewResult(null)
    try {
      const res = await permitPlanCompletenessCheck({
        ...values,
        destinations: values.destinations.split(',').map(d => d.trim()),
      })
      
      if (!res) {
        throw new Error("The AI review tool returned an empty response. Please try again.")
      }
      
      setReviewResult(res)
      toast({
        title: "AI Review Complete",
        description: res.isComplete ? "Your plan looks great!" : "Please review the missing items.",
      })
    } catch (err: unknown) {
      console.error("AI Review Error:", err)
      
      const errorMessage = (err as { message?: string })?.message || "";
      const isQuotaError = errorMessage.includes("429") || 
                          errorMessage.includes("RESOURCE_EXHAUSTED") || 
                          errorMessage.includes("quota") ||
                          (err as { status?: number })?.status === 429 ||
                          (err as { code?: number })?.code === 429;
      
      toast({
        variant: "destructive",
        title: isQuotaError ? "API Quota Exceeded" : "Review Failed",
        description: isQuotaError 
          ? "You have reached your current API quota limit (429 Too Many Requests). Please wait a moment before trying again." 
          : "Failed to process the AI review. Please check your inputs and try again.",
      })
    } finally {
      setIsReviewing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline">{t.permitPageTitle}</h1>
        <p className="text-muted-foreground text-lg">
          {t.permitPageSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">{t.applicationForm}</CardTitle>
              <CardDescription>{t.allFieldsMandatory}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="applicantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.fullNameLabel}</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.emailLabel}</FormLabel>
                          <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="travelStartDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.travelStartLabel}</FormLabel>
                          <FormControl><Input type="date" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="travelEndDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.travelEndLabel}</FormLabel>
                          <FormControl><Input type="date" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="destinations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.destinationsLabel}</FormLabel>
                        <FormControl><Input placeholder="Tawang, Ziro, Pasighat (Comma separated)" {...field} /></FormControl>
                        <FormDescription>{t.destinationsHint}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="idProofType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.idTypeLabel}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select ID Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
                              <SelectItem value="Passport">Passport</SelectItem>
                              <SelectItem value="Voter ID">Voter ID</SelectItem>
                              <SelectItem value="Driving License">Driving License</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idProofNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.idNumberLabel}</FormLabel>
                          <FormControl><Input placeholder="XXXX-XXXX-XXXX" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="acknowledgesRegulations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            {t.acknowledgeLabel}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={runReview}
                      disabled={isReviewing}
                      className="flex-1 font-semibold border-primary text-primary hover:bg-secondary/20"
                    >
                      {isReviewing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Info className="mr-2 h-4 w-4" />}
                      {t.aiPreCheck}
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 font-semibold"
                      disabled={isReviewing}
                    >
                      {t.submitApplication}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  {t.aiReviewTool}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!reviewResult && !isReviewing && (
                  <p className="text-sm text-muted-foreground">
                    {t.aiReviewFill}
                  </p>
                )}
                
                {isReviewing && (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium">{t.reviewingPlan}</p>
                    <p className="text-xs text-muted-foreground animate-pulse">{t.analyzingAI}</p>
                  </div>
                )}

                {reviewResult && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      {reviewResult.isComplete ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-semibold text-sm">
                        {reviewResult.isComplete ? t.planComplete : t.actionRequired}
                      </span>
                    </div>

                    {reviewResult.missingInformation.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase text-muted-foreground">{t.missingInfo}</p>
                        <ul className="text-sm space-y-1 list-disc pl-4">
                          {reviewResult.missingInformation.map((info, i) => <li key={i}>{info}</li>)}
                        </ul>
                      </div>
                    )}

                    {reviewResult.potentialComplianceIssues.length > 0 && (
                      <Alert variant="destructive" className="py-2">
                        <AlertTitle className="text-xs font-bold">{t.issuesFound}</AlertTitle>
                        <AlertDescription className="text-xs">
                          {reviewResult.potentialComplianceIssues[0]}
                        </AlertDescription>
                      </Alert>
                    )}

                    {reviewResult.suggestionsForImprovement.length > 0 && (
                      <div className="space-y-1 pt-2">
                        <p className="text-xs font-bold uppercase text-muted-foreground">{t.suggestions}</p>
                        <ul className="text-sm space-y-1 list-disc pl-4 italic">
                          {reviewResult.suggestionsForImprovement.map((sug, i) => <li key={i}>{sug}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
