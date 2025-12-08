'use client';

import { useState, useEffect } from 'react';
import { getAboutData, updateAboutData } from '@/lib/firebase/admin-firestore';
import { AboutEditor } from '@/components/admin/about-editor';
import type { AboutData } from '@/types/admin.type';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    try {
      setIsLoading(true);
      const data = await getAboutData();
      setAboutData(data || {
        heroImage: { src: '', alt: '' },
        sections: [],
        cta: {
          title: '',
          titleEn: '',
          subtitle: '',
          subtitleEn: '',
          galleryButton: '',
          galleryButtonEn: '',
          shopButton: '',
          shopButtonEn: '',
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: AboutData) => {
    try {
      setError(null);
      setSuccess(false);
      await updateAboutData(data);
      setAboutData(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    }
  };

  if (isLoading) {
    return <div className="text-white">Chargement...</div>;
  }

  if (!aboutData) {
    return <div className="text-white">Erreur: Données non disponibles</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestion de la page About</h1>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
          Page About mise à jour avec succès !
        </div>
      )}

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <AboutEditor
          initialData={aboutData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
