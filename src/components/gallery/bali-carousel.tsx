'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
}

interface BaliCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

export function BaliCarousel({ images, autoPlayInterval = 5000 }: BaliCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(index > currentIndex ? 'next' : 'prev');
      setIsTransitioning(true);
      setCurrentIndex(index);
    },
    [currentIndex, isTransitioning]
  );

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (!isPaused && autoPlayInterval > 0) {
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused, autoPlayInterval, goToNext]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    },
    [goToNext, goToPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + images.length) % images.length;
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-hero-section
    >
      {/* Vignettage subtil sur les bords */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Main Slides */}
      <div className="relative w-full h-full">
        {[-1, 0, 1].map((offset) => {
          const index = getSlideIndex(offset);
          const isActive = offset === 0;
          const isPrev = offset === -1;
          const isNext = offset === 1;

          return (
            <div
              key={`${index}-${currentIndex}`}
              className={cn(
                'absolute inset-0 transition-all duration-1000 ease-in-out',
                isActive && !isTransitioning && 'z-20 opacity-100 scale-100',
                isActive && isTransitioning && direction === 'next' && 'z-20 opacity-0 scale-95 -translate-x-full',
                isActive && isTransitioning && direction === 'prev' && 'z-20 opacity-0 scale-95 translate-x-full',
                isPrev && 'z-10 opacity-0 scale-110 -translate-x-full',
                isNext && 'z-10 opacity-0 scale-110 translate-x-full',
                !isActive && !isPrev && !isNext && 'z-0 opacity-0'
              )}
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  className={cn(
                    'object-cover transition-transform duration-[2000ms] ease-out',
                    isActive && !isTransitioning && 'scale-105',
                    isActive && isTransitioning && 'scale-100'
                  )}
                  priority={isActive}
                  sizes="100vw"
                  quality={90}
                />
                {/* Overlay gradient amélioré pour fond noir */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
                
                {/* Title avec effet de profondeur */}
                {images[index].title && (
                  <div className="absolute bottom-24 left-0 right-0 text-center px-6">
                    <h2
                      className={cn(
                        'text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl transition-all duration-1000',
                        'elevated-high',
                        isActive && !isTransitioning && 'opacity-100 translate-y-0',
                        (!isActive || isTransitioning) && 'opacity-0 translate-y-10'
                      )}
                    >
                      {images[index].title}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows avec glass effect */}
      <button
        onClick={goToPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 glass-effect hover:glass-effect-strong rounded-full flex items-center justify-center transition-all group elevated"
        aria-label="Previous image"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 glass-effect hover:glass-effect-strong rounded-full flex items-center justify-center transition-all group elevated"
        aria-label="Next image"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation avec effet de brillance */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'transition-all duration-500 rounded-full',
              index === currentIndex
                ? 'w-12 h-3 bg-white glow-subtle'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60 hover:glow-subtle'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar avec effet brillant */}
      {!isPaused && autoPlayInterval > 0 && (
        <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-accent via-white to-accent-warm transition-all linear glow-subtle"
            style={{
              width: '100%',
              animation: `progress ${autoPlayInterval}ms linear`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

