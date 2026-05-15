"use client";

import { useState } from "react";
import type { CalendarEvent } from "@/lib/events";
import { useLocale } from "@/components/LocaleProvider";

function formatWhen(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso + "T12:00:00Z"));
  } catch {
    return iso;
  }
}

export default function EventsStrip({
  initialEvents,
}: {
  initialEvents: CalendarEvent[];
}) {
  const { t, locale } = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/notify", {
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

  return (
    <div className="border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/35">
            {t("eventsHeading")}
          </p>
          <ul className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {initialEvents.map((ev) => (
              <li
                key={ev.id}
                className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/80"
              >
                <span className="text-white/40">{formatWhen(ev.date, locale)}</span>
                <span className="mx-2 text-white/15">·</span>
                <span>{ev.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="shrink-0 border-t border-white/10 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          {status === "ok" ? (
            <p className="text-sm text-white/50">{t("eventsNotifyThanks")}</p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="text-xs text-white/45">{t("eventsNotify")}</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("eventsNotifyPlaceholder")}
                  className="w-44 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white outline-none placeholder:text-white/30 focus:border-white/30"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full bg-[#e53935]/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#e53935] disabled:opacity-50"
                >
                  {t("eventsNotifySubmit")}
                </button>
              </div>
              {status === "err" ? (
                <span className="text-xs text-red-400/80">Error</span>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
