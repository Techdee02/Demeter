'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translateText, translateMultiple } from '@/lib/translator';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => Promise<string>;
  tMultiple: (texts: string[]) => Promise<string[]>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback((lang: Language) => {
    console.log('[LanguageContext] Setting language to:', lang);
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('demeter-language', lang);
      console.log('[LanguageContext] Saved to localStorage:', lang);
    }
  }, []);

  const t = useCallback(
    async (text: string) => {
      return translateText(text, language);
    },
    [language]
  );

  const tMultiple = useCallback(
    async (texts: string[]) => {
      return translateMultiple(texts, language);
    },
    [language]
  );

  // Load language from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('demeter-language') as Language;
      if (savedLang && ['en', 'ig', 'yo', 'ha'].includes(savedLang)) {
        setLanguageState(savedLang);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tMultiple }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
