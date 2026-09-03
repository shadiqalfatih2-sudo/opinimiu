import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Newsletter from "@/components/Newsletter";
import { dataPoints, topicLinks } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

export default async function Home() {
  const articles = await getPublishedArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const heroArticles = articles.slice(0, 3);

  return <>
    <section className="home-hero home-hero-editorial">
      <div className="hero-media" aria-hidden="true">
        <img src="/opinimiu-hero.webp" alt="" />
        <div className="hero-media-wash" />
        <div className="hero-media-grain" />
      </div>

      <div className="shell home-hero-content">
        <div className="hero-copy-wrap">
          <div className="hero-kicker hero-enter hero-enter-1">
            <span>Kanal opini & analisis</span><span className="dot" /><span>Sulawesi Tengah</span>
          </div>
          <h1 className="hero-enter hero-enter-2">Sulteng perlu dibicarakan <em>dengan data.</em></h1>
          <p className="hero-lead hero-enter hero-enter-3">Mengangkat isu penting, membaca program, dan melihat pembangunan Sulawesi Tengah dari lebih dari satu sisi—dekat, kritis, dan bisa diuji.</p>
          <div className="hero-actions hero-enter hero-enter-3">
            <Link href="/isu" className="hero-primary">Jelajahi isu <span>→</span></Link>
            <Link href="/tentang" className="hero-secondary">Tentang Opinimiu <span>→</span></Link>
          </div>
        </div>

        <div className="hero-preview-tray hero-enter hero-enter-4">
          <div className="hero-preview-head">
            <span>Terbaru dari Opinimiu</span>
            <Link href="/opini">Lihat semua tulisan →</Link>
          </div>
          <div className="hero-preview-grid">
            {heroArticles.map((article, index) => <article className={`hero-preview-card hero-preview-${index + 1}`} key={article.slug}>
              <div className="hero-preview-meta"><span>{article.category}</span><small>{article.readingTime}</small></div>
              <h2><Link href={`/opini/${article.slug}`}>{article.title}</Link></h2>
              <p>{article.excerpt}</p>
              <Link href={`/opini/${article.slug}`} className="hero-preview-link">Lihat selengkapnya <span>↗</span></Link>
            </article>)}
          </div>
        </div>
      </div>
    </section>

    <section className="home-principles shell">
      <article><span className="principle-icon principle-cyan">01</span><div><strong>Berbasis data</strong><p>Analisis dimulai dari konteks, data, dan sumber yang bisa diuji.</p></div></article>
      <article><span className="principle-icon principle-magenta">02</span><div><strong>Beragam perspektif</strong><p>Lebih dari satu sisi untuk isu publik yang memang tidak sederhana.</p></div></article>
      <article><span className="principle-icon principle-yellow">03</span><div><strong>Konstruktif untuk Sulteng</strong><p>Kritis tanpa kehilangan orientasi pada perbaikan dan nilai publik.</p></div></article>
    </section>

    <section className="featured shell section-pad">
      <div className="section-head"><span className="eyebrow">Sorotan utama</span><span>01 / Minggu ini</span></div>
      <div className="featured-grid">
        <Link href={`/opini/${featured.slug}`} className={`feature-visual ${featured.coverUrl ? "has-cover" : ""}`}>
          {featured.coverUrl ? <img src={featured.coverUrl} alt={`Cover ${featured.title}`} /> : <><div className="visual-noise" /><span className="visual-word">OPINI<br/>MIU</span></>}
          <div className="feature-shade" />
          <span className="visual-tag">{featured.category}</span>
          <span className="visual-caption">Satu isu. Lebih dari satu sisi.</span>
        </Link>
        <div className="feature-copy"><div className="meta"><span>{featured.label}</span><span>•</span><span>{featured.readingTime}</span></div><h2>{featured.title}</h2><p>{featured.excerpt}</p><div className="author-line"><span className="avatar">O</span><div><strong>{featured.author}</strong><small>{featured.publishedAt}</small></div></div><Link href={`/opini/${featured.slug}`} className="button-dark">Baca analisis →</Link></div>
      </div>
    </section>

    <section className="topics section-dark"><div className="shell section-pad"><div className="section-head light"><span className="eyebrow light">Yang sedang dibicarakan</span><span>Topik pilihan</span></div><div className="topic-list">{topicLinks.map((topic, i) => <Link href={`/isu?topik=${encodeURIComponent(topic)}`} key={topic}><span>{String(i + 1).padStart(2, "0")}</span>{topic}<b>↗</b></Link>)}</div></div></section>

    <section className="shell section-pad data-section"><div className="section-head"><span className="eyebrow">Data bicara</span><span>Konteks sebelum kesimpulan</span></div><div className="data-intro"><h2>Angka tidak bicara sendiri. <em>Konteks membuatnya berarti.</em></h2><p>Kami memakai data untuk memperjelas percakapan, bukan sekadar mempercantik argumen.</p></div><div className="data-grid">{dataPoints.map((d) => <div className="data-card" key={d.label}><strong>{d.value}</strong><span>{d.label}</span><p>{d.note}</p></div>)}</div></section>

    <section className="two-sides shell section-pad"><div className="section-head"><span className="eyebrow">Dua sisi</span><span>Karena kebijakan jarang sesederhana pro / kontra</span></div><div className="two-sides-title"><h2>Sebuah kebijakan hampir selalu punya lebih dari satu cerita.</h2></div><div className="side-grid"><article><span>Sudut A</span><h3>Apa yang sudah bekerja dan layak didukung?</h3><p>Melihat niat kebijakan, manfaat yang sudah muncul, serta peluang yang bisa diperbesar.</p><Link href="/opini">Baca perspektif →</Link></article><article><span>Sudut B</span><h3>Apa risiko yang perlu tetap diawasi?</h3><p>Menguji asumsi, distribusi manfaat, kualitas eksekusi, dan dampak yang mungkin terlewat.</p><Link href="/opini">Baca perspektif →</Link></article></div></section>

    <section className="latest shell section-pad"><div className="section-head"><span className="eyebrow">Tulisan terbaru</span><Link href="/opini">Lihat semua →</Link></div>{articles.slice(0,4).map((article, i) => <ArticleCard key={article.slug} article={article} index={i} />)}</section>
    <Newsletter />
  </>;
}
