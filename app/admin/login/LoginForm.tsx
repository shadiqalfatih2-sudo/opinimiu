"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) return setMessage("Supabase belum tersedia.");
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setMessage(error.message);
    window.location.href = "/admin";
  }

  async function signup() {
    const supabase = createClient();
    if (!supabase) return setMessage("Supabase belum tersedia.");
    if (!email || password.length < 8) return setMessage("Gunakan email valid dan password minimal 8 karakter.");
    setLoading(true);
    setMessage("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: "Tim Opinimiu" } }
    });
    setLoading(false);
    if (error) return setMessage(error.message);
    if (data.session) {
      window.location.href = "/admin";
      return;
    }
    setMessage("Akun dibuat. Cek email untuk konfirmasi, lalu kembali dan masuk. Akun pertama yang berhasil masuk akan menjadi Admin Opinimiu.");
  }

  return <form className="login-form" onSubmit={login}>
    <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="editor@opinimiu.id" autoComplete="email" /></label>
    <label>Password<input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 8 karakter" autoComplete="current-password" /></label>
    <button disabled={loading}>{loading ? "Memproses..." : "Masuk ke Editorial →"}</button>
    <button type="button" className="signup-button" disabled={loading} onClick={signup}>Buat akun editorial pertama</button>
    {message && <p className="form-message">{message}</p>}
  </form>;
}
