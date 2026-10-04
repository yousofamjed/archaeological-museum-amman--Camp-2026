"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Map, StickyNote, Volume2, VolumeX } from "lucide-react";

import { unlockRoomMusic } from "@/components/room-music";
import { useWalkthrough } from "@/components/walkthrough-provider";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const { showNotes, setShowNotes, soundOn, setSoundOn, audioUnlocked, goTo } = useWalkthrough();

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <div className="flex items-center justify-between gap-4 bg-gradient-to-b from-black/70 to-transparent px-4 py-3 md:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left leading-tight">
          <span className="block font-display text-lg text-sand md:text-xl">Jordan Archaeological Museum</span>
          <span className="block font-ar text-xs text-sand/60">متحف الآثار الأردني · جبل القلعة</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!soundOn) unlockRoomMusic();
              setSoundOn(!soundOn);
            }}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Turn music off" : "Turn music on"}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors touch:hidden",
              soundOn ? "border-gold/60 bg-gold/15 text-sand" : "border-white/15 text-sand/70 hover:text-sand",
            )}
          >
            {soundOn ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
            <span className="hidden sm:inline">
              {!soundOn ? "Sound off" : audioUnlocked ? "Sound on" : "Sound on · click to start"}
            </span>
          </button>
          <button
            onClick={() => setShowNotes(!showNotes)}
            aria-pressed={showNotes}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
              showNotes ? "border-amber-400/60 bg-amber-400/15 text-amber-200" : "border-white/15 text-sand/70 hover:text-sand",
            )}
          >
            <StickyNote className="size-3.5" />
            <span className="hidden sm:inline">Design notes</span>
          </button>
          <button
            onClick={() => goTo("landing")}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-sand/70 hover:text-sand"
          >
            <Map className="size-3.5" />
            <span className="hidden sm:inline">Floor plans</span>
          </button>
        </div>
      </div>
      <motion.div className="h-0.5 origin-left bg-gold" style={{ scaleX: progress }} />
    </header>
  );
}
