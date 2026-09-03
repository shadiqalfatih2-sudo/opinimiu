import { articles as fallbackArticles } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

function mapArticle(item: any) {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? "",
    category: item.category?.name ?? "Opini",
    label: item.editorial_label?.name ?? "Opini",
    readingTime: `${item.reading_time ?? 5} menit`,
    author: item.author?.display_name ?? "Tim Opinimiu",
    publishedAt: item.published_at ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(item.published_at)) : "",
    featured: Boolean(item.is_featured),
    body: Array.isArray(item.body) ? item.body : typeof item.body === "string" ? [item.body] : [],
    coverUrl: item.cover_url ?? null,
    seoTitle: item.seo_title ?? item.title,
    seoDescription: item.seo_description ?? item.excerpt ?? "",
    sources: Array.isArray(item.article_sources) ? [...item.article_sources].sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) : []
  };
}

function mapFallback(article: any) {
  return { ...article, coverUrl: null, seoTitle: article.title, seoDescription: article.excerpt ?? "", sources: [] };
}

const articleSelect = "slug,title,excerpt,reading_time,published_at,is_featured,body,cover_url,seo_title,seo_description, author:profiles!articles_author_id_fkey(display_name), category:categories(name), editorial_label:editorial_labels(name), article_sources(source_title,publisher,source_url,source_date,note,sort_order)";

export async function getPublishedArticles() {
  const supabase = await createClient();
  if (!supabase) return fallbackArticles.map(mapFallback);
  const { data, error } = await supabase.from("articles").select(articleSelect).eq("status", "published").order("published_at", { ascending: false });
  if (error || !data?.length) return fallbackArticles.map(mapFallback);
  return data.map(mapArticle);
}

export async function getPublishedArticle(slug: string) {
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase.from("articles").select(articleSelect).eq("status", "published").eq("slug", slug).maybeSingle();
    if (!error && data) return mapArticle(data);
  }
  const fallback = fallbackArticles.find((article) => article.slug === slug);
  return fallback ? mapFallback(fallback) : null;
}
