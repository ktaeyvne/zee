-- =========================================================================
-- ZEEE_PROJECT — Schema: Portfolio & Testimonials (Content Management)
-- =========================================================================
-- Cara pakai:
-- 1. Buka project Supabase Anda → SQL Editor → New Query.
-- 2. Copy seluruh isi file ini → Run.
-- 3. Setelah itu, kelola isi tabel langsung lewat menu "Table Editor"
--    di sidebar Supabase Studio — tanpa perlu menyentuh kode apa pun.
-- =========================================================================

-- Pastikan extension untuk UUID tersedia
create extension if not exists "pgcrypto";

-- -------------------------------------------------------------------------
-- Tabel: portfolio_items
-- -------------------------------------------------------------------------
create table if not exists public.portfolio_items (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  category     text not null check (category in ('Mobil', 'Motor', 'Rolling Shot', 'Night Shoot', 'Cinematic Edit')),
  location     text not null,
  image_url    text not null,
  span         text not null default 'square' check (span in ('tall', 'wide', 'square')),
  sort_order   integer not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);

comment on table public.portfolio_items is 'Galeri portofolio yang ditampilkan di section Portfolio. Kelola lewat Table Editor.';
comment on column public.portfolio_items.span is 'Ukuran kartu pada grid masonry: tall, wide, atau square.';
comment on column public.portfolio_items.sort_order is 'Angka lebih kecil ditampilkan lebih dulu.';
comment on column public.portfolio_items.is_published is 'Set ke false untuk menyembunyikan item tanpa menghapusnya.';

create index if not exists portfolio_items_sort_idx on public.portfolio_items (sort_order);

-- -------------------------------------------------------------------------
-- Tabel: testimonials
-- -------------------------------------------------------------------------
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  vehicle      text not null,
  avatar_url   text,
  rating       integer not null check (rating between 1 and 5),
  quote        text not null,
  sort_order   integer not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);

comment on table public.testimonials is 'Testimoni pelanggan yang ditampilkan di section Testimoni. Kelola lewat Table Editor.';
comment on column public.testimonials.rating is 'Rating bintang 1 sampai 5.';

create index if not exists testimonials_sort_idx on public.testimonials (sort_order);

-- -------------------------------------------------------------------------
-- Row Level Security — hanya baca publik untuk item yang dipublikasikan.
-- Menambah/mengubah/menghapus data dilakukan lewat Table Editor (login
-- sebagai owner project, otomatis melewati RLS), bukan dari sisi client.
-- -------------------------------------------------------------------------
alter table public.portfolio_items enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "Public can read published portfolio items" on public.portfolio_items;
create policy "Public can read published portfolio items"
  on public.portfolio_items
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials"
  on public.testimonials
  for select
  to anon, authenticated
  using (is_published = true);

-- =========================================================================
-- Seed data — konten awal supaya website tidak tampil kosong.
-- Hapus blok ini (atau hapus baris-baris ini lewat Table Editor) kapan
-- saja setelah Anda mengisi data asli.
-- =========================================================================
insert into public.portfolio_items (title, category, location, image_url, span, sort_order) values
  ('Civic Type R — Malam di Kota', 'Mobil', 'Bandar Lampung', 'https://drive.google.com/uc?export=download&id=1PeujY1gbmjgXkKUExFO3AmBAueBTd5LV', 'tall', 1),
  ('NMAX Turbo — Rolling Shot Senja', 'Rolling Shot', 'Teluk Betung', 'https://drive.google.com/uc?export=download&id=1JGcsF34OJNeiom11ZX307IBq2RzlK7K6', 'wide', 2),
  ('Brio RS — Studio Garasi', 'Mobil', 'Sukarame', 'https://drive.google.com/uc?export=download&id=1KztZ0E4eR7fQs76PHbvJCWRY8cv5H6pa', 'square', 3),
  ('CBR150 — Night Run', 'Night Shoot', 'Jl. Sudirman', 'https://drive.google.com/uc?export=download&id=1hSAoH6pfiZMxK_UqXgXJ70eioTYmgrrr', 'tall', 4),
  ('Pajero Sport — Cinematic Color Grade', 'Cinematic Edit', 'Kemiling', 'https://drive.google.com/uc?export=download&id=10F7S9Bdc3Xcg8veJoquvenpdjS1kPLb1', 'wide', 5),
  ('Vario 160 — Aksen Lampu Kota', 'Motor', 'Tanjung Karang', 'https://drive.google.com/uc?export=download&id=1Rbmjpx97ucEhSo4v0HEwSEFu0OyILJRP', 'square', 6),
  ('Avanza Veloz — Long Exposure', 'Night Shoot', 'Way Halim', 'https://drive.google.com/uc?export=download&id=1PeujY1gbmjgXkKUExFO3AmBAueBTd5LV', 'tall', 7),
  ('R15 — Rolling Shot Jembatan', 'Rolling Shot', 'Bandar Lampung', 'https://drive.google.com/uc?export=download&id=1JGcsF34OJNeiom11ZX307IBq2RzlK7K6', 'wide', 8),
  ('Fortuner GR — Detail Grille', 'Mobil', 'Rajabasa', 'https://drive.google.com/uc?export=download&id=1KztZ0E4eR7fQs76PHbvJCWRY8cv5H6pa', 'square', 9),
  ('Aerox Alpha — Color Pop Edit', 'Cinematic Edit', 'Teluk Betung', 'https://drive.google.com/uc?export=download&id=1hSAoH6pfiZMxK_UqXgXJ70eioTYmgrrr', 'tall', 10),
  ('Jazz RS — Underglow Malam', 'Night Shoot', 'Sukarame', 'https://drive.google.com/uc?export=download&id=10F7S9Bdc3Xcg8veJoquvenpdjS1kPLb1', 'wide', 11),
  ('PCX160 — Garis Kota', 'Motor', 'Way Halim', 'https://drive.google.com/uc?export=download&id=1Rbmjpx97ucEhSo4v0HEwSEFu0OyILJRP', 'square', 12)
on conflict do nothing;

insert into public.testimonials (name, vehicle, avatar_url, rating, quote, sort_order) values
  ('Rizky Aditya', 'Honda Civic Type R', 'https://i.pravatar.cc/150?img=12', 5, 'Hasilnya jauh di atas ekspektasi. Warna, framing, sampai detail lampu mobil kelihatan sangat cinematic. Worth it banget untuk harga segini.', 1),
  ('Dewi Anggraini', 'Yamaha NMAX Turbo', 'https://i.pravatar.cc/150?img=47', 5, 'Tim ZEEE_PROJECT super on time dan komunikatif dari awal booking sampai file selesai. Rolling shot-nya halus banget, langsung aku jadikan konten utama.', 2),
  ('Bagas Pratama', 'Toyota Fortuner GR Sport', 'https://i.pravatar.cc/150?img=33', 5, 'Baru pertama kali foto mobil profesional dan langsung puas. Briefingnya jelas, hasil editingnya rapi, file mentahan juga dikirim lengkap.', 3),
  ('Putri Lestari', 'Honda Brio RS', 'https://i.pravatar.cc/150?img=24', 5, 'Suka banget sama mood gelap-emasnya, beda dari foto mobil kebanyakan. Followers Instagram aku banyak yang nanya siapa yang foto.', 4),
  ('Fajar Nugroho', 'Honda CBR150', 'https://i.pravatar.cc/150?img=56', 4, 'Night shoot-nya keren, motor kelihatan lebih garang dari aslinya. Proses booking via WhatsApp juga gampang dan responsif.', 5),
  ('Salsa Amelia', 'Mitsubishi Pajero Sport', 'https://i.pravatar.cc/150?img=45', 5, 'Konsisten kualitasnya dari project pertama sampai sekarang. Selalu jadi pilihan utama setiap mau bikin konten kendaraan keluarga.', 6)
on conflict do nothing;
