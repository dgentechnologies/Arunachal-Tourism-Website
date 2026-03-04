import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Tribes of Arunachal Pradesh',
  description:
    'Discover the 26+ indigenous tribes of Arunachal Pradesh — their vibrant festivals, ancient traditions, crafts, and way of life.',
  keywords: [
    'Arunachal Pradesh tribes',
    'Adi tribe',
    'Apatani tribe',
    'Nyishi tribe',
    'Monpa tribe',
    'Wancho tribe',
    'indigenous tribes Northeast India',
  ],
  openGraph: {
    title: 'Local Tribes | Arunachal Explore',
    description:
      'Explore the rich cultural diversity of 26+ indigenous tribes of Arunachal Pradesh.',
    url: '/tribes',
  },
  alternates: {
    canonical: '/tribes',
  },
};

export default function TribesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
