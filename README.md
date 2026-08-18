# Republik Cuan — Website (v1, Tahap Awal)

Situs statis (HTML/CSS/JS murni — tanpa framework/build tool) untuk **republikcuan.biz.id**.
Siap diunggah langsung ke GitHub lalu di-deploy ke Netlify.

## 📁 Struktur Folder

```
site/
├── index.html                     # Homepage
├── 404.html                       # Halaman error kustom
├── tentang.html / kontak.html / disclaimer.html / kebijakan-privasi.html
├── sitemap.xml                    # Untuk Google Search Console
├── robots.txt
├── netlify.toml                   # Konfigurasi deploy Netlify
├── artikel/
│   ├── index.html                 # Daftar artikel (ada filter kategori)
│   └── *.html                     # 5 contoh artikel siap edit
├── aplikasi/
│   └── index.html                 # Daftar aplikasi (APK) — 3 contoh kartu
├── ebook/
│   └── index.html                 # Daftar ebook (PDF) — 3 contoh kartu
├── video/
│   └── index.html                 # Halaman video (contoh cara embed YouTube)
└── assets/
    ├── css/style.css              # Semua styling & design system (1 file)
    ├── js/main.js                 # Menu mobile, filter artikel, dll
    ├── images/logo.png            # Logo terpilih (versi horizontal)
    └── icons/                     # Favicon & app icon (berbagai ukuran)
```

## ✏️ Cara Edit Konten (Tanpa Coding)

**Artikel baru:** salin salah satu file di `artikel/`, ganti judul, teks, dan nama file.
Lalu tambahkan link kartunya di `artikel/index.html` dan `index.html` (bagian "Artikel Unggulan").

**Ganti aplikasi/ebook:** buka `aplikasi/index.html` atau `ebook/index.html`, ganti judul,
deskripsi, dan link tombol unduh ke file APK/PDF asli kamu (upload filenya ke folder
`aplikasi/downloads/` atau `ebook/downloads/` — buat foldernya sendiri lalu commit).

**Ganti running text:** cari `<div class="ticker-track">` di tiap file HTML, isi ulang
baris `<span class="ticker-item">...</span>`-nya dengan info terbaru.

**Ganti logo:** ganti file `assets/images/logo.png` dengan file baru (pertahankan nama file
yang sama supaya semua halaman otomatis ikut berubah).

## 🎨 Desain

- Warna & font diatur terpusat di `assets/css/style.css` bagian `:root` (token warna: navy,
  blue, orange, green — sesuai warna logo).
- Font: **Sora** (judul), **Inter** (teks), **JetBrains Mono** (angka/label kecil) dari Google Fonts.
- Semua ilustrasi kartu artikel/aplikasi/ebook dibuat pakai SVG langsung di HTML (bukan file
  gambar) — jadi ringan, tajam di layar apa pun, dan gampang diganti warnanya.

## 🚀 Deploy

1. Push folder `site/` ini ke repo GitHub kamu (root repo = isi folder `site/`).
2. Hubungkan repo ke Netlify → build command kosong, publish directory `.` (sudah diatur di `netlify.toml`).
3. Arahkan domain `republikcuan.biz.id` (dibeli di Domainesia) ke Netlify lewat Cloudflare DNS.
4. Setelah live, submit `sitemap.xml` ke Google Search Console.

## ⚠️ Yang Masih Perlu Kamu Lengkapi Sebelum Go-Live

- [ ] Ganti email di `kontak.html` dengan email resmi.
- [ ] Lengkapi `disclaimer.html` dan `kebijakan-privasi.html` sesuai kebutuhan (penting sebelum daftar AdSense).
- [ ] Upload APK asli ke halaman Aplikasi.
- [ ] Upload PDF ebook asli ke halaman Ebook.
- [ ] Ganti isi Video dengan embed YouTube asli.
- [ ] Update `sitemap.xml` setiap kali menambah artikel baru.

## 🔁 Revisi Selanjutnya

Ini adalah **tahap awal (v1)**. Struktur dan gaya desain sudah dibuat sengaja modular supaya
gampang direvisi — tinggal bilang bagian mana yang mau diubah (misal: warna, hero, tambah
kategori, dll).
