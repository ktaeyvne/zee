import { FiStar } from 'react-icons/fi';
import { useTestimonials } from '@/hooks/useTestimonials';
import SectionReveal from './SectionReveal';

export default function Testimonials() {
  const { testimonials, isLoading } = useTestimonials();

  return (
    <section id="testimoni" className="relative bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <SectionReveal>
          <span className="eyebrow">Testimoni</span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="section-heading mt-6 max-w-xl text-balance">
            Dipercaya oleh para pemilik kendaraan di Bandar Lampung.
          </h2>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="skeleton-shimmer h-64 rounded-2xl" />
              ))
            : testimonials.map((testimonial, index) => (
                <SectionReveal key={testimonial.id} delay={(index % 3) * 0.1}>
                  <div className="glass-card flex h-full flex-col p-7">
                    <div className="flex" aria-label={`Rating ${testimonial.rating} dari 5`}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <FiStar
                          key={starIndex}
                          size={15}
                          className={
                            starIndex < testimonial.rating
                              ? 'fill-gold-300 text-gold-300'
                              : 'text-bone-muted/40'
                          }
                        />
                      ))}
                    </div>

                    <p className="mt-5 flex-1 text-sm leading-relaxed text-bone/90 sm:text-[15px]">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        loading="lazy"
                        className="h-11 w-11 rounded-full border border-gold-300/30 object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-bone">{testimonial.name}</p>
                        <p className="text-xs text-bone-muted">{testimonial.vehicle}</p>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              ))}
        </div>
      </div>
    </section>
  );
}
