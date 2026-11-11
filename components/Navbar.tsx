import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, localizePath } = useLanguage();

  type NavLink = { name: string; path: string };
  const navLinks: NavLink[] = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.allChapters, path: '/manga' },
    { name: t.nav.characters, path: '/characters' },
    { name: 'Arcs', path: '/arcs' },
    { name: 'Anime', path: '/anime' },
  ];

  const isActive = (rawPath: string) => {
    const loc = localizePath(rawPath);
    if (rawPath === '/') {
      return location.pathname === '/' || location.pathname === '/en';
    }
    return location.pathname === loc || location.pathname.startsWith(loc);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to={localizePath('/')} className="flex-shrink-0 flex items-center gap-2 group" aria-label="Haikyu!! Manga Home">
            <span className="font-heading font-extrabold text-2xl tracking-wider text-white">
              HAIKYU<span className="text-orange-500">!!</span>
            </span>
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
                        ? 'text-orange-500 font-bold bg-white/5'
                        : 'text-gray-300 hover:text-orange-400 hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to={localizePath('/manga')}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              title="Search Chapters"
              aria-label="Search Chapters"
            >
              <Search size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden items-center gap-2">
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
                      ? 'text-orange-500 font-bold bg-white/5'
                      : 'text-gray-300 hover:text-orange-400 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
