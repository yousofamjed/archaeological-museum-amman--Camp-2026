"use client";

import { motion } from "framer-motion";

import { PITCH, type PitchStatus } from "@/content/pitch";
import { cn } from "@/lib/utils";

const STATUS: Record<PitchStatus, { label: string; className: string }> = {
  verified: { label: "Sourced", className: "border-emerald-400/40 text-emerald-300" },
  draft: { label: "Draft", className: "border-amber-400/40 text-amber-300" },
  fill: { label: "To fill", className: "border-rose-400/50 text-rose-300" },
};

export function PitchSection() {
  return (
    <section data-stop="pitch" className="relative px-4 py-28 md:px-8" aria-label="The pitch">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">After the walk</p>
        <h2 className="mt-2 font-display text-4xl text-sand md:text-6xl">Why this should exist</h2>
        <p className="mt-1 text-end font-ar text-2xl text-sand/75" lang="ar" dir="rtl">
          لماذا يجب أن يتحقق هذا المشروع
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PITCH.map((block, i) => (
            <motion.article
              key={block.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <header className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-sand/50">{String(block.number).padStart(2, "0")}</p>
                  <h3 className="font-display text-2xl text-sand">{block.title}</h3>
                  <p className="text-end font-ar text-base text-sand/60" lang="ar" dir="rtl">
                    {block.titleAr}
                  </p>
                </div>
                <span className={cn("rounded-full border px-2.5 py-0.5 text-[11px]", STATUS[block.status].className)}>
                  {STATUS[block.status].label}
                </span>
              </header>
              <ul className="space-y-2 text-sm leading-relaxed text-sand/80">
                {block.body.map((line) => (
                  <li key={line} className={cn(line.includes("TO FILL") || line.includes("TO CONFIRM") ? "text-rose-200/90" : "")}>
                    {line}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <p className="mt-16 text-center text-xs text-sand/40">
          LOYAC Innovation Camp 2026 · Concept sketch, not a final design. Room renders are AI-generated concept images.
        </p>
      </div>
    </section>
  );
}
