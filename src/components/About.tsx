import { useInView } from 'react-intersection-observer';
import { statItems } from '@/data/stats';
import { useCountUp } from '@/hooks/useCountUp';
import ApertureMark from './ApertureMark';
import SectionReveal from './SectionReveal';

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="tentang" className="relative bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <SectionReveal>
          <span className="eyebrow">Tentang ZEEE_PROJECT</span>
        </SectionReveal>

        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionReveal delay={0.1} className="lg:col-span-7">
            <h2 className="section-heading text-balance">
              Cinematic visual untuk setiap karakter kendaraan.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone-muted sm:text-lg">
              Kami menghadirkan layanan videografi dan fotografi kendaraan dengan gaya
              cinematic yang modern. Berfokus pada mobil dan motor, kami membantu menciptakan
              visual yang menarik untuk kebutuhan pribadi, komunitas, maupun konten media sosial.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-bone-muted sm:text-lg">
              Setiap project dikerjakan dengan pendekatan storytelling, color grading khas, dan
              perhatian pada detail, mulai dari briefing konsep hingga file akhir sampai ke
              tangan Anda.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2} direction="right" className="lg:col-span-5">
            <div className="glass-card flex h-full flex-col justify-between p-7 sm:p-9">
              <ApertureMark className="h-9 w-9 text-gold-300" />
              <blockquote className="mt-6 font-display text-lg font-medium leading-snug text-bone sm:text-xl">
                &ldquo;Setiap kendaraan punya karakter. Tugas kami adalah menemukannya lewat
                lensa.&rdquo;
              </blockquote>
              <p className="mt-6 text-sm uppercase tracking-widest text-gold-300">
                Zeee_Project — Video and Fotografer
              </p>
            </div>
          </SectionReveal>
        </div>

        <div
          ref={ref}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 sm:grid-cols-4 sm:gap-8"
        >
          {statItems.map((stat, index) => (
            <SectionReveal key={stat.id} delay={0.1 * index}>
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} trigger={inView} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}

function StatCounter({ value, suffix, label, trigger }: StatCounterProps) {
  const count = useCountUp({ end: value, duration: 1800 }, trigger);

  return (
    <div className="text-center sm:text-left">
      <p className="font-display text-3xl font-bold text-bone sm:text-4xl md:text-5xl">
        <span className="tabular-nums">{count}</span>
        <span className="text-gold-300">{suffix}</span>
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-bone-muted sm:text-sm">
        {label}
      </p>
    </div>
  );
}
