import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Your Itinerary',
  description:
    'Plan your perfect Arunachal Pradesh trip itinerary. AI-powered suggestions for multi-day routes covering Tawang, Ziro Valley, Namdapha, and other iconic destinations.',
  keywords: [
    'Arunachal Pradesh itinerary',
    'Tawang itinerary',
    'Arunachal trip plan',
    '7 days Arunachal Pradesh',
    'Northeast India trip planner',
    'Ziro Valley itinerary',
  ],
  openGraph: {
    title: 'Plan Your Arunachal Pradesh Itinerary | Arunachal Explore',
    description:
      'AI-powered trip planner for Arunachal Pradesh. Create custom itineraries covering Tawang, Ziro, Namdapha, and more.',
    url: '/itinerary',
  },
  alternates: {
    canonical: '/itinerary',
  },
};

export default function ItineraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
