// netlify/functions/rss.js
// 1) Proxy RSS:      /.netlify/functions/rss?url=<alamat-rss>
// 2) Cek embeddable: /.netlify/functions/rss?check=<alamat-artikel>  -> {"embeddable":true|false}
// Hanya domain berita yang didaftarkan di bawah yang boleh diakses.

const ALLOWED = ['cnbcindonesia.com', 'kontan.co.id', 'cnnindonesia.com'];
const okHost = (h) => ALLOWED.some((d) => h === d || h.endsWith('.' + d));
const UA = 'Mozilla/5.0 (compatible; RepublikCuanBot/1.0; +https://republikcuan.web.id)';

function parse(raw) {
  try { const u = new URL(raw); return u.protocol === 'https:' && okHost(u.hostname) ? u : null; } catch (e) { return null; }
}
async function get(u, accept) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try { return await fetch(u.toString(), { signal: ctrl.signal, headers: { 'User-Agent': UA, Accept: accept } }); }
  finally { clearTimeout(t); }
}
const json = (o) => ({ statusCode: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }, body: JSON.stringify(o) });

exports.handler = async (event) => {
  const q = event.queryStringParameters || {};

  if (q.check) {
    const u = parse(q.check);
    if (!u) return json({ embeddable: false });
    try {
      const res = await get(u, 'text/html');
      if (res.body && res.body.cancel) res.body.cancel();
      const xfo = (res.headers.get('x-frame-options') || '').trim();
      const csp = res.headers.get('content-security-policy') || '';
      const fa = (csp.match(/frame-ancestors([^;]*)/i) || [])[1];
      const blocked = !res.ok || xfo !== '' || (fa !== undefined && fa.trim() !== '*');
      return json({ embeddable: !blocked });
    } catch (e) { return json({ embeddable: false }); }
  }

  const u = parse(q.url);
  if (!u) return { statusCode: 403, body: 'URL tidak valid atau domain tidak diizinkan' };
  try {
    const res = await get(u, 'application/rss+xml, application/xml, text/xml, */*');
    if (!res.ok) return { statusCode: 502, body: 'Sumber membalas ' + res.status };
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=120, s-maxage=300' },
      body: await res.text(),
    };
  } catch (e) { return { statusCode: 504, body: 'Gagal mengambil RSS' }; }
};
