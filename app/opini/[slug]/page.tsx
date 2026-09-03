import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedArticle } from "@/lib/articles";

type Params = { params: Promise<{ slug: string }> };
const baseUrl = "https://opinimiu.vercel.app";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return { title: "Artikel tidak ditemukan" };
  const canonical = `${baseUrl}/opini/${slug}`;
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    alternates: { canonical },
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      type: "article",
      url: canonical,
      publishedTime: article.publishedAtIso ?? undefined,
      images: article.coverUrl ? [{ url: article.coverUrl }] : undefined
    },
    twitter: {
      card: article.coverUrl ? "summary_large_image" : "summary",
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      images: article.coverUrl ? [article.coverUrl] : undefined
    }
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();
  const articleUrl = `${baseUrl}/opini/${slug}`;
  const whatsappText = encodeURIComponent(`${article.title} — ${articleUrl}`);

  return (
    <article className="article-page shell page-top">
      <div className="article-hero">
        <div className="meta"><span>{article.category}</span><span>•</span><span>{article.label}</span><span>•</span><span>{article.readingTime}</span></div>
        <h1>{article.title}</h1>
        <p className="dek">{article.excerpt}</p>
        <div className="article-byline"><span className="avatar">O</span><div><strong>{article.author}</strong><small>{article.publishedAt}</small></div></div>
      </div>
      {article.coverUrl && <figure className="article-cover"><img src={article.coverUrl} alt={`Cover ${article.title}`} /></figure>}
      <div className="article-layout">
        <aside><span>Bagikan</span><a href={`https://wa.me/?text=${whatsappText}`} target="_blank" rel="noreferrer">WhatsApp ↗</a><Link href="/opini">← Semua opini</Link></aside>
        <div className="article-body">
          <div className="summary-box"><span className="eyebrow">Inti singkat</span><p>{article.excerpt || "Tulisan ini membaca isu dari konteks, manfaat, risiko, dan pertanyaan yang masih perlu dijawab dengan data."}</p></div>
          {article.body.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
          {article.sources.length > 0 && <section className="article-sources"><span className="eyebrow">Sumber & referensi</span><ol>{article.sources.map((source: any, index: number) => <li key={`${source.source_title}-${index}`}><strong>{source.source_title}</strong>{source.publisher && <span> — {source.publisher}</span>}{source.source_url && <a href={source.source_url} target="_blank" rel="noreferrer"> Buka sumber ↗</a>}</li>)}</ol></section>}
          <p className="article-update-note">Opinimiu akan memperbarui pembacaan ketika data, kebijakan, atau kondisi lapangan berubah.</p>
        </div>
      </div>
    </article>
  );
}
