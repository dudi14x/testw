import { useTheme } from "../context/ThemeContext";

type NavLink = {
  id: string;
  label: string;
};

const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const CV_URL = "/mmmj.pdf";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const linkClassName =
    "nav-link text-sm hover:text-cyan-400 transition-colors px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black rounded";

  return (
    <nav
      className="nav-bar fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo("home")}
            className="text-cyan-400 font-semibold text-lg tracking-tight hover:text-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black rounded"
            aria-label="Go to home"
          >
            Muayad
          </button>

          <div className="flex items-center gap-2" role="list">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={linkClassName}
                aria-label={`Go to ${link.label} section`}
              >
                {link.label}
              </button>
            ))}

            <a
              href={CV_URL}
              download="Muayad_AlAbduwani_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link px-4 py-2 text-sm font-medium rounded border border-cyan-400/50 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Download CV"
            >
              Download CV
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <span className="text-lg" aria-hidden="true">☀️</span>
              ) : (
                <span className="text-lg" aria-hidden="true">🌙</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
