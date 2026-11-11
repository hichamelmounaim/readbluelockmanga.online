// Static prerender (SSG) for English, French, and Portuguese routes.
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
// UI strings used in the crawlable body, per language.
const UI = {
  en: { chapter: 'Chapter', ch: 'Ch.', home: 'Home', allChapters: 'All Chapters', characters: 'Characters',
    read: (n, p) => `Read Blue Lock Chapter ${n} in English online for free${p ? ` (${p} pages)` : ''}.`,
    notYet: (n) => `The scans for Blue Lock Chapter ${n} are not available yet.`,
    whatHappens: (n) => `What Happens in Blue Lock Chapter ${n}`, context: 'Context', keyStrikers: 'Key Strikers',
    nearby: 'Nearby chapters', startReading: 'Start reading: Chapter 1', latest: (n) => `Latest: Chapter ${n}`,
    latestList: 'Latest Blue Lock Chapters', allChars: 'All characters', h1Suffix: ' – Read Online in English' },
  fr: { chapter: 'Chapitre', ch: 'Ch.', home: 'Accueil', allChapters: 'Tous les chapitres', characters: 'Personnages',
    read: (n, p) => `Lire le scan Blue Lock chapitre ${n} VF en français, gratuitement${p ? ` (${p} pages)` : ''}.`,
    notYet: (n) => `Le scan VF de Blue Lock chapitre ${n} n'est pas encore disponible.`,
    whatHappens: (n) => `Que se passe-t-il dans Blue Lock chapitre ${n} ?`, context: 'Contexte', keyStrikers: 'Attaquants clés',
    nearby: 'Chapitres proches', startReading: 'Commencer : Chapitre 1', latest: (n) => `Dernier scan : Chapitre ${n}`,
    latestList: 'Derniers scans de Blue Lock', allChars: 'Tous les personnages', h1Suffix: ' VF – Scan en Ligne' },
  pt: { chapter: 'Capítulo', ch: 'Cap.', home: 'Início', allChapters: 'Todos os Capítulos', characters: 'Personagens',
    read: (n, p) => `Ler mangá Blue Lock capítulo ${n} em português (PT-BR) online grátis${p ? ` (${p} páginas)` : ''}.`,
    notYet: (n) => `O capítulo ${n} de Blue Lock em português ainda não está disponível.`,
    whatHappens: (n) => `O que acontece em Blue Lock capítulo ${n}`, context: 'Contexto', keyStrikers: 'Atacantes principais',
    nearby: 'Capítulos próximos', startReading: 'Começar: Capítulo 1', latest: (n) => `Último: Capítulo ${n}`,
    latestList: 'Últimos capítulos de Blue Lock', allChars: 'Todos os personagens', h1Suffix: ' – Ler em Português' },
};

const chapterLabel = (c, lang = 'en') => {
  const t = realChapterTitle(c.number, c.title);
  return `${UI[lang].chapter} ${c.number}${t ? `: ${t}` : ''}`;
};

function headTags({ title, description, canonical, noindex = false, ogType = 'website', image = DEFAULT_OG_IMAGE, schemas = [], extra = '', alternates = [], lang = 'en' }) {
  const altTags = noindex ? [] : alternates.map(a => `<link data-prerender rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}" />`);
  const tags = [
    `<title data-prerender>${esc(title)}</title>`,
    `<meta data-prerender name="description" content="${esc(description)}" />`,
    `<meta data-prerender name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    canonical && !noindex ? `<link data-prerender rel="canonical" href="${esc(canonical)}" />` : '',
    ...altTags,
    `<meta data-prerender property="og:locale" content="${OG_LOCALE[lang]}" />`,
    ...LANGS.filter(l => l !== lang).map(l => `<meta data-prerender property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
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

function render(head, body, lang = 'en') {
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${HTML_LANG[lang]}"`)
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

const wrap = (inner, lang = 'en') => {
  const homeLink = lang === 'fr' ? '/fr' : lang === 'pt' ? '/pt' : '/';
  const mangaLink = lang === 'fr' ? '/fr/manga' : lang === 'pt' ? '/pt/manga' : '/manga';
  const charsLink = lang === 'fr' ? '/fr/characters' : lang === 'pt' ? '/pt/characters' : '/characters';
  const homeText = lang === 'fr' ? 'Accueil' : lang === 'pt' ? 'Início' : 'Blue Lock Manga';
  const mangaText = lang === 'fr' ? 'Tous les chapitres' : lang === 'pt' ? 'Todos os Capítulos' : 'All Chapters';
  const charsText = lang === 'fr' ? 'Personnages' : lang === 'pt' ? 'Personagens' : 'Characters';

  return `<div class="bg-[#121212] text-gray-100 min-h-screen">
    <nav class="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-4 text-sm font-bold">
      <a href="${homeLink}" class="text-white">${homeText}</a>
      <a href="${mangaLink}" class="text-gray-300">${mangaText}</a>
      <a href="${charsLink}" class="text-gray-300">${charsText}</a>
      <a href="/arcs" class="text-gray-300">Arcs</a>
      <a href="/anime" class="text-gray-300">Anime</a>
    </nav>
    ${inner}
    <footer class="max-w-5xl mx-auto px-4 py-10 text-xs text-gray-500 border-t border-white/10 flex flex-wrap gap-4">
      <a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/dmca">DMCA</a><a href="/disclaimer">Disclaimer</a>
      <span>Fan project. Not affiliated with Muneyuki Kaneshiro, Yusuke Nomura or Kodansha.</span>
    </footer>
  </div>`;
};

const asc = [...chapters].sort((a, b) => a.number - b.number);
const latest = chapters.filter(c => (c.pageCount ?? 1) > 0).sort((a, b) => b.number - a.number);
const latestInt = Math.floor(latest[0]?.number ?? 0);

// ---------- 1. Chapter pages (EN, FR, PT) ----------
for (const ch of chapters) {
  const { prev, next, nearby } = getAdjacentChapters(chapters, ch.number);

  // Real scan availability per language (no guessing: a missing FR/PT scan means noindex there).
  const counts = { en: ch.pageCount || 0, fr: ch.pageCountFr || 0, pt: ch.pageCountPt || 0 };
  const availableLangs = LANGS.filter(l => counts[l] > 0);

  for (const lang of LANGS) {
    const pCount = counts[lang];
    const u = UI[lang];

    const seo = getChapterSEOData(ch.number, {
      title: ch.title,
      pageCount: pCount,
      note: notes[String(ch.number)],
      lang,
      availableLangs,
      releaseDate: ch.releaseDate,
    });
    const featured = seo.featuredCharacters.filter(c => characterSlugs.has(c.slug));

    const routePrefix = lang === 'en' ? '' : `/${lang}`;
    const chapterUrl = `${routePrefix}/chapter/${ch.number}`;
    const mangaUrl = lang === 'en' ? '/manga' : `/${lang}/manga`;

    const body = wrap(`<article class="max-w-4xl mx-auto px-4 py-10">
        <p class="text-xs font-bold uppercase text-blue-500 mb-2"><a href="/arcs/${seo.arcSlug}" hreflang="en">${esc(seo.arcName)}</a></p>
        <h1 class="text-3xl md:text-5xl font-heading font-bold mb-4">Blue Lock ${u.chapter} ${ch.number}${seo.hasRealTitle ? `: ${esc(seo.title)}` : ''}${u.h1Suffix}</h1>
        <p class="text-gray-400">${seo.noindex ? u.notYet(ch.number) : u.read(ch.number, pCount)}</p>
        <nav class="flex flex-wrap gap-3 my-6 text-sm font-semibold">
          ${prev ? `<a href="${routePrefix}/chapter/${prev.number}" class="text-blue-400">← ${u.chapter} ${prev.number}</a>` : ''}
          <a href="${mangaUrl}" class="text-gray-300">${u.allChapters}</a>
          ${next ? `<a href="${routePrefix}/chapter/${next.number}" class="text-blue-400">${u.chapter} ${next.number} →</a>` : ''}
        </nav>
        <section class="border-t border-white/10 pt-6 text-gray-300 text-sm leading-relaxed">
          <h2 class="text-2xl font-bold text-white mb-3">${u.whatHappens(ch.number)}</h2>
          <p class="mb-4">${esc(seo.summary)}</p>
          <p class="text-gray-400 mb-6"><strong>${u.context}:</strong> ${esc(seo.arcDescription)}</p>
          ${featured.length ? `<h3 class="text-sm font-bold uppercase text-gray-400 mb-3">${u.keyStrikers}</h3>
          <ul class="flex flex-wrap gap-3 mb-6">${featured.map(c => `<li><a href="${routePrefix}/characters/${c.slug}">${esc(c.name)}</a></li>`).join('')}</ul>` : ''}
          <h3 class="text-sm font-bold uppercase text-gray-400 mb-3">${u.nearby}</h3>
          <ul class="flex flex-wrap gap-2">${nearby.map(c => `<li><a href="${routePrefix}/chapter/${c.number}"${c.number === ch.number ? ' aria-current="page"' : ''}>${u.ch} ${c.number}</a></li>`).join('')}</ul>
        </section>
      </article>`, lang);

    write(chapterUrl, render(headTags({
      title: seo.seoTitle, description: seo.seoDescription, canonical: seo.canonicalUrl,
      noindex: seo.noindex, ogType: 'article', schemas: seo.noindex ? [] : seo.schemas,
      alternates: seo.alternateLinks, lang,
    }), body, lang));
  }
}

// ---------- 2. Character pages (EN, FR, PT) ----------
for (const c of CHARACTERS_DATA) {
  for (const lang of ['en', 'fr', 'pt']) {
    const seo = getCharacterSEOData(c, lang);
    const related = (c.relatedSlugs || []).map(s => CHARACTERS_DATA.find(x => x.slug === s)).filter(Boolean);
    const routePrefix = lang === 'en' ? '' : `/${lang}`;
    const charUrl = `${routePrefix}/characters/${c.slug}`;

    const alternates = buildAlternates(`/characters/${c.slug}`);

    const body = wrap(`<main class="max-w-4xl mx-auto px-4 py-10">
        <a href="${routePrefix}/characters" class="text-blue-400 text-sm">← ${UI[lang].allChars}</a>
        <h1 class="text-4xl md:text-5xl font-heading font-bold mt-4">${esc(c.name)}</h1>
        <p class="text-blue-400 text-sm font-bold mt-2">${esc(c.role)} • ${esc(c.grade)}</p>
        <img src="${esc(c.image)}" alt="${esc(c.name)} – Blue Lock" width="230" height="345" class="my-6 rounded-xl" loading="eager" />
        <p class="text-lg text-gray-300 mb-6">${esc(c.description)}</p>
        <h2 class="text-xl font-bold text-white mb-2">Abilities &amp; Style</h2>
        <p class="text-gray-300 mb-2"><strong>Weapon:</strong> ${esc(c.weapon)}</p>
        <p class="text-gray-300 mb-6">${esc(c.abilities)}</p>
        <h2 class="text-xl font-bold text-white mb-2">Biography</h2>
        <p class="text-gray-300 mb-2"><strong>First appearance:</strong> ${esc(c.firstAppearance)}</p>
        <p class="text-gray-300 mb-6">${esc(c.longDescription)}</p>
        ${c.keyChapters?.length ? `<h2 class="text-xl font-bold text-white mb-2">Key Chapters</h2>
        <ul class="mb-6">${c.keyChapters.map(k => `<li><a href="${routePrefix}/chapter/${k.number}">${esc(k.label)}</a></li>`).join('')}</ul>` : ''}
        ${related.length ? `<h2 class="text-xl font-bold text-white mb-2">Teammates &amp; Rivals</h2>
        <ul class="flex flex-wrap gap-4">${related.map(r => `<li><a href="${routePrefix}/characters/${r.slug}">${esc(r.name)}</a></li>`).join('')}</ul>` : ''}
      </main>`, lang);

    write(charUrl, render(headTags({
      title: seo.seoTitle, description: seo.seoDescription, canonical: seo.canonicalUrl,
      ogType: 'profile', image: seo.ogImage, schemas: seo.schemas, alternates, lang,
    }), body, lang));
  }
}

// ---------- 3. Characters index (EN, FR, PT) ----------
for (const lang of ['en', 'fr', 'pt']) {
  const route = lang === 'en' ? '/characters' : `/${lang}/characters`;
  const metaObj = PAGE_META[route] || PAGE_META['/characters'];
  const routePrefix = lang === 'en' ? '' : `/${lang}`;
  const alternates = buildAlternates('/characters');

  write(route, render(headTags({
    ...metaObj, canonical: `${SITE_URL}${route}`,
    schemas: [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: metaObj.title, url: `${SITE_URL}${route}`, inLanguage: HTML_LANG[lang] },
      breadcrumbSchema([{ name: UI[lang].home, path: routePrefix || '/' }, { name: UI[lang].characters, path: route }]),
    ],
    alternates, lang,
  }), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4">${esc(metaObj.title)}</h1>
      <p class="text-gray-400 mb-8">${esc(metaObj.description)}</p>
      <ul class="grid gap-6 md:grid-cols-2">${CHARACTERS_DATA.map(c => `<li>
        <h2 class="text-2xl font-bold"><a href="${routePrefix}/characters/${c.slug}">${esc(c.name)}</a></h2>
        <p class="text-xs text-blue-400">${esc(c.role)} • ${esc(c.grade)}</p>
        <p class="text-gray-400 text-sm">${esc(c.description)}</p></li>`).join('')}</ul>
    </main>`, lang), lang));
}

// ---------- 4. Chapter list (EN, FR, PT) ----------
for (const lang of LANGS) {
  const route = lang === 'en' ? '/manga' : `/${lang}/manga`;
  const metaObj = PAGE_META[route] || PAGE_META['/manga'];
  const routePrefix = lang === 'en' ? '' : `/${lang}`;
  const alternates = buildAlternates('/manga');
  const countKey = lang === 'fr' ? 'pageCountFr' : lang === 'pt' ? 'pageCountPt' : 'pageCount';
  // Only list chapters that really have scans in this language.
  const groups = [];
  for (const c of asc.filter(x => (x[countKey] || 0) > 0)) {
    const arc = getArcInfo(c.number, lang).arcName;
    if (!groups.length || groups[groups.length - 1].arc !== arc) groups.push({ arc, items: [] });
    groups[groups.length - 1].items.push(c);
  }

  write(route, render(headTags({
    ...metaObj, canonical: `${SITE_URL}${route}`,
    schemas: [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: metaObj.title, url: `${SITE_URL}${route}`, inLanguage: HTML_LANG[lang] },
      breadcrumbSchema([{ name: UI[lang].home, path: routePrefix || '/' }, { name: UI[lang].allChapters, path: route }]),
    ],
    alternates, lang,
  }), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-4xl md:text-6xl font-heading font-bold mb-4">${esc(metaObj.title)}</h1>
      <p class="text-gray-400 mb-8">${esc(metaObj.description)}</p>
      ${groups.map(g => `<section class="mb-8"><h2 class="text-2xl font-bold mb-3">${esc(g.arc)} (${UI[lang].ch} ${g.items[0].number}–${g.items[g.items.length - 1].number})</h2>
      <ul class="flex flex-wrap gap-2 text-sm">${g.items.map(c => `<li><a href="${routePrefix}/chapter/${c.number}">${esc(chapterLabel(c, lang))}</a></li>`).join('')}</ul></section>`).join('\n      ')}
    </main>`, lang), lang));
}

// ---------- 5. Home (EN, FR, PT) ----------
for (const lang of ['en', 'fr', 'pt']) {
  const route = lang === 'en' ? '/' : `/${lang}`;
  const metaObj = PAGE_META[route] || PAGE_META['/'];
  const routePrefix = lang === 'en' ? '' : `/${lang}`;
  const alternates = buildAlternates('/');
  const u = UI[lang];
  const countKey = lang === 'fr' ? 'pageCountFr' : lang === 'pt' ? 'pageCountPt' : 'pageCount';
  const latestHere = latest.filter(c => (c[countKey] || 0) > 0);
  const h1 = lang === 'fr' ? 'Blue Lock Scan VF' : lang === 'pt' ? 'Blue Lock Mangá em Português' : 'Blue Lock Manga Online';

  write(route, render(headTags({
    ...metaObj, canonical: `${SITE_URL}${route}`, schemas: homeSchemas(),
    extra: '<link data-prerender rel="preload" as="image" href="/blue-lock.webp" fetchpriority="high" />',
    alternates, lang,
  }), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-5xl md:text-7xl font-heading font-extrabold mb-4">${h1}</h1>
      <p class="text-gray-300 mb-4">${esc(metaObj.description)}</p>
      <p class="mb-8 flex flex-wrap gap-4 font-bold">
        <a href="${routePrefix}/chapter/1">${u.startReading}</a>
        ${latestHere[0] ? `<a href="${routePrefix}/chapter/${latestHere[0].number}">${u.latest(latestHere[0].number)}</a>` : ''}
        <a href="${routePrefix}/characters">${u.characters}</a>
      </p>
      <h2 class="text-2xl font-bold mb-3">${u.latestList}</h2>
      <ul class="flex flex-wrap gap-2 mb-8">${latestHere.slice(0, 12).map(c => `<li><a href="${routePrefix}/chapter/${c.number}">${esc(chapterLabel(c, lang))}</a></li>`).join('')}</ul>
    </main>`, lang), lang));
}

// /en is a duplicate of / : canonical to / and keep it out of hreflang.
write('/en', render(headTags({
  ...PAGE_META['/'], canonical: `${SITE_URL}/`, schemas: homeSchemas(),
}), wrap(`<main class="max-w-5xl mx-auto px-4 py-10"><p>Redirecting to <a href="/">Blue Lock Manga</a>...</p></main>`)));

// ---------- 6. About + legal (EN, FR, PT) ----------
const simplePages = {
  '/about': { h1: 'About Blue Lock Manga', text: "Blue Lock Manga is an independent fan project and reading archive for Muneyuki Kaneshiro and Yusuke Nomura's Blue Lock." },
  '/privacy': { h1: 'Privacy Policy', text: 'How we handle data and protect the privacy of visitors to Blue Lock Manga.' },
  '/terms': { h1: 'Terms and Conditions of Use', text: 'The terms of service, user agreements and conduct guidelines for Blue Lock Manga.' },
  '/dmca': { h1: 'DMCA Copyright Notice & Takedown Policy', text: 'How to submit a DMCA copyright takedown notice to Blue Lock Manga: email support@bluelockchapter.com.' },
  '/disclaimer': { h1: 'Legal Disclaimer & Fair Use Disclosure', text: 'Blue Lock Manga is an unofficial fan project and is not affiliated with Muneyuki Kaneshiro, Yusuke Nomura, Kodansha or VIZ Media.' },
};

for (const [baseRoute, p] of Object.entries(simplePages)) {
  for (const lang of ['en', 'fr', 'pt']) {
    const route = lang === 'en' ? baseRoute : `/${lang}${baseRoute}`;
    // The body of these pages is English-only, so FR/PT copies canonicalize to the
    // English page (matching the React app) and carry no hreflang.
    const metaObj = PAGE_META[baseRoute];

    write(route, render(headTags({
      ...metaObj, canonical: `${SITE_URL}${baseRoute}`,
      schemas: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: p.h1, path: baseRoute }])],
    }), wrap(`<main class="max-w-4xl mx-auto px-4 py-10">
        <h1 class="text-3xl md:text-5xl font-heading font-bold mb-6">${esc(p.h1)}</h1>
        <p class="text-gray-300">${esc(p.text)}</p>
      </main>`, lang)));
  }
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
      ${g.kicker ? `<p class="text-blue-500 text-xs font-bold uppercase">${esc(g.kicker)}</p>` : ''}
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
      <p class="text-blue-500 font-bold">404</p>
      <h1 class="text-4xl font-heading font-bold mb-4">Page not found</h1>
      <p class="text-gray-400 mb-6">This page doesn't exist or was moved.</p>
      <p class="flex justify-center gap-4"><a href="/">Home</a><a href="/manga">All Chapters</a><a href="/characters">Characters</a></p>
    </main>`)));

console.log(`[OK] Prerendered ${written} pages across EN, FR, and PT for ${SITE_URL}`);
