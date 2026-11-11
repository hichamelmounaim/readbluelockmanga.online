// Static prerender (SSG) for English routes.
// Writes dist/<route>/index.html with per-page <head> tags + crawlable body HTML,
// plus dist/404.html. Run after `vite build` (see package.json "build").
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, PAGE_META,
  getChapterSEOData, getCharacterSEOData, getAdjacentChapters, getArcInfo,
  realChapterTitle, breadcrumbSchema, homeSchemas, getGuideSEOData,
  HTML_LANG, OG_LOCALE, LANGS, buildAlternates,
  faqSchema, fillFaq, mangaListSchemas,
} from '../utils/seo-core.js';
import { CHARACTERS_DATA } from '../data/characters.js';
import { ARCS_DATA } from '../data/arcs.js';
import { HOME_FAQ } from '../data/home-faq.js';
import { GUIDES } from '../data/guides.js';
import { CHARACTERS_FAQ } from '../data/characters-faq.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');
const readJson = (p, fallback) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fallback);

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf8');
if (!template.includes('<!--SEO-HEAD-->') || !template.includes('<!--SEO-BODY-->')) {
  console.error('dist/index.html has already been prerendered (markers missing). Run `vite build` again first.');
  process.exit(1);
}

const chapters = readJson(path.join(root, 'public/data/chapters.json'), []);
const notes = readJson(path.join(root, 'data/chapter-notes.json'), {});
const meta = readJson(path.join(root, 'public/data/manga-meta.json'), {});
const characterSlugs = new Set(CHARACTERS_DATA.map(c => c.slug));

// ---------- helpers ----------
const esc = (v) => String(v ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

const UI = {
  chapter: 'Chapter',
  ch: 'Ch.',
  home: 'Home',
  allChapters: 'All Chapters',
  characters: 'Characters',
  read: (n, p) => `Read Haikyu!! Chapter ${n} in English online for free${p ? ` (${p} pages)` : ''}.`,
  notYet: (n) => `The scans for Haikyu!! Chapter ${n} are not available yet.`,
  whatHappens: (n) => `What Happens in Haikyu!! Chapter ${n}`,
  context: 'Context',
  keyPlayers: 'Key Players',
  nearby: 'Nearby chapters',
  startReading: 'Start reading: Chapter 1',
  latest: (n) => `Latest: Chapter ${n}`,
  latestList: 'Latest Haikyu!! Chapters',
  allChars: 'All characters',
  h1Suffix: ' – Read Online in English'
};

// Visible FAQ block
const faqHtml = (list, heading = 'Frequently Asked Questions') => `<section class="mt-10">
      <h2 class="text-2xl font-bold mb-4">${esc(heading)}</h2>
      ${list.map(f => `<h3 class="font-bold text-white mt-4 mb-1">${esc(f.q)}</h3>
      <p class="text-gray-400 text-sm">${esc(f.a)}</p>`).join('\n      ')}
    </section>`;

const chapterLabel = (c) => {
  const t = realChapterTitle(c.number, c.title);
  return `${UI.chapter} ${c.number}${t ? `: ${t}` : ''}`;
};

function headTags({ title, description, canonical, noindex = false, ogType = 'website', image = DEFAULT_OG_IMAGE, schemas = [], extra = '', alternates = [] }) {
  const altTags = noindex ? [] : alternates.map(a => `<link data-prerender rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}" />`);
  const tags = [
    `<title data-prerender>${esc(title)}</title>`,
    `<meta data-prerender property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta data-prerender name="description" content="${esc(description)}" />`,
    `<meta data-prerender name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    canonical && !noindex ? `<link data-prerender rel="canonical" href="${esc(canonical)}" />` : '',
    ...altTags,
    `<meta data-prerender property="og:locale" content="${OG_LOCALE.en}" />`,
    `<meta data-prerender property="og:type" content="${esc(ogType)}" />`,
    `<meta data-prerender property="og:title" content="${esc(title)}" />`,
    `<meta data-prerender property="og:description" content="${esc(description)}" />`,
    canonical ? `<meta data-prerender property="og:url" content="${esc(canonical)}" />` : '',
    `<meta data-prerender property="og:image" content="${esc(image)}" />`,
    image === DEFAULT_OG_IMAGE ? `<meta data-prerender property="og:image:width" content="1200" />\n  <meta data-prerender property="og:image:height" content="630" />` : '',
    `<meta data-prerender name="twitter:card" content="summary_large_image" />`,
    `<meta data-prerender name="twitter:title" content="${esc(title)}" />`,
    `<meta data-prerender name="twitter:description" content="${esc(description)}" />`,
    `<meta data-prerender name="twitter:image" content="${esc(image)}" />`,
    ...schemas.map(s => `<script data-prerender type="application/ld+json">${jsonLd(s)}</script>`),
    extra,
  ];
  return tags.filter(Boolean).join('\n  ');
}

function render(head, body) {
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="en"`)
    .replace('<!--SEO-HEAD-->', head)
    .replace('<!--SEO-BODY-->', body);
}

let written = 0;
function write(route, html) {
  const file = route === '/' ? path.join(distDir, 'index.html')
    : route === '/404' ? path.join(distDir, '404.html')
      : path.join(distDir, route.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
  written++;
}

const wrap = (inner) => {
  return `<div class="bg-[#121212] text-gray-100 min-h-screen">
    <nav class="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-4 text-sm font-bold">
      <a href="/" class="text-white">Haikyu!! Manga</a>
      <a href="/manga" class="text-gray-300">All Chapters</a>
      <a href="/characters" class="text-gray-300">Characters</a>
      <a href="/arcs" class="text-gray-300">Arcs</a>
      <a href="/anime" class="text-gray-300">Anime</a>
    </nav>
    ${inner}
    <footer class="max-w-5xl mx-auto px-4 py-10 text-xs text-gray-500 border-t border-white/10 flex flex-wrap gap-4">
      <a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/dmca">DMCA</a><a href="/disclaimer">Disclaimer</a>
      <span>Fan project. Not affiliated with Haruichi Furudate or Shueisha.</span>
    </footer>
  </div>`;
};

const asc = [...chapters].sort((a, b) => a.number - b.number);
const latest = chapters.filter(c => (c.pageCount ?? 1) > 0).sort((a, b) => b.number - a.number);
const latestInt = Math.floor(latest[0]?.number ?? 402);

// Clean up any old dist/fr or dist/pt folders
for (const langDir of ['fr', 'pt']) {
  const p = path.join(distDir, langDir);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
  }
}

// ---------- 1. Chapter pages (EN) ----------
for (const ch of chapters) {
  const { prev, next, nearby } = getAdjacentChapters(chapters, ch.number);
  const pCount = ch.pageCount || 0;

  const seo = getChapterSEOData(ch.number, {
    title: ch.title,
    pageCount: pCount,
    note: notes[String(ch.number)],
    lang: 'en',
    releaseDate: ch.releaseDate,
  });
  const featured = seo.featuredCharacters.filter(c => characterSlugs.has(c.slug));
  const chapterUrl = `/chapter/${ch.number}`;

  const body = wrap(`<article class="max-w-4xl mx-auto px-4 py-10">
      <p class="text-xs font-bold uppercase text-orange-500 mb-2"><a href="/arcs/${seo.arcSlug}">${esc(seo.arcName)}</a></p>
      <h1 class="text-3xl md:text-5xl font-heading font-bold mb-4">Haikyu!! Chapter ${ch.number}${seo.hasRealTitle ? `: ${esc(seo.title)}` : ''}${UI.h1Suffix}</h1>
      <p class="text-gray-400">${seo.noindex ? UI.notYet(ch.number) : UI.read(ch.number, pCount)}</p>
      <nav class="flex flex-wrap gap-3 my-6 text-sm font-semibold">
        ${prev ? `<a href="/chapter/${prev.number}" class="text-orange-400">← Chapter ${prev.number}</a>` : ''}
        <a href="/manga" class="text-gray-300">${UI.allChapters}</a>
        ${next ? `<a href="/chapter/${next.number}" class="text-orange-400">Chapter ${next.number} →</a>` : ''}
      </nav>
      <section class="border-t border-white/10 pt-6 text-gray-300 text-sm leading-relaxed">
        <h2 class="text-2xl font-bold text-white mb-3">${UI.whatHappens(ch.number)}</h2>
        <p class="mb-4">${esc(seo.summary)}</p>
        <p class="mb-4">${esc(seo.facts)}</p>
        <p class="text-gray-400 mb-6"><strong>${UI.context}:</strong> ${esc(seo.arcDescription)}</p>
        ${featured.length ? `<h3 class="text-sm font-bold uppercase text-gray-400 mb-3">${UI.keyPlayers}</h3>
        <ul class="flex flex-wrap gap-3 mb-6">${featured.map(c => `<li><a href="/characters/${c.slug}">${esc(c.name)}</a></li>`).join('')}</ul>` : ''}
        <h3 class="text-sm font-bold uppercase text-gray-400 mb-3">${UI.nearby}</h3>
        <ul class="flex flex-wrap gap-2">${nearby.map(c => `<li><a href="/chapter/${c.number}"${c.number === ch.number ? ' aria-current="page"' : ''}>${UI.ch} ${c.number}</a></li>`).join('')}</ul>
      </section>
    </article>`);

  write(chapterUrl, render(headTags({
    title: seo.seoTitle, description: seo.seoDescription, canonical: seo.canonicalUrl,
    noindex: seo.noindex, ogType: 'article', schemas: seo.noindex ? [] : seo.schemas,
    alternates: seo.alternateLinks,
  }), body));
}

// ---------- 2. Character pages (EN) ----------
for (const c of CHARACTERS_DATA) {
  const seo = getCharacterSEOData(c);
  const related = (c.relatedSlugs || []).map(s => CHARACTERS_DATA.find(x => x.slug === s)).filter(Boolean);
  const charUrl = `/characters/${c.slug}`;
  const alternates = buildAlternates(`/characters/${c.slug}`);

  const body = wrap(`<main class="max-w-4xl mx-auto px-4 py-10">
      <a href="/characters" class="text-orange-400 text-sm">← ${UI.allChars}</a>
      <h1 class="text-4xl md:text-5xl font-heading font-bold mt-4">${esc(c.name)}</h1>
      <p class="text-orange-400 text-sm font-bold mt-2">${esc(c.role)} • ${esc(c.grade)}</p>
      <img src="${esc(c.image)}" alt="${esc(c.name)} – Haikyu!!" width="230" height="345" class="my-6 rounded-xl" loading="eager" />
      <p class="text-lg text-gray-300 mb-6">${esc(c.description)}</p>
      <h2 class="text-xl font-bold text-white mb-2">Abilities &amp; Style</h2>
      <p class="text-gray-300 mb-2"><strong>Position / Weapon:</strong> ${esc(c.weapon)}</p>
      <p class="text-gray-300 mb-6">${esc(c.abilities)}</p>
      <h2 class="text-xl font-bold text-white mb-2">Biography</h2>
      <p class="text-gray-300 mb-2"><strong>First appearance:</strong> ${esc(c.firstAppearance)}</p>
      <p class="text-gray-300 mb-6">${esc(c.longDescription)}</p>
      ${c.keyChapters?.length ? `<h2 class="text-xl font-bold text-white mb-2">Key Chapters</h2>
      <ul class="mb-6">${c.keyChapters.map(k => `<li><a href="/chapter/${k.number}">${esc(k.label)}</a></li>`).join('')}</ul>` : ''}
      ${related.length ? `<h2 class="text-xl font-bold text-white mb-2">Teammates &amp; Rivals</h2>
      <ul class="flex flex-wrap gap-4 mb-6">${related.map(r => `<li><a href="/characters/${r.slug}" class="text-orange-400">${esc(r.name)}</a></li>`).join('')}</ul>` : ''}
    </main>`);

  write(charUrl, render(headTags({
    title: seo.seoTitle, description: seo.seoDescription, canonical: seo.canonicalUrl,
    ogType: 'profile', image: seo.ogImage, schemas: seo.schemas, alternates,
  }), body));
}

// ---------- 3. Characters hub (EN) ----------
{
  const route = '/characters';
  const metaObj = PAGE_META[route];
  const alternates = buildAlternates('/characters');
  const faq = CHARACTERS_FAQ;

  write(route, render(headTags({
    ...metaObj, canonical: `${SITE_URL}${route}`,
    schemas: [
      breadcrumbSchema([{ name: UI.home, path: '/' }, { name: UI.characters, path: route }]),
      ...(faq.length ? [faqSchema(faq)] : []),
    ],
    alternates,
  }), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4">Haikyu!! ${UI.characters}</h1>
      <p class="text-gray-300 mb-8">${esc(metaObj.description)}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        ${CHARACTERS_DATA.map(c => `<div class="bg-[#181818] rounded-xl overflow-hidden border border-white/5 p-4">
          <img src="${esc(c.image)}" alt="${esc(c.name)} – Haikyu!!" width="400" height="300" class="w-full aspect-[4/3] object-cover rounded-lg mb-3" loading="lazy" />
          <h2 class="text-xl font-bold"><a href="/characters/${c.slug}">${esc(c.name)}</a></h2>
          <p class="text-xs text-orange-400 font-bold uppercase mt-1 mb-2">${esc(c.role)}</p>
          <p class="text-sm text-gray-400 line-clamp-2">${esc(c.description)}</p>
        </div>`).join('\n        ')}
      </div>
      ${faq.length ? faqHtml(faq, 'Haikyu!! Characters FAQ') : ''}
    </main>`)));
}

// ---------- 4. Manga list / All chapters (EN) ----------
{
  const route = '/manga';
  const metaObj = PAGE_META[route];
  const alternates = buildAlternates('/manga');
  const list = latest.filter(c => (c.pageCount || 0) > 0);

  write(route, render(headTags({
    ...metaObj, canonical: `${SITE_URL}${route}`,
    schemas: mangaListSchemas(route, metaObj.title), alternates,
  }), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4">${esc(metaObj.title)}</h1>
      <p class="text-gray-300 mb-8">${esc(metaObj.description)}</p>
      <div class="space-y-3">
        ${list.map(c => `<div class="bg-[#181818] p-4 rounded-xl border border-white/5 flex justify-between items-center">
          <div>
            <a href="/chapter/${c.number}" class="text-lg font-bold hover:text-orange-400">${esc(chapterLabel(c))}</a>
            <p class="text-xs text-gray-400 mt-1">${(c.pageCount || 0)} pages</p>
          </div>
          <a href="/chapter/${c.number}" class="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg">${UI.read(c.number, 0).split(' ')[0]}</a>
        </div>`).join('\n        ')}
      </div>
    </main>`)));
}

// ---------- 5. Home (EN) ----------
{
  const route = '/';
  const metaObj = PAGE_META[route];
  const alternates = buildAlternates('/');
  const latestHere = latest.filter(c => (c.pageCount || 0) > 0);
  const h1 = 'Haikyu!! Manga Online';
  const faq = fillFaq(HOME_FAQ, latestInt);

  write(route, render(headTags({
    ...metaObj, canonical: `${SITE_URL}/`, schemas: homeSchemas(faq),
    extra: '<link data-prerender rel="preload" as="image" href="/haikyuu-banner.jpg" fetchpriority="high" />',
    alternates,
  }), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-5xl md:text-7xl font-heading font-extrabold mb-4">${h1}</h1>
      <p class="text-gray-300 mb-4">${esc(metaObj.description)}</p>
      <p class="mb-8 flex flex-wrap gap-4 font-bold">
        <a href="/chapter/1">${UI.startReading}</a>
        ${latestHere[0] ? `<a href="/chapter/${latestHere[0].number}">${UI.latest(latestHere[0].number)}</a>` : ''}
        <a href="/characters">${UI.characters}</a>
      </p>
      <h2 class="text-2xl font-bold mb-3">${UI.latestList}</h2>
      <ul class="flex flex-wrap gap-2 mb-8">${latestHere.slice(0, 12).map(c => `<li><a href="/chapter/${c.number}">${esc(chapterLabel(c))}</a></li>`).join('')}</ul>
      ${faq.length ? faqHtml(faq) : ''}
    </main>`)));
}

// /en redirects/canonicals to /
write('/en', render(headTags({
  ...PAGE_META['/'], canonical: `${SITE_URL}/`, schemas: homeSchemas(),
}), wrap(`<main class="max-w-5xl mx-auto px-4 py-10"><p>Redirecting to <a href="/">Haikyu!! Manga</a>...</p></main>`)));

// ---------- 6. About + legal (EN) ----------
const simplePages = {
  '/about': { h1: 'About Haikyu!! Manga', text: "Haikyu!! Manga is an independent fan project and reading archive for Haruichi Furudate's Haikyu!!." },
  '/privacy': { h1: 'Privacy Policy', text: 'How we handle data and protect the privacy of visitors to Haikyu!! Manga.' },
  '/terms': { h1: 'Terms and Conditions of Use', text: 'The terms of service, user agreements and conduct guidelines for Haikyu!! Manga.' },
  '/dmca': { h1: 'DMCA Copyright Notice & Takedown Policy', text: 'How to submit a DMCA copyright takedown notice to Haikyu!! Manga: email support@haikyuu.org.' },
  '/disclaimer': { h1: 'Legal Disclaimer & Fair Use Disclosure', text: 'Haikyu!! Manga is an unofficial fan project and is not affiliated with Haruichi Furudate, Shueisha or VIZ Media.' },
};

for (const [baseRoute, p] of Object.entries(simplePages)) {
  const metaObj = PAGE_META[baseRoute];
  write(baseRoute, render(headTags({
    ...metaObj, canonical: `${SITE_URL}${baseRoute}`,
    schemas: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: p.h1, path: baseRoute }])],
  }), wrap(`<main class="max-w-4xl mx-auto px-4 py-10">
      <h1 class="text-3xl md:text-5xl font-heading font-bold mb-6">${esc(p.h1)}</h1>
      <p class="text-gray-300">${esc(p.text)}</p>
    </main>`)));
}

// ---------- 7. Guide pages (anime, arcs, teams, author) ----------
for (const [route, g] of Object.entries(GUIDES)) {
  const seo = getGuideSEOData(route, g);
  const inRange = g.chapterRange
    ? asc.filter(c => (c.pageCount ?? 0) > 0 && c.number >= g.chapterRange[0] && (g.chapterRange[1] == null || c.number <= g.chapterRange[1]))
    : [];
  const linksHtml = (links) => links?.length ? `<p class="flex flex-wrap gap-3">${links.map(l => `<a href="${esc(l.to)}">${esc(l.label)}</a>`).join('')}</p>` : '';
  const body = wrap(`<main class="max-w-4xl mx-auto px-4 py-10">
      <nav class="text-sm text-gray-400 mb-4">${g.breadcrumbs.map((b, i) => i < g.breadcrumbs.length - 1 ? `<a href="${esc(b.path)}">${esc(b.name)}</a> › ` : esc(b.name)).join('')}</nav>
      ${g.kicker ? `<p class="text-orange-500 text-xs font-bold uppercase">${esc(g.kicker)}</p>` : ''}
      <h1 class="text-3xl md:text-5xl font-heading font-bold mb-4">${esc(g.h1)}</h1>
      ${(g.intro || []).map(p => `<p class="text-gray-300 text-lg mb-6">${esc(p)}</p>`).join('')}
      ${(g.sections || []).map(sec => `<section class="mb-8">
        <h2 class="text-2xl font-bold mb-3">${esc(sec.h2)}</h2>
        ${(sec.paras || []).map(p => `<p class="text-gray-300 mb-3">${esc(p)}</p>`).join('')}
        ${sec.list ? `<ul class="list-disc pl-6 text-gray-300">${sec.list.map(li => `<li>${esc(li)}</li>`).join('')}</ul>` : ''}
        ${linksHtml(sec.links)}
      </section>`).join('\n      ')}
      ${inRange.length ? `<section class="mb-8"><h2 class="text-2xl font-bold mb-3">Read this arc (${inRange.length} chapters)</h2>
        <ul class="flex flex-wrap gap-2 text-sm">${inRange.map(c => `<li><a href="/chapter/${c.number}">Ch. ${c.number}</a></li>`).join('')}</ul></section>` : ''}
    </main>`);
  write(route, render(headTags({
    title: seo.seoTitle, description: seo.seoDescription, canonical: seo.canonicalUrl, ogType: 'article', schemas: seo.schemas,
  }), body));
}

// ---------- 8. 404 ----------
write('/404', render(headTags({
  title: `Page Not Found – ${SITE_NAME}`, description: 'The page you are looking for does not exist.', noindex: true,
}), wrap(`<main class="max-w-3xl mx-auto px-4 py-24 text-center">
      <p class="text-orange-500 font-bold">404</p>
      <h1 class="text-4xl font-heading font-bold mb-4">Page not found</h1>
      <p class="text-gray-400 mb-6">This page doesn't exist or was moved.</p>
      <p class="flex justify-center gap-4"><a href="/">Home</a><a href="/manga">All Chapters</a><a href="/characters">Characters</a></p>
    </main>`)));

console.log(`[OK] Prerendered ${written} English pages for ${SITE_URL}`);
