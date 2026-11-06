// Guide pages (anime, arcs, teams, author). One entry per URL.
// Rendered by pages/GuidePage.tsx in the app and by scripts/prerender.mjs as static HTML.
// Facts checked on 2026-11-03. Update the "status" sentences (season 3, latest volume) when news changes.
//
// Fields:
//   title, description  -> <title> and meta description
//   h1, kicker, intro   -> page header
//   sections            -> [{ h2, paras: [], list: [], links: [{ label, to }] }]
//   chapterRange        -> [start, end|null] : renders the chapter list for an arc (null = up to latest)
//   faq                 -> [{ q, a }]
//   breadcrumbs         -> [{ name, path }]
//   related             -> [{ label, to }]

const ANIME_RELATED = [
  { label: 'Blue Lock anime guide', to: '/anime' },
  { label: 'Blue Lock season 3', to: '/anime/season-3' },
  { label: 'Blue Lock season 2', to: '/anime/season-2' },
  { label: 'Blue Lock: Episode Nagi', to: '/anime/episode-nagi' },
  { label: 'All Blue Lock arcs', to: '/arcs' },
];

const ARC_RELATED = [
  { label: 'All Blue Lock arcs', to: '/arcs' },
  { label: 'First Selection', to: '/arcs/first-selection' },
  { label: 'Second Selection', to: '/arcs/second-selection' },
  { label: 'Third Selection & U-20 match', to: '/arcs/third-selection-u20' },
  { label: 'Neo Egoist League', to: '/arcs/neo-egoist-league' },
  { label: 'U-20 World Cup', to: '/arcs/u20-world-cup' },
];

export const GUIDES = {
  // ------------------------------------------------------------------ ANIME
  '/anime': {
    title: 'Blue Lock Anime: Seasons, Episodes, Watch Order & Where to Watch',
    description: 'Everything about the Blue Lock anime: how many seasons and episodes there are, the watch order, where to watch it, the Episode Nagi movie and season 3.',
    kicker: 'Anime guide',
    h1: 'Blue Lock Anime Guide',
    intro: [
      "The Blue Lock anime is made by Studio Eight Bit and adapts Muneyuki Kaneshiro and Yusuke Nomura's manga. So far it has two TV seasons and one film, with a third season in production.",
    ],
    sections: [
      {
        h2: 'How many seasons and episodes of Blue Lock are there?',
        paras: ['Blue Lock has 2 seasons and 38 TV episodes so far, plus one movie:'],
        list: [
          'Season 1: 24 episodes, aired October 9, 2022 to March 26, 2023. Covers the First and Second Selection.',
          'Blue Lock: Episode Nagi (movie): released in Japan on April 19, 2024. Retells the story from Seishiro Nagi\'s point of view.',
          'Season 2 (vs. U-20 Japan): 14 episodes, aired October 5 to December 28, 2024. Covers the Japan U-20 match.',
          'Season 3 (Neo Egoist League): announced and in production, no release date yet.',
        ],
        links: [
          { label: 'Season 2 details', to: '/anime/season-2' },
          { label: 'Season 3 release date', to: '/anime/season-3' },
          { label: 'Episode Nagi movie', to: '/anime/episode-nagi' },
        ],
      },
      {
        h2: 'Blue Lock watch order',
        paras: ['Watch Blue Lock in release order. The movie is optional, but it adds Nagi and Reo\'s side of the story before season 2:'],
        list: [
          '1. Blue Lock season 1 (episodes 1–24)',
          '2. Blue Lock: Episode Nagi (movie)',
          '3. Blue Lock season 2, vs. U-20 Japan (episodes 25–38)',
          '4. Blue Lock season 3, Neo Egoist League (coming)',
        ],
      },
      {
        h2: 'Where can I watch Blue Lock?',
        paras: [
          'Outside Japan, both seasons of the Blue Lock anime stream on Crunchyroll, with English subtitles and an English dub. Crunchyroll also distributed the Episode Nagi movie in North American theaters.',
        ],
      },
      {
        h2: 'Is there a Blue Lock live-action movie?',
        paras: [
          'Yes. A live-action Blue Lock film produced by CREDEUS and distributed by TOHO opened in Japanese theaters on August 7, 2026. Fumiya Takahashi plays Yoichi Isagi and Masataka Kubota plays Jinpachi Ego. It was announced at Blue Lock Egoist Festa in September 2025, together with season 3 of the anime.',
        ],
      },
      {
        h2: 'Where does the anime end in the manga?',
        paras: [
          'Season 2 ends with the Japan U-20 match, around chapter 151. To continue the story, start the manga at chapter 152, the first chapter of the Neo Egoist League. That is also the arc season 3 will adapt.',
        ],
        links: [
          { label: 'Read Blue Lock chapter 152', to: '/chapter/152' },
          { label: 'Neo Egoist League arc', to: '/arcs/neo-egoist-league' },
        ],
      },
    ],
    faq: [
      { q: 'How many episodes does Blue Lock have?', a: 'Blue Lock has 38 TV episodes: 24 in season 1 and 14 in season 2. The Episode Nagi movie is separate.' },
      { q: 'Who animated Blue Lock?', a: 'Both seasons and the Episode Nagi movie were animated by Studio Eight Bit (8bit). Season 1 was directed by Tetsuaki Watanabe and season 2 by Yūji Haibara.' },
      { q: 'Is the Blue Lock anime finished?', a: 'No. Season 3, titled Neo Egoist League, is in production, and the manga it adapts is still ongoing.' },
      { q: 'Do I have to watch the Blue Lock movie?', a: 'No. Episode Nagi retells events from season 1 from Nagi\'s point of view, so you can skip it. It does add background to Nagi and Reo before season 2.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Anime', path: '/anime' }],
    related: ANIME_RELATED,
  },

  '/anime/season-3': {
    title: 'Blue Lock Season 3 Release Date: Neo Egoist League (Latest News)',
    description: 'When is Blue Lock season 3 coming out? Latest status of Blue Lock season 3 (Neo Egoist League), what it will adapt, and where to read ahead in the manga.',
    kicker: 'Anime · Season 3',
    h1: 'Blue Lock Season 3 Release Date',
    intro: [
      'Blue Lock season 3 is officially in production, but no release date had been announced as of November 2026. Here is everything that is confirmed so far.',
    ],
    sections: [
      {
        h2: 'When is Blue Lock season 3 coming out?',
        paras: [
          'There is no official release date yet. Season 3 was announced at Blue Lock Egoist Festa in September 2025, together with the live-action movie. On October 5, 2026, it was confirmed that season 3 is in production. Season 2 aired almost two years after season 1, so a release in 2027 is the most likely window, but that is not official.',
        ],
      },
      {
        h2: 'What will season 3 be about?',
        paras: [
          'Season 3 is titled Neo Egoist League. It will adapt the Neo Egoist League arc of the manga (chapters 152–302), where the Blue Lock players join five European clubs (Bastard München, Manshine City, Ubers, FC Barcha and Paris X Gen) and play televised matches for real transfer bids.',
          'It brings in new rivals like Michael Kaiser, Alexis Ness and the world-class coaches Noel Noa, Chris Prince, Marc Snuffy, Lavinho and Julian Loki.',
        ],
        links: [
          { label: 'Neo Egoist League arc', to: '/arcs/neo-egoist-league' },
          { label: 'NEL teams', to: '/teams' },
          { label: 'Michael Kaiser', to: '/characters/michael-kaiser' },
        ],
      },
      {
        h2: 'Read season 3 in the manga now',
        paras: [
          'Everything season 3 will cover is already in the manga. Start at chapter 152, right after the end of season 2.',
        ],
        links: [
          { label: 'Start at chapter 152', to: '/chapter/152' },
          { label: 'All chapters', to: '/manga' },
        ],
      },
    ],
    faq: [
      { q: 'Will there be a season 3 of Blue Lock?', a: 'Yes. Blue Lock season 3, titled Neo Egoist League, has been announced and is in production.' },
      { q: 'Is Blue Lock season 3 out?', a: 'Not yet. As of November 2026 there is no release date for season 3.' },
      { q: 'How many episodes will Blue Lock season 3 have?', a: 'The episode count has not been announced. Season 1 had 24 episodes and season 2 had 14.' },
      { q: 'Where will Blue Lock season 3 stream?', a: 'Not confirmed yet. Crunchyroll streamed both previous seasons outside Japan.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Anime', path: '/anime' }, { name: 'Season 3', path: '/anime/season-3' }],
    related: ANIME_RELATED,
  },

  '/anime/season-2': {
    title: 'Blue Lock Season 2: Episodes, Release Date & What Chapter It Ends',
    description: 'Blue Lock season 2 (vs. U-20 Japan): 14 episodes, aired October to December 2024. Where to watch it, its animation, and what chapter of the manga it ends on.',
    kicker: 'Anime · Season 2',
    h1: 'Blue Lock Season 2 (vs. U-20 Japan)',
    intro: [
      'Blue Lock season 2, titled vs. U-20 Japan, aired from October 5 to December 28, 2024. It has 14 episodes and covers the match between the Blue Lock Eleven and the Japan U-20 national team.',
    ],
    sections: [
      {
        h2: 'Blue Lock season 2 at a glance',
        list: [
          'Episodes: 14 (episodes 25–38 of the series)',
          'Aired: October 5 – December 28, 2024 (Japan)',
          'Studio: Eight Bit; director: Yūji Haibara',
          'Story: the Japan U-20 match against Sae Itoshi and Ryusei Shidou',
          'Streaming: Crunchyroll, with an English dub',
        ],
      },
      {
        h2: 'What chapter does Blue Lock season 2 end?',
        paras: [
          'Season 2 ends with the U-20 match and its aftermath, around chapter 151 of the manga. If you want to keep going, start reading at chapter 152, the first chapter of the Neo Egoist League arc.',
        ],
        links: [
          { label: 'Read chapter 152', to: '/chapter/152' },
          { label: 'Third Selection & U-20 arc', to: '/arcs/third-selection-u20' },
        ],
      },
      {
        h2: 'Is Blue Lock season 2 good?',
        paras: [
          'The story of season 2 (the U-20 match) is one of the most popular parts of the manga. The animation was more divisive: many fans criticized its heavy use of still frames compared with season 1. If that bothers you, the same story is in the manga from about chapter 109 to 151.',
        ],
      },
    ],
    faq: [
      { q: 'How many episodes are in Blue Lock season 2?', a: 'Season 2 has 14 episodes.' },
      { q: 'When did Blue Lock season 2 come out?', a: 'It premiered in Japan on October 5, 2024, and the last episode aired on December 28, 2024.' },
      { q: 'Where can I watch Blue Lock season 2?', a: 'On Crunchyroll, with subtitles and an English dub.' },
      { q: 'What studio animated Blue Lock season 2?', a: 'Eight Bit (8bit), the same studio as season 1.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Anime', path: '/anime' }, { name: 'Season 2', path: '/anime/season-2' }],
    related: ANIME_RELATED,
  },

  '/anime/episode-nagi': {
    title: 'Blue Lock: Episode Nagi – Movie & Spin-off Manga Guide',
    description: "Blue Lock: Episode Nagi explained: the spin-off manga about Seishiro Nagi (2022–2025, 8 volumes), the 2024 anime movie, and where it fits in the story.",
    kicker: 'Spin-off · Movie',
    h1: 'Blue Lock: Episode Nagi',
    intro: [
      'Episode Nagi tells the Blue Lock story from the point of view of Seishiro Nagi, the lazy genius who started playing football only months before entering Blue Lock. It exists as a spin-off manga and as an anime movie.',
    ],
    sections: [
      {
        h2: 'Episode Nagi manga',
        list: [
          'Written by Muneyuki Kaneshiro, illustrated by Kōta Sannomiya',
          "Serialized in Kodansha's Bessatsu Shōnen Magazine from June 9, 2022 to July 9, 2025 (finished)",
          'Collected in 8 volumes',
        ],
        paras: ['It follows Nagi and Reo Mikage from their first meeting, through Team V and the selections, showing scenes the main manga skips.'],
      },
      {
        h2: 'Blue Lock: Episode Nagi movie',
        list: [
          'Released in Japan on April 19, 2024; in North America on June 28, 2024 (Crunchyroll)',
          'Running time: about 1 hour 31 minutes',
          'Animated by Eight Bit, the studio behind the TV anime',
        ],
        paras: ["The film retells season 1 from Nagi's side, ending before the U-20 match. In the watch order it goes between season 1 and season 2."],
        links: [{ label: 'Blue Lock watch order', to: '/anime' }],
      },
      {
        h2: "Nagi in the main story",
        paras: ["After Episode Nagi's events, Nagi plays for Manshine City in the Neo Egoist League. Read his full profile for his age, weapons and key chapters."],
        links: [
          { label: 'Seishiro Nagi profile', to: '/characters/seishiro-nagi' },
          { label: 'Reo Mikage profile', to: '/characters/reo-mikage' },
          { label: 'Second Selection arc', to: '/arcs/second-selection' },
        ],
      },
    ],
    faq: [
      { q: 'Is the Episode Nagi manga finished?', a: 'Yes. It ended on July 9, 2025, with 8 volumes in total.' },
      { q: 'Is Episode Nagi canon?', a: 'Yes. It is written by the Blue Lock author Muneyuki Kaneshiro and retells the main story from Nagi\'s point of view.' },
      { q: 'When should I watch the Episode Nagi movie?', a: 'After season 1 and before season 2.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Anime', path: '/anime' }, { name: 'Episode Nagi', path: '/anime/episode-nagi' }],
    related: ANIME_RELATED,
  },

  // ------------------------------------------------------------------ ARCS
  '/arcs': {
    title: 'Blue Lock Arcs in Order: Every Story Arc & Chapter Range',
    description: 'All Blue Lock arcs in order with their chapter ranges: First Selection, Second Selection, Third Selection & U-20, Neo Egoist League and the U-20 World Cup.',
    kicker: 'Story guide',
    h1: 'Blue Lock Arcs in Order',
    intro: [
      "Blue Lock's story is split into five big arcs. Each one is a new stage of Jinpachi Ego's project to create the world's best striker.",
    ],
    sections: [
      {
        h2: 'All Blue Lock arcs',
        list: [
          'First Selection – chapters 1–38',
          'Second Selection – chapters 39–87',
          'Third Selection & Japan U-20 match – chapters 88–151',
          'Neo Egoist League – chapters 152–302',
          'U-20 World Cup – chapter 303 onward (ongoing)',
        ],
        links: ARC_RELATED.slice(1),
      },
      {
        h2: 'Blue Lock plot summary',
        paras: [
          "After Japan's early exit from the 2018 World Cup, the Japan Football Union hires Jinpachi Ego. He gathers 300 high-school strikers in the Blue Lock facility, where they compete in selections; anyone eliminated can never play for Japan's national team. The winners face Japan's U-20 team to save the project, then join European clubs in the Neo Egoist League, and finally represent Japan at the U-20 World Cup.",
        ],
      },
    ],
    faq: [
      { q: 'What is the longest Blue Lock arc?', a: 'The Neo Egoist League, which runs for about 151 chapters (152–302).' },
      { q: 'What arc is Blue Lock on now?', a: 'The U-20 World Cup arc, which started at chapter 303 and is still ongoing.' },
      { q: 'What year is Blue Lock set in?', a: 'The story starts right after the 2018 World Cup, so it is set in 2018, with the project running into the following months.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Arcs', path: '/arcs' }],
    related: [{ label: 'All chapters', to: '/manga' }, { label: 'Blue Lock teams', to: '/teams' }, { label: 'Characters', to: '/characters' }],
  },

  '/arcs/first-selection': {
    title: 'Blue Lock First Selection Arc (Chapters 1–38): Team Z Explained',
    description: 'The Blue Lock First Selection arc, chapters 1–38: Team Z, the round-robin matches against Teams X, Y, W and V, and how Isagi, Bachira and Chigiri awaken.',
    kicker: 'Arc 1 · Chapters 1–38',
    h1: 'First Selection Arc',
    intro: [
      "The First Selection opens Blue Lock. The 300 strikers are split into five-man teams, and Yoichi Isagi lands in Team Z, the lowest-ranked team in the building.",
    ],
    sections: [
      {
        h2: 'What happens in the First Selection',
        paras: [
          'Each team plays every other team in its wing in a round robin, and only the best teams advance. Team Z starts with a loss to Barou\'s Team X, then learns to play as egoists. Against Team Y, Isagi\'s spatial awareness starts to show; against Team W, Hyoma Chigiri overcomes his fear of injury and unleashes his speed; and in the final match Team Z faces the unbeaten Team V of Seishiro Nagi, Reo Mikage and Zantetsu Tsurugi.',
        ],
      },
      {
        h2: 'Team Z members',
        paras: ['Team Z has 11 players: Yoichi Isagi, Meguru Bachira, Rensuke Kunigami, Hyoma Chigiri, Gin Gagamaru, Jingo Raichi, Okuhito Iemon, Gurimu Igarashi, Asahi Naruhaya, Wataru Kuon and Yudai Imamura.'],
        links: [
          { label: 'Yoichi Isagi', to: '/characters/yoichi-isagi' },
          { label: 'Meguru Bachira', to: '/characters/meguru-bachira' },
          { label: 'Hyoma Chigiri', to: '/characters/hyoma-chigiri' },
          { label: 'Rensuke Kunigami', to: '/characters/rensuke-kunigami' },
          { label: 'All Blue Lock teams', to: '/teams' },
        ],
      },
    ],
    chapterRange: [1, 38],
    faq: [
      { q: 'Who is in Team Z in Blue Lock?', a: 'Isagi, Bachira, Kunigami, Chigiri, Gagamaru, Raichi, Iemon, Igarashi, Naruhaya, Kuon and Imamura.' },
      { q: 'Which anime episodes cover the First Selection?', a: 'The first half of season 1.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Arcs', path: '/arcs' }, { name: 'First Selection', path: '/arcs/first-selection' }],
    related: ARC_RELATED,
  },

  '/arcs/second-selection': {
    title: 'Blue Lock Second Selection Arc (Chapters 39–87): Nagi, Rin & Barou',
    description: 'The Blue Lock Second Selection arc, chapters 39–87: the squad-stealing stage, Isagi and Bachira vs Rin, and the Isagi, Nagi and Barou trio.',
    kicker: 'Arc 2 · Chapters 39–87',
    h1: 'Second Selection Arc',
    intro: [
      'In the Second Selection, winners take a player from the team they beat. Players have to build a squad of five to clear the stage, so every match is about stealing the best talent.',
    ],
    sections: [
      {
        h2: 'What happens in the Second Selection',
        paras: [
          "Isagi and Bachira run straight into Rin Itoshi, the top-ranked player in Blue Lock, and lose; Rin's team takes Bachira. Isagi then rebuilds: he teams up with Seishiro Nagi, and together with Shoei Barou they form a trio of egos that finally challenges Rin's squad to win Bachira back.",
          'This arc is where Nagi starts to care about winning, after his first real loss against Isagi in the First Selection.',
        ],
        links: [
          { label: 'Seishiro Nagi', to: '/characters/seishiro-nagi' },
          { label: 'Rin Itoshi', to: '/characters/rin-itoshi' },
          { label: 'Shoei Barou', to: '/characters/shoei-barou' },
        ],
      },
    ],
    chapterRange: [39, 87],
    faq: [
      { q: 'Who does Isagi team up with in the Second Selection?', a: 'Seishiro Nagi and Shoei Barou, after first playing with Bachira.' },
      { q: 'Which anime episodes cover the Second Selection?', a: 'The second half of season 1.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Arcs', path: '/arcs' }, { name: 'Second Selection', path: '/arcs/second-selection' }],
    related: ARC_RELATED,
  },

  '/arcs/third-selection-u20': {
    title: 'Blue Lock Third Selection & U-20 Arc (Chapters 88–151)',
    description: 'The Blue Lock Third Selection and Japan U-20 match, chapters 88–151: the World Five, the Blue Lock Eleven vs Sae Itoshi and Ryusei Shidou.',
    kicker: 'Arc 3 · Chapters 88–151',
    h1: 'Third Selection & Japan U-20 Match',
    intro: [
      "The Third Selection tests the survivors against world-class players, then the Blue Lock Eleven take on Japan's U-20 national team. If Blue Lock loses, the project is shut down.",
    ],
    sections: [
      {
        h2: 'Third Selection and the World Five',
        paras: [
          'In the Third Selection, Blue Lock teams play against the World Five: Julian Loki, Leonardo Luna, Adam Blake, Pablo Cavasoz and Dada Silva. They win every match, showing the gap between Blue Lock and the world. The best performers are picked for the Blue Lock Eleven.',
        ],
        links: [{ label: 'World Five and all teams', to: '/teams' }],
      },
      {
        h2: 'Blue Lock vs Japan U-20',
        paras: [
          "The U-20 team is led by Sae Itoshi, Rin's older brother and a member of the New Generation World 11, with Ryusei Shidou and captain Oliver Aiku. The match decides the future of Blue Lock and ends with Isagi scoring the decisive goal.",
        ],
        links: [
          { label: 'Sae Itoshi', to: '/characters/sae-itoshi' },
          { label: 'Rin Itoshi', to: '/characters/rin-itoshi' },
          { label: 'Anime season 2', to: '/anime/season-2' },
        ],
      },
    ],
    chapterRange: [88, 151],
    faq: [
      { q: 'Who wins Blue Lock vs U-20 Japan?', a: 'Blue Lock wins, and Isagi scores the winning goal.' },
      { q: 'Which anime season covers the U-20 match?', a: 'Season 2 (vs. U-20 Japan).' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Arcs', path: '/arcs' }, { name: 'Third Selection & U-20', path: '/arcs/third-selection-u20' }],
    related: ARC_RELATED,
  },

  '/arcs/neo-egoist-league': {
    title: 'Blue Lock Neo Egoist League (NEL) Arc: Teams, Chapters & Results',
    description: 'The Blue Lock Neo Egoist League arc (chapters 152–302): the five NEL teams and their coaches, Isagi vs Kaiser at Bastard München, and how it ends.',
    kicker: 'Arc 4 · Chapters 152–302',
    h1: 'Neo Egoist League (NEL) Arc',
    intro: [
      'The Neo Egoist League is the longest arc in Blue Lock. The players join five European youth clubs inside the facility and play televised matches, while real clubs bid on them. The highest-valued players earn a place in Japan\'s U-20 World Cup squad.',
    ],
    sections: [
      {
        h2: 'Neo Egoist League teams',
        list: [
          'Bastard München (Germany) – coach Noel Noa. Isagi, Kunigami and Michael Kaiser.',
          'Manshine City (England) – coach Chris Prince. Nagi and Reo.',
          'Ubers (Italy) – coach Marc Snuffy. Barou, Aiku and Don Lorenzo.',
          'FC Barcha (Spain) – coach Lavinho. Bachira.',
          'Paris X Gen (France) – coach Julian Loki. Rin and Shidou.',
        ],
        links: [{ label: 'All Blue Lock teams', to: '/teams' }],
      },
      {
        h2: 'What happens in the NEL',
        paras: [
          "Isagi joins Bastard München, where the star Michael Kaiser treats him as a nobody. Isagi fights for the ball and for his place, developing his Metavision against Kaiser, while every match changes the players' valuations. The arc builds to the final match between Bastard München and Paris X Gen and ends with the final rankings; the top 23 form Blue Lock Japan. Nagi is among those eliminated.",
        ],
        links: [
          { label: 'Michael Kaiser', to: '/characters/michael-kaiser' },
          { label: 'Yoichi Isagi', to: '/characters/yoichi-isagi' },
          { label: 'Anime season 3 (NEL)', to: '/anime/season-3' },
        ],
      },
    ],
    chapterRange: [152, 302],
    faq: [
      { q: 'What team is Isagi on in the Neo Egoist League?', a: 'Bastard München, the German club coached by Noel Noa.' },
      { q: 'What chapter does the Neo Egoist League end?', a: 'Chapter 302. The U-20 World Cup arc starts at chapter 303.' },
      { q: 'Will the NEL be animated?', a: 'Yes, as Blue Lock season 3, titled Neo Egoist League.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Arcs', path: '/arcs' }, { name: 'Neo Egoist League', path: '/arcs/neo-egoist-league' }],
    related: ARC_RELATED,
  },

  '/arcs/u20-world-cup': {
    title: 'Blue Lock U-20 World Cup Arc (Chapter 303+): Blue Lock Japan',
    description: 'The Blue Lock U-20 World Cup arc, from chapter 303: Blue Lock Japan at the FIFA U-20 World Cup, Side B, and the matches against Nigeria, France and England.',
    kicker: 'Arc 5 · Chapter 303 onward',
    h1: 'U-20 World Cup Arc',
    intro: [
      "The U-20 World Cup is phase three of the Blue Lock project, and the arc the manga is in right now. The top 23 players from the Neo Egoist League form Blue Lock Japan.",
    ],
    sections: [
      {
        h2: 'What happens in the U-20 World Cup arc',
        paras: [
          'The arc opens with the team preparing for the tournament while eliminated players, Nagi among them, chase a second chance in Side B. The tournament itself kicks off around chapter 313 with Blue Lock Japan against Nigeria, followed by a match against France and the start of Blue Lock vs England.',
        ],
        links: [
          { label: 'Latest chapters', to: '/manga' },
          { label: 'Seishiro Nagi', to: '/characters/seishiro-nagi' },
        ],
      },
    ],
    chapterRange: [303, null],
    faq: [
      { q: 'Is the U-20 World Cup the last Blue Lock arc?', a: 'It has not been confirmed. The arc is ongoing.' },
      { q: 'When do new Blue Lock chapters come out?', a: "Weekly, in Kodansha's Weekly Shōnen Magazine, except during break weeks." },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Arcs', path: '/arcs' }, { name: 'U-20 World Cup', path: '/arcs/u20-world-cup' }],
    related: ARC_RELATED,
  },

  // ------------------------------------------------------------------ TEAMS
  '/teams': {
    title: 'Blue Lock Teams: Team Z, NEL Teams, World Five & Blue Lock Japan',
    description: 'Every Blue Lock team: Team Z and the First Selection teams, the Neo Egoist League clubs and coaches, the World Five, and Blue Lock Japan for the U-20 World Cup.',
    kicker: 'Teams',
    h1: 'Blue Lock Teams',
    intro: ['Blue Lock moves its players through a lot of teams. Here are all the important ones, in story order.'],
    sections: [
      {
        h2: 'First Selection teams (V, W, X, Y, Z)',
        paras: [
          "In the First Selection, Isagi's wing has Teams V, W, X, Y and Z. Team Z is the lowest-ranked team: Isagi, Bachira, Kunigami, Chigiri, Gagamaru, Raichi, Iemon, Igarashi, Naruhaya, Kuon and Imamura. Team X is led by Shoei Barou, and Team V by Nagi, Reo and Zantetsu.",
        ],
        links: [{ label: 'First Selection arc', to: '/arcs/first-selection' }],
      },
      {
        h2: 'World Five',
        paras: ['The World Five appear in the Third Selection: Julian Loki, Leonardo Luna, Adam Blake, Pablo Cavasoz and Dada Silva. They beat every Blue Lock team they face.'],
        links: [{ label: 'Third Selection arc', to: '/arcs/third-selection-u20' }],
      },
      {
        h2: 'Blue Lock Eleven vs Japan U-20',
        paras: ["The Blue Lock Eleven is the team that plays Japan's U-20 national team to save the project. The U-20 side is led by Sae Itoshi and Ryusei Shidou."],
      },
      {
        h2: 'Neo Egoist League (NEL) teams',
        list: [
          'Bastard München (Germany) – Noel Noa. Isagi, Kunigami, Kaiser.',
          'Manshine City (England) – Chris Prince. Nagi, Reo.',
          'Ubers (Italy) – Marc Snuffy. Barou, Aiku, Don Lorenzo.',
          'FC Barcha (Spain) – Lavinho. Bachira.',
          'Paris X Gen (France) – Julian Loki. Rin, Shidou.',
        ],
        links: [{ label: 'Neo Egoist League arc', to: '/arcs/neo-egoist-league' }],
      },
      {
        h2: 'Blue Lock Japan (U-20 World Cup)',
        paras: ['The top 23 players of the Neo Egoist League form Blue Lock Japan, the team that plays the FIFA U-20 World Cup.'],
        links: [{ label: 'U-20 World Cup arc', to: '/arcs/u20-world-cup' }],
      },
    ],
    faq: [
      { q: 'What team is Isagi on?', a: 'Team Z in the First Selection, Bastard München in the Neo Egoist League, and Blue Lock Japan at the U-20 World Cup.' },
      { q: 'What team is Nagi on?', a: 'Team V in the First Selection and Manshine City in the Neo Egoist League. He is eliminated when the NEL ends.' },
      { q: 'Who are the World Five in Blue Lock?', a: 'Julian Loki, Leonardo Luna, Adam Blake, Pablo Cavasoz and Dada Silva.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Teams', path: '/teams' }],
    related: [{ label: 'All Blue Lock arcs', to: '/arcs' }, { label: 'Characters', to: '/characters' }],
  },

  // ------------------------------------------------------------------ AUTHOR
  '/author': {
    title: 'Who Wrote Blue Lock? Author Muneyuki Kaneshiro & Yusuke Nomura',
    description: 'Blue Lock is written by Muneyuki Kaneshiro (As the Gods Will) and drawn by Yusuke Nomura (Dolly Kill Kill), published by Kodansha since 2018.',
    kicker: 'Creators',
    h1: 'Who Wrote Blue Lock?',
    intro: ['Blue Lock is created by two people: writer Muneyuki Kaneshiro and artist Yusuke Nomura. It has run in Kodansha\'s Weekly Shōnen Magazine since August 1, 2018.'],
    sections: [
      {
        h2: 'Muneyuki Kaneshiro (story)',
        paras: [
          "Kaneshiro broke out as the writer of As the Gods Will (2011), a death-game manga that got two sequels and a live-action film directed by Takashi Miike. That death-game background shows in Blue Lock's elimination format. He also writes the spin-off Blue Lock: Episode Nagi.",
        ],
      },
      {
        h2: 'Yusuke Nomura (art)',
        paras: ['Nomura debuted in 2014 with the alien-invasion manga Dolly Kill Kill. Blue Lock is his second big series, known for its intense "ego" visuals and double-page spreads.'],
      },
      {
        h2: 'Publisher',
        paras: ["Blue Lock is published by Kodansha in Japan, and in English by Kodansha USA, which rates it 16+. It was the best-selling manga of 2023 and passed 50 million copies in print by September 2025."],
      },
    ],
    faq: [
      { q: 'Who created Blue Lock?', a: 'Muneyuki Kaneshiro (story) and Yusuke Nomura (art).' },
      { q: 'Who illustrates Blue Lock: Episode Nagi?', a: 'Kōta Sannomiya, with Kaneshiro writing.' },
    ],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Author', path: '/author' }],
    related: [{ label: 'Blue Lock manga FAQ', to: '/' }, { label: 'Episode Nagi', to: '/anime/episode-nagi' }, { label: 'All chapters', to: '/manga' }],
  },
};
