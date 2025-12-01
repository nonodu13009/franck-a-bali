import { MetadataRoute } from 'next';
import { getSeries, getBlogPosts } from '@/lib/firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vfimages.com';
  
  const series = await getSeries();
  const posts = await getBlogPosts();

  const seriesUrls = series.flatMap((s) => [
    {
      url: `${baseUrl}/fr/gallery/${s.slug || s.id}`,
      lastModified: s.createdAt.toDate(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/gallery/${s.slug || s.id}`,
      lastModified: s.createdAt.toDate(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]);

  const blogUrls = posts.flatMap((post) => [
    {
      url: `${baseUrl}/fr/blog/${post.slug}`,
      lastModified: post.publishedAt.toDate(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: post.publishedAt.toDate(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/fr/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fr/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/shop`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/shop`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...seriesUrls,
    ...blogUrls,
  ];
}

