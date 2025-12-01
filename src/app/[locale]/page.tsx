import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { HeroSlider } from '@/components/gallery/hero-slider';
import { getImagesBySeries } from '@/lib/firebase/firestore';
import { getSeries } from '@/lib/firebase/firestore';
import { Suspense } from 'react';

async function HeroImages({ locale }: { locale: string }) {
  const series = await getSeries();
  if (series.length === 0) {
    return null;
  }

  // Get images from the first series or a featured series
  const firstSeries = series[0];
  const images = await getImagesBySeries(firstSeries.id);

  if (images.length === 0) {
    return null;
  }

  return <HeroSlider images={images} locale={locale} />;
}

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
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <div className="relative">
      <Suspense
        fallback={
          <div className="w-full h-screen bg-muted animate-pulse" />
        }
      >
        <HeroImages locale={locale} />
      </Suspense>
      
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-background via-background/50 to-transparent">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
}

