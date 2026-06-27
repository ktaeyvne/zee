import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { FiInstagram, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import { buildCustomBookingMessage, buildWhatsAppLink, CONTACT } from '@/lib/whatsapp';
import SectionReveal from './SectionReveal';

interface BookingFormState {
  nama: string;
  jenisKendaraan: string;
  paket: string;
  tanggal: string;
  catatan: string;
}

const INITIAL_FORM_STATE: BookingFormState = {
  nama: '',
  jenisKendaraan: '',
  paket: 'Paket Mobil — Rp350.000',
  tanggal: '',
  catatan: '',
};

export default function Contact() {
  const [form, setForm] = useState<BookingFormState>(INITIAL_FORM_STATE);

  const handleChange = (field: keyof BookingFormState) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = buildCustomBookingMessage({
      nama: form.nama || '-',
      jenisKendaraan: form.jenisKendaraan || '-',
      paket: form.paket,
      tanggal: form.tanggal || 'Fleksibel',
      catatan: form.catatan,
    });
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="kontak" className="relative bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <SectionReveal>
          <span className="eyebrow">Kontak</span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="section-heading mt-6 max-w-xl text-balance">
            Siap mengabadikan kendaraan Anda?
          </h2>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Booking form */}
          <SectionReveal delay={0.15} direction="left" className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 p-7 sm:p-9">
              <h3 className="font-display text-lg font-semibold text-bone">Form Booking Cepat</h3>
              <p className="text-sm text-bone-muted">
                Isi detail singkat, lalu kami akan menyiapkan pesan WhatsApp untuk Anda kirim.
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Nama Lengkap">
                  <input
                    required
                    type="text"
                    value={form.nama}
                    onChange={handleChange('nama')}
                    placeholder="Nama Anda"
                    className="input-field"
                  />
                </Field>

                <Field label="Jenis Kendaraan">
                  <input
                    required
                    type="text"
                    value={form.jenisKendaraan}
                    onChange={handleChange('jenisKendaraan')}
                    placeholder="cth. Honda Civic Type R"
                    className="input-field"
                  />
                </Field>

                <Field label="Pilih Paket">
                  <select value={form.paket} onChange={handleChange('paket')} className="input-field">
                    <option>Paket Mobil — Rp350.000</option>
                    <option>Paket Motor — Rp200.000</option>
                    <option>Belum Yakin / Konsultasi Dulu</option>
                  </select>
                </Field>

                <Field label="Tanggal Diinginkan">
                  <input
                    type="date"
                    value={form.tanggal}
                    onChange={handleChange('tanggal')}
                    className="input-field"
                  />
                </Field>
              </div>

              <Field label="Catatan Tambahan (opsional)">
                <textarea
                  value={form.catatan}
                  onChange={handleChange('catatan')}
                  rows={3}
                  placeholder="Lokasi spesifik, konsep, atau permintaan khusus lainnya"
                  className="input-field resize-none"
                />
              </Field>

              <button type="submit" className="btn-gold mt-2 w-full">
                <FiSend size={16} />
                Kirim ke WhatsApp
              </button>
            </form>
          </SectionReveal>

          {/* Contact info + map */}
          <SectionReveal delay={0.2} direction="right" className="lg:col-span-5">
            <div className="flex h-full flex-col gap-5">
              <div className="glass-card flex flex-col gap-5 p-7 sm:p-8">
                <ContactRow icon={<FiPhone size={17} />} label="WhatsApp" value={CONTACT.phoneDisplay} />
                <ContactRow
                  icon={<FiInstagram size={17} />}
                  label="Instagram"
                  value={`@${CONTACT.instagram}`}
                  href={CONTACT.instagramUrl}
                />
                <ContactRow
                  icon={<SiTiktok size={15} />}
                  label="TikTok"
                  value={`@${CONTACT.tiktok}`}
                  href={CONTACT.tiktokUrl}
                />
                <ContactRow icon={<FiMail size={17} />} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
                <ContactRow icon={<FiMapPin size={17} />} label="Lokasi" value={CONTACT.city} />
              </div>

              <div className="glass-card flex-1 overflow-hidden p-0">
                <iframe
                  title="Lokasi ZEEE_PROJECT — Bandar Lampung"
                  src="https://www.google.com/maps?q=Bandar%20Lampung&output=embed"
                  className="h-[260px] w-full border-0 grayscale invert-[0.92] contrast-[1.1] sm:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-bone-muted">{label}</span>
      {children}
    </label>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-300/10 text-gold-300">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-bone-muted">{label}</p>
        <p className="text-sm font-medium text-bone sm:text-[15px]">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
        {content}
      </a>
    );
  }

  return content;
}
