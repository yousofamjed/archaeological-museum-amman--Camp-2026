"use client";

import { useEffect } from "react";

import { useWalkthrough } from "@/components/walkthrough-provider";
import { ROOMS } from "@/content/museum";
import { soundAllowed } from "@/lib/device";
import { unlockFootsteps } from "@/lib/footsteps";

const VOLUME = 0.6;
const FADE_MS = 900;

// One audio element per track, shared by the player and the sound button.
const players = new Map<string, HTMLAudioElement>();
const fades = new Map<HTMLAudioElement, number>();

// The track that should be audible right now (null = silence). Every other
// track is kept paused; this, not the volume, decides what plays.
let current: HTMLAudioElement | null = null;

// iPhones and iPads ignore `audio.volume` (it always stays at 1), so fades
// can't work there. Detect it once and switch tracks instantly instead.
let volumeWorks: boolean | null = null;
function canSetVolume() {
  if (volumeWorks === null) {
    const probe = new Audio();
    probe.volume = 0.5;
    volumeWorks = probe.volume === 0.5;
  }
  return volumeWorks;
}

function getPlayer(src: string) {
  let audio = players.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = canSetVolume() ? 0 : 1;
    players.set(src, audio);
  }
  return audio;
}

/** Pauses every track except the current one. */
function silenceOthers() {
  players.forEach((audio) => {
    if (audio !== current && !fades.has(audio)) audio.pause();
  });
}

/**
 * Call from a click or tap handler. Safari only lets an audio element play
 * later if it was first started during a user gesture, so every track is
 * started muted and paused again straight away, except the current one.
 */
export function unlockRoomMusic() {
  if (!soundAllowed()) return;
  unlockFootsteps();
  for (const room of ROOMS) {
    if (!room.music) continue;
    const audio = getPlayer(room.music);
    if (audio === current) {
      audio.play().catch(() => {});
      continue;
    }
    if (!audio.paused) continue;
    audio.muted = true;
    audio
      .play()
      .then(() => {
        if (audio !== current) audio.pause();
      })
      .catch(() => {})
      .finally(() => {
        audio.muted = false;
      });
  }
}

/** Makes `next` the only audible track (or silence when null). */
function switchTo(next: HTMLAudioElement | null) {
  const previous = current;
  if (next === previous) return;
  current = next;

  if (previous) fadeOut(previous);
  if (next) {
    // Resumes where the visitor left off if they come back to a room.
    next.muted = false;
    next.play().catch(() => {});
    fadeIn(next);
  }
  silenceOthers();
}

/**
 * Plays each room's track while that room is on screen, crossfading
 * between rooms where the device allows it. Stops without a track
 * (entrance, stairs, the Copper & Bronze room for now) are silent, and
 * turning sound off stops every track. Renders nothing.
 */
export function RoomMusic() {
  const { activeStop, soundOn, setAudioUnlocked } = useWalkthrough();

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
    switchTo(src ? getPlayer(src) : null);
  }, [activeStop, soundOn]);

  useEffect(
    () => () => {
      current = null;
      players.forEach((audio) => audio.pause());
    },
    [],
  );

  return null;
}

function fadeIn(audio: HTMLAudioElement) {
  if (!canSetVolume()) return;
  ramp(audio, VOLUME);
}

function fadeOut(audio: HTMLAudioElement) {
  if (!canSetVolume()) {
    audio.pause();
    return;
  }
  ramp(audio, 0);
}

function ramp(audio: HTMLAudioElement, to: number) {
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
      return;
    }
    fades.delete(audio);
    // Only stop it if the visitor hasn't scrolled back to this room mid-fade.
    if (audio !== current) audio.pause();
  };
  fades.set(audio, requestAnimationFrame(step));
}
