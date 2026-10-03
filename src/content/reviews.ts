import type { StopId } from "@/content/museum";

/**
 * Real visitor reviews of the Jordan Archaeological Museum, quoted word for
 * word (spelling included) from Tripadvisor, checked on 3 October 2026.
 * Each one is paired with the part of the prototype that answers it.
 * Never paraphrase a quote or add one that can't be linked to its source.
 */

export const REVIEW_SOURCE = {
  name: "Tripadvisor",
  url: "https://www.tripadvisor.com/Attraction_Review-g293986-d319449-Reviews-Jordan_Archaeological_Museum-Amman_Amman_Governorate.html",
  rating: "3.9 / 5",
  count: "361 reviews",
};

export type Review = {
  id: string;
  quote: string;
  reviewer: string;
  rating: number;
  date: string;
  problem: string;
  answer: string;
  answerAr: string;
  link: { label: string; stop: StopId };
};

/** The one positive line we lead with: the objects themselves were never the problem. */
export const PRAISE = {
  quote: "Small, and set out in old-fashioned cases, the items on display here are stunning.",
  reviewer: "Flipperty Gibbert",
  rating: 5,
  date: "May 2024",
};

export const REVIEWS: Review[] = [
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
    link: { label: "Step into the Stone Age", stop: "stone-age" },
  },
  {
    id: "reading",
    quote: "Lots of reading and sadly we were pretty rushed and didn't give it our full attention.",
    reviewer: "Skeney57",
    rating: 4,
    date: "Sep 2025",
    problem: "Too much reading, hard to follow",
    answer:
      "Less reading, more seeing: one marked route through all six rooms, short captions, and screens and holograms that tell the story for you.",
    answerAr: "قراءة أقل ومشاهدة أكثر: مسار واحد واضح عبر القاعات الست، ونصوص قصيرة، وشاشات تروي الحكاية.",
    link: { label: "Follow the route", stop: "entrance" },
  },
  {
    id: "ten-minutes",
    quote: "Finished my visit here in 10 minutes. Note that explantions of the exhibits are in English.",
    reviewer: "LolaGo1",
    rating: 3,
    date: "Oct 2023",
    problem: "Nothing to stay for, English-only labels",
    answer:
      "Reasons to stay: music for each era, touch screens to explore, a Story Hub for events, and every text in Arabic as well as English.",
    answerAr: "أسباب للبقاء: موسيقى لكل حقبة، وشاشات تفاعلية، ومساحة للحكايات والفعاليات، وكل النصوص بالعربية والإنجليزية.",
    link: { label: "See the Byzantine room", stop: "byzantine" },
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
];
