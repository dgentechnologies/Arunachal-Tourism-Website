import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety & Emergency',
  description:
    'Emergency contacts, hospitals, police stations, and safety tips for travellers in Arunachal Pradesh. Includes 24×7 helpline numbers and district-wise contacts.',
  keywords: [
    'Arunachal Pradesh emergency contacts',
    'Tawang hospital',
    'Arunachal police',
    'safety tips Arunachal',
    'TRIHMS Itanagar',
    'travel safety Northeast India',
  ],
  openGraph: {
    title: 'Safety & Emergency Contacts | Arunachal Explore',
    description:
      'Emergency contacts, hospitals, and police stations for travellers in Arunachal Pradesh.',
    url: '/safety',
  },
  alternates: {
    canonical: '/safety',
  },
};

export default function SafetyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
