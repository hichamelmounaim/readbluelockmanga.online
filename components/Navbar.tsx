import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLang } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { lang, t, setLang, localizePath } = useLanguage();

  type NavLink = { name: string; path: string };
  const navLinks: NavLink[] = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.allChapters, path: '/manga' },
    { name: t.nav.characters, path: '/characters' },
    { name: 'Arcs', path: '/arcs' },
    { name: 'Anime', path: '/anime' },
  ];

  const languages: { code: SupportedLang; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français (VF)', flag: '🇫🇷' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
  ];

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  const isActive = (rawPath: string) => {
    const loc = localizePath(rawPath);
    if (rawPath === '/') {
      return location.pathname === '/' || location.pathname === `/${lang}`;
    }
    return location.pathname === loc || location.pathname.startsWith(loc);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to={localizePath('/')} className="flex-shrink-0 flex items-center gap-2 group" aria-label="Blue Lock Manga Home">
            <img
              src="/logo.png"
              alt="Blue Lock Manga Logo"
              width="216"
              height="40"
              fetchPriority="high"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-baseline space-x-2 lg:space-x-4">
              {navLinks.map((link) => {
                const target = localizePath(link.path);
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={target}
                    className={`px-3 py-2 rounded-md text-sm lg:text-base font-bold tracking-wide transition-colors ${
                      active
                        ? 'text-blue-500 font-bold bg-white/5'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search & Language Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to={localizePath('/manga')}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              title="Search Chapters"
              aria-label="Search Chapters"
            >
              <Search size={20} />
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-900/80 hover:bg-gray-800 text-xs font-bold text-gray-200 transition-colors"
                title="Change Language / Changer de langue / Mudar de idioma"
                aria-label={`Change language (currently ${currentLangObj.label})`}
                aria-expanded={isLangOpen}
              >
                <Globe size={14} className="text-blue-400" />
                <span>{currentLangObj.flag}</span>
                <span className="uppercase">{currentLangObj.code}</span>
              </button>

              {isLangOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 rounded-lg bg-gray-900 border border-gray-700 shadow-2xl py-1 z-50"
                  onMouseLeave={() => setIsLangOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                        lang === l.code
                          ? 'bg-blue-600/20 text-blue-400 font-bold'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {lang === l.code && <span className="text-[10px] text-blue-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden items-center gap-2">
            {/* Quick lang toggle on mobile */}
            <button
              onClick={() => {
                const nextLang: SupportedLang = lang === 'en' ? 'fr' : lang === 'fr' ? 'pt' : 'en';
                setLang(nextLang);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-gray-700 bg-gray-900 text-xs font-bold text-gray-200"
              title="Switch Language"
              aria-label={`Switch language from ${currentLangObj.label}`}
            >
              <span>{currentLangObj.flag}</span>
              <span className="uppercase">{currentLangObj.code}</span>
            </button>

            <Link
              to={localizePath('/manga')}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              title="Search Chapters"
              aria-label="Search Chapters"
            >
              <Search size={20} />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-gray-800">
          <div className="px-3 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const target = localizePath(link.path);
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={target}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-bold tracking-wide ${
                    active
                      ? 'text-blue-500 font-bold bg-white/5'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Language Selector */}
            <div className="pt-3 border-t border-gray-800">
              <p className="px-3 text-xs font-semibold uppercase text-gray-500 mb-2">Language / Langue / Idioma</p>
              <div className="flex gap-2 px-3">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsOpen(false);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors ${
                      lang === l.code
                        ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                        : 'border-gray-800 bg-gray-900 text-gray-400'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
