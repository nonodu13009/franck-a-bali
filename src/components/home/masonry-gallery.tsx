'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MasonryImage {
  src: string;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'wide';
}

interface MasonryGalleryProps {
  images: MasonryImage[];
}

export function MasonryGallery({ images }: MasonryGalleryProps) {
  return (
    <section className="bg-black pt-16 md:pt-20 lg:pt-24">
      {/* Grille bento dense sans espaces */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px]">
        {images.map((image, index) => (
          <MasonryImageCard
            key={index}
            image={image}
            index={index}
            totalImages={images.length}
          />
        ))}
      </div>
    </section>
  );
}

interface MasonryImageCardProps {
  image: MasonryImage;
  index: number;
  totalImages: number;
}

function MasonryImageCard({ image, index, totalImages }: MasonryImageCardProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

  // Layout bento : spans variés pour créer un effet dense et harmonieux
  const getBentoSpan = () => {
    if (image.orientation === 'wide') {
      // Images wide : 2 colonnes x 2 lignes (grand carré)
      return 'col-span-2 row-span-2';
    } else if (image.orientation === 'portrait') {
      // Images portrait : 1 colonne x 2 lignes (vertical)
      return 'col-span-1 row-span-2';
    } else {
      // Images landscape : 2 colonnes x 1 ligne (horizontal) ou 1x1 selon position
      return index % 3 === 0 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1';
    }
  };

  // Lazy loading : priority pour les 3 premières images, lazy pour le reste
  const shouldPrioritize = index < 3;

  return (
    <div
      className={`group relative overflow-hidden bg-black ${getBentoSpan()}`}
    >
      <Image
        src={imageError ? fallbackImage : image.src}
        alt={image.alt}
        fill
        sizes={
          image.orientation === 'wide'
            ? '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 66vw'
            : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        }
        quality={85}
        loading={shouldPrioritize ? undefined : 'lazy'}
        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        onError={() => {
          console.warn(`Failed to load image: ${image.src}`);
          if (image.src !== fallbackImage) {
            setImageError(true);
          }
        }}
      />
    </div>
  );
}

