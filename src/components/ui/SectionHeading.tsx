import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase label above the title (e.g. "SCHEDULE") */
  eyebrow?: string;
  /** Big cinematic Anton headline */
  title: React.ReactNode;
  /** Supporting paragraph in Inter / ink-dim */
  description?: string;
  /** Centre-align the whole block (default: false — left-aligned) */
  centered?: boolean;
  className?: string;
}

/**
 * Reusable section heading with eyebrow, title, and description.
 *
 * - Eyebrow: small uppercase Rajdhani in crimson with a short horizontal
 *   rule before it.
 * - Title: huge Anton-font text in --ink.
 * - Description: Inter text in --ink-dim, max-w-[640px].
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center",
        className
      )}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            centered && "justify-center"
          )}
        >
          <span className="inline-block w-8 h-px bg-crimson" />
          <span className="font-tech text-xs tracking-[0.2em] uppercase text-crimson font-semibold">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Title */}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink uppercase leading-[1.1] tracking-wide">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg text-ink-dim font-body leading-relaxed max-w-[640px]",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
