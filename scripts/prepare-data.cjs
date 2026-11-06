const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const scrapedFilePath = path.join(projectRoot, 'scraped_nlrjm4-blue-lock.json');
const newChaptersPath = path.join(__dirname, 'scraped_new_chapters.json');
const publicDir = path.join(projectRoot, 'public');
const dataDir = path.join(publicDir, 'data');
const chaptersDir = path.join(dataDir, 'chapters');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(chaptersDir)) fs.mkdirSync(chaptersDir, { recursive: true });

console.log('Reading base scraped data from:', scrapedFilePath);
const rawData = fs.readFileSync(scrapedFilePath, 'utf8');
const mangaData = JSON.parse(rawData);

const newChaptersData = fs.existsSync(newChaptersPath)
  ? JSON.parse(fs.readFileSync(newChaptersPath, 'utf8'))
  : {};

const SERIES_START = new Date("2018-08-01T00:00:00Z").getTime();
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

// Base chapters map by number
const chaptersMap = new Map();

for (const ch of mangaData.chapters) {
  chaptersMap.set(ch.chapter_number, {
    number: ch.chapter_number,
    title: ch.chapter_title && ch.chapter_title.trim() ? ch.chapter_title.trim() : `Chapter ${ch.chapter_number}`,
    image_urls: ch.image_urls || []
  });
}

// Add/overwrite with new chapters from 355 to 366
for (const [chNumStr, pageUrls] of Object.entries(newChaptersData)) {
  const num = parseFloat(chNumStr);
  chaptersMap.set(num, {
    number: num,
    title: `Chapter ${num}`,
    image_urls: pageUrls || []
  });
}

// Add upcoming chapters 367 and 368 (for ranking and early indexation)
if (!chaptersMap.has(367)) {
  chaptersMap.set(367, {
    number: 367,
    title: "Chapter 367",
    image_urls: []
  });
}
if (!chaptersMap.has(368)) {
  chaptersMap.set(368, {
    number: 368,
    title: "Chapter 368",
    image_urls: []
  });
}

// Sort descending
const sortedChapters = Array.from(chaptersMap.values()).sort((a, b) => b.number - a.number);

const chapterIndex = [];

for (const ch of sortedChapters) {
  const chNum = ch.number;
  const releaseDate = new Date(SERIES_START + (Math.max(1, Math.floor(chNum)) - 1) * MS_PER_WEEK).toISOString();
  const cleanTitle = ch.title || `Chapter ${chNum}`;

  const summaryItem = {
    id: String(chNum),
    number: chNum,
    title: cleanTitle,
    releaseDate,
    pageCount: ch.image_urls ? ch.image_urls.length : 0
  };
  chapterIndex.push(summaryItem);

  const detailItem = {
    id: String(chNum),
    number: chNum,
    title: cleanTitle,
    releaseDate,
    pages: ch.image_urls || []
  };

  fs.writeFileSync(
    path.join(chaptersDir, `${chNum}.json`),
    JSON.stringify(detailItem),
    'utf8'
  );
}

// Write chapters index
fs.writeFileSync(
  path.join(dataDir, 'chapters.json'),
  JSON.stringify(chapterIndex),
  'utf8'
);

// Clean up Manga Meta
const cleanSynopsis = (mangaData.synopsis || '')
  .replace(/&#039;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const mangaMeta = {
  title: "Blue Lock",
  japaneseTitle: "ブルーロック",
  romajiTitle: "Buruu Rokku",
  authors: ["Muneyuki Kaneshiro (Story)", "Yusuke Nomura (Art)"],
  magazine: "Weekly Shonen Magazine",
  publisher: "Kodansha",
  status: "Ongoing Weekly",
  genres: ["Sports", "Drama", "Psychological", "Action", "Shounen"],
  synopsis: cleanSynopsis,
  totalChapters: chapterIndex.length,
  latestChapter: chapterIndex[0]?.number || 368
};

fs.writeFileSync(
  path.join(dataDir, 'manga-meta.json'),
  JSON.stringify(mangaMeta, null, 2),
  'utf8'
);

console.log(`[OK] Successfully merged & chunked ${chapterIndex.length} chapters (Latest: Ch. ${chapterIndex[0]?.number}) into ${chaptersDir}`);
console.log(`[OK] Generated ${path.join(dataDir, 'chapters.json')} (${(fs.statSync(path.join(dataDir, 'chapters.json')).size / 1024).toFixed(1)} KB)`);
