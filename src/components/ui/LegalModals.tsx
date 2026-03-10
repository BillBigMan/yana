"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '@/lib/TranslationContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}

function TermsContent() {
  const { locale } = useTranslation();
  
  if (locale === 'en') {
    return (
      <div className="space-y-6 text-gray-700">
        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">1. Website Purpose</h3>
          <p className="text-sm leading-relaxed">
            This website presents Y&apos;ana, a platform connecting families with domestic workers in Cameroon. 
            It is a presentation and interest collection page for the future application launch.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">2. Data Collection</h3>
          <p className="text-sm leading-relaxed mb-3">
            We only collect information necessary for contact:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Full name and email address</li>
            <li>Phone number and city</li>
            <li>User type (family or worker)</li>
            <li>Market survey responses</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">3. Data Usage</h3>
          <p className="text-sm leading-relaxed">
            Your data is used exclusively for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Contacting you when Y&apos;ana launches</li>
            <li>Informing you about platform developments</li>
            <li>Understanding Cameroonian market needs</li>
            <li>Improving our future service offering</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">4. Data Protection</h3>
          <p className="text-sm leading-relaxed mb-3">
            We commit to protecting your information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Secure storage on servers in Cameroon</li>
            <li>Limited access to founding team only</li>
            <li>No sale or sharing with third parties</li>
            <li>Deletion upon simple request</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">5. Your Rights</h3>
          <p className="text-sm leading-relaxed">
            You can at any time:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Request access to your data</li>
            <li>Request modification of your information</li>
            <li>Request deletion of your registration</li>
            <li>Unsubscribe from our communications</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">6. Retention Period</h3>
          <p className="text-sm leading-relaxed">
            Your data is kept for maximum 2 years after registration, 
            unless you request deletion before this date.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">7. Contact</h3>
          <p className="text-sm leading-relaxed">
            For any questions about your data or these terms:
            <br />
            <a href="mailto:contact@ebenewallace.com" className="text-primary hover:underline">
              contact@ebenewallace.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-700">
      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">1. Objet du Site</h3>
        <p className="text-sm leading-relaxed">
          Ce site web présente Y&apos;ana, une plateforme de mise en relation entre familles et travailleurs domestiques au Cameroun. 
          Il s&apos;agit d&apos;une page de présentation et de collecte d&apos;intérêts pour le lancement futur de l&apos;application.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">2. Collecte des Données</h3>
        <p className="text-sm leading-relaxed mb-3">
          Nous collectons uniquement les informations nécessaires à la prise de contact :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Nom complet et adresse email</li>
          <li>Numéro de téléphone et ville</li>
          <li>Type d&apos;utilisateur (famille ou travailleur)</li>
          <li>Réponses au questionnaire de marché</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">3. Utilisation des Données</h3>
        <p className="text-sm leading-relaxed">
          Vos données sont utilisées exclusivement pour :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Vous contacter lors du lancement de Y&apos;ana</li>
          <li>Vous informer des développements de la plateforme</li>
          <li>Comprendre les besoins du marché camerounais</li>
          <li>Améliorer notre offre de service future</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">4. Protection des Données</h3>
        <p className="text-sm leading-relaxed mb-3">
          Nous nous engageons à protéger vos informations :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Stockage sécurisé sur des serveurs au Cameroun</li>
          <li>Accès limité à l&apos;équipe fondatrice</li>
          <li>Aucune vente ou partage avec des tiers</li>
          <li>Suppression sur simple demande</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">5. Vos Droits</h3>
        <p className="text-sm leading-relaxed">
          Vous pouvez à tout moment :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Demander l&apos;accès à vos données</li>
          <li>Demander la modification de vos informations</li>
          <li>Demander la suppression de votre inscription</li>
          <li>Vous désinscrire de nos communications</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">6. Durée de Conservation</h3>
        <p className="text-sm leading-relaxed">
          Vos données sont conservées pendant 2 ans maximum après votre inscription, 
          sauf si vous demandez leur suppression avant cette date.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">7. Contact</h3>
        <p className="text-sm leading-relaxed">
          Pour toute question concernant vos données ou ces conditions :
          <br />
          <a href="mailto:contact@ebenewallace.com" className="text-primary hover:underline">
            contact@ebenewallace.com
          </a>
        </p>
      </div>
    </div>
  );
}

function PrivacyContent() {
  const { locale } = useTranslation();
  
  if (locale === 'en') {
    return (
      <div className="space-y-6 text-gray-700">
        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">1. Data Collected</h3>
          <p className="text-sm leading-relaxed mb-3">
            On this presentation page, we only collect:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Contact Information:</strong> Name, email, phone, city</li>
            <li><strong>User Type:</strong> Family or domestic worker</li>
            <li><strong>Survey Responses:</strong> Cameroonian market needs</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">2. Processing Purpose</h3>
          <p className="text-sm leading-relaxed">
            Your data is used solely for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Notifying you when Y&apos;ana app launches</li>
            <li>Understanding specific Cameroonian market needs</li>
            <li>Adapting our platform to local realities</li>
            <li>Informing you about project progress</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">3. Security Measures</h3>
          <p className="text-sm leading-relaxed mb-3">
            We protect your information through:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Secure servers hosted in Cameroon</li>
            <li>Encryption of sensitive data</li>
            <li>Restricted access to founding team only</li>
            <li>Regular and secure backups</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">4. Data Sharing</h3>
          <p className="text-sm leading-relaxed">
            <strong>We never share your data with third parties.</strong>
            Your information remains confidential and is used only within this project.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">5. Your Rights</h3>
          <p className="text-sm leading-relaxed mb-3">
            By law, you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Know what data we have about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your registration</li>
            <li>Object to processing of your data</li>
          </ul>
          <p className="text-sm leading-relaxed mt-2">
            Contact us at contact@ebenewallace.com to exercise these rights.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">6. Data Retention</h3>
          <p className="text-sm leading-relaxed">
            Your data is kept for maximum 2 years after registration. 
            After this period, or upon your request, it is automatically deleted.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">7. Cookies</h3>
          <p className="text-sm leading-relaxed">
            This site only uses essential technical cookies for functionality. 
            No tracking or advertising cookies are used.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">8. Modifications</h3>
          <p className="text-sm leading-relaxed">
            Any changes to this policy will be notified by email 
            and published on this page.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-primary">9. DPO Contact</h3>
          <p className="text-sm leading-relaxed">
            For any questions about your personal data:
            <br />
            <a href="mailto:contact@ebenewallace.com" className="text-primary hover:underline">
              contact@ebenewallace.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-700">
      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">1. Données Collectées</h3>
        <p className="text-sm leading-relaxed mb-3">
          Sur cette page de présentation, nous collectons uniquement :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li><strong>Informations de contact :</strong> Nom, email, téléphone, ville</li>
          <li><strong>Type d&apos;utilisateur :</strong> Famille ou travailleur domestique</li>
          <li><strong>Réponses au questionnaire :</strong> Besoins du marché camerounais</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">2. Finalité du Traitement</h3>
        <p className="text-sm leading-relaxed">
          Vos données servent uniquement à :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Vous prévenir du lancement de l&apos;application Y&apos;ana</li>
          <li>Comprendre les besoins spécifiques du marché camerounais</li>
          <li>Adapter notre plateforme aux réalités locales</li>
          <li>Vous informer des avancées du projet</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">3. Mesures de Sécurité</h3>
        <p className="text-sm leading-relaxed mb-3">
          Nous protégeons vos informations par :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Serveurs sécurisés hébergés au Cameroun</li>
          <li>Chiffrement des données sensibles</li>
          <li>Accès restreint à l&apos;équipe fondatrice uniquement</li>
          <li>Sauvegardes régulières et sécurisées</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">4. Partage des Données</h3>
        <p className="text-sm leading-relaxed">
          <strong>Nous ne partageons jamais vos données avec des tiers.</strong>
          Vos informations restent confidentielles et ne sont utilisées que dans le cadre de ce projet.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">5. Vos Droits</h3>
        <p className="text-sm leading-relaxed mb-3">
          Conformément à la législation, vous avez le droit de :
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Savoir quelles données nous avons sur vous</li>
          <li>Demander la correction d&apos;informations inexactes</li>
          <li>Demander la suppression de votre inscription</li>
          <li>Vous opposer au traitement de vos données</li>
        </ul>
        <p className="text-sm leading-relaxed mt-2">
          Contactez-nous à contact@ebenewallace.com pour exercer ces droits.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">6. Conservation des Données</h3>
        <p className="text-sm leading-relaxed">
          Vos données sont conservées pendant 2 ans maximum après votre inscription. 
          Passé ce délai, ou sur votre demande, elles sont automatiquement supprimées.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">7. Cookies</h3>
        <p className="text-sm leading-relaxed">
          Ce site utilise uniquement des cookies techniques essentiels au fonctionnement. 
          Aucun cookie de suivi ou de publicité n&apos;est utilisé.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">8. Modifications</h3>
        <p className="text-sm leading-relaxed">
          Toute modification de cette politique sera notifiée par email 
          et publiée sur cette page.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 text-primary">9. Contact DPO</h3>
        <p className="text-sm leading-relaxed">
          Pour toute question sur vos données personnelles :
          <br />
          <a href="mailto:contact@ebenewallace.com" className="text-primary hover:underline">
            contact@ebenewallace.com
          </a>
        </p>
      </div>
    </div>
  );
}

export function LegalModals() {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  const { locale } = useTranslation();
  
  // Load cookie consent from localStorage on mount
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'rejected' | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cookie-consent') as 'accepted' | 'rejected' | null;
    }
    return null;
  });

  const [mounted] = useState(() => typeof window !== 'undefined');

  const handleCookieConsent = (consent: 'accepted' | 'rejected') => {
    setCookieConsent(consent);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', consent);
    }
  };

  // Show cookie consent banner if no decision made
  if (mounted && cookieConsent === null) {
    return (
      <>
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
          <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm">
                {locale === 'en' 
                  ? "We use essential cookies to make this site work. By continuing, you agree to our use of cookies."
                  : "Nous utilisons des cookies essentiels pour faire fonctionner ce site. En continuant, vous acceptez notre utilisation des cookies."}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => handleCookieConsent('rejected')}
                className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {locale === 'en' ? 'Reject' : 'Refuser'}
              </button>
              <button 
                onClick={() => handleCookieConsent('accepted')}
                className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                {locale === 'en' ? 'Accept' : 'Accepter'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-6 text-sm text-red-500">
          <button 
            onClick={() => setActiveModal('privacy')}
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {locale === 'en' ? 'Privacy' : 'Confidentialité'}
          </button>
          <button 
            onClick={() => setActiveModal('terms')}
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {locale === 'en' ? 'Terms' : 'Conditions'}
          </button>
          <a href="#contact" className="hover:text-red-600 cursor-pointer">
            {locale === 'en' ? 'Contact' : 'Contact'}
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title={locale === 'en' ? 'Terms of Service' : 'Conditions Générales'}
      >
        <TermsContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title={locale === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
      >
        <PrivacyContent />
      </Modal>

      {/* Boutons de navigation dans le footer */}
      <div className="flex gap-6 text-sm text-gray-400">
        <button 
          onClick={() => setActiveModal('privacy')}
          className="hover:text-gray-600 transition-colors cursor-pointer"
        >
          {locale === 'en' ? 'Privacy' : 'Confidentialité'}
        </button>
        <button 
          onClick={() => setActiveModal('terms')}
          className="hover:text-gray-600 transition-colors cursor-pointer"
        >
          {locale === 'en' ? 'Terms' : 'Conditions'}
        </button>
        <a href="#contact" className="hover:text-gray-600 cursor-pointer">
          {locale === 'en' ? 'Contact' : 'Contact'}
        </a>
      </div>
    </>
  );
}
