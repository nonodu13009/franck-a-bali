import type { Series, Image, BlogPost } from '@/types/firebase.type';
import type { Timestamp } from 'firebase/firestore';

// Images Unsplash libres de droit pour le mock
const UNSPLASH_BASE = 'https://images.unsplash.com';

// Helper pour créer un Timestamp mock compatible avec Firebase
// On crée un objet qui ressemble à Timestamp mais sans dépendre de Firebase
function createMockTimestamp(date: Date): Timestamp {
  const seconds = Math.floor(date.getTime() / 1000);
  const nanoseconds = (date.getTime() % 1000) * 1000000;
  
  return {
    seconds,
    nanoseconds,
    toDate: () => date,
    toMillis: () => date.getTime(),
    toJSON: () => ({ seconds, nanoseconds, type: 'timestamp' }),
    isEqual: (other: Timestamp | null) => {
      if (!other) return false;
      return other.seconds === seconds && other.nanoseconds === nanoseconds;
    },
  } as Timestamp;
}

export const mockSeries: Series[] = [
  {
    id: 'series-1',
    title: 'Paysages de Bali',
    titleEn: 'Bali Landscapes',
    description: 'Une exploration visuelle des paysages époustouflants de Bali, des rizières en terrasses aux plages de sable noir.',
    descriptionEn: 'A visual exploration of Bali\'s stunning landscapes, from terraced rice fields to black sand beaches.',
    coverImage: `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=400&q=75&auto=format&fit=crop`,
    createdAt: createMockTimestamp(new Date('2024-01-15')),
    order: 1,
    slug: 'paysages-bali',
  },
  {
    id: 'series-2',
    title: 'Portraits Locaux',
    titleEn: 'Local Portraits',
    description: 'Rencontres humaines et portraits authentiques des habitants de Bali.',
    descriptionEn: 'Human encounters and authentic portraits of Bali\'s inhabitants.',
    coverImage: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=400&q=75&auto=format&fit=crop`,
    createdAt: createMockTimestamp(new Date('2024-02-20')),
    order: 2,
    slug: 'portraits-locaux',
  },
  {
    id: 'series-3',
    title: 'Architecture Traditionnelle',
    titleEn: 'Traditional Architecture',
    description: 'Temples, palais et architecture traditionnelle balinaise.',
    descriptionEn: 'Temples, palaces and traditional Balinese architecture.',
    coverImage: `${UNSPLASH_BASE}/photo-1547036967-23d11aacaee0?w=800&q=80`,
    createdAt: createMockTimestamp(new Date('2024-03-10')),
    order: 3,
    slug: 'architecture-traditionnelle',
  },
  {
    id: 'series-4',
    title: 'Vie Nocturne',
    titleEn: 'Night Life',
    description: 'Lumières et atmosphère de la vie nocturne balinaise.',
    descriptionEn: 'Lights and atmosphere of Balinese nightlife.',
    coverImage: `${UNSPLASH_BASE}/photo-1514525253161-7a46d19cd819?w=400&q=75&auto=format&fit=crop`,
    createdAt: createMockTimestamp(new Date('2024-04-05')),
    order: 4,
    slug: 'vie-nocturne',
  },
  {
    id: 'series-5',
    title: 'Cérémonies et Traditions',
    titleEn: 'Ceremonies and Traditions',
    description: 'Cérémonies religieuses et traditions culturelles balinaises.',
    descriptionEn: 'Religious ceremonies and Balinese cultural traditions.',
    coverImage: `${UNSPLASH_BASE}/photo-1571896349842-33c89424de2d?w=400&q=75&auto=format&fit=crop`,
    createdAt: createMockTimestamp(new Date('2024-05-12')),
    order: 5,
    slug: 'ceremonies-traditions',
  },
  {
    id: 'series-6',
    title: 'Nature et Faune',
    titleEn: 'Nature and Wildlife',
    description: 'La biodiversité et la faune exceptionnelle de Bali.',
    descriptionEn: 'Bali\'s exceptional biodiversity and wildlife.',
    coverImage: `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=400&q=75&auto=format&fit=crop`,
    createdAt: createMockTimestamp(new Date('2024-06-18')),
    order: 6,
    slug: 'nature-faune',
  },
];

export const mockImages: Image[] = [
  // Série 1 - Paysages
  {
    id: 'img-1',
    seriesId: 'series-1',
    url: `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop`,
    alt: 'Rizières en terrasses à Bali',
    altEn: 'Terraced rice fields in Bali',
    width: 1920,
    height: 1280,
    order: 1,
  },
  {
    id: 'img-2',
    seriesId: 'series-1',
    url: `${UNSPLASH_BASE}/photo-1518548419970-58e3b4079ab2?w=800&q=80&auto=format&fit=crop`,
    alt: 'Plage de sable noir à Bali',
    altEn: 'Black sand beach in Bali',
    width: 1920,
    height: 1280,
    order: 2,
  },
  {
    id: 'img-3',
    seriesId: 'series-1',
    url: `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop`,
    alt: 'Forêt tropicale balinaise',
    altEn: 'Balinese tropical forest',
    width: 1920,
    height: 1280,
    order: 3,
  },
  {
    id: 'img-4',
    seriesId: 'series-1',
    url: `${UNSPLASH_BASE}/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop`,
    alt: 'Cascade à Bali',
    altEn: 'Waterfall in Bali',
    width: 1920,
    height: 1280,
    order: 4,
  },
  // Série 2 - Portraits
  {
    id: 'img-5',
    seriesId: 'series-2',
    url: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop`,
    alt: 'Portrait d\'un artisan balinais',
    altEn: 'Portrait of a Balinese artisan',
    width: 1280,
    height: 1920,
    order: 1,
  },
  {
    id: 'img-6',
    seriesId: 'series-2',
    url: `${UNSPLASH_BASE}/photo-1494790108377-be9c29b29330?w=800&q=80&auto=format&fit=crop`,
    alt: 'Portrait d\'une danseuse traditionnelle',
    altEn: 'Portrait of a traditional dancer',
    width: 1280,
    height: 1920,
    order: 2,
  },
  {
    id: 'img-7',
    seriesId: 'series-2',
    url: `${UNSPLASH_BASE}/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop`,
    alt: 'Portrait d\'un pêcheur',
    altEn: 'Portrait of a fisherman',
    width: 1920,
    height: 1280,
    order: 3,
  },
  // Série 3 - Architecture
  {
    id: 'img-8',
    seriesId: 'series-3',
    url: `${UNSPLASH_BASE}/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop`,
    alt: 'Temple balinais',
    altEn: 'Balinese temple',
    width: 1920,
    height: 1280,
    order: 1,
  },
  {
    id: 'img-9',
    seriesId: 'series-3',
    url: `${UNSPLASH_BASE}/photo-1571896349842-33c89424de2d?w=800&q=80&auto=format&fit=crop`,
    alt: 'Porte d\'entrée traditionnelle',
    altEn: 'Traditional entrance gate',
    width: 1920,
    height: 1280,
    order: 2,
  },
  {
    id: 'img-10',
    seriesId: 'series-3',
    url: `${UNSPLASH_BASE}/photo-1547036967-23d11aacaee0?w=800&q=80&auto=format&fit=crop`,
    alt: 'Détails architecturaux',
    altEn: 'Architectural details',
    width: 1920,
    height: 1280,
    order: 3,
  },
  // Série 4 - Vie Nocturne
  {
    id: 'img-11',
    seriesId: 'series-4',
    url: `${UNSPLASH_BASE}/photo-1514525253161-7a46d19cd819?w=800&q=80&auto=format&fit=crop`,
    alt: 'Marché de nuit',
    altEn: 'Night market',
    width: 1920,
    height: 1280,
    order: 1,
  },
  {
    id: 'img-12',
    seriesId: 'series-4',
    url: `${UNSPLASH_BASE}/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop`,
    alt: 'Lumières de la ville',
    altEn: 'City lights',
    width: 1920,
    height: 1280,
    order: 2,
  },
  // Série 5 - Cérémonies
  {
    id: 'img-13',
    seriesId: 'series-5',
    url: `${UNSPLASH_BASE}/photo-1571896349842-33c89424de2d?w=800&q=80&auto=format&fit=crop`,
    alt: 'Cérémonie traditionnelle',
    altEn: 'Traditional ceremony',
    width: 1920,
    height: 1280,
    order: 1,
  },
  {
    id: 'img-14',
    seriesId: 'series-5',
    url: `${UNSPLASH_BASE}/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop`,
    alt: 'Offrandes balinaises',
    altEn: 'Balinese offerings',
    width: 1920,
    height: 1280,
    order: 2,
  },
  {
    id: 'img-15',
    seriesId: 'series-5',
    url: `${UNSPLASH_BASE}/photo-1515542628406-3b69c0d4c3a0?w=1200&q=80`,
    alt: 'Danse traditionnelle',
    altEn: 'Traditional dance',
    width: 1920,
    height: 1280,
    order: 3,
  },
  // Série 6 - Nature
  {
    id: 'img-16',
    seriesId: 'series-6',
    url: `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop`,
    alt: 'Forêt tropicale',
    altEn: 'Tropical forest',
    width: 1920,
    height: 1280,
    order: 1,
  },
  {
    id: 'img-17',
    seriesId: 'series-6',
    url: `${UNSPLASH_BASE}/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop`,
    alt: 'Cascade naturelle',
    altEn: 'Natural waterfall',
    width: 1920,
    height: 1280,
    order: 2,
  },
  {
    id: 'img-18',
    seriesId: 'series-6',
    url: `${UNSPLASH_BASE}/photo-1518548419970-58e3b4079ab2?w=800&q=80&auto=format&fit=crop`,
    alt: 'Plage sauvage',
    altEn: 'Wild beach',
    width: 1920,
    height: 1280,
    order: 3,
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'decouvrir-bali',
    title: 'Découvrir Bali : Un Paradis Photographique',
    titleEn: 'Discovering Bali: A Photographic Paradise',
    content: `
      <h2>Introduction</h2>
      <p>Bali est une île indonésienne qui offre une richesse visuelle incomparable pour les photographes. De ses rizières en terrasses à ses temples sacrés, chaque coin de l'île raconte une histoire unique.</p>
      
      <h2>Les Rizières en Terrasses</h2>
      <p>Les rizières en terrasses de Jatiluwih sont un spectacle à couper le souffle. Ces paysages sculptés par l'homme offrent des perspectives infinies pour la photographie de paysage.</p>
      
      <h2>Les Temples Sacrés</h2>
      <p>Bali compte des milliers de temples, chacun avec son architecture unique. Le temple de Tanah Lot, perché sur un rocher au-dessus de l'océan, est particulièrement photogénique au coucher du soleil.</p>
      
      <h2>Conclusion</h2>
      <p>Que vous soyez amateur de paysages, de portraits ou d'architecture, Bali offre des opportunités photographiques infinies.</p>
    `,
    contentEn: `
      <h2>Introduction</h2>
      <p>Bali is an Indonesian island that offers incomparable visual richness for photographers. From its terraced rice fields to its sacred temples, every corner of the island tells a unique story.</p>
      
      <h2>Terraced Rice Fields</h2>
      <p>The terraced rice fields of Jatiluwih are a breathtaking sight. These man-made landscapes offer infinite perspectives for landscape photography.</p>
      
      <h2>Sacred Temples</h2>
      <p>Bali has thousands of temples, each with its unique architecture. Tanah Lot Temple, perched on a rock above the ocean, is particularly photogenic at sunset.</p>
      
      <h2>Conclusion</h2>
      <p>Whether you're a fan of landscapes, portraits, or architecture, Bali offers infinite photographic opportunities.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop`,
    publishedAt: createMockTimestamp(new Date('2024-01-20')),
    author: 'VF Images',
    excerpt: 'Une exploration photographique de l\'île de Bali, de ses paysages à sa culture.',
    excerptEn: 'A photographic exploration of the island of Bali, from its landscapes to its culture.',
  },
  {
    id: 'blog-2',
    slug: 'techniques-photo-bali',
    title: 'Techniques de Photographie à Bali',
    titleEn: 'Photography Techniques in Bali',
    content: `
      <h2>La Lumière Dorée</h2>
      <p>Les heures dorées à Bali offrent une lumière exceptionnelle. Le lever et le coucher du soleil créent des atmosphères magiques.</p>
      
      <h2>Composition et Cadrage</h2>
      <p>Utilisez les lignes des rizières et l'architecture traditionnelle pour créer des compositions dynamiques.</p>
      
      <h2>Rencontres Humaines</h2>
      <p>La photographie de portrait à Bali nécessite respect et sensibilité culturelle. Prenez le temps de créer une connexion avec vos sujets.</p>
    `,
    contentEn: `
      <h2>Golden Light</h2>
      <p>Golden hours in Bali offer exceptional light. Sunrise and sunset create magical atmospheres.</p>
      
      <h2>Composition and Framing</h2>
      <p>Use the lines of rice fields and traditional architecture to create dynamic compositions.</p>
      
      <h2>Human Encounters</h2>
      <p>Portrait photography in Bali requires respect and cultural sensitivity. Take time to create a connection with your subjects.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop`,
    publishedAt: createMockTimestamp(new Date('2024-02-15')),
    author: 'VF Images',
    excerpt: 'Conseils et techniques pour capturer la beauté de Bali.',
    excerptEn: 'Tips and techniques for capturing the beauty of Bali.',
  },
];

