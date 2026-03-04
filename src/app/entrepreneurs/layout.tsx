import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrepreneurs of Arunachal Pradesh',
  description:
    'Meet the innovators and changemakers of Arunachal Pradesh building businesses, preserving heritage, and inspiring the next generation.',
  keywords: [
    'Arunachal Pradesh entrepreneurs',
    'Northeast India startups',
    'indigenous entrepreneurs',
    'Arunachal business',
    'ecotourism entrepreneurs',
  ],
  openGraph: {
    title: 'Entrepreneurs | Arunachal Explore',
    description:
      'Meet the changemakers building businesses and inspiring the next generation in Arunachal Pradesh.',
    url: '/entrepreneurs',
  },
  alternates: {
    canonical: '/entrepreneurs',
  },
};

export default function EntrepreneursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
