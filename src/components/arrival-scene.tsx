"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

import exteriorToday from "@/assets/before/exterior-2025.jpg";
import exteriorProposed from "@/assets/exterior-proposed.jpg";
import { PhotoCredit } from "@/components/photo-credit";
import { ThenNowTag } from "@/components/room-section";
import { useWalkthrough } from "@/components/walkthrough-provider";
import { CREDITS } from "@/content/museum";

export function ArrivalScene() {
  const ref = useRef<HTMLElement>(null);
  const { showNotes } = useWalkthrough();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const wipe = useTransform(scrollYProgress, [0.15, 0.6], [0, 100]);
  const beforeClip = useMotionTemplate`inset(0 0 0 ${wipe}%)`;
  const edgeLeft = useMotionTemplate`${wipe}%`;
  const edgeOpacity = useTransform(scrollYProgress, [0.15, 0.18, 0.57, 0.6], [0, 1, 1, 0]);
  const todayOpacity = useTransform(scrollYProgress, [0, 0.55, 0.6], [1, 1, 0]);
  const proposedOpacity = useTransform(scrollYProgress, [0.55, 0.62], [0, 1]);

  return (
    <section ref={ref} data-stop="arrival" className="relative h-[200svh]" aria-label="Arrival from the Citadel">
      <div className="sticky top-0 h-svh overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image
            src={exteriorProposed}
            alt="Concept render of the museum entrance at dusk, with lighting, planting and a ramp beside the front steps"
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <motion.div className="absolute inset-0" style={{ clipPath: beforeClip }}>
          <Image
            src={exteriorToday}
            alt="The museum's front steps and stone facade in 2025"
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-sand shadow-[0_0_24px_4px_rgba(239,228,210,0.5)]"
          style={{ left: edgeLeft, opacity: edgeOpacity }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Arrival</p>
          <h2 className="mt-2 font-display text-4xl text-sand md:text-6xl">You come in from the Citadel</h2>
          <p className="mt-1 text-end font-ar text-2xl text-sand/80" lang="ar" dir="rtl">
            تدخل من جبل القلعة
          </p>
          <p className="mt-3 max-w-xl text-sand/75">
            The 1951 stone facade stays. Warm lighting, planting and a step-free ramp beside the steps make the entrance
            easier to find and easier to reach.
          </p>
          {showNotes && (
            <p className="mt-3 max-w-xl rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
              Design note: the render adds a rooftop pergola garden, which goes beyond the interior-only greenlight and
              would put new load on the 1951 roof. The Arabic on the render&rsquo;s sign is also partly garbled.
            </p>
          )}
        </div>

        <motion.div style={{ opacity: todayOpacity }} className="absolute top-24 right-4 md:right-8">
          <ThenNowTag label="Today" sublabel="2025" />
        </motion.div>
        <motion.div style={{ opacity: proposedOpacity }} className="absolute top-24 right-4 md:right-8">
          <ThenNowTag label="Proposed" />
        </motion.div>
        <motion.div style={{ opacity: todayOpacity }} className="absolute right-4 bottom-4 md:right-8">
          <PhotoCredit credit={CREDITS.exterior2025} />
        </motion.div>
      </div>
    </section>
  );
}
