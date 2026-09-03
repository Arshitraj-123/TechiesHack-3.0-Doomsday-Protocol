import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ── Timeline Corridor Data ─────────────────────────────────── */

interface Station {
  id: string;
  stationNum: string;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: "crimson" | "gold" | "cyan";
}

interface Phase {
  phaseNum: string;
  title: string;
  timeRange: string;
  stations: Station[];
}

const PHASES: Phase[] = [
  {
    phaseNum: "PHASE 01",
    title: "INITIALIZATION & DEPLOYMENT",
    timeRange: "HOURS 00 — 06",
    stations: [
      {
        id: "st-01",
        stationNum: "STATION // 01",
        time: "09:00 ISST",
        title: "OPERATIONAL KICKOFF & BRIEFING",
        subtitle: "HQ Assembly · Squad Registration",
        description:
          "Team check-in, squad formation confirmation, and live keynote briefing on secret operational parameters and challenge verticals.",
        tags: ["Command HQ", "Briefing", "Registration"],
        color: "gold",
      },
      {
        id: "st-02",
        stationNum: "STATION // 02",
        time: "10:00 ISST",
        title: "SYSTEMS LAUNCH & REPO ACCESS",
        subtitle: "Sector 01 Unlocked · Hacking Active",
        description:
          "Repository access granted. The 24-hour operation clock begins. All squads launch sprint development and environment setup.",
        tags: ["Sprint Start", "24H Clock", "Repo Access"],
        color: "cyan",
      },
    ],
  },
  {
    phaseNum: "PHASE 02",
    title: "SQUAD EXECUTION & MIDWAY CHECKPOINT",
    timeRange: "HOURS 06 — 16",
    stations: [
      {
        id: "st-03",
        stationNum: "STATION // 03",
        time: "14:00 ISST",
        title: "MENTOR ARCHITECTURE REVIEW",
        subtitle: "Technical Review 01 · Feedback Sync",
        description:
          "1-on-1 architecture review with senior tech mentors. Code check-ins, security validation, and tactical pivot advice.",
        tags: ["Mentor Sync", "Code Audit", "Architecture"],
        color: "gold",
      },
      {
        id: "st-04",
        stationNum: "STATION // 04",
        time: "20:00 ISST",
        title: "MIDNIGHT REFUEL & PROGRESS SCAN",
        subtitle: "Midway Checkpoint · System Telemetry",
        description:
          "Midway progress report submission window. Fuel stations activated. Mandatory code audit and telemetry scan of active builds.",
        tags: ["Checkpoint", "Midway", "Telemetry Scan"],
        color: "crimson",
      },
    ],
  },
  {
    phaseNum: "PHASE 03",
    title: "FINAL SURGE & EVALUATION",
    timeRange: "HOURS 16 — 24",
    stations: [
      {
        id: "st-05",
        stationNum: "STATION // 05",
        time: "06:00 ISST",
        title: "CODE FREEZE & DEMO SUBMISSION",
        subtitle: "Repositories Locked · Video Pitch Due",
        description:
          "All commits pushed to production repositories. Submit via the official GitHub repo submission form and provide a live/deployed project link (Vercel/Netlify/Render/etc.). Demo videos and pitch slide decks locked for evaluation. Submissions missing either link are incomplete.",
        tags: ["Code Freeze", "Submission", "Video Pitch"],
        color: "cyan",
      },
      {
        id: "st-06",
        stationNum: "STATION // 06",
        time: "09:00 ISST",
        title: "COMMAND JUDGING & VICTORY CEREMONY",
        subtitle: "Live Demos · Cache Distribution",
        description:
          "Top finalist squad live demos before executive panel. Evaluation scoring finalized, followed by reward cache reveals.",
        tags: ["Live Demos", "Reward Cache", "Victory"],
        color: "gold",
      },
    ],
  },
];

/* ── Helper: SVG Path Generator ─────────────────────────────── */

function buildSvgPath(points: { x: number; y: number }[], isMobile: boolean): string {
  if (points.length === 0) return "";
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    if (isMobile) {
      d += ` L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    } else {
      const dy = p2.y - p1.y;
      const cp1x = p1.x;
      const cp1y = p1.y + dy * 0.45;
      const cp2x = p2.x;
      const cp2y = p2.y - dy * 0.45;
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
  }
  return d;
}

/* ── Timeline Component ─────────────────────────────────────── */

export function Timeline() {
  const corridorRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== "undefined" ? Math.min(window.innerWidth, 1000) : 390,
    height: 2000,
  }));
  const [pathD, setPathD] = useState("");

  /* ── 1. Calculate Real Station Positions & Build SVG Path ── */
  const updatePath = useCallback(() => {
    if (!corridorRef.current) return;

    const containerRect = corridorRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    const isMobile = window.innerWidth < 768;

    setDimensions({ width, height });

    // Select all connector dot elements
    const dotEls = Array.from(
      corridorRef.current.querySelectorAll<HTMLElement>("[data-station-dot]")
    );

    if (dotEls.length === 0) return;

    const points: { x: number; y: number }[] = [];

    const calculatedDots = dotEls.map((dotEl, index) => {
      const dotRect = dotEl.getBoundingClientRect();
      const dotCenterY = dotRect.top + dotRect.height / 2 - containerRect.top;

      let dotCenterX: number;
      if (isMobile) {
        dotCenterX = dotRect.left + dotRect.width / 2 - containerRect.left;
      } else {
        // Winding effect: left row dots at 35% container width, right row dots at 65%
        const isEven = index % 2 === 0;
        dotCenterX = isEven ? width * 0.35 : width * 0.65;
      }

      return { x: dotCenterX, y: dotCenterY };
    });

    // Path start point at top center (or straight above first dot on mobile)
    const startX = isMobile ? calculatedDots[0].x : width * 0.5;
    points.push({ x: startX, y: 0 });

    points.push(...calculatedDots);

    // Path end point at bottom
    const endX = isMobile
      ? calculatedDots[calculatedDots.length - 1].x
      : dotEls.length % 2 === 0
      ? width * 0.35
      : width * 0.65;
    points.push({ x: endX, y: height });

    const newD = buildSvgPath(points, isMobile);
    setPathD(newD);

    // Refresh ScrollTrigger after path recalculation
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  }, []);

  /* ── 2. Mount & Resize Listeners ───────────────────────────── */
  useEffect(() => {
    updatePath();

    // Debounced resize handler with immediate & delayed checks
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        updatePath();
        ScrollTrigger.refresh(true);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    document.fonts.ready.then(() => {
      updatePath();
      ScrollTrigger.refresh(true);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(timer);
    };
  }, [updatePath]);

  /* ── 3. GSAP Animations: MotionPath Drone & Card Reveals ────── */
  useEffect(() => {
    if (!corridorRef.current || !pathD) return;

    const ctx = gsap.context(() => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        const cards =
          corridorRef.current?.querySelectorAll<HTMLElement>("[data-station-card]");
        cards?.forEach((card) => {
          gsap.set(card, { opacity: 1, y: 0 });
        });
        return;
      }

      // Drone scrubs along the calculated MotionPath as user scrolls through the corridor
      gsap.to("#corridorDrone", {
        motionPath: {
          path: "#corridorPath",
          align: "#corridorPath",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: "none",
        scrollTrigger: {
          trigger: corridorRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // One-shot fade + slide-in reveal per station card (independent of scrub)
      const cards = corridorRef.current?.querySelectorAll<HTMLElement>("[data-station-card]");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, corridorRef);

    return () => ctx.revert();
  }, [pathD]);

  // Flatten stations for dot indexing
  let globalStationIndex = 0;

  return (
    <section
      id="corridor"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-void border-t border-line relative overflow-hidden w-full max-w-full"
      style={{ contain: "paint" }}
    >
      {/* Backward-compatible anchor for #timeline */}
      <div id="timeline" className="absolute -top-28 pointer-events-none" />
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Operation Schedule // 24-Hour Corridor"
          title="Timeline Corridor"
          description="Track the operation sprint in real-time as command vehicles traverse through key mission stations."
          centered
        />

        {/* ── Main Corridor Container ─────────────────────────── */}
        <div
          ref={corridorRef}
          className="relative mt-12 sm:mt-16 w-full max-w-full overflow-hidden"
          style={{ contain: "paint" }}
        >
          {/* ── 1:1 SVG Winding Path Background ──────────────── */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Gradient track stroke */}
              <linearGradient
                id="corridorTrackGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#E8262C" />
                <stop offset="50%" stopColor="#E8B94A" />
                <stop offset="100%" stopColor="#4FD8E8" />
              </linearGradient>

              {/* Glowing filter for rail */}
              <filter id="trackGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle outer glow track */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="url(#corridorTrackGradient)"
                strokeWidth="6"
                strokeOpacity="0.25"
                filter="url(#trackGlow)"
              />
            )}

            {/* Secondary dashed parallel rail track */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="4"
                strokeDasharray="6 8"
              />
            )}

            {/* Primary Winding Path (Target for GSAP MotionPath) */}
            {pathD && (
              <path
                id="corridorPath"
                d={pathD}
                fill="none"
                stroke="url(#corridorTrackGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* ── Traveling Recon Drone Vehicle ───────────────────── */}
          <div
            id="corridorDrone"
            className="absolute top-0 left-0 w-[64px] h-[64px] sm:w-[90px] sm:h-[90px] max-w-[100px] max-h-[100px] pointer-events-none z-[5]"
            style={{
              filter:
                "drop-shadow(0 0 12px rgba(232, 38, 44, 0.95)) drop-shadow(0 0 25px rgba(232, 185, 74, 0.6))",
            }}
          >
            {/* Thruster exhaust trail glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-crimson/40 via-gold/30 to-transparent blur-md rounded-full pointer-events-none -z-10 animate-pulse" />

            {/* Fading ghost trail behind vehicle */}
            <div className="absolute top-0 left-0 w-[64px] h-[64px] sm:w-[90px] sm:h-[90px] max-w-[100px] max-h-[100px] opacity-35 blur-[2px] -translate-x-3 pointer-events-none">
              <img
                src={`${import.meta.env.BASE_URL}corridor-drone.png`}
                alt=""
                width={90}
                height={90}
                className="w-full h-full object-contain mix-blend-screen pointer-events-none"
              />
            </div>

            {/* Main Recon Drone Image (mix-blend-screen, z-[5] below cards) */}
            <img
              src={`${import.meta.env.BASE_URL}corridor-drone.png`}
              alt="Corridor Recon Drone"
              width={90}
              height={90}
              className="w-full h-full object-contain mix-blend-screen pointer-events-none"
            />
          </div>

          {/* ── Phases & Station Cards Grid (Stacked ON TOP of drone at z-10) ── */}
          <div className="relative z-10 space-y-16 sm:space-y-24">
            {PHASES.map((phase) => (
              <div key={phase.phaseNum} className="space-y-10 sm:space-y-16">
                {/* Phase Banner Midpoint Header */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-panel/90 border border-line backdrop-blur-md shadow-xl relative z-10">
                    <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
                    <span className="font-mono text-xs text-crimson font-bold tracking-widest uppercase">
                      {phase.phaseNum}
                    </span>
                    <span className="text-line">|</span>
                    <span className="font-tech text-xs sm:text-sm text-ink font-bold tracking-wide uppercase">
                      {phase.title}
                    </span>
                    <span className="font-mono text-[10px] text-ink-faint">
                      ({phase.timeRange})
                    </span>
                  </div>
                </div>

                {/* Station Cards */}
                <div className="space-y-12 sm:space-y-16">
                  {phase.stations.map((station) => {
                    const currentIndex = globalStationIndex++;
                    const isEven = currentIndex % 2 === 0;

                    return (
                      <div
                        key={station.id}
                        data-station-card
                        className="relative z-10 flex flex-col md:flex-row items-center w-full"
                      >
                        {/* ── Desktop Winding Layout ──────────────────────── */}
                        {/* Card Container */}
                        <div
                          className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                            isEven
                              ? "md:mr-auto md:pr-10 md:text-right"
                              : "md:ml-auto md:pl-10 md:text-left"
                          }`}
                        >
                          <div className="relative p-4 sm:p-6 rounded-xl bg-panel/90 border border-line/80 backdrop-blur-md shadow-lg group hover:border-crimson/40 transition-colors">
                            {/* HUD Corner Brackets */}
                            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold-dim/40 pointer-events-none" />
                            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold-dim/40 pointer-events-none" />

                            {/* Header row */}
                            <div
                              className={`flex items-center gap-3 mb-3 ${
                                isEven ? "md:justify-end" : "md:justify-start"
                              }`}
                            >
                              <span className="font-mono text-[11px] text-ink-faint font-semibold">
                                {station.stationNum}
                              </span>
                              <span className="font-mono text-xs font-bold text-gold px-2.5 py-0.5 rounded bg-gold/10 border border-gold/30">
                                ⏱ {station.time}
                              </span>
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="font-tech text-lg sm:text-xl font-bold uppercase tracking-wide text-ink mb-1 group-hover:text-gold transition-colors">
                              {station.title}
                            </h3>
                            <p className="font-mono text-xs text-crimson font-medium mb-3">
                              {station.subtitle}
                            </p>

                            {/* Description */}
                            <p className="font-body text-xs sm:text-sm text-ink-dim leading-relaxed mb-4">
                              {station.description}
                            </p>

                            {/* Tag Badges */}
                            <div
                              className={`flex flex-wrap gap-2 ${
                                isEven ? "md:justify-end" : "md:justify-start"
                              }`}
                            >
                              {station.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[10px] uppercase tracking-wider text-ink-faint px-2 py-0.5 rounded bg-void-2 border border-line"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* ── Connector Dot Element (Measured for SVG path) ── */}
                        <div
                          data-station-dot
                          className={`absolute top-8 md:top-1/2 -translate-y-1/2 left-4 md:left-auto ${
                            isEven ? "md:left-[35%]" : "md:left-[65%]"
                          } -translate-x-1/2 z-10 pointer-events-none`}
                        >
                          <div className="relative flex items-center justify-center w-8 h-8">
                            <span
                              className={`absolute inset-0 rounded-full animate-ping opacity-35 ${
                                station.color === "crimson"
                                  ? "bg-crimson"
                                  : station.color === "gold"
                                  ? "bg-gold"
                                  : "bg-cyan"
                              }`}
                            />
                            <div
                              className={`w-4 h-4 rounded-full border-2 bg-void flex items-center justify-center shadow-lg ${
                                station.color === "crimson"
                                  ? "border-crimson shadow-crimson/50"
                                  : station.color === "gold"
                                  ? "border-gold shadow-gold/50"
                                  : "border-cyan shadow-cyan/50"
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  station.color === "crimson"
                                    ? "bg-crimson"
                                    : station.color === "gold"
                                    ? "bg-gold"
                                    : "bg-cyan"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
