'use client';

import { useEffect, useState, useRef } from 'react';

interface CounterOptions {
  end: number; // Valeur finale
  duration?: number; // Durée de l'animation (ms)
  start?: number; // Valeur initiale
  enabled?: boolean; // Activer le compteur
}

export function useCounter(options: CounterOptions) {
  const {
    end,
    duration = 2000,
    start = 0,
    enabled = true,
  } = options;

  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!enabled || hasStarted) return;

    setHasStarted(true);
    const startTime = Date.now();
    startTimeRef.current = startTime;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;

      setCount(Math.floor(current));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [end, duration, start, enabled, hasStarted]);

  return count;
}

