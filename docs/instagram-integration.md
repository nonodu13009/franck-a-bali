# Intégration Instagram dans le Blog

## Configuration actuelle

Le composant `InstagramFeed` est maintenant intégré dans la page Blog. Pour l'instant, il affiche un lien vers le profil Instagram avec un bouton "Suivre sur Instagram".

## Options d'intégration

Pour afficher réellement les posts Instagram, vous avez plusieurs options :

### Option 1 : Instagram Basic Display API (Recommandé)

1. Créer une application Facebook Developers
2. Configurer Instagram Basic Display API
3. Obtenir un token d'accès
4. Ajouter les variables d'environnement :
   ```
   INSTAGRAM_ACCESS_TOKEN=your_access_token
   INSTAGRAM_USER_ID=your_user_id
   ```

### Option 2 : Services tiers (Plus simple)

Utiliser un service qui gère l'API Instagram pour vous :
- **Curator.io** (https://curator.io)
- **Behold** (https://behold.so)
- **Instagram Feed by Smash Balloon** (pour WordPress, peut avoir une API)

### Option 3 : Embeds manuels

Intégrer directement des posts Instagram via leurs URLs embed :
```html
<iframe src="https://www.instagram.com/p/POST_ID/embed" ...></iframe>
```

## Configuration

Dans votre fichier `.env.local`, ajoutez :

```env
# URL du profil Instagram (obligatoire)
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/votre_compte

# Pour l'API Instagram (optionnel si vous utilisez l'API)
INSTAGRAM_ACCESS_TOKEN=votre_token
INSTAGRAM_USER_ID=votre_user_id
```

## Modification du composant

Le composant `src/components/blog/instagram-feed.tsx` contient un TODO pour connecter l'API. 

Pour l'activer :
1. Créer une route API dans `src/app/api/instagram/route.ts`
2. Implémenter la logique de récupération des posts
3. Appeler cette route depuis le composant client

## Exemple d'implémentation API

```typescript
// src/app/api/instagram/route.ts
export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  
  const response = await fetch(
    `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
  );
  
  const data = await response.json();
  return Response.json(data);
}
```

## Note importante

Le token Instagram Basic Display expire après 60 jours et doit être rafraîchi. Considérez l'utilisation d'un service tiers pour éviter cette gestion.

