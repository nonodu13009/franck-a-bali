import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import type { Series, Image, BlogPost } from '@/types/firebase.type';

export async function getSeries(): Promise<Series[]> {
  try {
    const seriesRef = collection(db, 'series');
    const q = query(seriesRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Series[];
  } catch (error) {
    console.error('Error fetching series:', error);
    return [];
  }
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  try {
    const seriesRef = collection(db, 'series');
    const q = query(seriesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Series;
  } catch (error) {
    console.error('Error fetching series by slug:', error);
    return null;
  }
}

export async function getImagesBySeries(seriesId: string): Promise<Image[]> {
  try {
    const imagesRef = collection(db, 'images');
    const q = query(
      imagesRef,
      where('seriesId', '==', seriesId),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Image[];
  } catch (error) {
    console.error('Error fetching images by series:', error);
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogRef = collection(db, 'blog');
    const q = query(blogRef, orderBy('publishedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const blogRef = collection(db, 'blog');
    const q = query(blogRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

