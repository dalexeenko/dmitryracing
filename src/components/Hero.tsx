"use client";

import { motion } from "framer-motion";
import { useLocale } from "./LocaleProvider";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { vinextImageUrl } from "@/lib/optimized-image";

const HERO_IMAGE = "/photos/full/sunset-racing-school-14-09-111.jpg";
const HERO_SRCSET = [
  `${vinextImageUrl(HERO_IMAGE, 640, 75)} 640w`,
  `${vinextImageUrl(HERO_IMAGE, 1080, 78)} 1080w`,
  `${vinextImageUrl(HERO_IMAGE, 1920, 80)} 1920w`,
].join(", ");

const GRAIN_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useLocale();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden">
      <img
        src={vinextImageUrl(HERO_IMAGE, 1920, 80)}
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt="Porsche 718 Cayman GT4 at speed on Algarve International Circuit"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "240px 240px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-12 md:px-20 lg:px-28">
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.9, delay: 0.25, ease }}
          className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          DMITRY
          <br />
          <span className="text-[#e53935]">RACING</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.8, delay: 0.45, ease }}
          className="mt-4 max-w-md text-lg sm:text-xl text-white/80"
        >
          {t("heroSubtitle")}
        </motion.p>
      </div>
    </section>
  );
}
