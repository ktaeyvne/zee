import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiMapPin, FiPlay, FiX } from 'react-icons/fi';
import { showcaseVideos } from '@/data/showcase';
import SectionReveal from './SectionReveal';

export default function VideoShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const activeVideo = showcaseVideos.find((video) => video.id === activeVideoId) ?? null;

  const scrollByAmount = (direction: 'left' | 'right') => {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.8;
    node.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id="showcase" className="relative bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionReveal>
              <span className="eyebrow">Video Showcase</span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="section-heading mt-6 max-w-xl text-balance">
                Cerita bergerak dari setiap sesi pemotretan.
              </h2>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.2} direction="right">
            <div className="hidden gap-3 sm:flex">
              <button
                onClick={() => scrollByAmount('left')}
                aria-label="Sebelumnya"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-gold-300/60 hover:text-gold-300"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                aria-label="Selanjutnya"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-gold-300/60 hover:text-gold-300"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </SectionReveal>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          {showcaseVideos.map((video, index) => (
            <SectionReveal
              key={video.id}
              delay={(index % 4) * 0.08}
              className="group relative aspect-video w-[78vw] flex-shrink-0 overflow-hidden rounded-xl sm:w-[420px]"
            >
              <button onClick={() => setActiveVideoId(video.id)} className="block h-full w-full">
                <img
                  src={video.poster}
                  alt={video.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent transition-opacity duration-300 group-hover:from-ink-900/95" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/60 bg-ink-900/60 text-gold-200 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-300 group-hover:text-ink-900">
                    <FiPlay size={20} />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-base font-semibold text-bone">{video.title}</p>
                  <p className="mt-1 text-xs text-bone-muted">{video.vehicleType}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-gold-300">
                    <FiMapPin size={11} /> {video.location}
                  </p>
                </div>
              </button>
            </SectionReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-md sm:p-10"
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoId(null)}
                aria-label="Tutup"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/80 text-bone backdrop-blur-md transition-colors hover:text-gold-300"
              >
                <FiX size={18} />
              </button>
              <video
                key={activeVideo.id}
                className="aspect-video w-full bg-black"
                controls
                autoPlay
                poster={activeVideo.poster}
              >
                <source src={activeVideo.videoSrc} type="video/mp4" />
              </video>
              <div className="p-6">
                <p className="font-display text-lg font-semibold text-bone">{activeVideo.title}</p>
                <p className="mt-1 text-sm text-bone-muted">{activeVideo.vehicleType}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
