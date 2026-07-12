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
    "image": "https://picsum.photos/400/600?random=10",
    "slug": "yoichi-isagi",
    "abilities": "Spatial Awareness, Direct Shoot, Metavision, Egocentrism.",
    "weapon": "Direct Shoot / Metavision (Spatial Awareness)",
    "firstAppearance": "Chapter 1",
    "longDescription": "Yoichi Isagi is the main protagonist of Blue Lock. Initially a standard forward playing for Ichinan High School, Isagi's lack of egotism held him back from scoring. Upon entering Jinpachi Ego's Blue Lock project, Isagi began to unlock his latent talent for Spatial Awareness, enabling him to read the field, predict players' movements, and locate 'the smell of a goal.' His primary physical weapon is the Direct Shoot, which allows him to strike the ball cleanly without trapping it first, eliminating defenders' reaction times. Later, he develops 'Metavision' (a continuous, high-speed observation of the field using peripheral vision) and 'Egocentrism' to predict other players' selfish motives, making him a genius playmaker aiming to become the world's greatest egoist striker."
  },
  {
    "id": "bachira",
    "name": "Meguru Bachira",
    "role": "Main Character",
    "grade": "Forward",
    "description": "A whimsical striker who plays following his instinct.",
    "image": "https://picsum.photos/400/600?random=11",
    "slug": "meguru-bachira",
    "abilities": "Egoist Dribbling, Key Passes, Monster Playstyle.",
    "weapon": "Super-dribbling / Instinctive play",
    "firstAppearance": "Chapter 2",
    "longDescription": "Meguru Bachira is one of Yoichi Isagi's closest friends and allies in Blue Lock. A highly creative, whimsical forward, Bachira plays football following a 'monster' inside him that represents his pure footballing instinct. Bachira is the ultimate dribbler in Blue Lock, capable of bypassing multiple defenders with dynamic, unexpected skill moves, step-overs, and changes of pace. His playstyle is chaotic yet extremely precise, making him a major offensive thread as a winger or playmaker who can unlock any defense."
  },
  {
    "id": "kunigami",
    "name": "Rensuke Kunigami",
    "role": "Rival",
    "grade": "Forward",
    "description": "A striker with a powerful left-legged shot and sense of justice.",
    "image": "https://picsum.photos/400/600?random=12",
    "slug": "rensuke-kunigami",
    "abilities": "Knuckle Shot, Right & Left-legged high-power shots, physical dominance.",
    "weapon": "Left-foot middle-range shot / Wild Card physical specs",
    "firstAppearance": "Chapter 2",
    "longDescription": "Rensuke Kunigami is a powerful striker known for his exceptional physique and left-legged middle-range shots. Initially guided by a strong sense of sportsmanship and a desire to be a 'football hero,' Kunigami was eliminated during the Second Selection. However, he entered the secret 'Wild Card' program, which forced him to undergo brutal training to replicate the physical capabilities of Noel Noa (the world's top striker). He returned to the main tournament as a cold, muscular, ambidextrous beast, playing with pure clinical efficiency and physical dominance."
  },
  {
    "id": "rin",
    "name": "Rin Itoshi",
    "role": "Rival",
    "grade": "Forward",
    "description": "The top player in Blue Lock who plays with cold precision.",
    "image": "https://picsum.photos/400/600?random=17",
    "slug": "rin-itoshi",
    "abilities": "Puppeteer Soccer, Destructive Dribbling, Metavision, Kick Accuracy.",
    "weapon": "Absolute Kick Accuracy / Spatial Puppeteering",
    "firstAppearance": "Chapter 40",
    "longDescription": "Rin Itoshi is the top-ranked player in Blue Lock and the younger brother of world-class midfielder Sae Itoshi. Rin's football style is driven by a deep resentment toward his brother, playing with a cold, calculated precision. His main weapon is his absolute kick accuracy, allowing him to score direct free kicks, corners, or mid-range curve shots with perfect consistency. He is also a master strategist who uses 'Puppeteer Soccer' to manipulate opponents' movements to his advantage, later unlocking a primal 'Destructive Dribbling' style that destroys defenders' strengths individually."
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
