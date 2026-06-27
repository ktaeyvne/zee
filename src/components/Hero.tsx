import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowDown, FiPlay } from 'react-icons/fi';
import { DRIVE_VIDEOS } from '@/data/driveVideos';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '@/lib/whatsapp';
import ApertureMark from './ApertureMark';

/**
 * Background footage: menggunakan video pertama dari koleksi Google Drive
 * klien. Jika ingin mengganti, edit `src/data/driveVideos.ts` atau ganti
 * langsung URL di bawah ini. `onError` tetap dipertahankan sebagai fallback
 * agar hero tidak pernah tampak rusak jika link video gagal dimuat.
 */
const HERO_VIDEO_SRC = DRIVE_VIDEOS[0];

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);

  const scrollToPortfolio = () => {
    document.getElementById('portofolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="beranda"
      className="relative flex min-h-[100vh] w-full items-center justify-center overflow-hidden bg-ink-900"
    >
      {/* Background layer: real footage if present, animated fallback otherwise */}
      <div className="absolute inset-0 z-0">
        {!videoFailed && (
          <video
            className="h-full w-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            poster="https://picsum.photos/id/1071/1920/1080"
            onError={() => setVideoFailed(true)}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}

        {videoFailed && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,39,0.18),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(201,162,39,0.1),transparent_50%)]">
            <LightTrails />
          </div>
        )}

        <div className="absolute inset-0 bg-ink-900/55" />
        <div className="absolute inset-0 bg-ink-fade" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-transparent to-ink-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-container flex-col items-center px-5 pt-28 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <ApertureMark className="mx-auto h-14 w-14 text-gold-300 sm:h-16 sm:w-16" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 font-display text-[13vw] font-bold uppercase leading-[0.95] tracking-tight text-bone sm:text-6xl md:text-7xl lg:text-8xl"
        >
          ZEEE<span className="text-gold-300">_</span>PROJECT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-xs font-semibold uppercase tracking-widest2 text-gold-200 sm:text-sm"
        >
          Street Photography &amp; Videography
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 max-w-xl text-balance text-base text-bone-muted sm:text-lg"
        >
          Abadikan mobil dan motor Anda dengan cinematic visual berkualitas profesional.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Booking Sekarang
          </a>
          <button onClick={scrollToPortfolio} className="btn-outline group">
            <FiPlay className="transition-transform group-hover:scale-110" />
            Lihat Portofolio
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToPortfolio}
        aria-label="Gulir ke bawah"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold-300/80"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiArrowDown size={22} />
      </motion.button>
    </section>
  );
}

/**
 * Lightweight CSS-driven headlight-trail animation used as a graceful
 * fallback for the hero whenever no background video file is present yet.
 */
function LightTrails() {
  const trails = [
    { top: '22%', delay: 0, duration: 7 },
    { top: '48%', delay: 1.4, duration: 9 },
    { top: '68%', delay: 0.6, duration: 6.5 },
    { top: '82%', delay: 2.1, duration: 8 },
  ];

  return (
    <svg className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      {trails.map((trail, index) => (
        <motion.line
          key={index}
          x1="-10%"
          x2="110%"
          y1={trail.top}
          y2={trail.top}
          stroke="url(#trailGradient)"
          strokeWidth={index % 2 === 0 ? 2 : 1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.7, 0] }}
          transition={{
            duration: trail.duration,
            delay: trail.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <defs>
        <linearGradient id="trailGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9A227" stopOpacity="0" />
          <stop offset="50%" stopColor="#E8C547" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
