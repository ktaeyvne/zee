# ZEEE_PROJECT — Website Cinematic Automotive Videography & Photography

Website resmi untuk **ZEEE_PROJECT**, jasa videografi & fotografi kendaraan
(mobil dan motor) bertema cinematic premium — terinspirasi gaya visual
BlackXperience dan StanceWorks, dibangun dengan palet hitam elegan (`#0A0A0A`)
dan aksen emas (`#C9A227`).

Tujuan utama: menampilkan portofolio, membangun kepercayaan calon pelanggan,
dan mengarahkan setiap pengunjung ke booking via WhatsApp.

---

## 1. Tech Stack

| Layer       | Teknologi                                                  |
|-------------|--------------------------------------------------------------|
| Framework   | React 18 + TypeScript + Vite                                 |
| Styling     | Tailwind CSS (custom design tokens: warna, font, animasi)     |
| Animasi     | Framer Motion + IntersectionObserver (`react-intersection-observer`) |
| Backend / CMS | Supabase (Postgres + Table Editor) — kelola Portofolio & Testimoni tanpa kode |
| Ikon        | `react-icons` (Feather Icons + brand icons)                   |
| Deployment  | Vercel / Netlify (konfigurasi sudah disiapkan)                |

Dipilih karena: Vite memberi dev-server super cepat dan build production yang
ringan, Tailwind menjaga konsistensi desain lewat token warna/tipografi
terpusat, dan Framer Motion adalah library animasi React paling matang untuk
efek cinematic (scroll reveal, shutter transition, hover premium).

---

## 2. Struktur Folder

```
zeee-project/
├── public/
│   ├── images/
│   │   └── logo.jpg              # Logo asli ZEEE_PROJECT (favicon, OG image, loader)
│   └── videos/
│       ├── README.md             # Panduan nama file video yang harus ditambahkan
│       └── .gitkeep
├── supabase/
│   └── schema.sql                # Schema tabel + RLS + seed data (jalankan di SQL Editor)
├── src/
│   ├── components/
│   │   ├── ApertureMark.tsx      # Signature SVG shutter — motif logo, dipakai ulang
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx              # Section 1 — full screen + video background
│   │   ├── About.tsx             # Section 2 — deskripsi + statistik animasi
│   │   ├── Portfolio.tsx         # Section 3 — masonry grid + filter + lightbox (data dari Supabase)
│   │   ├── VideoShowcase.tsx     # Section 4 — slider video gaya Netflix/Apple TV
│   │   ├── Pricing.tsx           # Section 5 — paket harga
│   │   ├── Testimonials.tsx      # Section 6 — testimoni + rating bintang (data dari Supabase)
│   │   ├── Faq.tsx               # Section 7 — accordion FAQ
│   │   ├── Contact.tsx           # Section 8 — form booking + maps + kontak
│   │   ├── Footer.tsx
│   │   ├── WhatsAppFloat.tsx     # Section 9 — floating button WhatsApp
│   │   ├── Loader.tsx            # Loading screen dengan logo
│   │   └── SectionReveal.tsx     # Wrapper scroll-reveal animation reusable
│   ├── data/
│   │   ├── types.ts              # Semua TypeScript interface data
│   │   ├── portfolio.ts          # Data fallback galeri portofolio (jika Supabase gagal/kosong)
│   │   ├── showcase.ts           # Data video showcase
│   │   ├── pricing.ts            # Data paket harga (sumber kebenaran harga)
│   │   ├── testimonials.ts       # Data fallback testimoni (jika Supabase gagal/kosong)
│   │   ├── faq.ts                # Data FAQ
│   │   └── stats.ts              # Data statistik About section
│   ├── hooks/
│   │   ├── usePortfolioItems.ts  # Fetch portofolio dari Supabase + fallback
│   │   ├── useTestimonials.ts    # Fetch testimoni dari Supabase + fallback
│   │   ├── useCountUp.ts         # Animasi angka statistik
│   │   └── useActiveSection.ts   # Highlight menu navbar sesuai scroll
│   ├── lib/
│   │   ├── whatsapp.ts           # Satu sumber kebenaran nomor WA & template pesan
│   │   ├── supabaseClient.ts     # Instance Supabase client (anon key)
│   │   └── database.types.ts     # Tipe TypeScript hasil generate dari schema Supabase
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css                 # Design tokens, glassmorphism, util classes
│   └── vite-env.d.ts
├── .env.example                  # Template environment variable Supabase
├── .env.local                    # Kredensial Supabase aktif (tidak ter-commit ke git)
├── index.html                    # SEO meta tags, schema.org, font loading
├── tailwind.config.js            # Warna, font, animasi kustom
├── vite.config.ts
├── vercel.json
├── netlify.toml
├── package.json
└── README.md
```

Struktur ini dipisah berdasarkan tanggung jawab (`components` murni UI,
`data` murni konten, `lib` murni logic) sehingga mudah dikembangkan: menambah
section baru, mengganti harga, atau menambah testimoni tidak perlu menyentuh
logic komponen sama sekali.

---

## 3. Menjalankan di Lokal (VS Code)

```bash
# 1. Masuk ke folder project
cd zeee-project

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka `http://localhost:5173`. Hot-reload aktif — setiap perubahan kode akan
langsung terlihat di browser.

Build production lokal:

```bash
npm run build      # Hasil ada di folder dist/
npm run preview    # Preview hasil build production
```

---

## 4. Supabase — Kelola Portofolio & Testimoni Tanpa Edit Kode

Section **Portfolio** dan **Testimoni** di website ini sudah terhubung ke
Supabase. Artinya, menambah, mengubah, menyembunyikan, atau menghapus foto
portofolio maupun testimoni **tidak perlu menyentuh kode sama sekali** —
cukup lewat dashboard Supabase.

### 4.1 Kredensial sudah terpasang

File `.env.local` sudah dibuat dengan kredensial project Supabase Anda:

```
VITE_SUPABASE_URL=https://urnavuvcwnnnodnezdkf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_WF2C0-ZhtRoITlc7j8RffA__d1ANvKQ
```

Key ini adalah **anon/publishable key** — aman dipakai di sisi client karena
aksesnya dibatasi oleh Row Level Security (hanya bisa membaca data yang
`is_published = true`, tidak bisa menulis/mengubah).

### 4.2 Jalankan schema SQL (sekali saja)

1. Buka [supabase.com](https://supabase.com) → masuk ke project Anda
   (`urnavuvcwnnnodnezdkf`).
2. Buka menu **SQL Editor** di sidebar kiri → **New Query**.
3. Copy seluruh isi file `supabase/schema.sql` dari project ini → paste →
   klik **Run**.
4. Ini akan membuat 2 tabel (`portfolio_items`, `testimonials`), mengatur
   keamanan (RLS), dan otomatis mengisi data contoh agar website tidak
   kosong saat pertama dibuka.

### 4.3 Mengelola konten sehari-hari (tanpa kode)

1. Buka menu **Table Editor** di sidebar Supabase Studio.
2. Pilih tabel `portfolio_items` atau `testimonials`.
3. Klik **Insert row** untuk menambah, klik sel mana pun untuk mengedit
   langsung, atau hapus baris untuk menghilangkan item dari website.
4. Refresh website — perubahan langsung tampil (data di-fetch ulang setiap
   halaman dimuat).

**Kolom penting di `portfolio_items`:**

| Kolom         | Keterangan                                                              |
|---------------|--------------------------------------------------------------------------|
| `title`       | Judul project, mis. "Civic Type R — Malam di Kota"                       |
| `category`    | Harus salah satu: `Mobil`, `Motor`, `Rolling Shot`, `Night Shoot`, `Cinematic Edit` |
| `location`    | Lokasi pemotretan                                                        |
| `image_url`   | URL foto (upload ke **Storage** bucket Supabase, lalu copy public URL-nya, atau pakai URL hosting lain) |
| `span`        | Ukuran kartu grid: `tall`, `wide`, atau `square`                         |
| `sort_order`  | Angka lebih kecil = tampil lebih dulu                                    |
| `is_published`| Uncheck untuk menyembunyikan tanpa menghapus                             |

**Kolom penting di `testimonials`:**

| Kolom         | Keterangan                                      |
|---------------|--------------------------------------------------|
| `name`        | Nama pelanggan                                   |
| `vehicle`     | Jenis kendaraan                                  |
| `avatar_url`  | URL foto profil (boleh kosong → pakai avatar default) |
| `rating`      | Angka 1–5                                        |
| `quote`       | Isi testimoni                                    |
| `sort_order`  | Urutan tampil                                    |
| `is_published`| Uncheck untuk menyembunyikan                     |

### 4.4 Upload foto lewat Supabase Storage (opsional, direkomendasikan)

Daripada menghosting foto di tempat lain, Anda bisa upload langsung di
Supabase:

1. Sidebar → **Storage** → **New bucket** → beri nama `portfolio` → set
   **Public bucket** = ON.
2. Upload foto ke bucket tersebut.
3. Klik foto yang sudah diupload → **Copy URL** (public URL).
4. Paste URL itu ke kolom `image_url` (atau `avatar_url`) di Table Editor.

### 4.5 Mode fallback (anti-gagal)

Jika `.env.local` belum diisi, project Supabase belum di-setup, atau koneksi
gagal, website **tidak akan error atau tampil kosong** — komponen otomatis
menampilkan data contoh statis dari `src/data/portfolio.ts` dan
`src/data/testimonials.ts` sebagai fallback. Logic ini ada di
`src/hooks/usePortfolioItems.ts` dan `src/hooks/useTestimonials.ts`.

### 4.6 Deploy ke Vercel/Netlify

Saat deploy, tambahkan kedua environment variable ini di dashboard hosting
(Vercel: **Settings → Environment Variables**, Netlify: **Site settings →
Environment variables**) — isinya sama seperti di `.env.local`:

```
VITE_SUPABASE_URL=https://urnavuvcwnnnodnezdkf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_WF2C0-ZhtRoITlc7j8RffA__d1ANvKQ
```

Tanpa ini, build production tetap akan jalan (berkat fallback di atas),
tapi akan menampilkan data contoh, bukan data asli dari Supabase Anda.

---

## 5. Akses Website dari HP (Local Network)

Untuk membuka website yang sedang `npm run dev` dari HP (selama development):

```bash
npm run dev
```

Vite sudah dikonfigurasi dengan `host: true`, jadi akan otomatis muncul dua
alamat di terminal:

```
Local:   http://localhost:5173/
Network: http://192.168.x.x:5173/
```

Buka alamat **Network** tersebut di browser HP, asalkan HP dan komputer
terhubung ke WiFi yang sama. Tampilan sudah dioptimalkan mobile-first, jadi
otomatis menyesuaikan ke ukuran layar HP.

---



## 6. Status Saat Ini: Semua Visual Memakai Video dari Google Drive

Atas permintaan klien, **Portfolio, Hero, dan Video Showcase sekarang semua
memakai video** (bukan foto) — sumbernya dari 6 link Google Drive klien.
Daftar link terpusat di satu file:

```ts
// src/data/driveVideos.ts
export const DRIVE_VIDEOS = [
  'https://drive.google.com/uc?export=download&id=...', // video 1
  'https://drive.google.com/uc?export=download&id=...', // video 2
  // ...dst, total 6 link
];
```

Pemetaannya:

| Section            | Sumber video                                            |
|--------------------|----------------------------------------------------------|
| Hero (background)  | `DRIVE_VIDEOS[0]` — diset di `src/components/Hero.tsx`    |
| Video Showcase (6 slot) | `DRIVE_VIDEOS[0]` s/d `DRIVE_VIDEOS[5]` — diset di `src/data/showcase.ts` |
| Portfolio (12 kartu)| Ke-6 link dipakai berulang (cycle 2x) — diset di `src/data/portfolio.ts` |

**Mengganti salah satu video** → edit `src/data/driveVideos.ts`, ganti URL
pada index yang sesuai. Semua section yang memakai index itu otomatis ikut
berubah.

### ⚠️ Catatan penting soal Google Drive sebagai video host

Google Drive **bukan** layanan streaming video — tidak mendukung HTTP Range
Request (dibutuhkan tag `<video>` untuk seek/scrub halus) dan untuk file
besar kadang menampilkan halaman peringatan "tidak bisa di-scan virus"
alih-alih file videonya. Dampaknya:

- Bisa lambat / gagal load di sebagian browser, terutama Safari iOS.
- Tidak bisa di-seek (lompat ke bagian tertentu video) dengan mulus.
- Video Portfolio & Showcase sudah saya beri **fallback otomatis**: jika
  video gagal dimuat, kartu akan menampilkan placeholder gradient + ikon
  play alih-alih kotak kosong/rusak.

**Rekomendasi jangka panjang:** pindahkan video-video ini ke layanan host
video yang proper — gratis dan mudah:
- **Cloudinary** (free tier tersedia, mendukung video, auto-optimize)
- **Bunny Stream** (murah, sangat cepat, didesain khusus untuk video)
- **Mux** atau **Cloudflare Stream**

Setelah upload ke salah satu layanan tersebut, cukup ganti isi array di
`src/data/driveVideos.ts` dengan URL baru — tidak ada perubahan kode lain
yang diperlukan.

### Mengelola video Portfolio lewat Supabase

Karena `image_url` di tabel `portfolio_items` sekarang berisi URL video
(bukan foto), Anda tetap bisa ganti video portofolio tanpa edit kode lewat
**Table Editor** Supabase — cukup paste URL video baru ke kolom `image_url`.

Jika project Supabase Anda sudah pernah dijalankan dengan data contoh foto
(`schema.sql` versi lama), jalankan `supabase/update_to_videos.sql` di SQL
Editor untuk mengganti data lama tersebut ke video tanpa membuat baris
duplikat.

---

## 7. Konfigurasi Bisnis (Harga, Kontak, WhatsApp)

Semua nomor WhatsApp dan template pesan booking terpusat di satu file:

```ts
// src/lib/whatsapp.ts
export const WHATSAPP_NUMBER = '6285367942346';
export const CONTACT = { ... };
export const WHATSAPP_MESSAGES = { ... };
```

Mengubah nomor WhatsApp, email, atau akun Instagram/TikTok hanya perlu
dilakukan di file ini — seluruh tombol booking di semua section otomatis
ikut berubah.

Harga paket ada di `src/data/pricing.ts` — sinkron dengan price list resmi:

| Paket  | Harga      | Maks. Kendaraan | Durasi Sesi |
|--------|-----------:|-----------------|-------------|
| Motor  | Rp 200.000 | 2 motor          | 3 jam + 30 menit briefing |
| Mobil  | Rp 350.000 | 2 mobil          | 3 jam + 30 menit briefing |

---

## 8. Fitur yang Sudah Diimplementasikan

- Hero full-screen dengan video background + fallback animasi light-trail otomatis bila video belum tersedia
- Portfolio & Testimoni terhubung ke Supabase — kelola konten lewat Table Editor tanpa edit kode, dengan fallback otomatis ke data statis jika koneksi gagal
- Skeleton loading shimmer saat data Portofolio/Testimoni sedang diambil dari Supabase
- Loading screen cinematic dengan logo ZEEE_PROJECT + progress bar + shutter wipe transition
- About section dengan counter statistik animasi saat masuk viewport
- Portfolio masonry grid dengan filter kategori (Mobil, Motor, Rolling Shot, Night Shoot, Cinematic Edit) + modal lightbox fullscreen
- Video showcase slider horizontal dengan hover info card (judul, jenis kendaraan, lokasi) + modal video player
- Dua paket harga lengkap dengan daftar fasilitas dan tombol booking WhatsApp otomatis terisi pesan sesuai paket
- Testimoni 6 pelanggan dengan rating bintang
- FAQ accordion dengan animasi expand/collapse
- Form booking cepat yang mengonversi input menjadi pesan WhatsApp terformat
- Peta Google Maps lokasi Bandar Lampung
- Floating WhatsApp button dengan animasi pulse, tampil di semua section
- Navbar sticky dengan highlight menu aktif sesuai posisi scroll + menu mobile
- Smooth scroll antar section, scroll-reveal animation di setiap section
- SEO: meta tags lengkap, Open Graph, Twitter Card, JSON-LD LocalBusiness schema
- Aksesibilitas: focus ring terlihat, `prefers-reduced-motion` dihormati, label ARIA pada tombol ikon
- Lazy loading pada semua gambar non-kritis
- Responsive penuh: mobile-first, diuji pada breakpoint `sm`, `md`, `lg`, `xl`

---

## 9. Upload ke GitHub

```bash
git init
git add .
git commit -m "Initial commit — ZEEE_PROJECT website"
git branch -M main
git remote add origin https://github.com/USERNAME/zeee-project.git
git push -u origin main
```

> Perhatikan `.gitignore` — file `.mp4` di `public/videos/` di-ignore secara
> default karena ukurannya besar. Baca `public/videos/README.md` untuk opsi
> menyimpan video langsung di repo (jika kecil) atau menghosting di layanan
> eksternal (direkomendasikan untuk performa).

---

## 10. Deploy ke Vercel

1. Push project ke GitHub (lihat di atas).
2. Buka [vercel.com](https://vercel.com) → **New Project** → import repo ini.
3. Vercel otomatis mendeteksi framework Vite (`vercel.json` sudah disiapkan).
4. Klik **Deploy**. Selesai — `vercel.json` sudah mengatur SPA rewrite dan
   cache header untuk asset.

## 11. Deploy ke Netlify

1. Push project ke GitHub.
2. Buka [netlify.com](https://netlify.com) → **Add new site** → **Import an
   existing project** → pilih repo ini.
3. Build command dan publish directory sudah otomatis terbaca dari
   `netlify.toml` (`npm run build` → `dist`).
4. Klik **Deploy site**.

---

## 12. Mengembangkan Lebih Lanjut

Arsitektur ini sengaja dipisah agar mudah berkembang:

- **Tambah section baru** → buat komponen baru di `src/components/`, import
  dan letakkan di `src/App.tsx`.
- **Integrasi Instagram Feed otomatis (real API)** → siapkan Instagram Graph
  API access token, lalu buat `src/hooks/useInstagramFeed.ts` yang fetch dari
  endpoint resmi Meta dan render di section About/Portfolio. (Saat ini tombol
  Instagram mengarah langsung ke profil resmi sebagai CTA tervalidasi.)
- **CMS ringan** → jika konten portofolio sering berubah, data di
  `src/data/*.ts` bisa dipindah ke headless CMS (misal Sanity atau
  Contentful) tanpa mengubah struktur komponen.
- **Analytics** → tambahkan Google Analytics / Meta Pixel di `index.html`
  untuk melacak konversi klik tombol booking WhatsApp.
- **Multi-bahasa** → struktur teks sudah terpisah di komponen, siap
  diekstrak ke i18n (misal `react-i18next`) bila dibutuhkan versi Inggris.

---

## 13. Lisensi & Kredit

Dibangun khusus untuk **ZEEE_PROJECT — Video and Fotografer**, Bandar
Lampung. Logo dan brand asset adalah milik ZEEE_PROJECT.
