// Types admin - pas besoin d'importer Series, Image, BlogPost ici

export interface AboutSection {
  text: string;
  textEn: string;
  image: string;
  imageAlt: string;
  imageAltEn: string;
  position: 'left' | 'right';
  order: number;
}

export interface AboutCTA {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  galleryButton: string;
  galleryButtonEn: string;
  shopButton: string;
  shopButtonEn: string;
}

export interface AboutData {
  heroImage: {
    src: string;
    alt: string;
  };
  sections: AboutSection[];
  cta: AboutCTA;
}

export interface HomepageData {
  heroImage: {
    src: string;
    alt: string;
  };
  masonryImages: Array<{
    src: string;
    alt: string;
    orientation: 'portrait' | 'landscape' | 'wide';
    order: number;
  }>;
}

export interface PhotoFormData {
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

export interface GalleryFormData {
  title: string;
  titleEn: string;
  description?: string;
  descriptionEn?: string;
  coverImage: string;
  order: number;
  slug?: string;
}

export interface BlogFormData {
  slug: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  featuredImage?: string;
  videoUrl?: string;
  videoRatio?: '16:9' | '9:16';
  author: string;
  excerpt?: string;
  excerptEn?: string;
}

export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export interface AdminState {
  isLoading: boolean;
  error: string | null;
}
