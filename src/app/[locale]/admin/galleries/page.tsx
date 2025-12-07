'use client';

import { useState, useEffect } from 'react';
import { getSeries } from '@/lib/firebase/firestore';
import { createSeries, updateSeries, deleteSeries } from '@/lib/firebase/admin-firestore';
import { GalleryForm } from '@/components/admin/gallery-form';
import type { Series } from '@/types/firebase.type';
import type { GalleryFormData } from '@/types/admin.type';
import Image from 'next/image';

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Series | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    try {
      setIsLoading(true);
      const allGalleries = await getSeries();
      setGalleries(allGalleries);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: GalleryFormData) => {
    try {
      if (editingGallery) {
        await updateSeries(editingGallery.id, data);
      } else {
        await createSeries(data);
      }
      await loadGalleries();
      setShowForm(false);
      setEditingGallery(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (gallery: Series) => {
    setEditingGallery(gallery);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette galerie ?')) {
      return;
    }

    try {
      await deleteSeries(id);
      await loadGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  if (isLoading) {
    return <div className="text-white">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestion des Galeries</h1>
        <button
          onClick={() => {
            setEditingGallery(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
        >
          + Ajouter une galerie
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {showForm && (
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <GalleryForm
            initialData={editingGallery ? {
              title: editingGallery.title,
              titleEn: editingGallery.titleEn,
              description: editingGallery.description,
              descriptionEn: editingGallery.descriptionEn,
              coverImage: editingGallery.coverImage,
              order: editingGallery.order,
              slug: editingGallery.slug,
            } : undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingGallery(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={gallery.coverImage}
                alt={gallery.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">{gallery.title}</h3>
              <p className="text-white/70 text-sm mb-2">{gallery.titleEn}</p>
              <p className="text-white/50 text-xs mb-4">Ordre: {gallery.order}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(gallery)}
                  className="flex-1 px-3 py-1 bg-white/10 text-white rounded text-sm hover:bg-white/20 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(gallery.id)}
                  className="flex-1 px-3 py-1 bg-red-500/20 text-red-200 rounded text-sm hover:bg-red-500/30 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {galleries.length === 0 && (
        <div className="text-center py-12 text-white/50">
          Aucune galerie pour le moment
        </div>
      )}
    </div>
  );
}
