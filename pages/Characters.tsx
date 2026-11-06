import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { CHARACTERS } from '../constants';
import { PAGE_META, SITE_URL } from '../utils/seo';
import { CHARACTERS_FAQ } from '../data/characters-faq.js';
import { ArrowRight, Shield, Zap } from 'lucide-react';

const Characters: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEOHead
        title={PAGE_META['/characters'].title}
        description={PAGE_META['/characters'].description}
        canonicalUrl={`${SITE_URL}/characters`}
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Blue Lock <span className="text-blue-500">Characters</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          The main character of Blue Lock is <Link to="/characters/yoichi-isagi" className="text-blue-400 hover:underline">Yoichi Isagi</Link>. Below are profiles of every key Blue Lock character, from Isagi's rivals Nagi, Rin and Kaiser to coach Jinpachi Ego: roles, weapons and the chapters where they shine.
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

                {char.weapon && (
                  <div className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 p-2.5 rounded-lg mb-4">
                    <Zap size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Weapon:</strong> {char.weapon}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5">
                <Link
                  to={`/characters/${char.slug}`}
                  className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-between group-hover:translate-x-1 duration-200"
                >
                  <span>View Full Profile</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">Blue Lock Characters FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CHARACTERS_FAQ.map(f => (
            <div key={f.q} className="bg-[#181818] border border-white/5 rounded-xl p-5">
              <h3 className="font-bold text-white text-sm mb-2">{f.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          <Link to="/teams" className="text-blue-400 hover:underline">All Blue Lock teams</Link>
          <Link to="/arcs" className="text-blue-400 hover:underline">Blue Lock arcs</Link>
          <Link to="/anime" className="text-blue-400 hover:underline">Blue Lock anime</Link>
        </div>
      </section>
    </div>
  );
};

export default Characters;
