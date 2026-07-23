"use client";

import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] as const, delay },
  });

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-[6vw]">
      <div className="hero-blueprint" />

      <div className="relative max-w-[900px] pt-20">
        <motion.p className="eyebrow" {...rise(0.05)}>
          Ingénieur patrimonial
        </motion.p>

        <motion.h1
          className="mt-2.5 text-[clamp(42px,6vw,78px)] leading-[1.05] font-[450] tracking-[-.01em] text-ink"
          {...rise(0.15)}
        >
          Structurer <em className="italic text-gold">votre</em>
          <br />
          liberté financière
        </motion.h1>

        <motion.p className="mt-6.5 max-w-[560px] text-lg leading-relaxed text-text-muted" {...rise(0.35)}>
          Un accompagnement patrimonial rigoureux — épargne, immobilier, retraite et transmission — pensé comme une
          architecture sur-mesure, avec des outils de simulation clairs pour éclairer chaque décision.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...rise(0.55)}>
          <Button href="/rdv" variant="primary">
            Prendre rendez-vous →
          </Button>
          <Button href="/simulateurs" variant="ghost">
            Découvrir les simulateurs
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-16 left-[6vw] h-px bg-gold-soft"
        initial={shouldReduceMotion ? false : { width: 0 }}
        animate={{ width: 220 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.9 }}
      />

      <div className="absolute bottom-9 right-[6vw] flex flex-col items-center gap-2 text-xs uppercase tracking-[.1em] text-text-muted">
        <span>Scroll</span>
        <div className="scroll-cue-dot" />
      </div>
    </section>
  );
}
