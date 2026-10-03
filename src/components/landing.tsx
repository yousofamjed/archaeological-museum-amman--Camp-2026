"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Landmark, Target } from "lucide-react";

import giftShop from "@/assets/rooms/gift-shop.jpg";
import { FloorPlan } from "@/components/floor-plan";
import { unlockRoomMusic } from "@/components/room-music";
import { useWalkthrough } from "@/components/walkthrough-provider";
import { FLOORS, FLOOR_SIZE, ROOMS } from "@/content/museum";

export function LandingIntro() {
  return (
    <section data-stop="intro" className="relative px-4 pt-24 pb-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <p className="mb-3 text-xs tracking-[0.3em] text-gold uppercase">LOYAC Innovation Camp 2026 · Old Amman, New Perspective</p>
          <h1 className="font-display text-4xl leading-tight text-sand md:text-5xl">
            Nine thousand years, <span className="text-gold italic">six rooms</span>
          </h1>
          <p className="mt-1 font-ar text-xl text-sand/80 md:text-2xl" lang="ar" dir="rtl">
            تسعة آلاف عام في ست قاعات
          </p>
        </motion.div>

        <div className="mx-auto mb-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <header className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full border border-gold/40 text-gold">
                    <card.icon className="size-4" />
                  </span>
                  <h2 className="font-display text-2xl text-sand">{card.title}</h2>
                </div>
                <span className="font-ar text-lg text-sand/60" lang="ar" dir="rtl">
                  {card.titleAr}
                </span>
              </header>
              <p className="text-sm leading-relaxed text-sand/80">{card.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Landing() {
  const { goTo, setSoundOn } = useWalkthrough();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const room = ROOMS.find((r) => r.id === hoverId);
  const hovered = room
    ? { id: room.id, image: room.image, title: `${room.number}. ${room.title}`, detail: room.period }
    : hoverId === "gift-shop"
      ? { id: "gift-shop", image: giftShop, title: "Gift shop", detail: "Floor 1, beside reception" }
      : null;

  return (
    <section data-stop="landing" className="relative px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">The new museum</p>
          <h2 className="mt-2 font-display text-4xl text-sand md:text-5xl">Two floors, six eras</h2>
          <p className="mt-1 font-ar text-xl text-sand/75" lang="ar" dir="rtl">
            طابقان وست حقب
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {FLOORS.map((floor, i) => (
            <motion.figure
              key={floor.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
            >
              <figcaption className="mb-3 flex items-baseline justify-between">
                <span className="font-display text-2xl text-sand">{floor.name}</span>
                <span className="text-xs text-sand/60">
                  ≈ 250 m² · {FLOOR_SIZE} × {FLOOR_SIZE} m
                </span>
                <span className="font-ar text-lg text-sand/70">{floor.nameAr}</span>
              </figcaption>
              <FloorPlan
                floor={floor}
                hoverId={hoverId}
                onHover={setHoverId}
                onSelect={(id) => goTo(id)}
                routeProgress={1}
              />
            </motion.figure>
          ))}
        </div>

        <div className="mt-6 flex min-h-24 flex-col items-center gap-6 md:flex-row md:justify-between">
          <Legend />
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-2 pr-4"
              >
                <Image src={hovered.image} alt="" width={96} height={80} className="h-16 w-20 rounded-lg object-cover" />
                <div>
                  <p className="text-sm text-sand">{hovered.title}</p>
                  <p className="text-xs text-sand/60">{hovered.detail}</p>
                </div>
              </motion.div>
            ) : (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-sand/50">
                Hover over a room or the gift shop to preview it, or click to go there.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              // Starting the walk is a click, so it can also switch the room music on.
              unlockRoomMusic();
              setSoundOn(true);
              goTo("arrival");
            }}
            className="group flex flex-col items-center gap-2 text-sm text-sand/80 hover:text-sand"
          >
            Begin the walk from the Citadel, with sound
            <ArrowDown className="size-5 animate-bounce text-gold" />
          </button>
        </div>
      </div>
    </section>
  );
}

const CARDS = [
  {
    icon: Landmark,
    title: "The place",
    titleAr: "مميزات المكان",
    body: "The museum occupies a beautiful heritage setting with panoramic views of Amman, archaeological landmarks, and nearby downtown restaurants and cafés. The announced Amman teleferic project, proposed walking connections between the Citadel, downtown and the Roman Theatre, and planned improvements to surrounding streets and heritage spaces could strengthen the area’s attraction and create opportunities for more people to discover the museum.",
  },
  {
    icon: Target,
    title: "The challenge",
    titleAr: "التحدي",
    body: "Our challenge is to address the limited exposure and appeal of the Jordan Archaeological Museum at Amman Citadel among young people in Jordan aged 18–25, particularly university students and those with little interest in history. The museum can be overlooked, while an experience that feels passive or difficult to follow makes it harder for young visitors to connect with its objects and stories.",
  },
];

function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-sand/60">
      <li className="flex items-center gap-2">
        <svg width="28" height="6" aria-hidden>
          <line x1="0" y1="3" x2="28" y2="3" stroke="#c0392b" strokeWidth="2" strokeDasharray="5 3" />
        </svg>
        Visitor route
      </li>
      <li className="flex items-center gap-2">
        <span className="size-3 rounded-sm bg-[#5b4630]" /> Exhibition rooms
      </li>
      <li className="flex items-center gap-2">
        <span className="size-3 rounded-sm bg-[#3a3026]" /> Circulation
      </li>
      <li className="flex items-center gap-2">
        <span className="size-3 rounded-sm bg-[#1d1a17] ring-1 ring-white/20" /> Service and stairs (no lift)
      </li>
      <li className="flex items-center gap-2">
        <span className="size-3 rounded-sm bg-[#6b5636]" /> Gift shop
      </li>
    </ul>
  );
}
