"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import giftShop from "@/assets/rooms/gift-shop.jpg";

export function GiftShopSection() {
  return (
    <section data-stop="gift-shop" className="relative px-4 py-28 md:px-12" aria-label="Gift shop">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] text-gold uppercase">On the way out · Floor 1</p>
          <h2 className="mt-2 font-display text-4xl text-sand md:text-5xl">The gift shop</h2>
          <p className="mt-1 text-end font-ar text-2xl text-sand/75" lang="ar" dir="rtl">
            المتجر
          </p>
          <p className="mt-5 max-w-md text-sand/75">
            Back up the stairs from Floor 0, visitors leave past a small shop beside reception, about 16 m². It sells replicas,
            books and crafts by local makers, and its income helps pay for the upkeep of the screens and holograms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-2xl border border-white/10"
        >
          <Image
            src={giftShop}
            alt="Concept render of the gift shop: wooden shelves of replicas, books and keffiyeh scarves under warm track lighting"
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
