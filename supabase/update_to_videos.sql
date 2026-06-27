-- =========================================================================
-- ZEEE_PROJECT — Update seed data lama (foto) jadi video Google Drive
-- =========================================================================
-- PAKAI INI JIKA: Anda sudah pernah menjalankan supabase/schema.sql
-- sebelumnya (sehingga tabel `portfolio_items` sudah terisi data contoh
-- berupa foto). Script ini meng-UPDATE baris yang sudah ada berdasarkan
-- judulnya, BUKAN menambah baris baru — jadi aman dijalankan, tidak akan
-- membuat data dobel.
--
-- Jika Anda BELUM PERNAH menjalankan schema.sql sama sekali, jalankan
-- schema.sql saja (sudah otomatis berisi link video ini) — tidak perlu
-- file ini.
-- =========================================================================

update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1PeujY1gbmjgXkKUExFO3AmBAueBTd5LV' where title = 'Civic Type R — Malam di Kota';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1JGcsF34OJNeiom11ZX307IBq2RzlK7K6' where title = 'NMAX Turbo — Rolling Shot Senja';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1KztZ0E4eR7fQs76PHbvJCWRY8cv5H6pa' where title = 'Brio RS — Studio Garasi';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1hSAoH6pfiZMxK_UqXgXJ70eioTYmgrrr' where title = 'CBR150 — Night Run';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=10F7S9Bdc3Xcg8veJoquvenpdjS1kPLb1' where title = 'Pajero Sport — Cinematic Color Grade';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1Rbmjpx97ucEhSo4v0HEwSEFu0OyILJRP' where title = 'Vario 160 — Aksen Lampu Kota';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1PeujY1gbmjgXkKUExFO3AmBAueBTd5LV' where title = 'Avanza Veloz — Long Exposure';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1JGcsF34OJNeiom11ZX307IBq2RzlK7K6' where title = 'R15 — Rolling Shot Jembatan';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1KztZ0E4eR7fQs76PHbvJCWRY8cv5H6pa' where title = 'Fortuner GR — Detail Grille';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1hSAoH6pfiZMxK_UqXgXJ70eioTYmgrrr' where title = 'Aerox Alpha — Color Pop Edit';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=10F7S9Bdc3Xcg8veJoquvenpdjS1kPLb1' where title = 'Jazz RS — Underglow Malam';
update public.portfolio_items set image_url = 'https://drive.google.com/uc?export=download&id=1Rbmjpx97ucEhSo4v0HEwSEFu0OyILJRP' where title = 'PCX160 — Garis Kota';
