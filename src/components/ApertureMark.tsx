interface ApertureMarkProps {
  className?: string;
  animate?: boolean;
}

/**
 * A hexagonal camera-shutter glyph echoing the ZEEE_PROJECT logo.
 * Reused throughout the site (loader, dividers, bullets, hover frames)
 * as the single consistent brand signature instead of generic icons.
 */
export default function ApertureMark({ className = 'h-10 w-10', animate = false }: ApertureMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animate ? 'animate-spin-slow' : ''}`}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round">
        <path d="M50 8 L78 24 L78 30 L42 30 Z" />
        <path d="M91 33 L91 67 L86 70 L68 39 Z" />
        <path d="M78 87 L50 92 L46 87 L64 56 Z" />
        <path d="M50 92 L22 76 L22 70 L58 70 Z" />
        <path d="M9 67 L9 33 L14 30 L32 61 Z" />
        <path d="M22 13 L50 8 L54 13 L36 44 Z" />
      </g>
      <circle cx="50" cy="50" r="13" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  );
}
