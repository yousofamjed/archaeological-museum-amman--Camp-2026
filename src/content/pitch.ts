/**
 * Pitch content. Anything marked "fill" or "draft" is still the team's
 * decision. Edit the text here; the page picks it up automatically.
 */

export type PitchStatus = "verified" | "draft" | "fill";

export type PitchBlock = {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  status: PitchStatus;
  body: string[];
};

export const PITCH: PitchBlock[] = [
  {
    id: "place",
    number: 1,
    title: "The place",
    titleAr: "المكان",
    status: "verified",
    body: [
      "Built in 1951 on Jabal al-Qal'a, designed by Austen Harrison, with about 525–550 m² over two floors.",
      "Three small halls show around 2,000 objects. There is no room for temporary exhibitions, and the building is listed as not accessible for people with disabilities.",
      "A typical visit takes about 45 minutes.",
    ],
  },
  {
    id: "challenge",
    number: 2,
    title: "The challenge",
    titleAr: "التحدي",
    status: "draft",
    body: [
      "The museum holds 9,000 years of Jordan's story, but the interior presents it as rows of cases. Visitors pass through without one connected story.",
      "TO FILL: the evidence you collected (visitor counts, interviews, observations at the Citadel).",
    ],
  },
  {
    id: "people",
    number: 3,
    title: "The people",
    titleAr: "الفئة المستهدفة",
    status: "fill",
    body: ["TO FILL: your specific primary user (not just \"young people\"), and why this matters to them."],
  },
  {
    id: "insight",
    number: 4,
    title: "The key insight",
    titleAr: "الفكرة الجوهرية",
    status: "fill",
    body: ["TO FILL: \"We realized that…\""],
  },
  {
    id: "idea",
    number: 5,
    title: "The idea",
    titleAr: "الفكرة",
    status: "draft",
    body: [
      "One continuous walk through six era rooms on two floors. Each room has its own atmosphere, keeps real objects at the centre, and uses technology only where it explains something.",
    ],
  },
  {
    id: "red-line",
    number: 6,
    title: "Heritage red line",
    titleAr: "الخط الأحمر التراثي",
    status: "draft",
    body: [
      "No structural changes to the 1951 building: no new openings and no lift shaft.",
      "All new walls, ceilings and floors are freestanding and reversible.",
      "Real objects stay at the centre. Screens and holograms explain them; they never replace them.",
      "Every date and caption is checked with the Department of Antiquities before production.",
    ],
  },
  {
    id: "making-it-happen",
    number: 7,
    title: "Making it happen",
    titleAr: "خطة التنفيذ",
    status: "draft",
    body: [
      "NOW: reorganise the existing collection into the six chronological rooms, rewrite labels in Arabic and English, and add movable track lighting.",
      "NEXT: build the freestanding room shells, raised floors, projections and touch tables with the Department of Antiquities, the Ministry of Tourism and a university design department.",
      "LATER: holograms, the immersive domes, and rotating loans from The Jordan Museum.",
    ],
  },
  {
    id: "risks",
    number: 8,
    title: "What could go wrong",
    titleAr: "المخاطر",
    status: "draft",
    body: [
      "Technology fails: every room still works with the screens off, because the objects and labels carry the story.",
      "Conservation: light, heat and humidity limits are set for each case, especially manuscripts and metal.",
      "Storage: today the ground floor is storage. The collection that isn't on display needs a new home before Floor 1 opens. TO CONFIRM with the Department of Antiquities.",
      "Access: Floor 2 is reached by stairs only. Mitigation (DRAFT): a screen in the Floor 1 hall previews rooms 4–6.",
    ],
  },
];
