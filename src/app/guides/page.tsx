
"use client"

import ArunachalMap from "@/components/arunachal-map"

export default function GuidesPage() {
  return (
    /*
     * fixed inset-0 z-[1]  → covers the full viewport including where the
     * site footer lives; the nav (z-50) floats above it. No scrolling needed.
     */
    <div className="fixed inset-0 z-[1]">
      <ArunachalMap />
    </div>
  )
}
