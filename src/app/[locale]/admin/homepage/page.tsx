'use client';

import { useState, useEffect } from 'react';
import { getHomepageData, updateHomepageData } from '@/lib/firebase/admin-firestore';
import { HomepageEditor } from '@/components/admin/homepage-editor';
import type { HomepageData } from '@/types/admin.type';

export default function HomepagePage() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadHomepageData();
  }, []);

  const loadHomepageData = async () => {
    try {
      setIsLoading(true);
      const data = await getHomepageData();
      setHomepageData(data || {
        heroImage: { src: '', alt: '' },
        masonryImages: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: HomepageData) => {
    try {
      setError(null);
      setSuccess(false);
      await updateHomepageData(data);
      setHomepageData(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    }
  };

  if (isLoading) {
    return <div className="text-white">Chargement...</div>;
  }

  if (!homepageData) {
    return <div className="text-white">Erreur: Données non disponibles</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestion de la Homepage</h1>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
          Homepage mise à jour avec succès !
        </div>
      )}

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <HomepageEditor
          initialData={homepageData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
