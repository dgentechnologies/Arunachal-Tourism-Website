"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generatePersonalizedItinerary, PersonalizedItineraryGeneratorOutput } from "@/ai/flows/personalized-itinerary-generator-flow"
import { Loader2, Sparkles, Calendar, MapPin, Utensils, BedDouble, CheckCircle2, Star, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Increase timeout for Vercel Server Actions
export const maxDuration = 60;

const itinerarySchema = z.object({
  interests: z.string().min(3, "Please describe your interests"),
  durationDays: z.coerce.number().int().positive().max(30),
  preferredActivities: z.string().min(3, "List some activities"),
})

export default function ItineraryPage() {
  const [result, setResult] = useState<PersonalizedItineraryGeneratorOutput | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof itinerarySchema>>({
    resolver: zodResolver(itinerarySchema),
    defaultValues: {
      interests: "Nature, Buddhism, Photography",
      durationDays: 5,
      preferredActivities: "Trekking, Visiting monasteries, Local food",
    }
  })

  async function onSubmit(values: z.infer<typeof itinerarySchema>) {
    setLoading(true)
    setResult(null)
    try {
      const res = await generatePersonalizedItinerary({
        interests: values.interests,
        durationDays: values.durationDays,
        preferredActivities: values.preferredActivities.split(',').map(a => a.trim())
      })
      
      if (!res) {
        throw new Error("The AI was unable to generate a response. Please try again.")
      }
      
      setResult(res)
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized Himalayan adventure is ready.",
      })
    } catch (error: any) {
      console.error("AI Generation Error:", error)
      // Check for 429 Resource Exhausted / Too Many Requests
      const isQuotaError = error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes("quota");
      
      toast({
        variant: "destructive",
        title: isQuotaError ? "API Quota Exceeded" : "Generation Failed",
        description: isQuotaError 
          ? "Your Gemini API quota has been reached. If you are on the free tier, please wait a minute or check your Google AI Studio account for usage limits." 
          : (error.message || "Failed to connect to the AI service. Please try again later."),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-primary font-headline flex items-center justify-center gap-3">
          <Sparkles className="text-accent h-8 w-8" />
          AI Itinerary Planner
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Craft your dream adventure in Arunachal Pradesh. Our AI suggests the best trips and daily plans tailored specifically for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Your Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What interests you?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Wildlife, Tribal Culture..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="durationDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (Days)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredActivities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activities (Comma separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="Trekking, Cooking classes..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full font-bold h-12" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                    Generate Itinerary
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          {!result && !loading && (
            <div className="h-full min-h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-secondary/10">
              <Calendar className="h-12 w-12 mb-4 opacity-20" />
              <h3 className="text-xl font-headline font-semibold mb-2">Ready to plan?</h3>
              <p>Enter your details on the left and our AI will build a custom trip for you.</p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium animate-pulse">Mapping out your Himalayan adventure...</p>
              <p className="text-sm text-muted-foreground">This may take up to a minute</p>
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary font-headline flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Your Day-by-Day Journey
                </h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />
                  <div className="space-y-6">
                    {result.itineraryDays.map((day) => (
                      <div key={day.dayNumber} className="relative md:pl-16">
                        <div className="absolute left-0 top-6 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-md z-10">
                          Day {day.dayNumber}
                        </div>
                        <Card className="border border-border/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                          <div className="bg-gradient-to-r from-primary/90 to-primary px-6 py-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <Badge className="mb-2 bg-accent text-accent-foreground md:hidden">Day {day.dayNumber}</Badge>
                                <h4 className="text-lg font-bold text-primary-foreground font-headline leading-snug">{day.title}</h4>
                                <div className="flex items-center gap-1.5 mt-1 text-primary-foreground/80 text-sm">
                                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                                  <span>{day.location}</span>
                                </div>
                              </div>
                              <div className="shrink-0 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-primary-foreground font-bold text-xs text-center leading-tight p-1">
                                Day<br/>{day.dayNumber}
                              </div>
                            </div>
                          </div>

                          <CardContent className="p-5 space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">{day.description}</p>
                            <Separator />
                            <div>
                              <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Activities</h5>
                              <ul className="space-y-1.5">
                                {day.activities.map((activity, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="bg-secondary/40 rounded-lg p-3 space-y-1">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                                  <Utensils className="h-3.5 w-3.5" />
                                  Meals
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{day.meals}</p>
                              </div>
                              <div className="bg-secondary/40 rounded-lg p-3 space-y-1">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                                  <BedDouble className="h-3.5 w-3.5" />
                                  Stay
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{day.accommodation}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary font-headline flex items-center gap-2">
                  <Star className="h-6 w-6 text-accent fill-accent" />
                  Best Trip Suggestions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.bestTripSuggestions.map((suggestion, idx) => (
                    <Card key={idx} className="border border-border/60 shadow-md hover:shadow-lg transition-shadow bg-accent/5">
                      <CardContent className="p-5">
                        <div className="flex gap-4">
                          <div className="bg-primary h-9 w-9 rounded-full flex items-center justify-center font-bold text-primary-foreground shrink-0 text-sm">
                            {idx + 1}
                          </div>
                          <p className="text-sm font-medium leading-relaxed">{suggestion}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
