import "./globals.css";
import { TranslationProvider } from "@/lib/TranslationContext";
import { translations } from "@/data/translations";
import Script from 'next/script';
import { TitleUpdater } from "@/components/TitleUpdater";

export async function generateMetadata() {
  return {
    title: {
      default: translations.fr.meta.title,
      template: `%s | ${translations.fr.meta.title}`
    },
    description: translations.fr.meta.description,
    icons: {
      icon: [
        { url: '/logo.png', sizes: 'any' },
        { url: '/logo.png', sizes: '192x192', type: 'image/png' },
        { url: '/logo.png', sizes: '512x512', type: 'image/png' }
      ],
      apple: { url: '/logo.png', sizes: '180x180', type: 'image/png' },
      shortcut: { url: '/logo.png', sizes: '192x192', type: 'image/png' }
    },
    manifest: '/manifest.json',
    openGraph: {
      title: translations.en.meta.title,
      description: translations.en.meta.description,
    },
    twitter: {
      title: translations.en.meta.title,
      description: translations.en.meta.description,
    },
    alternates: {
      languages: {
        'en': '/en',
        'fr': '/fr',
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className="antialiased"
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Y'ana",
                "description": "Plateforme connectant les familles camerounaises avec des nounous, babysitters et aides ménagères vérifiées.",
                "url": "https://yana.ebenewallace.com",
                "logo": "https://yana.ebenewallace.com/logo.png",
                "areaServed": "Cameroon",
                "sameAs": []
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Y'ana",
                "url": "https://yana.ebenewallace.com",
                "description": "Trouvez une aide domestique de confiance au Cameroun avec Y'ana.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://yana.ebenewallace.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Nounou Cameroun",
                "description": "Trouvez une nounou fiable à Yaoundé, Douala et partout au Cameroun.",
                "provider": {
                  "@type": "Organization",
                  "name": "Y'ana"
                },
                "areaServed": ["Yaoundé", "Douala", "Bafoussam", "Bamenda"]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Aide ménagère Cameroun",
                "description": "Services de nettoyage et aide ménagère professionnelle au Cameroun.",
                "provider": {
                  "@type": "Organization",
                  "name": "Y'ana"
                },
                "areaServed": ["Yaoundé", "Douala", "Bafoussam", "Bamenda"]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Babysitter Cameroun",
                "description": "Gardes d'enfants et babysitting fiable au Cameroun.",
                "provider": {
                  "@type": "Organization",
                  "name": "Y'ana"
                },
                "areaServed": ["Yaoundé", "Douala", "Bafoussam", "Bamenda"]
              }
            ])
          }}
        />
        <TranslationProvider>
          <TitleUpdater />
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
