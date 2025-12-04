'use client';

import { useEffect, useState, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number; // Pourcentage de visibilité pour trigger (0-1)
  delay?: number; // Délai avant animation (ms)
  once?: boolean; // Animer une seule fois
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    delay = 0,
    once = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Si déjà animé et once=true, ne pas réobserver
    if (once && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            if (once) {
              setHasAnimated(true);
            }
          }, delay);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger un peu avant d'être visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, delay, once, hasAnimated]);

  return { elementRef, isVisible };
}

