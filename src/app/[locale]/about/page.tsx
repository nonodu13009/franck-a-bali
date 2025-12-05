import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ParallaxHero } from '@/components/about/parallax-hero';
import { TextImageSection } from '@/components/about/text-image-section';
import { FullQuote } from '@/components/about/full-quote';
import { StatsSection } from '@/components/about/stats-section';

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

  const sections: StorySection[] = [
    {
      text: t('section1'),
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Traveling photographer',
      position: 'right',
    },
    {
      text: t('section2'),
      image: 'https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Camera and journey',
      position: 'left',
    },
    {
      text: t('section3'),
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Bali landscapes',
      position: 'right',
    },
  ];

  const stats = [
    {
      value: 500,
      suffix: '+',
      label: 'Photos',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      value: 25,
      label: 'Pays',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      value: 4.9,
      label: 'Rating',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      value: 5,
      label: 'Années à Bali',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section avec Parallax */}
      <ParallaxHero
        title={t('title')}
        subtitle={t('subtitle')}
        imageUrl="https://images.unsplash.com/photo-1555217851-6141535bd771?w=1920&q=80&auto=format&fit=crop"
      />

      {/* Story Sections - FOND NOIR PUR */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section 1 */}
          <div className="pt-32 pb-20">
            <TextImageSection
              text={sections[0].text}
              imageUrl={sections[0].image}
              imageAlt={sections[0].imageAlt}
              imagePosition={sections[0].position}
              priority
            />
          </div>

          {/* Séparateur simple */}
          <div className="relative py-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-6 text-sm text-white/40">✦</span>
            </div>
          </div>

          {/* Section 2 */}
          <div className="py-20">
            <TextImageSection
              text={sections[1].text}
              imageUrl={sections[1].image}
              imageAlt={sections[1].imageAlt}
              imagePosition={sections[1].position}
            />
          </div>

          {/* Séparateur simple */}
          <div className="relative py-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-6 text-sm text-white/40">✦</span>
            </div>
          </div>

          {/* Section 3 */}
          <div className="py-20 pb-32">
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
      <section className="relative py-32 overflow-hidden bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl md:text-2xl text-white/80">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href={`/${locale}/gallery`}
              className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium transition-all duration-300 border border-white/10"
            >
              {t('ctaGallery')}
            </a>
            <a
              href={`/${locale}/shop`}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all duration-300 border border-white/10"
            >
              {t('ctaShop')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
