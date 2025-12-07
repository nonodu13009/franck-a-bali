'use client';

import { useState, useRef, DragEvent } from 'react';
import { uploadImage, type UploadOptions } from '@/lib/firebase/admin-storage';
import Image from 'next/image';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: string) => void;
  storagePath: string;
  currentImageUrl?: string;
  label?: string;
}

export function ImageUploader({
  onUploadComplete,
  onUploadError,
  storagePath,
  currentImageUrl,
  label = 'Image',
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Créer une preview locale
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const options: UploadOptions = {
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      };

      const url = await uploadImage(file, storagePath, options);
      onUploadComplete(url);
      setUploadProgress(100);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'upload';
      onUploadError?.(errorMessage);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">{label}</label>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-colors
          ${isDragging ? 'border-white/50 bg-white/5' : 'border-white/20 bg-white/5'}
          ${isUploading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
        `}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        {previewUrl ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-sm">
                  {Math.round(uploadProgress)}%
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white/70 text-sm">
              Glissez-déposez une image ou cliquez pour sélectionner
            </p>
            <p className="text-white/50 text-xs mt-2">
              JPEG, PNG, WebP (max 10MB)
            </p>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}
