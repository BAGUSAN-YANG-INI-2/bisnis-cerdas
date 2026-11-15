# 📖 Panduan Lengkap Developer (Developer Onboarding & Workflow Guide)
## Proyek: UMKM Financial Health Platform

Dokumen ini adalah panduan teknis bagi seluruh anggota tim pengembang (**Backend Engineer** dan **Frontend Engineer**) untuk menginisialisasi project, menjalankan aplikasi, menguji kode secara lokal, dan mengelola Pull Request.

---

## 📑 Daftar Isi
1. [Standar Lingkungan Runtime](#1-standar-lingkungan-runtime)
2. [Inisialisasi Project Awal](#2-inisialisasi-project-awal)
3. [Menjalankan Project](#3-menjalankan-project)
4. [Menguji Build Lokal Tanpa Push (Simulasi CI)](#4-menguji-build-lokal-tanpa-push-simulasi-ci)
5. [Alur Membuat Pull Request (PR)](#5-alur-membuat-pull-request-pr)
6. [Alur Mereview & Menguji PR Teman](#6-alur-mereview--menguji-pr-teman)
7. [Cheatsheet Perintah Docker Harian](#7-cheatsheet-perintah-docker-harian)

---

## 1. Standar Lingkungan Runtime

Semua runtime telah distandarisasi di dalam container Docker:

| Layanan | Image & Versi | Port Host | Catatan |
| :--- | :--- | :--- | :--- |
| **Backend** | `php:8.4-cli` | `http://localhost:8000` | Laravel 11 REST API |
| **Frontend** | `node:20-alpine` | `http://localhost:3000` | React + Vite SPA |
| **Database** | `mysql:8.4` | `localhost:3306` | MySQL 8.4 LTS |

---

## 2. Inisialisasi Project Awal

Jalankan perintah ini langsung dari **root folder project (`bisnis-cerdas/`)** tanpa perlu menginstall PHP/Composer/Node di sistem operasi lokal laptop Anda:

### A. Inisialisasi Backend (Laravel)
```bash
docker compose run --rm --no-deps backend sh -c "composer config -g process-timeout 3600 && composer create-project --prefer-source laravel/laravel /tmp/app && cp -r /tmp/app/. . && rm -rf /tmp/app"
```

1. **Konfigurasi Database di `backend/.env`:**
   Sesuaikan koneksi database agar mengarah ke container MySQL:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=mysql
   DB_PORT=3306
   DB_DATABASE=bisnis_cerdas
   DB_USERNAME=bisnis_user
   DB_PASSWORD=bisnis_secret_password
   ```

2. **Kunci Versi PHP di `backend/composer.json`:**
   Tambahkan blok `"platform"` di dalam `"config"`:
   ```json
   "config": {
       "optimize-autoloader": true,
       "preferred-install": "dist",
       "sort-packages": true,
       "platform": {
           "php": "8.4.0"
       }
   }
   ```

### B. Inisialisasi Frontend (React + Vite)
```bash
docker compose run --rm --no-deps frontend sh -c "npx --yes create-vite@latest /tmp/app --template react && cp -r /tmp/app/. . && rm -rf /tmp/app && npm install"
```

1. **Konfigurasi `frontend/vite.config.js` (Wajib):**
   Pastikan opsi `server` disetel agar bisa diakses dari browser host:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     server: {
       host: '0.0.0.0', // Wajib: agar bisa diakses dari luar container
       port: 3000,
       strictPort: true
     }
   })
   ```

2. **Kunci Versi Node di `frontend/package.json`:**
   ```json
   "engines": {
     "node": ">=20.0.0 <21.0.0"
   }
   ```

---

## 3. Menjalankan Project

1. **Salin environment template:**
   ```bash
   cp .env.example .env
   ```
2. **Jalankan semua service sekaligus:**
   ```bash
   docker compose up -d --build
   ```
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:8000](http://localhost:8000)
   - **MySQL:** `localhost:3306`

3. **Jalankan migrasi database awal:**
   ```bash
   docker compose exec backend php artisan migrate
   ```

---

## 4. Menguji Build Lokal Tanpa Push (Simulasi CI)

Sebelum membuat Pull Request, Anda bisa memastikan apakah kode Anda akan lolos uji CI GitHub Actions:

### Di PowerShell (Windows):
```powershell
$env:FRONTEND_TARGET="production"
docker compose build backend frontend
```

### Di Git Bash / Mac / Linux:
```bash
FRONTEND_TARGET=production docker compose build backend frontend
```

*Jika proses build di atas selesai dengan kode 0 (tanpa error), maka status check GitHub Actions di cloud dipastikan 100% hijau (✅).*

---

## 5. Alur Membuat Pull Request (PR)

Sesuai aturan di [CONTRIBUTING.md](CONTRIBUTING.md):

1. **Buat branch baru dari `dev`:**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/nama-fitur
   ```
2. **Simpan dan commit pekerjaan:**
   ```bash
   git add .
   git commit -m "feat: menambahkan fitur pencatatan transaksi kas"
   git push origin feature/nama-fitur
   ```
3. **Buat PR ke branch `dev` via GitHub CLI:**
   ```bash
   gh pr create --base dev --title "feat: menambahkan fitur pencatatan transaksi kas" --body "Implementasi CRUD transaksi sesuai PRD."
   ```

---

## 6. Alur Mereview & Menguji PR Teman

Jika ada rekan tim yang membuat Pull Request, ikuti langkah berikut untuk menguji kodingannya secara lokal sebelum di-merge:

1. **Lihat daftar PR:**
   ```bash
   gh pr list
   ```
2. **Tarik (*checkout*) kodingan PR teman ke laptop Anda (misal PR #6):**
   ```bash
   # Simpan sementara perubahan lokal Anda jika ada
   git stash

   # Pindah ke branch PR teman
   gh pr checkout 6
   ```
3. **Nyalakan container dan uji fitur di browser:**
   ```bash
   docker compose up -d --build
   docker compose exec backend php artisan migrate
   ```
   Buka `http://localhost:3000` dan tes fungsionalitasnya.
4. **Beri keputusan review:**
   - **Jika OKE (Approve & Merge ke `dev`):**
     ```bash
     gh pr review 6 --approve -b "Sudah diuji di lokal, semua berjalan lancar!"
     gh pr merge 6 --merge
     ```
   - **Jika ada bug (Request Changes):**
     ```bash
     gh pr review 6 --request-changes -b "Terdapat error saat submit form, tolong perbaiki bagian X."
     ```
5. **Kembali ke branch `dev` Anda:**
   ```bash
   docker compose down
   git checkout dev
   git pull origin dev
   ```

---

## 7. Cheatsheet Perintah Docker Harian

| Kebutuhan | Perintah |
| :--- | :--- |
| **Migrasi Database Laravel** | `docker compose exec backend php artisan migrate` |
| **Seeder Database Laravel** | `docker compose exec backend php artisan db:seed` |
| **Install Package Composer Baru** | `docker compose exec backend composer require <package>` |
| **Install Package NPM Baru** | `docker compose exec frontend npm install <package>` |
| **Lihat Log Backend** | `docker compose logs -f backend` |
| **Lihat Log Frontend** | `docker compose logs -f frontend` |
| **Masuk Terminal Backend** | `docker compose exec backend bash` |
| **Masuk Terminal Frontend** | `docker compose exec frontend sh` |
| **Restart Container Tertentu** | `docker compose restart backend` |
| **Hentikan Seluruh Container** | `docker compose down` |
| **Hentikan & Reset Database** | `docker compose down -v` |
