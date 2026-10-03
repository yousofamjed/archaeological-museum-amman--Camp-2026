import type { StaticImageData } from "next/image";

import stoneAge from "@/assets/rooms/stone-age.jpg";
import copperBronze from "@/assets/rooms/copper-bronze.jpg";
import ironPersian from "@/assets/rooms/iron-persian.jpg";
import greekRoman from "@/assets/rooms/greek-roman.jpg";
import byzantine from "@/assets/rooms/byzantine.jpg";
import islamicOttoman from "@/assets/rooms/islamic-to-ottoman.jpg";

import ainGhazalCase from "@/assets/before/ain-ghazal-case-2010.jpg";
import gallery2010a from "@/assets/before/gallery-2010-a.jpg";
import gallery2010b from "@/assets/before/gallery-2010-b.jpg";
import gallery2010c from "@/assets/before/gallery-2010-c.jpg";
import gallery2010d from "@/assets/before/gallery-2010-d.jpg";
import gallery2009 from "@/assets/before/gallery-2009.jpg";

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* All coordinates are in metres. Origin is the north-west corner of   */
/* the building, x grows east, y grows south. Each floor is            */
/* 15.8 m x 15.8 m = 249.64 m², matching the team's concept board.     */
/* ------------------------------------------------------------------ */

export const FLOOR_SIZE = 15.8;

export type Point = [number, number];

export type ZoneKind = "room" | "hall" | "service" | "reception" | "hub" | "shop" | "stairs";

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
  /** 1 is the entrance level (up the front steps); 0 is the ground floor below. */
  id: 0 | 1;
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
const SERVICE_TOP: Point[] = [[0, 0], [3.4, 0], [3.4, 4.4], [0, 4.4]];
const SERVICE_MID: Point[] = [[0, 4.4], [3.4, 4.4], [3.4, 6.6], [0, 6.6]];
const STAIRS: Point[] = [[0, 6.6], [3.4, 6.6], [3.4, 11], [0, 11]];
// Floor 1 south-west corner: gift shop beside reception (no lift).
const GIFT_SHOP: Point[] = [[0, 11], [3.4, 11], [3.4, 15.8], [0, 15.8]];
const RECEPTION: Point[] = [[3.4, 12.2], [6.5, 12.2], [6.5, 15.8], [3.4, 15.8]];
// Floor 0 south-west corner: the whole corner is the Story Hub.
const HUB: Point[] = [[0, 11], [3.4, 11], [3.4, 12.2], [6.5, 12.2], [6.5, 15.8], [0, 15.8]];

const DOORS: [Point, Point][] = [
  [[6.6, 6], [8.4, 6]], // hall -> north room
  [[11.6, 4.6], [11.6, 5.8]], // north room -> east room
  [[13.6, 10.6], [15.2, 10.6]], // east room -> south room
  [[6.5, 10.8], [6.5, 12.0]], // south room -> hall
  [[3.4, 7.6], [3.4, 9.6]], // hall -> stairs
];

export const FLOORS: Floor[] = [
  {
    id: 1,
    name: "Floor 1",
    nameAr: "الطابق الأول",
    zones: [
      { id: "service-1a", kind: "service", label: "WC · Accessible WC", labelAr: "دورات المياه", polygon: SERVICE_TOP },
      { id: "service-1b", kind: "service", label: "Service / Storage", labelAr: "خدمات", polygon: SERVICE_MID },
      { id: "stairs-1", kind: "stairs", label: "Stairs down", labelAr: "درج", polygon: STAIRS },
      { id: "gift-shop", kind: "shop", label: "Gift shop", labelAr: "المتجر", polygon: GIFT_SHOP, labelAt: [1.7, 13.0] },
      { id: "reception", kind: "reception", label: "Reception", labelAr: "الاستقبال", polygon: RECEPTION, labelAt: [5.2, 12.8] },
      { id: "hall-1", kind: "hall", label: "Central hall", labelAr: "البهو", polygon: HALL, labelAt: [9.4, 8.2] },
      { id: "stone-age", kind: "room", label: "Stone Age", labelAr: "العصر الحجري", polygon: NORTH_ROOM },
      { id: "copper-bronze", kind: "room", label: "Copper &\nBronze Age", labelAr: "العصر النحاسي\nوالبرونزي", polygon: EAST_ROOM, labelAt: [13.7, 2.4] },
      { id: "iron-persian", kind: "room", label: "Iron Age & Persian", labelAr: "العصر الحديدي والفارسي", polygon: SOUTH_ROOM },
    ],
    doors: [
      ...DOORS,
      [[4.0, 15.8], [6.0, 15.8]], // main entrance
      [[3.4, 12.8], [3.4, 14.4]], // reception -> gift shop
    ],
    route: [[5.0, 16.6], [5.0, 13.6], [5.6, 11.0], [7.5, 7.4], [7.5, 5.1], [10.6, 5.1], [11.6, 5.2], [13.4, 6.2], [13.9, 9.6], [14.4, 10.6], [14.9, 11.6], [14.9, 15.0], [8.2, 15.0], [7.2, 11.4], [6.5, 11.4], [4.6, 9.4], [2.4, 8.8]],
    entrance: [5.0, 15.8],
    stairs: [1.7, 8.8],
  },
  {
    id: 0,
    name: "Floor 0",
    nameAr: "الطابق الأرضي",
    zones: [
      { id: "service-0a", kind: "service", label: "WC", labelAr: "دورات المياه", polygon: SERVICE_TOP },
      { id: "service-0b", kind: "service", label: "Service / Storage", labelAr: "خدمات", polygon: SERVICE_MID },
      { id: "stairs-0", kind: "stairs", label: "Stairs up", labelAr: "درج", polygon: STAIRS },
      { id: "story-hub", kind: "hub", label: "Story Hub", labelAr: "مساحة الحكايات", polygon: HUB, labelAt: [3.0, 14.0] },
      { id: "hall-0", kind: "hall", label: "Central hall", labelAr: "البهو", polygon: HALL, labelAt: [9.4, 8.2] },
      { id: "greek-roman", kind: "room", label: "Greek, Roman & Nabataean", labelAr: "اليوناني والروماني والنبطي", polygon: NORTH_ROOM },
      { id: "byzantine", kind: "room", label: "Byzantine", labelAr: "العصر البيزنطي", polygon: EAST_ROOM, labelAt: [13.7, 2.4] },
      { id: "islamic-ottoman", kind: "room", label: "Islamic to Ottoman", labelAr: "الإسلامي حتى العثماني", polygon: SOUTH_ROOM },
    ],
    doors: [
      ...DOORS,
      [[3.6, 12.2], [5.6, 12.2]], // hall -> story hub
      [[0.4, 11], [3.0, 11]], // stair landing -> story hub
    ],
    route: [[2.4, 8.8], [4.6, 8.4], [7.5, 7.4], [7.5, 5.1], [10.6, 5.1], [11.6, 5.2], [13.4, 6.2], [13.9, 9.6], [14.4, 10.6], [14.9, 11.6], [14.9, 15.0], [8.2, 15.0], [7.2, 11.4], [6.5, 11.4], [5.4, 11.8], [3.6, 13.2]],
    stairs: [1.7, 8.8],
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
/* Photo credits                                                       */
/* "Before" photos come from Wikimedia Commons. CC BY-SA requires the  */
/* author, licence and source to be credited wherever they are shown.  */
/* ------------------------------------------------------------------ */

export type Credit = {
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";

export const CREDITS = {
  housen: (file: string): Credit => ({
    author: "Jean Housen",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl: `https://commons.wikimedia.org/wiki/File:${file}`,
  }),
  case: {
    author: "Daniel Case",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Interior_of_Jordan_Archeological_Museum.jpg",
  },
  exterior2025: {
    author: "ほっきー",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jordan_Archaeological_Museum_2025.jpg",
  },
} satisfies Record<string, Credit | ((file: string) => Credit)>;

/* ------------------------------------------------------------------ */
/* Rooms                                                               */
/* ------------------------------------------------------------------ */

export type HotspotKind = "screen" | "hologram" | "note";

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

export type BeforePhoto = {
  image: StaticImageData;
  alt: string;
  caption: string;
  credit: Credit;
};

export type Room = {
  id: string;
  number: number;
  floor: 0 | 1;
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
  before: BeforePhoto;
  /** Background music for the room, served from /public. */
  music?: string;
  accent: string;
  hotspots: Hotspot[];
};

// The current halls all look alike and can't be matched to the new
// rooms one-to-one, so rooms 2–6 open on a general view of the galleries.
const galleryBefore = (image: StaticImageData, year: number, credit: Credit): BeforePhoto => ({
  image,
  alt: `The museum's galleries in ${year}: wood-and-glass cases under fluorescent light`,
  caption: `The galleries in ${year}`,
  credit,
});

export const ROOMS: Room[] = [
  {
    id: "stone-age",
    music: "/music/stone-age.mp3",
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
    before: {
      image: ainGhazalCase,
      alt: "The 'Ain Ghazal statues in a wood-and-glass case at the museum in 2010",
      caption: "The 'Ain Ghazal statues in 2010",
      credit: CREDITS.housen("20100923_amman41.JPG"),
    },
    accent: "#d79b55",
    hotspots: [
      {
        id: "hunter",
        x: 26,
        y: 38,
        kind: "hologram",
        title: "Life-size hunter hologram",
        titleAr: "صياد بالحجم الطبيعي",
        body: "A life-size Stone Age hunter in a glass-fronted display, so visitors meet a person before they meet the objects.",
      },
      {
        id: "panorama",
        x: 88,
        y: 30,
        kind: "screen",
        title: "Panoramic screen: the Azraq wetlands",
        titleAr: "شاشة بانورامية: واحة الأزرق",
        body: "A wall-sized screen showing the Ice Age wetlands at Azraq: wild cattle, gazelle, and the ancient elephants whose bones were found there.",
      },
      {
        id: "touch",
        x: 73,
        y: 51,
        kind: "screen",
        title: "Touch screen: how tools changed",
        titleAr: "شاشة تفاعلية: تطور الأدوات",
        body: "Visitors slide through hundreds of thousands of years, from hand axes to the first farming tools.",
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
    before: galleryBefore(gallery2010a, 2010, CREDITS.housen("20100923_amman30.JPG")),
    accent: "#c46a3a",
    hotspots: [
      {
        id: "bull",
        x: 31,
        y: 39,
        kind: "hologram",
        title: "Bull hologram over a Bronze Age town",
        titleAr: "صورة ثلاثية الأبعاد لثور",
        body: "A glowing outline of cattle over a walled town, showing how herding and farming built the first towns.",
      },
      {
        id: "smelting",
        x: 89,
        y: 44,
        kind: "hologram",
        title: "Copper smelting hologram",
        titleAr: "صهر النحاس",
        body: "A metalworker pours molten copper, the way it was done at Faynan, so visitors see how rock became metal.",
      },
      {
        id: "landscape",
        x: 90,
        y: 22,
        kind: "screen",
        title: "Screen: life by the river",
        titleAr: "شاشة: الحياة قرب النهر",
        body: "A wall screen showing a farming settlement in the Jordan Valley.",
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
    music: "/music/iron-persian.mp3",
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
    before: galleryBefore(gallery2010b, 2010, CREDITS.housen("20100923_amman42.JPG")),
    accent: "#c9a46a",
    hotspots: [
      {
        id: "horseman",
        x: 35,
        y: 34,
        kind: "hologram",
        title: "Horseman hologram",
        titleAr: "فارس ثلاثي الأبعاد",
        body: "An animated horseman shows how cavalry and iron weapons changed warfare.",
      },
      {
        id: "soldiers",
        x: 95,
        y: 29,
        kind: "hologram",
        title: "Soldiers hologram",
        titleAr: "جنود ثلاثيو الأبعاد",
        body: "A line of Iron Age soldiers, in the same glowing style as the horseman.",
      },
      {
        id: "landscape",
        x: 68,
        y: 35,
        kind: "screen",
        title: "Screen: Rabbath Ammon",
        titleAr: "شاشة: ربة عمّون",
        body: "A tall screen beside the relief. It should show Rabbath Ammon on this hill; the render's columns look like Persepolis in Iran.",
      },
      {
        id: "note-relief",
        x: 51,
        y: 33,
        kind: "note",
        title: "Design note: show Ammon, not Assyria",
        titleAr: "ملاحظة تصميم",
        body: "The winged bull is Assyrian (from Iraq). Replace it with the Ammonite statues and stone heads excavated here on the Citadel, so the room tells Amman's story.",
      },
    ],
  },
  {
    id: "greek-roman",
    music: "/music/greek-roman.mp3",
    number: 4,
    floor: 0,
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
    before: galleryBefore(gallery2010c, 2010, CREDITS.housen("20100923_amman43.JPG")),
    accent: "#d6a58c",
    hotspots: [
      {
        id: "petra",
        x: 66,
        y: 36,
        kind: "screen",
        title: "Petra window",
        titleAr: "نافذة البتراء",
        body: "A wall-sized screen of the Treasury at Petra, framed like a window, so visitors look out from Philadelphia to the Nabataean south.",
      },
      {
        id: "soldier",
        x: 95,
        y: 31,
        kind: "hologram",
        title: "Roman soldier hologram",
        titleAr: "جندي روماني",
        body: "A life-size soldier explains Philadelphia's place in the Roman province of Arabia.",
      },
      {
        id: "touch-table",
        x: 85,
        y: 66,
        kind: "screen",
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
    music: "/music/byzantine.mp3",
    number: 5,
    floor: 0,
    title: "Byzantine Period",
    titleAr: "العصر البيزنطي",
    period: "AD 330 – 636",
    periodAr: "٣٣٠ – ٦٣٦ م",
    summary:
      "Churches and mosaics spread across Jordan, from Madaba to Umm al-Rasas. A Byzantine church still stands a few metres from this museum.",
    summaryAr: "تميزت هذه الفترة بانتشار المسيحية وازدهار الفن المعماري والفسيفساء، وبناء الكنائس والأديرة في الأردن.",
    image: byzantine,
    imageAlt: "Concept render of the Byzantine room with a gold apse mosaic, a starry blue dome and a holographic church model",
    before: galleryBefore(gallery2010d, 2010, CREDITS.housen("20100923_amman31.JPG")),
    accent: "#6f8fd8",
    hotspots: [
      {
        id: "church-model",
        x: 95,
        y: 58,
        kind: "hologram",
        title: "Holographic church model",
        titleAr: "مجسم ثلاثي الأبعاد لكنيسة",
        body: "A rotating 3D model of the Citadel's own Byzantine church, rebuilt as it once stood.",
      },
      {
        id: "plan-table",
        x: 92,
        y: 74,
        kind: "screen",
        title: "Interactive church plan",
        titleAr: "مخطط تفاعلي للكنيسة",
        body: "A touch screen showing the plan of a Jordanian church that visitors can explore room by room.",
      },
      {
        id: "churches",
        x: 95,
        y: 38,
        kind: "screen",
        title: "Screen: churches of Jordan",
        titleAr: "شاشة: كنائس الأردن",
        body: "A rotating screen of Byzantine churches across Jordan, from Madaba to Umm al-Rasas.",
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
    music: "/music/islamic-ottoman.mp3",
    number: 6,
    floor: 0,
    title: "Islamic to Ottoman Period",
    titleAr: "العصر الإسلامي حتى العثماني",
    period: "AD 636 – 1918",
    periodAr: "٦٣٦ – ١٩١٨ م",
    summary:
      "From the Umayyad palace on this hill to Ajloun Castle and the Hejaz Railway, thirteen centuries of Islamic and Ottoman history in Jordan.",
    summaryAr: "تميزت هذه الفترة بتطور الفن والعمارة، وازدهار العلوم والصناعات، مع تأثيرات عربية وإسلامية وعثمانية واضحة في المنطقة.",
    image: islamicOttoman,
    imageAlt: "Concept render of the Islamic to Ottoman room with carved mashrabiya arches, hanging lanterns and brass objects",
    before: galleryBefore(gallery2009, 2009, CREDITS.case),
    accent: "#c9a24a",
    hotspots: [
      {
        id: "arch",
        x: 60,
        y: 46,
        kind: "screen",
        title: "Window screen",
        titleAr: "شاشة النافذة",
        body: "A screen framed by a carved arch. Suggestion: show the Umayyad Palace on the Citadel at sunset instead of a generic skyline.",
      },
      {
        id: "rider",
        x: 73,
        y: 45,
        kind: "hologram",
        title: "Horseman hologram",
        titleAr: "فارس ثلاثي الأبعاد",
        body: "A rider in the same glowing style as the earlier rooms, carrying the story from one era to the next.",
      },
      {
        id: "architecture",
        x: 92,
        y: 33,
        kind: "hologram",
        title: "Hologram: Ottoman architecture",
        titleAr: "العمارة العثمانية",
        body: "A glowing mosque outline that builds itself up, showing how domes and minarets were constructed.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Walkthrough stops (used by the mini-map)                            */
/* ------------------------------------------------------------------ */

export type StopId =
  | "intro"
  | "reviews"
  | "landing"
  | "arrival"
  | "entrance"
  | "front-steps"
  | "stairs"
  | "gift-shop"
  | (typeof ROOMS)[number]["id"];

export type Stop = {
  id: StopId;
  floor: 0 | 1 | null;
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
  { id: "intro", floor: null, label: "Introduction" },
  { id: "reviews", floor: null, label: "What visitors say" },
  { id: "landing", floor: null, label: "Floor plans" },
  { id: "arrival", floor: null, label: "Arrival" },
  { id: "front-steps", floor: 1, label: "Front steps", at: [5.0, 16.4] },
  { id: "entrance", floor: 1, label: "Entrance", at: [5.0, 14.2] },
  ...ROOMS.slice(0, 3).map((r) => ({ id: r.id, floor: r.floor, label: r.title, at: roomCentre(r.id) })),
  { id: "stairs", floor: 0, label: "Stairs down", at: [1.7, 8.8] },
  ...ROOMS.slice(3).map((r) => ({ id: r.id, floor: r.floor, label: r.title, at: roomCentre(r.id) })),
  { id: "gift-shop", floor: 1, label: "Gift shop", at: [1.7, 13.6] },
];
