'use client';

import { useEffect, useRef } from 'react';

export function ClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Créer l'élément audio
    const audio = new Audio('/sounds/bali-gong.mp3');
    audio.volume = 0.15; // Volume très réduit pour un son plus subtil
    audio.preload = 'auto';
    audioRef.current = audio;

    // Fonction pour jouer le son uniquement sur les liens de navigation
    const playSound = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Vérifier si le clic est sur un lien de navigation ou un de ses enfants
      const navLink = target.closest('[data-nav-link]');
      
      if (navLink && audioRef.current) {
        // Réinitialiser et jouer
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          // Gérer l'erreur silencieusement (autoplay policy)
          console.log('Audio playback prevented:', error);
        });
      }
    };

    // Ajouter l'écouteur de clic sur le document
    document.addEventListener('click', playSound);

    return () => {
      // Nettoyer l'écouteur
      document.removeEventListener('click', playSound);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
}

