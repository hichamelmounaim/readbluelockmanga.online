import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Sparkles, Sword, Trophy, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { CHARACTERS } from '../constants';
import { getCharacterSEOData, SITE_URL } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';

const CharacterDetail: React.FC = () => {
  const { characterSlug } = useParams<{ characterSlug: string }>();
  const { lang, t, localizePath } = useLanguage();
  const character = CHARACTERS.find(c => c.slug === characterSlug);

  if (!character) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center dark:text-white">
        <SEOHead title="Character Not Found – Blue Lock Manga" description="This Blue Lock character profile does not exist." noindex />
        <h1 className="text-3xl font-heading font-bold mb-4">Character Not Found</h1>
        <p className="text-gray-400 mb-8">The character you are looking for does not exist in our database.</p>
        <Link to={localizePath('/characters')} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all">
          <ArrowLeft size={18} /> {t.nav.characters}
        </Link>
      </div>
    );
  }

  // Related characters
  const relatedCharacters = (character.relatedSlugs || [])
    .map(slug => CHARACTERS.find(c => c.slug === slug))
    .filter(Boolean) as typeof CHARACTERS;

  const seo = getCharacterSEOData(character, lang);

  const alternateLinks = [
    { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/characters/${character.slug}` },
    { rel: 'alternate', hreflang: 'fr', href: `${SITE_URL}/fr/characters/${character.slug}` },
    { rel: 'alternate', hreflang: 'pt', href: `${SITE_URL}/pt/characters/${character.slug}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/characters/${character.slug}` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead
        title={seo.seoTitle}
        description={seo.seoDescription}
        canonicalUrl={seo.canonicalUrl}
        ogType="profile"
        ogImage={seo.ogImage}
        schemas={seo.schemas}
        alternateLinks={alternateLinks}
      />

      <Breadcrumbs items={[
        { label: t.nav.home, path: '/' },
        { label: t.nav.characters, path: '/characters' },
        { label: character.name }
      ]} />

      <div className="mt-4">
        <Link to={localizePath('/characters')} className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors mb-6 font-semibold">
          <ArrowLeft size={16} /> {t.nav.characters}
        </Link>
      </div>

      <div className="bg-[#181818] rounded-2xl overflow-hidden border border-white/5 shadow-2xl p-6 md:p-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Column */}
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-900 shadow-lg border border-white/10 max-w-sm mx-auto lg:max-w-none">
              <img
                src={character.image}
                alt={`${character.name} - Blue Lock Character Profile`}
                width="400"
                height="533"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full">
                  {character.grade}
                </span>
                <span className="text-gray-400 text-sm font-medium">
                  {character.role}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
                {character.name}
              </h1>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 font-light">
                {character.longDescription || character.description}
              </p>

              {/* Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                    <Sword size={14} /> Specialty Weapon
                  </div>
                  <span className="text-white text-sm font-semibold">{character.weapon}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                    <Sparkles size={14} /> Key Abilities
                  </div>
                  <span className="text-white text-sm font-semibold">{character.abilities}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                    <Trophy size={14} /> Debut
                  </div>
                  <span className="text-white text-sm font-semibold">{character.firstAppearance}</span>
                </div>
                {character.birthday && (
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                      <CheckCircle2 size={14} /> Birthday / Age
                    </div>
                    <span className="text-white text-sm font-semibold">{character.birthday} ({character.age || '17'})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Key Chapters */}
            {character.keyChapters && character.keyChapters.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-500" /> Key Chapters for {character.name}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {character.keyChapters.map(ch => (
                    <Link
                      key={ch.number}
                      to={localizePath(`/chapter/${ch.number}`)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-transparent text-blue-400 hover:text-white text-xs font-bold transition-all"
                    >
                      {ch.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Characters */}
      {relatedCharacters.length > 0 && (
        <div>
          <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-2">
            <Users size={22} className="text-blue-500" /> Strikers Connected with {character.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedCharacters.map(rel => (
              <Link
                key={rel.slug}
                to={localizePath(`/characters/${rel.slug}`)}
                className="group p-4 bg-[#181818] rounded-xl border border-white/5 hover:border-blue-500/40 hover:bg-blue-600/5 transition-all flex items-center gap-3"
              >
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-12 h-12 rounded-lg object-cover object-top border border-white/10"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                    {rel.name}
                  </h4>
                  <span className="text-xs text-gray-500 block truncate">{rel.role}</span>
                </div>
                <ArrowRight size={14} className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
