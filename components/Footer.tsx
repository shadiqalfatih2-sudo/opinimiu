import Link from "next/link";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="footer ub-footer">
      <div className="shell ub-footer-grid">
        <div className="ub-footer-brand"><Brand /><p>Media opini, analisis, program, dan data untuk membaca Sulawesi Tengah dengan lebih jernih.</p><div className="ub-socials"><a href="https://instagram.com/opinimiu.clb" target="_blank" rel="noreferrer">IG</a><a href="/feed.xml">RSS</a></div></div>
        <div><h3>Jelajahi</h3><Link href="/">Beranda</Link><Link href="/opini">Opini</Link><Link href="/isu">Isu</Link><Link href="/program">Program</Link><Link href="/data">Data</Link></div>
        <div><h3>Topik</h3><Link href="/opini?topik=Ekonomi">Ekonomi</Link><Link href="/opini?topik=Pemerintahan">Pemerintahan</Link><Link href="/opini?topik=Pendidikan">Pendidikan</Link><Link href="/opini?topik=Lingkungan">Lingkungan</Link><Link href="/opini?topik=Infrastruktur">Infrastruktur</Link></div>
        <div><h3>Sumber Daya</h3><Link href="/tentang">Tentang Opinimiu</Link><Link href="/cari">Pencarian</Link><a href="/feed.xml">RSS</a><Link href="/admin/login">Editorial</Link></div>
      </div>
      <div className="shell ub-footer-bottom"><span>© 2026 Opinimiu. Semua hak dilindungi.</span><span>Dari Sulawesi Tengah, untuk Indonesia.</span></div>
    </footer>
  );
}
