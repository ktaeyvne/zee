import { FiInstagram, FiMail } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import { CONTACT } from '@/lib/whatsapp';
import ApertureMark from './ApertureMark';

const FOOTER_LINKS = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'portofolio', label: 'Portofolio' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'harga', label: 'Harga' },
  { id: 'faq', label: 'FAQ' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-ink-900 pt-16">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <ApertureMark className="h-7 w-7 text-gold-300" />
              <span className="font-display text-base font-semibold text-bone">
                ZEEE<span className="text-gold-300">_</span>PROJECT
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-muted">
              Video and Fotografer — mengabadikan mobil dan motor dengan visual cinematic
              berkualitas profesional di Bandar Lampung.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram ZEEE_PROJECT"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-gold-300/60 hover:text-gold-300"
              >
                <FiInstagram size={15} />
              </a>
              <a
                href={CONTACT.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok ZEEE_PROJECT"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-gold-300/60 hover:text-gold-300"
              >
                <SiTiktok size={13} />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="Email ZEEE_PROJECT"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-gold-300/60 hover:text-gold-300"
              >
                <FiMail size={15} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">Navigasi</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-sm text-bone-muted transition-colors hover:text-bone"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">Kontak</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-bone-muted">
              <li>{CONTACT.phoneIntl}</li>
              <li>{CONTACT.email}</li>
              <li>{CONTACT.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-bone-muted sm:flex-row">
          <p>© {year} ZEEE_PROJECT. Seluruh hak cipta dilindungi.</p>
          <p>Dirancang dengan presisi cinematic.</p>
        </div>
      </div>
    </footer>
  );
}
