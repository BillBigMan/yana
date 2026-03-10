"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, Locale } from "@/data/translations";

type TranslationContextType = {
  locale: Locale;
  t: typeof translations.en;
  setLocale: (locale: Locale) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Auto-detect language only on mount
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.split("-")[0];
      const detectedLocale: Locale = browserLang === "fr" ? "fr" : "en";
      setLocale(detectedLocale);
    }
  }, []);

  const value = {
    locale,
    t: translations[locale],
    setLocale,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
