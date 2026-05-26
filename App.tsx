import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MangaProvider } from './context/MangaContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const MangaList = lazy(() => import('./pages/MangaList'));
const ChapterReader = lazy(() => import('./pages/ChapterReader'));
const Characters = lazy(() => import('./pages/Characters'));
const About = lazy(() => import('./pages/About'));
const Legal = lazy(() => import('./pages/Legal'));

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

const App: React.FC = () => {
  useContentProtection();

  return (
    <MangaProvider>
      <ThemeProvider>
        <Router>
          {/* Helps scroll to top on navigation */}
          <div className="font-sans antialiased text-gray-100 bg-[#121212] transition-colors duration-200 min-h-screen select-none">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
                <Route path="/manga" element={<LayoutWrapper><MangaList /></LayoutWrapper>} />
                <Route path="/characters" element={<LayoutWrapper><Characters /></LayoutWrapper>} />
                <Route path="/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
                <Route path="/terms" element={<LayoutWrapper><Legal type="terms" /></LayoutWrapper>} />

                <Route path="/privacy" element={<LayoutWrapper><Legal type="privacy" /></LayoutWrapper>} />
                <Route path="/dmca" element={<LayoutWrapper><Legal type="dmca" /></LayoutWrapper>} />
                <Route path="/disclaimer" element={<LayoutWrapper><Legal type="disclaimer" /></LayoutWrapper>} />

                {/* Reader often needs less layout distraction, but keeping Nav for consistency. 
                    Could make a dedicated ReaderLayout here. */}
                <Route path="/chapter/:chapterId" element={
                  <>
                    <ChapterReader />
                  </>
                } />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ThemeProvider>
    </MangaProvider>
  );
};

export default App;