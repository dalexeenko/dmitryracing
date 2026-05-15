"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { t, locale, setLocale } = useLocale();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#tracks", label: t("navTracks") },
    { href: "#guide", label: t("navGuide") },
    { href: "#story", label: t("navStory") },
    { href: "#gallery", label: t("navGallery") },
    { href: "#instructors", label: t("navInstructors") },
    { href: "#telemetry", label: t("navTelemetry") },
  ];

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -40 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={
        reduceMotion ? undefined : { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
      }
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
    >
      <nav
        className={`flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 px-2 py-2 shadow-[0_2px_1px_0_rgba(0,0,0,0.25)] backdrop-blur-md transition-[background-color,border-color,backdrop-filter] duration-300 sm:gap-2 sm:px-3 ${
          scrolled
            ? "bg-[rgba(15,15,15,0.75)] border-white/15"
            : "bg-[rgba(20,19,19,0.5)]"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold tracking-tight"
        >
          <span className="text-white">dmitry</span>
          <span className="text-[#e53935]">racing</span>
        </a>
        <span className="mx-1 h-5 w-px bg-white/10" aria-hidden />
        <ul className="flex flex-wrap items-center justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white sm:px-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" aria-hidden />
        <button
          type="button"
          onClick={() => setLocale(locale === "en" ? "pt" : "en")}
          className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
          aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para inglês"}
        >
          {t("navLocale")}
        </button>
      </nav>
    </motion.header>
  );
}
