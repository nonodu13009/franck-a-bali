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
    <article className="group transition-all duration-500 rounded-sm overflow-hidden bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10">
      {/* Image avec effets de profondeur */}
      {post.featuredImage && (
        <Link href={`/${locale}/blog/${post.slug}`} className="relative block aspect-video w-full overflow-hidden bg-black">
          <Image
            src={post.featuredImage}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      
      {/* Contenu avec meilleur contraste */}
      <Link href={`/${locale}/blog/${post.slug}`} className="block p-6">
        <div className="space-y-4">
          {/* Date */}
          <time className="text-xs text-white/50 uppercase tracking-wider">
            {publishedDate}
          </time>
          
          {/* Titre */}
          <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
          
          {/* Excerpt */}
        {excerpt && (
            <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        )}
          
          {/* Footer avec auteur */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-white/60">{post.author}</span>
            <span className="text-xs text-white/80 group-hover:text-white transition-colors">
              Lire la suite →
            </span>
        </div>
      </div>
    </Link>
    </article>
  );
}

