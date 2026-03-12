"use client";

import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero";
const Problem = dynamic(() => import("@/components/sections/Problem").then(mod => mod.Problem), { ssr: true });
const Solution = dynamic(() => import("@/components/sections/Solution").then(mod => mod.Solution), { ssr: true });
const ProductShowcase = dynamic(() => import("@/components/sections/ProductShowcase").then(mod => mod.ProductShowcase), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then(mod => mod.HowItWorks), { ssr: true });
const MarketSurvey = dynamic(() => import("@/components/sections/MarketSurvey").then(mod => mod.MarketSurvey), { ssr: false });
const Waitlist = dynamic(() => import("@/components/sections/Waitlist").then(mod => mod.Waitlist), { ssr: false });
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ), { ssr: false });
import { Languages, Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/TranslationContext";
import { LegalModals } from "@/components/ui/LegalModals";
import { useState, useEffect } from "react";
import { useLandingAnalytics, useSectionTracking } from "@/hooks/useAnalytics";

export default function Home() {
  const { t, locale, setLocale } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Analytics tracking
  const { trackCTAClick, trackLanguageChange } = useLandingAnalytics();
  
  // Tracking automatique des sections
  useSectionTracking();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['problem', 'solution', 'how-it-works', 'faq', 'waitlist'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Simple Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group transform transition-all duration-500 hover:scale-110 active:scale-95 rounded-xl hover:cursor-pointer relative overflow-hidden"
            >
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-80 transition-all duration-700 animate-pulse shadow-lg shadow-white/70 blur-sm" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 delay-200 animate-bounce shadow-md shadow-white/50" />
              <div className="absolute top-1/2 -left-3 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1200 delay-500" />
              <Image
                src="/assets/logo-yana.png"
                alt="Y'ana - logo"
                width={90}
                height={90}
                className="rounded-xl relative z-10 object-contain"
              />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a 
                href="#problem" 
                className={`transition-colors ${activeSection === 'problem' ? 'text-accent' : 'hover:text-accent'}`}
              >
                {t.nav.problem}
              </a>
              <a 
                href="#solution" 
                className={`transition-colors ${activeSection === 'solution' ? 'text-accent' : 'hover:text-accent'}`}
              >
                {t.nav.solution}
              </a>
              <a 
                href="#how-it-works" 
                className={`transition-colors ${activeSection === 'how-it-works' ? 'text-accent' : 'hover:text-accent'}`}
              >
                {t.nav.howItWorks}
              </a>
              <a 
                href="#faq" 
                className={`transition-colors ${activeSection === 'faq' ? 'text-accent' : 'hover:text-accent'}`}
              >
                {t.nav.faq}
              </a>
              <a 
                href="#waitlist" 
                className={`px-5 py-2.5 rounded-full transition-colors ${
                  activeSection === 'waitlist' 
                    ? 'bg-accent text-white' 
                    : 'bg-accent text-white hover:bg-gray-800'
                }`}
                onClick={() => trackCTAClick('solution_section')}
              >
                {t.nav.joinWaitlist}
              </a>
            </div>
            
            <button 
              onClick={() => {
                const newLocale = locale === 'en' ? 'fr' : 'en';
                trackLanguageChange(locale, newLocale);
                setLocale(newLocale);
              }}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-accent/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Languages className="w-4 h-4" />
              {locale === 'en' ? 'FR' : 'EN'}
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg md:hidden">
              <div className="container mx-auto px-6 py-4 space-y-3">
                <a 
                  href="#problem" 
                  className={`block py-2 text-sm font-medium transition-colors ${
                    activeSection === 'problem' ? 'text-accent' : 'text-gray-600 hover:text-accent'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.problem}
                </a>
                <a 
                  href="#solution" 
                  className={`block py-2 text-sm font-medium transition-colors ${
                    activeSection === 'solution' ? 'text-accent' : 'text-gray-600 hover:text-accent'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.solution}
                </a>
                <a 
                  href="#how-it-works" 
                  className={`block py-2 text-sm font-medium transition-colors ${
                    activeSection === 'how-it-works' ? 'text-accent' : 'text-gray-600 hover:text-accent'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.howItWorks}
                </a>
                <a 
                  href="#faq" 
                  className={`block py-2 text-sm font-medium transition-colors ${
                    activeSection === 'faq' ? 'text-accent' : 'text-gray-600 hover:text-accent'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.faq}
                </a>
                <a 
                  href="#waitlist" 
                  className={`block py-2.5 px-5 text-sm font-medium rounded-full transition-colors w-full text-center ${
                    activeSection === 'waitlist' 
                      ? 'bg-accent text-white' 
                      : 'bg-accent text-white hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    trackCTAClick('solution_section')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  {t.nav.joinWaitlist}
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Hero />
      <Problem />
      <Solution />
      <ProductShowcase />
      <HowItWorks />
      <MarketSurvey />
      <Waitlist />
      <FAQ />

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-accent/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
               <Image
                 src="/assets/logo-yana.png"
                 alt="Y'ana - logo"
                 width={90}
                 height={90}
                 className="rounded"
               />
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Ebene Wallace.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <LegalModals />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
