import Link from "next/link";
import Brand from "./Brand";

export default function Header() {
  return (
    <header className="site-header ub-header">
      <div className="ub-topbar"><div className="shell ub-topbar-inner"><span>OPINIMIU | SUARA JERNIH UNTUK SULAWESI TENGAH</span><div><span className="ub-language">BAHASA: 🇮🇩</span><Link href="/admin/login">EDITORIAL</Link></div></div></div>
      <div className="ub-mainnav">
        <div className="shell ub-mainnav-inner"><Brand /><nav className="ub-desktop-nav" aria-label="Navigasi utama"><Link href="/opini">OPINI</Link><Link href="/isu">ISU <span>⌄</span></Link><Link href="/program">PROGRAM <span>⌄</span></Link><Link href="/data">DATA <span>⌄</span></Link><Link href="/tentang">TENTANG <span>⌄</span></Link></nav><Link href="/cari" className="ub-header-search" aria-label="Cari">⌕</Link></div>
        <nav className="shell ub-mobile-nav" aria-label="Navigasi mobile"><Link href="/opini">Opini</Link><Link href="/isu">Isu</Link><Link href="/program">Program</Link><Link href="/data">Data</Link><Link href="/tentang">Tentang</Link><Link href="/cari">Cari</Link></nav>
      </div>
    </header>
  );
}
