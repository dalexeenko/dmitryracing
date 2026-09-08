import "./globals.css";
import { WebMCP } from "../components/WebMCP";

export const metadata = {
  metadataBase: new URL("https://hello.dmitryracing.com"),
  alternates: { canonical: "/" },
  title: "DMITRY RACING | Porsche 718 Cayman GT4 on Track",
  description:
    "Track photos of a red Porsche 718 Cayman GT4 at Algarve, Estoril, Pacific Raceways, and The Ridge Motorsports Park.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
        {children}
        <WebMCP />
      </body>
    </html>
  );
}
