'use client';

import React, { useState } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language, LANGUAGES } from '@/lib/translator';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    console.log('[LanguageSelector] User selected language:', lang);
    setLanguage(lang);
    setIsOpen(false);
    // Reload page to re-translate content
    console.log('[LanguageSelector] Reloading page...');
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/80 border border-[#1B4332]/10 transition-colors"
      >
        <Languages className="w-4 h-4 text-[#1B4332]" />
        <span className="text-[14px] font-medium text-[#1B4332] hidden md:inline">
          {LANGUAGES[language].name}
        </span>
        <span className="text-[16px] md:hidden">{LANGUAGES[language].flag}</span>
        <ChevronDown className={`w-4 h-4 text-[#1B4332] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-[#1B4332]/10 py-2 z-50">
            {(Object.keys(LANGUAGES) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="w-full px-4 py-2 flex items-center justify-between hover:bg-[#F9F8F6] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[18px]">{LANGUAGES[lang].flag}</span>
                  <span className="text-[14px] text-[#1B4332] font-medium">
                    {LANGUAGES[lang].name}
                  </span>
                </div>
                {language === lang && (
                  <Check className="w-4 h-4 text-[#1B4332]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
