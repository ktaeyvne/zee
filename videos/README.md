# Folder Video — ZEEE_PROJECT

Letakkan file video asli Anda di folder ini dengan nama file **persis** seperti di
bawah. Komponen yang relevan sudah disambungkan ke nama-nama ini, jadi begitu file
diletakkan di sini, video akan otomatis tampil tanpa perlu mengubah kode apa pun.

## 1. Video Background Hero (wajib untuk efek "Section 1 - Hero")
- `hero-bg.mp4`
  - Rekomendasi: 1920x1080 atau lebih tinggi, durasi 15–30 detik, di-loop, tanpa audio (atau audio akan otomatis di-mute oleh browser).
  - Konten ideal: rolling shot mobil/motor pada malam hari, gerakan kamera halus.
  - Jika file ini belum ada, hero akan otomatis menampilkan animasi garis cahaya (light trail) sebagai fallback agar tampilan tetap premium.

## 2. Video Showcase (Section 4)
Letakkan 6 file berikut, sesuaikan kontennya dengan urutan pada `src/data/showcase.ts`:
- `showcase-01-civic-type-r.mp4`
- `showcase-02-nmax-turbo.mp4`
- `showcase-03-pajero-sport.mp4`
- `showcase-04-cbr150.mp4`
- `showcase-05-fortuner-gr.mp4`
- `showcase-06-aerox-alpha.mp4`

Anda bebas mengganti judul, jenis kendaraan, lokasi, dan nama file di
`src/data/showcase.ts` agar sesuai dengan project asli Anda — cukup pastikan
nama file pada `videoSrc` cocok dengan file yang Anda letakkan di sini.

## Catatan penting soal ukuran file & deploy
File video umumnya besar. Sebelum push ke GitHub / deploy ke Vercel atau Netlify, ada dua pilihan:

1. **File kecil (< 20MB per video, sudah dikompres)** — hapus baris
   `public/videos/*.mp4` dari `.gitignore` di root project, lalu commit
   video tersebut langsung. Build akan langsung membawa filenya.
2. **File besar / banyak video** — gunakan layanan hosting video (Cloudinary,
   Bunny Stream, Mux, atau bahkan unlisted YouTube/Vimeo), lalu ganti nilai
   `videoSrc` di `src/data/showcase.ts` dan `HERO_VIDEO_SRC` di
   `src/components/Hero.tsx` dengan URL hosting tersebut. Ini direkomendasikan
   untuk performa loading yang lebih baik di semua perangkat.
