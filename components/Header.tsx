import Link from "next/link";
import Brand from "./Brand";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export default function Header() {
  const nav = (
    <>
      <Link href="/opini">OPINI</Link>
      <Link href="/isu">ISU <span aria-hidden="true">⌄</span></Link>
      <Link href="/program">PROGRAM <span aria-hidden="true">⌄</span></Link>
      <Link href="/data">DATA <span aria-hidden="true">⌄</span></Link>
      <Link href="/tentang">TENTANG <span aria-hidden="true">⌄</span></Link>
    </>
  );

  return (
    <header className="site-header portal-header">
      <div className="portal-topbar">
        <div className="shell portal-topbar-inner">
          <span>OPINIMIU | SUARA JERNIH UNTUK SULAWESI TENGAH</span>
          <div>
            <span className="portal-language">BAHASA: 🇮🇩</span>
            <Link href="/admin/login">EDITORIAL</Link>
          </div>
        </div>
      </div>

      <div className="portal-mainbar">
        <div className="shell portal-mainbar-inner">
          <Brand />
          <nav className="portal-desktop-nav" aria-label="Navigasi utama">{nav}</nav>
          <div className="portal-header-actions">
            <Link href="/cari" className="portal-search" aria-label="Cari">
              <SearchIcon />
            </Link>
            <details className="portal-mobile-menu">
              <summary aria-label="Buka menu"><span /><span /><span /></summary>
              <nav aria-label="Navigasi mobile">
                {nav}
                <Link href="/cari">CARI</Link>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
