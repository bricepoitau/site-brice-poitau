import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group relative flex min-h-[290px] flex-col overflow-hidden rounded-[18px] border border-line bg-cream-card p-[34px] transition-[transform,box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-1.5 hover:border-gold-soft hover:shadow-[0_24px_40px_-20px_rgba(22,33,46,0.18)] ${className}`}
    >
      <span className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-soft transition-transform duration-500 ease-out group-hover:scale-x-100" />
      {children}
    </div>
  );
}
