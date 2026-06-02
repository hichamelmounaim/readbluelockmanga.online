import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, ArrowRight, Grid, List, Check } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useManga } from '../context/MangaContext';

const STORAGE_KEY = 'bluelock_read_chapters';

const MangaList: React.FC = () => {
  const { chapters } = useManga();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => (localStorage.getItem('manga_view_mode') as 'grid' | 'list') || 'grid');
  const [readChapters, setReadChapters] = useState<Set<number>>(new Set());

  useEffect(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setReadChapters(new Set(JSON.parse(saved))); } catch {}
  }, []);

  const toggleRead = (e: React.MouseEvent, num: number) => {
    e.preventDefault(); e.stopPropagation();
    setReadChapters(prev => { const next = new Set(prev); if (next.has(num)) next.delete(num); else next.add(num); localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); return next; });
  };

  const handleViewMode = (mode: 'grid' | 'list') => { setViewMode(mode); localStorage.setItem('manga_view_mode', mode); };

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
        title="Blue Lock Manga Library - All Chapters"
        description="Browse the complete collection of Blue Lock manga chapters. Read online in high quality."
        canonicalUrl="https://readbluelockmanga.online/manga"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: 'Manga List', path: '/manga' }]} />
      </div>

      {/* Hero Header */}
      <div className="relative bg-[#111] border-b border-white/5 py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-bb-blue/5 blur-3xl rounded-full scale-150 opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-bb-blue font-bold tracking-widest uppercase text-xs mb-3 block">Complete Collection</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            BLUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">LOCK MANGA Library</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Read every chapter of the Blue Lock Manga by Muneyuki Kaneshiro & Yusuke Nomura. From the very beginning to the latest release.
          </p>
        </div>
      </div>

      {/* Synopsis & Metadata Band */}
      <div className="bg-white dark:bg-[#0f0f0f] border-b border-gray-100 dark:border-white/5 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {['Action', 'Sports', 'Soccer', 'Shounen', 'Competition'].map(g => (
              <span key={g} className="px-3 py-1 rounded-full text-xs font-bold bg-bb-blue/10 text-bb-blue border border-bb-blue/20">{g}</span>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            Japan's national football team is struggling. To forge the world's best striker, 300 elite high school players are gathered in an isolated facility called Blue Lock. Only the most egoist striker — the one who can prioritise himself above all else — will earn the right to lead Japan. Yoichi Isagi aims to become that player.
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-gray-500 dark:text-gray-500">
            <span><strong className="text-gray-700 dark:text-gray-300">Author:</strong> Muneyuki Kaneshiro</span>
            <span><strong className="text-gray-700 dark:text-gray-300">Artist:</strong> Yusuke Nomura</span>
            <span><strong className="text-gray-700 dark:text-gray-300">Publisher:</strong> Kodansha / Weekly Shōnen Magazine</span>
            <span><strong className="text-gray-700 dark:text-gray-300">Status:</strong> Ongoing</span>
            <span><strong className="text-gray-700 dark:text-gray-300">Started:</strong> August 2018</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-8 relative z-20">

        {/* Controls Bar */}
        <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-xl shadow-xl shadow-black/10 border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 mb-10 backdrop-blur-md">

          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium px-2">
            <BookOpen size={20} className="text-bb-blue" />
            <span>{filteredChapters.length} Chapters</span>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                placeholder="Search by Title or Number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-black/30 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bb-blue/50 transition-all font-medium"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>

            <button onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:text-white transition-colors font-medium min-w-[110px] justify-center">
              <Filter size={16} />{sortOrder === 'desc' ? 'Newest' : 'Oldest'}
            </button>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-lg border border-gray-200 dark:border-white/10">
              <button onClick={() => handleViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-bb-blue text-bb-blue dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-700 dark:hover:text-white'}`} title="Grid view"><Grid size={16} /></button>
              <button onClick={() => handleViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-bb-blue text-bb-blue dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-700 dark:hover:text-white'}`} title="List view"><List size={16} /></button>
            </div>
          </div>
        </div>
        {readChapters.size > 0 && (
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-green-500 transition-all duration-500 rounded-full" style={{ width: `${Math.round((readChapters.size / chapters.length) * 100)}%` }} /></div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">{readChapters.size} / {chapters.length} read</span>
            <button onClick={() => { setReadChapters(new Set()); localStorage.removeItem(STORAGE_KEY); }} className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium">Reset</button>
          </div>
        )}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredChapters.map((chapter) => { const isRead = readChapters.has(chapter.number); return (
              <Link key={chapter.id} to={`/chapter/${chapter.number}`} className={`group relative flex flex-col justify-between h-32 bg-white dark:bg-[#1a1a1a] rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${isRead ? 'border-green-500/30 dark:border-green-500/20' : 'border-gray-100 dark:border-white/5 hover:border-bb-blue/50'}`}>
                {isRead && <div className="absolute inset-0 bg-green-500/3 pointer-events-none" />}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-bb-blue/0 to-bb-blue/5 rounded-bl-full -mr-4 -mt-4 group-hover:scale-150 transition-all"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold uppercase tracking-widest ${isRead ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}`}>Chapter {chapter.number}</span>
                    <span className="text-[10px] font-mono text-gray-300 dark:text-gray-600 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded">{new Date(chapter.releaseDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <h3 className={`text-base font-bold transition-colors line-clamp-1 pr-4 group-hover:text-bb-blue ${isRead ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>{chapter.title}</h3>
                </div>
                <div className="relative z-10 flex items-center justify-between mt-auto pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-bb-blue transition-colors">
                    {isRead ? <><Check size={12} className="text-green-500" /><span className="text-green-500">Read</span></> : <><span>Read Now</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-bb-blue" /></>}
                  </div>
                  <button onClick={(e) => toggleRead(e, chapter.number)} className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border ${isRead ? 'bg-green-500 border-green-500 text-white hover:bg-red-500 hover:border-red-500' : 'border-gray-300 dark:border-white/20 text-gray-400 hover:border-green-500 hover:text-green-500'}`} title={isRead ? 'Mark as unread' : 'Mark as read'}><Check size={12} strokeWidth={3} /></button>
                </div>
              </Link>
            ); })}
            {filteredChapters.length === 0 && <div className="col-span-full py-20 text-center"><div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4"><Search size={32} className="text-gray-400" /></div><h3 className="text-xl font-bold dark:text-white mb-2">No chapters found</h3><p className="text-gray-500">Try adjusting your search criteria</p></div>}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-white/5 rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a1a1a]">
            {filteredChapters.map((chapter) => { const isRead = readChapters.has(chapter.number); return (
              <div key={chapter.id} className={`flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group ${isRead ? 'opacity-70' : ''}`}>
                <span className={`text-sm font-bold w-16 flex-shrink-0 ${isRead ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}`}>Ch. {chapter.number}</span>
                <Link to={`/chapter/${chapter.number}`} className="flex-1 font-semibold text-sm text-gray-900 dark:text-white group-hover:text-bb-blue transition-colors truncate">{chapter.title}</Link>
                <span className="text-xs text-gray-400 dark:text-gray-600 font-mono flex-shrink-0 hidden sm:block">{new Date(chapter.releaseDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })}</span>
                <button onClick={(e) => toggleRead(e, chapter.number)} className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all border ${isRead ? 'bg-green-500 border-green-500 text-white hover:bg-red-500 hover:border-red-500' : 'border-gray-300 dark:border-white/20 text-gray-400 hover:border-green-500 hover:text-green-500'}`} title={isRead ? 'Mark as unread' : 'Mark as read'}><Check size={12} strokeWidth={3} /></button>
                <Link to={`/chapter/${chapter.number}`} className="flex-shrink-0 text-xs font-bold text-bb-blue hover:underline hidden md:block">Read →</Link>
              </div>
            ); })}
            {filteredChapters.length === 0 && <div className="py-16 text-center text-gray-500">No chapters found</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MangaList;