import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import type { Series, Image, BlogPost } from '@/types/firebase.type';
import { mockSeries, mockImages, mockBlogPosts } from '@/lib/mock-data';

// Mode mock activé si pas de données Firebase
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development';

export async function getSeries(): Promise<Series[]> {
  if (USE_MOCK_DATA) {
    return mockSeries;
  }

  try {
    const seriesRef = collection(db, 'series');
    const q = query(seriesRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    const series = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Series[];

    // Si aucune série dans Firebase, utiliser les données mockées
    if (series.length === 0) {
      return mockSeries;
    }

    return series;
  } catch (error) {
    console.error('Error fetching series:', error);
    // En cas d'erreur, retourner les données mockées
    return mockSeries;
  }
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  if (USE_MOCK_DATA) {
    return mockSeries.find((s) => (s.slug || s.id) === slug) || null;
  }

  try {
    const seriesRef = collection(db, 'series');
    const q = query(seriesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Essayer avec les données mockées
      return mockSeries.find((s) => (s.slug || s.id) === slug) || null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Series;
  } catch (error) {
    console.error('Error fetching series by slug:', error);
    return mockSeries.find((s) => (s.slug || s.id) === slug) || null;
  }
}

export async function getImagesBySeries(seriesId: string): Promise<Image[]> {
  if (USE_MOCK_DATA) {
    return mockImages.filter((img) => img.seriesId === seriesId);
  }

  try {
    const imagesRef = collection(db, 'images');
    const q = query(
      imagesRef,
      where('seriesId', '==', seriesId),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    const images = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Image[];

    // Si aucune image dans Firebase, utiliser les données mockées
    if (images.length === 0) {
      return mockImages.filter((img) => img.seriesId === seriesId);
    }

    return images;
  } catch (error) {
    console.error('Error fetching images by series:', error);
    return mockImages.filter((img) => img.seriesId === seriesId);
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (USE_MOCK_DATA) {
    return mockBlogPosts;
  }

  try {
    const blogRef = collection(db, 'blog');
    const q = query(blogRef, orderBy('publishedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogPost[];

    // Si aucun article dans Firebase, utiliser les données mockées
    if (posts.length === 0) {
      return mockBlogPosts;
    }

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return mockBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (USE_MOCK_DATA) {
    return mockBlogPosts.find((post) => post.slug === slug) || null;
  }

  try {
    const blogRef = collection(db, 'blog');
    const q = query(blogRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Essayer avec les données mockées
      return mockBlogPosts.find((post) => post.slug === slug) || null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return mockBlogPosts.find((post) => post.slug === slug) || null;
  }
}

