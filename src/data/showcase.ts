import type { ShowcaseVideo } from './types';

/**

 * Sumber video diambil dari koleksi Google Drive klien (lihat
 * `src/data/driveVideos.ts`). Poster/thumbnail tetap pakai gambar contoh
 * karena thumbnail tidak bisa otomatis diambil dari video Drive — ganti
 * `poster` dengan screenshot dari video aslinya kapan saja untuk hasil
 * lebih akurat.
 */
export const showcaseVideos: ShowcaseVideo[] = [
  {
    id: 'v01',
    title: 'Civic Hatchback — Cahaya Kota',
    vehicleType: 'Mobil — Honda Hatchback',
    location: 'Bandar Lampung',
    poster: './images/t1.jpeg',

    videoSrc: './videos/showcase-01-civic-type-r.mp4',
  },
  {
    id: 'v02',
    title: 'HiAce Premio — Cahaya Malam',
    vehicleType: 'Mobil — Toyota HiAce Premio',
    location: 'Teluk Betung',
    poster: './images/t2.jpeg',

    videoSrc: './videos/showcase-02-nmax-turbo.mp4',
  },
  {
    id: 'v03',
    title: 'HONDA BEAT — Malam Tanpa Akhir',
    vehicleType: 'Motor — Honda Beat',
    location: 'Kemiling',
    poster: './images/t3.jpeg',

    videoSrc: './videos/showcase-03-pajero-sport.mp4',
  },
  {
    id: 'v04',
    title: 'Civic Hatchback — Sprint Tengah Malam',
    vehicleType: 'Mobil — Honda Civic Hatchback',
    location: 'Jl. Sudirman',
    poster: './images/t4.jpeg',

    videoSrc: './videos/showcase-04-cbr150.mp4',
  },
  {
    id: 'v05',
    title: 'Fortuner GR — Diam yang Berkuasa',
    vehicleType: 'Mobil — Toyota Fortuner GR Sport',
    location: 'Rajabasa',
    poster: './images/t5.jpeg',

    videoSrc: './videos/showcase-05-fortuner-gr.mp4',
  },
  {
    id: 'v06',
    title: 'Toyoya Innova — Tepi Kota',
    vehicleType: 'Mobil — Toyota Innova',
    location: 'Sukarame',
    poster: './images/t6.jpeg',

    videoSrc: './videos/showcase-06-aerox-alpha.mp4',
  },
];

