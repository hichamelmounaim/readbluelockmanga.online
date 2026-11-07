import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations, Translations } from '../data/translations';
import { SupportedLang } from '../types';

interface LanguageContextType {
  lang: SupportedLang;
  t: Translations;
  setLang: (newLang: SupportedLang) => void;
  localizePath: (path: string, targetLang?: SupportedLang) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine language from pathname prefix
  const lang: SupportedLang = useMemo(() => {
    const segment = location.pathname.split('/')[1];
    if (segment === 'fr') return 'fr';
    if (segment === 'pt') return 'pt';
    return 'en';
  }, [location.pathname]);

  const t = useMemo(() => {
    return (translations[lang] || translations.en) as unknown as Translations;
  }, [lang]);

  // Keep html lang attribute in sync
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const localizePath = useMemo(() => {
    return (rawPath: string, targetLang: SupportedLang = lang): string => {
      // Clean leading and trailing slashes
      const cleaned = rawPath.replace(/^\/(?:en|fr|pt)(?=\/|$)/, '').replace(/^\/+/, '');
      if (targetLang === 'en') {
        return '/' + cleaned;
      }
      return '/' + targetLang + (cleaned ? '/' + cleaned : '');
    };
  }, [lang]);

  const setLang = (newLang: SupportedLang) => {
    if (newLang === lang) return;
    const currentPath = location.pathname;
    const search = location.search;
    const hash = location.hash;

    // Handle reader paths: /chapter/1 vs /fr/chapter/1 vs /pt/chapter/1
    const segments = currentPath.split('/').filter(Boolean);
    if (segments[0] === 'fr' || segments[0] === 'pt' || segments[0] === 'en') {
      segments.shift();
    }
    const basePath = '/' + segments.join('/');
    const targetUrl = localizePath(basePath, newLang) + search + hash;
    navigate(targetUrl);
  };

  const value = useMemo(() => ({
    lang,
    t,
    setLang,
    localizePath
  }), [lang, t, localizePath]);

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
