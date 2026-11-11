export type SupportedLang = 'en';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  pages?: string[];
  pageCount?: number;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  grade: string;
  slug: string;
  abilities: string;
  weapon: string;
  firstAppearance: string;
  longDescription: string;
  keyChapters?: { number: number; label: string }[];
  relatedSlugs?: string[];
  /** Name fans search with, e.g. "Hinata" */
  shortName?: string;
  age?: string;
  birthday?: string;
  faq?: { q: string; a: string }[];
}

export interface Arc {
  id: string;
  title: string;
  description: string;
  chapterStart: number;
  chapterEnd: number;
  ongoing?: boolean;
  image: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  schema?: object;
}

export interface Comment {
  id: string;
  user: string;
  content: string;
  date?: string;
  likes?: number;
  createdAt?: string;
  avatar?: string;
}
