"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { permitPlanCompletenessCheck, PermitPlanOutput } from "@/ai/flows/permit-plan-completeness-check"
import { AlertCircle, CheckCircle2, Loader2, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"

// Increase timeout for Vercel Server Actions
export const maxDuration = 60;

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
    } catch (err: any) {
      console.error("AI Review Error:", err)
      
      const errorMessage = err.message || "";
      const isQuotaError = errorMessage.includes("429") || 
                          errorMessage.includes("RESOURCE_EXHAUSTED") || 
                          errorMessage.includes("quota") ||
                          err.status === 429 ||
                          err.code === 429;
      
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
        <h1 className="text-4xl font-bold text-primary font-headline">{t.permitPageTitle}</h1>
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
