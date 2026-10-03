"use client";

import { AnimatePresence, motion } from "framer-motion";

import { FloorPlan } from "@/components/floor-plan";
import { useWalkthrough } from "@/components/walkthrough-provider";
import { FLOORS, ROOMS, STOPS } from "@/content/museum";

export function MiniMap() {
  const { activeStop, goTo } = useWalkthrough();
  const stop = STOPS.find((s) => s.id === activeStop);
  const floor = FLOORS.find((f) => f.id === stop?.floor);
  const room = ROOMS.find((r) => r.id === activeStop);

  return (
    <AnimatePresence>
      {stop && floor && activeStop !== "entrance" && (
        <motion.nav
          key="mini-map"
          aria-label="Where you are in the museum"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed right-4 bottom-4 z-40 hidden w-44 rounded-xl border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur-md md:block"
        >
          <div className="mb-2 flex items-baseline justify-between text-[11px] tracking-[0.18em] text-sand/70 uppercase">
            <span>{floor.name}</span>
            <span className="font-ar text-xs tracking-normal">{floor.nameAr}</span>
          </div>
          <FloorPlan floor={floor} compact activeId={activeStop} you={stop.at} onSelect={(id) => goTo(id)} />
          <p className="mt-2 truncate text-xs text-sand">
            <span className="text-sand/50">You are in · </span>
            {room ? `${room.number}. ${room.title}` : stop.label}
          </p>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
