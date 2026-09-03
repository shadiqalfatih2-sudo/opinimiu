import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Program" };
export const dynamic = "force-dynamic";

export default async function ProgramPage() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("program_hubs").select("id,name,slug,summary,status").neq("status", "archived").order("name")
    : { data: null };
  const programs = data ?? [];

  return <section className="shell page-top">
    <div className="page-hero"><span className="eyebrow">Program & kebijakan</span><h1>Kita pantau programnya, bukan hanya pengumumannya.</h1><p>Hub tematik untuk memahami tujuan, progres, data, manfaat, risiko, dan suara publik.</p></div>
    <div className="program-stack">{programs.length ? programs.map((program, i) => <article key={program.id}><span>{String(i + 1).padStart(2, "0")}</span><h2>{program.name}</h2><p>{program.summary}</p><b>{program.status === "watching" ? "Dalam pantauan" : "Aktif"} ↗</b></article>) : <article><span>00</span><h2>Program hub sedang disiapkan</h2><p>Data program akan muncul otomatis dari ruang redaksi setelah tersedia.</p><b>Opinimiu</b></article>}</div>
  </section>;
}
