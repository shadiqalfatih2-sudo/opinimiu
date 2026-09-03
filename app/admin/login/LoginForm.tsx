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
    if (error) return setMessage("Email atau password tidak valid.");
    window.location.href = "/admin";
  }

  return <form className="login-form" onSubmit={login}>
    <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="editor@opinimiu.id" autoComplete="email" /></label>
    <label>Password<input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 8 karakter" autoComplete="current-password" /></label>
    <button disabled={loading}>{loading ? "Memproses..." : "Masuk ke Editorial →"}</button>
    <p className="form-message">Akun redaksi baru tidak dibuat dari halaman publik. Admin mengelola akses tim secara terpisah.</p>
    {message && <p className="form-message">{message}</p>}
  </form>;
}
