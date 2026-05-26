import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, ArrowRight, Grid, List } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useManga } from '../context/MangaContext';

const MangaList: React.FC = () => {
  const { chapters } = useManga();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

            <button
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:text-white transition-colors font-medium min-w-[120px] justify-center"
            >
              <Filter size={16} />
              {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
            </button>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredChapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/chapter/${chapter.number}`}
              className="group relative flex flex-col justify-between h-32 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-white/5 p-5 hover:border-bb-blue/50 hover:bg-gray-50 dark:hover:bg-[#222] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-bb-blue/5 overflow-hidden"
            >
              {/* Decor */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-bb-blue/0 to-bb-blue/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-150 group-hover:to-bb-blue/10"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Chapter {chapter.number}</span>
                  <span className="text-[10px] font-mono text-gray-300 dark:text-gray-600 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded">
                    {new Date(chapter.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-bb-blue transition-colors line-clamp-1 pr-4">
                  {chapter.title}
                </h3>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors mt-auto pt-2">
                <span>Read Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-bb-blue" />
              </div>
            </Link>
          ))}

          {filteredChapters.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">No chapters found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaList;