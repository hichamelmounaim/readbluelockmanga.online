// Typed wrapper around utils/seo-core.js (shared with the build scripts).
import * as core from './seo-core.js';
import chapterNotes from '../data/chapter-notes.json';
import { SupportedLang } from '../types';

export const SITE_URL: string = core.SITE_URL;
export const SITE_NAME: string = core.SITE_NAME;
export const DEFAULT_OG_IMAGE: string = core.DEFAULT_OG_IMAGE;
export const PAGE_META: Record<string, { title: string; description: string }> = core.PAGE_META;

export interface ChapterSEOData {
  number: number;
  title: string;
  hasRealTitle: boolean;
  summary: string;
  hasUniqueSummary: boolean;
  facts: string;
  arcName: string;
  arcSlug: string;
  arcDescription: string;
  stageSummary: string;
  featuredCharacters: { name: string; slug: string; role: string }[];
  segmentName: string;
  segmentSlug: string;
  animeNote: string;
  animePath: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  noindex: boolean;
  schemas: object[];
  alternateLinks?: { rel: string; hreflang: string; href: string }[];
}

const notes = chapterNotes as Record<string, { title?: string; summary?: string }>;

export function getChapterSEOData(
  chapterNumber: number,
  opts: { title?: string; pageCount?: number; lang?: SupportedLang; releaseDate?: string } = {}
): ChapterSEOData {
  return core.getChapterSEOData(chapterNumber, { ...opts, note: notes[String(chapterNumber)] }) as ChapterSEOData;
}

export function getCharacterSEOData(
  character: { name: string; slug: string; image: string; description: string; weapon?: string; shortName?: string; role?: string; grade?: string; abilities?: string; firstAppearance?: string; faq?: { q: string; a: string }[] }
) {
  return core.getCharacterSEOData(character) as {
    seoTitle: string;
    seoDescription: string;
    canonicalUrl: string;
    ogImage: string;
    schemas: object[];
  };
}

export function getAdjacentChapters<T extends { number: number }>(
  chapters: T[],
  num: number
): { prev: T | null; next: T | null; nearby: T[] } {
  return core.getAdjacentChapters(chapters, num) as { prev: T | null; next: T | null; nearby: T[] };
}

export const HTML_LANG: Record<SupportedLang, string> = core.HTML_LANG;
export const OG_LOCALE: Record<SupportedLang, string> = core.OG_LOCALE;
export const buildAlternates = (basePath: string): { rel: string; hreflang: string; href: string }[] =>
  core.buildAlternates(basePath);

export type FaqItem = { q: string; a: string };
export const homeSchemas = (faq?: FaqItem[]): object[] => core.homeSchemas(faq);
export const faqSchema = (list: FaqItem[]): object => core.faqSchema(list);
export const fillFaq = (list: FaqItem[], latest: number | string): FaqItem[] => core.fillFaq(list, latest);
export const mangaListSchemas = (route: string, title: string): object[] =>
  core.mangaListSchemas(route, title);
export const abs = (path: string): string => core.abs(path);
export const realChapterTitle = (num: number, title?: string): string | null => core.realChapterTitle(num, title);
export const getGuideSEOData = (path: string, guide: object): { seoTitle: string; seoDescription: string; canonicalUrl: string; schemas: object[] } =>
  core.getGuideSEOData(path, guide);
