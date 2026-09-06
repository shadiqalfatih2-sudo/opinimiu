import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import { dataPoints, topicLinks } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

const heroImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tahura-Kapopo1.jpg/1600px-Tahura-Kapopo1.jpg";

export default async function Home() {
  const articles = await getPublishedArticles();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles.slice(0, 3);

  return (
    <>
      <section className="portal-home-hero">
        <div className="shell">
          <figure className="portal-hero-frame">
            <img src={heroImage} alt="Pemandangan Tahura Kapopo, Sigi, Sulawesi Tengah" fetchPriority="high" />
            <div className="portal-hero-shade" />
            <div className="portal-hero-badge">SULAWESI TENGAH</div>
            <figcaption className="portal-hero-caption">
              <div>
                <span>FOKUS DAERAH</span>
                <strong>Lebih dekat dengan daerah, lebih jernih membaca arah.</strong>
              </div>
              <small>Foto: Johntaufan / Wikimedia Commons · CC BY-SA 4.0</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="portal-intro">
        <div className="shell portal-intro-grid">
          <div>
            <span className="portal-kicker">OPINI • ANALISIS • DATA SULAWESI TENGAH</span>
            <h1>Sulteng perlu dibicarakan <em>dengan data.</em></h1>
          </div>
          <p>Ruang independen untuk membaca isu, memantau program, dan memahami pembangunan Sulawesi Tengah dengan konteks yang jernih, kritis, dan tetap konstruktif.</p>
        </div>
      </section>

      <section className="portal-impact">
        <div className="shell portal-impact-grid">
          <div className="portal-impact-media">
            <img src={heroImage} alt="Lanskap Sulawesi Tengah" loading="lazy" />
            <span className="portal-impact-label">SUARA DARI SULTENG</span>
          </div>
          <div className="portal-impact-copy">
            <span className="portal-kicker portal-kicker-light">SULTENG BERDAMPAK</span>
            <h2>Membaca pembangunan dari dekat.</h2>
            <p>Opinimiu menghubungkan data, kebijakan, dan pengalaman masyarakat agar pembicaraan tentang Sulawesi Tengah tidak berhenti pada headline.</p>
            <div className="portal-actions">
              <Link className="portal-btn portal-btn-orange" href="/opini">Baca tulisan terbaru</Link>
              <Link className="portal-btn portal-btn-light" href="/tentang">Tentang Opinimiu</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="portal-section portal-news">
        <div className="shell">
          <div className="portal-section-heading">
            <div><span className="portal-kicker">SOROTAN UTAMA</span><h2>Berita & analisis Opinimiu</h2></div>
            <Link href="/opini">Lihat semua tulisan →</Link>
          </div>
          <div className="portal-news-grid">
            {latest.map((article) => (
              <article className="portal-news-card" key={article.slug}>
                <Link href={`/opini/${article.slug}`} className="portal-news-image">
                  <img src={article.coverUrl || heroImage} alt={article.title} loading="lazy" />
                  <span>{article.label}</span>
                </Link>
                <div className="portal-news-copy">
                  <h3><Link href={`/opini/${article.slug}`}>{article.title}</Link></h3>
                  <p>{article.excerpt}</p>
                  <small>{article.publishedAt} • {article.readingTime}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portal-section portal-panels">
        <div className="shell portal-panel-grid">
          <div className="portal-panel portal-panel-white">
            <span className="portal-kicker">FOKUS ISU</span>
            <h2>Yang sedang dibicarakan</h2>
            <div className="portal-link-list">{topicLinks.slice(0, 4).map((topic) => <Link key={topic} href={`/opini?topik=${encodeURIComponent(topic)}`}>{topic}<span>→</span></Link>)}</div>
            <Link className="portal-panel-button" href="/isu">Semua isu</Link>
          </div>
          <div className="portal-panel portal-panel-navy">
            <span className="portal-kicker portal-kicker-light">PROGRAM DALAM PANTAUAN</span>
            <h2>Kebijakan perlu dilihat progresnya</h2>
            <div className="portal-program-list">
              <div><b>01</b><p>Fiskal & Dana Bagi Hasil</p></div>
              <div><b>02</b><p>Hilirisasi & Industri</p></div>
              <div><b>03</b><p>Infrastruktur & Konektivitas</p></div>
            </div>
            <Link className="portal-panel-button portal-panel-button-light" href="/program">Lihat program</Link>
          </div>
          <div className="portal-panel portal-panel-white">
            <span className="portal-kicker">DATA TERBUKA</span>
            <h2>Angka dengan konteks</h2>
            <div className="portal-link-list portal-data-list">{dataPoints.map((point) => <Link key={point.label} href="/data"><strong>{point.value}</strong><span>{point.label}</span></Link>)}</div>
            <Link className="portal-panel-button" href="/data">Pusat data</Link>
          </div>
        </div>
      </section>

      <section className="portal-numbers">
        <div className="shell">
          <div className="portal-section-heading portal-section-heading-center"><div><span className="portal-kicker">SULTENG DALAM ANGKA</span><h2>Data untuk memahami, bukan sekadar mengetahui.</h2></div></div>
          <div className="portal-number-grid">
            <div><strong>13</strong><span>Kabupaten/Kota</span></div>
            <div><strong>{topicLinks.length}</strong><span>Isu Prioritas</span></div>
            <div><strong>{articles.length}+</strong><span>Tulisan Terbit</span></div>
            <div><strong>1</strong><span>Fokus: Sulawesi Tengah</span></div>
          </div>
        </div>
      </section>

      <section className="portal-section portal-principles">
        <div className="shell">
          <div className="portal-section-heading portal-section-heading-center"><div><span className="portal-kicker">CARA KAMI BEKERJA</span><h2>Jernih, dekat, dan dapat diperiksa.</h2></div></div>
          <div className="portal-principle-grid">
            <div><span>01</span><strong>Berbasis Data</strong><p>Sumber dan konteks menjadi dasar pembacaan.</p></div>
            <div><span>02</span><strong>Lebih dari Satu Sisi</strong><p>Isu publik dibaca tanpa menyederhanakan trade-off.</p></div>
            <div><span>03</span><strong>Fokus Sulteng</strong><p>Daerah, warga, dan dampak lokal berada di pusat cerita.</p></div>
            <div><span>04</span><strong>Konstruktif</strong><p>Kritik diarahkan pada perbaikan, bukan kebisingan.</p></div>
            <div><span>05</span><strong>Terus Diperbarui</strong><p>Pembacaan berubah ketika data dan kondisi berubah.</p></div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="portal-feature">
          <div className="shell portal-feature-grid">
            <div>
              <span className="portal-kicker portal-kicker-light">PILIHAN REDAKSI</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <Link className="portal-btn portal-btn-orange" href={`/opini/${featured.slug}`}>Baca selengkapnya</Link>
            </div>
            <div className="portal-feature-image"><img src={featured.coverUrl || heroImage} alt={featured.title} loading="lazy" /></div>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  );
}
