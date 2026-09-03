import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DataManager from "./DataManager";

export const metadata = { title: "Kelola Data — Opinimiu" };
export const dynamic = "force-dynamic";

export default async function AdminDataPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/admin/login");
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) redirect("/admin/login");
  const [{ data: roleRow }, { data: points }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle(),
    supabase.from("data_points").select("id,title,value,note,source_name,source_url,period_label,is_featured,updated_at").order("updated_at", { ascending: false })
  ]);
  const role = roleRow?.role ?? "contributor";
  if (role !== "admin" && role !== "editor") redirect("/admin");
  return <DataManager initialPoints={(points ?? []) as never[]} />;
}
