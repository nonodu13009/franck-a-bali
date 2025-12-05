'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Series } from '@/types/firebase.type';

interface ImageCardProps {
  series: Series;
  locale: string;
}

export function ImageCard({ series, locale }: ImageCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(series.coverImage || '');
  const title = locale === 'en' ? series.titleEn : series.title;
  const description = locale === 'en' ? series.descriptionEn : series.description;

  // Fallback image si l'image principale ne charge pas
  const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

  return (
    <Link
      href={`/${locale}/gallery/${series.slug || series.id}`}
      className="group relative block overflow-hidden rounded-sm"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {imageSrc && !imageError ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onError={() => {
              console.warn(`Failed to load image: ${imageSrc}`);
              // Essayer l'image de fallback si ce n'est pas déjà celle-ci
              if (imageSrc !== fallbackImage) {
                setImageSrc(fallbackImage);
                setImageError(false);
              } else {
                setImageError(true);
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
}
