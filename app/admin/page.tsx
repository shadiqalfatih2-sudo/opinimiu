import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminCMS from "./AdminCMS";

export const metadata = { title: "Editorial Dashboard — Opinimiu" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/admin/login");

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) redirect("/admin/login");

  const [roleResult, articlesResult, categoriesResult, labelsResult, sourcesResult] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle(),
    supabase.from("articles").select("id,title,slug,excerpt,body,cover_url,status,is_featured,reading_time,scheduled_at,published_at,updated_at,category_id,editorial_label_id,seo_title,seo_description").order("updated_at", { ascending: false }),
    supabase.from("categories").select("id,name").order("name"),
    supabase.from("editorial_labels").select("id,name").order("name"),
    supabase.from("article_sources").select("id,article_id,source_title,publisher,source_url,source_date,note,sort_order").order("sort_order", { ascending: true })
  ]);

  const role = roleResult.data?.role ?? "contributor";

  return <AdminCMS
    user={{ id: user.id, email: user.email ?? "editor@opinimiu.id" }}
    role={role}
    initialArticles={(articlesResult.data ?? []) as never[]}
    categories={categoriesResult.data ?? []}
    labels={labelsResult.data ?? []}
    initialSources={(sourcesResult.data ?? []) as never[]}
  />;
}
