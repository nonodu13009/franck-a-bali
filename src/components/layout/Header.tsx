'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './language-switcher';
import { AdaptiveLogo } from './adaptive-logo';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/gallery`, label: t('gallery') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/shop`, label: t('shop') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-lg border-b border-white/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center z-10">
            <AdaptiveLogo className="h-12 md:h-16 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-all duration-300 hover:text-foreground relative group',
                  pathname === item.href
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
                <span className={cn(
                  'absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300',
                  pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </Link>
            ))}
          </div>

          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}

