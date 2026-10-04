"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { StopId } from "@/content/museum";
import { TOUCH_DEVICE_QUERY } from "@/lib/device";

type WalkthroughState = {
  activeStop: StopId;
  showNotes: boolean;
  setShowNotes: (value: boolean) => void;
  /** On by default; browsers still hold audio back until the first click or tap. */
  soundOn: boolean;
  setSoundOn: (value: boolean) => void;
  /** True once a click or tap has let the browser play audio. */
  audioUnlocked: boolean;
  setAudioUnlocked: (value: boolean) => void;
  goTo: (stop: StopId) => void;
};

const WalkthroughContext = createContext<WalkthroughState | null>(null);

export function WalkthroughProvider({ children }: { children: React.ReactNode }) {
  const [activeStop, setActiveStop] = useState<StopId>("intro");
  const [showNotes, setShowNotes] = useState(false);
  const [soundPreference, setSoundOn] = useState(true);
  // Phones and tablets get no sound at all; see src/lib/device.ts.
  const [touchDevice, setTouchDevice] = useState(false);
  const soundOn = soundPreference && !touchDevice;

  useEffect(() => {
    const query = window.matchMedia(TOUCH_DEVICE_QUERY);
    const update = () => setTouchDevice(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // A stop becomes active when its section crosses the middle of the viewport.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-stop]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveStop(entry.target.getAttribute("data-stop") as StopId);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((stop: StopId) => {
    document.querySelector(`[data-stop="${stop}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(
    () => ({ activeStop, showNotes, setShowNotes, soundOn, setSoundOn, audioUnlocked, setAudioUnlocked, goTo }),
    [activeStop, showNotes, soundOn, audioUnlocked, goTo],
  );

  return <WalkthroughContext.Provider value={value}>{children}</WalkthroughContext.Provider>;
}

export function useWalkthrough() {
  const context = useContext(WalkthroughContext);
  if (!context) throw new Error("useWalkthrough must be used inside WalkthroughProvider");
  return context;
}
