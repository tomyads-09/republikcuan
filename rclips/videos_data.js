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

];
