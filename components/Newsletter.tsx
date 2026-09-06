"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function subscribe(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) return setMessage("Layanan belum tersedia.");
    setBusy(true);
    setMessage("");
    const { error } = await supabase.from("subscribers").insert({ email: email.trim().toLowerCase() });
    setBusy(false);
    if (error) {
      if (error.code === "23505") setMessage("Email ini sudah mengikuti Opinimiu.");
      else setMessage("Belum berhasil. Coba lagi sebentar.");
      return;
    }
    setEmail("");
    setMessage("Sip. Kamu sudah masuk daftar Opinimiu.");
  }

  return (
    <section className="ub-newsletter-wrap">
      <div className="shell ub-newsletter">
        <div className="ub-newsletter-copy"><span className="ub-mail-icon">✉</span><div><strong>Dapatkan update terbaru dari Opinimiu</strong><p>Artikel pilihan, analisis, dan data terbaru langsung ke email Anda.</p></div></div>
        <div className="ub-newsletter-form-wrap">
          <form className="ub-newsletter-form" onSubmit={subscribe}>
            <input type="email" required placeholder="Masukkan alamat email Anda" aria-label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <button type="submit" disabled={busy}>{busy ? "Menyimpan..." : "Berlangganan"}</button>
          </form>
          {message && <small className="newsletter-message">{message}</small>}
        </div>
      </div>
    </section>
  );
}
