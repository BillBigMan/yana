# 📊 Instrumentation Analytics - Y'ana

## 🎯 Objectif

Ce système d'analytics permet de mesurer précisément le comportement des utilisateurs sur la landing page Y'ana pour valider le potentiel marché du produit.

## 📈 Funnel de Conversion

```
landing_viewed
↓
landing_scroll_50
↓
landing_scroll_90  
↓
waitlist_cta_clicked
↓
waitlist_opened
↓
waitlist_submitted
```

## 🛠️ Événements Implémentés

### 1. Vue de la Landing Page
- **Événement**: `landing_viewed`
- **Propriétés**: `language`, `device_type`
- **Déclenchement**: Au chargement de la page

### 2. Tracking du Scroll
- **Événements**: `landing_scroll_50`, `landing_scroll_90`
- **Déclenchement**: À 50% et 90% du scroll (une seule fois)

### 3. Clics Waitlist CTA
- **Événement**: `waitlist_cta_clicked`
- **Propriétés**: `location` (hero, solution_section, faq_section, final_cta)
- **Déclenchement**: Au clic sur tous les liens vers la waitlist

### 4. Ouverture Formulaire Waitlist
- **Événement**: `waitlist_opened`
- **Déclenchement**: Quand le formulaire devient visible

### 5. Soumission Waitlist
- **Événement**: `waitlist_submitted`
- **Propriétés**: `city`, `user_type`, `language`
- **Déclenchement**: Soumission réussie du formulaire

### 6. Interactions FAQ
- **Événement**: `faq_opened`
- **Propriétés**: `question_id`
- **Déclenchement**: Ouverture d'une question FAQ

### 7. Intentions Marketplace
- **Événements**: `family_interest`, `worker_interest`
- **Déclenchement**: Choix du type d'utilisateur dans le survey

## 🔧 Configuration Technique

### PostHog Setup
```typescript
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    enable_heatmaps: true,
    disable_session_recording: false,
    capture_pageview: false
})
```

### Variables d'Environnement
```env
NEXT_PUBLIC_POSTHOG_KEY=votre_clé_posthog
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## 📁 Structure des Fichiers

```
src/
├── lib/
│   └── instrumentation-client.ts    # Configuration PostHog et utilitaires
├── hooks/
│   └── useAnalytics.ts             # Hooks React pour l'analytics
└── components/sections/
    ├── page.tsx                    # Tracking landing et CTA
    ├── Waitlist.tsx                # Tracking formulaire waitlist
    ├── FAQ.tsx                     # Tracking interactions FAQ
    └── MarketSurvey.tsx            # Tracking intentions utilisateur
```

## 🎯 Métriques Clés à Suivre

### Taux de Conversion
- **Landing → Scroll 50%**: Engagement des visiteurs
- **Scroll 50% → CTA Click**: Intérêt pour le produit
- **CTA Click → Waitlist Submit**: Conversion finale

### Segmentation
- **Par type d'appareil**: Mobile vs Desktop
- **Par langue**: FR vs EN
- **Par type d'utilisateur**: Family vs Worker
- **Par localisation**: Villes du Cameroun

### Comportement FAQ
- Questions les plus consultées
- Taux d'ouverture par question
- Corrélation FAQ → Conversion

## 🔍 Dashboard PostHog

### Funnels à Créer
1. **Funnel Principal**: Landing → Scroll → CTA → Submit
2. **Funnel par Device**: Comparaison mobile/desktop
3. **Funnel par Langue**: FR vs EN performance
4. **Funnel par User Type**: Family vs Worker intent

### Heatmaps & Session Recordings
- Activés automatiquement pour analyser:
  - Zones de clic les plus populaires
  - Points d'abandon de la page
  - Navigation utilisateur

## 🚀 Déploiement

### Installation Dépendances
```bash
npm install posthog-js
```

### Configuration
1. Ajouter les variables d'environnement
2. Vérifier la configuration PostHog
3. Tester les événements dans PostHog Debug

### Vérification
```javascript
// Mode debug dans console
posthog.debug()
```

## 📊 Exemples de Requêtes PostHog

### Taux de Conversion Global
```sql
SELECT 
    count_if(event = 'landing_viewed') as total_visitors,
    count_if(event = 'waitlist_submitted') as total_signups,
    count_if(event = 'waitlist_submitted') / count_if(event = 'landing_viewed') * 100 as conversion_rate
FROM events
WHERE timestamp >= now() - interval 7 day
```

### Performance par Device
```sql
SELECT 
    properties.$device_type,
    count_if(event = 'waitlist_submitted') / count_if(event = 'landing_viewed') * 100 as conversion_rate
FROM events
WHERE event IN ('landing_viewed', 'waitlist_submitted')
GROUP BY properties.$device_type
```

## 🎛️ Bonnes Pratiques

### Performance
- Événements déclenchés une seule fois
- Pas d'impact sur les performances
- Code maintenable et documenté

### Confidentialité
- Aucune donnée personnelle sensible
- Respect RGPD
- Anonymisation des IP

### Maintenance
- Types TypeScript stricts
- Tests réguliers des événements
- Documentation à jour

---

## 📞 Support

Pour toute question sur l'analytics ou pour ajouter de nouveaux événements, contacter l'équipe technique.

**Note**: Cette instrumentation est essentielle pour valider le marché Y'ana et prendre des décisions data-driven.
