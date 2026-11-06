// Static prerender (SSG) for every route of the site.
// Writes dist/<route>/index.html with per-page <head> tags + crawlable body HTML,
// plus dist/404.html. Run after `vite build` (see package.json "build").
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, PAGE_META,
  getChapterSEOData, getCharacterSEOData, getAdjacentChapters, getArcInfo,
  realChapterTitle, breadcrumbSchema, homeSchemas, getGuideSEOData,
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
const chapterLabel = (c) => {
  const t = realChapterTitle(c.number, c.title);
  return `Chapter ${c.number}${t ? `: ${t}` : ''}`;
};

function headTags({ title, description, canonical, noindex = false, ogType = 'website', image = DEFAULT_OG_IMAGE, schemas = [], extra = '' }) {
  const tags = [
    `<title data-prerender>${esc(title)}</title>`,
    `<meta data-prerender name="description" content="${esc(description)}" />`,
    `<meta data-prerender name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    canonical && !noindex ? `<link data-prerender rel="canonical" href="${esc(canonical)}" />` : '',
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
  return template.replace('<!--SEO-HEAD-->', head).replace('<!--SEO-BODY-->', body);
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

const wrap = (inner) => `<div class="bg-[#121212] text-gray-100 min-h-screen">
    <nav class="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-4 text-sm font-bold">
      <a href="/" class="text-white">Blue Lock Manga</a>
      <a href="/manga" class="text-gray-300">All Chapters</a>
      <a href="/characters" class="text-gray-300">Characters</a>
      <a href="/arcs" class="text-gray-300">Arcs</a>
      <a href="/anime" class="text-gray-300">Anime</a>
    </nav>
    ${inner}
    <footer class="max-w-5xl mx-auto px-4 py-10 text-xs text-gray-500 border-t border-white/10 flex flex-wrap gap-4">
      <a href="/teams">Teams</a><a href="/anime/season-3">Season 3</a><a href="/author">Author</a><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/dmca">DMCA</a><a href="/disclaimer">Disclaimer</a>
      <span>Fan project. Not affiliated with Muneyuki Kaneshiro, Yusuke Nomura or Kodansha.</span>
    </footer>
  </div>`;

const asc = [...chapters].sort((a, b) => a.number - b.number);
const latest = chapters.filter(c => (c.pageCount ?? 1) > 0).sort((a, b) => b.number - a.number);
const latestInt = Math.floor(latest[0]?.number ?? 0);

// ---------- 1. Chapter pages ----------
for (const ch of chapters) {
  const seo = getChapterSEOData(ch.number, { title: ch.title, pageCount: ch.pageCount, note: notes[String(ch.number)] });
  const { prev, next, nearby } = getAdjacentChapters(chapters, ch.number);
  const featured = seo.featuredCharacters.filter(c => characterSlugs.has(c.slug));

  const body = wrap(`<article class="max-w-4xl mx-auto px-4 py-10">
      <p class="text-xs font-bold uppercase text-blue-500 mb-2"><a href="/arcs/${seo.arcSlug}">${esc(seo.arcName)}</a></p>
      <h1 class="text-3xl md:text-5xl font-heading font-bold mb-4">Blue Lock Chapter ${ch.number}${seo.hasRealTitle ? `: ${esc(seo.title)}` : ''}</h1>
      ${seo.noindex ? `<p class="text-gray-400">The scans for Chapter ${ch.number} are not available yet.</p>` : `<p class="text-gray-400">Read Blue Lock Chapter ${ch.number} online. ${ch.pageCount || ''} pages.</p>`}
      <nav class="flex flex-wrap gap-3 my-6 text-sm font-semibold">
        ${prev ? `<a href="/chapter/${prev.number}" class="text-blue-400">← Chapter ${prev.number}</a>` : ''}
        <a href="/manga" class="text-gray-300">All Chapters</a>
        ${next ? `<a href="/chapter/${next.number}" class="text-blue-400">Chapter ${next.number} →</a>` : ''}
      </nav>
      <section class="border-t border-white/10 pt-6 text-gray-300 text-sm leading-relaxed">
        <h2 class="text-2xl font-bold text-white mb-3">${seo.hasUniqueSummary ? `What Happens in Blue Lock Chapter ${ch.number}` : `Blue Lock Chapter ${ch.number}: Story Context`}</h2>
        <p class="mb-4">${esc(seo.summary)}</p>
        <p class="text-gray-400 mb-6"><strong>Arc context:</strong> ${esc(seo.arcDescription)} <a href="/arcs/${seo.arcSlug}">Read the ${esc(seo.arcName)} guide</a>.</p>
        ${featured.length ? `<h3 class="text-sm font-bold uppercase text-gray-400 mb-3">Characters in this arc</h3>
        <ul class="flex flex-wrap gap-3 mb-6">${featured.map(c => `<li><a href="/characters/${c.slug}">${esc(c.name)}</a> <span class="text-xs text-gray-500">${esc(c.role)}</span></li>`).join('')}</ul>` : ''}
        <h3 class="text-sm font-bold uppercase text-gray-400 mb-3">Nearby chapters</h3>
        <ul class="flex flex-wrap gap-2">${nearby.map(c => `<li><a href="/chapter/${c.number}"${c.number === ch.number ? ' aria-current="page"' : ''}>Ch. ${c.number}</a></li>`).join('')}</ul>
      </section>
    </article>`);

  write(`/chapter/${ch.number}`, render(headTags({
    title: seo.seoTitle, description: seo.seoDescription, canonical: seo.canonicalUrl,
    noindex: seo.noindex, ogType: 'article', schemas: seo.noindex ? [] : seo.schemas,
  }), body));
}

// ---------- 2. Character pages ----------
for (const c of CHARACTERS_DATA) {
  const seo = getCharacterSEOData(c);
  const related = (c.relatedSlugs || []).map(s => CHARACTERS_DATA.find(x => x.slug === s)).filter(Boolean);
  const body = wrap(`<main class="max-w-4xl mx-auto px-4 py-10">
      <a href="/characters" class="text-blue-400 text-sm">← All characters</a>
      <h1 class="text-4xl md:text-5xl font-heading font-bold mt-4">${esc(c.name)}</h1>
      <p class="text-blue-400 text-sm font-bold mt-2">${esc(c.role)} • ${esc(c.grade)}</p>
      ${c.age ? `<p class="text-gray-300 text-sm mt-2"><strong>Age:</strong> ${esc(c.age)}${c.birthday ? ` · Birthday: ${esc(c.birthday)}` : ''}</p>` : ''}
      <img src="${esc(c.image)}" alt="${esc(c.name)} – Blue Lock" width="230" height="345" class="my-6 rounded-xl" loading="eager" />
      <p class="text-lg text-gray-300 mb-6">${esc(c.description)}</p>
      <h2 class="text-xl font-bold text-white mb-2">Abilities &amp; Style</h2>
      <p class="text-gray-300 mb-2"><strong>Weapon:</strong> ${esc(c.weapon)}</p>
      <p class="text-gray-300 mb-6">${esc(c.abilities)}</p>
      <h2 class="text-xl font-bold text-white mb-2">Biography</h2>
      <p class="text-gray-300 mb-2"><strong>First appearance:</strong> ${esc(c.firstAppearance)}</p>
      <p class="text-gray-300 mb-6">${esc(c.longDescription)}</p>
      ${c.keyChapters?.length ? `<h2 class="text-xl font-bold text-white mb-2">Key Chapters</h2>
      <ul class="mb-6">${c.keyChapters.map(k => `<li><a href="/chapter/${k.number}">${esc(k.label)}</a></li>`).join('')}</ul>` : ''}
      ${c.faq?.length ? `<h2 class="text-xl font-bold text-white mb-2">FAQ</h2>${c.faq.map(f => `<h3 class="font-bold mt-3">${esc(f.q)}</h3><p class="text-gray-300">${esc(f.a)}</p>`).join('')}` : ''}
      ${related.length ? `<h2 class="text-xl font-bold text-white mb-2">Teammates &amp; Rivals</h2>
      <ul class="flex flex-wrap gap-4">${related.map(r => `<li><a href="/characters/${r.slug}">${esc(r.name)}</a></li>`).join('')}</ul>` : ''}
    </main>`);
  write(`/characters/${c.slug}`, render(headTags({
    title: seo.seoTitle, description: seo.seoDescription, canonical: seo.canonicalUrl,
    ogType: 'profile', image: seo.ogImage, schemas: seo.schemas,
  }), body));
}

// ---------- 3. Characters index ----------
write('/characters', render(headTags({
  ...PAGE_META['/characters'], canonical: `${SITE_URL}/characters`,
  schemas: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: PAGE_META['/characters'].title, url: `${SITE_URL}/characters` },
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Characters', path: '/characters' }]),
  ],
}), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-4xl md:text-5xl font-heading font-bold mb-4">Blue Lock Characters</h1>
      <p class="text-gray-400 mb-8">The main character of Blue Lock is <a href="/characters/yoichi-isagi">Yoichi Isagi</a>. Below are profiles of every key Blue Lock character, from Isagi's rivals Nagi, Rin and Kaiser to coach Jinpachi Ego: roles, weapons and the chapters where they shine.</p>
      <ul class="grid gap-6 md:grid-cols-2">${CHARACTERS_DATA.map(c => `<li>
        <h2 class="text-2xl font-bold"><a href="/characters/${c.slug}">${esc(c.name)}</a></h2>
        <p class="text-xs text-blue-400">${esc(c.role)} • ${esc(c.grade)}</p>
        <p class="text-gray-400 text-sm">${esc(c.description)}</p></li>`).join('')}</ul>
      <h2 class="text-2xl font-bold mt-10 mb-3">Blue Lock Characters FAQ</h2>
      ${CHARACTERS_FAQ.map(f => `<h3 class="font-bold mt-4">${esc(f.q)}</h3><p class="text-gray-400">${esc(f.a)}</p>`).join('')}
      <p class="flex gap-4 mt-6"><a href="/teams">All Blue Lock teams</a><a href="/arcs">Blue Lock arcs</a><a href="/anime">Blue Lock anime</a></p>
    </main>`)));

// ---------- 4. Chapter list ----------
const groups = [];
for (const c of asc) {
  const arc = getArcInfo(c.number).arcName;
  if (!groups.length || groups[groups.length - 1].arc !== arc) groups.push({ arc, items: [] });
  groups[groups.length - 1].items.push(c);
}
write('/manga', render(headTags({
  ...PAGE_META['/manga'], canonical: `${SITE_URL}/manga`,
  schemas: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: PAGE_META['/manga'].title, url: `${SITE_URL}/manga` },
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'All Chapters', path: '/manga' }]),
  ],
}), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-4xl md:text-6xl font-heading font-bold mb-4">Blue Lock Manga Chapters</h1>
      <p class="text-gray-400 mb-8">Read Blue Lock online, from Chapter 1 to Chapter ${latestInt}. There are ${latestInt} numbered chapters so far (plus a few half chapters), grouped below by story arc.</p>
      <h2 class="text-xl font-bold mb-2">Blue Lock latest chapter</h2>
      <p class="text-gray-400 mb-4">The latest Blue Lock chapter on the site is <a href="/chapter/${latest[0]?.number ?? ''}">Chapter ${latest[0]?.number ?? ''}</a>, part of the <a href="/arcs/u20-world-cup">U-20 World Cup arc</a>.</p>
      <h2 class="text-xl font-bold mb-2">When do new Blue Lock chapters come out?</h2>
      <p class="text-gray-400 mb-8">Blue Lock comes out weekly in Kodansha's Weekly Shōnen Magazine, released on Wednesdays in Japan, except during break weeks.</p>
      ${groups.map(g => `<section class="mb-8"><h2 class="text-2xl font-bold mb-3">${esc(g.arc)} (Ch. ${g.items[0].number}–${g.items[g.items.length - 1].number})</h2>
      <p><a href="/arcs/${getArcInfo(g.items[0].number).arcSlug}">${esc(g.arc)} guide</a></p>
      <ul class="flex flex-wrap gap-2 text-sm">${g.items.map(c => `<li><a href="/chapter/${c.number}">${esc(chapterLabel(c))}</a></li>`).join('')}</ul></section>`).join('\n      ')}
    </main>`)));

// ---------- 5. Home ----------
write('/', render(headTags({
  ...PAGE_META['/'], canonical: `${SITE_URL}/`, schemas: homeSchemas(),
  extra: '<link data-prerender rel="preload" as="image" href="/blue-lock.webp" fetchpriority="high" />',
}), wrap(`<main class="max-w-5xl mx-auto px-4 py-10">
      <h1 class="text-5xl md:text-7xl font-heading font-extrabold mb-4">Blue Lock Manga</h1>
      <p class="text-gray-300 mb-4">Read Blue Lock manga online: every chapter by Muneyuki Kaneshiro &amp; Yusuke Nomura in HD, from Chapter 1 to the latest weekly release.</p>
      <p class="text-gray-400 mb-6">${esc(meta.synopsis || '')}</p>
      <p class="mb-8 flex flex-wrap gap-4 font-bold">
        <a href="/chapter/1">Start reading: Chapter 1</a>
        ${latest[0] ? `<a href="/chapter/${latest[0].number}">Latest: Chapter ${latest[0].number}</a>` : ''}
        <a href="/characters">Characters</a>
      </p>
      <h2 class="text-2xl font-bold mb-3">Latest Blue Lock Chapters</h2>
      <ul class="flex flex-wrap gap-2 mb-8">${latest.slice(0, 12).map(c => `<li><a href="/chapter/${c.number}">${esc(chapterLabel(c))}</a></li>`).join('')}</ul>
      <h2 class="text-2xl font-bold mb-3">Story Arcs</h2>
      <ul class="mb-8">${ARCS_DATA.map(a => `<li><a href="/arcs/${a.id}">${esc(a.title)}</a> – ${esc(a.description)} <a href="/chapter/${a.chapterStart}">Start at chapter ${a.chapterStart}</a></li>`).join('')}</ul>
      <p class="mb-8 flex flex-wrap gap-4"><a href="/anime/season-3">Blue Lock season 3 release date</a><a href="/anime">Anime watch order</a><a href="/teams">Blue Lock teams</a><a href="/author">Who wrote Blue Lock</a></p>
      <h2 class="text-2xl font-bold mb-3">Main Characters</h2>
      <ul class="flex flex-wrap gap-3 mb-8">${CHARACTERS_DATA.map(c => `<li><a href="/characters/${c.slug}">${esc(c.name)}</a></li>`).join('')}</ul>
      <h2 class="text-2xl font-bold mb-3">Blue Lock Manga FAQ</h2>
      ${HOME_FAQ.map(f => `<h3 class="font-bold mt-4">${esc(f.q)}</h3>\n      <p class="text-gray-400">${esc(f.a.replace('{latest}', String(latest[0]?.number ?? '')))}</p>`).join('\n      ')}
    </main>`)));

// ---------- 6. About + legal ----------
const simplePages = {
  '/about': { h1: 'About Blue Lock Manga', text: "Blue Lock Manga is an independent fan project and reading archive for Muneyuki Kaneshiro and Yusuke Nomura's Blue Lock." },
  '/privacy': { h1: 'Privacy Policy', text: 'How we handle data and protect the privacy of visitors to Blue Lock Manga.' },
  '/terms': { h1: 'Terms and Conditions of Use', text: 'The terms of service, user agreements and conduct guidelines for Blue Lock Manga.' },
  '/dmca': { h1: 'DMCA Copyright Notice & Takedown Policy', text: 'How to submit a DMCA copyright takedown notice to Blue Lock Manga: email support@bluelockchapter.com.' },
  '/disclaimer': { h1: 'Legal Disclaimer & Fair Use Disclosure', text: 'Blue Lock Manga is an unofficial fan project and is not affiliated with Muneyuki Kaneshiro, Yusuke Nomura, Kodansha or VIZ Media.' },
};
for (const [route, p] of Object.entries(simplePages)) {
  write(route, render(headTags({
    ...PAGE_META[route], canonical: `${SITE_URL}${route}`,
    schemas: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: p.h1, path: route }])],
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
      ${g.faq?.length ? `<section class="mb-8"><h2 class="text-2xl font-bold mb-3">FAQ</h2>${g.faq.map(f => `<h3 class="font-bold mt-4">${esc(f.q)}</h3><p class="text-gray-400">${esc(f.a)}</p>`).join('')}</section>` : ''}
      ${g.related?.length ? `<nav class="border-t border-white/10 pt-6"><h2 class="text-sm font-bold uppercase text-gray-400">Related</h2>${linksHtml(g.related.filter(r => r.to !== route))}</nav>` : ''}
    </main>`);
  write(route, render(headTags({
    title: seo.seoTitle, description: seo.seoDescription, canonical: seo.canonicalUrl, ogType: 'article', schemas: seo.schemas,
  }), body));
}

// ---------- 8. 404 ----------
// Served with HTTP 404 by nginx (error_page), Netlify, Cloudflare Pages and Vercel.
write('/404', render(headTags({
  title: `Page Not Found – ${SITE_NAME}`, description: 'The page you are looking for does not exist.', noindex: true,
}), wrap(`<main class="max-w-3xl mx-auto px-4 py-24 text-center">
      <p class="text-blue-500 font-bold">404</p>
      <h1 class="text-4xl font-heading font-bold mb-4">Page not found</h1>
      <p class="text-gray-400 mb-6">This page doesn't exist or was moved.</p>
      <p class="flex justify-center gap-4"><a href="/">Home</a><a href="/manga">All Chapters</a><a href="/characters">Characters</a></p>
    </main>`)));

console.log(`[OK] Prerendered ${written} pages (${chapters.length} chapters, ${CHARACTERS_DATA.length} characters, home, lists, legal, 404) for ${SITE_URL}`);
