# Design System & UI/UX Specification
## UMKM Financial Health Platform

**Dokumen:** `design.md`  
**Peruntukan:** Frontend Engineer (React + Vite + Tailwind CSS)  
**Versi:** 1.0 — MVP Production-Ready  
**Prinsip Desain:** *Anti AI Slop*, Pragmatis, Ergonomis, Ramah UMKM, Data-Dense tapi Bersih.

---

## 1. Filosofi Desain:

### Standar Kita: *Honest, Grounded, & Purpose-Built*
1. **Light-Theme First & High Contrast:** Pemilik UMKM sering mencatat transaksi di lingkungan terang (toko, warung, dapur produksi). Kita prioritaskan kontras tinggi, latar netral hangat (*warm slate*), dan minim silau.
2. **Tabular & Numerik Jelas:** Format Rupiah (`Rp 1.250.000`) selalu menggunakan *tabular numbers* (`font-mono` atau CSS `font-variant-numeric: tabular-nums`) agar perbandingan digit sejajar vertikal dan tidak bergoyang saat angka berubah.
3. **Ergonomi Input Cepat:** Mengurangi jumlah klik/tap. Input nominal dilengkapi tombol cepat (chips), tanggal otomatis terisi "Hari ini", dan tombol aksi utama (*floating/sticky*) mudah dijangkau jempol di layar HP.
4. **Transparansi Tanpa Mistis:** Skor kesehatan keuangan dan simulasi runway bukan *black-box*. Tampilan selalu menyandingkan: **Angka $\rightarrow$ Penjelasan Logis $\rightarrow$ Rekomendasi Nyata**.

---

## 2. Design Tokens & Visual Language

### 2.1 Palet Warna (Tailwind Utility Mapping)
Palet menggunakan nuansa **Deep Spruce (Hijau Pinus)** sebagai warna utama (mewakili stabilitas finansial, kas, dan pertumbuhan terpercaya), dipadukan dengan **Warm Neutral (Slate/Zinc)**.

| Token | Tailwind Class | Nilai HEX | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Canvas / Background** | `bg-slate-50` | `#F8FAFC` | Latar utama aplikasi |
| **Surface / Card** | `bg-white` | `#FFFFFF` | Latar kartu, modal, popover, dan panel |
| **Border Subtil** | `border-slate-200` | `#E2E8F0` | Garis pembatas kartu, tabel, dan form |
| **Border Fokus** | `border-slate-400` | `#94A3B8` | Garis batas input aktif |
| **Text Primary** | `text-slate-900` | `#0F172A` | Judul, angka nominal penting, teks utama |
| **Text Secondary** | `text-slate-600` | `#475569` | Label form, subjudul, deskripsi pendek |
| **Text Muted** | `text-slate-400` | `#94A3B8` | Placeholder, tanggal sekunder, breadcrumb |
| **Brand Primary** | `bg-emerald-700` | `#047857` | Tombol aksi utama (CTA), active state navigasi |
| **Brand Primary Hover**| `hover:bg-emerald-800` | `#065F46` | Hover state tombol CTA |
| **Brand Subtle** | `bg-emerald-50 text-emerald-800` | `#ECFDF5` | Badge kategori pemasukan, chip aktif |
| **Income (Pemasukan)** | `text-emerald-600` / `bg-emerald-50` | `#059669` | Nilai kas masuk, tag transaksi `income` |
| **Expense (Pengeluaran)**| `text-rose-600` / `bg-rose-50` | `#E11D48` | Nilai kas keluar, tag transaksi `expense`, alert |
| **Warning / Net Burn** | `text-amber-600` / `bg-amber-50` | `#D97706` | Status runway menipis, peringatan opex |
| **Informative Blue** | `text-sky-700` / `bg-sky-50` | `#0369A1` | Badge tips operasional, info asumsi kalkulasi |

### 2.2 Tipografi
- **Font Utama (Interface):** `Inter`, `Plus Jakarta Sans`, atau sistem sans-serif native (`font-sans`).
- **Font Angka / Monospace:** `JetBrains Mono`, `Roboto Mono`, atau `font-mono` dengan aturan CSS:
  ```css
  .tabular-nums {
    font-variant-numeric: tabular-nums;
  }
  ```
- **Skala Tipografi:**
  - `Display / Saldo Utama`: `text-2xl font-bold tracking-tight text-slate-900 md:text-3xl`
  - `Section Header (H1/H2)`: `text-lg font-semibold text-slate-900 md:text-xl`
  - `Card Header / Metric Title`: `text-xs font-medium uppercase tracking-wider text-slate-500`
  - `Body Text`: `text-sm font-normal text-slate-700 leading-relaxed`
  - `Caption & Helper Text`: `text-xs font-normal text-slate-500`
  - `Table Data`: `text-sm font-normal text-slate-800 tabular-nums`

### 2.3 Radius, Elevasi, dan Garis
- **Border Radius:** Gunakan `rounded-lg` (8px) untuk kartu, form, dan modal; `rounded-md` (6px) untuk tombol dan input fields; `rounded-full` hanya untuk badge/pill status. Hindari `rounded-3xl` atau `rounded-2xl` berlebihan.
- **Shadow:** Minimalkan drop shadow kabur. Utamakan batas garis tegas:
  - Kartu Standar: `border border-slate-200 bg-white shadow-xs`
  - Floating Action/Modal: `border border-slate-200 bg-white shadow-lg`

---

## 3. Desain Komponen Inti (Core Atoms & Molecules)

### 3.1 Stat Metric Card (Dashboard & Health)
Kartu metrik yang jelas dan langsung terbaca dalam 2 detik:
```html
<div class="rounded-lg border border-slate-200 bg-white p-5 shadow-xs">
  <div class="flex items-center justify-between">
    <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Saldo Kas Saat Ini</span>
    <span class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
      Real-time
    </span>
  </div>
  <div class="mt-2 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
    Rp 12.450.000
  </div>
  <p class="mt-1 text-xs text-slate-500">
    Dari saldo awal + akumulasi transaksi s.d. hari ini
  </p>
</div>
```

### 3.2 Input Uang Khusus Rupiah (Currency Input)
Input field yang mencegah kesalahan pengetikan digit dan angka negatif:
```html
<div class="space-y-1.5">
  <label for="amount" class="block text-xs font-semibold uppercase tracking-wider text-slate-700">
    Nominal Transaksi <span class="text-rose-500">*</span>
  </label>
  <div class="relative rounded-md shadow-xs">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <span class="font-mono text-sm font-semibold text-slate-400">Rp</span>
    </div>
    <input
      type="text"
      inputmode="numeric"
      name="amount"
      id="amount"
      placeholder="0"
      class="block w-full rounded-md border border-slate-300 py-2.5 pl-10 pr-3 font-mono text-base font-semibold text-slate-900 placeholder:text-slate-300 focus:border-emerald-600 focus:outline-hidden focus:ring-1 focus:ring-emerald-600 tabular-nums"
    />
  </div>
  <!-- Quick chips for fast mobile tap -->
  <div class="flex flex-wrap gap-1.5 pt-1">
    <button type="button" class="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">+50rb</button>
    <button type="button" class="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">+100rb</button>
    <button type="button" class="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">+500rb</button>
    <button type="button" class="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">+1jt</button>
  </div>
</div>
```

### 3.3 Transaction Type Switcher (Pemasukan vs Pengeluaran)
Bukan radio button kecil, melainkan segmented control besar:
```html
<div class="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
  <button
    type="button"
    class="flex items-center justify-center gap-2 rounded-md bg-white py-2 text-sm font-semibold text-emerald-700 shadow-xs transition"
  >
    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
    Pemasukan (Uang Masuk)
  </button>
  <button
    type="button"
    class="flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
  >
    <span class="h-2 w-2 rounded-full bg-rose-500"></span>
    Pengeluaran (Uang Keluar)
  </button>
</div>
```

### 3.4 Financial Health Gauge Meter (0-100)
Hindari diagram lingkaran abstrak. Gunakan meter linier tersegmentasi dengan zona risiko jelas:
```html
<div class="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
  <div class="flex items-baseline justify-between">
    <div>
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Skor Kesehatan Keuangan</span>
      <h3 class="text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">74<span class="text-lg font-normal text-slate-400">/100</span></h3>
    </div>
    <span class="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
      Kondisi Sehat
    </span>
  </div>

  <!-- Segmented Progress Bar -->
  <div class="mt-4 grid grid-cols-4 gap-1.5">
    <div class="h-2 rounded-l-full bg-rose-400" title="Kritis (0-39)"></div>
    <div class="h-2 bg-amber-400" title="Waspada (40-59)"></div>
    <div class="h-2 bg-emerald-500" title="Sehat (60-79)"></div>
    <div class="h-2 rounded-r-full bg-slate-200" title="Prima (80-100)"></div>
  </div>
  <div class="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
    <span>0 (Kritis)</span>
    <span>40 (Waspada)</span>
    <span>60 (Sehat)</span>
    <span>80 (Prima)</span>
  </div>

  <p class="mt-4 text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
    <strong>Kesimpulan:</strong> Kas Anda cukup menutup biaya operasional rutin selama 1.8 bulan ke depan, namun rasio pengeluaran bahan baku perlu diawasi.
  </p>
</div>
```

---

## 4. Struktur Navigasi & Tata Letak (Layout Architecture)

### 4.1 Master Shell
Aplikasi mengusung pola **Side-Navigation (Desktop)** dan **Bottom Sticky Bar (Mobile)**:
- **Desktop (md & lg):** Sidebar ramping 240px di kiri. Berisi Logo, Identitas Usaha terpilih, menu navigasi, dan tombol logout di bawah. Area konten di kanan dengan `max-w-6xl mx-auto`.
- **Mobile (< 768px):** Header atas minimalis (Nama Usaha + Saldo Cepat) dan Bottom Navigation Bar dengan 4 menu utama + 1 Tombol Tambah Transaksi (*Fab / Quick Center Action*).

```
+---------------------------------------------------------------+
|                        DESKTOP LAYOUT                         |
+---------------+-----------------------------------------------+
| [LOGO]        | Topbar: [Pilihan Periode: 30 Hari Terakhir v] |
| Warung Bu Siti|                                      [Profil] |
|---------------+-----------------------------------------------+
| [Dashboard]   | MAIN CONTENT AREA (max-w-6xl)                 |
| [Transaksi]   | - Stat Summary Row (4 Kartu)                  |
| [Kesehatan]   | - Cashflow Chart & Health Summary             |
| [Simulasi]    | - Recent Transactions List                    |
| [Pengaturan]  |                                               |
|               |                                               |
| [Logout]      |                                               |
+---------------+-----------------------------------------------+

+-----------------------------+
|        MOBILE LAYOUT        |
+-----------------------------+
| Header: Warung Bu Siti      |
| Saldo: Rp 12.450.000        |
+-----------------------------+
|                             |
| Content (Scrollable)        |
| - Kartu Saldo & Net Flow    |
| - Tombol Aksi Cepat         |
| - List Transaksi Terkini    |
|                             |
+-----------------------------+
| [Dash] [Tx]  (+)  [Hlth] [Sim] | <-- Bottom Bar Fixed
+-----------------------------+
```

---

## 5. Spesifikasi Detail Per Halaman

### 5.1 Authentication (Login & Register)
- **Karakter:** Layout 2-kolom di desktop (Kiri: ilustrasi kartu metrik nyata/branding netral, Kanan: Card form bersih).
- **Elemen Register:**
  - Nama Pengguna, Email, Kata Sandi.
  - Setup Cepat Usaha: Nama Usaha (misal: "Katering Berkah"), Jenis Usaha (Kuliner, Jasa, Retail), Saldo Awal Kas (Rp).
- **Validasi Visual:** Pesan error *inline* tepat di bawah field yang salah, bukan alert pop-up acak.

### 5.2 Dashboard (Pusat Kendali 30 Hari)
Halaman utama yang menjawab pertanyaan pemilik bisnis saat membuka aplikasi:
1. **Header Bar:**
   - Sambutan & Nama Toko: `Warung Bu Siti`
   - Filter Periode: Default `30 Hari Terakhir` dengan opsi `7 Hari Terakhir`, `Bulan Ini`, `Semua`.
2. **Stat Cards Row (4 Kolom):**
   - **Saldo Kas Saat Ini:** Nilai absolut kas riil saat ini (Saldo Awal + Kumulatif Income - Kumulatif Expense).
   - **Total Pemasukan (30 Hari):** Warna font emerald dengan jumlah transaksi.
   - **Total Pengeluaran (30 Hari):** Warna font rose dengan jumlah transaksi.
   - **Arus Kas Bersih (Net Cash Flow):** Pemasukan dikurangi Pengeluaran periode ini. Jika positif: hijau; jika negatif: merah dengan label `Defisit Kas`.
3. **Primary Analytics Grid (2 Kolom di Desktop):**
   - **Kiri (60%): Grafik Arus Kas Harian/Mingguan (Recharts Bar/Area)**
     - Menampilkan batang hijau (pemasukan) berdampingan dengan batang merah (pengeluaran). Tooltip menampilkan tanggal dan nominal bersih.
   - **Kanan (40%): Widget Kesehatan & Runway Cepat**
     - Skor 0-100 mini.
     - Estimasi Runway: `Kas bertahan ~45 Hari lagi` (atau `Aman: Arus kas positif`).
     - 1 Insight prioritas tertinggi (misal: `"Pengeluaran naik 24% minggu ini untuk bahan baku"`).
4. **Recent Transactions Table:** 5 transaksi terakhir dengan tombol langsung `"Lihat Semua Transaksi $\rightarrow$"`.

### 5.3 Transactions (Pencatatan & Manajemen Kas)
Fokus halaman ini adalah **kecepatan input** dan **kemudahan pencarian**:
1. **Control Bar:**
   - Filter Tipe: `Semua`, `Pemasukan`, `Pengeluaran`.
   - Filter Kategori: Dropdown sederhana atau scrollable pills.
   - Tombol Utama: `+ Catat Transaksi Baru` (Primary Emerald Button).
2. **Tabel Data (Desktop):**
   - Kolom: `Tanggal`, `Keterangan`, `Kategori (Pill)`, `Tipe`, `Nominal (Right aligned, tabular-nums)`, `Aksi (Edit / Hapus)`.
   - Zebra striping subtil (`odd:bg-white even:bg-slate-50/50`).
3. **List Card (Mobile):**
   - Format kartu ringkas: Baris atas = Kategori + Tanggal; Baris bawah = Keterangan + Nominal besar (`+Rp 150.000` hijau atau `-Rp 85.000` merah).
4. **Modal / Drawer Tambah Transaksi:**
   - Menggunakan drawer dari bawah di mobile (*bottom sheet*), dan modal di tengah di desktop.
   - Segmented Switch: `Pemasukan` vs `Pengeluaran`.
   - Field: Tanggal (default: hari ini), Nominal (dengan shortcut chip), Kategori (pilihan cepat: Bahan Baku, Operasional, Gaji, Penjualan, dll.), Catatan opsional.
   - Tombol submit jelas: `Simpan Transaksi (Enter)`.

### 5.4 Financial Health (Analisis Kesehatan Transparan)
Halaman ini adalah *core differentiator* di kompetisi, sehingga harus terlihat analitis dan profesional:
1. **Header Skor:**
   - Skor total 0-100 dengan status jelas (`Sehat`, `Cukup`, `Perlu Perhatian`, `Kritis`).
   - Penjelasan formula ringkas: *"Dihitung dari 3 pilar: Cadangan Kas (35%), Beban Operasional (35%), dan Margin Kas (30%)"*.
2. **Breakdown 3 Indikator:**
   Setiap pilar disajikan dalam kartu terpisah:
   - **Pilar 1: Cash Coverage (Cadangan Kas)**
     - *Nilai:* `2.1x Biaya Bulanan`
     - *Skor Komponen:* `80/100`
     - *Penjelasan:* Menunjukkan berapa lama kas dapat menutupi biaya operasional bulanan tanpa ada pemasukan sama sekali. Standar aman UMKM: > 1.5x.
   - **Pilar 2: Operating Expense Ratio (Rasio Biaya Operasional)**
     - *Nilai:* `62% dari Pendapatan`
     - *Skor Komponen:* `70/100`
     - *Penjelasan:* Persentase pemasukan yang terserap langsung untuk operasional harian.
   - **Pilar 3: Net Cash Flow Margin (Margin Arus Kas Bersih)**
     - *Nilai:* `+18%`
     - *Skor Komponen:* `75/100`
     - *Penjelasan:* Sisa kas dari total pendapatan setelah seluruh pengeluaran dipotong.
3. **Actionable Insights & Recommendations:**
   - Menampilkan kartu rekomendasi berbasis aturan sederhana.
   - Contoh: Kartu Amber dengan ikon lampu: *"Porsi pembelian Bahan Baku mencapai 55% dari total pengeluaran. Pertimbangkan negosiasi harga grosir atau kurangi pemborosan stok."*

### 5.5 Smart Runway Simulator (Simulasi What-If)
Alat bantu simulasi tanpa mengubah data asli:
1. **Kondisi Dasar (Baseline Info Bar):**
   - Menampilkan data riil dari 30 hari terakhir: Kas Tersedia (`Rp 12.450.000`), Rata-rata Pemasukan Harian (`Rp 400.000`), Rata-rata Pengeluaran Harian (`Rp 350.000`), Net Burn/Surplus Harian (`+Rp 50.000/hari`).
2. **Interactive Simulation Panel (Form Simulasi):**
   - Slider / Number Input interaktif:
     - Asumsi Pemasukan Harian (bisa diubah nominal atau slider persentase $-50\%$ s.d. $+50\%$).
     - Asumsi Pengeluaran Harian (bisa diubah nominal atau slider persentase).
   - Tombol `Hitung Simulasi` dan `Reset ke Data Asli`.
3. **Hasil Simulasi (Simulation Output Card):**
   - **Kondisi 1: Net Burn Positif (Pengeluaran > Pemasukan):**
     - Box warna Amber/Rose: `Estimasi Kas Bertahan: 42 Hari`.
     - Keterangan tanggal: *"Dengan defisit Rp 150.000/hari, kas Anda diperkirakan habis pada 24 Desember 2026."*
   - **Kondisi 2: Cashflow Positif (Pemasukan >= Pengeluaran):**
     - Box warna Emerald: `Kas Berkelanjutan (Surplus Kas)`.
     - Keterangan: *"Bisnis Anda menghasilkan surplus kas Rp 80.000/hari. Tidak terjadi pembakaran kas (runway tak terbatas selama tren berlanjut)."*
4. **Catatan Disclaimer & Keterbatasan:**
   - Catatan di bagian bawah: *"Hasil simulasi ini merupakan estimasi matematis berbasis asumsi statis. Tidak memperhitungkan faktor piutang tak tertagih atau kejadian luar biasa."*

### 5.6 Business Profile & Settings
- Nama Usaha, Bidang Usaha.
- Nilai Saldo Awal (dengan keterangan edukatif: *"Saldo awal digunakan sebagai titik tolak kas Anda dan bukan dihitung sebagai omzet pemasukan"*).
- Informasi Akun Pengguna & Opsi Keluar (*Logout*).

---

## 6. Penanganan State Khusus (Zero & Edge States)

Aplikasi yang dinilai juri kompetisi sering diuji dengan data ekstrem atau data kosong. Kita siapkan spesifikasi visualnya:

| Kondisi State | Komponen / Halaman | Tampilan Visual yang Diterapkan |
| :--- | :--- | :--- |
| **Empty State (Belum ada transaksi)** | Dashboard & Transaksi | Jangan tampilkan tabel kosong atau error. Tampilkan ilustrasi garis sederhana, teks: *"Belum ada transaksi di periode ini"*, dan tombol CTA besar: `+ Catat Pemasukan Pertama`. |
| **Data Belum Cukup** | Financial Health | Jika transaksi < 3 hari atau data belum representatif: tampilkan badge abu-abu: *"Data Belum Memadai (Minimal butuh 3 catatan transaksi operasional untuk menghitung skor)"*. |
| **Kas Nol / Negatif** | Runway Simulator | Tampilkan kartu waspada merah: *"Kas Tersedia Habis / Negatif. Anda memerlukan suntikan dana tunai segera untuk menutupi biaya harian."* |
| **Loading State** | Seluruh Card & Tabel | Gunakan **Skeleton Shimmer** (`animate-pulse bg-slate-200 h-6 w-3/4 rounded`), jangan spinner berputar di tengah layar kosong. |
| **Error 422 / Validasi** | Form Input | Border input berubah `border-rose-500`, teks merah kecil di bawah field: *"Nominal harus lebih besar dari 0"*. |

---

## 7. Responsive Breakpoint Strategy

| Breakpoint | Target Layar | Penyesuaian Layout |
| :--- | :--- | :--- |
| **Mobile (`< 640px`)** | Smartphone vertikal | Single column layout, kartu metrik ditumpuk atau swipe horisontal, tabel transaksi berubah menjadi list-card, navigasi di bottom bar tetap, form modal menjadi bottom drawer. |
| **Tablet (`640px - 1023px`)** | iPad / Tablet kasir | 2-column grid untuk metrik, sidebar bisa ditoggle (hamburger), chart tetap proporsional. |
| **Desktop (`>= 1024px`)** | Laptop / PC Juri | Sidebar permanen di kiri (240px), 4-column metric cards, 2-column deep analytic view, tabel data lengkap dengan hover row effect. |

---

## 8. Panduan Teknis untuk Developer Frontend (Developer 2)

### 8.1 Rekomendasi Library UI (Ringan & Cepat)
- **Icons:** `lucide-react` (icon modern, bersih, garis konsisten).
- **Chart:** `recharts` (sesuai PRD; gunakan `ResponsiveContainer`, `BarChart`, `XAxis`, `Tooltip` kustom).
- **Date Utility:** `date-fns` (format tanggal Indonesia: `12 Nov 2026`).
- **Modal / Dropdown Accessibility:** `@headlessui/react` atau Radix UI primitive (ringan dan mudah di-styling dengan Tailwind).

### 8.2 Helper Format Rupiah Standar
Gunakan satu helper universal di seluruh proyek untuk menjaga konsistensi:
```typescript
export const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};
```

---

*Dokumen ini dirancang sebagai acuan mutlak bagi tim Frontend dalam sprint 7 hari, memastikan kode yang dihasilkan rapi, fungsional, dan memiliki keunggulan visual yang matang di mata dewan juri.*

---

## 📎 Dokumen Terkait

| Dokumen | Relevansi |
| :--- | :--- |
| **[Dokumentasi Frontend (frontend.md)](frontend.md)** | Implementasi komponen UI (`HealthGauge`, `CashflowChart`, `CurrencyInput`) berbasis desain ini |
| **[Product Requirements Document (prd.md)](prd.md)** | Persona UMKM, batasan antarmuka, dan alur pengalaman pengguna |
| **[Diagram Alur Sistem (flowchart.jpg)](flowchart.jpg)** | Peta visual interaksi antarmuka pengguna dari login hingga simulator |
