'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function useTranslation(originalText: string): string {
  const { language, t } = useLanguage();
  const [translatedText, setTranslatedText] = useState(originalText);

  useEffect(() => {
    if (language === 'en') {
      setTranslatedText(originalText);
      return;
    }

    let isMounted = true;

    t(originalText).then((translated) => {
      if (isMounted) {
        setTranslatedText(translated);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [originalText, language, t]);

  return translatedText;
}

export function useTranslations(originalTexts: Record<string, string>): Record<string, string> {
  const { language, tMultiple } = useLanguage();
  const [translations, setTranslations] = useState(originalTexts);

  useEffect(() => {
    if (language === 'en') {
      setTranslations(originalTexts);
      return;
    }

    let isMounted = true;

    const keys = Object.keys(originalTexts);
    const texts = Object.values(originalTexts);

    tMultiple(texts).then((translatedTexts) => {
      if (isMounted) {
        const newTranslations: Record<string, string> = {};
        keys.forEach((key, index) => {
          newTranslations[key] = translatedTexts[index];
        });
        setTranslations(newTranslations);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [originalTexts, language, tMultiple]);

  return translations;
}
