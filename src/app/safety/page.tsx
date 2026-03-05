
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Phone, MapPin, ShieldAlert, HeartPulse, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

const services = {
  hospitals: [
    { name: "Tawang District Hospital", location: "Tawang Main Town", contact: "03794-222239", type: "Government" },
    { name: "TRIHMS Itanagar", location: "Naharlagun", contact: "0360-2350331", type: "Medical College" },
    { name: "Heema Hospital", location: "Itanagar", contact: "0360-2211444", type: "Private" },
    { name: "District Hospital Ziro", location: "Lower Subansiri", contact: "03788-224440", type: "Government" },
  ],
  police: [
    { name: "Tawang Police Station", location: "Near Monastery", contact: "100 / 03794-222236", active: true },
    { name: "Itanagar Police Station", location: "Main City Center", contact: "0360-2212351", active: true },
    { name: "Ziro Police Station", location: "Hapoli Town", contact: "03788-224422", active: true },
    { name: "Pasighat Police Station", location: "East Siang", contact: "0368-2222234", active: true },
  ],
  emergency: [
    { name: "Medical Emergency", contact: "108" },
    { name: "Police Emergency", contact: "100" },
    { name: "Disaster Management", contact: "1070" },
    { name: "Child Helpline", contact: "1098" },
    { name: "Women Helpline", contact: "1091" },
  ]
}

export default function SafetyPage() {
  const { t } = useLanguage()
  const [search, setSearch] = useState("")

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline">{t.safetyPageTitle}</h1>
        <p className="text-muted-foreground text-lg">{t.safetyPageSubtitle}</p>
        
        <div className="relative max-w-md mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t.searchPlaceholder} 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="hospitals" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="hospitals" className="flex gap-2">
                <HeartPulse className="h-4 w-4" /> {t.hospitalsTab}
              </TabsTrigger>
              <TabsTrigger value="police" className="flex gap-2">
                <ShieldAlert className="h-4 w-4" /> {t.policeTab}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hospitals" className="space-y-4">
              {services.hospitals
                .filter(h => h.location.toLowerCase().includes(search.toLowerCase()) || h.name.toLowerCase().includes(search.toLowerCase()))
                .map((h, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg">{h.name}</h3>
                        <Badge variant="secondary" className="text-[10px]">{h.type}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" /> {h.location}
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2 border-primary text-primary shrink-0 w-full sm:w-auto">
                      <Phone className="h-4 w-4" /> {h.contact}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="police" className="space-y-4">
              {services.police
                .filter(p => p.location.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase()))
                .map((p, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg">{p.name}</h3>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{t.active24x7}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" /> {p.location}
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2 border-primary text-primary shrink-0 w-full sm:w-auto">
                      <Phone className="h-4 w-4" /> {p.contact}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-red-50 border-red-100">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                {t.emergencyHotline}
              </CardTitle>
              <CardDescription className="text-red-600/80">{t.emergencySubtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {services.emergency.map((e, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-red-100">
                  <span className="font-medium text-sm">{e.name}</span>
                  <span className="text-xl font-bold text-red-600">{e.contact}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.safeTravelTips}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <div className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full h-fit"><Building2 className="h-4 w-4 text-primary" /></div>
                <p>{t.safeTip1}</p>
              </div>
              <div className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full h-fit"><ShieldAlert className="h-4 w-4 text-primary" /></div>
                <p>{t.safeTip2}</p>
              </div>
              <div className="flex gap-3">
                <div className="bg-primary/10 p-2 rounded-full h-fit"><HeartPulse className="h-4 w-4 text-primary" /></div>
                <p>{t.safeTip3}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
