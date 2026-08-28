import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

/* ── Types ──────────────────────────────────────────────────── */

interface Spark {
  id: number;
  x: number;
  y: number;
  color: string;
}

/* ── Constants ──────────────────────────────────────────────── */

const INTERACTIVE_SELECTOR =
  'a, button, [data-cursor="interactive"], input, select, textarea, label, [role="button"]';
const VAULT_SELECTOR = '[data-cursor="vault"]';

const POSITION_SPRING = { stiffness: 180, damping: 22 };
const ROTATION_SPRING = { stiffness: 220, damping: 24 };
const HOVER_TRANSITION = { type: "spring" as const, stiffness: 350, damping: 22 };

const SPARK_INTERVAL_MS = 35;
const SPARK_LIFETIME_MS = 450;
const MAX_SPARKS = 32;

/* ── Energy Blade Vector Icon ───────────────────────────────── */

function EnergyBladeIcon({ isHovering }: { isHovering: boolean }) {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        scale: isHovering ? 1.15 : 1,
        filter: isHovering
          ? "brightness(1.4) drop-shadow(0 0 12px rgba(232,185,74,0.9))"
          : "brightness(1) drop-shadow(0 0 8px rgba(232,38,44,0.7))",
      }}
      transition={HOVER_TRANSITION}
      style={{ transformOrigin: "center center" }}
    >
      <defs>
        {/* Outer blade gradient: crimson-to-gold */}
        <linearGradient
          id="bladeGrad"
          x1="16"
          y1="30"
          x2="16"
          y2="2"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7A1015" />
          <stop offset="35%" stopColor="#E8262C" />
          <stop offset="75%" stopColor="#E8B94A" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Inner energy core gradient: cyan-to-white */}
        <linearGradient
          id="coreGrad"
          x1="16"
          y1="26"
          x2="16"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4FD8E8" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      {/* Outer Angular Energy Blade Body */}
      <path
        d="M16 2 L20 10 L27 13 L21 16 L18 29 L14 29 L11 16 L5 13 L12 10 Z"
        fill="url(#bladeGrad)"
        stroke="#4FD8E8"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Inner High-Energy Plasma Core */}
      <path
        d="M16 5 L18 11 L23 13 L19 15 L17 26 L15 26 L13 15 L9 13 L14 11 Z"
        fill="url(#coreGrad)"
        opacity="0.95"
      />

      {/* Power Hilt & Tip Energy Nodes */}
      <circle cx="16" cy="27.5" r="1.8" fill="#E8B94A" />
      <circle cx="16" cy="2.5" r="1.2" fill="#FFFFFF" />
    </motion.svg>
  );
}

/* ── Custom Cursor Component ────────────────────────────────── */

export function CustomCursor() {
  /* — State ------------------------------------------------- */
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVault, setIsVault] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const sparkIdRef = useRef(0);
  const lastSparkTimeRef = useRef(0);
  const lastPosRef = useRef({ x: -100, y: -100 });

  /* — Motion values & spring physics ----------------------- */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const angleMotion = useMotionValue(0);

  const cursorX = useSpring(mouseX, POSITION_SPRING);
  const cursorY = useSpring(mouseY, POSITION_SPRING);
  const smoothAngle = useSpring(angleMotion, ROTATION_SPRING);

  /* — Media-query detection & supplementary touch detection -- */
  useEffect(() => {
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPointer = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    const onMotion = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);

    pointerMq.addEventListener("change", onPointer);
    motionMq.addEventListener("change", onMotion);

    // Supplementary touch-event check: if touch is detected, force disable cursor
    const onTouchStart = () => {
      setIsDesktop(false);
      const style = document.getElementById("custom-weapon-cursor-hide");
      if (style) style.remove();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true, once: true });

    return () => {
      pointerMq.removeEventListener("change", onPointer);
      motionMq.removeEventListener("change", onMotion);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  /* — Inject global cursor: none style for desktop ----------- */
  useEffect(() => {
    if (!isDesktop) return;

    const style = document.createElement("style");
    style.id = "custom-weapon-cursor-hide";
    style.textContent = `
      html, body, a, button, input, select, textarea, [role="button"], [data-cursor="interactive"], [data-cursor="vault"] {
        cursor: none !important;
      }
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [isDesktop]);

  /* — Spark emitter (crimson & gold cutting embers) -------- */
  const emitSpark = useCallback(
    (x: number, y: number) => {
      if (prefersReduced) return;

      const now = Date.now();
      if (now - lastSparkTimeRef.current < SPARK_INTERVAL_MS) return;
      lastSparkTimeRef.current = now;

      const id = sparkIdRef.current++;
      const color = id % 3 === 0 ? "#E8B94A" : "#E8262C"; // gold / crimson mix

      setSparks((prev) => {
        const next = [...prev, { id, x, y, color }];
        return next.length > MAX_SPARKS ? next.slice(-MAX_SPARKS) : next;
      });

      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, SPARK_LIFETIME_MS);
    },
    [prefersReduced]
  );

  /* — Mouse movement & rotation tracking -------------------- */
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      mouseX.set(x);
      mouseY.set(y);
      setIsVisible(true);
      emitSpark(x, y);

      /* Calculate direction vector and rotation angle */
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const distSq = dx * dx + dy * dy;

      if (distSq > 3) {
        // Target angle pointing in movement direction (SVG blade defaults to UP = 0deg)
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        // Smooth shortest-path angle interpolation across 360deg boundary
        const currentAngle = angleMotion.get();
        let diff = (targetAngle - currentAngle) % 360;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;

        angleMotion.set(currentAngle + diff);
        lastPosRef.current = { x, y };
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [isDesktop, mouseX, mouseY, angleMotion, emitSpark]);

  /* — Hover detection via event delegation ------------------ */
  useEffect(() => {
    if (!isDesktop) return;

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const interactive = target.closest(INTERACTIVE_SELECTOR);
      const vault = target.closest(VAULT_SELECTOR);
      setIsHovering(!!interactive || !!vault);
      setIsVault(!!vault);
    };

    window.addEventListener("mouseover", handlePointerOver, { passive: true });
    return () => {
      window.removeEventListener("mouseover", handlePointerOver);
    };
  }, [isDesktop]);

  /* — Bail on touch/mobile devices -------------------------- */
  if (!isDesktop) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.15s ease",
      }}
    >
      {/* ── Particle sparks (cutting embers) ──────────────── */}
      <AnimatePresence mode="popLayout">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 0.95, scale: 1.2 }}
            animate={{ opacity: 0, y: 18, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: spark.x,
              top: spark.y,
              transform: "translate(-50%, -50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: spark.color,
              boxShadow: `0 0 6px ${spark.color}`,
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          />
        ))}
      </AnimatePresence>

      {/* ── Rotating Weapon-Shaped Energy Blade Cursor ──────── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          pointerEvents: "none",
          zIndex: 99999,
        }}
      >
        <motion.div
          style={{
            transform: "translate(-50%, -50%)",
            rotate: smoothAngle,
          }}
          className="relative flex items-center justify-center"
        >
          <EnergyBladeIcon isHovering={isHovering} />

          {/* UNSEAL label for vault/reward cards */}
          <AnimatePresence>
            {isVault && (
              <motion.span
                initial={{ opacity: 0, x: -6, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -6, scale: 0.8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: "calc(100% + 8px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#E8B94A",
                  whiteSpace: "nowrap",
                  textShadow: "0 0 10px rgba(232,185,74,0.6)",
                  backgroundColor: "rgba(18,20,29,0.85)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid rgba(232,185,74,0.3)",
                }}
              >
                UNSEAL
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
