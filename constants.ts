import { Arc, Chapter, Character, Comment } from "./types";
import chapterSummaries from "./data/chapters.json";

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

export const ARCS: Arc[] = (ARCS_DATA as any[]).map(a => ({ ...a, chapterEnd: a.chapterEnd ?? LATEST_READABLE })) as Arc[];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    user: "KarasunoFlyHigh",
    content: "Hinata's open-tempo jump receive against Inarizaki was pure goosebumps! The growth from Chapter 1 to the Nationals is peak sports storytelling.",
    date: "1 hour ago",
    likes: 420
  },
  {
    id: "2",
    user: "OikawaGrandKing",
    content: "The art by Haruichi Furudate during the Karasuno vs Nekoma Dumpster Battle is breathtaking. Every panel is drenched in kinetic energy and emotion.",
    date: "3 hours ago",
    likes: 315
  },
  {
    id: "3",
    user: "BokutoHeyHeyHey",
    content: "Chapter 402 was the absolute perfect conclusion. The V.League match with Black Jackals vs Adlers delivered everything fans could have ever dreamed of!",
    date: "1 day ago",
    likes: 278
  }
];
