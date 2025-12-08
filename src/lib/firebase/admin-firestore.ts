import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { Series, Image, BlogPost } from '@/types/firebase.type';
import type { HomepageData, AboutData } from '@/types/admin.type';

// ===== SERIES =====

export async function createSeries(data: Omit<Series, 'id' | 'createdAt'>): Promise<string> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const seriesRef = collection(db, 'series');
  const docRef = await addDoc(seriesRef, {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateSeries(id: string, data: Partial<Omit<Series, 'id' | 'createdAt'>>): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const seriesRef = doc(db, 'series', id);
  await updateDoc(seriesRef, data);
}

export async function deleteSeries(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const seriesRef = doc(db, 'series', id);
  await deleteDoc(seriesRef);
}

export async function getSeriesById(id: string): Promise<Series | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const seriesRef = doc(db, 'series', id);
  const docSnap = await getDoc(seriesRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Series;
}

// ===== IMAGES =====

export async function createImage(data: Omit<Image, 'id'>): Promise<string> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const imagesRef = collection(db, 'images');
  const docRef = await addDoc(imagesRef, data);

  return docRef.id;
}

export async function updateImage(id: string, data: Partial<Omit<Image, 'id'>>): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const imageRef = doc(db, 'images', id);
  await updateDoc(imageRef, data);
}

export async function deleteImage(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const imageRef = doc(db, 'images', id);
  await deleteDoc(imageRef);
}

export async function getImageById(id: string): Promise<Image | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const imageRef = doc(db, 'images', id);
  const docSnap = await getDoc(imageRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Image;
}

export async function getAllImages(): Promise<Image[]> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const imagesRef = collection(db, 'images');
  const q = query(imagesRef, orderBy('order', 'asc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Image[];
}

// ===== BLOG POSTS =====

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<string> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const blogRef = collection(db, 'blog');
  const docRef = await addDoc(blogRef, {
    ...data,
    publishedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateBlogPost(id: string, data: Partial<Omit<BlogPost, 'id' | 'publishedAt'>>): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const blogRef = doc(db, 'blog', id);
  await updateDoc(blogRef, data);
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const blogRef = doc(db, 'blog', id);
  await deleteDoc(blogRef);
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const blogRef = doc(db, 'blog', id);
  const docSnap = await getDoc(blogRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as BlogPost;
}

// ===== HOMEPAGE =====

const HOMEPAGE_DOC_ID = 'homepage';

export async function getHomepageData(): Promise<HomepageData | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const homepageRef = doc(db, 'homepage', HOMEPAGE_DOC_ID);
  const docSnap = await getDoc(homepageRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as HomepageData;
}

export async function updateHomepageData(data: Partial<HomepageData>): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const homepageRef = doc(db, 'homepage', HOMEPAGE_DOC_ID);
  const docSnap = await getDoc(homepageRef);

  if (docSnap.exists()) {
    await updateDoc(homepageRef, data);
  } else {
    // Créer le document s'il n'existe pas
    await setDoc(homepageRef, data);
  }
}

// ===== ABOUT PAGE =====

const ABOUT_DOC_ID = 'about';

export async function getAboutData(): Promise<AboutData | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const aboutRef = doc(db, 'about', ABOUT_DOC_ID);
  const docSnap = await getDoc(aboutRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as AboutData;
}

export async function updateAboutData(data: Partial<AboutData>): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  const aboutRef = doc(db, 'about', ABOUT_DOC_ID);
  const docSnap = await getDoc(aboutRef);

  if (docSnap.exists()) {
    await updateDoc(aboutRef, data);
  } else {
    // Créer le document s'il n'existe pas
    await setDoc(aboutRef, data);
  }
}
