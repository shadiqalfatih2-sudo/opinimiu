import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles } from "@/lib/articles";
export const metadata = { title: "Opini" };
export default async function OpiniPage() { const articles = await getPublishedArticles(); return <section className="shell page-top"><div className="page-hero"><span className="eyebrow">Opini</span><h1>Tulisan untuk memahami Sulteng, bukan sekadar bereaksi.</h1><p>Analisis, perspektif muda, dan pembacaan program dari berbagai sisi.</p></div><div className="filter-line"><span>Semua tulisan</span><span>Analisis</span><span>Perspektif muda</span><span>Program</span></div>{articles.map((article, i) => <ArticleCard key={article.slug} article={article} index={i} />)}</section>; }
