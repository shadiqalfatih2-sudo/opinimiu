import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata: Metadata = { title: { default: "Opinimiu — Opini & Analisis Sulawesi Tengah", template: "%s — Opinimiu" }, description: "Kanal opini, analisis, data, dan perspektif muda tentang pembangunan Sulawesi Tengah." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body><Header /><main>{children}</main><Footer /></body></html>; }
