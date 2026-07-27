"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateX.set(py * -7);
    rawRotateY.set(px * 7);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`group relative flex min-h-[290px] flex-col overflow-hidden rounded-[18px] border border-line bg-cream-card p-[34px] transition-[box-shadow,border-color] duration-[400ms] ease-out hover:border-gold-soft hover:shadow-[0_24px_40px_-20px_rgba(22,33,46,0.18)] ${className}`}
    >
      <span className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-soft transition-transform duration-500 ease-out group-hover:scale-x-100" />
      {children}
    </motion.div>
  );
}
