import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  shape: number;
};

type Palette = {
  colors: string[];
  shapes: number[]; // 0=circle, 1=square, 2=triangle, 3=hexagon, 4=star, 5=diamond, 6=ring, 7=cross, 8=pentagon, 9=heart
};

const PARTICLE_COUNT = 60;

const DARK_PALETTES: Palette[] = [
  { colors: ["rgba(34,211,238,0.6)", "rgba(59,130,246,0.5)", "rgba(45,212,191,0.4)"], shapes: [0, 0, 0, 1] },
  { colors: ["rgba(139,92,246,0.5)", "rgba(236,72,153,0.4)", "rgba(251,146,60,0.4)"], shapes: [1, 2, 2, 1] },
  { colors: ["rgba(34,211,238,0.5)", "rgba(168,85,247,0.4)"], shapes: [3, 4, 3, 4] },
  { colors: ["rgba(251,191,36,0.5)", "rgba(34,211,238,0.4)", "rgba(239,68,68,0.3)"], shapes: [5, 6, 5, 6] },
  { colors: ["rgba(99,102,241,0.5)", "rgba(14,165,233,0.4)"], shapes: [7, 8, 7, 8] },
  { colors: ["rgba(16,185,129,0.5)", "rgba(6,182,212,0.4)", "rgba(34,211,238,0.3)"], shapes: [0, 3, 6, 0] },
  { colors: ["rgba(244,63,94,0.4)", "rgba(251,146,60,0.4)", "rgba(234,179,8,0.4)"], shapes: [4, 5, 9, 4] },
  { colors: ["rgba(34,211,238,0.5)", "rgba(99,102,241,0.4)"], shapes: [2, 3, 8, 2] },
  { colors: ["rgba(20,184,166,0.5)", "rgba(59,130,246,0.4)", "rgba(168,85,247,0.3)"], shapes: [1, 4, 7, 1] },
  { colors: ["rgba(236,72,153,0.4)", "rgba(34,211,238,0.4)", "rgba(251,191,36,0.3)"], shapes: [6, 9, 0, 6] },
];

const LIGHT_PALETTES: Palette[] = [
  { colors: ["rgba(2,132,199,0.5)", "rgba(124,58,237,0.4)", "rgba(190,24,93,0.35)"], shapes: [0, 1, 0, 1] },
  { colors: ["rgba(7,89,133,0.45)", "rgba(88,28,135,0.4)", "rgba(136,19,55,0.35)"], shapes: [2, 3, 2, 3] },
  { colors: ["rgba(21,94,117,0.45)", "rgba(109,40,217,0.4)"], shapes: [4, 5, 4, 5] },
  { colors: ["rgba(30,64,175,0.45)", "rgba(147,51,234,0.4)", "rgba(190,24,93,0.3)"], shapes: [6, 7, 6, 7] },
  { colors: ["rgba(2,132,199,0.5)", "rgba(190,18,60,0.4)"], shapes: [8, 9, 8, 9] },
  { colors: ["rgba(88,28,135,0.45)", "rgba(21,94,117,0.4)", "rgba(136,19,55,0.35)"], shapes: [0, 4, 8, 0] },
  { colors: ["rgba(30,64,175,0.45)", "rgba(124,58,237,0.4)"], shapes: [1, 5, 9, 1] },
  { colors: ["rgba(190,24,93,0.4)", "rgba(2,132,199,0.4)", "rgba(124,58,237,0.3)"], shapes: [2, 6, 2, 6] },
  { colors: ["rgba(21,94,117,0.5)", "rgba(109,40,217,0.4)"], shapes: [3, 7, 3, 7] },
  { colors: ["rgba(136,19,55,0.4)", "rgba(30,64,175,0.4)", "rgba(2,132,199,0.35)"], shapes: [4, 8, 4, 8] },
];

function drawShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  shape: number,
  rotation: number,
  color: string,
  theme: string
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // 3D-style shadow offset
  const shadowOffset = theme === "dark" ? 2 : 1.5;
  const shadowColor = theme === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)";
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = shadowOffset;
  ctx.shadowOffsetY = shadowOffset;

  ctx.fillStyle = color;
  ctx.strokeStyle = color.replace(/[\d.]+\)$/g, "0.3)");
  ctx.lineWidth = 1;

  const s = size;
  ctx.beginPath();

  switch (shape) {
    case 0: // circle
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      break;
    case 1: // square
      ctx.rect(-s, -s, s * 2, s * 2);
      break;
    case 2: // triangle
      for (let i = 0; i < 3; i++) {
        const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
        const px = Math.cos(a) * s * 1.2;
        const py = Math.sin(a) * s * 1.2;
        ctx[i === 0 ? "moveTo" : "lineTo"](px, py);
      }
      ctx.closePath();
      break;
    case 3: // hexagon
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6;
        const px = Math.cos(a) * s;
        const py = Math.sin(a) * s;
        ctx[i === 0 ? "moveTo" : "lineTo"](px, py);
      }
      ctx.closePath();
      break;
    case 4: // star
      for (let i = 0; i < 10; i++) {
        const a = (i * Math.PI) / 5 - Math.PI / 2;
        const r = i % 2 === 0 ? s : s * 0.4;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        ctx[i === 0 ? "moveTo" : "lineTo"](px, py);
      }
      ctx.closePath();
      break;
    case 5: // diamond
      ctx.moveTo(0, -s);
      ctx.lineTo(s, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s, 0);
      ctx.closePath();
      break;
    case 6: // ring
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2, true);
      break;
    case 7: // cross
      ctx.rect(-s * 0.3, -s, s * 0.6, s * 2);
      ctx.rect(-s, -s * 0.3, s * 2, s * 0.6);
      break;
    case 8: // pentagon
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = Math.cos(a) * s;
        const py = Math.sin(a) * s;
        ctx[i === 0 ? "moveTo" : "lineTo"](px, py);
      }
      ctx.closePath();
      break;
    case 9: // simple heart -> use diamond variant
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(s * 1.2, -s * 0.5, s, s * 0.5);
      ctx.quadraticCurveTo(0, s, -s, s * 0.5);
      ctx.quadraticCurveTo(-s * 1.2, -s * 0.5, 0, -s);
      break;
    default:
      ctx.arc(0, 0, s, 0, Math.PI * 2);
  }

  ctx.fill();
  if (shape === 6) ctx.stroke();
  ctx.restore();
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const palettes = theme === "dark" ? DARK_PALETTES : LIGHT_PALETTES;
    const paletteIndex = Math.floor(Date.now() / 86400000) % 10;
    const palette = palettes[paletteIndex];

    const resize = (): void => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 3 + 1.5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      shape: palette.shapes[i % palette.shapes.length],
    }));

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        const color = palette.colors[i % palette.colors.length];
        drawShape(ctx, p.x, p.y, p.size, p.shape, p.rotation, color, theme);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
}
