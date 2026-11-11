// Single source of truth for SEO data. English only.
// Plain ES module so it can be imported by the React app (via utils/seo.ts)
// AND by the Node build scripts (scripts/prerender.mjs, scripts/generate-sitemap.mjs).

import { getStorySegment, getAnimeCoverage, STORY_SEGMENTS } from '../data/story-segments.js';
import { CHARACTERS_DATA } from '../data/characters.js';

export { getStorySegment, STORY_SEGMENTS };

export const SITE_URL ='https://www.haikyuu.org';
export const SITE_NAME = 'Haikyu!! Manga';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const abs = (path = '/') => (path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '/' : path}`);

/** Cut text to <= max chars on a word boundary, ending cleanly. */
export function trimText(text, max = 160) {
  const t = String(text).replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  if (lastStop >= max * 0.6) return cut.slice(0, lastStop + 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\-–—\s]+$/, '')}…`;
}

/**
 * Real chapter title, without the "Chapter N – " prefix the scraper adds.
 * Returns null when there is no real title ("Ch. 100", "Chapter 100", "100").
 */
export function realChapterTitle(num, title) {
  if (!title) return null;
  const t = String(title).trim()
    .replace(/^(ch\.?|chapter)\s*[\d.]+\s*[–—:\-]\s*/i, '')
    .trim();
  if (!t) return null;
  if (/^(ch\.?|chapter)\s*[\d.]+$/i.test(t)) return null;
  if (t === String(num)) return null;
  return t;
}

/** "Haikyu!! Chapter N: Title" plus the longest suffix that keeps it within max chars. */
function chapterSeoTitle(num, title, max = 65) {
  if (!title) return `Haikyuu Chapter ${num} – Read Haikyu!! Manga Online in English`;
  const base = `Haikyuu Chapter ${num}: ${title}`;
  for (const suffix of [' – Read Online in English', ' – Read Online', '']) {
    if ((base + suffix).length <= max) return base + suffix;
  }
  return trimText(base, max);
}

/** Prev / next by position in the chapter list. */
export function getAdjacentChapters(chapters, num) {
  const sorted = [...chapters].sort((a, b) => a.number - b.number);
  const i = sorted.findIndex(c => c.number === num);
  if (i === -1) return { prev: null, next: null, nearby: [] };
  return {
    prev: sorted[i - 1] || null,
    next: sorted[i + 1] || null,
    nearby: sorted.slice(Math.max(0, i - 3), i + 4),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

const SERIES = {
  '@type': 'ComicSeries',
  name: 'Haikyu!!',
  url: `${SITE_URL}/`,
};

/** Full ComicSeries entity for the series (home page and chapter list). */
export function comicSeriesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ComicSeries',
    name: 'Haikyu!!',
    alternateName: ['ハイキュー!!', 'Haikyuu!!', 'Haikyu'],
    description: "Shoyo Hinata aims to become the next Little Giant of Karasuno High. Partnering with genius setter Tobio Kageyama, they revolutionize high school volleyball with their explosive quick attack.",
    url: `${SITE_URL}/`,
    image: DEFAULT_OG_IMAGE,
    author: [
      { '@type': 'Person', name: 'Haruichi Furudate' },
    ],
    publisher: { '@type': 'Organization', name: 'Shueisha', url: 'https://www.shueisha.co.jp' },
    genre: ['Sports', 'Comedy', 'Drama', 'School', 'Shounen', 'Volleyball'],
    startDate: '2012-02-20',
  };
}

/** FAQPage schema. Only use it when the same questions are visible on the page. */
export function faqSchema(list) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

/** Replace "{latest}" in FAQ answers with the latest chapter number. */
export const fillFaq = (list, latest) => list.map(f => ({ q: f.q, a: String(f.a).replace(/\{latest\}/g, String(latest)) }));

// Chapter ranges per arc.
const ARC_RANGES = {
  'karasuno-formation': [1, 35],
  'interhigh': [36, 71],
  'tokyo-training-camp': [72, 96],
  'spring-high-preliminary': [97, 206],
  'tokyo-nationals': [207, 369],
  'final-arc': [370, 402],
};

/**
 * A short paragraph of facts for each chapter: where it sits in its match /
 * story beat and in its arc, and how long it is.
 */
export function chapterFacts(num, _lang = 'en', pageCount = 0, title = null) {
  const arc = getArcInfo(num);
  const seg = getStorySegment(num);
  const [start, end] = ARC_RANGES[arc.arcSlug] || [1, 402];
  const whole = Math.floor(num);
  const isHalf = whole !== num;
  const name = title ? `Chapter ${num}, "${title}",` : `Chapter ${num}`;
  const out = [];

  if (isHalf) {
    out.push(`${name} is a bonus special chapter from the ${arc.arcName}.`);
  } else {
    const segLen = Math.floor(seg.end) - seg.start + 1;
    const segPos = whole - seg.start + 1;
    out.push(segLen > 1
      ? `${name} is chapter ${segPos} of ${segLen} in "${seg.name}" (chapters ${seg.start}–${Math.floor(seg.end)}).`
      : `${name} covers "${seg.name}" on its own.`);
    out.push(`It is chapter ${whole - start + 1} of ${end - start + 1} in the ${arc.arcName} (chapters ${start}–${end}).`);
  }
  if (pageCount > 0) out.push(`It has ${pageCount} pages.`);
  return out.join(' ');
}

/** One sentence on whether, and where, the anime adapts this chapter. */
export function chapterAnimeNote(num) {
  const a = getAnimeCoverage(num);
  if (a) return { text: `Yes. Chapter ${num} is adapted in ${a.label}.`, path: a.path };
  if (num < 370) return { text: `Not yet. Chapter ${num} comes after the Dumpster Battle film (chapters 293–325) and is expected in the second Haikyu!! FINAL film.`, path: '/anime' };
  return { text: `Not yet. Chapter ${num} is part of the post-time-skip story, which the anime has not adapted so far.`, path: '/anime' };
}

export const LANGS = ['en'];
export const HTML_LANG = { en: 'en' };
export const OG_LOCALE = { en: 'en_US' };
export const langPrefix = () => '';

/** Build hreflang alternates for a base path. */
export function buildAlternates(basePath) {
  return [
    { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}${basePath === '/' ? '/' : basePath}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}${basePath === '/' ? '/' : basePath}` },
  ];
}

export function getArcInfo(chapterNumber) {
  const num = Math.max(1, chapterNumber);

  let arcName = 'Karasuno High Team Formation Arc';
  let arcSlug = 'karasuno-formation';
  let arcDescription = "Shoyo Hinata and Tobio Kageyama unite at Karasuno High, creating the freak quick attack.";
  let stageSummary = "Hinata and Kageyama join forces with captain Daichi, Tanaka, Nishinoya, and Asahi, reviving Karasuno.";
  let featuredCharacters = [
    { name: 'Shoyo Hinata', slug: 'shoyo-hinata', role: 'Protagonist' },
    { name: 'Tobio Kageyama', slug: 'tobio-kageyama', role: 'Genius Setter' },
    { name: 'Daichi Sawamura', slug: 'daichi-sawamura', role: 'Captain' },
  ];

  if (num <= 35) {
    arcName = 'Karasuno High Team Formation Arc';
    arcSlug = 'karasuno-formation';
    arcDescription = "Hinata and Kageyama join Karasuno High School as former junior high rivals and unlock their freak quick attack.";
    stageSummary = "Hinata and Kageyama combine speed and precision to ignite Karasuno's revival alongside Nishinoya and Asahi.";
    featuredCharacters = [
      { name: 'Shoyo Hinata', slug: 'shoyo-hinata', role: 'Protagonist' },
      { name: 'Tobio Kageyama', slug: 'tobio-kageyama', role: 'Genius Setter' },
      { name: 'Yu Nishinoya', slug: 'yu-nishinoya', role: 'Guardian Deity' },
    ];
  } else if (num <= 71) {
    arcName = 'Interhigh Preliminary Arc';
    arcSlug = 'interhigh';
    arcDescription = "Karasuno enters the Miyagi Interhigh tournament, breaking through Date Tech's Iron Wall before facing Toru Oikawa's Aoba Johsai.";
    stageSummary = "Karasuno overcomes Date Tech's defensive wall and clashes with Toru Oikawa's Aoba Johsai in an emotional semi-final.";
    featuredCharacters = [
      { name: 'Shoyo Hinata', slug: 'shoyo-hinata', role: 'Protagonist' },
      { name: 'Toru Oikawa', slug: 'toru-oikawa', role: 'Grand King' },
      { name: 'Asahi Azumane', slug: 'asahi-azumane', role: 'Karasuno Ace' },
    ];
  } else if (num <= 96) {
    arcName = 'Tokyo Expedition & Training Camp Arc';
    arcSlug = 'tokyo-training-camp';
    arcDescription = "Karasuno travels to Tokyo to scrimmage with national heavyweights Nekoma, Fukurodani, Shinzen, and Ubugawa, evolving their synchronized offense.";
    stageSummary = "Hinata and Kageyama evolve their tempo, while Tsukishima learns read-blocking from Kuroo and Bokuto during intense night training.";
    featuredCharacters = [
      { name: 'Kei Tsukishima', slug: 'kei-tsukishima', role: 'Middle Blocker' },
      { name: 'Kotaro Bokuto', slug: 'kotaro-bokuto', role: 'Fukurodani Ace' },
      { name: 'Tetsuro Kuroo', slug: 'tetsuro-kuroo', role: 'Nekoma Captain' },
    ];
  } else if (num <= 206) {
    arcName = 'Spring High Preliminary Arc (Miyagi)';
    arcSlug = 'spring-high-preliminary';
    arcDescription = "The Miyagi qualifiers for the Spring National Tournament. Karasuno avenges their loss against Aoba Johsai and upsets Ushijima's Shiratorizawa.";
    stageSummary = "Karasuno defeats Aoba Johsai in an epic semi-final rematch and battles southpaw ace Wakatoshi Ushijima in a grueling 5-set final.";
    featuredCharacters = [
      { name: 'Shoyo Hinata', slug: 'shoyo-hinata', role: 'Protagonist' },
      { name: 'Wakatoshi Ushijima', slug: 'wakatoshi-ushijima', role: 'Shiratorizawa Ace' },
      { name: 'Kei Tsukishima', slug: 'kei-tsukishima', role: 'Brain of Karasuno' },
    ];
  } else if (num <= 369) {
    arcName = 'Spring High National Tournament Arc';
    arcSlug = 'tokyo-nationals';
    arcDescription = "At the Tokyo Metropolitan Gymnasium, Karasuno battles Japan's best teams: Inarizaki (the Miya Twins), Nekoma in the Dumpster Battle, and Kamomedai.";
    stageSummary = "Karasuno clashes with the Miya Twins (Inarizaki), plays the legendary Dumpster Battle vs Nekoma, and battles Korai Hoshiumi's Kamomedai.";
    featuredCharacters = [
      { name: 'Shoyo Hinata', slug: 'shoyo-hinata', role: 'Protagonist' },
      { name: 'Kenma Kozume', slug: 'kenma-kozume', role: 'Nekoma Setter' },
      { name: 'Atsumu Miya', slug: 'atsumu-miya', role: 'Inarizaki Setter' },
    ];
  } else {
    arcName = 'Final Arc / V.League & Beyond';
    arcSlug = 'final-arc';
    arcDescription = "Following beach volleyball in Brazil, Hinata joins the MSBY Black Jackals to face Kageyama's Schweiden Adlers in the V.League, leading to the Olympics.";
    stageSummary = "Hinata returns from Rio de Janeiro as an all-around volleyball maestro to duel Kageyama and Ushijima in Japan's V.League Division 1.";
    featuredCharacters = [
      { name: 'Shoyo Hinata', slug: 'shoyo-hinata', role: 'Ninja Shoyo' },
      { name: 'Tobio Kageyama', slug: 'tobio-kageyama', role: 'Olympic Setter' },
      { name: 'Kotaro Bokuto', slug: 'kotaro-bokuto', role: 'Black Jackal Ace' },
    ];
  }

  return { arcName, arcSlug, arcDescription, stageSummary, featuredCharacters };
}

/**
 * SEO data for a chapter page.
 */
export function getChapterSEOData(chapterNumber, opts = {}) {
  const num = chapterNumber;
  const arc = getArcInfo(num);
  const note = opts.note || {};
  const title = note.title || realChapterTitle(num, opts.title);
  const hasPages = opts.pageCount === undefined ? true : opts.pageCount > 0;
  const segment = getStorySegment(num);
  const summary = note.summary || segment.summary;
  const anime = chapterAnimeNote(num);
  const featuredCharacters = segment.characters
    .map(slug => CHARACTERS_DATA.find(c => c.slug === slug))
    .filter(Boolean)
    .map(c => ({ name: c.name, slug: c.slug, role: c.role }));

  const canonicalUrl = `${SITE_URL}/chapter/${num}`;

  const seoTitle = chapterSeoTitle(num, title);
  const seoDescription = trimText(
    `Read Haikyuu Chapter ${num}${title ? ` "${title}"` : ''} online in English for free. ${summary}`,
    160
  );

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'All Chapters', path: '/manga' },
    { name: `Chapter ${num}`, path: `/chapter/${num}` },
  ];

  const published = opts.releaseDate ? String(opts.releaseDate).slice(0, 10) : undefined;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
      mainEntity: {
        '@type': 'ComicIssue',
        name: `Haikyu!! Chapter ${num}${title ? `: ${title}` : ''}`,
        issueNumber: String(num),
        inLanguage: 'en',
        url: canonicalUrl,
        ...(published ? { datePublished: published } : {}),
        author: [
          { '@type': 'Person', name: 'Haruichi Furudate' },
        ],
        about: segment.name,
        isPartOf: SERIES,
      },
    },
    breadcrumbSchema(breadcrumbItems),
  ];

  const alternateLinks = hasPages
    ? buildAlternates(`/chapter/${num}`)
    : [];

  return {
    number: num,
    title: title || `Chapter ${num}`,
    hasRealTitle: Boolean(title),
    summary,
    hasUniqueSummary: Boolean(note.summary),
    facts: chapterFacts(num, 'en', hasPages ? (opts.pageCount || 0) : 0, title),
    ...arc,
    featuredCharacters,
    segmentName: segment.name,
    segmentSlug: segment.slug,
    animeNote: anime.text,
    animePath: anime.path,
    seoTitle,
    seoDescription,
    canonicalUrl,
    noindex: !hasPages,
    schemas,
    alternateLinks,
  };
}

export function getCharacterSEOData(character) {
  const url = `${SITE_URL}/characters/${character.slug}`;

  const nick = character.shortName && !character.name.includes(character.shortName) ? ` (${character.shortName})` : '';
  const seoTitle = [` – Haikyu!! Profile, Position & Key Chapters`, ` – Haikyu!! Character Profile`, ` – Haikyu!!`]
    .map(suffix => `${character.name}${nick}${suffix}`)
    .find(t => t.length <= 65) || trimText(`${character.name} – Haikyu!!`, 65);
  const seoDescription = trimText(
    `${character.name} is a ${character.role} in Haikyu!! (${character.grade}). Signature weapon: ${character.weapon}. Abilities: ${character.abilities} First appeared in ${character.firstAppearance}.`,
    160,
  );

  const ogImage = character.image.startsWith('/characters/') ? abs(character.image) : DEFAULT_OG_IMAGE;

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Characters', path: '/characters' },
    { name: character.name, path: `/characters/${character.slug}` },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      name: seoTitle,
      description: seoDescription,
      url,
      image: abs(character.image),
      about: {
        '@type': 'Person',
        name: character.name,
        description: character.description,
        image: abs(character.image),
      },
    },
    breadcrumbSchema(breadcrumbItems),
  ];
  if (character.faq?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: character.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return { seoTitle, seoDescription, canonicalUrl: url, ogImage, schemas };
}

// Meta for fixed pages
export const PAGE_META = {
  '/': {
    title: 'Haikyu!! Manga Online – Read All Haikyuu Chapters & Volumes Free',
    description: "Read Haikyuu (Haikyu!!) manga online in English: all 402 chapters by Haruichi Furudate in HD, free with no sign-up, plus character profiles and arc guides.",
  },
  '/en': {
    title: 'Haikyu!! Manga Online – Read All Haikyuu Chapters & Volumes Free',
    description: "Read Haikyuu (Haikyu!!) manga online in English: all 402 chapters by Haruichi Furudate in HD, free with no sign-up, plus character profiles and arc guides.",
  },
  '/manga': {
    title: 'Haikyuu Manga Chapter List – All 402 Haikyu!! Chapters in Order',
    description: 'Every Haikyu!! manga chapter in order, from Chapter 1 to Chapter 402, grouped by story arc. Read them all online in English for free.',
  },
  '/en/manga': {
    title: 'Haikyuu Manga Chapter List – All 402 Haikyu!! Chapters in Order',
    description: 'Every Haikyu!! manga chapter in order, from Chapter 1 to Chapter 402, grouped by story arc. Read them all online in English for free.',
  },
  '/characters': {
    title: 'Haikyu!! Characters – Profiles, Positions, Stats & Abilities',
    description: "Complete guide to Haikyu!! characters: Shoyo Hinata, Tobio Kageyama, Kei Tsukishima, Yu Nishinoya, Toru Oikawa, Kenma, Kuroo, Bokuto, and Ushijima.",
  },
  '/en/characters': {
    title: 'Haikyu!! Characters – Profiles, Positions, Stats & Abilities',
    description: "Complete guide to Haikyu!! characters: Shoyo Hinata, Tobio Kageyama, Kei Tsukishima, Yu Nishinoya, Toru Oikawa, Kenma, Kuroo, Bokuto, and Ushijima.",
  },
  '/about': {
    title: 'About Haikyu!! Manga – Independent Fan Reading Project',
    description: "About Haikyu!! Manga, an independent fan project and reading archive for Haruichi Furudate's volleyball masterpiece.",
  },
  '/en/about': {
    title: 'About Haikyu!! Manga – Independent Fan Reading Project',
    description: "About Haikyu!! Manga, an independent fan project and reading archive for Haruichi Furudate's volleyball masterpiece.",
  },
  '/privacy': {
    title: 'Privacy Policy – Haikyu!! Manga',
    description: 'How Haikyu!! Manga handles data and protects visitor privacy.',
  },
  '/en/privacy': {
    title: 'Privacy Policy – Haikyu!! Manga',
    description: 'How Haikyu!! Manga handles data and protects visitor privacy.',
  },
  '/terms': {
    title: 'Terms and Conditions – Haikyu!! Manga',
    description: 'Terms of service, user agreements and conduct guidelines for Haikyu!! Manga.',
  },
  '/en/terms': {
    title: 'Terms and Conditions – Haikyu!! Manga',
    description: 'Terms of service, user agreements and conduct guidelines for Haikyu!! Manga.',
  },
  '/dmca': {
    title: 'DMCA Copyright Notice & Takedown Policy – Haikyu!! Manga',
    description: 'DMCA compliance and how to submit a copyright takedown notice to Haikyu!! Manga.',
  },
  '/en/dmca': {
    title: 'DMCA Copyright Notice & Takedown Policy – Haikyu!! Manga',
    description: 'DMCA compliance and how to submit a copyright takedown notice to Haikyu!! Manga.',
  },
  '/disclaimer': {
    title: 'Legal Disclaimer – Haikyu!! Manga',
    description: 'Legal disclaimer and copyright notices for Haikyu!! Manga, an unofficial fan project.',
  },
  '/en/disclaimer': {
    title: 'Legal Disclaimer – Haikyu!! Manga',
    description: 'Legal disclaimer and copyright notices for Haikyu!! Manga, an unofficial fan project.',
  },
};

/** Home page schemas. Pass the FAQ only when it is shown on the page. */
export function homeSchemas(faq) {
  const list = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    comicSeriesSchema(),
  ];
  if (faq?.length) list.push(faqSchema(faq));
  return list;
}

/** Chapter list page: a CollectionPage about the series, plus the series itself. */
export function mangaListSchemas(route, title) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      url: `${SITE_URL}${route}`,
      inLanguage: 'en',
      about: SERIES,
    },
    comicSeriesSchema(),
  ];
}

/** SEO data for a guide page from data/guides.js */
export function getGuideSEOData(path, guide) {
  const url = `${SITE_URL}${path}`;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.h1,
      name: guide.title,
      description: guide.description,
      url,
      image: DEFAULT_OG_IMAGE,
      about: SERIES,
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    },
    breadcrumbSchema(guide.breadcrumbs),
  ];
  if (guide.faq?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return { seoTitle: guide.title, seoDescription: guide.description, canonicalUrl: url, schemas };
}
