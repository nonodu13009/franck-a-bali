import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';

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
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Human connections',
      position: 'right',
    },
    {
      text: t('section4'),
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Bali landscapes',
      position: 'left',
    },
    {
      text: t('section5'),
      image: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'VF Images gallery',
      position: 'right',
    },
    {
      text: t('section6'),
      image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=1200&q=80&auto=format&fit=crop',
      imageAlt: 'Life fragments',
      position: 'left',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555217851-6141535bd771?w=1920&q=80&auto=format&fit=crop"
            alt="Franck - Photographer"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay">
            {t('subtitle')}
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Story Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {sections.map((section, index) => (
          <section
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
              section.position === 'left' ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div
              className={`space-y-6 opacity-0 animate-fade-in-up ${
                section.position === 'right' ? 'lg:order-1' : 'lg:order-2'
              }`}
              style={{
                animationDelay: '0.2s',
                animationFillMode: 'forwards',
              }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
                {section.text}
              </p>
            </div>
            <div
              className={`relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl opacity-0 animate-fade-in-up ${
                section.position === 'right' ? 'lg:order-2' : 'lg:order-1'
              }`}
              style={{
                animationDelay: '0.4s',
                animationFillMode: 'forwards',
              }}
            >
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </section>
        ))}
      </div>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">{t('ctaTitle')}</h2>
          <p className="text-lg text-muted-foreground">{t('ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href={`/${locale}/gallery`}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              {t('ctaGallery')}
            </a>
            <a
              href={`/${locale}/shop`}
              className="px-8 py-4 border border-border rounded-full font-medium hover:bg-muted transition-colors"
            >
              {t('ctaShop')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

