const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const scrapedFilePath = path.join(projectRoot, 'scraped_nlrjm4-blue-lock.json');
const newChaptersPath = path.join(__dirname, 'scraped_new_chapters.json');
const ptChaptersPath = path.join(__dirname, 'pt-chapters.mjs');
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

// Load Portuguese chapters from pt-chapters.mjs
let ptData = {};
try {
  if (fs.existsSync(ptChaptersPath)) {
    const ptFile = fs.readFileSync(ptChaptersPath, 'utf8');
    const jsonMatch = ptFile.match(/export\s+default\s+({[\s\S]+});/);
    if (jsonMatch) {
      ptData = eval('(' + jsonMatch[1] + ')');
    }
  }
} catch (e) {
  console.warn('Warning: Could not parse pt-chapters.mjs:', e.message);
}

// French scans page count mapping
const qFr = {343:19, 344:19, 345:21, 346:16, 347:17, 348:20, 349:18, 350:22, 351:20, 352:20, 353:20, 354:19, 355:18, 356:20, 357:19, 358:19, 359:19, 360:18, 361:19, 362:18, 363:20, 364:9};

function getPagesFr(num) {
  if (num === 365) return Array.from({length: 20}, (_, a) => `https://anime-sama.to/s2/scans/Blue%20Lock%20%20/366/${a+1}.jpg`);
  if (num === 366) return Array.from({length: 17}, (_, a) => `https://anime-sama.to/s2/scans/Blue%20Lock%20%20/367/${a+1}.jpg`);
  if (num === 364.2) return Array.from({length: 11}, (_, a) => `https://anime-sama.to/s2/scans/Blue%20Lock%20%20/365/${a+1}.jpg`);
  if (num > 366 || num % 1 !== 0) return [];
  const count = qFr[num] || 20;
  return Array.from({length: count}, (_, t) => `https://anime-sama.to/s2/scans/Blue%20Lock%20%20/${num}/${t+1}.jpg`);
}

function getMangafreakFolderName(num) {
  if (num === 364.2) return 'blue_lock_364b';
  if (num === 346.2) return 'blue_lock_346b';
  if (num === 340.2) return 'blue_lock_340b';
  if (num === 327.2) return 'blue_lock_327b';
  if (num === 314.1 || num === 314.2) return 'blue_lock_314b';
  return `blue_lock_${num}`;
}

function getEnglishPages(num, baseUrls = []) {
  if (num === 367 || num === 368) return [];
  // Use newest chapters from scraped_new_chapters.json if available
  if (newChaptersData[String(num)]) {
    return newChaptersData[String(num)];
  }
  // If baseUrls point to dead host s11-95168.t34798ndc.com, replace with MangaFreak working URLs
  const folder = getMangafreakFolderName(num);
  const count = (baseUrls && baseUrls.length > 0)
    ? baseUrls.length
    : (num === 1 ? 75 : num === 2 ? 73 : 20);

  return Array.from({ length: count }, (_, i) =>
    `https://images.mangafreak.me/mangas/blue_lock/${folder}/${folder}_${i + 1}.jpg`
  );
}

const SERIES_START = new Date("2018-08-01T00:00:00Z").getTime();
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

// Base chapters map by number
const chaptersMap = new Map();

for (const ch of mangaData.chapters) {
  const num = ch.chapter_number;
  chaptersMap.set(num, {
    number: num,
    title: ch.chapter_title && ch.chapter_title.trim() ? ch.chapter_title.trim() : `Chapter ${num}`,
    image_urls: getEnglishPages(num, ch.image_urls)
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

// Add upcoming chapters 367 and 368
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

  const pagesEn = ch.image_urls || [];
  const pagesFr = getPagesFr(chNum);
  const pagesPt = ptData[String(chNum)] || ptData[chNum] || [];

  const summaryItem = {
    id: String(chNum),
    number: chNum,
    title: cleanTitle,
    releaseDate,
    pageCount: pagesEn.length,
    pageCountFr: pagesFr.length,
    pageCountPt: pagesPt.length
  };
  chapterIndex.push(summaryItem);

  const detailItem = {
    id: String(chNum),
    number: chNum,
    title: cleanTitle,
    releaseDate,
    pages: pagesEn,
    pagesFr,
    pagesPt
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
