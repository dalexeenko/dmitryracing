"use client";

import { useState, useCallback } from "react";
import photos from "../data/photos.json";
import Lightbox from "./Lightbox";

type Album = "all" | "algarve" | "estoril" | "gt4" | "pacific";

const TABS: { label: string; value: Album }[] = [
  { label: "All", value: "all" },
  { label: "Portimão", value: "algarve" },
  { label: "Estoril", value: "estoril" },
  { label: "Pacific Raceways", value: "pacific" },
  { label: "The Ridge", value: "" },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Album>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeTab === "all"
      ? photos
      : photos.filter((p) => p.album === activeTab);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <section id="gallery" className="px-4 py-16 sm:px-8 md:px-12 lg:px-16">
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeTab === tab.value
                ? "bg-white text-[#0a0a0a]"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {filtered.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group relative block w-full overflow-hidden rounded-lg break-inside-avoid cursor-pointer"
          >
            <img
              src={photo.thumb}
              alt=""
              width={800}
              height={Math.round(800 * (photo.height / photo.width))}
              loading="lazy"
              className="block w-full transition-[transform] duration-300 group-hover:scale-[1.03]"
              style={{
                backgroundImage: `url(${photo.blurDataURL})`,
                backgroundSize: "cover",
                aspectRatio: `${photo.width} / ${photo.height}`,
              }}
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 transition-all group-hover:ring-white/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
