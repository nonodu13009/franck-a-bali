'use client';

import { useState, useEffect } from 'react';
import { getAllImages, createImage, updateImage, deleteImage } from '@/lib/firebase/admin-firestore';
import { PhotoForm } from '@/components/admin/photo-form';
import type { Image as ImageType } from '@/types/firebase.type';
import type { PhotoFormData } from '@/types/admin.type';
import Image from 'next/image';

export default function PhotosPage() {
  const [photos, setPhotos] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<ImageType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setIsLoading(true);
      const allPhotos = await getAllImages();
      setPhotos(allPhotos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: PhotoFormData) => {
    try {
      if (editingPhoto) {
        await updateImage(editingPhoto.id, data);
      } else {
        await createImage(data);
      }
      await loadPhotos();
      setShowForm(false);
      setEditingPhoto(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (photo: ImageType) => {
    setEditingPhoto(photo);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      return;
    }

    try {
      await deleteImage(id);
      await loadPhotos();
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
        <h1 className="text-2xl font-bold text-white">Gestion des Photos</h1>
        <button
          onClick={() => {
            setEditingPhoto(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
        >
          + Ajouter une photo
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {showForm && (
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <PhotoForm
            initialData={editingPhoto ? {
              seriesId: editingPhoto.seriesId,
              url: editingPhoto.url,
              alt: editingPhoto.alt,
              altEn: editingPhoto.altEn,
              width: editingPhoto.width,
              height: editingPhoto.height,
              order: editingPhoto.order,
              metadata: editingPhoto.metadata,
            } : undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingPhoto(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-white text-sm mb-2">{photo.alt}</p>
              <p className="text-white/50 text-xs mb-4">
                {photo.width} × {photo.height}px • Ordre: {photo.order}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(photo)}
                  className="flex-1 px-3 py-1 bg-white/10 text-white rounded text-sm hover:bg-white/20 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="flex-1 px-3 py-1 bg-red-500/20 text-red-200 rounded text-sm hover:bg-red-500/30 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-12 text-white/50">
          Aucune photo pour le moment
        </div>
      )}
    </div>
  );
}
