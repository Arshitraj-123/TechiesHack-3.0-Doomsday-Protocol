import { motion, useReducedMotion } from "motion/react";

export function Protocol() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="protocol"
      className="py-16 sm:py-24 bg-void relative overflow-hidden flex flex-col items-center w-full max-w-full"
      style={{ contain: "paint" }}
    >
      {/* ── Background Atmospheric Lighting ──────────────────────── */}
      {/* Center crimson core glow positioned behind the hub */}
      <div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[min(580px,95vw)] sm:w-[min(850px,90vw)] lg:w-[850px] h-[min(580px,95vw)] sm:h-[min(850px,90vw)] lg:h-[850px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,38,44,0.16) 0%, rgba(232,38,44,0.04) 50%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      {/* Top subtle ambient beam */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(232,38,44,0.1),transparent)] pointer-events-none" />

      {/* ── Section Eyebrow ──────────────────────────────────────── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
        className="flex items-center justify-center gap-3.5 mb-4 sm:mb-6 z-20"
      >
        <span className="inline-block w-8 sm:w-12 h-px bg-crimson" />
        <span className="font-tech text-xs sm:text-sm tracking-[0.25em] uppercase text-crimson font-semibold">
          Sector 05 // Evaluation Protocol
        </span>
        <span className="inline-block w-8 sm:w-12 h-px bg-crimson" />
      </motion.div>

      {/* ── Full-Scale Integrated Protocol Canvas ────────────────── */}
      <div className="w-full max-w-[1380px] mx-auto px-2 sm:px-4 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: "easeOut" }}
          className="relative w-full overflow-hidden"
          style={{
            /* Smooth radial mask to feather all edges seamlessly into the page's void background */
            maskImage:
              "radial-gradient(ellipse 96% 92% at 50% 50%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 96% 92% at 50% 50%, black 82%, transparent 100%)",
          }}
        >
          {/* Edge dissolving gradient overlays so boundaries are completely invisible */}
          <div className="absolute inset-x-0 top-0 h-10 sm:h-16 bg-gradient-to-b from-void via-void/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-void via-void/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-void via-void/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-void via-void/40 to-transparent pointer-events-none z-10" />

          {/* High-Resolution Protocol System Image */}
          <img
            src={`${import.meta.env.BASE_URL}images/protocol-large.png`}
            srcSet={`${import.meta.env.BASE_URL}images/protocol-full.png 900w, ${import.meta.env.BASE_URL}images/protocol-full@2x.png 1400w, ${import.meta.env.BASE_URL}images/protocol-large.png 1920w`}
            sizes="(max-width: 900px) 100vw, (max-width: 1400px) 95vw, 1380px"
            alt="How You'll Be Judged - Evaluation Protocol"
            className="w-full h-auto object-contain block select-none"
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
