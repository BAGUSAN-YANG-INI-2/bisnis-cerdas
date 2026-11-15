# UMKM Financial Health Platform

Platform berbasis web untuk membantu pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) mengelola arus kas sederhana, memantau indikator kesehatan finansial (*Financial Health Score*), dan memperkirakan ketahanan modal kerja melalui *Smart Runway Simulator*.

---

## 🚀 Pusat Dokumentasi Proyek

Seluruh dokumentasi teknis, spesifikasi produk, dan arsitektur telah dirapikan secara terpusat di dalam folder **[`docs/`](docs/)**:

- 📚 **[Indeks Dokumentasi Lengkap (docs/README.md)](docs/README.md)**: Direktori utama seluruh dokumen proyek.
- 📄 **[Product Requirements Document (docs/prd.md)](docs/prd.md)**: Spesifikasi fungsional & non-fungsional produk MVP.
- 📐 **[Panduan Logika Matematika Finansial (docs/financial-math.md)](docs/financial-math.md)**: Formula rasio keuangan, health score, dan runway simulator.
- 🔌 **[Spesifikasi API Contract (docs/api-contract.md)](docs/api-contract.md)**: Standar format JSON dan 14 endpoint REST API lengkap.
- 🐘 **[Dokumentasi Backend Laravel (docs/backend.md)](docs/backend.md)**: Arsitektur Service Layer, database, dan logika bisnis.
- ⚛️ **[Dokumentasi Frontend React (docs/frontend.md)](docs/frontend.md)**: Arsitektur UI, state management Context API, dan smart fallback.
- 🎨 **[Desain Sistem & UI (docs/design-system.md)](docs/design-system.md)**: Pedoman komponen antarmuka, warna, dan tipografi.
- 🐳 **[Panduan Developer & Docker (docs/development-guide.md)](docs/development-guide.md)**: Panduan setup lingkungan, inisialisasi, dan review PR.
- 🤝 **[Panduan Kontribusi & Alur Git (CONTRIBUTING.md)](CONTRIBUTING.md)**: Aturan branch protection dan format commit bahasa Indonesia.

---

## 🏷️ Daftar Base Image & Versi Teknologi (Pinned Tags)

Seluruh image Docker telah diselaraskan dengan image lokal dan dikunci (*pinned*) pada versi stabil tanpa menggunakan tag unpinned/generic (`:latest`):

| Layanan / Tool | Base Image / Tag | Peran & Detail |
| :--- | :--- | :--- |
| **Backend Runtime** | `php:8.4-cli` | PHP 8.4 CLI (Debian) + ekstensi `pdo_mysql`, `mbstring`, `bcmath`, `gd`, `zip` |
| **Dependency Manager** | `composer:2.8` | Composer 2.8 disalin langsung ke path binary `/usr/bin/composer` |
| **Frontend Runtime** | `node:20-alpine` | Node.js 20 LTS Alpine (untuk dev server & compile React/Vite) |
| **Frontend Production** | `nginx:1.28-alpine` | Web server statis Nginx 1.28 Alpine untuk stage production GHCR |
| **Database** | `mysql:8.4` | MySQL Server 8.4 LTS dengan healthcheck otomatis |

---

## 🛠️ Prasyarat Sistem (Prerequisites)

Pilih salah satu metode yang paling sesuai dengan lingkungan mesin Anda:

- **Opsi A: Menggunakan Docker (Local Build atau Pre-built GHCR - Sangat Direkomendasikan)**:
  - Hanya membutuhkan **Docker Desktop** (Engine v24+ dan Docker Compose v2+).
  - Anda **tidak perlu menginstal** PHP, Composer, Node.js, atau MySQL di sistem operasi host.
  - Mendukung kompilasi lokal maupun *instant pull* menggunakan image pre-built dari **GitHub Container Registry (GHCR)**.
- **Opsi B: Native / Tanpa Docker**:
  - PHP 8.4+ dengan ekstensi `pdo_mysql`, `mbstring`, `bcmath`, `gd`, `zip`
  - Composer 2.8+
  - Node.js 20.x LTS & npm
  - MySQL Server 8.4+

---

## 💻 Cara Menjalankan Proyek

### Metode 1: Menggunakan Docker Compose (Rekomendasi Utama)

Metode ini adalah cara paling cepat, konsisten, dan terisolasi untuk menjalankan seluruh ekosistem aplikasi (Frontend, Backend, dan MySQL).

#### 1. Salin Konfigurasi Environment
Jalankan perintah ini di root folder project:
```bash
cp .env.example .env
```

#### 2. Bangun Image dan Jalankan Seluruh Stack
```bash
docker compose up -d --build
```
> Perintah di atas akan membangun image backend & frontend, mengunduh MySQL 8.4, dan menjalankan ketiganya di latar belakang (*detached mode*).

#### 3. Jalankan Migrasi Database & Seeder Data Demo
Tunggu beberapa detik hingga container database berstatus `healthy`, lalu eksekusi:
```bash
# Jalankan migrasi tabel database
docker compose exec backend php artisan migrate --force

# Isi database dengan data demo realistis UMKM (Warung Makan Berkah)
docker compose exec backend php artisan db:seed --class=DemoBusinessSeeder --force
```

#### 4. Akses Aplikasi di Browser
Setelah container berjalan dan migrasi selesai, buka URL berikut di browser Anda:
- 🌐 **Frontend Web UI:** [http://localhost:3000](http://localhost:3000)
- 🐘 **Backend REST API:** [http://localhost:8000](http://localhost:8000)
- 🩺 **Backend Health Probe:** [http://localhost:8000/up](http://localhost:8000/up)
- 🗄️ **Database MySQL:** `localhost:3306` (Database: `bisnis_cerdas`, User: `bisnis_user`, Password: `bisnis_secret_password`)

#### 5. Kredensial Login Akun Demo
Gunakan akun yang telah dibuat otomatis oleh seeder untuk langsung mencoba seluruh fitur:
- **Email:** `budi@warungberkah.test`
- **Password:** `password123`
- *Catatan: Akun ini sudah memiliki profil bisnis "Warung Makan Berkah" (Kuliner / F&B) lengkap dengan 30 hari riwayat transaksi kas masuk & kas keluar.*

#### 6. Perintah Docker Harian yang Berguna
```bash
# Memeriksa status kesehatan container
docker compose ps

# Melihat log seluruh container secara real-time
docker compose logs -f

# Melihat log backend saja
docker compose logs -f backend

# Masuk ke dalam terminal container backend
docker compose exec backend bash

# Menjalankan perintah artisan Laravel
docker compose exec backend php artisan <perintah>

# Masuk ke interactive shell Laravel Tinker
docker compose exec backend php artisan tinker

# Masuk ke MySQL CLI
docker compose exec mysql mysql -u bisnis_user -pbisnis_secret_password bisnis_cerdas

# Reset database ke kondisi awal demo
docker compose exec backend php artisan migrate:fresh --seed --seeder=DemoBusinessSeeder --force

# Menghentikan container sementara
docker compose stop

# Menghentikan container dan menghapus jaringan virtual
docker compose down

# Menghentikan container dan MENGHAPUS data volume database (Clean Reset)
docker compose down -v
```

---

### Metode 2: Menggunakan Image Pre-built dari GHCR (Tanpa Perlu Build Lokal)

Jika Anda ingin menjalankan aplikasi di server *staging*, *production*, atau laptop tanpa perlu melakukan build source code secara lokal, Anda dapat langsung menarik (*pull*) image resmi yang telah dikompilasi secara otomatis oleh GitHub Actions ke **GitHub Container Registry (GHCR)**:
- 🐘 **Backend:** `ghcr.io/bagusan-yang-ini/bisnis-cerdas/backend:latest`
- ⚛️ **Frontend:** `ghcr.io/bagusan-yang-ini/bisnis-cerdas/frontend:latest`

#### Opsi 2A. Menjalankan via Docker Compose (Praktis)

1. **Salin file `.env`:**
   ```bash
   cp .env.example .env
   ```

2. **Tentukan image GHCR di file `.env`:**
   Buka file `.env` dan aktifkan/atur variabel image:
   ```env
   BACKEND_IMAGE=ghcr.io/bagusan-yang-ini/bisnis-cerdas/backend:latest
   FRONTEND_IMAGE=ghcr.io/bagusan-yang-ini/bisnis-cerdas/frontend:latest
   ```

3. **(Opsional) Login ke GHCR jika image repositori bersifat privat:**
   ```bash
   echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
   ```
   *(Lewati langkah ini jika paket image di GHCR disetel publik).*

4. **Tarik (*pull*) image pre-built dan jalankan:**
   ```bash
   # Tarik image terbaru dari GHCR
   docker compose pull

   # Jalankan seluruh stack tanpa melakukan build ulang dari source code
   docker compose up -d --no-build
   ```

5. **Jalankan migrasi database & data demo:**
   ```bash
   docker compose exec backend php artisan migrate --force
   docker compose exec backend php artisan db:seed --class=DemoBusinessSeeder --force
   ```

---

#### Opsi 2B. Menjalankan via Standalone `docker run` (Tanpa docker-compose.yml)

Bagi lingkungan server yang hanya memiliki Docker Engine tanpa file repositori lokal:

```bash
# 1. Buat Docker Network bersama
docker network create umkm_network

# 2. Jalankan MySQL 8.4 Server
docker run -d \
  --name umkm_mysql \
  --network umkm_network \
  -e MYSQL_DATABASE=bisnis_cerdas \
  -e MYSQL_USER=bisnis_user \
  -e MYSQL_PASSWORD=bisnis_secret_password \
  -e MYSQL_ROOT_PASSWORD=root_secret_password \
  -p 3306:3306 \
  -v mysql_data:/var/lib/mysql \
  mysql:8.4

# 3. Jalankan Backend Laravel dari GHCR
docker run -d \
  --name umkm_backend \
  --network umkm_network \
  -e APP_NAME="UMKM Financial Health Platform" \
  -e APP_ENV=production \
  -e APP_KEY=base64:yd9JUmij/+EO+QvIPzBN1rJRcaA1vlDRldEV4n7j6GY= \
  -e DB_CONNECTION=mysql \
  -e DB_HOST=umkm_mysql \
  -e DB_PORT=3306 \
  -e DB_DATABASE=bisnis_cerdas \
  -e DB_USERNAME=bisnis_user \
  -e DB_PASSWORD=bisnis_secret_password \
  -p 8000:8000 \
  ghcr.io/bagusan-yang-ini/bisnis-cerdas/backend:latest

# 4. Jalankan Frontend Nginx dari GHCR
docker run -d \
  --name umkm_frontend \
  --network umkm_network \
  -p 3000:3000 \
  ghcr.io/bagusan-yang-ini/bisnis-cerdas/frontend:latest

# 5. Jalankan migrasi dan seeder
docker exec umkm_backend php artisan migrate --force
docker exec umkm_backend php artisan db:seed --class=DemoBusinessSeeder --force
```

---

### Metode 3: Menjalankan Secara Native (Tanpa Docker)

Jika Anda ingin menjalankan proyek langsung di lingkungan laptop Anda tanpa Docker:

#### 1. Setup Backend (Laravel 11)
Buka terminal dan masuk ke folder `backend`:
```bash
cd backend

# Salin environment file
cp .env.example .env

# Install dependensi PHP
composer install

# Buat application encryption key
php artisan key:generate
```

Sesuaikan konfigurasi database di file `backend/.env` dengan MySQL lokal Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bisnis_cerdas
DB_USERNAME=root
DB_PASSWORD=password_mysql_anda
```

Jalankan migrasi, seeder, dan server backend:
```bash
php artisan migrate
php artisan db:seed --class=DemoBusinessSeeder
php artisan serve --port=8000
```
Backend API aktif di **`http://localhost:8000`**.

#### 2. Setup Frontend (React 19 + Vite)
Buka tab/jendela terminal baru, lalu masuk ke folder `frontend`:
```bash
cd frontend

# Salin environment file (mengarah ke http://localhost:8000/api)
cp .env.example .env

# Install dependensi Node.js
npm install

# Jalankan Vite development server
npm run dev
```
Frontend UI aktif di **`http://localhost:3000`**.

> [!TIP]
> Frontend dilengkapi dengan fitur **Smart Fallback**. Jika Backend belum aktif, Frontend akan secara transparan menggunakan data mock lokal sehingga UI tetap dapat ditinjau. Ketika Backend dinyalakan, Frontend akan otomatis beralih ke REST API live.

---

## 🧪 Pengujian & Simulasi CI Lokal (`act`)

Sebelum membuat Pull Request ke branch `dev` atau `main`, Anda dapat memverifikasi pipeline GitHub Actions langsung di mesin lokal menggunakan alat [`act`](https://github.com/nektos/act):

```bash
# 1. Verifikasi Docker Stack End-to-End (Build, Up, Healthy, Migrate, Seed, & HTTP Check)
act -j verify-docker-e2e

# 2. Verifikasi Build Native Frontend (Node 20 / Vite)
act -j verify-native-frontend

# 3. Verifikasi Native Backend (PHP 8.4 / Composer & 14 Rute REST API)
act -j verify-native-backend
```

---

## 🔌 Ringkasan Endpoint REST API

Semua respons API menggunakan struktur standar `{ "success": boolean, "message": string, "data": ... }`. Dokumentasi lengkap dapat dilihat di [docs/api-contract.md](docs/api-contract.md).

| Method | Endpoint | Deskripsi | Autentikasi |
| :--- | :--- | :--- | :--- |
| `GET` | `/up` | Health check probe aplikasi Laravel | Bebas |
| `POST` | `/api/register` | Pendaftaran pengguna baru | Bebas |
| `POST` | `/api/login` | Login & perolehan Sanctum Bearer token | Bebas |
| `POST` | `/api/logout` | Revoke token aktif pengguna | Bearer Token |
| `GET` | `/api/me` | Informasi akun pengguna saat ini | Bearer Token |
| `GET` | `/api/business-profile` | Data profil usaha & saldo awal | Bearer Token |
| `PUT` | `/api/business-profile` | Update profil usaha / saldo awal | Bearer Token |
| `GET` | `/api/dashboard` | Ringkasan saldo, kas bulan ini, rasio, & tren 6 bulan | Bearer Token |
| `GET` | `/api/financial-health` | Skor kesehatan finansial (0-100), status, & insight | Bearer Token |
| `GET` | `/api/transactions` | Riwayat transaksi (filter jenis, kategori, rentang tanggal) | Bearer Token |
| `POST` | `/api/transactions` | Tambah transaksi baru (income / expense) | Bearer Token |
| `GET` | `/api/transactions/{id}` | Detail transaksi spesifik | Bearer Token |
| `PUT` | `/api/transactions/{id}` | Perbarui transaksi | Bearer Token |
| `DELETE` | `/api/transactions/{id}` | Hapus transaksi | Bearer Token |
| `POST` | `/api/runway/simulate` | Simulasi runway modal kerja berdasarkan skenario pengeluaran/pendapatan | Bearer Token |

---

## 📁 Struktur Repositori

```text
bisnis-cerdas/
├── .github/
│   └── workflows/
│       └── ci.yml                  # Unified CI/CD (Verify build pada PR, Push GHCR di branch main)
├── docs/                           # 📚 Pusat Dokumentasi Teknis & Produk
│   ├── README.md                   # Indeks utama dokumentasi
│   ├── prd.md                      # Product Requirements Document
│   ├── financial-math.md           # Logika matematika & rumus finansial
│   ├── api-contract.md             # Spesifikasi 14 endpoint REST API
│   ├── backend.md                  # Dokumentasi arsitektur backend Laravel
│   ├── frontend.md                 # Dokumentasi arsitektur frontend React
│   ├── design-system.md            # Panduan desain sistem & antarmuka
│   ├── development-guide.md        # Panduan teknis onboarding developer
│   └── flowchart.jpg               # Visualisasi diagram alur sistem
├── backend/                        # 🐘 Source Code & Dockerfile Laravel 11
│   ├── app/                        # Controllers, Services, Models, Requests
│   ├── database/                   # Migrasi & DemoBusinessSeeder
│   ├── routes/                     # api.php, web.php
│   ├── .dockerignore
│   ├── .env.example
│   ├── .gitignore
│   ├── docker-entrypoint.sh        # Startup script container backend
│   └── Dockerfile
├── frontend/                       # ⚛️ Source Code & Dockerfile React 19 + Vite
│   ├── src/                        # Pages, Components, Context, Services API
│   ├── .dockerignore
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile                  # Multi-stage build (Dev & Nginx Production)
│   └── nginx.conf
├── .env.example                    # Template variabel environment root / docker-compose
├── .gitignore                      # Gitignore komprehensif root
├── CONTRIBUTING.md                 # Aturan kontribusi & branch protection
├── docker-compose.yml              # Orkestrasi Backend, Frontend, dan MySQL
└── README.md                       # Dokumentasi utama proyek
```

---

## 🚀 Alur CI/CD & GHCR (GitHub Actions Terpadu)

Sesuai aturan branch protection pada [CONTRIBUTING.md](CONTRIBUTING.md):
- **Pull Request ke `dev` atau `main`:**
  - Menjalankan 3 job verifikasi secara paralel:
    1. 🐳 **`verify-docker-e2e` (Rekomendasi Utama)**: Menguji secara nyata `docker compose up`, migrasi database, dan respons HTTP server.
    2. ⚛️ **`verify-native-frontend` (Tanpa Docker)**: Menguji instalasi dependensi npm dan kompilasi build Vite.
    3. 🐘 **`verify-native-backend` (Tanpa Docker)**: Menguji instalasi Composer dan validitas 14 rute API Laravel.
  - Memverifikasi secara komprehensif bahwa kode dapat dijalankan baik oleh developer dengan Docker maupun tanpa Docker. Status check langsung hijau (✅) jika seluruh pengujian berhasil.
- **Upload ke GHCR (GitHub Container Registry):**
  - **Hanya berjalan di branch `main`** setelah Pull Request berhasil di-merge (push ke `main`) dan ketiga pengujian di atas berstatus hijau.
  - Mem-build dan mem-push kedua image sekaligus ke:
    - `ghcr.io/<repo>/backend:latest` (dan tag SHA commit)
    - `ghcr.io/<repo>/frontend:latest` (dan tag SHA commit)
