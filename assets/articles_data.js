/*
  ARTIKEL — DATA PUSAT
  =====================
  Ini daftar SEMUA artikel yang tampil di:
  - Beranda (bagian "Artikel Unggulan" — otomatis ambil 5 artikel PALING ATAS di sini)
  - Halaman /artikel/ (daftar lengkap semua artikel + filter kategori)

  CARA NAMBAH ARTIKEL BARU (supaya otomatis muncul di Beranda juga):
  1. Bikin file HTML artikelnya dulu di folder /artikel/ (boleh minta tolong dibuatkan).
  2. Copy salah satu blok { ... } di bawah, TEMPEL DI PALING ATAS (baris paling awal
     di dalam ARTICLES = [ ... ]) — supaya otomatis jadi artikel terbaru/featured di Beranda.
  3. Ganti isinya:
     - slug      : nama file HTML tanpa ".html" (harus sama persis dengan nama filenya)
     - cat       : kode kategori (harus salah satu dari: ide-bisnis, kerja-online, pemasaran,
                   legalitas-usaha, tips-ai, aplikasi-cuan, kelola-uang, khazanah-inspirasi)
     - catLabel  : nama kategori yang tampil di badge (mis. "Ide Bisnis")
     - image     : link gambar cover (boleh link luar/Pexels/Unsplash, atau path lokal
                   yang diawali "/assets/images/artikel/nama-file.jpg")
     - imageAlt  : deskripsi singkat gambar (buat aksesibilitas & SEO)
     - title     : judul artikel
     - excerpt   : 1 kalimat ringkasan singkat (tampil di kartu)
     - readTime  : perkiraan lama baca dalam menit (angka saja, tanpa "menit")
  4. Simpan file ini, upload ulang ke GitHub Desktop seperti biasa.

  Beranda otomatis ambil 5 artikel PALING ATAS dari daftar ini (artikel pertama jadi "featured"/besar).
  Halaman /artikel/ menampilkan SEMUA artikel di daftar ini, urut dari atas ke bawah.
*/

const ARTICLES = [
  {
    slug: "10-alat-ai-terbesar-kreator-konten-viral",
    cat: "tips-ai",
    catLabel: "Tips AI",
    image: "/assets/images/artikel/10-alat-ai-kreator-konten-viral.jpg",
    imageAlt: "10 alat AI terbesar untuk kreator konten",
    title: "Bongkar Rahasia Kreator Viral: 10 Alat AI Terbesar untuk Sulap Konten",
    excerpt: "Dari ChatGPT sampai Notion AI — alat-alat AI yang dipakai kreator besar biar bisa posting berkali-kali sehari tanpa burnout.",
    readTime: 8
  },
  {
    slug: "saat-bisnis-sepi-menata-hati-mengubah-strategi",
    cat: "khazanah-inspirasi",
    catLabel: "Khazanah Inspirasi",
    image: "https://images.pexels.com/photos/5668884/pexels-photo-5668884.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Seseorang sedang berpikir dan merenungkan strategi bisnis",
    title: "Saat Bisnis Sedang Sepi, Ini Cara Menata Hati dan Mengubah Strategi",
    excerpt: "Cara menenangkan hati sekaligus evaluasi strategi saat usaha lagi sepi.",
    readTime: 6
  },
  {
    slug: "belajar-dari-rasulullah-sukses-berdagang-tanpa-riba",
    cat: "khazanah-inspirasi",
    catLabel: "Khazanah Inspirasi",
    image: "https://images.pexels.com/photos/36663399/pexels-photo-36663399.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Suasana pasar tradisional yang ramai dengan pedagang dan pembeli",
    title: "Sukses Dagang ala Rasulullah: Rahasia Cuan Berkah Tanpa Batas",
    excerpt: "5 rahasia dagang Rasulullah: jujur, fokus solusi, untung wajar, ramah, dan gemar sedekah.",
    readTime: 9
  },
  {
    slug: "cara-atur-keuangan-usaha-sampingan",
    cat: "kelola-uang",
    catLabel: "Kelola Uang",
    image: "https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Kalkulator dan catatan keuangan usaha",
    title: "Cara Atur Keuangan Usaha Sampingan Biar Untung Beneran Kelihatan",
    excerpt: "Cara sederhana pisahkan keuangan pribadi dan usaha biar untung kelihatan jelas.",
    readTime: 6
  },
  {
    slug: "panduan-legalitas-usaha-umkm-pemula",
    cat: "legalitas-usaha",
    catLabel: "Legalitas Usaha",
    image: "https://images.pexels.com/photos/7841499/pexels-photo-7841499.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Menandatangani dokumen kontrak legalitas usaha",
    title: "Panduan Legalitas Usaha untuk UMKM: NIB, PT, atau CV?",
    excerpt: "Beda NIB, CV, dan PT, serta kapan waktu tepat untuk upgrade legalitas.",
    readTime: 7
  },
  {
    slug: "panduan-affiliate-marketing-pemula",
    cat: "pemasaran",
    catLabel: "Pemasaran",
    image: "https://images.pexels.com/photos/33206676/pexels-photo-33206676.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Layar smartphone menampilkan aplikasi media sosial",
    title: "Panduan Affiliate Marketing untuk Pemula, Mulai Tanpa Modal Besar",
    excerpt: "Cara kerja affiliate marketing dan tips promosi yang efektif.",
    readTime: 6
  },
  {
    slug: "cara-bikin-side-hustle-viral",
    cat: "ide-bisnis",
    catLabel: "Ide Bisnis",
    image: "https://images.pexels.com/photos/6068952/pexels-photo-6068952.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Rak baju bekas untuk usaha reseller thrift",
    title: "Cara Bikin Side Hustle yang Viral dan Gampang Ditiru Pemula",
    excerpt: "Pola konten dan ide usaha kecil yang sering viral di media sosial.",
    readTime: 6
  },
  {
    slug: "cara-dapat-kerja-remote-untuk-pemula",
    cat: "kerja-online",
    catLabel: "Kerja Online",
    image: "https://images.pexels.com/photos/4132403/pexels-photo-4132403.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Wanita bekerja remote dengan laptop dari rumah",
    title: "Cara Dapat Kerja Remote untuk Pemula Tanpa Pengalaman",
    excerpt: "Langkah menyiapkan profil dan portofolio buat dapat kerja remote pertama.",
    readTime: 7
  },
  {
    slug: "manfaatkan-ai-untuk-nambah-cuan",
    cat: "tips-ai",
    catLabel: "Tips AI",
    image: "https://images.pexels.com/photos/17484970/pexels-photo-17484970.png?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Ilustrasi AI dan otomatisasi",
    title: "Manfaatkan AI untuk Nambah Cuan: 5 Tools Gratis",
    excerpt: "Tools AI gratis buat bikin konten, jualan, dan otomatisasi kerja harian.",
    readTime: 6
  },
  {
    slug: "ide-bisnis-sampingan-modal-kecil-karyawan",
    cat: "ide-bisnis",
    catLabel: "Ide Bisnis",
    image: "https://images.pexels.com/photos/30848031/pexels-photo-30848031.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Pemilik toko kecil / bisnis sampingan",
    title: "Ide Ide Bisnis Modal Kecil untuk Karyawan Sibuk",
    excerpt: "Usaha yang tetap bisa jalan meski waktumu terbatas.",
    readTime: 5
  },
  {
    slug: "cara-kerja-freelance-untuk-pemula",
    cat: "kerja-online",
    catLabel: "Kerja Online",
    image: "https://images.pexels.com/photos/9052775/pexels-photo-9052775.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Freelancer bekerja dengan laptop",
    title: "Cara Kerja Freelance untuk Pemula, Mulai dari Skill Kamu",
    excerpt: "Temukan niche, buat portofolio, dan dapatkan klien pertama.",
    readTime: 7
  },
  {
    slug: "7-aplikasi-penghasil-uang-aman-terbukti-cair",
    cat: "aplikasi-cuan",
    catLabel: "Aplikasi",
    image: "https://images.pexels.com/photos/6771899/pexels-photo-6771899.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    imageAlt: "Aplikasi penghasil uang di smartphone",
    title: "7 Aplikasi Cuan Asli dan Aman, Sudah Cair",
    excerpt: "Daftar aplikasi yang benar-benar membayar penggunanya.",
    readTime: 6
  },
  {
    slug: "10-cara-menghasilkan-uang-dari-rumah-2026",
    cat: "kerja-online",
    catLabel: "Kerja Online",
    image: "https://images.unsplash.com/photo-1643576779741-7febf0b3a925?auto=format&fit=crop&w=800&h=400&q=80",
    imageAlt: "Ilustrasi kerja online dari rumah",
    title: "10 Cara Menghasilkan Uang dari Rumah Tanpa Modal di 2026",
    excerpt: "Kumpulan cara realistis yang bisa langsung kamu coba hari ini.",
    readTime: 8
  }
];
