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

// Algorithme de placement qui garantit un remplissage complet sans vides
function calculateGridPositions(images: MasonryImage[], cols: number): GridPosition[] {
  const positions: GridPosition[] = [];
  const grid: boolean[][] = [];
  const maxRows = 100; // Limite de sécurité
  
  // Initialiser la grille (toutes les cellules libres)
  for (let row = 0; row < maxRows; row++) {
    grid[row] = new Array(cols).fill(false);
  }
  
  // Fonction pour vérifier si une position est disponible
  const isPositionAvailable = (col: number, row: number, colSpan: number, rowSpan: number): boolean => {
    if (col + colSpan > cols) return false;
    if (row + rowSpan > maxRows) return false;
    
    for (let r = row; r < row + rowSpan; r++) {
      for (let c = col; c < col + colSpan; c++) {
        if (grid[r][c]) return false;
      }
    }
    return true;
  };
  
  // Fonction pour marquer une position comme occupée
  const markPosition = (col: number, row: number, colSpan: number, rowSpan: number) => {
    for (let r = row; r < row + rowSpan; r++) {
      for (let c = col; c < col + colSpan; c++) {
        grid[r][c] = true;
      }
    }
  };
  
  // Fonction pour trouver la première position disponible
  const findAvailablePosition = (colSpan: number, rowSpan: number): { col: number; row: number } | null => {
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col <= cols - colSpan; col++) {
        if (isPositionAvailable(col, row, colSpan, rowSpan)) {
          return { col, row };
        }
      }
    }
    return null;
  };
  
  // Déterminer la taille de chaque image selon son orientation
  const getImageSize = (image: MasonryImage, index: number): { colSpan: number; rowSpan: number } => {
    // Pattern varié pour créer un effet bento harmonieux
    const patternIndex = index % 12;
    
    // Pattern qui garantit un remplissage efficace
    const patterns: { colSpan: number; rowSpan: number }[] = [
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
    
    return patterns[patternIndex];
  };
  
  // Placer chaque image
  for (let i = 0; i < images.length; i++) {
    const size = getImageSize(images[i], i);
    const position = findAvailablePosition(size.colSpan, size.rowSpan);
    
    if (position) {
      markPosition(position.col, position.row, size.colSpan, size.rowSpan);
      positions.push({
        colSpan: size.colSpan,
        rowSpan: size.rowSpan,
        colStart: position.col + 1, // CSS Grid est 1-indexed
        rowStart: position.row + 1,
      });
    } else {
      // Fallback si pas de position trouvée (ne devrait pas arriver)
      positions.push({ colSpan: 1, rowSpan: 1 });
    }
  }
  
  return positions;
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

  // Générer les classes Tailwind complètes pour chaque breakpoint
  const getSpanClasses = () => {
    // Mobile (2 cols)
    const mobileCol = positionMobile.colSpan === 2 ? 'col-span-2' : 'col-span-1';
    const mobileRow = positionMobile.rowSpan === 2 ? 'row-span-2' : 'row-span-1';
    const mobileColStart = positionMobile.colStart ? `col-start-${positionMobile.colStart}` : '';
    const mobileRowStart = positionMobile.rowStart ? `row-start-${positionMobile.rowStart}` : '';
    
    // Tablet (4 cols)
    const tabletCol = positionTablet.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1';
    const tabletRow = positionTablet.rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1';
    const tabletColStart = positionTablet.colStart ? `md:col-start-${positionTablet.colStart}` : '';
    const tabletRowStart = positionTablet.rowStart ? `md:row-start-${positionTablet.rowStart}` : '';
    
    // Desktop (6 cols)
    const desktopCol = positionDesktop.colSpan === 2 ? 'lg:col-span-2' : 'lg:col-span-1';
    const desktopRow = positionDesktop.rowSpan === 2 ? 'lg:row-span-2' : 'lg:row-span-1';
    const desktopColStart = positionDesktop.colStart ? `lg:col-start-${positionDesktop.colStart}` : '';
    const desktopRowStart = positionDesktop.rowStart ? `lg:row-start-${positionDesktop.rowStart}` : '';
    
    return [
      mobileCol, mobileRow, mobileColStart, mobileRowStart,
      tabletCol, tabletRow, tabletColStart, tabletRowStart,
      desktopCol, desktopRow, desktopColStart, desktopRowStart,
    ].filter(Boolean).join(' ');
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

