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
  colStart?: number;
  rowStart?: number;
}

// Pattern simple qui garantit un remplissage complet
// Pour 6 colonnes : pattern de 6 positions qui se répète parfaitement
const BENTO_PATTERN_6: GridPosition[] = [
  { colSpan: 2, rowSpan: 2 }, // 4 cellules
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 2, rowSpan: 1 }, // 2 cellules
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  // Total: 10 cellules par cycle, mais on ajuste pour 6 cols
];

// Pattern optimisé pour remplir 6 colonnes sans vides
// Chaque cycle de 6 images remplit exactement 6 colonnes
const OPTIMIZED_PATTERN_6: GridPosition[] = [
  { colSpan: 2, rowSpan: 2 }, // 4 cellules
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 2, rowSpan: 1 }, // 2 cellules
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
];

const OPTIMIZED_PATTERN_4: GridPosition[] = [
  { colSpan: 2, rowSpan: 2 }, // 4 cellules
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 2, rowSpan: 1 }, // 2 cellules
];

const OPTIMIZED_PATTERN_2: GridPosition[] = [
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
  { colSpan: 1, rowSpan: 1 }, // 1 cellule
];

function calculateGridPositions(images: MasonryImage[], cols: number): GridPosition[] {
  const pattern = cols === 6 ? OPTIMIZED_PATTERN_6 : cols === 4 ? OPTIMIZED_PATTERN_4 : OPTIMIZED_PATTERN_2;
  
  return images.map((_, index) => {
    const patternIndex = index % pattern.length;
    return pattern[patternIndex];
  });
}

export function MasonryGallery({ images }: MasonryGalleryProps) {
  // Calculer les positions pour desktop (6 cols), tablet (4 cols), mobile (2 cols)
  const positionsDesktop = useMemo(() => calculateGridPositions(images, 6), [images]);
  const positionsTablet = useMemo(() => calculateGridPositions(images, 4), [images]);
  const positionsMobile = useMemo(() => calculateGridPositions(images, 2), [images]);

  return (
    <section className="bg-black pt-16 md:pt-20 lg:pt-24">
      {/* Grille bento dense sans espaces - algorithme de placement optimal */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px]">
        {images.map((image, index) => (
          <MasonryImageCard
            key={index}
            image={image}
            index={index}
            positionMobile={positionsMobile[index]}
            positionTablet={positionsTablet[index]}
            positionDesktop={positionsDesktop[index]}
          />
        ))}
      </div>
    </section>
  );
}

interface MasonryImageCardProps {
  image: MasonryImage;
  index: number;
  positionMobile: GridPosition;
  positionTablet: GridPosition;
  positionDesktop: GridPosition;
}

function MasonryImageCard({ image, index, positionMobile, positionTablet, positionDesktop }: MasonryImageCardProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

  // Générer les classes Tailwind pour les spans (responsive)
  const getSpanClasses = () => {
    // Mobile (2 cols)
    const mobileCol = positionMobile.colSpan === 2 ? 'col-span-2' : 'col-span-1';
    const mobileRow = positionMobile.rowSpan === 2 ? 'row-span-2' : 'row-span-1';
    
    // Tablet (4 cols)
    const tabletCol = positionTablet.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1';
    const tabletRow = positionTablet.rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1';
    
    // Desktop (6 cols)
    const desktopCol = positionDesktop.colSpan === 2 ? 'lg:col-span-2' : 'lg:col-span-1';
    const desktopRow = positionDesktop.rowSpan === 2 ? 'lg:row-span-2' : 'lg:row-span-1';
    
    return `${mobileCol} ${mobileRow} ${tabletCol} ${tabletRow} ${desktopCol} ${desktopRow}`;
  };

  // Pas besoin de styles inline - CSS Grid auto-placement gère le remplissage

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

