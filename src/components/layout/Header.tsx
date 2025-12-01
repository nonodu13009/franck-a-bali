import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import styles from './Header.module.css';

export default function Header() {
    const t = useTranslations('Navigation');

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">VF Images</Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><Link href="/">{t('home')}</Link></li>
                    <li><Link href="/gallery">{t('gallery')}</Link></li>
                    <li><Link href="/blog">{t('blog')}</Link></li>
                    <li><Link href="/shop">{t('shop')}</Link></li>
                </ul>
            </nav>
            <div className={styles.langSwitcher}>
                <Link href="/" locale="fr">FR</Link>
                <span className={styles.separator}>/</span>
                <Link href="/" locale="en">EN</Link>
            </div>
        </header>
    );
}
