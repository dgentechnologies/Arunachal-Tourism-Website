import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Guides',
  description:
    'Comprehensive travel guides for Arunachal Pradesh destinations — Tawang Monastery, Ziro Valley, Namdapha National Park, and more. Best time to visit, tips, and local insights.',
  keywords: [
    'Arunachal Pradesh travel guide',
    'Tawang guide',
    'Ziro Valley guide',
    'Namdapha guide',
    'Northeast India itinerary',
  ],
  openGraph: {
    title: 'Travel Guides | Arunachal Explore',
    description:
      'Comprehensive travel guides for Arunachal Pradesh — Tawang, Ziro Valley, Namdapha, and more.',
    url: '/guides',
  },
  alternates: {
    canonical: '/guides',
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
