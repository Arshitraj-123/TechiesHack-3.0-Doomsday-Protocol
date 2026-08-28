import { useEffect, useState, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles, type ISourceOptions } from "@tsparticles/engine";

export function HeroParticles() {
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  /* Viewport IntersectionObserver wrapper — mount canvas only when Hero is visible */
  useEffect(() => {
    if (prefersReduced) return;

    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      const timer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [prefersReduced]);

  /* Lazy initialise the tsparticles slim engine once in view without blocking first paint */
  useEffect(() => {
    if (!inView || prefersReduced) return;

    let mounted = true;
    const init = () => {
      loadSlim(tsParticles).then(() => {
        if (mounted) setReady(true);
      });
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(init);
      return () => {
        mounted = false;
        if ("cancelIdleCallback" in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(init, 150);
      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
  }, [inView, prefersReduced]);

  /* Reduced-motion change listener */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        number: { value: 50 },
        color: { value: ["#E8262C", "#4FD8E8"] },
        opacity: {
          value: { min: 0.04, max: 0.2 },
        },
        size: {
          value: { min: 1, max: 2.5 },
        },
        move: {
          enable: !prefersReduced,
          direction: "top" as const,
          speed: { min: 0.1, max: 0.4 },
          outModes: { default: "out" as const },
          straight: false,
          random: true,
        },
        links: { enable: false },
        shape: { type: "circle" },
      },
      detectRetina: true,
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
        },
      },
    }),
    [prefersReduced]
  );

  if (!ready) return null;
  if (prefersReduced) return null; // skip entirely for reduced-motion

  return (
    <Particles
      id="hero-particles"
      className="!absolute !inset-0 !pointer-events-none"
      options={options}
    />
  );
}
