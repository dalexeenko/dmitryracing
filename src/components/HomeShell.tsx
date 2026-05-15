"use client";

import { useState } from "react";
import Hero from "./Hero";
import Nav from "./Nav";
import TrackMaps from "./TrackMaps";
import Gallery from "./Gallery";
import Instructors from "./Instructors";
import StoryTimeline from "./StoryTimeline";
import TelemetryMapGate from "./TelemetryMapGate";
import TrackReferenceGuide from "./TrackReferenceGuide";
import { useLocale } from "./LocaleProvider";
import type { Album } from "@/types/album";

export default function HomeShell() {
  const [activeAlbum, setActiveAlbum] = useState<Album>("all");
  const { t } = useLocale();

  return (
    <>
      <Nav />
      <Hero />
      <TrackMaps activeAlbum={activeAlbum} onAlbumChange={setActiveAlbum} />
      <TrackReferenceGuide activeAlbum={activeAlbum} onPickAlbum={setActiveAlbum} />
      <StoryTimeline />
      <Gallery activeAlbum={activeAlbum} />
      <Instructors />

      <section
        id="telemetry"
        className="border-t border-white/5 px-6 py-16 sm:px-12 md:px-16"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-white/40">
            {t("telemetryHeading")}
          </h2>
          <p className="mb-8 max-w-2xl text-lg text-white/60">{t("telemetryLead")}</p>
          <TelemetryMapGate />
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <NewsletterForm />
          <div className="flex items-center justify-center gap-3 text-sm">
            <span>
              <span className="text-white/50">dmitry</span>
              <span className="text-[#e53935]/50">racing</span>
              <span className="text-white/30">.com</span>
            </span>
            <span className="text-white/20">&middot;</span>
            <a
              href="https://www.instagram.com/gt4.adventures"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 transition-colors hover:text-white/50"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <span className="text-white/20">&middot;</span>
            <a
              href="https://dmitry.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 transition-colors hover:text-white/50"
            >
              dmitry.pt
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function NewsletterForm() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <p className="text-sm text-white/50" role="status">
        {t("footerNewsletterThanks")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:items-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
        {t("footerNewsletter")}
      </span>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("footerNewsletterPlaceholder")}
        className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 disabled:opacity-50"
      >
        {t("footerNewsletterSubmit")}
      </button>
      {status === "err" ? (
        <span className="text-xs text-red-400/80">Error</span>
      ) : null}
    </form>
  );
}
