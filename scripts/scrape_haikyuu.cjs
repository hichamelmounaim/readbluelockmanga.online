const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const scrapedFilePath = path.join(projectRoot, 'scraped_haikyuu.json');
const publicDir = path.join(projectRoot, 'public');
const dataDir = path.join(publicDir, 'data');
const chaptersDir = path.join(dataDir, 'chapters');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(chaptersDir)) fs.mkdirSync(chaptersDir, { recursive: true });

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5'
};

async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      if (res.status === 404) return null;
      console.warn(`Attempt ${i + 1} for ${url} returned status ${res.status}. Retrying...`);
    } catch (e) {
      console.warn(`Attempt ${i + 1} for ${url} failed: ${e.message}. Retrying...`);
    }
    await new Promise(r => setTimeout(r, delay * (i + 1)));
  }
  return null;
}

async function getChapterPagesFromReadHaikyuu(chNum) {
  const url = `https://readhaikyuumanga.com/manga/haikyuu-chapter-${chNum}/`;
  const res = await fetchWithRetry(url, { headers }, 2, 800);
  if (!res) return [];
  const html = await res.text();
  const imgs = [...html.matchAll(/<img[^>]+(?:data-src|src)=["'](https:\/\/www\.mangaread\.org\/[^"']+)["'][^>]*>/gi)]
    .map(m => m[1])
    .filter(u => !u.includes('logo') && !u.includes('banner') && !u.includes('favicon'));
  return imgs;
}

async function scrapeHaikyuu() {
  console.log('--- Step 1: Fetching chapter list from w72.haikyumanga.com ---');
  const indexRes = await fetchWithRetry('https://w72.haikyumanga.com/', { headers });
  if (!indexRes) {
    throw new Error('Failed to fetch w72.haikyumanga.com homepage!');
  }
  const indexHtml = await indexRes.text();

  const regex = /<a[^>]+href=["'](https:\/\/w72\.haikyumanga\.com\/manga\/[^"']+)["'][^>]*>(.*?)<\/a>/gi;
  const rawList = [];
  for (const m of indexHtml.matchAll(regex)) {
    const url = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (!url.includes('/manga/haikyuu-chapter-')) continue;

    const numMatch = text.match(/Chapter\s+([0-9]+(?:\.[0-9]+)?)/i) || url.match(/haikyuu-chapter-([0-9]+(?:\.[0-9]+)?)/i);
    const num = numMatch ? parseFloat(numMatch[1]) : null;
    let title = text.replace(/^Haikyuu!!,?\s*/i, '').replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").trim();
    if (!title || title.toLowerCase() === `chapter ${num}`) {
      title = `Chapter ${num}`;
    }

    if (num !== null) {
      rawList.push({ url, num, title });
    }
  }

  // Deduplicate by chapter number
  const chapterMap = new Map();
  for (const item of rawList) {
    if (!chapterMap.has(item.num)) {
      chapterMap.set(item.num, item);
    }
  }

  // Also check if any chapters from 1 to 402 are missing from w72 list
  for (let i = 1; i <= 402; i++) {
    if (!chapterMap.has(i)) {
      chapterMap.set(i, {
        url: `https://readhaikyuumanga.com/manga/haikyuu-chapter-${i}/`,
        num: i,
        title: `Chapter ${i}`
      });
    }
  }

  const allChapters = Array.from(chapterMap.values()).sort((a, b) => a.num - b.num);
  console.log(`Found ${allChapters.length} chapters to scrape (range: ${allChapters[0].num} to ${allChapters[allChapters.length - 1].num}).`);

  // Series start date for Haikyuu: February 20, 2012
  const SERIES_START = new Date("2012-02-20T00:00:00Z").getTime();
  const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

  // Let's load any existing scraped data if available to allow resume
  let existingScraped = {};
  if (fs.existsSync(scrapedFilePath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(scrapedFilePath, 'utf8'));
      if (prev && prev.chapters) {
        for (const ch of prev.chapters) {
          if (ch.image_urls && ch.image_urls.length > 0) {
            existingScraped[ch.chapter_number] = ch;
          }
        }
        console.log(`Loaded ${Object.keys(existingScraped).length} previously scraped chapters.`);
      }
    } catch (e) {
      console.warn('Could not read existing scraped file:', e.message);
    }
  }

  const scrapedChapters = [];
  const BATCH_SIZE = 12;

  for (let i = 0; i < allChapters.length; i += BATCH_SIZE) {
    const batch = allChapters.slice(i, i + BATCH_SIZE);
    console.log(`Scraping chapters ${batch[0].num}..${batch[batch.length - 1].num} (${i + 1}/${allChapters.length})...`);

    const batchResults = await Promise.all(batch.map(async (ch) => {
      // If already scraped with valid pages, reuse
      if (existingScraped[ch.num] && existingScraped[ch.num].image_urls?.length > 0) {
        return existingScraped[ch.num];
      }

      let pages = [];
      let sourceUsed = 'w72';

      try {
        const res = await fetchWithRetry(ch.url, { headers }, 2, 500);
        if (res) {
          const html = await res.text();
          pages = [...html.matchAll(/<img[^>]+src=["'](https:\/\/blogger\.googleusercontent\.com\/[^"']+)["'][^>]*>/gi)].map(m => m[1]);
          if (pages.length === 0) {
            // Try generic image match in content
            pages = [...html.matchAll(/<img[^>]+(?:src|data-src)=["']([^"']+\.(?:jpg|jpeg|png|webp))["'][^>]*>/gi)]
              .map(m => m[1])
              .filter(u => !u.includes('logo') && !u.includes('favicon') && !u.includes('banner') && !u.includes('avatar'));
          }
        }
      } catch (err) {
        console.warn(`Error scraping w72 for ch ${ch.num}: ${err.message}`);
      }

      // Fallback to readhaikyuumanga.com if 0 pages
      if (pages.length === 0) {
        sourceUsed = 'readhaikyuumanga (fallback)';
        try {
          pages = await getChapterPagesFromReadHaikyuu(ch.num);
        } catch (err) {
          console.warn(`Fallback failed for ch ${ch.num}: ${err.message}`);
        }
      }

      const releaseDate = new Date(SERIES_START + (Math.max(1, Math.floor(ch.num)) - 1) * MS_PER_WEEK).toISOString();

      return {
        chapter_number: ch.num,
        chapter_title: ch.title,
        release_date: releaseDate,
        image_urls: pages,
        source: sourceUsed
      };
    }));

    scrapedChapters.push(...batchResults);
    // Brief breather between batches to be gentle
    await new Promise(r => setTimeout(r, 200));
  }

  // Save full scraped result
  const finalOutput = {
    title: "Haikyu!!",
    japaneseTitle: "ハイキュー!!",
    romajiTitle: "Haikyū!!",
    author: "Haruichi Furudate",
    magazine: "Weekly Shōnen Jump",
    publisher: "Shueisha",
    status: "Completed",
    genres: ["Sports", "Comedy", "Drama", "School", "Shounen", "Volleyball"],
    synopsis: "Shōyō Hinata, inspired by the 'Little Giant' of Karasuno High, joins his junior high volleyball club. After suffering a crushing defeat against Tobio Kageyama, known as the 'King of the Court', Hinata vows to surpass him in high school. But upon entering Karasuno High, he discovers that Kageyama is now his teammate! Combining Hinata's insane athletic jumping with Kageyama's pinpoint sets, the unlikely duo forms an explosive quick attack that propels the fallen powerhouse Karasuno back towards the national stage.",
    chapters: scrapedChapters
  };

  fs.writeFileSync(scrapedFilePath, JSON.stringify(finalOutput, null, 2), 'utf8');
  console.log(`\n[OK] Saved all chapters to ${scrapedFilePath}`);

  // Now generate public/data/chapters.json and public/data/chapters/{num}.json
  console.log('Generating public/data/ chapter files...');
  const chapterSummaries = [];
  
  // Sort descending (latest chapter first)
  const sorted = [...scrapedChapters].sort((a, b) => b.chapter_number - a.chapter_number);

  for (const ch of sorted) {
    const num = ch.chapter_number;
    const cleanTitle = ch.chapter_title && ch.chapter_title.trim() ? ch.chapter_title.trim() : `Chapter ${num}`;
    const releaseDate = ch.release_date;
    const pages = ch.image_urls || [];

    const summaryItem = {
      id: String(num),
      number: num,
      title: cleanTitle,
      releaseDate: releaseDate,
      pageCount: pages.length,
      pageCountFr: 0,
      pageCountPt: 0
    };
    chapterSummaries.push(summaryItem);

    const detailItem = {
      id: String(num),
      number: num,
      title: cleanTitle,
      releaseDate: releaseDate,
      pages: pages,
      pagesFr: [],
      pagesPt: []
    };

    fs.writeFileSync(
      path.join(chaptersDir, `${num}.json`),
      JSON.stringify(detailItem),
      'utf8'
    );
  }

  // Write chapter index
  fs.writeFileSync(
    path.join(dataDir, 'chapters.json'),
    JSON.stringify(chapterSummaries),
    'utf8'
  );

  // Write manga meta
  const mangaMeta = {
    title: "Haikyu!!",
    japaneseTitle: "ハイキュー!!",
    romajiTitle: "Haikyū!!",
    authors: ["Haruichi Furudate (Story & Art)"],
    magazine: "Weekly Shōnen Jump",
    publisher: "Shueisha",
    status: "Completed",
    genres: ["Sports", "Comedy", "Drama", "School", "Shounen", "Volleyball"],
    synopsis: finalOutput.synopsis,
    totalChapters: chapterSummaries.length,
    latestChapter: chapterSummaries[0]?.number || 402
  };

  fs.writeFileSync(
    path.join(dataDir, 'manga-meta.json'),
    JSON.stringify(mangaMeta, null, 2),
    'utf8'
  );

  console.log(`[OK] Successfully created ${chapterSummaries.length} chapters in ${chaptersDir}`);
  console.log(`[OK] Generated ${path.join(dataDir, 'chapters.json')}`);
  console.log(`[OK] Generated ${path.join(dataDir, 'manga-meta.json')}`);

  // Summary statistics
  const withPages = chapterSummaries.filter(c => c.pageCount > 0).length;
  console.log(`\n=== Summary ===`);
  console.log(`Total Chapters: ${chapterSummaries.length}`);
  console.log(`Chapters with readable pages: ${withPages} (${((withPages / chapterSummaries.length) * 100).toFixed(1)}%)`);
}

scrapeHaikyuu().catch(e => {
  console.error('Scrape failed:', e);
  process.exit(1);
});

