import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/firebase/firestore';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const title = locale === 'en' ? post.titleEn : post.title;
  const excerpt = locale === 'en' ? post.excerptEn : post.excerpt;

  return {
    title,
    description: excerpt || title,
    openGraph: {
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = locale === 'en' ? post.titleEn : post.title;
  const content = locale === 'en' ? post.contentEn : post.content;
  const publishedDate = new Date(
    (post.publishedAt as { seconds: number; nanoseconds: number }).seconds * 1000
  ).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={new Date((post.publishedAt as { seconds: number; nanoseconds: number }).seconds * 1000).toISOString()}>
            {publishedDate}
          </time>
          <span>•</span>
          <span>{post.author}</span>
        </div>
      </header>

      {post.featuredImage && (
        <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-sm bg-muted">
          <Image
            src={post.featuredImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}

