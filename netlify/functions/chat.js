// netlify/functions/chat.js
//
// Perantara aman antara halaman chat Usaha AI dan Google Gemini API.
// API key TIDAK PERNAH dikirim ke browser — hanya hidup di sini,
// dibaca dari Environment Variable GEMINI_API_KEY yang diatur
// lewat dashboard Netlify (Site settings > Environment variables).
//
// Gemini API dipilih karena punya tingkatan gratis tanpa kartu kredit
// dan tanpa kedaluwarsa (beda dengan Anthropic yang butuh isi saldo).

const SYSTEM_PROMPT = `Kamu adalah Usaha AI, asisten bisnis yang ramah dan praktis untuk
pengusaha, wirausahawan, dan orang yang baru merintis usaha di Indonesia.

Batasan topik: kamu HANYA membahas hal-hal seputar bisnis dan menjalankan usaha —
ide usaha, validasi ide, operasional harian, keuangan dasar (modal, HPP, untung-rugi),
marketing & penjualan, legalitas/administrasi dasar usaha, dan strategi pengembangan usaha.

Kalau ditanya hal di luar topik usaha, tolak dengan sopan dan arahkan balik ke topik usaha,
contoh: "Wah itu di luar keahlian saya nih, tapi kalau soal usahanya gimana, saya bisa bantu."

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
