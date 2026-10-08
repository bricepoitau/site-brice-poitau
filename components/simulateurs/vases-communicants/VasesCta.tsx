"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

/** Grand appel à l'action en fin de simulateur : carte sombre, anneaux animés, bouton doré. */
export default function VasesCta() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-ink px-7 py-12 text-center [@media(min-width:900px)]:px-16 [@media(min-width:900px)]:py-16"
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
    >
      {!reduce && (
        <>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full border border-gold-soft/25"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -right-20 -bottom-28 h-80 w-80 rounded-full border border-gold-soft/25"
            animate={{ scale: [1.05, 1, 1.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative">
        <p className="eyebrow text-gold-soft">Passez du schéma à votre situation</p>
        <h2 className="mx-auto mt-3 max-w-[640px] text-[clamp(26px,3.2vw,38px)] leading-[1.15] font-[450] text-white">
          Et si on construisait <em className="text-gold-soft">votre</em> circuit ?
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-[#C7C1B0]">
          Ces chiffres sont illustratifs. En rendez-vous découverte, je calcule avec vous votre tranche réelle, votre
          plafond PER disponible et les supports adaptés — avec un{" "}
          <b className="text-white">audit patrimonial offert</b>.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/rdv"
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink shadow-[0_14px_36px_-12px_rgba(201,169,104,0.7)] transition-colors duration-300 hover:bg-white"
            >
              Prendre rendez-vous <span aria-hidden>→</span>
            </Link>
          </motion.div>
          <Link
            href="/simulateurs"
            className="border-b border-white/40 px-1 py-1 text-sm font-medium text-white transition-colors duration-300 hover:border-gold-soft hover:text-gold-soft"
          >
            Découvrir les autres simulateurs
          </Link>
        </div>

        <p className="mt-6 text-xs text-[#C7C1B0]/80">Sans engagement · Réponse rapide · Rendez-vous à Bordeaux ou par téléphone</p>
      </div>
    </motion.div>
  );
}
