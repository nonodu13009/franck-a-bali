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
                data-nav-link
                className={cn(
                  'text-sm transition-all duration-300 relative group px-1 py-2',
                  pathname === item.href
                    ? 'text-white font-medium'
                    : 'text-white/70 hover:text-white'
                )}
              >
                {item.label}
                {/* Effet élégant : dot lumineux pour l'item actif */}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                )}
                {/* Hover effect subtil */}
                <span className={cn(
                  'absolute inset-0 -z-10 rounded opacity-0 transition-opacity duration-300',
                  'group-hover:opacity-100',
                  pathname !== item.href && 'bg-white/5'
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

