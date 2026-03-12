"use client"

import { useEffect, useCallback } from 'react'
import { useTranslation } from '@/lib/TranslationContext'
import { analytics, useDeviceType, useScrollTracking, useWaitlistCTATracking } from '@/lib/instrumentation-client'

// Hook principal pour l'analytics sur la landing page
export const useLandingAnalytics = () => {
    const { locale } = useTranslation()
    const deviceType = useDeviceType()
    
    // Activer le tracking du scroll
    useScrollTracking()
    
    // Hook pour tracking des CTA waitlist
    const { trackCTAClick } = useWaitlistCTATracking()
    
    // Tracking de la vue de la landing page au chargement
    useEffect(() => {
        analytics.trackLandingViewed({
            language: locale,
            device_type: deviceType
        })
    }, [locale, deviceType])
    
    // Nouveaux tracking pour sections
    const trackHeroCTA = () => {
        analytics.trackHeroCTAClicked()
        trackCTAClick('hero')
    }
    
    const trackSolutionViewed = () => {
        analytics.trackSolutionSectionViewed()
    }
    
    const trackProductShowcaseViewed = () => {
        analytics.trackProductShowcaseViewed()
    }
    
    const trackLanguageChange = (fromLang: string, toLang: string) => {
        analytics.trackLanguageChanged(fromLang, toLang)
    }
    
    return { 
        trackCTAClick, 
        trackHeroCTA, 
        trackSolutionViewed, 
        trackProductShowcaseViewed,
        trackLanguageChange 
    }
}

// Hook pour tracking du formulaire waitlist
export const useWaitlistAnalytics = () => {
    const { locale } = useTranslation()
    
    // Tracking de l'ouverture du formulaire
    const trackWaitlistOpened = useCallback(() => {
        analytics.trackWaitlistOpened()
    }, [])
    
    // Tracking de la soumission du formulaire
    const trackWaitlistSubmitted = useCallback((city: string, userType: 'family' | 'worker') => {
        analytics.trackWaitlistSubmitted({
            city: city.toLowerCase().trim(),
            user_type: userType,
            language: locale
        })
    }, [locale])
    
    return { trackWaitlistOpened, trackWaitlistSubmitted }
}

// Hook pour tracking du market survey
export const useMarketSurveyAnalytics = () => {
    const { locale } = useTranslation()
    
    // Tracking de l'intention utilisateur selon le choix
    const trackUserTypeInterest = useCallback((userType: 'family' | 'worker') => {
        if (userType === 'family') {
            analytics.trackFamilyInterest()
        } else {
            analytics.trackWorkerInterest()
        }
        
        // Tracking du début du sondage
        analytics.trackSurveyStarted(userType)
    }, [])
    
    // Tracking de la fin du sondage
    const trackSurveyCompleted = useCallback(() => {
        analytics.trackSurveyCompleted()
    }, [])
    
    return { trackUserTypeInterest, trackSurveyCompleted }
}

// Hook pour tracking des sections avec Intersection Observer
export const useSectionTracking = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id
                        
                        // Tracking des sections spécifiques
                        if (sectionId === 'solution') {
                            analytics.trackSolutionSectionViewed()
                        } else if (sectionId === 'how-it-works') {
                            analytics.trackProductShowcaseViewed()
                        }
                        
                        // Une fois qu'une section est vue, on arrête de l'observer
                        observer.unobserve(entry.target)
                    }
                })
            },
            {
                threshold: 0.5 // 50% de la section visible
            }
        )
        
        // Observer les sections pertinentes
        const sections = ['solution', 'how-it-works']
        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId)
            if (element) {
                observer.observe(element)
            }
        })
        
        return () => observer.disconnect()
    }, [])
}

// Hook pour tracking de la FAQ
export const useFAQAnalytics = () => {
    const { trackFAQOpened } = analytics
    
    return { trackFAQOpened }
}
