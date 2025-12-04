'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal.hook';

interface TextImageSectionProps {
  text: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  priority?: boolean;
}

export function TextImageSection({
  text,
  imageUrl,
  imageAlt,
  imagePosition = 'right',
  priority = false,
}: TextImageSectionProps) {
  const { elementRef: textRef, isVisible: textVisible } = useScrollReveal({
    threshold: 0.2,
    delay: 200,
  });
  const { elementRef: imageRef, isVisible: imageVisible } = useScrollReveal({
    threshold: 0.2,
    delay: 400,
  });

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Text */}
      <div
        ref={textRef as React.RefObject<HTMLDivElement>}
        className={`space-y-6 transition-all duration-1000 ${
          imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
        } ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <p className="text-lg md:text-xl leading-relaxed text-foreground/90 font-sans">
          {text}
        </p>
      </div>

      {/* Image */}
      <div
        ref={imageRef as React.RefObject<HTMLDivElement>}
        className={`relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ${
          imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
        } ${imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-jungle/20 to-transparent z-10" />
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
    </section>
  );
}

