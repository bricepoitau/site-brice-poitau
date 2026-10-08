"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export const eur = (v: number) => nf.format(Math.round(v)) + " €";
export const eurPerMonth = (v: number) => nf.format(Math.round(v)) + " €/mois";

interface AnimatedNumberProps {
  value: number;
  /** Doit être une fonction stable (définie hors du composant). */
  format?: (v: number) => string;
  className?: string;
}

/** Nombre qui "roule" vers sa nouvelle valeur (ressort). Statique si l'utilisateur réduit les animations. */
export default function AnimatedNumber({ value, format = eur, className }: AnimatedNumberProps) {
  const reduce = useReducedMotion();
  const target = useMotionValue(value);
  const spring = useSpring(target, { stiffness: 110, damping: 22, mass: 0.8 });
  const text = useTransform(spring, (v) => format(v));

  useEffect(() => {
    target.set(value);
  }, [value, target]);

  if (reduce) return <span className={className}>{format(value)}</span>;
  return <motion.span className={className}>{text}</motion.span>;
}
