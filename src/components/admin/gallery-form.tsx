'use client';

import { useState, FormEvent } from 'react';
import { z } from 'zod';
import { ImageUploader } from './image-uploader';
import type { GalleryFormData } from '@/types/admin.type';

const gallerySchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  titleEn: z.string().min(1, 'Titre (EN) requis'),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  coverImage: z.string().url('URL de couverture invalide'),
  order: z.number().int().min(0, 'Ordre doit être positif'),
  slug: z.string().optional(),
});

interface GalleryFormProps {
  initialData?: Partial<GalleryFormData>;
  onSubmit: (data: GalleryFormData) => Promise<void>;
  onCancel?: () => void;
}

export function GalleryForm({ initialData, onSubmit, onCancel }: GalleryFormProps) {
  const [formData, setFormData] = useState<GalleryFormData>({
    title: initialData?.title || '',
    titleEn: initialData?.titleEn || '',
    description: initialData?.description || '',
    descriptionEn: initialData?.descriptionEn || '',
    coverImage: initialData?.coverImage || '',
    order: initialData?.order || 0,
    slug: initialData?.slug || '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const validatedData = gallerySchema.parse(formData);
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
          <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
            Description (FR)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[100px]"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="descriptionEn" className="block text-sm font-medium text-white mb-2">
            Description (EN)
          </label>
          <textarea
            id="descriptionEn"
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[100px]"
            rows={4}
          />
        </div>
      </div>

      <ImageUploader
        label="Image de couverture"
        storagePath={`series/${Date.now()}`}
        currentImageUrl={formData.coverImage}
        onUploadComplete={(url) => setFormData({ ...formData, coverImage: url })}
        onUploadError={(err) => setError(err)}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-white mb-2">
            Slug (optionnel)
          </label>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="ma-galerie"
          />
        </div>

        <div>
          <label htmlFor="order" className="block text-sm font-medium text-white mb-2">
            Ordre d&apos;affichage
          </label>
          <input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>
      </div>

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
