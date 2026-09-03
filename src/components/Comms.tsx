import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  MessageCircle,
  Video,
  Building2,
  Send,
  Loader2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/* ── Zod Validation Schema ──────────────────────────────────── */

const commsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type CommsFormData = z.infer<typeof commsSchema>;

/* ── Comms Contact Section Component ────────────────────────── */

export function Comms() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommsFormData>({
    resolver: zodResolver(commsSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CommsFormData) => {
    setIsSubmitting(true);
    // Build mailto link with form data
    const subject = encodeURIComponent(`[TechiesHack 3.0] Message from ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
    window.open(`mailto:info@codways.com?subject=${subject}&body=${body}`, '_self');
    // Short delay for UX feedback before resetting
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    reset();
    toast.success("Email client opened. Send your transmission!");
  };

  return (
    <section
      id="comms"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-void border-t border-line relative overflow-hidden w-full max-w-full"
      style={{ contain: "paint" }}
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_10%,rgba(232,38,44,0.08),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Final Sector // Comms Channel"
          title="Stay on frequency"
          description="Reach out through any of these channels, or send a direct transmission below."
        />

        {/* ── 2-Column Responsive Layout ─────────────────────── */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* ── LEFT COLUMN: 3 Info Cards ──────────────────────── */}
          <div className="space-y-4 sm:space-y-5">
            {/* Card 1: WhatsApp Group */}
            <motion.a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="bg-panel border border-line p-5 sm:p-6 rounded-xl flex items-start gap-4 sm:gap-5 group hover:border-line/90 transition-all duration-300 relative overflow-hidden block shadow-lg"
            >
              {/* HUD Corner Bracket */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 pointer-events-none group-hover:border-emerald-400/60 transition-colors" />

              {/* Icon Badge */}
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:border-emerald-500/60 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.3)] transition-all">
                <MessageCircle className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    ACTIVE FREQUENCY
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-ink-dim group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h4 className="font-tech text-lg sm:text-xl font-bold uppercase tracking-wide text-ink group-hover:text-emerald-400 transition-colors">
                  WhatsApp Group
                </h4>
                <p className="font-body text-xs sm:text-sm text-ink-dim leading-relaxed mt-1">
                  Live participant broadcast channel for real-time announcements,
                  squad recruitment, and peer support.
                </p>
              </div>
            </motion.a>

            {/* Card 2: Google Meet */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="bg-panel border border-line p-5 sm:p-6 rounded-xl flex items-start gap-4 sm:gap-5 group hover:border-line/90 transition-all duration-300 relative overflow-hidden shadow-lg"
            >
              {/* HUD Corner Bracket */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 pointer-events-none group-hover:border-cyan/60 transition-colors" />

              {/* Icon Badge */}
              <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan shrink-0 group-hover:border-cyan/60 group-hover:shadow-[0_0_12px_rgba(79,216,232,0.3)] transition-all">
                <Video className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-cyan bg-cyan/10 border border-cyan/30 px-2 py-0.5 rounded-full">
                    VIRTUAL ROOMS
                  </span>
                </div>
                <h4 className="font-tech text-lg sm:text-xl font-bold uppercase tracking-wide text-ink group-hover:text-cyan transition-colors">
                  Google Meet
                </h4>
                <p className="font-body text-xs sm:text-sm text-ink-dim leading-relaxed mt-1">
                  All live keynotes, mentor triage sessions, project checkpoints, and
                  final live evaluation demos run via Meet links.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Codways Technologies HQ */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.19 }}
              className="bg-panel border border-line p-5 sm:p-6 rounded-xl flex items-start gap-4 sm:gap-5 group hover:border-line/90 transition-all duration-300 relative overflow-hidden shadow-lg"
            >
              {/* HUD Corner Bracket */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 pointer-events-none group-hover:border-crimson/60 transition-colors" />

              {/* Icon Badge */}
              <div className="w-12 h-12 rounded-xl bg-crimson/10 border border-crimson/30 flex items-center justify-center text-crimson shrink-0 group-hover:border-crimson/60 group-hover:shadow-[0_0_12px_rgba(232,38,44,0.3)] transition-all">
                <Building2 className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-crimson bg-crimson/10 border border-crimson/30 px-2 py-0.5 rounded-full">
                    COMMAND HQ
                  </span>
                </div>
                <h4 className="font-tech text-lg sm:text-xl font-bold uppercase tracking-wide text-ink group-hover:text-crimson transition-colors">
                  Codways Technologies HQ
                </h4>
                <p className="font-body text-xs sm:text-sm text-ink-dim leading-relaxed mt-1">
                  Core operational leadership, institutional partnerships, and
                  central technical administration nerve center.
                </p>
                <div className="mt-3 space-y-1">
                  <div className="font-mono text-[11px] text-ink-faint">
                    Off. H1A/5&amp;6, B-40, Globus-D Tower, Sector-63, Noida (U.P)-201301
                  </div>
                  <div className="font-mono text-[11px] text-ink-faint">
                    info@codways.com · +91 9891877741 ·{" "}
                    <a href="https://www.codways.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                      www.codways.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Contact Form ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-panel border border-line p-6 sm:p-8 rounded-2xl relative shadow-2xl overflow-hidden"
          >
            {/* Tech HUD Accents */}
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-crimson/50 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-crimson/50 pointer-events-none" />

            <div className="mb-6 border-b border-line/60 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                <h3 className="font-tech text-lg sm:text-xl font-bold uppercase tracking-wider text-ink">
                  Direct Transmission
                </h3>
              </div>
              <p className="font-body text-xs text-ink-dim">
                Encrypted comms link directly to the organizing operations desk.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Name Field */}
              <div>
                <label
                  htmlFor="comms-name"
                  className="block font-tech text-xs font-bold uppercase tracking-[0.14em] text-ink-dim mb-2"
                >
                  Name // Identifier <span className="text-crimson">*</span>
                </label>
                <input
                  id="comms-name"
                  type="text"
                  placeholder="Agent John Doe"
                  {...register("name")}
                  className={cn(
                    "w-full bg-void-2 border rounded-lg px-4 py-3 text-ink placeholder:text-ink-faint/60 font-body text-sm transition-all outline-none",
                    errors.name
                      ? "border-crimson focus:border-crimson focus:ring-1 focus:ring-crimson"
                      : "border-line focus:border-crimson focus:ring-1 focus:ring-crimson/40"
                  )}
                />
                {errors.name && (
                  <p className="font-mono text-xs text-crimson mt-1.5 flex items-center gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="comms-email"
                  className="block font-tech text-xs font-bold uppercase tracking-[0.14em] text-ink-dim mb-2"
                >
                  Email // Frequency <span className="text-crimson">*</span>
                </label>
                <input
                  id="comms-email"
                  type="email"
                  placeholder="agent@example.com"
                  {...register("email")}
                  className={cn(
                    "w-full bg-void-2 border rounded-lg px-4 py-3 text-ink placeholder:text-ink-faint/60 font-body text-sm transition-all outline-none",
                    errors.email
                      ? "border-crimson focus:border-crimson focus:ring-1 focus:ring-crimson"
                      : "border-line focus:border-crimson focus:ring-1 focus:ring-crimson/40"
                  )}
                />
                {errors.email && (
                  <p className="font-mono text-xs text-crimson mt-1.5 flex items-center gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="comms-message"
                  className="block font-tech text-xs font-bold uppercase tracking-[0.14em] text-ink-dim mb-2"
                >
                  Transmission // Message <span className="text-crimson">*</span>
                </label>
                <textarea
                  id="comms-message"
                  rows={4}
                  placeholder="Transmit your query, operational request, or sponsorship inquiry..."
                  {...register("message")}
                  className={cn(
                    "w-full bg-void-2 border rounded-lg px-4 py-3 text-ink placeholder:text-ink-faint/60 font-body text-sm transition-all outline-none resize-y min-h-[100px]",
                    errors.message
                      ? "border-crimson focus:border-crimson focus:ring-1 focus:ring-crimson"
                      : "border-line focus:border-crimson focus:ring-1 focus:ring-crimson/40"
                  )}
                />
                {errors.message && (
                  <p className="font-mono text-xs text-crimson mt-1.5 flex items-center gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-6 py-3.5 bg-crimson text-white font-tech text-sm font-bold uppercase tracking-[0.14em] rounded-md hover:bg-red-600 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-crimson/25 hover:shadow-crimson/45 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Signal...</span>
                  </>
                ) : (
                  <>
                    <span>Send Transmission</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
