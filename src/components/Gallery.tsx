"use client";

import React, { useState, useCallback, useRef } from "react";
import photos from "../data/photos.json";
import Lightbox from "./Lightbox";
import type { Album } from "../app/page";

function VideoTile({ src, poster, href }: { src: string; poster: string; href: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-lg break-inside-avoid"
      style={{ aspectRatio: "16 / 9" }}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (v) { v.pause(); v.currentTime = 0; }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover transition-[transform] duration-300 group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="black" fillOpacity="0.5" />
          <path d="M19 15l14 9-14 9V15z" fill="white" />
        </svg>
      </div>

      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 transition-all group-hover:ring-white/20" />
    </a>
  );
}

const VIDEOS = [
  { index: 1, src: "/video/portimao-loop.mp4", poster: "/video/portimao-poster.jpg", href: "https://www.youtube.com/watch?v=Yobha4RtjPA" },
  { index: 2, src: "/video/gt4-loop.mp4", poster: "/video/gt4-poster.jpg", href: "https://www.youtube.com/watch?v=Ry88WxWedhs" },
];

export default function Gallery({ activeAlbum }: { activeAlbum: Album }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeAlbum === "all"
      ? photos
      : photos.filter((p) => p.album === activeAlbum);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <section id="gallery" className="px-4 py-16 sm:px-8 md:px-12 lg:px-16">
      {/* Masonry grid */}
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {filtered.map((photo, index) => (
          <React.Fragment key={photo.id}>
            {activeAlbum === "all" && VIDEOS.filter(v => v.index === index).map(v => (
              <VideoTile key={v.src} src={v.src} poster={v.poster} href={v.href} />
            ))}
            <button
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
          </React.Fragment>
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
