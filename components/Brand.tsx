import Link from "next/link";

export default function Brand() {
  return (
    <Link className="brand brand-official portal-brand" href="/" aria-label="Opinimiu - Beranda">
      <img
        src="/opinimiu-logo-transparent.png"
        alt="Opinimiu Celebest"
        width={520}
        height={179}
      />
    </Link>
  );
}
