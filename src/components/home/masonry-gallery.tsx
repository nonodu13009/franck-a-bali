'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ParticleCard, GlobalSpotlight, useMobileDetection } from './magic-bento';

interface MasonryImage {
  src: string;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'wide';
}

interface MasonryGalleryProps {
  images: MasonryImage[];
}

export function MasonryGallery({ images }: MasonryGalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = isMobile;

  return (
    <section className="bg-black pt-16 md:pt-20 lg:pt-24">
      {/* Spotlight global */}
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={shouldDisableAnimations}
        enabled={true}
        spotlightRadius={300}
        glowColor="82, 183, 136"
      />
      
      {/* Grille bento dense sans espaces avec effets MagicBento */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px] bento-section"
      >
        {images.map((image, index) => (
          <MasonryImageCard
            key={index}
            image={image}
            index={index}
            totalImages={images.length}
            disableAnimations={shouldDisableAnimations}
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
  disableAnimations?: boolean;
}

function MasonryImageCard({ image, index, totalImages, disableAnimations = false }: MasonryImageCardProps) {
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
    <ParticleCard
      className={`${getBentoSpan()}`}
      disableAnimations={disableAnimations}
      particleCount={12}
      glowColor="82, 183, 136"
      enableTilt={true}
      clickEffect={true}
      enableMagnetism={true}
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
        className="object-cover"
        onError={() => {
          console.warn(`Failed to load image: ${image.src}`);
          if (image.src !== fallbackImage) {
            setImageError(true);
          }
        }}
      />
    </ParticleCard>
  );
}

