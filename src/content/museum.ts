import type { StaticImageData } from "next/image";

import stoneAge from "@/assets/rooms/stone-age.jpg";
import copperBronze from "@/assets/rooms/copper-bronze.jpg";
import ironPersian from "@/assets/rooms/iron-persian.jpg";
import greekRoman from "@/assets/rooms/greek-roman.jpg";
import byzantine from "@/assets/rooms/byzantine.jpg";
import islamicOttoman from "@/assets/rooms/islamic-to-ottoman.jpg";

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* All coordinates are in metres. Origin is the north-west corner of   */
/* the building, x grows east, y grows south. Each floor is            */
/* 15.8 m x 15.8 m = 249.64 m², matching the team's concept board.     */
/* ------------------------------------------------------------------ */

export const FLOOR_SIZE = 15.8;

export type Point = [number, number];

export type ZoneKind = "room" | "hall" | "service" | "reception" | "hub" | "stairs";

export type Zone = {
  id: string;
  kind: ZoneKind;
  label: string;
  labelAr?: string;
  polygon: Point[];
  /** Where the label sits, defaults to the polygon centroid. */
  labelAt?: Point;
};

export type Floor = {
  id: 1 | 2;
  name: string;
  nameAr: string;
  zones: Zone[];
  /** Openings drawn as gaps in walls: [start, end]. */
  doors: [Point, Point][];
  /** The red dashed visitor route. */
  route: Point[];
  entrance?: Point;
  stairs: Point;
};

// Shared shapes: both floors use the same structural grid, so the
// upper rooms sit directly above the lower ones.
const NORTH_ROOM: Point[] = [[3.4, 0], [11.6, 0], [11.6, 6], [3.4, 6]];
const EAST_ROOM: Point[] = [[11.6, 0], [15.8, 0], [15.8, 10.6], [12.4, 10.6], [11.6, 9.2]];
const SOUTH_ROOM: Point[] = [[6.5, 10.6], [15.8, 10.6], [15.8, 15.8], [6.5, 15.8]];
const HALL: Point[] = [[3.4, 6], [11.6, 6], [11.6, 9.2], [12.4, 10.6], [6.5, 10.6], [6.5, 12.2], [3.4, 12.2]];
const CORNER: Point[] = [[0, 12.2], [6.5, 12.2], [6.5, 15.8], [0, 15.8]];
const SERVICE_TOP: Point[] = [[0, 0], [3.4, 0], [3.4, 4.4], [0, 4.4]];
const SERVICE_MID: Point[] = [[0, 4.4], [3.4, 4.4], [3.4, 7.8], [0, 7.8]];
const STAIRS: Point[] = [[0, 7.8], [3.4, 7.8], [3.4, 12.2], [0, 12.2]];

const DOORS: [Point, Point][] = [
  [[6.6, 6], [8.4, 6]], // hall -> north room
  [[11.6, 4.6], [11.6, 5.8]], // north room -> east room
  [[13.6, 10.6], [15.2, 10.6]], // east room -> south room
  [[6.5, 10.8], [6.5, 12.0]], // south room -> hall
  [[3.4, 9.0], [3.4, 11.0]], // hall -> stairs
];

export const FLOORS: Floor[] = [
  {
    id: 1,
    name: "Floor 1",
    nameAr: "الطابق الأول",
    zones: [
      { id: "service-1a", kind: "service", label: "WC · Accessible WC", labelAr: "دورات المياه", polygon: SERVICE_TOP },
      { id: "service-1b", kind: "service", label: "Service / Storage", labelAr: "خدمات", polygon: SERVICE_MID },
      { id: "stairs-1", kind: "stairs", label: "Stairs up", labelAr: "درج", polygon: STAIRS },
      { id: "reception", kind: "reception", label: "Reception", labelAr: "الاستقبال", polygon: CORNER, labelAt: [1.6, 13.0] },
      { id: "hall-1", kind: "hall", label: "Central hall", labelAr: "البهو", polygon: HALL, labelAt: [9.4, 8.2] },
      { id: "stone-age", kind: "room", label: "Stone Age", labelAr: "العصر الحجري", polygon: NORTH_ROOM },
      { id: "copper-bronze", kind: "room", label: "Copper &\nBronze Age", labelAr: "العصر النحاسي\nوالبرونزي", polygon: EAST_ROOM, labelAt: [13.7, 2.4] },
      { id: "iron-persian", kind: "room", label: "Iron Age & Persian", labelAr: "العصر الحديدي والفارسي", polygon: SOUTH_ROOM },
    ],
    doors: [...DOORS, [[2.6, 15.8], [4.6, 15.8]]],
    route: [[3.6, 16.6], [3.6, 13.4], [5.2, 11.0], [7.5, 7.4], [7.5, 5.1], [10.6, 5.1], [11.6, 5.2], [13.4, 6.2], [13.9, 9.6], [14.4, 10.6], [14.9, 11.6], [14.9, 15.0], [8.2, 15.0], [7.2, 11.4], [6.5, 11.4], [4.6, 10.2], [2.4, 10.0]],
    entrance: [3.6, 15.8],
    stairs: [1.7, 10.0],
  },
  {
    id: 2,
    name: "Floor 2",
    nameAr: "الطابق الثاني",
    zones: [
      { id: "service-2a", kind: "service", label: "WC", labelAr: "دورات المياه", polygon: SERVICE_TOP },
      { id: "service-2b", kind: "service", label: "Service / Storage", labelAr: "خدمات", polygon: SERVICE_MID },
      { id: "stairs-2", kind: "stairs", label: "Stairs down", labelAr: "درج", polygon: STAIRS },
      { id: "story-hub", kind: "hub", label: "Story Hub", labelAr: "مساحة الحكايات", polygon: CORNER },
      { id: "hall-2", kind: "hall", label: "Central hall", labelAr: "البهو", polygon: HALL, labelAt: [9.4, 8.2] },
      { id: "greek-roman", kind: "room", label: "Greek, Roman & Nabataean", labelAr: "اليوناني والروماني والنبطي", polygon: NORTH_ROOM },
      { id: "byzantine", kind: "room", label: "Byzantine", labelAr: "العصر البيزنطي", polygon: EAST_ROOM, labelAt: [13.7, 2.4] },
      { id: "islamic-ottoman", kind: "room", label: "Islamic to Ottoman", labelAr: "الإسلامي حتى العثماني", polygon: SOUTH_ROOM },
    ],
    doors: [...DOORS, [[3.6, 12.2], [5.6, 12.2]]],
    route: [[2.4, 10.0], [4.6, 9.0], [7.5, 7.4], [7.5, 5.1], [10.6, 5.1], [11.6, 5.2], [13.4, 6.2], [13.9, 9.6], [14.4, 10.6], [14.9, 11.6], [14.9, 15.0], [8.2, 15.0], [7.2, 11.4], [6.5, 11.4], [5.4, 11.8], [4.6, 13.4]],
    stairs: [1.7, 10.0],
  },
];

export function polygonArea(points: Point[]): number {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}

export function polygonCentroid(points: Point[]): Point {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    const f = x1 * y2 - x2 * y1;
    a += f;
    cx += (x1 + x2) * f;
    cy += (y1 + y2) * f;
  }
  a /= 2;
  return [cx / (6 * a), cy / (6 * a)];
}

/* ------------------------------------------------------------------ */
/* Rooms                                                               */
/* ------------------------------------------------------------------ */

export type HotspotKind = "object" | "experience" | "note";

export type Hotspot = {
  id: string;
  /** Position on the render, as a percentage of its width and height. */
  x: number;
  y: number;
  kind: HotspotKind;
  title: string;
  titleAr: string;
  body: string;
};

export type Room = {
  id: string;
  number: number;
  floor: 1 | 2;
  title: string;
  titleAr: string;
  period: string;
  periodAr: string;
  /** What the render itself says, shown when it differs from `period`. */
  renderPeriod?: string;
  summary: string;
  summaryAr: string;
  image: StaticImageData;
  imageAlt: string;
  accent: string;
  hotspots: Hotspot[];
};

export const ROOMS: Room[] = [
  {
    id: "stone-age",
    number: 1,
    floor: 1,
    title: "Stone Age",
    titleAr: "العصر الحجري",
    period: "Earliest tools – c. 4,500 BC",
    periodAr: "من أقدم الأدوات حتى نحو ٤٥٠٠ ق.م",
    renderPeriod: "~2.6 million – 10,000 BC",
    summary:
      "The first people in Jordan: hunters at the Azraq wetlands, then the first farming villages. The room ends where Amman's own story begins, with the statues of 'Ain Ghazal.",
    summaryAr: "أوائل البشر في الأردن، من صيادي واحة الأزرق إلى أولى القرى الزراعية، وصولاً إلى تماثيل عين غزال.",
    image: stoneAge,
    imageAlt: "Concept render of the Stone Age room with the 'Ain Ghazal statues on a central stone plinth under a cave-art ceiling dome",
    accent: "#d79b55",
    hotspots: [
      {
        id: "ain-ghazal",
        x: 51,
        y: 48,
        kind: "object",
        title: "The 'Ain Ghazal statues",
        titleAr: "تماثيل عين غزال",
        body: "Lime-plaster figures made around 9,000 years ago in what is now east Amman, among the oldest large human statues ever found. They are the emotional centre of the room, lit from below on a raw-stone plinth.",
      },
      {
        id: "dome",
        x: 52,
        y: 10,
        kind: "experience",
        title: "Rock-art ceiling dome",
        titleAr: "قبة الفن الصخري",
        body: "A suspended dome carrying projected rock-art figures. It hangs from a freestanding frame, so nothing is fixed into the 1951 ceiling.",
      },
      {
        id: "tools",
        x: 84,
        y: 52,
        kind: "object",
        title: "Spear points and flint tools",
        titleAr: "رؤوس الرماح والأدوات الصوانية",
        body: "Flint tools in low cases at child height, so families can compare how tools changed over hundreds of thousands of years.",
      },
      {
        id: "hologram-hunter",
        x: 26,
        y: 38,
        kind: "experience",
        title: "Life-size hunter display",
        titleAr: "عرض صياد بالحجم الطبيعي",
        body: "A tall screen showing a life-size reconstruction of a Stone Age hunter, so visitors meet a person, not only objects.",
      },
      {
        id: "note-mammoth",
        x: 88,
        y: 30,
        kind: "note",
        title: "Design note: replace the mammoth",
        titleAr: "ملاحظة تصميم",
        body: "Mammoths are not part of Jordan's record. Show the Azraq wetlands instead, with wild cattle, gazelle and the ancient elephants whose bones were found there. The render's dates also end at 10,000 BC, but 'Ain Ghazal is c. 7000 BC, so the room's end date is corrected to c. 4,500 BC.",
      },
    ],
  },
  {
    id: "copper-bronze",
    number: 2,
    floor: 1,
    title: "Copper & Bronze Age",
    titleAr: "العصر النحاسي والبرونزي",
    period: "c. 4,500 – 1,200 BC",
    periodAr: "نحو ٤٥٠٠ – ١٢٠٠ ق.م",
    summary:
      "People learn to smelt copper, build walled towns and trade across the region. Jordan's Faynan valley was one of the great copper sources of the ancient world.",
    summaryAr: "شهدت هذه الفترة تطوراً في صناعة المعادن، وظهور أدوات جديدة، وتوسعاً في الزراعة والتجارة والاستيطان.",
    image: copperBronze,
    imageAlt: "Concept render of the Copper and Bronze Age room with a glowing floor path, pottery cases and a holographic bull",
    accent: "#c46a3a",
    hotspots: [
      {
        id: "path",
        x: 32,
        y: 76,
        kind: "experience",
        title: "Glowing route line",
        titleAr: "خط المسار المضيء",
        body: "An LED line set into a new raised floor guides visitors through the room. The floor sits on top of the original one, so it can be lifted out later.",
      },
      {
        id: "smelting",
        x: 89,
        y: 44,
        kind: "experience",
        title: "Copper smelting scene",
        titleAr: "مشهد صهر النحاس",
        body: "An animated scene of smelting at Faynan, showing how rock became metal.",
      },
      {
        id: "metal",
        x: 56,
        y: 52,
        kind: "object",
        title: "Bronze weapons and vessels",
        titleAr: "أسلحة وأوانٍ برونزية",
        body: "The central case pairs the tools of farming with the tools of power from the same period.",
      },
      {
        id: "pottery",
        x: 90,
        y: 64,
        kind: "object",
        title: "Pottery from the first towns",
        titleAr: "فخار المدن الأولى",
        body: "Early Bronze Age pottery, such as finds from Bab edh-Dhra' near the Dead Sea.",
      },
      {
        id: "note-ghassul",
        x: 58,
        y: 33,
        kind: "note",
        title: "Design note: use a Jordanian wall painting",
        titleAr: "ملاحظة تصميم",
        body: "The copper wall would be stronger with a motif from the Teleilat Ghassul wall paintings in the Jordan Valley, a real local find, rather than a generic figure.",
      },
    ],
  },
  {
    id: "iron-persian",
    number: 3,
    floor: 1,
    title: "Iron Age & Persian Period",
    titleAr: "العصر الحديدي والفارسي",
    period: "c. 1,200 – 330 BC",
    periodAr: "نحو ١٢٠٠ – ٣٣٠ ق.م",
    summary:
      "The kingdoms of Ammon, Moab and Edom. Ammon's capital, Rabbath Ammon, stood on this very hill, the Citadel outside these walls.",
    summaryAr: "شهدت هذه الفترة ظهور الممالك الحديدية مثل عمّون ومؤاب وأدوم، وكانت ربة عمّون عاصمة العمّونيين على هذا الجبل.",
    image: ironPersian,
    imageAlt: "Concept render of the Iron Age and Persian room with a large stone relief, a Greek-key floor and a horseman hologram",
    accent: "#c9a46a",
    hotspots: [
      {
        id: "horseman",
        x: 35,
        y: 34,
        kind: "experience",
        title: "Horseman hologram",
        titleAr: "صورة ثلاثية الأبعاد لفارس",
        body: "A glass-fronted display with an animated horseman, showing how cavalry and iron weapons changed warfare.",
      },
      {
        id: "cases",
        x: 54,
        y: 60,
        kind: "object",
        title: "Iron Age pottery and weapons",
        titleAr: "فخار وأسلحة العصر الحديدي",
        body: "The central case groups everyday objects with weapons, so visitors see both daily life and conflict.",
      },
      {
        id: "robe",
        x: 89,
        y: 55,
        kind: "experience",
        title: "Costume reconstruction",
        titleAr: "إعادة بناء الأزياء",
        body: "A reconstructed garment of the period, based on depictions in reliefs and figurines.",
      },
      {
        id: "note-relief",
        x: 51,
        y: 33,
        kind: "note",
        title: "Design note: show Ammon, not Assyria",
        titleAr: "ملاحظة تصميم",
        body: "The winged bull is Assyrian (from Iraq) and the column backdrop looks like Persepolis in Iran. Replace them with the Ammonite statues and stone heads excavated here on the Citadel, so the room tells Amman's story.",
      },
    ],
  },
  {
    id: "greek-roman",
    number: 4,
    floor: 2,
    title: "Greek, Roman & Nabataean",
    titleAr: "اليوناني والروماني والنبطي",
    period: "330 BC – AD 330",
    periodAr: "٣٣٠ ق.م – ٣٣٠ م",
    renderPeriod: "330 BC – 106 AD",
    summary:
      "Amman becomes Philadelphia, one of the Decapolis cities. The Nabataeans build Petra in the south. Outside, the Temple of Hercules still stands on the Citadel.",
    summaryAr: "فترة من التبادل الثقافي والتطور العمراني والتجارة، مع التأثير اليوناني والحكم الروماني وحضارة الأنباط الفريدة.",
    image: greekRoman,
    imageAlt: "Concept render of the Greek, Roman and Nabataean room with marble columns framing a view of Petra and a Roman soldier hologram",
    accent: "#d6a58c",
    hotspots: [
      {
        id: "petra",
        x: 62,
        y: 40,
        kind: "experience",
        title: "Petra window",
        titleAr: "نافذة البتراء",
        body: "A large backlit image of the Treasury, framed by columns, so visitors look out to Petra.",
      },
      {
        id: "statue",
        x: 49,
        y: 45,
        kind: "object",
        title: "Roman statue",
        titleAr: "تمثال روماني",
        body: "Roman sculpture is shown at the centre of the room. Pair it with the fragments of the giant Hercules statue (an elbow and fingers) that visitors can see outside on the Citadel.",
      },
      {
        id: "soldier",
        x: 94,
        y: 34,
        kind: "experience",
        title: "Roman soldier hologram",
        titleAr: "صورة ثلاثية الأبعاد لجندي روماني",
        body: "A life-size soldier explains Philadelphia's place in the Roman province of Arabia.",
      },
      {
        id: "touch-table",
        x: 85,
        y: 66,
        kind: "experience",
        title: "Touch table: Philadelphia map",
        titleAr: "طاولة تفاعلية: خريطة فيلادلفيا",
        body: "A touch table where visitors move between Roman Philadelphia and modern Amman.",
      },
      {
        id: "note-arabic",
        x: 27,
        y: 30,
        kind: "note",
        title: "Design note: the render's Arabic is garbled",
        titleAr: "ملاحظة تصميم",
        body: "The Arabic text on this render's left panel is not real Arabic (an AI artefact). This site covers it with real text. Regenerate the render before printing it. The end date is also corrected from AD 106 to AD 330, so the Roman province period is no longer missing.",
      },
    ],
  },
  {
    id: "byzantine",
    number: 5,
    floor: 2,
    title: "Byzantine Period",
    titleAr: "العصر البيزنطي",
    period: "AD 330 – 636",
    periodAr: "٣٣٠ – ٦٣٦ م",
    summary:
      "Churches and mosaics spread across Jordan, from Madaba to Umm al-Rasas. A Byzantine church still stands a few metres from this museum.",
    summaryAr: "تميزت هذه الفترة بانتشار المسيحية وازدهار الفن المعماري والفسيفساء، وبناء الكنائس والأديرة في الأردن.",
    image: byzantine,
    imageAlt: "Concept render of the Byzantine room with a gold apse mosaic, a starry blue dome and a holographic church model",
    accent: "#6f8fd8",
    hotspots: [
      {
        id: "dome",
        x: 64,
        y: 8,
        kind: "experience",
        title: "Starry dome",
        titleAr: "القبة المرصعة بالنجوم",
        body: "A lightweight dome shell hung inside the room, echoing Byzantine church ceilings.",
      },
      {
        id: "church-model",
        x: 94,
        y: 62,
        kind: "experience",
        title: "Holographic church model",
        titleAr: "مجسم ثلاثي الأبعاد لكنيسة",
        body: "A rotating 3D model of the Citadel's own Byzantine church, rebuilt as it once stood.",
      },
      {
        id: "liturgical",
        x: 54,
        y: 64,
        kind: "object",
        title: "Crosses, lamps and vessels",
        titleAr: "صلبان وقناديل وأوانٍ",
        body: "Metalwork from churches across Jordan.",
      },
      {
        id: "plan-table",
        x: 92,
        y: 77,
        kind: "experience",
        title: "Interactive church plan",
        titleAr: "مخطط تفاعلي للكنيسة",
        body: "A screen showing the plan of a Jordanian church that visitors can explore room by room.",
      },
      {
        id: "note-madaba",
        x: 66,
        y: 36,
        kind: "note",
        title: "Design note: use Jordan's mosaics",
        titleAr: "ملاحظة تصميم",
        body: "Jordan's best-known Byzantine art is floor mosaics, such as the Madaba Map and Umm al-Rasas. A full-size Madaba Map projection on the floor would make the room unmistakably Jordanian.",
      },
    ],
  },
  {
    id: "islamic-ottoman",
    number: 6,
    floor: 2,
    title: "Islamic to Ottoman Period",
    titleAr: "العصر الإسلامي حتى العثماني",
    period: "AD 636 – 1918",
    periodAr: "٦٣٦ – ١٩١٨ م",
    summary:
      "From the Umayyad palace on this hill to Ajloun Castle and the Hejaz Railway, thirteen centuries of Islamic and Ottoman history in Jordan.",
    summaryAr: "تميزت هذه الفترة بتطور الفن والعمارة، وازدهار العلوم والصناعات، مع تأثيرات عربية وإسلامية وعثمانية واضحة في المنطقة.",
    image: islamicOttoman,
    imageAlt: "Concept render of the Islamic to Ottoman room with carved mashrabiya arches, hanging lanterns and brass objects",
    accent: "#c9a24a",
    hotspots: [
      {
        id: "arch",
        x: 60,
        y: 46,
        kind: "experience",
        title: "Window arch",
        titleAr: "القوس",
        body: "A carved screen frames a city view. Suggestion: show the Umayyad Palace on the Citadel at sunset instead of a generic skyline.",
      },
      {
        id: "lanterns",
        x: 82,
        y: 14,
        kind: "experience",
        title: "Hanging lanterns",
        titleAr: "الفوانيس المعلقة",
        body: "Warm lantern light, hung from the new ceiling frame.",
      },
      {
        id: "swords",
        x: 80,
        y: 56,
        kind: "object",
        title: "Mamluk swords and shields",
        titleAr: "سيوف ودروع مملوكية",
        body: "Already part of this museum's Islamic collection.",
      },
      {
        id: "manuscript",
        x: 61,
        y: 72,
        kind: "object",
        title: "Brass and manuscripts",
        titleAr: "النحاسيات والمخطوطات",
        body: "Brass vessels and a manuscript display. Real manuscripts need low light, so this case uses dimmed, timed lighting.",
      },
      {
        id: "mafjar",
        x: 39,
        y: 54,
        kind: "object",
        title: "Umayyad carved plaster",
        titleAr: "زخارف جصية أموية",
        body: "Carved plaster from Khirbat al-Mafjar, already in this museum's collection, connects the room's style to real Umayyad work.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Walkthrough stops (used by the mini-map)                            */
/* ------------------------------------------------------------------ */

export type StopId = "landing" | "entrance" | "stairs" | "pitch" | (typeof ROOMS)[number]["id"];

export type Stop = {
  id: StopId;
  floor: 1 | 2 | null;
  label: string;
  /** Where the "you are here" dot sits on the plan. */
  at?: Point;
};

export function roomCentre(roomId: string): Point {
  for (const floor of FLOORS) {
    const zone = floor.zones.find((z) => z.id === roomId);
    if (zone) return zone.labelAt ?? polygonCentroid(zone.polygon);
  }
  return [FLOOR_SIZE / 2, FLOOR_SIZE / 2];
}

export const STOPS: Stop[] = [
  { id: "landing", floor: null, label: "Overview" },
  { id: "entrance", floor: 1, label: "Entrance", at: [3.6, 14.2] },
  ...ROOMS.slice(0, 3).map((r) => ({ id: r.id, floor: r.floor, label: r.title, at: roomCentre(r.id) })),
  { id: "stairs", floor: 2, label: "Stairs", at: [1.7, 10.0] },
  ...ROOMS.slice(3).map((r) => ({ id: r.id, floor: r.floor, label: r.title, at: roomCentre(r.id) })),
  { id: "pitch", floor: null, label: "The pitch" },
];
