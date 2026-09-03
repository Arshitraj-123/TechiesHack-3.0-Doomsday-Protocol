import { useState } from "react";
import { motion } from "motion/react";
import { User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ── Member Data Types ──────────────────────────────────────── */

interface TeamMember {
  id: string;
  role: string;
  name?: string;
  src?: string;
}

const CORE_PATRONS: TeamMember[] = [
  { id: "cp-1", role: "Engineering Head", name: "Neha Vats", src: "team-neha.jpg" },
  { id: "cp-2", role: "Chief Technical Officer", name: "Bhanu Pratap Singh", src: "team-bhanu.jpg" },
  { id: "cp-3", role: "Senior Consultant", name: "Sushmita Patra", src: "team-sushmita.jpg" },
  { id: "cp-4", role: "Data Engineer", name: "Umang Vashishtha", src: "team-umang.jpg" },
];

const ORGANIZING_COMMITTEE: TeamMember[] = [
  { id: "oc-1", role: "Full Stack Developer", name: "Arshit Raj", src: "team-arshit.png" },
  { id: "oc-2", role: "Full Stack Developer", name: "Yash", src: "team-yash.jpg" },
  { id: "oc-3", role: "Front End Developer", name: "Zeeshan", src: "team-zeeshan.jpg" },
  { id: "oc-4", role: "Front End Developer", name: "Surya", src: "team-surya.jpg" },
];

/* ── Member Card Component ──────────────────────────────────── */

interface MemberCardProps {
  member: TeamMember;
  index: number;
  accentColor?: string;
}

function MemberCard({ member, index, accentColor = "#E8B94A" }: MemberCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = Boolean(member.src && !imgError);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="bg-panel border border-line p-4 sm:p-5 rounded-xl flex flex-col justify-between group hover:border-line/90 transition-all duration-300 relative overflow-hidden"
    >
      {/* HUD Corner-Bracket Accents */}
      <div
        className="absolute top-2 left-2 w-2 h-2 border-t border-l pointer-events-none transition-colors"
        style={{ borderColor: `${accentColor}55` }}
      />
      <div
        className="absolute bottom-2 right-2 w-2 h-2 border-b border-r pointer-events-none transition-colors"
        style={{ borderColor: `${accentColor}55` }}
      />

      {/* ── Real Image Slot (Square 1:1 Aspect Ratio) ──────────── */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-line bg-gradient-to-b from-panel via-panel-2 to-[#090B11] flex items-center justify-center group-hover:border-line/80 transition-colors">
        {hasPhoto ? (
          <img
            src={`${import.meta.env.BASE_URL}${member.src}`}
            alt={`${member.role} — ${member.name ?? "Placeholder"}`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Fallback state when src is empty or fails to load */
          <div className="w-full h-full flex flex-col items-center justify-center relative select-none">
            {/* Background subtle radial gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${accentColor}15 0%, transparent 70%)`,
              }}
            />

            {/* User Icon Fallback */}
            <div className="w-16 h-16 rounded-full bg-void-2/80 border border-line/60 flex items-center justify-center text-ink-faint group-hover:text-ink-dim group-hover:border-line transition-all duration-300 shadow-inner">
              <User className="w-8 h-8 opacity-35 stroke-[1.5]" />
            </div>

            {/* Standby Status Hint */}
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint/60 mt-3">
              Photo Standby
            </span>
          </div>
        )}

        {/* Top-right subtle tech tag */}
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-void/80 border border-line/50 font-mono text-[8px] text-ink-faint tracking-wider uppercase">
          OPS // 0{index + 1}
        </div>
      </div>

      {/* ── Info & Role Title ──────────────────────────────────── */}
      <div className="mt-4 flex flex-col">
        <h4 className="font-tech text-base sm:text-lg font-bold uppercase tracking-wide text-ink group-hover:text-gold transition-colors">
          {member.name || "Name Placeholder"}
        </h4>
        <span className="font-mono text-xs text-ink-dim/80 mt-0.5 tracking-wider">
          {member.role}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Command Center: Team Section ───────────────────────────── */

export function Team() {
  return (
    <section
      id="team"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-void border-t border-line relative overflow-hidden"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_10%,rgba(232,185,74,0.06),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Sector 06 // Command Center"
          title="The team behind the mission"
          description="The operational leadership driving TechiesHack 3.0 forward."
        />

        {/* ── GROUP 1: Core Patrons ───────────────────────────── */}
        <div className="mt-12 sm:mt-16">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="inline-block w-8 h-px bg-gold" />
            <h3 className="font-tech text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-gold">
              Core Patrons
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {CORE_PATRONS.map((member, i) => (
              <MemberCard
                key={member.id}
                member={member}
                index={i}
                accentColor="#E8B94A"
              />
            ))}
          </div>
        </div>

        {/* ── GROUP 2: Organizing Committee ────────────────────── */}
        <div className="mt-14 sm:mt-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="inline-block w-8 h-px bg-crimson" />
            <h3 className="font-tech text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-crimson">
              Organizing Committee
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {ORGANIZING_COMMITTEE.map((member, i) => (
              <MemberCard
                key={member.id}
                member={member}
                index={i}
                accentColor="#E8262C"
              />
            ))}
          </div>
        </div>

        {/* ── Centered Footer Note ─────────────────────────────── */}
        <div className="mt-14 sm:mt-20 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-line/60 bg-panel-2/60 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
              Codways Technologies · Core Operations Team
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
