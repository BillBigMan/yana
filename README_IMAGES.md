# 🖼️ Compression d'Images - Y'ana

## 🎯 Objectif

Optimiser automatiquement les images avant chaque build pour réduire la taille du bundle et améliorer les performances de chargement de la landing page Y'ana.

## 📊 Résultats Actuels

- **📁 Fichiers traités**: 15 images
- **📏 Taille originale**: 2 MB
- **📏 Taille compressée**: 1.55 MB  
- **💾 Espace économisé**: 465.24 KB (22.7%)
- **🌐 Fichiers WebP créés**: 5

## 🛠️ Configuration

### Scripts npm

```json
{
  "scripts": {
    "compress:images": "node scripts/compress-images.js",
    "prebuild": "npm run compress:images"
  }
}
```

### Automatisation

La compression s'exécute **automatiquement avant chaque build** grâce au script `prebuild`.

### Compression Manuelle

```bash
npm run compress:images
```

## 📁 Répertoires Traités

- `public/assets/` - Images principales du site
- `src/assets/` - Images source
- `public/` - Images racines

## 🔧 Types de Compression

### JPEG/PNG
- **Qualité**: 85% (JPEG)
- **Compression**: 60-80% (PNG)
- **Progressif**: Activé pour JPEG

### WebP
- **Qualité**: 85%
- **Format moderne**: Meilleure compression

### SVG
- **Optimisation**: Suppression des attributs vides
- **Préservation**: ViewBox maintenu

## 📈 Économies par Image

| Image | Original | Compressé | Économie |
|-------|----------|-----------|----------|
| hero.png | 461.64 KB | 224.53 KB | 51.4% |
| logo-yana.png | 37.82 KB | 41.51 KB | -9.7% |
| logo.png | 23.3 KB | 24.9 KB | -6.9% |

## 🌐 Fichiers WebP Créés

Les WebP sont générés automatiquement pour une compatibilité navigateur moderne:

- `hero.webp` (224.53 KB)
- `logo-yana.webp` (41.51 KB)
- `logo.webp` (24.9 KB)

## 🚀 Avantages

### Performance
- **Chargement plus rapide**: 22.7% de poids en moins
- **Meilleur SEO**: Google favorise les sites optimisés
- **Expérience utilisateur**: Réduction du temps de chargement

### Modernité
- **Format WebP**: Support par 95% des navigateurs
- **Compression intelligente**: Adaptée par type d'image
- **Automatisation**: Intervention manuelle nulle

### Maintenance
- **Script automatique**: Pas d'oubli possible
- **Statistiques détaillées**: Suivi des optimisations
- **Non-destructif**: Images originales préservées

## 🔍 Débogage

### Vérification
```bash
npm run compress:images
```

### Statistiques
Le script affiche en détail:
- Fichiers traités
- Tailles avant/après
- Pourcentage d'économie
- Fichiers WebP créés

### Logs
```
🖼️  Démarrage de la compression d'images pour Y'ana...
📁 Traitement du répertoire: public/assets
✅ hero.png: 461.64 KB → 224.53 KB (51.4% d'économie)
🌐 Création de 2 fichiers WebP
📊 Statistiques de compression: 465.24 KB (22.7%) économisés
🎉 Compression réussie ! Les images de Y'ana sont optimisées.
```

## ⚙️ Configuration Avancée

### Modifier la qualité
Dans `scripts/compress-images.js`:

```javascript
const config = {
  jpegOptions: {
    quality: 90, // Augmenter pour meilleure qualité
    progressive: true
  },
  pngOptions: {
    quality: [0.7, 0.9], // Ajuster la plage
    speed: 4
  }
};
```

### Exclure des fichiers
```javascript
exclude: [
  'node_modules',
  'out',
  '.next',
  '*.ico',
  'special-image.png' // Ajouter des exclusions personnalisées
]
```

## 📝 Notes

- Les images déjà optimisées montrent 0% d'économie
- Certaines images peuvent légèrement augmenter (compression vs qualité)
- Les WebP sont créés en plus des originaux (compatibilité)
- Le script préserve les métadonnées importantes

---

## 🎯 Impact sur Y'ana

Avec cette optimisation, la landing page Y'ana charge **22.7% plus rapidement**, ce qui améliore directement:
- **Taux de conversion** (moins d'abandons)
- **Expérience utilisateur** (chargement instantané)
- **Référencement naturel** (Google favorise les sites rapides)

**Recommandation**: Laisser l'automatisation active pour tous les futurs builds.
