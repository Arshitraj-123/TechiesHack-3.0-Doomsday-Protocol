import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { REGISTRATION_FORM_URL, WHATSAPP_GROUP_URL } from "@/constants/links";

/* ── Enlist Info Pills ──────────────────────────────────────── */

const INFO_PILLS = [
  { label: "Entry Fee", value: "₹200" },
  { label: "Closes", value: "31 Aug 2026" },
  { label: "Mode", value: "100% Online" },
] as const;

export function Enlist() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="enlist"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-void border-t border-line relative overflow-hidden flex items-center justify-center text-center"
    >
      {/* ── Radial Crimson Glow Background ───────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(232,38,44,0.18) 0%, rgba(232,38,44,0.04) 50%, transparent 75%)",
        }}
      />

      {/* Subtle Background Tech Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(38,42,58,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38,42,58,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 15%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 15%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-4xl relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          className="flex items-center justify-center gap-3 mb-5 sm:mb-6"
        >
          <span className="inline-block w-8 sm:w-10 h-px bg-crimson" />
          <span className="font-tech text-xs sm:text-sm tracking-[0.25em] uppercase text-crimson font-semibold">
            Final Call // Enlist
          </span>
          <span className="inline-block w-8 sm:w-10 h-px bg-crimson" />
        </motion.div>

        {/* Huge Anton Headline */}
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ink uppercase tracking-wide leading-[1.05]"
        >
          The countdown won&apos;t wait.{" "}
          <span className="text-gradient-crimson drop-shadow-[0_0_30px_rgba(232,38,44,0.4)]">
            Will you?
          </span>
        </motion.h2>

        {/* Short Supporting Line */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.18 }}
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-ink-dim font-body max-w-2xl leading-relaxed"
        >
          Assemble your squad, lock in your directive, and secure mission clearance
          before the operation begins. 24 hours to engineer what matters.
        </motion.p>

        {/* ── Row of 3 Info Pills (styled like Mission Briefing) ── */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.25 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {INFO_PILLS.map((pill, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-line bg-panel/70 backdrop-blur-sm hover:border-gold-dim transition-colors duration-200 shadow-md"
            >
              <span className="text-[9px] text-gold select-none">◆</span>
              <span className="font-tech text-xs sm:text-sm font-semibold tracking-wider text-ink uppercase">
                <span className="text-ink-dim">{pill.label}:</span>{" "}
                <span className="font-mono text-gold">{pill.value}</span>
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Two CTA Buttons ─────────────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.32 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href={REGISTRATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto text-center group"
          >
            <span>Enlist Your Squad</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto text-center"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Join WhatsApp Group</span>
          </a>
        </motion.div>

        {/* ── Secondary QR Code Panel (max-width ~220px, centered) ── */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.38 }}
          className="mt-12 sm:mt-14 flex flex-col items-center w-full"
        >
          <div className="w-full max-w-[240px] bg-panel/85 border border-line rounded-xl p-4 sm:p-5 flex flex-col items-center text-center shadow-[0_0_30px_rgba(232,38,44,0.18)] relative group hover:border-gold-dim/60 transition-all duration-300">
            {/* Caption above QR */}
            <span className="font-tech text-[11px] uppercase tracking-wider text-ink-faint font-semibold mb-3">
              Scanning from a poster or screen?
            </span>

            {/* White QR Code Square with Corner-Bracket HUD Decoration */}
            <div className="relative p-2.5 bg-white rounded-lg shadow-md">
              {/* Corner-Bracket HUD Decoration (Gold L-shaped borders) */}
              <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-gold pointer-events-none" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-gold pointer-events-none" />

              {/* QR Code Image (Guaranteed min 140px on all mobile viewports) */}
              <img
                src="/registration-qr.png"
                alt="Scan to Enlist — Google Form Registration QR Code"
                width={160}
                height={160}
                className="w-36 h-36 min-w-[140px] min-h-[140px] sm:w-40 sm:h-40 object-contain block select-none"
                loading="lazy"
              />
            </div>

            {/* Caption below QR */}
            <span className="font-tech text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-gold mt-3">
              Scan to Enlist
            </span>
          </div>
        </motion.div>

        {/* Small Disclaimer / Placeholder Caption */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.44 }}
          className="mt-6 font-mono text-[11px] text-ink-faint max-w-md"
        >
          * Note: Use either the direct registration button above or scan the QR code to access the official enlistment form.
        </motion.p>
      </div>
    </section>
  );
}
