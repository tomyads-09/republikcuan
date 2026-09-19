# -*- coding: utf-8 -*-
import json

TEMPLATE = '''<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="https://republikcuan.web.id/artikel/{slug}.html">
<meta property="og:type" content="article">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="https://republikcuan.web.id/assets/images/logo.png">
<link rel="icon" href="../assets/icons/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="../assets/icons/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"></noscript>
<link rel="stylesheet" href="../assets/css/style.css">
<script type="application/ld+json">
{{"@context": "https://schema.org", "@type": "Article", "headline": "{title}", "author": {{"@type": "Organization", "name": "Republik Cuan"}}, "publisher": {{"@type": "Organization", "name": "Republik Cuan"}}, "mainEntityOfPage": "https://republikcuan.web.id/artikel/{slug}.html", "datePublished": "{date_published}", "dateModified": "2026-09-19"}}
</script>
</head>
<body>
<a href="#main" class="skip-link">Lompat ke konten utama</a>
<header class="site-header">
  <div class="ticker-bar" role="marquee" aria-label="Info terbaru">
    <span class="ticker-label">🔥 Update</span>
    <div class="ticker-track">
      <span class="ticker-item"><span class="dot"></span>Kategori baru: Aplikasi Penghasil Uang 2026 sudah tayang</span>
      <span class="ticker-item"><span class="dot"></span>5 ide bisnis sampingan modal di bawah Rp500 ribu</span>
      <span class="ticker-item"><span class="dot"></span>Panduan kerja freelance pakai AI tanpa skill ribet</span>
      <span class="ticker-item"><span class="dot"></span>Kategori baru: Aplikasi Penghasil Uang 2026 sudah tayang</span>
      <span class="ticker-item"><span class="dot"></span>5 ide bisnis sampingan modal di bawah Rp500 ribu</span>
    </div>
  </div>
  <nav class="container nav-row" aria-label="Navigasi utama">
    <a href="../" class="brand"><img src="../assets/images/logo.png" alt="Republik Cuan" style="height:38px;width:auto"></a>
    <button class="nav-toggle" aria-label="Buka menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
    <ul class="nav-links">
      <li><a href="../">Beranda</a></li>
      <li><a href="./" class="active">Artikel</a></li>
      <li><a href="/layanan/">Layanan</a></li>
      <li><a href="../aplikasi/">Aplikasi</a></li>
      <li><a href="../ebook/">Ebook</a></li>
      <li><a href="../video/">Video</a></li>
      <li><a href="../rclips/">RClips</a></li>
    </ul>
    <div class="nav-actions"><a href="../aplikasi/" class="btn btn-primary btn-sm nav-cta-desktop">Lihat Aplikasi</a></div>
  </nav>
</header>

<main id="main">
  <section class="page-hero" style="padding-bottom:100px">
    <div class="container">
      <div class="breadcrumb"><a href="../">Beranda</a> / <a href="./">Artikel</a> / <span>{cat_label}</span></div>
      <div class="post-header">
        <span class="eyebrow" style="background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.24);color:#fff">{cat_label}</span>
        <h1>{title}</h1>
        <div class="post-meta">
          <span>📅 Diperbarui September 2026</span>
          <span>⏱ {read_time} min baca</span>
          <span>✍️ Tim Republik Cuan</span>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="post-cover">
      <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
        <defs><linearGradient id="cov-{slug}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient></defs>
        <rect width="1200" height="500" fill="url(#cov-{slug})"/>
        {cover_shape}
      </svg>
    </div>

    <article class="post-body" data-editable="article-content">
{body}
      <div class="tag-row">{tags}</div>

      <div class="author-box">
        <div class="avatar"></div>
        <div><b>Tim Republik Cuan</b><span>Menulis panduan praktis seputar cara menghasilkan uang untuk pemula.</span></div>
      </div>
    </article>
  </div>

    <div class="container" style="max-width:740px;margin-inline:auto;padding:0">
      <div class="section-head" style="margin-top:56px">
        <span class="eyebrow orange">Baca Juga</span>
        <h2>Artikel Terkait</h2>
      </div>
      <div class="article-grid article-grid-2">
{related}
      </div>
    </div>

  <section class="section">
    <div class="container">
      <div class="cta-band">
        <h2>Mau Baca Cara Lainnya?</h2>
        <p>Jelajahi kategori lain untuk temukan cara cuan yang paling cocok buat kamu.</p>
        <div class="cta-band-actions"><a href="./" class="btn btn-primary">Lihat Semua Artikel →</a></div>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <img src="../assets/images/logo.png" alt="Republik Cuan" style="height:34px;width:auto;filter:brightness(0) invert(1)">
      <p>Pusat belajar cara menghasilkan uang untuk pemula — belajar, praktik, hasilkan cuan.</p>
    </div>
    <div><h2>Jelajahi</h2><a href="../">Beranda</a><a href="./">Artikel</a><a href="../aplikasi/">Aplikasi</a><a href="../ebook/">Ebook</a><a href="../video/">Video</a></div>
    <div><h2>Kategori</h2><a href="./?kategori=kerja-online">Kerja Online</a><a href="./?kategori=bisnis-sampingan">Bisnis Sampingan</a><a href="./?kategori=aplikasi-penghasil-uang">Aplikasi Penghasil Uang</a><a href="./?kategori=side-hustle-viral">Side Hustle & Bisnis Viral</a><a href="./?kategori=remote-work-freelance">Remote Work & Freelance</a><a href="./?kategori=digital-marketing-affiliate">Digital Marketing & Affiliate</a><a href="./?kategori=legalitas-usaha">Legalitas Usaha (RC Legal)</a><a href="./?kategori=manajemen-cuan">Manajemen Cuan</a></div>
    <div><h2>Tentang</h2><a href="../tentang.html">Tentang Kami</a><a href="../kontak.html">Kontak</a><a href="../disclaimer.html">Disclaimer</a><a href="../kebijakan-privasi.html">Kebijakan Privasi</a></div>
  </div>
  <div class="container footer-bottom"><span>© <span data-year></span> Republik Cuan. Semua hak dilindungi.</span></div>
</footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
'''

def related_card(slug, label, title, gid, c1, c2, shape):
    return f'''        <a href="{slug}.html" class="article-card">
          <div class="article-thumb">
            <span class="article-cat">{label}</span>
            <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient></defs>
              <rect width="800" height="500" fill="url(#{gid})"/>
              {shape}
            </svg>
          </div>
          <div class="article-body"><h3>{title}</h3></div>
        </a>'''

# shapes reused/adapted from existing site style
SHAPES = {
  "triangle": '<polygon points="400,90 520,320 280,320" fill="none" stroke="#fff" stroke-width="7" opacity="0.9"/>',
  "phone": '<rect x="330" y="90" width="140" height="230" rx="24" fill="none" stroke="#fff" stroke-width="7" opacity="0.9"/>',
  "circle": '<circle cx="400" cy="230" r="70" fill="none" stroke="#fff" stroke-width="7" opacity="0.9"/>',
  "arrow_up": '<path d="M320 320 L400 150 L480 320 M400 150 L400 330" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>',
  "megaphone": '<path d="M330 220 L450 170 L450 290 L330 240 Z M330 220 L330 240 L300 240 L300 220 Z M420 300 Q440 320 430 340" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round" opacity="0.9"/>',
  "doc_check": '<rect x="340" y="110" width="120" height="160" rx="10" fill="none" stroke="#fff" stroke-width="7" opacity="0.9"/><path d="M368 195 L392 218 L432 165" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>',
  "coin": '<circle cx="400" cy="210" r="55" fill="none" stroke="#fff" stroke-width="7" opacity="0.9"/><path d="M400 175 v70 M382 190 h36 M382 230 h36" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0.9"/>',
}

ARTICLES = []

# ---------------- 1. Side Hustle & Bisnis Viral ----------------
ARTICLES.append(dict(
  slug="cara-bikin-side-hustle-viral",
  cat_label="Side Hustle & Bisnis Viral",
  data_cat="side-hustle-viral",
  title="Cara Bikin Side Hustle yang Viral dan Gampang Ditiru Pemula",
  description="Cara bikin side hustle kecil-kecilan biar dilirik banyak orang di media sosial, lengkap dengan contoh ide yang sudah terbukti viral di Indonesia.",
  read_time=6,
  date_published="2026-09-01",
  c1="#F2760E", c2="#0A1B33",
  cover_shape=SHAPES["arrow_up"].replace('stroke-width="7"','stroke-width="10"'),
  tags='<span class="tag-chip">Side Hustle</span><span class="tag-chip">Bisnis Viral</span>',
  body='''
      <p>Side hustle yang viral bukan soal keberuntungan semata — ada pola yang bisa kamu tiru. Kuncinya ada di produk yang gampang "dipamerkan" secara visual dan proses jualan yang cepat dipahami dalam hitungan detik di media sosial.</p>

      <h2>Kenapa Beberapa Side Hustle Bisa Viral?</h2>
      <ul>
        <li>Prosesnya menarik ditonton — ada unsur "before-after" atau proses pembuatan yang unik.</li>
        <li>Harga terjangkau sehingga orang gampang tergerak coba tanpa mikir panjang.</li>
        <li>Gampang dibagikan ulang, misalnya cocok jadi hadiah atau konten unboxing.</li>
      </ul>

      <h2>Contoh Ide Side Hustle yang Sudah Terbukti Viral</h2>
      <h3>1. Thrift Flip & Kurasi Baju Bekas</h3>
      <p>Beli baju bekas berkualitas, kurasi ulang, foto dengan gaya konsisten, lalu jual dengan storytelling di setiap unggahan.</p>
      <h3>2. Dessert Box atau Snack Kekinian</h3>
      <p>Produk kecil dengan tampilan menarik dan porsi personal cocok banget dipromosikan lewat video singkat proses pembuatan.</p>
      <h3>3. Jasa Cetak Foto Instan (Polaroid Style)</h3>
      <p>Banyak dicari untuk acara wisuda, ulang tahun, atau nongkrong bareng teman — modal kecil, repeat order tinggi.</p>
      <h3>4. Custom Merchandise (Stiker, Tote Bag, Case HP)</h3>
      <p>Produk personalisasi selalu punya daya tarik karena orang suka sesuatu yang "dibuat khusus untuk mereka".</p>

      <div class="callout"><b>Tips:</b> Fokus dulu di satu platform (misalnya TikTok atau Instagram Reels) dan posting konsisten minimal 3-4 kali seminggu sebelum melebarkan ke platform lain.</div>

      <h2>Kesalahan yang Sering Bikin Side Hustle Gagal Viral</h2>
      <p>Kebanyakan pemula berhenti di 5-10 postingan pertama karena belum ada hasil. Padahal algoritma media sosial butuh konsistensi jangka menengah, biasanya baru terasa dampaknya setelah 30-50 konten.</p>

      <h2>Kesimpulan</h2>
      <p>Side hustle viral itu bukan soal ide yang "wah", tapi eksekusi konten yang konsisten dan produk yang gampang dipahami dalam waktu singkat. Mulai dari satu ide, dokumentasikan prosesnya, dan biarkan konsistensi yang bekerja.</p>
''',
))

# ---------------- 2. Remote Work & Freelance ----------------
ARTICLES.append(dict(
  slug="cara-dapat-kerja-remote-untuk-pemula",
  cat_label="Remote Work & Freelance",
  data_cat="remote-work-freelance",
  title="Cara Dapat Kerja Remote untuk Pemula Tanpa Pengalaman",
  description="Panduan langkah demi langkah cara mencari dan mendapatkan pekerjaan remote untuk pemula, mulai dari menyiapkan profil sampai melamar posisi pertama.",
  read_time=7,
  date_published="2026-09-01",
  c1="#1D4FD8", c2="#16C265",
  cover_shape=SHAPES["circle"].replace('stroke-width="7"','stroke-width="10"'),
  tags='<span class="tag-chip">Remote Work</span><span class="tag-chip">Freelance</span>',
  body='''
      <p>Kerja remote makin banyak dicari karena fleksibel dan tidak terikat lokasi. Tapi buat pemula tanpa pengalaman, tantangannya adalah meyakinkan calon klien atau perusahaan kalau kamu bisa diandalkan meski belum pernah kerja remote sebelumnya.</p>

      <h2>Persiapan Sebelum Melamar Kerja Remote</h2>
      <ul>
        <li>Siapkan koneksi internet stabil dan ruang kerja yang tenang — ini sering ditanyakan di wawancara remote.</li>
        <li>Buat profil profesional di LinkedIn dan platform freelance yang relevan dengan skill kamu.</li>
        <li>Kumpulkan 2-3 contoh kerja (portofolio), meskipun itu proyek latihan atau proyek pribadi.</li>
      </ul>

      <h2>Langkah Cari Kerja Remote Pertama</h2>
      <h3>1. Tentukan Skill yang Mau Dijual</h3>
      <p>Fokus di satu bidang dulu — misalnya admin virtual, desain grafis dasar, atau penulisan konten — daripada menawarkan banyak skill sekaligus tapi tidak spesifik.</p>
      <h3>2. Bangun Portofolio dari Proyek Kecil</h3>
      <p>Kalau belum punya klien, buat 2-3 contoh kerja sendiri yang relevan dengan niche yang kamu targetkan.</p>
      <h3>3. Optimalkan Profil di Platform Freelance</h3>
      <p>Isi profil selengkap mungkin, gunakan foto profesional, dan tulis deskripsi yang fokus pada hasil yang bisa kamu berikan ke klien.</p>
      <h3>4. Mulai dari Proyek Kecil dengan Harga Kompetitif</h3>
      <p>Di awal, prioritaskan membangun rating dan review bagus dibanding mengejar bayaran tinggi.</p>

      <div class="callout"><b>Tips:</b> Balas pesan klien secepat mungkin di 24 jam pertama — kecepatan respons sering jadi faktor penentu di platform kerja remote.</div>

      <h2>Skill yang Wajib Dikuasai Pekerja Remote</h2>
      <p>Selain skill teknis, kemampuan komunikasi tertulis yang jelas (karena kerja remote banyak lewat chat/email) dan manajemen waktu mandiri jadi pembeda utama antara pekerja remote yang bertahan lama dan yang cepat berhenti.</p>

      <h2>Kesimpulan</h2>
      <p>Kerja remote untuk pemula memang butuh usaha ekstra di awal untuk membangun kepercayaan tanpa rekam jejak. Mulai dari proyek kecil, jaga komunikasi tetap responsif, dan portofolio kamu akan berkembang seiring waktu.</p>
''',
))

# ---------------- 3. Digital Marketing & Affiliate ----------------
ARTICLES.append(dict(
  slug="panduan-affiliate-marketing-pemula",
  cat_label="Digital Marketing & Affiliate",
  data_cat="digital-marketing-affiliate",
  title="Panduan Affiliate Marketing untuk Pemula, Mulai Tanpa Modal Besar",
  description="Panduan dasar affiliate marketing untuk pemula: cara kerja, cara pilih produk, dan cara promosi yang efektif tanpa perlu modal besar di awal.",
  read_time=6,
  date_published="2026-09-05",
  c1="#7C3AED", c2="#1D4FD8",
  cover_shape=SHAPES["megaphone"].replace('stroke-width="7"','stroke-width="9"'),
  tags='<span class="tag-chip">Affiliate Marketing</span><span class="tag-chip">Digital Marketing</span>',
  body='''
      <p>Affiliate marketing memungkinkan kamu dapat komisi dari setiap penjualan yang terjadi lewat link referral kamu — tanpa perlu punya produk atau stok barang sendiri.</p>

      <h2>Cara Kerja Affiliate Marketing</h2>
      <ul>
        <li>Kamu daftar program affiliate dari marketplace atau brand tertentu.</li>
        <li>Kamu dapat link unik untuk dibagikan ke audiens kamu.</li>
        <li>Setiap ada pembelian lewat link itu, kamu dapat komisi sesuai persentase yang ditentukan.</li>
      </ul>

      <h2>Langkah Mulai Affiliate Marketing dari Nol</h2>
      <h3>1. Pilih Niche yang Kamu Pahami</h3>
      <p>Promosi jadi lebih natural kalau kamu memang paham dan pakai sendiri produk yang direkomendasikan — misalnya niche skincare, gadget, atau perlengkapan rumah tangga.</p>
      <h3>2. Daftar Program Affiliate yang Relevan</h3>
      <p>Kebanyakan marketplace besar dan platform media sosial punya program affiliate resmi dengan syarat pendaftaran yang mudah untuk pemula.</p>
      <h3>3. Bikin Konten Review yang Jujur</h3>
      <p>Konten yang menunjukkan pengalaman nyata pakai produk biasanya lebih dipercaya dibanding konten yang terlalu "jualan banget".</p>
      <h3>4. Sebarkan di Beberapa Kanal</h3>
      <p>Kombinasikan short video, story, dan caption dengan call-to-action yang jelas ke link affiliate kamu.</p>

      <div class="callout"><b>Penting:</b> Selalu cantumkan disclosure/keterangan bahwa link yang kamu bagikan adalah link affiliate. Ini soal transparansi ke audiens sekaligus mengikuti aturan platform.</div>

      <h2>Hal yang Sering Bikin Affiliate Gagal Cuan</h2>
      <p>Kesalahan umum: mempromosikan terlalu banyak produk sekaligus tanpa fokus, sehingga audiens bingung dan tidak percaya rekomendasinya. Lebih baik konsisten di satu niche dulu sampai audiens benar-benar percaya sama rekomendasi kamu.</p>

      <h2>Kesimpulan</h2>
      <p>Affiliate marketing cocok buat kamu yang mau mulai bisnis digital tanpa modal produk. Kuncinya ada di konsistensi konten dan kejujuran dalam merekomendasikan produk ke audiens.</p>
''',
))

# ---------------- 4. Legalitas Usaha (RC Legal) ----------------
ARTICLES.append(dict(
  slug="panduan-legalitas-usaha-umkm-pemula",
  cat_label="Legalitas Usaha (RC Legal)",
  data_cat="legalitas-usaha",
  title="Panduan Legalitas Usaha untuk UMKM: NIB, PT, atau CV?",
  description="Panduan dasar legalitas usaha untuk UMKM di Indonesia — beda NIB, PT, dan CV, serta kapan waktu yang tepat untuk mengurus badan usaha resmi.",
  read_time=7,
  date_published="2026-09-08",
  c1="#0A1B33", c2="#0F766E",
  cover_shape=SHAPES["doc_check"].replace('stroke-width="7"','stroke-width="9"'),
  tags='<span class="tag-chip">Legalitas Usaha</span><span class="tag-chip">RC Legal</span>',
  body='''
      <p>Banyak pelaku UMKM menunda urus legalitas usaha karena dianggap ribet atau belum perlu. Padahal legalitas yang jelas justru membuka banyak peluang, mulai dari kerja sama dengan perusahaan besar sampai akses pembiayaan.</p>

      <h2>Kenapa Legalitas Usaha Penting?</h2>
      <ul>
        <li>Syarat wajib untuk ikut tender atau kerja sama dengan instansi/perusahaan besar.</li>
        <li>Memudahkan akses ke pinjaman modal usaha dari bank maupun lembaga keuangan.</li>
        <li>Melindungi aset pribadi dari risiko usaha, tergantung jenis badan usahanya.</li>
      </ul>

      <h2>Jenis Legalitas yang Perlu Diketahui</h2>
      <h3>1. NIB (Nomor Induk Berusaha)</h3>
      <p>Ini identitas dasar pelaku usaha yang diurus lewat sistem OSS (Online Single Submission). Cocok untuk usaha perorangan yang baru mulai dan belum butuh struktur badan hukum kompleks.</p>
      <h3>2. CV (Persekutuan Komanditer)</h3>
      <p>Cocok untuk usaha yang dijalankan bersama partner dengan modal relatif kecil-menengah, prosesnya lebih sederhana dibanding PT.</p>
      <h3>3. PT (Perseroan Terbatas)</h3>
      <p>Pilihan tepat kalau usahamu mulai butuh kredibilitas lebih tinggi, misalnya untuk ikut tender besar atau menggaet investor, karena punya pemisahan aset pribadi dan usaha yang jelas.</p>
      <h3>4. PT Perorangan</h3>
      <p>Opsi lebih ringkas untuk usaha mikro dan kecil yang tetap ingin berbentuk PT tanpa syarat modal minimum yang berat.</p>

      <div class="callout"><b>Tips:</b> Mulai dari NIB dulu kalau usahamu masih tahap awal, lalu upgrade ke CV atau PT begitu omzet dan kebutuhan kerja sama bisnis mulai berkembang.</div>

      <h2>Kapan Waktu yang Tepat Upgrade Legalitas?</h2>
      <p>Beberapa tanda kamu perlu upgrade: ada calon klien/mitra yang mensyaratkan badan usaha resmi, omzet sudah cukup besar untuk butuh pemisahan keuangan yang lebih rapi, atau kamu berencana mengajukan pinjaman modal ke bank.</p>

      <p>Kalau kamu butuh bantuan mengurus legalitas usaha dari nol tanpa ribet bolak-balik kantor, tim <a href="../layanan/">RC Legal</a> siap bantu proses pendirian PT, CV, PMA, Yayasan, sampai Koperasi.</p>

      <h2>Kesimpulan</h2>
      <p>Legalitas usaha bukan cuma soal kewajiban administratif, tapi investasi jangka panjang buat pertumbuhan bisnis kamu. Sesuaikan jenis badan usaha dengan skala dan rencana bisnismu ke depan.</p>
''',
))

# ---------------- 5. Manajemen Cuan ----------------
ARTICLES.append(dict(
  slug="cara-atur-keuangan-usaha-sampingan",
  cat_label="Manajemen Cuan",
  data_cat="manajemen-cuan",
  title="Cara Atur Keuangan Usaha Sampingan Biar Untung Beneran Kelihatan",
  description="Cara sederhana mengatur keuangan usaha sampingan supaya keuntungan benar-benar kelihatan, bukan cuma omzet besar tapi uangnya menguap tanpa jejak.",
  read_time=6,
  date_published="2026-09-12",
  c1="#0EA152", c2="#0A1B33",
  cover_shape=SHAPES["coin"].replace('stroke-width="7"','stroke-width="9"').replace('r="55"','r="65"'),
  tags='<span class="tag-chip">Manajemen Keuangan</span><span class="tag-chip">Manajemen Cuan</span>',
  body='''
      <p>Banyak usaha sampingan yang omzetnya kelihatan besar tapi ujung-ujungnya uangnya "menguap" begitu saja. Penyebab paling umum: keuangan pribadi dan usaha tercampur jadi satu, sehingga sulit tahu untung sebenarnya berapa.</p>

      <h2>Kesalahan Umum Mengatur Keuangan Usaha Sampingan</h2>
      <ul>
        <li>Menyamakan omzet dengan keuntungan, padahal belum dikurangi modal dan biaya operasional.</li>
        <li>Tidak memisahkan rekening pribadi dan rekening usaha.</li>
        <li>Tidak mencatat pengeluaran kecil yang sebenarnya jumlahnya signifikan kalau diakumulasi.</li>
      </ul>

      <h2>Langkah Dasar Atur Keuangan Usaha Sampingan</h2>
      <h3>1. Pisahkan Rekening Pribadi dan Usaha</h3>
      <p>Ini langkah paling penting dan paling sering diabaikan. Dengan rekening terpisah, kamu bisa lihat dengan jelas arus kas usaha tanpa tercampur kebutuhan pribadi.</p>
      <h3>2. Catat Semua Pemasukan dan Pengeluaran</h3>
      <p>Tidak perlu aplikasi rumit, catatan sederhana di spreadsheet sudah cukup asalkan konsisten diisi setiap transaksi.</p>
      <h3>3. Hitung Margin, Bukan Cuma Omzet</h3>
      <p>Selalu kurangi modal bahan, biaya operasional, dan biaya platform (kalau jualan online) sebelum menganggap suatu angka sebagai "untung".</p>
      <h3>4. Alokasikan Keuntungan dengan Jelas</h3>
      <p>Contoh pembagian sederhana: sebagian untuk modal putar usaha berikutnya, sebagian untuk tabungan/cadangan, dan sebagian boleh dinikmati sebagai hasil kerja kamu.</p>

      <div class="callout"><b>Tips:</b> Review keuangan usaha minimal sebulan sekali. Dari situ kamu bisa lihat produk mana yang benar-benar untung dan mana yang cuma ramai tapi marginnya tipis.</div>

      <h2>Kesimpulan</h2>
      <p>Usaha sampingan yang sehat bukan yang omzetnya paling besar, tapi yang keuangannya paling rapi dan bisa dipertanggungjawabkan. Mulai dari memisahkan rekening dan mencatat setiap transaksi, sekecil apa pun itu.</p>
''',
))

for a in ARTICLES:
    print(a["slug"])

with open('/home/claude/work/edit/articles_data.json', 'w', encoding='utf-8') as f:
    json.dump({"template": TEMPLATE, "articles": ARTICLES}, f)
