import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ScheduleManager from "./ScheduleManager";

export const metadata = { title: "Kalender Redaksi — Opinimiu" };
export const dynamic = "force-dynamic";

export default async function EditorialCalendarPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/admin/login");

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) redirect("/admin/login");

  const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
  const role = roleData?.role ?? "contributor";
  if (role !== "admin" && role !== "editor") redirect("/admin");

  const { data: articles } = await supabase
    .from("articles")
    .select("id,title,slug,status,scheduled_at,published_at,updated_at")
    .in("status", ["draft", "review", "scheduled", "published"])
    .order("scheduled_at", { ascending: true, nullsFirst: false });

  return <ScheduleManager initialArticles={(articles ?? []) as never[]} role={role} />;
}
