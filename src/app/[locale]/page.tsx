import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import DomeGallery from '@/components/gallery/dome-gallery';

const BALI_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    alt: 'Bali temple with traditional architecture'
  },
  {
    src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    alt: 'Iconic Bali rice terraces'
  },
  {
    src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
    alt: 'Stunning Bali beach sunset'
  },
  {
    src: 'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=800&q=80',
    alt: 'Traditional Balinese gate'
  },
  {
    src: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80',
    alt: 'Breathtaking Bali landscape'
  },
  {
    src: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80',
    alt: 'Crystal clear Bali ocean view'
  },
  {
    src: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&q=80',
    alt: 'Bali traditional house and culture'
  },
  {
    src: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    alt: 'Hidden Bali waterfall'
  },
  {
    src: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80',
    alt: 'Lush Bali jungle'
  },
  {
    src: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=800&q=80',
    alt: 'Tropical Bali palm trees'
  },
  {
    src: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800&q=80',
    alt: 'Bali coastal beauty'
  },
  {
    src: 'https://images.unsplash.com/photo-1558005530-a7958896e5c4?w=800&q=80',
    alt: 'Sacred Bali temple grounds'
  },
  {
    src: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    alt: 'Bali scenic viewpoint'
  },
  {
    src: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
    alt: 'Bali cultural heritage'
  },
  {
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    alt: 'Peaceful Bali nature'
  }
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
      <DomeGallery 
        images={BALI_IMAGES}
        overlayBlurColor="#0c0c0c"
        grayscale={false}
        fit={0.55}
        dragSensitivity={18}
        openedImageWidth="400px"
        openedImageHeight="550px"
      />
    </div>
  );
}

