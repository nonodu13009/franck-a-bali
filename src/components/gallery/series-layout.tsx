'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import type { Series, Image as ImageType } from '@/types/firebase.type';
import { cn } from '@/lib/utils';

interface SeriesLayoutProps {
  series: Series;
  images: ImageType[];
  locale: string;
}

export function SeriesLayout({ series, images, locale }: SeriesLayoutProps) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const title = locale === 'en' ? series.titleEn : series.title;
  const description = locale === 'en' ? series.descriptionEn : series.description;

  const getImageAspectRatio = (image: ImageType) => {
    return image.width / image.height;
  };

  const getGridColSpan = (aspectRatio: number) => {
    if (aspectRatio > 1.3) return 'col-span-2'; // Landscape
    if (aspectRatio < 0.8) return 'row-span-2'; // Portrait
    return 'col-span-1'; // Square
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
        {images.map((image) => {
          const aspectRatio = getImageAspectRatio(image);
          const colSpan = getGridColSpan(aspectRatio);
          const alt = locale === 'en' ? image.altEn : image.alt;

          return (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={cn(
                'relative overflow-hidden rounded-sm bg-muted group',
                colSpan
              )}
            >
              <Image
                src={image.url}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </button>
          );
        })}
      </div>

      <Dialog.Root open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-4 z-50 flex items-center justify-center">
            {selectedImage && (
              <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                <Image
                  src={selectedImage.url}
                  alt={locale === 'en' ? selectedImage.altEn : selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
                <Dialog.Close className="absolute top-4 right-4 p-2 bg-background/80 rounded-sm hover:bg-background transition-colors">
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-6 h-6"
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
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

