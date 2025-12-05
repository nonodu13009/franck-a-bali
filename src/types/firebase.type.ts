import { Timestamp } from 'firebase/firestore';

export interface Series {
  id: string;
  title: string;
  titleEn: string;
  description?: string;
  descriptionEn?: string;
  coverImage: string;
  createdAt: Timestamp;
  order: number;
  slug?: string;
}

export interface Image {
  id: string;
  seriesId: string;
  url: string;
  alt: string;
  altEn: string;
  width: number;
  height: number;
  order: number;
  metadata?: {
    camera?: string;
    lens?: string;
    iso?: number;
    aperture?: string;
    shutterSpeed?: string;
    location?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  featuredImage?: string;
  videoUrl?: string;           // URL de la vidéo (MP4/MOV/WEBM)
  videoRatio?: '16:9' | '9:16'; // Ratio pour affichage optimal
  publishedAt: Timestamp;
  author: string;
  excerpt?: string;
  excerptEn?: string;
}

