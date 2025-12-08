'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth.hook';
import { LoginForm } from '@/components/admin/login-form';

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated && !isLoading) {
      const locale = pathname?.split('/')[1] || 'fr';
      router.push(`/${locale}/admin/photos`);
    }
  }, [isAuthenticated, isLoading, mounted, router, pathname]);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Redirection...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Administration</h1>
          <p className="text-white/70">Connectez-vous pour accéder au panneau d&apos;administration</p>
        </div>
        <LoginForm onSuccess={() => {
          const locale = pathname?.split('/')[1] || 'fr';
          router.push(`/${locale}/admin/photos`);
        }} />
      </div>
    </div>
  );
}
