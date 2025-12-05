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
    slug: 'bali-en-mouvement',
    title: 'Bali en Mouvement : Capturer la Vie',
    titleEn: 'Bali in Motion: Capturing Life',
    content: `
      <h2>La Vidéo comme Medium</h2>
      <p>Après des années de photographie à Bali, je me suis tourné vers la vidéo pour capturer l'essence même du mouvement. Les danseurs balinais, les vagues de l'océan, le vent dans les rizières - tout prend une autre dimension en mouvement.</p>
      
      <h2>Technique et Équipement</h2>
      <p>Pour cette vidéo, j'ai utilisé un stabilisateur et filmé en 4K à 60fps pour permettre des ralentis fluides. La lumière naturelle de Bali est parfaite pour la vidéo - douce et dorée durant la golden hour.</p>
      
      <h2>Le Rythme de Bali</h2>
      <p>Cette île a son propre rythme, entre les cérémonies traditionnelles et la vie quotidienne. La vidéo permet de capturer cette temporalité unique que la photo ne peut qu'effleurer.</p>
    `,
    contentEn: `
      <h2>Video as a Medium</h2>
      <p>After years of photography in Bali, I turned to video to capture the very essence of movement. Balinese dancers, ocean waves, wind in the rice fields - everything takes on another dimension in motion.</p>
      
      <h2>Technique and Equipment</h2>
      <p>For this video, I used a stabilizer and filmed in 4K at 60fps to allow smooth slow motion. Bali's natural light is perfect for video - soft and golden during the golden hour.</p>
      
      <h2>The Rhythm of Bali</h2>
      <p>This island has its own rhythm, between traditional ceremonies and daily life. Video captures this unique temporality that photography can only touch upon.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=1200&q=85&auto=format&fit=crop`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoRatio: '16:9',
    publishedAt: createMockTimestamp(new Date('2024-12-01')),
    author: 'Franck Vinel',
    excerpt: 'Découvrez Bali à travers le mouvement et la vidéo, une nouvelle façon de raconter l\'histoire de cette île magique.',
    excerptEn: 'Discover Bali through movement and video, a new way to tell the story of this magical island.',
  },
  {
    id: 'blog-2',
    slug: 'portrait-vertical-instagram',
    title: 'Portrait Vertical : L\'Art du Format Instagram',
    titleEn: 'Vertical Portrait: The Art of Instagram Format',
    content: `
      <h2>Le Format 9:16</h2>
      <p>Le format vertical 9:16 d'Instagram Stories et Reels a révolutionné la façon dont nous créons du contenu visuel. Pour les portraits, c'est un format naturel qui met en valeur le sujet.</p>
      
      <h2>Composition Verticale</h2>
      <p>En vidéo verticale, la composition change complètement. Le sujet occupe l'écran, créant une intimité immédiate. J'ai filmé ce portrait en utilisant la règle des tiers adaptée au format vertical.</p>
      
      <h2>Partage Social</h2>
      <p>Ce format est optimisé pour le mobile, là où la majorité de mon audience découvre mon travail. La vidéo verticale s'intègre naturellement dans l'expérience de scroll.</p>
    `,
    contentEn: `
      <h2>The 9:16 Format</h2>
      <p>Instagram Stories and Reels' 9:16 vertical format has revolutionized how we create visual content. For portraits, it's a natural format that highlights the subject.</p>
      
      <h2>Vertical Composition</h2>
      <p>In vertical video, composition changes completely. The subject fills the screen, creating immediate intimacy. I filmed this portrait using the rule of thirds adapted to vertical format.</p>
      
      <h2>Social Sharing</h2>
      <p>This format is optimized for mobile, where most of my audience discovers my work. Vertical video naturally integrates into the scrolling experience.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1551244072-5d12893278ab?w=900&q=85&auto=format&fit=crop`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoRatio: '9:16',
    publishedAt: createMockTimestamp(new Date('2024-11-28')),
    author: 'Franck Vinel',
    excerpt: 'Explorer le format vertical pour créer des portraits vidéo captivants adaptés aux réseaux sociaux.',
    excerptEn: 'Exploring vertical format to create captivating video portraits adapted for social media.',
  },
  {
    id: 'blog-3',
    slug: 'temples-caches-bali',
    title: 'Les Temples Cachés de Bali',
    titleEn: 'Hidden Temples of Bali',
    content: `
      <h2>Une Quête Spirituelle</h2>
      <p>Au-delà des sites touristiques classiques, Bali recèle des temples méconnus d'une beauté exceptionnelle. Ces sanctuaires cachés offrent une expérience photographique unique, loin des foules.</p>
      
      <h2>Le Temple de Tirta Gangga</h2>
      <p>Niché dans l'est de Bali, ce palais aquatique construit en 1946 est un joyau architectural. Les bassins ornés, les fontaines et les jardins luxuriants créent des reflets et des jeux de lumière fascinants.</p>
      
      <h2>Conseils de Prise de Vue</h2>
      <p>Photographiez tôt le matin pour capturer la lumière douce et éviter les visiteurs. Les reflets dans l'eau offrent des opportunités créatives infinies. Utilisez un filtre polarisant pour contrôler les reflets.</p>
      
      <h2>Respecter le Sacré</h2>
      <p>N'oubliez pas que ces lieux sont des sites religieux actifs. Portez un sarong, restez discret pendant les cérémonies, et demandez toujours la permission avant de photographier.</p>
    `,
    contentEn: `
      <h2>A Spiritual Quest</h2>
      <p>Beyond the classic tourist sites, Bali harbors little-known temples of exceptional beauty. These hidden sanctuaries offer a unique photographic experience, far from the crowds.</p>
      
      <h2>Tirta Gangga Temple</h2>
      <p>Nestled in eastern Bali, this water palace built in 1946 is an architectural jewel. The ornate pools, fountains, and lush gardens create fascinating reflections and plays of light.</p>
      
      <h2>Shooting Tips</h2>
      <p>Photograph early in the morning to capture soft light and avoid visitors. Water reflections offer endless creative opportunities. Use a polarizing filter to control reflections.</p>
      
      <h2>Respecting the Sacred</h2>
      <p>Remember that these places are active religious sites. Wear a sarong, stay discreet during ceremonies, and always ask permission before photographing.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop`,
    publishedAt: createMockTimestamp(new Date('2024-11-15')),
    author: 'Franck Vinel',
    excerpt: 'Exploration photographique des temples méconnus de Bali, loin des sentiers battus.',
    excerptEn: 'Photographic exploration of Bali\'s lesser-known temples, off the beaten path.',
  },
  {
    id: 'blog-4',
    slug: 'lumiere-doree-ubud',
    title: 'Lumière Dorée à Ubud',
    titleEn: 'Golden Light in Ubud',
    content: `
      <h2>La Magic Hour d'Ubud</h2>
      <p>Ubud, le cœur culturel de Bali, offre des opportunités photographiques exceptionnelles durant la golden hour. Les rizières en terrasses de Tegallalang s'embrasent d'une lumière dorée qui transforme le paysage.</p>
      
      <h2>Les Rizières de Tegallalang</h2>
      <p>Ces terrasses vertes sculptées à flanc de colline sont iconiques. Au lever du soleil, la brume matinale crée une atmosphère mystique. Les agriculteurs commencent leur journée, ajoutant vie et échelle à vos compositions.</p>
      
      <h2>Techniques de Lumière</h2>
      <p>Exposez pour les hautes lumières et récupérez les ombres en post-production. Un filtre dégradé neutre peut aider à équilibrer le ciel et le paysage. N'hésitez pas à sous-exposer légèrement pour préserver les détails dans les nuages dorés.</p>
      
      <h2>Au-delà des Rizières</h2>
      <p>La Forêt des Singes d'Ubud, les galeries d'art et les marchés traditionnels offrent également des sujets riches durant ces heures magiques. La lumière chaude sublime les textures et les couleurs.</p>
    `,
    contentEn: `
      <h2>Ubud's Magic Hour</h2>
      <p>Ubud, Bali's cultural heart, offers exceptional photographic opportunities during the golden hour. The Tegallalang rice terraces ignite with golden light that transforms the landscape.</p>
      
      <h2>Tegallalang Rice Terraces</h2>
      <p>These green terraces carved into the hillside are iconic. At sunrise, morning mist creates a mystical atmosphere. Farmers begin their day, adding life and scale to your compositions.</p>
      
      <h2>Light Techniques</h2>
      <p>Expose for the highlights and recover shadows in post-production. A neutral gradient filter can help balance sky and landscape. Don't hesitate to slightly underexpose to preserve details in golden clouds.</p>
      
      <h2>Beyond the Rice Fields</h2>
      <p>Ubud's Monkey Forest, art galleries, and traditional markets also offer rich subjects during these magical hours. Warm light enhances textures and colors.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1555400038-63f5ba517a47?w=1200&q=85&auto=format&fit=crop`,
    publishedAt: createMockTimestamp(new Date('2024-10-22')),
    author: 'Franck Vinel',
    excerpt: 'Guide complet pour photographier les rizières d\'Ubud durant la golden hour.',
    excerptEn: 'Complete guide to photographing Ubud\'s rice fields during the golden hour.',
  },
  {
    id: 'blog-3',
    slug: 'portraits-balinais',
    title: 'Portraits Balinais : Capturer l\'Âme',
    titleEn: 'Balinese Portraits: Capturing the Soul',
    content: `
      <h2>L'Art du Portrait en Voyage</h2>
      <p>Photographier les habitants de Bali est une expérience enrichissante qui demande sensibilité et respect. Chaque visage raconte une histoire, chaque regard porte une culture millénaire.</p>
      
      <h2>Créer la Connexion</h2>
      <p>Le secret d'un bon portrait réside dans la relation avec votre sujet. Apprenez quelques mots en balinais, souriez, montrez vos photos. Cette connexion humaine transparaîtra dans vos images.</p>
      
      <h2>Lumière Naturelle et Composition</h2>
      <p>Privilégiez la lumière naturelle diffuse. Les porches des maisons traditionnelles offrent une lumière idéale. Utilisez un téléobjectif moyen (85mm-135mm) pour créer une intimité sans être intrusif.</p>
      
      <h2>Les Artisans au Travail</h2>
      <p>Les sculpteurs sur bois, les peintres de batik, les tisserands : Bali regorge d'artisans. Photographiez-les dans leur environnement de travail pour des portraits authentiques et contextualisés.</p>
      
      <h2>Ethique et Respect</h2>
      <p>Demandez toujours la permission. Offrez de partager les photos avec vos sujets. Respectez un refus avec le sourire. La photographie doit être un échange, pas une prise.</p>
    `,
    contentEn: `
      <h2>The Art of Travel Portraiture</h2>
      <p>Photographing Bali's inhabitants is an enriching experience that requires sensitivity and respect. Each face tells a story, each gaze carries a millenary culture.</p>
      
      <h2>Creating Connection</h2>
      <p>The secret to a good portrait lies in the relationship with your subject. Learn a few words in Balinese, smile, show your photos. This human connection will show through in your images.</p>
      
      <h2>Natural Light and Composition</h2>
      <p>Favor diffused natural light. Porches of traditional houses offer ideal lighting. Use a medium telephoto lens (85mm-135mm) to create intimacy without being intrusive.</p>
      
      <h2>Artisans at Work</h2>
      <p>Wood carvers, batik painters, weavers: Bali is full of artisans. Photograph them in their work environment for authentic and contextualized portraits.</p>
      
      <h2>Ethics and Respect</h2>
      <p>Always ask permission. Offer to share photos with your subjects. Respect a refusal with a smile. Photography should be an exchange, not a taking.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1552733407-5d5c46c3bb3b?w=1200&q=85&auto=format&fit=crop`,
    publishedAt: createMockTimestamp(new Date('2024-09-30')),
    author: 'Franck Vinel',
    excerpt: 'Techniques et approche éthique pour réaliser des portraits authentiques à Bali.',
    excerptEn: 'Techniques and ethical approach to creating authentic portraits in Bali.',
  },
  {
    id: 'blog-4',
    slug: 'composition-paysage',
    title: 'L\'Art de la Composition en Photographie de Paysage',
    titleEn: 'The Art of Composition in Landscape Photography',
    content: `
      <h2>Les Règles Fondamentales</h2>
      <p>La règle des tiers, les lignes directrices, l'équilibre : ces principes prennent tout leur sens dans les paysages balinais. Mais savoir quand les briser est tout aussi important.</p>
      
      <h2>Utiliser les Éléments Naturels</h2>
      <p>Les palmiers comme cadres naturels, les courbes des rizières pour guider l'œil, les rochers volcaniques pour créer de la profondeur : Bali offre une palette infinie d'éléments compositionnels.</p>
      
      <h2>Créer de la Profondeur</h2>
      <p>Utilisez des éléments au premier plan pour donner de la dimension. Une fleur de frangipane, des feuilles de palmier, des pierres : ces détails créent des couches qui enrichissent votre image.</p>
      
      <h2>Le Minimalisme Balinais</h2>
      <p>Parfois, moins c'est plus. Un seul palmier contre un ciel dramatique, une pirogue solitaire sur l'océan : la simplicité peut créer un impact puissant.</p>
      
      <h2>La Patience du Photographe</h2>
      <p>Attendez le bon moment : un rayon de lumière perçant les nuages, un oiseau en vol, un surfeur sur la vague. La patience transforme une bonne photo en une image exceptionnelle.</p>
    `,
    contentEn: `
      <h2>Fundamental Rules</h2>
      <p>The rule of thirds, leading lines, balance: these principles take on full meaning in Balinese landscapes. But knowing when to break them is just as important.</p>
      
      <h2>Using Natural Elements</h2>
      <p>Palm trees as natural frames, rice field curves to guide the eye, volcanic rocks to create depth: Bali offers an infinite palette of compositional elements.</p>
      
      <h2>Creating Depth</h2>
      <p>Use foreground elements to give dimension. A frangipani flower, palm leaves, stones: these details create layers that enrich your image.</p>
      
      <h2>Balinese Minimalism</h2>
      <p>Sometimes less is more. A single palm tree against a dramatic sky, a solitary canoe on the ocean: simplicity can create powerful impact.</p>
      
      <h2>The Photographer's Patience</h2>
      <p>Wait for the right moment: a ray of light piercing clouds, a bird in flight, a surfer on the wave. Patience transforms a good photo into an exceptional image.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=1200&q=85&auto=format&fit=crop`,
    publishedAt: createMockTimestamp(new Date('2024-08-18')),
    author: 'Franck Vinel',
    excerpt: 'Maîtriser les techniques de composition pour sublimer vos paysages balinais.',
    excerptEn: 'Mastering composition techniques to enhance your Balinese landscapes.',
  },
  {
    id: 'blog-5',
    slug: 'noir-blanc-bali',
    title: 'Bali en Noir et Blanc : Une Autre Dimension',
    titleEn: 'Bali in Black and White: Another Dimension',
    content: `
      <h2>Voir en Monochrome</h2>
      <p>Retirer la couleur, c'est révéler l'essence. Les textures, les contrastes, les formes prennent une nouvelle dimension. Bali en noir et blanc devient intemporel.</p>
      
      <h2>Les Sujets Idéaux</h2>
      <p>Les temples anciens, les visages ridés des anciens, les sculptures en pierre : certains sujets appellent naturellement le noir et blanc. Les textures et les détails deviennent protagonistes.</p>
      
      <h2>Contraste et Dynamique</h2>
      <p>Un bon noir et blanc nécessite une large gamme tonale. Cherchez les scènes avec des blancs purs et des noirs profonds. La lumière directe du matin ou du soir crée ces contrastes dramatiques.</p>
      
      <h2>Post-Production Créative</h2>
      <p>En post-production, jouez avec les curseurs de couleurs pour contrôler les tonalités. Le filtre rouge assombrit les ciels bleus, le filtre vert éclaircit la végétation. Chaque couleur originale devient un outil de contrôle tonal.</p>
      
      <h2>L'Âme du Noir et Blanc</h2>
      <p>Le monochrome révèle l'émotion, l'atmosphère, le caractère. C'est une vision intemporelle qui transcende la réalité colorée pour toucher quelque chose de plus profond.</p>
    `,
    contentEn: `
      <h2>Seeing in Monochrome</h2>
      <p>Removing color reveals essence. Textures, contrasts, shapes take on a new dimension. Bali in black and white becomes timeless.</p>
      
      <h2>Ideal Subjects</h2>
      <p>Ancient temples, wrinkled faces of elders, stone sculptures: some subjects naturally call for black and white. Textures and details become protagonists.</p>
      
      <h2>Contrast and Dynamics</h2>
      <p>Good black and white requires a wide tonal range. Look for scenes with pure whites and deep blacks. Direct morning or evening light creates these dramatic contrasts.</p>
      
      <h2>Creative Post-Production</h2>
      <p>In post-production, play with color sliders to control tonalities. Red filter darkens blue skies, green filter lightens vegetation. Each original color becomes a tonal control tool.</p>
      
      <h2>The Soul of Black and White</h2>
      <p>Monochrome reveals emotion, atmosphere, character. It's a timeless vision that transcends colorful reality to touch something deeper.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1604999565976-8913ad2ddb7c?w=1200&q=85&auto=format&fit=crop`,
    publishedAt: createMockTimestamp(new Date('2024-07-25')),
    author: 'Franck Vinel',
    excerpt: 'Découvrez comment le noir et blanc révèle une autre facette de Bali.',
    excerptEn: 'Discover how black and white reveals another facet of Bali.',
  },
  {
    id: 'blog-6',
    slug: 'couchers-soleil-tropicaux',
    title: 'Couchers de Soleil Tropicaux : Guide des Meilleurs Spots',
    titleEn: 'Tropical Sunsets: Guide to the Best Spots',
    content: `
      <h2>La Magie des Crépuscules Balinais</h2>
      <p>Bali est réputée pour ses couchers de soleil spectaculaires. Chaque soir, le ciel s'embrase de couleurs allant de l'orange au violet profond. Voici mes spots préférés.</p>
      
      <h2>Tanah Lot : L'Iconique</h2>
      <p>Ce temple sur son rocher est le spot le plus photographié. Arrivez tôt pour trouver un bon emplacement. Utilisez un téléobjectif pour isoler le temple, ou un grand-angle pour inclure les rochers au premier plan.</p>
      
      <h2>Jimbaran Bay : Intimité</h2>
      <p>Cette baie en arc de cercle offre des couchers de soleil plus intimes. Les bateaux de pêcheurs créent des silhouettes parfaites. La plage est moins fréquentée que Tanah Lot.</p>
      
      <h2>Mont Batur : Altitude</h2>
      <p>Pour les courageux, le lever de soleil depuis le sommet du Mont Batur est inoubliable. Au crépuscule, les villages en contrebas s'illuminent créant un paysage féérique.</p>
      
      <h2>Réglages Techniques</h2>
      <p>Exposez pour le ciel et récupérez les ombres. Bracketing d'exposition conseillé. Un trépied est essentiel. Attendez 15-20 minutes après le coucher : les couleurs les plus intenses arrivent souvent dans l'afterglow.</p>
      
      <h2>Au-delà du Soleil</h2>
      <p>N'oubliez pas de vous retourner : le ciel opposé offre souvent des couleurs pastel magnifiques. Les nuages éclairés par en-dessous créent des formations spectaculaires.</p>
    `,
    contentEn: `
      <h2>The Magic of Balinese Twilights</h2>
      <p>Bali is renowned for its spectacular sunsets. Each evening, the sky ignites with colors ranging from orange to deep purple. Here are my favorite spots.</p>
      
      <h2>Tanah Lot: The Iconic</h2>
      <p>This temple on its rock is the most photographed spot. Arrive early to find a good location. Use a telephoto lens to isolate the temple, or a wide-angle to include foreground rocks.</p>
      
      <h2>Jimbaran Bay: Intimacy</h2>
      <p>This arc-shaped bay offers more intimate sunsets. Fishing boats create perfect silhouettes. The beach is less crowded than Tanah Lot.</p>
      
      <h2>Mount Batur: Altitude</h2>
      <p>For the brave, sunrise from Mount Batur summit is unforgettable. At dusk, villages below light up creating a magical landscape.</p>
      
      <h2>Technical Settings</h2>
      <p>Expose for the sky and recover shadows. Exposure bracketing advised. A tripod is essential. Wait 15-20 minutes after sunset: the most intense colors often come in the afterglow.</p>
      
      <h2>Beyond the Sun</h2>
      <p>Don't forget to turn around: the opposite sky often offers magnificent pastel colors. Clouds lit from below create spectacular formations.</p>
    `,
    featuredImage: `${UNSPLASH_BASE}/photo-1518548419970-58e3b4079ab2?w=1200&q=85&auto=format&fit=crop`,
    publishedAt: createMockTimestamp(new Date('2024-12-01')),
    author: 'Franck Vinel',
    excerpt: 'Les meilleurs spots et techniques pour capturer les couchers de soleil à Bali.',
    excerptEn: 'The best spots and techniques to capture sunsets in Bali.',
  },
];

