import { motion } from "motion/react";
import {
  BrainCircuit,
  HeartPulse,
  GraduationCap,
  Landmark,
  Leaf,
  Sprout,
  Building2,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ── Directive Data Type & List ──────────────────────────────── */

interface Directive {
  num: string;
  codename: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

const DIRECTIVES: Directive[] = [
  {
    num: "01",
    codename: "SENTINEL",
    title: "AI & Machine Learning",
    description: "Deploy intelligent neural architectures to automate and solve complex real-world anomalies.",
    icon: BrainCircuit,
    tags: ["Neural Nets", "LLMs", "Computer Vision"],
  },
  {
    num: "02",
    codename: "AEGIS",
    title: "Healthcare & MedTech",
    description: "Engineer life-saving digital triage systems, remote care, and predictive medical diagnostics.",
    icon: HeartPulse,
    tags: ["Diagnostics", "Telehealth", "Patient Care"],
  },
  {
    num: "03",
    codename: "BEACON",
    title: "EdTech & Learning",
    description: "Break educational barriers with gamified, inclusive, and adaptive learning platforms.",
    icon: GraduationCap,
    tags: ["Gamification", "Access", "Skill Dev"],
  },
  {
    num: "04",
    codename: "VAULT",
    title: "FinTech & Inclusion",
    description: "Architect secure financial protocols, frictionless payments, and decentralized economy tools.",
    icon: Landmark,
    tags: ["Payments", "DeFi", "Financial Literacy"],
  },
  {
    num: "05",
    codename: "TERRA",
    title: "Sustainability & Climate",
    description: "Build clean-tech solutions for carbon tracking, renewable optimization, and waste reduction.",
    icon: Leaf,
    tags: ["Carbon Tracking", "Clean Energy", "Waste"],
  },
  {
    num: "06",
    codename: "HARVEST",
    title: "Agriculture & Rural Tech",
    description: "Empower farming communities with crop yield prediction, smart sensors, and direct markets.",
    icon: Sprout,
    tags: ["Agritech", "Crop AI", "Supply Chain"],
  },
  {
    num: "07",
    codename: "GRID",
    title: "Smart Cities & Civic Tech",
    description: "Construct resilient urban infrastructure, public safety monitors, and transit optimization.",
    icon: Building2,
    tags: ["Urban Planning", "Transit", "Public Safety"],
  },
  {
    num: "08",
    codename: "WARDEN",
    title: "Cybersecurity",
    description: "Defend digital perimeters against zero-day threats, breach attempts, and data leaks.",
    icon: ShieldCheck,
    tags: ["Zero Trust", "Threat AI", "Privacy"],
  },
  {
    num: "09",
    codename: "WILDCARD",
    title: "Open Innovation",
    description: "Unleash unrestricted creativity — pioneer disruptive concepts across any unlisted domain.",
    icon: Sparkles,
    tags: ["Any Domain", "Wild Idea", "Breakthrough"],
  },
];

/* ── Directives Component ────────────────────────────────────── */

export function Directives() {
  return (
    <section id="directives" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-void-2 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Sector 02 // Mission Directives"
          title="Choose your directive"
          description="Nine sectors of impact. Pick the threat you want to neutralize."
        />

        {/* 3-Column Responsive Grid (1-col mobile, 2-col tablet, 3-col desktop) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {DIRECTIVES.map((directive, index) => {
            const Icon = directive.icon;

            return (
              <motion.div
                key={directive.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ y: -5, borderColor: "#8A6C28" }}
                className="relative bg-panel p-5 sm:p-7 rounded-xl border border-line flex flex-col justify-between group transition-colors duration-200"
              >
                {/* HUD Corner-Bracket Target Framing */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold-dim/40 pointer-events-none group-hover:border-gold-dim/80 transition-colors" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold-dim/40 pointer-events-none group-hover:border-gold-dim/80 transition-colors" />

                <div>
                  {/* Top Row: Directive Number + Codename Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs text-ink-faint font-semibold tracking-wider">
                      DIRECTIVE // {directive.num}
                    </span>
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-cyan bg-cyan/10 border border-cyan/30 px-2.5 py-0.5 rounded-full">
                      {directive.codename}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-crimson-dim/30 border border-crimson/30 text-crimson shrink-0 group-hover:bg-crimson-dim/50 group-hover:border-crimson/50 transition-colors">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-tech text-lg sm:text-xl font-bold uppercase tracking-wide text-ink group-hover:text-gold transition-colors">
                        {directive.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs sm:text-sm text-ink-dim leading-relaxed mb-6">
                    {directive.description}
                  </p>
                </div>

                {/* Bottom Tag Chips */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-line/60">
                  {directive.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-tech text-[10px] uppercase tracking-wider text-ink-faint bg-void-2 border border-line px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
