# Demma Intelligence

Website profil Demma Intelligence. Aplikasi ini menampilkan informasi kolektif, katalog proyek, detail proyek, tim, dan formulir kontak.

## Teknologi

- Next.js 16 dengan App Router
- React 19 dan TypeScript
- Tailwind CSS 4
- Nodemailer dengan Gmail SMTP

## Persyaratan

- Node.js 20 atau versi lebih baru
- npm
- Akun Gmail dengan App Password untuk mengaktifkan formulir kontak

## Instalasi

```bash
git clone https://github.com/demmagence/demma.git
cd demma
npm install
```

## Konfigurasi Environment

Buat file `.env.local` di direktori root proyek.

```env
GMAIL_USER=alamat_gmail_pengirim
GMAIL_APP_PASSWORD=app_password_gmail
```

`GMAIL_APP_PASSWORD` harus menggunakan Gmail App Password, bukan password akun Gmail biasa. Jangan commit file `.env.local`.

## Menjalankan Aplikasi

```bash
npm run dev
```

Buka `http://localhost:3000` pada browser.

## Perintah

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan. |
| `npm run lint` | Menjalankan pemeriksaan ESLint. |
| `npm run build` | Membuat build produksi. |
| `npm run start` | Menjalankan build produksi secara lokal. |

## Rute

| Rute | Keterangan |
| --- | --- |
| `/` | Beranda. |
| `/about` | Informasi kolektif dan prinsip kolaborasi. |
| `/projects` | Katalog proyek. |
| `/projects/[slug]` | Halaman detail proyek. |
| `/team` | Daftar anggota tim. |
| `/contact` | Kontak langsung dan formulir pesan. |
| `/api/contact` | Endpoint `POST` untuk formulir kontak. |

Slug proyek yang tersedia: `cbt-app`, `glowmatch`, `omniagent-studio`, `kassa`, `eco`, `lost-and-found`, `mories`, dan `walas`.

## Endpoint Kontak

`POST /api/contact` menerima JSON berikut.

```json
{
  "name": "Nama pengirim",
  "email": "email@example.com",
  "message": "Isi pesan",
  "website": ""
}
```

Field `website` adalah honeypot dan harus dikirim kosong oleh klien asli. Endpoint menerapkan validasi field, validasi format email, serta rate limit lima permintaan per alamat IP dalam sepuluh menit. Rate limit bersifat in-memory per instance.

Kode respons yang digunakan: `SENT`, `MISSING_FIELDS`, `INVALID_EMAIL`, `RATE_LIMITED`, `SERVICE_UNAVAILABLE`, dan `SEND_FAILED`.

## Verifikasi

```bash
npm run lint
npm run build
git diff --check
```

## Lisensi

Belum ada lisensi yang ditentukan untuk repository ini.
