'use client';

import { useEffect, useState, useRef } from 'react';

interface ParallaxOptions {
  speed?: number; // Vitesse du parallax (0.5 = moitié de la vitesse, 2 = double)
  direction?: 'up' | 'down'; // Direction du mouvement
  disabled?: boolean; // Désactiver sur mobile
}

export function useParallax(options: ParallaxOptions = {}) {
  const {
    speed = 0.5,
    direction = 'up',
    disabled = false,
  } = options;

  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      requestRef.current = requestAnimationFrame(() => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const elementTop = rect.top + scrollPosition;
        const windowHeight = window.innerHeight;

        // Calculer l'offset seulement si l'élément est visible
        if (rect.top < windowHeight && rect.bottom > 0) {
          const relativeScroll = scrollPosition - elementTop + windowHeight;
          const parallaxOffset = relativeScroll * speed * (direction === 'down' ? 1 : -1);
          setOffset(parallaxOffset);
        }
      });
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [speed, direction, disabled]);

  return { elementRef, offset };
}

