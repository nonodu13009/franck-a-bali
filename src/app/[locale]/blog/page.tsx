import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog/blog-card';
import { mockBlogPosts } from '@/lib/mock-data';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

async function BlogPostsList({ locale }: { locale: string }) {
  // Utiliser les articles mockés, triés par date décroissante
  const posts = [...mockBlogPosts].sort((a, b) => {
    const dateA = new Date((a.publishedAt as { seconds: number }).seconds * 1000);
    const dateB = new Date((b.publishedAt as { seconds: number }).seconds * 1000);
    return dateB.getTime() - dateA.getTime();
  });

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun article disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} locale={locale} />
      ))}
    </div>
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 elevated-high">{t('title')}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('description')}</p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-muted animate-pulse rounded-sm elevated"
              />
            ))}
          </div>
        }
      >
        <BlogPostsList locale={locale} />
      </Suspense>
    </div>
  );
}

