# Refonte Page About - Plan de Redesign

**Page actuelle**: https://franck-a-bali.vercel.app/fr/about  
**Objectif**: Transformer une page linéaire monotone en expérience immersive avec style et rythme

---

## 🎯 Diagnostic de la Page Actuelle

### Problèmes Identifiés

❌ **Monotonie visuelle**
- Toutes les sections ont le même format (texte + image)
- Pas de variation de taille ou de disposition
- Rythme répétitif et prévisible

❌ **Manque d'effet "wow"**
- Pas d'animations au scroll significatives
- Images statiques sans parallax
- Transitions basiques

❌ **Typographie plate**
- Pas de hiérarchie forte
- Pas de citations en évidence (pull quotes)
- Texte uniforme sans variation

❌ **Pas d'identité balinaise**
- Aucune couleur tropicale utilisée
- Pas de référence visuelle à Bali
- Manque d'atmosphère locale

❌ **Espacement insuffisant**
- 32px entre sections (space-y-32) = correct mais uniforme
- Pas de respiration variable selon l'importance

---

## ✨ Vision de la Nouvelle Page About

### Concept : "Journey Through Light"

**Storytelling en 5 actes** avec transitions visuelles fortes entre chaque acte :

1. **Prologue** - Hero immersif avec parallax
2. **Acte I** - Les origines du photographe
3. **Acte II** - L'arrivée à Bali (moment charnière)
4. **Acte III** - La philosophie artistique
5. **Épilogue** - Invitation à explorer

Chaque acte a son propre style visuel, son rythme, ses couleurs dominantes.

---

## 🎨 Structure Détaillée par Section

### Section 1: Hero - "L'Appel du Voyage"

**Type**: Hero fullscreen avec parallax multi-couches

#### Design
```
┌─────────────────────────────────────┐
│                                     │
│         [Image Bali Parallax]       │
│                                     │
│     "À LA RECHERCHE DE FRANCK"      │
│                                     │
│  Un voyage à travers l'œil et       │
│  l'âme d'un photographe             │
│                                     │
│         [Scroll Indicator]          │
│                                     │
└─────────────────────────────────────┘
```

#### Caractéristiques
- **Background**: Image Bali avec overlay gradient jungle → océan
- **Parallax**: 3 couches (background lent, texte normal, particules rapides)
- **Typographie**: Serif large + italique sur "FRANCK"
- **Animation**: Fade in progressif + slide up
- **Couleurs**: Gradient vert jungle (#1A3A2E) → bleu océan (#0A4C6B)
- **Particules**: Feuilles tombantes subtiles (optionnel)
- **Scroll hint**: Flèche animée avec texte "Découvrir mon histoire"

#### Technique
- Utiliser `useScroll` de Framer Motion
- Transform translateY selon scroll position
- Opacity fade out progressif

---

### Section 2: Timeline - "Le Chemin Parcouru"

**Type**: Timeline verticale interactive avec photos

#### Design
```
    📍 2015
    │
    ├── [Photo] "Premiers pas"
    │    Texte court
    │
    📍 2018
    │
    ├── [Photo] "L'éveil"
    │    Texte court
    │
    📍 2020
    │
    ├── [Photo] "Le départ"
    │    Texte court
```

#### Caractéristiques
- **Layout**: Timeline centrale avec photos alternées gauche/droite
- **Milestones**: Années en gros avec badge doré
- **Photos**: Rondes ou carrées avec border tropicale
- **Ligne centrale**: Dégradé vert palmier
- **Animation**: Révélation progressive au scroll
- **Hover**: Photos s'agrandissent + info supplémentaire

#### Couleurs
- Timeline: Vert palmier (#52B788)
- Badges années: Sable doré (#C9A675)
- Photos: Border vert jungle transparent

---

### Section 3: Split Hero - "L'Appel de Bali"

**Type**: Écran divisé 50/50 avec révélation

#### Design
```
┌──────────────────┬──────────────────┐
│                  │                  │
│                  │                  │
│   [Image Bali]   │   [Texte Grand]  │
│   Fullheight     │   Centré         │
│                  │                  │
│                  │                  │
└──────────────────┴──────────────────┘
```

#### Caractéristiques
- **Gauche**: Photo Bali immersive (jungle ou océan)
- **Droite**: Texte grand format avec citation en évidence
- **Animation**: Slide in opposé (gauche← droite→)
- **Parallax**: Image se déplace légèrement au scroll
- **Citation**: 
  > "À Bali, j'ai trouvé plus qu'un lieu,  
  > j'ai trouvé une lumière"
  
  En typographie serif italique, taille XXL

#### Couleurs
- Background droite: Crème (#F8F3E6)
- Citation: Vert jungle (#1A3A2E)
- Accent: Frangipani (#F4A261) sur mot clé

---

### Section 4: Galerie Mosaïque - "Fragments d'Instants"

**Type**: Grid masonry avec images variées

#### Design
```
┌────┬─────┬────┐
│    │     │    │
│ 1  │  2  │ 3  │
│    │     │    │
├────┴──┬──┴────┤
│       │       │
│   4   │   5   │
│       │       │
└───────┴───────┘
```

#### Caractéristiques
- **Layout**: Masonry 3 colonnes (desktop), 2 (tablet), 1 (mobile)
- **Tailles variables**: 1:1, 2:1, 1:2 mixés
- **Hover**: Zoom + overlay avec texte court
- **Chargement**: Staggered animation (cascade)
- **Overlay**: Gradient vert jungle semi-transparent

#### Images suggérées
1. Portrait en noir et blanc
2. Paysage Bali horizontal
3. Détail architecture
4. Scène de rue vertical
5. Coucher de soleil

---

### Section 5: Quote Full Width - "La Philosophie"

**Type**: Citation pleine largeur avec background coloré

#### Design
```
╔═══════════════════════════════════╗
║                                   ║
║  "Capturer l'instant où la        ║
║   lumière révèle l'invisible"     ║
║                                   ║
║           — Franck                ║
║                                   ║
╚═══════════════════════════════════╝
```

#### Caractéristiques
- **Background**: Gradient jungle (#2D5A4D) avec overlay image Bali (10% opacity)
- **Texte**: Blanc chaud (#FEFAE0), très grand (48-72px)
- **Typographie**: Serif italique
- **Padding**: 120px vertical pour respiration
- **Animation**: Texte apparaît lettre par lettre au scroll (optionnel)
- **Bordure**: Ligne dorée subtile en haut et bas

---

### Section 6: Texte + Images Flottantes - "L'Approche"

**Type**: Texte principal avec images qui "flottent" autour

#### Design
```
        [img]
                    Texte principal
    Texte           long sur
    sur             plusieurs
    plusieurs       lignes...
    lignes...               [img]
                    
        [img]
```

#### Caractéristiques
- **Layout**: Texte centré max-width 800px
- **Images**: Positionnées en absolute, sortent du flow
- **Effet**: Parallax différent pour chaque image
- **Tailles**: Variables (petites à moyennes)
- **Formes**: Rondes ou carrées avec rotation légère
- **Z-index**: Certaines passent au-dessus, d'autres derrière

---

### Section 7: Stats - "En Chiffres"

**Type**: Compteurs animés avec icônes

#### Design
```
┌──────────┬──────────┬──────────┬──────────┐
│    📸    │    🌍    │    ⭐    │    📅    │
│   500+   │    25    │   4.9    │     5    │
│  Photos  │   Pays   │  Rating  │  Années  │
└──────────┴──────────┴──────────┴──────────┘
```

#### Caractéristiques
- **Layout**: 4 colonnes (2 sur mobile)
- **Animation**: Compteurs qui s'incrémentent au scroll
- **Icônes**: Style line-art tropical
- **Couleurs**: Icônes vert palmier, chiffres bleu océan
- **Background**: Beige sable (#E5DCC5)
- **Padding**: 80px vertical

#### Stats proposés
- 500+ photos dans la collection
- 25 pays visités
- 4.9/5 satisfaction clients
- 5 années à Bali

---

### Section 8: Parallax Image - "L'Essence de Bali"

**Type**: Image fullscreen avec parallax fort

#### Design
```
┌─────────────────────────────────────┐
│                                     │
│        [Image Bali Landscape]       │
│        Parallax Speed 0.3x          │
│                                     │
│     "Bali n'est pas qu'un décor,    │
│      c'est une source d'inspiration"│
│                                     │
└─────────────────────────────────────┘
```

#### Caractéristiques
- **Image**: Paysage iconique de Bali (rizières ou temple)
- **Hauteur**: 100vh
- **Parallax**: Vitesse 0.3x (très lent)
- **Overlay**: Gradient subtle pour lisibilité texte
- **Texte**: Centré, blanc, taille XXL
- **Effet**: Fixed background avec scroll content over

---

### Section 9: Process - "Comment Je Travaille"

**Type**: Cards avec hover reveal

#### Design
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   [Icon]    │ │   [Icon]    │ │   [Icon]    │
│             │ │             │ │             │
│  Observer   │ │  Composer   │ │  Capturer   │
│             │ │             │ │             │
│  Hover →    │ │  Hover →    │ │  Hover →    │
│  [Details]  │ │  [Details]  │ │  [Details]  │
└─────────────┘ └─────────────┘ └─────────────┘
```

#### Caractéristiques
- **Layout**: 3 cards horizontales (stack sur mobile)
- **Design**: Minimaliste avec beaucoup d'air
- **Hover**: Card s'élève + texte détaillé apparaît
- **Icônes**: Style tropical (œil, cadre, appareil)
- **Couleurs**: 
  - Card 1: Accent vert palmier
  - Card 2: Accent bleu océan
  - Card 3: Accent frangipani
- **Border**: Subtile, couleur de l'accent

#### Étapes
1. **Observer** - "Je prends le temps de comprendre la lumière"
2. **Composer** - "Je cherche l'équilibre et l'harmonie"
3. **Capturer** - "Je saisis l'instant avec intention"

---

### Section 10: Video/Image Duo - "Un Regard, Une Vision"

**Type**: Video + texte côte à côte

#### Design
```
┌──────────────────┬──────────────────┐
│                  │                  │
│  [Video/GIF]     │   Texte Long     │
│  Portrait ou     │   sur            │
│  B-Roll Bali     │   ma vision      │
│                  │                  │
└──────────────────┴──────────────────┘
```

#### Caractéristiques
- **Gauche**: Video loop ou GIF animé (portrait de Franck ou B-roll)
- **Droite**: Texte narratif long format
- **Ratio**: 40% video / 60% texte
- **Video**: Autoplay, loop, muted
- **Texte**: Typographie confortable, espacement généreux
- **Alternative**: Si pas de video, grande photo portrait

---

### Section 11: Map Interactive - "Mes Lieux Favoris à Bali"

**Type**: Carte stylisée avec pins cliquables

#### Design
```
┌─────────────────────────────────────┐
│                                     │
│         [Carte Bali]                │
│                                     │
│  📍 Ubud  📍 Canggu  📍 Uluwatu     │
│                                     │
│  [Clic = Preview photo du lieu]    │
│                                     │
└─────────────────────────────────────┘
```

#### Caractéristiques
- **Carte**: Style monochrome vert jungle
- **Pins**: Icônes appareil photo
- **Interaction**: Hover = nom lieu, Click = modal photo
- **Photos**: 3-5 lieux favoris avec mini description
- **Style**: Inspiré de Google Maps en mode custom
- **Alternative simple**: Illustration stylisée sans map API

---

### Section 12: Behind the Scenes - "Dans les Coulisses"

**Type**: Slider horizontal avec photos BTS

#### Design
```
← [Photo 1] [Photo 2] [Photo 3] [Photo 4] →
     BTS      BTS      BTS      BTS
```

#### Caractéristiques
- **Layout**: Carrousel horizontal
- **Photos**: Behind the scenes (équipement, process)
- **Navigation**: Flèches + dots
- **Effet**: Ken Burns zoom léger sur photo active
- **Légendes**: Texte court sous chaque photo
- **Autoplay**: 5 secondes entre transitions

---

### Section 13: Testimonials - "Ce Qu'ils Disent"

**Type**: Témoignages clients avec photos

#### Design
```
┌──────────────────────────────────────┐
│  "..."                               │
│  Texte témoignage centré             │
│                                      │
│  [Photo Client]  Nom - Rôle          │
│                                      │
│         ⚫ ⚪ ⚪                       │
└──────────────────────────────────────┘
```

#### Caractéristiques
- **Layout**: Un témoignage à la fois, centré
- **Navigation**: Dots en bas
- **Photo**: Ronde, petite, border dorée
- **Typographie**: Serif italique pour citation
- **Autoplay**: 8 secondes
- **Couleurs**: Background beige sable (#E5DCC5)

#### Témoignages (exemples à adapter)
1. "Franck a capturé l'essence de notre mariage à Bali avec une sensibilité rare."
2. "Ses portraits racontent des histoires. Un vrai artiste."
3. "Professionnel, créatif, passionné. Recommandé à 100%."

---

### Section 14: Final CTA - "Travaillons Ensemble"

**Type**: Call-to-action immersif

#### Design
```
╔═══════════════════════════════════╗
║                                   ║
║   Prêt à capturer vos instants ?  ║
║                                   ║
║   [Voir la Galerie]  [Contact]    ║
║                                   ║
╚═══════════════════════════════════╝
```

#### Caractéristiques
- **Background**: Gradient bleu océan (#1565A0) → vert jungle (#2D5A4D)
- **Texte**: Blanc chaud, centré, grand
- **Boutons**: 
  - Primaire: Frangipani (#F4A261) avec hover scale
  - Secondaire: Border blanc avec hover fill
- **Padding**: 120px vertical
- **Animation**: Apparition avec scale + fade

---

## 🎭 Effets et Animations à Implémenter

### Animations au Scroll

1. **Fade In + Slide Up**
   - Tous les éléments entrent par le bas
   - Timing: 0.6-0.8s
   - Easing: ease-out

2. **Stagger Animation**
   - Éléments d'une même section apparaissent en cascade
   - Délai: 0.1-0.2s entre chaque

3. **Parallax Multi-vitesse**
   - Hero: 3 couches (0.2x, 1x, 1.5x)
   - Images: 0.5x plus lent que le scroll
   - Texte: vitesse normale

4. **Progress Indicator**
   - Barre de progression en haut fixe
   - Couleur: gradient vert palmier → bleu océan
   - S'anime avec le scroll

5. **Counter Animation**
   - Stats qui s'incrémentent au scroll
   - Effet compteur rapide

### Transitions entre Sections

1. **Clip Path Reveal**
   - Section suivante "coupe" la précédente
   - Forme géométrique ou organique

2. **Color Shift**
   - Background change progressivement
   - Du crème au beige au vert léger

3. **Blur to Focus**
   - Section entrante floue puis nette
   - Section sortante nette puis floue

### Hovers et Interactions

1. **Images**
   - Zoom 1.05x au hover
   - Overlay coloré apparaît
   - Transition: 400ms

2. **Boutons**
   - Scale 1.05 + shadow augmente
   - Couleur shift vers accent warm
   - Ripple effect au clic

3. **Cards**
   - Élévation (translateY -8px)
   - Shadow augmente
   - Border color change

---

## 🎨 Palette de Couleurs par Section

| Section | Couleur Dominante | Usage |
|---------|------------------|-------|
| Hero | Gradient jungle → océan | Background overlay |
| Timeline | Vert palmier | Ligne centrale |
| Split Bali | Vert jungle | Citations |
| Mosaïque | Crème | Background |
| Quote | Vert jungle foncé | Background |
| Stats | Beige sable | Background |
| Parallax | N/A | Image pure |
| Process | Multi-accents | Une couleur par card |
| Video Duo | Crème | Background |
| Map | Vert jungle | Carte style |
| BTS | Crème | Background |
| Testimonials | Beige sable | Background |
| CTA | Gradient océan → jungle | Background |

---

## 📐 Espacements et Rythme

### Principe: Respiration Variable

Au lieu de `space-y-32` uniforme:

```css
Section 1 (Hero): 100vh
↓ 0px (collé)
Section 2 (Timeline): auto + 120px padding top/bottom
↓ 160px
Section 3 (Split): auto + 80px padding
↓ 200px (grand souffle)
Section 4 (Mosaïque): auto + 100px padding
↓ 0px (collé)
Section 5 (Quote): auto + 120px padding
↓ 160px
...
```

### Règle d'Or

- **Changement d'acte**: 200px+ d'espacement
- **Même acte**: 80-120px
- **Respiration**: Sections quotes ou images seules = collées à précédente
- **Rythme**: Alterner espaces larges et resserrés

---

## 🎯 Typographie Avancée

### Hiérarchie

```css
H1 (Hero): 64-96px, Serif, Bold
H2 (Sections): 48-64px, Serif, Semibold  
H3 (Sous-titres): 32-40px, Sans, Medium
Body: 18-20px, Sans, Regular, line-height 1.8
Quote: 40-56px, Serif, Italic
Caption: 14-16px, Sans, Regular
```

### Polices à Ajouter

**Serif**: Playfair Display ou Cormorant Garamond
- Pour: Titres, citations, emphase
- Poids: Regular, Italic, Bold

**Sans**: Garder Inter
- Pour: Corps de texte, navigation
- Poids: Regular, Medium, Semibold

### Effets Typographiques

1. **Drop Caps**: Première lettre de section agrandie
2. **Italique stratégique**: Mots clés en italique
3. **Small Caps**: Sous-titres en petites majuscules
4. **Letter-spacing**: Augmenté pour titres en caps
5. **Text Shadow**: Subtile sur textes sur images

---

## 🖼️ Images à Préparer

### Images Personnelles de Franck

Recommandé d'avoir:

1. **Portrait professionnel** (pour hero ou about)
2. **En action** (en train de photographier)
3. **Avec équipement** (pour BTS)
4. **Dans paysages Bali** (contexte local)
5. **Noir et blanc artistique** (pour variation)

### Images Bali

1. **Rizières en terrasse** (iconique)
2. **Temple au lever/coucher** (spirituel)
3. **Forêt/jungle** (nature)
4. **Océan/plage** (eau)
5. **Détails architecture** (culture)
6. **Street scenes** (vie locale)

### Format et Optimisation

- **Format**: WebP avec fallback JPEG
- **Résolutions**: 
  - Hero: 1920x1080 minimum
  - Sections: 1200x800
  - Portraits: 800x1200
- **Compression**: 80% quality
- **Lazy loading**: Toutes sauf hero
- **Blur placeholder**: Généré automatiquement

---

## 🎬 Composants à Créer

### Nouveaux Composants

1. **`parallax-hero.tsx`** - Hero avec parallax multi-couches
2. **`timeline-vertical.tsx`** - Timeline avec animations
3. **`split-screen-section.tsx`** - Écran divisé 50/50
4. **`masonry-grid.tsx`** - Grid mosaïque responsive
5. **`full-quote.tsx`** - Citation pleine largeur
6. **`floating-images-text.tsx`** - Texte avec images flottantes
7. **`stats-counter.tsx`** - Compteurs animés
8. **`parallax-image-section.tsx`** - Image fixe parallax
9. **`process-cards.tsx`** - Cards processus avec hover
10. **`video-text-duo.tsx`** - Video + texte côte à côte
11. **`carousel-bts.tsx`** - Carrousel horizontal
12. **`testimonials-slider.tsx`** - Slider témoignages
13. **`immersive-cta.tsx`** - CTA final avec gradient
14. **`scroll-progress.tsx`** - Barre de progression

### Hooks Personnalisés

1. **`use-parallax.hook.ts`** - Calcul parallax au scroll
2. **`use-scroll-reveal.hook.ts`** - Détection visibility + animation
3. **`use-counter.hook.ts`** - Animation compteurs
4. **`use-scroll-progress.hook.ts`** - Progression scroll

---

## 📱 Responsive Strategy

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Adaptations par Section

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero | Stack, texte réduit | Même | Full parallax |
| Timeline | Vertical simple | Vertical améliorée | Avec alternance |
| Split | Stack 100% | 60/40 | 50/50 |
| Mosaïque | 1 col | 2 cols | 3 cols |
| Stats | 2 cols | 4 cols | 4 cols |
| Process | Stack | 2+1 | 3 cols |

### Désactivations Mobile

- Parallax complexe → images fixes
- Floating images → inline
- Animations lourdes → fade simple
- Video autoplay → poster image

---

## ⚡ Performance Considerations

### Critical Path

1. **Hero**: Prioritaire, chargement immédiat
2. **First 2 sections**: Preload
3. **Reste**: Lazy load agressif

### Optimisations

- **Images**: Lazy load + blur placeholder
- **Animations**: `will-change` sur éléments animés
- **Parallax**: Throttle scroll events (16ms)
- **Videos**: Charger au scroll + poster frame
- **Fonts**: Preload Serif pour hero

### Budget Performance

- **LCP**: < 2.5s (Hero image optimisée)
- **FID**: < 100ms (Scroll smooth sans lag)
- **CLS**: < 0.1 (Placeholders corrects)
- **Time to Interactive**: < 3.5s

---

## 🎯 Plan d'Implémentation

### Phase 1: Structure (2-3 jours)

- [ ] Créer les 14 nouveaux composants
- [ ] Créer les hooks personnalisés
- [ ] Restructurer `about/page.tsx`
- [ ] Intégrer police Serif (Playfair Display)

### Phase 2: Styling (2-3 jours)

- [ ] Appliquer palette balinaise par section
- [ ] Implémenter typographie avancée
- [ ] Espacements variables entre sections
- [ ] Backgrounds et gradients

### Phase 3: Animations (2-3 jours)

- [ ] Parallax hero et images
- [ ] Scroll reveal sur tous éléments
- [ ] Compteurs animés
- [ ] Transitions entre sections
- [ ] Hovers et micro-interactions

### Phase 4: Contenu (1-2 jours)

- [ ] Préparer/optimiser images Franck
- [ ] Préparer images Bali
- [ ] Rédiger nouveaux textes si nécessaire
- [ ] Ajouter témoignages
- [ ] Stats à jour

### Phase 5: Polish (1-2 jours)

- [ ] Responsive testing
- [ ] Performance optimization
- [ ] Accessibilité (ARIA, keyboard)
- [ ] Browser testing
- [ ] Ajustements finaux

**Total estimé**: 8-12 jours de développement

---

## 🚀 Quick Wins (Si Temps Limité)

Si vous voulez un impact maximal en minimum de temps:

### Top 5 Améliorations (2-3 jours)

1. **Hero avec parallax** (4h)
   - Impact visuel immédiat
   - Donne le ton "wow"

2. **Police Serif pour titres** (1h)
   - Élégance instantanée
   - Playfair Display

3. **Quote fullwidth colorée** (2h)
   - Break le rythme
   - Mémorable

4. **Stats avec compteurs** (3h)
   - Engagement
   - Crédibilité

5. **Espacements variables** (2h)
   - Rythme amélioré
   - Respiration

**Total**: ~12h pour transformer radicalement l'expérience

---

## 📋 Checklist Finale

Avant de considérer la page terminée:

### Design
- [ ] Chaque section a un style distinctif
- [ ] Rythme varié (pas de monotonie)
- [ ] Palette balinaise cohérente
- [ ] Typographie riche et hiérarchisée
- [ ] Espacements respirent

### Interactions
- [ ] Scroll fluide et réactif
- [ ] Parallax sans lag
- [ ] Hovers engageants
- [ ] Animations subtiles mais présentes
- [ ] Curseur personnalisé fonctionne

### Contenu
- [ ] Storytelling clair en 5 actes
- [ ] Images de qualité optimisées
- [ ] Textes relus et cohérents
- [ ] CTAs clairs et attractifs
- [ ] About complet mais concis

### Technique
- [ ] Lighthouse > 90
- [ ] Responsive parfait
- [ ] Accessible (WCAG AA)
- [ ] Performance optimale
- [ ] SEO correct

---

## 💡 Inspiration et Références

### Sites de Référence

1. **Jimmy Nelson**: https://www.jimmynelson.com/jimmy-nelson/
   - Storytelling scroll-driven
   - Typographie élégante
   - Alternance texte/image

2. **Awwwards - Photography**: 
   - Parallax avancé
   - Animations sophistiquées

3. **Medium Articles**:
   - Typographie confortable
   - Hiérarchie claire

### Animations

- **Framer Motion**: Pour parallax et scroll animations
- **GSAP ScrollTrigger**: Alternative puissante
- **React Spring**: Animations fluides

---

## 📝 Notes Importantes

### À Garder en Tête

1. **Performance > Esthétique**
   - Ne jamais sacrifier la vitesse
   - Tester sur 3G

2. **Mobile First**
   - Commencer par mobile
   - Progressive enhancement

3. **Accessibilité**
   - Keyboard navigation
   - Screen readers
   - Contraste suffisant

4. **SEO**
   - Balises sémantiques
   - Alt text sur images
   - Meta descriptions

5. **Maintenance**
   - Code propre et commenté
   - Composants réutilisables
   - Documentation à jour

---

**Document créé**: Décembre 2024  
**Version**: 1.0 - Plan Initial  
**Status**: Prêt pour implémentation

---

*Ce plan transformera la page About d'une expérience linéaire monotone en un voyage immersif et mémorable qui reflète l'identité unique de VF Images et l'essence de Bali.* 🌴✨
