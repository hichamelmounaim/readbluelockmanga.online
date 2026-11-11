// Haikyu!! Character profiles. Shared by the React app (constants.ts) and the build scripts (prerender, sitemap).
export const CHARACTERS_DATA = [
  {
    id: "hinata",
    name: "Shoyo Hinata",
    role: "Protagonist",
    grade: "Middle Blocker / Opposite Hitter",
    description: "The main protagonist of Haikyu!! Karasuno's ultimate decoy whose incredible vertical jump and speed shock opponents.",
    image: "/characters/shouyou-hinata.jpg",
    slug: "shoyo-hinata",
    shortName: "Hinata",
    faq: [
      { q: "What position does Hinata play?", a: "Hinata plays as a Middle Blocker (and Karasuno's 'Ultimate Decoy') in high school, and later as an Opposite Hitter for the MSBY Black Jackals and Japan's National Team." },
      { q: "Why is Hinata called the Ultimate Decoy?", a: "Because his extreme speed, explosive jumping, and high-tempo runs demand the opponents' full attention, opening up wide gaps for Karasuno's other spikers to score." },
      { q: "What is Hinata's height and vertical jump?", a: "Hinata starts high school at 162.8 cm (5'4\"), but reaches spike heights above 333 cm thanks to his explosive jumping technique and stamina." }
    ],
    abilities: "Freak-Quick Attack, Broad Jump Spike, Minus-Tempo, God-level Decoy, Stamina, Beach Volleyball All-Round Mastery.",
    weapon: "Minus-Tempo Quick Attack / Explosive Vertical Jump / Decoy Magnetism",
    firstAppearance: "Chapter 1",
    longDescription: "Shoyo Hinata is the heart and spark plug of Karasuno High. Inspired by Karasuno's legendary 'Little Giant' whom he watched on TV during elementary school, Hinata refused to let his short stature limit his dreams. After arriving at Karasuno, he teamed up with his middle-school rival Tobio Kageyama to unleash the legendary 'Freak-Quick' attack. Over the course of the Interhigh, Tokyo Training Camp, and the Spring Tournament, Hinata expands his arsenal to include soft blocks, open-tempo receives, diagonal cut shots, and beach volleyball fundamentals in Brazil.",
    keyChapters: [
      { number: 1, label: "Chapter 1: Endings and Beginnings - Hinata and Kageyama's First Clash" },
      { number: 81, label: "Chapter 81: Greed - Hinata Demands to Hit with Eyes Open" },
      { number: 189, label: "Chapter 189: Declaration of War vs Shiratorizawa" },
      { number: 281, label: "Chapter 281: The Battle of The Pit Against Inarizaki" },
      { number: 314, label: "Chapter 314: The Dumpster Battle - Karasuno vs Nekoma Climax" },
      { number: 370, label: "Chapter 370: Challenger in Rio de Janeiro" }
    ],
    relatedSlugs: ["tobio-kageyama", "kei-tsukishima", "yuu-nishinoya", "kenma-kozume", "koutarou-bokuto"]
  },
  {
    id: "kageyama",
    name: "Tobio Kageyama",
    role: "Co-Protagonist / Genius Setter",
    grade: "Setter",
    description: "The 'King of the Court'. A volleyball prodigy with unmatched pinpoint accuracy and tactical game sense.",
    image: "/characters/tobio-kageyama.jpg",
    slug: "tobio-kageyama",
    shortName: "Kageyama",
    faq: [
      { q: "Why was Kageyama called the 'King of the Court'?", a: "At Kitagawa Daiichi Middle School, his tyrannical perfectionism alienated his teammates, who gave him the moniker as an insult for his oppressive demands." },
      { q: "What makes Kageyama's sets so lethal?", a: "He possesses superhuman spatial awareness and fingertip control, delivering the ball exactly into the spiker's hitting pocket at maximum height and velocity." }
    ],
    abilities: "Pinpoint Tosses, Jump Serve Ace, Dump Spikes, Spatial Court Awareness, Blocking.",
    weapon: "King's Pinpoint Toss / Killer Jump Serve",
    firstAppearance: "Chapter 1",
    longDescription: "Tobio Kageyama is Karasuno's starting setter and widely recognized as one of the finest volleyball minds in Japan. Initially an arrogant perfectionist who expected teammates to bend to his passes, his partnership with Hinata at Karasuno forced him to adapt, learn trust, and become a setter who unlocks every hitter's maximum potential. His ferocious jump serves frequently rack up direct service aces.",
    keyChapters: [
      { number: 1, label: "Chapter 1: The King of the Court Meets Hinata" },
      { number: 76, label: "Chapter 76: The Setter's Conflict at Tokyo Training Camp" },
      { number: 147, label: "Chapter 147: The Face-Off with Oikawa's Aoba Johsai" },
      { number: 220, label: "Chapter 220: All-Japan Youth Training Camp" },
      { number: 387, label: "Chapter 387: The Solitary King Transformed" }
    ],
    relatedSlugs: ["shoyo-hinata", "tooru-oikawa", "kei-tsukishima", "koushi-sugawara"]
  },
  {
    id: "tsukishima",
    name: "Kei Tsukishima",
    role: "Middle Blocker / Karasuno's Brain",
    grade: "Middle Blocker",
    description: "A towering, cynical tactician whose read-blocking shuts down the fiercest aces in national volleyball.",
    image: "/characters/kei-tsukishima.jpg",
    slug: "kei-tsukishima",
    shortName: "Tsukishima",
    faq: [
      { q: "When did Tsukishima 'fall in love with volleyball'?", a: "During Chapter 163 against Shiratorizawa, when he executed a textbook read-block to completely shut down Wakatoshi Ushijima's monster spike." },
      { q: "What blocking style does Tsukishima use?", a: "Read Blocking - observing the setter and spiker's approach before committing, rather than guessing." }
    ],
    abilities: "Read Blocking, Kill Block Timing, Feint Reading, Tactical Psychological Warfare.",
    weapon: "Total Read Blocking / Strategic Disruption",
    firstAppearance: "Chapter 5",
    longDescription: "Kei Tsukishima stands as the tallest player on Karasuno High. Initially treating volleyball as 'just a club' after seeing his older brother's heartbreak, Tsukishima maintained emotional distance until the Tokyo training camp, where mentors Tetsuro Kuroo and Kotaro Bokuto pushed him to find his spark. His crowning performance arrives during the Miyagi finals against Shiratorizawa, where his meticulous read-blocking tames Ushijima.",
    keyChapters: [
      { number: 5, label: "Chapter 5: The Tower of Karasuno Appears" },
      { number: 89, label: "Chapter 89: Third Gym Training with Kuroo and Bokuto" },
      { number: 163, label: "Chapter 163: The One-Hand Kill Block on Ushijima" },
      { number: 182, label: "Chapter 182: The Battle of Unyielding Will" }
    ],
    relatedSlugs: ["shoyo-hinata", "tadashi-yamaguchi", "tetsurou-kuroo", "koutarou-bokuto"]
  },
  {
    id: "nishinoya",
    name: "Yu Nishinoya",
    role: "Libero / Karasuno's Guardian Deity",
    grade: "Libero",
    description: "The fearless, energetic guardian deity of Karasuno whose cat-like reflexes keep any ball from hitting the floor.",
    image: "/characters/yuu-nishinoya.jpg",
    slug: "yu-nishinoya",
    shortName: "Nishinoya",
    faq: [
      { q: "What is Nishinoya's signature move?", a: "The 'Rolling Thunder' (and 'Rolling Thunder Again') - a dramatic diving dig followed by a theatrical roll back to his feet." },
      { q: "Can a Libero set the ball?", a: "Yes! Nishinoya learned the jumping back-row toss from behind the attack line, enabling Karasuno to attack with all five players." }
    ],
    abilities: "Super Reflex Digs, Rolling Thunder, Jump Setting, Serve Receiving, Team Morale Anchor.",
    weapon: "Rolling Thunder / Libero Back-Row Toss",
    firstAppearance: "Chapter 16",
    longDescription: "Yu Nishinoya is Karasuno's irrepressible libero, acclaimed as the best in Miyagi Prefecture. Despite his short height, his explosive agility, court intuition, and total refusal to let balls touch the wood make him the bedrock of Karasuno's defense. His loud encouragement consistently pulls Karasuno out of momentum slumps.",
    keyChapters: [
      { number: 16, label: "Chapter 16: The Guardian Deity Arrives" },
      { number: 20, label: "Chapter 20: Rolling Thunder Unleashed" },
      { number: 101, label: "Chapter 101: Mastering the Libero Toss" },
      { number: 275, label: "Chapter 275: Overcoming Atsumu Miya's Hybrid Serves" }
    ],
    relatedSlugs: ["asahi-azumane", "shoyo-hinata", "ryuunosuke-tanaka", "daichi-sawamura"]
  },
  {
    id: "oikawa",
    name: "Toru Oikawa",
    role: "Setter / Grand King",
    grade: "Captain & Setter (Aoba Johsai)",
    description: "The charismatic, hyper-tactical captain of Aoba Johsai. Brings out 100% of every teammate's potential.",
    image: "/characters/tooru-oikawa.jpg",
    slug: "toru-oikawa",
    shortName: "Oikawa",
    faq: [
      { q: "Why does Hinata call Oikawa the 'Grand King'?", a: "Because Oikawa was Kageyama's senior setter in middle school and operates on an even higher tactical and serving level." },
      { q: "Where does Oikawa play after high school?", a: "He moves to Argentina to play for Club Atlético San Juan, ultimately becoming Argentina's starting setter at the Olympics." }
    ],
    abilities: "Devastating Jump Serve, Setter Leadership, Player Maximization, Tactical Decoy Plays.",
    weapon: "Bullet Jump Serve / Team Chemistry Mastery",
    firstAppearance: "Chapter 13",
    longDescription: "Toru Oikawa is the captain and heartbeat of Aoba Johsai High School. A dedicated master of the craft who overcame feelings of inadequacy against natural geniuses like Kageyama and Ushijima through relentless practice, Oikawa has the rare ability to immediately read his hitters' strengths and deliver passes that maximize their power.",
    keyChapters: [
      { number: 14, label: "Chapter 14: The Grand King's First Serve" },
      { number: 60, label: "Chapter 60: Aoba Johsai Outlasts Karasuno" },
      { number: 146, label: "Chapter 146: Talent and Instinct - The Decisive Point" },
      { number: 395, label: "Chapter 395: The Olympic Setter for Argentina" }
    ],
    relatedSlugs: ["tobio-kageyama", "shoyo-hinata", "wakatoshi-ushijima"]
  },
  {
    id: "kuroo",
    name: "Tetsuro Kuroo",
    role: "Middle Blocker / Captain (Nekoma)",
    grade: "Middle Blocker",
    description: "The sly, charismatic captain of Nekoma High. Master of the lead block and defensive coordination.",
    image: "/characters/tetsurou-kuroo.jpg",
    slug: "tetsuro-kuroo",
    shortName: "Kuroo",
    faq: [
      { q: "What is Kuroo's role in Tsukishima's growth?", a: "Kuroo invited Tsukishima to practice blocks during the Tokyo Training Camp, teaching him the fundamentals of personal timing and read blocking." }
    ],
    abilities: "Personal-Time Difference Attack, Read Blocking, Reception Fundamentals, Floor Defense.",
    weapon: "Total Defense Coordination / Lead Block Timing",
    firstAppearance: "Chapter 25",
    longDescription: "Tetsuro Kuroo is Nekoma High's cunning captain and middle blocker. Renowned for his 'rooster head' hairstyle and easygoing smirk, Kuroo is a defensive genius. Along with libero Morisuke Yaku, he anchors Nekoma's impenetrable floor-and-air defense system.",
    keyChapters: [
      { number: 26, label: "Chapter 26: The Cat Meets The Crow" },
      { number: 89, label: "Chapter 89: Training Camp Mentorship" },
      { number: 318, label: "Chapter 318: The Battle at The Garbage Dump" }
    ],
    relatedSlugs: ["kenma-kozume", "kei-tsukishima", "koutarou-bokuto"]
  },
  {
    id: "kenma",
    name: "Kenma Kozume",
    role: "Setter / Nekoma's Brain",
    grade: "Setter",
    description: "The quiet gamer who serves as Nekoma's strategic brain, orchestrating complex traps with minimal physical exertion.",
    image: "/characters/kenma-kozume.jpg",
    slug: "kenma-kozume",
    shortName: "Kenma",
    faq: [
      { q: "What is Kenma's relationship with Hinata?", a: "They met by chance in an alley before their practice match and quickly bonded over their mutual love for volleyball, forming one of the series' greatest rivalries." },
      { q: "What does Kenma do after high school?", a: "He becomes a successful pro gamer, YouTuber, stock trader, and CEO of Bouncing Ball Corp, sponsoring Hinata's training in Brazil." }
    ],
    abilities: "Tactical Game Sense, Eye-Movement Deception, Opponent Pattern Recognition, Soft Dump Spikes.",
    weapon: "Psychological Trapping / Mind Reading",
    firstAppearance: "Chapter 24",
    longDescription: "Kenma Kozume is Nekoma's starting setter. Introverted and reserved, Kenma treats volleyball matches like high-stakes video games, analyzing enemy tendencies and subtly maneuvering Nekoma's field positioning to strangle opposing offenses.",
    keyChapters: [
      { number: 24, label: "Chapter 24: Encounter on The Street" },
      { number: 295, label: "Chapter 295: Trapping Hinata - The Cage of Redundancy" },
      { number: 325, label: "Chapter 325: 'Volleyball is Fun' - Kenma's Revelation" }
    ],
    relatedSlugs: ["tetsurou-kuroo", "shoyo-hinata", "tobio-kageyama"]
  },
  {
    id: "bokuto",
    name: "Kotaro Bokuto",
    role: "Ace / Captain (Fukurodani)",
    grade: "Wing Spiker / Outside Hitter",
    description: "One of Japan's Top 5 High School Aces. An eccentric powerhouse who thrives on the energy of the crowd.",
    image: "/characters/koutarou-bokuto.jpg",
    slug: "kotaro-bokuto",
    shortName: "Bokuto",
    faq: [
      { q: "What is Bokuto's 'dejected mode'?", a: "When small errors upset him, his mood plummets and his team has to actively manage his morale until he rebounds with a spectacular spike." },
      { q: "What team does Bokuto join after high school?", a: "The MSBY Black Jackals in Division 1 of Japan's V.League, alongside Hinata, Atsumu Miya, and Sakusa." }
    ],
    abilities: "Sharp Cut Shot, Line Shot, Block-Outs, Rebounds, Infectious Emotional Fire.",
    weapon: "Ultra-Sharp Cross Spike / Straight Line Shot",
    firstAppearance: "Chapter 79",
    longDescription: "Kotaro Bokuto is Fukurodani Academy's owl-like captain and undisputed ace. Wildly expressive and unpredictable, when Bokuto is at 100%, his sharp-angle cuts and pulverizing line shots are almost impossible to stop.",
    keyChapters: [
      { number: 89, label: "Chapter 89: Teaching Hinata the Rebound" },
      { number: 194, label: "Chapter 194: Fukurodani vs Nekoma Tokyo Playoff" },
      { number: 332, label: "Chapter 332: Bokuto's True Ace Awakening vs Mujinazaka" },
      { number: 382, label: "Chapter 382: MSBY Black Jackal Domination" }
    ],
    relatedSlugs: ["keiji-akaashi", "shoyo-hinata", "tetsurou-kuroo"]
  },
  {
    id: "ushijima",
    name: "Wakatoshi Ushijima",
    role: "Ace / Top 3 Spiker in Japan",
    grade: "Wing Spiker / Opposite Hitter (Shiratorizawa)",
    description: "The southpaw monster of Shiratorizawa Academy. An overwhelming force of pure power and ruthless consistency.",
    image: "/characters/wakatoshi-ushijima.jpg",
    slug: "wakatoshi-ushijima",
    shortName: "Ushijima",
    faq: [
      { q: "What makes Ushijima's spike so hard to receive?", a: "He is left-handed, which gives his ball an unusual counter-clockwise spin that deflects violently off defenders' forearms." }
    ],
    abilities: "Heavy Left-Handed Spin, High-Altitude Spiking, Unwavering Stamina, Block Breaking.",
    weapon: "Left-Hand Heavy Cannon / High Point Spike",
    firstAppearance: "Chapter 77",
    longDescription: "Wakatoshi Ushijima ('Ushiwaka') is the captain and ace of Shiratorizawa Academy. Widely regarded as one of the top three spikers in Japan, Ushijima's philosophy is rooted in overwhelming personal strength and simple, unshakeable execution.",
    keyChapters: [
      { number: 151, label: "Chapter 151: The Champion's Challenge" },
      { number: 164, label: "Chapter 164: Battle Against Karasuno's Defense" },
      { number: 188, label: "Chapter 188: Concept vs Concept Climax" },
      { number: 391, label: "Chapter 391: Schweiden Adlers Powerhouse" }
    ],
    relatedSlugs: ["tooru-oikawa", "shoyo-hinata", "tobio-kageyama"]
  },
  {
    id: "daichi",
    name: "Daichi Sawamura",
    role: "Captain",
    grade: "Wing Spiker / Opposite Hitter",
    description: "The steadfast captain and defensive pillar of Karasuno High. The emotional rock who holds the team together.",
    image: "/characters/daichi-sawamura.jpg",
    slug: "daichi-sawamura",
    shortName: "Daichi",
    faq: [
      { q: "What is Daichi's greatest volleyball strength?", a: "Solid, unshakeable floor defense and emergency serve reception that frees up Nishinoya and the wing attackers." }
    ],
    abilities: "Solid Serve Reception, Floor Defense, Captain Leadership, Back-Row Cover.",
    weapon: "Rock-Solid Serve Reception / Team Backbone",
    firstAppearance: "Chapter 1",
    longDescription: "Daichi Sawamura is Karasuno's third-year captain. While not the flashiest scorer, his rock-steady receives and composed leadership allow volatile offensive weapons like Hinata and Kageyama to take risks with confidence.",
    keyChapters: [
      { number: 1, label: "Chapter 1: Welcome to Karasuno Gym" },
      { number: 115, label: "Chapter 115: Captain's Collision and Recovery" },
      { number: 270, label: "Chapter 270: Neutralizing Inarizaki's Attack Waves" }
    ],
    relatedSlugs: ["koushi-sugawara", "asahi-azumane", "yuu-nishinoya"]
  },
  {
    id: "sugawara",
    name: "Koshi Sugawara",
    role: "Vice Captain / Pinch Setter",
    grade: "Setter",
    description: "Karasuno's compassionate, tactical vice captain. The calming presence who shifts team momentum with smart combinations.",
    image: "/characters/koushi-sugawara.jpg",
    slug: "koshi-sugawara",
    shortName: "Sugawara",
    faq: [
      { q: "What is Sugawara's role after Kageyama becomes starter?", a: "He embraces the role of substitute setter and tactical strategist, reading opponent blocks from the bench and entering the court to stabilize difficult situations." }
    ],
    abilities: "Two-Setter Offense, Hand Signal Calls, Pinpoint Floater Serve, Moral Support.",
    weapon: "Pinch Setting / Two-Setter Synchro Attack",
    firstAppearance: "Chapter 1",
    longDescription: "Koshi Sugawara is Karasuno's third-year vice captain. Selflessly yielding his starting position to the genius Kageyama, Sugawara developed unique multi-attacker sign-plays and jump floater serves to become Karasuno's ultimate pinch tactician.",
    keyChapters: [
      { number: 21, label: "Chapter 21: Senior's Resolution" },
      { number: 64, label: "Chapter 64: Sugawara Takes the Court vs Aoba Johsai" },
      { number: 172, label: "Chapter 172: Two-Setter Synchro Attack Against Shiratorizawa" }
    ],
    relatedSlugs: ["daichi-sawamura", "asahi-azumane", "tobio-kageyama"]
  },
  {
    id: "asahi",
    name: "Asahi Azumane",
    role: "Ace",
    grade: "Wing Spiker / Outside Hitter",
    description: "Karasuno's gentle-hearted ace who packs devastating spike power to blast through any three-man wall.",
    image: "/characters/asahi-azumane.jpg",
    slug: "asahi-azumane",
    shortName: "Asahi",
    faq: [
      { q: "Why did Asahi temporarily leave the volleyball team?", a: "His spikes were completely shut down by Date Tech's 'Iron Wall', shattering his confidence until Hinata and Nishinoya brought him back." }
    ],
    abilities: "Power Spike, Delayed Spike Timing, Heavy Jump Serve, Back-Row Pipe Attack.",
    weapon: "Blasting Power Spike / Block-Break Jump Serve",
    firstAppearance: "Chapter 18",
    longDescription: "Asahi Azumane is Karasuno's third-year ace. Despite looking intimidating with his bun and tall frame, Asahi has a gentle, anxious heart. When he finds his rhythm, his thunderous spikes can rip through the tightest triple blocks in Japan.",
    keyChapters: [
      { number: 18, label: "Chapter 18: The Return of the Ace" },
      { number: 45, label: "Chapter 45: Conquering Date Tech's Iron Wall" },
      { number: 355, label: "Chapter 355: The True Ace Breaking Through Kamomedai" }
    ],
    relatedSlugs: ["yuu-nishinoya", "daichi-sawamura", "ryuunosuke-tanaka"]
  },
  {
    id: "tanaka",
    name: "Ryunosuke Tanaka",
    role: "Wing Spiker",
    grade: "Outside Hitter",
    description: "Karasuno's fiery, mental-fortitude titan who never gives up on a point, no matter how hard he is targeted.",
    image: "/characters/ryuunosuke-tanaka.jpg",
    slug: "ryunosuke-tanaka",
    shortName: "Tanaka",
    faq: [
      { q: "What is Tanaka's mental fortitude quote?", a: "'When things get tough, that's when it's fun! Thinking I'm mediocre is no excuse to stop trying!'" }
    ],
    abilities: "Extreme Cross Spike, Straight Line Spike, High-Pressure Mentality, Inner-Cut Spike.",
    weapon: "Super Inner-Cut Shot / Razor-Sharp Line Spike",
    firstAppearance: "Chapter 1",
    longDescription: "Ryunosuke Tanaka is Karasuno's impassioned second-year outside hitter. Aggressive on the surface, Tanaka possesses extraordinary mental resilience and technical versatility, culminating in mastering the razor-thin straight spike and inner cut shot.",
    keyChapters: [
      { number: 1, label: "Chapter 1: The First Practice Match" },
      { number: 263, label: "Chapter 263: The Unbreakable Spirit vs Inarizaki" },
      { number: 360, label: "Chapter 360: Tanaka's Decisive Cross Shot" }
    ],
    relatedSlugs: ["yuu-nishinoya", "shoyo-hinata", "asahi-azumane"]
  },
  {
    id: "yamaguchi",
    name: "Tadashi Yamaguchi",
    role: "Pinch Server",
    grade: "Middle Blocker / Pinch Server",
    description: "Karasuno's master of the Jump Float Serve who turns the tide of national games from the service line.",
    image: "/characters/tadashi-yamaguchi.jpg",
    slug: "tadashi-yamaguchi",
    shortName: "Yamaguchi",
    faq: [
      { q: "What is Yamaguchi's specialty?", a: "The Jump Float Serve - a knuckleball serve with no spin that wobbles unpredictably in the air, creating nightmare receptions for opponents." }
    ],
    abilities: "Jump Float Serve, High-Pressure Service Aces, Bench Strategist, Future Captain.",
    weapon: "Knuckleball Jump Float Serve",
    firstAppearance: "Chapter 5",
    longDescription: "Tadashi Yamaguchi entered Karasuno as a shy first-year overshadowed by his close friend Tsukishima. Seeking his own identity, he worked tirelessly with local mentor Shimada to master the Jump Float Serve, transforming into Karasuno's most dependable clutch weapon.",
    keyChapters: [
      { number: 62, label: "Chapter 62: First Pinch Serve Against Aoba Johsai" },
      { number: 136, label: "Chapter 136: Redemption - Five Consecutive Service Aces" },
      { number: 284, label: "Chapter 284: Disrupting Inarizaki's Rhythm" }
    ],
    relatedSlugs: ["kei-tsukishima", "shoyo-hinata", "koushi-sugawara"]
  },
  {
    id: "atsumu",
    name: "Atsumu Miya",
    role: "Best High School Setter in Japan",
    grade: "Setter (Inarizaki High)",
    description: "The top high school setter in Japan and member of the legendary Miya Twins. Master of both jump serves and spike tosses.",
    image: "/characters/atsumu-miya.jpg",
    slug: "atsumu-miya",
    shortName: "Atsumu",
    faq: [
      { q: "What is Atsumu's dual-wield serve?", a: "He can deliver either a 120 km/h Bullet Jump Serve or a nasty Jump Float Serve using the exact same four-step or six-step pre-serve routine." }
    ],
    abilities: "Dual Serve Mastery (Spike & Float), Minus-Tempo Copying, Pinpoint Underhand Tosses.",
    weapon: "Dual-Threat Jump Serve / Minus-Tempo Quick Attack",
    firstAppearance: "Chapter 218",
    longDescription: "Atsumu Miya is Inarizaki High's flamboyant and fiercely competitive setter. Alongside twin brother Osamu, Atsumu successfully replicated Hinata and Kageyama's 'Freak Quick' on the fly in the Nationals.",
    keyChapters: [
      { number: 218, label: "Chapter 218: All-Japan Youth Camp Introduction" },
      { number: 254, label: "Chapter 254: The Miya Twins Copy The Freak Quick" },
      { number: 288, label: "Chapter 288: The Final Rally of Karasuno vs Inarizaki" },
      { number: 380, label: "Chapter 380: Setting for Hinata on MSBY Black Jackals" }
    ],
    relatedSlugs: ["tobio-kageyama", "shoyo-hinata", "koutarou-bokuto"]
  }
];
