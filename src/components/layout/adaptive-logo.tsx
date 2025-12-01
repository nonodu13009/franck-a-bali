'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface AdaptiveLogoProps {
  className?: string;
}

export function AdaptiveLogo({ className }: AdaptiveLogoProps) {
  const [logoType, setLogoType] = useState<'white' | 'black'>('white');

  useEffect(() => {
    const updateLogo = () => {
      const header = document.querySelector('header');
      if (!header) return;

      const heroSection = document.querySelector('[data-hero-section]');
      if (!heroSection) {
        // Pas de hero section, utiliser logo blanc (fond sombre par défaut)
        setLogoType('white');
        return;
      }

      const headerRect = header.getBoundingClientRect();
      const heroRect = heroSection.getBoundingClientRect();

      // Si le header est complètement au-dessus de la section hero
      if (headerRect.bottom <= heroRect.top) {
        setLogoType('white');
        return;
      }

      // Si le header chevauche la section hero, analyser la luminosité
      const heroImage = heroSection.querySelector('img') as HTMLImageElement;
      if (!heroImage) {
        setLogoType('white');
        return;
      }

      // Créer un canvas pour analyser la luminosité
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        setLogoType('white');
        return;
      }

      // Attendre que l'image soit chargée
      if (!heroImage.complete) {
        heroImage.onload = updateLogo;
        setLogoType('white');
        return;
      }

      try {
        // Calculer la zone à analyser (centre du header)
        const headerCenterY = headerRect.top + headerRect.height / 2;
        const headerCenterX = headerRect.left + headerRect.width / 2;

        const imageRect = heroImage.getBoundingClientRect();
        const relativeX = headerCenterX - imageRect.left;
        const relativeY = headerCenterY - imageRect.top;

        // Vérifier que la position est dans l'image
        if (
          relativeX < 0 ||
          relativeY < 0 ||
          relativeX > imageRect.width ||
          relativeY > imageRect.height
        ) {
          setLogoType('white');
          return;
        }

        // Taille de l'échantillon à analyser
        const sampleSize = 100;
        canvas.width = sampleSize;
        canvas.height = sampleSize;

        // Calculer les coordonnées dans l'image source
        const scaleX = heroImage.naturalWidth / imageRect.width;
        const scaleY = heroImage.naturalHeight / imageRect.height;

        const sourceX = Math.max(0, (relativeX * scaleX) - sampleSize / 2);
        const sourceY = Math.max(0, (relativeY * scaleY) - sampleSize / 2);
        const sourceWidth = Math.min(sampleSize, heroImage.naturalWidth - sourceX);
        const sourceHeight = Math.min(sampleSize, heroImage.naturalHeight - sourceY);

        // Dessiner l'échantillon
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

        // Analyser la luminosité
        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;
        let totalBrightness = 0;
        let pixelCount = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Formule de luminosité perçue
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          totalBrightness += brightness;
          pixelCount++;
        }

        const avgBrightness = totalBrightness / pixelCount;

        // Seuil de luminosité : > 140 = clair (logo noir), <= 140 = sombre (logo blanc)
        setLogoType(avgBrightness > 140 ? 'black' : 'white');
      } catch (error) {
        // En cas d'erreur (CORS, etc.), utiliser logo blanc
        console.warn('Error analyzing image brightness:', error);
        setLogoType('white');
      }
    };

    // Délai pour s'assurer que le DOM est prêt
    const timeoutId = setTimeout(updateLogo, 100);

    // Mettre à jour lors du scroll (avec debounce)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateLogo, 50);
    };

    // Mettre à jour lors du resize
    const handleResize = () => {
      updateLogo();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Observer les changements dans le hero slider
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

      // Observer les changements d'image
      const images = heroSection.querySelectorAll('img');
      images.forEach((img) => {
        img.addEventListener('load', updateLogo);
      });

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(scrollTimeout);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Image
      src={logoType === 'white' ? '/images/logoBlanc.png' : '/images/logoNoir.png'}
      alt="VF Images"
      width={120}
      height={40}
      className={`${className} transition-opacity duration-300`}
      priority
    />
  );
}

