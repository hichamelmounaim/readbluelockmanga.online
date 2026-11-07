import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { MangaProvider } from './context/MangaContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const MangaList = lazy(() => import('./pages/MangaList'));
const ChapterReader = lazy(() => import('./pages/ChapterReader'));
const Characters = lazy(() => import('./pages/Characters'));
const CharacterDetail = lazy(() => import('./pages/CharacterDetail'));
const About = lazy(() => import('./pages/About'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
import { GUIDES } from './data/guides.js';

// Wrapper to conditionally render layout based on path
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

import { useContentProtection } from './hooks/useContentProtection';

const AppContent: React.FC = () => {
  useContentProtection();

  return (
    <div className="font-sans antialiased text-gray-100 bg-[#121212] transition-colors duration-200 min-h-screen select-none">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Home routes */}
          <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
          <Route path="/en" element={<LayoutWrapper><Home /></LayoutWrapper>} />
          <Route path="/fr" element={<LayoutWrapper><Home /></LayoutWrapper>} />
          <Route path="/pt" element={<LayoutWrapper><Home /></LayoutWrapper>} />

          {/* Chapter lists */}
          <Route path="/manga" element={<LayoutWrapper><MangaList /></LayoutWrapper>} />
          <Route path="/en/manga" element={<LayoutWrapper><MangaList /></LayoutWrapper>} />
          <Route path="/fr/manga" element={<LayoutWrapper><MangaList /></LayoutWrapper>} />
          <Route path="/pt/manga" element={<LayoutWrapper><MangaList /></LayoutWrapper>} />

          {/* Characters roster */}
          <Route path="/characters" element={<LayoutWrapper><Characters /></LayoutWrapper>} />
          <Route path="/en/characters" element={<LayoutWrapper><Characters /></LayoutWrapper>} />
          <Route path="/fr/characters" element={<LayoutWrapper><Characters /></LayoutWrapper>} />
          <Route path="/pt/characters" element={<LayoutWrapper><Characters /></LayoutWrapper>} />

          {/* Character detail */}
          <Route path="/characters/:characterSlug" element={<LayoutWrapper><CharacterDetail /></LayoutWrapper>} />
          <Route path="/en/characters/:characterSlug" element={<LayoutWrapper><CharacterDetail /></LayoutWrapper>} />
          <Route path="/fr/characters/:characterSlug" element={<LayoutWrapper><CharacterDetail /></LayoutWrapper>} />
          <Route path="/pt/characters/:characterSlug" element={<LayoutWrapper><CharacterDetail /></LayoutWrapper>} />

          {/* Chapter reader */}
          <Route path="/chapter/:chapterId" element={<ChapterReader />} />
          <Route path="/en/chapter/:chapterId" element={<ChapterReader />} />
          <Route path="/fr/chapter/:chapterId" element={<ChapterReader />} />
          <Route path="/pt/chapter/:chapterId" element={<ChapterReader />} />

          {/* Legal and static pages */}
          <Route path="/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
          <Route path="/en/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
          <Route path="/fr/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
          <Route path="/pt/about" element={<LayoutWrapper><About /></LayoutWrapper>} />

          <Route path="/terms" element={<LayoutWrapper><Legal type="terms" /></LayoutWrapper>} />
          <Route path="/en/terms" element={<LayoutWrapper><Legal type="terms" /></LayoutWrapper>} />
          <Route path="/fr/terms" element={<LayoutWrapper><Legal type="terms" /></LayoutWrapper>} />
          <Route path="/pt/terms" element={<LayoutWrapper><Legal type="terms" /></LayoutWrapper>} />

          <Route path="/privacy" element={<LayoutWrapper><Legal type="privacy" /></LayoutWrapper>} />
          <Route path="/en/privacy" element={<LayoutWrapper><Legal type="privacy" /></LayoutWrapper>} />
          <Route path="/fr/privacy" element={<LayoutWrapper><Legal type="privacy" /></LayoutWrapper>} />
          <Route path="/pt/privacy" element={<LayoutWrapper><Legal type="privacy" /></LayoutWrapper>} />

          <Route path="/dmca" element={<LayoutWrapper><Legal type="dmca" /></LayoutWrapper>} />
          <Route path="/en/dmca" element={<LayoutWrapper><Legal type="dmca" /></LayoutWrapper>} />
          <Route path="/fr/dmca" element={<LayoutWrapper><Legal type="dmca" /></LayoutWrapper>} />
          <Route path="/pt/dmca" element={<LayoutWrapper><Legal type="dmca" /></LayoutWrapper>} />

          <Route path="/disclaimer" element={<LayoutWrapper><Legal type="disclaimer" /></LayoutWrapper>} />
          <Route path="/en/disclaimer" element={<LayoutWrapper><Legal type="disclaimer" /></LayoutWrapper>} />
          <Route path="/fr/disclaimer" element={<LayoutWrapper><Legal type="disclaimer" /></LayoutWrapper>} />
          <Route path="/pt/disclaimer" element={<LayoutWrapper><Legal type="disclaimer" /></LayoutWrapper>} />

          {/* Guide pages: anime, arcs, teams, author */}
          {Object.keys(GUIDES).map(guidePath => (
            <React.Fragment key={guidePath}>
              <Route path={guidePath} element={<LayoutWrapper><GuidePage /></LayoutWrapper>} />
              <Route path={`/en${guidePath}`} element={<LayoutWrapper><GuidePage /></LayoutWrapper>} />
              <Route path={`/fr${guidePath}`} element={<LayoutWrapper><GuidePage /></LayoutWrapper>} />
              <Route path={`/pt${guidePath}`} element={<LayoutWrapper><GuidePage /></LayoutWrapper>} />
            </React.Fragment>
          ))}

          {/* Catch-all: real 404 page */}
          <Route path="*" element={<LayoutWrapper><NotFound /></LayoutWrapper>} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <MangaProvider>
        <ThemeProvider>
          <Router>
            <LanguageProvider>
              <AppContent />
            </LanguageProvider>
          </Router>
        </ThemeProvider>
      </MangaProvider>
    </HelmetProvider>
  );
};

export default App;
