import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Share2, ArrowDown, ArrowRight, Send, BookOpen, ChevronUp, RefreshCw, LayoutList, FileText, Layers, Users, Globe } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useManga } from '../context/MangaContext';
import { useLanguage } from '../context/LanguageContext';
import { Chapter, SupportedLang } from '../types';
import { getChapterSEOData, getAdjacentChapters, realChapterTitle, DEFAULT_OG_IMAGE, SITE_URL } from '../utils/seo';

const ChapterReader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { chapters, getChapterWithPages } = useManga();
  const { lang, t, setLang, localizePath } = useLanguage();

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingMode, setReadingMode] = useState<'webtoon' | 'single'>('webtoon');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [failedPages, setFailedPages] = useState<Record<number, boolean>>({});
  const [retryKeys, setRetryKeys] = useState<Record<number, number>>({});

  // parseFloat, not parseInt: chapters like 314.1 / 364.2 must not collapse into 314 / 364.
  const currentNum = parseFloat(chapterId || "0") || 0;

  useEffect(() => {
    if (currentNum > 0) {
      localStorage.setItem('bluelock_last_chapter', String(currentNum));
    }
  }, [currentNum]);

  // Load chapter data on demand with zero artificial delay
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setFailedPages({});
    setCurrentPageIndex(0);

    getChapterWithPages(currentNum).then((data) => {
      if (!isCancelled) {
        if (data) {
          setChapter(data);
        }
        setLoading(false);
        window.scrollTo(0, 0);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentNum, getChapterWithPages]);

  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) setShowControls(false);
      else setShowControls(true);
      lastScrollY.current = currentScrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.round((currentScrollY / docHeight) * 100) : 0);
      setShowScrollTop(currentScrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prev/next by position in the list
  const { prev: prevChapter, next: nextChapter, nearby: surroundingChapters } = useMemo(
    () => getAdjacentChapters(chapters, currentNum),
    [chapters, currentNum]
  );

  const prevChapterRef = useRef<Chapter | undefined>(prevChapter);
  const nextChapterRef = useRef<Chapter | undefined>(nextChapter);
  prevChapterRef.current = prevChapter;
  nextChapterRef.current = nextChapter;

  // Select pages based on active language
  const pages = useMemo(() => {
    if (!chapter) return [];
    if (lang === 'fr' && chapter.pagesFr && chapter.pagesFr.length > 0) return chapter.pagesFr;
    if (lang === 'pt' && chapter.pagesPt && chapter.pagesPt.length > 0) return chapter.pagesPt;
    return chapter.pages || [];
  }, [chapter, lang]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (readingMode === 'single' && pages.length > 0) {
        if (e.key === 'ArrowRight') {
          if (currentPageIndex < pages.length - 1) {
            setCurrentPageIndex(p => p + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (nextChapterRef.current) {
            navigate(localizePath(`/chapter/${nextChapterRef.current.number}`));
          }
        } else if (e.key === 'ArrowLeft') {
          if (currentPageIndex > 0) {
            setCurrentPageIndex(p => p - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (prevChapterRef.current) {
            navigate(localizePath(`/chapter/${prevChapterRef.current.number}`));
          }
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [readingMode, currentPageIndex, pages.length, navigate, localizePath]);

  const handleNav = (num: number) => {
    navigate(localizePath(`/chapter/${num}`));
  };

  const handleRetryPage = (idx: number) => {
    setFailedPages(prev => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
    setRetryKeys(prev => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1
    }));
  };

  const seo = useMemo(() => {
    return getChapterSEOData(currentNum, {
      title: chapter?.title,
      pageCount: pages.length,
      lang
    });
  }, [currentNum, chapter?.title, pages.length, lang]);

  if (loading && !chapter) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-3 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase animate-pulse">
          {t.reader.loading}
        </p>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Chapter not found</h2>
        <Link to={localizePath('/manga')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {t.reader.backToChapters}
        </Link>
      </div>
    );
  }

  const langList: { code: SupportedLang; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
      <SEOHead
        title={seo.seoTitle}
        description={seo.seoDescription}
        image={DEFAULT_OG_IMAGE}
        type="article"
        schema={seo.schema}
        canonical={seo.canonicalUrl}
        noindex={pages.length === 0}
      />

      {/* Floating Reader Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } bg-[#0e0e0e]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2.5 flex items-center justify-between text-white shadow-xl`}
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link
            to={localizePath('/')}
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors flex-shrink-0"
            title={t.reader.home}
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="min-w-0">
            <h1 className="font-heading font-bold text-sm sm:text-base leading-tight truncate text-white">
              {lang === 'fr' ? `Chapitre ${chapter.number}` : lang === 'pt' ? `Capítulo ${chapter.number}` : `Chapter ${chapter.number}`}
              {seo.hasRealTitle && <span className="text-gray-400 font-normal hidden sm:inline">: {seo.title}</span>}
            </h1>
            <p className="text-[11px] text-gray-400 truncate hidden sm:block">
              {pages.length > 0 ? `${pages.length} ${t.reader.page}s` : t.reader.availableSoon}
            </p>
          </div>
        </div>

        {/* Center: Language Switcher in Reader */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
          {langList.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`px-2 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition-all ${
                lang === l.code
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title={`Switch to ${l.label}`}
            >
              <span>{l.flag}</span>
              <span className="uppercase">{l.code}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Chapter Selector Dropdown */}
          <div className="relative">
            <select
              value={chapter.number}
              onChange={(e) => handleNav(parseFloat(e.target.value))}
              className="bg-white/10 border border-white/10 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 pr-7 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {chapters.map((c) => (
                <option key={c.number} value={c.number} className="bg-[#1a1a1a] text-white">
                  {lang === 'fr' ? `Ch. ${c.number}` : lang === 'pt' ? `Cap. ${c.number}` : `Ch. ${c.number}`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-400">
              <ChevronRight size={14} className="rotate-90" />
            </div>
          </div>

          {/* Reading Mode Switcher */}
          <button
            onClick={() => setReadingMode(m => (m === 'webtoon' ? 'single' : 'webtoon'))}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold transition-colors"
            title="Toggle Webtoon Scroll / Single Page"
          >
            {readingMode === 'webtoon' ? (
              <>
                <ArrowDown size={14} className="text-blue-400" />
                <span>{t.reader.verticalScroll}</span>
              </>
            ) : (
              <>
                <BookOpen size={14} className="text-blue-400" />
                <span>{t.reader.horizontalSlide}</span>
              </>
            )}
          </button>

          {/* Prev/Next buttons */}
          <button
            disabled={!prevChapter}
            onClick={() => prevChapter && handleNav(prevChapter.number)}
            className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-gray-300 hover:text-white transition-colors"
            title={t.reader.prev}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            disabled={!nextChapter}
            onClick={() => nextChapter && handleNav(nextChapter.number)}
            className="p-1.5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-gray-300 hover:text-white transition-colors"
            title={t.reader.next}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Read progress bar across top */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-150"
          style={{ width: `${readingMode === 'single' && pages.length > 0 ? Math.round(((currentPageIndex + 1) / pages.length) * 100) : readProgress}%` }}
        />
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-5 z-50 w-11 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          title="Back to top"
        >
          <ChevronUp size={22} strokeWidth={2.5} />
        </button>
      )}

      {/* Reader Content */}
      <div className="flex-1 pt-16">
        <h1 className="sr-only">Blue Lock Chapter {chapter.number}{seo.hasRealTitle ? `: ${seo.title}` : ''}</h1>
        {pages.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <Breadcrumbs items={[
              { label: t.nav.home, path: '/' },
              { label: t.nav.allChapters, path: '/manga' },
              { label: `${t.reader.chapter} ${chapter.number}` }
            ]} />
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10 rounded-md">
                {seo.arcName}
              </span>
            </div>
          </div>
        )}

        {pages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
            <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-white/10 max-w-md w-full shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t.reader.availableSoon}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                {t.reader.nextChapterSoon}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate(localizePath('/manga'))}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                >
                  {t.reader.backToChapters}
                </button>
              </div>
            </div>
          </div>
        ) : readingMode === 'single' ? (
          /* Single Page Reader Mode */
          <div className="max-w-4xl mx-auto px-2 py-4">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2">
              <span>{t.reader.page} {currentPageIndex + 1} / {pages.length}</span>
              <div className="flex gap-2">
                <button
                  disabled={currentPageIndex === 0}
                  onClick={() => setCurrentPageIndex(p => Math.max(0, p - 1))}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 disabled:opacity-30 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  {t.reader.prevPage}
                </button>
                <button
                  disabled={currentPageIndex === pages.length - 1}
                  onClick={() => setCurrentPageIndex(p => Math.min(pages.length - 1, p + 1))}
                  className="px-3 py-1 bg-blue-600 text-white disabled:opacity-30 rounded hover:bg-blue-700"
                >
                  {t.reader.nextPage}
                </button>
              </div>
            </div>

            <div className="relative bg-white dark:bg-black shadow-2xl rounded overflow-hidden min-h-[500px] flex items-center justify-center">
              {failedPages[currentPageIndex] ? (
                <div className="p-8 text-center flex flex-col items-center">
                  <p className="text-red-500 font-semibold mb-3">{t.reader.errorLoading}</p>
                  <button
                    onClick={() => handleRetryPage(currentPageIndex)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md"
                  >
                    <RefreshCw size={14} /> Retry
                  </button>
                </div>
              ) : (
                <img
                  key={`single-${currentPageIndex}-${retryKeys[currentPageIndex] || 0}`}
                  src={pages[currentPageIndex]}
                  alt={`Blue Lock Chapter ${chapter.number} Page ${currentPageIndex + 1}`}
                  className="w-full h-auto block cursor-pointer"
                  onClick={() => {
                    if (currentPageIndex < pages.length - 1) setCurrentPageIndex(p => p + 1);
                    else if (nextChapter) handleNav(nextChapter.number);
                  }}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Gracefully hide if past end of chapter or flag failure
                    if (currentPageIndex >= 15 && (e.currentTarget.naturalWidth === 0)) {
                      e.currentTarget.style.display = 'none';
                    } else {
                      setFailedPages(prev => ({ ...prev, [currentPageIndex]: true }));
                    }
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          /* Webtoon Continuous Scroll Mode */
          <div className="max-w-4xl mx-auto bg-white dark:bg-black shadow-2xl min-h-screen">
            {pages.map((pageUrl, idx) => (
              <div key={idx} className="relative min-h-[200px] bg-gray-100 dark:bg-[#0a0a0a]">
                {failedPages[idx] ? (
                  <div className="h-48 flex flex-col items-center justify-center p-6 border-b border-gray-200 dark:border-white/5 text-center">
                    <p className="text-red-500 text-xs font-bold mb-3">{t.reader.page} {idx + 1} {t.reader.errorLoading}</p>
                    <button
                      onClick={() => handleRetryPage(idx)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded"
                    >
                      <RefreshCw size={13} /> Retry Page {idx + 1}
                    </button>
                  </div>
                ) : (
                  <img
                    key={`scroll-${idx}-${retryKeys[idx] || 0}`}
                    src={pageUrl}
                    alt={`Blue Lock Chapter ${chapter.number} Page ${idx + 1}`}
                    className="w-full h-auto block"
                    loading={idx < 3 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // If trailing page returned 404, cleanly hide it without showing error box
                      if (idx >= 15) {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) parent.style.display = 'none';
                      } else {
                        setFailedPages(prev => ({ ...prev, [idx]: true }));
                      }
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Surrounding Chapters Quick Navigation Mesh */}
      <div className="bg-[#151515] border-t border-white/5 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Layers size={14} className="text-blue-500" />
            {lang === 'fr' ? 'Chapitres proches :' : lang === 'pt' ? 'Capítulos Próximos:' : 'Browse Nearby Chapters:'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {surroundingChapters.map(c => (
              <Link
                key={c.number}
                to={localizePath(`/chapter/${c.number}`)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  c.number === currentNum ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {lang === 'fr' ? `Ch. ${c.number}` : lang === 'pt' ? `Cap. ${c.number}` : `Ch. ${c.number}`}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter Programmatic SEO Breakdown */}
      <div className="bg-white dark:bg-[#181818] border-t border-b border-gray-200 dark:border-white/5 py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">
              <span>{seo.arcName}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {lang === 'fr'
                ? `Que se passe-t-il dans Blue Lock Chapitre ${chapter.number}`
                : lang === 'pt'
                ? `O que acontece em Blue Lock Capítulo ${chapter.number}`
                : `What Happens in Blue Lock Chapter ${chapter.number}`}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
              {seo.summary}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <strong>Context:</strong> {seo.arcDescription} <Link to={localizePath(`/arcs/${seo.arcSlug}`)} className="text-blue-400 hover:underline">Read the {seo.arcName} guide</Link>.
            </p>
          </div>

          {/* Internal Linking Mesh: Key Characters Featured in this Arc */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
              <Users size={16} className="text-blue-500" />
              {t.home.charactersPreviewTitle}:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {seo.featuredCharacters.map(char => (
                <Link
                  key={char.slug}
                  to={localizePath(`/characters/${char.slug}`)}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-blue-500/40 hover:bg-blue-600/5 transition-all group"
                >
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white text-sm block group-hover:text-blue-400 transition-colors">
                      {char.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{char.role}</span>
                  </div>
                  <ArrowRight size={14} className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white dark:bg-[#121212] relative z-10 block">
        <div className="max-w-4xl mx-auto py-16 px-4 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 text-gray-400 dark:text-gray-600">
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-800"></div>
            <span className="uppercase tracking-[0.2em] text-xs font-bold">
              {t.reader.endOfChapter} {chapter.number}
            </span>
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
            {prevChapter ? (
              <Link
                to={localizePath(`/chapter/${prevChapter.number}`)}
                className="group rounded-xl bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-white/5 p-5 text-left hover:border-blue-500/50 transition-all hover:shadow-lg"
              >
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{t.reader.prev}</span>
                <span className="font-bold text-gray-900 dark:text-white text-base group-hover:text-blue-500 transition-colors">
                  {lang === 'fr' ? `Chapitre ${prevChapter.number}` : lang === 'pt' ? `Capítulo ${prevChapter.number}` : `Chapter ${prevChapter.number}`}
                </span>
              </Link>
            ) : <div />}

            {nextChapter ? (
              <Link
                to={localizePath(`/chapter/${nextChapter.number}`)}
                className="group rounded-xl bg-blue-600/10 dark:bg-blue-900/20 border border-blue-500/30 p-5 text-right hover:border-blue-500 transition-all hover:shadow-lg"
              >
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-1">{t.reader.readNext}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-base group-hover:underline">
                  {lang === 'fr' ? `Chapitre ${nextChapter.number}` : lang === 'pt' ? `Capítulo ${nextChapter.number}` : `Chapter ${nextChapter.number}`}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterReader;
