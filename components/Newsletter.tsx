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

  return <section className="newsletter shell">
    <div><span className="eyebrow light">Newsletter</span><h2>Yang penting dari Sulteng, tanpa kebisingan.</h2></div>
    <div><form className="newsletter-form" onSubmit={subscribe}><input type="email" required placeholder="email@kamu.id" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><button type="submit" disabled={busy}>{busy ? "Menyimpan..." : "Ikuti Opinimiu →"}</button></form>{message && <small className="newsletter-message">{message}</small>}</div>
  </section>;
}
