import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, BookOpen, Heart, Globe, Award } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { PAGE_META, SITE_URL } from '../utils/seo';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <SEOHead
        title={PAGE_META['/about'].title}
        description={PAGE_META['/about'].description}
        canonicalUrl={`${SITE_URL}/about`}
      />

      <Breadcrumbs items={[
        { label: 'Home', path: '/' },
        { label: 'About Us' }
      ]} />

      <div className="my-8">
        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">
          Independent Fan Project
        </span>
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">
          About Haikyu!! Manga
        </h1>
        <p className="text-lg text-gray-300 font-light leading-relaxed">
          Crafted by dedicated manga purists to celebrate the tactical brilliance, emotional depth, and breathtaking kinetic artwork of Haruichi Furudate's timeless volleyball masterpiece.
        </p>
      </div>

      <div className="space-y-10 text-gray-300 leading-relaxed">
        {/* Mission Statement */}
        <div className="bg-[#181818] rounded-2xl p-8 border border-white/5 shadow-sm">
          <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center gap-2">
            <Award className="text-orange-500" />
            Our Guiding Mission
          </h2>
          <p className="mb-4">
            Manga reading in the digital age should be fluid, visually pristine, and distraction-free. We believe that global fans deserve an uncompromising environment where high-resolution scans, instant page loading, and responsive mobile controls let the story and artwork take center stage.
          </p>
          <p>
            From the initial meeting of Hinata and Kageyama in Chapter 1 through the legendary 'Dumpster Battle' and the V.League finale, our archive is meticulously organized with all 402 chapters, character profiles, and arc breakdowns to ensure readers never miss a single play.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#181818] p-6 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-400 flex items-center justify-center mb-4">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Lightweight & Ultra-Fast</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Engineered with modern pre-rendered SSG architecture and lightweight data chunking for instantaneous page loads across desktop, tablet, and mobile browsers.
            </p>
          </div>

          <div className="bg-[#181818] p-6 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-400 flex items-center justify-center mb-4">
              <BookOpen size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dual Reading Engine</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Seamlessly toggle between vertical continuous webtoon scrolling and traditional single-page navigation with keyboard arrow shortcuts.
            </p>
          </div>

          <div className="bg-[#181818] p-6 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-400 flex items-center justify-center mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High-Definition Visuals</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We preserve Haruichi Furudate's dynamic panel perspectives, kinetic motion blur, and dramatic jump spreads with crystal-clear image quality.
            </p>
          </div>

          <div className="bg-[#181818] p-6 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-400 flex items-center justify-center mb-4">
              <Globe size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Complete 402 Chapter Archive</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our digital library houses the entire 45-volume, 402-chapter story, complete with bonus chapters and specials.
            </p>
          </div>
        </div>

        {/* Support the Official Creators */}
        <div className="bg-gradient-to-r from-orange-950/40 via-[#181818] to-[#181818] p-8 rounded-2xl border border-orange-500/20">
          <h2 className="text-xl font-heading font-bold text-white mb-3 flex items-center gap-2">
            <Heart size={20} className="text-red-500 fill-red-500" />
            Support the Official Authors & Serialization
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            This website is an independent tribute operated solely by passionate fans for promotional and educational discussion. We strongly encourage all readers to support author and artist Haruichi Furudate and publisher Shueisha by purchasing official manga volumes, digital editions on licensed platforms (such as MANGA Plus and VIZ Media), and authorized merchandise.
          </p>
          <div className="flex gap-4">
            <Link
              to="/manga"
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm transition-all"
            >
              Browse Full Chapter Archive
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
