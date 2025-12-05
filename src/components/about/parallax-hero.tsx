'use client';

import { useParallax } from '@/lib/hooks/use-parallax.hook';

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  imageUrl: string; // Gardé pour compatibilité mais non utilisé
}

export function ParallaxHero({ title, subtitle }: ParallaxHeroProps) {
  const { elementRef: contentRef, offset: contentOffset } = useParallax({ speed: 0.1 });

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black" data-hero-section>
      {/* Content Layer - Fond noir pur sans image */}
      <div
        ref={contentRef as React.RefObject<HTMLDivElement>}
        className="relative z-30 text-center px-6 max-w-5xl mx-auto"
        style={{
          transform: `translateY(${contentOffset}px)`,
          willChange: 'transform',
        }}
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in">
          {title}
        </h1>
        <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white/80 italic max-w-3xl mx-auto animate-fade-in-delay">
          {subtitle}
        </p>
      </div>

      {/* Scroll Indicator simple */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
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

