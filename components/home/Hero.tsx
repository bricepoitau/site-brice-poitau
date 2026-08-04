"use client";

import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const rawBlueprintX = useMotionValue(0);
  const rawBlueprintY = useMotionValue(0);
  const blueprintX = useSpring(rawBlueprintX, { stiffness: 60, damping: 20 });
  const blueprintY = useSpring(rawBlueprintY, { stiffness: 60, damping: 20 });

  const rawGlowX = useMotionValue(50);
  const rawGlowY = useMotionValue(35);
  const glowX = useSpring(rawGlowX, { stiffness: 40, damping: 22 });
  const glowY = useSpring(rawGlowY, { stiffness: 40, damping: 22 });
  const glowLeft = useTransform(glowX, (v) => `${v}%`);
  const glowTop = useTransform(glowY, (v) => `${v}%`);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawBlueprintX.set((px - 0.5) * -24);
    rawBlueprintY.set((py - 0.5) * -24);
    rawGlowX.set(px * 100);
    rawGlowY.set(py * 100);
  };

  const rise = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] as const, delay },
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-[6vw]"
    >
      <motion.div className="hero-blueprint" style={shouldReduceMotion ? undefined : { x: blueprintX, y: blueprintY }} />

      {!shouldReduceMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              left: glowLeft,
              top: glowTop,
              background: "radial-gradient(circle, rgba(169,132,63,0.35) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

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
          Un accompagnement patrimonial rigoureux — combinant stratégies personnelles et professionnelles, en
          personne physique comme en personne morale — épargne, immobilier, retraite et transmission — pensé
          comme une architecture sur-mesure, avec des outils de simulation clairs pour éclairer chaque décision.
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
