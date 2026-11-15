# Product Requirements Document (PRD)

## UMKM Financial Health Platform

**Versi:** 1.0\
**Status:** Draft untuk implementasi MVP\
**Durasi pengembangan:** 7 hari\
**Tim:** 3 developer\
**Teknologi:** Laravel REST API + React (Vite)\
**Target pengguna:** Pelaku usaha mikro/UMKM

------------------------------------------------------------------------

## 1. Ringkasan Produk

UMKM Financial Health Platform adalah aplikasi web yang membantu pelaku
UMKM mencatat arus kas sederhana, memahami kondisi kesehatan keuangan
bisnis, dan memperkirakan ketahanan kas melalui simulasi skenario.

Produk ini tidak ditujukan untuk menggantikan software akuntansi
lengkap. Fokus MVP adalah mengubah catatan pemasukan dan pengeluaran
menjadi informasi yang mudah dipahami dan dapat digunakan untuk
mendukung keputusan operasional.

### 1.1 Pernyataan masalah

Pelaku UMKM dapat memiliki aktivitas penjualan yang tinggi, tetapi belum
tentu memiliki kondisi kas yang sehat. Kesulitan memisahkan uang bisnis
dan pribadi, kurangnya pencatatan transaksi, serta ketidakpahaman
terhadap arus kas dan rasio sederhana dapat membuat pemilik usaha
terlambat menyadari masalah keuangan.

### 1.2 Solusi

Aplikasi menyediakan:

1.  **Cash Management:** pencatatan pemasukan dan pengeluaran sebagai
    sumber data.
2.  **Financial Health Score:** indikator ringkas untuk membantu
    pengguna memahami kondisi keuangan.
3.  **Smart Runway Simulator:** estimasi ketahanan kas dan simulasi
    perubahan asumsi pemasukan/pengeluaran.
4.  **Business Insights:** rekomendasi berbasis aturan sederhana
    berdasarkan hasil analisis.

### 1.3 Nilai utama produk

Membantu pemilik UMKM menjawab tiga pertanyaan:

-   Berapa posisi kas dan bagaimana arus kas bisnis saya?
-   Indikator keuangan apa yang perlu saya perhatikan?
-   Jika pemasukan turun atau pengeluaran naik, berapa lama kas saya
    dapat bertahan?

------------------------------------------------------------------------

## 2. Tujuan dan Ukuran Keberhasilan

### 2.1 Tujuan MVP

-   Pengguna dapat membuat akun dan mengelola data bisnisnya sendiri.
-   Pengguna dapat mencatat, melihat, mengubah, dan menghapus transaksi.
-   Sistem dapat menyajikan ringkasan kas berdasarkan transaksi.
-   Sistem dapat menghitung indikator kesehatan keuangan dengan formula
    yang transparan.
-   Pengguna dapat menjalankan simulasi runway tanpa mengubah data
    transaksi asli.
-   Aplikasi dapat digunakan dengan baik pada desktop dan perangkat
    mobile.

### 2.2 Kriteria keberhasilan

MVP dianggap berhasil apabila:

-   Alur register/login/logout berfungsi.
-   Data setiap pengguna terisolasi dan tidak dapat diakses pengguna
    lain.
-   CRUD transaksi berfungsi dan perubahan transaksi memperbarui
    ringkasan.
-   Dashboard menampilkan saldo dan ringkasan berdasarkan data
    tersimpan.
-   Financial Health menampilkan skor, komponen, penjelasan, dan
    rekomendasi.
-   Runway Simulator menghasilkan hasil yang konsisten dengan input dan
    asumsi yang ditampilkan.
-   Validasi input dan penanganan kondisi data kosong/invalid tersedia.
-   Aplikasi berhasil di-deploy dan skenario demo dapat dijalankan.

------------------------------------------------------------------------

## 3. Target Pengguna dan Kebutuhan

### 3.1 Persona utama

**Pemilik usaha mikro**, misalnya warung, usaha makanan rumahan, atau
pedagang kecil, yang:

-   Mengelola transaksi harian sendiri.
-   Membutuhkan pencatatan sederhana.
-   Belum terbiasa membaca laporan akuntansi formal.
-   Ingin mengetahui apakah kas cukup untuk membayar kebutuhan
    operasional.
-   Membutuhkan gambaran dampak jika pemasukan atau pengeluaran berubah.

### 3.2 Kebutuhan pengguna

-   Input transaksi harus sederhana dan cepat.
-   Istilah keuangan harus menggunakan bahasa yang mudah dipahami.
-   Hasil analisis harus disertai alasan, bukan hanya angka.
-   Pengguna harus dapat mencoba skenario tanpa mengubah catatan asli.
-   Pengguna harus dapat melihat transaksi berdasarkan periode.

------------------------------------------------------------------------

## 4. Ruang Lingkup MVP

### 4.1 Fitur dalam scope

  -----------------------------------------------------------------------
  Fitur                   Prioritas               Deskripsi
  ----------------------- ----------------------- -----------------------
  Register dan login      Must                    Autentikasi pengguna

  Profil usaha            Must                    Nama dan jenis usaha
                                                  serta saldo awal

  Cash Management         Must                    CRUD pemasukan dan
                                                  pengeluaran

  Dashboard               Must                    Ringkasan kas dan tren
                                                  transaksi

  Financial Health Score  Must                    Skor indikator keuangan
                                                  dan penjelasannya

  Smart Runway Simulator  Must                    Estimasi runway dan
                                                  simulasi what-if

  Business Insights       Must                    Rekomendasi berbasis
                                                  aturan

  Responsive UI           Must                    Tampilan desktop dan
                                                  mobile
  -----------------------------------------------------------------------

### 4.2 Di luar scope MVP

Fitur berikut tidak dibangun dalam sprint tujuh hari:

-   Invoice generator dan PDF invoice.
-   QRIS aktif atau integrasi payment gateway.
-   Integrasi rekening bank atau open banking.
-   Sinkronisasi transaksi otomatis.
-   AI chatbot atau machine learning.
-   Manajemen stok, payroll, perpajakan, dan akuntansi lengkap.
-   Multi-cabang, multi-kasir, dan role/permission kompleks.
-   Aplikasi mobile native.
-   Notifikasi otomatis dan integrasi Telegram/WhatsApp.

------------------------------------------------------------------------

## 5. Struktur Halaman

### 5.1 Authentication

-   Register.
-   Login.
-   Logout.

### 5.2 Dashboard

Menampilkan:

-   Saldo kas saat ini.
-   Total pemasukan pada periode terpilih.
-   Total pengeluaran pada periode terpilih.
-   Net cash flow.
-   Grafik pemasukan dan pengeluaran.
-   Ringkasan Financial Health Score.
-   Ringkasan runway.
-   Insight penting.

### 5.3 Transactions

Menampilkan:

-   Daftar transaksi.
-   Form tambah transaksi.
-   Edit dan hapus transaksi.
-   Filter berdasarkan tanggal dan tipe transaksi.
-   Kategori dan deskripsi transaksi.

### 5.4 Financial Health

Menampilkan:

-   Skor kesehatan 0--100.
-   Status atau kategori skor.
-   Skor setiap komponen.
-   Nilai rasio/indikator sumber.
-   Penjelasan perhitungan.
-   Rekomendasi yang relevan.
-   Periode analisis.

### 5.5 Runway Simulator

Menampilkan:

-   Kas tersedia sebagai nilai awal.
-   Rata-rata pemasukan harian.
-   Rata-rata pengeluaran harian.
-   Net burn harian.
-   Estimasi runway.
-   Input asumsi untuk simulasi.
-   Hasil simulasi tanpa mengubah transaksi asli.
-   Penjelasan asumsi dan keterbatasan hasil.

### 5.6 Business Profile / Settings

Menampilkan dan mengubah:

-   Nama usaha.
-   Jenis usaha.
-   Saldo awal.
-   Pengaturan profil dasar.

------------------------------------------------------------------------

## 6. Persyaratan Fungsional

### FR-01 --- Registrasi

-   Pengguna dapat mendaftar menggunakan nama, email, dan password.
-   Email harus unik dan valid.
-   Password harus memenuhi validasi minimum.
-   Password disimpan dalam bentuk hash, bukan teks biasa.

**Acceptance criteria:** - Register dengan data valid membuat akun. -
Email duplikat ditolak dengan pesan yang jelas. - Input tidak valid
menghasilkan respons validasi.

### FR-02 --- Login dan logout

-   Pengguna dapat login menggunakan kredensial terdaftar.
-   Pengguna dapat logout.
-   Endpoint privat hanya dapat diakses oleh pengguna terautentikasi.

**Acceptance criteria:** - Kredensial valid menghasilkan sesi/token
autentikasi sesuai konfigurasi Sanctum. - Kredensial salah ditolak. -
Setelah logout, akses ke endpoint privat ditolak sampai login kembali.

### FR-03 --- Profil usaha

-   Pengguna dapat menyimpan nama usaha, jenis usaha, dan saldo awal.
-   Satu pengguna memiliki satu profil usaha pada MVP.
-   Saldo awal menjadi dasar perhitungan saldo, bukan transaksi
    pemasukan.

**Acceptance criteria:** - Pengguna dapat melihat dan memperbarui profil
usahanya. - Profil milik pengguna lain tidak dapat dibaca atau diubah.

### FR-04 --- Pencatatan transaksi

Setiap transaksi memiliki:

-   Tipe: `income` atau `expense`.
-   Kategori.
-   Nominal.
-   Deskripsi (opsional).
-   Tanggal transaksi.

**Acceptance criteria:** - Pengguna dapat membuat transaksi dengan data
valid. - Nominal harus lebih besar dari nol. - Tipe transaksi harus
salah satu nilai yang diizinkan. - Pengguna dapat mengubah dan menghapus
transaksi miliknya. - Pengguna tidak dapat mengakses atau memodifikasi
transaksi milik pengguna lain.

### FR-05 --- Dashboard

Sistem menampilkan ringkasan berdasarkan periode yang dipilih.

Definisi dasar:

-   Total pemasukan = jumlah transaksi bertipe `income` pada periode.
-   Total pengeluaran = jumlah transaksi bertipe `expense` pada periode.
-   Net cash flow = total pemasukan dikurangi total pengeluaran.
-   Saldo kas = saldo awal ditambah seluruh pemasukan kumulatif
    dikurangi seluruh pengeluaran kumulatif sejak tanggal mulai
    pencatatan.

**Acceptance criteria:** - Ringkasan berubah setelah transaksi ditambah,
diubah, atau dihapus. - Periode yang dipilih diterapkan secara konsisten
pada angka dan grafik. - Kondisi tanpa transaksi menampilkan empty
state, bukan error.

### FR-06 --- Financial Health Score

Sistem menghitung skor komposit 0--100 dari indikator yang tersedia.

Komponen rancangan MVP:

1.  **Cash Coverage (35%)**\
    Mengukur berapa kali kas tersedia dapat menutup rata-rata biaya
    operasional bulanan.

    `cash_coverage = available_cash / average_monthly_operating_expense`

2.  **Operating Expense Ratio (35%)**\
    Mengukur proporsi pendapatan yang digunakan untuk biaya operasional.

    `operating_expense_ratio = operating_expense / revenue * 100`

3.  **Net Cash Flow Margin (30%)**\
    Mengukur persentase pendapatan yang tersisa setelah pengeluaran.

    `net_cash_flow_margin = (revenue - total_expense) / revenue * 100`

**Ketentuan implementasi:**

-   Bobot di atas adalah heuristik produk untuk MVP, bukan standar atau
    diagnosis keuangan resmi.
-   Setiap komponen harus dinormalisasi ke skor 0--100 menggunakan
    aturan yang didokumentasikan dan diuji.
-   Aturan ambang batas dan normalisasi harus disepakati tim sebelum
    implementasi dan tidak boleh dibuat berbeda di frontend.
-   Perhitungan dilakukan di backend.
-   Response menyertakan skor total, skor komponen, nilai indikator,
    periode, dan penjelasan.
-   Jika data tidak cukup, sistem menampilkan status "data belum cukup"
    atau komponen tidak tersedia; jangan mengarang skor.
-   Jika pendapatan nol, rasio yang membutuhkan pendapatan tidak boleh
    menyebabkan pembagian dengan nol.
-   Biaya operasional harus dapat dibedakan dari pengeluaran
    non-operasional melalui kategori transaksi yang disepakati.

**Acceptance criteria:** - Hasil skor konsisten untuk input yang sama. -
Perubahan transaksi memperbarui hasil analisis. - Pengguna dapat
memahami faktor yang menaikkan atau menurunkan skor. - Skor tidak
ditampilkan sebagai jaminan kesehatan atau kelangsungan bisnis.

### FR-07 --- Smart Runway Calculator

Runway mengestimasi berapa lama kas dapat menutup net cash burn jika
kondisi yang diasumsikan berlanjut.

Untuk data historis:

`daily_net_burn = (period_expense - period_income) / number_of_days`

Jika `daily_net_burn > 0`:

`runway_days = available_cash / daily_net_burn`

Ketentuan:

-   `available_cash` adalah saldo kas yang tersedia pada saat analisis.
-   Periode historis dan jumlah hari yang digunakan harus ditampilkan.
-   Jika net burn nol atau negatif, tampilkan bahwa bisnis tidak
    mengalami net cash burn pada periode tersebut; jangan tampilkan
    runway negatif atau angka tak hingga sebagai prediksi.
-   Jika kas tersedia nol atau negatif, tampilkan kondisi kas tidak
    tersedia/tidak mencukupi.
-   Hasil merupakan estimasi berdasarkan asumsi bahwa burn rate tetap,
    bukan prediksi pasti.

**What-if simulation:**

Pengguna dapat memasukkan asumsi pemasukan dan pengeluaran harian atau
perubahan persentase. Sistem menghitung hasil simulasi di backend dan
tidak menyimpan perubahan sebagai transaksi.

**Acceptance criteria:** - Input simulasi tidak mengubah data
transaksi. - Hasil berubah sesuai perubahan asumsi. - Pembagian dengan
nol dan nilai negatif ditangani. - Asumsi, periode, dan keterbatasan
perhitungan ditampilkan.

### FR-08 --- Business Insights

Sistem menghasilkan rekomendasi berbasis aturan, misalnya:

-   Net cash flow negatif: evaluasi pengeluaran dan penerimaan.
-   Cash coverage rendah: perhatikan cadangan kas dan kewajiban dekat.
-   Operating expense ratio tinggi: periksa kategori biaya operasional
    terbesar.
-   Runway pendek: prioritaskan kebutuhan penting dan tinjau rencana
    pengeluaran.

**Acceptance criteria:** - Rekomendasi memiliki hubungan yang jelas
dengan indikator pemicunya. - Rekomendasi tidak menyatakan kepastian
atau menjanjikan hasil bisnis. - Jika data tidak cukup, sistem
menyampaikan bahwa rekomendasi belum dapat dibuat.

------------------------------------------------------------------------

## 7. Aturan Data dan Perhitungan

### 7.1 Definisi transaksi

Untuk MVP, setiap transaksi adalah arus kas masuk atau keluar. Transfer
internal antar rekening/kotak kas tidak dicatat sebagai pemasukan atau
pengeluaran karena dapat menggandakan nilai arus kas.

### 7.2 Kategori

Kategori awal dapat disediakan sebagai pilihan sederhana, misalnya:

**Pemasukan:** - Penjualan. - Pendapatan lain.

**Pengeluaran:** - Bahan baku/stok. - Operasional. - Transportasi. -
Utilitas. - Gaji/upah. - Cicilan/utang. - Pengeluaran lain.

Tim harus menetapkan kategori mana yang dihitung sebagai biaya
operasional. Pembayaran pokok utang, pembelian aset, dan pengambilan
uang pribadi sebaiknya tidak otomatis diperlakukan sebagai biaya
operasional tanpa definisi yang jelas.

### 7.3 Periode analisis

-   Default dashboard dan analisis: 30 hari terakhir.
-   Saldo kas: saldo awal ditambah transaksi kumulatif sejak tanggal
    mulai pencatatan.
-   Semua perhitungan menggunakan zona waktu dan batas tanggal yang
    konsisten.
-   Mata uang MVP: Rupiah (IDR).

### 7.4 Presisi nominal

-   Gunakan tipe data decimal/integer yang sesuai untuk nilai uang;
    hindari floating point untuk penyimpanan nominal.
-   Format Rupiah dilakukan pada lapisan presentasi.
-   Validasi nominal harus mencegah nol, nilai negatif, dan input tidak
    valid.

------------------------------------------------------------------------

## 8. Model Data Minimal

### 8.1 `users`

  Kolom        Tipe konseptual   Keterangan
  ------------ ----------------- ------------------
  id           bigint            Primary key
  name         string            Nama pengguna
  email        string, unique    Email login
  password     string            Password hash
  created_at   timestamp         Waktu dibuat
  updated_at   timestamp         Waktu diperbarui

### 8.2 `business_profiles`

  Kolom             Tipe konseptual      Keterangan
  ----------------- -------------------- ------------------
  id                bigint               Primary key
  user_id           bigint, unique, FK   Pemilik profil
  business_name     string               Nama usaha
  business_type     string               Jenis usaha
  opening_balance   decimal              Saldo awal
  created_at        timestamp            Waktu dibuat
  updated_at        timestamp            Waktu diperbarui

### 8.3 `transactions`

  Kolom              Tipe konseptual     Keterangan
  ------------------ ------------------- -------------------------
  id                 bigint              Primary key
  user_id            bigint, FK, index   Pemilik transaksi
  type               enum/string         `income` atau `expense`
  category           string              Kategori transaksi
  amount             decimal             Nominal positif
  description        text, nullable      Keterangan
  transaction_date   date                Tanggal transaksi
  created_at         timestamp           Waktu dibuat
  updated_at         timestamp           Waktu diperbarui

**Relasi:**

-   `users` 1 --- 1 `business_profiles`.
-   `users` 1 --- N `transactions`.

Financial Health Score dan hasil simulasi dihitung dari data yang ada
dan tidak wajib disimpan pada tabel terpisah untuk MVP.

------------------------------------------------------------------------

## 9. API Contract Awal

Base path: `/api`

  Method   Endpoint               Auth       Keterangan
  -------- ---------------------- ---------- -----------------------
  POST     `/register`            Public     Registrasi
  POST     `/login`               Public     Login
  POST     `/logout`              Required   Logout
  GET      `/me`                  Required   Profil pengguna
  GET      `/business-profile`    Required   Ambil profil usaha
  PUT      `/business-profile`    Required   Perbarui profil usaha
  GET      `/transactions`        Required   Daftar transaksi
  POST     `/transactions`        Required   Tambah transaksi
  PUT      `/transactions/{id}`   Required   Ubah transaksi
  DELETE   `/transactions/{id}`   Required   Hapus transaksi
  GET      `/dashboard`           Required   Ringkasan dashboard
  GET      `/financial-health`    Required   Analisis kesehatan
  POST     `/runway/simulate`     Required   Simulasi runway

### 9.1 Query transaksi

`GET /api/transactions?type=expense&from=2026-11-01&to=2026-11-30&page=1`

Parameter filter dapat dibuat opsional. Pagination disarankan jika data
bertambah.

### 9.2 Contoh request simulasi

``` json
{
  "available_cash": 6000000,
  "daily_income": 300000,
  "daily_expense": 450000,
  "simulation_days": 30
}
```

### 9.3 Contoh response simulasi

``` json
{
  "data": {
    "daily_net_burn": 150000,
    "runway_days": 40,
    "status": "net_burn"
  }
}
```

Contoh di atas hanya ilustrasi kontrak API. Validasi nilai, nama field,
status, dan bentuk response harus disepakati backend dan frontend pada
hari pertama.

### 9.4 Format respons dan error

Gunakan format JSON yang konsisten. Validasi request mengembalikan
status HTTP 422. Akses tanpa autentikasi mengembalikan 401. Resource
yang tidak dimiliki pengguna tidak boleh dapat diakses; gunakan
kebijakan 404 atau 403 secara konsisten.

------------------------------------------------------------------------

## 10. Arsitektur dan Teknologi

### 10.1 Arsitektur

-   React SPA berkomunikasi dengan Laravel melalui REST API.
-   Laravel menangani autentikasi, validasi, akses data, perhitungan
    keuangan, dan rekomendasi.
-   Database relasional menyimpan user, profil usaha, dan transaksi.
-   Frontend tidak menghitung ulang skor finansial; frontend hanya
    menampilkan hasil backend dan mengelola input simulasi.

### 10.2 Teknologi

  Area              Teknologi
  ----------------- -----------------------
  Backend           Laravel
  API               REST / JSON
  Frontend          React + Vite
  Styling           Tailwind CSS
  HTTP client       Axios
  Chart             Recharts
  Database          PostgreSQL atau MySQL
  Authentication    Laravel Sanctum
  Version control   Git + GitHub

### 10.3 Catatan autentikasi

Jika React SPA dan Laravel API menggunakan Sanctum cookie-based
authentication, konfigurasi stateful domains, CORS, cookie, dan CSRF
harus benar. Jika deployment menggunakan domain/origin berbeda, tentukan
konfigurasi sejak awal. Jangan menunda pengujian autentikasi lintas
origin sampai hari terakhir.

------------------------------------------------------------------------

## 11. Persyaratan Non-Fungsional

### NFR-01 --- Security

-   Password harus di-hash.
-   Endpoint privat memerlukan autentikasi.
-   Semua query transaksi dibatasi berdasarkan user yang sedang login.
-   Validasi dilakukan di backend.
-   Secret dan kredensial tidak boleh disimpan di repository.
-   Gunakan HTTPS pada deployment.

### NFR-02 --- Usability

-   Form transaksi sederhana dan mudah dipahami.
-   Istilah teknis diberi penjelasan singkat.
-   Loading, empty state, success, dan error state tersedia.
-   Hasil perhitungan menampilkan periode dan asumsi.

### NFR-03 --- Performance

-   Dashboard hanya mengambil data yang diperlukan.
-   Daftar transaksi menggunakan pagination.
-   Query agregasi dilakukan di backend.
-   Hindari request berulang yang tidak diperlukan.

### NFR-04 --- Compatibility

-   Mendukung browser modern.
-   Layout responsif untuk desktop dan mobile.
-   Grafik dan tabel tetap terbaca pada layar kecil.

### NFR-05 --- Reliability

-   Perubahan transaksi harus tercermin pada ringkasan berikutnya.
-   Perhitungan harus menangani data kosong, nol, dan nilai ekstrem.
-   Kesalahan API ditampilkan secara jelas tanpa membocorkan detail
    internal.

------------------------------------------------------------------------

## 12. Pembagian Tugas Tim

### Developer 1 --- Backend Engineer (Laravel)

Tanggung jawab:

-   Setup Laravel dan database.
-   Migration dan model.
-   Authentication dengan Sanctum.
-   CRUD transaksi.
-   Business profile API.
-   Dashboard API.
-   Validasi, authorization, dan isolasi data pengguna.
-   Mendukung integrasi financial engine.

Deliverable: backend REST API yang aman dan siap digunakan frontend.

### Developer 2 --- Frontend Engineer (React)

Tanggung jawab:

-   Setup React + Vite.
-   Routing dan layout aplikasi.
-   Halaman register/login.
-   Dashboard dan grafik.
-   Halaman transaksi dan form.
-   Halaman Financial Health.
-   Halaman Runway Simulator.
-   Integrasi API dan responsive UI.

Deliverable: frontend yang terhubung dengan API dan siap
didemonstrasikan.

### Developer 3 --- Financial Logic & Integration Engineer

Tanggung jawab:

-   Menetapkan definisi indikator dan aturan skor.
-   Implementasi service perhitungan Financial Health bersama Developer
    1.
-   Implementasi runway calculation dan simulasi.
-   Business Insights berbasis aturan.
-   Membuat test case perhitungan.
-   Membantu integrasi frontend-backend.
-   QA skenario bisnis dan demonstrasi.

Deliverable: financial engine yang konsisten, teruji, dan dapat
dijelaskan.

**Catatan kolaborasi:** Developer 3 tidak boleh menjadi satu-satunya
orang yang memahami formula. Developer 1 perlu memahami implementasi
backend-nya dan Developer 2 perlu memahami arti setiap nilai yang
ditampilkan.

------------------------------------------------------------------------

## 13. Roadmap Pengembangan 7 Hari

  ---------------------------------------------------------------------------
  Hari           Fokus          Developer 1     Developer 2    Developer 3
  -------------- -------------- --------------- -------------- --------------
  1              Planning       ERD dan API     Wireframe dan  Definisi
                                contract        setup repo     formula dan
                                                               test case

  2              Setup          Laravel, DB,    React,         Validasi
                                auth            routing,       formula dan
                                                layout         financial
                                                               service design

  3              Cash           CRUD transaksi  Halaman        Review
                 Management                     transaksi      kategori dan
                                                               mulai
                                                               financial
                                                               engine

  4              Financial      Dashboard API   Dashboard dan  Financial
                 Analysis       dan dukungan    chart          Health API dan
                                engine                         Insights

  5              Runway         Endpoint        UI simulator   Logika
                                simulasi                       simulasi dan
                                                               pengujian

  6              Integration &  Authorization   Integrasi dan  Test
                 QA             dan bug fixing  responsive UI  perhitungan
                                                               dan QA

  7              Release        Deployment      Deployment     Seed data demo
                                backend         frontend       dan persiapan
                                                               presentasi
  ---------------------------------------------------------------------------

### Milestone

-   **Hari 1:** Scope, ERD, API contract, dan formula disepakati.
-   **Hari 2:** Kedua project dapat dijalankan.
-   **Hari 3:** Transaksi tersimpan dan dapat dikelola.
-   **Hari 4:** Dashboard dan Financial Health menggunakan data nyata.
-   **Hari 5:** Runway Simulator berjalan end-to-end.
-   **Hari 6:** Integrasi dan pengujian selesai.
-   **Hari 7:** Deployment dan demo siap.

Hari keenam dan ketujuh tidak digunakan untuk menambah fitur baru
kecuali ada kebutuhan kritis.

------------------------------------------------------------------------

## 14. Testing Plan

### 14.1 Authentication

-   Register dengan data valid.
-   Register dengan email duplikat.
-   Login dengan kredensial salah.
-   Akses endpoint privat tanpa login.
-   Logout dan mencoba mengakses endpoint privat kembali.

### 14.2 Transactions

-   Tambah pemasukan.
-   Tambah pengeluaran.
-   Menolak nominal nol atau negatif.
-   Edit dan hapus transaksi.
-   Memastikan transaksi user A tidak dapat diakses user B.
-   Memastikan dashboard berubah setelah transaksi diubah/dihapus.

### 14.3 Financial Health

-   Pendapatan dan pengeluaran normal.
-   Pendapatan nol.
-   Pengeluaran lebih besar daripada pendapatan.
-   Kas nol.
-   Data transaksi kosong atau belum mencukupi.
-   Memastikan skor komponen dan skor total sesuai aturan yang
    disepakati.

### 14.4 Runway

-   Net burn positif.
-   Net burn nol.
-   Net cash flow positif.
-   Kas nol atau negatif.
-   Perubahan asumsi pemasukan/pengeluaran.
-   Memastikan simulasi tidak mengubah transaksi tersimpan.

### 14.5 Integration

-   Login dari frontend.
-   Membuat transaksi dari frontend.
-   Melihat perubahan dashboard.
-   Melihat Financial Health.
-   Menjalankan simulasi.
-   Logout.

------------------------------------------------------------------------

## 15. Demo Scenario

Siapkan satu akun demo untuk usaha makanan rumahan dengan transaksi
selama 30 hari.

Alur demonstrasi:

1.  Login sebagai pemilik usaha.
2.  Tunjukkan dashboard berisi saldo, pemasukan, pengeluaran, dan tren
    kas.
3.  Tambahkan satu transaksi untuk menunjukkan pencatatan.
4.  Buka Financial Health dan jelaskan skor serta indikator penyusunnya.
5.  Buka Runway Simulator.
6.  Ubah asumsi pemasukan atau pengeluaran.
7.  Tunjukkan perubahan estimasi ketahanan kas.
8.  Jelaskan insight yang dapat ditindaklanjuti pemilik usaha.

Gunakan data demo yang konsisten di semua halaman. Pastikan angka pada
dashboard, analisis, dan simulasi dapat direkonsiliasi.

------------------------------------------------------------------------

## 16. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                              Mitigasi
  ----------------------------------- -----------------------------------
  API frontend-backend tidak cocok    Kunci API contract pada hari
                                      pertama

  Formula berubah saat implementasi   Sepakati formula dan contoh uji
                                      sebelum coding

  Developer 3 overload                Developer 1 ikut membantu financial
                                      engine

  Integrasi terlambat                 Integrasikan alur kecil sejak hari
                                      ketiga

  Autentikasi lintas origin           Uji Sanctum dan CORS sejak awal
  bermasalah                          

  Data demo tidak konsisten           Buat satu dataset acuan

  Waktu habis untuk fitur tambahan    Terapkan scope freeze setelah hari
                                      pertama

  Hasil analisis menyesatkan          Tampilkan asumsi, periode, dan
                                      keterbatasan
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 17. Definisi Selesai (Definition of Done)

Sebuah fitur dinyatakan selesai apabila:

-   Fungsinya berjalan sesuai acceptance criteria.
-   Backend melakukan validasi dan authorization yang sesuai.
-   Frontend menampilkan loading, success, empty, dan error state yang
    relevan.
-   Data yang ditampilkan berasal dari API, bukan hardcoded, kecuali
    data demo yang memang disiapkan di database.
-   Perhitungan memiliki test case.
-   Perubahan kode sudah melalui review anggota tim.
-   Tidak ada bug kritis yang menghalangi alur demo.

MVP dinyatakan siap rilis apabila seluruh fitur prioritas Must selesai,
data pengguna terisolasi, skenario demo berhasil, dan aplikasi dapat
diakses melalui deployment.

------------------------------------------------------------------------

## 18. Pengembangan Setelah Kompetisi

Jika MVP berhasil dan tersedia waktu pengembangan lanjutan, fitur
berikut dapat dipertimbangkan berdasarkan masukan pengguna:

1.  Invoice generator dan ekspor PDF.
2.  Integrasi QRIS melalui penyedia pembayaran resmi.
3.  Pengelolaan piutang dan utang.
4.  Pemisahan keuangan pribadi dan bisnis yang lebih terstruktur.
5.  Laporan bulanan yang dapat diunduh.
6.  Notifikasi risiko arus kas.
7.  Prediksi arus kas berbasis data historis yang memadai.
8.  Integrasi rekening atau pencatatan otomatis jika tersedia dukungan
    provider.

Fitur lanjutan tidak termasuk komitmen MVP tujuh hari.

------------------------------------------------------------------------

## 19. Prinsip Produk

-   **Sederhana:** cocok untuk pelaku UMKM yang tidak memiliki latar
    belakang akuntansi.
-   **Transparan:** setiap indikator dan simulasi menjelaskan dasar
    perhitungannya.
-   **Actionable:** hasil analisis disertai saran yang relevan.
-   **Terintegrasi:** transaksi menjadi sumber data bagi dashboard,
    analisis, dan simulasi.
-   **Bertanggung jawab:** skor dan runway adalah alat bantu pemahaman,
    bukan jaminan keberhasilan atau kegagalan bisnis.

**Positioning produk:**

> UMKM Financial Health Platform --- platform yang membantu pelaku UMKM
> memahami kondisi keuangan, mengantisipasi risiko arus kas, dan
> mengambil keputusan bisnis dengan lebih terarah.
