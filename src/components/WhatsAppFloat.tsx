import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '@/lib/whatsapp';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
      aria-label="Chat via WhatsApp"
      className="group fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      <FaWhatsapp size={26} className="relative z-10 transition-transform group-hover:scale-110" />
    </motion.a>
  );
}
