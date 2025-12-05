'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'wide';
  fallbackSrc?: string;
}

// Génère le sizes responsive optimal selon l'utilisation
function generateSizes(aspectRatio?: string): string {
  switch (aspectRatio) {
    case 'square':
    case 'portrait':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'wide':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 66vw';
    case 'video':
    case 'landscape':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 896px';
    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
}

// Placeholder blur data URL optimisé
const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

export function OptimizedImage({
  src,
  alt,
  aspectRatio,
  fallbackSrc = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  priority = false,
  quality = 85,
  sizes,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  // Utiliser sizes personnalisé ou généré automatiquement
  const imageSizes = sizes || generateSizes(aspectRatio);

  const handleError = () => {
    console.warn(`Failed to load image: ${imageSrc}`);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-black/20 ${className}`}>
        <svg
          className="w-12 h-12 text-white/20"
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
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      sizes={imageSizes}
      quality={quality}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}

