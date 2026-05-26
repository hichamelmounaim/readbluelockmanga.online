import React from 'react';
import SEOHead from '../components/SEOHead';
import { CHARACTERS } from '../constants';
import { ArrowRight } from 'lucide-react';

const Characters: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEOHead
        title="Blue Lock Manga Characters - Database"
        description="Detailed profiles of Blue Lock Manga characters including Yoichi Isagi, Meguru Bachira and more."
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Blue Lock Manga Characters</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Comprehensive database of every character in the Blue Lock manga. Learn about their sports, abilities, and relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHARACTERS.map((char) => (
          <div key={char.id} className="group flex flex-col bg-[#1a1a1a] rounded-xl border border-white/5 p-6 hover:border-bb-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-bb-blue/10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white group-hover:text-bb-blue transition-colors">
                  {char.name}
                </h2>
                <span className="self-start px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 rounded-md">
                  {char.role}
                </span>
              </div>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/5">
                {char.role}
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-8">
              {char.description}
            </p>

            <div className="pt-4 border-t border-white/5">
              <button className="text-sm font-bold text-white hover:text-bb-blue transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-200">
                Read Full Profile <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;