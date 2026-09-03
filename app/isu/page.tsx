import Link from "next/link";
import { topicLinks } from "@/lib/content";
export const metadata = { title: "Isu" };
export default function IsuPage() { return <section className="shell page-top"><div className="page-hero"><span className="eyebrow">Peta isu</span><h1>Satu provinsi, banyak konteks.</h1><p>Jelajahi isu utama pembangunan Sulawesi Tengah berdasarkan tema.</p></div><div className="issue-grid">{topicLinks.map((t,i)=><Link href={`/opini?topik=${encodeURIComponent(t)}`} key={t}><span>{String(i+1).padStart(2,"0")}</span><h2>{t}</h2><p>Analisis, data, dan perspektif terkait {t.toLowerCase()} di Sulawesi Tengah.</p><b>Jelajahi →</b></Link>)}</div></section>; }
