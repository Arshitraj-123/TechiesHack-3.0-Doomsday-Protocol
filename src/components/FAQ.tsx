import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "motion/react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ── FAQ Data ───────────────────────────────────────────────── */

interface FAQItem {
  id: string;
  numeral: string;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "item-1",
    numeral: "I",
    question: "What is the registration process?",
    answer: (
      <p>
        Fill out the official enlistment form, complete the ₹200 registration fee payment,
        and join the dedicated WhatsApp Group. Your verification and registration
        confirmation will be processed and confirmed within{" "}
        <span className="text-gold font-semibold">24 to 48 hours</span>.
      </p>
    ),
  },
  {
    id: "item-2",
    numeral: "II",
    question: "Do I need a team, or can I register solo?",
    answer: (
      <p>
        Both solo hackers and formed squads are fully welcome! Cross-college and
        inter-disciplinary team formations are permitted. If you register solo,
        you can easily use the official WhatsApp Group to connect with other
        participants and assemble your dream team prior to kickoff.
      </p>
    ),
  },
  {
    id: "item-3",
    numeral: "III",
    question: "Is there a registration fee?",
    answer: (
      <p>
        Yes, there is a registration fee of{" "}
        <span className="text-gold font-semibold font-mono">₹200 per participant</span>,
        payable during registration. Your seat and mission clearance are officially
        confirmed only once both the registration form and payment are complete.
      </p>
    ),
  },
  {
    id: "item-4",
    numeral: "IV",
    question: "What should I have ready before the hackathon starts?",
    answer: (
      <p>
        You will need a working laptop with your development environment set up, a
        stable high-speed internet connection, and active access to Google Meet and
        WhatsApp. Basic pre-existing boilerplate or scaffolding templates are allowed,
        but the actual codebase build and core feature implementation must happen
        during the live 24 hours.
      </p>
    ),
  },
  {
    id: "item-5",
    numeral: "V",
    question: "Will mentorship be available during the event?",
    answer: (
      <p>
        Yes, comprehensive standby mentor support will be available via WhatsApp
        throughout the event, plus scheduled live Google Meet checkpoints at critical
        phases to review progress, unblock technical issues, and refine your pitch.
      </p>
    ),
  },
  {
    id: "item-6",
    numeral: "VI",
    question: "How will submissions be judged?",
    answer: (
      <p>
        Submissions will be evaluated across the 7 weighted parameters detailed in the{" "}
        <a
          href="#protocol"
          className="text-crimson hover:underline font-semibold inline-flex items-center gap-1"
        >
          Evaluation Protocol
          <ExternalLink className="w-3 h-3" />
        </a>{" "}
        section above by an independent judging panel. Review Sector 05 for the exact
        breakdown across Innovation, Technical Complexity, and other criteria.
      </p>
    ),
  },
];

/* ── FAQ Component ──────────────────────────────────────────── */

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-void-2 border-t border-line relative overflow-hidden"
    >
      {/* Subtle Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(232,38,44,0.06),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Section Heading */}
        <SectionHeading
          centered
          eyebrow="Field Manual // FAQ"
          title="Frequently asked questions"
          description="Operational protocols, logistics, and everything you need to know before liftoff."
        />

        {/* ── Radix UI Accordion Root ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 sm:mt-16"
        >
          <Accordion.Root
            type="single"
            collapsible
            className="space-y-4"
          >
            {FAQ_ITEMS.map((item) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className="bg-panel border border-line rounded-xl overflow-hidden group hover:border-line/90 transition-all duration-200 data-[state=open]:border-gold-dim/60 shadow-lg"
              >
                <Accordion.Header className="m-0 p-0">
                  <Accordion.Trigger className="w-full p-4 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer transition-colors group-hover:bg-panel-2/40 data-[state=open]:bg-panel-2/50 min-h-[52px]">
                    {/* Roman Numeral Badge + Question */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      {/* Roman Numeral Badge */}
                      <div className="w-8 h-8 rounded-lg border border-gold/40 bg-gold/10 flex items-center justify-center font-mono text-xs font-bold text-gold flex-shrink-0 group-hover:border-gold/70 group-hover:shadow-[0_0_8px_rgba(232,185,74,0.3)] transition-all">
                        {item.numeral}
                      </div>

                      {/* Question Text */}
                      <h3 className="font-tech font-bold text-sm sm:text-base md:text-lg text-ink group-hover:text-gold transition-colors tracking-wide leading-snug break-words">
                        {item.question}
                      </h3>
                    </div>

                    {/* Smooth Rotating Chevron */}
                    <div className="w-7 h-7 rounded-md bg-void-2/60 border border-line/60 flex items-center justify-center flex-shrink-0 text-ink-dim group-hover:text-ink transition-colors">
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180 text-ink-dim group-data-[state=open]:text-gold" />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                {/* Animated Content Panel */}
                <Accordion.Content className="overflow-hidden font-body text-xs sm:text-sm text-ink-dim leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-line/40 pl-[55px] sm:pl-[66px]">
                    {item.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
