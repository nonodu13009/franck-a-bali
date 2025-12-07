'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Series } from '@/types/firebase.type';

interface ImageCardProps {
  series: Series;
  locale: string;
}

export function ImageCard({ series, locale }: ImageCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(series.coverImage || '');
  const title = locale === 'en' ? series.titleEn : series.title;

  // Fallback image si l'image principale ne charge pas
  const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

  return (
    <Link
      href={`/${locale}/gallery/${series.slug || series.id}`}
      className="group relative block overflow-hidden rounded-sm"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted rounded-sm elevated transition-all duration-500 group-hover:elevated-high group-hover:glow-subtle">
        {imageSrc && !imageError ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
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
        {/* Border gradient subtil */}
        <div className="absolute inset-0 rounded-sm pointer-events-none border border-white/5 group-hover:border-white/10 transition-colors duration-500" />

        {/* Overlay avec nom de la galerie au hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              'px-4 py-3 md:px-6 md:py-4',
              'bg-black/60 backdrop-blur-sm',
              'rounded-sm',
              'transition-all duration-300 ease-out',
              'group-hover:opacity-100 group-hover:translate-y-0',
              'opacity-0 translate-y-4',
              'group-active:opacity-100 group-active:translate-y-0' // Pour mobile (touch)
            )}
          >
            <h3 className="text-white text-lg md:text-xl lg:text-2xl font-medium text-center whitespace-nowrap">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
