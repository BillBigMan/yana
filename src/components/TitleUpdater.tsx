"use client";

import { useEffect } from 'react';
import { useTranslation } from '@/lib/TranslationContext';

export function TitleUpdater() {
  const { locale } = useTranslation();

  useEffect(() => {
    // Update document title based on locale
    const title = locale === 'fr' 
      ? "Y'ana – Trouvez une nounou ou une aide ménagère fiable au Cameroun"
      : "Y'ana – Find a trusted nanny or housekeeper in Cameroon";
    document.title = title;
  }, [locale]);

  return null; // This component doesn't render anything
}
