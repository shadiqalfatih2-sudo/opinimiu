import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Data" };
export const dynamic = "force-dynamic";

export default async function DataPage() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from("data_points").select("id,title,value,note,source_name,source_url,period_label,is_featured").order("is_featured", { ascending: false }).order("created_at", { ascending: false })
    : { data: null };
  const points = data ?? [];

  return <section className="shell page-top">
    <div className="page-hero"><span className="eyebrow">Data</span><h1>Data untuk memberi konteks, bukan menutup debat.</h1><p>Kumpulan angka kunci dan sumber yang dipakai dalam tulisan Opinimiu. Setiap angka penting diarahkan ke sumber yang dapat diverifikasi.</p></div>
    {points.length ? <div className="data-grid large">{points.map((point) => <div className="data-card" key={point.id}><strong>{point.value}</strong><span>{point.title}</span><p>{point.note ?? point.period_label ?? ""}</p>{point.source_url ? <a href={point.source_url} target="_blank" rel="noreferrer">{point.source_name ?? "Lihat sumber"} ↗</a> : point.source_name ? <small>{point.source_name}</small> : null}</div>)}</div> : <div className="empty-state"><span className="eyebrow">Belum ada data terbit</span><h2>Angka akan muncul setelah sumbernya siap diverifikasi.</h2><p>Opinimiu tidak menampilkan angka hanya untuk membuat argumen terlihat meyakinkan. Data akan ditambahkan bersama konteks dan sumbernya.</p></div>}
  </section>;
}
