// Character profiles. Shared by the React app (constants.ts) and the build scripts (prerender, sitemap).
export const CHARACTERS_DATA = [
  {
    id: "isagi",
    name: "Yoichi Isagi",
    role: "Protagonist",
    grade: "Forward / Striker",
    description: "The main protagonist of Blue Lock. An egoist striker who aims to become the world's best.",
    image: "/characters/yoichi-isagi.webp",
    slug: "yoichi-isagi",
    shortName: "Isagi",
    faq: [
      { q: "What team is Isagi on?", a: "Team Z in the First Selection, Bastard München (Germany) in the Neo Egoist League, and Blue Lock Japan at the U-20 World Cup." },
      { q: "Is Isagi the main character of Blue Lock?", a: "Yes. Yoichi Isagi is the protagonist of Blue Lock." }
    ],
    abilities: "Spatial Awareness, Direct Shoot, Metavision, Egocentrism.",
    weapon: "Direct Shoot / Metavision (Spatial Awareness)",
    firstAppearance: "Chapter 1",
    longDescription: "Yoichi Isagi is the central protagonist of Blue Lock. Starting as a team-first forward at Ichinan High School, Isagi entered Jinpachi Ego's facility and gradually awakened his latent genius for Spatial Awareness. By continuously reading the field, analyzing opponent psychology ('Egocentrism'), and utilizing high-speed peripheral observation ('Metavision'), Isagi creates and finishes optimal goal-scoring opportunities. His lethal weapon is the Direct Shoot, striking without trapping to eliminate defenders' recovery window.",
    keyChapters: [
      { number: 1, label: "Chapter 1: Entry into Blue Lock" },
      { number: 38, label: "Chapter 38: Climax of Team Z vs Team V" },
      { number: 103, label: "Chapter 103: Flow State Awakening" },
      { number: 147, label: "Chapter 147: The Last Goal vs Japan U-20" },
      { number: 202, label: "Chapter 202: Two-Gun Volley Awakening" }
    ],
    relatedSlugs: ["meguru-bachira", "rin-itoshi", "michael-kaiser", "seishiro-nagi"]
  },
  {
    id: "bachira",
    name: "Meguru Bachira",
    role: "Main Character",
    grade: "Forward / Winger",
    description: "An instinctive, whimsical dribbler guided by a 'monster' inside him.",
    image: "/characters/meguru-bachira.webp",
    slug: "meguru-bachira",
    shortName: "Bachira",
    faq: [
      { q: "What position does Bachira play?", a: "Bachira is a forward and dribbler. In the Neo Egoist League he plays for FC Barcha (Spain)." }
    ],
    abilities: "Egoist Dribbling, Key Passes, Hyper-flexible Footwork, Monster Instinct.",
    weapon: "Breakdance Dribbling / Instinctive Playmaking",
    firstAppearance: "Chapter 1",
    longDescription: "Meguru Bachira is one of Isagi's closest comrades in Blue Lock. Known for his eccentric personality and carefree demeanor, Bachira plays football purely by listening to his internal 'monster.' He possesses elite dribbling mastery, employing unpredictable step-overs, elastic feints, and explosive changes of pace that dismantle defensive lines single-handedly. As a playmaker and winger, his visionary passing unlocks tight defenses.",
    keyChapters: [
      { number: 1, label: "Chapter 1: Partnership with Isagi" },
      { number: 71, label: "Chapter 71: Solitary Monster Awakening" },
      { number: 85, label: "Chapter 85: Breakthrough in 4v4 Match" },
      { number: 160, label: "Chapter 160: FC Barcha Debut" }
    ],
    relatedSlugs: ["yoichi-isagi", "rin-itoshi", "hyoma-chigiri"]
  },
  {
    id: "rin",
    name: "Rin Itoshi",
    role: "Rival / Ace",
    grade: "Forward / Striker",
    description: "The top-ranked striker in Blue Lock. Plays with cold, calculated destruction.",
    image: "/characters/rin-itoshi.webp",
    slug: "rin-itoshi",
    shortName: "Rin",
    age: "16",
    birthday: "September 9",
    faq: [
      { q: "What team is Rin on?", a: "Rin plays for Paris X Gen (France) in the Neo Egoist League and is part of Blue Lock Japan for the U-20 World Cup." },
      { q: "Who is Rin's brother?", a: "Sae Itoshi, a midfielder of the New Generation World 11 and Rin's biggest motivation." }
    ],
    abilities: "Puppeteer Soccer, Pinpoint Free Kicks, Metavision, Destructive Instinct.",
    weapon: "Absolute Kick Precision / Puppeteer Strategy",
    firstAppearance: "Chapter 40",
    longDescription: "Rin Itoshi is the undisputed prodigy of Blue Lock and younger brother of world-class midfielder Sae Itoshi. Driven by an intense desire to surpass Sae, Rin dictates matches with 'Puppeteer Soccer,' forcing opponents to move exactly where he wants before executing lethal, pinpoint strikes. When pushed to his absolute limit, Rin sheds calculating rationality to unleash a monstrous, instinctive playstyle that directly breaks opponents' core weapons.",
    keyChapters: [
      { number: 40, label: "Chapter 40: Introduction of Rin Itoshi" },
      { number: 82, label: "Chapter 82: 4v4 Climax vs Isagi" },
      { number: 146, label: "Chapter 146: Destructive Flow vs Sae" },
      { number: 250, label: "Chapter 250: PXG vs Bastard Munchen" }
    ],
    relatedSlugs: ["sae-itoshi", "yoichi-isagi", "michael-kaiser"]
  },
  {
    id: "kunigami",
    name: "Rensuke Kunigami",
    role: "Main Character / Wild Card",
    grade: "Forward / Target Striker",
    description: "The football hero reborn from the Wild Card program with superhuman physical specs.",
    image: "/characters/rensuke-kunigami.webp",
    slug: "rensuke-kunigami",
    shortName: "Kunigami",
    abilities: "Knuckle Shot, Ambidextrous Shooting, Power Headers, Physical Dominance.",
    weapon: "Long-Range Cannon / Ambidextrous Noel Noa Clone Physicals",
    firstAppearance: "Chapter 1",
    longDescription: "Rensuke Kunigami began with a chivalrous dream to become a 'football hero,' relying on fair play and a thunderous left-footed middle-range shot. Following an elimination in the Second Selection, Kunigami survived the brutal 'Wild Card' program designed to forge a body identical to world number one striker Noel Noa. He returned as an imposing, clinical striker capable of scoring with overwhelming force from either foot.",
    keyChapters: [
      { number: 1, label: "Chapter 1: The Football Hero" },
      { number: 24, label: "Chapter 24: Left-Foot Cannon vs Team W" },
      { number: 153, label: "Chapter 153: Return of the Wild Card" },
      { number: 166, label: "Chapter 166: Dominant Striker in Neo Egoist" }
    ],
    relatedSlugs: ["yoichi-isagi", "hyoma-chigiri", "shoei-barou"]
  },
  {
    id: "chigiri",
    name: "Hyoma Chigiri",
    role: "Main Character",
    grade: "Forward / Wingback",
    description: "The 'Red Panther' blessed with unmatched top-end sprinting speed.",
    image: "/characters/hyoma-chigiri.webp",
    slug: "hyoma-chigiri",
    shortName: "Chigiri",
    abilities: "Mach-Speed Sprinting, Cut-in Curler, 44-Caliber Golden Zone.",
    weapon: "High-Speed Breakaway / 44-Degree Angle Golden Formula",
    firstAppearance: "Chapter 2",
    longDescription: "Hyoma Chigiri was once held back by psychological trauma from a past ACL knee tear. After rediscovering his ego with Team Z, Chigiri unleashed his god-given speed, routinely clocking past entire defensive lines. Operating on the left wing for Manshine City in the Neo Egoist League, he refined a clinical '44-degree golden formula' cut-in shot that turns high-speed breaks into guaranteed goals.",
    keyChapters: [
      { number: 19, label: "Chapter 19: Unchaining the Red Panther" },
      { number: 73, label: "Chapter 73: Speed Duel in Second Selection" },
      { number: 177, label: "Chapter 177: 44-Caliber Golden Zone Debut" }
    ],
    relatedSlugs: ["rensuke-kunigami", "yoichi-isagi", "seishiro-nagi"]
  },
  {
    id: "nagi",
    name: "Seishiro Nagi",
    role: "Main Character",
    grade: "Forward / Second Striker",
    description: "A laid-back soccer prodigy gifted with flawless first-touch trapping ability.",
    image: "/characters/seishiro-nagi.webp",
    slug: "seishiro-nagi",
    shortName: "Nagi",
    age: "17",
    birthday: "May 6",
    faq: [
      { q: "What team is Nagi on?", a: "Team V in the First Selection and Manshine City (England) in the Neo Egoist League. He is eliminated when the NEL ends and returns through Side B in the U-20 World Cup arc." },
      { q: "Does Nagi have his own manga?", a: "Yes, Blue Lock: Episode Nagi, which was also made into an anime movie." }
    ],
    abilities: "Zero-Motion Trap, Five-Stage Revolver Volley, Juggling Shot, Creative Finishing.",
    weapon: "God-Level First Touch Ball Control",
    firstAppearance: "Chapter 22",
    longDescription: "Seishiro Nagi only played football for six months before entering Blue Lock, yet his supernatural trapping ability lets him deaden any pass instantly regardless of velocity or spin. Initially indifferent and reliant on Reo Mikage, Nagi developed his own hunger for victory through intense rivalries with Isagi. His highlight moments include miraculous multi-stage aerial volleys that defy standard defensive physics. Nagi also has his own spin-off manga, Blue Lock: Episode Nagi (2022–2025), which was adapted into an anime film. In the Neo Egoist League he played for Manshine City, but he was eliminated when the league ended, before the U-20 World Cup.",
    keyChapters: [
      { number: 22, label: "Chapter 22: First Appearance with Reo" },
      { number: 36, label: "Chapter 36: Nagi Awakens vs Team Z" },
      { number: 68, label: "Chapter 68: Black Hole Trap with Isagi" },
      { number: 190, label: "Chapter 190: Five-Stage Revolver Miracle" }
    ],
    relatedSlugs: ["reo-mikage", "yoichi-isagi", "shoei-barou"]
  },
  {
    id: "barou",
    name: "Shoei Barou",
    role: "Rival / Striker",
    grade: "Forward / Center Striker",
    description: "The self-proclaimed 'King' who commands the pitch with aggressive shooting and power.",
    image: "/characters/shoei-barou.webp",
    slug: "shoei-barou",
    shortName: "Barou",
    faq: [
      { q: "What team is Barou on?", a: "Team X in the First Selection and Ubers (Italy) in the Neo Egoist League." }
    ],
    abilities: "Predator Eye, Chopping Feints, 29-Meter Middle Shot, Physical Charge.",
    weapon: "Sharp Mid-Range Curve / Predator Eye Sniping",
    firstAppearance: "Chapter 3",
    longDescription: "Shoei Barou views himself as the sole monarch of the pitch, demanding everyone else act as supporting actors to his glory. Despite his authoritarian style, his rigorous training regimen gives him unrivaled core stability, allowing violent chopping dribbles and pin-point strikes from up to 29 meters. Under Ubers in the Neo Egoist League, he adopted 'Predator Eye,' timing shots precisely through the gaps of goalkeepers' visual blind spots.",
    keyChapters: [
      { number: 5, label: "Chapter 5: Reign of the King vs Team Z" },
      { number: 66, label: "Chapter 66: Devoured by Isagi & Villain Rebirth" },
      { number: 133, label: "Chapter 133: Joker of Blue Lock 11" },
      { number: 216, label: "Chapter 216: Predator Eye Sniping for Ubers" }
    ],
    relatedSlugs: ["yoichi-isagi", "seishiro-nagi", "rin-itoshi"]
  },
  {
    id: "reo",
    name: "Reo Mikage",
    role: "Playmaker",
    grade: "Midfielder / Forward",
    description: "The heir to the Mikage Corporation with a 99% dexterity rating across all football fundamentals.",
    image: "/characters/reo-mikage.webp",
    slug: "reo-mikage",
    shortName: "Reo",
    faq: [
      { q: "What team is Reo on?", a: "Team V with Nagi in the First Selection, and Manshine City (England) in the Neo Egoist League." }
    ],
    abilities: "Chameleon Playstyle, 99% Stat Balance, Metavision, Versatile Passing.",
    weapon: "Chameleon (Near-Perfect Replication of Techniques)",
    firstAppearance: "Chapter 22",
    longDescription: "Reo Mikage possesses top-tier intelligence, athletic capability, and immense wealth. His specialty is the 'Chameleon' style: because all his physical and technical attributes are rated at 99%, he can replicate almost any player's signature moves at nearly full efficiency, from Sae's trivela passes to Nagi's cushioned traps. He forms an all-around midfield powerhouse who can both defend and orchestrate attacks.",
    keyChapters: [
      { number: 22, label: "Chapter 22: Partnership with Nagi" },
      { number: 106, label: "Chapter 106: Chameleon Awakening" },
      { number: 186, label: "Chapter 186: Metavision Synthesis for Manshine" }
    ],
    relatedSlugs: ["seishiro-nagi", "yoichi-isagi", "sae-itoshi"]
  },
  {
    id: "sae",
    name: "Sae Itoshi",
    role: "World Prodigy",
    grade: "Attacking Midfielder",
    description: "Japan's crown jewel midfielder and member of the New Generation World 11.",
    image: "/characters/sae-itoshi.webp",
    slug: "sae-itoshi",
    shortName: "Sae",
    age: "17 at the start of the story, 18 by the Second Selection",
    birthday: "October 10",
    faq: [
      { q: "Is Sae older than Rin?", a: "Yes. Sae is Rin's older brother." }
    ],
    abilities: "Passive Metavision, Trivela Passes, Flawless Ball Distribution, World-Class Vision.",
    weapon: "Calculated Destruction Through Passing",
    firstAppearance: "First Selection arc",
    longDescription: "Sae Itoshi is Rin's older brother and the attacking midfield linchpin for Real Madrid's youth academy. As a recognized member of the New Generation World 11, Sae's soccer IQ, technical finesse, and surgical passing dissect defenses effortlessly. While cynical about Japan's traditional soccer culture, his clash with Blue Lock during the Japan U-20 showcase demonstrated the sheer gulf between world-class European talent and domestic youth.",
    keyChapters: [
      { number: 4, label: "Chapter 4: Return from Madrid" },
      { number: 112, label: "Chapter 112: The Masterclass of Japan U-20" },
      { number: 148, label: "Chapter 148: Final Words to Yoichi Isagi" }
    ],
    relatedSlugs: ["rin-itoshi", "yoichi-isagi", "michael-kaiser"]
  },
  {
    id: "ego",
    name: "Jinpachi Ego",
    role: "Architect / Coach",
    grade: "Mastermind Coach",
    description: "The eccentric director who conceived the Blue Lock project to produce the ultimate striker.",
    image: "/characters/jinpachi-ego.webp",
    slug: "jinpachi-ego",
    shortName: "Ego",
    abilities: "Football Theory, Psychological Manipulation, Tactical Design, Flow State Analysis.",
    weapon: "Egoism Philosophy & High-Performance Conditioning",
    firstAppearance: "Chapter 1",
    longDescription: "Hired by Anri Teieri and the Japan Football Union, Jinpachi Ego is the radical mastermind behind the entire Blue Lock initiative. Believing that Japan's collective soccer mindset is inherently flawed, Ego designed an unforgiving, survival-of-the-fittest academy to strip 300 youth strikers of altruism and instill an insatiable hunger to score goals on the world stage.",
    keyChapters: [
      { number: 1, label: "Chapter 1: The Philosophy of Egoism" },
      { number: 88, label: "Chapter 88: Presentation of the U-20 Plan" },
      { number: 151, label: "Chapter 151: The Neo Egoist Announcement" }
    ],
    relatedSlugs: ["yoichi-isagi", "rin-itoshi"]
  },
  {
    id: "kaiser",
    name: "Michael Kaiser",
    role: "Rival Ace",
    grade: "Forward / Striker",
    description: "Bastard München's ace striker and a member of the New Generation World 11, famous for the Kaiser Impact.",
    // TODO: replace with a real portrait at /characters/michael-kaiser.jpg (230x345, same as the others)
    image: "/blue-lock.webp",
    slug: "michael-kaiser",
    shortName: "Kaiser",
    faq: [
      { q: "What team is Kaiser on?", a: "Bastard München (Germany), the same Neo Egoist League team as Isagi." }
    ],
    abilities: "Kaiser Impact, Kaiser Magnus, Metavision, Ball Control.",
    weapon: "Kaiser Impact (ultra-fast shot release)",
    firstAppearance: "Neo Egoist League Arc",
    longDescription: "Michael Kaiser is the star forward of Germany's Bastard München and one of the New Generation World 11, the most highly rated young players on the planet. When the Blue Lock strikers join the Neo Egoist League, Kaiser becomes the established king Yoichi Isagi has to overthrow. His signature Kaiser Impact is a shot fired with almost no backswing, and his Metavision lets him read the whole pitch, which turns every Bastard München match into a direct battle of egos between him and Isagi.",
    relatedSlugs: ["yoichi-isagi", "rin-itoshi", "sae-itoshi"]
  },
  {
    id: "anri",
    name: "Anri Teieri",
    role: "Blue Lock Staff",
    grade: "Japan Football Union",
    description: "The Japan Football Union employee who brought Jinpachi Ego in to create Blue Lock, and the main female character of the series.",
    image: "/characters/anri-teieri.webp",
    slug: "anri-teieri",
    shortName: "Anri",
    abilities: "Project management, data analysis, belief in the Blue Lock project.",
    weapon: "Not a player: she runs Blue Lock alongside Ego",
    firstAppearance: "Chapter 1",
    longDescription: "Anri Teieri works for the Japan Football Union and is the person who recruited Jinpachi Ego to build Blue Lock. Inside the facility she works as Ego's assistant, handling the project's operations and defending it against the JFU executives who want to shut it down. She is the most prominent female character in Blue Lock.",
    faq: [
      { q: "Who is the girl in Blue Lock?", a: "The main female character is Anri Teieri, the Japan Football Union employee who works with Jinpachi Ego to run Blue Lock." }
    ],
    relatedSlugs: ["jinpachi-ego", "yoichi-isagi"]
  },
  {
    id: "kira",
    name: "Ryosuke Kira",
    role: "Rival Striker",
    grade: "Forward / Striker",
    description: "Japan's most hyped young striker at the start of the story, and the first player eliminated from Blue Lock.",
    image: "/characters/ryousuke-kira.webp",
    slug: "ryosuke-kira",
    shortName: "Kira",
    abilities: "Technique, finishing, a strong reputation in Japanese high-school soccer.",
    weapon: "All-round striker skills",
    firstAppearance: "Chapter 1",
    longDescription: "Ryosuke Kira is introduced as the star of Japanese high-school soccer when his team beats Isagi's in chapter 1. Inside Blue Lock, he is the first player eliminated: Isagi hits him with the ball in the opening tag game. Kira returns in the U-20 World Cup arc as one of the Side B players fighting for a second chance.",
    relatedSlugs: ["yoichi-isagi", "seishiro-nagi"]
  },
  {
    id: "kuon",
    name: "Wataru Kuon",
    role: "Team Z Member",
    grade: "Defender / Forward",
    description: "A tall, physical member of Team Z remembered for his betrayal during the First Selection.",
    image: "/characters/wataru-kuon.webp",
    slug: "wataru-kuon",
    shortName: "Kuon",
    abilities: "Height, aerial play, defending.",
    weapon: "Aerial strength",
    firstAppearance: "First Selection arc",
    longDescription: "Wataru Kuon is one of the eleven members of Team Z. During the First Selection he secretly makes a deal with an opposing team, which nearly costs Team Z everything; he then tries to make up for it on the pitch.",
    relatedSlugs: ["yoichi-isagi", "yudai-imamura"]
  },
  {
    id: "imamura",
    name: "Yudai Imamura",
    role: "Team Z Member",
    grade: "Forward",
    description: "A fast, cheerful forward of Team Z.",
    image: "/characters/yudai-imamura.webp",
    slug: "yudai-imamura",
    shortName: "Imamura",
    abilities: "Speed, energy, quick runs behind the defense.",
    weapon: "Speed",
    firstAppearance: "First Selection arc",
    longDescription: "Yudai Imamura is one of the eleven members of Team Z alongside Isagi, Bachira, Kunigami and Chigiri. He relies on speed and energy and is one of the more light-hearted players in the team.",
    relatedSlugs: ["yoichi-isagi", "wataru-kuon"]
  }
];
