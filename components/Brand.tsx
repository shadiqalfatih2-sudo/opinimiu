import Link from "next/link";

export default function Brand() {
  return (
    <Link className="brand brand-official ub-brand" href="/" aria-label="Opinimiu - Beranda">
      <span className="ub-brand-word">Opini<span>miu</span></span>
      <small>SUARA JERNIH UNTUK SULAWESI TENGAH</small>
    </Link>
  );
}
