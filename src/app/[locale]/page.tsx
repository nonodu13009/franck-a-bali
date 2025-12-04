import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import DomeGallery from '@/components/gallery/dome-gallery';

const BALI_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop',
    alt: 'Bali temple with traditional architecture'
  },
  {
    src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80&auto=format&fit=crop',
    alt: 'Iconic Bali rice terraces'
  },
  {
    src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80&auto=format&fit=crop',
    alt: 'Stunning Bali beach sunset'
  },
  {
    src: 'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=800&q=80&auto=format&fit=crop',
    alt: 'Traditional Balinese gate'
  },
  {
    src: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80&auto=format&fit=crop',
    alt: 'Breathtaking Bali landscape'
  },
  {
    src: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80&auto=format&fit=crop',
    alt: 'Crystal clear Bali ocean view'
  },
  {
    src: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&q=80&auto=format&fit=crop',
    alt: 'Bali traditional house and culture'
  },
  {
    src: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80&auto=format&fit=crop',
    alt: 'Hidden Bali waterfall'
  },
  {
    src: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80&auto=format&fit=crop',
    alt: 'Lush Bali jungle'
  },
  {
    src: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=800&q=80&auto=format&fit=crop',
    alt: 'Tropical Bali palm trees'
  },
  {
    src: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800&q=80&auto=format&fit=crop',
    alt: 'Bali coastal beauty'
  },
  {
    src: 'https://images.unsplash.com/photo-1532186651327-6ac23687d189?w=800&q=80&auto=format&fit=crop',
    alt: 'Sacred Bali temple grounds'
  },
  {
    src: 'https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&q=80&auto=format&fit=crop',
    alt: 'Bali scenic viewpoint'
  },
  {
    src: 'https://images.unsplash.com/photo-1598608291003-e37b84c18e8b?w=800&q=80&auto=format&fit=crop',
    alt: 'Bali cultural heritage'
  },
  {
    src: 'https://images.unsplash.com/photo-1580707173708-54b8c6ec98de?w=800&q=80&auto=format&fit=crop',
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

export default async function HomePage() {
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

