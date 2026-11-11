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

// Language codes used across <html lang>, og:locale and hreflang.
export const LANGS = ['en', 'fr', 'pt'];
export const HTML_LANG = { en: 'en', fr: 'fr', pt: 'pt-BR' };
export const OG_LOCALE = { en: 'en_US', fr: 'fr_FR', pt: 'pt_BR' };
export const langPrefix = (lang) => (lang === 'en' || !lang ? '' : `/${lang}`);

/** Build hreflang alternates for a base path, only for the languages that really exist. */
export function buildAlternates(basePath, langs = LANGS) {
  const href = (l) => `${SITE_URL}${langPrefix(l)}${basePath === '/' ? (l === 'en' ? '/' : '') : basePath}`;
  const list = langs.map(l => ({ rel: 'alternate', hreflang: l, href: href(l) }));
  if (langs.includes('en')) list.push({ rel: 'alternate', hreflang: 'x-default', href: href('en') });
  else if (langs.length) list.push({ rel: 'alternate', hreflang: 'x-default', href: href(langs[0]) });
  return list;
}

// French / Portuguese versions of the arc copy, keyed by the English string.
const ARC_I18N = {
  'First Selection Arc': { fr: 'Arc de la Première Sélection', pt: 'Arco da Primeira Seleção' },
  'Second Selection Arc': { fr: 'Arc de la Deuxième Sélection', pt: 'Arco da Segunda Seleção' },
  'Third Selection & Japan U-20 Match': { fr: 'Troisième Sélection et match contre le Japon U-20', pt: 'Terceira Seleção e partida contra o Japão Sub-20' },
  'Neo Egoist League Arc': { fr: 'Arc de la Néo Egoist League', pt: 'Arco da Neo Egoist League' },
  'U-20 World Cup Arc': { fr: 'Arc de la Coupe du Monde U-20', pt: 'Arco da Copa do Mundo Sub-20' },
  "The international training league where Japan's top strikers join European powerhouse clubs (Bastard München, Manshine City, Ubers, PXG, Barcha) and compete in televised matches for real club contract bids.": {
    fr: "La ligue d'entraînement internationale où les meilleurs attaquants japonais rejoignent les grands clubs européens (Bastard München, Manshine City, Ubers, PXG, Barcha) et s'affrontent dans des matchs télévisés pour décrocher de vraies offres de contrat.",
    pt: 'A liga internacional de treinamento em que os melhores atacantes do Japão entram nos grandes clubes europeus (Bastard München, Manshine City, Ubers, PXG, Barcha) e disputam partidas transmitidas ao vivo por propostas reais de contrato.',
  },
  "In the Neo Egoist League, Yoichi Isagi battles world-class rivals like Rin Itoshi and Michael Kaiser, sharpening his Metavision and egoism to take over the pitch.": {
    fr: "Dans la Néo Egoist League, Yoichi Isagi affronte des rivaux de classe mondiale comme Rin Itoshi et Michael Kaiser, et affûte sa Métavision et son égoïsme pour dominer le terrain.",
    pt: 'Na Neo Egoist League, Yoichi Isagi enfrenta rivais de nível mundial como Rin Itoshi e Michael Kaiser, afiando sua Metavisão e seu egoísmo para dominar o campo.',
  },
  'The brutal opening survival tournament inside Blue Lock, where five-man teams clash in round-robin matches to avoid being expelled from Japanese soccer forever.': {
    fr: "Le tournoi de survie impitoyable qui ouvre Blue Lock : des équipes de cinq s'affrontent en matchs de poule pour ne pas être bannies à vie du football japonais.",
    pt: 'O brutal torneio de sobrevivência que abre o Blue Lock: times de cinco jogadores se enfrentam em pontos corridos para não serem expulsos do futebol japonês para sempre.',
  },
  "Yoichi Isagi, Meguru Bachira and Team Z face the reality of Jinpachi Ego's experiment in their opening match against Barou's Team X.": {
    fr: "Yoichi Isagi, Meguru Bachira et l'équipe Z découvrent la réalité de l'expérience de Jinpachi Ego lors de leur premier match contre l'équipe X de Barou.",
    pt: 'Yoichi Isagi, Meguru Bachira e o Time Z encaram a realidade do experimento de Jinpachi Ego na estreia contra o Time X de Barou.',
  },
  "Team Z takes on Team Y in a battle of wits, where Isagi's spatial awareness clashes with Niko Ikki's calculated tactics.": {
    fr: "L'équipe Z affronte l'équipe Y dans une bataille tactique où la vision du jeu d'Isagi se heurte aux calculs de Niko Ikki.",
    pt: 'O Time Z enfrenta o Time Y numa batalha de inteligência, em que a leitura de espaço de Isagi bate de frente com as táticas calculadas de Niko Ikki.',
  },
  'Against the Wanima twins of Team W, Hyoma Chigiri breaks his mental chains and unleashes his top-end sprint speed.': {
    fr: "Face aux jumeaux Wanima de l'équipe W, Hyoma Chigiri brise ses chaînes mentales et libère sa vitesse de pointe.",
    pt: 'Contra os gêmeos Wanima do Time W, Hyoma Chigiri quebra suas amarras mentais e solta toda a sua velocidade.',
  },
  'The First Selection climax: Team Z risks everything against the unbeaten Team V of Seishiro Nagi, Reo Mikage and Zantetsu.': {
    fr: "Le point culminant de la Première Sélection : l'équipe Z joue son va-tout contre l'équipe V invaincue de Seishiro Nagi, Reo Mikage et Zantetsu.",
    pt: 'O clímax da Primeira Seleção: o Time Z arrisca tudo contra o invicto Time V de Seishiro Nagi, Reo Mikage e Zantetsu.',
  },
  "The squad-stealing tournament where small teams duel in sudden-death matches, taking defeated opponents' players to build a full five-man unit.": {
    fr: "Le tournoi où les équipes se volent des joueurs : de petits groupes s'affrontent en mort subite et recrutent les vaincus pour former une équipe de cinq.",
    pt: 'O torneio de roubar jogadores: pequenos times se enfrentam em morte súbita e levam os derrotados para formar uma equipe completa de cinco.',
  },
  "Isagi and Bachira run into Rin Itoshi's top-ranked squad, lose Bachira, and have to fight their way back up.": {
    fr: "Isagi et Bachira tombent sur l'équipe de Rin Itoshi, numéro un du classement, perdent Bachira et doivent remonter la pente.",
    pt: 'Isagi e Bachira dão de cara com o time de Rin Itoshi, o número 1 do ranking, perdem Bachira e precisam lutar para voltar.',
  },
  "Isagi teams up with Seishiro Nagi and devours Shoei Barou's king mentality, forming an attacking trio that challenges Rin's squad to win Bachira back.": {
    fr: "Isagi s'allie à Seishiro Nagi et dévore la mentalité de roi de Shoei Barou, formant un trio offensif qui défie l'équipe de Rin pour récupérer Bachira.",
    pt: 'Isagi se junta a Seishiro Nagi e devora a mentalidade de rei de Shoei Barou, formando um trio de ataque que desafia o time de Rin para recuperar Bachira.',
  },
  "Blue Lock's future is on the line as Jinpachi Ego's Blue Lock Eleven take on Sae Itoshi and the Japan U-20 national team.": {
    fr: "L'avenir de Blue Lock est en jeu : le Blue Lock Eleven de Jinpachi Ego affronte Sae Itoshi et l'équipe nationale du Japon U-20.",
    pt: 'O futuro do Blue Lock está em jogo: o Blue Lock Eleven de Jinpachi Ego enfrenta Sae Itoshi e a seleção japonesa Sub-20.',
  },
  "In front of a packed stadium, Isagi and Rin push their egos to the limit against Sae Itoshi's world-class midfield and Oliver Aiku's defense.": {
    fr: "Devant un stade comble, Isagi et Rin poussent leur ego à bout face au milieu de classe mondiale de Sae Itoshi et à la défense d'Oliver Aiku.",
    pt: 'Diante de um estádio lotado, Isagi e Rin levam seus egos ao limite contra o meio-campo de nível mundial de Sae Itoshi e a defesa de Oliver Aiku.',
  },
  'Phase three of the Blue Lock project: Blue Lock Japan takes on the best young national teams in the world at the FIFA U-20 World Cup.': {
    fr: 'La phase trois du projet Blue Lock : le Blue Lock Japan affronte les meilleures sélections de jeunes du monde lors de la Coupe du Monde U-20.',
    pt: 'A fase três do projeto Blue Lock: o Blue Lock Japan enfrenta as melhores seleções jovens do mundo na Copa do Mundo Sub-20.',
  },
  "After the Neo Egoist League, the top 23 players form Blue Lock Japan and prepare for the U-20 World Cup, while the eliminated players, Nagi among them, chase a second chance.": {
    fr: "Après la Néo Egoist League, les 23 meilleurs joueurs forment le Blue Lock Japan et préparent la Coupe du Monde U-20, tandis que les éliminés, dont Nagi, cherchent une seconde chance.",
    pt: 'Depois da Neo Egoist League, os 23 melhores jogadores formam o Blue Lock Japan e se preparam para a Copa do Mundo Sub-20, enquanto os eliminados, entre eles Nagi, buscam uma segunda chance.',
  },
  "The U-20 World Cup is underway: Blue Lock Japan faces the world's best young national teams, from Nigeria to France and England.": {
    fr: "La Coupe du Monde U-20 a commencé : le Blue Lock Japan affronte les meilleures sélections de jeunes, du Nigeria à la France et à l'Angleterre.",
    pt: 'A Copa do Mundo Sub-20 começou: o Blue Lock Japan enfrenta as melhores seleções jovens do mundo, da Nigéria à França e à Inglaterra.',
  },
  "Bastard München's German discipline meets Blue Lock's philosophy as Isagi clashes with Michael Kaiser while facing FC Barcha and Manshine City.": {
    fr: "La discipline allemande du Bastard München rencontre la philosophie de Blue Lock : Isagi s'oppose à Michael Kaiser tout en affrontant le FC Barcha et Manshine City.",
    pt: 'A disciplina alemã do Bastard München encontra a filosofia do Blue Lock: Isagi bate de frente com Michael Kaiser enquanto enfrenta o FC Barcha e o Manshine City.',
  },
  "Bastard München takes on Italy's tactical fortress Ubers, run by Marc Snuffy and powered by Don Lorenzo and Shoei Barou.": {
    fr: "Le Bastard München affronte l'Ubers, la forteresse tactique italienne de Marc Snuffy, portée par Don Lorenzo et Shoei Barou.",
    pt: 'O Bastard München enfrenta o Ubers, a fortaleza tática italiana comandada por Marc Snuffy e movida por Don Lorenzo e Shoei Barou.',
  },
  "The final match of the Neo Egoist League: Bastard München vs Paris X Gen. Isagi, Rin Itoshi, Ryusei Shidou and Michael Kaiser push Metavision and flow to their limits, with places in the U-20 World Cup squad at stake.": {
    fr: "Le dernier match de la Néo Egoist League : Bastard München contre Paris X Gen. Isagi, Rin Itoshi, Ryusei Shidou et Michael Kaiser poussent la Métavision et le flow à leurs limites, avec une place dans l'équipe de la Coupe du Monde U-20 en jeu.",
    pt: 'A partida final da Neo Egoist League: Bastard München contra Paris X Gen. Isagi, Rin Itoshi, Ryusei Shidou e Michael Kaiser levam a Metavisão e o flow ao limite, com vagas no elenco da Copa do Mundo Sub-20 em jogo.',
  },
};
const tr = (text, lang) => (lang && lang !== 'en' && ARC_I18N[text]?.[lang]) || text;

export function getArcInfo(chapterNumber, lang = 'en') {
  const info = getArcInfoEn(chapterNumber);
  if (lang === 'en') return info;
  return {
    ...info,
    arcName: tr(info.arcName, lang),
    arcDescription: tr(info.arcDescription, lang),
    stageSummary: tr(info.stageSummary, lang),
  };
}

function getArcInfoEn(chapterNumber) {
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
 * @param {{ title?: string, pageCount?: number, note?: { title?: string, summary?: string }, lang?: 'en' | 'fr' | 'pt' }} [opts]
 */
export function getChapterSEOData(chapterNumber, opts = {}) {
  const num = chapterNumber;
  const lang = opts.lang || 'en';
  const arc = getArcInfo(num, lang);
  const note = opts.note || {};
  // Chapter notes are written in English, so only use them on English pages.
  const title = (lang === 'en' && note.title) || realChapterTitle(num, opts.title);
  const hasPages = opts.pageCount === undefined ? true : opts.pageCount > 0;
  const summary = (lang === 'en' && note.summary) || arc.stageSummary;
  // Languages that really have scans for this chapter (drives hreflang). Defaults to all.
  const availableLangs = (opts.availableLangs || LANGS).filter(l => LANGS.includes(l));

  const canonicalUrl = `${SITE_URL}${langPrefix(lang)}/chapter/${num}`;

  let seoTitle = '';
  let seoDescription = '';

  if (lang === 'fr') {
    seoTitle = title
      ? trimText(`Blue Lock Chapitre ${num} VF : ${title} – Scan en Ligne`, 65)
      : `Blue Lock Chapitre ${num} VF – Lire le Scan en Ligne Gratuit`;
    seoDescription = trimText(
      `Lire le scan Blue Lock chapitre ${num} VF en français, gratuit et en HD. ${arc.arcName} : ${summary}`,
      160
    );
  } else if (lang === 'pt') {
    seoTitle = title
      ? trimText(`Blue Lock Capítulo ${num}: ${title} – Ler Mangá em Português`, 65)
      : `Blue Lock Capítulo ${num} – Ler Mangá Online em Português PT-BR`;
    seoDescription = trimText(
      `Ler mangá Blue Lock capítulo ${num} online grátis em português (PT-BR) e em HD. ${arc.arcName}: ${summary}`,
      160
    );
  } else {
    seoTitle = title
      ? trimText(`Blue Lock Chapter ${num}: ${title} – Read Online in English`, 65)
      : `Blue Lock Chapter ${num} – Read Manga Online in English`;
    seoDescription = trimText(
      `Read Blue Lock Chapter ${num}${title ? ` "${title}"` : ''} in English online for free, in HD. ${arc.arcName}: ${summary}`,
      160
    );
  }

  const breadcrumbItems = lang === 'fr' ? [
    { name: 'Accueil', path: '/fr' },
    { name: 'Tous les chapitres', path: '/fr/manga' },
    { name: `Chapitre ${num}`, path: `/fr/chapter/${num}` },
  ] : lang === 'pt' ? [
    { name: 'Início', path: '/pt' },
    { name: 'Todos os Capítulos', path: '/pt/manga' },
    { name: `Capítulo ${num}`, path: `/pt/chapter/${num}` },
  ] : [
    { name: 'Home', path: '/' },
    { name: 'All Chapters', path: '/manga' },
    { name: `Chapter ${num}`, path: `/chapter/${num}` },
  ];

  const chapterWord = lang === 'fr' ? 'Chapitre' : lang === 'pt' ? 'Capítulo' : 'Chapter';
  const published = opts.releaseDate ? String(opts.releaseDate).slice(0, 10) : undefined;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      inLanguage: HTML_LANG[lang],
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
      mainEntity: {
        '@type': 'ComicIssue',
        name: `Blue Lock ${chapterWord} ${num}${title ? `: ${title}` : ''}`,
        issueNumber: String(num),
        inLanguage: HTML_LANG[lang],
        url: canonicalUrl,
        ...(published ? { datePublished: published } : {}),
        author: [
          { '@type': 'Person', name: 'Muneyuki Kaneshiro' },
          { '@type': 'Person', name: 'Yusuke Nomura' },
        ],
        isPartOf: SERIES,
      },
    },
    breadcrumbSchema(breadcrumbItems),
  ];

  // hreflang must only point at versions that exist and are indexable.
  const alternateLinks = hasPages && availableLangs.includes(lang)
    ? buildAlternates(`/chapter/${num}`, availableLangs)
    : [];

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
    alternateLinks,
  };
}

export function getCharacterSEOData(character, lang = 'en') {
  const url = lang === 'fr'
    ? `${SITE_URL}/fr/characters/${character.slug}`
    : lang === 'pt'
    ? `${SITE_URL}/pt/characters/${character.slug}`
    : `${SITE_URL}/characters/${character.slug}`;

  let seoTitle = '';
  let seoDescription = '';

  if (lang === 'fr') {
    seoTitle = trimText(`${character.name} – Profil, Armes et Capacités Blue Lock`, 65);
    seoDescription = trimText(`Tout savoir sur ${character.name} dans Blue Lock : rôle (${character.role}), arme (${character.weapon}), capacités et moments clés.`, 160);
  } else if (lang === 'pt') {
    seoTitle = trimText(`${character.name} – Perfil, Armas e Habilidades Blue Lock`, 65);
    seoDescription = trimText(`Tudo sobre ${character.name} em Blue Lock: posição (${character.role}), arma (${character.weapon}), habilidades e capítulos marcantes.`, 160);
  } else {
    seoTitle = character.shortName
      ? trimText(`${character.name} (${character.shortName}) – Blue Lock Character Profile, Weapon & Role`, 65)
      : trimText(`${character.name} – Blue Lock Character Profile, Weapon & Role`, 65);
    seoDescription = trimText(
      `${character.name} is a ${character.role} in Blue Lock (${character.grade}). Weapon: ${character.weapon}. Abilities: ${character.abilities} First appeared in ${character.firstAppearance}.`,
      160,
    );
  }

  const ogImage = character.image.startsWith('/characters/') ? abs(character.image.replace(/\.webp$/, '.jpg')) : DEFAULT_OG_IMAGE;

  const breadcrumbItems = lang === 'fr' ? [
    { name: 'Accueil', path: '/fr' },
    { name: 'Personnages', path: '/fr/characters' },
    { name: character.name, path: `/fr/characters/${character.slug}` },
  ] : lang === 'pt' ? [
    { name: 'Início', path: '/pt' },
    { name: 'Personagens', path: '/pt/characters' },
    { name: character.name, path: `/pt/characters/${character.slug}` },
  ] : [
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
    title: 'Blue Lock Manga – Read Blue Lock Chapters Online in English',
    description: "Read Blue Lock manga online in English: every chapter of Muneyuki Kaneshiro & Yusuke Nomura's soccer manga, free and in HD, plus character profiles and arc guides.",
  },
  '/en': {
    title: 'Blue Lock Manga – Read Blue Lock Chapters Online in English',
    description: "Read Blue Lock manga online in English: every chapter of Muneyuki Kaneshiro & Yusuke Nomura's soccer manga, free and in HD, plus character profiles and arc guides.",
  },
  '/fr': {
    title: 'Blue Lock Manga Scan VF – Lecture en Ligne Gratuite HD',
    description: 'Lire le manga Blue Lock en scan VF, gratuit et en HD. Tous les chapitres en français disponibles en ligne sans inscription, du chapitre 1 au dernier scan.',
  },
  '/pt': {
    title: 'Blue Lock Mangá Online – Ler Todos os Capítulos em Português HD',
    description: 'Ler mangá Blue Lock online grátis em português (PT-BR). Todos os capítulos em alta qualidade, sem cadastro, do capítulo 1 ao último lançamento.',
  },
  '/manga': {
    title: 'Blue Lock Chapter List – Read All Chapters Online in English',
    description: 'Every Blue Lock manga chapter in order, from Chapter 1 to the latest release, grouped by story arc. Read them all online in English for free.',
  },
  '/en/manga': {
    title: 'Blue Lock Chapter List – Read All Chapters Online in English',
    description: 'Every Blue Lock manga chapter in order, from Chapter 1 to the latest release, grouped by story arc. Read them all online in English for free.',
  },
  '/fr/manga': {
    title: 'Blue Lock Scan VF – Tous les Chapitres en Ligne Gratuits',
    description: 'Liste complète des chapitres de Blue Lock en scan VF. Tous les arcs narratifs du Chapitre 1 aux derniers scans.',
  },
  '/pt/manga': {
    title: 'Ler Mangá Blue Lock – Todos os Capítulos em Português',
    description: 'Lista completa de capítulos de Blue Lock em português (PT-BR), organizados por arco. Leia do capítulo 1 aos lançamentos mais recentes.',
  },
  '/characters': {
    title: 'Blue Lock Characters – Main Character, Profiles & Weapons',
    description: "Blue Lock's main character is Yoichi Isagi. Profiles of Isagi, Nagi, Bachira, Rin, Kaiser and more.",
  },
  '/en/characters': {
    title: 'Blue Lock Characters – Main Character, Profiles & Weapons',
    description: "Blue Lock's main character is Yoichi Isagi. Profiles of Isagi, Nagi, Bachira, Rin, Kaiser and more.",
  },
  '/fr/characters': {
    title: 'Personnages de Blue Lock – Profils, Armes et Capacités',
    description: 'Retrouvez tous les personnages de Blue Lock : Yoichi Isagi, Meguru Bachira, Rin Itoshi, Nagi, Barou et les maîtres attaquants.',
  },
  '/pt/characters': {
    title: 'Personagens de Blue Lock – Perfis, Armas e Habilidades',
    description: 'Conheça todos os personagens de Blue Lock: Yoichi Isagi, Bachira, Rin Itoshi, Seishiro Nagi, Barou e muito mais.',
  },
  '/about': {
    title: 'About Blue Lock Manga – Independent Fan Project',
    description: "About Blue Lock Manga, an independent fan project and reading archive for Muneyuki Kaneshiro & Yusuke Nomura's Blue Lock.",
  },
  '/en/about': {
    title: 'About Blue Lock Manga – Independent Fan Project',
    description: "About Blue Lock Manga, an independent fan project and reading archive for Muneyuki Kaneshiro & Yusuke Nomura's Blue Lock.",
  },
  '/fr/about': {
    title: 'À Propos – Blue Lock Manga VF',
    description: 'À propos de Blue Lock Manga, projet fan indépendant pour la lecture en ligne de Blue Lock en français.',
  },
  '/pt/about': {
    title: 'Sobre Nós – Blue Lock Mangá',
    description: 'Sobre o projeto Blue Lock Mangá em português, site independente feito por fãs para fãs.',
  },
  '/privacy': {
    title: 'Privacy Policy – Blue Lock Manga',
    description: 'How Blue Lock Manga handles data and protects visitor privacy.',
  },
  '/en/privacy': {
    title: 'Privacy Policy – Blue Lock Manga',
    description: 'How Blue Lock Manga handles data and protects visitor privacy.',
  },
  '/fr/privacy': {
    title: 'Politique de Confidentialité – Blue Lock Manga',
    description: 'Politique de confidentialité et protection des données sur Blue Lock Manga.',
  },
  '/pt/privacy': {
    title: 'Política de Privacidade – Blue Lock Mangá',
    description: 'Política de privacidade e proteção de dados no Blue Lock Mangá.',
  },
  '/terms': {
    title: 'Terms and Conditions – Blue Lock Manga',
    description: 'Terms of service, user agreements and conduct guidelines for Blue Lock Manga.',
  },
  '/en/terms': {
    title: 'Terms and Conditions – Blue Lock Manga',
    description: 'Terms of service, user agreements and conduct guidelines for Blue Lock Manga.',
  },
  '/fr/terms': {
    title: 'Conditions d\'Utilisation – Blue Lock Manga',
    description: 'Conditions générales d\'utilisation du site Blue Lock Manga.',
  },
  '/pt/terms': {
    title: 'Termos e Condições – Blue Lock Mangá',
    description: 'Termos de serviço e diretrizes de uso do Blue Lock Mangá.',
  },
  '/dmca': {
    title: 'DMCA Copyright Notice & Takedown Policy – Blue Lock Manga',
    description: 'DMCA compliance and how to submit a copyright takedown notice to Blue Lock Manga.',
  },
  '/en/dmca': {
    title: 'DMCA Copyright Notice & Takedown Policy – Blue Lock Manga',
    description: 'DMCA compliance and how to submit a copyright takedown notice to Blue Lock Manga.',
  },
  '/fr/dmca': {
    title: 'DMCA et Droits d\'Auteur – Blue Lock Manga',
    description: 'Notification DMCA et procédure de retrait pour Blue Lock Manga.',
  },
  '/pt/dmca': {
    title: 'Aviso de DMCA e Direitos Autorais – Blue Lock Mangá',
    description: 'Política de DMCA e solicitação de remoção no Blue Lock Mangá.',
  },
  '/disclaimer': {
    title: 'Legal Disclaimer – Blue Lock Manga',
    description: 'Legal disclaimer and copyright notices for Blue Lock Manga, an unofficial fan project.',
  },
  '/en/disclaimer': {
    title: 'Legal Disclaimer – Blue Lock Manga',
    description: 'Legal disclaimer and copyright notices for Blue Lock Manga, an unofficial fan project.',
  },
  '/fr/disclaimer': {
    title: 'Avertissement Légal – Blue Lock Manga',
    description: 'Mentions légales et avertissement de droit d\'auteur pour Blue Lock Manga.',
  },
  '/pt/disclaimer': {
    title: 'Aviso Legal – Blue Lock Mangá',
    description: 'Aviso legal e isenção de responsabilidade do projeto de fãs Blue Lock Mangá.',
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
