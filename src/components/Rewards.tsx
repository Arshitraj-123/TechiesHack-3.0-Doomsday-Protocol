import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ── Vault Data ─────────────────────────────────────────────── */

interface VaultData {
  id: number;
  cache: string;
  rank: string;
  roman: string;
  color: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  glowColor: string;
  glowShadow: string;
  image: string;
  title: string;
  description: string;
}

const VAULTS: VaultData[] = [
  {
    id: 0,
    cache: "CACHE I",
    rank: "RANK 01",
    roman: "I",
    color: "#E8B94A",
    textColor: "text-gold",
    borderColor: "border-gold",
    bgColor: "bg-gold/10",
    glowColor: "rgba(232,185,74,0.35)",
    glowShadow: "0 0 25px rgba(232, 185, 74, 0.5), 0 0 50px rgba(232, 185, 74, 0.2)",
    image: `${import.meta.env.BASE_URL}cache-1.jpg`,
    title: "Grand Victor Cache",
    description:
      "Cash Prize · E-Certificate · Featured Spotlight — exact value briefed at kickoff",
  },
  {
    id: 1,
    cache: "CACHE II",
    rank: "RANK 02",
    roman: "II",
    color: "#4FD8E8",
    textColor: "text-cyan",
    borderColor: "border-cyan",
    bgColor: "bg-cyan/10",
    glowColor: "rgba(79,216,232,0.35)",
    glowShadow: "0 0 25px rgba(79, 216, 232, 0.5), 0 0 50px rgba(79, 216, 232, 0.2)",
    image: `${import.meta.env.BASE_URL}cache-2.jpg`,
    title: "Vanguard Cache",
    description:
      "Cash Prize · E-Certificate — exact value briefed at kickoff",
  },
  {
    id: 2,
    cache: "CACHE III",
    rank: "RANK 03",
    roman: "III",
    color: "#E8262C",
    textColor: "text-crimson",
    borderColor: "border-crimson",
    bgColor: "bg-crimson/10",
    glowColor: "rgba(232,38,44,0.35)",
    glowShadow: "0 0 25px rgba(232, 38, 44, 0.5), 0 0 50px rgba(232, 38, 44, 0.2)",
    image: `${import.meta.env.BASE_URL}cache-3.jpg`,
    title: "Tactical Cache",
    description:
      "Cash Prize · E-Certificate — exact value briefed at kickoff",
  },
];

/* ── Squad Insignia Decorative Dividers ──────────────────────── */

function SquadInsigniaRow() {
  const INSIGNIAS = [
    { color: "#E8B94A", d: "M12 2 L22 8 L22 18 L12 24 L2 18 L2 8 Z" }, // Hexagon Shield
    { color: "#4FD8E8", d: "M12 2 L20 12 L12 22 L4 12 Z" }, // Diamond
    { color: "#E8262C", d: "M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z" }, // Star
    { color: "#E8B94A", d: "M2 12 L12 2 L22 12 L12 22 Z M12 6 L18 12 L12 18 L6 12 Z" }, // Dual Diamond
    { color: "#4FD8E8", d: "M12 2 L22 8 L18 22 L6 22 L2 8 Z" }, // Crest
    { color: "#E8262C", d: "M4 4 L20 4 L12 20 Z M4 20 L20 20 L12 4 Z" }, // Hourglass
  ];

  return (
    <div className="mt-20 pt-10 border-t border-line/50 flex items-center justify-center gap-8 sm:gap-14 opacity-40">
      {INSIGNIAS.map((ins, i) => (
        <svg
          key={i}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={ins.color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-opacity hover:opacity-100"
        >
          <path d={ins.d} />
        </svg>
      ))}
    </div>
  );
}

/* ── Vault Card Component ────────────────────────────────────── */

interface VaultCardProps {
  vault: VaultData;
  isUnsealed: boolean;
  onUnseal: () => void;
  index: number;
}

function VaultCard({ vault, isUnsealed, onUnseal, index }: VaultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      data-cursor="vault"
      className="relative bg-panel rounded-xl border border-line p-5 sm:p-8 flex flex-col justify-between overflow-hidden group"
    >
      {/* ── Rotating Conic Shimmer Border (only while sealed) ── */}
      {!isUnsealed && (
        <div
          className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity animate-conic-shimmer"
          style={{
            background: `conic-gradient(from var(--angle, 0deg), transparent 270deg, ${vault.color} 320deg, transparent 360deg)`,
            contain: "paint",
          }}
        />
      )}

      {/* Inner background container to obscure shimmer inside */}
      <div className="absolute inset-[1px] bg-panel rounded-[11px] pointer-events-none z-[1]" />

      {/* HUD Corner Brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gold-dim/40 pointer-events-none z-[2]" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-gold-dim/40 pointer-events-none z-[2]" />

      {/* Card Content Wrapper */}
      <div className="relative z-[3] flex flex-col h-full justify-between">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono text-xs text-ink-faint font-semibold tracking-wider">
            {vault.cache}
          </span>
          <span
            className={`font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${vault.textColor} ${vault.borderColor}/40 ${vault.bgColor}`}
          >
            {vault.rank}
          </span>
        </div>

        {/* Center Seal / Revealed Cache Content */}
        <div className="my-4 min-h-[230px] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {!isUnsealed ? (
              /* Sealed State: Circular Dashed Seal with Roman Numeral */
              <motion.div
                key="sealed-seal"
                initial={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
                className="flex flex-col items-center justify-center"
              >
                <div
                  className={`w-28 h-28 rounded-full border-2 border-dashed ${vault.borderColor}/60 ${vault.bgColor} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}
                  style={{ boxShadow: `0 0 20px ${vault.glowColor}` }}
                >
                  <span className={`font-display text-4xl ${vault.textColor}`}>
                    {vault.roman}
                  </span>
                </div>
                <span className="mt-4 font-tech text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                  Classified Seal Intact
                </span>
              </motion.div>
            ) : (
              /* Unsealed State: Revealed Title, Staggered Prize Image & Description */
              <motion.div
                key="unsealed-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center"
              >
                {/* 1:1 Prize Artifact Image with soft glow border & staggered Framer Motion entrance */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`w-[120px] h-[120px] rounded-xl overflow-hidden mb-4 border ${vault.borderColor}/60 relative group/artifact`}
                  style={{
                    boxShadow: vault.glowShadow,
                  }}
                >
                  <img
                    src={vault.image}
                    alt={vault.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/artifact:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>

                {/* Vault Title */}
                <h3 className={`font-tech text-xl font-bold uppercase tracking-wide mb-2 ${vault.textColor}`}>
                  {vault.title}
                </h3>

                {/* Vault Description */}
                <p className="font-body text-xs text-ink-dim leading-relaxed max-w-[260px]">
                  {vault.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button / Unsealed Badge */}
        <div className="mt-6 pt-4 border-t border-line/60 flex justify-center">
          {!isUnsealed ? (
            <button
              onClick={onUnseal}
              className={`w-full py-3 px-4 rounded-lg font-tech text-xs font-bold uppercase tracking-[0.16em] border transition-all duration-200 ${vault.textColor} ${vault.borderColor}/40 ${vault.bgColor} hover:brightness-125 hover:scale-[1.02] active:scale-[0.98]`}
            >
              Unseal Cache
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-void-2 border border-line">
              <span className="text-[9px] text-gold">◆</span>
              <span className="font-tech text-[11px] font-bold uppercase tracking-widest text-gold">
                Cache Unsealed
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Sector 03: Rewards Component ──────────────────────── */

export function Rewards() {
  const [unsealed, setUnsealed] = useState<boolean[]>([false, false, false]);
  const hasCelebratedRef = useRef(false);

  const unsealedCount = unsealed.filter(Boolean).length;
  const allUnsealed = unsealedCount === 3;

  /* Celebration toast when all 3 caches are unsealed */
  useEffect(() => {
    if (allUnsealed && !hasCelebratedRef.current) {
      hasCelebratedRef.current = true;
      toast.success("All Caches Unsealed! 🎉", {
        description: "Full briefing unlocked. Every participant receives an E-Certificate & career opportunities.",
      });
    }
  }, [allUnsealed]);

  const handleUnseal = (index: number) => {
    if (unsealed[index]) return;
    const next = [...unsealed];
    next[index] = true;
    setUnsealed(next);

    toast.success("Cache Unsealed! 🔓", {
      description: VAULTS[index].title,
    });
  };

  return (
    <section id="rewards" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-void border-t border-line">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Sector 03 // Reward Caches"
          title="Break the seals"
          description="Three classified caches. Click each one to unseal what's inside."
          centered
        />

        {/* Live Progress Pill */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-panel border border-line shadow-md">
            <span className="text-[10px] text-gold">◆</span>
            <span className="font-tech text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-ink">
              {unsealedCount} / 3 Caches Unsealed
            </span>
          </div>
        </div>

        {/* 3-Column Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {VAULTS.map((vault, i) => (
            <VaultCard
              key={vault.id}
              vault={vault}
              isUnsealed={unsealed[i]}
              onUnseal={() => handleUnseal(i)}
              index={i}
            />
          ))}
        </div>

        {/* All Unsealed Celebration Banner */}
        <AnimatePresence>
          {allUnsealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-12 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-gold/10 via-panel to-gold/10 border border-gold/40 text-center shadow-xl"
            >
              <p className="font-tech text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.2em] text-gold leading-relaxed">
                ◆ ALL CACHES UNSEALED — EVERY PARTICIPANT ALSO WALKS AWAY WITH AN E-CERTIFICATE, CAREER OPPORTUNITIES & INDUSTRY NETWORKING ◆
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Insignia Divider */}
        <SquadInsigniaRow />
      </div>
    </section>
  );
}
