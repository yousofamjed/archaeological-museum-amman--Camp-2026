"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { FloorPlan } from "@/components/floor-plan";
import { FLOORS, type Point } from "@/content/museum";

const FLOOR_1 = FLOORS[0];

const BEATS = [
  {
    kicker: "Arrival",
    title: "You come in from the Citadel",
    titleAr: "تدخل من جبل القلعة",
    body: "The 1951 building is left exactly as it is outside. Only the inside changes.",
  },
  {
    kicker: "Reception",
    title: "Tickets, lockers and a map of the route",
    titleAr: "التذاكر والخزائن وخريطة المسار",
    body: "A curved desk faces the door. From here, one red route leads through all six rooms.",
  },
  {
    kicker: "Central hall",
    title: "The hall connects every room",
    titleAr: "البهو يربط القاعات",
    body: "Benches, a floor mosaic and a timeline wall. Toilets, an accessible WC and the stairs sit along the west wall.",
  },
];

// Entrance → reception → hall → door of room 1
const PATH: Point[] = [[3.6, 16.6], [3.6, 13.6], [5.0, 10.2], [7.5, 7.0]];

function pointAlong(points: Point[], t: number): Point {
  const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  let d = t * lengths.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (d <= lengths[i]) {
      const k = d / lengths[i];
      return [points[i][0] + (points[i + 1][0] - points[i][0]) * k, points[i][1] + (points[i + 1][1] - points[i][1]) * k];
    }
    d -= lengths[i];
  }
  return points[points.length - 1];
}

export function EntranceScene() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const zoom = useTransform(scrollYProgress, [0, 0.8], reduceMotion ? [1, 1] : [1.9, 1]);
  const route = useTransform(scrollYProgress, [0.05, 0.85], [0, 0.32]);
  const [you, setYou] = useState<Point>(PATH[0]);
  const [beat, setBeat] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setYou(pointAlong(PATH, Math.min(1, Math.max(0, (p - 0.05) / 0.8))));
    setBeat(p < 0.33 ? 0 : p < 0.66 ? 1 : 2);
  });

  return (
    <section ref={ref} data-stop="entrance" className="relative h-[260svh]" aria-label="Entrance">
      <div className="sticky top-0 grid h-svh items-center gap-6 overflow-hidden px-4 pt-20 md:grid-cols-[1fr_1.2fr] md:px-12">
        <div className="relative z-10 min-h-56">
          {BEATS.map((b, i) => (
            <motion.div
              key={b.kicker}
              initial={false}
              animate={{ opacity: beat === i ? 1 : 0, y: beat === i ? 0 : beat > i ? -20 : 20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              aria-hidden={beat !== i}
            >
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                {String(i + 1).padStart(2, "0")} · {b.kicker}
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-sand md:text-5xl">{b.title}</h2>
              <p className="mt-2 text-end font-ar text-2xl text-sand/75" lang="ar" dir="rtl">
                {b.titleAr}
              </p>
              <p className="mt-4 max-w-md text-sand/70">{b.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative aspect-square w-full max-w-[min(80svh,640px)] justify-self-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <motion.div className="h-full w-full p-3" style={{ scale: zoom, transformOrigin: "25% 85%" }}>
            <FloorPlan floor={FLOOR_1} routeProgress={route} you={you} activeId={beat === 2 ? "hall-1" : null} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
