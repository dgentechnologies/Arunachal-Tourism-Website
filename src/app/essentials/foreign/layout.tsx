import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protected Area Permit (PAP) for Foreign Nationals | Arunachal Explore',
  description:
    'Complete guide to the Protected Area Permit (PAP) required for foreign nationals visiting Arunachal Pradesh. Documents, fees, process, and restricted areas explained.',
  keywords: [
    'Protected Area Permit Arunachal Pradesh',
    'PAP Arunachal Pradesh',
    'Restricted Area Permit India',
    'foreign tourist permit Arunachal',
    'travel permit Northeast India foreigners',
  ],
  openGraph: {
    title: 'Protected Area Permit for Foreign Nationals | Arunachal Explore',
    description:
      'Everything foreign tourists need to know about the Protected Area Permit (PAP) for visiting Arunachal Pradesh.',
    url: '/essentials/foreign',
  },
  alternates: {
    canonical: '/essentials/foreign',
  },
};

export default function ForeignPermitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
