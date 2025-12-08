'use client';

import { useState, FormEvent } from 'react';
import { ImageUploader } from './image-uploader';
import Image from 'next/image';
import type { AboutData, AboutSection, AboutCTA } from '@/types/admin.type';

interface AboutEditorProps {
  initialData?: AboutData;
  onSubmit: (data: AboutData) => Promise<void>;
}

export function AboutEditor({ initialData, onSubmit }: AboutEditorProps) {
  const [heroImage, setHeroImage] = useState({
    src: initialData?.heroImage.src || '',
    alt: initialData?.heroImage.alt || '',
  });

  const [sections, setSections] = useState<AboutSection[]>(
    initialData?.sections || []
  );

  const [cta, setCta] = useState<AboutCTA>(
    initialData?.cta || {
      title: '',
      titleEn: '',
      subtitle: '',
      subtitleEn: '',
      galleryButton: '',
      galleryButtonEn: '',
      shopButton: '',
      shopButtonEn: '',
    }
  );

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        text: '',
        textEn: '',
        image: '',
        imageAlt: '',
        imageAltEn: '',
        position: 'right',
        order: sections.length,
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleUpdateSection = (
    index: number,
    field: keyof AboutSection,
    value: string | number
  ) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data: AboutData = {
        heroImage,
        sections: sections.map((section, index) => ({
          ...section,
          order: index,
        })),
        cta,
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
      {/* Hero Image */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Image Hero</h3>
        <ImageUploader
          label="Image hero"
          storagePath={`about/hero-${Date.now()}`}
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

      {/* Sections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Sections</h3>
          <button
            type="button"
            onClick={handleAddSection}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            + Ajouter une section
          </button>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Section {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveSection(index)}
                  className="px-3 py-1 bg-red-500/20 text-red-200 rounded text-sm hover:bg-red-500/30 transition-colors"
                >
                  Supprimer
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Texte (FR)
                  </label>
                  <textarea
                    value={section.text}
                    onChange={(e) => handleUpdateSection(index, 'text', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[100px]"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Texte (EN)
                  </label>
                  <textarea
                    value={section.textEn}
                    onChange={(e) => handleUpdateSection(index, 'textEn', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[100px]"
                    rows={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Texte alternatif image (FR)
                  </label>
                  <input
                    type="text"
                    value={section.imageAlt}
                    onChange={(e) => handleUpdateSection(index, 'imageAlt', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Texte alternatif image (EN)
                  </label>
                  <input
                    type="text"
                    value={section.imageAltEn}
                    onChange={(e) => handleUpdateSection(index, 'imageAltEn', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>

              {section.image ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <ImageUploader
                  label="Image de la section"
                  storagePath={`about/section-${Date.now()}-${index}`}
                  onUploadComplete={(url) => handleUpdateSection(index, 'image', url)}
                  onUploadError={(err) => setError(err)}
                />
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Position de l&apos;image
                </label>
                <select
                  value={section.position}
                  onChange={(e) => handleUpdateSection(index, 'position', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="right" className="bg-black">Droite</option>
                  <option value="left" className="bg-black">Gauche</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Call to Action</h3>
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Titre (FR)
              </label>
              <input
                type="text"
                value={cta.title}
                onChange={(e) => setCta({ ...cta, title: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Titre (EN)
              </label>
              <input
                type="text"
                value={cta.titleEn}
                onChange={(e) => setCta({ ...cta, titleEn: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Sous-titre (FR)
              </label>
              <input
                type="text"
                value={cta.subtitle}
                onChange={(e) => setCta({ ...cta, subtitle: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Sous-titre (EN)
              </label>
              <input
                type="text"
                value={cta.subtitleEn}
                onChange={(e) => setCta({ ...cta, subtitleEn: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Bouton Galerie (FR)
              </label>
              <input
                type="text"
                value={cta.galleryButton}
                onChange={(e) => setCta({ ...cta, galleryButton: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Bouton Galerie (EN)
              </label>
              <input
                type="text"
                value={cta.galleryButtonEn}
                onChange={(e) => setCta({ ...cta, galleryButtonEn: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Bouton Boutique (FR)
              </label>
              <input
                type="text"
                value={cta.shopButton}
                onChange={(e) => setCta({ ...cta, shopButton: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Bouton Boutique (EN)
              </label>
              <input
                type="text"
                value={cta.shopButtonEn}
                onChange={(e) => setCta({ ...cta, shopButtonEn: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
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
