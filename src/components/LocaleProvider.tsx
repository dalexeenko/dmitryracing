"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/messages";
import { messages, type MessageKey } from "@/i18n/messages";

const LOCALE_COOKIE = "lr_locale";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: MessageKey) => string;
  unit: "metric" | "imperial";
  setUnit: (u: "metric" | "imperial") => void;
};

const LocaleContext = createContext<Ctx | null>(null);

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [unit, setUnitState] = useState<"metric" | "imperial">("metric");

  useEffect(() => {
    document.documentElement.lang = locale;
    const u = readCookie("lr_unit");
    if (u === "imperial" || u === "metric") setUnitState(u);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;SameSite=Lax`;
  }, []);

  const setUnit = useCallback((u: "metric" | "imperial") => {
    setUnitState(u);
    document.cookie = `lr_unit=${u};path=/;max-age=31536000;SameSite=Lax`;
  }, []);

  const t = useCallback(
    (key: MessageKey) => messages[locale][key] ?? messages.en[key] ?? key,
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, unit, setUnit }),
    [locale, setLocale, t, unit, setUnit],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Ctx {
  const c = useContext(LocaleContext);
  if (!c) throw new Error("useLocale must be used within LocaleProvider");
  return c;
}
