import Link from "next/link";
import Brand from "./Brand";

export default function Footer() {
  return <footer className="footer"><div className="shell footer-grid"><div><Brand /><p>Dari akar rumput, dengan data, untuk pembangunan Sulawesi Tengah.</p></div><div><span className="eyebrow">Jelajahi</span><Link href="/opini">Opini</Link><Link href="/isu">Isu</Link><Link href="/program">Program</Link><Link href="/data">Data</Link><Link href="/cari">Cari</Link></div><div><span className="eyebrow">Opinimiu</span><Link href="/tentang">Tentang</Link><a href="https://instagram.com/opinimiu.clb" target="_blank" rel="noreferrer">Instagram ↗</a><a href="/feed.xml">RSS ↗</a><Link href="/admin/login">Editorial login</Link></div></div><div className="shell footer-bottom">© 2026 Opinimiu. Opini yang datang dengan data, terasa dekat dengan kita.</div></footer>;
}
