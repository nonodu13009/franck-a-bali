'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

interface MasonryImage {
  src: string;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'wide';
}

interface MasonryGalleryProps {
  images: MasonryImage[];
}

interface GridPosition {
  colSpan: number;
  rowSpan: number;
}

// Pattern bento qui garantit de remplir la grille sans vides
// Pattern répétitif pour 6 colonnes (desktop)
const BENTO_PATTERN_6: GridPosition[] = [
  { colSpan: 2, rowSpan: 2 }, // Grand carré
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 2, rowSpan: 1 }, // Large horizontal
  { colSpan: 1, rowSpan: 2 }, // Vertical
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 2, rowSpan: 1 }, // Large horizontal
  { colSpan: 1, rowSpan: 2 }, // Vertical
  { colSpan: 1, rowSpan: 1 }, // Petit
];

// Pattern pour 4 colonnes (tablet)
const BENTO_PATTERN_4: GridPosition[] = [
  { colSpan: 2, rowSpan: 2 }, // Grand carré
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 2, rowSpan: 1 }, // Large
  { colSpan: 1, rowSpan: 2 }, // Vertical
  { colSpan: 1, rowSpan: 1 }, // Petit
];

// Pattern pour 2 colonnes (mobile)
const BENTO_PATTERN_2: GridPosition[] = [
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 1, rowSpan: 1 }, // Petit
  { colSpan: 2, rowSpan: 1 }, // Large
  { colSpan: 1, rowSpan: 2 }, // Vertical
  { colSpan: 1, rowSpan: 1 }, // Petit
];

export function MasonryGallery({ images }: MasonryGalleryProps) {
  // Calculer les positions pour chaque image selon le pattern
  const positions = useMemo(() => {
    return images.map((_, index) => {
      // Utiliser le pattern selon le breakpoint (on utilise desktop par défaut)
      const pattern = BENTO_PATTERN_6;
      const patternIndex = index % pattern.length;
      return pattern[patternIndex];
    });
  }, [images]);

  return (
    <section className="bg-black pt-16 md:pt-20 lg:pt-24">
      {/* Grille bento dense sans espaces - pattern qui remplit toujours */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px]">
        {images.map((image, index) => (
          <MasonryImageCard
            key={index}
            image={image}
            index={index}
            position={positions[index]}
          />
        ))}
      </div>
    </section>
  );
}

interface MasonryImageCardProps {
  image: MasonryImage;
  index: number;
  position: GridPosition;
}

function MasonryImageCard({ image, index, position }: MasonryImageCardProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

  // Utiliser la position calculée du pattern (responsive via Tailwind)
  const colSpanClass = `col-span-${position.colSpan} md:col-span-${position.colSpan <= 2 ? position.colSpan : 2} lg:col-span-${position.colSpan}`;
  const rowSpanClass = `row-span-${position.rowSpan} md:row-span-${position.rowSpan} lg:row-span-${position.rowSpan}`;
  
  // Fallback avec classes Tailwind complètes pour garantir le rendu
  const getSpanClasses = () => {
    // Mobile (2 cols)
    const mobileCol = position.colSpan === 2 ? 'col-span-2' : 'col-span-1';
    const mobileRow = position.rowSpan === 2 ? 'row-span-2' : 'row-span-1';
    
    // Tablet (4 cols) - adapter si nécessaire
    const tabletCol = position.colSpan === 2 ? 'md:col-span-2' : position.colSpan === 1 ? 'md:col-span-1' : 'md:col-span-2';
    const tabletRow = position.rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1';
    
    // Desktop (6 cols)
    const desktopCol = position.colSpan === 2 ? 'lg:col-span-2' : 'lg:col-span-1';
    const desktopRow = position.rowSpan === 2 ? 'lg:row-span-2' : 'lg:row-span-1';
    
    return `${mobileCol} ${mobileRow} ${tabletCol} ${tabletRow} ${desktopCol} ${desktopRow}`;
  };

  // Lazy loading : priority pour les 3 premières images, lazy pour le reste
  const shouldPrioritize = index < 3;

  return (
    <div
      className={`group relative overflow-hidden bg-black ${getSpanClasses()}`}
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

