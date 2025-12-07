'use client';

import { signOut } from '@/lib/firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth.hook';

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      const locale = pathname?.split('/')[1] || 'fr';
      router.push(`/${locale}/admin`);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="bg-black/80 border-b border-white/10 p-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-white">Administration</h1>
      
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-white/70 text-sm">{user.email}</span>
        )}
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}
