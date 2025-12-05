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
    <section className="bg-black py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Grille masonry responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <MasonryImageCard
              key={index}
              image={image}
              index={index}
              totalImages={images.length}
            />
          ))}
        </div>
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

  // Déterminer le ratio d'aspect selon l'orientation
  const aspectClass = 
    image.orientation === 'portrait' ? 'aspect-[3/4]' :
    image.orientation === 'wide' ? 'aspect-[16/9] md:col-span-2' :
    'aspect-[4/3]';

  // Lazy loading : priority pour les 3 premières images, lazy pour le reste
  const shouldPrioritize = index < 3;

  return (
    <div
      className={`group relative overflow-hidden rounded-sm bg-black ${aspectClass}`}
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
      
      {/* Bordure subtile */}
      <div className="absolute inset-0 rounded-sm pointer-events-none border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
    </div>
  );
}

