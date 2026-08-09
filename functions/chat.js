// netlify/functions/chat.js
//
// Perantara aman antara halaman chat Usaha AI dan API Anthropic.
// API key TIDAK PERNAH dikirim ke browser — hanya hidup di sini,
// dibaca dari Environment Variable ANTHROPIC_API_KEY yang diatur
// lewat dashboard Netlify (Site settings > Environment variables).

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
  // CORS + hanya izinkan POST
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

    // Batasi riwayat yang dikirim biar hemat token (10 pesan terakhir cukup)
    const trimmedHistory = messages.slice(-10);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 700,
        system: SYSTEM_PROMPT,
        messages: trimmedHistory
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Gagal menghubungi AI' }) };
    }

    const reply = (data.content || [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();

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
