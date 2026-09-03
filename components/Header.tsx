import Link from "next/link";
import Brand from "./Brand";
export default function Header() {
  return <header className="site-header"><div className="shell header-inner"><Brand /><nav className="desktop-nav" aria-label="Navigasi utama"><Link href="/isu">Isu</Link><Link href="/opini">Opini</Link><Link href="/program">Program</Link><Link href="/data">Data</Link><Link href="/tentang">Tentang</Link></nav><Link className="header-cta" href="/opini">Jelajahi tulisan</Link></div></header>;
}
