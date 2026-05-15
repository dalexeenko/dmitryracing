"use client";

import type { Album } from "@/types/album";
import { useLocale } from "./LocaleProvider";

const TRACKS: {
  name: string;
  detail: string;
  miles: string;
  turns: number;
  svg: string;
  album: Album;
}[] = [
  {
    name: "Portimão",
    detail: "4.653 km",
    miles: "2.891 mi",
    turns: 16,
    svg: "/tracks/portimao.svg",
    album: "algarve",
  },
  {
    name: "Estoril",
    detail: "4.182 km",
    miles: "2.598 mi",
    turns: 13,
    svg: "/tracks/estoril.svg",
    album: "estoril",
  },
  {
    name: "Pacific Raceways",
    detail: "3.621 km",
    miles: "2.250 mi",
    turns: 10,
    svg: "/tracks/pacific.svg",
    album: "pacific",
  },
  {
    name: "The Ridge",
    detail: "3.975 km",
    miles: "2.470 mi",
    turns: 16,
    svg: "/tracks/ridge.svg",
    album: "all",
  },
];

export default function TrackMaps({
  activeAlbum,
  onAlbumChange,
}: {
  activeAlbum: Album;
  onAlbumChange: (album: Album) => void;
}) {
  const { t, unit, setUnit } = useLocale();

  return (
    <section id="tracks" className="border-y border-white/5 bg-[#0f0f0f]">
      <div className="mx-auto flex max-w-3xl items-center justify-end gap-2 px-6 pt-8">
        <span className="text-[10px] uppercase tracking-widest text-white/30">{t("tracksHeading")}</span>
        <div className="flex rounded-full border border-white/10 p-0.5 text-[10px] font-semibold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={`rounded-full px-3 py-1 transition-colors ${
              unit === "metric" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t("tracksKm")}
          </button>
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={`rounded-full px-3 py-1 transition-colors ${
              unit === "imperial" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t("tracksMi")}
          </button>
        </div>
      </div>
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 px-6 py-8 sm:grid-cols-4 sm:gap-6">
        {TRACKS.map((track) => {
          const isActive = activeAlbum === track.album && track.album !== "all";
          const primary = unit === "metric" ? track.detail : track.miles;
          const secondary = unit === "metric" ? track.miles : track.detail;
          return (
            <div
              key={track.name}
              className="group flex flex-col items-center gap-3 cursor-pointer"
              onClick={() => {
                if (track.album === "all") return;
                onAlbumChange(isActive ? "all" : track.album);
              }}
            >
              <img
                src={track.svg}
                alt={`${track.name} circuit layout`}
                className={`h-16 w-16 transition-opacity duration-200 sm:h-20 sm:w-20 md:h-28 md:w-28 group-hover:opacity-100 ${isActive ? "opacity-100" : "opacity-30"}`}
              />
              <div className="text-center">
                <p
                  className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-200 group-hover:text-white ${isActive ? "text-white" : "text-white/50"}`}
                >
                  {track.name}
                </p>
                <p className="text-[10px] text-white/60">
                  {primary}
                  <span className="text-white/25"> · </span>
                  {track.turns} {t("tracksTurns")}
                </p>
                <p className="text-[10px] text-white/25">{secondary}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
