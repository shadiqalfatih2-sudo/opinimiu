insert into public.categories (name, slug, description) values
('Ekonomi','ekonomi','Ekonomi daerah, fiskal, investasi, dan distribusi manfaat.'),
('Pemerintahan','pemerintahan','Kebijakan, tata kelola, dan pelayanan publik.'),
('Pendidikan','pendidikan','Pendidikan dan pembangunan sumber daya manusia.'),
('Lingkungan','lingkungan','Lingkungan, ruang hidup, dan keberlanjutan.'),
('Infrastruktur','infrastruktur','Konektivitas dan infrastruktur publik.'),
('Anak Muda','anak-muda','Perspektif dan peran generasi muda.') on conflict (slug) do nothing;
insert into public.editorial_labels (name, slug, description) values
('Analisis','analisis','Pembacaan berbasis konteks dan data.'),
('Dua Sisi','dua-sisi','Membandingkan lebih dari satu perspektif.'),
('Perspektif Muda','perspektif-muda','Sudut pandang generasi muda.'),
('Sorotan Program','sorotan-program','Membaca program dan kebijakan publik.'),
('Data Bicara','data-bicara','Tulisan yang berangkat dari data utama.') on conflict (slug) do nothing;
insert into public.program_hubs(name,slug,summary) values
('Pendidikan & SDM','pendidikan-sdm','Program pendidikan, beasiswa, kompetensi, dan SDM.'),
('Infrastruktur','infrastruktur','Program konektivitas, jalan, fasilitas, dan layanan dasar.'),
('UMKM & Ekonomi Lokal','umkm-ekonomi-lokal','Ekosistem UMKM, event, dan perputaran ekonomi lokal.'),
('Fiskal & DBH','fiskal-dbh','Penerimaan daerah, DBH, dan ruang fiskal.'),
('Pertanian & Pangan','pertanian-pangan','Ketahanan pangan dan penguatan ekonomi berbasis pertanian.'),
('Hilirisasi & Industri','hilirisasi-industri','Industri, hilirisasi, tenaga kerja, dan dampak daerah.') on conflict (slug) do nothing;
