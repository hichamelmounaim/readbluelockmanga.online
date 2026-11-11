import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { translations } from '../data/translations';
import { SupportedLang } from '../types';

export type Translations = typeof translations.en;

interface LanguageContextType {
  lang: SupportedLang;
  t: Translations;
  setLang: (newLang: SupportedLang) => void;
  localizePath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lang: SupportedLang = 'en';
  const t = translations.en;

  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  const localizePath = useMemo(() => {
    return (rawPath: string): string => {
      const cleaned = rawPath.replace(/^\/(?:en|fr|pt)(?=\/|$)/, '').replace(/^\/+/, '');
      return '/' + cleaned;
    };
  }, []);

  const setLang = (_newLang: SupportedLang) => {};

  const value = useMemo(() => ({
    lang,
    t,
    setLang,
    localizePath
  }), [localizePath]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
