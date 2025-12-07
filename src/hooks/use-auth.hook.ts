'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { getCurrentUser, onAuthStateChange } from '@/lib/firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
