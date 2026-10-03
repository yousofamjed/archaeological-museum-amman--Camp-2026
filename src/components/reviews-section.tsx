"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote, Star } from "lucide-react";

import { useWalkthrough } from "@/components/walkthrough-provider";
import { PRAISE, REVIEWS, REVIEW_SOURCE } from "@/content/reviews";

export function ReviewsSection() {
  const { goTo } = useWalkthrough();

  return (
    <section data-stop="reviews" className="relative px-4 py-24 md:px-8" aria-label="What visitors say">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">What visitors say</p>
        <h2 className="mt-2 font-display text-4xl text-sand md:text-5xl">The reviews behind this prototype</h2>
        <p className="mt-1 text-end font-ar text-xl text-sand/75" lang="ar" dir="rtl">
          آراء الزوار كانت نقطة البداية
        </p>
        <p className="mt-4 max-w-2xl text-sand/70">
          We started from what visitors actually wrote. The objects were never the problem; the way the museum presents
          them was. Every part of this prototype answers one of these reviews.
        </p>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 rounded-2xl border border-gold/30 bg-gold/[0.06] p-6 md:p-8"
        >
          <Quote className="size-6 text-gold" aria-hidden />
          <p className="mt-3 font-display text-2xl leading-snug text-sand md:text-3xl">&ldquo;{PRAISE.quote}&rdquo;</p>
          <ReviewMeta reviewer={PRAISE.reviewer} rating={PRAISE.rating} date={PRAISE.date} />
        </motion.blockquote>

        <ol className="mt-6 space-y-4">
          {REVIEWS.map((review, i) => (
            <motion.li
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]"
            >
              <blockquote className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] tracking-[0.2em] text-rose-300/80 uppercase">{review.problem}</p>
                <p className="mt-2 leading-relaxed text-sand/85">&ldquo;{review.quote}&rdquo;</p>
                <ReviewMeta reviewer={review.reviewer} rating={review.rating} date={review.date} />
              </blockquote>

              <div className="hidden items-center md:flex" aria-hidden>
                <ArrowRight className="size-5 text-gold" />
              </div>

              <div className="flex flex-col rounded-2xl border border-gold/25 bg-[#17120d] p-5">
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">How the prototype answers it</p>
                <p className="mt-2 leading-relaxed text-sand">{review.answer}</p>
                <p className="mt-2 text-end font-ar text-sm leading-loose text-sand/65" lang="ar" dir="rtl">
                  {review.answerAr}
                </p>
                <button
                  onClick={() => goTo(review.link.stop)}
                  className="mt-auto self-start pt-3 text-sm text-gold underline decoration-gold/40 underline-offset-4 hover:text-sand"
                >
                  {review.link.label} →
                </button>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mt-6 text-xs text-sand/45">
          Quoted word for word, original spelling kept, from{" "}
          <a href={REVIEW_SOURCE.url} target="_blank" rel="noreferrer" className="underline decoration-sand/30 hover:text-sand">
            {REVIEW_SOURCE.name}
          </a>{" "}
          ({REVIEW_SOURCE.rating} from {REVIEW_SOURCE.count}).
        </p>
      </div>
    </section>
  );
}

function ReviewMeta({ reviewer, rating, date }: { reviewer: string; rating: number; date: string }) {
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sand/55">
      <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={i < rating ? "size-3.5 fill-gold text-gold" : "size-3.5 text-sand/25"} aria-hidden />
        ))}
      </span>
      <span>{reviewer}</span>
      <span>·</span>
      <span>{date}</span>
      <span>·</span>
      <span>{REVIEW_SOURCE.name}</span>
    </p>
  );
}
