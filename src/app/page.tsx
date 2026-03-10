"use client";

import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero";
const Problem = dynamic(() => import("@/components/sections/Problem").then(mod => mod.Problem), { ssr: true });
const Solution = dynamic(() => import("@/components/sections/Solution").then(mod => mod.Solution), { ssr: true });
const ProductShowcase = dynamic(() => import("@/components/sections/ProductShowcase").then(mod => mod.ProductShowcase), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then(mod => mod.HowItWorks), { ssr: true });
const MarketSurvey = dynamic(() => import("@/components/sections/MarketSurvey").then(mod => mod.MarketSurvey), { ssr: false });
const Waitlist = dynamic(() => import("@/components/sections/Waitlist").then(mod => mod.Waitlist), { ssr: false });
import { Languages } from "lucide-react";
import Image from "next/image";
import logoYana from "@/assets/logo-yana.png";
import { useTranslation } from "@/lib/TranslationContext";
import { LegalModals } from "@/components/ui/LegalModals";

export default function Home() {
  const { t, locale, setLocale } = useTranslation();

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
                src={logoYana}
                alt="Y'ana - Retour en haut"
                width={90}
                height={90}
                className="rounded-xl relative z-10 object-contain"
              />
            </button>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#problem" className="hover:text-accent transition-colors">{t.nav.problem}</a>
            <a href="#solution" className="hover:text-accent transition-colors">{t.nav.solution}</a>
            <a href="#how-it-works" className="hover:text-accent transition-colors">{t.nav.howItWorks}</a>
            <a href="#waitlist" className="px-5 py-2.5 bg-accent text-white rounded-full hover:bg-gray-800 transition-colors">{t.nav.joinWaitlist}</a>
            <button 
              onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-accent/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Languages className="w-4 h-4" />
              {locale === 'en' ? 'FR' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      <Hero />
      <Problem />
      <Solution />
      <ProductShowcase />
      <HowItWorks />
      <MarketSurvey />
      <Waitlist />

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
               <Image
                 src={logoYana}
                 alt="Y'ana"
                 width={90}
                 height={90}
                 className="rounded"
               />
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Wallace Newman.
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
