import { FaLinkedin, FaInstagram } from "react-icons/fa";

type SocialLinkType = "linkedin" | "instagram";

type SocialLink = {
  type: SocialLinkType;
  url: string;
};

type ExperienceItem = {
  year: string;
  side: "left" | "right";
  title: string;
  org: string;
  desc: string;
  links?: SocialLink[];
};

/* ======================================================= */
/* DATA */
/* ======================================================= */

const experiences: ExperienceItem[] = [
  {
    year: "2025 - 2026",
    side: "left",
    title: "Head of Sports Committee",
    org: "Omani Students Society in Cardiff (OSSC)",
    desc: "Leadership, Team Building, Networking, Physical Health.",
    links: [
      { type: "instagram", url: "https://www.instagram.com/oss_cardiff/?hl=en" },
      { type: "linkedin", url: "https://www.linkedin.com/company/osscardiff/" }
    ]
  },
  {
    year: "2025",
    side: "right",
    title: "Software Engineer",
    org: "Zain Omantel International",
    desc: "Developing software solutions and platform features.",
    links: [{ type: "linkedin", url: "https://www.linkedin.com/company/zain-omantel/" }]
  },
  {
    year: "2025",
    side: "left",
    title: "GRC Unit",
    org: "Oman Data Park",
    desc: "Supporting Governance, Risk & Compliance operations and automation.",
    links: [{ type: "linkedin", url: "https://www.linkedin.com/company/oman-data-park/" }]
  },
  {
    year: "2025",
    side: "left",
    title: "AI Developer",
    org: "ORKI AI",
    desc: "Building AI-driven solutions and machine learning models.",
    links: [{ type: "linkedin", url: "https://www.linkedin.com/company/orki-ai/" }]
  },
  {
    year: "2025",
    side: "right",
    title: "Center of Excellence Unit",
    org: "Oman Data Park",
    desc: "Working on innovation initiatives and advanced analytics.",
    links: [{ type: "linkedin", url: "https://www.linkedin.com/company/oman-data-park/" }]
  },
  {
    year: "2025",
    side: "left",
    title: "Digital Content Creator",
    org: "Instagram • Awarded ICONS OMAN",
    desc: "Creating digital content and creative media.",
    links: [
      { type: "instagram", url: "https://www.instagram.com/muayadmotion/" },
      { type: "linkedin", url: "https://www.linkedin.com/company/iconsoman/" }
    ]
  },
  {
    year: "2024",
    side: "right",
    title: "Big Data & Analytics + Consumer Unit",
    org: "Omantel",
    desc: "Data analytics, Power BI dashboards, and data monetization.",
    links: [{ type: "linkedin", url: "https://www.linkedin.com/company/omantel/" }]
  },
  {
    year: "2023 - 2026",
    side: "left",
    title: "BSc Computer Science (AI Pathway)",
    org: "Cardiff Metropolitan University",
    desc: "",
    links: [{ type: "linkedin", url: "https://www.linkedin.com/school/cardiff-metropolitan-university/" }]
  },
  {
    year: "2021 - 2023",
    side: "right",
    title: "IB Diploma Student",
    org: "International Baccalaureate",
    desc: "Diploma awarded.",
    links: [{ type: "linkedin", url: "https://www.linkedin.com/company/sultan-s-school/" }]
  },
  {
    year: "2023",
    side: "left",
    title: "IELTS Certificate",
    org: "Overall Band 7.5",
    desc: "Academic English proficiency."
  },
  {
    year: "2024",
    side: "right",
    title: "Fine Dining Certificate",
    org: "Cooking Academia Sarajevo",
    desc: "Professional culinary training."
  },
  {
    year: "2019 - 2021",
    side: "left",
    title: "IGCSE Student",
    org: "Secondary Education",
    desc: "Certificate awarded."
  }
];

/* ======================================================= */
/* PAGE */
/* ======================================================= */

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-16"
      aria-label="Experience and education section"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white px-4">
        Experience & Education
      </h2>

      {/* Center Glow Line - hidden on mobile/tablet (screens under 1024px) */}
      <div
        className="hidden lg:block absolute left-1/2 top-40 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/80 via-cyan-500/30 to-transparent -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12 relative px-4 sm:px-6 md:px-8">
        {experiences.map((item, index) => (
          <TimelineCard key={`${item.year}-${item.title}-${index}`} {...item} />
        ))}
      </div>
    </section>
  );
}

/* ======================================================= */
/* CARD */
/* ======================================================= */

function TimelineCard({
  year,
  side,
  title,
  org,
  desc,
  links,
}: ExperienceItem) {
  const isLeft = side === "left";

  return (
    <div
      className={`relative flex items-center justify-center px-4 lg:px-0 lg:pl-0 lg:pr-0 ${
        isLeft ? "lg:justify-start lg:pr-12" : "lg:justify-end lg:pl-12"
      }`}
    >
      {/* Dot - hidden on mobile/tablet (screens under 1024px) */}
      <div
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.9)] z-10 shrink-0"
        aria-hidden="true"
      />

      {/* Card - centered on mobile, alternating on desktop */}
      <article
        className="w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px] mx-auto lg:mx-0 rounded-2xl p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.6)] hover:shadow-[0_35px_120px_rgba(34,211,238,0.35)] hover:-translate-y-2 transition-all duration-500"
      >
        <time className="text-sm text-cyan-400 font-medium" dateTime={year}>
          {year}
        </time>

        <h3 className="text-lg font-semibold mt-1 text-white">{title}</h3>

        <p className="text-cyan-300 text-sm">{org}</p>

        {desc && <p className="text-white/70 text-sm mt-2">{desc}</p>}

        {/* Social Icons */}
        {links && links.length > 0 && (
          <div className="flex gap-4 mt-4 text-cyan-400" role="list">
            {links.map((link, index) => {
              const Icon = link.type === "linkedin" ? FaLinkedin : FaInstagram;
              return (
                <a
                  key={`${link.type}-${index}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                  aria-label={`Visit ${link.type} profile`}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        )}
      </article>
    </div>
  );
}
