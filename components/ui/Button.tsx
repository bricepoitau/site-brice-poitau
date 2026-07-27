"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "pill";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center gap-2.5 rounded-full bg-gold px-[30px] py-4 text-sm font-semibold text-ink shadow-[0_10px_28px_-10px_rgba(169,132,63,0.6)] transition-[background-color,color,box-shadow] duration-300 ease-out hover:bg-ink hover:text-white hover:shadow-[0_10px_28px_-10px_rgba(22,33,46,0.5)]",
  ghost:
    "inline-flex items-center gap-2 border-b border-ink-soft px-[26px] py-4 text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-gold hover:border-gold",
  pill: "inline-flex items-center gap-2 rounded-full bg-gold px-[22px] py-[11px] text-[13px] font-semibold text-ink shadow-[0_6px_18px_-6px_rgba(169,132,63,0.6)] transition-[background-color,color,box-shadow] duration-[250ms] ease-out hover:bg-ink hover:text-white hover:shadow-[0_6px_18px_-6px_rgba(22,33,46,0.5)]",
};

const MAGNETIC_VARIANTS = new Set<Variant>(["primary", "pill"]);
const MAGNETIC_STRENGTH = 0.35;
const MAGNETIC_MAX = 10;

interface ButtonProps {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export default function Button({ href, variant = "primary", children, className = "" }: ButtonProps) {
  const isExternal = href.startsWith("http");
  const classes = `${styles[variant]} ${className}`.trim();
  const shouldReduceMotion = useReducedMotion();
  const isMagnetic = MAGNETIC_VARIANTS.has(variant) && !shouldReduceMotion;

  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!isMagnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    rawX.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, offsetX * MAGNETIC_STRENGTH)));
    rawY.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, offsetY * MAGNETIC_STRENGTH)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const motionProps = isMagnetic
    ? {
        style: { x, y },
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        whileTap: { scale: 0.96 },
      }
    : {};

  if (isExternal) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} className="inline-block" {...motionProps}>
      <Link href={href} className={classes}>
        {children}
      </Link>
    </motion.div>
  );
}
