import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/gallery-grid';
import { getSeries } from '@/lib/firebase/firestore';
import { Suspense } from 'react';

async function SeriesList({ locale }: { locale: string }) {
  const series = await getSeries();

  return <GalleryGrid series={series} locale={locale} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-muted animate-pulse rounded-sm"
              />
            ))}
          </div>
        }
      >
        <SeriesList locale={locale} />
      </Suspense>
    </div>
  );
}

