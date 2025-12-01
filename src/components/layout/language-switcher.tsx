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
        className={`px-3 py-1 text-sm transition-colors ${
          locale === 'fr'
            ? 'text-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        disabled={isPending}
        aria-label="Switch to French"
      >
        FR
      </button>
      <span className="text-muted-foreground">/</span>
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 text-sm transition-colors ${
          locale === 'en'
            ? 'text-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        disabled={isPending}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}

