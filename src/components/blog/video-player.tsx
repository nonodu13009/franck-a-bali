'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  ratio?: '16:9' | '9:16';
  title?: string;
}

export function VideoPlayer({ videoUrl, ratio = '16:9', title }: VideoPlayerProps) {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Classes d'aspect ratio selon le format
  const aspectClass = ratio === '9:16' ? 'aspect-[9/16]' : 'aspect-video';
  
  // Max width selon le ratio (vertical = plus étroit)
  const maxWidthClass = ratio === '9:16' ? 'max-w-2xl' : 'max-w-4xl';

  if (videoError) {
    return (
      <div className={`${maxWidthClass} mx-auto mb-8`}>
        <div className={`relative ${aspectClass} w-full bg-black/50 rounded-sm border border-white/10 flex items-center justify-center`}>
          <div className="text-center px-6">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <p className="text-white/60 text-sm">
              Impossible de charger la vidéo
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${maxWidthClass} mx-auto mb-8`}>
      <div className={`relative ${aspectClass} w-full bg-black rounded-sm overflow-hidden border border-white/5`}>
        {/* Loader pendant le chargement */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/60 text-sm">Chargement...</p>
            </div>
          </div>
        )}

        {/* Lecteur vidéo HTML5 natif */}
        <video
          className="absolute inset-0 w-full h-full object-contain"
          controls
          playsInline
          preload="metadata"
          onLoadedMetadata={() => setIsLoading(false)}
          onError={() => {
            console.error('Video loading error:', videoUrl);
            setVideoError(true);
            setIsLoading(false);
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/mov" />
          <source src={videoUrl} type="video/webm" />
          Votre navigateur ne supporte pas la lecture de vidéos HTML5.
        </video>
      </div>

      {/* Titre optionnel sous la vidéo */}
      {title && (
        <p className="text-center text-sm text-white/50 mt-3 italic">
          {title}
        </p>
      )}
    </div>
  );
}

