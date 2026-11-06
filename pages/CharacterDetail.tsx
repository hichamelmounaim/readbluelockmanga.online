import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Sparkles, Sword, Trophy, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { CHARACTERS } from '../constants';
import { getCharacterSEOData } from '../utils/seo';

const CharacterDetail: React.FC = () => {
  const { characterSlug } = useParams<{ characterSlug: string }>();
  const character = CHARACTERS.find(c => c.slug === characterSlug);

  if (!character) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center dark:text-white">
        <SEOHead title="Character Not Found – Blue Lock Manga" description="This Blue Lock character profile does not exist." noindex />
        <h1 className="text-3xl font-heading font-bold mb-4">Character Not Found</h1>
        <p className="text-gray-400 mb-8">The character you are looking for does not exist in our database.</p>
        <Link to="/characters" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all">
          <ArrowLeft size={18} /> Back to Characters List
        </Link>
      </div>
    );
  }

  // Related characters
  const relatedCharacters = (character.relatedSlugs || [])
    .map(slug => CHARACTERS.find(c => c.slug === slug))
    .filter(Boolean) as typeof CHARACTERS;

  const seo = getCharacterSEOData(character);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead
        title={seo.seoTitle}
        description={seo.seoDescription}
        canonicalUrl={seo.canonicalUrl}
        ogType="profile"
        ogImage={seo.ogImage}
        schemas={seo.schemas}
      />

      <Breadcrumbs items={[
        { label: 'Home', path: '/' },
        { label: 'Characters', path: '/characters' },
        { label: character.name }
      ]} />

      <div className="mt-4">
        <Link to="/characters" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors mb-6 font-semibold">
          <ArrowLeft size={16} /> Back to Characters
        </Link>
      </div>

      <div className="bg-[#181818] rounded-2xl overflow-hidden border border-white/5 shadow-2xl p-6 md:p-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Column */}
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-900 shadow-lg border border-white/10 max-w-sm mx-auto lg:max-w-none">
              <img
                src={character.image}
                alt={`${character.name} - Blue Lock Manga`}
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-md">
                  {character.role}
                </span>
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-2 tracking-wide uppercase">
                {character.name}
              </h1>
              <p className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-2">
                <Sparkles size={16} /> {character.grade}
              </p>

              {character.age && (
                <p className="text-gray-300 text-sm mb-4">
                  <strong className="text-white">Age:</strong> {character.age}{character.birthday ? ` · Birthday: ${character.birthday}` : ''}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">Soccer Weapon</span>
                  <span className="text-white font-medium flex items-center gap-1.5 text-sm">
                    <Sword size={16} className="text-yellow-400" />
                    {character.weapon || 'Striker Ego'}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">First Appearance</span>
                  <span className="text-white font-medium flex items-center gap-1.5 text-sm">
                    <BookOpen size={16} className="text-blue-400" />
                    {character.firstAppearance || 'Chapter 1'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Abilities & Style</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {character.abilities}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Biography & Blue Lock Journey</h2>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {character.longDescription || character.description}
                </p>
              </div>
            </div>

            {/* Key Chapters Highlight Mesh */}
            {character.keyChapters && character.keyChapters.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <Trophy size={14} className="text-yellow-400" />
                  Key Manga Chapters Featuring {character.name}:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {character.keyChapters.map(kc => (
                    <Link
                      key={kc.number}
                      to={`/chapter/${kc.number}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 border border-white/5 text-xs text-gray-300 hover:text-white transition-all group"
                    >
                      <span className="font-semibold">{kc.label}</span>
                      <ArrowRight size={13} className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Characters Network */}
      {relatedCharacters.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-heading font-bold text-white mb-4 flex items-center gap-2">
            <Users size={18} className="text-blue-500" />
            Key Teammates & Rivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedCharacters.map(rel => (
              <Link
                key={rel.slug}
                to={`/characters/${rel.slug}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#181818] border border-white/5 hover:border-blue-500/40 hover:-translate-y-0.5 transition-all group"
              >
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-12 h-12 rounded-lg object-cover object-top border border-white/10"
                />
                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                    {rel.name}
                  </h3>
                  <span className="text-[11px] text-gray-400">{rel.role}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Accordion Section for pSEO targeting */}
      <section className="bg-[#181818] rounded-2xl border border-white/5 shadow-2xl p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-heading font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="text-blue-500" /> FAQ about {character.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {character.faq?.map(f => (
            <div key={f.q} className="bg-white/5 border border-white/5 p-5 rounded-xl">
              <h3 className="font-bold text-white text-sm mb-2">{f.q}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{f.a}</p>
            </div>
          ))}
          <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
            <h3 className="font-bold text-white text-sm mb-2">Who is {character.name} in Blue Lock?</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              {character.name} ({character.role}, {character.grade.toLowerCase()}): {character.description}
            </p>
          </div>
          {character.age && (
            <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
              <h3 className="font-bold text-white text-sm mb-2">How old is {character.shortName || character.name} in Blue Lock?</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                {/^\d+$/.test(character.age) ? `${character.name} is ${character.age} years old during the main Blue Lock story` : `${character.name}'s age: ${character.age}`}{character.birthday ? `. Birthday: ${character.birthday}` : ''}.
              </p>
            </div>
          )}
          <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
            <h3 className="font-bold text-white text-sm mb-2">What is {character.name}'s primary weapon?</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              In Blue Lock, player abilities are described as weapons. {character.name}'s weapon is {character.weapon || character.abilities}, allowing them to create and finish goal opportunities.
            </p>
          </div>
          <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
            <h3 className="font-bold text-white text-sm mb-2">Which chapter does {character.name} debut in?</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              {character.name} first enters the story in {character.firstAppearance || 'Chapter 1'}.
            </p>
          </div>
          <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
            <h3 className="font-bold text-white text-sm mb-2">Where can I read Blue Lock online free?</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Every chapter is listed in our <Link to="/manga" className="text-blue-400 hover:underline">full Blue Lock chapter list</Link>, starting from <Link to="/chapter/1" className="text-blue-400 hover:underline">Chapter 1</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharacterDetail;
