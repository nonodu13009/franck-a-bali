import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { BaliCarousel } from '@/components/gallery/bali-carousel';

const BALI_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90&auto=format&fit=crop',
    alt: 'Majestic Bali temple with traditional architecture',
    title: 'Sacred Temples'
  },
  {
    src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1920&q=90&auto=format&fit=crop',
    alt: 'Iconic Bali rice terraces at sunrise',
    title: 'Rice Terraces'
  },
  {
    src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920&q=90&auto=format&fit=crop',
    alt: 'Stunning Bali beach sunset with surfers',
    title: 'Golden Sunsets'
  },
  {
    src: 'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=1920&q=90&auto=format&fit=crop',
    alt: 'Traditional Balinese gate and architecture',
    title: 'Cultural Heritage'
  },
  {
    src: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1920&q=90&auto=format&fit=crop',
    alt: 'Crystal clear turquoise Bali ocean',
    title: 'Tropical Paradise'
  },
  {
    src: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1920&q=90&auto=format&fit=crop',
    alt: 'Hidden waterfall in Bali jungle',
    title: 'Hidden Waterfalls'
  },
  {
    src: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=1920&q=90&auto=format&fit=crop',
    alt: 'Lush green Bali jungle landscape',
    title: 'Jungle Adventures'
  },
  {
    src: 'https://images.unsplash.com/photo-1532186651327-6ac23687d189?w=1920&q=90&auto=format&fit=crop',
    alt: 'Sacred Bali temple grounds at sunset',
    title: 'Spiritual Journey'
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
  return <BaliCarousel images={BALI_IMAGES} autoPlayInterval={5000} />;
}

