import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Creator Forge — Diseño, desarrollo web y productos digitales",
  description: "Estudio creativo independiente que desarrolla identidades, páginas web y productos digitales para artistas, eventos, creadores y negocios.",
  metadataBase: new URL("https://creator-forge-six.vercel.app"),
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Creator Forge — Diseño, desarrollo web y productos digitales",
    description: "Estudio creativo independiente que desarrolla identidades, páginas web y productos digitales para artistas, eventos, creadores y negocios.",
    type: "website",
    locale: "es_CO",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Creator Forge - Diseño, desarrollo web y productos digitales" }],
  },
  twitter: { card: "summary_large_image", title: "Creator Forge — Diseño, desarrollo web y productos digitales", description: "Estudio creativo independiente que desarrolla identidades, páginas web y productos digitales para artistas, eventos, creadores y negocios.", images: ["/opengraph-image"] },
};

export const viewport: Viewport = { themeColor: "#0b0b0b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}><body>{children}</body></html>;
}
