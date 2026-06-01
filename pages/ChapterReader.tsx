import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Share2, ArrowDown, ArrowRight, Send, BookOpen, ChevronUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useManga } from '../context/MangaContext';
import { Chapter } from '../types';

const SISTER_SITES = [
  { name: 'Dandadan Manga', url: 'https://readdandadanmanga.online/', desc: 'Aliens, ghosts, and supernatural chaos by Tatsu Yukinobu.' },
  { name: 'Kagurabachi Manga', url: 'https://kagurabachimanga.online/', desc: 'Chihiro hunts sorcerers with enchanted blades in this Shonen Jump hit.' },
  { name: 'Gachiakuta Manga', url: 'https://readgachiakutamanga.online/', desc: 'Rudo fights to survive in the Pit with trash-powered abilities.' },
  { name: 'Nano Machine Manga', url: 'https://nanomachinemanga.online/', desc: 'Cheon Yeo-Woon rises through the Demonic Cult with a nano machine.' },
  { name: 'Kingdom Manga', url: 'https://readkingdommanga.online/', desc: 'Xin and Zheng unify ancient China across 876+ epic chapters.' },
];

const ChapterReader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { chapters } = useManga();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentNum = parseInt(chapterId || "0", 10);

  useEffect(() => {
    if (currentNum > 0) {
      localStorage.setItem('bluelock_last_chapter', String(currentNum));
    }
  }, [currentNum]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const found = chapters.find(c => c.number === currentNum);
      if (found) {
        setChapter(found);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    }, 500);
  }, [currentNum, chapters]);

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

  const prevChapterRef = useRef<Chapter | undefined>(undefined);
  const nextChapterRef = useRef<Chapter | undefined>(undefined);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' && nextChapterRef.current) navigate(`/chapter/${nextChapterRef.current.number}`);
      if (e.key === 'ArrowLeft' && prevChapterRef.current) navigate(`/chapter/${prevChapterRef.current.number}`);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);



  const prevChapter = chapters.find(c => c.number === currentNum - 1);
  const nextChapter = chapters.find(c => c.number === currentNum + 1);
  prevChapterRef.current = prevChapter;
  nextChapterRef.current = nextChapter;

  const handleNav = useCallback((num: number) => {
    if (num) navigate(`/chapter/${num}`);
  }, [navigate]);

  useEffect(() => {
    const BASE = window.location.origin;
    document.querySelector('link[rel="prev"]')?.remove();
    document.querySelector('link[rel="next"]')?.remove();
    if (prevChapter) { const el = document.createElement('link'); el.rel = 'prev'; el.href = `${BASE}/chapter/${prevChapter.number}`; document.head.appendChild(el); }
    if (nextChapter) { const el = document.createElement('link'); el.rel = 'next'; el.href = `${BASE}/chapter/${nextChapter.number}`; document.head.appendChild(el); }
    return () => { document.querySelector('link[rel="prev"]')?.remove(); document.querySelector('link[rel="next"]')?.remove(); };
  }, [prevChapter, nextChapter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-bb-dark">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-bb-blue"></div>
      </div>
    );
  }

  if (!chapter) {
    return <div className="p-10 text-center dark:text-white">Chapter not found.</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-[#121212] min-h-screen flex flex-col">
      <SEOHead
        title={`Blue Lock Chapter ${chapter.number} – ${chapter.title} | Read Online Free`}
        description={`Read Blue Lock Chapter ${chapter.number} – ${chapter.title} for free in English. HD scans, no sign-up required. Read previous and next chapters at readbluelockmanga.online.`}
        canonicalUrl={`https://readbluelockmanga.online/chapter/${chapter.number}`}
        ogType="article"
        ogImage={chapter.pages[0] || 'https://readbluelockmanga.online/blue-lock.webp'}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `Blue Lock Chapter ${chapter.number}: ${chapter.title}`,
          "image": chapter.pages[0] || 'https://readbluelockmanga.online/blue-lock.webp',
          "datePublished": chapter.releaseDate,
          "author": { "@type": "Person", "name": "Muneyuki Kaneshiro" },
          "publisher": { "@type": "Organization", "name": "Blue Lock Manga", "logo": { "@type": "ImageObject", "url": "https://readbluelockmanga.online/logo.png" } },
          "isPartOf": { "@type": "ComicSeries", "name": "Blue Lock", "author": { "@type": "Person", "name": "Muneyuki Kaneshiro" } },
          "url": `https://readbluelockmanga.online/chapter/${chapter.number}`
        }}
        schemas={[
          { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://readbluelockmanga.online/" },
            { "@type": "ListItem", "position": 2, "name": "Blue Lock Manga", "item": "https://readbluelockmanga.online/manga" },
            { "@type": "ListItem", "position": 3, "name": `Chapter ${chapter.number}`, "item": `https://readbluelockmanga.online/chapter/${chapter.number}` }
          ]}
        ]}
      />



      {/* Sticky Top Controls */}
      <div className={`fixed top-0 left-0 right-0 bg-white/98 dark:bg-gray-900/98 backdrop-blur shadow-md transition-transform duration-300 z-50 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-800">
          <div className="h-full bg-bb-blue transition-all duration-150 ease-out" style={{ width: `${readProgress}%` }} />
        </div>
        <div className="max-w-7xl mx-auto px-3 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Link to="/manga" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0" title="Back to chapter list"><ChevronLeft size={20} className="dark:text-white" /></Link>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-bb-blue font-bold uppercase tracking-wider leading-none mb-0.5">Blue Lock</span>
              <select value={chapter.number} onChange={e => navigate(`/chapter/${e.target.value}`)} className="font-bold text-sm dark:text-white bg-transparent focus:outline-none cursor-pointer truncate max-w-[160px] md:max-w-[280px] dark:bg-gray-900" title="Jump to chapter">
                {[...chapters].sort((a, b) => b.number - a.number).map(ch => (<option key={ch.number} value={ch.number} className="dark:bg-gray-900">Ch. {ch.number}{ch.title && ch.title !== `Chapter ${ch.number}` ? ` — ${ch.title.length > 30 ? ch.title.substring(0, 30) + '…' : ch.title}` : ''}</option>))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-mono text-gray-400 dark:text-gray-500 hidden md:block">{readProgress}%</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button disabled={!prevChapter} onClick={() => prevChapter && handleNav(prevChapter.number)} className="flex items-center gap-1 px-2 py-1.5 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md dark:text-white transition-colors text-xs font-bold" title="Previous chapter (←)"><ChevronLeft size={16} /><span className="hidden sm:block">Prev</span></button>
            <button disabled={!nextChapter} onClick={() => nextChapter && handleNav(nextChapter.number)} className="flex items-center gap-1 px-2 py-1.5 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md dark:text-white transition-colors text-xs font-bold" title="Next chapter (→)"><span className="hidden sm:block">Next</span><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {showScrollTop && (<button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-5 z-50 w-10 h-10 bg-bb-blue hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110" title="Back to top"><ChevronUp size={20} strokeWidth={3} /></button>)}

      {/* Reader Content */}
      <div className="flex-1 pt-16">
        <h1 className="sr-only">Read Blue Lock Chapter {chapter.number}: {chapter.title}</h1>
        {chapter.pages.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Breadcrumbs items={[
              { label: 'Home', path: '/' },
              { label: 'Blue Lock', path: '/manga' },
              { label: `Chapter ${chapter.number}`, path: `/chapter/${chapter.number}` }
            ]} />
          </div>
        )}
        {chapter.pages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-gray-50 dark:bg-bb-dark">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm max-w-md w-full">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">Available Soon...</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Next chapter will be available first on our Telegram channel.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://t.me/Mangalix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold rounded-lg transition-all"
                >
                  <Send size={20} />
                  Join Telegram
                </a>
                <button
                  onClick={() => navigate('/manga')}
                  className="px-6 py-3 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold rounded-lg transition-all"
                >
                  Back to Chapter List
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Vertical Layout
          <div className="max-w-4xl mx-auto bg-white dark:bg-black shadow-2xl min-h-screen">
            {chapter.pages.map((pageUrl, idx) => (
              <img
                key={idx}
                src={pageUrl}
                alt={`Blue Lock Chapter ${chapter.number} Page ${idx + 1}`}
                className="w-full h-auto block"
                loading={idx < 2 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ))}
          </div>
        )}

      </div>

      {/* Navigation Footer (Visible in all modes, pushed to bottom) */}
      <div className="bg-white dark:bg-[#121212] relative z-10 block">
        <div className="max-w-4xl mx-auto py-20 px-4 flex flex-col items-center gap-10">
          <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-800"></div>
            <span className="uppercase tracking-[0.2em] text-xs font-bold">End of Chapter {chapter.number}</span>
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl">
            {prevChapter ? (
              <button
                onClick={() => handleNav(prevChapter.number)}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 p-6 text-left hover:border-gray-300 dark:hover:border-white/20 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Previous</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-bb-blue transition-colors">Chapter {prevChapter.number}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-bb-blue group-hover:text-white transition-all">
                    <ChevronLeft size={20} />
                  </div>
                </div>
              </button>
            ) : <div />}

            {nextChapter ? (
              <button
                onClick={() => handleNav(nextChapter.number)}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 p-6 text-right hover:border-bb-blue/50 dark:hover:border-bb-blue/50 transition-all hover:shadow-xl hover:shadow-bb-blue/10 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bb-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-center justify-between flex-row-reverse">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Next</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-bb-blue transition-colors">Chapter {nextChapter.number}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-bb-blue/10 text-bb-blue flex items-center justify-center group-hover:bg-bb-blue group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </button>
            ) : (
              <button disabled className="rounded-2xl bg-gray-100 dark:bg-white/5 border border-transparent p-6 text-center cursor-not-allowed opacity-50">
                <span className="font-bold text-gray-500">Latest Chapter</span>
              </button>
            )}
          </div>
        </div>

        {/* More Manga from Our Network */}
        <div className="max-w-4xl mx-auto mt-12 px-4 pb-20">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen size={18} className="text-bb-blue" />
                More Manga to Read
              </h3>
              <button
                onClick={() => navigator.share?.({ title: `Blue Lock Chapter ${chapter.number}`, url: window.location.href })}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/5"
              >
                <Share2 size={16} /> Share Chapter
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SISTER_SITES.map(site => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-bb-blue/40 hover:bg-bb-blue/5 transition-all"
                >
                  <span className="font-bold text-white group-hover:text-bb-blue transition-colors text-sm">{site.name}</span>
                  <span className="text-xs text-gray-500 leading-relaxed">{site.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Footer (Visible in all modes, pushed to bottom) */}
      <div className="bg-black py-12 px-4 border-t border-white/10 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-bb-blue font-bold uppercase tracking-widest mb-4 text-xs">Blue Lock Manga</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            You are currently reading <strong className="text-gray-400">Blue Lock Chapter {chapter.number}</strong> online in high quality. 
            Enjoy the latest installment of Muneyuki Kaneshiro & Yusuke Nomura's hit masterpiece, and follow the journey to become the world's greatest striker.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChapterReader;