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
  {
    id: "nGbDOmV3H1g",
    category: "Bisnis Sampingan",
    caption: "Butuh Modal Berapa buat Buka Warung",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "0Mg0beXXc9Q",
    category: "Bisnis Sampingan",
    caption: "Jualan sambil Bikin Konten",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "Ir-NEFEuqW4",
    category: "Bisnis Sampingan",
    caption: "Jualan dari Rumah Bisa Banget",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "wpk2akRPVnA",
    category: "Motivasi & Religi",
    caption: "Do'a Keselamatan Dunia Akhirat",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "dZqj6vSJ64o",
    category: "Tips Bisnis",
    caption: "Yang Harus Dilakukan Ketika Memulai Usaha",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "OWow0hdZs5g",
    category: "Tips Bisnis",
    caption: "Lakukan 2 Hal agar Usaha Sukses",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "DlZSk5AqPy4",
    category: "Motivasi & Religi",
    caption: "Bisnis buat Apa? Ustad Adi Hidayat",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "OTgti4QZaVU",
    category: "Tips Bisnis",
    caption: "Buat Kalian yang Bingung Mau Mulai Bisnis",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "hmiU58ZjZ6E",
    category: "Kisah Sukses",
    caption: "Timothy Ronald: Bisnis Apa Aja Bisa!",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "q4vo6U8UGmc",
    category: "Motivasi & Religi",
    caption: "Ustad Adi Hidayat: Pendosa Ingin Hijrah",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "NBzFnIcmB1k",
    category: "Motivasi & Religi",
    caption: "Ternyata Bahagia itu Sederhana Sekali",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "Os8aRcVHxJE",
    category: "Motivasi & Religi",
    caption: "Sedekah Ga Akan Kamu Buat Miskin",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "S4fYgDEe9DA",
    category: "Tutorial",
    caption: "Tutorial Jualan di Lynk.id",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "6w5wtdZsLq0",
    category: "Ide Bisnis",
    caption: "Bisnis yang Bagus 2026",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "sqFM2oehtk8",
    category: "Bisnis Kuliner",
    caption: "Buka Bisnis Kuliner Apakah Masih Worth It",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "wagVQ5niTvA",
    category: "Motivasi & Religi",
    caption: "Motivasi Menurut Yusuf Hamka",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "TmgMk8gHuIM",
    category: "Motivasi & Religi",
    caption: "Wong Lanang Wajib Usaha",
    credit: "Sumber: YouTube Shorts"
  },
  {
    id: "negdhGGjSeg",
    category: "Bisnis Sampingan",
    caption: "Usaha Rumahan yang Menghasilkan",
    credit: "Sumber: YouTube Shorts"
  },

  // ↓↓↓ TEMPEL VIDEO BARU KAMU DI BAWAH SINI (copy format di atas) ↓↓↓

];
