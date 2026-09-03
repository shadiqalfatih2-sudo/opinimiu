import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Newsletter from "@/components/Newsletter";
import { dataPoints, topicLinks } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

export default async function Home() {
  const articles = await getPublishedArticles();
  const featured = articles.find((a) => a.featured) ?? articles[0];

  return <>
    <section className="home-hero">
      <div className="hero-media" aria-hidden="true">
        <img src="https://beraniapp.com/images/palu-bay.png" alt="" />
        <div className="hero-media-wash" />
        <div className="hero-media-grain" />
      </div>
      <div className="shell home-hero-content">
        <div className="hero-kicker hero-enter hero-enter-1"><span>Sulawesi Tengah</span><span className="dot" /><span>Opini · Data · Perspektif</span></div>
        <div className="hero-copy-wrap">
          <h1 className="hero-enter hero-enter-2">Sulteng perlu dibicarakan <em>dengan data.</em></h1>
          <div className="hero-intro hero-enter hero-enter-3">
            <p>Ruang editorial untuk membaca program, isu, dan pembangunan Sulawesi Tengah dari lebih dari satu sisi—dekat, kritis, dan bisa diuji.</p>
            <Link href="/isu" className="hero-action">Jelajahi isu <span>↘</span></Link>
          </div>
        </div>
        <div className="hero-foot hero-enter hero-enter-4">
          <span>Opinimiu · 2026</span>
          <span className="hero-scroll"><i /> Scroll untuk membaca</span>
        </div>
      </div>
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
