"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Category = { id: string; name: string };
type Label = { id: string; name: string };
type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string[] | string | null;
  cover_url: string | null;
  status: "draft" | "review" | "scheduled" | "published" | "archived";
  is_featured: boolean;
  reading_time: number;
  published_at: string | null;
  updated_at: string;
  category_id: string | null;
  editorial_label_id: string | null;
};

type Props = {
  user: { id: string; email: string };
  role: string;
  initialArticles: Article[];
  categories: Category[];
  labels: Label[];
};

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverUrl: "",
  status: "draft" as Article["status"],
  isFeatured: false,
  readingTime: 5,
  categoryId: "",
  labelId: ""
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function bodyToText(body: Article["body"]) {
  if (Array.isArray(body)) return body.join("\n\n");
  return typeof body === "string" ? body : "";
}

export default function AdminCMS({ user, role, initialArticles, categories, labels }: Props) {
  const [articles, setArticles] = useState(initialArticles);
  const [form, setForm] = useState(emptyForm);
  const [mode, setMode] = useState<"list" | "editor">("list");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const counts = useMemo(() => ({
    draft: articles.filter((a) => a.status === "draft").length,
    review: articles.filter((a) => a.status === "review").length,
    published: articles.filter((a) => a.status === "published").length
  }), [articles]);

  function newArticle() {
    setForm(emptyForm);
    setNotice("");
    setMode("editor");
  }

  function editArticle(article: Article) {
    setForm({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt ?? "",
      body: bodyToText(article.body),
      coverUrl: article.cover_url ?? "",
      status: article.status,
      isFeatured: article.is_featured,
      readingTime: article.reading_time,
      categoryId: article.category_id ?? "",
      labelId: article.editorial_label_id ?? ""
    });
    setNotice("");
    setMode("editor");
  }

  async function saveArticle(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) return;
    if (!form.title.trim()) return setNotice("Judul wajib diisi.");

    setBusy(true);
    setNotice("");
    const payload = {
      author_id: user.id,
      title: form.title.trim(),
      slug: form.slug.trim() || slugify(form.title),
      excerpt: form.excerpt.trim() || null,
      body: form.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      cover_url: form.coverUrl.trim() || null,
      status: form.status,
      is_featured: form.isFeatured,
      reading_time: Math.max(1, Number(form.readingTime) || 5),
      category_id: form.categoryId || null,
      editorial_label_id: form.labelId || null,
      published_at: form.status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    };

    let result;
    if (form.id) {
      result = await supabase.from("articles").update(payload).eq("id", form.id).select().single();
    } else {
      result = await supabase.from("articles").insert(payload).select().single();
    }

    setBusy(false);
    if (result.error) {
      setNotice(result.error.message);
      return;
    }

    const saved = result.data as Article;
    setArticles((current) => form.id ? current.map((a) => a.id === saved.id ? saved : a) : [saved, ...current]);
    setNotice("Tulisan berhasil disimpan.");
    setForm((f) => ({ ...f, id: saved.id }));
  }

  async function removeArticle(article: Article) {
    if (!window.confirm(`Hapus tulisan “${article.title}”?`)) return;
    const supabase = createClient();
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("articles").delete().eq("id", article.id);
    setBusy(false);
    if (error) return setNotice(error.message);
    setArticles((current) => current.filter((a) => a.id !== article.id));
  }

  async function signOut() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return <div className="cms-shell">
    <aside className="cms-sidebar">
      <div>
        <span className="cms-brand">OPINIMIU</span>
        <small>Editorial Workspace</small>
      </div>
      <nav>
        <button className={mode === "list" ? "active" : ""} onClick={() => setMode("list")}>◫ Dashboard</button>
        <button className={mode === "editor" ? "active" : ""} onClick={newArticle}>＋ Tulis baru</button>
        <a href="/" target="_blank">↗ Lihat situs</a>
      </nav>
      <div className="cms-user">
        <strong>{user.email}</strong>
        <span>{role}</span>
        <button onClick={signOut}>Keluar</button>
      </div>
    </aside>

    <main className="cms-main">
      {mode === "list" ? <>
        <header className="cms-heading">
          <div><span>Ruang Redaksi</span><h1>Selamat datang.</h1><p>Kelola opini, analisis, dan perspektif Sulawesi Tengah dari satu tempat.</p></div>
          <button className="cms-primary" onClick={newArticle}>＋ Tulis Artikel</button>
        </header>

        <section className="cms-stats">
          <article><span>Draft</span><strong>{counts.draft}</strong><small>Sedang disusun</small></article>
          <article><span>Review</span><strong>{counts.review}</strong><small>Menunggu ulasan</small></article>
          <article><span>Terbit</span><strong>{counts.published}</strong><small>Tayang ke publik</small></article>
          <article><span>Total</span><strong>{articles.length}</strong><small>Semua tulisan</small></article>
        </section>

        <section className="cms-card">
          <div className="cms-card-head"><div><span>Tulisan</span><h2>Daftar artikel</h2></div><small>{articles.length} tulisan</small></div>
          {articles.length === 0 ? <div className="cms-empty"><strong>Belum ada tulisan.</strong><p>Buat artikel pertama Opinimiu dan simpan sebagai draft atau langsung terbitkan.</p><button className="cms-primary" onClick={newArticle}>Buat artikel pertama</button></div> :
          <div className="cms-table-wrap"><table className="cms-table"><thead><tr><th>Judul</th><th>Status</th><th>Diperbarui</th><th></th></tr></thead><tbody>{articles.map((article) => <tr key={article.id}><td><strong>{article.title}</strong><small>/{article.slug}</small></td><td><span className={`status-pill status-${article.status}`}>{article.status}</span></td><td>{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(article.updated_at))}</td><td><div className="row-actions"><button onClick={() => editArticle(article)}>Edit</button><button className="danger" disabled={busy} onClick={() => removeArticle(article)}>Hapus</button></div></td></tr>)}</tbody></table></div>}
        </section>
      </> : <section className="editor-view">
        <header className="cms-heading editor-heading">
          <div><button className="back-button" type="button" onClick={() => setMode("list")}>← Kembali</button><span>{form.id ? "Edit tulisan" : "Tulisan baru"}</span><h1>{form.id ? form.title || "Tanpa judul" : "Mulai sebuah gagasan."}</h1></div>
          <div className="editor-actions"><button type="button" className="cms-secondary" onClick={() => setMode("list")}>Batal</button><button form="article-form" className="cms-primary" disabled={busy}>{busy ? "Menyimpan..." : "Simpan"}</button></div>
        </header>

        <form id="article-form" className="editor-grid" onSubmit={saveArticle}>
          <div className="editor-content cms-card">
            <label>Judul artikel<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.id ? form.slug : slugify(e.target.value) })} placeholder="Tulis judul yang tajam dan jelas..." required /></label>
            <label>Ringkasan<textarea rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Satu paragraf yang menjelaskan kenapa tulisan ini penting." /></label>
            <label>Isi tulisan<textarea className="body-editor" rows={20} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder={'Tulis paragraf pertama...\n\nPisahkan paragraf dengan satu baris kosong.'} /></label>
          </div>
          <aside className="editor-settings">
            <div className="cms-card"><h3>Publikasi</h3><label>Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Article["status"] })}><option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option><option value="archived">Archived</option></select></label><label className="check-row"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Jadikan sorotan utama</label></div>
            <div className="cms-card"><h3>Klasifikasi</h3><label>Kategori<select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}><option value="">Pilih kategori</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Label editorial<select value={form.labelId} onChange={(e) => setForm({ ...form, labelId: e.target.value })}><option value="">Pilih label</option>{labels.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</select></label></div>
            <div className="cms-card"><h3>Detail</h3><label>Slug<input value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} /></label><label>Estimasi baca (menit)<input type="number" min="1" value={form.readingTime} onChange={(e) => setForm({ ...form, readingTime: Number(e.target.value) })} /></label><label>URL cover<input type="url" value={form.coverUrl} onChange={(e) => setForm({ ...form, coverUrl: e.target.value })} placeholder="https://..." /></label></div>
            {notice && <div className="cms-notice">{notice}</div>}
          </aside>
        </form>
      </section>}
    </main>
  </div>;
}
