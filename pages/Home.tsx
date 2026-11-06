import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, MessageCircle, Bookmark, ShieldCheck, Zap, Flame, Award, Globe } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { PAGE_META, SITE_URL, homeSchemas } from '../utils/seo';
import { useManga } from '../context/MangaContext';
import { ARCS } from '../constants';
import { HOME_FAQ } from '../data/home-faq.js';

const Home: React.FC = () => {
  const { chapters } = useManga();
  // Placeholder chapters (no pages yet) are not "latest"
  const readableChapters = chapters.filter(c => (c.pageCount ?? 0) > 0);
  const latestChapter = readableChapters[0];
  const [continueChapter, setContinueChapter] = React.useState<number | null>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem('bluelock_last_chapter');
    if (saved) setContinueChapter(parseInt(saved, 10));
  }, []);

  return (
    <>
      <SEOHead
        title={PAGE_META['/'].title}
        description={PAGE_META['/'].description}
        canonicalUrl={`${SITE_URL}/`}
        schemas={homeSchemas()}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#121212] py-20">
        <div className="absolute inset-0 z-0 opacity-25 select-none pointer-events-none">
          <img
            src="/blue-lock.webp"
            alt="Blue Lock Manga - Yoichi Isagi and players competing in the Blue Lock Project"
            width="1920"
            height="1080"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Flame size={14} className="text-blue-500" />
            #1 Sports Thriller Manga Worldwide
          </div>

          <h1 className="text-5xl md:text-8xl font-heading font-extrabold text-white mb-4 drop-shadow-2xl tracking-tighter text-center">
            BLUE <span className="text-blue-500">LOCK MANGA</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl text-center mb-10 font-light leading-relaxed">
            Read Blue Lock manga online: every chapter by Muneyuki Kaneshiro &amp; Yusuke Nomura in HD, from Chapter 1 to the latest weekly release.
          </p>

          {/* Tactical Metadata Card */}
          <div className="w-full bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Stats & Meta Column */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
                <div className="col-span-2 sm:col-span-4 flex items-center gap-3 mb-2" aria-label="rated 4.9 out of 5 stars">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <span className="text-white font-bold text-sm">4.9 / 5</span>
                  <span className="text-gray-400 text-xs">(48,500+ reader reviews)</span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1">Rank</span>
                  <span className="text-white font-bold text-sm flex items-center gap-1">
                    <Award size={14} className="text-yellow-400" /> #1 Sports Manga
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1">Status</span>
                  <span className="text-green-400 font-bold text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Ongoing Weekly
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1">Authors</span>
                  <span className="text-white font-bold text-sm truncate block" title="Muneyuki Kaneshiro & Yusuke Nomura">
                    M. Kaneshiro / Y. Nomura
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1">Magazine</span>
                  <span className="text-white font-bold text-sm truncate block">
                    Weekly Shonen Magazine
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-4 border-t border-white/10 pt-4 mt-2">
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1.5">Synopsis</span>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    Following a heartbreaking elimination at the 2018 FIFA World Cup, Japan's Football Union embarks on a radical gamble: the Blue Lock project. Orchestrated by master tactician Jinpachi Ego, 300 elite high school forwards are imprisoned in a ruthless survival gauntlet. Only one striker will conquer the system and earn the right to lead Japan to world supremacy, while the remaining 299 face the permanent destruction of their international careers.
                  </p>
                </div>
              </div>

              {/* Fast Action Column */}
              <div className="flex flex-col justify-center items-center lg:items-start gap-4 min-w-[240px]">
                {continueChapter ? (
                  <Link
                    to={`/chapter/${continueChapter}`}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                  >
                    <BookOpen size={20} />
                    <span>Resume Ch. {continueChapter}</span>
                  </Link>
                ) : (
                  <Link
                    to="/chapter/1"
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                  >
                    <BookOpen size={20} />
                    <span>Start Reading (Ch. 1)</span>
                  </Link>
                )}

                {latestChapter && (
                  <Link
                    to={`/chapter/${latestChapter.number}`}
                    className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all hover:scale-[1.02]"
                  >
                    <span>Latest: Chapter {latestChapter.number}</span>
                    <ArrowRight size={18} />
                  </Link>
                )}

                <Link
                  to="/characters"
                  className="w-full py-3 px-6 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-semibold rounded-xl flex items-center justify-center gap-2 border border-white/5 transition-all text-xs"
                >
                  <Users size={16} />
                  <span>Explore Character Database</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Latest Chapters Grid */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 text-blue-500 rounded-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                  Latest Chapter Releases
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Updated automatically with verified English scans
                </p>
              </div>
            </div>
            <Link to="/manga" className="text-blue-500 hover:underline text-sm font-bold flex items-center gap-1">
              View All {readableChapters.length} Chapters <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {readableChapters.slice(0, 12).map((ch) => (
              <Link
                key={ch.id}
                to={`/chapter/${ch.number}`}
                className="group relative flex flex-col justify-between bg-white dark:bg-[#181818] rounded-xl border border-gray-200 dark:border-white/5 p-5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                      Chapter {ch.number}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                      {ch.pageCount > 0 ? `${ch.pageCount} Pages` : 'Upcoming'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-400 transition-colors line-clamp-1">
                    {ch.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-white transition-colors">
                    {ch.pageCount > 0 ? 'Read Chapter' : 'Coming Soon'}
                  </span>
                  <ArrowRight size={15} className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Narrative Deep Dive & SEO Analysis */}
        <section className="mb-20">
          <div className="bg-white dark:bg-[#181818] rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-white/5 shadow-sm space-y-8">
            <div>
              <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-2">
                Narrative Breakdown
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
                The Philosophy Behind Blue Lock: Deconstructing Japanese Sports
              </h2>
            </div>

            <div className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none space-y-6 text-sm md:text-base leading-relaxed">
              <p>
                <strong className="text-gray-900 dark:text-white">Blue Lock</strong> fundamentally shatters the archetypal team-first doctrine that has governed Japanese sports storytelling for decades. Conceived by writer <strong className="text-gray-900 dark:text-white">Muneyuki Kaneshiro</strong> and brought to life through the kinetic, visceral illustrations of <strong className="text-gray-900 dark:text-white">Yusuke Nomura</strong>, the story centers on <strong className="text-gray-900 dark:text-white">Yoichi Isagi</strong> — an unfulfilled striker forced to cast aside selfless teamwork in pursuit of pure individual egotism.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white pt-2">
                A Psychological Battle Royale on the Pitch
              </h3>
              <p>
                Unlike conventional athletics stories celebrating harmonious camaraderie, Blue Lock constructs a merciless battle royale. Every training exercise, 3v3 duel, and elimination match operates as a psychological crucible where forwards must strip away passive humility, discover their unique "weapons" on the pitch, and mercilessly devour their opponents' playstyles to survive.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white pt-2">
                Tactical Mastery: Metavision, Egocentrism & Chemical Reactions
              </h3>
              <p>
                What elevates Blue Lock into a modern masterpiece is its rigorous tactical framework. Players do not rely on inexplicable shonen power-ups; they master spatial kinetics, peripheral sightlines, off-the-ball movement, and <strong className="text-blue-400">Metavision</strong> to continuously process the pitch at elite levels. As distinct striker formulas collide, they spark unpredictable <strong className="text-blue-400">Chemical Reactions</strong> that transform high-speed soccer into an art of tactical destruction.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white pt-2">
                The Neo Egoist League: The Battle of European Superclubs
              </h3>
              <p>
                In the ongoing <strong className="text-gray-900 dark:text-white">Neo Egoist League (NEL)</strong>, Blue Lock alumni collide with Europe's premier youth talents. Players choose among five distinct footballing ideologies: German logical rationalism (Bastard Munchen), English physical hyper-speed (Manshine City), Italian catenaccio tactical defense (Ubers), French individualist dominance (PXG), and Spanish technical creativity (FC Barcha) — competing under real-time billionaire contract bids broadcast to millions worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Story Arcs Overview */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-600/10 text-blue-500 rounded-lg">
              <Zap size={24} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                Major Story Arcs & Saga Progression
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Explore the complete chronological timeline of the Blue Lock project
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARCS.map((arc) => (
              <div
                key={arc.id}
                className="bg-white dark:bg-[#181818] rounded-xl border border-gray-200 dark:border-white/5 p-6 hover:border-blue-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md">
                    Chapters {arc.chapterStart} – {arc.ongoing ? 'ongoing' : arc.chapterEnd}
                  </span>
                  <span className="text-xs text-gray-400">
                    {arc.chapterEnd - arc.chapterStart + 1} Chapters
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {arc.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {arc.description}
                </p>
                <Link
                  to={`/chapter/${arc.chapterStart}`}
                  className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1"
                >
                  Start Arc at Chapter {arc.chapterStart} <ArrowRight size={14} />
                </Link>
                <Link to={`/arcs/${arc.id}`} className="text-xs font-bold text-gray-400 hover:text-white mt-2 inline-block">
                  {arc.title} guide →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ: one answer per top search question (data/home-faq.js) */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-600/10 text-blue-500 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                Blue Lock Manga FAQ
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                What Blue Lock is about, who wrote it, how many chapters there are, and the anime
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {HOME_FAQ.map(item => (
              <div key={item.q} className="bg-white dark:bg-[#181818] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.a.replace('{latest}', String(latestChapter?.number ?? ''))}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-6 text-sm font-semibold">
            <Link to="/anime/season-3" className="text-blue-400 hover:underline">Blue Lock season 3 release date</Link>
            <Link to="/anime" className="text-blue-400 hover:underline">Anime watch order</Link>
            <Link to="/arcs" className="text-blue-400 hover:underline">All arcs in order</Link>
            <Link to="/author" className="text-blue-400 hover:underline">About the author</Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
