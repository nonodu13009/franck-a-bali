import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { MasonryGallery } from '@/components/home/masonry-gallery';
import { getHomepageData } from '@/lib/firebase/admin-firestore';

// Images par défaut si aucune donnée dans Firestore
const DEFAULT_HERO_IMAGE = {
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90&auto=format&fit=crop',
    alt: 'Majestic Bali temple with traditional architecture',
};

const DEFAULT_MASONRY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85&auto=format&fit=crop',
    alt: 'Iconic Bali rice terraces at sunrise',
    orientation: 'landscape' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&q=85&auto=format&fit=crop',
    alt: 'Stunning Bali beach sunset',
    orientation: 'portrait' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=900&q=85&auto=format&fit=crop',
    alt: 'Traditional Balinese gate',
    orientation: 'portrait' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1600&q=85&auto=format&fit=crop',
    alt: 'Crystal clear turquoise Bali ocean',
    orientation: 'wide' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=85&auto=format&fit=crop',
    alt: 'Hidden waterfall in Bali jungle',
    orientation: 'landscape' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=900&q=85&auto=format&fit=crop',
    alt: 'Lush green Bali jungle landscape',
    orientation: 'portrait' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1532186651327-6ac23687d189?w=1200&q=85&auto=format&fit=crop',
    alt: 'Sacred Bali temple grounds at sunset',
    orientation: 'landscape' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=900&q=85&auto=format&fit=crop',
    alt: 'Balinese traditional dancer',
    orientation: 'portrait' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1600&q=85&auto=format&fit=crop',
    alt: 'Panoramic view of Bali coastline',
    orientation: 'wide' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1578991624414-276ef23a534f?w=1200&q=85&auto=format&fit=crop',
    alt: 'Traditional Bali temple ceremony',
    orientation: 'landscape' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1602659370191-d6a06d4c005b?w=900&q=85&auto=format&fit=crop',
    alt: 'Bali sunset over the ocean',
    orientation: 'portrait' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&q=85&auto=format&fit=crop',
    alt: 'Ancient stone carvings in Bali',
    orientation: 'landscape' as const,
  },
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
  // Charger les données depuis Firestore
  let heroImage = DEFAULT_HERO_IMAGE;
  let masonryImages = DEFAULT_MASONRY_IMAGES;

  try {
    const homepageData = await getHomepageData();
    if (homepageData) {
      if (homepageData.heroImage?.src) {
        heroImage = homepageData.heroImage;
      }
      if (homepageData.masonryImages && homepageData.masonryImages.length > 0) {
        masonryImages = homepageData.masonryImages.map(img => ({
          src: img.src,
          alt: img.alt,
          orientation: img.orientation,
        }));
      }
    }
  } catch (error) {
    console.error('Error loading homepage data:', error);
    // Utiliser les valeurs par défaut en cas d'erreur
  }

  return (
    <>
      <HeroSection imageUrl={heroImage.src} imageAlt={heroImage.alt} />
      <MasonryGallery images={masonryImages} />
    </>
  );
}

