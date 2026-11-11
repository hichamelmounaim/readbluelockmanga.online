// Haikyu!! Guide pages (anime, arcs, teams, author).
// Rendered by pages/GuidePage.tsx in the app and by scripts/prerender.mjs as static HTML.

const ANIME_RELATED = [
  { label: 'Haikyu!! Anime Guide', to: '/anime' },
  { label: 'The Dumpster Battle Movie', to: '/anime/dumpster-battle' },
  { label: 'Season 4 (To The Top)', to: '/anime/season-4' },
  { label: 'Season 2 & Training Camp', to: '/anime/season-2' },
  { label: 'All Haikyu!! Arcs', to: '/arcs' },
];

const ARC_RELATED = [
  { label: 'All Haikyu!! Arcs', to: '/arcs' },
  { label: 'Karasuno Formation Arc', to: '/arcs/karasuno-formation' },
  { label: 'Interhigh Preliminary Arc', to: '/arcs/interhigh' },
  { label: 'Tokyo Training Camp Arc', to: '/arcs/tokyo-training-camp' },
  { label: 'Spring High Miyagi Prelims', to: '/arcs/spring-high-preliminary' },
  { label: 'Tokyo Nationals Arc', to: '/arcs/tokyo-nationals' },
  { label: 'Final Arc & V.League', to: '/arcs/final-arc' },
];

export const GUIDES = {
  // ------------------------------------------------------------------ ANIME
  '/anime': {
    title: 'Haikyu!! Anime: Seasons, Watch Order, Movies & Where to Watch',
    description: 'Complete guide to the Haikyu!! anime: all 4 TV seasons, OVAs, The Dumpster Battle movie, chronological watch order, and streaming platforms.',
    kicker: 'Anime Guide',
    h1: 'Haikyu!! Anime Complete Guide',
    intro: [
      "The Haikyu!! anime adaptation by Production I.G is celebrated as one of the greatest sports anime of all time. Combining kinetic animation, breathtaking volleyball choreography, and unforgettable soundtracks by Yuki Hayashi, it has captured millions of fans worldwide.",
    ],
    sections: [
      {
        h2: 'How many seasons and episodes of Haikyu!! are there?',
        paras: ['Haikyu!! comprises 4 television seasons totaling 85 episodes, multiple OVAs, and feature films:'],
        list: [
          'Season 1: 25 episodes (April–September 2014) - Team formation, Date Tech, and Aoba Johsai showdown.',
          'Season 2: 25 episodes (October 2015–March 2016) - Tokyo Training Camp and Aoba Johsai rematch.',
          'Season 3 (Karasuno vs Shiratorizawa): 10 episodes (October–December 2016) - 5-set finals vs Ushijima.',
          'Season 4 (To The Top): 25 episodes in two cours (January–December 2020) - All-Japan Youth Camp & Inarizaki battle.',
          'Haikyu!! The Dumpster Battle (Movie): Released February 2024 in Japan, grossing over $100M globally.',
        ],
        links: [
          { label: 'The Dumpster Battle Movie Details', to: '/anime/dumpster-battle' },
          { label: 'Season 4 Details', to: '/anime/season-4' },
          { label: 'Season 2 Details', to: '/anime/season-2' },
        ],
      },
      {
        h2: 'Haikyu!! chronological watch order',
        paras: ['To experience the story chronologically including essential OVAs:'],
        list: [
          '1. Haikyu!! Season 1 (Episodes 1–25)',
          '2. OVA: The Arrival of Haiba Lev! (Pre-Season 2 training)',
          '3. Haikyu!! Season 2 (Episodes 1–25)',
          '4. OVA: "VS Failing Marks" (Hinata & Kageyama exam struggles)',
          '5. Haikyu!! Season 3: Karasuno vs Shiratorizawa (Episodes 1–10)',
          '6. OVA: Land vs. Air & The Path of the Ball (Tokyo playoffs: Nekoma, Fukurodani, Nohebi)',
          '7. Haikyu!! To The Top (Season 4, Episodes 1–25)',
          '8. Haikyu!! The Dumpster Battle (Movie: Karasuno vs Nekoma)',
        ],
      },
      {
        h2: 'Where can you stream Haikyu!!?',
        paras: [
          'Haikyu!! seasons 1 to 4 and OVAs stream on Crunchyroll, Netflix, and Hulu in select regions with full English subs and dubs.',
        ],
      },
    ],
    faq: [
      { q: 'Will there be a Haikyu!! Season 5?', a: 'Production I.G announced that the climax of the series is being adapted as a two-part theatrical film project titled "Haikyu!! FINAL". The first film was "The Dumpster Battle" (2024), and the second final film will cover the remainder of the Nationals and the series finale.' },
      { q: 'Where does Season 4 end in the manga?', a: 'Season 4 ends at Chapter 292 of the manga. The movie "The Dumpster Battle" covers Chapters 293 to 325.' },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Anime Guide', path: '/anime' },
    ],
    related: ANIME_RELATED,
  },

  '/anime/dumpster-battle': {
    title: 'Haikyu!! The Dumpster Battle Movie: Plot & Manga Chapters',
    description: 'Everything about the record-breaking film Haikyu!! The Dumpster Battle: Karasuno vs Nekoma, adapted manga chapters, box office records, and where to watch.',
    kicker: 'Anime Movie',
    h1: 'Haikyu!! The Dumpster Battle Movie Guide',
    intro: [
      'Haikyu!! The Dumpster Battle (Gekijōban Haikyu!! Gomi Suteba no Kessen) is the first film of the two-part "Haikyu!! FINAL" project by Production I.G, depicting the legendary clash between Karasuno and Nekoma at the Spring High National Tournament.',
    ],
    sections: [
      {
        h2: 'What manga chapters does the Dumpster Battle movie adapt?',
        paras: [
          'The film adapts Chapters 293 through 325 of Haruichi Furudate\'s manga, bringing the long-standing rivalry between the Crows (Karasuno) and the Cats (Nekoma) to life.',
        ],
      },
      {
        h2: 'Box Office & Global Phenomenon',
        paras: [
          'Upon its release in February 2024, the movie became a massive worldwide box office hit, grossing over 11.5 billion yen ($75M+) in Japan alone and surpassing $100M worldwide, making it one of the highest-grossing anime movies of all time.',
        ],
      },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Anime Guide', path: '/anime' },
      { name: 'The Dumpster Battle', path: '/anime/dumpster-battle' },
    ],
    related: ANIME_RELATED,
  },

  '/anime/season-4': {
    title: 'Haikyu!! Season 4 (To The Top): Episodes & Manga Chapters',
    description: 'Guide to Haikyu!! Season 4 (To The Top): All-Japan Youth Training Camp, the Miyagi First-Year Camp, the Inarizaki showdown, and manga chapters.',
    kicker: 'Season 4 Guide',
    h1: 'Haikyu!! To The Top (Season 4)',
    intro: [
      'Haikyu!! To The Top aired across two cours in 2020 with 25 episodes, covering the intensive winter training camps and Karasuno\'s explosive matches at the Spring Nationals.',
    ],
    sections: [
      {
        h2: 'Key Highlights & Arcs Covered',
        list: [
          'Kageyama at the All-Japan Youth Training Camp alongside Atsumu Miya, Hoshiumi, and Sakusa.',
          'Hinata crashing the Miyagi First-Year Training Camp as a ball boy to level up his game understanding.',
          'Karasuno vs Tsubakihara Academy in the first round of Nationals.',
          'The epic battle against Inarizaki High and the Miya Twins (Atsumu and Osamu).',
        ],
      },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Anime Guide', path: '/anime' },
      { name: 'Season 4', path: '/anime/season-4' },
    ],
    related: ANIME_RELATED,
  },

  '/anime/season-2': {
    title: 'Haikyu!! Season 2: Tokyo Expedition, Kuroo & Bokuto Training & Arcs',
    description: 'Detailed guide to Haikyu!! Season 2: The Tokyo Training Camp Arc, Karasuno\'s evolution, and the Aoba Johsai rematch.',
    kicker: 'Season 2 Guide',
    h1: 'Haikyu!! Season 2 Guide',
    intro: [
      'Season 2 aired from October 2015 to March 2016. Often rated by fans as the peak training arc in sports anime, it introduced Fukurodani\'s Bokuto and Akaashi, and deepened Karasuno\'s bond with Nekoma.',
    ],
    sections: [
      {
        h2: 'Major Developments',
        list: [
          'Hinata and Kageyama clash over evolving the Freak Quick, leading to temporary team tension.',
          'Tsukishima receives personal mentorship from Kuroo and Bokuto, awakening his love for blocking.',
          'Karasuno develops the Synchronized Attack, where all five players approach simultaneously.',
          'The dramatic semi-final rematch against Toru Oikawa and Aoba Johsai.',
        ],
      },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Anime Guide', path: '/anime' },
      { name: 'Season 2', path: '/anime/season-2' },
    ],
    related: ANIME_RELATED,
  },

  // ------------------------------------------------------------------ ARCS
  '/arcs': {
    title: 'Haikyu!! Arcs in Order: Every Manga Arc & Chapter Range',
    description: 'Every story arc in Haikyu!! in order: Karasuno Formation, Interhigh, Tokyo Training Camp, Spring High Miyagi Prelims, Tokyo Nationals, and Final Arc.',
    kicker: 'Arcs Overview',
    h1: 'All Haikyu!! Story Arcs in Order',
    intro: [
      'The complete Haikyu!! manga spans 402 chapters across six major story arcs. Follow Karasuno\'s journey from a fallen powerhouse to national contenders and professional careers.',
    ],
    sections: [
      {
        h2: 'The 6 Main Story Arcs of Haikyu!!',
        list: [
          '1. Karasuno Formation Arc (Chapters 1–35)',
          '2. Interhigh Preliminary Arc (Chapters 36–71)',
          '3. Tokyo Training Camp Arc (Chapters 72–96)',
          '4. Spring High Preliminary Arc (Miyagi) (Chapters 97–206)',
          '5. Spring High National Tournament Arc (Tokyo) (Chapters 207–369)',
          '6. Final Arc / V.League & Olympics (Chapters 370–402)',
        ],
        links: ARC_RELATED.slice(1),
      },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Story Arcs', path: '/arcs' },
    ],
    related: ARC_RELATED,
  },

  '/arcs/karasuno-formation': {
    title: 'Haikyu!! Karasuno Formation Arc (Ch. 1–35): Hinata & Kageyama',
    description: 'Read the Karasuno Formation Arc (Chapters 1–35): Hinata and Kageyama meet at Karasuno, form the Freak-Quick, recruit Nishinoya and Asahi, and play Nekoma.',
    kicker: 'Arc 1',
    h1: 'Karasuno Formation Arc (Chapters 1–35)',
    intro: [
      'The foundation of Haikyu!!: Former middle school adversaries Shoyo Hinata and Tobio Kageyama find themselves on the same court at Karasuno High School.',
    ],
    chapterRange: [1, 35],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Story Arcs', path: '/arcs' },
      { name: 'Karasuno Formation Arc', path: '/arcs/karasuno-formation' },
    ],
    related: ARC_RELATED,
  },

  '/arcs/interhigh': {
    title: 'Haikyu!! Interhigh Arc (Ch. 36–71): Date Tech & Aoba Johsai',
    description: 'Read the Interhigh Arc (Chapters 36–71): Karasuno battles Date Tech\'s Iron Wall and clashes with Toru Oikawa\'s Aoba Johsai in an emotional semi-final.',
    kicker: 'Arc 2',
    h1: 'Interhigh Preliminary Arc (Chapters 36–71)',
    intro: [
      'Karasuno\'s first official tournament run in Miyagi Prefecture. The team overcomes past trauma against Date Tech before falling in an agonizing final rally against Aoba Johsai.',
    ],
    chapterRange: [36, 71],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Story Arcs', path: '/arcs' },
      { name: 'Interhigh Arc', path: '/arcs/interhigh' },
    ],
    related: ARC_RELATED,
  },

  '/arcs/tokyo-training-camp': {
    title: 'Haikyu!! Tokyo Training Camp Arc (Ch. 72–96): Karasuno Evolves',
    description: 'Read the Tokyo Training Camp Arc (Chapters 72–96): Training alongside Nekoma, Fukurodani, Shinzen, and Ubugawa as Karasuno invents new weapons.',
    kicker: 'Arc 3',
    h1: 'Tokyo Training Camp Arc (Chapters 72–96)',
    intro: [
      'Determined never to lose again, Karasuno travels to Tokyo to scrimmage with national-level teams. Hinata and Kageyama evolve their tempo, and Tsukishima discovers his passion.',
    ],
    chapterRange: [72, 96],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Story Arcs', path: '/arcs' },
      { name: 'Tokyo Training Camp', path: '/arcs/tokyo-training-camp' },
    ],
    related: ARC_RELATED,
  },

  '/arcs/spring-high-preliminary': {
    title: 'Haikyu!! Spring High Prelims Arc (Ch. 97–206): Shiratorizawa',
    description: 'Read the Spring High Prelims (Chapters 97–206): Karasuno defeats Aoba Johsai in an epic rematch and topples Ushijima\'s Shiratorizawa in 5 legendary sets.',
    kicker: 'Arc 4',
    h1: 'Spring High Preliminary Arc (Chapters 97–206)',
    intro: [
      'Miyagi\'s brutal tournament for a spot at the National Tournament. Karasuno achieves retribution against Aoba Johsai and pulls off the historic upset against Shiratorizawa.',
    ],
    chapterRange: [97, 206],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Story Arcs', path: '/arcs' },
      { name: 'Spring High Prelims', path: '/arcs/spring-high-preliminary' },
    ],
    related: ARC_RELATED,
  },

  '/arcs/tokyo-nationals': {
    title: 'Haikyu!! Nationals Arc (Ch. 207–369): Inarizaki & Nekoma',
    description: 'Read the Spring High Nationals Arc (Chapters 207–369): Karasuno in Tokyo facing Tsubakihara, Inarizaki (Miya Twins), Nekoma, and Kamomedai.',
    kicker: 'Arc 5',
    h1: 'Spring High National Tournament Arc (Chapters 207–369)',
    intro: [
      'The centerpiece of the entire series. Karasuno takes the national stage at the Tokyo Metropolitan Gymnasium, executing matches that defined modern sports manga history.',
    ],
    chapterRange: [207, 369],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Story Arcs', path: '/arcs' },
      { name: 'Tokyo Nationals', path: '/arcs/tokyo-nationals' },
    ],
    related: ARC_RELATED,
  },

  '/arcs/final-arc': {
    title: 'Haikyu!! Final Arc (Ch. 370–402): Brazil, V.League & Olympics',
    description: 'Read the Final Arc (Chapters 370–402): Hinata\'s journey to Brazil, the MSBY Black Jackals vs Schweiden Adlers Division 1 clash, and the Tokyo Olympics.',
    kicker: 'Arc 6',
    h1: 'Final Arc / V.League & Beyond (Chapters 370–402)',
    intro: [
      'A brilliant, joyous masterclass of a conclusion. Hinata refines his all-around volleyball mastery on the beaches of Rio, then returns to face Kageyama on the professional stage.',
    ],
    chapterRange: [370, 402],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Story Arcs', path: '/arcs' },
      { name: 'Final Arc', path: '/arcs/final-arc' },
    ],
    related: ARC_RELATED,
  },

  // ------------------------------------------------------------------ TEAMS
  '/teams': {
    title: 'Haikyu!! Teams Guide: Karasuno, Aoba Johsai, Nekoma & More',
    description: 'Comprehensive guide to all major volleyball powerhouses in Haikyu!!: Karasuno, Aoba Johsai, Nekoma, Fukurodani, Shiratorizawa, Inarizaki, and Kamomedai.',
    kicker: 'Teams & Schools',
    h1: 'Haikyu!! High School Teams Guide',
    intro: [
      'Every team in Haikyu!! possesses a distinct philosophical identity, animal motif, and tactical playstyle. Here is the complete breakdown of Japan\'s powerhouse squads.',
    ],
    sections: [
      {
        h2: 'The Major Volleyball High Schools',
        list: [
          'Karasuno High (The Crows) - Miyagi: High-tempo synchronized offense, dynamic aggression, and the Freak-Quick duo.',
          'Nekoma High (The Cats) - Tokyo: Impregnable floor defense, tenacious receives, and Kenma Kozume\'s tactical brain.',
          'Aoba Johsai (Seijoh) - Miyagi: Complete team chemistry, elite playmaking, led by grand king Toru Oikawa.',
          'Fukurodani Academy (The Owls) - Tokyo: National powerhouse centered around Kotaro Bokuto\'s explosive spikes and Keiji Akaashi.',
          'Shiratorizawa Academy (The White Eagles) - Miyagi: Overwhelming individual firepower driven by southpaw ace Wakatoshi Ushijima.',
          'Inarizaki High (The Foxes) - Hyogo: The runner-up powerhouse featuring the unpredictable Miya Twins and Aran Ojiro.',
          'Date Tech (The Iron Wall) - Miyagi: Renowned for having the highest and most disciplined three-man commit block in Japan.',
          'Kamomedai High (The Seagulls) - Nagano: Tactical read-blocking and all-around aerial supremacy led by "Little Giant" Korai Hoshiumi.',
        ],
      },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Teams Guide', path: '/teams' },
    ],
    related: [
      { label: 'All Characters', to: '/characters' },
      { label: 'All Arcs', to: '/arcs' },
      { label: 'Anime Guide', to: '/anime' },
    ],
  },

  // ------------------------------------------------------------------ AUTHOR
  '/author': {
    title: 'Haruichi Furudate: Creator, Story & Art of Haikyu!! Manga',
    description: 'Learn about Haruichi Furudate, the genius mangaka behind Haikyu!!: biography, volleyball background, artistic philosophy, and career achievements.',
    kicker: 'Mangaka Profile',
    h1: 'Haruichi Furudate: The Mind Behind Haikyu!!',
    intro: [
      'Haruichi Furudate was born in Karumai, Iwate Prefecture, Japan. Having played as a middle blocker during junior high and high school, Furudate poured authentic personal volleyball experience into creating Haikyu!!.',
    ],
    sections: [
      {
        h2: 'Career & Haikyu!! Legacy',
        paras: [
          'Furudate debuted in Weekly Shōnen Jump with the horror-mystery series "Kiben Gakuha, Yotsuya-senpai no Kaidan" before launching Haikyu!! in February 2012.',
          'Over eight years of serialization, Haikyu!! became one of the best-selling manga series in history, with over 60 million copies in circulation worldwide. It won the prestigious 61st Shogakukan Manga Award for Best Shōnen Manga in 2016.',
        ],
      },
      {
        h2: 'Artistic Style and Realism',
        paras: [
          'Furudate is renowned for masterful visual storytelling: dramatic motion perspective, kinetic motion blur, anatomical accuracy of jump postures, and the ability to give every player on court an emotional narrative arc.',
        ],
      },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Author Profile', path: '/author' },
    ],
    related: [
      { label: 'All Chapters', to: '/manga' },
      { label: 'All Characters', to: '/characters' },
      { label: 'All Arcs', to: '/arcs' },
    ],
  },
};
