/**
 * Link video asli dari Google Drive milik klien.
 *
 * CATATAN PENTING: Google Drive bukan video host yang ideal untuk produksi —
 * Drive tidak mendukung HTTP Range Request (dibutuhkan tag <video> untuk
 * streaming/seek halus) dan untuk file berukuran besar kadang menampilkan
 * halaman interstitial "tidak bisa di-scan virus" alih-alih file mentahnya.
 * Jika video gagal tampil di beberapa browser/HP, pindahkan file-file ini
 * ke layanan video host (Cloudinary, Bunny Stream, dll) lalu ganti URL di
 * bawah — struktur kode lain tidak perlu diubah.
 */
export const DRIVE_VIDEOS = [
  'https://drive.google.com/uc?export=download&id=1PeujY1gbmjgXkKUExFO3AmBAueBTd5LV',
  'https://drive.google.com/uc?export=download&id=1JGcsF34OJNeiom11ZX307IBq2RzlK7K6',
  'https://drive.google.com/uc?export=download&id=1KztZ0E4eR7fQs76PHbvJCWRY8cv5H6pa',
  'https://drive.google.com/uc?export=download&id=1hSAoH6pfiZMxK_UqXgXJ70eioTYmgrrr',
  'https://drive.google.com/uc?export=download&id=10F7S9Bdc3Xcg8veJoquvenpdjS1kPLb1',
  'https://drive.google.com/uc?export=download&id=1Rbmjpx97ucEhSo4v0HEwSEFu0OyILJRP',
] as const;
