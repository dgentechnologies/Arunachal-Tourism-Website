
"use client"

import Link from "next/link"
import { Globe, Share2, Camera } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="w-full bg-[#f6f3f2] rounded-t-[2rem] md:rounded-t-[3rem] mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        {/* Brand column */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="text-lg md:text-xl font-bold text-primary font-headline mb-4 md:mb-5">
            Arunachal Pradesh Tourism
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 md:mb-8 font-body">
            Guided by the wisdom of the elders and the song of the rivers. Explore the last great frontier of India.
          </p>
          <div className="flex gap-4">
            <Globe className="h-5 w-5 text-primary cursor-pointer hover:text-primary/80 transition-colors" />
            <Share2 className="h-5 w-5 text-primary cursor-pointer hover:text-primary/80 transition-colors" />
            <Camera className="h-5 w-5 text-primary cursor-pointer hover:text-primary/80 transition-colors" />
          </div>
        </div>

        {/* Explore */}
        <div>
          <h5 className="text-primary font-headline font-bold mb-4 md:mb-5 text-xs md:text-sm uppercase tracking-wider">{t.footerQuickLinks}</h5>
          <ul className="space-y-3 md:space-y-4">
            <li><Link href="/guides" className="text-muted-foreground text-sm hover:text-[#fccc38] underline decoration-2 underline-offset-4 transition-colors duration-300">{t.footerTravelGuides}</Link></li>
            <li><Link href="/essentials" className="text-muted-foreground text-sm hover:text-[#fccc38] underline decoration-2 underline-offset-4 transition-colors duration-300">E-Permit</Link></li>
            <li><Link href="/tribes" className="text-muted-foreground text-sm hover:text-[#fccc38] underline decoration-2 underline-offset-4 transition-colors duration-300">{t.tribes}</Link></li>
            <li><Link href="/entrepreneurs" className="text-muted-foreground text-sm hover:text-[#fccc38] underline decoration-2 underline-offset-4 transition-colors duration-300">{t.entrepreneurs}</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-primary font-headline font-bold mb-4 md:mb-5 text-xs md:text-sm uppercase tracking-wider">{t.footerSupport}</h5>
          <ul className="space-y-3 md:space-y-4">
            <li><Link href="/safety" className="text-muted-foreground text-sm hover:text-[#fccc38] underline decoration-2 underline-offset-4 transition-colors duration-300">{t.footerSafety}</Link></li>
            <li><Link href="/faq" className="text-muted-foreground text-sm hover:text-[#fccc38] underline decoration-2 underline-offset-4 transition-colors duration-300">{t.footerFaqs}</Link></li>
            <li><Link href="/contact" className="text-muted-foreground text-sm hover:text-[#fccc38] underline decoration-2 underline-offset-4 transition-colors duration-300">{t.footerContactUs}</Link></li>
            <li><Link href="/privacy" className="text-muted-foreground text-sm hover:text-[#fccc38] underline decoration-2 underline-offset-4 transition-colors duration-300">{t.footerPrivacyPolicy}</Link></li>
          </ul>
        </div>

        {/* The Office */}
        <div>
          <h5 className="text-primary font-headline font-bold mb-4 md:mb-5 text-xs md:text-sm uppercase tracking-wider">The Office</h5>
          <p className="text-muted-foreground text-sm leading-loose font-body">
            Directorate of Tourism,<br />
            Itanagar, Arunachal Pradesh<br />
            PIN - 791111
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-8 lg:px-12 py-5 md:py-6 border-t border-black/5 text-center">
        <p className="text-muted-foreground text-xs font-body">
          © 2026 Arunachal Pradesh Tourism Department. All rights reserved. Designed with respect for tribal heritage.
        </p>
      </div>
    </footer>
  )
}

