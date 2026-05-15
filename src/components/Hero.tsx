"use client";

import { motion } from "framer-motion";

// Tiled grain/noise SVG — layered over the hero image for a gritty "asphalt" feel,
// inspired by fairground.work's "asfalt-light" texture.
const GRAIN_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Background image */}
      <img
        src="/photos/full/sunset-racing-school-14-09-111.jpg"
        alt="Porsche 718 Cayman GT4 at speed on Algarve International Circuit"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        loading="eager"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />

      {/* Asphalt grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "240px 240px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-12 md:px-20 lg:px-28">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          DMITRY
          <br />
          <span className="text-[#e53935]">RACING</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-4 max-w-md text-lg sm:text-xl"
        >
          <span className="text-white/40">Portimão &middot; Estoril</span>
          <span className="text-white/80">
            {" "}
            &middot; Pacific Raceways &middot; The Ridge
          </span>
        </motion.p>

      </div>
    </section>
  );
}
