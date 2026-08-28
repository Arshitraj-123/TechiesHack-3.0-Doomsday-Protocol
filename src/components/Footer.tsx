import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-void border-t border-line py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Tech Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_100%,rgba(232,38,44,0.06),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-line/60">
          {/* ── Brand Block (Left, 2 columns on lg) ──────────────── */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group mb-4">
              <div className="relative w-9 h-9 rotate-45 rounded-[4px] bg-gradient-to-br from-crimson to-crimson-dim flex items-center justify-center shadow-lg shadow-crimson/20 group-hover:shadow-crimson/40 transition-shadow">
                <span className="-rotate-45 font-display text-[13px] text-white tracking-wider select-none leading-none">
                  TH
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-tech text-base font-bold tracking-[0.12em] text-ink uppercase">
                  TechiesHack 3.0
                </span>
                <span className="font-tech text-[10px] font-medium tracking-[0.15em] text-gold uppercase mt-0.5">
                  Codways Hackathon 2026
                </span>
              </div>
            </a>

            {/* One-Line Description */}
            <p className="font-body text-xs sm:text-sm text-ink-dim leading-relaxed max-w-sm mb-6">
              A high-stakes 24-hour online operation empowering student innovators to
              engineer and deploy production-ready solutions for critical global directives.
            </p>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-panel-2 font-mono text-[10px] uppercase tracking-wider text-ink-dim">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Systems Nominal // 2026 Active</span>
            </div>
          </div>

          {/* ── Column 1: Field Manual (Navigation Links) ─────────── */}
          <div>
            <h4 className="font-tech text-xs font-bold uppercase tracking-[0.2em] text-gold mb-4 sm:mb-5">
              Field Manual
            </h4>
            <ul className="space-y-2.5 font-body text-xs sm:text-sm text-ink-dim">
              <li>
                <a
                  href="#briefing"
                  className="hover:text-ink hover:translate-x-0.5 inline-block transition-all"
                >
                  Mission Briefing
                </a>
              </li>
              <li>
                <a
                  href="#directives"
                  className="hover:text-ink hover:translate-x-0.5 inline-block transition-all"
                >
                  Directives
                </a>
              </li>
              <li>
                <a
                  href="#corridor"
                  className="hover:text-ink hover:translate-x-0.5 inline-block transition-all"
                >
                  Timeline
                </a>
              </li>
              <li>
                <a
                  href="#protocol"
                  className="hover:text-ink hover:translate-x-0.5 inline-block transition-all"
                >
                  Protocol
                </a>
              </li>
            </ul>
          </div>

          {/* ── Column 2: Comms Channels ─────────────────────────── */}
          <div>
            <h4 className="font-tech text-xs font-bold uppercase tracking-[0.2em] text-crimson mb-4 sm:mb-5">
              Comms Channels
            </h4>
            <ul className="space-y-2.5 font-body text-xs sm:text-sm text-ink-dim">
              <li>
                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>WhatsApp Group</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="#comms"
                  className="hover:text-cyan inline-flex items-center gap-1 transition-colors"
                >
                  <span>Google Meet Checkpoints</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@codways.com"
                  className="hover:text-gold inline-flex items-center gap-1 transition-colors font-mono text-xs"
                >
                  <span>info@codways.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Column 3: Key Dates ──────────────────────────────── */}
          <div>
            <h4 className="font-tech text-xs font-bold uppercase tracking-[0.2em] text-ink mb-4 sm:mb-5">
              Key Dates
            </h4>
            <ul className="space-y-3 font-body text-xs sm:text-sm text-ink-dim">
              <li className="flex flex-col">
                <span className="font-tech text-xs font-bold uppercase text-ink">
                  Reg. Closes
                </span>
                <span className="font-mono text-xs text-gold">31 Aug 2026</span>
              </li>
              <li className="flex flex-col">
                <span className="font-tech text-xs font-bold uppercase text-ink">
                  Hackathon
                </span>
                <span className="font-mono text-xs text-crimson">5–6 Sept 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ───────────────────────────────────────── */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Copyright */}
          <div className="font-mono text-xs text-ink-faint">
            © 2026 TechiesHack · Codways Technologies. All rights reserved.
          </div>

          {/* Tagline */}
          <div className="font-tech text-xs tracking-[0.25em] uppercase text-gold font-bold select-none">
            Build · Innovate · Solve
          </div>
        </div>
      </div>
    </footer>
  );
}
