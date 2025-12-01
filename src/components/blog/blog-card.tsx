import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/firebase.type';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const title = locale === 'en' ? post.titleEn : post.title;
  const excerpt = locale === 'en' ? post.excerptEn : post.excerpt;
  const publishedDate = new Date((post.publishedAt as { seconds: number; nanoseconds: number }).seconds * 1000).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'fr-FR',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block overflow-hidden rounded-sm border border-border hover:border-foreground/20 transition-colors"
    >
      {post.featuredImage && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={post.featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-foreground transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{publishedDate}</span>
          <span>{post.author}</span>
        </div>
      </div>
    </Link>
  );
}

