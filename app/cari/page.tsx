import Link from "next/link";
import { getPublishedArticles } from "@/lib/articles";

export const metadata = { title: "Cari" };
export const dynamic = "force-dynamic";

type SearchProps = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: SearchProps) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLocaleLowerCase("id-ID");
  const articles = await getPublishedArticles();
  const results = query
    ? articles.filter((article: any) => [article.title, article.excerpt, article.category, article.label, article.author].join(" ").toLocaleLowerCase("id-ID").includes(query))
    : [];

  return <section className="shell page-top search-page">
    <div className="page-hero search-hero"><span className="eyebrow">Pencarian</span><h1>Temukan percakapan yang kamu cari.</h1><p>Cari opini, analisis, program, dan isu Sulawesi Tengah dari arsip Opinimiu.</p></div>
    <form className="search-form" action="/cari" method="get"><input name="q" type="search" defaultValue={q} placeholder="Contoh: DBH, pendidikan, anak muda..." aria-label="Cari artikel" autoFocus /><button type="submit">Cari →</button></form>
    {query ? <div className="search-summary"><strong>{results.length}</strong><span>hasil untuk “{q}”</span></div> : <div className="search-empty"><strong>Mulai dengan satu kata kunci.</strong><p>Ketik isu, program, wilayah, atau topik yang ingin kamu baca.</p></div>}
    {query && results.length === 0 && <div className="search-empty"><strong>Belum ada tulisan yang cocok.</strong><p>Coba kata kunci yang lebih umum atau jelajahi semua opini.</p><Link href="/opini">Lihat semua opini →</Link></div>}
    <div className="search-results">{results.map((article: any, index: number) => <article key={article.slug} className="search-result"><span className="search-index">{String(index + 1).padStart(2, "0")}</span><div><div className="meta"><span>{article.category}</span><span>•</span><span>{article.label}</span><span>•</span><span>{article.readingTime}</span></div><h2><Link href={`/opini/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><small>{article.author}{article.publishedAt ? ` · ${article.publishedAt}` : ""}</small></div><Link className="round-arrow" href={`/opini/${article.slug}`} aria-label={`Baca ${article.title}`}>↗</Link></article>)}</div>
  </section>;
}
