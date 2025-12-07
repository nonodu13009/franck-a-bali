'use client';

import { useState, FormEvent, useEffect } from 'react';
import { z } from 'zod';
import { ImageUploader } from './image-uploader';
import { getSeries } from '@/lib/firebase/firestore';
import type { Series } from '@/types/firebase.type';
import type { PhotoFormData } from '@/types/admin.type';

const photoSchema = z.object({
  seriesId: z.string().min(1, 'Sélectionnez une galerie'),
  url: z.string().url('URL invalide'),
  alt: z.string().min(1, 'Texte alternatif requis'),
  altEn: z.string().min(1, 'Texte alternatif (EN) requis'),
  width: z.number().positive('Largeur doit être positive'),
  height: z.number().positive('Hauteur doit être positive'),
  order: z.number().int().min(0, 'Ordre doit être positif'),
});

interface PhotoFormProps {
  initialData?: Partial<PhotoFormData>;
  onSubmit: (data: PhotoFormData) => Promise<void>;
  onCancel?: () => void;
}

export function PhotoForm({ initialData, onSubmit, onCancel }: PhotoFormProps) {
  const [formData, setFormData] = useState<PhotoFormData>({
    seriesId: initialData?.seriesId || '',
    url: initialData?.url || '',
    alt: initialData?.alt || '',
    altEn: initialData?.altEn || '',
    width: initialData?.width || 1920,
    height: initialData?.height || 1080,
    order: initialData?.order || 0,
    metadata: initialData?.metadata || {},
  });

  const [series, setSeries] = useState<Series[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      const loadSeries = async () => {
      try {
        const allSeries = await getSeries();
        setSeries(allSeries);
      } catch {
        setError('Erreur lors du chargement des galeries');
      }
    };
    loadSeries();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const validatedData = photoSchema.parse(formData);
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
      <div>
        <label htmlFor="seriesId" className="block text-sm font-medium text-white mb-2">
          Galerie
        </label>
        <select
          id="seriesId"
          value={formData.seriesId}
          onChange={(e) => setFormData({ ...formData, seriesId: e.target.value })}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          required
        >
          <option value="">Sélectionnez une galerie</option>
          {series.map((s) => (
            <option key={s.id} value={s.id} className="bg-black">
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <ImageUploader
        label="Image"
        storagePath={`images/${Date.now()}`}
        currentImageUrl={formData.url}
        onUploadComplete={(url) => setFormData({ ...formData, url })}
        onUploadError={(err) => setError(err)}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-white mb-2">
            Largeur (px)
          </label>
          <input
            id="width"
            type="number"
            value={formData.width}
            onChange={(e) => setFormData({ ...formData, width: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-white mb-2">
            Hauteur (px)
          </label>
          <input
            id="height"
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="alt" className="block text-sm font-medium text-white mb-2">
          Texte alternatif (FR)
        </label>
        <input
          id="alt"
          type="text"
          value={formData.alt}
          onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          required
        />
      </div>

      <div>
        <label htmlFor="altEn" className="block text-sm font-medium text-white mb-2">
          Texte alternatif (EN)
        </label>
        <input
          id="altEn"
          type="text"
          value={formData.altEn}
          onChange={(e) => setFormData({ ...formData, altEn: e.target.value })}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          required
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
