# 🏠 Y'ana - Plateforme de Mise en Relation Domestique

## 🌟 Description

Y'ana est une plateforme innovante de mise en relation entre familles et professionnels du service domestique au Cameroun. Notre mission est de simplifier la recherche de nounous, aides-ménagères, babysitters et autres services domestiques de confiance.

---

## 🇬🇧 English Version

# 🏠 Y'ana - Domestic Service Connection Platform

## 🌟 Description

Y'ana is an innovative platform connecting families with domestic service professionals in Cameroon. Our mission is to simplify the search for trusted nannies, housekeepers, babysitters, and other domestic services.

---

## 🚀 Fonctionnalités / Features

### 🏡 Pour les Familles / For Families
- **Recherche avancée** / **Advanced Search**: Find the ideal professional based on your criteria
- **Profils vérifiés** / **Verified Profiles**: Access trusted professionals
- **Système de notation** / **Rating System**: Share your experience
- **Communication sécurisée** / **Secure Communication**: Exchange safely

### 👩‍🍼 Pour les Professionnels / For Professionals
- **Profil personnalisé** / **Custom Profile**: Showcase your skills
- **Recherche d'opportunités** / **Opportunity Search**: Find matching families
- **Gestion des disponibilités** / **Availability Management**: Organize your schedule
- **Feedback constructif** / **Constructive Feedback**: Improve your services

## 🛠️ Stack Technique / Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Analytics**: PostHog (advanced tracking)
- **Deployment**: Vercel
- **Image Optimization**: Sharp, Imagemin (93.6% compression)

## 📱 Multilingue / Multilingual

- 🇫🇷 **Français / French**: Langue principale / Main language
- 🇬🇧 **English**: Support international complet / Full international support

## 🎯 Sections Principales / Main Sections

### 🏠 Accueil / Home
- Présentation de la plateforme / Platform presentation
- Appel à l'action principal / Main CTA
- Navigation multilingue / Multilingual navigation

### 💡 Solution / Solution
- Détails des services proposés / Service details
- Avantages pour familles et professionnels / Benefits for families and professionals
- Processus de matching / Matching process

### ⚙️ Fonctionnement / How It Works
- Guide étape par étape / Step-by-step guide
- Processus d'inscription / Registration process
- Modalités de mise en relation / Connection terms

### 📊 Sondage Marché / Market Survey
- Étude des besoins du marché camerounais / Cameroonian market needs study
- Collecte d'avis utilisateurs / User feedback collection
- Amélioration continue / Continuous improvement

### 📋 Liste d'Attente / Waitlist
- Inscription prioritaire / Priority registration
- Notifications de lancement / Launch notifications
- Avantages exclusifs / Exclusive benefits

### ❓ FAQ
- Questions fréquentes / Frequently asked questions
- Guide d'utilisation / Usage guide
- Support technique / Technical support

## 🚀 Développement / Development

### Prérequis / Prerequisites
- Node.js 18+
- npm ou yarn / npm or yarn

### Installation / Setup
```bash
# Cloner le repository / Clone the repository
git clone https://github.com/BillBigMan/yana.git

# Installer les dépendances / Install dependencies
npm install

# Démarrer le développement / Start development
npm run dev
```

### Scripts Disponibles / Available Scripts
```bash
# Développement / Development
npm run dev          # Serveur de développement / Development server
npm run build        # Build de production / Production build
npm run start        # Serveur de production / Production server

# Outils / Tools
npm run lint         # ESLint
npm run compress:images     # Compression images standard / Standard image compression
npm run compress:images:aggressive  # Compression agressive / Aggressive compression
npm run compress:images:final        # Compression finale (93.6%) / Final compression (93.6%)
```

## 📊 Analytics & Tracking

Y'ana utilise PostHog pour un tracking complet et respectueux / Y'ana uses PostHog for complete and respectful tracking:

### 🎯 Événements Suivis / Tracked Events
- `page_accueil_vue` / `homepage_viewed`: Vue de la page d'accueil / Homepage view
- `defilement_50_pourcent` / `scroll_50_percent`: Scroll à 50% / 50% scroll
- `cta_hero_clique` / `hero_cta_clicked`: Click CTA principal / Main CTA click
- `formulaire_waitlist_ouvert` / `waitlist_form_opened`: Ouverture formulaire / Form opened
- `formulaire_waitlist_soumis` / `waitlist_form_submitted`: Soumission réussie / Successful submission
- `question_faq_ouverte` / `faq_question_opened`: Question FAQ ouverte / FAQ question opened
- `sondemarche_demarre` / `survey_started`: Début sondage / Survey started
- `sondemarche_termine` / `survey_completed`: Sondage complété / Survey completed

### 🌍 Multilingue / Multilingual
- Tracking en français et anglais / French and English tracking
- Support hreflang complet / Full hreflang support
- Analytics par langue / Language-specific analytics

## 🗺️ SEO & Sitemap

### Sitemap XML
- URL : `https://yana.ebenewallace.com/sitemap.xml`
- Support multilingue FR/EN / FR/EN multilingual support
- Sections one-page optimisées / Optimized one-page sections
- Priorités intelligentes / Smart priorities

### Robots.txt
- URL : `https://yana.ebenewallace.com/robots.txt`
- Instructions optimisées / Optimized instructions
- Protection pages admin / Admin page protection
- SEO local priorisé / Local SEO prioritized

## 📈 Optimisation / Optimization

### Images
- **93.6% d'économie** / **93.6% savings**: Compression ultra-agressive / Ultra-aggressive compression
- **WebP moderne** / **Modern WebP**: Format optimisé / Optimized format
- **Redimensionnement** / **Resizing**: Adapté mobile/desktop / Mobile/desktop adapted
- **Automatisation** / **Automation**: Intégré au build / Build integrated

### Performance
- **Next.js 16** : Dernière version / Latest version
- **React 19** : Performance maximale / Maximum performance
- **TailwindCSS** : CSS optimisé / Optimized CSS
- **Framer Motion** : Animations fluides / Smooth animations

## 🔧 Configuration

### Variables d'Environnement / Environment Variables
```env
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Autres variables / Other variables
NODE_ENV=production
```

## 📚 Documentation

- `README_IMAGES.md` : Guide compression images / Image compression guide
- `README_ANALYTICS.md` : Documentation analytics / Analytics documentation
- `README_SITEMAP.md` : Guide SEO et sitemap / SEO and sitemap guide

## 🤝 Contribuer / Contributing

### Guidelines
1. Fork le repository / Fork the repository
2. Créer une branche feature / Create a feature branch
3. Faire les modifications / Make changes
4. Tester avec `npm run build` / Test with `npm run build`
5. Soumettre une Pull Request / Submit a Pull Request

### Code Style
- TypeScript strict / Strict TypeScript
- ESLint configuré / Configured ESLint
- Commentaires en français / French comments
- Components réutilisables / Reusable components

## 📄 Licence / License

Ce projet est sous licence MIT / This project is licensed under the MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails / see the [LICENSE](LICENSE) file for more details.

## 📞 Contact

- **Projet** / **Project**: Y'ana - Plateforme Domestique / Domestic Platform
- **Repository** : https://github.com/BillBigMan/yana
- **Déploiement** / **Deployment**: https://yana.ebenewallace.com

---

**🏠 Y'ana - Connecter familles et professionnels du service domestique au Cameroun** 🇨🇲

**🏠 Y'ana - Connecting families with domestic service professionals in Cameroon** 🇨🇲
