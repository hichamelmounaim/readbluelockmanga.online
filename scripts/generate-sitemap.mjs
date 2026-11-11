// Builds public/sitemap.xml (and mirrors it to dist/ if dist exists)
// with XSL styling and tiered priority strategy. English only.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL } from '../utils/seo-core.js';
import { CHARACTERS_DATA } from '../data/characters.js';
import { GUIDES } from '../data/guides.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chaptersFile = path.join(root, 'public/data/chapters.json');
const chapters = fs.existsSync(chaptersFile) ? JSON.parse(fs.readFileSync(chaptersFile, 'utf8')) : [];
const today = new Date().toISOString().split('T')[0];

// Sort chapters numerically ascending and remove any potential duplicates
const chapterMap = new Map();
for (const ch of chapters) {
  if (ch && ch.number != null && !chapterMap.has(ch.number)) {
    chapterMap.set(ch.number, ch);
  }
}
const sortedChapters = Array.from(chapterMap.values()).sort((a, b) => a.number - b.number);

const staticRoutes = [
  '/',
  '/manga',
  '/characters',
  ...CHARACTERS_DATA.map(c => `/characters/${c.slug}`),
  ...Object.keys(GUIDES),
  '/about',
  '/privacy',
  '/terms',
  '/dmca',
  '/disclaimer'
];

function getStaticPriorityAndFreq(route) {
  if (route === '/') {
    return { priority: '1.0', changefreq: 'daily' };
  }
  if (route === '/manga') {
    return { priority: '0.9', changefreq: 'daily' };
  }
  if (route === '/characters' || route.startsWith('/characters/')) {
    return { priority: '0.8', changefreq: 'weekly' };
  }
  if (route.startsWith('/guide')) {
    return { priority: '0.8', changefreq: 'weekly' };
  }
  if (route === '/about') {
    return { priority: '0.7', changefreq: 'monthly' };
  }
  return { priority: '0.5', changefreq: 'monthly' };
}

function getChapterPriorityAndFreq(chNum) {
  const num = Number(chNum);
  if (num >= 350) {
    return { priority: '0.9', changefreq: 'weekly' };
  }
  return { priority: '0.8', changefreq: 'monthly' };
}

function buildUrlEntry(route, lastmod) {
  const { priority, changefreq } = getStaticPriorityAndFreq(route);
  return `  <url>
    <loc>${SITE_URL}${route === '/' ? '/' : route}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
  </url>`;
}

function buildChapterUrlEntry(ch) {
  const { priority, changefreq } = getChapterPriorityAndFreq(ch.number);
  const lastmod = ch.releaseDate ? String(ch.releaseDate).slice(0, 10) : undefined;
  return `  <url>
    <loc>${SITE_URL}/chapter/${ch.number}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
  </url>`;
}

function wrapUrlset(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;
}

const entries = [];
const seenLocs = new Set();

for (const r of staticRoutes) {
  const loc = `${SITE_URL}${r === '/' ? '/' : r}`;
  if (!seenLocs.has(loc)) {
    seenLocs.add(loc);
    const lastmod = (r === '/' || r === '/manga') ? today : undefined;
    entries.push(buildUrlEntry(r, lastmod));
  }
}

// Only chapters with pages
for (const ch of sortedChapters) {
  if ((ch.pageCount || 0) <= 0) continue;
  const loc = `${SITE_URL}/chapter/${ch.number}`;
  if (!seenLocs.has(loc)) {
    seenLocs.add(loc);
    entries.push(buildChapterUrlEntry(ch));
  }
}

const distDir = path.join(root, 'dist');
const saveXml = (fileName, xmlContent) => {
  fs.writeFileSync(path.join(root, 'public', fileName), xmlContent, 'utf8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, fileName), xmlContent, 'utf8');
  }
};

saveXml('sitemap.xml', wrapUrlset(entries));

// Remove old sitemap_fr.xml and sitemap_pt.xml if they exist
for (const oldFile of ['sitemap_fr.xml', 'sitemap_pt.xml']) {
  const pubPath = path.join(root, 'public', oldFile);
  if (fs.existsSync(pubPath)) fs.unlinkSync(pubPath);
  const distPath = path.join(distDir, oldFile);
  if (fs.existsSync(distPath)) fs.unlinkSync(distPath);
}

// Mirror sitemap.xsl if dist exists
const xslSrc = path.join(root, 'public', 'sitemap.xsl');
if (fs.existsSync(xslSrc) && fs.existsSync(distDir)) {
  fs.copyFileSync(xslSrc, path.join(distDir, 'sitemap.xsl'));
}

console.log(`[OK] Sitemap generated: public/sitemap.xml (${seenLocs.size} English URLs)`);
