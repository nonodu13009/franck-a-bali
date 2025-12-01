import { getSeriesById } from '@/lib/images';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export default async function SeriesPage({
    params
}: {
    params: Promise<{ locale: string; series: string }>;
}) {
    const { locale, series } = await params;
    const data = getSeriesById(series);

    if (!data) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{data.title[locale as 'en' | 'fr']}</h1>
                <p className={styles.description}>{data.description[locale as 'en' | 'fr']}</p>
            </header>
            <PhotoGrid images={data.images} locale={locale as 'en' | 'fr'} />
        </div>
    );
}
