# Panduan Logika Matematika
## UMKM Financial Health Platform

Dokumen ini adalah panduan tim untuk menyepakati rumus, asumsi, contoh, dan edge case pada MVP. Semua skor di sini merupakan **heuristik produk**, bukan standar audit atau diagnosis keuangan resmi. Ambang batas perlu disepakati dan diuji dengan data contoh sebelum rilis.

## 1. Istilah dan asumsi

- **Saldo awal (`opening_balance`)**: uang bisnis saat mulai menggunakan aplikasi.
- **Pemasukan (`income`)**: uang masuk dalam periode.
- **Pengeluaran (`expense`)**: uang keluar dalam periode.
- **Biaya operasional (`operating_expense`)**: pengeluaran untuk menjalankan bisnis sehari-hari.
- **Kas tersedia (`available_cash`)**: saldo kas hasil saldo awal dan seluruh transaksi yang dicatat.
- **Periode analisis**: rentang tanggal yang dipakai menghitung indikator.

Rekomendasi default MVP: 30 hari terakhir. API tetap sebaiknya menerima `from` dan `to`. Samakan timezone dan batas tanggal di seluruh endpoint.

### Saldo kas tersedia

Jika pencatatan dimulai dari saldo awal dan semua transaksi setelahnya dicatat:

\[
available\_cash = opening\_balance + \sum income - \sum expense
\]

Contoh: saldo awal Rp2.000.000, pemasukan Rp5.000.000, pengeluaran Rp3.500.000. Kas tersedia = **Rp3.500.000**.

Saldo awal bukan transaksi pemasukan. Jangan menghitungnya dua kali. Rumus ini hanya akurat jika seluruh arus kas setelah saldo awal dicatat.

## 2. Perhitungan dashboard

### Total pemasukan dan pengeluaran

\[
total\_income = \sum amount \text{ untuk transaksi income}
\]

\[
total\_expense = \sum amount \text{ untuk transaksi expense}
\]

### Arus kas bersih

\[
net\_cash\_flow = total\_income - total\_expense
\]

- Positif: uang masuk lebih besar dari uang keluar.
- Negatif: uang keluar lebih besar dari uang masuk.
- Nol: uang masuk sama dengan uang keluar.

Contoh: income Rp8.000.000 dan expense Rp6.500.000 menghasilkan arus kas bersih **Rp1.500.000**.

### Rata-rata pengeluaran harian

\[
average\_daily\_expense = \frac{total\_expense}{N}
\]

`N` adalah jumlah hari kalender dalam periode. Contoh Rp6.000.000 / 30 hari = Rp200.000 per hari. Ini rata-rata, bukan pengeluaran aktual yang sama setiap hari.

## 3. Financial Health Score

Score 0–100 merangkum tiga indikator. Tampilkan score bersama nilai indikator dan penjelasannya.

Bobot awal yang diusulkan:

| Komponen | Bobot |
|---|---:|
| Cash Coverage | 35% |
| Operating Expense Ratio (OER) | 35% |
| Net Cash Flow Margin | 30% |
| **Total** | **100%** |

Bobot dan ambang di bawah adalah aturan produk awal, bukan standar universal.

### A. Cash Coverage

Mengukur berapa bulan biaya operasional rata-rata yang dapat ditutup kas tersedia.

\[
cash\_coverage\_months =
\frac{available\_cash}{average\_monthly\_operating\_expense}
\]

Normalisasi biaya operasional ke basis 30 hari:

\[
average\_monthly\_operating\_expense =
\frac{operating\_expense}{N} \times 30
\]

Contoh: kas Rp6.000.000 dan biaya operasional 30 hari Rp4.000.000 menghasilkan coverage **1,5 bulan**.

Tabel score usulan:

| Cash coverage | Score komponen |
|---|---:|
| < 0,5 bulan | 20 |
| 0,5 – < 1 bulan | 40 |
| 1 – < 2 bulan | 70 |
| 2 – < 3 bulan | 85 |
| >= 3 bulan | 100 |

Jika biaya operasional nol, komponen tidak tersedia (bukan otomatis 100). Jika kas <= 0 sementara biaya operasional > 0, score komponen 0. Jika data belum cukup, tandai belum tersedia.

### B. Operating Expense Ratio (OER)

Mengukur porsi pemasukan yang digunakan untuk biaya operasional.

\[
OER = \frac{operating\_expense}{revenue} \times 100\%
\]

Contoh: biaya operasional Rp6.000.000 dan revenue Rp10.000.000 menghasilkan OER **60%**.

Tabel score usulan (semakin rendah OER, semakin tinggi score):

| OER | Score komponen |
|---|---:|
| <= 30% | 100 |
| > 30% – 50% | 85 |
| > 50% – 70% | 70 |
| > 70% – 90% | 40 |
| > 90% | 20 |

Jika revenue = 0, OER tidak dapat dihitung. Jangan membagi dengan nol. OER hanya bermakna jika kategori operasional diinput dengan benar.

### C. Net Cash Flow Margin

Mengukur arus kas bersih sebagai persentase pemasukan.

\[
net\_cash\_flow\_margin =
\frac{total\_income - total\_expense}{total\_income} \times 100\%
\]

Contoh: income Rp10.000.000 dan expense Rp8.000.000 menghasilkan margin **20%**.

Tabel score usulan:

| Net cash flow margin | Score komponen |
|---|---:|
| >= 20% | 100 |
| 10% – < 20% | 85 |
| 0% – < 10% | 70 |
| -10% – < 0% | 40 |
| < -10% | 20 |

Jika pemasukan = 0, margin tidak dapat dihitung. Ini adalah margin arus kas sederhana, bukan net profit margin akuntansi.

### Menggabungkan score

Jika ketiga komponen tersedia:

\[
health\_score =
0{,}35S_{coverage} + 0{,}35S_{OER} + 0{,}30S_{cashflow}
\]

Contoh: score komponen 70, 85, dan 70:

\[
0{,}35(70) + 0{,}35(85) + 0{,}30(70) = 75{,}25
\]

Tampilan: **75/100** (pembulatan ke bilangan terdekat).

Label awal yang diusulkan:

| Score | Label |
|---|---|
| 80–100 | Sehat |
| 60–79 | Cukup sehat |
| 40–59 | Perlu perhatian |
| 0–39 | Berisiko |

**Kebijakan data kurang:** rekomendasi MVP adalah tidak menampilkan score jika salah satu komponen tidak dapat dihitung. Tampilkan “Score belum tersedia — lengkapi data pemasukan/pengeluaran”. Jangan mengganti komponen yang hilang dengan 0 atau 100.

## 4. Smart Runway Simulator

Runway memperkirakan berapa hari kas dapat bertahan jika pola net burn berlanjut. Ini estimasi, bukan prediksi pasti.

### Daily net burn

\[
daily\_net\_burn = \frac{total\_expense - total\_income}{N}
\]

- Positif: pengeluaran lebih besar daripada pemasukan (net burn).
- Nol: pemasukan sama dengan pengeluaran.
- Negatif: pemasukan lebih besar daripada pengeluaran.

Contoh: expense Rp9.000.000, income Rp6.000.000, periode 30 hari menghasilkan burn Rp100.000/hari.

### Runway days

Jika `daily_net_burn > 0` dan `available_cash > 0`:

\[
runway\_days = \frac{available\_cash}{daily\_net\_burn}
\]

Contoh kas Rp5.000.000 dan burn Rp100.000/hari = **50 hari**.

### What-if simulation

Input: `daily_income_assumption`, `daily_expense_assumption`, `simulation_days`.

\[
simulated\_daily\_net\_burn =
daily\_expense\_assumption - daily\_income\_assumption
\]

Jika burn positif:

\[
simulated\_runway\_days =
\frac{available\_cash}{simulated\_daily\_net\_burn}
\]

Proyeksi kas setelah beberapa hari:

\[
projected\_cash =
available\_cash +
(daily\_income\_assumption - daily\_expense\_assumption)
\times simulation\_days
\]

Contoh: kas Rp5.000.000, asumsi income Rp250.000/hari, expense Rp350.000/hari, durasi 30 hari. Burn Rp100.000/hari dan projected cash = **Rp2.000.000**.

Simulasi tidak boleh membuat, mengubah, atau menghapus transaksi aktual. Hasil simulasi hanya perhitungan sementara.

### Edge case runway

| Kondisi | Hasil |
|---|---|
| Burn > 0 dan kas > 0 | Hitung runway |
| Burn = 0 | `break_even`, runway `null` |
| Burn < 0 | `positive_cash_flow`, runway `null` |
| Kas <= 0 | `insufficient_cash`, runway `null` |
| Data historis belum cukup | `insufficient_data` |
| Proyeksi kas < 0 | Tampilkan estimasi defisit |

Jangan mengembalikan `Infinity`, `NaN`, atau runway negatif. `null` berarti runway tidak relevan/tidak dapat dihitung, bukan nol hari.

## 5. Business Insights berbasis aturan

MVP tidak membutuhkan AI/LLM. Gunakan aturan sederhana dari indikator:

| Kondisi | Insight |
|---|---|
| Net cash flow < 0 | Pengeluaran periode ini lebih besar daripada pemasukan. Tinjau pengeluaran yang dapat dikurangi. |
| Cash coverage < 1 bulan | Kas belum setara satu bulan biaya operasional. Perhatikan kebutuhan kas jangka dekat. |
| OER > 70% | Porsi pemasukan untuk biaya operasional cukup tinggi. Periksa kategori biaya terbesar. |
| Runway < 30 hari | Cadangan kas diperkirakan terbatas jika pola saat ini berlanjut. |
| Net cash flow > 0 dan coverage >= 1 bulan | Arus kas periode ini positif dan kas setara setidaknya satu bulan biaya operasional. |

Prioritaskan 2–3 insight paling penting. Jangan tampilkan insight jika indikatornya tidak tersedia.

## 6. Kategori transaksi

Contoh kategori income: penjualan, pendapatan jasa, pendapatan lain.

Contoh expense operasional: bahan baku, sewa, listrik/air/internet, transportasi operasional, gaji/upah, pemasaran.

Contoh expense non-operasional: pembelian aset/peralatan, pembayaran pokok pinjaman, penarikan uang pemilik.

Semua expense mengurangi kas dan masuk `total_expense`. Namun hanya expense operasional yang masuk `operating_expense` dan OER. Transfer antar rekening/kas milik bisnis sendiri bukan income atau expense karena dapat menggandakan angka arus kas.

## 7. Contoh perhitungan terpadu

Data usaha makanan selama 30 hari:

| Data | Nilai |
|---|---:|
| Saldo awal | Rp2.000.000 |
| Pemasukan | Rp10.000.000 |
| Pengeluaran operasional | Rp6.000.000 |
| Pengeluaran non-operasional | Rp1.000.000 |
| Total pengeluaran | Rp7.000.000 |

1. Kas tersedia = 2 jt + 10 jt - 7 jt = **Rp5.000.000**.
2. Arus kas bersih = 10 jt - 7 jt = **Rp3.000.000**.
3. Cash coverage = 5 jt / 6 jt = **0,83 bulan**, score 40.
4. OER = 6 jt / 10 jt = **60%**, score 70.
5. Net cash flow margin = 3 jt / 10 jt = **30%**, score 100.
6. Health score = 0,35(40) + 0,35(70) + 0,30(100) = **68,5**, tampilan 69/100 — Cukup sehat.
7. Daily net burn = (7 jt - 10 jt) / 30 = **-Rp100.000/hari**. Artinya tidak ada net burn pada periode tersebut; jangan tampilkan runway negatif.

Contoh ini memperlihatkan bahwa arus kas periode positif tidak otomatis berarti cadangan kas sudah besar.

## 8. Aturan implementasi backend

- Backend adalah sumber kebenaran perhitungan. Frontend hanya mengirim input dan menampilkan hasil API.
- Pisahkan logika ke service, misalnya `FinancialHealthService`, `RunwayService`, dan `BusinessInsightService`; controller menangani validasi dan response.
- Hindari `float`/`double` untuk menyimpan uang. Gunakan `DECIMAL/NUMERIC` atau integer rupiah. Di PHP, gunakan integer rupiah atau pendekatan decimal yang konsisten.
- Bulatkan hanya untuk tampilan/response, bukan di tengah perhitungan.
- Validasi amount > 0; type hanya `income`/`expense`; tanggal valid; asumsi simulasi >= 0; `simulation_days` bilangan bulat positif (misalnya maksimum 365); `from` <= `to`.
- Seluruh transaksi harus difilter berdasarkan user yang login.
- Dashboard, Financial Health, Runway, dan Insights harus memakai definisi agregasi dan periode yang konsisten.

### Pseudocode runway

```text
days = number_of_calendar_days(from_date, to_date)

if days <= 0:
    return validation_error

daily_net_burn = (total_expense - total_income) / days

if available_cash <= 0:
    status = "insufficient_cash"
    runway_days = null
else if daily_net_burn > 0:
    status = "net_burn"
    runway_days = available_cash / daily_net_burn
else if daily_net_burn == 0:
    status = "break_even"
    runway_days = null
else:
    status = "positive_cash_flow"
    runway_days = null
```

### Contoh response Financial Health

```json
{
  "period": {"from": "2026-10-13", "to": "2026-11-11", "days": 30},
  "score": 69,
  "label": "fair",
  "components": {
    "cash_coverage": {"value_months": 0.83, "score": 40, "status": "available"},
    "operating_expense_ratio": {"value_percent": 60, "score": 70, "status": "available"},
    "net_cash_flow_margin": {"value_percent": 30, "score": 100, "status": "available"}
  },
  "explanation": "Skor dipengaruhi oleh cadangan kas yang kurang dari satu bulan biaya operasional."
}
```

### Contoh response Runway

```json
{
  "period": {"from": "2026-10-13", "to": "2026-11-11", "days": 30},
  "available_cash": 5000000,
  "daily_net_burn": -100000,
  "runway_days": null,
  "status": "positive_cash_flow",
  "message": "Arus kas bersih periode ini positif; runway tidak dihitung."
}
```

Nama field dan format response di atas adalah usulan; selaraskan dengan API contract tim.

## 9. Test case minimum

| Area | Skenario | Ekspektasi |
|---|---|---|
| Cash balance | Saldo 2 jt, income 5 jt, expense 3 jt | Kas 4 jt |
| Net cash flow | Income 8 jt, expense 6 jt | Positif 2 jt |
| Net cash flow | Income 4 jt, expense 6 jt | Negatif 2 jt |
| OER | Revenue 0 | Tidak dihitung, tidak error |
| Cash coverage | Operating expense 0 | Tidak tersedia |
| Health score | Salah satu komponen hilang | Score tidak dipaksakan |
| Runway | Burn 100 rb/hari, kas 5 jt | 50 hari |
| Runway | Burn 0 | `break_even` |
| Runway | Burn < 0 | `positive_cash_flow` |
| Runway | Kas <= 0 | `insufficient_cash` |
| Simulation | Asumsi berubah | Hasil berubah |
| Simulation | Simulasi dijalankan | Transaksi aktual tidak berubah |
| User isolation | User A meminta transaksi user B | Ditolak/tidak ditemukan |

## 10. Keputusan yang wajib disepakati tim

1. Periode default: 30 hari terakhir atau bulan kalender?
2. Kategori mana yang termasuk biaya operasional?
3. Apakah score hanya tersedia jika ketiga komponen lengkap? Rekomendasi MVP: ya.
4. Ambang batas score dan label mana yang dipakai?
5. Apakah saldo awal adalah saldo saat pencatatan dimulai dan semua transaksi setelahnya wajib dicatat?
6. Apakah transaksi non-operasional tersedia di MVP?
7. Angka API dikirim sebagai integer rupiah atau string decimal?

**Urutan implementasi yang disarankan:** pastikan saldo dan agregasi dashboard benar terlebih dahulu. Setelah itu buat Cash Coverage, OER, Net Cash Flow Margin, Health Score, lalu Runway Simulator. Jangan mulai dari score sebelum definisi saldo awal, pemasukan, pengeluaran, kategori, dan periode sudah jelas.

---

## 📎 Dokumen Terkait

| Dokumen | Relevansi |
| :--- | :--- |
| **[Product Requirements Document (prd.md)](prd.md)** | Kebutuhan produk dan latar belakang bisnis dari formula yang dirumuskan di sini |
| **[Dokumentasi Backend (backend.md)](backend.md)** | Implementasi konkret formula ini di Service Layer Laravel (`FinancialHealthService`, `RunwayService`) |
| **[Spesifikasi API Contract (api-contract.md)](api-contract.md)** | Format response JSON dari perhitungan metrik finansial untuk konsumsi frontend |
| **[Dokumentasi Frontend (frontend.md)](frontend.md)** | Penyajian visual skor kesehatan (HealthGauge) dan simulasi runway di sisi klien |
