import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, MessageCircle, Bookmark } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useManga } from '../context/MangaContext';
import { ARCS } from '../constants';

const Home: React.FC = () => {
  const { chapters } = useManga();
  const latestChapter = chapters[0];

  return (
    <>
      <SEOHead
        title="Blue Lock Manga - Read Online High Quality"
        description="Read Blue Lock Manga online in high quality. The best place for Blue Lock chapters, character info, and latest updates. All chapters available."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Blue Lock Manga",
          "url": "https://readbluelockmanga.online",
        }}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-bb-dark py-20">
        <div className="absolute inset-0 z-0 opacity-30 select-none pointer-events-none">
          <img
            src="/blue_lock.webp"
            alt=""
            width="1920"
            height="1080"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bb-dark via-bb-dark/60 to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-4 drop-shadow-2xl tracking-tighter text-center">
            BLUE <span className="text-bb-blue">LOCK MANGA</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl text-center mb-10 font-light leading-relaxed">
            Read Blue Lock Manga Online In High Quality, All Chapters and Volumes in English With HD scans and No Sign-Up Required.
          </p>

          {/* Info Card - Dark by default, Light/Dark supported if needed, but keeping Dark for Hero */}
          <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left Column: Stats & Meta */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">

                {/* Rating Block */}
                <div className="col-span-2 sm:col-span-4 flex items-center gap-3 mb-2" aria-label="rated 4.8 out of 5 stars">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4].map(i => <Star key={i} className="fill-yellow-400 text-yellow-400 w-5 h-5" />)}
                    <Star className="fill-yellow-400/30 text-yellow-400 w-5 h-5" />
                  </div>
                  <span className="text-3xl font-bold text-white">4.8</span>
                  <span className="text-sm text-gray-400 mt-1 ml-2">Average 4.8 / 5 out of 45k</span>
                </div>

                {/* Info Fields */}
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Rank</span>
                  <span className="text-white font-medium">1st, 20M views</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Release</span>
                  <span className="text-white font-medium">2018</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Status</span>
                  <span className="text-green-400 font-bold">Ongoing</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Type</span>
                  <span className="text-white font-medium">Sports, Thriller, Psychological</span>
                </div>

                <div className="col-span-2 sm:col-span-4 flex flex-col gap-3 mt-2">
                  <div className="flex flex-wrap gap-2 items-center border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">Author(s):</span>
                    <span className="text-white hover:text-bb-blue cursor-pointer transition-colors">Muneyuki Kaneshiro & Yusuke Nomura</span>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-2">Genre(s):</span>
                    {["Sports","Thriller","Psychological","Shonen","Drama"].map(g => (
                      <span key={g} className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                        {g},
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 items-start border-t border-white/5 pt-3">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Synopsis:</span>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Following a disastrous World Cup, Japan trains 300 strikers in the cage called Blue Lock to produce the ultimate egoist striker.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions/Social Proof */}
              <div className="flex lg:flex-col justify-center items-center gap-8 min-w-[140px]">
                <div className="text-center group w-full">
                  <MessageCircle className="w-8 h-8 text-gray-500 group-hover:text-bb-blue mx-auto mb-2 transition-colors" />
                  <span className="block text-2xl font-bold text-white">256</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Comments</span>
                </div>
                <div className="w-px h-12 bg-white/10 lg:w-16 lg:h-px"></div>
                <button
                  onClick={() => {
                    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                    alert(`Press ${isMac ? 'Cmd' : 'Ctrl'} + D to bookmark this page!`);
                  }}
                  className="text-center group cursor-pointer w-full focus:outline-none"
                  aria-label="Bookmark this page"
                >
                  <Bookmark className="w-8 h-8 text-bb-blue mx-auto mb-2 fill-bb-blue group-hover:scale-110 transition-transform" />
                  <span className="block text-2xl font-bold text-white">1k</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide group-hover:text-bb-blue transition-colors">Bookmark Now</span>
                </button>
              </div>
            </div>
          </div>

          {latestChapter && (
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to={`/chapter/${latestChapter.number}`}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-bb-blue hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
              >
                Read Chapter {latestChapter.number}
              </Link>
              <a
                href="https://www.infinitymanga.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-lg font-bold rounded-lg text-white hover:bg-white hover:text-black transition-all"
              >
                Explore More Manga
              </a>
            </div>
          )}
        </div>
      </section >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Latest Chapters Grid */}
        {/* Latest Chapters Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="text-bb-blue" /> Latest Releases
            </h2>
            <Link to="/manga" className="text-bb-blue hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {chapters.slice(0, 12).map((chapter) => (
              <Link
                key={chapter.id}
                to={`/chapter/${chapter.number}`}
                className="group relative flex flex-col justify-between h-full bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-white/10 p-5 hover:border-bb-blue/50 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-bb-blue/10"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-bb-blue uppercase tracking-wider">
                    Chapter {chapter.number}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-bb-blue transition-colors line-clamp-2">
                    {chapter.title}
                  </h3>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Read Now</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-bb-blue group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">About Blue Lock</h2>
            <div className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none space-y-4">
              <p>
                <strong className="text-gray-900 dark:text-white">Blue Lock</strong> is an acclaimed manga series written/illustrated by <strong className="text-gray-900 dark:text-white">Muneyuki Kaneshiro & Yusuke Nomura</strong>. It has been serialized in <strong className="text-gray-900 dark:text-white">Weekly Shōnen Magazine</strong> since 2018. The story follows <strong className="text-gray-900 dark:text-white">Yoichi Isagi</strong> and other key figures in an epic journey.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Synopsis</h3>
              <p>
                Following a disastrous World Cup, Japan trains 300 strikers in the cage called Blue Lock to produce the ultimate egoist striker.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Key Characters</h3>
              <p>
                The series features memorable characters including <strong className="text-gray-900 dark:text-white">Yoichi Isagi</strong>, <strong className="text-gray-900 dark:text-white">Meguru Bachira</strong>, and <strong className="text-gray-900 dark:text-white">Rensuke Kunigami</strong>.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Why Read Blue Lock?</h3>
              <p>
                <strong className="text-gray-900 dark:text-white">Blue Lock</strong> offers an incredible and unique storyline with high-stakes drama and exceptional artwork. The story builds progressively, keeping readers on the edge of their seats with every chapter.
              </p>
            </div>
          </div>
        </section>

        {/* Major Story Arcs */}
        {/* FAQ Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="text-bb-blue" />
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Why Read Blue Lock Manga on this Site?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Experience <strong>Blue Lock manga</strong> like never before with high-quality scans and regularly updated chapters. Dive into the intense storyline without delays.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Differences between Blue Lock Manga and Anime?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                The <strong>Blue Lock manga</strong> offers intense and detailed art that the anime sometimes simplifies. The aura and ego effects are more visceral in the manga.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Is the Blue Lock Manga Finished?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                No, the <strong>Blue Lock manga</strong> is currently ongoing. New chapters are released in Weekly Shonen Magazine.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Where should I start reading?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                If you are new to the series, start with <Link to="/chapter/1" className="text-bb-blue hover:underline">Chapter 1</Link>. The story builds progressively, so starting from the beginning is highly recommended to fully appreciate the character development and relationships.
              </p>
            </div>
          </div>
        </section>

        {/* Improved SEO Content Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">Read Blue Lock Manga Online Free</h2>
            <div className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none space-y-4">
              <p>
                Welcome to <strong>readbluelockmanga.online</strong>, the premier destination for fans to <strong className="text-bb-blue">Read Blue Lock Manga</strong> online. We provide high-quality scans of the latest chapters as soon as they are released. Join millions of fans worldwide in following the journey of Yoichi Isagi.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What is Blue Lock?</h3>
              <p>
                Following a disastrous World Cup, Japan trains 300 strikers in the cage called Blue Lock to produce the ultimate egoist striker.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why is Blue Lock So Popular?</h3>
              <p>
                Created by <strong className="text-gray-900 dark:text-white">Muneyuki Kaneshiro & Yusuke Nomura</strong>, <em>Blue Lock</em> deconstructs standard tropes, highlighting individual drive and unique storytelling. Combined with exceptional, dynamic art style, it has become a global phenomenon.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;