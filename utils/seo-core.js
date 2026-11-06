// Single source of truth for SEO data.
// Plain ES module so it can be imported by the React app (via utils/seo.ts)
// AND by the Node build scripts (scripts/prerender.mjs, scripts/generate-sitemap.mjs).

export const SITE_URL = 'https://www.bluelockchapter.com';
export const SITE_NAME = 'Blue Lock Manga';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const abs = (path = '/') => (path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '/' : path}`);

/** Cut text to <= max chars on a word boundary, ending cleanly. */
export function trimText(text, max = 160) {
  const t = String(text).replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  // Prefer ending on a full sentence when one ends late enough.
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  if (lastStop >= max * 0.6) return cut.slice(0, lastStop + 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\-–—\s]+$/, '')}…`;
}

/** Scraped titles like "Ch. 100" or "Chapter 100" are not real titles. */
export function realChapterTitle(num, title) {
  if (!title) return null;
  const t = String(title).trim();
  if (/^(ch\.?|chapter)\s*[\d.]+$/i.test(t)) return null;
  if (t === String(num)) return null;
  return t;
}

/** Prev / next by position in the chapter list (handles 314.1, 364.2 ...). */
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
  name: 'Blue Lock',
  url: `${SITE_URL}/`,
};

// Arc context. Note: these summaries describe the arc / stage, not the individual chapter.
// To give a chapter its own unique summary or real title, add it to data/chapter-notes.json:
//   { "355": { "title": "Real Chapter Name", "summary": "2-3 sentences about this chapter." } }
export function getArcInfo(chapterNumber) {
  const num = Math.max(1, chapterNumber);

  let arcName = 'Neo Egoist League Arc';
  let arcSlug = 'neo-egoist-league';
  let arcDescription = "The international training league where Japan's top strikers join European powerhouse clubs (Bastard München, Manshine City, Ubers, PXG, Barcha) and compete in televised matches for real club contract bids.";
  let stageSummary = 'In the Neo Egoist League, Yoichi Isagi battles world-class rivals like Rin Itoshi and Michael Kaiser, sharpening his Metavision and egoism to take over the pitch.';
  let featuredCharacters = [
    { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
    { name: 'Rin Itoshi', slug: 'rin-itoshi', role: 'Rival Ace' },
    { name: 'Michael Kaiser', slug: 'michael-kaiser', role: 'Bastard München Ace' },
  ];

  if (num <= 38) {
    arcName = 'First Selection Arc';
    arcSlug = 'first-selection';
    arcDescription = 'The brutal opening survival tournament inside Blue Lock, where five-man teams clash in round-robin matches to avoid being expelled from Japanese soccer forever.';
    if (num <= 10) {
      stageSummary = "Yoichi Isagi, Meguru Bachira and Team Z face the reality of Jinpachi Ego's experiment in their opening match against Barou's Team X.";
      featuredCharacters = [
        { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
        { name: 'Meguru Bachira', slug: 'meguru-bachira', role: 'Dribbling Prodigy' },
        { name: 'Shoei Barou', slug: 'shoei-barou', role: 'Team X King' },
      ];
    } else if (num <= 20) {
      stageSummary = "Team Z takes on Team Y in a battle of wits, where Isagi's spatial awareness clashes with Niko Ikki's calculated tactics.";
      featuredCharacters = [
        { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
        { name: 'Rensuke Kunigami', slug: 'rensuke-kunigami', role: 'Left-Foot Cannon' },
        { name: 'Jinpachi Ego', slug: 'jinpachi-ego', role: 'Architect Coach' },
      ];
    } else if (num <= 30) {
      stageSummary = 'Against the Wanima twins of Team W, Hyoma Chigiri breaks his mental chains and unleashes his top-end sprint speed.';
      featuredCharacters = [
        { name: 'Hyoma Chigiri', slug: 'hyoma-chigiri', role: 'Speedster' },
        { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
        { name: 'Meguru Bachira', slug: 'meguru-bachira', role: 'Playmaker' },
      ];
    } else {
      stageSummary = 'The First Selection climax: Team Z risks everything against the unbeaten Team V of Seishiro Nagi, Reo Mikage and Zantetsu.';
      featuredCharacters = [
        { name: 'Seishiro Nagi', slug: 'seishiro-nagi', role: 'Trapping Prodigy' },
        { name: 'Reo Mikage', slug: 'reo-mikage', role: 'Chameleon Midfielder' },
        { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
      ];
    }
  } else if (num <= 87) {
    arcName = 'Second Selection Arc';
    arcSlug = 'second-selection';
    arcDescription = "The squad-stealing tournament where small teams duel in sudden-death matches, taking defeated opponents' players to build a full five-man unit.";
    if (num <= 55) {
      stageSummary = "Isagi and Bachira run into Rin Itoshi's top-ranked squad, lose Bachira, and have to fight their way back up.";
      featuredCharacters = [
        { name: 'Rin Itoshi', slug: 'rin-itoshi', role: 'Number 1 Striker' },
        { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
        { name: 'Meguru Bachira', slug: 'meguru-bachira', role: 'Captured Ally' },
      ];
    } else {
      stageSummary = "Isagi teams up with Seishiro Nagi and devours Shoei Barou's king mentality, forming an attacking trio that challenges Rin's squad to win Bachira back.";
      featuredCharacters = [
        { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
        { name: 'Shoei Barou', slug: 'shoei-barou', role: 'King' },
        { name: 'Seishiro Nagi', slug: 'seishiro-nagi', role: 'Creative Genius' },
      ];
    }
  } else if (num <= 151) {
    arcName = 'Third Selection & Japan U-20 Match';
    arcSlug = 'third-selection-u20';
    arcDescription = "Blue Lock's future is on the line as Jinpachi Ego's Blue Lock Eleven take on Sae Itoshi and the Japan U-20 national team.";
    stageSummary = "In front of a packed stadium, Isagi and Rin push their egos to the limit against Sae Itoshi's world-class midfield and Oliver Aiku's defense.";
    featuredCharacters = [
      { name: 'Sae Itoshi', slug: 'sae-itoshi', role: 'World 11 Midfielder' },
      { name: 'Rin Itoshi', slug: 'rin-itoshi', role: 'Striker' },
      { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
    ];
  } else if (num >= 303) {
    arcName = 'U-20 World Cup Arc';
    arcSlug = 'u20-world-cup';
    arcDescription = 'Phase three of the Blue Lock project: Blue Lock Japan takes on the best young national teams in the world at the FIFA U-20 World Cup.';
    if (num < 313) {
      stageSummary = "After the Neo Egoist League, the top 23 players form Blue Lock Japan and prepare for the U-20 World Cup, while the eliminated players, Nagi among them, chase a second chance.";
      featuredCharacters = [
        { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
        { name: 'Seishiro Nagi', slug: 'seishiro-nagi', role: 'Eliminated Genius' },
        { name: 'Jinpachi Ego', slug: 'jinpachi-ego', role: 'Architect Coach' },
      ];
    } else {
      stageSummary = "The U-20 World Cup is underway: Blue Lock Japan faces the world's best young national teams, from Nigeria to France and England.";
      featuredCharacters = [
        { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
        { name: 'Rin Itoshi', slug: 'rin-itoshi', role: 'Striker' },
        { name: 'Seishiro Nagi', slug: 'seishiro-nagi', role: 'Side B' },
      ];
    }
  } else if (num <= 200) {
    stageSummary = "Bastard München's German discipline meets Blue Lock's philosophy as Isagi clashes with Michael Kaiser while facing FC Barcha and Manshine City.";
    featuredCharacters = [
      { name: 'Michael Kaiser', slug: 'michael-kaiser', role: 'Bastard München Ace' },
      { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
      { name: 'Seishiro Nagi', slug: 'seishiro-nagi', role: 'Manshine City Ace' },
    ];
  } else if (num <= 247) {
    stageSummary = "Bastard München takes on Italy's tactical fortress Ubers, run by Marc Snuffy and powered by Don Lorenzo and Shoei Barou.";
    featuredCharacters = [
      { name: 'Shoei Barou', slug: 'shoei-barou', role: 'Ubers Striker' },
      { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
      { name: 'Rensuke Kunigami', slug: 'rensuke-kunigami', role: 'Wild Card' },
    ];
  } else {
    stageSummary = "The final match of the Neo Egoist League: Bastard München vs Paris X Gen. Isagi, Rin Itoshi, Ryusei Shidou and Michael Kaiser push Metavision and flow to their limits, with places in the U-20 World Cup squad at stake.";
    featuredCharacters = [
      { name: 'Yoichi Isagi', slug: 'yoichi-isagi', role: 'Protagonist' },
      { name: 'Rin Itoshi', slug: 'rin-itoshi', role: 'PXG Striker' },
      { name: 'Michael Kaiser', slug: 'michael-kaiser', role: 'Bastard München Ace' },
    ];
  }

  return { arcName, arcSlug, arcDescription, stageSummary, featuredCharacters };
}

/**
 * SEO data for a chapter page.
 * @param {number} chapterNumber
 * @param {{ title?: string, pageCount?: number, note?: { title?: string, summary?: string } }} [opts]
 */
export function getChapterSEOData(chapterNumber, opts = {}) {
  const num = chapterNumber;
  const arc = getArcInfo(num);
  const note = opts.note || {};
  const title = note.title || realChapterTitle(num, opts.title);
  const hasPages = opts.pageCount === undefined ? true : opts.pageCount > 0;
  const summary = note.summary || arc.stageSummary;
  const canonicalUrl = `${SITE_URL}/chapter/${num}`;

  const seoTitle = title
    ? trimText(`Blue Lock Chapter ${num}: ${title} – Read Online`, 65)
    : `Blue Lock Chapter ${num} – Read Manga Online | ${SITE_NAME}`;
  const seoDescription = trimText(
    `Read Blue Lock Chapter ${num}${title ? ` "${title}"` : ''} online (${arc.arcName}). ${summary}`,
    160,
  );

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
      about: SERIES,
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'All Chapters', path: '/manga' },
      { name: `Chapter ${num}`, path: `/chapter/${num}` },
    ]),
  ];

  return {
    number: num,
    title: title || `Chapter ${num}`,
    hasRealTitle: Boolean(title),
    summary,
    hasUniqueSummary: Boolean(note.summary),
    ...arc,
    seoTitle,
    seoDescription,
    canonicalUrl,
    noindex: !hasPages,
    schemas,
  };
}

export function getCharacterSEOData(character) {
  const url = `${SITE_URL}/characters/${character.slug}`;
  const image = abs(character.image);
  // Social networks get the original JPG (best compatibility); the site shows the lighter WebP.
  const ogImage = character.image.startsWith('/characters/') ? abs(character.image.replace(/\.webp$/, '.jpg')) : DEFAULT_OG_IMAGE;
  // Fans search "nagi blue lock", "isagi blue lock"... so lead with the short name.
  const lead = character.shortName ? `${character.shortName} Blue Lock: ${character.name}` : `${character.name} (Blue Lock)`;
  const isPlayer = !/staff|coach/i.test(character.role);
  const seoTitle = `${lead} Profile${character.age ? ', Age' : ''} & ${isPlayer ? 'Weapons' : 'Role'}`;
  const seoDescription = trimText(
    `${character.name} in Blue Lock: ${character.description}${character.age ? ` Age: ${character.age}.` : ''} Weapon: ${character.weapon}. Abilities, story and key chapters.`,
    160,
  );
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: seoTitle,
      url,
      mainEntity: {
        '@type': 'Person',
        name: character.name,
        description: character.description,
        image,
        subjectOf: SERIES,
      },
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Characters', path: '/characters' },
      { name: character.name, path: `/characters/${character.slug}` },
    ]),
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

// Meta for the fixed pages. Used by the React pages AND the prerender script so they always match.
export const PAGE_META = {
  '/': {
    title: 'Blue Lock Manga – Read Blue Lock Manga Online, All Chapters',
    description: "Read Blue Lock manga online: every chapter of Muneyuki Kaneshiro & Yusuke Nomura's soccer manga in HD, plus character profiles and answers to fans' top questions.",
  },
  '/manga': {
    title: 'Read Blue Lock Manga Chapters – Full Chapter List',
    description: 'Read Blue Lock manga chapters in order, from Chapter 1 to the latest release, grouped by story arc. How many chapters there are and where each arc starts.',
  },
  '/characters': {
    title: 'Blue Lock Characters – Main Character, Profiles & Weapons',
    description: "Blue Lock's main character is Yoichi Isagi. Profiles of Isagi, Nagi, Bachira, Rin, Kaiser and more: roles, weapons, abilities and key chapters.",
  },
  '/about': {
    title: 'About Blue Lock Manga – Independent Fan Project',
    description: "About Blue Lock Manga, an independent fan project and reading archive for Muneyuki Kaneshiro & Yusuke Nomura's Blue Lock.",
  },
  '/privacy': {
    title: 'Privacy Policy – Blue Lock Manga',
    description: 'How Blue Lock Manga handles data and protects visitor privacy.',
  },
  '/terms': {
    title: 'Terms and Conditions – Blue Lock Manga',
    description: 'Terms of service, user agreements and conduct guidelines for Blue Lock Manga.',
  },
  '/dmca': {
    title: 'DMCA Copyright Notice & Takedown Policy – Blue Lock Manga',
    description: 'DMCA compliance and how to submit a copyright takedown notice to Blue Lock Manga.',
  },
  '/disclaimer': {
    title: 'Legal Disclaimer – Blue Lock Manga',
    description: 'Legal disclaimer and copyright notices for Blue Lock Manga, an unofficial fan project.',
  },
};

export function homeSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ComicSeries',
      name: 'Blue Lock',
      alternateName: ['ブルーロック', 'Buruu Rokku'],
      description: "Three hundred high school forwards are locked inside Jinpachi Ego's Blue Lock facility, where only one egoist striker will emerge to lead Japan to the World Cup.",
      url: `${SITE_URL}/`,
      image: DEFAULT_OG_IMAGE,
      author: [
        { '@type': 'Person', name: 'Muneyuki Kaneshiro' },
        { '@type': 'Person', name: 'Yusuke Nomura' },
      ],
      publisher: { '@type': 'Organization', name: 'Kodansha', url: 'https://www.kodansha.co.jp' },
      genre: ['Sports', 'Psychological', 'Shounen', 'Soccer'],
      startDate: '2018-08-01',
    },
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
