import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Sparkles, Sword } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { CHARACTERS } from '../constants';

const CharacterDetail: React.FC = () => {
  const { characterSlug } = useParams<{ characterSlug: string }>();
  const character = CHARACTERS.find(c => c.slug === characterSlug);

  if (!character) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center dark:text-white">
        <h1 className="text-3xl font-heading font-bold mb-4">Character Not Found</h1>
        <p className="text-gray-400 mb-8">The character you are looking for does not exist in our database.</p>
        <Link to="/characters" className="inline-flex items-center gap-2 px-6 py-3 bg-bb-blue hover:bg-rose-700 text-white rounded-lg font-bold transition-all">
          <ArrowLeft size={18} /> Back to Characters List
        </Link>
      </div>
    );
  }

  // Schema generation
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": character.name,
    "description": character.description,
    "image": character.image,
    "jobTitle": character.grade,
    "alternateName": character.role,
    "worksFor": {
      "@type": "Organization",
      "name": "Blue Lock Manga Series"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Who is ${character.name} in Blue Lock?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${character.name} is a ${character.role.toLowerCase()} character in the Blue Lock manga series, playing as a ${character.grade.toLowerCase()}. ${character.description}`
        }
      },
      ...(character.abilities ? [{
        "@type": "Question",
        "name": `What are ${character.name}'s soccer weapons and abilities?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${character.name} possesses unique soccer weapons in the Blue Lock project. Known weapons and abilities: ${character.abilities}`
        }
      }] : []),
      ...(character.weapon && character.weapon !== 'None' && character.weapon !== 'Unknown' ? [{
        "@type": "Question",
        "name": `What is ${character.name}'s main footballing weapon?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `In Blue Lock, ${character.name}'s core weapon is their ${character.weapon}.`
        }
      }] : [])
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead
        title={`${character.name} Guide — Weapons, Stats, and Story | Blue Lock`}
        description={`Read all about ${character.name} in Blue Lock manga. Discover their role, soccer weapons (${character.abilities || 'striker abilities'}), stats, and background backstory in the Blue Lock project.`}
        canonicalUrl={`https://readbluelockmanga.online/characters/${character.slug}`}
        ogType="profile"
        ogImage={character.image}
        schema={personSchema}
        schemas={[faqSchema]}
      />

      <Breadcrumbs items={[
        { label: 'Home', path: '/' },
        { label: 'Characters', path: '/characters' },
        { label: character.name }
      ]} />

      <div className="mt-4">
        <Link to="/characters" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-bb-blue transition-colors mb-6 font-semibold">
          <ArrowLeft size={16} /> Back to Characters
        </Link>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 shadow-2xl p-6 md:p-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Column */}
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-800 shadow-lg border border-white/10 max-w-sm mx-auto lg:max-w-none">
              <img
                src={character.image}
                alt={`${character.name} - Blue Lock`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-bb-blue text-white text-xs font-bold uppercase tracking-wider rounded-md">
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
              <p className="text-bb-blue font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-2">
                <Sparkles size={16} /> {character.grade}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">Soccer Weapon</span>
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Sword size={16} className="text-bb-blue" />
                    {character.weapon || 'None / Unknown'}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">First Appearance</span>
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <BookOpen size={16} className="text-bb-blue" />
                    {character.firstAppearance || 'Chapter 1'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Abilities & Style</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {character.abilities || 'High-tier striker weapons and egoist footballing style.'}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-2 border-b border-white/5 pb-2">Biography & Blue Lock Journey</h2>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {character.longDescription || character.description}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
              <Link
                to="/chapter/1"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-bb-blue hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition-all text-center"
              >
                Read Manga from Chapter 1
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 transition-all text-center"
              >
                Go to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section for pSEO targeting */}
      <section className="bg-[#1a1a1a] rounded-2xl border border-white/5 shadow-2xl p-6 md:p-10 mb-12">
        <h2 className="text-2xl font-heading font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="text-bb-blue" /> FAQ about {character.name}
        </h2>
        <div className="space-y-4">
          <div className="bg-white/3 border border-white/5 p-5 rounded-xl">
            <h3 className="font-bold text-white text-base mb-2">Who is {character.name} in Blue Lock?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {character.name} is a key forward/striker inside the Blue Lock project, a facility built by Jinpachi Ego to raise the world's most egotistical striker. In the story, they play as a {character.grade.toLowerCase()}, clashing with other players to survive eliminations.
            </p>
          </div>
          {character.abilities && (
            <div className="bg-white/3 border border-white/5 p-5 rounded-xl">
              <h3 className="font-bold text-white text-base mb-2">What are the weapons of {character.name}?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                In Blue Lock, player abilities are referred to as 'weapons.' {character.name}'s weapons are {character.abilities}, allowing them to score goals and force chemical reactions with teammates.
              </p>
            </div>
          )}
          {character.weapon && character.weapon !== 'None' && character.weapon !== 'Unknown' && (
            <div className="bg-white/3 border border-white/5 p-5 rounded-xl">
              <h3 className="font-bold text-white text-base mb-2">What is the signature playstyle of {character.name}?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Their signature playstyle revolves around their weapon: {character.weapon}. This enables them to stand out in high-stakes matches against world-class youth teams.
              </p>
            </div>
          )}
          <div className="bg-white/3 border border-white/5 p-5 rounded-xl">
            <h3 className="font-bold text-white text-base mb-2">Where can I read Blue Lock manga online free?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              You can read all chapters of Blue Lock manga online free on <Link to="/" className="text-bb-blue hover:underline">www.readbluelockmanga.online</Link> with no registration required. High-definition pages, fast loading speeds, and updates as soon as the latest chapters are published!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharacterDetail;
