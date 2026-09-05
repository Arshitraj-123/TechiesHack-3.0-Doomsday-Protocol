import { motion, useReducedMotion } from "motion/react";
import {
  Lightbulb,
  Code2,
  Presentation,
  Settings,
  Paintbrush,
  Target,
  TrendingUp,
  Users,
  Hexagon,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   Sector 05 — Evaluation Protocol
   Fully vector-rendered hex radial diagram — zero raster images.
   Every hexagon, line, marker and text element is crisp SVG/DOM.
   ═══════════════════════════════════════════════════════════════ */

/* ── Types & Constants ────────────────────────────────────────── */

interface Criterion {
  id: number;
  name: string;
  desc: string;
  weight: number;
  color: string;
  dim: string;
  icon: LucideIcon;
  /** Desktop hex-badge center — % of diagram container */
  x: number;
  y: number;
  /** Text card extends to this side of the hex badge */
  side: "L" | "R";
}

/** Hub center coordinates (% of diagram container) */
const HUB_X = 50;
const HUB_Y = 46;
const HEX_SIZE = 56;
const HUB_HEX = 80;

/**
 * Judging criteria — 7 nodes summing to exactly 100%.
 * 20 + 25 + 15 + 15 + 10 + 10 + 5 = 100 ✓
 */
const CRITERIA: Criterion[] = [
  { id: 1, name: "Innovation & Originality",     desc: "Originality and uniqueness of idea and approach.",         weight: 20, color: "#E8262C", dim: "#7A1015", icon: Lightbulb,    x: 50, y: 8,  side: "R" },
  { id: 2, name: "Technical Implementation",     desc: "Depth of technology, tools used and technical execution.", weight: 25, color: "#4FD8E8", dim: "#1A6B75", icon: Code2,        x: 77, y: 24, side: "R" },
  { id: 3, name: "Problem Statement & Relevance",desc: "Real-world impact and relevance to the given theme.",     weight: 15, color: "#E8B94A", dim: "#8A6C28", icon: Presentation, x: 80, y: 50, side: "R" },
  { id: 4, name: "Functionality & Prototype",    desc: "How well the solution works and solves the problem.",     weight: 15, color: "#22C55E", dim: "#0D5C2B", icon: Settings,     x: 73, y: 76, side: "R" },
  { id: 5, name: "UI/UX & Experience",           desc: "User experience, interface design and visual appeal.",    weight: 10, color: "#A855F7", dim: "#5B21B6", icon: Paintbrush,   x: 27, y: 76, side: "L" },
  { id: 6, name: "Impact & Scalability",         desc: "Potential for growth and future enhancements.",           weight: 10, color: "#38BDF8", dim: "#0C5DAB", icon: Target,       x: 20, y: 50, side: "L" },
  { id: 7, name: "Presentation & Demo",          desc: "Clarity of communication, demo and storytelling.",        weight: 5,  color: "#F59E0B", dim: "#8A5A06", icon: TrendingUp,   x: 23, y: 24, side: "L" },
];

const SUMMARY = [
  { icon: Hexagon,     label: "Total Weightage", value: "100%",                                 accent: "#E8262C" },
  { icon: Users,       label: "Judging Panel",   value: "Industry Experts & Tech Leaders",      accent: "#9BA0B4" },
  { icon: ShieldCheck, label: "Evaluation",       value: "Transparent. Fair. Impact-driven.",    accent: "#4FD8E8" },
  { icon: Rocket,      label: "Your Mission",     value: "Solve. Build. Impact. Make it count.", accent: "#E8B94A" },
];

/* ── SVG Geometry Helpers ─────────────────────────────────────── */

/** Pointy-topped hexagon SVG polygon `points` string. */
function hexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

/* ── Glossy Beveled Hexagon Badge (pure SVG + DOM icon) ──────── */

function GlossyHex({
  color,
  dim,
  icon: Icon,
  size = HEX_SIZE,
  isHub = false,
}: {
  color: string;
  dim: string;
  icon: LucideIcon;
  size?: number;
  isHub?: boolean;
}) {
  const c = size / 2;
  // Unique ID prefix per color+role to avoid SVG def collisions
  const u = `gh${color.slice(1)}${isHub ? "H" : ""}`;
  const iconSz = isHub ? Math.round(size * 0.36) : Math.round(size * 0.34);

  return (
    <div
      className="relative flex-shrink-0 hex-pulse-glow"
      style={{ width: size, height: size }}
    >
      {/* SVG Hexagon Layers */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
        aria-hidden="true"
      >
        <defs>
          {/* Radial gradient — bright glowing core fading to deep metallic edge */}
          <radialGradient id={`${u}F`} cx="40%" cy="28%" r="78%">
            <stop offset="0%" stopColor={color} stopOpacity="0.95" />
            <stop offset="48%" stopColor={dim} stopOpacity="0.82" />
            <stop offset="100%" stopColor="#080a12" stopOpacity="0.92" />
          </radialGradient>

          {/* Linear gradient — specular gloss highlight (top → transparent) */}
          <linearGradient id={`${u}G`} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.32" />
            <stop offset="28%" stopColor="#fff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          {/* Drop-shadow glow filter */}
          <filter id={`${u}W`} x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation={isHub ? "7" : "4.5"}
              floodColor={color}
              floodOpacity="0.7"
            />
          </filter>

          {/* Clip mask — upper 44% for specular highlight */}
          <clipPath id={`${u}U`}>
            <rect x="0" y="0" width={size} height={size * 0.44} />
          </clipPath>
        </defs>

        {/* Layer 1 — Outer luminous glow ring */}
        <polygon
          points={hexPts(c, c, c * 0.97)}
          fill="none"
          stroke={color}
          strokeWidth={isHub ? "2" : "1.5"}
          strokeOpacity="0.45"
          filter={`url(#${u}W)`}
        />

        {/* Layer 2 — Metallic bevel mid-ring */}
        <polygon
          points={hexPts(c, c, c * 0.90)}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.22"
        />

        {/* Layer 3 — Main face with radial gradient */}
        <polygon
          points={hexPts(c, c, c * 0.87)}
          fill={`url(#${u}F)`}
        />

        {/* Layer 4 — Inner fine border trim */}
        <polygon
          points={hexPts(c, c, c * 0.83)}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity="0.18"
        />

        {/* Layer 5 — Specular glass highlight (upper facet only) */}
        <polygon
          points={hexPts(c, c, c * 0.85)}
          fill={`url(#${u}G)`}
          clipPath={`url(#${u}U)`}
        />
      </svg>

      {/* DOM Icon — overlaid on top of SVG for cross-browser reliability */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Icon
          style={{
            width: iconSz,
            height: iconSz,
            color: "#fff",
            filter: "drop-shadow(0 0 3px rgba(255,255,255,0.35))",
          }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Protocol Section
   ══════════════════════════════════════════════════════════════ */

export function Protocol() {
  const reduced = useReducedMotion();
  const noAnim = !!reduced;

  return (
    <section
      id="protocol"
      className="py-16 sm:py-24 bg-void relative overflow-hidden flex flex-col items-center w-full max-w-full"
      style={{ contain: "paint" }}
    >
      {/* ── Atmospheric Background ────────────────────────────── */}

      {/* Centered crimson core spotlight */}
      <div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[min(750px,92vw)] h-[min(750px,92vw)] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(232,38,44,0.18) 0%, rgba(122,16,21,0.05) 45%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />

      {/* Top ambient radial beam */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(232,38,44,0.08),transparent)] pointer-events-none z-0" />

      {/* SVG feTurbulence noise grain — "rocky asteroid" atmosphere */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      >
        <filter id="proto-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#proto-noise)"
          opacity="0.035"
        />
      </svg>

      {/* ── Section Heading ───────────────────────────────────── */}

      <motion.div
        initial={noAnim ? false : { opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: noAnim ? 0 : 0.45 }}
        className="flex items-center justify-center gap-3.5 mb-4 sm:mb-5 z-20"
      >
        <span className="inline-block w-8 sm:w-12 h-px bg-crimson" />
        <span className="font-tech text-xs sm:text-sm tracking-[0.25em] uppercase text-crimson font-semibold">
          Sector 05 // Evaluation Protocol
        </span>
        <span className="inline-block w-8 sm:w-12 h-px bg-crimson" />
      </motion.div>

      <motion.h2
        initial={noAnim ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: noAnim ? 0 : 0.5, delay: noAnim ? 0 : 0.1 }}
        className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink uppercase leading-[1.1] tracking-wide text-center mb-3 z-20 px-4"
      >
        How you'll be{" "}
        <span className="text-gradient-crimson">judged</span>
      </motion.h2>

      <motion.p
        initial={noAnim ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: noAnim ? 0 : 0.4, delay: noAnim ? 0 : 0.2 }}
        className="font-tech text-sm sm:text-base tracking-[0.1em] uppercase text-ink-dim text-center mb-10 sm:mb-14 z-20 px-4"
      >
        Seven weighted parameters. One independent panel.
      </motion.p>

      {/* ══════════════════════════════════════════════════════════
          Desktop Radial Hex Diagram (visible lg+)
          Container: aspect-ratio 16/11, max-w 1200px
          SVG viewBox 1600×1100 maps 1:1 to CSS % positions.
          ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block w-full max-w-[1200px] mx-auto px-4 z-10">
        <div className="relative w-full" style={{ aspectRatio: "16 / 11" }}>

          {/* ─── SVG Connector Lines & Diamond Junction Markers ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1600 1100"
            preserveAspectRatio="none"
            style={{ zIndex: 5 }}
            aria-hidden="true"
          >
            <defs>
              {/* Gradient per connector: crimson hub → node accent */}
              {CRITERIA.map((n) => (
                <linearGradient
                  key={`clg${n.id}`}
                  id={`clg${n.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1={HUB_X * 16}
                  y1={HUB_Y * 11}
                  x2={n.x * 16}
                  y2={n.y * 11}
                >
                  <stop offset="0%" stopColor="#E8262C" stopOpacity="0.55" />
                  <stop offset="100%" stopColor={n.color} stopOpacity="0.55" />
                </linearGradient>
              ))}

              {/* Blur filter for glow lines */}
              <filter id="cblur">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {CRITERIA.map((n, i) => {
              const hx = HUB_X * 16;
              const hy = HUB_Y * 11;
              const nx = n.x * 16;
              const ny = n.y * 11;
              const d = `M${hx},${hy} L${nx},${ny}`;
              const len = Math.sqrt((nx - hx) ** 2 + (ny - hy) ** 2);
              const delay = noAnim ? 0 : 0.35 + i * 0.09;

              return (
                <g key={n.id}>
                  {/* Soft glow line (wider, blurred) */}
                  <motion.path
                    d={d}
                    stroke={n.color}
                    strokeWidth="8"
                    fill="none"
                    opacity="0.12"
                    filter="url(#cblur)"
                    strokeDasharray={len}
                    initial={{ strokeDashoffset: len }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: noAnim ? 0 : 0.5,
                      delay,
                      ease: "easeOut",
                    }}
                  />

                  {/* Sharp gradient line */}
                  <motion.path
                    d={d}
                    stroke={`url(#clg${n.id})`}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={len}
                    initial={{ strokeDashoffset: len }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: noAnim ? 0 : 0.5,
                      delay,
                      ease: "easeOut",
                    }}
                  />

                  {/* Diamond marker — hub end */}
                  <motion.rect
                    x={hx - 5}
                    y={hy - 5}
                    width="10"
                    height="10"
                    fill="#E8262C"
                    fillOpacity="0.7"
                    transform={`rotate(45,${hx},${hy})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: noAnim ? 0 : 0.2,
                      delay,
                    }}
                  />

                  {/* Diamond marker — node end */}
                  <motion.rect
                    x={nx - 5}
                    y={ny - 5}
                    width="10"
                    height="10"
                    fill={n.color}
                    fillOpacity="0.8"
                    transform={`rotate(45,${nx},${ny})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: noAnim ? 0 : 0.2,
                      delay: noAnim ? 0 : delay + 0.35,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* ─── Central Hub ────────────────────────────────────── */}
          <motion.div
            className="absolute z-20"
            style={{
              left: `${HUB_X}%`,
              top: `${HUB_Y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={noAnim ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: noAnim ? 0 : 0.55, ease: "easeOut" }}
          >
            <GlossyHex
              color="#E8262C"
              dim="#7A1015"
              icon={Users}
              size={HUB_HEX}
              isHub
            />
          </motion.div>

          {/* Hub label — positioned just below the hub hex */}
          <motion.p
            className="absolute z-20 font-tech text-[9px] sm:text-[10px] text-center uppercase tracking-[0.15em] font-semibold whitespace-nowrap"
            style={{
              left: `${HUB_X}%`,
              top: `calc(${HUB_Y}% + ${HUB_HEX / 2 + 6}px)`,
              transform: "translateX(-50%)",
              color: "#E8262C",
              textShadow: "0 0 10px rgba(232,38,44,0.35)",
            }}
            initial={noAnim ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: noAnim ? 0 : 0.4, delay: noAnim ? 0 : 0.3 }}
          >
            Independent
            <br />
            Judging Panel
          </motion.p>

          {/* ─── 7 Criterion Nodes (Hex + Text Card) ───────────── */}
          {CRITERIA.map((n, i) => {
            const nodeDelay = noAnim ? 0 : 0.65 + i * 0.09;
            const textDelay = noAnim ? 0 : nodeDelay + 0.12;
            const isR = n.side === "R";

            return (
              <div key={n.id}>
                {/* Hex badge at exact diagram coordinate */}
                <motion.div
                  className="absolute z-20"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={
                    noAnim ? false : { opacity: 0, scale: 0.5 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: noAnim ? 0 : 0.4,
                    delay: nodeDelay,
                    ease: "easeOut",
                  }}
                >
                  <GlossyHex
                    color={n.color}
                    dim={n.dim}
                    icon={n.icon}
                  />
                </motion.div>

                {/* Text card — offset to the appropriate side */}
                <motion.div
                  className="absolute z-20"
                  style={{
                    top: `${n.y}%`,
                    transform: "translateY(-50%)",
                    ...(isR
                      ? {
                          left: `calc(${n.x}% + ${HEX_SIZE / 2 + 10}px)`,
                        }
                      : {
                          right: `calc(${100 - n.x}% + ${HEX_SIZE / 2 + 10}px)`,
                        }),
                  }}
                  initial={
                    noAnim
                      ? false
                      : { opacity: 0, x: isR ? -10 : 10 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: noAnim ? 0 : 0.35,
                    delay: textDelay,
                  }}
                >
                  <div
                    className="relative bg-panel/80 backdrop-blur-sm border border-line/50 rounded-lg px-3.5 py-2.5 w-[168px]"
                    style={{ borderColor: `${n.color}22` }}
                  >
                    {/* HUD corner accents */}
                    <div
                      className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l pointer-events-none"
                      style={{ borderColor: `${n.color}40` }}
                    />
                    <div
                      className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r pointer-events-none"
                      style={{ borderColor: `${n.color}40` }}
                    />

                    {/* Number badge + Title */}
                    <div className="flex items-start gap-2 mb-1">
                      <span
                        className="font-mono text-[10px] leading-none w-[20px] h-[20px] rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          borderColor: n.color,
                          color: n.color,
                        }}
                      >
                        {String(n.id).padStart(2, "0")}
                      </span>
                      <h4
                        className="font-tech text-xs font-bold uppercase tracking-wider leading-tight"
                        style={{ color: n.color }}
                      >
                        {n.name}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="font-body text-[11px] text-ink-dim leading-snug mb-1.5">
                      {n.desc}
                    </p>

                    {/* Weight percentage */}
                    <span
                      className="font-mono text-xl font-bold block"
                      style={{
                        color: n.color,
                        textShadow: `0 0 12px ${n.color}40`,
                      }}
                    >
                      {n.weight}%
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          Mobile / Tablet Card Stack (below lg)
          ══════════════════════════════════════════════════════ */}
      <div className="lg:hidden w-full max-w-2xl mx-auto px-4 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hub Card — spans full width on sm */}
          <motion.div
            className="sm:col-span-2 bg-panel border border-crimson/30 rounded-xl p-5 flex items-center gap-4"
            initial={noAnim ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: noAnim ? 0 : 0.45 }}
          >
            <GlossyHex
              color="#E8262C"
              dim="#7A1015"
              icon={Users}
              size={64}
              isHub
            />
            <div>
              <p className="font-tech text-xs uppercase tracking-[0.15em] text-crimson font-semibold">
                Independent Judging Panel
              </p>
              <p className="font-body text-xs text-ink-dim mt-1">
                Seven criteria evaluated by industry experts &amp; mentors.
              </p>
            </div>
          </motion.div>

          {/* 7 Criterion Cards */}
          {CRITERIA.map((n, i) => (
            <motion.div
              key={n.id}
              className="bg-panel border border-line rounded-xl p-4 flex items-start gap-3.5 relative overflow-hidden"
              style={{ borderColor: `${n.color}18` }}
              initial={noAnim ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: noAnim ? 0 : 0.4,
                delay: noAnim ? 0 : i * 0.06,
              }}
            >
              {/* HUD corners */}
              <div
                className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l pointer-events-none"
                style={{ borderColor: `${n.color}40` }}
              />
              <div
                className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r pointer-events-none"
                style={{ borderColor: `${n.color}40` }}
              />

              <GlossyHex
                color={n.color}
                dim={n.dim}
                icon={n.icon}
                size={48}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-[9px] w-[18px] h-[18px] rounded-full border flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: n.color, color: n.color }}
                  >
                    {String(n.id).padStart(2, "0")}
                  </span>
                  <h4
                    className="font-tech text-xs font-bold uppercase tracking-wider leading-tight"
                    style={{ color: n.color }}
                  >
                    {n.name}
                  </h4>
                </div>
                <p className="font-body text-[11px] text-ink-dim leading-snug mb-1.5">
                  {n.desc}
                </p>
                <span
                  className="font-mono text-2xl font-bold"
                  style={{
                    color: n.color,
                    textShadow: `0 0 10px ${n.color}30`,
                  }}
                >
                  {n.weight}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          Bottom Summary Bar — single bordered HUD panel,
          4 segments split by thin vertical dividers.
          ══════════════════════════════════════════════════════ */}
      <motion.div
        className="w-full max-w-5xl mx-auto px-4 mt-10 sm:mt-14 z-10"
        initial={noAnim ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: noAnim ? 0 : 0.5,
          delay: noAnim ? 0 : 0.3,
        }}
      >
        <div className="border border-line rounded-xl bg-panel/70 backdrop-blur-sm flex flex-wrap">
          {SUMMARY.map((item, i) => (
            <div
              key={i}
              className={`flex-1 basis-[220px] p-4 sm:p-5 flex items-center gap-3${
                i < SUMMARY.length - 1
                  ? " border-b lg:border-b-0 lg:border-r border-line"
                  : ""
              }`}
            >
              <item.icon
                className="w-5 h-5 flex-shrink-0"
                style={{ color: item.accent }}
              />
              <div className="min-w-0">
                <span className="font-tech text-[10px] uppercase tracking-[0.15em] text-ink-faint block">
                  {item.label}
                </span>
                <span
                  className={`font-mono text-sm font-semibold ${
                    i === 0 ? "" : "text-ink"
                  }`}
                  style={i === 0 ? { color: item.accent } : undefined}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
