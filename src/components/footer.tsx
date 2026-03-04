
"use client"

import Link from "next/link"
import { Mountain, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="w-full border-t bg-secondary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary font-headline">Arunachal Explore</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.footerTagline}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground font-headline">{t.footerQuickLinks}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/guides" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.footerTravelGuides}</Link></li>
              <li><Link href="/hotels" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.footerHotelBooking}</Link></li>
              <li><Link href="/transport" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.footerTransportServices}</Link></li>
              <li><Link href="/permit" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.footerApplyPermit}</Link></li>
              <li><Link href="/tribes" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.tribes}</Link></li>
              <li><Link href="/entrepreneurs" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.entrepreneurs}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground font-headline">{t.footerSupport}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/safety" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.footerSafety}</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.footerFaqs}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.footerContactUs}</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">{t.footerPrivacyPolicy}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground font-headline">{t.footerConnect}</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-125 hover:-translate-y-0.5"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-125 hover:-translate-y-0.5"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-125 hover:-translate-y-0.5"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-125 hover:-translate-y-0.5"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-xs text-muted-foreground">
          {t.footerCopyright}
        </div>
      </div>
    </footer>
  )
}
