import React, { createContext, useContext, useState, useRef } from 'react';
import { Chapter } from '../types';
import { MOCK_CHAPTERS } from '../constants';

interface MangaContextType {
  chapters: Chapter[];
  addChapter: (chapter: Chapter) => void;
  deleteChapter: (id: string) => void;
  getChapterWithPages: (chapterNum: number) => Promise<Chapter | null>;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export const MangaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chapters, setChapters] = useState<Chapter[]>(MOCK_CHAPTERS);
  const cacheRef = useRef<Record<number, Chapter>>({});

  const addChapter = (chapter: Chapter) => {
    setChapters(prev => {
      const newChapters = [chapter, ...prev];
      return newChapters.sort((a, b) => b.number - a.number);
    });
  };

  const deleteChapter = (id: string) => {
    setChapters(prev => prev.filter(c => c.id !== id));
  };

  const getChapterWithPages = async (chapterNum: number): Promise<Chapter | null> => {
    // Check in-memory cache first
    if (cacheRef.current[chapterNum] && cacheRef.current[chapterNum].pages && cacheRef.current[chapterNum].pages.length > 0) {
      return cacheRef.current[chapterNum];
    }

    const summary = chapters.find(c => c.number === chapterNum);

    try {
      const response = await fetch(`/data/chapters/${chapterNum}.json`);
      if (response.ok) {
        const detail: Chapter = await response.json();
        cacheRef.current[chapterNum] = detail;
        return detail;
      }
    } catch (err) {
      console.warn(`Failed to fetch pages for chapter ${chapterNum}:`, err);
    }

    if (summary) {
      return summary;
    }

    return null;
  };

  return (
    <MangaContext.Provider value={{ chapters, addChapter, deleteChapter, getChapterWithPages }}>
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
