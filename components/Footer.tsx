import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t, localizePath } = useLanguage();

  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="max-w-md">
            <h3 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              HAIKYU<span className="text-orange-500">!! MANGA</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
              {t.hero.subtitle}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Fan Project. Not affiliated with Haruichi Furudate or Shueisha.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{t.nav.explore}</h4>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li><Link to={localizePath('/manga')} className="hover:text-orange-500 transition-colors">{t.nav.allChapters}</Link></li>
                <li><Link to={localizePath('/chapter/1')} className="hover:text-orange-500 transition-colors">{t.hero.exploreMore}</Link></li>
                <li><Link to={localizePath('/characters')} className="hover:text-orange-500 transition-colors">{t.nav.characters}</Link></li>
                <li><Link to={localizePath('/arcs')} className="hover:text-orange-500 transition-colors">Story Arcs</Link></li>
                <li><Link to={localizePath('/teams')} className="hover:text-orange-500 transition-colors">Teams</Link></li>
                <li><Link to={localizePath('/anime')} className="hover:text-orange-500 transition-colors">Anime Guide</Link></li>
                <li><Link to={localizePath('/about')} className="hover:text-orange-500 transition-colors">{t.footer.aboutUs}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{t.nav.characters}</h4>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li><Link to={localizePath('/characters/shoyo-hinata')} className="hover:text-orange-500 transition-colors">Shoyo Hinata</Link></li>
                <li><Link to={localizePath('/characters/tobio-kageyama')} className="hover:text-orange-500 transition-colors">Tobio Kageyama</Link></li>
                <li><Link to={localizePath('/characters/kei-tsukishima')} className="hover:text-orange-500 transition-colors">Kei Tsukishima</Link></li>
                <li><Link to={localizePath('/characters/yu-nishinoya')} className="hover:text-orange-500 transition-colors">Yu Nishinoya</Link></li>
                <li><Link to={localizePath('/characters/toru-oikawa')} className="hover:text-orange-500 transition-colors">Toru Oikawa</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{t.footer.legal}</h4>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li><Link to={localizePath('/privacy')} className="hover:text-orange-500 transition-colors">{t.footer.privacy}</Link></li>
                <li><Link to={localizePath('/terms')} className="hover:text-orange-500 transition-colors">{t.footer.terms}</Link></li>
                <li><Link to={localizePath('/dmca')} className="hover:text-orange-500 transition-colors">{t.footer.dmca}</Link></li>
                <li><Link to={localizePath('/disclaimer')} className="hover:text-orange-500 transition-colors">{t.footer.disclaimer}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {currentYear} Haikyu!! Manga. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <span>Made for fans by fans</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
