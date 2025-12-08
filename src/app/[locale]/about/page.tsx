import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ParallaxHero } from '@/components/about/parallax-hero';
import { TextImageSection } from '@/components/about/text-image-section';
import { getAboutData } from '@/lib/firebase/admin-firestore';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

interface StorySection {
  text: string;
  image: string;
  imageAlt: string;
  position: 'left' | 'right';
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  // Charger les données depuis Firestore
  let heroImage = {
    src: 'https://images.unsplash.com/photo-1555217851-6141535bd771?w=1920&q=80&auto=format&fit=crop',
    alt: 'Photographer in Bali',
  };

  let sections: StorySection[] = [
    {
      text: t('section1'),
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Traveling photographer',
      position: 'right' as const,
    },
    {
      text: t('section2'),
      image: 'https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Camera and journey',
      position: 'left' as const,
    },
    {
      text: t('section3'),
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Bali landscapes',
      position: 'right' as const,
    },
  ];

  let ctaData = {
    title: t('ctaTitle'),
    subtitle: t('ctaSubtitle'),
    galleryButton: t('ctaGallery'),
    shopButton: t('ctaShop'),
  };

  try {
    const aboutData = await getAboutData();
    if (aboutData) {
      if (aboutData.heroImage?.src) {
        heroImage = {
          src: aboutData.heroImage.src,
          alt: locale === 'en' ? aboutData.heroImage.alt : aboutData.heroImage.alt,
        };
      }

      if (aboutData.sections && aboutData.sections.length > 0) {
        sections = aboutData.sections
          .sort((a, b) => a.order - b.order)
          .map((section) => ({
            text: locale === 'en' ? section.textEn : section.text,
            image: section.image,
            imageAlt: locale === 'en' ? section.imageAltEn : section.imageAlt,
            position: section.position as 'left' | 'right',
          }));
      }

      if (aboutData.cta) {
        ctaData = {
          title: locale === 'en' ? aboutData.cta.titleEn : aboutData.cta.title,
          subtitle: locale === 'en' ? aboutData.cta.subtitleEn : aboutData.cta.subtitle,
          galleryButton: locale === 'en' ? aboutData.cta.galleryButtonEn : aboutData.cta.galleryButton,
          shopButton: locale === 'en' ? aboutData.cta.shopButtonEn : aboutData.cta.shopButton,
        };
      }
    }
  } catch (error) {
    console.error('Error loading about data:', error);
    // Utiliser les valeurs par défaut en cas d'erreur
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section avec Parallax */}
      <ParallaxHero
        title={t('title')}
        subtitle={t('subtitle')}
        imageUrl={heroImage.src}
      />

      {/* Story Sections - FOND NOIR PUR - Espacement réduit */}
      <div className="bg-black">
      <div className="max-w-7xl mx-auto px-6">
          {/* Section 1 */}
          <div className="pt-20 pb-12">
          <TextImageSection
            text={sections[0].text}
            imageUrl={sections[0].image}
            imageAlt={sections[0].imageAlt}
            imagePosition={sections[0].position}
            priority
          />
        </div>

          {/* Séparateur simple */}
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-6 text-sm text-white/40">✦</span>
            </div>
          </div>

        {/* Section 2 */}
          <div className="py-12">
          <TextImageSection
            text={sections[1].text}
            imageUrl={sections[1].image}
            imageAlt={sections[1].imageAlt}
            imagePosition={sections[1].position}
          />
        </div>

          {/* Séparateur simple */}
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-6 text-sm text-white/40">✦</span>
            </div>
          </div>

        {/* Section 3 */}
          <div className="py-12 pb-16">
          <TextImageSection
            text={sections[2].text}
            imageUrl={sections[2].image}
            imageAlt={sections[2].imageAlt}
            imagePosition={sections[2].position}
          />
        </div>
        </div>
      </div>

      {/* Final CTA - NOIR PUR SIMPLE */}
      <section className="relative py-20 overflow-hidden bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {ctaData.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/80">
            {ctaData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href={`/${locale}/gallery`}
              className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium transition-all duration-300 border border-white/10"
            >
              {ctaData.galleryButton}
            </a>
            <a
              href={`/${locale}/shop`}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all duration-300 border border-white/10"
            >
              {ctaData.shopButton}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
