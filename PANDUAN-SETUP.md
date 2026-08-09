# Panduan Setup Usaha AI di Website Republik Cuan

## 1. Masukkan file ke GitHub (paling gampang: lewat browser, tanpa command line)

**a. Halaman chat**
1. Buka repo: https://github.com/tomyads-09/republikcuan
2. Klik tombol **Add file** (di kanan atas daftar file) → **Create new file**
3. Di kolom nama file, ketik: `usaha-ai/index.html`
   (ketik langsung dengan garis miring — GitHub otomatis bikin foldernya)
4. Buka file `usaha-ai/index.html` yang saya buatkan, copy semua isinya, paste ke kolom editor GitHub
5. Scroll ke bawah, klik **Commit changes**

**b. Netlify Function**
1. Ulangi cara yang sama: **Add file** → **Create new file**
2. Nama file: `netlify/functions/chat.js`
3. Copy-paste isi file `netlify/functions/chat.js` yang saya buatkan
4. **Commit changes**

## 2. Tambahkan konfigurasi functions ke netlify.toml

1. Buka file `netlify.toml` yang sudah ada di repo-mu (klik nama filenya)
2. Klik ikon pensil (Edit)
3. Tambahkan baris ini (kalau belum ada bagian `[build]`, tambahkan baru; kalau sudah ada, cukup tambahkan baris `functions`):

```
[build]
  functions = "netlify/functions"
```

4. **Commit changes**

## 3. Simpan API Key Anthropic dengan aman di Netlify (JANGAN taruh di kode)

1. Kalau belum punya API key, daftar dulu di https://console.anthropic.com → buat API key baru
2. Buka dashboard Netlify → pilih situs **republikcuan-admin**
3. Masuk ke **Site configuration** → **Environment variables**
4. Klik **Add a variable**
   - Key: `ANTHROPIC_API_KEY`
   - Value: (paste API key kamu)
5. Simpan

Netlify otomatis akan build ulang situsmu (atau trigger deploy baru) setelah kamu commit file-file di atas. Kalau tidak otomatis, ke tab **Deploys** di Netlify dan klik **Trigger deploy**.

## 4. Tambahkan link menu "Usaha AI" ke navigasi

Di setiap file HTML utama (index.html, artikel/index.html, dll), cari bagian menu navigasi
(yang berisi link Beranda, Artikel, Aplikasi, Ebook, Video), lalu tambahkan satu link baru:

```html
<a href="/usaha-ai/">Usaha AI</a>
```

## 5. Coba

Buka `https://republikcuan-admin.netlify.app/usaha-ai/` setelah deploy selesai. Kalau ada error,
cek log-nya di Netlify → tab **Functions** → klik `chat` untuk lihat pesan errornya.

---

### Kalau lebih nyaman pakai command line (opsional)

```bash
git clone https://github.com/tomyads-09/republikcuan.git
cd republikcuan
mkdir -p usaha-ai netlify/functions
# copy file index.html ke usaha-ai/, dan chat.js ke netlify/functions/
git add .
git commit -m "Tambah fitur Usaha AI"
git push origin main
```

Netlify yang sudah terhubung ke repo ini akan otomatis deploy setiap kali kamu push ke branch `main`.
