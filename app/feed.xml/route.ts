import { getPublishedArticles } from "@/lib/articles";

const baseUrl = "https://opinimiu.vercel.app";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getPublishedArticles();
  const items = articles.map((article: any) => {
    const url = `${baseUrl}/opini/${article.slug}`;
    const pubDate = article.publishedAtIso ? new Date(article.publishedAtIso).toUTCString() : new Date().toUTCString();
    return `<item><title>${escapeXml(article.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(article.excerpt ?? "")}</description><pubDate>${pubDate}</pubDate><category>${escapeXml(article.category ?? "Opini")}</category></item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Opinimiu</title><link>${baseUrl}</link><description>Opini, analisis, data, dan perspektif Sulawesi Tengah.</description><language>id-ID</language>${items}</channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } });
}
