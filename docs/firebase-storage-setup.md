# Configuration Firebase Storage

## Vérification de l'état opérationnel

Firebase Storage est configuré dans le code, mais il faut vérifier plusieurs points dans la console Firebase.

## 1. Activation de Firebase Storage

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet : `franck-a-bali-9418d`
3. Dans le menu de gauche, cliquez sur **Storage**
4. Si Storage n'est pas activé, cliquez sur **"Get started"** ou **"Commencer"**

## 2. Configuration des règles de sécurité

Les règles de sécurité doivent permettre :
- **Upload** : Seulement pour les utilisateurs authentifiés (admin)
- **Lecture** : Publique (pour afficher les images sur le site)

### Règles recommandées

Allez dans **Storage → Rules** et configurez :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Permettre la lecture publique de toutes les images
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Permettre l'upload seulement aux utilisateurs authentifiés
    match /{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

### Règles plus restrictives (recommandé pour production)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images dans le dossier images/
    match /images/{imageId} {
      allow read: if true; // Lecture publique
      allow write: if request.auth != null; // Écriture pour utilisateurs authentifiés
    }
    
    // Images homepage
    match /homepage/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Images about
    match /about/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Images blog
    match /blog/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Images series
    match /series/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 3. Vérification de la configuration

### Variables d'environnement

Vérifiez que `.env.local` contient :
```
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=franck-a-bali-9418d.firebasestorage.app
```

### Test d'upload

Pour tester si Storage fonctionne :
1. Connectez-vous à l'admin (`/[locale]/admin`)
2. Allez dans **Photos** ou **Homepage**
3. Essayez d'uploader une image
4. Si l'upload fonctionne, Storage est opérationnel ✅
5. Si erreur, vérifiez :
   - Les règles de sécurité
   - Que Storage est activé
   - Les logs de la console navigateur

## 4. Structure des dossiers dans Storage

Les images sont organisées ainsi :
```
Storage/
├── images/           # Photos des galeries
│   ├── 1733654400000.jpg
│   └── ...
├── homepage/        # Images homepage
│   ├── hero-*.jpg
│   └── masonry-*.jpg
├── about/           # Images page About
│   ├── hero-*.jpg
│   └── section-*.jpg
├── blog/            # Images articles blog
│   └── ...
└── series/          # Images de couverture des séries
    └── ...
```

## 5. Problèmes courants

### Erreur "Permission denied"
- Vérifiez les règles de sécurité Storage
- Vérifiez que l'utilisateur est bien authentifié

### Erreur "Storage is not initialized"
- Vérifiez les variables d'environnement
- Redémarrez le serveur de développement

### Upload échoue sans erreur
- Vérifiez la taille du fichier (max 10MB)
- Vérifiez le type de fichier (JPEG, PNG, WebP uniquement)
- Vérifiez la console navigateur pour les erreurs détaillées
