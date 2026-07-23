import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "pill";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center gap-2.5 rounded-full bg-ink px-[30px] py-4 text-sm font-medium text-white transition-[background-color,transform] duration-300 ease-out hover:bg-gold hover:-translate-y-0.5",
  ghost:
    "inline-flex items-center gap-2 border-b border-ink-soft px-[26px] py-4 text-sm text-ink-soft transition-colors duration-300 hover:text-gold hover:border-gold",
  pill: "inline-flex items-center gap-2 rounded-full bg-ink px-[22px] py-[11px] text-[13px] font-medium text-white transition-[background-color,transform] duration-[250ms] ease-out hover:bg-gold hover:-translate-y-px",
};

interface ButtonProps {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export default function Button({ href, variant = "primary", children, className = "" }: ButtonProps) {
  const isExternal = href.startsWith("http");
  const classes = `${styles[variant]} ${className}`.trim();

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
