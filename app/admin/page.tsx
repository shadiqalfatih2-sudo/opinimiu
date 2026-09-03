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

  await supabase.rpc("claim_first_admin");

  const [roleResult, articlesResult, categoriesResult, labelsResult] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle(),
    supabase.from("articles").select("id,title,slug,excerpt,body,cover_url,status,is_featured,reading_time,published_at,updated_at,category_id,editorial_label_id").order("updated_at", { ascending: false }),
    supabase.from("categories").select("id,name").order("name"),
    supabase.from("editorial_labels").select("id,name").order("name")
  ]);

  const role = roleResult.data?.role ?? "contributor";
  if (!['admin', 'editor', 'contributor'].includes(role)) redirect("/admin/login");

  return <AdminCMS
    user={{ id: user.id, email: user.email ?? "editor@opinimiu.id" }}
    role={role}
    initialArticles={(articlesResult.data ?? []) as never[]}
    categories={categoriesResult.data ?? []}
    labels={labelsResult.data ?? []}
  />;
}
