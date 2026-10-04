import type { StopId } from "@/content/museum";

/**
 * Real visitor reviews of the Jordan Archaeological Museum, quoted word for
 * word (spelling and grammar included) from Tripadvisor, checked on
 * 3 October 2026. Each one is paired with the part of the prototype that
 * answers it. Never paraphrase a quote or add one that can't be linked to
 * its source. `rating` is left out where the source pages disagree on it.
 */

export const REVIEW_SOURCE = {
  name: "Tripadvisor",
  url: "https://www.tripadvisor.com/Attraction_Review-g293986-d319449-Reviews-Jordan_Archaeological_Museum-Amman_Amman_Governorate.html",
  rating: "3.9 / 5",
  count: "366 reviews",
};

export type Review = {
  id: string;
  quote: string;
  reviewer: string;
  rating?: number;
  date: string;
  problem: string;
  answer: string;
  answerAr: string;
  link: { label: string; stop: StopId };
};

/** The headline complaint the section opens with. */
export const HEADLINE = {
  quote:
    "One of the valuable face masks in a showcase fell down from its support and appeared to be broken. Too bad! This museum needs more attention.",
  reviewer: "HGhanem",
  date: "Jan 2020",
};

export const REVIEWS: Review[] = [
  {
    id: "not-well-kept",
    quote:
      "It in an old museum with valuable archeological pieces that are unfortunately not well kept! Many of the pieces lack descriptions. The description in English is badly translated with many typos.",
    reviewer: "HGhanem",
    date: "Jan 2020",
    problem: "Neglected objects, missing and badly translated labels",
    answer:
      "Every object gets a new case and a caption written properly in Arabic and English, checked by the Department of Antiquities. A QR code beside it opens the full story in any language with an audio version, and a braille label sits on the case.",
    answerAr: "كل قطعة تحصل على خزانة عرض جديدة ونص مكتوب بعناية بالعربية والإنجليزية تراجعه دائرة الآثار، ورمز QR بجانبها يفتح الحكاية كاملة بأي لغة مع نسخة صوتية، وبطاقة بلغة برايل على الخزانة.",
    link: { label: "Step into the Stone Age", stop: "stone-age" },
  },
  {
    id: "old-fashioned",
    quote:
      "the way they are displayed is so old-fashioned; mainly in glass cases. It's a shame because there is a wealth of history in a small place.",
    reviewer: "Geoff H",
    rating: 3,
    date: "Oct 2024",
    problem: "Old-fashioned display",
    answer:
      "Each era becomes its own room, with its own light, sound and atmosphere, and screens and life-size holograms built around the real objects.",
    answerAr: "كل حقبة تصبح قاعة خاصة بها، بإضاءتها وصوتها وأجوائها، مع شاشات وصور ثلاثية الأبعاد حول القطع الأصلية.",
    link: { label: "See the Iron Age room", stop: "iron-persian" },
  },
  {
    id: "few-things",
    quote:
      "Small rather old museum with few things since, since 2018, much of the collection has been transferred to the new Jordan Museum.",
    reviewer: "G.C.",
    rating: 3,
    date: "May 2023",
    problem: "Feels small and emptied out",
    answer:
      "Two floors and six rooms instead of three halls, so the collection that remains has space, a sequence and a story, ending in a gift shop on the way out.",
    answerAr: "طابقان وست قاعات بدل ثلاث، فتجد القطع مساحة وتسلسلاً وحكاية، وينتهي المسار بمتجر عند الخروج.",
    link: { label: "See the floor plans", stop: "landing" },
  },
  {
    id: "ten-minutes",
    quote: "Finished my visit here in 10 minutes. Note that explantions of the exhibits are in English.",
    reviewer: "LolaGo1",
    rating: 3,
    date: "Oct 2023",
    problem: "Nothing to stay for, English-only labels",
    answer:
      "Reasons to stay: music for each era, touch screens to explore and a Story Hub for events. Labels are no longer English-only: every object has Arabic and English text, a QR code for any language with audio, and braille.",
    answerAr: "أسباب للبقاء: موسيقى لكل حقبة، وشاشات تفاعلية، ومساحة للحكايات والفعاليات. ولم تعد النصوص بالإنجليزية فقط: لكل قطعة نص بالعربية والإنجليزية، ورمز QR لأي لغة مع الصوت، وبطاقة برايل.",
    link: { label: "See the Byzantine room", stop: "byzantine" },
  },
];
