import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transport',
  description:
    'Transport options in Arunachal Pradesh — flights to Itanagar, helicopter services, shared taxis, buses, and car rentals to reach Tawang, Ziro, Pasighat, and beyond.',
  keywords: [
    'Arunachal Pradesh transport',
    'Tawang taxi',
    'Itanagar flights',
    'Arunachal helicopter',
    'how to reach Tawang',
    'Northeast India travel options',
  ],
  openGraph: {
    title: 'Transport in Arunachal Pradesh | Arunachal Explore',
    description:
      'All transport options in Arunachal Pradesh — flights, helicopters, taxis, and buses to Tawang, Ziro, Pasighat, and beyond.',
    url: '/transport',
  },
  alternates: {
    canonical: '/transport',
  },
};

export default function TransportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
