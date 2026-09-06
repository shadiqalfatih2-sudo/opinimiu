import Link from "next/link";

export default function Brand() {
  return (
    <Link className="brand brand-official portal-brand" href="/" aria-label="Opinimiu - Beranda">
      <img
        src="/assets/opinimiu-logo"
        alt="Opinimiu Celebest"
        width={520}
        height={179}
        decoding="async"
      />
    </Link>
  );
}
