"use client";

import { useMemo } from "react";
import type { Album } from "@/types/album";
import { useLocale } from "./LocaleProvider";
import rawGuides from "@/data/track-reference.json";

type Localized = { en: string; pt: string };
type GuidePoint = {
  id: string;
  order: number;
  name: Localized;
  lapPct: number;
  brake: Localized;
  video?: { href: string; startSec?: number };
};
type Guide = {
  slug: string;
  album: string;
  circuit: Localized;
  intro: Localized;
  fullLap: { href: string; label: Localized };
  points: GuidePoint[];
};

const guides = rawGuides as Record<string, Guide>;

const ALBUM_TO_SLUG: Record<Exclude<Album, "all">, keyof typeof guides> = {
  algarve: "portimao",
  estoril: "estoril",
  pacific: "pacific",
  gt4: "ridge",
};

function youtubeWithStart(href: string, startSec?: number): string {
  if (startSec == null || startSec <= 0) return href;
  try {
    const u = new URL(href);
    if (u.hostname.includes("youtube.com")) {
      u.searchParams.set("t", `${startSec}s`);
    } else if (u.hostname === "youtu.be") {
      u.searchParams.set("t", `${startSec}s`);
    }
    return u.toString();
  } catch {
    return href;
  }
}

export default function TrackReferenceGuide({
  activeAlbum,
  onPickAlbum,
}: {
  activeAlbum: Album;
  onPickAlbum: (a: Exclude<Album, "all">) => void;
}) {
  const { locale } = useLocale();
  const L = locale === "pt" ? "pt" : "en";

  const slug = activeAlbum === "all" ? null : ALBUM_TO_SLUG[activeAlbum];
  const guide = slug ? guides[slug] : null;

  const picks = useMemo(
    () =>
      [
        { album: "algarve" as const, label: "Portimão", slug: "portimao" },
        { album: "estoril" as const, label: "Estoril", slug: "estoril" },
        { album: "pacific" as const, label: "Pacific", slug: "pacific" },
        { album: "gt4" as const, label: "The Ridge", slug: "ridge" },
      ].map((p) => ({ ...p, guide: guides[p.slug] })),
    [],
  );

  return (
    <section id="guide" className="border-t border-white/5 bg-[#0c0c0c] px-6 py-16 sm:px-12 md:px-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-white/40">
          {L === "pt" ? "Guia de referência" : "Lap reference"}
        </h2>
        <p className="mb-10 max-w-2xl text-sm text-white/45">
          {L === "pt"
            ? "Notas de cantos e travagens com links para vídeo (exemplos). Não substitui briefing no local."
            : "Corner and braking notes with deep-linked video examples. Not a substitute for on-site briefing."}
        </p>

        {activeAlbum === "all" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {picks.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => onPickAlbum(p.album)}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#e53935]/80">
                  {L === "pt" ? "Circuito" : "Circuit"}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">{p.label}</p>
                <p className="mt-2 text-sm text-white/50 line-clamp-2">
                  {p.guide.intro[L]}
                </p>
                <span className="mt-4 inline-block text-xs font-medium text-white/40">
                  {L === "pt" ? "Ver guia →" : "Open guide →"}
                </span>
              </button>
            ))}
          </div>
        ) : guide ? (
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {guide.circuit[L]}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">{guide.intro[L]}</p>

            <a
              href={guide.fullLap.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/25 hover:bg-white/[0.1]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              {guide.fullLap.label[L]}
            </a>

            <div className="mt-10">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/35">
                {L === "pt" ? "Ao longo da volta" : "Along the lap"}
              </p>
              <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                {guide.points.map((pt) => (
                  <a
                    key={pt.id}
                    href={`#guide-point-${pt.id}`}
                    className="absolute top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0c0c0c] bg-[#e53935] shadow-md transition-transform hover:scale-125"
                    style={{ left: `${pt.lapPct}%` }}
                    title={pt.name[L]}
                    aria-label={pt.name[L]}
                  />
                ))}
              </div>
            </div>

            <ul className="mt-12 space-y-10">
              {guide.points.map((pt) => (
                <li
                  key={pt.id}
                  id={`guide-point-${pt.id}`}
                  className="scroll-mt-28 border-b border-white/5 pb-10 last:border-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-white">
                      <span className="text-white/35">T{pt.order}</span> · {pt.name[L]}
                    </p>
                    {pt.video ? (
                      <a
                        href={youtubeWithStart(pt.video.href, pt.video.startSec)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-[#e53935]/90 hover:text-[#e53935]"
                      >
                        {L === "pt" ? "Vídeo neste ponto" : "Video at this point"} →
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">{pt.brake[L]}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
