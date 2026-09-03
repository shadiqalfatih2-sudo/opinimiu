"use client";
import { createBrowserClient } from "@supabase/ssr";

const fallbackUrl = "https://vwszqyhnwowxqiukbxcr.supabase.co";
const fallbackKey = "sb_publishable_ekaBwdd7PFPGTIDlANd3qg_N_zyx5ar";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? fallbackUrl;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? fallbackKey;
  return createBrowserClient(url, key);
}
