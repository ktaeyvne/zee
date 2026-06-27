/**
 * Centralized WhatsApp booking utilities.
 * Every CTA on the site routes through this module so the phone number
 * and message templates only ever need to be updated in one place.
 */

export const WHATSAPP_NUMBER = '6285367942346';

export const CONTACT = {
  phoneDisplay: '0853-6794-2346',
  phoneIntl: '+62 853-6794-2346',
  instagram: 'zeee_project99',
  instagramUrl: 'https://www.instagram.com/zeee_project99',
  tiktok: 'zeee_project99',
  tiktokUrl: 'https://www.tiktok.com/@zeee_project99',
  email: 'zeeeproject99@gmail.com',
  city: 'Bandar Lampung, Lampung',
} as const;

/**
 * Builds a wa.me deep link with a pre-filled, URL-encoded message.
 */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const WHATSAPP_MESSAGES = {
  general: 'Halo ZEEE_PROJECT, saya ingin booking jasa videografi.',
  paketMotor: 'Halo ZEEE_PROJECT, saya ingin booking Paket Motor Rp200.000',
  paketMobil: 'Halo ZEEE_PROJECT, saya ingin booking Paket Mobil Rp350.000',
  consultation: 'Halo ZEEE_PROJECT, saya ingin konsultasi dulu sebelum booking jasa foto/video kendaraan.',
} as const;

export function buildCustomBookingMessage(params: {
  nama: string;
  jenisKendaraan: string;
  paket: string;
  tanggal: string;
  catatan?: string;
}): string {
  const { nama, jenisKendaraan, paket, tanggal, catatan } = params;
  const lines = [
    'Halo ZEEE_PROJECT, saya ingin booking jasa foto/video kendaraan.',
    `Nama: ${nama}`,
    `Jenis Kendaraan: ${jenisKendaraan}`,
    `Paket: ${paket}`,
    `Tanggal Diinginkan: ${tanggal}`,
  ];
  if (catatan) {
    lines.push(`Catatan: ${catatan}`);
  }
  return lines.join('\n');
}
