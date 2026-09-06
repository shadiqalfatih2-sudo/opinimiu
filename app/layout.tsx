import type { Metadata } from "next";
import "./globals.css";
import "./article.css";
import "./admin/admin.css";
import "./admin/enhancements.css";
import "./stage2.css";
import "./motion-refresh.css";
import "./ou-rebuild.css";
import "./webmedia-rebuild.css";
import "./ub-theme.css";
import "./logo-fix.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://opinimiu.vercel.app"),
  title: { default: "Opinimiu — Opini & Analisis Sulawesi Tengah", template: "%s — Opinimiu" },
  description: "Kanal opini, analisis, data, dan perspektif tentang pembangunan Sulawesi Tengah.",
  openGraph: {
    siteName: "Opinimiu",
    type: "website",
    locale: "id_ID",
    title: "Opinimiu — Opini & Analisis Sulawesi Tengah",
    description: "Sulteng perlu dibicarakan dengan data."
  },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
