import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

// Shown for any URL that doesn't match a route. Marked noindex; the server also
// returns HTTP 404 for it via dist/404.html (see scripts/prerender.mjs + nginx.conf).
const NotFound: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-24 text-center">
    <SEOHead title="Page Not Found – Blue Lock Manga" description="The page you are looking for does not exist." noindex />
    <p className="text-blue-500 font-bold tracking-widest text-sm mb-2">404</p>
    <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Page not found</h1>
    <p className="text-gray-400 mb-8">This page doesn't exist or was moved.</p>
    <div className="flex flex-wrap justify-center gap-3">
      <Link to="/" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm">Home</Link>
      <Link to="/manga" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-sm">All Chapters</Link>
      <Link to="/characters" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-sm">Characters</Link>
    </div>
  </div>
);

export default NotFound;
