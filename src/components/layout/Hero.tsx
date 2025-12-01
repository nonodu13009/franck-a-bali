import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';

export default function Hero() {
    const t = useTranslations('HomePage');

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>{t('title')}</h1>
                <p className={styles.subtitle}>{t('subtitle')}</p>
                <Link href="/gallery" className={styles.cta}>
                    {t('viewGallery')}
                </Link>
            </div>
        </section>
    );
}
