'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AdaptiveLogoProps {
  className?: string;
}

export function AdaptiveLogo({ className }: AdaptiveLogoProps) {
  const [logoType, setLogoType] = useState<'white' | 'black'>('white');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateLogo = () => {
      const header = document.querySelector('header');
      if (!header) return;

      const heroSection = document.querySelector('[data-hero-section]');
      if (!heroSection) {
        setLogoType('white');
        return;
      }

      const headerRect = header.getBoundingClientRect();
      const heroRect = heroSection.getBoundingClientRect();

      if (headerRect.bottom <= heroRect.top) {
        setLogoType('white');
        return;
      }

      const heroImage = heroSection.querySelector('img') as HTMLImageElement;
      if (!heroImage) {
        setLogoType('white');
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        setLogoType('white');
        return;
      }

      if (!heroImage.complete) {
        heroImage.onload = updateLogo;
        setLogoType('white');
        return;
      }

      try {
        const headerCenterY = headerRect.top + headerRect.height / 2;
        const headerCenterX = headerRect.left + headerRect.width / 2;

        const imageRect = heroImage.getBoundingClientRect();
        const relativeX = headerCenterX - imageRect.left;
        const relativeY = headerCenterY - imageRect.top;

        if (
          relativeX < 0 ||
          relativeY < 0 ||
          relativeX > imageRect.width ||
          relativeY > imageRect.height
        ) {
          setLogoType('white');
          return;
        }

        const sampleSize = 100;
        canvas.width = sampleSize;
        canvas.height = sampleSize;

        const scaleX = heroImage.naturalWidth / imageRect.width;
        const scaleY = heroImage.naturalHeight / imageRect.height;

        const sourceX = Math.max(0, (relativeX * scaleX) - sampleSize / 2);
        const sourceY = Math.max(0, (relativeY * scaleY) - sampleSize / 2);
        const sourceWidth = Math.min(sampleSize, heroImage.naturalWidth - sourceX);
        const sourceHeight = Math.min(sampleSize, heroImage.naturalHeight - sourceY);

        ctx.drawImage(
          heroImage,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          sampleSize,
          sampleSize
        );

        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;
        let totalBrightness = 0;
        let pixelCount = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          totalBrightness += brightness;
          pixelCount++;
        }

        const avgBrightness = totalBrightness / pixelCount;
        setLogoType(avgBrightness > 140 ? 'black' : 'white');
      } catch (error) {
        console.warn('Error analyzing image brightness:', error);
        setLogoType('white');
      }
    };

    // Détecter le scroll pour l'animation
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateLogo, 50);
    };

    const timeoutId = setTimeout(updateLogo, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateLogo);

    const heroSection = document.querySelector('[data-hero-section]');
    if (heroSection) {
      const observer = new MutationObserver(() => {
        setTimeout(updateLogo, 100);
      });
      observer.observe(heroSection, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'class'],
      });

      const images = heroSection.querySelectorAll('img');
      images.forEach((img) => {
        img.addEventListener('load', updateLogo);
      });

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(scrollTimeout);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', updateLogo);
        observer.disconnect();
        images.forEach((img) => {
          img.removeEventListener('load', updateLogo);
        });
      };
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLogo);
    };
  }, []);

  return (
    <div
      className={cn(
        'relative inline-block transition-all duration-500 ease-out',
        isScrolled ? 'scale-110' : 'scale-100',
        isHovered && 'scale-115'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect - halo lumineux */}
      <div
        className={cn(
          'absolute inset-0 blur-2xl opacity-0 transition-all duration-700',
          isHovered && 'opacity-40 scale-125',
          logoType === 'white' ? 'bg-white' : 'bg-black'
        )}
        style={{
          transform: 'scale(1.3)',
          zIndex: -1,
        }}
      />
      
      {/* Glow effect - halo moyen */}
      <div
        className={cn(
          'absolute inset-0 blur-lg opacity-0 transition-all duration-500',
          isHovered && 'opacity-30 scale-115',
          logoType === 'white' ? 'bg-white' : 'bg-black'
        )}
        style={{
          transform: 'scale(1.2)',
          zIndex: -1,
        }}
      />
      
      {/* Logo container avec animation */}
      <div className="relative overflow-hidden">
        <Image
          src={logoType === 'white' ? '/images/logoBlanc.png' : '/images/logoNoir.png'}
          alt="VF Images"
          width={180}
          height={60}
          className={cn(
            className,
            'transition-all duration-500 relative z-10',
            isHovered && 'brightness-110 drop-shadow-2xl'
          )}
          priority
          style={{
            filter: isHovered 
              ? `drop-shadow(0 0 30px ${logoType === 'white' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'})` 
              : 'drop-shadow(0 0 10px rgba(0,0,0,0.3))',
          }}
        />
        
        {/* Effet de brillance animé (shimmer) */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent',
            'transform -skew-x-12 translate-x-[-200%]',
            'transition-transform duration-1000 ease-in-out',
            'pointer-events-none z-20'
          )}
          style={{
            animation: 'shimmer 3s infinite',
          }}
        />
      </div>
    </div>
  );
}
