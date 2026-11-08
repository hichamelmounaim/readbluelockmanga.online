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

// Base paths available across languages
const staticRoutes = [
  '/',
  '/manga',
  '/characters',
  ...CHARACTERS_DATA.map(c => `/characters/${c.slug}`),
  ...Object.keys(GUIDES),
  '/about', '/privacy', '/terms', '/dmca', '/disclaimer'
];

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
  let loc = '';
  if (lang === 'en') {
    loc = `${SITE_URL}${baseRoute}`;
  } else {
    loc = `${SITE_URL}/${lang}${baseRoute === '/' ? '' : baseRoute}`;
  }

  const enUrl = `${SITE_URL}${baseRoute}`;
  const frUrl = `${SITE_URL}/fr${baseRoute === '/' ? '' : baseRoute}`;
  const ptUrl = `${SITE_URL}/pt${baseRoute === '/' ? '' : baseRoute}`;

  const { priority, changefreq } = getStaticPriorityAndFreq(baseRoute, lang);

  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="fr" href="${frUrl}" />
    <xhtml:link rel="alternate" hreflang="pt" href="${ptUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
  </url>`;
}

function buildChapterUrlEntry(chNum, lang) {
  const enUrl = `${SITE_URL}/chapter/${chNum}`;
  const frUrl = `${SITE_URL}/fr/chapter/${chNum}`;
  const ptUrl = `${SITE_URL}/pt/chapter/${chNum}`;

  const loc = lang === 'en' ? enUrl : lang === 'fr' ? frUrl : ptUrl;
  const { priority, changefreq } = getChapterPriorityAndFreq(chNum, lang);

  return `  <url>
    <loc>${loc}</loc>
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="fr" href="${frUrl}" />
    <xhtml:link rel="alternate" hreflang="pt" href="${ptUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
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

  for (const r of staticRoutes) {
    const loc = lang === 'en' ? `${SITE_URL}${r}` : `${SITE_URL}/${lang}${r === '/' ? '' : r}`;
    if (!seenLocs.has(loc)) {
      seenLocs.add(loc);
      const lastmod = (r === '/' || r === '/manga') ? today : undefined;
      entries.push(buildUrlEntry(r, lang, lastmod));
    }
  }

  // Include ALL chapters up to the latest one (368+)
  for (const ch of sortedChapters) {
    const loc = lang === 'en' ? `${SITE_URL}/chapter/${ch.number}` : `${SITE_URL}/${lang}/chapter/${ch.number}`;
    if (!seenLocs.has(loc)) {
      seenLocs.add(loc);
      entries.push(buildChapterUrlEntry(ch.number, lang));
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
