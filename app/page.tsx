import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import { dataPoints, topicLinks } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

export default async function Home() {
  const articles = await getPublishedArticles();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles.slice(0, 3);

  return (
    <>
      <section className="ub-home-intro">
        <div className="shell ub-home-intro-copy">
          <span className="ub-kicker">OPINI • ANALISIS • DATA SULAWESI TENGAH</span>
          <h1>Sulteng perlu dibicarakan <em>dengan data.</em></h1>
          <p>Ruang independen untuk membaca isu, memantau program, dan memahami pembangunan Sulawesi Tengah dengan konteks yang jernih.</p>
        </div>
        <div className="shell ub-hero-carousel" aria-label="Sorotan Sulawesi Tengah">
          <img src="/opinimiu-hero.webp" alt="Pemandangan Sulawesi Tengah" />
          <div className="ub-hero-scrim" />
          <div className="ub-hero-caption"><span>SULAWESI TENGAH</span><h2>Lebih dekat dengan daerah, lebih jernih membaca arah.</h2></div>
          <div className="ub-hero-location">Palu • Sulawesi Tengah</div>
          <span className="ub-slider-arrow ub-slider-left">‹</span><span className="ub-slider-arrow ub-slider-right">›</span>
        </div>
      </section>

      <section className="ub-impact-band">
        <div className="shell ub-impact-grid">
          <div className="ub-impact-media"><img src="/opinimiu-hero.webp" alt="Cerita dan pembangunan Sulawesi Tengah" /><span className="ub-play">▶</span><span className="ub-impact-media-label">SUARA DARI SULTENG</span></div>
          <div className="ub-impact-copy"><span className="ub-kicker light">SULTENG BERDAMPAK</span><h2>Membaca pembangunan dari dekat.</h2><p>Opinimiu menghubungkan data, kebijakan, dan pengalaman masyarakat agar pembicaraan tentang Sulawesi Tengah tidak berhenti pada headline.</p><div className="ub-impact-actions"><Link className="ub-btn ub-btn-orange" href="/opini">Baca tulisan terbaru</Link><Link className="ub-btn ub-btn-green" href="/tentang">Tentang Opinimiu</Link></div></div>
        </div>
      </section>

      <section className="ub-news-section"><div className="shell"><div className="ub-section-title"><div><span className="ub-kicker">SOROTAN UTAMA</span><h2>Berita & analisis Opinimiu</h2></div><Link href="/opini">Lihat semua tulisan →</Link></div><div className="ub-news-grid">{latest.map((article)=><article className="ub-news-card" key={article.slug}><Link href={`/opini/${article.slug}`} className="ub-news-image"><img src={article.coverUrl || "/opinimiu-hero.webp"} alt={article.title}/><span>{article.label}</span></Link><div className="ub-news-copy"><h3><Link href={`/opini/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><small>{article.publishedAt} • {article.readingTime}</small></div></article>)}</div></div></section>

      <section className="ub-three-panels"><div className="shell ub-three-grid"><div className="ub-panel ub-panel-light"><span className="ub-kicker">FOKUS ISU</span><h2>Yang sedang dibicarakan</h2><div className="ub-link-list">{topicLinks.slice(0,4).map((topic)=><Link key={topic} href={`/opini?topik=${encodeURIComponent(topic)}`}>{topic}<span>→</span></Link>)}</div><Link className="ub-panel-button" href="/isu">Semua isu</Link></div><div className="ub-panel ub-panel-navy"><span className="ub-kicker light">PROGRAM DALAM PANTAUAN</span><h2>Kebijakan perlu dilihat progresnya</h2><div className="ub-date-list"><div><b>01</b><p>Fiskal & Dana Bagi Hasil</p></div><div><b>02</b><p>Hilirisasi & Industri</p></div><div><b>03</b><p>Infrastruktur & Konektivitas</p></div></div><Link className="ub-panel-button inverse" href="/program">Lihat program</Link></div><div className="ub-panel ub-panel-light"><span className="ub-kicker">DATA TERBUKA</span><h2>Angka dengan konteks</h2><div className="ub-link-list ub-data-list">{dataPoints.map((point)=><Link key={point.label} href="/data"><strong>{point.value}</strong><span>{point.label}</span></Link>)}</div><Link className="ub-panel-button" href="/data">Pusat data</Link></div></div></section>

      <section className="ub-numbers"><div className="shell"><div className="ub-section-title centered"><div><span className="ub-kicker">SULTENG DALAM ANGKA</span><h2>Data untuk memahami, bukan sekadar mengetahui.</h2></div></div><div className="ub-number-grid"><div><strong>13</strong><span>Kabupaten/Kota</span></div><div><strong>{topicLinks.length}</strong><span>Isu Prioritas</span></div><div><strong>{articles.length}+</strong><span>Tulisan Terbit</span></div><div><strong>1</strong><span>Fokus: Sulawesi Tengah</span></div></div></div></section>

      <section className="ub-principles"><div className="shell"><div className="ub-section-title centered"><div><span className="ub-kicker">CARA KAMI BEKERJA</span><h2>Jernih, dekat, dan dapat diperiksa.</h2></div></div><div className="ub-principle-grid"><div><span>01</span><strong>Berbasis Data</strong><p>Sumber dan konteks menjadi dasar pembacaan.</p></div><div><span>02</span><strong>Lebih dari Satu Sisi</strong><p>Isu publik dibaca tanpa menyederhanakan trade-off.</p></div><div><span>03</span><strong>Fokus Sulteng</strong><p>Daerah, warga, dan dampak lokal berada di pusat cerita.</p></div><div><span>04</span><strong>Konstruktif</strong><p>Kritik diarahkan pada perbaikan, bukan kebisingan.</p></div><div><span>05</span><strong>Terus Diperbarui</strong><p>Pembacaan berubah ketika data dan kondisi berubah.</p></div></div></div></section>

      {featured && <section className="ub-feature-callout"><div className="shell ub-feature-callout-grid"><div><span className="ub-kicker light">PILIHAN REDAKSI</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><Link className="ub-btn ub-btn-orange" href={`/opini/${featured.slug}`}>Baca selengkapnya</Link></div><div className="ub-feature-callout-image"><img src={featured.coverUrl || "/opinimiu-hero.webp"} alt={featured.title}/></div></div></section>}
      <Newsletter />
    </>
  );
}
