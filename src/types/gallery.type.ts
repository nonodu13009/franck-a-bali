import type { Series, Image } from './firebase.type';

export type GalleryView = 'grid' | 'masonry';

export interface GalleryProps {
  series: Series[];
  view?: GalleryView;
}

export interface SeriesDetailProps {
  series: Series;
  images: Image[];
}

