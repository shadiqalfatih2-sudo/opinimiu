import Link from "next/link";

export default function Brand() {
  return (
    <Link className="brand brand-official ub-brand" href="/" aria-label="Opinimiu - Beranda">
      <img
        src="/opinimiu-logo.webp"
        alt="Opinimiu"
        width={520}
        height={179}
        className="ub-brand-logo"
      />
    </Link>
  );
}
