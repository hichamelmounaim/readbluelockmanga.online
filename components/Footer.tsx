import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="max-w-md">
            <h3 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              BLUE <span className="text-blue-500">LOCK MANGA</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Your premiere destination for reading Blue Lock manga online.
              High quality scans, fast loading, and the latest chapter updates.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Fan Project. Not affiliated with Muneyuki Kaneshiro & Yusuke Nomura or Weekly Shonen Magazine.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/manga" className="hover:text-blue-500 transition-colors">All Chapters</Link></li>
                <li><Link to="/chapter/1" className="hover:text-blue-500 transition-colors">Start Reading</Link></li>
                <li><Link to="/characters" className="hover:text-blue-500 transition-colors">Characters</Link></li>
                <li><Link to="/arcs" className="hover:text-blue-500 transition-colors">Story Arcs</Link></li>
                <li><Link to="/teams" className="hover:text-blue-500 transition-colors">Teams</Link></li>
                <li><Link to="/anime" className="hover:text-blue-500 transition-colors">Anime Guide</Link></li>
                <li><Link to="/anime/season-3" className="hover:text-blue-500 transition-colors">Season 3</Link></li>
                <li><Link to="/author" className="hover:text-blue-500 transition-colors">Author</Link></li>
                <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Characters</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/characters/yoichi-isagi" className="hover:text-blue-500 transition-colors">Yoichi Isagi</Link></li>
                <li><Link to="/characters/meguru-bachira" className="hover:text-blue-500 transition-colors">Meguru Bachira</Link></li>
                <li><Link to="/characters/rin-itoshi" className="hover:text-blue-500 transition-colors">Rin Itoshi</Link></li>
                <li><Link to="/characters/seishiro-nagi" className="hover:text-blue-500 transition-colors">Seishiro Nagi</Link></li>
                <li><Link to="/characters/michael-kaiser" className="hover:text-blue-500 transition-colors">Michael Kaiser</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-500 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/dmca" className="hover:text-blue-500 transition-colors">DMCA</Link></li>
                <li><Link to="/disclaimer" className="hover:text-blue-500 transition-colors">Disclaimer</Link></li>
                <li><a href="mailto:support@readbluelockmanga.online" className="hover:text-blue-500 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center md:text-left">
            &copy; {currentYear} Blue Lock Manga. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-600 font-medium">
            <span>Made for fans by fans</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
