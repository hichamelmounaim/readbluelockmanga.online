// Story arcs. Shared by the React app and the build scripts.
export const ARCS_DATA = [
  {
    id: "first-selection",
    title: "First Selection Arc",
    description: "300 youth strikers are divided into 25 five-man teams across five stratums, competing in a round-robin tournament where only the top teams survive.",
    chapterStart: 1,
    chapterEnd: 38,
    image: "/blue-lock.webp"
  },
  {
    id: "second-selection",
    title: "Second Selection Arc",
    description: "Strikers form small squads of three and duel through high-stakes matches, stealing defeated opponents to assemble five-man teams to reach the next stage.",
    chapterStart: 39,
    chapterEnd: 87,
    image: "/blue-lock.webp"
  },
  {
    id: "third-selection-u20",
    title: "Third Selection & Japan U-20 Match",
    description: "Blue Lock's top 11 face off against Sae Itoshi and the official Japan U-20 National Team with the survival of the entire Blue Lock program on the line.",
    chapterStart: 88,
    chapterEnd: 151,
    image: "/blue-lock.webp"
  },
  {
    id: "neo-egoist-league",
    title: "Neo Egoist League Arc",
    description: "The surviving strikers join European youth powerhouses (Bastard München, Manshine City, Ubers, Paris X Gen, Barcha) to battle in a televised league with real club contract bids. The top 23 earn a place in the U-20 World Cup squad.",
    chapterStart: 152,
    chapterEnd: 302,
    image: "/blue-lock.webp"
  },
  {
    id: "u20-world-cup",
    title: "U-20 World Cup Arc",
    description: "Phase three of the project: Blue Lock Japan takes on the best young national teams in the world at the FIFA U-20 World Cup. Ongoing.",
    chapterStart: 303,
    chapterEnd: null, // ongoing: filled in from the latest chapter (constants.ts)
    ongoing: true,
    image: "/blue-lock.webp"
  }
];
