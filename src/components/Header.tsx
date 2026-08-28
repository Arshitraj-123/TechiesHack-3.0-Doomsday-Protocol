import { useState, useEffect } from "react";
import { Drawer } from "vaul";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { REGISTRATION_FORM_URL } from "@/constants/links";

/* ── Data ───────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Briefing", href: "#briefing" },
  { label: "Directives", href: "#directives" },
  { label: "Rewards", href: "#rewards" },
  { label: "Timeline", href: "#corridor" },
  { label: "Protocol", href: "#protocol" },
  { label: "Comms", href: "#comms" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

/* ── Component ──────────────────────────────────────────────── */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  /* Scroll detection ─────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-300 ease-out",
        scrolled
          ? "border-line backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
      style={{
        backgroundColor: scrolled ? "rgba(7,8,12,0.88)" : "transparent",
      }}
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
        style={{
          paddingLeft: "max(1rem, env(safe-area-inset-left, 0px))",
          paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
        }}
      >
        {/* ── Logo ─────────────────────────────────────────── */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          {/* Rotated crimson gradient square */}
          <div className="relative w-9 h-9 rotate-45 rounded-[4px] bg-gradient-to-br from-crimson to-crimson-dim flex items-center justify-center shadow-lg shadow-crimson/20 group-hover:shadow-crimson/40 transition-shadow">
            <span className="-rotate-45 font-display text-[13px] text-white tracking-wider select-none leading-none">
              TH
            </span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-tech text-sm font-bold tracking-[0.12em] text-ink uppercase">
              TechiesHack 3.0
            </span>
            <span className="font-tech text-[10px] font-medium tracking-[0.15em] text-gold uppercase mt-0.5">
              Codways Hackathon 2026
            </span>
          </div>
        </a>

        {/* ── Desktop nav links ────────────────────────────── */}
        <nav className="hidden min-[760px]:flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                className={cn(
                  "group relative px-3 py-2 font-tech text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
                  isActive ? "text-crimson" : "text-ink-dim hover:text-ink"
                )}
              >
                {label}
                {/* Underline indicator */}
                <span
                  className={cn(
                    "absolute bottom-0 left-3 right-3 h-[2px] bg-crimson transition-transform duration-300 origin-left",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* ── Right side: CTA + mobile burger ──────────────── */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={REGISTRATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-[760px]:inline-flex items-center px-5 py-2 bg-crimson text-white font-tech text-[11px] font-bold uppercase tracking-[0.14em] rounded-md hover:bg-red-600 active:scale-[0.97] transition-all duration-150 shadow-md shadow-crimson/20 hover:shadow-crimson/40"
          >
            Enlist Now
          </a>

          {/* ── Mobile drawer (vaul, direction="top") ──── */}
          <div className="min-[760px]:hidden">
            <Drawer.Root
              direction="top"
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
            >
              <Drawer.Trigger asChild>
                <button
                  className="p-2 text-ink-dim hover:text-ink transition-colors"
                  aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                  {drawerOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </Drawer.Trigger>

              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1001]" />
                <Drawer.Content className="fixed inset-x-0 top-0 z-[1002] bg-void outline-none focus:outline-none max-h-[100dvh] overflow-y-auto">
                  {/* ── Prominent Cross Button to close menu and see website content ── */}
                  <Drawer.Close asChild>
                    <button
                      onClick={() => setDrawerOpen(false)}
                      className="absolute top-4 right-4 p-2.5 rounded-lg border border-line bg-panel/90 text-ink-dim hover:text-crimson hover:border-crimson/50 active:scale-95 transition-all z-50 flex items-center justify-center shadow-lg"
                      aria-label="Close navigation menu"
                    >
                      <X size={22} />
                    </button>
                  </Drawer.Close>

                  <div className="flex flex-col items-center justify-start min-h-[100dvh] px-6 pt-12 pb-16 gap-5 overflow-y-auto">
                    {/* Brand mark inside drawer */}
                    <div className="mb-2 flex flex-col items-center">
                      <div className="w-11 h-11 rotate-45 rounded-[5px] bg-gradient-to-br from-crimson to-crimson-dim flex items-center justify-center shadow-lg shadow-crimson/20">
                        <span className="-rotate-45 font-display text-base text-white tracking-wider select-none leading-none">
                          TH
                        </span>
                      </div>
                    </div>

                    {/* Nav links */}
                    {NAV_LINKS.map(({ label, href }) => (
                      <a
                        key={href}
                        href={href}
                        onClick={() => setDrawerOpen(false)}
                        className="font-tech text-xl sm:text-2xl font-bold uppercase tracking-[0.15em] text-ink hover:text-crimson transition-colors duration-200 py-1"
                      >
                        {label}
                      </a>
                    ))}

                    {/* CTA */}
                    <a
                      href={REGISTRATION_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDrawerOpen(false)}
                      className="mt-4 px-10 py-3.5 bg-crimson text-white font-tech text-sm font-bold uppercase tracking-[0.14em] rounded-md hover:bg-red-600 transition-colors shadow-lg shadow-crimson/25"
                    >
                      Enlist Now
                    </a>
                  </div>

                  {/* Drag handle hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-10 h-1 rounded-full bg-ink-faint/40" />
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
