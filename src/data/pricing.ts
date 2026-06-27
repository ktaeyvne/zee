import type { PricingPlan } from './types';
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'paket-motor',
    name: 'Paket Motor',
    price: 200000,
    priceLabel: 'Rp 200.000',
    tagline: 'Untuk 1 sesi pemotretan motor yang ringkas dan sinematik.',
    features: [
      '3 Jam Sesi Pemotretan',
      '30 Menit Briefing Konsep',
      'Maksimal 2 Motor',
      'Video Hasil Editing Cinematic',
      'File Mentahan (Raw Footage)',
      'Lokasi Bandar Lampung',
    ],
    highlighted: false,
    whatsappMessage: WHATSAPP_MESSAGES.paketMotor,
    ctaLabel: 'Booking Paket Motor',
  },
  {
    id: 'paket-mobil',
    name: 'Paket Mobil',
    price: 350000,
    priceLabel: 'Rp 350.000',
    tagline: 'Pilihan favorit untuk hasil visual mobil paling premium.',
    features: [
      '3 Jam Sesi Pemotretan',
      '30 Menit Briefing Konsep',
      'Maksimal 2 Mobil',
      'Video Hasil Editing Cinematic',
      'File Mentahan (Raw Footage)',
      'Lokasi Bandar Lampung',
    ],
    highlighted: true,
    whatsappMessage: WHATSAPP_MESSAGES.paketMobil,
    ctaLabel: 'Booking Paket Mobil',
  },
];

export const pricingNotes: string[] = [
  'Deal bisa dilakukan ketika membayar DP minimal Rp150.000',
  'Booking minimal 3 hari setelah DP',
  'Penambahan kendaraan berlaku kelipatan harga',
  'Biaya tambahan dikenakan sesuai permintaan khusus konsumen',
];
