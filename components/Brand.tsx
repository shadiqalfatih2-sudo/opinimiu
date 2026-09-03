import Link from "next/link";

export default function Brand() {
  return (
    <Link className="brand brand-official" href="/" aria-label="Opinimiu Celebest - Beranda">
      <img src="/opinimiu-logo.webp" alt="Opinimiu Celebest" />
    </Link>
  );
}
