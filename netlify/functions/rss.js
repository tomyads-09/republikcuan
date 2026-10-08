// netlify/functions/rss.js
//
// Proxy RSS milik sendiri untuk halaman RC News 24.
// Dipanggil dari browser: /.netlify/functions/rss?url=<alamat-rss>
// Hanya domain di daftar PUTIH di bawah yang boleh diambil (biar tidak disalahgunakan).

const ALLOWED_HOSTS = [
  'www.cnbcindonesia.com',
  'investasi.kontan.co.id',
  'keuangan.kontan.co.id',
  'www.kontan.co.id',
  'www.cnnindonesia.com',
];

exports.handler = async (event) => {
  const target = (event.queryStringParameters || {}).url || '';
  let u;
  try { u = new URL(target); } catch (e) { return { statusCode: 400, body: 'URL tidak valid' }; }

  if (u.protocol !== 'https:' || !ALLOWED_HOSTS.includes(u.hostname)) {
    return { statusCode: 403, body: 'Domain tidak diizinkan' };
  }

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(u.toString(), {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RepublikCuanBot/1.0; +https://republikcuan.web.id)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    clearTimeout(timer);
    if (!res.ok) return { statusCode: 502, body: 'Sumber membalas ' + res.status };
    const xml = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=120, s-maxage=300',
      },
      body: xml,
    };
  } catch (e) {
    return { statusCode: 504, body: 'Gagal mengambil RSS' };
  }
};
