"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { StopId } from "@/content/museum";

type WalkthroughState = {
  activeStop: StopId;
  showNotes: boolean;
  setShowNotes: (value: boolean) => void;
  goTo: (stop: StopId) => void;
};

const WalkthroughContext = createContext<WalkthroughState | null>(null);

export function WalkthroughProvider({ children }: { children: React.ReactNode }) {
  const [activeStop, setActiveStop] = useState<StopId>("landing");
  const [showNotes, setShowNotes] = useState(false);

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
    () => ({ activeStop, showNotes, setShowNotes, goTo }),
    [activeStop, showNotes, goTo],
  );

  return <WalkthroughContext.Provider value={value}>{children}</WalkthroughContext.Provider>;
}

export function useWalkthrough() {
  const context = useContext(WalkthroughContext);
  if (!context) throw new Error("useWalkthrough must be used inside WalkthroughProvider");
  return context;
}
