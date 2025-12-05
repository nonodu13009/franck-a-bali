# Guide d'Intégration Vidéo - Blog VF Images

## Vue d'ensemble

Le blog supporte maintenant l'intégration de vidéos directement dans les articles. Ce guide explique comment ajouter des vidéos optimisées pour le web.

## Formats Supportés

### Formats Vidéo Acceptés
- **MP4 (H.264)** - Format recommandé, meilleure compatibilité
- **MOV** - Format Apple, bonne qualité
- **WEBM** - Format open-source, bonne compression

### Ratios Supportés
- **16:9** (1920x1080) - Format horizontal YouTube
- **9:16** (1080x1920) - Format vertical Instagram/TikTok

## Recommandations Techniques

### Résolution
- **Format horizontal (16:9)** :
  - Max : 1920x1080 (Full HD)
  - Recommandé : 1280x720 (HD) pour meilleur compromis poids/qualité
  
- **Format vertical (9:16)** :
  - Max : 1080x1920
  - Recommandé : 720x1280 pour mobile

### Compression
- **Codec vidéo** : H.264 (MP4)
- **Codec audio** : AAC
- **Bitrate vidéo** : 2000-4000 kbps
- **Bitrate audio** : 128-192 kbps
- **Framerate** : 24-30 fps (60 fps uniquement si nécessaire)

### Poids de Fichier
- **Cible idéale** : 10-30 MB pour 1-3 minutes
- **Maximum acceptable** : 50 MB
- **Durée recommandée** : 30 secondes à 3 minutes

## Outils de Compression Recommandés

### HandBrake (Gratuit, Mac/Windows/Linux)
1. Télécharger : https://handbrake.fr/
2. Preset : "Web" → "Fast 1080p30"
3. Onglet "Video" : Quality RF 23-25
4. Onglet "Audio" : AAC 128-192 kbps

### FFmpeg (Ligne de commande)
```bash
# Format horizontal optimisé
ffmpeg -i input.mov -c:v libx264 -preset medium -crf 23 -vf scale=1280:720 -c:a aac -b:a 128k output.mp4

# Format vertical optimisé
ffmpeg -i input.mov -c:v libx264 -preset medium -crf 23 -vf scale=720:1280 -c:a aac -b:a 128k output.mp4
```

### Adobe Media Encoder (Payant)
- Preset : H.264 Match Source - Medium Bitrate
- Bitrate Encoding : VBR 1 pass
- Target Bitrate : 3-4 Mbps

## Ajouter une Vidéo à un Article

### 1. Structure de Données Firebase

Ajouter ces champs à votre article :

```typescript
{
  videoUrl: "https://votre-url.com/video.mp4",
  videoRatio: "16:9" // ou "9:16"
}
```

### 2. Mock Data (Development)

Dans `src/lib/mock-data.ts` :

```typescript
{
  id: 'blog-x',
  slug: 'mon-article-video',
  title: 'Mon Article avec Vidéo',
  // ... autres champs
  videoUrl: 'https://example.com/ma-video.mp4',
  videoRatio: '16:9', // ou '9:16' pour vertical
}
```

### 3. Hébergement des Vidéos

**Option 1 : Firebase Storage** (Recommandé pour Phase 2)
- Upload dans le bucket Firebase
- Obtenir l'URL publique
- Utiliser cette URL dans videoUrl

**Option 2 : Services Externes**
- YouTube (via API)
- Vimeo (via API)
- Cloudinary
- AWS S3 / CloudFront

**Option 3 : Self-hosted** (Non recommandé)
- Placer dans `/public/videos/`
- URL : `/videos/nom-video.mp4`
- ⚠️ Augmente significativement la taille du build

## Workflow Recommandé

### Étape 1 : Capturer
- Filmer en résolution native de l'appareil
- Stabiliser si possible (gimbal, steadicam)
- Privilégier bonne lumière naturelle

### Étape 2 : Monter
- Logiciel de montage (Premiere, Final Cut, DaVinci)
- Garder durée 30s-3min pour engagement optimal
- Ajouter musique/voix off si pertinent

### Étape 3 : Exporter
- Utiliser presets ci-dessus
- Vérifier taille < 50MB
- Tester lecture sur mobile

### Étape 4 : Héberger
- Upload sur Firebase Storage ou CDN
- Obtenir URL publique
- Vérifier accessibilité

### Étape 5 : Intégrer
- Ajouter à article blog avec videoUrl + videoRatio
- Prévisualiser avant publication
- Tester sur mobile et desktop

## Bonnes Pratiques

### Performance
- ✅ Toujours compresser avant upload
- ✅ Utiliser format MP4 H.264
- ✅ Tester sur connexion mobile 4G
- ❌ Éviter vidéos > 50MB
- ❌ Éviter résolutions > 1080p

### UX
- ✅ Ajouter texte alternatif descriptif
- ✅ Vidéo complète l'article, ne le remplace pas
- ✅ Position logique dans le flow de lecture
- ❌ Autoplay (sauf si muté)
- ❌ Vidéos trop longues (> 5min)

### Accessibilité
- Ajouter sous-titres si contenu parlé
- Alternative textuelle pour contenu essentiel
- Contrôles clairs et accessibles

## Troubleshooting

### Vidéo ne se charge pas
- Vérifier URL accessible publiquement
- Vérifier format compatible (MP4 H.264)
- Tester URL dans navigateur directement

### Vidéo trop lourde
- Réduire résolution (720p au lieu de 1080p)
- Augmenter compression (CRF 25-28)
- Réduire durée vidéo

### Qualité dégradée
- Réduire compression (CRF 20-23)
- Augmenter bitrate (4000-6000 kbps)
- Vérifier résolution source

## Phase 2 : Upload Backend

### Fonctionnalités Futures
- Interface d'upload drag & drop
- Compression automatique côté serveur
- Génération thumbnails automatique
- Conversion multi-formats automatique
- CDN distribution
- Analytics de visualisation

Cette fonctionnalité sera implémentée avec Firebase Functions et FFmpeg.

