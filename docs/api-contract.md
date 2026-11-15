# API Contract: UMKM Financial Health Platform
**Versi:** 1.0  
**Tipe:** RESTful JSON API  
**Base URL:** `http://localhost:8000/api`  
**Timezone:** `Asia/Jakarta` (WIB)  
**Authentication:** Laravel Sanctum (`Authorization: Bearer <token>`)  
**Currency Unit:** Integer Rupiah (IDR) tanpa desimal dan simbol (contoh: Rp5.000.000 ditulis `5000000`)

---

## 1. Aturan Global & Standar Komunikasi

### 1.1 HTTP Headers
Setiap request wajib menyertakan:
```http
Accept: application/json
Content-Type: application/json
```
Untuk endpoint yang membutuhkan autentikasi (Auth Required):
```http
Authorization: Bearer <personal_access_token>
```

### 1.2 Skema Standar Response

#### A. Sukses (200 OK / 201 Created)
```json
{
  "success": true,
  "message": "Operasi berhasil dilakukan.",
  "data": {}
}
```

#### B. Validasi Gagal (422 Unprocessable Entity)
```json
{
  "success": false,
  "message": "Validasi input gagal.",
  "errors": {
    "field_name": [
      "Pesan error spesifik untuk field ini."
    ]
  }
}
```

#### C. Unauthenticated (401 Unauthorized)
```json
{
  "success": false,
  "message": "Sesi tidak valid atau token belum disertakan.",
  "errors": null
}
```

#### D. Resource Tidak Ditemukan (404 Not Found)
```json
{
  "success": false,
  "message": "Data tidak ditemukan atau bukan milik akun Anda.",
  "errors": null
}
```

---

## 2. Master Data & Enums

### 2.1 Kategori Transaksi & Klasifikasi Operasional
Backend membedakan biaya operasional dan non-operasional untuk perhitungan rasio finansial:

| Tipe | Kategori (`category`) | Label Tampilan | Operasional (`is_operational`) |
| :--- | :--- | :--- | :--- |
| `income` | `sales` | Penjualan Produk | `true` |
| `income` | `service_income` | Pendapatan Jasa | `true` |
| `income` | `other_income` | Pendapatan Lain-lain | `false` |
| `expense` | `raw_materials` | Bahan Baku / Stok | `true` |
| `expense` | `rent` | Sewa Tempat | `true` |
| `expense` | `utilities` | Listrik, Air, & Internet | `true` |
| `expense` | `operational_transport`| Transportasi Operasional | `true` |
| `expense` | `salaries` | Gaji / Upah Karyawan | `true` |
| `expense` | `marketing` | Pemasaran & Promosi | `true` |
| `expense` | `asset_purchase` | Pembelian Peralatan/Aset | `false` |
| `expense` | `loan_principal` | Bayar Pokok Pinjaman/Utang | `false` |
| `expense` | `owner_withdrawal` | Penarikan Modal / Prive | `false` |
| `expense` | `other_expense` | Pengeluaran Lainnya | `false` |

---

## 3. Spesifikasi Endpoint

### 3.1 Authentication & User Profile

#### `POST /register`
Mendaftarkan akun pemilik usaha sekaligus membuat profil bisnis awal.
* **Auth:** Public
* **Request Body:**
```json
{
  "name": "Budi Santoso",
  "email": "budi@warungberkah.test",
  "password": "password123",
  "password_confirmation": "password123",
  "business_name": "Warung Makan Berkah",
  "business_type": "Kuliner / F&B",
  "opening_balance": 2000000
}
```
* **Validation Rules:**
  * `name`: `required|string|max:255`
  * `email`: `required|email|unique:users,email`
  * `password`: `required|string|min:8|confirmed`
  * `business_name`: `required|string|max:255`
  * `business_type`: `required|string|max:100`
  * `opening_balance`: `required|integer|min:0`
* **Response (201 Created):**
```json
{
  "success": true,
  "message": "Registrasi akun dan profil usaha berhasil.",
  "data": {
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@warungberkah.test"
    },
    "business_profile": {
      "id": 1,
      "business_name": "Warung Makan Berkah",
      "business_type": "Kuliner / F&B",
      "opening_balance": 2000000
    },
    "token": "1|sanctum_generated_plain_text_token"
  }
}
```

---

#### `POST /login`
Mendapatkan Bearer token autentikasi.
* **Auth:** Public
* **Request Body:**
```json
{
  "email": "budi@warungberkah.test",
  "password": "password123"
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Login berhasil.",
  "data": {
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@warungberkah.test"
    },
    "business_profile": {
      "id": 1,
      "business_name": "Warung Makan Berkah",
      "business_type": "Kuliner / F&B",
      "opening_balance": 2000000
    },
    "token": "2|sanctum_generated_plain_text_token"
  }
}
```

---

#### `POST /logout`
Mencabut token sesi pengguna saat ini.
* **Auth:** Required
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Berhasil logout.",
  "data": null
}
```

---

#### `GET /me`
Mengambil data detail akun dan profil usaha yang sedang aktif.
* **Auth:** Required
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Data profil pengguna berhasil dimuat.",
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "email": "budi@warungberkah.test",
    "business_profile": {
      "id": 1,
      "business_name": "Warung Makan Berkah",
      "business_type": "Kuliner / F&B",
      "opening_balance": 2000000
    }
  }
}
```

---

#### `PUT /business-profile`
Memperbarui informasi bisnis atau saldo awal.
* **Auth:** Required
* **Request Body:**
```json
{
  "business_name": "Warung Makan Berkah Jaya",
  "business_type": "Kuliner & Katering",
  "opening_balance": 2500000
}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Profil usaha berhasil diperbarui.",
  "data": {
    "id": 1,
    "business_name": "Warung Makan Berkah Jaya",
    "business_type": "Kuliner & Katering",
    "opening_balance": 2500000
  }
}
```

---

### 3.2 Cash Management (Transactions)

#### `GET /transactions`
Menampilkan daftar transaksi dengan filter tanggal, jenis, dan pagination.
* **Auth:** Required
* **Query Parameters:**
  * `type` *(opsional)*: `income` | `expense`
  * `category` *(opsional)*: string nama kategori
  * `from` *(opsional)*: `YYYY-MM-DD` (contoh: `2026-10-13`)
  * `to` *(opsional)*: `YYYY-MM-DD` (contoh: `2026-11-11`)
  * `page` *(opsional)*: integer (default `1`)
  * `per_page` *(opsional)*: integer (default `15`)
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Daftar transaksi berhasil dimuat.",
  "data": [
    {
      "id": 101,
      "type": "income",
      "category": "sales",
      "is_operational": true,
      "amount": 500000,
      "description": "Pesanan paket makan siang kantor",
      "transaction_date": "2026-11-10",
      "created_at": "2026-11-10T08:30:00.000000Z"
    },
    {
      "id": 102,
      "type": "expense",
      "category": "raw_materials",
      "is_operational": true,
      "amount": 200000,
      "description": "Belanja bumbu dan sayuran",
      "transaction_date": "2026-11-10",
      "created_at": "2026-11-10T09:15:00.000000Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 15,
    "total": 38,
    "last_page": 3
  }
}
```

---

#### `POST /transactions`
Mencatat transaksi kas masuk atau keluar baru.
* **Auth:** Required
* **Request Body:**
```json
{
  "type": "expense",
  "category": "raw_materials",
  "amount": 350000,
  "description": "Pembelian beras 2 karung",
  "transaction_date": "2026-11-12"
}
```
* **Validation Rules:**
  * `type`: `required|in:income,expense`
  * `category`: `required|string|max:50`
  * `amount`: `required|integer|min:1`
  * `description`: `nullable|string|max:500`
  * `transaction_date`: `required|date_format:Y-m-d`
* **Response (201 Created):**
```json
{
  "success": true,
  "message": "Transaksi berhasil disimpan.",
  "data": {
    "id": 103,
    "type": "expense",
    "category": "raw_materials",
    "is_operational": true,
    "amount": 350000,
    "description": "Pembelian beras 2 karung",
    "transaction_date": "2026-11-12",
    "created_at": "2026-11-12T10:00:00.000000Z"
  }
}
```

---

#### `GET /transactions/{id}`
Mengambil detail satu transaksi.
* **Auth:** Required
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Detail transaksi berhasil dimuat.",
  "data": {
    "id": 103,
    "type": "expense",
    "category": "raw_materials",
    "is_operational": true,
    "amount": 350000,
    "description": "Pembelian beras 2 karung",
    "transaction_date": "2026-11-12",
    "created_at": "2026-11-12T10:00:00.000000Z"
  }
}
```

---

#### `PUT /transactions/{id}`
Memperbarui data transaksi yang sudah dicatat.
* **Auth:** Required
* **Request Body:** Sama dengan `POST /transactions`
* **Response (200 OK):** Objek transaksi yang telah diperbarui.

---

#### `DELETE /transactions/{id}`
Menghapus transaksi.
* **Auth:** Required
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Transaksi berhasil dihapus.",
  "data": null
}
```

---

### 3.3 Dashboard

#### `GET /dashboard`
Menyediakan ringkasan kas, grafik arus kas harian, skor singkat, dan status runway.
* **Auth:** Required
* **Query Parameters:**
  * `from` *(opsional)*: `YYYY-MM-DD` (default: 30 hari yang lalu)
  * `to` *(opsional)*: `YYYY-MM-DD` (default: hari ini)
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Ringkasan dashboard berhasil dimuat.",
  "data": {
    "period": {
      "from": "2026-10-14",
      "to": "2026-11-12",
      "days": 30
    },
    "summary": {
      "available_cash": 5000000,
      "total_income": 10000000,
      "total_expense": 7000000,
      "operating_expense": 6000000,
      "non_operating_expense": 1000000,
      "net_cash_flow": 3000000,
      "average_daily_expense": 233333
    },
    "health_score_summary": {
      "score": 69,
      "label": "fair",
      "label_display": "Cukup sehat",
      "status": "available"
    },
    "runway_summary": {
      "daily_net_burn": -100000,
      "runway_days": null,
      "status": "positive_cash_flow",
      "message": "Arus kas bersih positif. Bisnis tidak mengalami pembakaran kas (net burn)."
    },
    "chart_daily_trend": [
      {
        "date": "2026-11-01",
        "income": 400000,
        "expense": 250000,
        "net": 150000
      },
      {
        "date": "2026-11-02",
        "income": 600000,
        "expense": 300000,
        "net": 300000
      }
    ]
  }
}
```

---

### 3.4 Financial Health Engine

#### `GET /financial-health`
Menghitung Financial Health Score (0–100) komposit dan 3 rasio pembentuknya beserta insight kontekstual.
* **Auth:** Required
* **Query Parameters:**
  * `from` *(opsional)*: `YYYY-MM-DD` (default: 30 hari yang lalu)
  * `to` *(opsional)*: `YYYY-MM-DD` (default: hari ini)
* **Response (200 OK - Data Tersedia):**
```json
{
  "success": true,
  "message": "Analisis kesehatan keuangan berhasil dihitung.",
  "data": {
    "period": {
      "from": "2026-10-14",
      "to": "2026-11-12",
      "days": 30
    },
    "status": "available",
    "score": 69,
    "label": "fair",
    "label_display": "Cukup Sehat",
    "summary_explanation": "Kondisi arus kas positif, namun cadangan kas masih berada di bawah target aman 1 bulan operasional.",
    "components": {
      "cash_coverage": {
        "status": "available",
        "value_months": 0.83,
        "score": 40,
        "weight": "35%",
        "explanation": "Kas tersedia saat ini hanya cukup untuk menutup 0.83 bulan rata-rata biaya operasional."
      },
      "operating_expense_ratio": {
        "status": "available",
        "value_percent": 60.0,
        "score": 70,
        "weight": "35%",
        "explanation": "60% pemasukan digunakan untuk operasional bisnis harian."
      },
      "net_cash_flow_margin": {
        "status": "available",
        "value_percent": 30.0,
        "score": 100,
        "weight": "30%",
        "explanation": "Margin arus kas sangat baik (30% dari total pemasukan)."
      }
    },
    "insights": [
      {
        "type": "warning",
        "code": "LOW_CASH_COVERAGE",
        "message": "Kas belum setara satu bulan biaya operasional. Perhatikan kewajiban kas jangka dekat."
      },
      {
        "type": "positive",
        "code": "HEALTHY_CASH_FLOW",
        "message": "Arus kas periode ini positif dan menghasilkan surplus kas sebesar Rp3.000.000."
      }
    ]
  }
}
```

* **Response (200 OK - Data Transaksi Belum Cukup):**
*(Jika belum ada pemasukan atau belum ada transaksi sama sekali)*
```json
{
  "success": true,
  "message": "Data belum mencukupi untuk menghitung skor kesehatan keuangan.",
  "data": {
    "period": {
      "from": "2026-10-14",
      "to": "2026-11-12",
      "days": 30
    },
    "status": "insufficient_data",
    "score": null,
    "label": "insufficient_data",
    "label_display": "Data Belum Cukup",
    "summary_explanation": "Skor belum tersedia. Silakan lengkapi catatan pemasukan dan pengeluaran operasional Anda.",
    "components": {
      "cash_coverage": {
        "status": "insufficient_data",
        "value_months": null,
        "score": null,
        "weight": "35%",
        "explanation": "Biaya operasional masih 0 atau data transaksi belum cukup."
      },
      "operating_expense_ratio": {
        "status": "insufficient_data",
        "value_percent": null,
        "score": null,
        "weight": "35%",
        "explanation": "Pemasukan masih 0; rasio tidak dapat dibagi dengan nol."
      },
      "net_cash_flow_margin": {
        "status": "insufficient_data",
        "value_percent": null,
        "score": null,
        "weight": "30%",
        "explanation": "Pemasukan masih 0; margin tidak dapat dihitung."
      }
    },
    "insights": [
      {
        "type": "info",
        "code": "NEED_MORE_DATA",
        "message": "Catat minimal 1 pemasukan dan 1 pengeluaran operasional untuk melihat skor kesehatan keuangan usaha Anda."
      }
    ]
  }
}
```

---

### 3.5 Smart Runway Simulator

#### `POST /runway/simulate`
Menjalankan simulasi skenario "what-if" ketahanan kas tanpa memodifikasi catatan transaksi aktual.
* **Auth:** Required
* **Request Body:**
```json
{
  "daily_income_assumption": 250000,
  "daily_expense_assumption": 350000,
  "simulation_days": 30
}
```
* **Validation Rules:**
  * `daily_income_assumption`: `required|integer|min:0`
  * `daily_expense_assumption`: `required|integer|min:0`
  * `simulation_days`: `required|integer|min:1|max:365`
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Simulasi runway berhasil dihitung.",
  "data": {
    "available_cash": 5000000,
    "assumptions": {
      "daily_income": 250000,
      "daily_expense": 350000,
      "simulation_days": 30
    },
    "simulated_daily_net_burn": 100000,
    "simulated_runway_days": 50,
    "projected_cash_after_period": 2000000,
    "status": "net_burn",
    "message": "Dengan estimasi pembakaran kas Rp100.000/hari, kas Anda diproyeksikan bertahan selama 50 hari ke depan."
  }
}
```

#### Status Runway Enums & Penanganan Edge Cases:
* `net_burn`: `simulated_daily_net_burn > 0` dan `available_cash > 0` $\rightarrow$ `simulated_runway_days = available_cash / net_burn`
* `positive_cash_flow`: Pemasukan $\ge$ Pengeluaran $\rightarrow$ `simulated_runway_days: null` (kas bertambah, tidak habis)
* `break_even`: Pemasukan = Pengeluaran $\rightarrow$ `simulated_runway_days: null` (kas stabil)
* `insufficient_cash`: Kas tersedia $\le 0$ saat simulasi dijalankan $\rightarrow$ `simulated_runway_days: null`

---

## 📎 Dokumen Terkait

| Dokumen | Relevansi |
| :--- | :--- |
| **[Dokumentasi Backend (backend.md)](backend.md)** | Arsitektur controller, route, dan service layer yang mengimplementasikan API ini |
| **[Dokumentasi Frontend (frontend.md)](frontend.md)** | Service client frontend (`api.js`) dan penanganan response/error |
| **[Panduan Rumus Finansial (financial-math.md)](financial-math.md)** | Dasar matematis untuk endpoint analisis `/api/dashboard`, `/api/financial-health`, dan `/api/runway/simulate` |
| **[Panduan Developer & Docker (development-guide.md)](development-guide.md)** | Cara menjalankan backend API secara lokal untuk pengujian endpoint |
