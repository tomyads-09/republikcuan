// netlify/functions/chat-legal.js
//
// Chatbot khusus halaman Layanan (RC Legal) — jawab pertanyaan seputar
// paket legalitas & harga. Pakai backend Gemini yang sama seperti Usaha AI,
// tapi system prompt beda dan kuota pemakaian terpisah (biar nggak rebutan
// jatah harian sama Usaha AI).

let getStore = null;
try {
  ({ getStore } = require('@netlify/blobs'));
} catch (e) {
  console.error('Gagal load @netlify/blobs, batasan pemakaian dinonaktifkan sementara:', e);
}

const DAILY_LIMIT = 150;
const WARN_THRESHOLD = 0.9;
const COOLDOWN_MS = 6 * 60 * 60 * 1000;

async function checkUsage() {
  if (!getStore || !process.env.BLOBS_SITE_ID || !process.env.BLOBS_TOKEN) {
    return { allowed: true, state: null, store: null };
  }
  let store, raw;
  try {
    store = getStore({
      name: 'rc-legal-usage',
      siteID: process.env.BLOBS_SITE_ID,
      token: process.env.BLOBS_TOKEN
    });
    raw = await store.get('counter', { type: 'json' });
  } catch (e) {
    console.error('Blobs error, lewati pengecekan limit:', e);
    return { allowed: true, state: null, store: null };
  }

  const now = Date.now();
  let state = raw || { count: 0, cycleStart: now, blockedAt: null };

  if (now - state.cycleStart > 24 * 60 * 60 * 1000) {
    state = { count: 0, cycleStart: now, blockedAt: null };
  }

  if (state.blockedAt) {
    const elapsed = now - state.blockedAt;
    if (elapsed < COOLDOWN_MS) {
      return { allowed: false, remainingMs: COOLDOWN_MS - elapsed, state };
    }
    state = { count: 0, cycleStart: now, blockedAt: null };
  }

  if (state.count / DAILY_LIMIT >= WARN_THRESHOLD) {
    state.blockedAt = now;
    await store.setJSON('counter', state);
    return { allowed: false, remainingMs: COOLDOWN_MS, state };
  }

  return { allowed: true, state, store };
}

async function incrementUsage(store, state) {
  if (!store || !state) return;
  try {
    state.count += 1;
    await store.setJSON('counter', state);
  } catch (e) {
    console.error('Gagal simpan counter pemakaian:', e);
  }
}

function formatRemaining(ms) {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours} jam ${minutes} menit`;
  return `${minutes} menit`;
}

const SYSTEM_PROMPT = `Kamu adalah asisten chat di halaman Layanan RC Legal (bagian dari Republik Cuan),
yang bantu jawab pertanyaan calon klien seputar paket legalitas usaha yang dijual.

Berikut daftar layanan & harga yang tersedia (harga "Mulai Rp" artinya harga bisa berbeda
tergantung kompleksitas kasus, lokasi, dan kelengkapan dokumen):

BADAN USAHA
- PT Perorangan: Mulai Rp1.250.000
- PT Badan Usaha: Mulai Rp4.800.000
- CV: Mulai Rp4.300.000
- Yayasan: Mulai Rp5.000.000
- Koperasi: Mulai Rp6.000.000
- Organisasi: Hubungi Kami
- Pembukaan Pemilik Manfaat (Beneficial Ownership): Hubungi Kami

INVESTASI ASING
- PMA: Mulai Rp8.000.000

SERTIFIKASI & IZIN
- Pendaftaran Merek: Mulai Rp5.000.000
- SBU (Sertifikat Badan Usaha): Mulai Rp25.000.000
- Sertifikasi SNI: Mulai Rp5.000.000
- Izin Umrah (PPIU): Hubungi Kami
- Ijin Haji (PIHK): Hubungi Kami
- Sertifikasi PPIU & PIHK: Hubungi Kami
- Akreditasi, IATA, BPOM, PIRT, Provider Visa, Sertifikasi Halal, ISO 9001/14000/45001,
  Sertifikat Profesi, Izin Kelistrikan, Sertifikasi SMK3, Izin Kementan: semua Hubungi Kami

PAJAK & KEUANGAN
- Audit Laporan Keuangan KAP: Mulai Rp8.500.000/tahun
- Pajak & EFIN: Mulai Rp1.000.000

WEBSITE & DIGITAL (Landing Page UMKM)
- Custom Statis (1 halaman HTML): Rp800.000, perpanjangan Rp250.000/tahun
- WP Landing Page (WordPress + Elementor): Rp1.490.000, perpanjangan Rp300.000/tahun
- WP Landing Page Panel (full akses admin): Rp1.900.000, perpanjangan Rp950.000/tahun

KONTAK RESMI (kalau user mau pesan/konsultasi lanjut, arahkan ke WhatsApp ini):
- Tomy: wa.me/628161636656
- Dana: wa.me/6281250505767

Gaya bicara: ramah, jelas, langsung ke poin. Kalau user tanya harga, sebutkan angka yang
sesuai dari daftar di atas. Kalau ditanya hal di luar topik legalitas/perizinan usaha,
arahkan sopan balik ke topik ini. SELALU tutup jawaban dengan ajakan konsultasi lebih
lanjut via WhatsApp untuk kepastian harga dan proses, karena harga di atas cuma
starting price.`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const usage = await checkUsage();
    if (!usage.allowed) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          reply: `Chat lagi istirahat sebentar karena pemakaian hari ini sudah penuh 🙏 Coba lagi dalam ${formatRemaining(usage.remainingMs)} ya, atau langsung WhatsApp Tomy (08161636656) / Dana (081250505767).`,
          limited: true
        })
      };
    }

    const { messages } = JSON.parse(event.body || '{}');
    if (!Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'messages kosong' }) };
    }

    const trimmedHistory = messages.slice(-10);
    const contents = trimmedHistory.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const model = 'gemini-3.6-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { maxOutputTokens: 2048 }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Gemini API error:', data);
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Gagal menghubungi AI' }) };
    }

    await incrementUsage(usage.store, usage.state);

    const finishReason = data?.candidates?.[0]?.finishReason;
    let reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n').trim();
    if (reply && finishReason === 'MAX_TOKENS') {
      reply += '\n\n_(Jawaban kepanjangan jadi kepotong -- ketik "lanjutkan" ya)_';
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: reply || 'Maaf, saya belum bisa jawab itu. Coba tanya dengan cara lain, atau langsung WhatsApp kami ya.' })
    };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Terjadi kesalahan di server' }) };
  }
};
