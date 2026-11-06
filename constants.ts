import { Arc, Chapter, Character, Comment } from "./types";
import chapterSummaries from "./public/data/chapters.json";

export const MOCK_CHAPTERS: Chapter[] = (chapterSummaries as any[]).map(ch => ({
  id: String(ch.id || ch.number),
  number: ch.number,
  title: ch.title || `Chapter ${ch.number}`,
  releaseDate: ch.releaseDate,
  pageCount: ch.pageCount ?? 0,
  pages: []
}));


import { CHARACTERS_DATA } from "./data/characters.js";
import { ARCS_DATA } from "./data/arcs.js";

export const CHARACTERS: Character[] = CHARACTERS_DATA as Character[];

const LATEST_READABLE = Math.max(...MOCK_CHAPTERS.filter(c => (c.pageCount ?? 0) > 0).map(c => Math.floor(c.number)));

// Ongoing arcs end at the latest chapter with pages.
export const ARCS: Arc[] = (ARCS_DATA as any[]).map(a => ({ ...a, chapterEnd: a.chapterEnd ?? LATEST_READABLE })) as Arc[];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    user: "IsagiEgoist",
    content: "Yoichi's Two-Gun Volley was one of the most insane moments in sports manga history! The development from Chapter 1 to Neo Egoist is unreal.",
    date: "1 hour ago",
    likes: 342
  },
  {
    id: "2",
    user: "BachiraMonster",
    content: "The art by Yusuke Nomura on the double-page spreads is always breathtaking. Can't wait for the next chapter release!",
    date: "3 hours ago",
    likes: 215
  },
  {
    id: "3",
    user: "KaiserImpact",
    content: "Bastard Munchen vs PXG has been the peak of football manga. Weekly chapter drops here are super fast!",
    date: "1 day ago",
    likes: 189
  }
];
