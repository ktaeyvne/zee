import { DRIVE_VIDEOS } from './driveVideos';
import type { PortfolioItem } from './types';

/**
 * Portfolio sekarang menggunakan VIDEO (bukan foto) sebagai media utama,
 * sesuai permintaan klien. Field `image` di tipe data tetap dipakai secara
 * teknis (agar kompatibel dengan kolom `image_url` di Supabase), tapi
 * isinya berupa URL video dan dirender sebagai <video> oleh Portfolio.tsx.
 *
 * Data ini hanya dipakai sebagai FALLBACK jika Supabase belum di-setup atau
 * koneksi gagal — lihat src/hooks/usePortfolioItems.ts.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p01',
    title: 'Civic Type R — Malam di Kota',
    category: 'Mobil',
    location: 'Bandar Lampung',
    image: DRIVE_VIDEOS[0],
    span: 'tall',
  },
  {
    id: 'p02',
    title: 'NMAX Turbo — Rolling Shot Senja',
    category: 'Rolling Shot',
    location: 'Teluk Betung',
    image: DRIVE_VIDEOS[1],
    span: 'wide',
  },
  {
    id: 'p03',
    title: 'Brio RS — Studio Garasi',
    category: 'Mobil',
    location: 'Sukarame',
    image: DRIVE_VIDEOS[2],
    span: 'square',
  },
  {
    id: 'p04',
    title: 'CBR150 — Night Run',
    category: 'Night Shoot',
    location: 'Jl. Sudirman',
    image: DRIVE_VIDEOS[3],
    span: 'tall',
  },
  {
    id: 'p05',
    title: 'Pajero Sport — Cinematic Color Grade',
    category: 'Cinematic Edit',
    location: 'Kemiling',
    image: DRIVE_VIDEOS[4],
    span: 'wide',
  },
  {
    id: 'p06',
    title: 'Vario 160 — Aksen Lampu Kota',
    category: 'Motor',
    location: 'Tanjung Karang',
    image: DRIVE_VIDEOS[5],
    span: 'square',
  },
  {
    id: 'p07',
    title: 'Avanza Veloz — Long Exposure',
    category: 'Night Shoot',
    location: 'Way Halim',
    image: DRIVE_VIDEOS[0],
    span: 'tall',
  },
  {
    id: 'p08',
    title: 'R15 — Rolling Shot Jembatan',
    category: 'Rolling Shot',
    location: 'Bandar Lampung',
    image: DRIVE_VIDEOS[1],
    span: 'wide',
  },
  {
    id: 'p09',
    title: 'Fortuner GR — Detail Grille',
    category: 'Mobil',
    location: 'Rajabasa',
    image: DRIVE_VIDEOS[2],
    span: 'square',
  },
  {
    id: 'p10',
    title: 'Aerox Alpha — Color Pop Edit',
    category: 'Cinematic Edit',
    location: 'Teluk Betung',
    image: DRIVE_VIDEOS[3],
    span: 'tall',
  },
  {
    id: 'p11',
    title: 'Jazz RS — Underglow Malam',
    category: 'Night Shoot',
    location: 'Sukarame',
    image: DRIVE_VIDEOS[4],
    span: 'wide',
  },
  {
    id: 'p12',
    title: 'PCX160 — Garis Kota',
    category: 'Motor',
    location: 'Way Halim',
    image: DRIVE_VIDEOS[5],
    span: 'square',
  },
];

export const portfolioCategories = [
  'Semua',
  'Mobil',
  'Motor',
  'Rolling Shot',
  'Night Shoot',
  'Cinematic Edit',
] as const;
