// netlify/functions/chat.js
//
// Perantara aman antara halaman chat Usaha AI dan Google Gemini API.
// API key TIDAK PERNAH dikirim ke browser — hanya hidup di sini,
// dibaca dari Environment Variable GEMINI_API_KEY yang diatur
// lewat dashboard Netlify (Site settings > Environment variables).
//
// Gemini API dipilih karena punya tingkatan gratis tanpa kartu kredit
// dan tanpa kedaluwarsa (beda dengan Anthropic yang butuh isi saldo).

const { getStore } = require('@netlify/blobs');

// ---------- Batasan pemakaian harian (biar kuota gratis Gemini nggak habis) ----------
// Ganti angka ini sesuai kuota harian akun Gemini kamu (cek di Google AI Studio ->
// halaman quota/limits akun kamu). Ini cuma perkiraan awal, sesuaikan kalau perlu.
const DAILY_LIMIT = 300;          // perkiraan jumlah chat yang aman per hari
const WARN_THRESHOLD = 0.9;       // 90% dari limit -> mulai "istirahat"
const COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6 jam istirahat, sama seperti Claude

async function checkUsage() {
  const store = getStore('usaha-ai-usage');
  const raw = await store.get('counter', { type: 'json' });
  const now = Date.now();

  let state = raw || { count: 0, cycleStart: now, blockedAt: null };

  // Cycle otomatis reset tiap 24 jam sejak cycle terakhir mulai
  if (now - state.cycleStart > 24 * 60 * 60 * 1000) {
    state = { count: 0, cycleStart: now, blockedAt: null };
  }

  // Kalau lagi masa istirahat (blocked), cek apakah 6 jam-nya udah lewat
  if (state.blockedAt) {
    const elapsed = now - state.blockedAt;
    if (elapsed < COOLDOWN_MS) {
      const remainingMs = COOLDOWN_MS - elapsed;
      return { allowed: false, remainingMs, state };
    }
    // 6 jam sudah lewat -> reset total, mulai cycle baru
    state = { count: 0, cycleStart: now, blockedAt: null };
  }

  const usageRatio = state.count / DAILY_LIMIT;
  if (usageRatio >= WARN_THRESHOLD) {
    state.blockedAt = now;
    await store.setJSON('counter', state);
    return { allowed: false, remainingMs: COOLDOWN_MS, state };
  }

  return { allowed: true, state, store };
}

async function incrementUsage(store, state) {
  state.count += 1;
  await store.setJSON('counter', state);
}

function formatRemaining(ms) {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours} jam ${minutes} menit`;
  return `${minutes} menit`;
}

const SYSTEM_PROMPT = `Kamu adalah Usaha AI, asisten pintar dan ramah dari Republik Cuan.

Kamu boleh menjawab pertanyaan apa saja yang ditanyakan user — nggak dibatasi cuma
topik bisnis/usaha. Fokus utamamu tetap membantu soal usaha (ide usaha, validasi ide,
operasional harian, keuangan dasar, marketing, legalitas, resep/formulasi produk,
strategi pengembangan usaha), dan itu yang paling kamu kuasai — tapi kalau user tanya
hal lain (pengetahuan umum, teknologi, kesehatan sehari-hari, pelajaran, dll), tetap
jawab dengan baik dan solutif, jangan ditolak.

Gaya jawaban: relevan sama pertanyaannya (jangan melenceng ke topik lain), langsung
kasih solusi/jawaban konkret duluan, baru penjelasan singkat kalau perlu — bukan teori
berbelit. Kalau pertanyaannya butuh langkah-langkah, kasih dalam bentuk poin yang jelas.

Untuk topik sensitif seperti medis, hukum, atau keuangan yang butuh keputusan besar,
tetap kasih info umum yang membantu, tapi ingatkan user buat konsultasi ke ahli/pihak
resmi untuk keputusan final — jangan berperan seolah kamu pengganti dokter/pengacara/
konsultan resmi.

Gaya bicara: santai tapi kredibel, bahasa Indonesia sehari-hari, jawaban singkat dan
langsung ke tindakan konkret (bukan teori berbelit). Untuk topik legal/pajak yang rumit,
beri info umum tapi sarankan konsultasi ke pihak resmi — jangan berperan sebagai konsultan
hukum/pajak resmi.`;

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
          reply: `Usaha AI lagi istirahat sebentar karena pemakaian hari ini sudah penuh 🙏 Coba lagi dalam ${formatRemaining(usage.remainingMs)} ya.`,
          limited: true
        })
      };
    }

    const { messages } = JSON.parse(event.body || '{}');

    if (!Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'messages kosong' }) };
    }

    // Batasi riwayat yang dikirim biar hemat kuota (10 pesan terakhir cukup)
    const trimmedHistory = messages.slice(-10);

    // Gemini pakai format "contents" dengan role user/model (bukan user/assistant)
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
        generationConfig: { maxOutputTokens: 700 }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Gagal menghubungi AI' }) };
    }

    // Sukses -> hitung pemakaian
    await incrementUsage(usage.store, usage.state);

    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n').trim();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: reply || 'Maaf, saya belum bisa jawab itu. Coba tanya dengan cara lain ya.' })
    };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Terjadi kesalahan di server' }) };
  }
};
