# VF Images - Portfolio Photographique

Site portfolio professionnel multilingue (FR/EN) avec e-commerce intégré via The Printspace.

## Fonctionnalités

- **Galeries Photo** : Organisation par séries (Travel, Street, Noir & Blanc).
- **Blog** : Articles en Markdown pour raconter les histoires derrière les photos.
- **E-commerce** : Intégration pour la vente de tirages.
- **Internationalisation** : Support complet Français/Anglais.
- **Performance** : Optimisation des images et SEO.

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/nonodu13009/franckbali.git
   cd franckbali
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

## Gestion des Contenus

### Ajouter une Série Photo
Modifier le fichier `src/content/galleries.json` pour ajouter une nouvelle entrée dans le tableau `series`.

### Ajouter un Article de Blog
Créer un fichier Markdown dans `src/content/blog` avec le format `slug-lang.md` (ex: `mon-voyage-fr.md`).

### Images
Placer les images dans le dossier `public/images`.

## Déploiement

Le site est prêt à être déployé sur Vercel. Connectez simplement votre dépôt GitHub à Vercel.

## Configuration Git

Si ce n'est pas déjà fait, configurez le dépôt distant :
```bash
git remote add origin https://github.com/nonodu13009/franckbali.git
git branch -M main
git push -u origin main
```
