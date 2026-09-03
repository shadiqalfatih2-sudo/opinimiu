import type { Metadata } from "next";
import "./globals.css";
import "./admin/admin.css";
import "./admin/enhancements.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { default: "Opinimiu — Opini & Analisis Sulawesi Tengah", template: "%s — Opinimiu" },
  description: "Kanal opini, analisis, data, dan perspektif muda tentang pembangunan Sulawesi Tengah."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
