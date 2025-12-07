'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth.hook';
import { LoginForm } from '@/components/admin/login-form';

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const locale = window.location.pathname.split('/')[1] || 'fr';
      router.push(`/${locale}/admin/photos`);
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Administration</h1>
          <p className="text-white/70">Connectez-vous pour accéder au panneau d&apos;administration</p>
        </div>
        <LoginForm onSuccess={() => {
          const locale = window.location.pathname.split('/')[1] || 'fr';
          router.push(`/${locale}/admin/photos`);
        }} />
      </div>
    </div>
  );
}
