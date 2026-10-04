/**
 * Touch-first devices (phones and tablets) get the site without sound:
 * no room music, no footsteps and no sound button. Laptops and desktops
 * keep it. Matching the input type rather than the screen width keeps
 * phones in landscape and narrow laptop windows on the right side.
 *
 * The same query is the `touch:` Tailwind variant in globals.css.
 */
export const TOUCH_DEVICE_QUERY = "(hover: none) and (pointer: coarse)";

export function soundAllowed() {
  return typeof window !== "undefined" && !window.matchMedia(TOUCH_DEVICE_QUERY).matches;
}
