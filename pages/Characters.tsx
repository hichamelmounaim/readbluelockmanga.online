import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { CHARACTERS } from '../constants';
import { PAGE_META, SITE_URL } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Zap } from 'lucide-react';

const Characters: React.FC = () => {
  const { lang, t, localizePath } = useLanguage();

  const metaPath = lang === 'en' ? '/characters' : `/${lang}/characters`;
  const pageMeta = PAGE_META[metaPath] || PAGE_META['/characters'];

  const alternateLinks = [
    { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/characters` },
    { rel: 'alternate', hreflang: 'fr', href: `${SITE_URL}/fr/characters` },
    { rel: 'alternate', hreflang: 'pt', href: `${SITE_URL}/pt/characters` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/characters` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEOHead
        title={pageMeta.title}
        description={pageMeta.description}
        canonicalUrl={lang === 'en' ? `${SITE_URL}/characters` : `${SITE_URL}/${lang}/characters`}
        alternateLinks={alternateLinks}
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Blue Lock <span className="text-blue-500">{t.nav.characters}</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {t.home.charactersPreviewSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHARACTERS.map((char) => (
          <div
            key={char.id}
            className="group flex flex-col bg-[#181818] rounded-2xl border border-white/5 overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
          >
            {/* Character Image */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-900 relative">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
              <span className="absolute bottom-3 left-4 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 backdrop-blur-md rounded-md border border-blue-500/30">
                {char.grade}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
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
                    <Zap size={12} className="text-blue-500" />
                    Specialty Weapon:
                  </span>
                  <span className="text-xs text-gray-300 line-clamp-1">{char.weapon}</span>
                </div>
              </div>

              <Link
                to={localizePath(`/characters/${char.slug}`)}
                className="w-full py-2.5 px-4 bg-white/5 hover:bg-blue-600 text-gray-300 hover:text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-white/5 hover:border-transparent group-hover:border-blue-500/30"
              >
                <span>View Full Profile</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
