import { useState } from "react";

/**
 * Infinite marquee - company logos fly across the screen.
 * Uses images from public/logos/; falls back to SVG initial when image fails.
 */

function SvgInitial({ letter }: { letter: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-14 sm:h-10 sm:w-16 md:h-11 md:w-[72px] lg:h-12 lg:w-20 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
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
    <div className="flex items-center justify-center h-8 w-14 sm:h-10 sm:w-16 md:h-11 md:w-[72px] lg:h-12 lg:w-20 shrink-0">
      <img
        src={currentSrc}
        alt={alt}
        onError={() => setAttempt((p) => p + 1)}
        className="max-h-8 max-w-14 sm:max-h-10 sm:max-w-16 md:max-h-11 md:max-w-[72px] lg:max-h-12 lg:max-w-20 w-auto h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

type Company = {
  name: string;
  logo: string;
  initial: string;
  altLogo?: string;
  linkedin?: string;
};

const COMPANIES: Company[] = [
  { name: "ICONS OMAN", logo: "/logos/oss.jpeg", initial: "I", altLogo: "/logos/oss.jpg", linkedin: "https://www.linkedin.com/company/iconsoman/" },
  { name: "Oman Data Park", logo: "/logos/oman%20data%20park.png", initial: "O", linkedin: "https://www.linkedin.com/company/oman-data-park/" },
  { name: "Omantel", logo: "/logos/omantel.png", initial: "O", linkedin: "https://www.linkedin.com/company/omantel/" },
  { name: "ORKI AI", logo: "/logos/orki.png", initial: "O", linkedin: "https://www.linkedin.com/company/orki-ai/" },
  { name: "Zain Omantel International", logo: "/logos/zoi.png", initial: "Z", linkedin: "https://www.linkedin.com/company/zain-omantel/" },
].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

export default function CompanyMarquee() {
  return (
    <section
      className="relative py-6 sm:py-8 md:py-9 lg:py-10 overflow-hidden border-y border-white/10"
      aria-label="Companies and organizations"
    >
      <div className="flex animate-marquee w-max">
        {[...COMPANIES, ...COMPANIES].map((company, idx) => (
          <div
            key={`${company.name}-${idx}`}
            className="flex items-center gap-4 px-4 sm:gap-6 sm:px-6 md:gap-8 md:px-8 lg:gap-10 lg:px-10 shrink-0 group"
          >
            {company.linkedin ? (
              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black rounded transition-opacity hover:opacity-100"
                aria-label={`${company.name} on LinkedIn`}
              >
                <LogoOrFallback
                  src={company.logo}
                  alt={company.name}
                  fallbackLetter={company.initial}
                  altSrc={company.altLogo}
                />
              </a>
            ) : (
              <LogoOrFallback
                src={company.logo}
                alt={company.name}
                fallbackLetter={company.initial}
                altSrc={company.altLogo}
              />
            )}
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
