'use client';

import { useState, FormEvent } from 'react';
import { ImageUploader } from './image-uploader';
import Image from 'next/image';
import type { HomepageData } from '@/types/admin.type';

interface HomepageEditorProps {
  initialData?: HomepageData;
  onSubmit: (data: HomepageData) => Promise<void>;
}

export function HomepageEditor({ initialData, onSubmit }: HomepageEditorProps) {
  const [heroImage, setHeroImage] = useState({
    src: initialData?.heroImage.src || '',
    alt: initialData?.heroImage.alt || '',
  });

  const [masonryImages, setMasonryImages] = useState(
    initialData?.masonryImages || []
  );

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMasonryImage = () => {
    setMasonryImages([
      ...masonryImages,
      {
        src: '',
        alt: '',
        orientation: 'landscape' as const,
        order: masonryImages.length,
      },
    ]);
  };

  const handleRemoveMasonryImage = (index: number) => {
    setMasonryImages(masonryImages.filter((_, i) => i !== index));
  };

  const handleUpdateMasonryImage = (
    index: number,
    field: keyof HomepageData['masonryImages'][0],
    value: string | number
  ) => {
    const updated = [...masonryImages];
    updated[index] = { ...updated[index], [field]: value };
    setMasonryImages(updated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data: HomepageData = {
        heroImage,
        masonryImages: masonryImages.map((img, index) => ({
          ...img,
          order: index,
        })),
      };
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Image Hero</h3>
        <ImageUploader
          label="Image hero"
          storagePath={`homepage/hero-${Date.now()}`}
          currentImageUrl={heroImage.src}
          onUploadComplete={(url) => setHeroImage({ ...heroImage, src: url })}
          onUploadError={(err) => setError(err)}
        />
        <div className="mt-4">
          <label htmlFor="heroAlt" className="block text-sm font-medium text-white mb-2">
            Texte alternatif
          </label>
          <input
            id="heroAlt"
            type="text"
            value={heroImage.alt}
            onChange={(e) => setHeroImage({ ...heroImage, alt: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Images Masonry</h3>
          <button
            type="button"
            onClick={handleAddMasonryImage}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            + Ajouter une image
          </button>
        </div>

        <div className="space-y-4">
          {masonryImages.map((image, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-3">
                  {image.src ? (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <ImageUploader
                      label=""
                      storagePath={`homepage/masonry-${Date.now()}-${index}`}
                      onUploadComplete={(url) =>
                        handleUpdateMasonryImage(index, 'src', url)
                      }
                      onUploadError={(err) => setError(err)}
                    />
                  )}
                </div>

                <div className="col-span-8 space-y-2">
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) =>
                      handleUpdateMasonryImage(index, 'alt', e.target.value)
                    }
                    placeholder="Texte alternatif"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <select
                    value={image.orientation}
                    onChange={(e) =>
                      handleUpdateMasonryImage(
                        index,
                        'orientation',
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="landscape" className="bg-black">Paysage</option>
                    <option value="portrait" className="bg-black">Portrait</option>
                    <option value="wide" className="bg-black">Large</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveMasonryImage(index)}
                    className="w-full px-3 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
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
          {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </form>
  );
}
