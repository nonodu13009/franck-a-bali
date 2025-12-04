import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'VF Images - Photographie à Bali',
    template: '%s | VF Images',
  },
  description: 'Portfolio photographique de VF Images, basé à Bali. Découvrez mes séries, articles et tirages disponibles.',
  keywords: ['photographie', 'Bali', 'portfolio', 'art', 'tirages'],
  authors: [{ name: 'VF Images' }],
  creator: 'VF Images',
  icons: {
    icon: [
      { url: '/images/logoNoir.png', sizes: '2048x2048', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logoNoir.png', sizes: '2048x2048', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    siteName: 'VF Images',
    title: 'VF Images - Photographie à Bali',
    description: 'Portfolio photographique de VF Images, basé à Bali.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VF Images - Photographie à Bali',
    description: 'Portfolio photographique de VF Images, basé à Bali.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

