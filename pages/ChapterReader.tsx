import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Share2, ArrowDown, ArrowRight, Send, BookOpen, ChevronUp, RefreshCw, LayoutList, FileText, Layers, Users, HelpCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useManga } from '../context/MangaContext';
import { Chapter } from '../types';
import { getChapterSEOData, getAdjacentChapters, realChapterTitle, DEFAULT_OG_IMAGE, SITE_URL } from '../utils/seo';


const ChapterReader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { chapters, getChapterWithPages } = useManga();
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
  }, [currentNum]);

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

  // Prev/next by position in the list, so decimal chapters (314.1, 364.2 ...) are never skipped.
  const { prev: prevChapter, next: nextChapter, nearby: surroundingChapters } = useMemo(
    () => getAdjacentChapters(chapters, currentNum),
    [chapters, currentNum]
  );

  const prevChapterRef = useRef<Chapter | undefined>(prevChapter);
  const nextChapterRef = useRef<Chapter | undefined>(nextChapter);
  prevChapterRef.current = prevChapter;
  nextChapterRef.current = nextChapter;

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (readingMode === 'single' && chapter && chapter.pages && chapter.pages.length > 0) {
        if (e.key === 'ArrowRight') {
          if (currentPageIndex < chapter.pages.length - 1) {
            setCurrentPageIndex(p => p + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (nextChapterRef.current) {
            navigate(`/chapter/${nextChapterRef.current.number}`);
          }
        }
        if (e.key === 'ArrowLeft') {
          if (currentPageIndex > 0) {
            setCurrentPageIndex(p => p - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (prevChapterRef.current) {
            navigate(`/chapter/${prevChapterRef.current.number}`);
          }
        }
      } else {
        if (e.key === 'ArrowRight' && nextChapterRef.current) navigate(`/chapter/${nextChapterRef.current.number}`);
        if (e.key === 'ArrowLeft' && prevChapterRef.current) navigate(`/chapter/${prevChapterRef.current.number}`);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, readingMode, chapter, currentPageIndex]);

  const handleNav = useCallback((num: number) => {
    if (num) navigate(`/chapter/${num}`);
  }, [navigate]);

  useEffect(() => {
    const BASE = SITE_URL;
    document.querySelector('link[rel="prev"]')?.remove();
    document.querySelector('link[rel="next"]')?.remove();
    if (prevChapter) { const el = document.createElement('link'); el.rel = 'prev'; el.href = `${BASE}/chapter/${prevChapter.number}`; document.head.appendChild(el); }
    if (nextChapter) { const el = document.createElement('link'); el.rel = 'next'; el.href = `${BASE}/chapter/${nextChapter.number}`; document.head.appendChild(el); }
    return () => { document.querySelector('link[rel="prev"]')?.remove(); document.querySelector('link[rel="next"]')?.remove(); };
  }, [prevChapter, nextChapter]);

  const handleRetryPage = (idx: number) => {
    setFailedPages(prev => ({ ...prev, [idx]: false }));
    setRetryKeys(prev => ({ ...prev, [idx]: (prev[idx] || 0) + 1 }));
  };

  // Programmatic SEO computation
  const seo = useMemo(() => {
    return getChapterSEOData(currentNum, { title: chapter?.title, pageCount: chapter?.pages?.length });
  }, [currentNum, chapter?.title, chapter?.pages?.length]);


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#121212]">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading Chapter {currentNum}...</p>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center bg-gray-50 dark:bg-[#121212]">
        <SEOHead title="Chapter Not Found – Blue Lock Manga" description="This Blue Lock chapter is not available." noindex />
        <h1 className="text-2xl font-bold dark:text-white mb-2">Chapter not found</h1>
        <p className="text-gray-500 mb-6">Chapter {currentNum} is not available yet.</p>
        <Link to="/manga" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold">
          View All Chapters
        </Link>
      </div>
    );
  }

  const pages = chapter.pages || [];

  return (
    <div className="bg-gray-100 dark:bg-[#121212] min-h-screen flex flex-col">
      <SEOHead
        title={seo.seoTitle}
        description={seo.seoDescription}
        canonicalUrl={seo.canonicalUrl}
        ogType="article"
        ogImage={DEFAULT_OG_IMAGE}
        schemas={seo.schemas}
        noindex={seo.noindex}
      />

      {/* Sticky Top Controls */}
      <div className={`fixed top-0 left-0 right-0 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md shadow-md transition-transform duration-300 z-50 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
          <div className="h-full bg-blue-600 transition-all duration-150 ease-out" style={{ width: `${readProgress}%` }} />
        </div>
        <div className="max-w-7xl mx-auto px-3 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Link to="/manga" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex-shrink-0" title="Back to chapter list">
              <ChevronLeft size={20} className="dark:text-white" />
            </Link>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider leading-none mb-0.5">Blue Lock</span>
              <select
                value={chapter.number}
                onChange={e => navigate(`/chapter/${e.target.value}`)}
                className="font-bold text-sm dark:text-white bg-transparent focus:outline-none cursor-pointer truncate max-w-[160px] md:max-w-[280px] dark:bg-[#181818]"
                title="Jump to chapter"
              >
                {[...chapters].sort((a, b) => b.number - a.number).map(ch => (
                  <option key={ch.number} value={ch.number} className="dark:bg-[#181818]">
                    Ch. {ch.number}{(() => { const t = realChapterTitle(ch.number, ch.title); return t ? ` — ${t.length > 30 ? t.substring(0, 30) + '…' : t}` : ''; })()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reader Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setReadingMode('webtoon')}
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${readingMode === 'webtoon' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:text-white'}`}
              title="Continuous Scroll Mode"
            >
              <LayoutList size={15} />
              <span className="hidden md:inline">Scroll</span>
            </button>
            <button
              onClick={() => { setReadingMode('single'); setCurrentPageIndex(0); }}
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${readingMode === 'single' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:text-white'}`}
              title="Single Page Mode"
            >
              <FileText size={15} />
              <span className="hidden md:inline">Page</span>
            </button>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {prevChapter && (
              <button
                onClick={() => handleNav(prevChapter.number)}
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md dark:text-white transition-colors text-xs font-bold"
                title="Previous chapter (←)"
              >
                <ChevronLeft size={16} /><span className="hidden sm:block">Prev</span>
              </button>
            )}
            {nextChapter && (
              <button
                onClick={() => handleNav(nextChapter.number)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-xs font-bold"
                title="Next chapter (→)"
              >
                <span className="hidden sm:block">Next</span><ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
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
              { label: 'Home', path: '/' },
              { label: 'All Chapters', path: '/manga' },
              { label: `Chapter ${chapter.number}` }
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Chapter Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                Chapter {chapter.number} scans are being prepared. Check back shortly or join our Telegram for instant release alerts!
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://t.me/Mangalix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold rounded-lg transition-all"
                >
                  <Send size={18} />
                  Join Telegram Channel
                </a>
                <button
                  onClick={() => navigate('/manga')}
                  className="px-6 py-2.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/15 text-gray-900 dark:text-white font-bold rounded-lg transition-all"
                >
                  Back to Chapter List
                </button>
              </div>
            </div>
          </div>
        ) : readingMode === 'single' ? (
          /* Single Page Reader Mode */
          <div className="max-w-4xl mx-auto px-2 py-4">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2">
              <span>Page {currentPageIndex + 1} of {pages.length}</span>
              <div className="flex gap-2">
                <button
                  disabled={currentPageIndex === 0}
                  onClick={() => setCurrentPageIndex(p => Math.max(0, p - 1))}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 disabled:opacity-30 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  Previous Page
                </button>
                <button
                  disabled={currentPageIndex === pages.length - 1}
                  onClick={() => setCurrentPageIndex(p => Math.min(pages.length - 1, p + 1))}
                  className="px-3 py-1 bg-blue-600 text-white disabled:opacity-30 rounded hover:bg-blue-700"
                >
                  Next Page
                </button>
              </div>
            </div>

            <div className="relative bg-white dark:bg-black shadow-2xl rounded overflow-hidden min-h-[500px] flex items-center justify-center">
              {failedPages[currentPageIndex] ? (
                <div className="p-8 text-center flex flex-col items-center">
                  <p className="text-red-500 font-semibold mb-3">Failed to load page image.</p>
                  <button
                    onClick={() => handleRetryPage(currentPageIndex)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md"
                  >
                    <RefreshCw size={14} /> Retry Page
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
                  onError={() => setFailedPages(prev => ({ ...prev, [currentPageIndex]: true }))}
                />
              )}
            </div>
          </div>
        ) : (
          /* Webtoon Continuous Scroll Mode */
          <div className="max-w-4xl mx-auto bg-white dark:bg-black shadow-2xl min-h-screen">
            {pages.map((pageUrl, idx) => (
              <div key={idx} className="relative min-h-[250px] bg-gray-100 dark:bg-[#0a0a0a]">
                {failedPages[idx] ? (
                  <div className="h-64 flex flex-col items-center justify-center p-6 border-b border-gray-200 dark:border-white/5 text-center">
                    <p className="text-red-500 text-xs font-bold mb-3">Page {idx + 1} failed to load.</p>
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
                    onError={() => setFailedPages(prev => ({ ...prev, [idx]: true }))}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Surrounding Chapters Quick Navigation Mesh for Crawlers & Users */}
      <div className="bg-[#151515] border-t border-white/5 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Layers size={14} className="text-blue-500" />
            Browse Nearby Chapters:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {surroundingChapters.map(c => (
              <Link
                key={c.number}
                to={`/chapter/${c.number}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${c.number === currentNum ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
              >
                Ch. {c.number}
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
              {seo.hasUniqueSummary ? `What Happens in Blue Lock Chapter ${chapter.number}` : `Blue Lock Chapter ${chapter.number}: Story Context`}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
              {seo.summary}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <strong>Arc Context:</strong> {seo.arcDescription} <Link to={`/arcs/${seo.arcSlug}`} className="text-blue-400 hover:underline">Read the {seo.arcName} guide</Link>.
            </p>
          </div>

          {/* Internal Linking Mesh: Key Characters Featured in this Arc */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
              <Users size={16} className="text-blue-500" />
              Key Strikers Featured in this Arc:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {seo.featuredCharacters.map(char => (
                <Link
                  key={char.slug}
                  to={`/characters/${char.slug}`}
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
            <span className="uppercase tracking-[0.2em] text-xs font-bold">End of Chapter {chapter.number}</span>
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
            {prevChapter ? (
              <Link
                to={`/chapter/${prevChapter.number}`}
                className="group rounded-xl bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-white/5 p-5 text-left hover:border-blue-500/50 transition-all hover:shadow-lg"
              >
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Previous</span>
                <span className="font-bold text-gray-900 dark:text-white text-base group-hover:text-blue-500 transition-colors">
                  Chapter {prevChapter.number}
                </span>
              </Link>
            ) : <div />}

            {nextChapter ? (
              <Link
                to={`/chapter/${nextChapter.number}`}
                className="group rounded-xl bg-blue-600/10 dark:bg-blue-900/20 border border-blue-500/30 p-5 text-right hover:border-blue-500 transition-all hover:shadow-lg"
              >
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-1">Next Chapter</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-base group-hover:underline">
                  Chapter {nextChapter.number}
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
