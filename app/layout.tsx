import type { Metadata } from "next";
import "./globals.css";
import "./article.css";
import "./admin/admin.css";
import "./admin/enhancements.css";
import "./stage2.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://opinimiu.vercel.app"),
  title: { default: "Opinimiu — Opini & Analisis Sulawesi Tengah", template: "%s — Opinimiu" },
  description: "Kanal opini, analisis, data, dan perspektif muda tentang pembangunan Sulawesi Tengah.",
  openGraph: {
    siteName: "Opinimiu",
    type: "website",
    locale: "id_ID",
    title: "Opinimiu — Opini & Analisis Sulawesi Tengah",
    description: "Opini yang datang dengan data, terasa dekat dengan kita."
  },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
