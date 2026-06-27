import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FiMapPin, FiPlay, FiX } from 'react-icons/fi';
import { portfolioCategories } from '@/data/portfolio';
import type { PortfolioItem } from '@/data/types';
import { usePortfolioItems } from '@/hooks/usePortfolioItems';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '@/lib/whatsapp';
import SectionReveal from './SectionReveal';

const SPAN_CLASS: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  square: '',
};

export default function Portfolio() {
  const { items: portfolioItems, isLoading } = usePortfolioItems();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'Semua') return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, portfolioItems]);

  const activeItem = portfolioItems.find((item) => item.id === activeItemId) ?? null;

  return (
    <section id="portofolio" className="relative bg-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <SectionReveal>
          <span className="eyebrow">Portofolio</span>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="section-heading mt-6 max-w-2xl text-balance">
            Setiap frame, hasil dari riset cahaya dan sudut yang tepat.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-3">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-300 sm:text-sm ${
                  activeCategory === category
                    ? 'border-gold-300 bg-gold-300/10 text-gold-200'
                    : 'border-white/15 text-bone-muted hover:border-white/35 hover:text-bone'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:auto-rows-[220px]">
          {isLoading
            ? Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className={`skeleton-shimmer rounded-xl ${
                    index % 4 === 0 ? 'row-span-2' : index % 3 === 0 ? 'sm:col-span-2' : ''
                  }`}
                />
              ))
            : filteredItems.map((item, index) => (
                <SectionReveal key={item.id} delay={(index % 6) * 0.06} className={SPAN_CLASS[item.span]}>
                  <PortfolioCard item={item} onOpen={() => setActiveItemId(item.id)} />
                </SectionReveal>
              ))}
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-md sm:p-10"
            onClick={() => setActiveItemId(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-h-full w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItemId(null)}
                aria-label="Tutup"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/80 text-bone backdrop-blur-md transition-colors hover:text-gold-300"
              >
                <FiX size={18} />
              </button>
              <video
                key={activeItem.id}
                src={activeItem.image}
                poster="https://picsum.photos/id/1071/1280/960"
                className="max-h-[70vh] w-full bg-black object-cover"
                controls
                autoPlay
                loop
                playsInline
              />
              <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-300">
                    {activeItem.category}
                  </span>
                  <p className="mt-1 font-display text-lg font-semibold text-bone">
                    {activeItem.title}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-bone-muted">
                    <FiMapPin size={13} /> {activeItem.location}
                  </p>
                </div>
                <a
                  href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold !px-5 !py-2.5 text-xs"
                >
                  Booking Sesi Serupa
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface PortfolioCardProps {
  item: PortfolioItem;
  onOpen: () => void;
}

/**
 * Renders one portfolio grid cell as an autoplaying, muted, looping video
 * thumbnail (no static photo). If the video source fails to load — common
 * with Google Drive links that don't support proper streaming — it falls
 * back to a styled gradient placeholder instead of a broken video box.
 */
function PortfolioCard({ item, onOpen }: PortfolioCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <button
      onClick={onOpen}
      className="aperture-frame group relative block h-full w-full overflow-hidden rounded-xl bg-ink-700"
    >
      {!hasError ? (
        <video
          src={item.image}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-600 to-ink-800">
          <FiPlay className="text-gold-300/50" size={28} />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-300">
          {item.category}
        </span>
        <p className="mt-1 text-sm font-semibold text-bone">{item.title}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-bone-muted">
          <FiMapPin size={11} /> {item.location}
        </p>
      </div>
    </button>
  );
}
