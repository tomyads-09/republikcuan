// netlify/functions/rclips-react.js
//
// Backend kecil buat nyimpen like, dislike, dan komentar tiap video di
// halaman /rclips/ -- datanya dibagi ke SEMUA pengunjung (bukan cuma per HP),
// jadi kamu bisa lihat aktivitas asli dari pengunjung situs.
//
// Pakai Netlify Blobs (sudah ada di dependencies), jadi nggak perlu setup
// database eksternal. Kalau env var BLOBS_SITE_ID / BLOBS_TOKEN belum di-set
// di Netlify dashboard, fitur ini otomatis nonaktif dengan aman (nggak bikin
// halaman error, cuma like/dislike/komentar nggak kesimpen).
//
// CATATAN PENTING: komentar di sini TANPA moderasi otomatis. Ada proteksi
// dasar (honeypot anti-bot + batas panjang teks), tapi kamu tetap perlu
// sesekali cek isi komentarnya manual (lewat Netlify dashboard > Blobs)
// buat mastiin nggak ada spam/komentar nggak pantas yang nyangkut.

let getStore = null;
try {
  ({ getStore } = require('@netlify/blobs'));
} catch (e) {
  console.error('Gagal load @netlify/blobs:', e);
}

const MAX_COMMENT_LENGTH = 280;
const MAX_COMMENTS_STORED = 200; // biar blob nggak membengkak tanpa batas

function getBlobStore() {
  if (!getStore || !process.env.BLOBS_SITE_ID || !process.env.BLOBS_TOKEN) return null;
  try {
    return getStore({
      name: 'rclips-engagement',
      siteID: process.env.BLOBS_SITE_ID,
      token: process.env.BLOBS_TOKEN
    });
  } catch (e) {
    console.error('Blobs init error:', e);
    return null;
  }
}

function emptyStats() {
  return { likes: 0, dislikes: 0, comments: [] };
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const store = getBlobStore();

  // ---------- GET: ambil statistik satu video ----------
  if (event.httpMethod === 'GET') {
    const videoId = event.queryStringParameters && event.queryStringParameters.videoId;
    if (!videoId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'videoId wajib diisi' }) };
    }
    if (!store) {
      return { statusCode: 200, headers, body: JSON.stringify(emptyStats()) };
    }
    try {
      const data = (await store.get(`video:${videoId}`, { type: 'json' })) || emptyStats();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    } catch (e) {
      console.error('Gagal ambil data:', e);
      return { statusCode: 200, headers, body: JSON.stringify(emptyStats()) };
    }
  }

  // ---------- POST: like / dislike / comment ----------
  if (event.httpMethod === 'POST') {
    if (!store) {
      return { statusCode: 200, headers, body: JSON.stringify({ ok: false, reason: 'storage_unavailable' }) };
    }
    try {
      const body = JSON.parse(event.body || '{}');
      const { videoId, action, text, website } = body;

      // Honeypot: field "website" cuma diisi bot, manusia nggak lihat field ini.
      if (website) {
        return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
      }
      if (!videoId || typeof videoId !== 'string') {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'videoId wajib diisi' }) };
      }

      const key = `video:${videoId}`;
      const data = (await store.get(key, { type: 'json' })) || emptyStats();

      if (action === 'like') data.likes = (data.likes || 0) + 1;
      else if (action === 'unlike') data.likes = Math.max(0, (data.likes || 0) - 1);
      else if (action === 'dislike') data.dislikes = (data.dislikes || 0) + 1;
      else if (action === 'undislike') data.dislikes = Math.max(0, (data.dislikes || 0) - 1);
      else if (action === 'comment') {
        const clean = String(text || '').trim().slice(0, MAX_COMMENT_LENGTH);
        if (!clean) {
          return { statusCode: 400, headers, body: JSON.stringify({ error: 'Komentar kosong' }) };
        }
        if (!Array.isArray(data.comments)) data.comments = [];
        data.comments.unshift({ text: clean, ts: Date.now() });
        data.comments = data.comments.slice(0, MAX_COMMENTS_STORED);
      } else {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'action tidak dikenali' }) };
      }

      await store.setJSON(key, data);
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    } catch (e) {
      console.error('Function error:', e);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Terjadi kesalahan di server' }) };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
