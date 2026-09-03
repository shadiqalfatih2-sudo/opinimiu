"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Article = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "review" | "scheduled" | "published";
  scheduled_at: string | null;
  published_at: string | null;
  updated_at: string;
};

type Props = { initialArticles: Article[]; role: string };

function toLocalInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function ScheduleManager({ initialArticles, role }: Props) {
  const [articles, setArticles] = useState(initialArticles);
  const [selectedId, setSelectedId] = useState(initialArticles.find((a) => a.status !== "published")?.id ?? "");
  const selected = articles.find((article) => article.id === selectedId) ?? null;
  const [scheduleAt, setScheduleAt] = useState(toLocalInput(selected?.scheduled_at ?? null));
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const upcoming = useMemo(() => articles
    .filter((article) => article.status === "scheduled" && article.scheduled_at)
    .sort((a, b) => new Date(a.scheduled_at!).getTime() - new Date(b.scheduled_at!).getTime()), [articles]);

  const published = useMemo(() => articles
    .filter((article) => article.status === "published")
    .sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime())
    .slice(0, 8), [articles]);

  function selectArticle(id: string) {
    setSelectedId(id);
    const article = articles.find((item) => item.id === id);
    setScheduleAt(toLocalInput(article?.scheduled_at ?? null));
    setNotice("");
  }

  async function updateArticle(id: string, changes: Partial<Article>) {
    const supabase = createClient();
    if (!supabase) return { error: new Error("Supabase tidak tersedia") };
    const { data, error } = await supabase.from("articles").update({ ...changes, updated_at: new Date().toISOString() }).eq("id", id).select("id,title,slug,status,scheduled_at,published_at,updated_at").single();
    if (!error && data) setArticles((current) => current.map((article) => article.id === id ? data as Article : article));
    return { error };
  }

  async function schedule() {
    if (!selected) return setNotice("Pilih artikel terlebih dahulu.");
    if (!scheduleAt) return setNotice("Pilih tanggal dan jam terbit.");
    const date = new Date(scheduleAt);
    if (Number.isNaN(date.getTime())) return setNotice("Jadwal tidak valid.");
    if (date.getTime() <= Date.now()) return setNotice("Jadwal harus berada di masa depan.");
    setBusy(true);
    setNotice("");
    const { error } = await updateArticle(selected.id, { status: "scheduled", scheduled_at: date.toISOString(), published_at: null });
    setBusy(false);
    setNotice(error ? error.message : "Artikel masuk antrean terbit otomatis.");
  }

  async function publishNow() {
    if (!selected) return setNotice("Pilih artikel terlebih dahulu.");
    setBusy(true);
    setNotice("");
    const now = new Date().toISOString();
    const { error } = await updateArticle(selected.id, { status: "published", scheduled_at: null, published_at: selected.published_at ?? now });
    setBusy(false);
    setNotice(error ? error.message : "Artikel diterbitkan sekarang.");
  }

  async function cancelSchedule(article: Article) {
    if (!window.confirm(`Batalkan jadwal “${article.title}”?`)) return;
    setBusy(true);
    const { error } = await updateArticle(article.id, { status: "draft", scheduled_at: null, published_at: null });
    setBusy(false);
    setNotice(error ? error.message : "Jadwal dibatalkan dan artikel kembali menjadi draft.");
  }

  return <div className="manager-page">
    <header className="manager-topbar"><div><a href="/admin" className="back-button">← Dashboard</a><span className="eyebrow">Editorial operations</span><h1>Kalender Redaksi</h1><p>Atur antrean terbit. Scheduler database memeriksa artikel setiap menit dan menerbitkan yang sudah jatuh tempo.</p></div><div className="manager-role">{role}</div></header>

    <section className="schedule-grid">
      <div className="cms-card schedule-form-card">
        <span className="eyebrow">Jadwalkan tulisan</span>
        <label>Artikel<select value={selectedId} onChange={(e) => selectArticle(e.target.value)}><option value="">Pilih artikel</option>{articles.filter((article) => article.status !== "published").map((article) => <option key={article.id} value={article.id}>{article.title} · {article.status}</option>)}</select></label>
        <label>Tanggal & jam<input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} /></label>
        <div className="calendar-actions"><button className="cms-primary" disabled={busy || !selected} onClick={schedule}>{busy ? "Memproses..." : "Jadwalkan terbit"}</button><button className="cms-secondary" disabled={busy || !selected} onClick={publishNow}>Terbitkan sekarang</button></div>
        {selected && <div className="selected-article-note"><strong>{selected.title}</strong><span>Status: {selected.status}</span><span>Jadwal: {formatDate(selected.scheduled_at)}</span></div>}
        {notice && <div className="cms-notice">{notice}</div>}
      </div>

      <div className="cms-card scheduler-status"><span className="eyebrow">Scheduler</span><strong>Aktif</strong><p>Pemeriksaan otomatis berjalan setiap menit langsung di Supabase. Dashboard tidak perlu dibuka agar artikel terbit.</p><small>Timezone input mengikuti perangkat editor; waktu disimpan dalam UTC di database.</small></div>
    </section>

    <section className="cms-card manager-section">
      <div className="cms-card-head"><div><span>Antrean</span><h2>Akan terbit</h2></div><small>{upcoming.length} artikel</small></div>
      {upcoming.length === 0 ? <div className="cms-empty"><strong>Belum ada artikel terjadwal.</strong><p>Pilih artikel di atas untuk membuat antrean publikasi.</p></div> : <div className="schedule-list">{upcoming.map((article) => <article key={article.id}><div><span>{formatDate(article.scheduled_at)}</span><h3>{article.title}</h3><small>/{article.slug}</small></div><div className="row-actions"><a href={`/opini/${article.slug}`} target="_blank">Preview ↗</a><button className="danger" disabled={busy} onClick={() => cancelSchedule(article)}>Batalkan</button></div></article>)}</div>}
    </section>

    <section className="cms-card manager-section">
      <div className="cms-card-head"><div><span>Riwayat singkat</span><h2>Terbit terbaru</h2></div><small>{published.length} artikel</small></div>
      <div className="schedule-list compact">{published.map((article) => <article key={article.id}><div><span>{formatDate(article.published_at)}</span><h3>{article.title}</h3></div><a href={`/opini/${article.slug}`} target="_blank">Lihat ↗</a></article>)}</div>
    </section>
  </div>;
}
