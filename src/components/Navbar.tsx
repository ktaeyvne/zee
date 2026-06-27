import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useActiveSection } from '@/hooks/useActiveSection';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '@/lib/whatsapp';
import ApertureMark from './ApertureMark';

const NAV_LINKS = [
  { id: 'tentang', label: 'Tentang' },

  { id: 'showcase', label: 'Showcase' },
  { id: 'harga', label: 'Harga' },
  { id: 'testimoni', label: 'Testimoni' },
  { id: 'faq', label: 'FAQ' },
  { id: 'kontak', label: 'Kontak' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeId = useActiveSection(NAV_LINKS.map((link) => link.id));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleNavClick = (id: string) => {
    setIsMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-ink-900/85 backdrop-blur-xl shadow-[0_1px_0_rgba(201,162,39,0.15)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-container items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => handleNavClick('beranda')}
          className="flex items-center gap-2.5 text-bone transition-opacity hover:opacity-80"
          aria-label="ZEEE_PROJECT — kembali ke beranda"
        >
          <ApertureMark className="h-7 w-7 text-gold-300" />
          <span className="font-display text-base font-semibold tracking-wide sm:text-lg">
            ZEEE<span className="text-gold-300">_</span>PROJECT
          </span>
        </button>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative text-sm font-medium uppercase tracking-wide transition-colors ${
                activeId === link.id ? 'text-gold-300' : 'text-bone-muted hover:text-bone'
              }`}
            >
              {link.label}
              {activeId === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 h-px w-full bg-gold-300"
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold !px-5 !py-2.5 text-xs"
          >
            Booking Sekarang
          </a>
        </div>

        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-bone lg:hidden"
          aria-label={isMobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-ink-900/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`rounded-lg px-3 py-3 text-left text-sm font-medium uppercase tracking-wide transition-colors ${
                    activeId === link.id ? 'bg-white/5 text-gold-300' : 'text-bone-muted'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-3 w-full"
                onClick={() => setIsMobileOpen(false)}
              >
                Booking Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
