import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { faqItems } from '@/data/faq';
import SectionReveal from './SectionReveal';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="relative bg-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionReveal>
              <span className="eyebrow">FAQ</span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="section-heading mt-6 text-balance">
                Pertanyaan yang sering ditanyakan.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-bone-muted sm:text-base">
                Tidak menemukan jawaban yang Anda cari? Hubungi kami langsung melalui WhatsApp,
                kami siap membantu.
              </p>
            </SectionReveal>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col gap-3">
              {faqItems.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <SectionReveal key={item.id} delay={index * 0.06}>
                    <div
                      className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                        isOpen ? 'border-gold-300/40 bg-white/[0.03]' : 'border-white/10 bg-white/[0.015]'
                      }`}
                    >
                      <button
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                        aria-expanded={isOpen}
                      >
                        <span className="font-display text-sm font-semibold text-bone sm:text-base">
                          {item.question}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25 }}
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                            isOpen ? 'bg-gold-300 text-ink-900' : 'bg-white/10 text-bone'
                          }`}
                        >
                          <FiPlus size={14} />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <p className="px-5 pb-5 text-sm leading-relaxed text-bone-muted sm:px-6 sm:text-[15px]">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
