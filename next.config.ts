import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // Formats modernes prioritaires pour optimisation automatique
    formats: ['image/avif', 'image/webp'],
    // Tailles d'appareils pour générer srcset responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Petites tailles pour icônes et thumbnails
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache 1 an pour les images optimisées
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '*.firebasestorage.app',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'commondatastorage.googleapis.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);

