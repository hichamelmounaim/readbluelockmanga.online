import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { CHARACTERS } from '../constants';
import { PAGE_META, SITE_URL, faqSchema, buildAlternates } from '../utils/seo';
import { CHARACTERS_FAQ } from '../data/characters-faq.js';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Zap } from 'lucide-react';

const Characters: React.FC = () => {
  const { t, localizePath } = useLanguage();

  const pageMeta = PAGE_META['/characters'];
  const alternateLinks = buildAlternates('/characters');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEOHead
        title={pageMeta.title}
        description={pageMeta.description}
        canonicalUrl={`${SITE_URL}/characters`}
        alternateLinks={alternateLinks}
        schemas={[faqSchema(CHARACTERS_FAQ)]}
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Haikyu!! <span className="text-orange-500">{t.nav.characters}</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {t.home.charactersPreviewSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHARACTERS.map((char) => (
          <div
            key={char.id}
            className="group flex flex-col bg-[#181818] rounded-2xl border border-white/5 overflow-hidden hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
          >
            {/* Character Image */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-900 relative">
              <img
                src={char.image}
                alt={`${char.name} - Haikyu!! Character Profile`}
                width="400"
                height="300"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
              <span className="absolute bottom-3 left-4 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 backdrop-blur-md rounded-md border border-orange-500/30">
                {char.grade}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {char.name}
                  </h2>
                  <span className="text-xs font-medium text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                    {char.role}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {char.description}
                </p>

                <div className="border-t border-white/5 pt-3 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-1">
                    <Zap size={12} className="text-orange-500" />
                    Specialty Weapon:
                  </span>
                  <span className="text-xs text-gray-300 line-clamp-1">{char.weapon}</span>
                </div>
              </div>

              <Link
                to={localizePath(`/characters/${char.slug}`)}
                className="w-full py-2.5 px-4 bg-white/5 hover:bg-orange-600 text-gray-300 hover:text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-white/5 hover:border-transparent group-hover:border-orange-500/30"
              >
                <span>View Full Profile</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Haikyu!! Characters FAQ */}
      <section className="mt-16">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">Haikyu!! Characters FAQ</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {CHARACTERS_FAQ.map((f) => (
            <div key={f.q} className="bg-[#181818] p-6 rounded-xl border border-white/5">
              <h3 className="text-base font-bold text-white mb-2">{f.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Characters;
