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
    <article className="group elevated transition-all duration-500 hover:elevated-high hover:glow-subtle rounded-sm overflow-hidden">
      {/* Image avec effets de profondeur */}
      {post.featuredImage && (
        <Link href={`/${locale}/blog/${post.slug}`} className="relative block aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={post.featuredImage}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Bordure subtile */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
        </Link>
      )}
      
      {/* Contenu avec gradient shine */}
      <Link href={`/${locale}/blog/${post.slug}`} className="block p-6 gradient-shine">
        <div className="space-y-4">
          {/* Date */}
          <time className="text-xs text-muted-foreground uppercase tracking-wider">
            {publishedDate}
          </time>
          
          {/* Titre */}
          <h3 className="text-xl font-semibold text-foreground group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          
          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {excerpt}
            </p>
          )}
          
          {/* Footer avec auteur */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-xs text-muted-foreground">{post.author}</span>
            <span className="text-xs text-accent group-hover:text-accent-warm transition-colors">
              Lire la suite →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

