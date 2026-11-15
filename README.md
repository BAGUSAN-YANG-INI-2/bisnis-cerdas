# UMKM Financial Health Platform

Platform berbasis web untuk membantu pelaku UMKM mengelola arus kas sederhana, memantau indikator kesehatan finansial (*Financial Health Score*), dan memperkirakan ketahanan modal kerja melalui *Smart Runway Simulator*.

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
│   ├── .dockerignore
│   ├── .env.example
│   ├── .gitignore
│   ├── docker-entrypoint.sh
│   └── Dockerfile
├── frontend/                       # ⚛️ Source Code & Dockerfile React 19 + Vite
│   ├── .dockerignore
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   └── nginx.conf
├── .env.example                    # Template variabel environment root / docker-compose
├── .gitignore                      # Gitignore komprehensif root
├── CONTRIBUTING.md                 # Aturan kontribusi & branch protection
├── docker-compose.yml              # Orkestrasi Backend, Frontend, dan MySQL
└── README.md                       # Dokumentasi utama proyek
```

---

## 🐳 Cara Menjalankan dengan Docker Compose

### 1. Salin Template Environment
Sebelum menjalankan container pertama kali, buat file `.env` di root folder:
```bash
cp .env.example .env
```

### 2. Menjalankan Seluruh Layanan (Frontend, Backend, MySQL)
```bash
docker compose up -d --build
```

Setelah container aktif:
- **Frontend React:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000](http://localhost:8000)
- **MySQL Database:** `localhost:3306` (Database: `bisnis_cerdas`, User: `bisnis_user`)

### 3. Menjalankan Layanan Secara Terpisah (Opsional)
- **Backend + Database saja:**
  ```bash
  docker compose up -d backend
  ```
- **Frontend saja:**
  ```bash
  docker compose up -d frontend
  ```

### 4. Menjalankan Migrasi Database Laravel
Setelah service backend dan MySQL aktif:
```bash
docker compose exec backend php artisan migrate
```

### 5. Menghentikan Layanan
```bash
# Menghentikan container
docker compose down

# Menghentikan container sekaligus menghapus volume database
docker compose down -v
```

---

## 👨‍💻 Inisialisasi Proyek Baru (Khusus Developer)

Jalankan perintah ini langsung dari **root folder project** (`bisnis-cerdas/`):

### 1. Developer Backend (Laravel via Docker)
```bash
docker compose run --rm --no-deps backend sh -c "composer config -g process-timeout 3600 && composer create-project --prefer-source laravel/laravel /tmp/app && cp -r /tmp/app/. . && rm -rf /tmp/app"
```

### 2. Developer Frontend (React + Vite via Docker)
```bash
docker compose run --rm --no-deps frontend sh -c "npx --yes create-vite@latest /tmp/app --template react && cp -r /tmp/app/. . && rm -rf /tmp/app && npm install"
```

---

## 🚀 Alur CI/CD & GHCR (GitHub Actions Terpadu)

Sesuai aturan branch protection pada [CONTRIBUTING.md](CONTRIBUTING.md):
- **Pull Request ke `dev` atau `main`:**
  - Menjalankan job `verify-build` (`docker compose build backend frontend`).
  - Memverifikasi secara nyata bahwa kodingan Backend dan Frontend bisa di-build tanpa error sintaks / bundle. Status check langsung hijau (✅) jika build berhasil.
- **Upload ke GHCR (GitHub Container Registry):**
  - **Hanya berjalan di branch `main`** setelah Pull Request berhasil di-merge (push ke `main`).
  - Mem-build dan mem-push kedua image sekaligus ke:
    - `ghcr.io/<repo>/backend:latest` (dan tag SHA commit)
    - `ghcr.io/<repo>/frontend:latest` (dan tag SHA commit)
