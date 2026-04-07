
"use client"

import ArunachalMap from "@/components/arunachal-map"

export default function GuidesPage() {
  return (
    /* -mt-16 pulls the map behind the fixed nav (h-16 = 64px) so it fills 100vh */
    <div className="-mt-16 h-screen overflow-hidden" style={{ background: "#D4E8E6" }}>
      <ArunachalMap />
    </div>
  )
}
