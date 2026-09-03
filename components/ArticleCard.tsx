import Link from "next/link";
import type { Article } from "@/lib/content";
export default function ArticleCard({ article, index }: { article: Article; index?: number }) {
  return <article className="article-row"><div className="article-index">{String((index ?? 0) + 1).padStart(2, "0")}</div><div className="article-copy"><div className="meta"><span>{article.category}</span><span>•</span><span>{article.label}</span><span>•</span><span>{article.readingTime}</span></div><h3><Link href={`/opini/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p></div><Link className="round-arrow" href={`/opini/${article.slug}`} aria-label={`Baca ${article.title}`}>↗</Link></article>;
}
