import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hotels & Stays',
  description:
    'Find and book the best hotels, resorts, and eco-stays in Arunachal Pradesh. Properties in Tawang, Ziro, Itanagar, Pasighat, and Namdapha at affordable rates.',
  keywords: [
    'Arunachal Pradesh hotels',
    'Tawang resort',
    'Ziro Valley stay',
    'Itanagar hotel',
    'Arunachal accommodation',
    'eco-stay Northeast India',
  ],
  openGraph: {
    title: 'Hotels & Stays in Arunachal Pradesh | Arunachal Explore',
    description:
      'Book the best hotels and eco-stays in Tawang, Ziro, Itanagar, and more across Arunachal Pradesh.',
    url: '/hotels',
  },
  alternates: {
    canonical: '/hotels',
  },
};

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
