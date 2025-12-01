import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function ShopPage() {
    const t = useTranslations('Shop');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.description}>{t('description')}</p>
            <div className={styles.content}>
                {/* Placeholder for shop integration or instructions */}
                <p>The Printspace integration coming soon.</p>
            </div>
        </div>
    );
}
