'use client';

import Image from 'next/image';
import { useParallax } from '@/lib/hooks/use-parallax.hook';

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function ParallaxHero({ title, subtitle, imageUrl }: ParallaxHeroProps) {
  const { elementRef: bgRef, offset: bgOffset } = useParallax({ speed: 0.3 });
  const { elementRef: contentRef, offset: contentOffset } = useParallax({ speed: 0.1 });

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer - Parallax lent */}
      <div
        ref={bgRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${bgOffset}px)`,
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-jungle/80 via-jungle/50 to-ocean/70 z-10" />
        <Image
          src={imageUrl}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content Layer - Parallax normal */}
      <div
        ref={contentRef as React.RefObject<HTMLDivElement>}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        style={{
          transform: `translateY(${contentOffset}px)`,
          willChange: 'transform',
        }}
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-in">
          {title}
        </h1>
        <p className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 italic max-w-3xl mx-auto animate-fade-in-delay">
          {subtitle}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/70">
          <span className="text-sm uppercase tracking-widest">Découvrir</span>
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

