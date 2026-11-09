import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, Zap, Flame, Award } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { PAGE_META, SITE_URL, homeSchemas } from '../utils/seo';
import { useManga } from '../context/MangaContext';
import { useLanguage } from '../context/LanguageContext';
import { ARCS } from '../constants';
import { HOME_FAQ } from '../data/home-faq.js';

const Home: React.FC = () => {
  const { chapters } = useManga();
  const { lang, t, localizePath } = useLanguage();

  // Readable chapters filtered by language
  const readableChapters = React.useMemo(() => {
    return chapters.filter(c => {
      if (lang === 'fr') return (c.pageCountFr ?? 0) > 0 || c.number <= 366;
      if (lang === 'pt') return (c.pageCountPt ?? 0) > 0 || c.number <= 366;
      return (c.pageCount ?? 0) > 0;
    });
  }, [chapters, lang]);

  const latestChapter = readableChapters[0];
  const [continueChapter, setContinueChapter] = React.useState<number | null>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem('bluelock_last_chapter');
    if (saved) setContinueChapter(parseInt(saved, 10));
  }, []);

  const metaPath = lang === 'en' ? '/' : `/${lang}`;
  const pageMeta = PAGE_META[metaPath] || PAGE_META['/'];

  const alternateLinks = [
    { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/` },
    { rel: 'alternate', hreflang: 'fr', href: `${SITE_URL}/fr` },
    { rel: 'alternate', hreflang: 'pt', href: `${SITE_URL}/pt` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/` },
  ];

  return (
    <>
      <SEOHead
        title={pageMeta.title}
        description={pageMeta.description}
        canonicalUrl={lang === 'en' ? `${SITE_URL}/` : `${SITE_URL}/${lang}`}
        schemas={homeSchemas()}
        alternateLinks={alternateLinks}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#121212] py-20">
        <div className="absolute inset-0 z-0 opacity-25 select-none pointer-events-none">
          <picture>
            <source media="(max-width: 768px)" srcSet="/blue-lock-mobile.webp" type="image/webp" />
            <img
              src="/blue-lock.webp"
              alt="Blue Lock Manga - Yoichi Isagi and players competing in the Blue Lock Project"
              width="1920"
              height="1080"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Flame size={14} className="text-blue-500" />
            #1 Sports Thriller Manga Worldwide
          </div>

          <h1 className="text-5xl md:text-8xl font-heading font-extrabold text-white mb-4 drop-shadow-2xl tracking-tighter text-center">
            {t.hero.titlePrefix}<span className="text-blue-500">{t.hero.titleHighlight}</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl text-center mb-10 font-light leading-relaxed">
            {t.hero.subtitle}
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
                  <span className="text-gray-400 text-xs">({t.home.bookmarkSubtitle})</span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1">{t.home.rank}</span>
                  <span className="text-white font-bold text-sm flex items-center gap-1">
                    <Award size={14} className="text-yellow-400" /> {t.home.stats.rankValue}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1">{t.home.status}</span>
                  <span className="text-green-400 font-bold text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {t.home.stats.statusValue}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1">{t.home.author}</span>
                  <span className="text-white font-bold text-sm truncate block" title="Muneyuki Kaneshiro & Yusuke Nomura">
                    M. Kaneshiro / Y. Nomura
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1">{t.home.type}</span>
                  <span className="text-white font-bold text-sm truncate block">
                    {t.home.stats.typeValue}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-4 border-t border-white/10 pt-4 mt-2">
                  <span className="text-gray-400 text-xs uppercase tracking-wider block font-medium mb-1.5">{t.home.synopsis}</span>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {t.home.stats.synopsisValue}
                  </p>
                </div>
              </div>

              {/* Fast Action Column */}
              <div className="flex flex-col justify-center items-center lg:items-start gap-4 min-w-[240px]">
                {continueChapter ? (
                  <Link
                    to={localizePath(`/chapter/${continueChapter}`)}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                  >
                    <BookOpen size={20} />
                    <span>{t.home.readNow} Ch. {continueChapter}</span>
                  </Link>
                ) : (
                  <Link
                    to={localizePath('/chapter/1')}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                  >
                    <BookOpen size={20} />
                    <span>{t.hero.exploreMore}</span>
                  </Link>
                )}

                {latestChapter && (
                  <Link
                    to={localizePath(`/chapter/${latestChapter.number}`)}
                    className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all hover:scale-[1.02]"
                  >
                    <span>{t.home.latestReleases}: {t.home.chapter} {latestChapter.number}</span>
                    <ArrowRight size={18} />
                  </Link>
                )}

                <Link
                  to={localizePath('/characters')}
                  className="w-full py-3 px-6 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-semibold rounded-xl flex items-center justify-center gap-2 border border-white/5 transition-all text-xs"
                >
                  <Users size={16} />
                  <span>{t.home.viewAllCharacters}</span>
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
                  {t.home.latestReleases}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {lang === 'fr' ? 'Scans VF en haute définition' : lang === 'pt' ? 'Scans em português em alta definição' : 'Updated automatically with verified English scans'}
                </p>
              </div>
            </div>
            <Link to={localizePath('/manga')} className="text-blue-500 hover:underline text-sm font-bold flex items-center gap-1">
              {t.home.viewAll} ({readableChapters.length}) <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {readableChapters.slice(0, 12).map((ch) => (
              <Link
                key={ch.id}
                to={localizePath(`/chapter/${ch.number}`)}
                className="group relative flex flex-col justify-between bg-white dark:bg-[#181818] rounded-xl border border-gray-200 dark:border-white/5 p-5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                      {t.home.chapter} {ch.number}
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      {lang === 'fr'
                        ? `${ch.pageCountFr || 20} Pages`
                        : lang === 'pt'
                        ? `${ch.pageCountPt || 20} Pages`
                        : `${ch.pageCount || 20} Pages`}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-400 transition-colors line-clamp-1">
                    {ch.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium group-hover:text-white transition-colors">
                    {t.home.readNow}
                  </span>
                  <ArrowRight size={15} className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Narrative Deep Dive & Overview */}
        <section className="mb-20">
          <div className="bg-white dark:bg-[#181818] rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-white/5 shadow-sm space-y-8">
            <div>
              <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-2">
                {t.home.aboutTitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
                {t.home.readOnlineTitle}
              </h2>
            </div>

            <div className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none space-y-6 text-sm md:text-base leading-relaxed">
              <p>{t.home.about.p1}</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white pt-2">
                {t.home.about.h2}
              </h3>
              <p>{t.home.about.p2}</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white pt-2">
                {t.home.about.h3}
              </h3>
              <p>{t.home.about.p3}</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white pt-2">
                {t.home.about.h4}
              </h3>
              <p>{t.home.about.p4}</p>
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
                Major Story Arcs &amp; Progression
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Explore the chronological timeline of the Blue Lock project
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
                    {t.home.chapter}s {arc.chapterStart} – {arc.ongoing ? 'ongoing' : arc.chapterEnd}
                  </span>
                  <span className="text-xs text-gray-400">
                    {arc.chapterEnd - arc.chapterStart + 1} {t.home.chapter}s
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {arc.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {arc.description}
                </p>
                <Link
                  to={localizePath(`/chapter/${arc.chapterStart}`)}
                  className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1"
                >
                  {t.home.readNow} {arc.title} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-600/10 text-blue-500 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                {t.home.faqTitle}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.hero.subtitle}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white dark:bg-[#181818] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{t.home.faq.q1}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t.home.faq.a1}</p>
            </div>
            <div className="bg-white dark:bg-[#181818] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{t.home.faq.q2}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t.home.faq.a2}</p>
            </div>
            <div className="bg-white dark:bg-[#181818] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{t.home.faq.q3}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t.home.faq.a3}</p>
            </div>
            <div className="bg-white dark:bg-[#181818] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{t.home.faq.q4}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t.home.faq.a4}</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
