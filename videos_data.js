/*
  RCLIPS — DATA VIDEO
  ===================
  Ini daftar video YouTube Shorts yang tampil di halaman /rclips/.
  Video-nya di-embed resmi lewat YouTube (bukan di-download/di-reupload),
  jadi semua penayangan & monetisasi tetap milik pemilik video asli.

  CARA NAMBAH VIDEO BARU:
  1. Buka video Shorts di YouTube, pastikan itu format Shorts (vertikal).
  2. Ambil ID video-nya dari URL:
     https://www.youtube.com/shorts/XXXXXXXXXXX  -> ID = XXXXXXXXXXX
  3. Copy salah satu blok { ... } di bawah, tempel sebelum tanda kurung siku
     penutup " ]; ", lalu ganti isinya:
     - id        : ID video YouTube (wajib)
     - category  : label pendek buat badge di halaman (mis. "Bisnis Sampingan")
     - caption   : JUDUL SINGKAT video tersebut (bukan kalimat instruksi/catatan).
                   Boleh sama persis judul aslinya atau versi lebih pendek,
                   yang penting singkat & jelas — ini yang tampil di layar.
     - credit    : nama channel pemilik video asli (buat kredit & sopan santun)
  4. Simpan file ini, upload ulang ke GitHub Desktop seperti biasa.

  Nggak ada batas jumlah video — mau nambah 5, 50, atau 200 video juga aman,
  karena tiap video baru dimuat pas mau di-scroll ke situ (lazy load).
*/

const RCLIPS_VIDEOS = [
  {
    id: "V_L6GmlZdag",
    category: "Kisah Sukses",
    caption: "Kisah Bule Australia Bangun Bisnis dari Nol di Indonesia",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "kQ7cYwq46Zc",
    category: "AI & Otomatisasi",
    caption: "Real or AI?",
    credit: "Sumber: YouTube Shorts"
  },

  // ↓↓↓ TEMPEL VIDEO BARU KAMU DI BAWAH SINI (copy format di atas) ↓↓↓

  {
    id: "nGbDOmV3H1g",
    category: "Kisah Sukses",
    caption: "Mulai dari Nol, Kini Raih Cuan Jutaan per Bulan",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "0Mg0beXXc9Q",
    category: "Bisnis Sampingan",
    caption: "Ide Usaha Sampingan Modal Kecil, Untung Besar",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "Ir-NEFEuqW4",
    category: "Freelance & Kerja Remote",
    caption: "Trik Dapat Klien Freelance Pertama dengan Cepat",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "wpk2akRPVnA",
    category: "AI & Otomatisasi",
    caption: "Manfaatkan AI Biar Kerja Makin Cepat & Cuan",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "dZqj6vSJ64o",
    category: "Aplikasi Penghasil Uang",
    caption: "Aplikasi Ini Bisa Bikin Kamu Cuan Tambahan",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "OWow0hdZs5g",
    category: "Tips Keuangan",
    caption: "Cara Atur Gaji Biar Nggak Numpang Lewat",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "DlZSk5AqPy4",
    category: "Investasi Pemula",
    caption: "Mulai Investasi dari Uang Receh, Ini Caranya",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "OTgti4QZaVU",
    category: "Motivasi",
    caption: "Jangan Nunggu Sempurna, Mulai Aja Dulu",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "hmiU58ZjZ6E",
    category: "Kisah Sukses",
    caption: "Rahasia Sukses Jualan Online dari Kamar Kos",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "q4vo6U8UGmc",
    category: "Bisnis Sampingan",
    caption: "Bisnis Sampingan Ini Jalan Sambil Kerja Kantoran",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "NBzFnIcmB1k",
    category: "Freelance & Kerja Remote",
    caption: "Kerja Remote dari Rumah, Ini Skill yang Dibutuhkan",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "Os8aRcVHxJE",
    category: "AI & Otomatisasi",
    caption: "AI Bikin Konten Otomatis, Begini Caranya",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "S4fYgDEe9DA",
    category: "Tips Keuangan",
    caption: "Kesalahan Keuangan yang Bikin Susah Nabung",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "6w5wtdZsLq0",
    category: "Aplikasi Penghasil Uang",
    caption: "Coba Aplikasi Ini Buat Nambah Penghasilan",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "sqFM2oehtk8",
    category: "Motivasi",
    caption: "Konsisten Itu Kunci Biar Usaha Nggak Berhenti",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "wagVQ5niTvA",
    category: "Kisah Sukses",
    caption: "Dari Karyawan Jadi Bos Usaha Sendiri",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "TmgMk8gHuIM",
    category: "Investasi Pemula",
    caption: "Investasi Aman Buat Pemula, Ini Tipsnya",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "negdhGGjSeg",
    category: "Bisnis Sampingan",
    caption: "Ide Cuan dari Hobi yang Sering Diremehkan",
    credit: "Sumber: YouTube Shorts"
  },

];
