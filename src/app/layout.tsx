import "./globals.css";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/components/LocaleProvider";
import type { Locale } from "@/i18n/messages";

export const metadata = {
  title: "DMITRY RACING | Porsche 718 Cayman GT4 on Track",
  description:
    "Track photos of a red Porsche 718 Cayman GT4 at Algarve, Estoril, Pacific Raceways, and The Ridge Motorsports Park.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialLocale: Locale =
    cookieStore.get("lr_locale")?.value === "pt" ? "pt" : "en";

  return (
    <html lang={initialLocale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased font-[Inter,sans-serif]">
        <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
