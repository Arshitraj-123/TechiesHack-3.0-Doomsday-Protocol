import { SectionHeading } from "@/components/ui/SectionHeading";

/* ── Briefing Pill Badges ───────────────────────────────────── */

const PILL_BADGES = [
  "All College Years",
  "Solo or Squad",
  "Beginner Friendly",
  "Any Stream",
  "Open Innovation",
] as const;

export function Briefing() {
  return (
    <section id="briefing" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-void">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading using the shared SectionHeading component */}
        <SectionHeading
          eyebrow="Sector 01 // Mission Briefing"
          title="The world doesn't wait. Neither should you."
          description="TechiesHack 3.0 is an intense 24-hour online hackathon hosted by Codways Technologies on September 26–27, 2026. Operatives from across all college years and disciplines gather to engineer high-impact solutions for critical global directives before time runs out."
          centered
        />

        {/* Feature Pill Badges */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {PILL_BADGES.map((badge, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-panel/60 backdrop-blur-sm hover:border-gold-dim transition-colors duration-200"
            >
              <span className="text-[9px] text-gold select-none">◆</span>
              <span className="font-tech text-xs sm:text-sm font-semibold tracking-wider text-ink-dim uppercase">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
