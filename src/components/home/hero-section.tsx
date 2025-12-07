'use client';

import Image from 'next/image';

interface HeroSectionProps {
  imageUrl: string;
  imageAlt: string;
}

export function HeroSection({ imageUrl, imageAlt }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Image immersive plein écran */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay gradient pour contraste texte */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Texte centré */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:bottom-16 lg:bottom-20 z-10 text-center px-4">
        <h1 
          className="font-proxima-nova text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 md:mb-4"
          style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
        >
          VF Images
        </h1>
        <p 
          className="font-lora text-xl md:text-2xl lg:text-3xl text-white/90 italic"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          Instants vrais, regards du monde.
        </p>
      </div>
    </section>
  );
}

