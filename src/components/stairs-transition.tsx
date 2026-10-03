"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const STEPS = 12;

export function StairsTransition() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const floorOne = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);
  const floorTwo = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  return (
    <section ref={ref} data-stop="stairs" className="relative h-[220svh]" aria-label="Stairs to Floor 2">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-10 overflow-hidden px-6 text-center">
        <div className="relative h-24 w-full">
          <motion.p style={{ opacity: floorOne }} className="absolute inset-0 font-display text-6xl text-sand md:text-8xl">
            Floor 1
          </motion.p>
          <motion.p style={{ opacity: floorTwo }} className="absolute inset-0 font-display text-6xl text-gold md:text-8xl">
            Floor 2
          </motion.p>
        </div>

        <svg viewBox="0 0 240 150" className="w-full max-w-md" aria-hidden>
          {Array.from({ length: STEPS }, (_, i) => (
            <Step key={i} index={i} progress={scrollYProgress} />
          ))}
        </svg>

        <div className="max-w-xl">
          <p className="font-display text-2xl text-sand md:text-3xl">Up the stairs to the classical world</p>
          <p className="mt-1 font-ar text-xl text-sand/75" lang="ar" dir="rtl">
            صعوداً إلى العصور الكلاسيكية
          </p>
          <p className="mt-4 text-sm text-sand/60">
            Stairs only. No lift shaft is cut into the 1951 structure, so the building itself is untouched.
          </p>
        </div>
      </div>
    </section>
  );
}

function Step({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const start = 0.1 + (index / STEPS) * 0.6;
  const opacity = useTransform(progress, [start, start + 0.05], [0.15, 1]);
  const w = 240 / STEPS;
  const h = 150 / STEPS;
  return (
    <motion.rect
      x={index * w}
      y={150 - (index + 1) * h}
      width={240 - index * w}
      height={h - 1.5}
      fill="#c9a46a"
      style={{ opacity }}
    />
  );
}
