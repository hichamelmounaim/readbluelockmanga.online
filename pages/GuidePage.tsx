import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { useManga } from '../context/MangaContext';
import { GUIDES } from '../data/guides.js';
import { getGuideSEOData, realChapterTitle } from '../utils/seo';
import NotFound from './NotFound';

type GuideLink = { label: string; to: string };
type Guide = {
  title: string; description: string; kicker?: string; h1: string; intro?: string[];
  sections?: { h2: string; paras?: string[]; list?: string[]; links?: GuideLink[] }[];
  chapterRange?: [number, number | null];
  faq?: { q: string; a: string }[];
  breadcrumbs: { name: string; path: string }[];
  related?: GuideLink[];
};

// Renders any page defined in data/guides.js (anime, arcs, teams, author).
const GuidePage: React.FC = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/';
  const guide = (GUIDES as unknown as Record<string, Guide>)[path];
  const { chapters } = useManga();
  if (!guide) return <NotFound />;

  const seo = getGuideSEOData(path, guide);
  const rangeChapters = guide.chapterRange
    ? [...chapters]
        .filter(c => (c.pageCount ?? 0) > 0 && c.number >= guide.chapterRange![0] && (guide.chapterRange![1] == null || c.number <= guide.chapterRange![1]!))
        .sort((a, b) => a.number - b.number)
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <SEOHead title={seo.seoTitle} description={seo.seoDescription} canonicalUrl={seo.canonicalUrl} ogType="article" schemas={seo.schemas} />
      <Breadcrumbs items={guide.breadcrumbs.slice(1).map((b, i, arr) => ({ label: b.name, path: i < arr.length - 1 ? b.path : undefined }))} />

      <header className="mt-6 mb-10">
        {guide.kicker && <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">{guide.kicker}</span>}
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{guide.h1}</h1>
        {guide.intro?.map((p, i) => <p key={i} className="text-gray-300 text-lg leading-relaxed">{p}</p>)}
      </header>

      {guide.sections?.map(sec => (
        <section key={sec.h2} className="mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-3">{sec.h2}</h2>
          {sec.paras?.map((p, i) => <p key={i} className="text-gray-300 leading-relaxed mb-3">{p}</p>)}
          {sec.list && (
            <ul className="list-disc pl-6 space-y-1.5 text-gray-300 mb-3">
              {sec.list.map(item => <li key={item}>{item}</li>)}
            </ul>
          )}
          {sec.links && (
            <div className="flex flex-wrap gap-2 mt-3">
              {sec.links.map(l => (
                <Link key={l.to + l.label} to={l.to} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-600/10 border border-orange-500/30 text-orange-400 text-sm font-semibold hover:bg-orange-600/20">
                  {l.label} <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}

      {rangeChapters.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-3 flex items-center gap-2"><BookOpen size={20} className="text-orange-500" /> Read this arc ({rangeChapters.length} chapters)</h2>
          <div className="flex flex-wrap gap-2">
            {rangeChapters.map(c => {
              const t = realChapterTitle(c.number, c.title);
              return (
                <Link key={c.number} to={`/chapter/${c.number}`} title={t || undefined} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-xs font-bold hover:bg-white/10">
                  Ch. {c.number}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {guide.faq && guide.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">FAQ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {guide.faq.map(f => (
              <div key={f.q} className="bg-[#181818] border border-white/5 rounded-xl p-5">
                <h3 className="font-bold text-white text-sm mb-2">{f.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {guide.related && (
        <nav className="border-t border-white/10 pt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Related</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {guide.related.filter(r => r.to !== path).map(r => (
              <Link key={r.to + r.label} to={r.to} className="text-orange-400 hover:underline">{r.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default GuidePage;
