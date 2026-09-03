import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import { dataPoints, topicLinks } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

export default async function Home() {
  const articles = await getPublishedArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const latest = articles.slice(0, 6);

  return <>
    <section className="ou-alert-strip">
      <div className="shell ou-alert-inner">
        <strong>Sorotan Opinimiu</strong>
        <span>Membaca Sulawesi Tengah dengan data, konteks, dan lebih dari satu perspektif.</span>
        <Link href="/opini">Lihat tulisan terbaru →</Link>
      </div>
    </section>

    <section className="ou-home-hero">
      <div className="ou-hero-copy">
        <div className="ou-hero-copy-inner">
          <span className="ou-kicker">Dari akar rumput • untuk pembangunan Sulawesi Tengah</span>
          <h1>Sulteng perlu dibicarakan <em>dengan data.</em></h1>
          <p>Opinimiu adalah ruang opini dan analisis untuk membaca isu, program, serta arah pembangunan daerah secara dekat, kritis, dan tetap konstruktif.</p>
          <div className="ou-hero-actions">
            <Link href="/opini" className="ou-btn ou-btn-light">Baca opini <span>→</span></Link>
            <Link href="/tentang" className="ou-text-link">Kenali Opinimiu <span>→</span></Link>
          </div>
        </div>
      </div>
      <div className="ou-hero-image">
        <img src="/opinimiu-hero.webp" alt="Pemandangan Teluk Palu dan Kota Palu" />
        <div className="ou-hero-image-label"><span>Sulawesi Tengah</span><strong>Data. Perspektif. Dampak.</strong></div>
      </div>
    </section>

    <section className="ou-finder shell">
      <div className="ou-finder-head">
        <span className="ou-section-label">Temukan yang ingin kamu pahami</span>
        <h2>Mulai dari isu yang dekat denganmu.</h2>
      </div>
      <form action="/cari" className="ou-search-box">
        <label htmlFor="home-search">Cari opini, program, atau isu</label>
        <div className="ou-search-control">
          <input id="home-search" name="q" placeholder="Contoh: DBH, pendidikan, investasi, anak muda…" />
          <button type="submit">Cari <span>⌕</span></button>
        </div>
      </form>
      <div className="ou-topic-pills">
        {topicLinks.slice(0, 6).map((topic) => <Link key={topic} href={`/opini?topik=${encodeURIComponent(topic)}`}>{topic}<span>→</span></Link>)}
      </div>
    </section>

    <section className="ou-benefit-band">
      <div className="shell ou-benefit-grid">
        <article><span className="accent accent-cyan"/><strong>Berbasis data</strong><p>Argumen dimulai dari konteks dan sumber yang bisa diuji.</p></article>
        <article><span className="accent accent-magenta"/><strong>Lebih dari satu sisi</strong><p>Kebijakan publik jarang sesederhana pro dan kontra.</p></article>
        <article><span className="accent accent-yellow"/><strong>Fokus Sulteng</strong><p>Isu lokal, program daerah, dan dampaknya bagi masyarakat.</p></article>
      </div>
    </section>

    <section className="shell ou-section ou-feature-section">
      <div className="ou-section-heading">
        <div><span className="ou-section-label">Sorotan utama</span><h2>Yang layak dibaca minggu ini.</h2></div>
        <Link href="/opini">Semua tulisan →</Link>
      </div>
      <div className="ou-feature-layout">
        <Link href={`/opini/${featured.slug}`} className="ou-feature-image">
          {featured.coverUrl ? <img src={featured.coverUrl} alt={featured.title} /> : <div className="ou-feature-placeholder"><span>OPINI</span><b>MIU</b></div>}
          <span className="ou-feature-tag">{featured.category}</span>
        </Link>
        <div className="ou-feature-content">
          <div className="ou-meta"><span>{featured.label}</span><span>{featured.readingTime}</span></div>
          <h3>{featured.title}</h3>
          <p>{featured.excerpt}</p>
          <div className="ou-author"><strong>{featured.author}</strong><span>{featured.publishedAt}</span></div>
          <Link href={`/opini/${featured.slug}`} className="ou-btn ou-btn-dark">Baca selengkapnya <span>→</span></Link>
        </div>
      </div>
    </section>

    <section className="ou-modules-section">
      <div className="shell ou-section">
        <div className="ou-section-heading light">
          <div><span className="ou-section-label">Jelajahi Opinimiu</span><h2>Banyak pintu untuk memahami satu daerah.</h2></div>
        </div>
        <div className="ou-module-grid">
          <Link href="/isu" className="ou-module-card card-cyan"><span>01</span><h3>Isu</h3><p>Peta isu yang sedang membentuk percakapan publik Sulawesi Tengah.</p><b>Jelajahi isu →</b></Link>
          <Link href="/program" className="ou-module-card card-yellow"><span>02</span><h3>Program</h3><p>Pantau program publik, tujuan, eksekusi, dan dampaknya.</p><b>Lihat program →</b></Link>
          <Link href="/data" className="ou-module-card card-magenta"><span>03</span><h3>Data</h3><p>Angka yang ditempatkan dalam konteks agar lebih mudah dipahami.</p><b>Buka data →</b></Link>
          <Link href="/tentang" className="ou-module-card card-white"><span>04</span><h3>Perspektif</h3><p>Kenapa Opinimiu memilih dekat, kritis, berbasis data, dan konstruktif.</p><b>Tentang kami →</b></Link>
        </div>
      </div>
    </section>

    <section className="shell ou-section ou-data-section">
      <div className="ou-section-heading">
        <div><span className="ou-section-label">Data bicara</span><h2>Konteks sebelum kesimpulan.</h2></div>
        <Link href="/data">Lihat pusat data →</Link>
      </div>
      <div className="ou-data-grid">
        {dataPoints.map((d, i) => <article key={d.label}><small>0{i + 1}</small><strong>{d.value}</strong><span>{d.label}</span><p>{d.note}</p></article>)}
      </div>
    </section>

    <section className="ou-latest-section">
      <div className="shell ou-section">
        <div className="ou-section-heading">
          <div><span className="ou-section-label">Tulisan terbaru</span><h2>Terus ikuti percakapan.</h2></div>
          <Link href="/opini">Lihat semua →</Link>
        </div>
        <div className="ou-latest-grid">
          {latest.map((article, index) => <article className="ou-latest-card" key={article.slug}>
            <div className="ou-latest-top"><span>{String(index + 1).padStart(2,"0")}</span><small>{article.category}</small></div>
            <h3><Link href={`/opini/${article.slug}`}>{article.title}</Link></h3>
            <p>{article.excerpt}</p>
            <div className="ou-latest-bottom"><span>{article.readingTime}</span><Link href={`/opini/${article.slug}`}>Baca →</Link></div>
          </article>)}
        </div>
      </div>
    </section>

    <Newsletter />
  </>;
}
