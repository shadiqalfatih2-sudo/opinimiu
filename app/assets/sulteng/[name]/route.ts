import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACK = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tahura-Kapopo1.jpg/1600px-Tahura-Kapopo1.jpg";

const IMAGES: Record<string, string> = {
  hero: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Teluk%20Palu,%20Sulawesi%20Tengah.jpg",
  coast: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Togian%20Islands%20banner.jpg",
  lake: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Danau%20poso%20scene-sulawesi%20tengah-indonesia.jpg",
  lindu: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lore%20Lindu%20National%20Park%20banner.jpg",
  heritage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Situs%20Cagar%20Budaya%20Pokekea%20-%20Lore%20Lindu,%20Sulawesi%20Tengah.jpg"
};

async function loadImage(url: string) {
  const response = await fetch(url, {
    redirect: "follow",
    cache: "no-store",
    headers: {
      "User-Agent": "Opinimiu/1.0 (https://opinimiu.vercel.app/)"
    }
  });
  if (!response.ok) throw new Error(`Image upstream returned ${response.status}`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) throw new Error(`Unexpected content type: ${contentType}`);
  return { bytes: await response.arrayBuffer(), contentType };
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const source = IMAGES[name];
  if (!source) return new Response(null, { status: 404 });

  try {
    let image;
    try {
      image = await loadImage(source);
    } catch {
      image = await loadImage(FALLBACK);
    }

    return new Response(image.bytes, {
      headers: {
        "Content-Type": image.contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000"
      }
    });
  } catch {
    return new Response(null, { status: 502 });
  }
}
