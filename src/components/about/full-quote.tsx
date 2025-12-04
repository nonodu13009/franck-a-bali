'use client';

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal.hook';

interface FullQuoteProps {
  quote: string;
  author?: string;
}

export function FullQuote({ quote, author }: FullQuoteProps) {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background avec gradient tropical */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary-light to-primary-dark opacity-95" />
      
      {/* Pattern subtil (optionnel) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0"
style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.1) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Guillemet ouvrant décoratif */}
        <div className="text-sand text-6xl md:text-8xl font-serif mb-4 opacity-50">&ldquo;</div>
        
        <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary-foreground leading-relaxed italic mb-8">
          {quote}
        </blockquote>

        {author && (
          <cite className="not-italic text-primary-foreground/80 text-lg md:text-xl font-sans">
            — {author}
          </cite>
        )}

        {/* Bordures décoratives */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="h-0.5 w-16 bg-sand" />
          <div className="h-0.5 w-8 bg-sand/50" />
        </div>
      </div>
    </section>
  );
}

