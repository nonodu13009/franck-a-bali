# Guide d'Optimisation d'Images - VF Images

## Vue d'ensemble

Ce guide explique comment optimiser les images pour le site VF Images afin d'assurer un chargement rapide sans perte notable de qualité. Next.js gère l'optimisation automatique, mais une préparation correcte des images sources améliore grandement les performances.

## Optimisation Automatique Next.js

### Formats Modernes
Next.js convertit automatiquement les images en :
- **AVIF** (priorité 1) - Meilleure compression, support navigateurs modernes
- **WebP** (priorité 2) - Bonne compression, large support
- **JPEG/PNG** (fallback) - Support universel

Le navigateur choisit automatiquement le meilleur format supporté.

### Srcset Responsive
Next.js génère automatiquement plusieurs résolutions :
```html
<img 
  srcset="
    image-640w.webp 640w,
    image-750w.webp 750w,
    image-828w.webp 828w,
    image-1080w.webp 1080w,
    image-1200w.webp 1200w,
    image-1920w.webp 1920w,
    image-2048w.webp 2048w,
    image-3840w.webp 3840w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Lazy Loading
- Images en dessous de la ligne de flottaison : `loading="lazy"` automatique
- Images hero/above-fold : `priority={true}` pour chargement immédiat

## Workflow d'Optimisation Manuel

### Phase 1 : Avant Upload (Recommandé)

#### Résolutions Cibles par Usage

**Hero Homepage (plein écran)**
- Résolution : 3840x2160 (4K) ou 2560x1440 (2K)
- Format : JPEG qualité 90
- Poids cible : 500KB - 1MB

**Images Masonry**
- Portrait (3:4) : 1200x1600
- Paysage (4:3) : 1600x1200
- Wide (16:9) : 1920x1080
- Format : JPEG qualité 85
- Poids cible : 200-400KB

**Blog Featured Images**
- Résolution : 1920x1080
- Format : JPEG qualité 85
- Poids cible : 300-500KB

**Gallery Series**
- Résolution : 2048x1365 (3:2)
- Format : JPEG qualité 85-90
- Poids cible : 400-700KB

### Outils d'Optimisation

#### ImageOptim (Mac - Gratuit)
1. Télécharger : https://imageoptim.com/
2. Glisser-déposer images
3. Optimisation automatique lossless + lossy
4. Poids réduit 50-70% sans perte visible

**Settings recommandés :**
- JPEG : Quality 85%, Progressive
- PNG : Strip metadata
- Enable lossy minification

#### Squoosh (Web - Gratuit)
1. Ouvrir : https://squoosh.app/
2. Upload image
3. Choisir format :
   - Photos : MozJPEG quality 85
   - Illustrations : WebP quality 85
4. Comparer avant/après
5. Download optimisé

#### Sharp (Node.js - Pour automation)
```javascript
const sharp = require('sharp');

// JPEG optimisé
await sharp('input.jpg')
  .resize(1920, 1080, { fit: 'cover' })
  .jpeg({ quality: 85, progressive: true })
  .toFile('output.jpg');

// WebP optimisé
await sharp('input.jpg')
  .resize(1920, 1080, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile('output.webp');

// AVIF optimisé (meilleure compression)
await sharp('input.jpg')
  .resize(1920, 1080, { fit: 'cover' })
  .avif({ quality: 75 })
  .toFile('output.avif');
```

#### Photoshop
**Export for Web :**
1. File → Export → Save for Web (Legacy)
2. JPEG :
   - Quality : 70-85
   - Progressive : Checked
   - Optimized : Checked
3. Convert to sRGB : Checked
4. Strip metadata (sauf copyright)

#### Lightroom Classic
**Export Settings :**
- Image Format : JPEG
- Quality : 80-85
- Color Space : sRGB
- Resize to Fit : Long Edge 2048px (gallery) ou 1920px (blog)
- Output Sharpening : Screen, Standard
- Metadata : Copyright Only

## Formats par Usage

### JPEG - Photographies
**Quand utiliser :**
- Photos de paysages, portraits, nature
- Images avec gradients complexes
- Couleurs riches et variations subtiles

**Paramètres :**
- Quality : 80-90 selon importance
- Progressive encoding
- sRGB color space
- Strip EXIF (sauf copyright)

### PNG - Graphics/Illustrations
**Quand utiliser :**
- Logos, icônes
- Images avec transparence
- Graphics avec texte

**Paramètres :**
- 8-bit si possible (plutôt que 24-bit)
- Optimize palette
- Strip metadata

### WebP/AVIF - Formats Modernes
**Automatique via Next.js** - Pas besoin de conversion manuelle

**Avantages :**
- 30-50% plus léger que JPEG
- Support transparence
- Next.js s'occupe de tout

## Dimensions Recommandées

### Par Breakpoint
- **Mobile** : 640-750px width
- **Tablet** : 828-1080px width
- **Desktop** : 1200-1920px width
- **Large Desktop** : 2048-3840px width

### Par Aspect Ratio
- **Square (1:1)** : 1200x1200
- **Portrait (3:4)** : 1200x1600
- **Landscape (4:3)** : 1600x1200
- **Video (16:9)** : 1920x1080
- **Wide (21:9)** : 2560x1080

## Checklist Optimisation

### Avant Upload
- [ ] Image en haute résolution source (minimum 1920px)
- [ ] Format approprié (JPEG pour photos)
- [ ] Compression appliquée (quality 80-90)
- [ ] Métadonnées nettoyées (sauf copyright)
- [ ] sRGB color space
- [ ] Nom de fichier descriptif (SEO)

### Après Upload
- [ ] URL accessible
- [ ] Alt text descriptif ajouté
- [ ] Testé sur mobile et desktop
- [ ] Temps de chargement < 2s
- [ ] Qualité visuelle acceptable

## Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)** : < 2.5s
  - Hero image doit charger rapidement
  - Utiliser `priority={true}` sur hero
  
- **CLS (Cumulative Layout Shift)** : < 0.1
  - Toujours spécifier width/height
  - Utiliser aspect-ratio CSS
  
- **FID (First Input Delay)** : < 100ms
  - Lazy load images hors viewport

### Poids Total Page
- **Homepage** : 2-3 MB (avec hero + masonry)
- **Blog List** : 1-2 MB
- **Blog Article** : 500KB - 1MB (sans vidéo)
- **Gallery Page** : 2-4 MB

## Outils de Test

### Lighthouse (Chrome DevTools)
1. F12 → Lighthouse tab
2. Mode : Desktop/Mobile
3. Run audit
4. Viser score Performance > 90

### PageSpeed Insights
- URL : https://pagespeed.web.dev/
- Tester URL production
- Suivre recommandations

### WebPageTest
- URL : https://www.webpagetest.org/
- Test depuis différentes localisations
- Analyser waterfall

## Troubleshooting

### Images floues sur Retina
- Utiliser 2x résolution minimum
- Hero : 3840px pour affichage 1920px
- Next.js génère automatiquement les résolutions

### Chargement lent
- Vérifier poids source < 1MB
- Utiliser lazy loading
- Vérifier CDN/hosting rapide

### Layout shift
- Toujours spécifier dimensions
- Utiliser placeholder blur
- aspect-ratio CSS

### Qualité dégradée
- Augmenter quality (85-90)
- Vérifier source haute résolution
- Désactiver over-compression

## Commandes Utiles

### Optimisation batch avec Sharp
```bash
npm install sharp

# Script Node.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './sources';
const outputDir = './optimized';

fs.readdirSync(inputDir).forEach(file => {
  if (file.match(/\.(jpg|jpeg|png)$/i)) {
    sharp(path.join(inputDir, file))
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(outputDir, file));
  }
});
```

### Optimisation avec ImageMagick
```bash
# Resize + optimize JPEG
convert input.jpg -resize 1920x -quality 85 -strip output.jpg

# Batch conversion
mogrify -path ./optimized -resize 1920x -quality 85 -strip *.jpg
```

## Next Steps : Phase 2

### Upload Backend Automatisé
Fonctionnalités futures :
- Interface upload drag & drop
- Compression automatique serveur
- Génération multi-résolutions
- Conversion auto WebP/AVIF
- Détection faces/objets pour smart crop
- Watermark automatique optionnel
- CDN distribution
- Analytics d'utilisation

Technologies :
- Firebase Functions
- Sharp (Node.js)
- Firebase Storage
- Cloud CDN

## Ressources

### Outils
- ImageOptim : https://imageoptim.com/
- Squoosh : https://squoosh.app/
- TinyPNG : https://tinypng.com/
- Compressor.io : https://compressor.io/

### Documentation
- Next.js Image : https://nextjs.org/docs/api-reference/next/image
- Web.dev Images : https://web.dev/fast/#optimize-your-images
- MDN Responsive Images : https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

### Testing
- Lighthouse : Chrome DevTools
- PageSpeed : https://pagespeed.web.dev/
- WebPageTest : https://www.webpagetest.org/

