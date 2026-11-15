# 💼 BisnisCerdas - UMKM Financial Health Platform

Platform web terintegrasi untuk membantu pelaku UMKM (Usaha Mikro, Kecil, dan Menengah) mengelola pencatatan arus kas harian, menganalisis skor kesehatan keuangan (*Financial Health Score*), dan memperkirakan ketahanan modal kerja melalui *Smart Runway Simulator*.

---

## 📑 Daftar Isi
1. [Prasyarat Sistem](#1-prasyarat-sistem)
2. [Cara 1: Menjalankan dengan Docker (Paling Cepat & Direkomendasikan)](#2-cara-1-menjalankan-dengan-docker-paling-cepat--direkomendasikan)
3. [Cara 2: Menjalankan Tanpa Docker (Native di Laptop)](#3-cara-2-menjalankan-tanpa-docker-native-di-laptop)
4. [Cara 3: Menjalankan Menggunakan Image Jadi dari GHCR](#4-cara-3-menjalankan-menggunakan-image-jadi-dari-ghcr)
5. [Panduan Mencoba Aplikasi (Kredensial & Fitur Demo)](#5-panduan-mencoba-aplikasi-kredensial--fitur-demo)
6. [Cheatsheet Perintah Operasional Harian](#6-cheatsheet-perintah-operasional-harian)
7. [Pusat Dokumentasi Teknis](#7-pusat-dokumentasi-teknis)

---

## 1. Prasyarat Sistem

Sebelum memulai, pastikan komputer/laptop Anda telah terpasang salah satu dari opsi berikut:

- **Opsi A (Sangat Direkomendasikan):**
  - Hanya membutuhkan **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (sudah mencakup Docker Engine dan Docker Compose v2).
  - *Kelebihan:* Anda **TIDAK PERLU** menginstal PHP, Composer, Node.js, ataupun MySQL di laptop Anda. Semua berjalan terisolasi di dalam container.
- **Opsi B (Tanpa Docker / Native):**
  - **PHP 8.4+** (dengan ekstensi: `pdo_mysql`, `mbstring`, `bcmath`, `gd`, `zip`)
  - **Composer 2.8+**
  - **Node.js 20.x LTS** & **npm**
  - **MySQL Server 8.4+**

---

## 2. Cara 1: Menjalankan dengan Docker (Paling Cepat & Direkomendasikan)

Ikuti langkah-langkah runtut di bawah ini untuk menjalankan seluruh aplikasi:

### Langkah 1: Buka Terminal di Folder Proyek
Pastikan terminal Anda berada di direktori utama `bisnis-cerdas/`:
```bash
cd bisnis-cerdas
```

### Langkah 2: Buat File Konfigurasi `.env`
Salin template konfigurasi bawaan yang sudah disediakan:
```bash
cp .env.example .env
```
*(File `.env` bawaan sudah berisi konfigurasi default yang siap langsung dipakai tanpa perlu Anda edit).*

### Langkah 3: Nyalakan Seluruh Container (Build & Start)
Jalankan perintah berikut:
```bash
docker compose up -d --build
```
> **Apa yang terjadi pada langkah ini?**
> Docker akan secara otomatis:
> 1. Mengunduh image database MySQL 8.4 resmi.
> 2. Mengompilasi backend Laravel 11 (PHP 8.4 + dependensi Composer).
> 3. Mengompilasi frontend React 19 (Node 20 + Vite).
> 4. Menghubungkan ketiganya dalam satu jaringan virtual bernama `umkm_network`.
> 5. Menjalankannya di latar belakang (*detached mode*).

### Langkah 4: Jalankan Migrasi Database dan Isi Data Demo
Setelah container berstatus running (tunggu sekitar 10–15 detik agar database MySQL siap sepenuhnya), jalankan 2 perintah berikut:

1. **Buat tabel-tabel database:**
   ```bash
   docker compose exec backend php artisan migrate --force
   ```
2. **Isi data awal untuk demo (profil bisnis & 30 hari riwayat transaksi):**
   ```bash
   docker compose exec backend php artisan db:seed --class=DemoBusinessSeeder --force
   ```

### Langkah 5: Buka Aplikasi di Browser
Buka browser favorit Anda dan akses:
- 🌐 **Frontend (Antarmuka Web):** [http://localhost:3000](http://localhost:3000)
- 🐘 **Backend (REST API):** [http://localhost:8000](http://localhost:8000)
- 🩺 **Health Check API:** [http://localhost:8000/up](http://localhost:8000/up)

👉 Lanjut ke [Bagian 5: Panduan Mencoba Aplikasi](#5-panduan-mencoba-aplikasi-kredensial--fitur-demo) untuk cara login dan eksplorasi fiturnya!

---

## 3. Cara 2: Menjalankan Tanpa Docker (Native di Laptop)

Jika Anda tidak menggunakan Docker dan ingin menjalankan aplikasi langsung menggunakan PHP dan Node.js di sistem operasi laptop Anda:

### Langkah 1: Menyiapkan Backend (Laravel 11)
1. Buka terminal, masuk ke folder `backend/`:
   ```bash
   cd backend
   ```
2. Buat file `.env` dari `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Buka file `.env` di teks editor, sesuaikan pengaturan database dengan MySQL lokal Anda:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=bisnis_cerdas
   DB_USERNAME=root
   DB_PASSWORD=password_mysql_anda
   ```
   *(Pastikan database `bisnis_cerdas` sudah Anda buat di MySQL lokal Anda).*
4. Install dependensi Composer dan buat application key:
   ```bash
   composer install
   php artisan key:generate
   ```
5. Jalankan migrasi dan isi data demo:
   ```bash
   php artisan migrate
   php artisan db:seed --class=DemoBusinessSeeder
   ```
6. Jalankan server backend Laravel:
   ```bash
   php artisan serve --port=8000
   ```
   *(Biarkan terminal ini tetap terbuka. Backend aktif di `http://localhost:8000`).*

### Langkah 2: Menyiapkan Frontend (React + Vite)
1. Buka **jendela terminal baru**, masuk ke folder `frontend/`:
   ```bash
   cd frontend
   ```
2. Buat file `.env` dari `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *(Pastikan isinya adalah `VITE_API_URL=http://localhost:8000/api`).*
3. Install dependensi Node.js:
   ```bash
   npm install
   ```
4. Jalankan Vite development server:
   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 4. Cara 3: Menjalankan Menggunakan Image Jadi dari GHCR

Jika Anda ingin mencoba aplikasi di server atau laptop **tanpa perlu mem-build ulang source code**, Anda dapat menggunakan image resmi yang sudah di-build otomatis oleh GitHub Actions ke **GitHub Container Registry (GHCR)**:

- 🐘 **Backend Image:** `ghcr.io/bagusan-yang-ini/bisnis-cerdas/backend:latest`
- ⚛️ **Frontend Image:** `ghcr.io/bagusan-yang-ini/bisnis-cerdas/frontend:latest`

### Cara Menjalankannya via Docker Compose:
1. Salin template `.env`:
   ```bash
   cp .env.example .env
   ```
2. Buka file `.env`, lalu aktifkan variabel image GHCR:
   ```env
   BACKEND_IMAGE=ghcr.io/bagusan-yang-ini/bisnis-cerdas/backend:latest
   FRONTEND_IMAGE=ghcr.io/bagusan-yang-ini/bisnis-cerdas/frontend:latest
   ```
3. Unduh image pre-built dan nyalakan tanpa build:
   ```bash
   docker compose pull
   docker compose up -d --no-build
   ```
4. Jalankan migrasi dan seeder demo:
   ```bash
   docker compose exec backend php artisan migrate --force
   docker compose exec backend php artisan db:seed --class=DemoBusinessSeeder --force
   ```

---

## 5. Panduan Mencoba Aplikasi (Kredensial & Fitur Demo)

Setelah aplikasi terbuka di **[http://localhost:3000](http://localhost:3000)**, ikuti panduan berikut:

### Kredensial Akun Demo (Sudah Terdaftar):
- **Email:** `budi@warungberkah.test`
- **Kata Sandi:** `password123`

*(Atau Anda juga bisa membuat akun baru sendiri melalui menu **Daftar Akun**).*

### Fitur-Fitur yang Dapat Dicoba:
1. **📊 Dashboard Finansial Utama (`/dashboard`):**
   - Melihat ringkasan saldo kas saat ini, total kas masuk, dan kas keluar bulan berjalan.
   - Grafik interaktif tren arus kas bulanan (*Cashflow Trend*).
   - Indikator ringkas rasio keuangan (*Net Margin, Expense Ratio, Operating Ratio*).
2. **📝 Manajemen Transaksi Kas (`/transactions`):**
   - Melihat riwayat transaksi selama 30 hari terakhir.
   - Menambah transaksi pemasukan (penjualan harian, katering, modal) atau pengeluaran (bahan baku, sewa kios, utilitas/listrik, gaji).
   - Memfilter transaksi berdasarkan jenis, kategori, dan rentang tanggal.
   - Mengedit atau menghapus transaksi.
3. **🩺 Diagnosis Kesehatan Keuangan (`/health`):**
   - Menampilkan skor kesehatan finansial UMKM secara objektif dari skala 0–100.
   - Analisis otomatis status kesehatan: **Sehat (*Healthy*)**, **Waspada (*Warning*)**, atau **Kritis (*Critical*)**.
   - Rekomendasi aksi perbaikan konkret (*actionable insights*) berdasarkan kondisi kas.
4. **⏳ Smart Runway Simulator (`/simulator`):**
   - Mensimulasikan berapa bulan bisnis Anda dapat bertahan hidup (*Runway in Months*) jika terjadi penurunan omzet atau kenaikan biaya operasional.
   - Menggeser persentase skenario pengeluaran dan pendapatan secara real-time.

---

## 6. Cheatsheet Perintah Operasional Harian

Simpan perintah-perintah praktis berikut untuk pengelolaan sehari-hari menggunakan Docker:

| Kebutuhan | Perintah |
| :--- | :--- |
| **Cek status container** | `docker compose ps` |
| **Lihat log semua container (live)** | `docker compose logs -f` |
| **Lihat log backend saja** | `docker compose logs -f backend` |
| **Lihat log frontend saja** | `docker compose logs -f frontend` |
| **Masuk ke terminal container backend** | `docker compose exec backend bash` |
| **Jalankan perintah artisan** | `docker compose exec backend php artisan <perintah>` |
| **Masuk ke interactive Laravel Tinker** | `docker compose exec backend php artisan tinker` |
| **Masuk ke MySQL CLI langsung** | `docker compose exec mysql mysql -u bisnis_user -pbisnis_secret_password bisnis_cerdas` |
| **Reset database & seeder ulang** | `docker compose exec backend php artisan migrate:fresh --seed --seeder=DemoBusinessSeeder --force` |
| **Hentikan container sementara** | `docker compose stop` |
| **Nyalakan kembali container yang distop** | `docker compose start` |
| **Matikan container & hapus network** | `docker compose down` |
| **Reset total (Matikan + Hapus database)** | `docker compose down -v` |

---

## 7. Pusat Dokumentasi Teknis

Untuk membaca dokumentasi arsitektur mendalam, kontrak API, dan spesifikasi produk, silakan kunjungi folder **[`docs/`](docs/)**:

- 📚 **[docs/README.md](docs/README.md)**: Indeks seluruh dokumen teknis proyek.
- 📄 **[docs/prd.md](docs/prd.md)**: Product Requirements Document (PRD) spesifikasi MVP.
- 📐 **[docs/financial-math.md](docs/financial-math.md)**: Logika matematika, rumus health score, dan algoritma runway.
- 🔌 **[docs/api-contract.md](docs/api-contract.md)**: Spesifikasi lengkap 14 endpoint REST API dan contoh JSON.
- 🐘 **[docs/backend.md](docs/backend.md)**: Dokumentasi arsitektur Service Layer Laravel 11.
- ⚛️ **[docs/frontend.md](docs/frontend.md)**: Dokumentasi arsitektur React 19, Context API, dan Smart Fallback.
- 🎨 **[docs/design-system.md](docs/design-system.md)**: Panduan palet warna, tipografi, dan desain sistem.
- 🤝 **[CONTRIBUTING.md](CONTRIBUTING.md)**: Alur kerja Git, branch protection, dan standar format commit.
