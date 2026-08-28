import { Toaster } from "sonner";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { AlertTicker } from "@/components/AlertTicker";
import { StatsStrip } from "@/components/StatsStrip";
import { Briefing } from "@/components/Briefing";
import { Directives } from "@/components/Directives";
import { Rewards } from "@/components/Rewards";
import { Timeline } from "@/components/Timeline";
import { Protocol } from "@/components/Protocol";
import { Team } from "@/components/Team";
import { FAQ } from "@/components/FAQ";
import { Comms } from "@/components/Comms";
import { Enlist } from "@/components/Enlist";
import { Footer } from "@/components/Footer";

/* ── App ───────────────────────────────────────────────────── */

function App() {
  return (
    <>
      {/* Toast notifications container */}
      <Toaster richColors position="bottom-right" />

      {/* Persistent root-level components */}
      <CustomCursor />
      <Header />

      {/* ── Cinematic Hero Section ───────────────────────────── */}
      <Hero />

      {/* ── Alert Ticker ─────────────────────────────────────── */}
      <AlertTicker />

      {/* ── Stats Strip Section ──────────────────────────────── */}
      <StatsStrip />

      {/* ── Sector 01: Mission Briefing ──────────────────────── */}
      <Briefing />

      {/* ── Sector 02: Mission Directives ────────────────────── */}
      <Directives />

      {/* ── Sector 03: Reward Caches ─────────────────────────── */}
      <Rewards />

      {/* ── Timeline Corridor Section (#corridor) ────────────── */}
      <Timeline />

      {/* ── Sector 05: Evaluation Protocol Section ───────────── */}
      <Protocol />

      {/* ── Sector 06: Command Center (Team) ─────────────────── */}
      <Team />

      {/* ── Field Manual: FAQ Section ────────────────────────── */}
      <FAQ />

      {/* ── Final Sector: Comms Channel Section ──────────────── */}
      <Comms />

      {/* ── Final Call: Enlist Section ───────────────────────── */}
      <Enlist />

      {/* ── Site Footer ──────────────────────────────────────── */}
      <Footer />
    </>
  );
}

export default App;
