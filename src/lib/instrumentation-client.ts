import posthog from 'posthog-js'
import { useState, useEffect } from 'react'

// Configuration PostHog
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: '2026-01-30',
    // Activation des heatmaps et session recordings
    enable_heatmaps: true,
    disable_session_recording: false,
    capture_pageview: false, // On gère manuellement les pageviews
    debug: true // Mode debug pour vérifier les événements
})

// Événement de test pour vérifier que PostHog fonctionne
if (typeof window !== 'undefined') {
    setTimeout(() => {
        posthog.capture('test_analytics_yana', {
            event_name: 'Test Analytics Y\'ana',
            description: 'Événement de test pour vérifier que l\'analytics fonctionne',
            timestamp: new Date().toISOString()
        })
        console.log('📊 PostHog test event sent - Analytics Y\'ana activé')
    }, 2000)
}

// Types pour les propriétés d'événements
interface LandingViewedProps {
    language: string
    device_type: string
}

interface WaitlistCTAClickedProps {
    location: 'hero' | 'solution_section' | 'faq_section' | 'final_cta'
}

interface WaitlistSubmittedProps {
    city: string
    user_type: 'family' | 'worker'
    language: string
}

interface FAQOpenedProps {
    question_id: 'worker_verification' | 'choose_worker' | 'services_available' | 'city_availability' | 'early_access'
}

// Événements de tracking - Noms en français pour meilleure compréhension
export const analytics = {
    // 1 - Vue de la landing page
    trackLandingViewed: (props: LandingViewedProps) => {
        posthog.capture('page_accueil_vue', {
            ...props,
            event_name: 'Vue Page Accueil',
            description: 'Un visiteur arrive sur la landing page Y\'ana'
        })
    },

    // 2 - Tracking du scroll
    trackScroll50: () => {
        posthog.capture('defilement_50_pourcent', {
            event_name: 'Scroll 50%',
            description: 'Le visiteur a fait défiler 50% de la page'
        })
    },

    trackScroll90: () => {
        posthog.capture('defilement_90_pourcent', {
            event_name: 'Scroll 90%',
            description: 'Le visiteur a fait défiler 90% de la page'
        })
    },

    // 3 - Clic sur les boutons waitlist
    trackWaitlistCTAClicked: (props: WaitlistCTAClickedProps) => {
        posthog.capture('clic_liste_attente', {
            ...props,
            event_name: 'Clic Liste d\'Attente',
            description: 'Clic sur un bouton pour rejoindre la liste d\'attente'
        })
    },

    // 4 - Ouverture du formulaire waitlist
    trackWaitlistOpened: () => {
        posthog.capture('formulaire_liste_attente_ouvert', {
            event_name: 'Formulaire Liste d\'Attente Ouvert',
            description: 'Le formulaire d\'inscription est maintenant visible'
        })
    },

    // 5 - Soumission de la waitlist
    trackWaitlistSubmitted: (props: WaitlistSubmittedProps) => {
        posthog.capture('inscription_liste_attente', {
            ...props,
            event_name: 'Inscription Liste d\'Attente',
            description: 'Un utilisateur s\'est inscrit avec succès'
        })
    },

    // 6 - Interaction avec la FAQ
    trackFAQOpened: (props: FAQOpenedProps) => {
        posthog.capture('question_faq_ouverte', {
            ...props,
            event_name: 'Question FAQ Ouverte',
            description: 'Un utilisateur a ouvert une question de la FAQ'
        })
    },

    // 7 - Intention utilisateur (marketplace signal)
    trackFamilyInterest: () => {
        posthog.capture('interet_famille', {
            event_name: 'Intérêt Famille',
            description: 'L\'utilisateur cherche une aide domestique (famille)'
        })
    },

    trackWorkerInterest: () => {
        posthog.capture('interet_travailleur', {
            event_name: 'Intérêt Travailleur',
            description: 'L\'utilisateur cherche du travail (travailleur domestique)'
        })
    },

    // 8 - Nouveaux événements pour plus de visibilité
    trackHeroCTAClicked: () => {
        posthog.capture('clic_hero_principal', {
            event_name: 'Clic Hero Principal',
            description: 'Clic sur le bouton principal du hero'
        })
    },

    trackSolutionSectionViewed: () => {
        posthog.capture('section_solution_vue', {
            event_name: 'Section Solution Vue',
            description: 'Un utilisateur a vu la section solution'
        })
    },

    trackProductShowcaseViewed: () => {
        posthog.capture('demonstration_produit_vue', {
            event_name: 'Démonstration Produit Vue',
            description: 'Un utilisateur a vu la démonstration du produit'
        })
    },

    trackSurveyStarted: (userType: 'family' | 'worker') => {
        posthog.capture('sondage_demarre', {
            type_utilisateur: userType,
            event_name: 'Sondage Démarré',
            description: 'Un utilisateur a commencé le sondage marché'
        })
    },

    trackSurveyCompleted: () => {
        posthog.capture('sondage_termine', {
            event_name: 'Sondage Terminé',
            description: 'Un utilisateur a terminé le sondage marché'
        })
    },

    trackLanguageChanged: (fromLang: string, toLang: string) => {
        posthog.capture('langue_changee', {
            langue_precedente: fromLang,
            nouvelle_langue: toLang,
            event_name: 'Langue Changée',
            description: 'Un utilisateur a changé la langue du site'
        })
    },

    // Utilitaires
    identify: (userId: string, properties?: Record<string, unknown>) => {
        posthog.identify(userId, properties)
    },

    reset: () => {
        posthog.reset()
    }
}

// Hook pour détecter le type d'appareil
export const useDeviceType = (): string => {
    if (typeof window === 'undefined') return 'unknown'
    
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
}

// Hook pour le tracking du scroll avec debounce
export const useScrollTracking = () => {
    const [trackedEvents, setTrackedEvents] = useState<{
        scroll50: boolean
        scroll90: boolean
    }>({
        scroll50: false,
        scroll90: false
    })

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPosition = window.scrollY
            const scrollPercentage = (scrollPosition / scrollHeight) * 100

            // Tracking à 50%
            if (scrollPercentage >= 50 && !trackedEvents.scroll50) {
                analytics.trackScroll50()
                setTrackedEvents((prev: typeof trackedEvents) => ({ ...prev, scroll50: true }))
            }

            // Tracking à 90%
            if (scrollPercentage >= 90 && !trackedEvents.scroll90) {
                analytics.trackScroll90()
                setTrackedEvents((prev: typeof trackedEvents) => ({ ...prev, scroll90: true }))
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [trackedEvents])
}

// Hook pour tracking des clics sur les liens waitlist
export const useWaitlistCTATracking = () => {
    const trackCTAClick = (location: WaitlistCTAClickedProps['location']) => {
        analytics.trackWaitlistCTAClicked({ location })
    }

    return { trackCTAClick }
}

// Mapping des questions FAQ vers leurs IDs
export const getFAQQuestionId = (questionText: string): FAQOpenedProps['question_id'] => {
    const normalizedText = questionText.toLowerCase()
    
    if (normalizedText.includes('vérifi') || normalizedText.includes('crédibilité')) {
        return 'worker_verification'
    }
    if (normalizedText.includes('choisir') || normalizedText.includes('moi-même')) {
        return 'choose_worker'
    }
    if (normalizedText.includes('services') || normalizedText.includes('disponibles')) {
        return 'services_available'
    }
    if (normalizedText.includes('ville') || normalizedText.includes('disponible')) {
        return 'city_availability'
    }
    if (normalizedText.includes('premiers') || normalizedText.includes('utilisateurs')) {
        return 'early_access'
    }
    
    return 'worker_verification' // fallback
}