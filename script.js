// Format angka ke Rupiah
function formatRupiah(angka) {
  return 'Rp ' + Math.round(angka).toLocaleString('id-ID');
}

// Logika utama perhitungan
function hitung(harga, jumlah) {
  const subtotal = harga * jumlah;

  // Tentukan persentase diskon
  let pctDiskon = 0;
  if (jumlah >= 10)     pctDiskon = 10;
  else if (jumlah >= 5) pctDiskon = 5;

  const nilaiDiskon = subtotal * pctDiskon / 100;
  const total       = subtotal - nilaiDiskon;
  const bonusItem   = Math.floor(jumlah / 10);

  // Tampilkan baris utama
  document.getElementById('out-harga').textContent    = formatRupiah(harga);
  document.getElementById('out-jumlah').textContent   = jumlah + ' item';
  document.getElementById('out-subtotal').textContent = formatRupiah(subtotal);
  document.getElementById('out-total').textContent    = formatRupiah(total);

  // Tampilkan baris diskon (jika ada)
  const rowDiskon = document.getElementById('row-diskon');
  if (pctDiskon > 0) {
    rowDiskon.style.display = 'flex';
    document.getElementById('out-diskon-label').textContent = 'Diskon ' + pctDiskon + '%';
    document.getElementById('out-diskon').textContent = '- ' + formatRupiah(nilaiDiskon);
  } else {
    rowDiskon.style.display = 'none';
  }

  // Tampilkan baris bonus (jika ada)
  const rowBonus = document.getElementById('row-bonus');
  if (bonusItem > 0) {
    rowBonus.style.display = 'flex';
    document.getElementById('out-bonus').textContent = bonusItem + ' item gratis';
  } else {
    rowBonus.style.display = 'none';
  }

  // Tampilkan section hasil
  document.getElementById('hasil-section').style.display = 'block';

  // Tampilkan pesan info
  const infoEl = document.getElementById('info-bonus');
  let infoText = '';

  if (jumlah >= 10) {
    infoText = '🎉 Selamat! Anda mendapat diskon 10%' +
               (bonusItem > 0 ? ' dan ' + bonusItem + ' item bonus gratis!' : '!');
  } else if (jumlah >= 5) {
    infoText = '👍 Anda mendapat diskon 5%. Tambah ' +
               (10 - jumlah) + ' item lagi untuk diskon 10% + bonus!';
  } else {
    infoText = 'ℹ️ Beli 5 item atau lebih untuk mendapatkan diskon spesial!';
  }

  infoEl.style.display = 'block';
  document.getElementById('out-info-text').textContent = infoText;
}

// Hitung otomatis saat mengetik
function hitungOtomatis() {
  const harga  = parseFloat(document.getElementById('harga-produk').value);
  const jumlah = parseInt(document.getElementById('jumlah-pembelian').value);
  if (harga > 0 && jumlah > 0) hitung(harga, jumlah);
}

// Validasi & submit form
function submitForm() {
  const nama   = document.getElementById('nama-pelanggan').value.trim();
  const produk = document.getElementById('nama-produk').value.trim();
  const harga  = parseFloat(document.getElementById('harga-produk').value);
  const jumlah = parseInt(document.getElementById('jumlah-pembelian').value);
  const errEl  = document.getElementById('error-msg');

  if (!nama || !produk || !harga || !jumlah) {
    errEl.style.display = 'block';
    errEl.textContent   = '⚠️ Harap lengkapi semua field terlebih dahulu.';
    return;
  }
  if (harga <= 0 || jumlah <= 0) {
    errEl.style.display = 'block';
    errEl.textContent   = '⚠️ Harga dan jumlah harus lebih dari 0.';
    return;
  }

  errEl.style.display = 'none';
  hitung(harga, jumlah);
}

// Reset semua field & hasil
function resetForm() {
  ['nama-pelanggan', 'nama-produk', 'harga-produk', 'jumlah-pembelian']
    .forEach(id => document.getElementById(id).value = '');

  document.getElementById('hasil-section').style.display = 'none';
  document.getElementById('info-bonus').style.display    = 'none';
  document.getElementById('error-msg').style.display     = 'none';
}