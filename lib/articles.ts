import { articles as fallbackArticles } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

export async function getPublishedArticles() {
  const supabase = await createClient();
  if (!supabase) return fallbackArticles;
  const { data, error } = await supabase
    .from("articles")
    .select("slug,title,excerpt,reading_time,published_at,is_featured,body, author:profiles!articles_author_id_fkey(display_name), category:categories(name), editorial_label:editorial_labels(name)")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data?.length) return fallbackArticles;
  return data.map((item: any) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? "",
    category: item.category?.name ?? "Opini",
    label: item.editorial_label?.name ?? "Opini",
    readingTime: `${item.reading_time ?? 5} menit`,
    author: item.author?.display_name ?? "Tim Opinimiu",
    publishedAt: item.published_at ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(item.published_at)) : "",
    featured: Boolean(item.is_featured),
    body: Array.isArray(item.body) ? item.body : typeof item.body === "string" ? [item.body] : []
  }));
}
