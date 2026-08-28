/* ── Stats Strip Component ───────────────────────────────────── */

const STATS = [
  { value: "24", unit: "Hours", label: "Hours Non-Stop" },
  { value: "9", unit: "Sectors", label: "Mission Directives" },
  { value: "₹200", unit: "INR", label: "Entry Fee" },
  { value: "100%", unit: "Virtual", label: "Online Operation" },
] as const;

export function StatsStrip() {
  return (
    <section id="stats" className="w-full bg-void-2 border-y border-line py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x-0 sm:divide-y-0 sm:divide-x divide-line/70">
          {STATS.map(({ value, label }, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-4 sm:p-6 text-center ${
                index % 2 === 1 ? "border-l border-line/70 sm:border-l-0" : ""
              }`}
            >
              <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-gold tracking-tight mb-1">
                {value}
              </span>
              <span className="font-tech text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
