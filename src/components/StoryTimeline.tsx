"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import story from "@/data/story.json";
import photos from "@/data/photos.json";
import type { Photo } from "@/types/photo";
import { useLocale } from "./LocaleProvider";
import {
  galleryThumbSizes,
  galleryThumbSrcSet,
  vinextImageUrl,
} from "@/lib/optimized-image";

type StoryEntry = {
  year: number;
  photoId: string;
  headline: { en: string; pt: string };
  body: { en: string; pt: string };
};

const entries = story as StoryEntry[];
const photoList = photos as Photo[];

export default function StoryTimeline() {
  const { locale } = useLocale();
  const L = locale === "pt" ? "pt" : "en";
  const reduceMotion = useReducedMotion() ?? false;

  const byId = useMemo(() => {
    const m = new Map<string, Photo>();
    for (const p of photoList) m.set(p.id, p);
    return m;
  }, []);

  return (
    <section id="story" className="border-t border-white/5 px-6 py-20 sm:px-12 md:px-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-white/40">
          {L === "pt" ? "História" : "Story"}
        </h2>
        <p className="mb-14 max-w-2xl text-lg text-white/55">
          {L === "pt"
            ? "Momentos do caminho — do primeiro dia de pista aos circuitos de hoje."
            : "Milestones along the way — from first track days to today’s circuits."}
        </p>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-[2.25rem] top-0 hidden w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent md:block"
            aria-hidden
          />
          <ul className="space-y-20 md:space-y-24">
            {entries.map((ch, i) => {
              const ph = byId.get(ch.photoId);
              const imgSrc = ph
                ? vinextImageUrl(ph.thumb, 640, 78)
                : "/photos/full/sunset-racing-school-14-09-111.jpg";
              return (
                <motion.li
                  key={`${ch.year}-${ch.photoId}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 36 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.55, delay: reduceMotion ? 0 : Math.min(i * 0.06, 0.24) }}
                  className="relative grid gap-8 md:grid-cols-[5rem_1fr]"
                >
                  <div className="md:sticky md:top-28 md:self-start">
                    <p className="text-3xl font-black tabular-nums text-white/90 md:text-right">
                      {ch.year}
                    </p>
                    <div className="mt-2 hidden h-2 w-2 rounded-full bg-[#e53935] md:ml-auto md:block" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                        {ch.headline[L]}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
                        {ch.body[L]}
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                      <img
                        src={imgSrc}
                        srcSet={ph ? galleryThumbSrcSet(ph.thumb, 78) : undefined}
                        alt=""
                        width={640}
                        height={ph ? Math.round(640 * (ph.height / ph.width)) : 427}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : undefined}
                        decoding="async"
                        className="h-full w-full object-cover"
                        style={{
                          backgroundColor: ph?.dominantColor ?? "#111",
                          aspectRatio: ph ? `${ph.width} / ${ph.height}` : "3 / 2",
                        }}
                        sizes={galleryThumbSizes}
                      />
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
