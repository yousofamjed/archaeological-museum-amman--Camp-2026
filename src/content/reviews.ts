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
      "Every object gets a new case and a caption written properly in Arabic and English, checked by the Department of Antiquities, and the screens carry the longer story.",
    answerAr: "كل قطعة تحصل على خزانة عرض جديدة ونص مكتوب بعناية بالعربية والإنجليزية، تراجعه دائرة الآثار، والشاشات تروي الحكاية كاملة.",
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
    id: "scrolls",
    quote:
      "we were a little disappointed when the Dead Sea scrolls were not present. It was one of our sole reasons for going.",
    reviewer: "Samilynn J",
    rating: 3,
    date: "Dec 2022",
    problem: "Visitors come for something that isn't there",
    answer:
      "Every room has a clear star object, starting with the 'Ain Ghazal statues, so the visit is built around what is here, not what has left.",
    answerAr: "لكل قاعة قطعة رئيسية واضحة، بدءاً بتماثيل عين غزال، فتُبنى الزيارة حول ما هو موجود فعلاً.",
    link: { label: "Meet the 'Ain Ghazal statues", stop: "stone-age" },
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
      "Reasons to stay: music for each era, touch screens to explore, a Story Hub for events, and every text in Arabic as well as English.",
    answerAr: "أسباب للبقاء: موسيقى لكل حقبة، وشاشات تفاعلية، ومساحة للحكايات والفعاليات، وكل النصوص بالعربية والإنجليزية.",
    link: { label: "See the Byzantine room", stop: "byzantine" },
  },
];
