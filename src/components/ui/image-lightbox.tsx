'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  imageUrl: string;
  imageAlt: string;
  isOpen: boolean;
  onClose: () => void;
  description?: string;
}

export function ImageLightbox({
  imageUrl,
  imageAlt,
  isOpen,
  onClose,
  description,
}: ImageLightboxProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Empêcher le scroll du body quand le lightbox est ouvert
      document.body.style.overflow = 'hidden';
    } else {
      // Réactiver le scroll et réinitialiser l'état
      document.body.style.overflow = '';
      setShowDescription(false);
      // Nettoyer le timeout si le lightbox se ferme
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = null;
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsAnimating(false);
      // Petit délai pour l'animation de sortie
      setTimeout(() => {
        onClose();
      }, 200);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        {/* Overlay assombri avec animation */}
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/90 backdrop-blur-sm transition-opacity duration-300',
            isAnimating ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onClose}
        />

        {/* Contenu du lightbox */}
        <Dialog.Content
          className={cn(
            'fixed inset-4 z-50 flex items-center justify-center',
            'outline-none'
          )}
          onPointerDownOutside={onClose}
          onEscapeKeyDown={onClose}
        >
          <div
            className={cn(
              'relative w-full h-full max-w-7xl max-h-[90vh]',
              'flex items-center justify-center',
              'transition-all duration-500 ease-out',
              isAnimating
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90'
            )}
            onMouseEnter={() => {
              if (description) {
                setShowDescription(true);
                // Annuler le timeout mobile si présent
                if (touchTimeoutRef.current) {
                  clearTimeout(touchTimeoutRef.current);
                  touchTimeoutRef.current = null;
                }
              }
            }}
            onMouseLeave={() => {
              setShowDescription(false);
            }}
            onTouchStart={() => {
              if (description) {
                setShowDescription(true);
                // Nettoyer le timeout précédent s'il existe
                if (touchTimeoutRef.current) {
                  clearTimeout(touchTimeoutRef.current);
                }
                // Délai de 3 secondes pour permettre la lecture du texte sur mobile
                touchTimeoutRef.current = setTimeout(() => {
                  setShowDescription(false);
                  touchTimeoutRef.current = null;
                }, 3000);
              }
            }}
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-contain"
                sizes="100vw"
                quality={95}
                priority
              />
            </div>

            {/* Bouton de fermeture */}
            <Dialog.Close
              className={cn(
                'absolute top-4 right-4 p-2',
                'bg-black/60 hover:bg-black/80',
                'rounded-sm transition-colors duration-200',
                'z-10',
                'focus:outline-none focus:ring-2 focus:ring-white/50'
              )}
              aria-label="Fermer"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Dialog.Close>

            {/* Texte descriptif avec animation */}
            {description && (
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0',
                  'bg-black/60 backdrop-blur-sm',
                  'px-6 py-4 md:px-8 md:py-6',
                  'transition-all duration-[400ms] ease-in-out',
                  showDescription
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                )}
                style={{
                  boxShadow: showDescription 
                    ? '0 -4px 20px rgba(0, 0, 0, 0.3)' 
                    : 'none'
                }}
              >
                <p className="text-white/95 text-base md:text-lg lg:text-xl max-w-4xl mx-auto text-center leading-relaxed font-light">
                  {description}
                </p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
