import React, { createContext, useContext, useState } from 'react';
import { Chapter } from '../types';
import { MOCK_CHAPTERS } from '../constants';

interface MangaContextType {
  chapters: Chapter[];
  addChapter: (chapter: Chapter) => void;
  deleteChapter: (id: string) => void;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export const MangaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with mock data. In a real app, you would fetch this from an API.
  // We aren't using localStorage here because blob URLs for uploaded images expire on refresh.
  const [chapters, setChapters] = useState<Chapter[]>(MOCK_CHAPTERS);

  const addChapter = (chapter: Chapter) => {
    setChapters(prev => {
      const newChapters = [chapter, ...prev];
      // Keep sorted by number descending
      return newChapters.sort((a, b) => b.number - a.number);
    });
  };

  const deleteChapter = (id: string) => {
    setChapters(prev => prev.filter(c => c.id !== id));
  };

  return (
    <MangaContext.Provider value={{ chapters, addChapter, deleteChapter }}>
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  const context = useContext(MangaContext);
  if (context === undefined) {
    throw new Error('useManga must be used within a MangaProvider');
  }
  return context;
};