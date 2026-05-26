import { Arc, Chapter, Character, Comment } from "./types";
import mangaData from "./scraped_nlrjm4-blue-lock.json";

// Blue Lock serialization began on August 1, 2018
const SERIES_START = new Date("2018-08-01T00:00:00Z").getTime();
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export const MOCK_CHAPTERS: Chapter[] = [...mangaData.chapters]
  .sort((a, b) => b.chapter_number - a.chapter_number)
  .map(ch => ({
    id: String(ch.chapter_number),
    number: ch.chapter_number,
    title: ch.chapter_title,
    releaseDate: new Date(
      SERIES_START + (ch.chapter_number - 1) * MS_PER_WEEK
    ).toISOString(),
    pages: ch.image_urls,
  }));

export const CHARACTERS: Character[] = [
  {
    "id": "isagi",
    "name": "Yoichi Isagi",
    "role": "Protagonist",
    "grade": "Forward",
    "description": "The main protagonist. A striker who aims to become the world's best egoist striker.",
    "image": "https://picsum.photos/400/600?random=10"
  },
  {
    "id": "bachira",
    "name": "Meguru Bachira",
    "role": "Main Character",
    "grade": "Forward",
    "description": "A whimsical striker who plays following his instinct.",
    "image": "https://picsum.photos/400/600?random=11"
  },
  {
    "id": "kunigami",
    "name": "Rensuke Kunigami",
    "role": "Rival",
    "grade": "Forward",
    "description": "A striker with a powerful left-legged shot and sense of justice.",
    "image": "https://picsum.photos/400/600?random=12"
  },
  {
    "id": "rin",
    "name": "Rin Itoshi",
    "role": "Rival",
    "grade": "Forward",
    "description": "The top player in Blue Lock who plays with cold precision.",
    "image": "https://picsum.photos/400/600?random=17"
  }
];

export const ARCS: Arc[] = [
  {
    "id": "selection",
    "title": "First Selection",
    "description": "The 300 strikers compete in round-robin matches in teams.",
    "chapterStart": 1,
    "chapterEnd": 38,
    "image": "https://picsum.photos/600/300?random=20"
  },
  {
    "id": "second-selection",
    "title": "Second Selection",
    "description": "Teams of three steal teammates from losers to advance.",
    "chapterStart": 39,
    "chapterEnd": 87,
    "image": "https://picsum.photos/600/300?random=21"
  },
  {
    "id": "neo-egoist",
    "title": "Neo Egoist League",
    "description": "Strikers join European U-20 clubs to compete globally.",
    "chapterStart": 153,
    "chapterEnd": 346,
    "image": "https://picsum.photos/600/300?random=22"
  }
];

export const MOCK_COMMENTS: Comment[] = [
  {
    "id": "1",
    "user": "Fanatic99",
    "content": "Yoichi is devouring everyone! What an absolute legend.",
    "date": "2 hours ago",
    "likes": 155
  },
  {
    "id": "2",
    "user": "SeriesFan",
    "content": "Meguru is insane. Best character!",
    "date": "5 hours ago",
    "likes": 230
  },
  {
    "id": "3",
    "user": "Otaku",
    "content": "This manga is pure hype. The art is incredible.",
    "date": "1 day ago",
    "likes": 89
  }
];
