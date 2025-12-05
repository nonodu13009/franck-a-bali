'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLocale('fr')}
        className={`px-3 py-1 text-sm font-medium transition-colors ${
          locale === 'fr'
            ? 'text-white'
            : 'text-white/60 hover:text-white'
        }`}
        disabled={isPending}
        aria-label="Switch to French"
      >
        FR
      </button>
      <span className="text-white/40">/</span>
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'text-white'
            : 'text-white/60 hover:text-white'
        }`}
        disabled={isPending}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}

