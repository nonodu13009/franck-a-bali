'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { getCurrentUser, onAuthStateChange } from '@/lib/firebase/auth';
import { auth } from '@/lib/firebase/config';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier que Firebase Auth est initialisé
    if (!auth) {
      console.warn('[useAuth] Firebase Auth is not initialized');
      setIsLoading(false);
      return;
    }

    // Vérifier l'utilisateur actuel immédiatement
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);

    // Écouter les changements d'état d'authentification
    const unsubscribe = onAuthStateChange((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
