import { useState, useRef, useEffect, useCallback, useMemo } from "react";

type SkillCategory = {
  title: string;
  items: readonly string[];
};

// Constants
const SCATTER_RESET_DELAY = 2000; // ms
const SCATTER_DISTANCE = 25; // px - uniform distance for equal scatter
const MAX_ROTATION = 15; // degrees - reduced rotation
const ANIMATION_DELAY_MULTIPLIER = 0.05; // seconds per index

// Skill data
const technical: readonly string[] = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "React",
  "SQL",
  "Power BI",
] as const;

const aiData: readonly string[] = [
  "Machine Learning",
  "Data Analytics",
  "Model Evaluation",
  "Data Visualization",
  "Dashboard Development",
] as const;

const tools: readonly string[] = [
  "Git & GitHub",
  "VS Code",
  "Postman",
  "Figma",
  "Jupyter Notebook",
] as const;

const skillCategories: readonly SkillCategory[] = [
  { title: "Technical Skills", items: technical },
  { title: "AI & Data", items: aiData },
  { title: "Tools & Platforms", items: tools },
] as const;

export default function SkillsGrid() {
  return (
    <section
      id="skills"
      className="relative py-16 overflow-hidden"
      aria-label="Skills and technologies section"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white px-4">
        Skills & Technologies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 justify-items-center">
        {skillCategories.map((category) => (
          <SkillCard
            key={category.title}
            title={category.title}
            items={category.items}
          />
        ))}
      </div>
    </section>
  );
}

type SkillCardProps = {
  title: string;
  items: readonly string[];
};

function SkillCard({ title, items }: SkillCardProps) {
  const [scattered, setScattered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScatter = useCallback((): void => {
    setScattered(true);
    
    // Clear existing timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reset scatter state after animation completes
    timeoutRef.current = setTimeout(() => {
      setScattered(false);
      timeoutRef.current = null;
    }, SCATTER_RESET_DELAY);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const skillBoxes = useMemo(
    () =>
      items.map((item, index) => (
        <SkillBox
          key={`${title}-${item}-${index}`}
          skill={item}
          index={index}
          totalItems={items.length}
          scattered={scattered}
        />
      )),
    [items, title, scattered]
  );

  return (
    <article
      ref={containerRef}
      className="rounded-2xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_120px_rgba(34,211,238,0.35)] transition-all duration-500 relative overflow-visible"
      onMouseEnter={handleScatter}
      onFocus={handleScatter}
    >
      <h3 className="text-cyan-400 text-xl font-semibold mb-6 text-center">
        {title}
      </h3>

      <div className="relative flex flex-wrap gap-3 justify-center min-h-[200px]" role="list">
        {/* Connecting lines container */}
        {scattered && items.length > 1 && (
          <ConnectingLines
            itemCount={items.length}
            scattered={scattered}
            scatterDistance={SCATTER_DISTANCE}
          />
        )}
        {skillBoxes}
      </div>
    </article>
  );
}

type SkillBoxProps = {
  skill: string;
  index: number;
  totalItems: number;
  scattered: boolean;
};

type ScatterCoordinates = {
  x: number;
  y: number;
  rotation: number;
};

type ConnectingLinesProps = {
  itemCount: number;
  scattered: boolean;
  scatterDistance: number;
};

function ConnectingLines({ itemCount, scattered, scatterDistance }: ConnectingLinesProps) {
  const lines = useMemo(() => {
    if (!scattered || itemCount < 2) return [];

    const angleStep = 360 / itemCount;
    const radius = scatterDistance * 3.5;

    return Array.from({ length: itemCount - 1 }).map((_, index) => {
      const currentAngle = (index * angleStep * Math.PI) / 180;
      const nextAngle = ((index + 1) * angleStep * Math.PI) / 180;

      const x1 = 50 + Math.cos(currentAngle) * radius;
      const y1 = 50 + Math.sin(currentAngle) * radius;
      const x2 = 50 + Math.cos(nextAngle) * radius;
      const y2 = 50 + Math.sin(nextAngle) * radius;

      return { x1, y1, x2, y2, key: `line-${index}` };
    });
  }, [scattered, itemCount, scatterDistance]);

  if (lines.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {lines.map((line) => (
        <line
          key={line.key}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          stroke="rgba(34, 211, 238, 0.25)"
          strokeWidth="0.5"
          className="skill-line"
        />
      ))}
    </svg>
  );
}

function SkillBox({ skill, index, totalItems, scattered }: SkillBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scatterCoordsRef = useRef<ScatterCoordinates | null>(null);

  // Calculate equal scatter coordinates in a circular pattern
  const calculateScatterCoords = useCallback((): ScatterCoordinates => {
    // Calculate angle for equal distribution around a circle
    const angleStep = (360 / totalItems);
    const angle = (index * angleStep) % 360;
    const angleRad = (angle * Math.PI) / 180;
    
    // Uniform distance for all items
    const x = Math.cos(angleRad) * SCATTER_DISTANCE;
    const y = Math.sin(angleRad) * SCATTER_DISTANCE;
    
    // Minimal rotation for subtle effect
    const rotation = (index % 2 === 0 ? 1 : -1) * (MAX_ROTATION * (index % 3) / 3);

    return { x, y, rotation };
  }, [index, totalItems]);

  useEffect(() => {
    if (!boxRef.current) return;

    if (scattered) {
      // Calculate and store coordinates for consistent animation
      if (!scatterCoordsRef.current) {
        scatterCoordsRef.current = calculateScatterCoords();
      }

      const { x, y, rotation } = scatterCoordsRef.current;
      boxRef.current.style.setProperty("--scatter-x", `${x}px`);
      boxRef.current.style.setProperty("--scatter-y", `${y}px`);
      boxRef.current.style.setProperty("--scatter-rotate", `${rotation}deg`);
    } else {
      // Reset to original position
      boxRef.current.style.setProperty("--scatter-x", "0px");
      boxRef.current.style.setProperty("--scatter-y", "0px");
      boxRef.current.style.setProperty("--scatter-rotate", "0deg");
      scatterCoordsRef.current = null;
    }
  }, [scattered, calculateScatterCoords]);

  const handleMouseEnter = useCallback((): void => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback((): void => {
    setIsHovered(false);
  }, []);

  const animationDelay = useMemo(
    () => `${index * ANIMATION_DELAY_MULTIPLIER}s`,
    [index]
  );


  return (
    <div
      ref={boxRef}
      className={`skill-box relative inline-block ${scattered ? "scattered" : ""} ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      style={{ animationDelay }}
      role="listitem"
      tabIndex={0}
      aria-label={`Skill: ${skill}`}
    >
      <div className="skill-box-inner relative px-4 py-2.5 rounded-lg bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-teal-500/20 border border-cyan-400/30 backdrop-blur-md text-white/90 text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:bg-gradient-to-br hover:from-cyan-500/30 hover:via-blue-500/25 hover:to-teal-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black group">
        {/* Decorative lines on box */}
        <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
        </div>
        
        <span className="relative z-10 inline-block">{skill}</span>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
          aria-hidden="true"
        />

        {/* Animated border glow */}
        <div
          className="absolute inset-0 rounded-lg border-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300 -z-10"
          aria-hidden="true"
        />

        {/* Corner particles on hover */}
        {isHovered && (
          <>
            <div
              className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0s" }}
              aria-hidden="true"
            />
            <div
              className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0.2s" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0.4s" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0.6s" }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-lg overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
}
