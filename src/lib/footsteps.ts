/**
 * Footstep sounds for the stair scenes, generated with the Web Audio API
 * so there is no audio file to download or license. Each step is a short
 * scuff of filtered noise plus a low heel thump.
 */

let context: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function getContext() {
  if (typeof window === "undefined") return null;
  context ??= new AudioContext();
  return context;
}

/** Call from a click handler: browsers start an AudioContext suspended until a user gesture. */
export function unlockFootsteps() {
  void getContext()?.resume();
}

function noiseBuffer(ctx: AudioContext) {
  if (!noise) {
    noise = ctx.createBuffer(1, Math.round(ctx.sampleRate * 0.25), ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noise;
}

/**
 * Plays one footstep. `index` varies the tone a little from step to step;
 * going down lands harder on the heel than going up.
 */
export function playFootstep(direction: "up" | "down", index: number) {
  const ctx = getContext();
  if (!ctx || ctx.state !== "running") return;

  const t = ctx.currentTime;
  const variation = ((index * 37) % 11) / 11; // 0..1, repeatable per step
  const down = direction === "down";

  // Scuff of the sole on stone
  const scuff = ctx.createBufferSource();
  scuff.buffer = noiseBuffer(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = (down ? 650 : 900) + variation * 300;
  filter.Q.value = 0.9;
  const scuffGain = ctx.createGain();
  scuffGain.gain.setValueAtTime(0.0001, t);
  scuffGain.gain.exponentialRampToValueAtTime(down ? 0.35 : 0.5, t + 0.006);
  scuffGain.gain.exponentialRampToValueAtTime(0.0001, t + (down ? 0.09 : 0.14));
  scuff.connect(filter).connect(scuffGain).connect(ctx.destination);
  scuff.start(t);
  scuff.stop(t + 0.2);

  // Heel thump
  const thump = ctx.createOscillator();
  thump.type = "sine";
  thump.frequency.setValueAtTime(down ? 120 : 95, t);
  thump.frequency.exponentialRampToValueAtTime(45, t + 0.12);
  const thumpGain = ctx.createGain();
  thumpGain.gain.setValueAtTime(0.0001, t);
  thumpGain.gain.exponentialRampToValueAtTime(down ? 0.6 : 0.35, t + 0.005);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
  thump.connect(thumpGain).connect(ctx.destination);
  thump.start(t);
  thump.stop(t + 0.2);
}
