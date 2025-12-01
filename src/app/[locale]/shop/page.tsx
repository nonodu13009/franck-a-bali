import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shop' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shop' });

  // TODO: Replace with actual Printspace integration (API, iframe, or external link)
  const printspaceUrl = 'https://theprintspace.co.uk'; // Placeholder

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 md:mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-muted-foreground mb-8">{t('description')}</p>
        <a
          href={printspaceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors font-medium"
        >
          {t('visitShop')}
        </a>
      </div>

      {/* Placeholder for future Printspace integration */}
      <div className="border border-border rounded-sm p-12 text-center">
        <p className="text-muted-foreground">
          Intégration Printspace à venir (API, iframe ou lien externe)
        </p>
      </div>
    </div>
  );
}

