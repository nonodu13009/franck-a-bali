import { getAllPosts } from '@/lib/blog';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const posts = getAllPosts(locale);
    const t = useTranslations('Blog');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t('title')}</h1>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                        <p className={styles.date}>{post.date}</p>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
