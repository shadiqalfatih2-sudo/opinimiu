import Link from "next/link";
import Brand from "./Brand";

export default function Header() {
  return (
    <header className="site-header ou-header">
      <div className="ou-utility-bar">
        <div className="shell ou-utility-inner">
          <div className="ou-utility-label">Opini • Analisis • Data Sulawesi Tengah</div>
          <div className="ou-utility-links">
            <Link href="/tentang">Tentang</Link>
            <Link href="/feed.xml">RSS</Link>
            <Link href="/admin/login">Editorial</Link>
          </div>
        </div>
      </div>

      <div className="ou-brand-row shell">
        <Brand />
        <div className="ou-brand-actions">
          <Link href="/cari" className="ou-search-link" aria-label="Cari tulisan">Cari tulisan <span>⌕</span></Link>
          <Link href="/opini" className="ou-highlight-link">Jelajahi tulisan <span>→</span></Link>
        </div>
      </div>

      <div className="ou-nav-row">
        <div className="shell ou-nav-inner">
          <nav className="desktop-nav ou-primary-nav" aria-label="Navigasi utama">
            <Link href="/isu">Isu</Link>
            <Link href="/opini">Opini</Link>
            <Link href="/program">Program</Link>
            <Link href="/data">Data</Link>
            <Link href="/tentang">Tentang Opinimiu</Link>
          </nav>
          <Link href="/cari" className="ou-nav-search">Cari <span>⌕</span></Link>
        </div>
      </div>
    </header>
  );
}
