import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, ArrowRight, Grid, List, Check } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { PAGE_META, SITE_URL } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { useManga } from '../context/MangaContext';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'bluelock_read_chapters';

const MangaList: React.FC = () => {
  const { chapters } = useManga();
  const { lang, t, localizePath } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => (localStorage.getItem('manga_view_mode') as 'grid' | 'list') || 'grid');
  const [readChapters, setReadChapters] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setReadChapters(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  const toggleRead = (e: React.MouseEvent, num: number) => {
    e.preventDefault();
    e.stopPropagation();
    setReadChapters(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const handleViewMode = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    localStorage.setItem('manga_view_mode', mode);
  };

  const metaPath = lang === 'en' ? '/manga' : `/${lang}/manga`;
  const pageMeta = PAGE_META[metaPath] || PAGE_META['/manga'];

  const alternateLinks = [
    { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/manga` },
    { rel: 'alternate', hreflang: 'fr', href: `${SITE_URL}/fr/manga` },
    { rel: 'alternate', hreflang: 'pt', href: `${SITE_URL}/pt/manga` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/manga` },
  ];

  const filteredChapters = React.useMemo(() => {
    return chapters.filter(ch =>
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.number.toString().includes(searchTerm)
    ).sort((a, b) => {
      return sortOrder === 'desc' ? b.number - a.number : a.number - b.number;
    });
  }, [chapters, searchTerm, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <SEOHead
        title={pageMeta.title}
        description={pageMeta.description}
        canonicalUrl={lang === 'en' ? `${SITE_URL}/manga` : `${SITE_URL}/${lang}/manga`}
        schemas={[{ "@context": "https://schema.org", "@type": "CollectionPage", "name": pageMeta.title, "url": `${SITE_URL}${metaPath}` }]}
        alternateLinks={alternateLinks}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[
          { label: t.nav.home, path: '/' },
          { label: t.nav.allChapters, path: '/manga' }
        ]} />
      </div>

      {/* Hero Header */}
      <div className="relative bg-[#111] border-b border-white/5 py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-150 opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 block">
            {t.mangaList.completeCollection} ({chapters.length})
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            BLUE <span className="text-blue-500">LOCK MANGA</span> {t.nav.allChapters}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            {t.hero.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-[#141414] rounded-2xl p-4 md:p-6 mb-8 border border-gray-200 dark:border-white/5 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t.mangaList.searchPlaceholder}
                aria-label={t.mangaList.searchPlaceholder || "Search chapters"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Sort & View Options */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => setSortOrder(o => o === 'desc' ? 'asc' : 'desc')}
                aria-label={`Sort chapters, currently ${sortOrder === 'desc' ? t.mangaList.newest : t.mangaList.oldest}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                <Filter size={16} />
                <span>{sortOrder === 'desc' ? t.mangaList.newest : t.mangaList.oldest}</span>
              </button>

              <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/40 p-1">
                <button
                  onClick={() => handleViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => handleViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  title="List View"
                  aria-label="List View"
                >
                  <List size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Chapter Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredChapters.map((ch) => {
              const isRead = readChapters.has(ch.number);
              const pCount = lang === 'fr' ? (ch.pageCountFr || 20) : lang === 'pt' ? (ch.pageCountPt || 20) : (ch.pageCount || 20);
              return (
                <Link
                  key={ch.id}
                  to={localizePath(`/chapter/${ch.number}`)}
                  className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isRead
                      ? 'bg-gray-100/60 dark:bg-white/[0.02] border-gray-200 dark:border-white/5 opacity-75'
                      : 'bg-white dark:bg-[#141414] border-gray-200 dark:border-white/5 hover:border-blue-500/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                        {t.home.chapter} {ch.number}
                      </span>
                      <button
                        onClick={(e) => toggleRead(e, ch.number)}
                        className={`p-1 rounded-full text-xs transition-colors ${
                          isRead ? 'text-green-400 bg-green-500/10' : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                        title={isRead ? 'Mark as Unread' : 'Mark as Read'}
                        aria-label={isRead ? `Mark Chapter ${ch.number} as Unread` : `Mark Chapter ${ch.number} as Read`}
                      >
                        <Check size={14} />
                      </button>
                    </div>

                    <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {pCount} {t.reader.page}s
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 group-hover:text-blue-400 transition-colors">
                    <span>{t.home.readNow}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Chapter List View */
          <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-white/5 divide-y divide-gray-100 dark:divide-white/5 overflow-hidden">
            {filteredChapters.map((ch) => {
              const isRead = readChapters.has(ch.number);
              const pCount = lang === 'fr' ? (ch.pageCountFr || 20) : lang === 'pt' ? (ch.pageCountPt || 20) : (ch.pageCount || 20);
              return (
                <div
                  key={ch.id}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors ${
                    isRead ? 'opacity-60' : ''
                  }`}
                >
                  <Link
                    to={localizePath(`/chapter/${ch.number}`)}
                    className="flex-1 flex items-center gap-4 min-w-0"
                  >
                    <span className="text-sm font-bold text-blue-500 min-w-[70px]">
                      {t.home.chapter} {ch.number}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {ch.title}
                    </span>
                    <span className="text-xs text-gray-400 hidden sm:inline">
                      {pCount} {t.reader.page}s
                    </span>
                  </Link>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleRead(e, ch.number)}
                      className={`p-1.5 rounded-lg text-xs transition-colors ${
                        isRead ? 'text-green-400 bg-green-500/10' : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={isRead ? 'Mark as Unread' : 'Mark as Read'}
                      aria-label={isRead ? `Mark Chapter ${ch.number} as Unread` : `Mark Chapter ${ch.number} as Read`}
                    >
                      <Check size={16} />
                    </button>
                    <Link
                      to={localizePath(`/chapter/${ch.number}`)}
                      className="px-3 py-1 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      {t.home.readNow}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MangaList;
