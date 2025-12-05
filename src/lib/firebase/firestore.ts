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

// Mode mock activé si pas de données Firebase ou si Firebase n'est pas configuré
const USE_MOCK_DATA = 
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || 
  process.env.NODE_ENV === 'development' ||
  !db; // Si db est null, Firebase n'est pas initialisé

// Helper pour convertir Timestamp en objet sérialisable
function serializeTimestamp(timestamp: { seconds?: number; nanoseconds?: number; toDate?: () => Date; toMillis?: () => number } | null) {
  if (!timestamp) return null;
  return {
    seconds: timestamp.seconds || 0,
    nanoseconds: timestamp.nanoseconds || 0,
  };
}

// Helper pour convertir Series en objet sérialisable pour Client Components
function serializeSeries(series: Series) {
  return {
    ...series,
    createdAt: serializeTimestamp(series.createdAt),
  };
}

// Helper pour convertir BlogPost en objet sérialisable
function serializeBlogPost(post: BlogPost) {
  return {
    ...post,
    publishedAt: serializeTimestamp(post.publishedAt),
  };
}

export async function getSeries(): Promise<Series[]> {
  let series: Series[];
  
  if (USE_MOCK_DATA) {
    series = mockSeries;
  } else {
    try {
      const seriesRef = collection(db, 'series');
      const q = query(seriesRef, orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      
      series = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Series[];

      // Si aucune série dans Firebase, utiliser les données mockées
      if (series.length === 0) {
        series = mockSeries;
      }
    } catch (error) {
      console.error('Error fetching series:', error);
      // En cas d'erreur, retourner les données mockées
      series = mockSeries;
    }
  }

  // Sérialiser les Timestamp pour les Client Components
  return series.map(serializeSeries) as Series[];
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  let series: Series | null = null;
  
  if (USE_MOCK_DATA) {
    series = mockSeries.find((s) => (s.slug || s.id) === slug) || null;
  } else {
    try {
      const seriesRef = collection(db, 'series');
      const q = query(seriesRef, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Essayer avec les données mockées
        series = mockSeries.find((s) => (s.slug || s.id) === slug) || null;
      } else {
        const doc = querySnapshot.docs[0];
        series = {
          id: doc.id,
          ...doc.data(),
        } as Series;
      }
    } catch (error) {
      console.error('Error fetching series by slug:', error);
      series = mockSeries.find((s) => (s.slug || s.id) === slug) || null;
    }
  }

  return series ? serializeSeries(series) as Series : null;
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
  let posts: BlogPost[];
  
  if (USE_MOCK_DATA) {
    posts = mockBlogPosts;
  } else {
    try {
      const blogRef = collection(db, 'blog');
      const q = query(blogRef, orderBy('publishedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];

      // Si aucun article dans Firebase, utiliser les données mockées
      if (posts.length === 0) {
        posts = mockBlogPosts;
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      posts = mockBlogPosts;
    }
  }

  // Sérialiser les Timestamp pour les Client Components
  return posts.map(serializeBlogPost) as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  let post: BlogPost | null = null;
  
  if (USE_MOCK_DATA) {
    post = mockBlogPosts.find((p) => p.slug === slug) || null;
  } else {
    try {
      const blogRef = collection(db, 'blog');
      const q = query(blogRef, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Essayer avec les données mockées
        post = mockBlogPosts.find((p) => p.slug === slug) || null;
      } else {
        const doc = querySnapshot.docs[0];
        post = {
          id: doc.id,
          ...doc.data(),
        } as BlogPost;
      }
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      post = mockBlogPosts.find((p) => p.slug === slug) || null;
    }
  }

  return post ? serializeBlogPost(post) as BlogPost : null;
}

