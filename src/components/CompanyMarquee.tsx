import { useState } from "react";

/**
 * Infinite marquee - company logos fly across the screen.
 * Uses images from public/logos/; falls back to SVG initial when image fails.
 */

const LOGO_SLOT = "h-12 w-20";

function SvgInitial({ letter }: { letter: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`${LOGO_SLOT} shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
      aria-hidden
    >
      <rect
        width="48"
        height="48"
        rx="8"
        className="fill-cyan-500/20 stroke-cyan-500/50 stroke-[1.5]"
      />
      <text
        x="24"
        y="32"
        textAnchor="middle"
        className="fill-cyan-400 text-[24px] font-bold"
      >
        {letter}
      </text>
    </svg>
  );
}

function LogoOrFallback({
  src,
  alt,
  fallbackLetter,
  altSrc,
}: {
  src: string;
  alt: string;
  fallbackLetter: string;
  altSrc?: string;
}) {
  const [attempt, setAttempt] = useState(0);
  const currentSrc = attempt === 0 ? src : altSrc ?? src;
  const showFallback = !altSrc ? attempt > 0 : attempt > 1;

  if (showFallback) {
    return <SvgInitial letter={fallbackLetter} />;
  }
  return (
    <div className={`flex items-center justify-center ${LOGO_SLOT} shrink-0`}>
      <img
        src={currentSrc}
        alt={alt}
        onError={() => setAttempt((p) => p + 1)}
        className="max-h-12 max-w-20 w-auto h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

type Company = {
  name: string;
  logo: string;
  initial: string;
  altLogo?: string;
};

const COMPANIES: Company[] = [
  { name: "ICONS OMAN", logo: "/logos/oss.jpeg", initial: "I", altLogo: "/logos/oss.jpg" },
  { name: "Oman Data Park", logo: "/logos/oman%20data%20park.png", initial: "O" },
  { name: "Omantel", logo: "/logos/omantel.png", initial: "O" },
  { name: "ORKI AI", logo: "/logos/orki.png", initial: "O" },
  { name: "Zain Omantel International", logo: "/logos/zoi.png", initial: "Z" },
].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

export default function CompanyMarquee() {
  return (
    <section
      className="relative py-10 overflow-hidden border-y border-white/10"
      aria-label="Companies and organizations"
    >
      <div className="flex animate-marquee w-max">
        {[...COMPANIES, ...COMPANIES].map((company, idx) => (
          <div
            key={`${company.name}-${idx}`}
            className="flex items-center gap-10 px-10 shrink-0 group"
          >
            <LogoOrFallback
              src={company.logo}
              alt={company.name}
              fallbackLetter={company.initial}
              altSrc={company.altLogo}
            />
            <span
              className="w-2 h-2 rounded-full bg-cyan-500/60 shrink-0"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}
