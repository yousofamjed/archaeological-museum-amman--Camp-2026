"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { FloorPlan } from "@/components/floor-plan";
import { useWalkthrough } from "@/components/walkthrough-provider";
import { FLOORS, FLOOR_SIZE, ROOMS } from "@/content/museum";

export function Landing() {
  const { goTo } = useWalkthrough();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const hovered = ROOMS.find((r) => r.id === hoverId);

  return (
    <section data-stop="landing" className="relative min-h-svh px-4 pt-24 pb-16 md:px-8">
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
          <p className="mx-auto mt-4 max-w-2xl text-sm text-sand/70 md:text-base">
            A reimagined interior for the 1951 museum on Jabal al-Qal&rsquo;a. The building stays as it is; everything inside
            becomes one walk through Jordan&rsquo;s history. Pick a room, or scroll to walk the route.
          </p>
        </motion.div>

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
                  <p className="text-sm text-sand">
                    {hovered.number}. {hovered.title}
                  </p>
                  <p className="text-xs text-sand/60">{hovered.period}</p>
                </div>
              </motion.div>
            ) : (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-sand/50">
                Hover over a room to preview it, or click to go inside.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => goTo("entrance")}
            className="group flex flex-col items-center gap-2 text-sm text-sand/80 hover:text-sand"
          >
            Begin the walk from the Citadel
            <ArrowDown className="size-5 animate-bounce text-gold" />
          </button>
        </div>
      </div>
    </section>
  );
}

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
    </ul>
  );
}
