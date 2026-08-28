import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      /* ── Custom colour tokens ─────────────────────────────── */
      colors: {
        void: {
          DEFAULT: "#07080C",
          2: "#0C0E15",
        },
        panel: {
          DEFAULT: "#12141D",
          2: "#171A26",
        },
        line: "#262A3A",
        crimson: {
          DEFAULT: "#E8262C",
          dim: "#7A1015",
        },
        gold: {
          DEFAULT: "#E8B94A",
          dim: "#8A6C28",
        },
        cyan: "#4FD8E8",
        ink: {
          DEFAULT: "#EDEEF3",
          dim: "#9BA0B4",
          faint: "#5B5F72",
        },
      },

      /* ── Font-family stacks ───────────────────────────────── */
      fontFamily: {
        display: ["Anton", "sans-serif"],
        tech: ["Rajdhani", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },

      /* ── Useful extras ────────────────────────────────────── */
      borderColor: {
        DEFAULT: "#262A3A",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(4px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-reverse": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(-360deg)" },
        },
        "spin-centered": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
        "scroll-line": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top", opacity: "1" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom", opacity: "0" },
        },
      },
      animation: {
        scanline: "scanline 0.12s steps(2) infinite",
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin-centered 40s linear infinite",
        "spin-slow-reverse": "spin-reverse 45s linear infinite",
        "scroll-line": "scroll-line 2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
