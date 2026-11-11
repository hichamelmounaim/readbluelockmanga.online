// Haikyu!! story segments (matches and story beats), finer-grained than the 6 arcs.
// Used to give each chapter page its own context: which match or story beat
// the chapter belongs to, who features, and whether the anime has adapted it.
// Ranges are inclusive and cover chapters 1–402.5 with no gaps.
// `characters` must be slugs from data/characters.js.

export const STORY_SEGMENTS = [
  {
    slug: 'prologue', start: 1, end: 1,
    name: 'Prologue: Yukigaoka vs Kitagawa Daiichi',
    summary: "Shoyo Hinata, inspired by Karasuno's \"Little Giant\", finally plays his first official match in junior high with a team of borrowed players. They lose to Kitagawa Daiichi and its \"King of the Court\", setter Tobio Kageyama, and Hinata swears to beat him one day.",
    characters: ['shoyo-hinata', 'tobio-kageyama'],
  },
  {
    slug: 'joining-karasuno', start: 2, end: 10,
    name: 'Joining Karasuno & the 3-on-3 Match',
    summary: "Hinata and Kageyama both enroll at Karasuno High and clash on day one. Captain Daichi Sawamura bars them from the club until they learn to cooperate, which leads to a 3-on-3 match against first-years Kei Tsukishima and Tadashi Yamaguchi, where the pair first lands their \"freak quick\" attack.",
    characters: ['shoyo-hinata', 'tobio-kageyama', 'daichi-sawamura', 'kei-tsukishima', 'tadashi-yamaguchi'],
  },
  {
    slug: 'vs-aoba-johsai-practice', start: 11, end: 17,
    name: 'Practice Match vs Aoba Johsai',
    summary: "Karasuno plays a practice match against Aoba Johsai, a Miyagi powerhouse. Hinata battles nerves, the freak quick starts to work, and setter Toru Oikawa, Kageyama's old senpai, makes his first appearance with a devastating serve.",
    characters: ['shoyo-hinata', 'tobio-kageyama', 'toru-oikawa', 'koshi-sugawara'],
  },
  {
    slug: 'nishinoya-asahi-return', start: 18, end: 25,
    name: 'The Guardian Deity and the Ace Return',
    summary: "Libero Yu Nishinoya returns from suspension, and the team works to bring back ace Asahi Azumane, who quit after a crushing loss. A match against the local neighborhood association team gives Asahi his chance to hit again with Nishinoya covering behind him.",
    characters: ['yu-nishinoya', 'asahi-azumane', 'koshi-sugawara', 'ryunosuke-tanaka'],
  },
  {
    slug: 'vs-nekoma-practice', start: 26, end: 35,
    name: 'Golden Week Camp & Practice Match vs Nekoma',
    summary: "Under new coach Keishin Ukai, Karasuno trains through Golden Week and plays its old rival Nekoma from Tokyo. Hinata meets setter Kenma Kozume, captain Tetsuro Kuroo leads a patient, defensive team, and the two schools promise a real rematch at Nationals: the \"Battle at the Garbage Dump\".",
    characters: ['kenma-kozume', 'tetsuro-kuroo', 'shoyo-hinata', 'daichi-sawamura'],
  },
  {
    slug: 'interhigh-tokonami', start: 36, end: 40,
    name: 'Interhigh Prelims: vs Tokonami',
    summary: "The Interhigh Miyagi preliminaries begin. Karasuno plays its first official match of the year against Tokonami High, and the team gets its first look at the tournament stage and the rivals waiting further up the bracket.",
    characters: ['shoyo-hinata', 'asahi-azumane', 'daichi-sawamura'],
  },
  {
    slug: 'interhigh-date-tech', start: 41, end: 47,
    name: 'Interhigh Prelims: vs Date Tech',
    summary: "In round two Karasuno faces Date Tech and its famous \"Iron Wall\", the team that crushed Asahi a year earlier. Asahi has to hit through the block again with Nishinoya behind him, while the freak quick tests Date Tech's read blocking.",
    characters: ['asahi-azumane', 'yu-nishinoya', 'shoyo-hinata', 'tobio-kageyama'],
  },
  {
    slug: 'interhigh-aoba-johsai', start: 48, end: 69,
    name: 'Interhigh Prelims: vs Aoba Johsai',
    summary: "Karasuno meets Aoba Johsai in an official match. Oikawa reads the team apart, Sugawara comes in to change the flow, and the game goes to a third set that ends in a heartbreaking loss when the freak quick is finally blocked.",
    characters: ['toru-oikawa', 'tobio-kageyama', 'koshi-sugawara', 'shoyo-hinata'],
  },
  {
    slug: 'interhigh-aftermath', start: 70, end: 71,
    name: 'After the Interhigh Loss',
    summary: "Karasuno deals with the defeat, watches Aoba Johsai fall to Shiratorizawa, and the third-years choose to stay for the Spring High tournament instead of retiring.",
    characters: ['daichi-sawamura', 'koshi-sugawara', 'asahi-azumane'],
  },
  {
    slug: 'road-to-tokyo', start: 72, end: 78,
    name: 'The Road to Tokyo',
    summary: "Karasuno must pass its exams to join a Tokyo training camp. Hinata sneaks into Shiratorizawa and meets ace Wakatoshi Ushijima, while Kageyama and Hinata start to argue about the future of their quick attack.",
    characters: ['shoyo-hinata', 'tobio-kageyama', 'wakatoshi-ushijima'],
  },
  {
    slug: 'tokyo-training-camp', start: 79, end: 96,
    name: 'Tokyo Training Camp with Fukurodani & Nekoma',
    summary: "At the summer camp with Nekoma, Fukurodani, Shinzen and Ubugawa, Karasuno loses again and again while rebuilding its attack. Hinata and Kageyama develop a new quick, and Tsukishima trains blocking at night with Kuroo, Bokuto and Akaashi.",
    characters: ['kotaro-bokuto', 'tetsuro-kuroo', 'kei-tsukishima', 'shoyo-hinata'],
  },
  {
    slug: 'spring-prelims-early', start: 97, end: 107,
    name: 'Spring High Prelims: Opening Rounds',
    summary: "The Spring High Miyagi qualifiers begin. Karasuno shows off what it learned in Tokyo in the first matches, including a battle against Kakugawa and its 2-meter-tall Hyakuzawa.",
    characters: ['shoyo-hinata', 'tobio-kageyama', 'kei-tsukishima'],
  },
  {
    slug: 'spring-prelims-johzenji', start: 108, end: 115,
    name: 'Spring High Prelims: vs Johzenji',
    summary: "Karasuno plays Johzenji, a playful team that treats volleyball like a \"playground\" and pulls off unpredictable plays. Tanaka and the rest of Karasuno have to stay focused against a team that is having fun.",
    characters: ['ryunosuke-tanaka', 'yu-nishinoya', 'shoyo-hinata'],
  },
  {
    slug: 'spring-prelims-wakutani', start: 116, end: 125,
    name: 'Spring High Prelims: vs Wakutani Minami',
    summary: "Against Wakutani Minami and its small ace Nakashima, Karasuno faces a \"battle of the small giants\". Daichi is injured mid-match, and second-year Ennoshita has to step in and lead the team.",
    characters: ['daichi-sawamura', 'shoyo-hinata', 'ryunosuke-tanaka'],
  },
  {
    slug: 'spring-prelims-aoba-johsai', start: 126, end: 149,
    name: 'Spring High Prelims: Aoba Johsai Rematch',
    summary: "Karasuno faces Aoba Johsai again, now with the wild Kyotani on the other side. Yamaguchi's jump float serve, Kageyama's growth as a setter, and Oikawa's last stand make this semi-final one of the series' best matches.",
    characters: ['toru-oikawa', 'tobio-kageyama', 'tadashi-yamaguchi', 'shoyo-hinata'],
  },
  {
    slug: 'spring-prelims-shiratorizawa', start: 150, end: 190,
    name: 'Spring High Prelims Final: vs Shiratorizawa',
    summary: "The Miyagi final against Shiratorizawa and ace Wakatoshi Ushijima goes the full five sets. Tsukishima's blocking against Ushijima becomes a turning point, and Karasuno fights for the one ticket to the Spring Nationals.",
    characters: ['wakatoshi-ushijima', 'kei-tsukishima', 'shoyo-hinata', 'tobio-kageyama'],
  },
  {
    slug: 'tokyo-qualifiers', start: 191, end: 206,
    name: 'Tokyo Qualifiers: Nekoma & Fukurodani',
    summary: "The story moves to Tokyo, where Nekoma and Fukurodani fight for their own Nationals spots. Kenma and Kuroo face Fukurodani's Bokuto and then the sly Nohebi, while the promised Karasuno vs Nekoma rematch comes closer.",
    characters: ['kenma-kozume', 'tetsuro-kuroo', 'kotaro-bokuto'],
  },
  {
    slug: 'pre-nationals-camps', start: 207, end: 230,
    name: 'Pre-Nationals Training Camps',
    summary: "Kageyama is invited to the All-Japan Youth camp and Tsukishima to a Miyagi first-year camp. Hinata, left out, sneaks into the Shiratorizawa camp as a ball boy and learns to watch the game from outside the court.",
    characters: ['tobio-kageyama', 'shoyo-hinata', 'kei-tsukishima', 'atsumu-miya'],
  },
  {
    slug: 'nationals-tsubakihara', start: 231, end: 246,
    name: 'Spring Nationals Round 1: vs Tsubakihara',
    summary: "Karasuno arrives at the Tokyo Metropolitan Gymnasium for the Spring Nationals. In the first round against Tsubakihara Academy, the team gets used to the huge stage, and Yamaguchi and Hinata show how much they have grown.",
    characters: ['shoyo-hinata', 'tadashi-yamaguchi', 'daichi-sawamura'],
  },
  {
    slug: 'nationals-inarizaki', start: 247, end: 292,
    name: 'Spring Nationals Round 2: vs Inarizaki',
    summary: "Karasuno takes on Inarizaki, the runner-up of the Interhigh, led by the Miya twins Atsumu and Osamu. Inarizaki's crowd, serves and copied freak quick push Karasuno to the edge in a long, three-set battle.",
    characters: ['atsumu-miya', 'shoyo-hinata', 'tobio-kageyama', 'kei-tsukishima'],
  },
  {
    slug: 'nationals-nekoma', start: 293, end: 325,
    name: 'Spring Nationals Round 3: The Battle at the Garbage Dump vs Nekoma',
    summary: "The long-promised \"Battle at the Garbage Dump\" finally happens. Kenma builds Nekoma's whole plan around stopping Hinata, and the rally-heavy match between the crows and the cats ends with Kenma saying volleyball was fun.",
    characters: ['kenma-kozume', 'tetsuro-kuroo', 'shoyo-hinata', 'yu-nishinoya'],
  },
  {
    slug: 'nationals-kamomedai', start: 326, end: 367,
    name: 'Spring Nationals Quarterfinal: vs Kamomedai',
    summary: "Karasuno faces Kamomedai, the tallest blocking team in the tournament, led by small ace Korai Hoshiumi. The \"Little Giant\" decider is a battle of height and reading, and Hinata's fever forces him off the court, ending Karasuno's spring.",
    characters: ['shoyo-hinata', 'tobio-kageyama', 'asahi-azumane', 'kei-tsukishima'],
  },
  {
    slug: 'after-nationals', start: 368, end: 369,
    name: 'After the Spring Nationals',
    summary: "The tournament wraps up, and Hinata looks at what he still needs to learn. These chapters close the high school story and set up the time skip.",
    characters: ['shoyo-hinata', 'tobio-kageyama'],
  },
  {
    slug: 'timeskip-brazil', start: 370, end: 377,
    name: 'Time Skip: Hinata in Brazil',
    summary: "Years later, Hinata trains in beach volleyball in Rio de Janeiro to become a complete player who can do everything. Meanwhile old teammates and rivals move on with their lives, and he returns to Japan.",
    characters: ['shoyo-hinata', 'toru-oikawa'],
  },
  {
    slug: 'vleague-jackals-adlers', start: 378, end: 401,
    name: 'V.League: MSBY Black Jackals vs Schweiden Adlers',
    summary: "Hinata debuts in Division 1 of the V.League with the MSBY Black Jackals alongside Bokuto and Atsumu, against Kageyama and Ushijima's Schweiden Adlers. Old teammates and rivals fill the stands to watch the \"Great Monster War\".",
    characters: ['shoyo-hinata', 'tobio-kageyama', 'kotaro-bokuto', 'atsumu-miya', 'wakatoshi-ushijima'],
  },
  {
    slug: 'final-chapter', start: 402, end: 402.5,
    name: 'Final Chapter & Epilogue',
    summary: "The final chapter jumps ahead to the Olympics, where Japan, with Hinata and Kageyama on the same court, faces Oikawa's Argentina. The special epilogue chapter follows.",
    characters: ['shoyo-hinata', 'tobio-kageyama', 'toru-oikawa'],
  },
];

// Which anime season or film adapts each chapter range.
export const ANIME_COVERAGE = [
  { start: 1, end: 71, label: 'Season 1 of the anime (2014)', path: '/anime' },
  { start: 72, end: 149, label: 'Season 2 of the anime (2015–2016)', path: '/anime/season-2' },
  { start: 150, end: 190, label: 'Season 3, Karasuno vs Shiratorizawa (2016)', path: '/anime' },
  { start: 191, end: 292, label: 'Season 4, To The Top (2020)', path: '/anime/season-4' },
  { start: 293, end: 325, label: 'the film Haikyu!! The Dumpster Battle (2024)', path: '/anime/dumpster-battle' },
];

export function getStorySegment(num) {
  return STORY_SEGMENTS.find(s => num >= s.start && num <= s.end) || STORY_SEGMENTS[STORY_SEGMENTS.length - 1];
}

export function getAnimeCoverage(num) {
  return ANIME_COVERAGE.find(a => num >= a.start && num <= a.end) || null;
}
