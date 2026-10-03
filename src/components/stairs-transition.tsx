"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";

import { useWalkthrough } from "@/components/walkthrough-provider";
import type { StopId } from "@/content/museum";
import { playFootstep } from "@/lib/footsteps";

// Steps light up one by one between these two points of the section's scroll.
const START = 0.1;
const SPAN = 0.6;

type StairsTransitionProps = {
  stop: StopId;
  direction: "up" | "down";
  from: string;
  to: string;
  title: string;
  titleAr: string;
  note: string;
  steps?: number;
  className?: string;
};

export function StairsTransition({
  stop,
  direction,
  from,
  to,
  title,
  titleAr,
  note,
  steps = 12,
  className = "h-[160svh]",
}: StairsTransitionProps) {
  const ref = useRef<HTMLElement>(null);
  const lastCount = useRef(0);
  const { soundOn } = useWalkthrough();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fromOpacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);
  const toOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  // One footstep each time another step lights up. Scrolling back plays the
  // step in the other direction, as if walking back.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const count = p < START ? 0 : Math.min(steps, Math.floor((p - START) / (SPAN / steps)) + 1);
    if (count === lastCount.current) return;
    if (soundOn) {
      const forward = count > lastCount.current;
      const walking = forward ? direction : direction === "up" ? "down" : "up";
      playFootstep(walking, count);
    }
    lastCount.current = count;
  });

  return (
    <section ref={ref} data-stop={stop} className={`relative ${className}`} aria-label={`${title}: ${from} to ${to}`}>
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-10 overflow-hidden px-6 text-center">
        <div className="relative h-24 w-full">
          <motion.p style={{ opacity: fromOpacity }} className="absolute inset-0 font-display text-6xl text-sand md:text-8xl">
            {from}
          </motion.p>
          <motion.p style={{ opacity: toOpacity }} className="absolute inset-0 font-display text-6xl text-gold md:text-8xl">
            {to}
          </motion.p>
        </div>

        <svg viewBox="0 0 240 150" className="w-full max-w-md" aria-hidden>
          {/* Drawn rising to the right; mirrored, the same stairs descend to the right. */}
          <g transform={direction === "down" ? "translate(240 0) scale(-1 1)" : undefined}>
            {Array.from({ length: steps }, (_, i) => (
              <Step
                key={i}
                index={i}
                steps={steps}
                // Going up, the bottom step lights first; going down, the top one does.
                order={direction === "up" ? i : steps - 1 - i}
                progress={scrollYProgress}
              />
            ))}
          </g>
        </svg>

        <div className="max-w-xl">
          <p className="font-display text-2xl text-sand md:text-3xl">{title}</p>
          <p className="mt-1 font-ar text-xl text-sand/75" lang="ar" dir="rtl">
            {titleAr}
          </p>
          <p className="mt-4 text-sm text-sand/60">{note}</p>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  steps,
  order,
  progress,
}: {
  index: number;
  steps: number;
  order: number;
  progress: MotionValue<number>;
}) {
  const start = START + (order / steps) * SPAN;
  const opacity = useTransform(progress, [start, start + 0.05], [0.15, 1]);
  const w = 240 / steps;
  const h = 150 / steps;
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
