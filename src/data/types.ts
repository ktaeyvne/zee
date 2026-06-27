export type PortfolioCategory = 'Mobil' | 'Motor' | 'Rolling Shot' | 'Night Shoot' | 'Cinematic Edit';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  location: string;
  /** URL media utama. Saat ini berisi URL VIDEO (bukan foto) — dirender sebagai <video> oleh Portfolio.tsx. */
  image: string;
  span: 'tall' | 'wide' | 'square';
}

export interface ShowcaseVideo {
  id: string;
  title: string;
  vehicleType: string;
  location: string;
  poster: string;
  videoSrc: string;
}

export interface PricingFeature {
  label: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  features: string[];
  highlighted: boolean;
  whatsappMessage: string;
  ctaLabel: string;
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}
