// Builds public/sitemap.xml, public/sitemap_fr.xml, and public/sitemap_pt.xml
// (and mirrors them to dist/ if dist exists) with XSL styling and tiered priority strategy.
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

// Paths that exist (prerendered, self-canonical) in every language.
const multilingualRoutes = [
  '/',
  '/manga',
  '/characters',
  ...CHARACTERS_DATA.map(c => `/characters/${c.slug}`),
];
// English-only paths: guides are not prerendered under /fr or /pt (those URLs 404), and the
// FR/PT copies of legal pages canonicalize to English. They belong in sitemap.xml only.
const englishOnlyRoutes = [
  ...Object.keys(GUIDES),
  '/about', '/privacy', '/terms', '/dmca', '/disclaimer'
];
const staticRoutes = [...multilingualRoutes, ...englishOnlyRoutes];
const LANGS = ['en', 'fr', 'pt'];
const COUNT_KEY = { en: 'pageCount', fr: 'pageCountFr', pt: 'pageCountPt' };
const chapterLangs = (ch) => LANGS.filter(l => (ch[COUNT_KEY[l]] || 0) > 0);
const urlFor = (baseRoute, lang) => lang === 'en'
  ? `${SITE_URL}${baseRoute}`
  : `${SITE_URL}/${lang}${baseRoute === '/' ? '' : baseRoute}`;
const altLinks = (baseRoute, langs) => {
  if (langs.length < 2) return '';
  const lines = langs.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(baseRoute, l)}" />`);
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(baseRoute, langs.includes('en') ? 'en' : langs[0])}" />`);
  return '\n' + lines.join('\n');
};

function getStaticPriorityAndFreq(baseRoute, lang) {
  if (baseRoute === '/') {
    return {
      priority: lang === 'en' ? '1.0' : '0.9',
      changefreq: 'daily'
    };
  }
  if (baseRoute === '/manga') {
    return {
      priority: lang === 'en' ? '0.9' : '0.8',
      changefreq: 'daily'
    };
  }
  if (baseRoute === '/characters' || baseRoute.startsWith('/characters/')) {
    return {
      priority: lang === 'en' ? '0.8' : '0.7',
      changefreq: 'weekly'
    };
  }
  if (baseRoute.startsWith('/guide')) {
    return {
      priority: lang === 'en' ? '0.8' : '0.7',
      changefreq: 'weekly'
    };
  }
  if (baseRoute === '/about') {
    return {
      priority: lang === 'en' ? '0.7' : '0.6',
      changefreq: 'monthly'
    };
  }
  // Policy & legal pages
  return {
    priority: '0.5',
    changefreq: 'monthly'
  };
}

function getChapterPriorityAndFreq(chNum, lang) {
  const num = Number(chNum);
  if (num >= 350) {
    return {
      priority: lang === 'en' ? '1.0' : '0.9',
      changefreq: 'weekly'
    };
  }
  if (num >= 300) {
    return {
      priority: lang === 'en' ? '0.9' : '0.8',
      changefreq: 'weekly'
    };
  }
  return {
    priority: '0.8',
    changefreq: 'weekly'
  };
}

function buildUrlEntry(baseRoute, lang, lastmod) {
  const langs = englishOnlyRoutes.includes(baseRoute) ? ['en'] : LANGS;
  const { priority, changefreq } = getStaticPriorityAndFreq(baseRoute, lang);

  return `  <url>
    <loc>${urlFor(baseRoute, lang)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>${altLinks(baseRoute, langs)}
  </url>`;
}

function buildChapterUrlEntry(ch, lang) {
  const baseRoute = `/chapter/${ch.number}`;
  const { priority, changefreq } = getChapterPriorityAndFreq(ch.number, lang);
  const lastmod = ch.releaseDate ? String(ch.releaseDate).slice(0, 10) : undefined;

  return `  <url>
    <loc>${urlFor(baseRoute, lang)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>${altLinks(baseRoute, chapterLangs(ch))}
  </url>`;
}

function wrapUrlset(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

// Helper to assemble unique entries for a language
function buildSitemapList(lang) {
  const entries = [];
  const seenLocs = new Set();

  for (const r of (lang === 'en' ? staticRoutes : multilingualRoutes)) {
    const loc = urlFor(r, lang);
    if (!seenLocs.has(loc)) {
      seenLocs.add(loc);
      const lastmod = (r === '/' || r === '/manga') ? today : undefined;
      entries.push(buildUrlEntry(r, lang, lastmod));
    }
  }

  // Only chapters that have scans in this language (the others are noindex placeholders).
  for (const ch of sortedChapters) {
    if (!chapterLangs(ch).includes(lang)) continue;
    const loc = urlFor(`/chapter/${ch.number}`, lang);
    if (!seenLocs.has(loc)) {
      seenLocs.add(loc);
      entries.push(buildChapterUrlEntry(ch, lang));
    }
  }

  return { entries, count: seenLocs.size };
}

// 1. Build English sitemap (sitemap.xml with EN <loc> + hreflang alternates)
const enData = buildSitemapList('en');

// 2. Build French sitemap (sitemap_fr.xml with FR <loc> + hreflang alternates)
const frData = buildSitemapList('fr');

// 3. Build Portuguese sitemap (sitemap_pt.xml with PT <loc> + hreflang alternates)
const ptData = buildSitemapList('pt');

const distDir = path.join(root, 'dist');
const saveXml = (fileName, xmlContent) => {
  fs.writeFileSync(path.join(root, 'public', fileName), xmlContent, 'utf8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, fileName), xmlContent, 'utf8');
  }
};

saveXml('sitemap.xml', wrapUrlset(enData.entries));
saveXml('sitemap_fr.xml', wrapUrlset(frData.entries));
saveXml('sitemap_pt.xml', wrapUrlset(ptData.entries));

// Mirror sitemap.xsl if dist exists
const xslSrc = path.join(root, 'public', 'sitemap.xsl');
if (fs.existsSync(xslSrc) && fs.existsSync(distDir)) {
  fs.copyFileSync(xslSrc, path.join(distDir, 'sitemap.xsl'));
}

console.log(`[OK] Sitemaps generated with XSL stylesheet & tiered priority strategy:`);
console.log(`     - public/sitemap.xml: ${enData.count} URLs (English + hreflang alternates)`);
console.log(`     - public/sitemap_fr.xml: ${frData.count} URLs (French + hreflang alternates)`);
console.log(`     - public/sitemap_pt.xml: ${ptData.count} URLs (Portuguese + hreflang alternates)`);
