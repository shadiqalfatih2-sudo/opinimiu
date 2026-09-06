import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMAGES: Record<string, string> = {
  hero: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Teluk%20Palu,%20Sulawesi%20Tengah.jpg",
  coast: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Togian%20Islands%20banner.jpg",
  lake: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Poso%20lake%20Tentena.jpg",
  lindu: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Danau%20Lindu%20-%20Sulawesi.jpg",
  heritage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Situs%20Cagar%20Budaya%20Pokekea%20-%20Lore%20Lindu,%20Sulawesi%20Tengah.jpg"
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const source = IMAGES[name];
  if (!source) return new Response(null, { status: 404 });

  try {
    const upstream = await fetch(source, {
      redirect: "follow",
      cache: "no-store",
      headers: {
        "User-Agent": "Opinimiu/1.0 (https://opinimiu.vercel.app/)"
      }
    });
    if (!upstream.ok) throw new Error(`Image upstream returned ${upstream.status}`);
    const bytes = await upstream.arrayBuffer();
    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    return new Response(bytes, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000"
      }
    });
  } catch {
    return Response.redirect(new URL("/opinimiu-hero.webp", request.url), 302);
  }
}
