"use client";

import { useEffect, useRef } from "react";

import { useWalkthrough } from "@/components/walkthrough-provider";
import { ROOMS } from "@/content/museum";
import { unlockFootsteps } from "@/lib/footsteps";

const VOLUME = 0.6;
const FADE_MS = 900;

// One audio element per track, shared by the player and the sound button.
const players = new Map<string, HTMLAudioElement>();
const fades = new Map<HTMLAudioElement, number>();

function getPlayer(src: string) {
  let audio = players.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    players.set(src, audio);
  }
  return audio;
}

/**
 * Call from a click handler. Safari only lets an audio element play later
 * if it was first started during a user gesture, so every track is
 * started and immediately paused here.
 */
export function unlockRoomMusic() {
  unlockFootsteps();
  for (const room of ROOMS) {
    if (!room.music) continue;
    const audio = getPlayer(room.music);
    if (!audio.paused) continue;
    audio
      .play()
      .then(() => {
        if (audio.volume === 0) audio.pause();
      })
      .catch(() => {});
  }
}

/**
 * Plays each room's track while that room is on screen, crossfading
 * between rooms. Stops without a track (entrance, stairs, the Copper &
 * Bronze room for now) fade to silence. Renders nothing.
 */
export function RoomMusic() {
  const { activeStop, soundOn, setAudioUnlocked } = useWalkthrough();
  const current = useRef<HTMLAudioElement | null>(null);

  // Sound is on by default, but browsers refuse audio until the visitor first
  // clicks, taps or presses a key (scrolling doesn't count). That first gesture
  // unlocks every track, and the current room's track starts playing.
  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchend"] as const;
    const onFirstGesture = () => {
      unlockRoomMusic();
      setAudioUnlocked(true);
      events.forEach((e) => window.removeEventListener(e, onFirstGesture, true));
    };
    events.forEach((e) => window.addEventListener(e, onFirstGesture, true));
    return () => events.forEach((e) => window.removeEventListener(e, onFirstGesture, true));
  }, [setAudioUnlocked]);

  useEffect(() => {
    const src = soundOn ? ROOMS.find((r) => r.id === activeStop)?.music : undefined;
    const next = src ? getPlayer(src) : null;
    const previous = current.current;
    if (next === previous) return;

    // Only pause the old track if the visitor hasn't scrolled back to it mid-fade.
    if (previous) fade(previous, 0, () => current.current !== previous);
    if (next) {
      // Resumes where the visitor left off if they come back to a room.
      next.play().catch(() => {});
      fade(next, VOLUME);
    }
    current.current = next;
  }, [activeStop, soundOn]);

  useEffect(() => () => players.forEach((audio) => audio.pause()), []);

  return null;
}

function fade(audio: HTMLAudioElement, to: number, shouldPause: () => boolean = () => true) {
  cancelAnimationFrame(fades.get(audio) ?? 0);
  const from = audio.volume;
  const start = performance.now();
  const step = (now: number) => {
    // The frame timestamp can be slightly earlier than `start`, so clamp both ends:
    // a volume outside 0..1 throws and would stop the fade.
    const t = Math.min(1, Math.max(0, (now - start) / FADE_MS));
    audio.volume = Math.min(1, Math.max(0, from + (to - from) * t));
    if (t < 1) {
      fades.set(audio, requestAnimationFrame(step));
    } else if (to === 0 && shouldPause()) {
      audio.pause();
    }
  };
  fades.set(audio, requestAnimationFrame(step));
}
