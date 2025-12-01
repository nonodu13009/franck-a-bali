import { ImageCard } from './image-card';
import type { Series } from '@/types/firebase.type';

interface GalleryGridProps {
  series: Series[];
  locale: string;
}

export function GalleryGrid({ series, locale }: GalleryGridProps) {
  if (series.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune série disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {series.map((seriesItem) => (
        <ImageCard key={seriesItem.id} series={seriesItem} locale={locale} />
      ))}
    </div>
  );
}

