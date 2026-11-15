# 📚 Dokumentasi Proyek: UMKM Financial Health Platform

Selamat datang di pusat dokumentasi teknis dan arsitektur untuk platform **BisnisCerdas (UMKM Financial Health Platform)**.

Direktori ini dirancang secara terstruktur dan terpusat untuk memudahkan para juri, pengembang (developer), dan kolaborator dalam memahami seluruh aspek perancangan sistem, mulai dari kebutuhan produk, rumus finansial, hingga arsitektur kode.

---

## 📑 Peta Dokumen & Navigasi

### 🏁 Mulai dari Sini (Onboarding Developer Baru)
| # | Dokumen | Isi Utama |
| :--- | :--- | :--- |
| 1 | 🐳 **[Panduan Developer & Docker](development-guide.md)** | Setup lingkungan, menjalankan project (Docker & tanpa Docker), simulasi CI, alur PR |
| 2 | 🤝 **[Panduan Kontribusi & Git](../CONTRIBUTING.md)** | Aturan branch protection, format commit bahasa Indonesia, checklist PR |

### 📐 Spesifikasi Produk & Logika Bisnis
| Dokumen | Isi Utama | Audiens |
| :--- | :--- | :--- |
| 📄 **[Product Requirements Document](prd.md)** | Latar belakang, persona, cakupan fitur MVP, dan batasan teknis | Semua Tim & Juri |
| 📐 **[Panduan Rumus Finansial](financial-math.md)** | Formula *Cash Coverage*, *OER*, *Net Cash Flow Margin*, simulasi *Runway* | Backend & Juri |
| 🔌 **[Spesifikasi API Contract](api-contract.md)** | 14 endpoint REST API: format JSON, query parameter, status HTTP, otorisasi Sanctum | Frontend & Backend |
| 🗺️ **[Diagram Alur Sistem](flowchart.jpg)** | Visualisasi alur data dan proses bisnis dari autentikasi hingga dashboard | Semua Tim & Juri |

### 🏗️ Dokumentasi Arsitektur Implementasi
| Dokumen | Isi Utama | Audiens |
| :--- | :--- | :--- |
| 🐘 **[Dokumentasi Backend](backend.md)** | Arsitektur Laravel 11, Service Layer, skema database MySQL, logika bisnis, data demo seeder, dan cara menjalankan | Backend |
| ⚛️ **[Dokumentasi Frontend](frontend.md)** | Arsitektur React 19 + Vite 8, Tailwind CSS v4, Context API, Recharts, *Offline Fallback*, dan cara menjalankan | Frontend |
| 🎨 **[Desain Sistem & UI](design-system.md)** | Palet warna, tipografi, komponen antarmuka, standar UX *Anti AI Slop* | UI/UX & Frontend |

> [!NOTE]
> Setiap dokumen arsitektur (backend, frontend, development-guide) memiliki bagian **📎 Dokumen Terkait** di akhir halaman untuk navigasi antar dokumen yang saling berkaitan.

---

## 🔒 Kebijakan Kerahasiaan & Publikasi

Dokumen yang dipublikasikan dalam direktori ini adalah dokumen teknis arsitektur standar *open-source*. 

Dokumen administratif internal tim seperti berkas proposal resmi lomba (`.docx`) dan strategi internal tim disimpan secara privat di luar repositori publik demi menjaga kepatuhan dan orisinalitas lomba.
