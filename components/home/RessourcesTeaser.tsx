"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const items = ["Mes partenaires", "Habilitations & diplômes"];

export default function RessourcesTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ringY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <RevealOnScroll>
      <div ref={ref} className="relative overflow-hidden rounded-3xl bg-ink">
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full border border-gold-soft/30"
            style={{ y: ringY }}
          />
        )}

        <div className="relative grid grid-cols-1 items-center gap-10 p-9 text-[#EDE7D9] [@media(min-width:900px)]:grid-cols-2 [@media(min-width:900px)]:p-[60px]">
          <div>
            <p className="eyebrow text-gold-soft">Ressources</p>
            <h2 className="mt-3 text-2xl font-[450] text-white [@media(min-width:900px)]:text-[32px]">
              Un réseau de partenaires solide, une expertise vérifiable
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#C7C1B0]">
              Mes partenaires, mes habilitations professionnelles et mes diplômes — pour que vous sachiez
              précisément avec qui vous travaillez.
            </p>
            <Link
              href="/ressources"
              className="mt-6.5 inline-flex w-fit items-center gap-2 rounded-full bg-gold-soft px-5 py-3 text-[13px] font-medium text-ink transition-[gap] duration-300 hover:gap-3"
            >
              Explorer les ressources →
            </Link>
          </div>
          <div className="flex flex-col">
            {items.map((item, i) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-white/10 py-5 transition-[padding] duration-300 hover:pl-2.5"
              >
                <span className="font-serif text-[13px] text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[15px] text-[#EDE7D9]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
