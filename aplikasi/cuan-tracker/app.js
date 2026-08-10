/* ==========================================================
   CUAN TRACKER — prototipe demo
   Semua data disimpan di localStorage browser (belum server).
   Password disimpan polos untuk demo — JANGAN dipakai produksi.
   ========================================================== */

const CT_USERS_KEY = 'ct_users';
const CT_SESSION_KEY = 'ct_session';

/* --- Placeholder: ganti setelah produk Lynk.id dibuat --- */
const CT_LYNKID_URL = 'https://lynk.id/tomyoneclick';
/* Daftar kode valid — semi-manual dulu, tambah/hapus kode di sini tiap ada penjualan lewat Lynk.id */
/* Angka di kanan = durasi aktif dalam bulan */
const CT_CODES = {
  'RCPRO6-DEMO-0001': 6,
  'RCPRO6-DEMO-0002': 6,
  'RCPRO12-DEMO-0001': 12,
  'RCPRO12-DEMO-0002': 12,
};

function ctFmtRp(n){
  n = Number(n) || 0;
  return 'Rp ' + n.toLocaleString('id-ID');
}
function ctToday(){
  return new Date().toISOString().slice(0,10);
}
function ctFmtDate(iso){
  if(!iso) return '-';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
}
function ctAddMonths(iso, months){
  const d = new Date(iso + 'T00:00:00');
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0,10);
}
function ctDaysBetween(a, b){
  return Math.round((new Date(b+'T00:00:00') - new Date(a+'T00:00:00')) / 86400000);
}
function ctUid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,7);
}

/* ---------- storage helpers ---------- */
function ctGetUsers(){
  return JSON.parse(localStorage.getItem(CT_USERS_KEY) || '{}');
}
function ctSaveUsers(users){
  localStorage.setItem(CT_USERS_KEY, JSON.stringify(users));
}
function ctDataKey(username){
  return 'ct_data_' + username;
}
function ctGetData(username){
  const raw = localStorage.getItem(ctDataKey(username));
  if(raw) return JSON.parse(raw);
  return {
    profil: {nama:'', usaha:'', jenis:'', sejak:'', alamat:'', telp:'', updatedAt:''},
    modal: {modalAwal:0, items:[], updatedAt:''},
    pengeluaran: [],
    pemasukan: []
  };
}
function ctSaveData(username, data){
  localStorage.setItem(ctDataKey(username), JSON.stringify(data));
}
function ctCurrentUser(){
  return localStorage.getItem(CT_SESSION_KEY) || '';
}

/* ---------- view switching (auth) ---------- */
function ctShow(which){
  document.getElementById('form-login').style.display = which==='login' ? 'block':'none';
  document.getElementById('form-register').style.display = which==='register' ? 'block':'none';
  document.getElementById('form-forgot').style.display = which==='forgot' ? 'block':'none';
  document.getElementById('login-error').innerHTML = '';
  document.getElementById('register-error').innerHTML = '';
  document.getElementById('forgot-error').innerHTML = '';
  document.getElementById('fg-step2').style.display = 'none';
}
function ctErr(id, msg){
  document.getElementById(id).innerHTML = '<div class="ct-error">'+msg+'</div>';
}

/* ---------- register ---------- */
function ctRegister(){
  const nama = document.getElementById('rg-nama').value.trim();
  const usaha = document.getElementById('rg-usaha').value.trim();
  const jenis = document.getElementById('rg-jenis').value;
  const username = document.getElementById('rg-username').value.trim();
  const pass = document.getElementById('rg-password').value;
  const pass2 = document.getElementById('rg-password2').value;
  const sq = document.getElementById('rg-sq').value;
  const sa = document.getElementById('rg-sa').value.trim();

  if(!nama || !usaha || !username || !pass || !sa){
    ctErr('register-error','Semua kolom wajib diisi ya.'); return;
  }
  if(pass.length < 4){
    ctErr('register-error','Kata sandi minimal 4 karakter.'); return;
  }
  if(pass !== pass2){
    ctErr('register-error','Konfirmasi kata sandi tidak sama.'); return;
  }
  const users = ctGetUsers();
  if(users[username]){
    ctErr('register-error','Username sudah dipakai, coba yang lain.'); return;
  }
  users[username] = {
    nama, usaha, jenis, password: pass,
    securityQuestion: sq, securityAnswer: sa.toLowerCase(),
    tier: 'prototype',
    createdAt: ctToday()
  };
  ctSaveUsers(users);

  const data = ctGetData(username);
  data.profil = {nama, usaha, jenis, sejak:'', updatedAt: ctToday()};
  ctSaveData(username, data);

  localStorage.setItem(CT_SESSION_KEY, username);
  ctEnterApp();
}

/* ---------- login ---------- */
function ctLogin(){
  const username = document.getElementById('li-username').value.trim();
  const pass = document.getElementById('li-password').value;
  const users = ctGetUsers();
  if(!users[username] || users[username].password !== pass){
    ctErr('login-error','Username atau kata sandi salah.'); return;
  }
  localStorage.setItem(CT_SESSION_KEY, username);
  ctEnterApp();
}
function ctLogout(){
  localStorage.removeItem(CT_SESSION_KEY);
  document.getElementById('view-app').style.display = 'none';
  document.getElementById('view-auth').style.display = 'block';
  ctShow('login');
}

/* ---------- forgot password ---------- */
let ctForgotUsername = '';
function ctCheckUser(){
  const username = document.getElementById('fg-username').value.trim();
  const users = ctGetUsers();
  if(!users[username]){
    ctErr('forgot-error','Username tidak ditemukan.'); return;
  }
  ctForgotUsername = username;
  document.getElementById('fg-question-label').textContent = users[username].securityQuestion;
  document.getElementById('fg-step2').style.display = 'block';
  document.getElementById('forgot-error').innerHTML = '';
}
function ctResetPassword(){
  const users = ctGetUsers();
  const u = users[ctForgotUsername];
  const answer = document.getElementById('fg-answer').value.trim().toLowerCase();
  const newpass = document.getElementById('fg-newpass').value;
  if(answer !== u.securityAnswer){
    ctErr('forgot-error','Jawaban keamanan tidak cocok.'); return;
  }
  if(newpass.length < 4){
    ctErr('forgot-error','Kata sandi baru minimal 4 karakter.'); return;
  }
  u.password = newpass;
  ctSaveUsers(users);
  document.getElementById('forgot-error').innerHTML = '<div class="ct-success">Kata sandi berhasil diganti. Silakan masuk.</div>';
  document.getElementById('fg-step2').style.display = 'none';
  setTimeout(()=>ctShow('login'), 1200);
}

/* ---------- tier & professional upgrade ---------- */
function ctIsPro(){
  const users = ctGetUsers();
  const u = users[ctCurrentUser()];
  if(!u || u.tier !== 'professional') return false;
  if(u.proExpiry && ctToday() > u.proExpiry){
    u.tier = 'prototype';
    ctSaveUsers(users);
    return false;
  }
  return true;
}
function ctOpenUpgrade(){
  window.open(CT_LYNKID_URL, '_blank');
}
function ctGetUsedCodes(){
  return JSON.parse(localStorage.getItem('ct_used_codes') || '[]');
}
function ctRedeemCode(){
  const codeInput = document.getElementById('redeem-code');
  const msg = document.getElementById('redeem-msg');
  const code = codeInput.value.trim().toUpperCase();
  if(!code){ msg.textContent = 'Masukkan kode dulu.'; msg.style.color = '#A32D2D'; return; }

  const used = ctGetUsedCodes();
  if(!(code in CT_CODES)){
    msg.textContent = 'Kode tidak dikenali.'; msg.style.color = '#A32D2D'; return;
  }
  if(used.includes(code)){
    msg.textContent = 'Kode ini sudah pernah dipakai.'; msg.style.color = '#A32D2D'; return;
  }
  used.push(code);
  localStorage.setItem('ct_used_codes', JSON.stringify(used));

  const durasiBulan = CT_CODES[code];
  const expiry = ctAddMonths(ctToday(), durasiBulan);

  const users = ctGetUsers();
  users[ctCurrentUser()].tier = 'professional';
  users[ctCurrentUser()].proExpiry = expiry;
  users[ctCurrentUser()].proDurasi = durasiBulan;
  ctSaveUsers(users);

  msg.textContent = `Berhasil! Professional aktif sampai ${ctFmtDate(expiry)}.`; msg.style.color = '#3B6D11';
  codeInput.value = '';
  ctApplyTierUI();
  ctRenderSaran();
}
function ctApplyTierUI(){
  const pro = ctIsPro();
  const users = ctGetUsers();
  const u = users[ctCurrentUser()] || {};
  const badge = document.getElementById('topbar-badge');

  badge.textContent = pro ? 'Professional' : 'Prototipe';
  badge.className = 'ct-badge' + (pro ? ' pro' : '');
  document.getElementById('topbar-upgrade-btn').style.display = pro ? 'none' : 'inline';
  document.getElementById('ct-redeem-box').style.display = pro ? 'none' : 'flex';

  document.getElementById('pf-pro-fields').style.display = pro ? 'block' : 'none';
  document.getElementById('pf-pro-locked').style.display = pro ? 'none' : 'block';

  document.getElementById('pm-chart-box').style.display = pro ? 'block' : 'none';
  document.getElementById('pm-chart-locked').style.display = pro ? 'none' : 'block';

  document.getElementById('saran-pro-content').style.display = pro ? 'block' : 'none';
  document.getElementById('saran-locked').style.display = pro ? 'none' : 'block';

  /* banner masa aktif */
  const banner = document.getElementById('ct-expiry-banner');
  if(pro && u.proExpiry){
    const sisaHari = ctDaysBetween(ctToday(), u.proExpiry);
    if(sisaHari <= 14){
      banner.style.display = 'flex';
      banner.className = 'ct-expiry-banner warn';
      banner.innerHTML = `⏳ Masa aktif Professional kamu tinggal ${sisaHari} hari lagi (habis ${ctFmtDate(u.proExpiry)}). <button class="ct-btn ct-btn-ghost" onclick="ctOpenUpgrade()">Perpanjang sekarang</button>`;
    } else {
      banner.style.display = 'none';
    }
  } else if(!pro && u.proExpiry){
    banner.style.display = 'flex';
    banner.className = 'ct-expiry-banner expired';
    banner.innerHTML = `🔒 Masa aktif Professional kamu sudah habis pada ${ctFmtDate(u.proExpiry)}. Fitur Professional dinonaktifkan sementara. <button class="ct-btn ct-btn-primary" style="width:auto;padding-left:20px;padding-right:20px" onclick="ctOpenUpgrade()">Perpanjang</button>`;
  } else {
    banner.style.display = 'none';
  }
}


function ctEnterApp(){
  const username = ctCurrentUser();
  const users = ctGetUsers();
  document.getElementById('topbar-name').textContent = users[username] ? users[username].nama : username;
  document.getElementById('view-auth').style.display = 'none';
  document.getElementById('view-app').style.display = 'block';
  ctApplyTierUI();
  ctRenderAll();
}

/* ---------- tabs ---------- */
function ctTab(name){
  document.querySelectorAll('.ct-tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===name));
  document.querySelectorAll('.ct-panel').forEach(p=>p.classList.toggle('active', p.id==='panel-'+name));
  if(name==='saran') ctRenderSaran();
  if(name==='pemasukan') ctRenderChart();
}

/* ---------- profil ---------- */
function ctSaveProfil(){
  const username = ctCurrentUser();
  const data = ctGetData(username);
  data.profil = {
    nama: document.getElementById('pf-nama').value.trim(),
    usaha: document.getElementById('pf-usaha').value.trim(),
    jenis: document.getElementById('pf-jenis').value.trim(),
    sejak: document.getElementById('pf-sejak').value,
    alamat: document.getElementById('pf-alamat').value.trim(),
    telp: document.getElementById('pf-telp').value.trim(),
    updatedAt: ctToday()
  };
  ctSaveData(username, data);
  ctRenderProfil();
}
function ctRenderProfil(){
  const data = ctGetData(ctCurrentUser());
  document.getElementById('pf-nama').value = data.profil.nama || '';
  document.getElementById('pf-usaha').value = data.profil.usaha || '';
  document.getElementById('pf-jenis').value = data.profil.jenis || '';
  document.getElementById('pf-sejak').value = data.profil.sejak || '';
  document.getElementById('pf-alamat').value = data.profil.alamat || '';
  document.getElementById('pf-telp').value = data.profil.telp || '';
  document.getElementById('pf-updated').textContent = data.profil.updatedAt ? ('Terakhir diubah: '+ctFmtDate(data.profil.updatedAt)) : '';
}

/* ---------- modal ---------- */
function ctSaveModalAwal(){
  const username = ctCurrentUser();
  const data = ctGetData(username);
  data.modal.modalAwal = Number(document.getElementById('md-awal').value) || 0;
  data.modal.updatedAt = ctToday();
  ctSaveData(username, data);
  ctRenderModal();
}
function ctAddModalItem(){
  const nama = document.getElementById('md-item-nama').value.trim();
  const jumlah = Number(document.getElementById('md-item-jumlah').value) || 0;
  if(!nama || jumlah<=0) return;
  const username = ctCurrentUser();
  const data = ctGetData(username);
  data.modal.items.push({id:ctUid(), nama, jumlah, tanggal: ctToday()});
  data.modal.updatedAt = ctToday();
  ctSaveData(username, data);
  document.getElementById('md-item-nama').value='';
  document.getElementById('md-item-jumlah').value='';
  ctRenderModal();
}
function ctDeleteModalItem(id){
  const username = ctCurrentUser();
  const data = ctGetData(username);
  data.modal.items = data.modal.items.filter(i=>i.id!==id);
  ctSaveData(username, data);
  ctRenderModal();
}
function ctRenderModal(){
  const data = ctGetData(ctCurrentUser());
  document.getElementById('md-awal').value = data.modal.modalAwal || '';
  const list = document.getElementById('md-list');
  if(data.modal.items.length===0){
    list.innerHTML = '<div class="ct-empty">Belum ada rincian pengeluaran awal.</div>';
  } else {
    list.innerHTML = data.modal.items.map(i=>`
      <div class="ct-item">
        <div><div class="nm">${i.nama}</div><div class="dt">${ctFmtDate(i.tanggal)}</div></div>
        <div class="amt">${ctFmtRp(i.jumlah)}</div>
        <button class="del" onclick="ctDeleteModalItem('${i.id}')" aria-label="Hapus">&times;</button>
      </div>`).join('');
  }
  const totalAwal = data.modal.items.reduce((s,i)=>s+i.jumlah,0);
  document.getElementById('md-total-awal').textContent = ctFmtRp(totalAwal);
  document.getElementById('md-sisa').textContent = ctFmtRp((data.modal.modalAwal||0) - totalAwal);
}

/* ---------- pengeluaran ---------- */
function ctAddPengeluaran(){
  const jenis = document.getElementById('pg-jenis').value;
  const nama = document.getElementById('pg-nama').value.trim();
  const jumlah = Number(document.getElementById('pg-jumlah').value) || 0;
  const tanggal = document.getElementById('pg-tanggal').value || ctToday();
  if(!nama || jumlah<=0) return;
  const username = ctCurrentUser();
  const data = ctGetData(username);
  data.pengeluaran.push({id:ctUid(), jenis, nama, jumlah, tanggal});
  ctSaveData(username, data);
  document.getElementById('pg-nama').value='';
  document.getElementById('pg-jumlah').value='';
  ctRenderPengeluaran();
}
function ctDeletePengeluaran(id){
  const username = ctCurrentUser();
  const data = ctGetData(username);
  data.pengeluaran = data.pengeluaran.filter(i=>i.id!==id);
  ctSaveData(username, data);
  ctRenderPengeluaran();
}
function ctRenderPengeluaran(){
  const data = ctGetData(ctCurrentUser());
  const list = document.getElementById('pg-list');
  if(data.pengeluaran.length===0){
    list.innerHTML = '<div class="ct-empty">Belum ada pengeluaran tercatat.</div>';
  } else {
    list.innerHTML = [...data.pengeluaran].reverse().map(i=>`
      <div class="ct-item">
        <div><div class="nm">${i.nama} ${i.jenis==='lain'?'<span style="color:#D85A30;font-size:.8rem">(lain-lain)</span>':''}</div><div class="dt">${ctFmtDate(i.tanggal)}</div></div>
        <div class="amt">${ctFmtRp(i.jumlah)}</div>
        <button class="del" onclick="ctDeletePengeluaran('${i.id}')" aria-label="Hapus">&times;</button>
      </div>`).join('');
  }
  const total = data.pengeluaran.reduce((s,i)=>s+i.jumlah,0);
  document.getElementById('pg-total').textContent = ctFmtRp(total);
}

/* ---------- pemasukan ---------- */
function ctAddPemasukan(){
  const nama = document.getElementById('pm-nama').value.trim();
  const jumlah = Number(document.getElementById('pm-jumlah').value) || 0;
  const tanggal = document.getElementById('pm-tanggal').value || ctToday();
  if(!nama || jumlah<=0) return;
  const username = ctCurrentUser();
  const data = ctGetData(username);
  data.pemasukan.push({id:ctUid(), nama, jumlah, tanggal});
  ctSaveData(username, data);
  document.getElementById('pm-nama').value='';
  document.getElementById('pm-jumlah').value='';
  ctRenderPemasukan();
}
function ctDeletePemasukan(id){
  const username = ctCurrentUser();
  const data = ctGetData(username);
  data.pemasukan = data.pemasukan.filter(i=>i.id!==id);
  ctSaveData(username, data);
  ctRenderPemasukan();
}
function ctRenderPemasukan(){
  const data = ctGetData(ctCurrentUser());
  const list = document.getElementById('pm-list');
  if(data.pemasukan.length===0){
    list.innerHTML = '<div class="ct-empty">Belum ada pemasukan tercatat.</div>';
  } else {
    list.innerHTML = [...data.pemasukan].reverse().map(i=>`
      <div class="ct-item">
        <div><div class="nm">${i.nama}</div><div class="dt">${ctFmtDate(i.tanggal)}</div></div>
        <div class="amt" style="color:var(--green-600)">${ctFmtRp(i.jumlah)}</div>
        <button class="del" onclick="ctDeletePemasukan('${i.id}')" aria-label="Hapus">&times;</button>
      </div>`).join('');
  }
  const total = data.pemasukan.reduce((s,i)=>s+i.jumlah,0);
  document.getElementById('pm-total').textContent = ctFmtRp(total);
  ctRenderChart();
}

/* ---------- chart (canvas sederhana, tanpa library) ---------- */
function ctRenderChart(){
  const canvas = document.getElementById('pm-chart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = 180;
  canvas.width = w*dpr; canvas.height = h*dpr;
  ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,w,h);

  const data = ctGetData(ctCurrentUser());
  const dates = [...new Set([...data.pemasukan, ...data.pengeluaran].map(i=>i.tanggal))].sort().slice(-7);
  if(dates.length===0){
    ctx.fillStyle = '#6B7488';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('Belum ada data buat digrafikkan.', 10, h/2);
    return;
  }
  const perDay = dates.map(d=>{
    const masuk = data.pemasukan.filter(i=>i.tanggal===d).reduce((s,i)=>s+i.jumlah,0);
    const keluar = data.pengeluaran.filter(i=>i.tanggal===d).reduce((s,i)=>s+i.jumlah,0);
    return {d, net: masuk-keluar};
  });
  const maxAbs = Math.max(1, ...perDay.map(p=>Math.abs(p.net)));
  const barW = w/perDay.length;
  const mid = h/2;
  perDay.forEach((p,idx)=>{
    const barH = (Math.abs(p.net)/maxAbs) * (h/2-24);
    const x = idx*barW + barW*0.2;
    const bw = barW*0.6;
    ctx.fillStyle = p.net>=0 ? '#16C265' : '#D85A30';
    if(p.net>=0){ ctx.fillRect(x, mid-barH, bw, barH); }
    else { ctx.fillRect(x, mid, bw, barH); }
  });
  ctx.strokeStyle = '#E3E7F1';
  ctx.beginPath(); ctx.moveTo(0,mid); ctx.lineTo(w,mid); ctx.stroke();
}

/* ---------- rekap bulanan (Professional) ---------- */
function ctMonthlyRecap(){
  const data = ctGetData(ctCurrentUser());
  const months = new Set();
  data.pemasukan.forEach(i=>months.add(i.tanggal.slice(0,7)));
  data.pengeluaran.forEach(i=>months.add(i.tanggal.slice(0,7)));
  if(data.modal.updatedAt) months.add(data.modal.updatedAt.slice(0,7));

  const sorted = [...months].sort();
  const modalMonth = data.modal.updatedAt ? data.modal.updatedAt.slice(0,7) : null;
  const namaBulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  return sorted.map(m=>{
    const [y, mm] = m.split('-');
    const pemasukanBulan = data.pemasukan.filter(i=>i.tanggal.slice(0,7)===m).reduce((s,i)=>s+i.jumlah,0);
    const pengeluaranBulan = data.pengeluaran.filter(i=>i.tanggal.slice(0,7)===m).reduce((s,i)=>s+i.jumlah,0);
    return {
      label: namaBulan[Number(mm)-1] + ' ' + y,
      modal: m===modalMonth ? (data.modal.modalAwal||0) : null,
      pemasukan: pemasukanBulan,
      pengeluaran: pengeluaranBulan,
      surplus: pemasukanBulan - pengeluaranBulan
    };
  });
}


function ctCalc(){
  const data = ctGetData(ctCurrentUser());
  const totalPemasukan = data.pemasukan.reduce((s,i)=>s+i.jumlah,0);
  const totalPengeluaran = data.pengeluaran.reduce((s,i)=>s+i.jumlah,0);
  const totalPengeluaranAwal = data.modal.items.reduce((s,i)=>s+i.jumlah,0);
  const labaRugi = totalPemasukan - totalPengeluaran;
  const margin = totalPemasukan>0 ? (labaRugi/totalPemasukan*100) : 0;
  const jumlahHari = Math.max(1, new Set(data.pemasukan.map(i=>i.tanggal)).size);
  const rataLabaHarian = labaRugi / jumlahHari;
  const sisaModal = (data.modal.modalAwal||0) - totalPengeluaranAwal;
  const bepHari = rataLabaHarian>0 ? Math.ceil(sisaModal>0 ? sisaModal/rataLabaHarian : 0) : null;
  const pengeluaranLainCount = data.pengeluaran.filter(i=>i.jenis==='lain').length;

  let trendNaik = false;
  if(data.pemasukan.length>=3){
    const last3 = [...data.pemasukan].slice(-3).map(i=>i.jumlah);
    trendNaik = last3[2] > last3[0];
  }
  return {data, totalPemasukan, totalPengeluaran, totalPengeluaranAwal, labaRugi, margin, rataLabaHarian, sisaModal, bepHari, pengeluaranLainCount, trendNaik};
}

function ctRenderSaran(){
  const c = ctCalc();
  const val = document.getElementById('sr-labarugi');
  val.textContent = ctFmtRp(c.labaRugi);
  val.className = 'val ' + (c.labaRugi>=0 ? 'pos':'neg');
  document.getElementById('sr-margin').textContent = c.totalPemasukan>0 ? ('Margin '+c.margin.toFixed(1)+'%') : 'Belum ada pemasukan';
  document.getElementById('sr-bep').textContent = c.bepHari ? (c.bepHari+' hari lagi (estimasi)') : (c.sisaModal<=0 ? 'Modal awal sudah balik' : 'Belum bisa dihitung');

  const arusKas = [], efisiensi = [], potensi = [];

  if(c.data.pemasukan.length===0 && c.data.pengeluaran.length===0){
    arusKas.push({type:'', text:'Mulai catat pemasukan dan pengeluaran harianmu supaya saran di sini bisa muncul.'});
  }
  if(c.labaRugi < 0){
    arusKas.push({type:'warn', text:`Usahamu sedang rugi ${ctFmtRp(Math.abs(c.labaRugi))}. Cek pengeluaran terbesar di tab Pengeluaran, dan pertimbangkan memangkas biaya yang tidak wajib dulu.`});
  }
  if(c.bepHari && c.bepHari>0){
    arusKas.push({type:'', text:'Dengan rata-rata laba saat ini, modal awalmu diperkirakan balik dalam sekitar '+c.bepHari+' hari lagi.'});
  } else if(c.sisaModal<=0 && c.totalPengeluaranAwal>0){
    arusKas.push({type:'good', text:'Modal awalmu sudah balik sepenuhnya dari hasil usaha. Mantap!'});
  }

  if(c.totalPemasukan>0 && c.margin>0 && c.margin<10){
    efisiensi.push({type:'warn', text:`Margin keuntunganmu masih tipis (${c.margin.toFixed(1)}%). Coba naikkan harga jual sedikit, atau cari supplier/bahan baku dengan harga lebih murah.`});
  }
  if(c.pengeluaranLainCount>=3){
    const totalLain = c.data.pengeluaran.filter(i=>i.jenis==='lain').reduce((s,i)=>s+i.jumlah,0);
    efisiensi.push({type:'warn', text:`Pengeluaran tak terduga sudah muncul ${c.pengeluaranLainCount} kali (total ${ctFmtRp(totalLain)}). Sisihkan dana darurat khusus usaha supaya tidak mengganggu modal utama.`});
  }
  if(efisiensi.length===0 && c.data.pengeluaran.length>0){
    efisiensi.push({type:'good', text:'Pengeluaranmu cukup terkendali, belum ada tanda pemborosan berulang.'});
  }

  if(c.labaRugi>0 && c.trendNaik){
    potensi.push({type:'good', text:'Tren labamu naik dalam beberapa catatan terakhir. Pertimbangkan sisihkan sebagian keuntungan buat nambah stok atau modal usaha.'});
  }
  if(c.totalPemasukan>0 && c.margin>=20){
    potensi.push({type:'good', text:`Margin kamu sudah cukup sehat (${c.margin.toFixed(1)}%). Ini saat yang bagus buat mulai eksplorasi produk/layanan baru.`});
  }
  if(potensi.length===0){
    potensi.push({type:'', text:'Terus catat data harian secara konsisten supaya sistem bisa kasih saran pertumbuhan yang lebih akurat.'});
  }

  function renderGroup(title, items){
    if(items.length===0) return '';
    return `<h3 style="margin-top:20px;font-size:1.1rem">${title}</h3>` +
      items.map(s=>`<div class="ct-saran-card ${s.type}">${s.text}</div>`).join('');
  }

  document.getElementById('sr-list').innerHTML =
    renderGroup('💰 Arus Kas', arusKas) +
    renderGroup('✂️ Efisiensi Pengeluaran', efisiensi) +
    renderGroup('📈 Potensi Pertumbuhan', potensi);
}

/* ---------- reset per tab ---------- */
function ctResetTab(tab){
  if(!confirm('Yakin mau hapus semua data di tab ini? Tindakan ini tidak bisa dibatalkan.')) return;
  const username = ctCurrentUser();
  const data = ctGetData(username);
  if(tab==='profil') data.profil = {nama:'', usaha:'', jenis:'', sejak:'', alamat:'', telp:'', updatedAt:''};
  if(tab==='modal') data.modal = {modalAwal:0, items:[], updatedAt:''};
  if(tab==='pengeluaran') data.pengeluaran = [];
  if(tab==='pemasukan') data.pemasukan = [];
  ctSaveData(username, data);
  ctRenderAll();
}

/* ---------- export Word ---------- */
function ctExportWord(){
  if(!ctIsPro()){
    alert('Cetak laporan cuma tersedia di paket Professional.');
    return;
  }
  const c = ctCalc();
  const recap = ctMonthlyRecap();
  const recapRows = recap.map(r=>`
    <tr>
      <td>${r.label}</td>
      <td>${r.modal!==null ? ctFmtRp(r.modal) : '-'}</td>
      <td>${ctFmtRp(r.pengeluaran)}</td>
      <td>${ctFmtRp(r.pemasukan)}</td>
      <td>${r.surplus>=0 ? ctFmtRp(r.surplus) : '-'+ctFmtRp(Math.abs(r.surplus))}</td>
    </tr>`).join('') || '<tr><td colspan="5">Belum ada data</td></tr>';

  const content = `
    <div style="border-bottom:2px solid #1D4FD8;padding-bottom:10px;margin-bottom:16px">
      <h1 style="font-family:Calibri,Arial,sans-serif;margin-bottom:2px">${c.data.profil.usaha || 'Nama Usaha'}</h1>
      <p style="margin:0">${c.data.profil.alamat || ''}${c.data.profil.alamat && c.data.profil.telp ? ' · ' : ''}${c.data.profil.telp ? 'Telp: '+c.data.profil.telp : ''}</p>
    </div>

    <p><b>Pemilik:</b> ${c.data.profil.nama || '-'}<br>
    <b>Jenis usaha:</b> ${c.data.profil.jenis || '-'}<br>
    <b>Tanggal laporan:</b> ${ctFmtDate(ctToday())}</p>

    <h2>Ringkasan keuangan</h2>
    <table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
      <tr><td>Modal awal</td><td>${ctFmtRp(c.data.modal.modalAwal||0)}</td></tr>
      <tr><td>Total pengeluaran awal</td><td>${ctFmtRp(c.totalPengeluaranAwal)}</td></tr>
      <tr><td>Total pemasukan</td><td>${ctFmtRp(c.totalPemasukan)}</td></tr>
      <tr><td>Total pengeluaran</td><td>${ctFmtRp(c.totalPengeluaran)}</td></tr>
      <tr><td><b>Laba / rugi</b></td><td><b>${ctFmtRp(c.labaRugi)}</b></td></tr>
    </table>

    <h2>Rekap bulanan</h2>
    <table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
      <tr><th>Bulan</th><th>Modal</th><th>Pengeluaran</th><th>Pemasukan</th><th>Surplus/Defisit</th></tr>
      ${recapRows}
    </table>

    <h2>Rincian pemasukan</h2>
    <table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
      <tr><th>Tanggal</th><th>Nama</th><th>Jumlah</th></tr>
      ${c.data.pemasukan.map(i=>`<tr><td>${ctFmtDate(i.tanggal)}</td><td>${i.nama}</td><td>${ctFmtRp(i.jumlah)}</td></tr>`).join('') || '<tr><td colspan="3">Belum ada data</td></tr>'}
    </table>

    <h2>Rincian pengeluaran</h2>
    <table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
      <tr><th>Tanggal</th><th>Nama</th><th>Jenis</th><th>Jumlah</th></tr>
      ${c.data.pengeluaran.map(i=>`<tr><td>${ctFmtDate(i.tanggal)}</td><td>${i.nama}</td><td>${i.jenis==='lain'?'Lain-lain':'Operasional'}</td><td>${ctFmtRp(i.jumlah)}</td></tr>`).join('') || '<tr><td colspan="4">Belum ada data</td></tr>'}
    </table>

    <h2>Saran &amp; solusi</h2>
    <p>${document.getElementById('sr-list').innerText.split('\\n').filter(Boolean).join('<br><br>') || 'Belum ada saran.'}</p>

    <p style="margin-top:24px;font-size:.85rem;color:#6B7488">Dicetak otomatis oleh Cuan Tracker Professional — Republik Cuan</p>
  `;
  const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Laporan Cuan Tracker</title></head>
    <body>${content}</body></html>`;
  const blob = new Blob(['\ufeff', html], {type:'application/msword'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Laporan-CuanTracker-' + ctToday() + '.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ---------- render all ---------- */
function ctRenderAll(){
  ctRenderProfil();
  ctRenderModal();
  ctRenderPengeluaran();
  ctRenderPemasukan();
  ctRenderSaran();
}

/* ---------- init ---------- */
window.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('pg-tanggal').value = ctToday();
  document.getElementById('pm-tanggal').value = ctToday();
  const username = ctCurrentUser();
  const users = ctGetUsers();
  if(username && users[username]){
    ctEnterApp();
  }
  window.addEventListener('resize', ctRenderChart);
});
