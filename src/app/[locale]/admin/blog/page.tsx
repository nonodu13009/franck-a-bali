'use client';

import { useState, useEffect } from 'react';
import { getBlogPosts } from '@/lib/firebase/firestore';
import { createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/firebase/admin-firestore';
import { BlogForm } from '@/components/admin/blog-form';
import type { BlogPost } from '@/types/firebase.type';
import type { BlogFormData } from '@/types/admin.type';
import Image from 'next/image';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const allPosts = await getBlogPosts();
      setPosts(allPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: BlogFormData) => {
    try {
      if (editingPost) {
        await updateBlogPost(editingPost.id, data);
      } else {
        await createBlogPost(data);
      }
      await loadPosts();
      setShowForm(false);
      setEditingPost(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      await deleteBlogPost(id);
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  if (isLoading) {
    return <div className="text-white">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestion du Blog</h1>
        <button
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
        >
          + Ajouter un article
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {showForm && (
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <BlogForm
            initialData={editingPost ? {
              slug: editingPost.slug,
              title: editingPost.title,
              titleEn: editingPost.titleEn,
              content: editingPost.content,
              contentEn: editingPost.contentEn,
              featuredImage: editingPost.featuredImage,
              videoUrl: editingPost.videoUrl,
              videoRatio: editingPost.videoRatio,
              author: editingPost.author,
              excerpt: editingPost.excerpt,
              excerptEn: editingPost.excerptEn,
            } : undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingPost(null);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 flex gap-4"
          >
            {post.featuredImage && (
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">{post.title}</h3>
              <p className="text-white/70 text-sm mb-2">{post.titleEn}</p>
              <p className="text-white/50 text-xs mb-4">
                Par {post.author} • Slug: {post.slug}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="px-3 py-1 bg-white/10 text-white rounded text-sm hover:bg-white/20 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 bg-red-500/20 text-red-200 rounded text-sm hover:bg-red-500/30 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-white/50">
          Aucun article pour le moment
        </div>
      )}
    </div>
  );
}
