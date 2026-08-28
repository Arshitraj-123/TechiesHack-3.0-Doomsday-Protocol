import { useState, useEffect } from "react";
import { HeroParticles } from "./HeroParticles";

/* ── Constants ──────────────────────────────────────────────── */

const TARGET_DATE = new Date("2026-09-05T11:00:00+05:30");

/* ── Countdown hook ─────────────────────────────────────────── */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

function useCountdown() {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ── Countdown block ────────────────────────────────────────── */

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative flex flex-col items-center shrink-0">
      {/* Gold gradient bar at top */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="bg-panel/90 backdrop-blur-md border border-line rounded-lg px-2.5 sm:px-4 py-2 sm:py-3 min-w-[58px] min-[360px]:min-w-[64px] sm:min-w-[78px] flex items-center justify-center shadow-md">
        <span className="block font-mono text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl text-ink tabular-nums leading-none whitespace-nowrap select-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 sm:mt-2 font-tech text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-ink-faint font-semibold whitespace-nowrap select-none">
        {label}
      </span>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */

export function Hero() {
  const countdown = useCountdown();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center w-full max-w-full overflow-hidden"
      style={{ contain: "paint" }}
    >
      {/* ═══════════════════ BACKGROUND LAYERS ═══════════════════ */}

      {/* Layer 1 — Full-bleed atmospheric background image (brightness 0.75) */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <img
          src="/hero-bg.jpg"
          alt="TechiesHack 3.0 Doomsday Protocol atmospheric scene"
          className="w-full h-full object-cover brightness-[0.75] object-center sm:object-[center_35%]"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
      </div>

      {/* Layer 2 — Dark vignette gradient overlay (middle 60% is clear) */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-void/90 via-transparent to-void/95"
        style={{ zIndex: 2 }}
      />

      {/* Layer 3 — Subtle ember particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
        <HeroParticles />
      </div>

      {/* Layer 4 — Faint HUD grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          backgroundImage: `
            linear-gradient(rgba(38,42,58,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38,42,58,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 75%)",
        }}
      />

      {/* Layer 5 — Concentric animated orbital rings (responsive SVG vectors) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 5, contain: "paint" }}
      >
        <svg
          className="w-full h-full max-w-[820px] max-h-[820px] pointer-events-none"
          viewBox="0 0 820 820"
          fill="none"
        >
          <circle
            cx="410"
            cy="410"
            r="290"
            stroke="rgba(232,38,44,0.04)"
            strokeWidth="1"
            className="animate-spin-pure origin-center"
          />
          <circle
            cx="410"
            cy="410"
            r="400"
            stroke="rgba(79,216,232,0.03)"
            strokeWidth="1"
            className="animate-spin-pure-reverse origin-center"
          />
        </svg>
      </div>

      {/* ═══════════════════ FOREGROUND CONTENT ═══════════════════ */}

      <div
        className="relative flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-4xl mx-auto pt-32 sm:pt-40 lg:pt-44 pb-12 w-full max-w-full box-border"
        style={{ zIndex: 10 }}
      >
        {/* ── Eyebrow pill badge (responsive text swap & natural wrap) ── */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-gold/40 bg-gold/[0.1] backdrop-blur-md mb-6 sm:mb-8 shadow-lg shadow-gold/10 max-w-full">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inset-0 rounded-full bg-crimson opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-crimson" />
          </span>
          <span className="font-tech text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-gold text-center break-words">
            <span className="min-[420px]:hidden">Codways Technologies</span>
            <span className="hidden min-[420px]:inline">Codways Technologies Presents</span>
          </span>
        </div>

        {/* ── Headline with RGB glitch (fits 320px-1920px seamlessly) ── */}
        <div className="relative mb-4 sm:mb-5 w-full max-w-full">
          {/* Main text */}
          <h1
            className="font-display uppercase text-ink leading-[1.05] tracking-[0.02em] drop-shadow-2xl break-words"
            style={{ fontSize: "clamp(36px, 11vw, 120px)" }}
          >
            TechiesHack 3.0
          </h1>
          {/* Glitch overlay copy */}
          <h1
            aria-hidden="true"
            className="hero-glitch-overlay absolute inset-0 font-display uppercase text-crimson leading-[1.05] tracking-[0.02em] pointer-events-none select-none break-words"
            style={{ fontSize: "clamp(36px, 11vw, 120px)" }}
          >
            TechiesHack 3.0
          </h1>
        </div>

        {/* ── Subtitle (word-wrapping enabled, tighter mobile tracking) ── */}
        <p className="font-tech text-xs sm:text-base md:text-lg font-bold uppercase tracking-[0.1em] sm:tracking-[0.22em] text-cyan mb-4 sm:mb-5 drop-shadow max-w-full break-words">
          Doomsday Protocol <span className="text-cyan/60">·</span> 24-Hour Online Hackathon
        </p>

        {/* ── Tagline ───────────────────────────────────────── */}
        <p className="font-body text-xs sm:text-[15px] text-ink-dim leading-relaxed max-w-xl mb-7 sm:mb-10 text-shadow px-2">
          The clock is counting down on a global build crisis. Assemble your
          squad, pick your directive, and ship a working solution before the
          timer hits zero.
        </p>

        {/* ── Countdown (all 4 blocks in 1 line alignment) ── */}
        <div className="flex items-center justify-center gap-1.5 min-[360px]:gap-2.5 sm:gap-4 mb-8 sm:mb-11 max-w-full">
          <CountdownBlock value={countdown.days} label="Days" />
          <span className="font-mono text-base min-[360px]:text-xl sm:text-3xl text-ink-faint -mt-3.5 sm:-mt-4 select-none shrink-0">
            :
          </span>
          <CountdownBlock value={countdown.hours} label="Hours" />
          <span className="font-mono text-base min-[360px]:text-xl sm:text-3xl text-ink-faint -mt-3.5 sm:-mt-4 select-none shrink-0">
            :
          </span>
          <CountdownBlock value={countdown.minutes} label="Mins" />
          <span className="font-mono text-base min-[360px]:text-xl sm:text-3xl text-ink-faint -mt-3.5 sm:-mt-4 select-none shrink-0">
            :
          </span>
          <CountdownBlock value={countdown.seconds} label="Secs" />
        </div>

        {/* ── CTA buttons ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-full">
          <a
            href="#enlist"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-crimson text-white font-tech text-xs sm:text-sm font-bold uppercase tracking-[0.14em] rounded-lg hover:bg-red-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg shadow-crimson/30 hover:shadow-xl hover:shadow-crimson/45 w-full sm:w-auto text-center"
          >
            <span>Enlist Your Squad</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#briefing"
            className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 border border-line bg-panel/70 backdrop-blur-md text-ink-dim font-tech text-xs sm:text-sm font-bold uppercase tracking-[0.14em] rounded-lg hover:border-cyan hover:text-cyan transition-all duration-200 w-full sm:w-auto text-center"
          >
            View Mission Briefing
          </a>
        </div>
      </div>

      {/* ── Scroll indicator (in-flow below content, with bottom padding) ── */}
      <div
        className="relative pt-6 pb-12 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="font-tech text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-ink-faint font-semibold">
          Scroll
        </span>
        <div className="w-px h-7 sm:h-9 bg-gradient-to-b from-ink-faint/60 to-transparent origin-top animate-scroll-line" />
      </div>
    </section>
  );
}
