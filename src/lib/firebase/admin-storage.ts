import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export interface UploadOptions {
  onProgress?: (progress: number) => void;
}

export async function uploadImage(
  file: File,
  path: string,
  options?: UploadOptions
): Promise<string> {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized');
  }

  // Validation du type de fichier
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Type de fichier non autorisé. Utilisez JPEG, PNG ou WebP.');
  }

  // Validation de la taille
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Fichier trop volumineux. Taille maximale : ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        options?.onProgress?.(progress);
      },
      (error) => {
        reject(new Error(`Erreur lors de l'upload : ${error.message}`));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(new Error(`Erreur lors de la récupération de l'URL : ${error}`));
        }
      }
    );
  });
}

export async function deleteImage(path: string): Promise<void> {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized');
  }

  try {
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
  } catch (error) {
    throw new Error(`Erreur lors de la suppression : ${error}`);
  }
}

export async function getImageUrl(path: string): Promise<string> {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized');
  }

  try {
    const imageRef = ref(storage, path);
    return await getDownloadURL(imageRef);
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de l'URL : ${error}`);
  }
}
