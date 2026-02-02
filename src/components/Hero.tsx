export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 relative overflow-hidden"
      aria-label="Hero section"
    >
      <div className="hero-content animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight hero-name">
          <span className="hero-name-gradient bg-clip-text text-transparent">
            Muayad AlAbduwani
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 font-light hero-subtitle">
          AI & Machine Learning Enthusiast
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-bold hero-description px-2">
          &ldquo;Building intelligent systems and transforming data into value&rdquo;
        </p>
      </div>
    </section>
  );
}
