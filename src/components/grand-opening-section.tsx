"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import {
  BatteryFull,
  Bell,
  CalendarDays,
  ChevronLeft,
  Clapperboard,
  Ellipsis,
  Grid3x3,
  House,
  MapPin,
  Pin,
  Play,
  Search,
  Signal,
  SquarePlus,
  SquareUser,
  UserPlus,
  Users,
  Wifi,
} from "lucide-react";

import exterior from "@/assets/exterior-proposed.jpg";
import giftShop from "@/assets/rooms/gift-shop.jpg";
import { ROOMS } from "@/content/museum";

const HANDLE = "jam.reimagined";
// Modest pre-launch numbers for a brand-new account, chosen by the team.
const STATS = [
  { value: "9", label: "posts" },
  { value: "312", label: "followers" },
  { value: "48", label: "following" },
];
const HASHTAGS = ["#CitadelReimagined", "#القلعة_من_جديد"];

const PLAN = [
  {
    icon: Users,
    when: "Two weeks before",
    title: "Creator preview day",
    titleAr: "يوم المبدعين",
    body: "Around 20 local influencers, bloggers and vloggers get the first walk through the six rooms, with a guide and a content kit: renders, room music and the hashtags. We pick three kinds of creator: history and culture, Amman food and cafés, and university students aged 18–25.",
  },
  {
    icon: CalendarDays,
    when: "Opening night",
    title: "Sunset at the Citadel",
    titleAr: "غروب في القلعة",
    body: "An evening event with the Temple of Hercules lit behind the museum. Guests walk the route as each era's music plays, meet the holograms, and end in the Story Hub for short talks. The creators post live from inside.",
  },
  {
    icon: Clapperboard,
    when: "Before and after",
    title: "What gets posted",
    titleAr: "المحتوى",
    body: "Reels of the today-to-tomorrow wipe, hologram reveals, a “find the ’Ain Ghazal statues” challenge, and room music clips. Every post links back to the museum account, so the launch builds one audience, not twenty.",
  },
  {
    icon: Play,
    when: "Every month after",
    title: "Keep it going",
    titleAr: "الاستمرار",
    body: "Monthly youth nights in the Story Hub and a student ambassador programme, so the museum keeps giving creators something new to film.",
  },
];

type Post = { image?: StaticImageData; label: string; video?: boolean; pinned?: boolean };

const POSTS: Post[] = [
  { label: "Opening night", pinned: true },
  { image: exterior, label: "The new entrance", video: true, pinned: true },
  { image: giftShop, label: "Gift shop" },
  ...ROOMS.map((room) => ({ image: room.image, label: room.title, video: room.number % 2 === 1 })),
];

export function GrandOpeningSection() {
  return (
    <section data-stop="opening" className="relative px-4 py-28 md:px-8" aria-label="Grand opening">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">The launch</p>
        <h2 className="mt-2 font-display text-4xl text-sand md:text-6xl">The grand opening</h2>
        <p className="mt-1 text-end font-ar text-2xl text-sand/75" lang="ar" dir="rtl">
          الافتتاح الكبير
        </p>
        <p className="mt-4 max-w-2xl text-sand/70">
          The new museum only works if young people know it exists. So the opening is built for their feeds: local
          creators see it first, an opening night gives them something to film, and one Instagram account collects it all.
        </p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_auto]">
          <ol className="space-y-4">
            {PLAN.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                  <step.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] tracking-[0.2em] text-gold uppercase">{step.when}</p>
                  <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="font-display text-2xl text-sand">{step.title}</h3>
                    <span className="font-ar text-base text-sand/60" lang="ar" dir="rtl">
                      {step.titleAr}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-sand/75">{step.body}</p>
                </div>
              </motion.li>
            ))}
            <li className="flex flex-wrap gap-2 pt-2">
              {HASHTAGS.map((tag) => (
                <span key={tag} className="rounded-full border border-gold/30 px-3 py-1 text-sm text-gold">
                  {tag}
                </span>
              ))}
            </li>
          </ol>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto w-full max-w-[340px]"
          >
            <InstagramMockup />
            <p className="mt-3 text-center text-xs text-sand/40">Launch account mockup</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const HIGHLIGHTS: { label: string; image: StaticImageData }[] = [
  { label: "Rooms", image: ROOMS[0].image },
  { label: "Opening", image: exterior },
  { label: "Creators", image: ROOMS[3].image },
  { label: "Music", image: ROOMS[4].image },
  { label: "Visit", image: giftShop },
];

// iOS system font, so the mockup reads like a real phone screenshot.
const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function InstagramMockup() {
  return (
    <div className="rounded-[3rem] border border-white/15 bg-[#050505] p-3 shadow-2xl ring-1 ring-black">
      <div
        className="relative overflow-hidden rounded-[2.4rem] bg-black text-white antialiased"
        style={{ fontFamily: SYSTEM_FONT }}
      >
        {/* Status bar with the dynamic island */}
        <div className="relative flex h-11 items-center justify-between px-7 text-[13px] font-semibold">
          <span>9:41</span>
          <span className="absolute top-2 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-[#050505]" aria-hidden />
          <span className="flex items-center gap-1">
            <Signal className="size-3.5" strokeWidth={2.5} />
            <Wifi className="size-3.5" strokeWidth={2.5} />
            <BatteryFull className="size-5" strokeWidth={1.8} />
          </span>
        </div>

        {/* Profile header, as seen by a visitor */}
        <div className="flex items-center justify-between px-3 pb-1">
          <span className="flex items-center gap-2">
            <ChevronLeft className="size-6" strokeWidth={2.2} />
            <span className="text-[16px] font-bold tracking-tight">{HANDLE}</span>
          </span>
          <span className="flex items-center gap-4 pr-1">
            <Bell className="size-5" strokeWidth={2} />
            <Ellipsis className="size-5" strokeWidth={2.2} />
          </span>
        </div>

        <div className="flex items-center gap-5 px-4 pt-2">
          <div className="shrink-0 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[2.5px]">
            <div className="rounded-full bg-black p-[2.5px]">
              <Image src={ROOMS[0].image} alt="" width={80} height={80} className="size-[74px] rounded-full object-cover" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold">Jordan Archaeological Museum</p>
            <div className="mt-1 flex justify-between pr-2">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-left">
                  <p className="text-[15px] leading-tight font-semibold">{stat.value}</p>
                  <p className="text-[12px] leading-tight text-white/90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="px-4 pt-3 text-[13px] leading-[1.35]">
          <p className="text-white/55">Museum</p>
          <p>9,000 years. 6 rooms. One walk through Jordan&rsquo;s history.</p>
          <p className="text-left font-ar" lang="ar" dir="rtl">
            تسعة آلاف عام في ست قاعات
          </p>
          <p>Opening night soon, follow for the date</p>
          <p className="text-[#e0f1ff]">{HASHTAGS.join(" ")}</p>
          <p className="mt-0.5 flex items-center gap-1 text-white/90">
            <MapPin className="size-3.5" /> Amman Citadel, Amman, Jordan
          </p>
        </div>

        <div className="flex gap-1.5 px-4 pt-3">
          <span className="flex-1 rounded-lg bg-[#0095f6] py-[7px] text-center text-[13px] font-semibold">Follow</span>
          <span className="flex-1 rounded-lg bg-[#262626] py-[7px] text-center text-[13px] font-semibold">Message</span>
          <span className="grid w-8 place-items-center rounded-lg bg-[#262626]">
            <UserPlus className="size-4" />
          </span>
        </div>

        {/* Story highlights */}
        <div className="flex gap-4 overflow-hidden px-4 pt-4 pb-2">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="flex w-[62px] shrink-0 flex-col items-center gap-1">
              <div className="rounded-full border border-white/25 p-[3px]">
                <Image src={h.image} alt="" width={60} height={60} className="size-[54px] rounded-full object-cover" />
              </div>
              <span className="text-[11px]">{h.label}</span>
            </div>
          ))}
        </div>

        {/* Profile tabs */}
        <div className="mt-1 grid grid-cols-3 border-b border-white/10 text-white/50">
          <span className="flex justify-center border-b border-white pb-2 text-white">
            <Grid3x3 className="size-5" />
          </span>
          <span className="flex justify-center pb-2">
            <Clapperboard className="size-5" />
          </span>
          <span className="flex justify-center pb-2">
            <SquareUser className="size-5" />
          </span>
        </div>

        {/* Posts: Instagram's 3:4 profile grid */}
        <div className="grid grid-cols-3 gap-px pb-14">
          {POSTS.map((post) => (
            <div key={post.label} className="relative aspect-[3/4] overflow-hidden bg-[#1b1510]">
              {post.image ? (
                <Image src={post.image} alt={post.label} fill sizes="120px" className="object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#3a2a14] to-[#120c07] p-2 text-center">
                  <span className="font-display text-xl leading-none text-gold">Opening</span>
                  <span className="font-display text-xl leading-none text-sand">night</span>
                  <span className="mt-1.5 text-[8px] tracking-[0.2em] text-sand/60 uppercase">Amman Citadel</span>
                </div>
              )}
              <span className="absolute top-1.5 right-1.5 flex gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {post.pinned && <Pin className="size-3.5 rotate-45 fill-white text-white" />}
                {post.video && <Clapperboard className="size-3.5 text-white" strokeWidth={2.4} />}
              </span>
            </div>
          ))}
        </div>

        {/* App navigation bar and home indicator */}
        <div className="absolute inset-x-0 bottom-0 bg-black/95 backdrop-blur">
          <div className="flex items-center justify-around border-t border-white/10 pt-2.5 pb-1">
            <House className="size-6" strokeWidth={1.8} />
            <Search className="size-6" strokeWidth={1.8} />
            <SquarePlus className="size-6" strokeWidth={1.8} />
            <Clapperboard className="size-6" strokeWidth={1.8} />
            <Image src={ROOMS[0].image} alt="" width={28} height={28} className="size-6 rounded-full object-cover" />
          </div>
          <div className="flex justify-center pt-1.5 pb-2">
            <span className="h-1 w-28 rounded-full bg-white/90" />
          </div>
        </div>
      </div>
    </div>
  );
}
