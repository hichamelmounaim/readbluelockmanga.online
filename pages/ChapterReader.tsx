import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageSquare, Share2, AlignJustify, Columns, ArrowDown, ArrowRight, Send } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useManga } from '../context/MangaContext';
import { MOCK_COMMENTS } from '../constants';
import { Chapter } from '../types';

const ChapterReader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { chapters } = useManga();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [readingMode, setReadingMode] = useState<'vertical' | 'horizontal'>('vertical');
  
  // Pre-lander state
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [progress, setProgress] = useState(0);

  // Use a number for parsing
  const currentNum = parseInt(chapterId || "0", 10);

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      const found = chapters.find(c => c.number === currentNum);
      if (found) {
        setChapter(found);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    }, 500);
  }, [currentNum, chapters]);

  // Hide controls on scroll down, show on scroll up
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



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


  const prevChapter = chapters.find(c => c.number === currentNum - 1);
  const nextChapter = chapters.find(c => c.number === currentNum + 1);

  const handleNav = (num: number) => {
    if (num) navigate(`/chapter/${num}`);
  }

  return (
    <div className="bg-gray-100 dark:bg-[#121212] min-h-screen flex flex-col">
      <SEOHead
        title={`Blue Lock Manga Chapter ${chapter.number} - Read Online`}
        description={`Read Blue Lock Manga Chapter ${chapter.number}: ${chapter.title} online in high quality free. Official English scans available.`}
        schema={{
          "@context": "https://schema.org",
          "@type": "ComicIssue",
          "headline": `Blue Lock Chapter ${chapter.number}: ${chapter.title}`,
          "image": chapter.pages[0],
          "datePublished": chapter.releaseDate,
          "issueNumber": chapter.number,
          "author": {
            "@type": "Person",
            "name": "Muneyuki Kaneshiro & Yusuke Nomura"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Blue Lock Manga"
          }
        }}
      />



      {/* Sticky Top Controls */}
      <div className={`fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-md transition-transform duration-300 z-50 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/manga" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <ChevronLeft size={24} className="dark:text-white" />
            </Link>
            <div className="flex flex-col">
              <span className="text-xs text-bb-blue font-bold uppercase tracking-wider">Reading</span>
              <span className="font-bold text-sm md:text-base dark:text-white truncate max-w-[150px] md:max-w-md">
                Ch. {chapter.number}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-black/20 p-1 rounded-lg">
            <button
              onClick={() => setReadingMode('vertical')}
              className={`p-2 rounded-md transition-all ${readingMode === 'vertical' ? 'bg-white dark:bg-bb-blue text-bb-blue dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
              title="Vertical Scroll"
            >
              <ArrowDown size={20} />
            </button>
            <button
              onClick={() => setReadingMode('horizontal')}
              className={`p-2 rounded-md transition-all ${readingMode === 'horizontal' ? 'bg-white dark:bg-bb-blue text-bb-blue dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
              title="Horizontal Slide"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={!prevChapter}
              onClick={() => prevChapter && handleNav(prevChapter.number)}
              className="p-2 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md dark:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              disabled={!nextChapter}
              onClick={() => nextChapter && handleNav(nextChapter.number)}
              className="p-2 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md dark:text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div className={`flex-1 pt-16 ${readingMode === 'horizontal' ? 'h-[calc(100vh-64px)] overflow-hidden' : ''}`}>
        <h1 className="sr-only">Read Blue Lock Chapter {chapter.number}: {chapter.title}</h1>
        {readingMode === 'vertical' && chapter.pages.length > 0 && (
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
        ) : readingMode === 'vertical' ? (
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
        ) : (
          // Horizontal Layout
          <div className="h-full w-full flex overflow-x-auto snap-x snap-mandatory bg-black items-center">
            {chapter.pages.map((pageUrl, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-2 relative">
                <img
                  src={pageUrl}
                  alt={`Blue Lock Chapter ${chapter.number} Page ${idx + 1}`}
                  className="max-h-full max-w-full object-contain shadow-2xl"
                  loading={idx < 2 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Also hide the counter for this slide if image fails
                    const parent = target.parentElement;
                    if (parent) parent.style.display = 'none';
                  }}
                />
                <span className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md">
                  {idx + 1} / {chapter.pages.length}
                </span>
              </div>
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

        {/* Modern Engagement Section */}
        <div className="max-w-4xl mx-auto mt-12 px-4 pb-20">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare size={18} className="text-bb-blue" />
                Discussion <span className="text-gray-500 text-sm font-normal">({MOCK_COMMENTS.length})</span>
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/5">
                <Share2 size={16} /> Share Chapter
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* Input Area */}
              <div className="mb-10 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bb-blue to-blue-900 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/5">
                  T
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="What are your thoughts on this chapter?"
                    className="w-full p-4 rounded-xl border border-white/10 bg-black/40 text-gray-200 focus:ring-1 focus:ring-bb-blue focus:border-bb-blue/50 focus:outline-none transition-all placeholder:text-gray-600 min-h-[100px] resize-y"
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button className="px-6 py-2.5 bg-bb-blue hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20 text-sm">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {MOCK_COMMENTS.map((comment) => (
                  <div key={comment.id} className="group">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex flex-shrink-0 items-center justify-center text-gray-300 font-bold text-sm border border-white/5 group-hover:border-bb-blue/30 transition-colors">
                        {comment.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-200 group-hover:text-bb-blue transition-colors">{comment.user}</span>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">{comment.content}</p>

                        <div className="flex items-center gap-4">
                          <button className="text-xs font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-bb-blue"></span>
                            Like ({comment.likes})
                          </button>
                          <button className="text-xs font-medium text-gray-500 hover:text-white transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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