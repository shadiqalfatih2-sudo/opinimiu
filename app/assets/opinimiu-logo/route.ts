import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const source = await readFile(path.join(process.cwd(), "public", "opinimiu-logo-dark.png"), "utf8");
    const bytes = Buffer.from(source.trim(), "base64");
    if (!bytes.length) throw new Error("Empty logo asset");
    return new Response(bytes, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000"
      }
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
