import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Creator Forge | Diseño, Web, Branding e IA",
  description: "Estudio creativo y tecnológico especializado en diseño visual, desarrollo web, branding, inteligencia artificial y productos digitales para artistas, creadores, eventos y negocios.",
  metadataBase: new URL("https://creatorforge.co"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Creator Forge | Diseño, Web, Branding e IA",
    description: "Forjamos tu imagen digital.",
    type: "website",
    locale: "es_CO",
  },
  twitter: { card: "summary_large_image", title: "Creator Forge", description: "Forjamos tu imagen digital." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}><body>{children}</body></html>;
}
