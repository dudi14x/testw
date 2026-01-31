import { useTheme } from "../context/ThemeContext";

type PatternStyle = {
  gradient: string;
  size: string;
  opacity: string;
};

const DARK_PATTERNS: PatternStyle[] = [
  { gradient: "radial-gradient(#ffffff18_1px,transparent_1px)", size: "40px 40px", opacity: "0.25" },
  { gradient: "radial-gradient(#22d3ee22_1.5px,transparent_1.5px)", size: "48px 48px", opacity: "0.2" },
  { gradient: "radial-gradient(#ffffff12_1px,transparent_1px)", size: "60px 60px", opacity: "0.2" },
  { gradient: "radial-gradient(#3b82f620_1px,transparent_1px)", size: "36px 36px", opacity: "0.22" },
  { gradient: "radial-gradient(#ffffff15_2px,transparent_2px)", size: "55px 55px", opacity: "0.18" },
  { gradient: "radial-gradient(#22d3ee18_1px,transparent_1px)", size: "44px 44px", opacity: "0.2" },
  { gradient: "radial-gradient(#a78bfa20_1.5px,transparent_1.5px)", size: "50px 50px", opacity: "0.18" },
  { gradient: "radial-gradient(#ffffff10_1px,transparent_1px)", size: "32px 32px", opacity: "0.28" },
  { gradient: "radial-gradient(#2dd4bf18_1px,transparent_1px)", size: "52px 52px", opacity: "0.2" },
  { gradient: "radial-gradient(#ec489920_1px,transparent_1px)", size: "46px 46px", opacity: "0.16" },
];

const LIGHT_PATTERNS: PatternStyle[] = [
  { gradient: "radial-gradient(#0f172a12_1px,transparent_1px)", size: "38px 38px", opacity: "0.35" },
  { gradient: "radial-gradient(#0369a115_1.5px,transparent_1.5px)", size: "45px 45px", opacity: "0.3" },
  { gradient: "radial-gradient(#1e293b10_1px,transparent_1px)", size: "55px 55px", opacity: "0.32" },
  { gradient: "radial-gradient(#7c3aed14_1px,transparent_1px)", size: "42px 42px", opacity: "0.28" },
  { gradient: "radial-gradient(#0f172a08_2px,transparent_2px)", size: "60px 60px", opacity: "0.3" },
  { gradient: "radial-gradient(#0284c712_1px,transparent_1px)", size: "48px 48px", opacity: "0.32" },
  { gradient: "radial-gradient(#33415515_1.5px,transparent_1.5px)", size: "40px 40px", opacity: "0.3" },
  { gradient: "radial-gradient(#be185d10_1px,transparent_1px)", size: "50px 50px", opacity: "0.25" },
  { gradient: "radial-gradient(#0f172a0a_1px,transparent_1px)", size: "35px 35px", opacity: "0.38" },
  { gradient: "radial-gradient(#0369a110_1.5px,transparent_1.5px)", size: "52px 52px", opacity: "0.28" },
];

export default function StarField() {
  const { theme } = useTheme();
  const patterns = theme === "dark" ? DARK_PATTERNS : LIGHT_PATTERNS;
  const patternIndex = Math.floor(Date.now() / 86400000) % 10;
  const pattern = patterns[patternIndex];

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: pattern.gradient,
        backgroundSize: pattern.size,
        opacity: pattern.opacity,
      }}
      aria-hidden="true"
    />
  );
}
