import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";

/* ── LinkedIn SVG Icon (Native stroke style) ─────────────────── */

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ── Copy-to-clipboard button component ─────────────────────── */

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-line/60">
      <span className="font-mono text-xs sm:text-sm text-ink font-medium truncate select-all">
        {value}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-full border border-gold text-gold bg-transparent hover:bg-gold hover:text-void active:scale-95 transition-all duration-150"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

/* ── Comms Contact Section Component ────────────────────────── */

export function Comms() {
  return (
    <section
      id="comms"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-void border-t border-line relative overflow-hidden w-full max-w-full"
      style={{ contain: "paint" }}
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_10%,rgba(232,38,44,0.08),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ── 1. SECTION HEADLINE ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-block w-8 h-px bg-crimson" />
            <span className="font-tech text-xs tracking-[0.2em] uppercase text-crimson font-semibold">
              Final Sector // Comms Channel
            </span>
            <span className="inline-block w-8 h-px bg-crimson" />
          </div>

          {/* Large Glowing "Get In Touch" Headline in Anton */}
          <h2
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-ink leading-[1.05] tracking-wide"
            style={{
              textShadow:
                "0 0 20px rgba(232,38,44,0.5), 0 0 60px rgba(232,38,44,0.25), 0 0 100px rgba(232,185,74,0.15)",
            }}
          >
            Get In Touch
          </h2>

          <p className="mt-4 text-base md:text-lg text-ink-dim font-body leading-relaxed max-w-[640px] mx-auto">
            Reach out through any of these official channels for queries, partnerships, and participant support.
          </p>
        </motion.div>

        {/* ── 2. OUTER GLOWING CONTAINER ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl bg-panel border-[1.5px] border-gold-dim p-5 sm:p-8 lg:p-10 shadow-[0_0_30px_rgba(232,185,74,0.08),0_0_80px_rgba(232,185,74,0.04),inset_0_1px_0_rgba(232,185,74,0.06)]"
        >
          {/* ── 3. 4-CARD 2x2 GRID ────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* ── TOP ROW — CARD 1: Email ───────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-void-2 border border-line rounded-xl p-5 sm:p-6 flex flex-col justify-between group hover:border-line/80 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-tech text-xs uppercase font-bold tracking-[0.2em] text-gold">
                    OFFICIAL DESK
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-panel-2 border border-cyan/30 flex items-center justify-center text-cyan shadow-[0_0_10px_rgba(79,216,232,0.15)] group-hover:border-cyan/60 group-hover:shadow-[0_0_14px_rgba(79,216,232,0.3)] transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-tech text-xl font-bold uppercase tracking-wide text-ink">
                  Email
                </h3>
                <p className="font-body text-sm text-ink-dim leading-relaxed mt-2 mb-4">
                  For queries, sponsorships, and participant assistance.
                </p>
              </div>

              {/* Value Row with Copy Button */}
              <CopyButton value="info@codways.com" label="Email" />
            </motion.div>

            {/* ── TOP ROW — CARD 2: Phone ───────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="bg-void-2 border border-line rounded-xl p-5 sm:p-6 flex flex-col justify-between group hover:border-line/80 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-tech text-xs uppercase font-bold tracking-[0.2em] text-gold">
                    DIRECT HOTLINE
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-panel-2 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(232,185,74,0.15)] group-hover:border-gold/60 group-hover:shadow-[0_0_14px_rgba(232,185,74,0.3)] transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-tech text-xl font-bold uppercase tracking-wide text-ink">
                  Phone
                </h3>
                <p className="font-body text-sm text-ink-dim leading-relaxed mt-2 mb-4">
                  Direct contact with the organizing team.
                </p>
              </div>

              {/* Value Row with Copy Button */}
              <CopyButton value="+91 9891877741" label="Phone number" />
            </motion.div>

            {/* ── BOTTOM ROW — CARD 3: LinkedIn ─────────────────── */}
            <motion.a
              href="https://www.linkedin.com/company/codways-technologies/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.19 }}
              className="bg-void-2 border border-line rounded-xl p-5 sm:p-6 flex flex-col justify-between group hover:border-line/80 transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-tech text-xs uppercase font-bold tracking-[0.2em] text-gold">
                    PROFESSIONAL NETWORK
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-panel-2 border border-cyan/30 flex items-center justify-center text-cyan shadow-[0_0_10px_rgba(79,216,232,0.15)] group-hover:border-cyan/60 group-hover:shadow-[0_0_14px_rgba(79,216,232,0.3)] transition-all">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-tech text-xl font-bold uppercase tracking-wide text-ink group-hover:text-cyan transition-colors">
                    LinkedIn
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-ink-dim group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="font-body text-sm text-ink-dim leading-relaxed mt-2">
                  Connect with Codways Technologies on LinkedIn for professional announcements, partnership updates, and networking.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-mono text-ink-faint">
                <span>Codways Technologies</span>
                <span className="text-cyan group-hover:underline">Open Profile ↗</span>
              </div>
            </motion.a>

            {/* ── BOTTOM ROW — CARD 4: Physical Realm ───────────── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="bg-void-2 border border-line rounded-xl p-5 sm:p-6 flex flex-col justify-between group hover:border-line/80 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-tech text-xs uppercase font-bold tracking-[0.2em] text-gold">
                    PHYSICAL REALM
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-panel-2 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(232,185,74,0.15)] group-hover:border-gold/60 group-hover:shadow-[0_0_14px_rgba(232,185,74,0.3)] transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-tech text-xl font-bold uppercase tracking-wide text-ink">
                    Codways Technologies HQ
                  </h3>
                  <a
                    href="https://www.codways.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-dim hover:text-gold transition-colors"
                    aria-label="Visit Codways Technologies website"
                  >
                    <ArrowUpRight className="w-4 h-4 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
                <p className="font-body text-sm text-ink-dim leading-relaxed mt-2">
                  Core operational leadership, institutional partnerships, and central technical administration nerve center.
                </p>
              </div>

              {/* Exact location text preserved word-for-word */}
              <div className="mt-4 pt-3 border-t border-line/60 flex items-start gap-2">
                <span className="font-mono text-xs text-ink-dim leading-relaxed select-all">
                  Off. H1A/5&amp;6, B-40, Globus-D Tower, Sector-63, Noida (U.P)-201301
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
