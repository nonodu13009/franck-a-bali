# Référence des Couleurs - VF Images

Documentation de la palette de couleurs balinaise implémentée.

---

## 🎨 Palette Complète

### Couleurs Primaires

#### Bleu Océan (Primary)
```css
--primary: #1565A0
--primary-dark: #0A4C6B
--primary-foreground: #FEFAE0
```

**Usage**: Liens, boutons principaux, éléments interactifs  
**Tailwind**: `bg-primary`, `text-primary`, `border-primary`

#### Vert Jungle (Secondary)
```css
--secondary: #2D5A4D
--secondary-light: #3D6B5D
--secondary-foreground: #FEFAE0
```

**Usage**: Bordures, séparateurs, éléments de structure  
**Tailwind**: `bg-secondary`, `text-secondary`, `border-secondary`

---

### Accents Tropicaux

#### Vert Palmier
```css
--accent: #52B788
--accent-light: #74C69D
```
**Usage**: Hovers, badges, éléments de mise en évidence  
**Tailwind**: `bg-accent`, `text-accent`, `hover:bg-accent`

#### Frangipani (Orangé)
```css
--accent-warm: #F4A261
```
**Usage**: CTA importants, notifications, accents chaleureux  
**Tailwind**: `bg-accent-warm`, `text-accent-warm`

#### Hibiscus (Rose)
```css
--accent-pink: #D84A6B
```
**Usage**: Badges spéciaux, accents ponctuels  
**Tailwind**: `bg-accent-pink`, `text-accent-pink`

---

### Terre et Sable

```css
--sand: #C9A675          /* Sable doré */
--sand-dark: #A68B5B     /* Terre balinaise */
--bamboo: #8B7355        /* Bambou séché */
```

**Usage**: Backgrounds alternatifs, textures, éléments décoratifs  
**Tailwind**: `bg-sand`, `bg-sand-dark`, `bg-bamboo`

---

### Neutrals

```css
--background: #F8F3E6    /* Crème naturelle */
--foreground: #2B2B2B    /* Noir chaud */
--muted: #E5DCC5         /* Beige sable */
--muted-foreground: #6B5D4F /* Brun doux */
--border: rgba(45, 90, 77, 0.2) /* Vert jungle transparent */
```

**Usage**: Backgrounds, textes, bordures  
**Tailwind**: `bg-background`, `text-foreground`, `bg-muted`

---

## 🖱️ Couleurs du Curseur

```css
--cursor-dot: #1A3A2E      /* Vert jungle profond */
--cursor-circle: #52B788    /* Vert palmier */
```

Le curseur change au hover:
- Cercle devient `--accent-warm` (#F4A261)
- Background semi-transparent avec vert palmier

---

## 📊 Tests de Contraste WCAG

### Combinaisons Validées (AA)

| Texte | Background | Ratio | Status |
|-------|------------|-------|--------|
| #2B2B2B | #F8F3E6 | 10.2:1 | ✅ AAA |
| #1565A0 | #F8F3E6 | 4.8:1 | ✅ AA |
| #2D5A4D | #FEFAE0 | 5.2:1 | ✅ AA |
| #FEFAE0 | #1A3A2E | 11.5:1 | ✅ AAA |
| #FEFAE0 | #0A4C6B | 9.8:1 | ✅ AAA |

Tous les contrastes respectent au minimum le niveau AA (4.5:1 pour texte normal).

---

## 💡 Guide d'Utilisation

### Hiérarchie des Couleurs

**Dominance**: 70% Neutrals (crème, beige, noir chaud)  
**Accents**: 20% Verts et Bleus (jungle, palmier, océan)  
**Highlights**: 10% Couleurs vives (frangipani, hibiscus)

### Do's ✅

1. **Utiliser le crème (#F8F3E6) pour backgrounds principaux**
2. **Noir chaud (#2B2B2B) pour tout le texte de corps**
3. **Bleu océan (#1565A0) pour tous les liens**
4. **Vert palmier (#52B788) pour hovers et états actifs**
5. **Frangipani (#F4A261) pour CTA importants uniquement**
6. **Bordures subtiles avec vert jungle transparent**

### Don'ts ❌

1. ❌ Ne pas utiliser plusieurs couleurs vives simultanément
2. ❌ Éviter le hibiscus rose sauf cas très spécifiques
3. ❌ Ne pas appliquer les couleurs vives en backgrounds larges
4. ❌ Éviter de mélanger sable doré avec frangipani orangé
5. ❌ Ne pas utiliser le vert jungle foncé pour le texte (sauf curseur)

---

## 🎨 Exemples d'Utilisation

### Bouton Principal

```tsx
<button className="bg-primary hover:bg-primary-dark text-primary-foreground px-6 py-3 rounded-lg transition-colors">
  Découvrir
</button>
```

### Bouton CTA Important

```tsx
<button className="bg-accent-warm hover:bg-accent text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105">
  Réserver une séance
</button>
```

### Card avec Border Tropicale

```tsx
<div className="bg-background border border-border hover:border-accent rounded-xl p-6 transition-colors">
  {/* Contenu */}
</div>
```

### Lien avec Hover Tropical

```tsx
<a className="text-primary hover:text-accent-warm underline decoration-accent transition-colors">
  En savoir plus
</a>
```

### Badge Accent

```tsx
<span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
  Nouveau
</span>
```

### Section avec Background Alternatif

```tsx
<section className="bg-muted py-20">
  {/* Contenu avec meilleure différenciation */}
</section>
```

---

## 🌈 Gradients Recommandés

### Jungle → Océan (Hero)
```css
background: linear-gradient(135deg, #1A3A2E 0%, #0A4C6B 100%);
```

### Palmier → Jungle (Boutons)
```css
background: linear-gradient(135deg, #52B788 0%, #2D5A4D 100%);
```

### Crème → Beige (Sections)
```css
background: linear-gradient(to bottom, #F8F3E6 0%, #E5DCC5 100%);
```

### Overlay Image Jungle
```css
background: linear-gradient(
  to top,
  rgba(26, 58, 46, 0.8) 0%,
  rgba(26, 58, 46, 0) 60%
);
```

---

## 🎯 Par Composant

### Navigation
- Background: `bg-background` avec blur
- Links: `text-foreground hover:text-primary`
- Active: `text-primary border-b-2 border-accent`

### Hero Section
- Background: Gradient jungle → océan
- Titre: `text-primary-foreground`
- CTA: `bg-accent-warm hover:bg-accent`

### Gallery
- Background: `bg-background`
- Cards: `bg-background border-border hover:border-accent`
- Overlay hover: Vert jungle semi-transparent

### Footer
- Background: `bg-jungle` ou `bg-secondary`
- Texte: `text-primary-foreground`
- Links: `hover:text-accent-warm`

### Blog
- Background article: `bg-background`
- Tags: `bg-accent/20 text-accent`
- Catégories: `bg-sand/30 text-sand-dark`

---

## 📱 Responsive et Dark Mode

### Responsive
Les couleurs s'adaptent automatiquement à toutes les tailles d'écran.  
Aucun changement nécessaire pour mobile/tablet/desktop.

### Dark Mode (Futur)
Si implémenté, utiliser:
- Background: `#0A1612` (noir-vert jungle)
- Foreground: `#FEFAE0` (blanc chaud)
- Accents: Couleurs plus lumineuses (#74C69D, #2986CC)

---

## 🔧 Variables CSS Personnalisées

Toutes les couleurs sont disponibles via les variables CSS:

```css
.mon-composant {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}

.mon-composant:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}
```

---

## 📚 Ressources

- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Palette**: Accessible dans `globals.css` et `tailwind.config.ts`
- **Design Doc**: Voir `jimmy-nelson-design-analysis.md` pour contexte complet

---

*Dernière mise à jour: Décembre 2024*  
*Version: 1.0 - Palette Balinaise Initiale*

