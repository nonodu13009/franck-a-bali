'use client';

import { useState, FormEvent } from 'react';
import { z } from 'zod';
import { ImageUploader } from './image-uploader';
import type { BlogFormData } from '@/types/admin.type';

const blogSchema = z.object({
  slug: z.string().min(1, 'Slug requis'),
  title: z.string().min(1, 'Titre requis'),
  titleEn: z.string().min(1, 'Titre (EN) requis'),
  content: z.string().min(1, 'Contenu requis'),
  contentEn: z.string().min(1, 'Contenu (EN) requis'),
  featuredImage: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
  videoRatio: z.enum(['16:9', '9:16']).optional(),
  author: z.string().min(1, 'Auteur requis'),
  excerpt: z.string().optional(),
  excerptEn: z.string().optional(),
});

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => Promise<void>;
  onCancel?: () => void;
}

export function BlogForm({ initialData, onSubmit, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    titleEn: initialData?.titleEn || '',
    content: initialData?.content || '',
    contentEn: initialData?.contentEn || '',
    featuredImage: initialData?.featuredImage || '',
    videoUrl: initialData?.videoUrl || '',
    videoRatio: initialData?.videoRatio,
    author: initialData?.author || 'Franck Vinel',
    excerpt: initialData?.excerpt || '',
    excerptEn: initialData?.excerptEn || '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const validatedData = blogSchema.parse(formData);
      await onSubmit(validatedData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError(err instanceof Error ? err.message : 'Erreur lors de la soumission');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-white mb-2">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="mon-article"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-white mb-2">
            Auteur
          </label>
          <input
            id="author"
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
            Titre (FR)
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>

        <div>
          <label htmlFor="titleEn" className="block text-sm font-medium text-white mb-2">
            Titre (EN)
          </label>
          <input
            id="titleEn"
            type="text"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-white mb-2">
            Extrait (FR)
          </label>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[80px]"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="excerptEn" className="block text-sm font-medium text-white mb-2">
            Extrait (EN)
          </label>
          <textarea
            id="excerptEn"
            value={formData.excerptEn}
            onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[80px]"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
            Contenu (FR)
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[200px]"
            rows={10}
            required
          />
        </div>

        <div>
          <label htmlFor="contentEn" className="block text-sm font-medium text-white mb-2">
            Contenu (EN)
          </label>
          <textarea
            id="contentEn"
            value={formData.contentEn}
            onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[200px]"
            rows={10}
            required
          />
        </div>
      </div>

      <ImageUploader
        label="Image mise en avant"
        storagePath={`blog/${Date.now()}`}
        currentImageUrl={formData.featuredImage}
        onUploadComplete={(url) => setFormData({ ...formData, featuredImage: url })}
        onUploadError={(err) => setError(err)}
      />

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-white mb-2">
          URL vidéo (optionnel)
        </label>
        <input
          id="videoUrl"
          type="url"
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="https://..."
        />
      </div>

      {formData.videoUrl && (
        <div>
          <label htmlFor="videoRatio" className="block text-sm font-medium text-white mb-2">
            Ratio vidéo
          </label>
          <select
            id="videoRatio"
            value={formData.videoRatio || ''}
            onChange={(e) => setFormData({ ...formData, videoRatio: e.target.value as '16:9' | '9:16' | undefined })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="">Sélectionnez un ratio</option>
            <option value="16:9" className="bg-black">16:9</option>
            <option value="9:16" className="bg-black">9:16</option>
          </select>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
