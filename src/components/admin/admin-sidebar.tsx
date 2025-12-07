'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon?: string;
}

export function AdminSidebar() {
  const pathname = usePathname();
  
  // Extraire la locale du pathname
  const locale = pathname?.split('/')[1] || 'fr';
  const basePath = `/${locale}/admin`;

  const navItems: NavItem[] = [
    { href: `${basePath}`, label: 'Dashboard' },
    { href: `${basePath}/photos`, label: 'Photos' },
    { href: `${basePath}/galleries`, label: 'Galeries' },
    { href: `${basePath}/blog`, label: 'Blog' },
    { href: `${basePath}/homepage`, label: 'Homepage' },
  ];

  return (
    <aside className="w-64 bg-black/80 border-r border-white/10 min-h-screen p-6">
      <h2 className="text-xl font-bold text-white mb-8">Admin</h2>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block px-4 py-2 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
