import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// In development, Next.js only serves its scripts to `localhost`. Phones and
// laptops opening the site through this machine's network address (e.g.
// http://172.20.10.3:3000) would get a page that never comes to life. Allow
// this machine's own IPv4 addresses, read at startup so a Wi-Fi or hotspot
// change only needs a dev server restart.
const localAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: localAddresses,
};

export default nextConfig;
