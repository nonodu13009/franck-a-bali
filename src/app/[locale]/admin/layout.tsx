'use client';

import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname?.endsWith('/admin') || pathname?.endsWith('/admin/');

  // Ne pas protéger la page de login
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Protéger toutes les autres pages admin
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
