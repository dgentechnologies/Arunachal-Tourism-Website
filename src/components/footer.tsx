
import Link from "next/link"
import { Mountain, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
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
              Discover the Land of the Rising Sun. Experience the unparalleled natural beauty and rich cultural heritage of Arunachal Pradesh.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground font-headline">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/guides" className="hover:text-primary">Travel Guides</Link></li>
              <li><Link href="/hotels" className="hover:text-primary">Hotel Booking</Link></li>
              <li><Link href="/transport" className="hover:text-primary">Transport Services</Link></li>
              <li><Link href="/permit" className="hover:text-primary">Apply for Permit</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground font-headline">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/safety" className="hover:text-primary">Safety & Security</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground font-headline">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Arunachal Pradesh Tourism Department. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
