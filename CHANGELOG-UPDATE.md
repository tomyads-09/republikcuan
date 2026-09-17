# Changelog Update — Republik Cuan (per 17 Sep 2026)

File yang diubah (10 file), sisanya TIDAK disentuh:

## 1. Perbaikan freshness (hapus tanggal basi "Agustus")
- `index.html`
- `artikel/10-cara-menghasilkan-uang-dari-rumah-2026.html`
- `artikel/7-aplikasi-penghasil-uang-aman-terbukti-cair.html`
- `artikel/cara-kerja-freelance-untuk-pemula.html`
- `artikel/ide-bisnis-sampingan-modal-kecil-karyawan.html`
- `artikel/manfaatkan-ai-untuk-nambah-cuan.html`

Perubahan:
- Teks ticker promo "Promo **Agustus** RC Legal ... buruan sebelum bulan depan!" → jadi kalimat evergreen tanpa bulan spesifik, jadi nggak perlu diedit tiap bulan.
- Label "📅 Diperbarui Agustus 2026" → "📅 Diperbarui September 2026".
- **Wajib kamu update manual tiap kali update konten**: label ini masih hardcode teks, belum otomatis. Kalau mau otomatis beneran, kasih tau nanti aku bikinkan skrip kecil yang generate dari tanggal file/CMS.

## 2. Tambah `datePublished` & `dateModified` di schema Article (5 artikel di atas)
Sebelumnya schema Article cuma punya headline/author/publisher, tanpa tanggal — jadi Google nggak bisa munculin tanggal di hasil pencarian dan nggak tahu kontennya baru atau lama. Sekarang tiap artikel punya `datePublished` (perkiraan tanggal asli publish, silakan koreksi kalau kamu tahu tanggal pastinya) dan `dateModified: 2026-09-16`.

## 3. Tambah section "Artikel Terkait" (internal linking)
Ditambahkan ke 4 artikel yang sebelumnya belum punya:
- `7-aplikasi-penghasil-uang-aman-terbukti-cair.html`
- `cara-kerja-freelance-untuk-pemula.html`
- `ide-bisnis-sampingan-modal-kecil-karyawan.html`
- `manfaatkan-ai-untuk-nambah-cuan.html`

Masing-masing sekarang link ke 2 artikel lain yang relevan (pola & style sama kayak yang sudah ada di artikel "10 Cara Menghasilkan Uang dari Rumah").

## 4. Perbaikan SEO teknis — halaman yang tadinya nggak ada canonical/meta sama sekali
- **`usaha-ai/index.html`** — ditambah `meta robots`, `canonical`, Open Graph tags, dan schema `SoftwareApplication`. Sebelumnya halaman ini sama sekali nggak punya canonical/OG/schema padahal di-link dari homepage.
- **`aplikasi/usaha-ai.html`** — ini file **duplikat** dari `/usaha-ai/` (isinya 100% sama tapi nggak di-link dari mana pun / orphan page). Sekarang ditandai `noindex` + `canonical` ke `/usaha-ai/` biar Google nggak anggap konten ganda. **Saran**: kalau kamu yakin nggak ada yang link ke sini dari luar, boleh dihapus aja filenya biar bersih.
- **`ebook/downloads/30-ide-usaha-rumahan/index.html`** — sebelumnya cuma punya `<title>` doang, sekarang ditambah meta description, canonical, OG tags, dan schema `Book`.

## 5. Sitemap.xml — tambah 3 URL yang tadinya ketinggalan
- `/usaha-ai/`
- `/ebook/downloads/30-ide-usaha-rumahan/`
- `/layanan/`

(Catatan: `/aplikasi/cuan-tracker/` sengaja tidak dimasukkan karena halaman itu memang di-set `noindex` — itu tools internal, bukan halaman konten.)

---

## Cara pakai
1. Extract `republikcuan-updated.zip`.
2. Timpa (replace) folder project lokal kamu dengan isi ini — atau cukup copy 10 file yang disebut di atas satu-satu kalau kamu udah ada progres nulis artikel baru yang belum di-commit.
3. Push seperti biasa lewat GitHub Desktop.
4. Setelah live, submit ulang sitemap.xml di Google Search Console biar Google langsung crawl ulang.

## Yang belum aku sentuh (masih PR kamu / next step)
- Artikel baru (kamu bilang lagi diproses sendiri).
- Kompresi gambar & optimasi kecepatan halaman lebih lanjut.
- Backlink & Google Business Profile untuk RC Legal.
