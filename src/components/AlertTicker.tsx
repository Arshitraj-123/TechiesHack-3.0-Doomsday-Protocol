import { useEffect, useRef } from "react";

const TICKER_PHRASES = [
  "24-HOUR ONLINE HACKATHON",
  "5–6 SEPTEMBER 2026",
  "₹200 ENTRY FEE",
  "REGISTRATIONS CLOSE 31 AUG",
  "CASH PRIZES & CERTIFICATES",
  "OPEN TO ALL COLLEGE YEARS",
];

const SEPARATOR = "   ◆   ";
const FULL_STRING = TICKER_PHRASES.join(SEPARATOR) + SEPARATOR;

/**
 * Thin crimson strip with an infinitely scrolling horizontal marquee.
 * Built with HTML5 Canvas for zero DOM-overflow overhead and buttery smooth 60fps rendering.
 */
export function AlertTicker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;
    let textWidth = 0;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width || window.innerWidth;
      const displayHeight = 34;

      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const isMobile = displayWidth < 640;
      const fontSize = isMobile ? 11 : 12;
      ctx.font = `700 ${fontSize}px Rajdhani, Anton, sans-serif`;
      textWidth = ctx.measureText(FULL_STRING).width;
    };

    setup();
    document.fonts.ready.then(setup);

    const handleResize = () => {
      setup();
    };

    window.addEventListener("resize", handleResize);

    const speed = 0.8; // px per frame

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = 34;

      ctx.clearRect(0, 0, w, h);

      // Crimson bar
      ctx.fillStyle = "#E8262C";
      ctx.fillRect(0, 0, w, h);

      // Text styling
      const isMobile = w < 640;
      const fontSize = isMobile ? 11 : 12;
      ctx.font = `700 ${fontSize}px Rajdhani, Anton, sans-serif`;
      ctx.fillStyle = "#EDEEF3";
      ctx.textBaseline = "middle";

      offset += speed;
      if (textWidth > 0 && offset >= textWidth) {
        offset -= textWidth;
      }

      let currentX = -offset;
      while (currentX < w) {
        ctx.fillText(FULL_STRING, currentX, h / 2);
        currentX += textWidth;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-full bg-crimson overflow-hidden select-none"
      style={{ height: "34px", contain: "paint" }}
      role="region"
      aria-label="Event Highlights Announcement"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ height: "34px", width: "100%" }}
      >
        {FULL_STRING}
      </canvas>
    </div>
  );
}
