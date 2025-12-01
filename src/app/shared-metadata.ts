import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        template: '%s | VF Images',
        default: 'VF Images - Portfolio Photographique',
    },
    description: 'Portfolio de photographie professionnelle. Séries Travel, Street, Noir & Blanc. Tirages disponibles.',
    openGraph: {
        title: 'VF Images',
        description: 'Portfolio de photographie professionnelle.',
        url: 'https://www.vfimages.com',
        siteName: 'VF Images',
        images: [
            {
                url: 'https://www.vfimages.com/images/og-image.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'fr_FR',
        type: 'website',
    },
};
