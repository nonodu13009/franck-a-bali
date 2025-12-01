import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SeriesLayout } from '@/components/gallery/series-layout';
import { getSeries, getImagesBySeries } from '@/lib/firebase/firestore';

export async function generateStaticParams() {
  const series = await getSeries();
  return series.map((s) => ({
    series: s.slug || s.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; series: string }>;
}): Promise<Metadata> {
  const { locale, series: seriesSlug } = await params;
  const series = await getSeries();
  const currentSeries = series.find((s) => (s.slug || s.id) === seriesSlug);

  if (!currentSeries) {
    return {};
  }

  const title = locale === 'en' ? currentSeries.titleEn : currentSeries.title;
  const description =
    locale === 'en'
      ? currentSeries.descriptionEn
      : currentSeries.description;

  return {
    title,
    description: description || title,
    openGraph: {
      images: currentSeries.coverImage ? [currentSeries.coverImage] : [],
    },
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ locale: string; series: string }>;
}) {
  const { locale, series: seriesSlug } = await params;
  const series = await getSeries();
  const currentSeries = series.find((s) => (s.slug || s.id) === seriesSlug);

  if (!currentSeries) {
    notFound();
  }

  const images = await getImagesBySeries(currentSeries.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <SeriesLayout series={currentSeries} images={images} locale={locale} />
    </div>
  );
}

