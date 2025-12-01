import { Link } from '@/navigation';
import { getAllSeries } from '@/lib/images';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './page.module.css';

export default async function GalleryIndex({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const series = getAllSeries();
    const t = useTranslations('GalleryIndex');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t('title')}</h1>
            <div className={styles.grid}>
                {series.map((s) => (
                    <Link key={s.id} href={`/gallery/${s.id}`} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={s.coverImage}
                                alt={s.title[locale as 'en' | 'fr']}
                                fill
                                className={styles.cover}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <h2 className={styles.seriesTitle}>{s.title[locale as 'en' | 'fr']}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
