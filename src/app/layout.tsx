import type {Metadata} from 'next';
import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/providers';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arunachal-test1.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Arunachal Explore',
    default: 'Arunachal Explore | Land of the Rising Sun',
  },
  description:
    'Official tourism portal for Arunachal Pradesh — Land of the Rising Sun. Discover Tawang Monastery, Ziro Valley, Namdapha National Park. Book hotels, arrange transport, and apply for your Inner Line Permit online.',
  keywords: [
    'Arunachal Pradesh tourism',
    'Arunachal Pradesh travel',
    'Tawang Monastery',
    'Ziro Valley',
    'Namdapha National Park',
    'Inner Line Permit',
    'ILP Arunachal Pradesh',
    'North East India tourism',
    'Itanagar',
    'Pasighat',
    'Arunachal hotels',
    'Arunachal transport',
    'Land of the Rising Sun',
    'Northeast India adventure',
    'Buddhist monastery India',
    'tribal culture Arunachal',
  ],
  authors: [{ name: 'Arunachal Explore', url: BASE_URL }],
  creator: 'Arunachal Explore',
  publisher: 'Arunachal Explore',
  category: 'travel',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Arunachal Explore',
    title: 'Arunachal Explore | Land of the Rising Sun',
    description:
      'Official tourism portal for Arunachal Pradesh. Discover Tawang, Ziro Valley, Namdapha. Book hotels, arrange transport, and apply for Inner Line Permits online.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Arunachal Pradesh — Land of the Rising Sun',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arunachal Explore | Land of the Rising Sun',
    description:
      'Official tourism portal for Arunachal Pradesh. Discover Tawang, Ziro Valley, Namdapha.',
    images: ['/images/og-image.svg'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    'geo.region': 'IN-AR',
    'geo.placename': 'Arunachal Pradesh, India',
    'geo.position': '28.2180;94.7278',
    ICBM: '28.2180, 94.7278',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristDestination',
  name: 'Arunachal Pradesh',
  description:
    'Arunachal Pradesh, the Land of the Rising Sun, is a state in Northeast India known for its pristine landscapes, Buddhist monasteries, tribal cultures, and biodiversity.',
  url: BASE_URL,
  touristType: ['Adventure', 'Cultural', 'Nature', 'Wildlife'],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.218,
    longitude: 94.7278,
  },
  containedInPlace: {
    '@type': 'Country',
    name: 'India',
  },
  hasMap: `${BASE_URL}/guides`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <Providers>
          <Nav />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
