
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { generatePersonalizedItinerary, PersonalizedItineraryGeneratorOutput } from "@/ai/flows/personalized-itinerary-generator-flow"
import { Loader2, Sparkles, Calendar, MapPin, ListChecks } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const itinerarySchema = z.object({
  interests: z.string().min(3, "Please describe your interests"),
  durationDays: z.coerce.number().int().positive().max(30),
  preferredActivities: z.string().min(3, "List some activities"),
})

export default function ItineraryPage() {
  const [result, setResult] = useState<PersonalizedItineraryGeneratorOutput | null>(null)
  const [loading, setLoading] = useState(false)

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
    try {
      const res = await generatePersonalizedItinerary({
        interests: values.interests,
        durationDays: values.durationDays,
        preferredActivities: values.preferredActivities.split(',').map(a => a.trim())
      })
      setResult(res)
    } catch (error) {
      console.error(error)
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
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-none shadow-xl overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="font-headline flex items-center gap-2">
                    <ListChecks className="h-5 w-5" />
                    Personalized Itinerary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose prose-green max-w-none whitespace-pre-wrap leading-relaxed text-foreground">
                    {result.itinerary}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary font-headline flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Best Trip Suggestions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.bestTripSuggestions.map((suggestion, idx) => (
                    <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-shadow bg-accent/5">
                      <CardContent className="p-5">
                        <div className="flex gap-4">
                          <div className="bg-accent h-8 w-8 rounded-full flex items-center justify-center font-bold text-accent-foreground shrink-0">
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
