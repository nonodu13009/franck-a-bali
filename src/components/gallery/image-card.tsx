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
  const title = locale === 'en' ? series.titleEn : series.title;
  const description = locale === 'en' ? series.descriptionEn : series.description;

  return (
    <Link
      href={`/${locale}/gallery/${series.slug || series.id}`}
      className="group relative block overflow-hidden rounded-sm"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {series.coverImage && !imageError ? (
          <Image
            src={series.coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
