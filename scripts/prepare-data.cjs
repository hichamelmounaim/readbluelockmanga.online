const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const scrapedFilePath = path.join(projectRoot, 'scraped_haikyuu.json');
const publicDir = path.join(projectRoot, 'public');
const dataDir = path.join(publicDir, 'data');
const chaptersDir = path.join(dataDir, 'chapters');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(chaptersDir)) fs.mkdirSync(chaptersDir, { recursive: true });

console.log('Reading base scraped data from:', scrapedFilePath);
if (!fs.existsSync(scrapedFilePath)) {
  console.log('scraped_haikyuu.json not found, verifying existing public data...');
  if (fs.existsSync(path.join(dataDir, 'chapters.json'))) {
    console.log('[OK] Existing public/data/chapters.json already present.');
    process.exit(0);
  } else {
    console.error('Neither scraped_haikyuu.json nor chapters.json found! Run scripts/scrape_haikyuu.cjs first.');
    process.exit(1);
  }
}

const rawData = fs.readFileSync(scrapedFilePath, 'utf8');
const mangaData = JSON.parse(rawData);

// Strip the "Chapter N – " prefix the scraper adds; fall back to "Chapter N".
// Known titles the scrape is missing.
const TITLE_OVERRIDES = { 1: 'The End & The Beginning', 378: 'The Final Boss' };
const cleanChapterTitle = (num, raw) => {
  if (TITLE_OVERRIDES[num]) return TITLE_OVERRIDES[num];
  const t = String(raw || '').trim().replace(/^(ch\.?|chapter)\s*[\d.]+\s*[–—:\-]\s*/i, '').trim();
  return t && !/^(ch\.?|chapter)\s*[\d.]+$/i.test(t) ? t : `Chapter ${num}`;
};

// Base chapters map by number
const chaptersMap = new Map();

for (const ch of mangaData.chapters) {
  const num = ch.chapter_number;
  // Skip placeholder chapters with no scans (e.g. a non-existent "Chapter 403").
  if (!(ch.image_urls || []).length) continue;
  chaptersMap.set(num, {
    number: num,
    title: cleanChapterTitle(num, ch.chapter_title),
    image_urls: ch.image_urls || []
  });
}

// Sort descending (latest chapter first)
const sortedChapters = Array.from(chaptersMap.values()).sort((a, b) => b.number - a.number);
const chapterIndex = [];

for (const ch of sortedChapters) {
  const chNum = ch.number;
  const cleanTitle = ch.title || `Chapter ${chNum}`;
  const pagesEn = ch.image_urls || [];

  const summaryItem = {
    id: String(chNum),
    number: chNum,
    title: cleanTitle,
    pageCount: pagesEn.length
  };
  chapterIndex.push(summaryItem);

  const detailItem = {
    id: String(chNum),
    number: chNum,
    title: cleanTitle,
    pages: pagesEn
  };

  fs.writeFileSync(
    path.join(chaptersDir, `${chNum}.json`),
    JSON.stringify(detailItem),
    'utf8'
  );
}

// Write chapters index to public/data/chapters.json (for runtime fetch) and data/chapters.json (for bundler import)
fs.writeFileSync(
  path.join(dataDir, 'chapters.json'),
  JSON.stringify(chapterIndex),
  'utf8'
);

const srcDataDir = path.join(projectRoot, 'data');
if (!fs.existsSync(srcDataDir)) fs.mkdirSync(srcDataDir, { recursive: true });
fs.writeFileSync(
  path.join(srcDataDir, 'chapters.json'),
  JSON.stringify(chapterIndex),
  'utf8'
);

// Clean up Manga Meta
const mangaMeta = {
  title: "Haikyu!!",
  japaneseTitle: "ハイキュー!!",
  romajiTitle: "Haikyū!!",
  authors: ["Haruichi Furudate (Story & Art)"],
  magazine: "Weekly Shōnen Jump",
  publisher: "Shueisha",
  status: "Completed (402 Chapters)",
  genres: ["Sports", "Comedy", "Drama", "School", "Shounen", "Volleyball"],
  synopsis: mangaData.synopsis || "Shoyo Hinata, inspired by the 'Little Giant', joins his junior high volleyball club. Partnering with genius setter Tobio Kageyama, they revive the fallen powerhouse Karasuno High School.",
  totalChapters: chapterIndex.length,
  latestChapter: chapterIndex[0]?.number || 402
};

fs.writeFileSync(
  path.join(dataDir, 'manga-meta.json'),
  JSON.stringify(mangaMeta, null, 2),
  'utf8'
);

console.log(`[OK] Successfully merged & chunked ${chapterIndex.length} chapters into ${chaptersDir}`);
console.log(`[OK] Generated ${path.join(dataDir, 'chapters.json')} (${(fs.statSync(path.join(dataDir, 'chapters.json')).size / 1024).toFixed(1)} KB)`);
