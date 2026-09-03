import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProgramManager from "./ProgramManager";

export const metadata = { title: "Kelola Program — Opinimiu" };
export const dynamic = "force-dynamic";

export default async function AdminProgramPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/admin/login");
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) redirect("/admin/login");
  const [{ data: roleRow }, { data: programs }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle(),
    supabase.from("program_hubs").select("id,name,slug,summary,status,cover_url,updated_at").order("name")
  ]);
  const role = roleRow?.role ?? "contributor";
  if (role !== "admin" && role !== "editor") redirect("/admin");
  return <ProgramManager initialPrograms={(programs ?? []) as never[]} />;
}
