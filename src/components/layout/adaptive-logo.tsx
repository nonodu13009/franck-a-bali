'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AdaptiveLogoProps {
  className?: string;
}

export function AdaptiveLogo({ className }: AdaptiveLogoProps) {
  const [logoType, setLogoType] = useState<'white' | 'black'>('white');
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
        'relative inline-block transition-all duration-300 ease-out',
        isHovered && 'scale-105'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo simple sans effets */}
      <Image
        src={logoType === 'white' ? '/images/logoBlanc.png' : '/images/logoNoir.png'}
        alt="VF Images"
        width={180}
        height={60}
        className={cn(
          className,
          'transition-all duration-300'
        )}
        priority
      />
    </div>
  );
}
