import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inner Line Permit (ILP)',
  description:
    'Apply for your Arunachal Pradesh Inner Line Permit (ILP) online. Required for all non-residents visiting Arunachal Pradesh. Fast AI-assisted application review.',
  keywords: [
    'Inner Line Permit Arunachal Pradesh',
    'ILP Arunachal Pradesh',
    'ILP online apply',
    'Arunachal Pradesh permit',
    'Protected Area Permit India',
    'travel permit Northeast India',
  ],
  openGraph: {
    title: 'Apply for Inner Line Permit (ILP) | Arunachal Explore',
    description:
      'Apply for your Arunachal Pradesh Inner Line Permit (ILP) online with AI-assisted review.',
    url: '/permit',
  },
  alternates: {
    canonical: '/permit',
  },
};

export default function PermitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
