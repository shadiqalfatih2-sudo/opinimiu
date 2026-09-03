export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  label: string;
  readingTime: string;
  author: string;
  publishedAt: string;
  featured?: boolean;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "pantaskah-porsi-dbh-sulawesi-tengah",
    title: "Pantaskah Porsi DBH Sulawesi Tengah?",
    excerpt: "Membaca kembali hubungan antara kontribusi daerah, struktur penerimaan, dan ruang fiskal yang benar-benar kembali ke masyarakat.",
    category: "Ekonomi",
    label: "Analisis",
    readingTime: "7 menit",
    author: "Tim Opinimiu",
    publishedAt: "3 September 2026",
    featured: true,
    body: [
      "Sulawesi Tengah tumbuh cepat, tetapi angka pertumbuhan saja belum cukup untuk menjawab siapa yang benar-benar merasakan manfaat pembangunan.",
      "Pembahasan DBH perlu diletakkan dalam konteks yang utuh: kontribusi ekonomi, beban sosial dan lingkungan, kapasitas fiskal daerah, serta kualitas belanja publik.",
      "Opinimiu memilih membaca isu ini dari lebih dari satu sisi—apa yang sudah bekerja, apa yang belum, dan data apa yang seharusnya menjadi dasar percakapan publik berikutnya."
    ]
  },
  {
    slug: "fornas-dan-potensi-perputaran-ekonomi",
    title: "FORNAS dan Potensi Perputaran Ekonomi di Sulawesi Tengah",
    excerpt: "Event besar bukan hanya soal keramaian. Ada rantai ekonomi lokal yang perlu disiapkan agar dampaknya tidak lewat begitu saja.",
    category: "Program",
    label: "Sorotan Program",
    readingTime: "5 menit",
    author: "Rizal Liara",
    publishedAt: "1 September 2026",
    body: [
      "Pertanyaan penting dari sebuah agenda besar adalah berapa banyak nilai ekonomi yang benar-benar tinggal di daerah.",
      "Akomodasi, kuliner, transportasi, UMKM, pekerja kreatif, dan ruang publik adalah bagian dari ekosistem yang harus dipersiapkan sejak awal.",
      "Karena itu, ukuran keberhasilan sebaiknya tidak berhenti pada jumlah peserta, tetapi juga pada distribusi manfaatnya."
    ]
  },
  {
    slug: "jadi-gubernur-itu-berat",
    title: "Jadi Gubernur Itu Berat: Ekspektasi Publik dan Realitas Kebijakan",
    excerpt: "Di antara target politik, kapasitas birokrasi, anggaran, dan kebutuhan warga, keputusan publik hampir selalu punya trade-off.",
    category: "Pemerintahan",
    label: "Dua Sisi",
    readingTime: "6 menit",
    author: "Tim Opinimiu",
    publishedAt: "30 Agustus 2026",
    body: [
      "Publik berhak menuntut hasil, sementara pemerintah bekerja di dalam batas anggaran, aturan, waktu, dan kapasitas eksekusi.",
      "Memahami batas itu bukan berarti menurunkan standar akuntabilitas. Justru dari sana kita bisa mengajukan kritik yang lebih presisi.",
      "Yang dibutuhkan adalah percakapan yang bergerak dari slogan menuju indikator, target, progres, dan dampak."
    ]
  },
  {
    slug: "anak-muda-dan-arah-pembangunan-sulteng",
    title: "Anak Muda Tidak Cukup Hanya Diajak Hadir",
    excerpt: "Partisipasi yang bermakna dimulai ketika perspektif muda ikut membentuk agenda, bukan sekadar memenuhi kursi forum.",
    category: "Anak Muda",
    label: "Perspektif Muda",
    readingTime: "4 menit",
    author: "Nadia Putri",
    publishedAt: "28 Agustus 2026",
    body: [
      "Generasi muda berada paling dekat dengan perubahan teknologi, pola kerja baru, dan dinamika sosial yang bergerak cepat.",
      "Karena itu, pelibatan anak muda seharusnya dirancang sebagai mekanisme substantif: memberi data, ruang argumentasi, dan jalur tindak lanjut.",
      "Partisipasi yang baik bukan soal seberapa ramai forum, tetapi seberapa jelas gagasan bisa masuk ke proses keputusan."
    ]
  }
];

export const topicLinks = ["Ekonomi", "Pemerintahan", "Pendidikan", "Lingkungan", "Infrastruktur", "Anak Muda"];
export const dataPoints = [
  { value: "13", label: "Kabupaten/Kota", note: "Satu provinsi, konteks lokal yang tidak selalu sama." },
  { value: "2 sisi", label: "Minimum perspektif", note: "Kami menghindari kesimpulan satu arah untuk isu yang kompleks." },
  { value: "100%", label: "Konteks Sulteng", note: "Fokus pada isu, program, dan cerita pembangunan Sulawesi Tengah." }
];
