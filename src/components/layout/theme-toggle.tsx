'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Vérifier le thème système ou localStorage
    const checkTheme = () => {
      if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        setIsDark(storedTheme ? storedTheme === 'dark' : prefersDark);
      }
    };
    checkTheme();
    
    // Écouter les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) {
    // Pendant le SSR, utiliser le logo blanc par défaut (dark mode)
    return (
      <Image
        src="/images/logoBlanc.png"
        alt="VF Images"
        width={120}
        height={40}
        className={className}
        priority
      />
    );
  }

  return (
    <Image
      src={isDark ? '/images/logoBlanc.png' : '/images/logoNoir.png'}
      alt="VF Images"
      width={120}
      height={40}
      className={className}
      priority
    />
  );
}

