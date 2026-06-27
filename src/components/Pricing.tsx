import { FiCheck } from 'react-icons/fi';
import { pricingNotes, pricingPlans } from '@/data/pricing';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import ApertureMark from './ApertureMark';
import SectionReveal from './SectionReveal';

export default function Pricing() {
  return (
    <section id="harga" className="relative bg-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <SectionReveal>
          <span className="eyebrow">Paket Harga</span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="section-heading mt-6 max-w-xl text-balance">
            Investasi visual, transparan sejak awal.
          </h2>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <SectionReveal key={plan.id} delay={0.15 * index} direction={index === 0 ? 'left' : 'right'}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-8 sm:p-10 ${
                  plan.highlighted
                    ? 'border border-gold-300/50 bg-gradient-to-b from-gold-900/40 via-ink-700 to-ink-700 shadow-gold-lg'
                    : 'glass-card'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 right-8 rounded-full bg-gold-sheen px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-900">
                    Paling Diminati
                  </span>
                )}

                <ApertureMark className={`h-9 w-9 ${plan.highlighted ? 'text-gold-300' : 'text-bone-muted'}`} />

                <h3 className="mt-6 font-display text-2xl font-semibold text-bone">{plan.name}</h3>
                <p className="mt-2 text-sm text-bone-muted">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-bone sm:text-5xl">
                    {plan.priceLabel}
                  </span>
                  <span className="text-sm text-bone-muted">/ sesi</span>
                </div>

                <ul className="mt-8 flex flex-col gap-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-bone/90 sm:text-base">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-300/15 text-gold-300">
                        <FiCheck size={13} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={buildWhatsAppLink(plan.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-10 w-full ${plan.highlighted ? 'btn-gold' : 'btn-outline'}`}
                >
                  {plan.ctaLabel}
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">Catatan</p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {pricingNotes.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-sm text-bone-muted">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold-300" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
