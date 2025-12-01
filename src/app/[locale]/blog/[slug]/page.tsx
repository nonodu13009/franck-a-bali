import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const post = getPostBySlug(slug, locale);

    if (!post) {
        notFound();
    }

    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.date}>{post.date}</p>
            </header>
            <div className={styles.content}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
}
