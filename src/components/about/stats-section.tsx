'use client';

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal.hook';
import { useCounter } from '@/lib/hooks/use-counter.hook';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

interface StatsSectionProps {
  stats: Stat[];
}

function StatItem({ stat, index, isVisible }: { stat: Stat; index: number; isVisible: boolean }) {
  const count = useCounter({
    end: stat.value,
    duration: 2000,
    enabled: isVisible,
  });

  return (
    <div
      className={`text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="text-accent text-5xl mb-4 flex justify-center">
        {stat.icon}
      </div>

      {/* Number */}
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
        {count}
        {stat.suffix && <span className="text-3xl">{stat.suffix}</span>}
      </div>

      {/* Label */}
      <div className="text-lg md:text-xl text-muted-foreground font-medium">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection({ stats }: StatsSectionProps) {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className="py-20 md:py-32 bg-muted"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

