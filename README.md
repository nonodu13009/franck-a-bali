# VF Images - Portfolio Photo

Portfolio photographique multilingue inspiré du template Slate, construit avec Next.js 15, Firebase, et Tailwind CSS.

## 🚀 Stack Technique

- **Next.js 15** (App Router) avec React 19
- **TypeScript** strict
- **Tailwind CSS v4** (dark mode par défaut)
- **Firebase** (Firestore + Storage)
- **next-intl** pour le multilingue (FR/EN)
- **Radix UI** pour les composants accessibles

## 📋 Prérequis

- Node.js 18+ et npm/yarn/pnpm
- Compte Firebase avec projet configuré
- Variables d'environnement Firebase

## 🛠️ Setup Local

### 1. Installation des dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec vos variables Firebase :

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Structure Firebase

### Collections Firestore

#### `series`
Collection des séries photographiques.

```typescript
{
  id: string;
  title: string;           // Titre FR
  titleEn: string;        // Titre EN
  description?: string;    // Description FR
  descriptionEn?: string;  // Description EN
  coverImage: string;     // URL de l'image de couverture
  createdAt: Timestamp;
  order: number;           // Ordre d'affichage
  slug?: string;          // Slug pour l'URL (optionnel, utilise id sinon)
}
```

#### `images`
Collection des images associées aux séries.

```typescript
{
  id: string;
  seriesId: string;       // Référence à la série
  url: string;            // URL Firebase Storage
  alt: string;            // Texte alternatif FR
  altEn: string;         // Texte alternatif EN
  width: number;
  height: number;
  order: number;          // Ordre d'affichage
  metadata?: {            // Métadonnées optionnelles
    camera?: string;
    lens?: string;
    iso?: number;
    aperture?: string;
    shutterSpeed?: string;
    location?: string;
  };
}
```

#### `blog`
Collection des articles de blog.

```typescript
{
  id: string;
  slug: string;           // Slug pour l'URL
  title: string;          // Titre FR
  titleEn: string;        // Titre EN
  content: string;        // Contenu HTML/Markdown FR
  contentEn: string;      // Contenu HTML/Markdown EN
  featuredImage?: string; // URL image featured
  publishedAt: Timestamp;
  author: string;
  excerpt?: string;       // Extrait FR
  excerptEn?: string;     // Extrait EN
}
```

### Firebase Storage

Stockez vos images dans Firebase Storage et utilisez les URLs générées dans Firestore.

## 📝 Gestion du Contenu

### Ajouter une série

1. Créez un document dans la collection `series` avec les champs requis
2. Uploadez une image de couverture dans Firebase Storage
3. Ajoutez l'URL de l'image dans le champ `coverImage`
4. Créez des documents dans `images` avec `seriesId` correspondant

### Ajouter des images à une série

1. Uploadez les images dans Firebase Storage
2. Créez des documents dans `images` avec :
   - `seriesId` : ID de la série
   - `url` : URL Firebase Storage
   - `width` et `height` : Dimensions de l'image
   - `order` : Ordre d'affichage

### Ajouter un article de blog

1. Créez un document dans la collection `blog`
2. Utilisez un `slug` unique (ex: `mon-premier-article`)
3. Ajoutez le contenu HTML ou Markdown dans `content` et `contentEn`
4. Uploadez une image featured si nécessaire

## 🌍 Gestion des Langues

Le site supporte le français (FR) et l'anglais (EN) via `next-intl`.

### Ajouter une traduction

1. Modifiez les fichiers dans `src/messages/` :
   - `fr.json` pour le français
   - `en.json` pour l'anglais

2. Utilisez les traductions dans vos composants :

```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('nav');
  return <h1>{t('home')}</h1>;
}
```

### Ajouter une nouvelle langue

1. Ajoutez la locale dans `src/middleware.ts` :
```typescript
export const routing = {
  locales: ['fr', 'en', 'es'], // Ajoutez 'es'
  defaultLocale: 'fr',
};
```

2. Créez `src/messages/es.json` avec les traductions

## 🚢 Déploiement sur Vercel

### 1. Préparation

Assurez-vous que votre code est poussé sur GitHub.

### 2. Connexion à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez votre repository

### 3. Configuration des variables d'environnement

Dans les paramètres du projet Vercel, ajoutez toutes les variables `NEXT_PUBLIC_*` de votre `.env.local`.

### 4. Déploiement

Vercel détectera automatiquement Next.js et déploiera votre site. Chaque push sur `main` déclenchera un nouveau déploiement.

### 5. Configuration du domaine

Dans les paramètres du projet, ajoutez votre domaine personnalisé si nécessaire.

## 🎨 Personnalisation du Design

### Thème

Le thème dark est configuré dans `tailwind.config.ts`. Modifiez les couleurs dans `theme.extend.colors` :

```typescript
colors: {
  background: '#0c0c0c',  // Fond principal
  foreground: '#ffffff', // Texte principal
  // ...
}
```

### Typographie

La police Inter est utilisée par défaut. Pour changer :

1. Importez une nouvelle police dans `src/app/layout.tsx`
2. Mettez à jour `tailwind.config.ts` avec la nouvelle variable de police

## 🔧 Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run start` : Lance le serveur de production
- `npm run lint` : Lance ESLint

## 📁 Structure du Projet

```
franck-a-bali/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   │   ├── [locale]/    # Pages avec routing i18n
│   │   ├── layout.tsx   # Layout racine
│   │   └── globals.css  # Styles globaux
│   ├── components/      # Composants React
│   │   ├── layout/      # Header, Footer, etc.
│   │   ├── gallery/     # Composants galerie
│   │   └── blog/        # Composants blog
│   ├── lib/             # Utilitaires et helpers
│   │   ├── firebase/    # Configuration Firebase
│   │   └── i18n/        # Configuration i18n
│   ├── messages/        # Traductions (FR/EN)
│   ├── types/           # Types TypeScript
│   └── middleware.ts    # Middleware i18n
├── public/              # Assets statiques
└── package.json
```

## 🐛 Dépannage

### Erreur Firebase

- Vérifiez que toutes les variables d'environnement sont correctement configurées
- Vérifiez que les règles Firestore autorisent la lecture
- Vérifiez que Firebase Storage autorise l'accès public aux images

### Erreur i18n

- Vérifiez que les fichiers de traduction existent dans `src/messages/`
- Vérifiez que la locale est dans `routing.locales` du middleware

### Images ne s'affichent pas

- Vérifiez que les URLs Firebase Storage sont correctes
- Vérifiez que `next.config.ts` autorise les domaines Firebase Storage
- Vérifiez que les images existent dans Firebase Storage

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation next-intl](https://next-intl-docs.vercel.app/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## 📄 Licence

Ce projet est privé. Tous droits réservés.

## 👤 Auteur

VF Images - Portfolio photographique basé à Bali

---

Pour toute question ou problème, ouvrez une issue sur GitHub.

