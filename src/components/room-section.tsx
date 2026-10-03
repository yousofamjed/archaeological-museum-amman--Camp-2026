"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { X } from "lucide-react";

import { useWalkthrough } from "@/components/walkthrough-provider";
import type { Hotspot, Room } from "@/content/museum";
import { cn } from "@/lib/utils";

const HOTSPOT_STYLE: Record<Hotspot["kind"], { dot: string; label: string }> = {
  object: { dot: "bg-gold", label: "Object" },
  experience: { dot: "bg-sky-300", label: "Experience" },
  note: { dot: "bg-amber-500", label: "Design note" },
};

export function RoomSection({ room }: { room: Room }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { showNotes } = useWalkthrough();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(scrollYProgress, [0, 0.25], reduceMotion ? [1, 1] : [1.18, 1]);
  const shade = useTransform(scrollYProgress, [0, 0.18, 0.88, 1], [0.78, 0.12, 0.12, 0.65]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.2], reduceMotion ? [0, 0] : [0, -40]);
  const panelOpacity = useTransform(scrollYProgress, [0.16, 0.28], [0, 1]);
  const panelX = useTransform(scrollYProgress, [0.16, 0.28], reduceMotion ? [0, 0] : [-30, 0]);

  const hotspots = room.hotspots.filter((h) => showNotes || h.kind !== "note");
  const [revealed, setRevealed] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  // Hotspots appear one at a time between 30% and 80% of the room's scroll.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const step = 0.5 / Math.max(hotspots.length, 1);
    const count = p < 0.3 ? 0 : Math.min(hotspots.length, Math.floor((p - 0.3) / step) + 1);
    setRevealed(count);
    if (p < 0.25 || p > 0.97) setOpenId(null);
  });

  const ratio = room.image.width / room.image.height;

  return (
    <section ref={ref} data-stop={room.id} id={room.id} className="relative h-[320svh]" aria-label={room.title}>
      <div className="sticky top-0 h-svh overflow-hidden bg-ink">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [container-type:inline-size]"
            style={{ width: `max(100vw, calc(100svh * ${ratio}))`, aspectRatio: `${ratio}` }}
          >
            <Image
              src={room.image}
              alt={room.imageAlt}
              fill
              placeholder="blur"
              sizes={`max(100vw, ${Math.round(ratio * 100)}vh)`}
              className="object-cover"
            />

            {/* Our own text panel replaces the one baked into each render. */}
            <motion.div
              style={{ opacity: panelOpacity, x: panelX }}
              className="absolute inset-y-0 left-0 hidden w-[25%] flex-col justify-center bg-gradient-to-r from-[#0d0a08] from-82% to-transparent py-[6%] pr-[3.5%] pl-[3%] md:flex"
            >
              <RoomText room={room} showNotes={showNotes} />
            </motion.div>

            {hotspots.slice(0, revealed).map((h) => (
              <HotspotPin
                key={h.id}
                hotspot={h}
                open={openId === h.id}
                onToggle={() => setOpenId(openId === h.id ? null : h.id)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />

        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <span
            className="mb-4 grid size-14 place-items-center rounded-full font-display text-2xl text-ink"
            style={{ backgroundColor: room.accent }}
          >
            {room.number}
          </span>
          <p className="text-xs tracking-[0.3em] text-sand/70 uppercase">Floor {room.floor} · Room {room.number}</p>
          <h2 className="mt-2 font-display text-5xl text-sand md:text-7xl">{room.title}</h2>
          <p className="mt-2 font-ar text-3xl text-sand/85 md:text-4xl" lang="ar" dir="rtl">
            {room.titleAr}
          </p>
          <p className="mt-4 text-sm tracking-widest" style={{ color: room.accent }}>
            {room.period}
          </p>
        </motion.div>

        {/* Phones: the image is cropped to its centre, so text sits in a bottom sheet. */}
        <motion.div
          style={{ opacity: panelOpacity }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent px-5 pt-16 pb-8 md:hidden"
        >
          <RoomText room={room} showNotes={showNotes} compact />
        </motion.div>

        <HotspotLegend showNotes={showNotes} />
      </div>
    </section>
  );
}

function RoomText({ room, showNotes, compact = false }: { room: Room; showNotes: boolean; compact?: boolean }) {
  return (
    <div className="text-sand">
      <p className="tracking-[0.25em] text-sand/60 uppercase" style={{ fontSize: compact ? 11 : "clamp(10px, 0.75cqw, 14px)" }}>
        Room {room.number} · Floor {room.floor}
      </p>
      <h3 className="mt-[0.4em] text-end font-ar leading-snug" lang="ar" dir="rtl" style={{ fontSize: compact ? 26 : "clamp(20px, 2.3cqw, 40px)" }}>
        {room.titleAr}
      </h3>
      <h3 className="font-display leading-tight" style={{ fontSize: compact ? 26 : "clamp(20px, 2.2cqw, 40px)" }}>
        {room.title}
      </h3>
      <p className="mt-[0.5em]" style={{ color: room.accent, fontSize: compact ? 13 : "clamp(11px, 0.95cqw, 17px)" }}>
        {room.period}
      </p>
      <p className="text-end font-ar opacity-80" lang="ar" dir="rtl" style={{ color: room.accent, fontSize: compact ? 13 : "clamp(11px, 0.95cqw, 17px)" }}>
        {room.periodAr}
      </p>
      {showNotes && room.renderPeriod && (
        <p className="mt-2 rounded border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-amber-200" style={{ fontSize: compact ? 11 : "clamp(10px, 0.75cqw, 13px)" }}>
          Corrected: the render says {room.renderPeriod}
        </p>
      )}
      <div className="my-[1em] h-px w-16" style={{ backgroundColor: room.accent }} />
      <p className="leading-relaxed text-sand/85" style={{ fontSize: compact ? 14 : "clamp(12px, 1cqw, 18px)" }}>
        {room.summary}
      </p>
      {!compact && (
        <p className="mt-[0.8em] text-end font-ar leading-loose text-sand/70" lang="ar" dir="rtl" style={{ fontSize: "clamp(12px, 1cqw, 18px)" }}>
          {room.summaryAr}
        </p>
      )}
    </div>
  );
}

function HotspotPin({ hotspot, open, onToggle }: { hotspot: Hotspot; open: boolean; onToggle: () => void }) {
  const style = HOTSPOT_STYLE[hotspot.kind];
  const flip = hotspot.x > 60;
  const below = hotspot.y < 45;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn("absolute -translate-x-1/2 -translate-y-1/2", open ? "z-30" : "z-20")}
      // The image is larger than the viewport; keep pins inside the visible part of it.
      style={{
        left: `clamp(calc(50% - 50vw + 28px), ${hotspot.x}%, calc(50% + 50vw - 28px))`,
        top: `clamp(calc(50% - 50svh + 100px), ${hotspot.y}%, calc(50% + 50svh - 110px))`,
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-label={hotspot.title}
        className="group relative grid size-9 place-items-center"
      >
        <span className={cn("absolute inset-0 animate-ping rounded-full opacity-40", style.dot)} />
        <span
          className={cn(
            "relative grid size-6 place-items-center rounded-full border-2 border-white/90 shadow-lg transition-transform group-hover:scale-110",
            style.dot,
            hotspot.kind === "note" && "border-dashed",
          )}
        >
          <span className="size-1.5 rounded-full bg-black/70" />
        </span>
        {!open && (
          <span className="pointer-events-none absolute top-full mt-1 hidden rounded bg-black/70 px-2 py-0.5 text-[11px] whitespace-nowrap text-sand opacity-0 transition-opacity group-hover:opacity-100 md:block">
            {hotspot.title}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: below ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute w-72 rounded-xl border border-white/15 bg-black/85 p-4 text-left shadow-2xl backdrop-blur-md",
              flip ? "right-10" : "left-10",
              below ? "top-0" : "bottom-0",
            )}
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-sand/60 uppercase">
                <span className={cn("size-2 rounded-full", style.dot)} />
                {style.label}
              </span>
              <button onClick={onToggle} aria-label="Close" className="text-sand/60 hover:text-sand">
                <X className="size-4" />
              </button>
            </div>
            <p className="font-display text-lg leading-snug text-sand">{hotspot.title}</p>
            <p className="text-end font-ar text-sm text-sand/70" lang="ar" dir="rtl">
              {hotspot.titleAr}
            </p>
            <p className={cn("mt-2 text-sm leading-relaxed text-sand/85", hotspot.kind === "note" && "text-amber-100")}>
              {hotspot.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HotspotLegend({ showNotes }: { showNotes: boolean }) {
  const kinds = (Object.keys(HOTSPOT_STYLE) as Hotspot["kind"][]).filter((k) => showNotes || k !== "note");
  return (
    <ul className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-4 rounded-full bg-black/50 px-4 py-1.5 text-[11px] text-sand/70 backdrop-blur md:flex">
      {kinds.map((k) => (
        <li key={k} className="flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full", HOTSPOT_STYLE[k].dot)} />
          {HOTSPOT_STYLE[k].label}
        </li>
      ))}
    </ul>
  );
}
