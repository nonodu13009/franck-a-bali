# Design TODO - Mise à niveau VF Images

**Inspiration**: [Jimmy Nelson Website](https://www.jimmynelson.com/jimmy-nelson/)  
**Objectif**: Créer une expérience immersive et élégante pour mettre en valeur le portfolio photographique

---

## ✅ Déjà Implémenté

- [x] Curseur personnalisé avec point et cercle animés
- [x] Son de clic avec gong balinais
- [x] Structure de base avec Next.js 15 et TypeScript
- [x] Theme sombre élégant
- [x] Navigation i18n (FR/EN)
- [x] Galerie avec séries organisées

---

## 🎯 Priorité 1 - Court Terme (1-2 semaines)

### 1.1 Animations de Scroll

- [ ] **Fade-in au scroll**
  - Implémenter Intersection Observer
  - Ajouter animations fade-in sur les éléments au scroll
  - Timing: 0.6-0.8s avec ease-out
  - Fichiers: `globals.css`, créer `use-scroll-reveal.hook.ts`

- [ ] **Slide-up au scroll**
  - Animation translateY(-30px) → 0 + opacity 0 → 1
  - Appliquer sur les titres et paragraphes
  - Délai progressif pour plusieurs éléments (stagger)
  - Fichiers: `globals.css`, hook personnalisé

- [ ] **Parallax subtil**
  - Effet parallax léger sur les images hero
  - Vitesse de défilement différenciée (0.5x)
  - Utiliser `transform: translateY()` avec scroll position
  - Fichiers: créer `use-parallax.hook.ts`

### 1.2 Espacement et Respiration

- [ ] **Révision des marges globales**
  - Augmenter les marges latérales: min 5% → 10-15%
  - Espacement vertical entre sections: min 80px → 120-150px
  - Padding intérieur des containers: revoir pour plus d'air
  - Fichiers: `globals.css`, `tailwind.config.ts`

- [ ] **Largeur maximale du contenu texte**
  - Limiter à 800px max pour le confort de lecture
  - Centrer horizontalement avec marges auto
  - Appliquer sur pages About et Blog
  - Fichiers: composants de layout

### 1.3 Transitions de Page

- [ ] **View Transitions API**
  - Implémenter View Transitions entre les pages
  - Fade croisé doux (crossfade) entre routes
  - Durée: 400-500ms
  - Fichiers: `app/[locale]/layout.tsx`

- [ ] **Loading states**
  - Skeleton loaders pour les images
  - Transitions douces lors du chargement
  - Indicateur de progression subtil
  - Fichiers: créer `loading-skeleton.tsx`

### 1.4 Optimisation des Images

- [ ] **Format WebP**
  - Convertir toutes les images en WebP
  - Fallback JPEG pour compatibilité
  - Script de conversion automatique
  - Dossier: `public/images/`

- [ ] **Lazy loading amélioré**
  - Utiliser Next.js Image avec priority sur hero
  - Blur placeholder pour toutes les images
  - Preload des images critiques
  - Fichiers: tous les composants avec images

- [ ] **Responsive images**
  - Générer plusieurs tailles (thumbnail, medium, large, full)
  - Utiliser srcset approprié
  - Optimiser pour mobile (réduction qualité/taille)
  - Outils: Sharp ou next-image-export-optimizer

---

## 🎨 Priorité 2 - Moyen Terme (3-4 semaines)

### 2.1 Refonte Page About

- [ ] **Structure narrative**
  - Organiser en sections scrollables avec storytelling
  - Alterner texte et images personnelles
  - Progression: Origines → Voyage à Bali → Philosophie → Vision
  - Fichier: `src/app/[locale]/about/page.tsx`

- [ ] **Intégration photos personnelles**
  - 4-6 photos d'ambiance/portrait dans le récit
  - Format vertical et horizontal alternés
  - Pleine largeur ou encadrées selon le contexte
  - Dossier: `public/images/about/`

- [ ] **Citations en évidence**
  - Pull quotes avec typographie élégante
  - Texte plus grand, style serif italic
  - Bordure gauche subtile ou guillemets décoratifs
  - Composant: `pull-quote.tsx`

### 2.2 Améliorations Galerie

- [ ] **Hover effects sur images**
  - Zoom subtil (scale 1.05) au survol
  - Transition douce 400ms
  - Overlay avec titre/info au hover
  - Fichier: `image-card.tsx`

- [ ] **Transitions entre séries**
  - Crossfade lors du changement de série
  - Animation de sortie puis entrée
  - Preload de la série suivante
  - Fichier: `series-layout.tsx`

- [ ] **Modal/Lightbox amélioré**
  - Ouverture avec animation scale + fade
  - Navigation clavier (arrows, esc)
  - Swipe sur mobile
  - Créer: `image-lightbox.tsx`

- [ ] **Filtres et tri**
  - Filtrer par thématique/lieu
  - Tri par date, popularité
  - Animations lors du changement de filtre
  - Interface épurée style "tag cloud"

### 2.3 Typographie Avancée

- [ ] **Police serif premium**
  - Intégrer une serif élégante (Playfair Display, Cormorant, Lora)
  - Utiliser pour titres principaux et citations
  - Variable font pour optimisation
  - Fichier: `app/layout.tsx`, `tailwind.config.ts`

- [ ] **Hiérarchie typographique raffinée**
  - H1: 48-64px (desktop), 32-40px (mobile)
  - H2: 36-48px (desktop), 28-32px (mobile)
  - H3: 24-32px, H4: 20-24px
  - Body: 18px, line-height 1.8
  - Fichier: `globals.css`

- [ ] **Styles de texte avancés**
  - Italique pour emphase et citations
  - Small caps pour sous-titres
  - Letter-spacing ajusté pour majuscules
  - Drop caps pour débuts de sections
  - Fichier: `globals.css`, composants utilitaires

### 2.4 Micro-interactions

- [ ] **Boutons et CTA**
  - Hover: bordure animée ou background subtle
  - Active: scale(0.98) avec shadow réduite
  - Loading state avec spinner élégant
  - Ripple effect optionnel
  - Fichiers: `button.tsx` ou classe globale

- [ ] **Navigation menu**
  - Hover avec soulignement animé (expand from center)
  - Active state avec opacité réduite
  - Mobile: menu slide-in smooth depuis droite/haut
  - Fichier: `Header.tsx`

- [ ] **Footer links**
  - Hover: translation subtile ou color shift
  - Séparateurs animés
  - Icônes social media avec hover effects
  - Fichier: `Footer.tsx`

---

## 🚀 Priorité 3 - Long Terme (2-3 mois)

### 3.1 Page d'Accueil Immersive

- [ ] **Hero section dynamique**
  - Carrousel fullscreen avec transitions fluides
  - Autoplay lent (6-8s par image)
  - Contrôles discrets (dots ou arrows)
  - Texte overlay avec animations
  - Fichier: créer `hero-section.tsx`

- [ ] **Scroll indicator**
  - Flèche ou texte "Scroll to explore" animé
  - Disparaît après premier scroll
  - Animation bounce subtile
  - Position: bottom center

- [ ] **Grid mosaïque**
  - Disposition type masonry pour les séries featured
  - Tailles variées (2:1, 1:1, 1:2)
  - Hover reveal avec info
  - Librairie: react-masonry-css

### 3.2 Page Blog Enrichie

- [ ] **Hero par article**
  - Image featured fullwidth
  - Titre en overlay avec gradient
  - Métadonnées élégantes (date, temps de lecture)
  - Fichier: `blog/[slug]/page.tsx`

- [ ] **Lecture confortable**
  - Largeur max 680px
  - Typographie optimisée pour lecture longue
  - Images intégrées pleine largeur ou caption
  - Sidebar sticky avec TOC
  - Fichier: créer `article-layout.tsx`

- [ ] **Navigation article**
  - Précédent/Suivant avec preview image
  - Articles reliés en fin d'article
  - Progress bar de lecture en top
  - Composant: `article-navigation.tsx`

### 3.3 Expériences Interactives

- [ ] **Série "Journey"**
  - Page dédiée avec carte interactive
  - Points cliquables pour chaque photo
  - Modal avec contexte de la photo
  - Animations de trajet entre points
  - Inspiration: Jimmy Nelson compass

- [ ] **Timeline photographique**
  - Frise chronologique des séries
  - Scroll horizontal ou vertical
  - Années en milestone
  - Thumbnails avec hover preview
  - Page: `/gallery/timeline`

- [ ] **Mode présentation**
  - Diaporama automatique des photos
  - Plein écran avec navigation minimale
  - Transition fade ou slide
  - Musique d'ambiance optionnelle
  - Accessible depuis chaque série

### 3.4 Performance et SEO

- [ ] **Code splitting avancé**
  - Route-based splitting
  - Component lazy loading
  - Dynamic imports pour composants lourds
  - Bundle analyzer pour optimisation

- [ ] **Preloading intelligent**
  - Preload links au hover
  - Prefetch images de la série au-dessus du fold
  - Service worker pour cache stratégique
  - Next.js: utiliser `<Link prefetch>`

- [ ] **SEO avancé**
  - Schema.org markup (Article, ImageObject, Person)
  - Open Graph images dynamiques par page
  - Twitter cards enrichies
  - Sitemap XML optimisé
  - Fichiers: métadonnées par page

- [ ] **Analytics et tracking**
  - Google Analytics 4
  - Tracking des interactions (curseur, clics photos)
  - Heatmaps (Hotjar ou similaire)
  - A/B testing pour CTA

---

## 🎵 Améliorations Audio

### Son de Clic Actuel

- [ ] **Toggle on/off**
  - Bouton dans header ou settings pour activer/désactiver
  - Persister dans localStorage
  - Icon speaker avec animation
  - Fichier: créer `audio-toggle.tsx`

- [ ] **Volume control**
  - Slider discret dans menu settings
  - Range: 0 → 1 (actuellement 0.5)
  - Preview au changement
  - Persister dans localStorage

- [ ] **Sons contextuels**
  - Son différent pour navigation vs. action
  - Son pour ouverture/fermeture modal
  - Son pour like/favorite (si implémenté)
  - Dossier: `public/sounds/` avec plusieurs fichiers

### Sons d'Ambiance (Optionnel)

- [ ] **Background music**
  - Musique d'ambiance balinaise très subtile
  - Loop seamless
  - Fade in/out entre pages
  - Volume très bas (0.1-0.2)
  - Activable uniquement par l'utilisateur

---

## 🎨 Design System

### Couleurs

- [ ] **Palette étendue**
  - Ajouter des nuances intermédiaires
  - Variables CSS pour tous les états (hover, active, disabled)
  - Dark mode optimisé
  - Fichier: `globals.css`, `tailwind.config.ts`

- [ ] **Mode clair optionnel**
  - Créer une palette light
  - Toggle theme dans header
  - Transition smooth entre modes
  - Persister préférence utilisateur

### Composants

- [ ] **Librairie de composants**
  - Documenter tous les composants réutilisables
  - Storybook ou similaire pour showcase
  - Props typés et validés
  - Exemples d'utilisation

- [ ] **Consistency check**
  - Audit de tous les espacements
  - Unification des border-radius
  - Vérification des shadows
  - Harmonisation des transitions

---

## 🧪 Tests et Qualité

### Tests

- [ ] **Tests unitaires**
  - Jest + React Testing Library
  - Coverage: composants critiques
  - Tests des hooks personnalisés
  - CI/CD intégration

- [ ] **Tests E2E**
  - Playwright ou Cypress
  - Parcours utilisateur complets
  - Tests de navigation
  - Tests responsive

### Accessibilité

- [ ] **WCAG 2.1 AA compliance**
  - Audit avec axe DevTools
  - Contraste des couleurs vérifié
  - Navigation clavier complète
  - ARIA labels sur éléments interactifs

- [ ] **Screen reader testing**
  - Tests avec NVDA/JAWS
  - Alt text sur toutes les images
  - Landmarks HTML5 appropriés
  - Skip links

### Performance

- [ ] **Lighthouse 90+**
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100
  - Optimisations itératives

- [ ] **Core Web Vitals**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
  - Monitoring continu

---

## 📱 Mobile First

### Optimisations Mobile

- [ ] **Touch gestures**
  - Swipe pour galerie
  - Pull to refresh (si pertinent)
  - Long press pour options
  - Pinch to zoom sur images

- [ ] **Navigation mobile**
  - Bottom nav bar optionnelle
  - Thumb-friendly zones
  - Menu hamburger optimisé
  - Transitions adaptées

- [ ] **Performance mobile**
  - Images optimisées pour 3G
  - Lazy loading agressif
  - Réduire JS bundle pour mobile
  - Service worker pour offline

---

## 🔧 Infrastructure

### Déploiement

- [ ] **CI/CD pipeline**
  - Tests automatiques avant deploy
  - Preview deployments pour PR
  - Rollback automatique si erreur
  - Notifications Slack/Discord

- [ ] **Monitoring**
  - Sentry pour error tracking
  - Vercel Analytics
  - Uptime monitoring
  - Performance monitoring

### Documentation

- [ ] **README complet**
  - Setup instructions
  - Architecture overview
  - Contribution guidelines
  - Deployment process

- [ ] **Documentation technique**
  - Structure des dossiers
  - Conventions de code
  - Guide des composants
  - API endpoints (si applicable)

---

## 📊 Métriques de Succès

### KPIs à suivre

- [ ] **Engagement utilisateur**
  - Temps moyen sur site: > 2 min
  - Pages par session: > 3
  - Bounce rate: < 40%
  - Retours visiteurs: > 30%

- [ ] **Performance technique**
  - Lighthouse score: > 90
  - Temps de chargement: < 2s
  - Core Web Vitals: vert
  - Taux d'erreur: < 0.1%

- [ ] **Conversions**
  - Taux de contact: mesurer
  - Newsletter signups: objectif X/mois
  - Social shares: tracking
  - Engagement blog: temps de lecture

---

## 🗓️ Planning Global

### Sprint 1 (Semaines 1-2): Animations et Espacement
- Scroll animations (fade-in, slide-up, parallax)
- Révision des marges et espacements
- Transitions de page
- Optimisation images (WebP, lazy loading)

### Sprint 2 (Semaines 3-4): Galerie et Typographie
- Hover effects galerie
- Transitions entre séries
- Police serif premium
- Hiérarchie typographique
- Micro-interactions boutons

### Sprint 3 (Semaines 5-6): Page About et Blog
- Refonte page About avec storytelling
- Intégration photos personnelles
- Blog: hero et layout confortable
- Navigation articles

### Sprint 4 (Semaines 7-8): Page d'accueil
- Hero section dynamique
- Grid mosaïque
- Scroll indicators
- Mobile optimizations

### Sprint 5 (Semaines 9-10): Expériences Interactives
- Timeline photographique
- Mode présentation
- Série "Journey" (si applicable)

### Sprint 6 (Semaines 11-12): Polish et Optimisation
- Performance tuning
- SEO avancé
- Tests A/B
- Analytics setup
- Documentation

---

## 💡 Notes Importantes

### Principes à Respecter

1. **Less is More**: Toujours privilégier la simplicité
2. **Content First**: Le design sert la photographie, pas l'inverse
3. **Performance Matters**: Ne jamais sacrifier la vitesse pour un effet
4. **Progressive Enhancement**: Site fonctionnel même sans JS
5. **Accessibility**: Inclure tout le monde dans l'expérience

### Inspirations Continues

- Jimmy Nelson: https://www.jimmynelson.com
- Awwwards pour tendances: https://www.awwwards.com
- CSS-Tricks pour techniques: https://css-tricks.com
- Codrops pour animations: https://tympanus.net/codrops

### Ressources

- **Animations**: GSAP, Framer Motion, React Spring
- **Images**: Sharp, next-image-export-optimizer
- **Icons**: Lucide React, Heroicons
- **Utils**: clsx, tailwind-merge, date-fns

---

**Dernière mise à jour**: Décembre 2024  
**Version**: 1.0  
**Statut**: En cours

---

## ✨ Quick Wins (À faire en premier)

Si temps limité, prioriser ces tâches à fort impact:

1. ✅ Curseur personnalisé (FAIT)
2. ✅ Son de clic (FAIT)
3. ⚡ Fade-in au scroll (Impact visuel immédiat)
4. ⚡ Espacement généreux (Respiration immédiate)
5. ⚡ Images en WebP (Performance visible)
6. ⚡ Hover effect sur galerie (Interactivité)
7. ⚡ Police serif pour titres (Élégance instantanée)
8. ⚡ Transitions de page (Fluidité perçue)

Ces 8 éléments (dont 2 déjà faits) transformeront l'expérience en < 1 semaine de travail.

